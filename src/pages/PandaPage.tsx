import { Link } from "react-router-dom";
import { SectionIntro } from "../components/SectionIntro";
import { TimelineVertical } from "../components/TimelineVertical";
import { VehicleSpecCard } from "../components/VehicleSpecCard";
import { pandaSpecs, timeline } from "../data/siteContent";

export function PandaPage() {
  const visibleSpecs = pandaSpecs.filter(
    (item) => item.label !== "Stato" && item.label !== "Direzione",
  );

  return (
    <div className="page-stack">
      <section className="page-section">
        <SectionIntro
          kicker="Scheda rapida"
          title="Coordinate utili"
        />
        <div className="card-grid">
          {visibleSpecs.map((item) => (
            <VehicleSpecCard key={item.label} {...item} />
          ))}
        </div>
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
