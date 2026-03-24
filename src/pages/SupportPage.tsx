import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { SectionIntro } from "../components/SectionIntro";
import { SupportCard } from "../components/SupportCard";
import { partnerNotes, supportOptions } from "../data/siteContent";
import { asset } from "../lib/asset";

export function SupportPage() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Support / Community"
        title="Seguire il progetto sul serio"
        lead="Aggiornamenti, supporto e suggerimenti utili. Community prima, rumore dopo."
        image={asset("assets/images/panda-front-garage.jpg")}
        status="Community first"
      />

      <section className="page-section">
        <SectionIntro
          kicker="Community"
          title="Pochi ingressi, chiari"
          text="Seguire, supportare, contribuire. Tutto senza trasformare il sito in una campagna."
        />
        <div className="card-grid support-grid">
          {supportOptions.map((item) => (
            <SupportCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionIntro
          kicker="Partner"
          title="Collaborazioni ordinate, non dominanti"
          text="La vecchia idea garage puo restare come sezione dedicata, ma non guida piu l'identita del sito."
        />
        <div className="notes-list">
          {partnerNotes.map((note) => (
            <article className="copy-card" key={note}>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Entra"
        title="Community piccola ma reale"
        text="Meglio pochi ingressi chiari che molte CTA deboli: aggiornamenti, supporto e scambio utile."
        primary={{ label: "Apri Contatti", to: "/contact" }}
        secondary={{ label: "Apri Partner", to: "/partners" }}
      />
    </div>
  );
}
