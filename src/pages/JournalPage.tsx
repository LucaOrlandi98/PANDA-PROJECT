import { Link } from "react-router-dom";
import { journalSections } from "../data/journalContent";

export function JournalPage() {
  return (
    <div className="page-stack journal-page">
      <section className="page-section journal-page__hero">
        <p className="eyebrow">Journal</p>
        <h1>Journal</h1>
        <p className="journal-page__lead">
          Tre aree chiare per dare al progetto un archivio leggibile: foto attive, diario di
          bordo e materiali laterali in aggiornamento.
        </p>
      </section>

      <section className="page-section">
        <div className="journal-hub-grid">
          {journalSections.map((section) => (
            <Link className="journal-hub-card action-card" key={section.to} to={section.to}>
              <p className="eyebrow">{section.label}</p>
              <h2>{section.title}</h2>
              <div className="journal-hub-card__footer">
                <span>{section.meta}</span>
                <span className="journal-hub-card__arrow" aria-hidden="true">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 16L16 8M9.5 8H16V14.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
