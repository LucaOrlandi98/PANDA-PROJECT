import { asset } from "../lib/asset";
import type { JournalMediaCategory, JournalMediaItem } from "../types/content";

export const journalMediaSections = [
  {
    id: "preparazione",
    label: "Preparazione",
  },
  {
    id: "test",
    label: "Test",
  },
  {
    id: "viaggio",
    label: "Viaggio",
  },
] as const satisfies readonly { id: JournalMediaCategory; label: string }[];

const journalPhotoArchive: readonly JournalMediaItem[] = [
  {
    alt: "Dettaglio del ponte e del gruppo ruota",
    category: "preparazione",
    id: "ponte-gruppo-ruota",
    kind: "photo",
    orientation: "square",
    src: asset("assets/images/panda-axle.jpg"),
  },
  {
    alt: "PandAnna vista frontale in garage",
    category: "preparazione",
    id: "pandanna-garage",
    kind: "photo",
    orientation: "portrait",
    src: asset("assets/images/panda-front-garage.jpg"),
  },
  {
    alt: "Dettaglio del fondo e della ruggine",
    category: "preparazione",
    id: "fondo-ruggine",
    kind: "photo",
    orientation: "landscape",
    src: asset("assets/images/panda-rust-floor.jpg"),
  },
  {
    alt: "Sottoscocca della Panda in lavorazione",
    category: "preparazione",
    id: "sottoscocca-panda",
    kind: "photo",
    orientation: "portrait",
    src: asset("assets/images/panda-underbody.jpg"),
  },
];

const journalVideoArchiveFiles = [
  "VID_20260324_114732_076.mp4",
  "VID_20260324_114750_157.mp4",
  "VID_20260324_114758_858.mp4",
  "VID_20260324_114853_526.mp4",
  "VID_20260324_114910_159.mp4",
  "VID_20260324_114926_179.mp4",
  "VID_20260324_114944_424.mp4",
  "VID_20260324_114953_324.mp4",
  "VID_20260324_115052_304.mp4",
  "VID_20260324_115101_175.mp4",
  "VID_20260324_115109_960.mp4",
  "VID_20260324_115117_185.mp4",
  "VID_20260324_115124_677.mp4",
  "VID_20260324_115137_068.mp4",
  "VID_20260324_115202_075.mp4",
] as const;

const inferCategoryFromIndex = (index: number): JournalMediaCategory => {
  void index;
  return "preparazione";
};

const journalVideoArchive: readonly JournalMediaItem[] = Array.from(
  new Set(journalVideoArchiveFiles),
).map<JournalMediaItem>((file, index) => {
  const timeMatch = file.match(/_(\d{2})(\d{2})(\d{2})_/);
  const timeLabel = timeMatch ? `${timeMatch[1]}:${timeMatch[2]}` : "clip";

  return {
    alt: `Video verticale di lavorazione Panda delle ${timeLabel}`,
    category: inferCategoryFromIndex(index),
    id: file.replace(/\.mp4$/i, "").toLowerCase().replace(/_/g, "-"),
    kind: "video",
    orientation: "portrait",
    src: asset(`assets/videos/${file}`),
  };
});

export const journalMediaArchive: readonly JournalMediaItem[] = Array.from(
  new Map([...journalPhotoArchive, ...journalVideoArchive].map((item) => [item.id, item])).values(),
);

export const journalMediaArchiveByCategory: Record<
  JournalMediaCategory,
  readonly JournalMediaItem[]
> = {
  preparazione: journalMediaArchive.filter((item) => item.category === "preparazione"),
  test: journalMediaArchive.filter((item) => item.category === "test"),
  viaggio: journalMediaArchive.filter((item) => item.category === "viaggio"),
};
