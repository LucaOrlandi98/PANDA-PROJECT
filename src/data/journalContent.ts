import { journalMediaArchive } from "./journalMediaArchive";

export const journalGallery = journalMediaArchive;

export const journalSections = [
  {
    label: "01",
    meta: `${journalGallery.length} media`,
    title: "Foto + Video",
    to: "/journal/foto",
  },
  {
    label: "02",
    meta: "coming soon",
    title: "Diario di bordo",
    to: "/journal/diario",
  },
  {
    label: "03",
    meta: "coming soon",
    title: "Altro",
    to: "/journal/altro",
  },
] as const;
