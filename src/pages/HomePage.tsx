import { FeatureCard } from "../components/FeatureCard";
import { GoFundMeWidget } from "../components/GoFundMeWidget";
import { MobileHero } from "../components/MobileHero";
import { hubCards } from "../data/siteContent";
import {
  filterVisibleLinkCards,
  isSectionVisible,
} from "../data/temporarySite";
import { asset } from "../lib/asset";

export function HomePage() {
  const showSupportWidget = isSectionVisible("home.supportWidget");
  const visibleHubCards = filterVisibleLinkCards(hubCards);
  const heroClassName = "hero-card--home hero-card--home-no-aside";
  const homeLinksGridClassName = `card-grid home-links-grid${visibleHubCards.length === 2 ? " home-links-grid--two-up" : ""}`;
  const modelSrc = asset("assets/models/panda-3d.glb");
  const showHomeActions = showSupportWidget || visibleHubCards.length > 0;

  return (
    <div className="page-stack page-stack--home">
      <section className="page-section page-section--home-hero">
        <MobileHero
          className={heroClassName}
          eyebrow="Panda Project"
          image={asset("assets/images/panda-hero-snow.jpg")}
          modelSrc={modelSrc}
          title="Panda Anna"
        />
      </section>

      {showHomeActions ? (
        <section className="page-section page-section--home-links">
          <div
            className={`home-support-actions${showSupportWidget ? "" : " home-support-actions--links-only"}`}
          >
            {showSupportWidget ? (
              <div className="home-support-widget">
                <GoFundMeWidget />
              </div>
            ) : null}

            {visibleHubCards.length > 0 ? (
              <div className={homeLinksGridClassName}>
                {visibleHubCards.map((card) => (
                  <FeatureCard key={card.to} {...card} />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
