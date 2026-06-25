import {
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Link } from "react-router-dom";
import {
  journalMediaArchiveByCategory,
  journalMediaSections,
} from "../data/journalMediaArchive";
import type { JournalMediaCategory, JournalMediaItem } from "../types/content";

const mediaAspectRatios = {
  landscape: "16 / 9",
  portrait: "9 / 16",
  square: "1 / 1",
} as const;

const mediaAspectValues = {
  landscape: 16 / 9,
  portrait: 9 / 16,
  square: 1,
} as const;

type LightboxState = {
  section: JournalMediaCategory;
  index: number;
};

const galleryImageSizes = "(max-width: 719px) 45vw, (max-width: 1023px) 30vw, 240px";

const resolveFallbackAspectRatio = (item: JournalMediaItem) => mediaAspectValues[item.orientation];

type LightboxCarouselProps = {
  items: readonly JournalMediaItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  onMediaReady: (itemId: string, width: number, height: number) => void;
  resolvedAspectRatio: number;
  videoRefs: MutableRefObject<(HTMLVideoElement | null)[]>;
};

type GalleryVideoPreviewProps = {
  item: JournalMediaItem;
};

function GalleryVideoPreview({ item }: GalleryVideoPreviewProps) {
  return (
    <div
      aria-hidden="true"
      className="journal-media-wall__video-card journal-media-wall__video-card--placeholder"
      style={{
        aspectRatio: mediaAspectRatios[item.orientation],
      }}
    >
      <span className="journal-media-wall__video-badge">Video</span>
      <span className="journal-media-wall__video-icon">{"\u25B6"}</span>
    </div>
  );
}

function LightboxCarousel({
  items,
  activeIndex,
  onChange,
  onMediaReady,
  resolvedAspectRatio,
  videoRefs,
}: LightboxCarouselProps) {
  const activeItem = items[activeIndex] ?? items[0];
  const pointerStartXRef = useRef<number | null>(null);
  const pointerDeltaXRef = useRef(0);

  if (!activeItem) {
    return null;
  }

  const goTo = (index: number) => {
    onChange((index + items.length) % items.length);
  };

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pointerStartXRef.current = event.clientX;
    pointerDeltaXRef.current = 0;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartXRef.current === null) {
      return;
    }

    pointerDeltaXRef.current = event.clientX - pointerStartXRef.current;
  };

  const handlePointerEnd = () => {
    if (pointerStartXRef.current === null) {
      return;
    }

    if (pointerDeltaXRef.current >= 56) {
      goPrev();
    } else if (pointerDeltaXRef.current <= -56) {
      goNext();
    }

    pointerStartXRef.current = null;
    pointerDeltaXRef.current = 0;
  };

  return (
    <div
      className="journal-carousel journal-carousel--lightbox"
      style={{
        maxWidth: `min(100%, calc(var(--journal-carousel-max-height) * ${resolvedAspectRatio}))`,
      }}
    >
      <div
        className="journal-carousel__viewport"
        onPointerCancel={handlePointerEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        style={{
          aspectRatio: resolvedAspectRatio,
        }}
      >
        <div
          className="journal-carousel__track"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {items.map((item, index) => (
            <div className="journal-carousel__slide" key={item.id}>
              {item.kind === "video" ? (
                <video
                  aria-label={item.alt}
                  className="journal-carousel__asset"
                  controls
                  loop
                  onLoadedMetadata={(event) => {
                    const { videoHeight, videoWidth } = event.currentTarget;

                    if (videoWidth > 0 && videoHeight > 0) {
                      onMediaReady(item.id, videoWidth, videoHeight);
                    }
                  }}
                  playsInline
                  preload={index === activeIndex ? "metadata" : "none"}
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                >
                  <source src={item.src} />
                </video>
              ) : (
                <img
                  alt={item.alt}
                  className="journal-carousel__asset"
                  decoding="async"
                  onLoad={(event) => {
                    const { naturalHeight, naturalWidth } = event.currentTarget;

                    if (naturalWidth > 0 && naturalHeight > 0) {
                      onMediaReady(item.id, naturalWidth, naturalHeight);
                    }
                  }}
                  src={item.lightboxSrc ?? item.src}
                />
              )}
            </div>
          ))}
        </div>

        {items.length > 1 ? (
          <>
            <button
              aria-label="Media precedente"
              className="journal-carousel__nav journal-carousel__nav--prev"
              onClick={goPrev}
              type="button"
            >
              <span aria-hidden="true">{"\u2039"}</span>
            </button>
            <button
              aria-label="Media successivo"
              className="journal-carousel__nav journal-carousel__nav--next"
              onClick={goNext}
              type="button"
            >
              <span aria-hidden="true">{"\u203A"}</span>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export function JournalGalleryPage() {
  const [lightboxState, setLightboxState] = useState<LightboxState | null>(null);
  const [measuredAspectRatios, setMeasuredAspectRatios] = useState<Record<string, number>>({});
  const lightboxVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const lightboxItems = lightboxState
    ? journalMediaArchiveByCategory[lightboxState.section]
    : [];
  const activeIndex = lightboxState?.index ?? 0;
  const activeItem = lightboxItems[activeIndex];
  const activeAspectRatio = activeItem
    ? measuredAspectRatios[activeItem.id] ?? resolveFallbackAspectRatio(activeItem)
    : mediaAspectValues.landscape;

  useEffect(() => {
    lightboxVideoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      if (lightboxState && index === activeIndex) {
        video.muted = true;
        void video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, lightboxState]);

  useEffect(() => {
    if (!lightboxState || lightboxItems.length === 0) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxState(null);
      }

      if (event.key === "ArrowLeft") {
        setLightboxState((current) =>
          current
            ? {
                ...current,
                index: (current.index - 1 + lightboxItems.length) % lightboxItems.length,
              }
            : current,
        );
      }

      if (event.key === "ArrowRight") {
        setLightboxState((current) =>
          current
            ? {
                ...current,
                index: (current.index + 1) % lightboxItems.length,
              }
            : current,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxItems.length, lightboxState]);

  const openLightbox = (section: JournalMediaCategory, index: number) => {
    lightboxVideoRefs.current = [];
    setLightboxState({ index, section });
  };

  const setLightboxIndex = (index: number) => {
    setLightboxState((current) => {
      if (!current) {
        return current;
      }

      const items = journalMediaArchiveByCategory[current.section];

      return {
        ...current,
        index: (index + items.length) % items.length,
      };
    });
  };

  const handleMediaReady = (itemId: string, width: number, height: number) => {
    if (width <= 0 || height <= 0) {
      return;
    }

    const aspectRatio = width / height;

    setMeasuredAspectRatios((current) => {
      if (current[itemId] && Math.abs(current[itemId] - aspectRatio) < 0.0001) {
        return current;
      }

      return {
        ...current,
        [itemId]: aspectRatio,
      };
    });
  };

  const scrollToSection = (section: JournalMediaCategory) => {
    document.getElementById(section)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className="page-stack journal-page journal-photo-page">
        <section className="page-section journal-page__hero journal-photo-page__hero">
          <p className="eyebrow">Journal / Galleria</p>
          <h1>Galleria</h1>
        </section>

        <section className="page-section">
          <div className="journal-photo-page__nav">
            {journalMediaSections.map((section) => (
              <button
                className="journal-photo-page__nav-button"
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                type="button"
              >
                {section.label}
              </button>
            ))}
          </div>
        </section>

        {journalMediaSections.map((section) => {
          const items = journalMediaArchiveByCategory[section.id];

          return (
            <section className="page-section journal-media-section" id={section.id} key={section.id}>
              <div className="journal-media-section__header">
                <span className="journal-media-section__badge">{section.label}</span>
              </div>

              <div className="journal-media-wall">
                {items.map((item, index) => (
                  <button
                    aria-label={`Apri ${item.alt} nel popup`}
                    className="journal-media-wall__item"
                    key={item.id}
                    onClick={() => openLightbox(section.id, index)}
                    type="button"
                  >
                    {item.kind === "video" ? (
                      <GalleryVideoPreview item={item} />
                    ) : (
                      <img
                        alt={item.alt}
                        className="journal-media-wall__asset"
                        decoding="async"
                        loading="lazy"
                        sizes={galleryImageSizes}
                        src={item.thumbnailSrc ?? item.src}
                        srcSet={
                          item.thumbnailSrc && item.lightboxSrc
                            ? `${item.thumbnailSrc} 720w, ${item.lightboxSrc} 1600w`
                            : undefined
                        }
                      />
                    )}
                  </button>
                ))}
              </div>
            </section>
          );
        })}

        <section className="cta-section">
          <div className="button-row journal-photo-page__actions">
            <Link className="button button-secondary button-small" to="/journal">
              Torna a Journal
            </Link>
          </div>
        </section>
      </div>

      {lightboxState && activeItem ? (
        <div aria-label="Popup media" className="journal-lightbox" role="dialog" aria-modal="true">
          <button
            aria-label="Chiudi popup"
            className="journal-lightbox__backdrop"
            onClick={() => setLightboxState(null)}
            type="button"
          />

          <div className="journal-lightbox__dialog">
            <div className="journal-lightbox__topbar">
              <div className="journal-lightbox__actions">
                <a
                  className="journal-lightbox__link"
                  href={activeItem.src}
                  rel="noreferrer"
                  target="_blank"
                >
                  Apri file
                </a>
                <button
                  aria-label="Chiudi popup"
                  className="journal-lightbox__close"
                  onClick={() => setLightboxState(null)}
                  type="button"
                >
                  <span aria-hidden="true">{"\u00D7"}</span>
                </button>
              </div>
            </div>

            <LightboxCarousel
              activeIndex={activeIndex}
              items={lightboxItems}
              onChange={setLightboxIndex}
              onMediaReady={handleMediaReady}
              resolvedAspectRatio={activeAspectRatio}
              videoRefs={lightboxVideoRefs}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
