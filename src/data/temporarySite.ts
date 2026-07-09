import type { LinkCard, NavItem } from "../types/content";

export type TemporaryRouteId =
  | "/"
  | "/panda"
  | "/route"
  | "/journal"
  | "/journal/foto"
  | "/journal/diario"
  | "/journal/altro"
  | "/contact";

export type TemporarySectionId =
  | "home.supportWidget"
  | "home.hubCards"
  | "panda.timeline"
  | "panda.cta"
  | "route.googleMap"
  | "route.liveMap"
  | "route.metrics"
  | "journal.hub"
  | "journal.galleryNav"
  | "journal.gallery.preparazione"
  | "journal.gallery.greciaTurchia"
  | "journal.gallery.cta"
  | "journal.log.entries"
  | "journal.log.cta"
  | "journal.other.nav"
  | "journal.other.equipment"
  | "journal.other.mechanical"
  | "journal.other.cta"
  | "contact.cta";

export type TemporarySiteMode = "ripristino" | "oscura";

type TemporarySitePreset = {
  hiddenHomeCards: readonly TemporaryRouteId[];
  hiddenRoutes: readonly TemporaryRouteId[];
  hiddenSections: readonly TemporarySectionId[];
};

const appRoutes: readonly TemporaryRouteId[] = [
  "/",
  "/panda",
  "/route",
  "/journal",
  "/journal/foto",
  "/journal/diario",
  "/journal/altro",
  "/contact",
];

// Chat keywords:
// - `ripristino`: restore the site to the current complete state.
// - `oscura`: apply the temporary removals listed in the preset below.
export const activeTemporarySiteMode: TemporarySiteMode = "ripristino";

export const temporarySitePresets = {
  ripristino: {
    hiddenHomeCards: [],
    hiddenRoutes: [],
    hiddenSections: [],
  },
  oscura: {
    hiddenHomeCards: ["/panda"],
    hiddenRoutes: [
      // "/contact",
    ],
    hiddenSections: [
      "home.supportWidget",
    ],
  },
} satisfies Record<TemporarySiteMode, TemporarySitePreset>;

export const temporarySiteConfig = temporarySitePresets[activeTemporarySiteMode];

const hiddenHomeCardSet = new Set<TemporaryRouteId>(temporarySiteConfig.hiddenHomeCards);
const hiddenRouteSet = new Set<TemporaryRouteId>(temporarySiteConfig.hiddenRoutes);
const hiddenSectionSet = new Set<TemporarySectionId>(temporarySiteConfig.hiddenSections);

export function isRouteVisible(route: TemporaryRouteId) {
  return !hiddenRouteSet.has(route);
}

export function isSectionVisible(section: TemporarySectionId) {
  return !hiddenSectionSet.has(section);
}

export function isHomeCardVisible(route: TemporaryRouteId) {
  return !hiddenHomeCardSet.has(route) && isRouteVisible(route);
}

export function pickVisibleRoute(routes: readonly TemporaryRouteId[]) {
  return routes.find((route) => isRouteVisible(route));
}

function isAppRoute(path: string): path is TemporaryRouteId {
  return appRoutes.includes(path as TemporaryRouteId);
}

export function filterVisibleNavItems<T extends NavItem>(items: readonly T[]) {
  return items.filter((item) => !isAppRoute(item.to) || isRouteVisible(item.to));
}

export function filterVisibleLinkCards<T extends LinkCard>(items: readonly T[]) {
  return items.filter((item) => !isAppRoute(item.to) || isRouteVisible(item.to));
}

export function filterVisibleHomeCards<T extends LinkCard>(items: readonly T[]) {
  return items.filter((item) => !isAppRoute(item.to) || isHomeCardVisible(item.to));
}
