import { Link } from "react-router-dom";
import { SectionIntro } from "../components/SectionIntro";
import { TimelineVertical } from "../components/TimelineVertical";
import { timeline } from "../data/siteContent";

export function PandaPage() {
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

      <section className="page-section">
        <SectionIntro
          title="Timeline progetto"
          text="Last Update 23/06/2026."
        />
        <TimelineVertical items={timeline} />
      </section>

      <section className="cta-section">
        <div className="button-row">
          <Link className="button button-primary" to="/route">
            Apri Roadbook
          </Link>
          <Link className="button button-secondary" to="/journal">
            Apri Journal
          </Link>
        </div>
      </section>
    </div>
  );
}
