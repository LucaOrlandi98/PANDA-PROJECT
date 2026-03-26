import { Component, Suspense, lazy, useEffect, useState, type ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FooterNavMobile } from "./components/FooterNavMobile";
import { MenuSheet } from "./components/MenuSheet";
import { menuNav, primaryNav } from "./data/siteContent";

const loadHomePage = () =>
  import("./pages/HomePage").then((module) => ({
    default: module.HomePage,
  }));
const loadPandaPage = () =>
  import("./pages/PandaPage").then((module) => ({
    default: module.PandaPage,
  }));
const loadRoutePage = () =>
  import("./pages/RoutePage").then((module) => ({
    default: module.RoutePage,
  }));
const loadJournalPage = () =>
  import("./pages/JournalPage").then((module) => ({
    default: module.JournalPage,
  }));
const loadJournalGalleryPage = () =>
  import("./pages/JournalGalleryPage").then((module) => ({
    default: module.JournalGalleryPage,
  }));
const loadJournalLogPage = () =>
  import("./pages/JournalLogPage").then((module) => ({
    default: module.JournalLogPage,
  }));
const loadJournalOtherPage = () =>
  import("./pages/JournalOtherPage").then((module) => ({
    default: module.JournalOtherPage,
  }));
const loadContactPage = () =>
  import("./pages/ContactPage").then((module) => ({
    default: module.ContactPage,
  }));

const HomePage = lazy(loadHomePage);
const PandaPage = lazy(loadPandaPage);
const RoutePage = lazy(loadRoutePage);
const JournalPage = lazy(loadJournalPage);
const JournalGalleryPage = lazy(loadJournalGalleryPage);
const JournalLogPage = lazy(loadJournalLogPage);
const JournalOtherPage = lazy(loadJournalOtherPage);
const ContactPage = lazy(loadContactPage);

const routePreloaders = [
  loadHomePage,
  loadPandaPage,
  loadRoutePage,
  loadJournalPage,
  loadJournalGalleryPage,
  loadJournalLogPage,
  loadJournalOtherPage,
  loadContactPage,
] as const;

const INSTAGRAM_URL = "https://www.instagram.com/lucaorlandi____/";
const CONTACT_NAV_ITEM = {
  label: "Contatti",
  to: "/contact",
  description: "Come scrivermi o proporre qualcosa.",
} as const;

const pageLabels: Record<string, string> = {
  "/": "Home",
  "/panda": "About",
  "/route": "Roadbook",
  "/journal": "Journal",
  "/journal/foto": "Foto",
  "/journal/diario": "Diario di bordo",
  "/journal/altro": "Varie",
  "/contact": "Contatti",
};

const revealItemSelector = [
  ".card-grid > *",
  ".home-links-grid > *",
  ".journal-hub-grid > *",
  ".roadbook-page__metrics > *",
  ".timeline > *",
  ".journal-media-wall__item",
  ".button-row > *",
  ".journal-photo-page__nav-button",
].join(", ");

const revealSelector = [
  ".hero-content",
  ".section-intro",
  ".journal-page__hero",
  ".roadbook-page__intro",
  ".coming-soon",
  ".journal-photo-page__nav",
  ".journal-media-section__header",
  ".hero-media",
  ".map-frame",
  ".live-map-page__frame",
  revealItemSelector,
].join(", ");

function getPrimarySection(pathname: string) {
  if (pathname.startsWith("/journal")) {
    return "/journal";
  }

  return primaryNav.find((item) => item.to === pathname)?.to ?? pathname;
}

function RouteLoader() {
  return (
    <div className="page-stack page-stack--loading">
      <section className="page-section page-loading app-route-loader">
        <p className="eyebrow">Loading page</p>
        <div className="coming-soon__pulse" aria-hidden="true">
          <span className="coming-soon__pulse-core" />
        </div>
      </section>
    </div>
  );
}

type RouteBoundaryProps = {
  children: ReactNode;
  resetKey: string;
};

type RouteBoundaryState = {
  hasError: boolean;
};

class RouteBoundary extends Component<RouteBoundaryProps, RouteBoundaryState> {
  state: RouteBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: RouteBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
    window.setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-stack coming-soon-page">
          <section className="page-section coming-soon app-route-fallback">
            <p className="eyebrow">Errore di caricamento</p>
            <div className="coming-soon__pulse" aria-hidden="true">
              <span className="coming-soon__pulse-core" />
            </div>
            <h1>Pagina non disponibile</h1>
            <p className="app-route-fallback__text">
              Il contenuto non si e caricato correttamente. Puoi riprovare o tornare alla home.
            </p>
            <div className="button-row app-route-fallback__actions">
              <button
                className="button button-secondary button-small"
                onClick={this.handleRetry}
                type="button"
              >
                Riprova
              </button>
              <a className="button button-secondary button-small" href="#/">
                Torna alla home
              </a>
            </div>
          </section>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppShell() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";
  const isRoadbook = location.pathname === "/route";
  const activePrimarySection = getPrimarySection(location.pathname);
  const currentLabel = pageLabels[location.pathname] ?? "Panda Project";
  const visiblePrimaryNav = primaryNav.filter(
    (item) => item.to !== activePrimarySection,
  );
  const menuPrimaryNav = location.pathname.startsWith("/journal")
    ? primaryNav
    : visiblePrimaryNav;
  const desktopNavItems =
    location.pathname === "/contact"
      ? visiblePrimaryNav
      : [...visiblePrimaryNav, CONTACT_NAV_ITEM];

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: {
          saveData?: boolean;
        };
      }
    ).connection;

    if (connection?.saveData) {
      return;
    }

    const timer = window.setTimeout(() => {
      routePreloaders.forEach((loadRoute) => {
        void loadRoute().catch(() => undefined);
      });
    }, 650);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const root = document.getElementById("content");
    if (!root) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const applyRevealMetadata = () => {
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>(revealSelector),
      );

      nodes.forEach((node) => {
        const mode = node.matches(".hero-media, .map-frame, .live-map-page__frame")
          ? "scale"
          : node.matches(".timeline > *")
            ? "side"
            : "up";
        const delayIndex = node.matches(revealItemSelector)
          ? Math.min(
              Array.from(node.parentElement?.children ?? []).indexOf(node),
              5,
            )
          : 0;

        node.dataset.reveal = mode;
        node.style.setProperty(
          "--reveal-delay",
          `${delayIndex === 0 ? 0 : 80 + delayIndex * 60}ms`,
        );

        if (mediaQuery.matches) {
          node.classList.add("is-visible");
          return;
        }

        if (!node.classList.contains("is-visible")) {
          observer?.observe(node);
        }
      });
    };

    if (!mediaQuery.matches) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            const target = entry.target as HTMLElement;
            target.classList.add("is-visible");
            observer?.unobserve(target);
          });
        },
        {
          threshold: 0.14,
          rootMargin: "0px 0px -8% 0px",
        },
      );
    }

    frame = window.requestAnimationFrame(applyRevealMetadata);
    mutationObserver = new MutationObserver(() => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(applyRevealMetadata);
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#content">
        Vai al contenuto
      </a>

      <MenuSheet
        currentLabel={currentLabel}
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        primaryItems={menuPrimaryNav}
        secondaryItems={menuNav}
      />
      <FooterNavMobile
        currentLabel={currentLabel}
        instagramUrl={INSTAGRAM_URL}
        isHome={isHome}
        items={desktopNavItems}
        onMenuOpen={() => setMenuOpen(true)}
      />

      <main
        className={`page-shell${isHome ? " page-shell--home" : ""}${isRoadbook ? " page-shell--roadbook" : ""}`}
        id="content"
      >
        <RouteBoundary resetKey={location.pathname}>
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<Navigate replace to="/panda" />} path="/project" />
              <Route element={<PandaPage />} path="/panda" />
              <Route element={<RoutePage />} path="/route" />
              <Route element={<Navigate replace to="/route" />} path="/live-map" />
              <Route element={<JournalPage />} path="/journal" />
              <Route element={<JournalGalleryPage />} path="/journal/foto" />
              <Route element={<JournalLogPage />} path="/journal/diario" />
              <Route element={<JournalOtherPage />} path="/journal/altro" />
              <Route
                element={<Navigate replace to="/journal/altro" />}
                path="/resources"
              />
              <Route element={<Navigate replace to="/contact" />} path="/support" />
              <Route
                element={<Navigate replace to="/contact" />}
                path="/partners"
              />
              <Route element={<ContactPage />} path="/contact" />
            </Routes>
          </Suspense>
        </RouteBoundary>
      </main>
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
