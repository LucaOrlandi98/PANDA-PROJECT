import { type ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type HeroProps = {
  className?: string;
  actionsClassName?: string;
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  modelSrc?: string;
  primaryCta?: {
    label: string;
    to: string;
  };
  secondaryCta?: {
    label: string;
    to: string;
  };
  aside?: ReactNode;
};

function getHomeModelOrbit(viewportWidth: number, viewportHeight: number) {
  if (viewportWidth < 401) {
    return viewportHeight <= 780 ? "34deg 72deg 108%" : "34deg 72deg 102%";
  }

  if (viewportWidth < 720) {
    return viewportHeight <= 780 ? "35deg 72deg 100%" : "35deg 72deg 96%";
  }

  if (viewportWidth < 1024) {
    return "36deg 72deg 92%";
  }

  return "36deg 72deg 88%";
}

export function MobileHero({
  className,
  actionsClassName,
  eyebrow,
  title,
  description,
  image,
  modelSrc,
  primaryCta,
  secondaryCta,
  aside,
}: HeroProps) {
  const modelRef = useRef<HTMLElement | null>(null);
  const [modelVersion, setModelVersion] = useState(0);
  const [isLoaded, setIsLoaded] = useState(!modelSrc);
  const [hasModelError, setHasModelError] = useState(false);
  const [cameraOrbit, setCameraOrbit] = useState(() =>
    typeof window === "undefined"
      ? "36deg 72deg 88%"
      : getHomeModelOrbit(window.innerWidth, window.innerHeight),
  );

  useEffect(() => {
    if (!modelSrc) {
      return;
    }

    const syncCameraOrbit = () => {
      setCameraOrbit(getHomeModelOrbit(window.innerWidth, window.innerHeight));
    };

    syncCameraOrbit();
    window.addEventListener("resize", syncCameraOrbit);

    return () => {
      window.removeEventListener("resize", syncCameraOrbit);
    };
  }, [modelSrc]);

  useEffect(() => {
    if (!modelSrc || !modelRef.current) {
      return;
    }

    const model = modelRef.current;
    const handleReady = () => {
      setHasModelError(false);
      setIsLoaded(true);
    };
    const handleError = () => {
      setHasModelError(true);
      setIsLoaded(true);
    };

    model.addEventListener("load", handleReady);
    model.addEventListener("error", handleError);

    const timer = window.setTimeout(() => {
      setIsLoaded(true);
    }, 6000);

    return () => {
      model.removeEventListener("load", handleReady);
      model.removeEventListener("error", handleError);
      window.clearTimeout(timer);
    };
  }, [modelSrc, modelVersion]);

  return (
    <section className={`hero-card${className ? ` ${className}` : ""}`}>
      <div className={`hero-media${modelSrc ? " is-model" : ""}`}>
        {eyebrow ? <p className="hero-media__eyebrow">{eyebrow}</p> : null}
        {modelSrc ? (
          <div className="hero-model">
            <div className={`hero-spinner${isLoaded ? " is-hidden" : ""}`} aria-hidden="true">
              <div className="hero-spinner__ring" />
            </div>
            <model-viewer
              key={modelVersion}
              ref={modelRef}
              src={modelSrc}
              alt="Panda 3D"
              crossorigin="anonymous"
              camera-controls
              auto-rotate
              environment-image="neutral"
              exposure="1"
              shadow-intensity="0.3"
              poster-color="transparent"
              bounds="tight"
              camera-target="auto auto auto"
              camera-orbit={cameraOrbit}
              min-camera-orbit={`auto auto ${cameraOrbit.split(" ")[2]}`}
              max-camera-orbit={`auto auto ${cameraOrbit.split(" ")[2]}`}
              interaction-prompt="auto"
              interaction-prompt-threshold="500"
              disable-zoom
              disable-pan
            />
            {hasModelError ? (
              <div className="hero-model-fallback" role="status">
                <p>Il modello 3D non si sta caricando.</p>
                <button
                  className="hero-model-fallback__action"
                  onClick={() => {
                    setHasModelError(false);
                    setIsLoaded(false);
                    setModelVersion((value) => value + 1);
                  }}
                  type="button"
                >
                  Riprova
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <img src={image} alt="Panda Project" />
        )}
      </div>
      <div className="hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="hero-title">
          {title.split(" ").map((word) => (
            <span key={word}>{word}</span>
          ))}
        </h1>
        {description ? <p className="hero-copy">{description}</p> : null}
        {primaryCta || secondaryCta ? (
          <div className={`button-row${actionsClassName ? ` ${actionsClassName}` : ""}`}>
            {primaryCta ? (
              <Link className="button button-primary" to={primaryCta.to}>
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link className="button button-secondary" to={secondaryCta.to}>
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
      {aside ? <div className="hero-aside">{aside}</div> : null}
    </section>
  );
}
