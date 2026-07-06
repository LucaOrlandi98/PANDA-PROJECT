import { Link } from "react-router-dom";
import { journalLogEntries } from "../data/journalContent";
import {
  isRouteVisible,
  isSectionVisible,
  pickVisibleRoute,
} from "../data/temporarySite";

export function JournalLogPage() {
  const journalLink = isRouteVisible("/journal") ? "/journal" : undefined;
  const routeLink = isRouteVisible("/route") ? "/route" : undefined;
  const fallbackLink = pickVisibleRoute(["/", "/panda", "/contact"]);

  return (
    <div className="page-stack">
      <section className="page-section journal-page__hero">
        <p className="eyebrow">Journal / Diario di bordo</p>
        <h1>Diario di bordo</h1>
      </section>

      {isSectionVisible("journal.log.entries") ? (
        <section className="page-section journal-media-section">
          <div className="journal-media-section__header">
            <span className="journal-media-section__badge">Articoli</span>
          </div>

          <div className="journal-other-stack journal-log-list">
            {journalLogEntries.map((entry) => (
              <article className="journal-other-group journal-other-group--card" key={entry.title}>
                <details className="journal-other-disclosure journal-log-entry__disclosure">
                  <summary className="journal-other-disclosure__summary journal-log-entry__summary">
                    <span className="journal-other-disclosure__title">{entry.title}</span>
                    <span
                      aria-hidden="true"
                      className="journal-other-disclosure__icon"
                    >
                      <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
                        <path
                          d="M3.5 6 8 10.5 12.5 6"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.6"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="journal-other-group__body journal-other-disclosure__body">
                    <p className="journal-log-entry__meta">{entry.label} - {entry.meta}</p>
                    {entry.paragraphs.map((paragraph, index) => (
                      <p key={`${entry.title}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {isSectionVisible("journal.log.cta") &&
      (journalLink || routeLink || fallbackLink) ? (
        <section className="cta-section">
          <div className="button-row">
            {journalLink ? (
              <Link className="button button-secondary button-small" to={journalLink}>
                Torna a Journal
              </Link>
            ) : null}
            {routeLink ? (
              <Link className="button button-secondary button-small" to={routeLink}>
                Apri Roadbook
              </Link>
            ) : fallbackLink ? (
              <Link className="button button-secondary button-small" to={fallbackLink}>
                Vai a una sezione attiva
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
