import { Link } from "react-router-dom";

export function JournalOtherPage() {
  return (
    <div className="page-stack coming-soon-page">
      <section className="page-section coming-soon">
        <p className="eyebrow">Journal / Sezione 03</p>
        <div className="coming-soon__pulse" aria-hidden="true">
          <span className="coming-soon__pulse-core" />
        </div>
        <h1>Coming soon</h1>
        <div className="button-row">
          <Link className="button button-secondary button-small" to="/journal">
            Torna a Journal
          </Link>
        </div>
      </section>
    </div>
  );
}
