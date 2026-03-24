import { FeatureCard } from "../components/FeatureCard";
import { MobileHero } from "../components/MobileHero";
import { hubCards } from "../data/siteContent";
import { asset } from "../lib/asset";

export function HomePage() {
  return (
    <div className="page-stack page-stack--home">
      <MobileHero
        className="hero-card--home"
        eyebrow="Panda Project"
        title="Panda Anna"
        image={asset("assets/images/panda-hero-snow.jpg")}
        modelSrc="https://dl.dropboxusercontent.com/scl/fi/lzrhfrj36kyjmq6166g4x/PANDA-3D.glb?rlkey=11rwtnihpn3ry6x4hjzo3injv"
      />

      <section className="page-section page-section--home-links">
        <div className="card-grid home-links-grid">
          {hubCards.map((card) => (
            <FeatureCard key={card.to} {...card} />
          ))}
        </div>
      </section>
    </div>
  );
}
