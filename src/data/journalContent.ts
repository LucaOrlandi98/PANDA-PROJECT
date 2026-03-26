import type { JournalReferenceGroup } from "../types/content";
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
    meta: "attiva",
    title: "Varie",
    to: "/journal/altro",
  },
] as const;

export const journalOtherEquipmentGroups: JournalReferenceGroup[] = [
  {
    title: "Allestimento",
    links: [
      {
        href: "https://www.rigidon.com/",
        label: "Rigidon",
      },
      {
        href: "https://www.vevor.it/pages/contact-us",
        label: "Vevor",
      },
    ],
    bullets: [
      {
        href: "https://www.vevor.it/tenda-da-sole-per-auto-c_12491/vevor-tendalino-laterale-per-auto-retrattile-1-4x2-m-tenda-da-sole-retrattile-pu3000-mm-uv50-impermeabile-tendalino-laterale-posteriore-per-camion-suv-furgoni-camper-da-campeggio-escursione-viaggio-p_010291900531",
        label: "Tendalino Laterale",
      },
      {
        href: "https://www.vevor.it/invertitore-onda-sinusoidale-pura-c_10760/vevor-convertitore-di-potenza-a-onda-sinusoidale-pura-convertitore-di-potenza-da-1000-w-cc-da-12-v-a-ca-230v-telecomando-per-piccoli-elettrodomestici-smartphone-pc-p_010677579570",
        label: "Convertitore di potenza",
      },
      {
        href: "https://www.vevor.it/frigorifero-per-auto-c_10723/vevor-frigorifero-per-auto-viaggio-campeggio-15-l-frigo-camion-piccolo-portatile-p_010826316724",
        label: "Mini Frigo",
      },
      {
        href: "https://www.vevor.it/portapacchi-c_12053/vevor-portapacchi-universale-da-tetto-1630-x-1270-x-105-mm-con-recinzione-reti-p_010552003715",
        label: "Porta pacchi",
      },
      {
        href: "https://www.vevor.it/tavole-di-trazione-c_13257/vevor-tavole-da-trazione-auto-nastro-da-trazione-pp-fango-neve-sabbia-2-pezzi-p_010614191716",
        label: "Pannelli trazione",
      },
    ],
  },
  {
    title: "Storage e camping",
    links: [
      {
        href: "https://www.decathlon.it/",
        label: "Decathlon",
      },
    ],
    bullets: [
      {
        href: "https://www.decathlon.it/p/mp/doccia-portatile-da-esterno/b4ea4682-2d4b-4246-9a48-4b4aaa76b0b2/novar",
        label: "Doccia portatile",
      },
      {
        href: "https://www.decathlon.it/p/mp/tanica-acqua-18l-con-rubinetto/1ef5614e-633b-4ef6-8bd0-dce57ed6787c/c9",
        label: "Tanica acqua",
      },
      {
        href: "https://www.decathlon.it/p/mp/fornello-a-gas-incl-20-cartucce-con-valigetta/040a89fe-1e6e-4a37-880e-c3be67e900f5/c1",
        label: "Fornello",
      },
      {
        href: "https://www.decathlon.it/p/tavolo-campeggio-compatto-500-2-persone-bianco/303250/c2c12m8927565",
        label: "Tavolo campeggio",
      },
      {
        href: "https://www.decathlon.it/tutti-gli-sport/campeggio/tende-tepee",
        label: "Tenda indiana",
      },
      {
        href: "https://www.decathlon.it/tutti-gli-sport/campeggio/cucine-campeggio",
        label: "Stoviglie",
      },
      {
        href: "https://www.decathlon.it/p/mp/barbecue-portatile-per-tavolo-inuitz-ferro-con-ventilazione-stile-affumicatore/aad462c0-5a17-46a9-8093-cfc918feba4d/c1",
        label: "Barbecue portatile",
      },
    ],
  },
  {
    title: "Navigazione e varie",
    links: [
      {
        href: "https://starlink.com/it/residential?referral=RC-481067-34312-6&utm_source=google&utm_medium=paid&utm_campaign=sls_it_src_ggl_brd_stk-bpe&utm_content=sls_it_src_ggl_brd_stk-bpe_res_gsa_v4s_txt_it-it_egn&utm_term=stk-bpe_starlink&gad_source=1&gad_campaignid=21037050396&gbraid=0AAAAAok2xKlYTQ5cM8gwuqzMuJgRwjrZr&gclid=CjwKCAjwspPOBhB9EiwATFbi5MheGTFYzbjMdQRhvw2aENF_l2QyFm6ulLU68yxtpFq8k7vNVW-XjxoCQS4QAvD_BwE",
        label: "Starlink",
      },
      {
        href: "https://fourxrocker.com/?gad_source=1&gad_campaignid=21719458520&gbraid=0AAAAACJFb2D9YlORPtdFU8G5mZgkC2kEt&gclid=CjwKCAjwspPOBhB9EiwATFbi5AjPGVs5CeMVZSfmM6K4a_USZL7PQKJUp8dMZkhcxrgUI0HZ9zOnvxoCo4cQAvD_BwE",
        label: "Four x Rocker",
      },
    ],
  },
] as const;

export const journalOtherMechanical = [
  {
    note: "Ricambi base da tenere pronti a bordo per i guasti piu probabili.",
    title: "Ricambi",
    bullets: [
      "Iniettore",
      "Pompa benzina",
      "Sensore contagiri",
      "Bobina",
      "Boccola scatola sterzo",
      "Filtro olio Sofima",
      "Termostato",
      "Fusibili",
      "Rele",
      "Fascette e nastro isolante",
      "Minuteria e ferramenta",
    ],
  },
  {
    note: "Interventi principali gia previsti per portare la Panda a una base solida.",
    title: "Interventi",
    bullets: [
      "Revisione motore",
      "Revisione cambio",
      "Sostituzione impianto frenante",
      "Sostituzione radiatore",
      "Restauro e ripristino carrozzeria e fondi",
      "Ripristino degli interni",
      "Revisione differenziale posteriore",
      "Ripristino cablaggi e impianti elettrici",
      "Oscurante vetri",
    ],
  },
] as const;

export const journalOtherPlaceholder = {
  bullets: [
    "documenti, copie e backup digitali",
    "assicurazioni, numeri utili e riferimenti rapidi",
    "frontiere, note paese e passaggi critici",
    "check amministrativo prima della partenza",
  ],
  eyebrow: "Placeholder temporaneo",
  note:
    "Per ora questa sezione resta aperta come spazio per documenti e logistica.",
  title: "Documenti e logistica",
} as const;
