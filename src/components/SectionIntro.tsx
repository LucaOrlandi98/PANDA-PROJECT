type SectionIntroProps = {
  kicker?: string;
  title: string;
  text?: string;
};

export function SectionIntro({ kicker, title, text }: SectionIntroProps) {
  return (
    <header className="section-intro">
      {kicker ? <p className="eyebrow">{kicker}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </header>
  );
}
