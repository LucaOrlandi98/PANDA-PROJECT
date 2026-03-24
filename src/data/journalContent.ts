import { asset } from "../lib/asset";
import type { JournalMediaItem } from "../types/content";

const journalPhotos: JournalMediaItem[] = [
  {
    alt: "PandAnna nella neve",
    caption: "Il frame largo regge bene panoramiche, arrivi e scene di viaggio.",
    id: "pandanna-neve",
    kind: "photo",
    orientation: "landscape",
    src: asset("assets/images/panda-hero-snow.jpg"),
    title: "Ingresso in scena",
  },
  {
    alt: "Dettaglio del ponte e del gruppo ruota",
    caption: "I tag media permettono di mischiare scatti tecnici e clip nello stesso archivio.",
    id: "ponte-gruppo-ruota",
    kind: "photo",
    orientation: "square",
    src: asset("assets/images/panda-axle.jpg"),
    title: "Dettaglio tecnico",
  },
  {
    alt: "PandAnna vista frontale in garage",
    caption: "I formati verticali entrano nei moduli stretti senza schiacciare il soggetto.",
    id: "pandanna-garage",
    kind: "photo",
    orientation: "portrait",
    src: asset("assets/images/panda-front-garage.jpg"),
    title: "Ritratto in garage",
  },
  {
    alt: "Dettaglio del fondo e della ruggine",
    caption: "Le card larghe sono pronte per foto orizzontali e video di lavorazione.",
    id: "fondo-ruggine",
    kind: "photo",
    orientation: "landscape",
    src: asset("assets/images/panda-rust-floor.jpg"),
    title: "Fondo e lavorazioni",
  },
  {
    alt: "Sottoscocca della Panda in lavorazione",
    caption: "Le verticali restano leggibili anche nell'archivio quando il journal cresce.",
    id: "sottoscocca-panda",
    kind: "photo",
    orientation: "portrait",
    src: asset("assets/images/panda-underbody.jpg"),
    title: "Sottoscocca aperto",
  },
];

const journalVideoFiles = [
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

const uniqueJournalVideoFiles = Array.from(new Set(journalVideoFiles));

const journalVideos: JournalMediaItem[] = uniqueJournalVideoFiles.map<JournalMediaItem>(
  (file, index) => {
    const timeMatch = file.match(/_(\d{2})(\d{2})(\d{2})_/);
    const timeLabel = timeMatch
      ? `${timeMatch[1]}:${timeMatch[2]}`
      : `${String(index + 1).padStart(2, "0")}`;

    return {
      alt: `Video verticale di lavorazione Panda delle ${timeLabel}`,
      caption: "Clip verticale di officina e smontaggio aggiunta al journal.",
      id: file.replace(/\.mp4$/i, "").toLowerCase().replace(/_/g, "-"),
      kind: "video",
      orientation: "portrait",
      src: asset(`assets/videos/${file}`),
      title: `Clip ${timeLabel}`,
    };
  },
);

export const journalGallery: readonly JournalMediaItem[] = [...journalPhotos, ...journalVideos];

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
