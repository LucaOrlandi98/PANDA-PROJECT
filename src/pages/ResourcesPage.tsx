import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { ResourceCard } from "../components/ResourceCard";
import { SectionIntro } from "../components/SectionIntro";
import { resources } from "../data/siteContent";
import { asset } from "../lib/asset";

export function ResourcesPage() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Resources"
        title="Valore pratico"
        lead="Checklist, setup, ricambi e budget. Il progetto deve restare utile anche prima della partenza."
        image={asset("assets/images/panda-axle.jpg")}
        status="Base pratica"
      />

      <section className="page-section">
        <SectionIntro
          kicker="Base utile"
          title="Quello che resta anche fuori dalla storia"
          text="Liste corte, scelte concrete, niente rumore."
        />
        <div className="card-grid resources-grid">
          {resources.map((item) => (
            <ResourceCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Dal pratico al vivo"
        title="Le risorse devono nascere dal lavoro vero"
        text="Ogni lezione utile dovrebbe venire da un test, da un errore o da un passaggio reale della preparazione."
        primary={{ label: "Apri Journal", to: "/journal" }}
        secondary={{ label: "Apri Support", to: "/support" }}
      />
    </div>
  );
}
