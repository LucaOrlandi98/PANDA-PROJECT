import type {
  LinkCard,
  NavItem,
  ResourceItem,
  SupportItem,
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

export const resources: ResourceItem[] = [
  {
    category: "Checklist",
    title: "Pre-partenza essenziale",
    description:
      "Una lista corta e concreta per non dimenticare quello che conta davvero.",
    bullets: [
      "documenti, assicurazione e scadenze",
      "attrezzi base e punti critici del mezzo",
      "test con carico reale prima di uscire",
    ],
  },
  {
    category: "Setup",
    title: "Setup minimo da viaggio",
    description:
      "Tenda, cottura, acqua, stivaggio e riparazioni senza trasformare la Panda in un magazzino.",
    bullets: [
      "tetto e baule usati solo per il necessario",
      "peso distribuito e accessi rapidi",
      "ridondanza solo dove serve davvero",
    ],
  },
  {
    category: "Ricambi",
    title: "Cosa portare davvero",
    description:
      "Non la lista infinita. Solo i ricambi che possono cambiare la giornata in viaggio.",
    bullets: [
      "consumabili da guasto frequente",
      "materiale elettrico essenziale",
      "fix rapidi da usare sul bordo strada",
    ],
  },
  {
    category: "Budget",
    title: "Quanto costa prepararsi",
    description: "Spese reali, errori e dove il risparmio ha senso e dove no.",
    bullets: ["ripristino meccanico", "setup da viaggio", "margine imprevisti"],
  },
];

export const supportOptions: SupportItem[] = [
  {
    label: "Segui",
    title: "Aggiornamenti chiari",
    description:
      "Il posto giusto per seguire sviluppi, immagini e passaggi concreti del progetto.",
    ctaLabel: "Apri Journal",
    to: "/journal",
  },
  {
    label: "Supporta",
    title: "Collaborazioni utili",
    description:
      "Supporto e collaborazioni hanno senso solo se aiutano mezzo, sicurezza o qualita del racconto.",
    ctaLabel: "Apri Partner",
    to: "/partners",
  },
  {
    label: "Partecipa",
    title: "Suggerimenti e contatti",
    description:
      "Tappe, deviazioni, risorse o contatti tecnici sono piu utili di qualsiasi messaggio generico.",
    ctaLabel: "Apri Contatti",
    to: "/contact",
  },
];

export const timeline: TimelineItem[] = [
  {
    phase: "01",
    title: "Idea",
    description:
      "Trasformare il bisogno di movimento, cambiamento e autonomia in un progetto costruito intorno a un veicolo capace di stare davvero su strada.",
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
    value: "Viaggio leggero e reale",
    note:
      "Una Panda, una rotta aperta e l'idea che il valore del viaggio stia in cio che genera lungo il percorso.",
  },
  {
    label: "Direzione",
    value: "Est Europa / Caucaso",
    note: "La Georgia resta il primo grande orizzonte, non il limite del viaggio.",
  },
];

export const partnerNotes = [
  "Gli sponsor non spariscono, ma diventano secondari rispetto al progetto.",
  "Le collaborazioni utili sono quelle che migliorano mezzo, sicurezza o qualita del racconto.",
  "La parte sponsor resta separata e non guida piu identita, home o navigazione principale.",
];

export const contactChannels = [
  {
    label: "Instagram",
    value: "@lucaorlandi____",
    note: "Il canale piu diretto per vedere il dietro le quinte del progetto.",
  },
  {
    label: "Collaborazioni",
    value: "Partner e supporti tecnici",
    note: "Scrivimi se puoi aiutare sul mezzo, sulla rotta o sui contenuti utili.",
  },
  {
    label: "Suggerimenti",
    value: "Tappe, risorse, errori evitabili",
    note: "Il contributo piu utile e quasi sempre pratico.",
  },
] as const;
