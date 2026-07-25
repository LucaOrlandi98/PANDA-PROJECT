import { useEffect, useMemo, useRef } from "react";
import { useState } from "react";

const GOFUNDME_WIDGET_URL =
  "https://www.gofundme.com/f/manteniamo-in-strada-panda-project/widget/medium?attribution_id=sl%3A618a6984-c4c3-4eb7-afa6-a771189109f2";

function buildWidgetSrc(rawUrl: string) {
  const parsedUrl = new URL(rawUrl);
  const hostname =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "none";

  parsedUrl.searchParams.set("utm_content", hostname);
  parsedUrl.searchParams.set("utm_medium", "referral");
  parsedUrl.searchParams.set("utm_source", "widget");

  return `${parsedUrl.toString()}#:~:tcm-regime=GDPR&tcm-prompt=Hidden`;
}

function getWidgetHeight(viewportWidth: number, viewportHeight = 900) {
  if (viewportWidth < 720) {
    if (viewportHeight <= 680) {
      return 136;
    }

    if (viewportHeight <= 780) {
      return 154;
    }

    return 172;
  }

  if (viewportWidth < 1024) {
    if (viewportHeight <= 860) {
      return 164;
    }

    return 176;
  }

  return 220;
}

export function GoFundMeWidget() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [displayHeight, setDisplayHeight] = useState(() =>
    typeof window === "undefined"
      ? 220
      : getWidgetHeight(window.innerWidth, window.innerHeight),
  );
  const [contentHeight, setContentHeight] = useState(() =>
    typeof window === "undefined"
      ? 220
      : getWidgetHeight(window.innerWidth, window.innerHeight),
  );
  const iframeSrc = useMemo(
    () => buildWidgetSrc(GOFUNDME_WIDGET_URL),
    [],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShouldRender(true);
    }, 220);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const syncFrameHeight = () => {
      const nextDisplayHeight = getWidgetHeight(
        window.innerWidth,
        window.innerHeight,
      );

      setDisplayHeight(nextDisplayHeight);
      setContentHeight((currentHeight) =>
        currentHeight < nextDisplayHeight ? nextDisplayHeight : currentHeight,
      );
    };

    syncFrameHeight();
    window.addEventListener("resize", syncFrameHeight);

    return () => {
      window.removeEventListener("resize", syncFrameHeight);
    };
  }, []);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      const iframe = iframeRef.current;

      if (
        !iframe ||
        iframe.contentWindow !== event.source ||
        !event.data ||
        event.data.type !== "gfm-embed-widget-resize" ||
        typeof event.data.offsetHeight !== "number"
      ) {
        return;
      }

      const nextHeight = Math.max(
        event.data.offsetHeight,
        getWidgetHeight(window.innerWidth, window.innerHeight),
      );

      iframe.height = String(nextHeight);
      setContentHeight(nextHeight);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [shouldRender]);

  const frameScale = Math.min(1, displayHeight / contentHeight);
  const scaledWidth = frameScale < 1 ? `${100 / frameScale}%` : "100%";

  return (
    <div
      className="gofundme-widget-shell"
      style={{ height: `${displayHeight}px` }}
    >
      {shouldRender ? (
        <iframe
          ref={iframeRef}
          className="gofundme-widget-frame gfm-embed-iframe"
          frameBorder="0"
          height={String(contentHeight)}
          loading="lazy"
          scrolling="no"
          src={iframeSrc}
          style={{
            height: `${contentHeight}px`,
            transform: `scale(${frameScale})`,
            transformOrigin: "top left",
            width: scaledWidth,
          }}
          title="GoFundMe Panda Project"
          width="100%"
        />
      ) : (
        <div
          className="gofundme-widget-placeholder"
          aria-hidden="true"
          style={{ minHeight: `${displayHeight}px` }}
        >
          <span className="gofundme-widget-placeholder__line gofundme-widget-placeholder__line--title" />
          <span className="gofundme-widget-placeholder__line" />
          <span className="gofundme-widget-placeholder__line gofundme-widget-placeholder__line--button" />
        </div>
      )}
    </div>
  );
}
