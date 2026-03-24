import { useEffect, useRef, useState } from "react";
import maplibregl, { type GeoJSONSource } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const WEBAPP_BASE =
  "https://script.google.com/macros/s/AKfycbxQfiZ1KIQHFH5tn7gPfkMI6-NMKUtj_uVgygG2eTaVDCW9dqIpm3bwV5TARlj6QBcz/exec";
const DEVICE_ID = "cavallo";
const DATA_URL = `${WEBAPP_BASE}?action=getLast&deviceId=${encodeURIComponent(
  DEVICE_ID,
)}`;

const POLL_MS = 20000;
const START_ZOOM = 13;
const STALE_HOURS = 24;
const DEFAULT_RADIUS_M = 4000;
const DEFAULT_CENTER = { lat: 45.57, lng: 10.24 };
const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
const EARTH_R = 6371000;

type CircleFeature = {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: Record<string, never>;
};

type LivePoint = {
  lat: number;
  lng: number;
  ts: number | null;
  mode: string;
  radiusM: number;
};

function toMs(ts: unknown) {
  if (ts == null) {
    return null;
  }

  if (typeof ts === "number") {
    return ts < 2e10 ? ts * 1000 : ts;
  }

  const numericValue = Number(ts);

  if (!Number.isNaN(numericValue)) {
    return numericValue < 2e10 ? numericValue * 1000 : numericValue;
  }

  const parsedValue = Date.parse(String(ts));
  return Number.isNaN(parsedValue) ? null : parsedValue;
}

function formatAge(tsMs: number | null) {
  if (!tsMs) {
    return "no-ts";
  }

  const diff = Date.now() - tsMs;
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) {
    return "now";
  }

  if (minutes < 60) {
    return `${minutes}m`;
  }

  return `${Math.floor(minutes / 60)}h`;
}

function destPoint(lat: number, lng: number, bearingRad: number, distM: number) {
  const phi1 = (lat * Math.PI) / 180;
  const lambda1 = (lng * Math.PI) / 180;
  const delta = distM / EARTH_R;

  const sinPhi1 = Math.sin(phi1);
  const cosPhi1 = Math.cos(phi1);
  const sinDelta = Math.sin(delta);
  const cosDelta = Math.cos(delta);
  const sinTheta = Math.sin(bearingRad);
  const cosTheta = Math.cos(bearingRad);

  const sinPhi2 = sinPhi1 * cosDelta + cosPhi1 * sinDelta * cosTheta;
  const phi2 = Math.asin(sinPhi2);
  const y = sinTheta * sinDelta * cosPhi1;
  const x = cosDelta - sinPhi1 * sinPhi2;
  const lambda2 = lambda1 + Math.atan2(y, x);

  return {
    lat: (phi2 * 180) / Math.PI,
    lng: (lambda2 * 180) / Math.PI,
  };
}

function circlePolygon(lng: number, lat: number, radiusM: number, steps = 64) {
  const coords: number[][] = [];

  for (let index = 0; index <= steps; index += 1) {
    const bearing = (index / steps) * Math.PI * 2;
    const point = destPoint(lat, lng, bearing, radiusM);
    coords.push([point.lng, point.lat]);
  }

  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [coords],
    },
    properties: {},
  } satisfies CircleFeature;
}

function bboxFromPolygon(feature: CircleFeature) {
  const coords = feature.geometry.coordinates[0];
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;

  coords.forEach(([lng, lat]) => {
    minLng = Math.min(minLng, lng);
    minLat = Math.min(minLat, lat);
    maxLng = Math.max(maxLng, lng);
    maxLat = Math.max(maxLat, lat);
  });

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ] as [[number, number], [number, number]];
}

async function fetchPublic(): Promise<LivePoint> {
  const response = await fetch(DATA_URL, { cache: "no-store" });
  const payload = await response.json();

  if (!payload || payload.ok !== true) {
    throw new Error(payload?.err || "bad payload");
  }

  if (typeof payload.lat !== "number" || typeof payload.lon !== "number") {
    throw new Error("missing lat/lon");
  }

  return {
    lat: payload.lat,
    lng: payload.lon,
    ts: toMs(payload.ts),
    mode: String(payload.mode || ""),
    radiusM: typeof payload.radiusM === "number" ? payload.radiusM : DEFAULT_RADIUS_M,
  };
}

export function LiveMapCanvas() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const pollIdRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const initPointRef = useRef(DEFAULT_CENTER);
  const lastTsRef = useRef<number | null>(null);
  const lastRadiusRef = useRef(DEFAULT_RADIUS_M);
  const lastCenterKeyRef = useRef<string | null>(null);
  const [badge, setBadge] = useState("loading...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const container = containerRef.current;

    if (!wrap || !container) {
      return;
    }

    let cancelled = false;
    let cleanupWindowResize: (() => void) | null = null;

    const forceResize = () => {
      const map = mapRef.current;

      if (!map || cancelled) {
        return;
      }

      try {
        map.resize();
      } catch {
        // Ignore resize errors during mount.
      }
    };

    const scheduleResizeBurst = () => {
      [0, 80, 220, 420, 900].forEach((delay) => {
        window.setTimeout(() => {
          forceResize();
        }, delay);
      });
    };

    const ensureMarker = (lat: number, lng: number) => {
      const map = mapRef.current;

      if (!map) {
        return;
      }

      if (!markerRef.current) {
        const element = document.createElement("div");
        element.className = "panda-marker";

        markerRef.current = new maplibregl.Marker({
          element,
          anchor: "center",
        })
          .setLngLat([lng, lat])
          .addTo(map);

        return;
      }

      markerRef.current.setLngLat([lng, lat]);
    };

    const ensureCircle = (lat: number, lng: number, radiusM: number) => {
      const map = mapRef.current;

      if (!map) {
        return;
      }

      const sourceId = "panda-circle-src";
      const polygon = circlePolygon(lng, lat, radiusM, 64);

      if (map.getSource(sourceId)) {
        (map.getSource(sourceId) as GeoJSONSource).setData(polygon);
        return;
      }

      map.addSource(sourceId, {
        type: "geojson",
        data: polygon,
      });

      map.addLayer({
        id: "panda-circle-fill",
        type: "fill",
        source: sourceId,
        paint: {
          "fill-color": "#ff3b30",
          "fill-opacity": 0.12,
        },
      });

      map.addLayer({
        id: "panda-circle-line",
        type: "line",
        source: sourceId,
        paint: {
          "line-color": "#ff3b30",
          "line-width": 1.6,
          "line-opacity": 0.35,
        },
      });
    };

    const fitCircle = (lat: number, lng: number, radiusM: number) => {
      const map = mapRef.current;

      if (!map) {
        return;
      }

      const polygon = circlePolygon(lng, lat, radiusM, 48);
      const bounds = bboxFromPolygon(polygon);

      map.fitBounds(bounds, {
        padding: 24,
        duration: 350,
        maxZoom: 16,
      });
    };

    const update = async () => {
      try {
        const point = await fetchPublic();

        if (cancelled) {
          return;
        }

        if (point.ts) {
          lastTsRef.current = point.ts;
        }

        lastRadiusRef.current = point.radiusM;

        const centerKey = `${point.lat.toFixed(6)},${point.lng.toFixed(
          6,
        )},${point.radiusM}`;

        if (centerKey !== lastCenterKeyRef.current) {
          ensureMarker(point.lat, point.lng);
          ensureCircle(point.lat, point.lng, point.radiusM);
          lastCenterKeyRef.current = centerKey;
        }

        const staleMs = STALE_HOURS * 3600 * 1000;
        const isStale =
          lastTsRef.current && Date.now() - lastTsRef.current > staleMs;
        const modeText = point.mode ? ` - ${point.mode.toLowerCase()}` : "";

        setError(null);
        setBadge(
          `${isStale ? "stale" : "live"} - ${formatAge(lastTsRef.current)}${modeText} - r:${Math.round(
            point.radiusM / 1000,
          )}km`,
        );
      } catch (fetchError) {
        if (cancelled) {
          return;
        }

        setBadge("no data");
        console.warn("[panda live map]", fetchError);
      }
    };

    void (async () => {
      try {
        let initLat = DEFAULT_CENTER.lat;
        let initLng = DEFAULT_CENTER.lng;

        try {
          const point = await fetchPublic();
          initLat = point.lat;
          initLng = point.lng;
          if (point.ts) {
            lastTsRef.current = point.ts;
          }
          lastRadiusRef.current = point.radiusM;
        } catch {
          // Keep fallback center.
        }

        if (cancelled) {
          return;
        }

        initPointRef.current = { lat: initLat, lng: initLng };

        const map = new maplibregl.Map({
          container,
          style: STYLE_URL,
          center: [initLng, initLat],
          zoom: START_ZOOM,
          attributionControl: false,
          interactive: true,
          dragRotate: false,
          pitchWithRotate: false,
        });

        mapRef.current = map;

        map.addControl(
          new maplibregl.AttributionControl({ compact: true }),
          "bottom-right",
        );
        map.addControl(
          new maplibregl.NavigationControl({ showCompass: false }),
          "top-right",
        );

        resizeObserverRef.current = new ResizeObserver(() => {
          forceResize();
        });
        resizeObserverRef.current.observe(wrap);

        intersectionObserverRef.current = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              forceResize();
            }
          },
          { threshold: 0.01 },
        );
        intersectionObserverRef.current.observe(wrap);

        window.addEventListener("resize", forceResize);
        cleanupWindowResize = () => {
          window.removeEventListener("resize", forceResize);
        };

        map.on("load", () => {
          if (cancelled) {
            return;
          }

          ensureMarker(initLat, initLng);
          ensureCircle(initLat, initLng, lastRadiusRef.current);
          fitCircle(initLat, initLng, lastRadiusRef.current);
          scheduleResizeBurst();

          void update();
          pollIdRef.current = window.setInterval(() => {
            void update();
          }, POLL_MS);
        });

        map.on("idle", forceResize);
        map.on("error", (event) => {
          console.warn("[panda live map]", event?.error ?? event);
        });
      } catch (loadError) {
        if (!cancelled) {
          setError("Live map non disponibile.");
          setBadge("no data");
          console.warn("[panda live map]", loadError);
        }
      }
    })();

    return () => {
      cancelled = true;
      cleanupWindowResize?.();
      resizeObserverRef.current?.disconnect();
      intersectionObserverRef.current?.disconnect();

      if (pollIdRef.current !== null) {
        window.clearInterval(pollIdRef.current);
      }

      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  const handleFitClick = () => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const markerLngLat = markerRef.current?.getLngLat();
    const targetLat = markerLngLat?.lat ?? initPointRef.current.lat;
    const targetLng = markerLngLat?.lng ?? initPointRef.current.lng;

    const polygon = circlePolygon(targetLng, targetLat, lastRadiusRef.current, 48);
    const bounds = bboxFromPolygon(polygon);

    map.fitBounds(bounds, {
      padding: 24,
      duration: 350,
      maxZoom: 16,
    });
  };

  return (
    <div className="live-map-page__frame">
      {error ? <p className="live-map-page__fallback">{error}</p> : null}
      <div className="panda-map-wrap" ref={wrapRef}>
        <div
          aria-label="Mappa posizione Panda"
          className="panda-map"
          ref={containerRef}
        />
        <button className="panda-btn" onClick={handleFitClick} type="button">
          Ritrova la Panda
        </button>
        <div className="panda-badge">{badge}</div>
      </div>
    </div>
  );
}
