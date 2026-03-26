import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type HeroProps = {
  className?: string;
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
};

export function MobileHero({
  className,
  eyebrow,
  title,
  description,
  image,
  modelSrc,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  const modelRef = useRef<HTMLElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(!modelSrc);

  useEffect(() => {
    if (!modelSrc || !modelRef.current) {
      return;
    }

    const model = modelRef.current;
    const handleReady = () => setIsLoaded(true);
    const handleError = () => setIsLoaded(true);

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
  }, [modelSrc]);

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
              camera-orbit="36deg 72deg 105%"
              min-camera-orbit="auto auto 105%"
              max-camera-orbit="auto auto 105%"
              interaction-prompt="auto"
              interaction-prompt-threshold="500"
              disable-zoom
              disable-pan
            />
          </div>
        ) : (
          <img src={image} alt="Panda Project" />
        )}
      </div>
      <div className="hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description ? <p className="hero-copy">{description}</p> : null}
        {primaryCta || secondaryCta ? (
          <div className="button-row">
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
    </section>
  );
}
