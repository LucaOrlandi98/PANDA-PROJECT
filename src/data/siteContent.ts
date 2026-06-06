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
    description: "Ingresso al progetto.",
  },
  {
    label: "Panda",
    to: "/panda",
    description: "Mezzo, timeline e setup.",
  },
  {
    label: "Roadbook",
    to: "/route",
    description: "Roadbook, direzione e live map.",
  },
  {
    label: "Journal",
    to: "/journal",
    description: "Journal, galleria, diario di bordo e attrezzatura.",
  },
];

export const menuNav: NavItem[] = [
  {
    label: "Attrezzatura",
    to: "/journal/altro",
    description: "Attrezzatura, note pratiche, link e materiali utili.",
  },
  {
    label: "Contatti",
    to: "/contact",
    description: "Come scrivermi o proporre qualcosa.",
  },
];

export const hubCards: LinkCard[] = [
  {
    buttonLabel: "Apri Panda",
    title: "Panda",
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
    status: "done",
  },
  {
    phase: "07",
    title: "Partenza",
    description:
      "Avviare il viaggio con un primo obiettivo geografico chiaro e capire fin dove si riuscira ad arrivare.",
    status: "active",
  },
];

export const pandaSpecs: VehicleSpec[] = [
  {
    label: "Veicolo",
    value: "Panda Anna",
    note: "Anno 1998 - motore 1.108 cc FIRE - 54 CV - trazione integrale 4x4.",
  },
  {
    label: "Stato",
    value: "Restauro completo + setup spedizione",
    note:
      "Meccanica revisionata e ripristinata, carrozzeria strurra restaurata e dotazione essenziale da overland pronta.",
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
