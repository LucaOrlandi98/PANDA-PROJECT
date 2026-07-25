import { Link } from "react-router-dom";
import { isRouteVisible, isSectionVisible, pickVisibleRoute } from "../data/temporarySite";

export function ContactPage() {
  const journalLink = isRouteVisible("/journal") ? "/journal" : undefined;
  const fallbackLink = pickVisibleRoute(["/", "/route"]);

  return (
    <div className="page-stack">
      <section className="page-section journal-page__hero">
        <p className="eyebrow">Contatti</p>
        <h1>Contatti</h1>
        <p className="journal-page__lead">
          Per ora il canale diretto piu semplice resta Instagram.
        </p>
      </section>

      {isSectionVisible("contact.cta") ? (
        <section className="cta-section">
          <div className="button-row">
            <a
              className="button button-primary"
              href="https://www.instagram.com/lucaorlandi____/"
              rel="noreferrer"
              target="_blank"
            >
              Apri Instagram
            </a>
            {journalLink ? (
              <Link className="button button-secondary" to={journalLink}>
                Apri Journal
              </Link>
            ) : fallbackLink ? (
              <Link className="button button-secondary" to={fallbackLink}>
                Vai a una sezione attiva
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
