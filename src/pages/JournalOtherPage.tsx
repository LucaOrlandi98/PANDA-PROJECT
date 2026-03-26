import { Link } from "react-router-dom";
import {
  journalOtherEquipmentGroups,
  journalOtherMechanical,
  journalOtherPlaceholder,
} from "../data/journalContent";

const journalOtherNav = [
  {
    id: "attrezzatura",
    label: "Attrezzatura",
  },
  {
    id: "auto-meccanica",
    label: "Auto e meccanica",
  },
  {
    id: "documenti-logistica",
    label: "Documenti e logistica",
  },
] as const;

export function JournalOtherPage() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="page-stack journal-page journal-other-page">
      <section className="page-section journal-page__hero journal-photo-page__hero">
        <p className="eyebrow">Journal / Varie</p>
        <h1>Varie</h1>
      </section>

      <section className="page-section">
        <div className="journal-photo-page__nav">
          {journalOtherNav.map((item) => (
            <button
              className="journal-photo-page__nav-button"
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section
        className="page-section journal-media-section journal-media-section--equipment"
        id="attrezzatura"
      >
        <div className="journal-media-section__header">
          <span className="journal-media-section__badge">Attrezzatura</span>
        </div>

        <div className="journal-resource-list">
          <div className="journal-other-stack journal-other-stack--equipment">
            {journalOtherEquipmentGroups.map((group) => (
              <article className="journal-other-group" key={group.title}>
                <details className="journal-other-disclosure">
                  <summary className="journal-other-disclosure__summary">
                    <span className="journal-other-disclosure__title">{group.title}</span>
                    <span
                      aria-hidden="true"
                      className="journal-other-disclosure__icon"
                    >
                      <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
                        <path
                          d="M3.5 6 8 10.5 12.5 6"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.6"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="journal-other-group__body journal-other-disclosure__body">
                    {group.status === "coming-soon" ? (
                      <>
                        {group.note ? <p>{group.note}</p> : null}
                        <span className="journal-inline-status">Coming soon</span>
                      </>
                    ) : group.title === "Navigazione e varie" && group.links?.length ? (
                      <div className="journal-inline-linkstack">
                        {group.links.map((item) => (
                          <p className="journal-inline-linkline" key={item.label}>
                            {item.href ? (
                              <a href={item.href} rel="noreferrer" target="_blank">
                                {"\u2192"} {item.label}
                              </a>
                            ) : (
                              <span className="journal-placeholder-link">
                                {"\u2192"} {item.label}
                              </span>
                            )}
                          </p>
                        ))}
                      </div>
                    ) : group.title === "Allestimento" && group.links?.length ? (
                      <>
                        {group.note ? <p>{group.note}</p> : null}
                        <div className="journal-inline-linkstack">
                          {group.links.map((item) => (
                            <p className="journal-inline-linkline" key={item.label}>
                              {item.href ? (
                                <a href={item.href} rel="noreferrer" target="_blank">
                                  {"\u2192"} {item.label}
                                </a>
                              ) : (
                                <span className="journal-placeholder-link">
                                  {"\u2192"} {item.label}
                                </span>
                              )}
                            </p>
                          ))}
                        </div>
                        {group.bullets?.length ? (
                          <ul>
                            {group.bullets.map((item) => (
                              <li key={item.label}>
                                {item.href ? (
                                  <a href={item.href} rel="noreferrer" target="_blank">
                                    {item.label}
                                  </a>
                                ) : (
                                  <span className="journal-placeholder-link">{item.label}</span>
                                )}
                                {item.note ? <span>{item.note}</span> : null}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </>
                    ) : (
                      <>
                        {group.note ? <p>{group.note}</p> : null}
                        {group.links?.length === 1 && group.links[0]?.href ? (
                          <p className="journal-inline-linkline">
                            <a
                              href={group.links[0].href}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {"\u2192"} {group.links[0].label}
                            </a>
                          </p>
                        ) : group.links?.length ? (
                          <ul>
                            {group.links.map((item) => (
                              <li key={item.label}>
                                {item.href ? (
                                  <a href={item.href} rel="noreferrer" target="_blank">
                                    {item.label}
                                  </a>
                                ) : (
                                  <span className="journal-placeholder-link">{item.label}</span>
                                )}
                                {item.note ? <span>{item.note}</span> : null}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {group.bullets?.length ? (
                          <ul>
                            {group.bullets.map((item) => (
                              <li key={item.label}>
                                {item.href ? (
                                  <a href={item.href} rel="noreferrer" target="_blank">
                                    {item.label}
                                  </a>
                                ) : (
                                  <span className="journal-placeholder-link">{item.label}</span>
                                )}
                                {item.note ? <span>{item.note}</span> : null}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </>
                    )}
                  </div>
                </details>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="page-section journal-media-section journal-media-section--mechanical"
        id="auto-meccanica"
      >
        <div className="journal-media-section__header">
          <span className="journal-media-section__badge">Auto e meccanica</span>
        </div>

        <div className="journal-other-stack journal-other-stack--mechanical">
          {journalOtherMechanical.map((group) => (
            <article
              className="journal-other-group journal-other-group--card journal-other-group--checks"
              key={group.title}
            >
              <h2>{group.title}</h2>
              <div className="journal-other-group__body">
                <ul className="journal-checklist">
                  {group.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section journal-media-section" id="documenti-logistica">
        <div className="journal-media-section__header">
          <span className="journal-media-section__badge">
            {journalOtherPlaceholder.eyebrow}
          </span>
        </div>

        <article className="journal-other-group journal-other-group--placeholder">
          <h2>{journalOtherPlaceholder.title}</h2>
          <p>{journalOtherPlaceholder.note}</p>
          <ul>
            {journalOtherPlaceholder.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="cta-section">
        <div className="button-row journal-photo-page__actions">
          <Link className="button button-secondary button-small" to="/journal">
            Torna a Journal
          </Link>
        </div>
      </section>
    </div>
  );
}
