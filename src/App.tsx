import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FooterNavMobile } from "./components/FooterNavMobile";
import { MenuSheet } from "./components/MenuSheet";
import { menuNav, primaryNav } from "./data/siteContent";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { JournalGalleryPage } from "./pages/JournalGalleryPage";
import { JournalLogPage } from "./pages/JournalLogPage";
import { JournalOtherPage } from "./pages/JournalOtherPage";
import { JournalPage } from "./pages/JournalPage";
import { PandaPage } from "./pages/PandaPage";
import { PartnersPage } from "./pages/PartnersPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { RoutePage } from "./pages/RoutePage";
import { SupportPage } from "./pages/SupportPage";

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
  "/journal/altro": "Altro",
  "/resources": "Resources",
  "/support": "Support",
  "/partners": "Partner",
  "/contact": "Contatti",
};

function getPrimarySection(pathname: string) {
  if (pathname.startsWith("/journal")) {
    return "/journal";
  }

  return primaryNav.find((item) => item.to === pathname)?.to ?? pathname;
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
  const desktopNavItems =
    location.pathname === "/contact"
      ? visiblePrimaryNav
      : [...visiblePrimaryNav, CONTACT_NAV_ITEM];

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        primaryItems={visiblePrimaryNav}
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
          <Route element={<ResourcesPage />} path="/resources" />
          <Route element={<SupportPage />} path="/support" />
          <Route element={<PartnersPage />} path="/partners" />
          <Route element={<ContactPage />} path="/contact" />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
