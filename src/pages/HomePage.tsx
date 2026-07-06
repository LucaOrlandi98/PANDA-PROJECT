import { FeatureCard } from "../components/FeatureCard";
import { GoFundMeWidget } from "../components/GoFundMeWidget";
import { MobileHero } from "../components/MobileHero";
import { hubCards } from "../data/siteContent";
import {
  filterVisibleHomeCards,
  isSectionVisible,
} from "../data/temporarySite";
import { asset } from "../lib/asset";

export function HomePage() {
  const showSupportWidget = isSectionVisible("home.supportWidget");
  const visibleHubCards = filterVisibleHomeCards(hubCards);
  const heroClassName = `hero-card--home${showSupportWidget ? "" : " hero-card--home-no-aside"}`;
  const homeLinksGridClassName = `card-grid home-links-grid${visibleHubCards.length === 2 ? " home-links-grid--two-up" : ""}`;

  return (
    <div className="page-stack page-stack--home">
      <MobileHero
        aside={
          showSupportWidget ? (
            <div className="home-support-widget">
              <GoFundMeWidget />
            </div>
          ) : undefined
        }
        className={heroClassName}
        eyebrow="Panda Project"
        title="Panda Anna"
        image={asset("assets/images/panda-hero-snow.jpg")}
        modelSrc="https://dl.dropboxusercontent.com/scl/fi/lzrhfrj36kyjmq6166g4x/PANDA-3D.glb?rlkey=11rwtnihpn3ry6x4hjzo3injv"
      />

      {isSectionVisible("home.hubCards") && visibleHubCards.length > 0 ? (
        <section className="page-section page-section--home-links">
          <div className={homeLinksGridClassName}>
            {visibleHubCards.map((card) => (
              <FeatureCard key={card.to} {...card} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
