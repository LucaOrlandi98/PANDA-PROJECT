import { useEffect, useMemo, useRef } from "react";

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

export function GoFundMeWidget() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const iframeSrc = useMemo(
    () => buildWidgetSrc(GOFUNDME_WIDGET_URL),
    [],
  );

  useEffect(() => {
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

      iframe.height = String(event.data.offsetHeight);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      className="gofundme-widget-frame gfm-embed-iframe"
      frameBorder="0"
      height="200"
      scrolling="no"
      src={iframeSrc}
      title="GoFundMe Panda Project"
      width="100%"
    />
  );
}
