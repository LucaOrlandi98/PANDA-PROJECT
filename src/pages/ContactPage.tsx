import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { SectionIntro } from "../components/SectionIntro";
import { contactChannels } from "../data/siteContent";
import { asset } from "../lib/asset";

export function ContactPage() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Contatti"
        title="Scrivimi se serve davvero"
        lead="Tappe, contatti, supporti tecnici o collaborazioni sensate. Meglio diretto che generico."
        image={asset("assets/images/panda-hero-snow.jpg")}
        status="Canali essenziali"
      />

      <section className="page-section">
        <SectionIntro
          kicker="Contatto"
          title="Tre modi utili di entrare"
          text="Dietro le quinte, supporto tecnico e suggerimenti pratici."
        />
        <div className="card-grid contact-grid">
          {contactChannels.map((channel) => (
            <article className="contact-card action-card" key={channel.label}>
              <p className="feature-label">{channel.label}</p>
              <h3>{channel.value}</h3>
              <p>{channel.note}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Prima di scrivere"
        title="Meglio pratico che generico"
        text="Una tappa, un contatto, un errore evitabile o un aiuto tecnico valgono piu di un messaggio vago."
        primary={{ label: "Apri Support", to: "/support" }}
        secondary={{ label: "Apri Home", to: "/" }}
      />
    </div>
  );
}
