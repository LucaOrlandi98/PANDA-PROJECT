import { Link } from "react-router-dom";
import { journalGallery } from "../data/journalContent";
import type { JournalMediaItem } from "../types/content";

type JournalMediaCardProps = {
  item: JournalMediaItem;
  priority?: boolean;
};

function JournalMediaCard({ item, priority = false }: JournalMediaCardProps) {
  return (
    <figure className={`journal-media-card journal-media-card--${item.orientation}`}>
      <div className="journal-media-card__frame">
        {item.kind === "video" ? (
          <video aria-label={item.alt} className="journal-media-card__asset" controls playsInline preload="none">
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
    </figure>
  );
}

export function JournalGalleryPage() {
  return (
    <div className="page-stack journal-page journal-media-page">
      <section className="page-section journal-page__hero">
        <p className="eyebrow">Journal / Sezione 01</p>
        <h1>Foto &amp; Video</h1>
        <p className="journal-page__lead">
          Una griglia essenziale, leggera e pronta per foto e video verticali o orizzontali.
        </p>
        <div className="button-row">
          <Link className="button button-secondary button-small" to="/journal">
            Torna a Journal
          </Link>
        </div>
      </section>

      <section className="page-section journal-block">
        <div className="journal-media-grid">
          {journalGallery.map((item, index) => (
            <JournalMediaCard item={item} key={item.id} priority={index < 2} />
          ))}
        </div>
      </section>
    </div>
  );
}
