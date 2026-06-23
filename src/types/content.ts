export type NavItem = {
  label: string;
  to: string;
  description: string;
};

export type LinkCard = {
  buttonLabel?: string;
  title: string;
  to: string;
};

export type TimelineItem = {
  phase: string;
  title: string;
  description: string;
  status: "done" | "active" | "next";
};

export type VehicleSpec = {
  label: string;
  value: string;
  note?: string;
};

export type JournalMediaKind = "photo" | "video";

export type JournalMediaOrientation = "landscape" | "portrait" | "square";

export type JournalMediaCategory = "preparazione" | "test" | "viaggio";

export type JournalMediaItem = {
  id: string;
  alt: string;
  kind: JournalMediaKind;
  orientation: JournalMediaOrientation;
  category: JournalMediaCategory;
  src: string;
};

export type JournalReferenceLink = {
  label: string;
  href?: string;
  note?: string;
  placeholder?: boolean;
};

export type JournalReferenceGroup = {
  bullets?: JournalReferenceLink[];
  title: string;
  note?: string;
  links?: JournalReferenceLink[];
  status?: "coming-soon";
};

export type JournalLogEntry = {
  label: string;
  title: string;
  meta: string;
  paragraphs: string[];
};
