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

export type JournalMediaItem = {
  id: string;
  alt: string;
  kind: JournalMediaKind;
  orientation: JournalMediaOrientation;
  src: string;
};
