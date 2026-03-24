import { Link } from "react-router-dom";
import { journalGallery } from "../data/journalContent";
import type { JournalMediaItem, JournalMediaOrientation } from "../types/content";

const orientationLabels: Record<JournalMediaOrientation, string> = {
  landscape: "Orizzontale",
  portrait: "Verticale",
  square: "Quadrato",
};

const mediaKindLabels = {
  photo: "Foto",
  video: "Video",
} as const;

type JournalMediaCardProps = {
  item: JournalMediaItem;
  priority?: boolean;
  variant?: "archive" | "lead" | "support";
};

function JournalMediaCard({
  item,
  priority = false,
  variant = "archive",
}: JournalMediaCardProps) {
  return (
    <figure
      className={`journal-media-card journal-media-card--${item.orientation} ${
        variant === "lead" ? "journal-media-card--lead" : ""
      }`}
    >
      <div className="journal-media-card__frame">
        {item.kind === "video" ? (
          <video
            aria-label={item.alt}
            className="journal-media-card__asset"
            controls
            playsInline
            poster={item.poster}
            preload={priority ? "auto" : "metadata"}
          >
            <source src={item.src} />
          </video>
        ) : (
          <img
            alt={item.alt}
            className="journal-media-card__asset"
            decoding="async"
            loading={priority ? "eager" : "lazy"}
            src={item.src}
          />
        )}
      </div>

      <figcaption className="journal-media-card__body">
        <div className="journal-media-card__meta">
          <span className={`journal-media-card__tag journal-media-card__tag--${item.kind}`}>
            {mediaKindLabels[item.kind]}
          </span>
          <span className="journal-media-card__tag">
            {orientationLabels[item.orientation]}
          </span>
          {item.kind === "video" && item.duration ? (
            <span className="journal-media-card__tag">{item.duration}</span>
          ) : null}
        </div>

        <strong>{item.title}</strong>
        <p>{item.caption}</p>
      </figcaption>
    </figure>
  );
}

export function JournalGalleryPage() {
  const [leadMedia, ...restMedia] = journalGallery;
  const featuredMedia = restMedia.slice(0, 2);
  const archiveMedia = restMedia.slice(2);
  const photoCount = journalGallery.filter((item) => item.kind === "photo").length;
  const videoCount = journalGallery.filter((item) => item.kind === "video").length;
  const activeOrientations = (["portrait", "landscape", "square"] as const)
    .filter((orientation) =>
      journalGallery.some((item) => item.orientation === orientation),
    )
    .map((orientation) => orientationLabels[orientation])
    .join(" / ");

  return (
    <div className="page-stack journal-page journal-media-page">
      <section className="page-section journal-page__hero">
        <p className="eyebrow">Journal / Sezione 01</p>
        <h1>Foto &amp; Video</h1>
        <p className="journal-page__lead">
          Una libreria media costruita per crescere bene: scatti orizzontali in evidenza,
          verticali nei moduli stretti e video pronti a entrare nella stessa struttura senza
          rompere il ritmo della pagina.
        </p>
        <div className="journal-media-page__stats">
          <article className="journal-media-stat">
            <span>Archivio</span>
            <strong>{journalGallery.length} media</strong>
          </article>
          <article className="journal-media-stat">
            <span>Formati</span>
            <strong>{activeOrientations}</strong>
          </article>
          <article className="journal-media-stat">
            <span>Mix</span>
            <strong>{videoCount ? `${photoCount} foto / ${videoCount} video` : "Foto live / video ready"}</strong>
          </article>
        </div>
        <div className="button-row">
          <Link className="button button-secondary button-small" to="/journal">
            Torna a Journal
          </Link>
        </div>
      </section>

      {leadMedia ? (
        <section className="page-section journal-block">
          <div className="journal-media-stage">
            <JournalMediaCard item={leadMedia} priority variant="lead" />

            <div className="journal-media-rail">
              {featuredMedia.map((item, index) => (
                <JournalMediaCard
                  item={item}
                  key={item.id}
                  priority={index === 0}
                  variant="support"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {archiveMedia.length ? (
        <section className="page-section journal-block">
          <header className="journal-block__header">
            <p className="eyebrow">Archivio aperto</p>
            <h2>Archivio Media</h2>
            <p>
              L&apos;archivio alterna moduli larghi, verticali e compatti. Quando aggiungi un
              video, entra nella stessa card con poster, controlli e didascalia coerente.
            </p>
          </header>

          <div className="journal-media-grid">
            {archiveMedia.map((item) => (
              <JournalMediaCard item={item} key={item.id} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
