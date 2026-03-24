import { asset } from "../lib/asset";

export const journalGallery = [
  {
    alt: "PandAnna nella neve",
    src: asset("assets/images/panda-hero-snow.jpg"),
  },
  {
    alt: "Dettaglio del ponte e del gruppo ruota",
    src: asset("assets/images/panda-axle.jpg"),
  },
  {
    alt: "PandAnna vista frontale in garage",
    src: asset("assets/images/panda-front-garage.jpg"),
  },
  {
    alt: "Dettaglio del fondo e della ruggine",
    src: asset("assets/images/panda-rust-floor.jpg"),
  },
  {
    alt: "Sottoscocca della Panda in lavorazione",
    src: asset("assets/images/panda-underbody.jpg"),
  },
] as const;

export const journalLog = [
  {
    article: [
      "Il progetto parte da sotto, non da sopra. Prima di pensare a tenda, assetto o rotta, c'era bisogno di capire se la base fosse davvero onesta e leggibile.",
      "Smontare ha significato leggere fondi, attacchi, punti deboli e ruggine. Da qui nasce la parte piu concreta del lavoro: togliere illusioni e costruire un mezzo che possa meritarsi la strada, non solo raccontarla.",
    ],
    date: "5 marzo 2026",
    index: "01",
    note: "Smontare, leggere e capire cosa regge davvero prima di aggiungere altro.",
    title: "Officina",
  },
  {
    article: [
      "Dopo il ripristino arriva la parte meno spettacolare ma piu decisiva: provare, correggere, rifare e capire dove il progetto tiene davvero.",
      "Ogni scelta pratica passa da qui, dalla distribuzione del peso all'accesso all'attrezzatura. La messa a punto e il punto in cui l'idea smette di essere entusiasmo e diventa routine, sistema e affidabilita.",
    ],
    date: "14 marzo 2026",
    index: "02",
    note: "Prove, errori, piccole correzioni e decisioni pratiche che trasformano il progetto in mezzo reale.",
    title: "Messa a punto",
  },
  {
    article: [
      "La partenza non e solo una data. E il momento in cui il lavoro smette di stare fermo e inizia a prendere ritmo, direzione e conseguenze reali.",
      "Qui si misura tutto: se la Panda e pronta, se il setup ha senso e se il progetto riesce a restare leggero e credibile anche fuori dall'officina. E il punto in cui preparazione e strada smettono di essere due cose separate.",
    ],
    date: "23 marzo 2026",
    index: "03",
    note: "Quando il lavoro fatto diventa ritmo, direzione e finalmente strada.",
    title: "Partenza",
  },
] as const;

export const journalOther = [
  {
    eyebrow: "Testi",
    note: "Racconti piu lunghi, riflessioni e pezzi editoriali da tenere ordinati.",
    title: "Archivio scritto",
  },
  {
    eyebrow: "Riferimenti",
    note: "Mappe, strumenti, materiali e collegamenti utili raccolti in modo leggibile.",
    title: "Link e materiali",
  },
  {
    eyebrow: "Extra",
    note: "Dettagli, scarti, appunti rapidi e cose che non entrano nel diario principale.",
    title: "Contenuti laterali",
  },
] as const;

export const journalSections = [
  {
    label: "01",
    meta: `${journalGallery.length} foto`,
    title: "Foto",
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
