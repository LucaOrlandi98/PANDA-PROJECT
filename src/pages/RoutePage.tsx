import { Suspense, lazy } from "react";

const MAP_EMBED =
  "https://www.google.com/maps/d/u/0/embed?mid=17lsE23viS_oQ2LHWF9lOAr3X_02dE3U";

const loadLiveMapCanvas = () =>
  import("../components/LiveMapCanvas").then((module) => ({
    default: module.LiveMapCanvas,
  }));

const LiveMapCanvas = lazy(loadLiveMapCanvas);

const roadbookStats = [
  {
    label: "Direzione",
    value: "Georgia",
  },
  {
    label: "Km stimati",
    value: "11.000 km",
  },
  {
    label: "Durata stimata",
    value: "2 / 3 mesi",
  },
  {
    label: "Fase",
    value: "Georgia raggiunta il 6/06/26",
  },
] as const;

export function RoutePage() {
  return (
    <div className="roadbook-page">
      <div className="roadbook-page__intro">
        <h1>Roadbook</h1>
      </div>

      <div className="roadbook-page__content">
        <div className="roadbook-page__map-grid">
          <div className="roadbook-page__map roadbook-page__map--mymaps">
            <div className="map-frame">
              <iframe
                src={MAP_EMBED}
                title="Panda Project roadbook map"
                loading="lazy"
              />
            </div>
          </div>
          <div className="roadbook-page__map roadbook-page__map--live">
            <Suspense
              fallback={
                <article className="roadbook-live-card roadbook-live-card--loading">
                  <p className="eyebrow">Live map</p>
                  <h3>Caricamento live map</h3>
                  <p>La mappa live viene inizializzata appena entri nella sezione.</p>
                </article>
              }
            >
              <LiveMapCanvas />
            </Suspense>
          </div>
        </div>
        <div className="roadbook-page__metrics">
          {roadbookStats.map((item) => (
            <article className="roadbook-stat" key={item.label}>
              <p>{item.label}</p>
              <h3>{item.value}</h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
