import { Link } from "react-router-dom";
import { SectionIntro } from "../components/SectionIntro";
import { TimelineVertical } from "../components/TimelineVertical";
import { timeline } from "../data/siteContent";
import {
  isRouteVisible,
  isSectionVisible,
  pickVisibleRoute,
} from "../data/temporarySite";

export function PandaPage() {
  const routeLink = isRouteVisible("/route") ? "/route" : undefined;
  const journalLink = isRouteVisible("/journal") ? "/journal" : undefined;
  const ctaFallbackLink = pickVisibleRoute(["/", "/route", "/journal", "/contact"]);

  return (
    <div className="page-stack journal-page">
      <section className="page-section journal-page__hero">
        <p className="eyebrow">La Panda</p>
        <h1>La Panda</h1>
        <p className="journal-page__lead">
          La Panda non e soltanto il mezzo con cui viaggio, ma il simbolo di un modo diverso di
          viaggiare, con poco, senza avere tutto sotto controllo e lasciando spazio agli
          imprevisti.
        </p>
        <p className="journal-page__lead">
          Per dimostrare che non serve avere grandi mezzi, molti soldi o grande preparazione per
          vivere esperienze incredibili. Serve soltanto il coraggio di mettersi in gioco e
          partire.
        </p>
      </section>

      {isSectionVisible("panda.timeline") ? (
        <section className="page-section">
          <SectionIntro
            title="Timeline progetto"
            text="Last Update 23/06/2026."
          />
          <TimelineVertical items={timeline} />
        </section>
      ) : null}

      {isSectionVisible("panda.cta") &&
      (routeLink || journalLink || ctaFallbackLink) ? (
        <section className="cta-section">
          <div className="button-row">
            {routeLink ? (
              <Link className="button button-primary" to={routeLink}>
                Apri Roadbook
              </Link>
            ) : null}
            {journalLink ? (
              <Link className="button button-secondary" to={journalLink}>
                Apri Journal
              </Link>
            ) : ctaFallbackLink ? (
              <Link className="button button-secondary" to={ctaFallbackLink}>
                Vai a una sezione attiva
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
