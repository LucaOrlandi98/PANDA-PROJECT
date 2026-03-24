import { CTASection } from "../components/CTASection";
import { PageHeader } from "../components/PageHeader";
import { SectionIntro } from "../components/SectionIntro";
import { partnerNotes } from "../data/siteContent";
import { asset } from "../lib/asset";

export function PartnersPage() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Partner / Sponsor"
        title="Collaborazioni nel posto giusto"
        lead="Partner e sponsor hanno spazio solo se aiutano mezzo, sicurezza o contenuti."
        image={asset("assets/images/panda-underbody.jpg")}
        status="Sezione secondaria"
      />

      <section className="page-section">
        <SectionIntro
          kicker="Riposizionamento"
          title="Dal vecchio garage a un ruolo piu sensato"
          text="Le collaborazioni restano, ma il sito mette davanti progetto, About, Roadbook, Journal e Resources."
        />
        <div className="notes-list">
          {partnerNotes.map((note) => (
            <article className="copy-card" key={note}>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="split-copy">
          <article className="copy-card">
            <h3>Partner utili</h3>
            <p>
              Officina, componenti, ricambi, sicurezza, strumenti di rotta,
              supporti tecnici e media che aggiungono valore vero.
            </p>
          </article>
          <article className="copy-card">
            <h3>Formato consigliato</h3>
            <p>
              Collaborazioni raccontate come parte della preparazione, non come
              vetrina indipendente che mangia il tono del progetto.
            </p>
          </article>
        </div>
      </section>

      <CTASection
        eyebrow="Contatto"
        title="Se la collaborazione aiuta il progetto, ha spazio"
        text="Se serve davvero alla Panda, alla rotta o alla qualita dei contenuti, allora ha senso parlarne."
        primary={{ label: "Apri Contatti", to: "/contact" }}
      />
    </div>
  );
}
