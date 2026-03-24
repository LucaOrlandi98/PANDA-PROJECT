import type {
  LinkCard,
  NavItem,
  TimelineItem,
  VehicleSpec,
} from "../types/content";

export const primaryNav: NavItem[] = [
  {
    label: "Home",
    to: "/",
    description: "Hub del progetto e stato attuale.",
  },
  {
    label: "About",
    to: "/panda",
    description: "About, timeline e setup.",
  },
  {
    label: "Roadbook",
    to: "/route",
    description: "Roadbook, direzione e live map.",
  },
  {
    label: "Journal",
    to: "/journal",
    description: "Journal, foto, diario di bordo e altro.",
  },
];

export const menuNav: NavItem[] = [
  {
    label: "Altro",
    to: "/journal/altro",
    description: "Testi, riferimenti, materiali e contenuti laterali.",
  },
  {
    label: "Contatti",
    to: "/contact",
    description: "Come scrivermi o proporre qualcosa.",
  },
];

export const hubCards: LinkCard[] = [
  {
    buttonLabel: "Apri About",
    title: "About",
    to: "/panda",
  },
  {
    buttonLabel: "Apri Roadbook",
    title: "Roadbook",
    to: "/route",
  },
  {
    buttonLabel: "Apri Journal",
    title: "Journal",
    to: "/journal",
  },
];

export const timeline: TimelineItem[] = [
  {
    phase: "01",
    title: "Idea",
    description:
      "Trasformare il bisogno di movimento, cambiamento e autonomia in un progetto costruito intorno a un veicolo semplice ed economico.",
    status: "done",
  },
  {
    phase: "02",
    title: "Scelta del mezzo",
    description:
      "Passare da auto economiche usate come test alla scelta definitiva del mezzo per il progetto.",
    status: "done",
  },
  {
    phase: "03",
    title: "Restauro",
    description:
      "Affrontare un intervento completo di ripristino e trasformazione con un approccio il piu possibile home made.",
    status: "done",
  },
  {
    phase: "04",
    title: "Preparazione",
    description:
      "Integrare strumentazione, accessori ed equipaggiamento per rendere l'auto adatta a permanenza, autonomia e adattabilita.",
    status: "done",
  },
  {
    phase: "05",
    title: "Pianificazione",
    description:
      "Stabilire rotta, durata, tappe, documenti e dotazione minima necessaria per una partenza sostenibile.",
    status: "done",
  },
  {
    phase: "06",
    title: "Test / messa a punto",
    description:
      "Mettere alla prova veicolo e assetto in condizioni reali e sistemare le criticita rimaste aperte.",
    status: "active",
  },
  {
    phase: "07",
    title: "Partenza",
    description:
      "Avviare il viaggio con un primo obiettivo geografico chiaro e capire fin dove si riuscira ad arrivare.",
    status: "next",
  },
];

export const pandaSpecs: VehicleSpec[] = [
  {
    label: "Nome",
    value: "PandAnna",
    note: "Anno 1998 - motore 1.108 cc FIRE - 54 CV - trazione integrale 4x4.",
  },
  {
    label: "Stato",
    value: "Restauro completo + setup spedizione",
    note:
      "Motore e trasmissione revisionati, meccanica ripristinata e dotazione essenziale da overland.",
  },
  {
    label: "Filosofia",
    value: "Viaggio leggero ed essenziale",
    note:
      "Una vecchia Panda, una rotta aperta e l'idea di partire senza programmare il ritorno",
  },
  {
    label: "Direzione",
    value: "Est Europa / Caucaso",
    note: "La Georgia resta il primo grande orizzonte, non il limite del viaggio.",
  },
];
