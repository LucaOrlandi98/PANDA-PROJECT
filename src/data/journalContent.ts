import type { JournalLogEntry, JournalReferenceGroup } from "../types/content";
import { journalMediaArchive } from "./journalMediaArchive";

export const journalGallery = journalMediaArchive;

export const journalSections = [
  {
    label: "01",
    meta: `${journalGallery.length} foto + video`,
    title: "Galleria",
    to: "/journal/foto",
  },
  {
    label: "02",
    meta: "2 articoli",
    title: "Diario di bordo",
    to: "/journal/diario",
  },
  {
    label: "03",
    meta: "attiva",
    title: "Attrezzatura",
    to: "/journal/altro",
  },
] as const;

export const journalLogEntries: JournalLogEntry[] = [
  {
    label: "01",
    title: "Da Brescia alla Turchia",
    meta: "4 maggio 2026 - Partenza da Brescia, Grecia, primo ingresso in Turchia",
    paragraphs: [
      "Dopo mesi passati in garage a preparare la Panda e immaginare questo momento, il 4 maggio 2026 e finalmente arrivato il giorno della partenza da Brescia. La destinazione finale era la Georgia, ma in realta non avevo idea di cosa mi aspettasse. Sapevo solo che era arrivato il momento di partire.",
      "La prima tappa e stata Genova. Prima ancora di iniziare davvero il viaggio sono passato a salutare un amico che mi aveva dato una mano con alcune modifiche alla Panda, tra cui le molle di carico che avrebbero dovuto sopportare tutto il peso dell'attrezzatura. Un ultimo caffe, qualche chiacchiera e di nuovo in strada.",
      "Da li ho proseguito verso Roma. Ne ho approfittato per salutare altri amici e recuperare le ultime cose che ancora mancavano. Piccoli dettagli che fino all'ultimo sembravano indispensabili e che, come avrei scoperto piu avanti, spesso si sarebbero rivelati molto meno importanti del previsto.",
      "La prima vera notte di viaggio l'ho passata a Caserta. Il mattino seguente ho percorso gli ultimi chilometri verso il porto e, la sera, mi sono imbarcato sul traghetto diretto in Grecia. Vedere la Panda scomparire nella stiva e ritrovarmi sul ponte, circondato soltanto dal mare, e stato uno di quei momenti in cui realizzi che ormai non si torna piu indietro. Il viaggio era davvero iniziato.",
      "Lo sbarco a Igoumenitsa e stato quasi surreale. La prima notte in Grecia l'ho passata in un piccolo appartamento poco distante dal porto. Una pausa breve, giusto il tempo di riposare e ripartire.",
      "Da quel momento sono iniziati tre giorni che ricordo ancora come una piccola maratona. Ho deciso di attraversare la Grecia passando per le montagne, in direzione di Larissa e poi verso est. Il meteo non era dalla mia parte. Pioggia, freddo e strade molto piu lente del previsto hanno trasformato quei giorni in una continua sequenza di ore al volante. A volte mi sembrava di non avanzare mai.",
      "Nonostante tutto, i paesaggi erano incredibili. Montagne, villaggi sperduti e pochissimo traffico. Era la prima volta che iniziavo davvero a capire cosa significasse vivere in viaggio. Non esistevano piu orari, programmi rigidi o giornate prestabilite. C'era soltanto una direzione da seguire.",
      "Quando sono arrivato ad Alessandropoli ho deciso di fermarmi per un paio di giorni. Era la prima vera pausa dall'inizio della partenza. Avevo bisogno di rallentare, tirare il fiato e prendere confidenza con quella nuova routine fatta di chilometri, mappe e notti improvvisate.",
      "Dopo qualche giorno e arrivato il momento di ripartire. Davanti a me c'era il confine con la Turchia.",
      "Era la seconda volta che mettevo piede in questo paese, ma questa volta aveva tutto un altro sapore. Ho scelto di evitare Istanbul e dirigermi subito verso l'interno, senza sapere che i giorni successivi mi avrebbero portato nel cuore dell'Anatolia e che il viaggio, da li in avanti, sarebbe diventato qualcosa di completamente diverso da quello che avevo immaginato.",
    ],
  },
  {
    label: "02",
    title: "La Turchia e il momento in cui ho smesso di correre",
    meta: "Maggio / Giugno 2026 - Lago Salato, Cappadocia, Mar Nero e rotta verso la Georgia",
    paragraphs: [
      "Quando sono entrato in Turchia avevo ancora la mentalita dei primi giorni. Ero partito con un obiettivo ben preciso e continuavo a macinare chilometri quasi senza fermarmi. Dormivo dove capitava, senza cercare posti particolari. Volevo solo continuare ad andare avanti.",
      "Le prime tappe sono state il lago Salato e poi Goreme. La Turchia mi sembrava immensa e avevo quasi la sensazione di dover recuperare tempo. Col senno di poi, forse stavo semplicemente correndo troppo.",
      "Arrivato al lago Salato mi sono trovato davanti alla prima vera delusione del viaggio. Pioggia, vento fortissimo e un tempo terribile. Le raffiche superavano i sessanta chilometri orari e il paesaggio che avevo immaginato era completamente diverso da quello che mi trovavo davanti.",
      "Proprio quella sera pero e successo qualcosa che avrebbe dato il tono a tutto il resto del viaggio.",
      "Ho incontrato alcuni ragazzi che stavano viaggiando verso l'Australia con un vecchio van. Mi hanno visto da solo e mi hanno invitato a passare la serata con loro. Hanno cucinato anche per me e mi hanno ospitato nel loro mezzo mentre fuori il vento continuava a scuotere tutto.",
      "Ripensandoci, forse e stata proprio quella che sembrava una delusione a regalarmi uno dei primi momenti piu belli.",
      "Nei giorni successivi ho raggiunto velocemente Goreme. Avevo sempre sognato di vedere la Cappadocia e le sue mongolfiere, ma anche li il tempo sembrava essersi messo contro di noi. Pioggia quasi continua e pochissimi voli.",
      "Proprio a Goreme ho conosciuto una ragazza tedesca. Doveva essere un incontro come tanti, ma alla fine abbiamo trascorso insieme circa due settimane di viaggio.",
      "I primi giorni siamo rimasti in Cappadocia sperando ogni mattina di vedere le mongolfiere alzarsi in volo, ma il cielo continuava a regalarci soltanto nuvole e pioggia. Cosi abbiamo deciso di cambiare programma e dirigerci verso il Mar Nero.",
      "Per cinque giorni abbiamo viaggiato senza una meta precisa, attraversando villaggi, spiagge deserte e strade secondarie. Poi le nostre strade si sono separate e io ho continuato da solo.",
      "Sono andato verso il Dark Canyon, uno dei luoghi piu incredibili che abbia visto fino a quel momento. Da li ho proseguito fino al monte Nemrut e poi verso Gaziantep, arrivando quasi al confine con la Siria.",
      "Piu passavano i giorni e piu mi rendevo conto che la meta contava sempre meno. Erano i momenti nel mezzo a rendere speciale tutto questo.",
      "Qualche tempo dopo sono tornato a Goreme e li ci siamo ritrovati di nuovo. Quasi per caso.",
      "Questa volta il tempo era cambiato.",
      "Per cinque giorni abbiamo assistito ogni mattina allo spettacolo delle mongolfiere che si alzavano sopra la valle. Mi svegliavo prima dell'alba, prendevo un caffe e guardavo il cielo riempirsi lentamente di colori. Erano momenti semplici, ma avevano qualcosa di magico.",
      "E stato proprio li che ho capito una cosa.",
      "Ero partito pensando che il viaggio fosse una corsa. Un susseguirsi di luoghi da raggiungere e chilometri da percorrere.",
      "In realta il viaggio era tutto il contrario.",
      "Erano le persone incontrate per caso, le cene condivise, i programmi cambiati all'ultimo momento, le mattine passate senza fretta e quei momenti che nessuna pianificazione avrebbe mai potuto prevedere.",
      "Quando ho lasciato Goreme e ho puntato la Panda verso la Georgia, il 6 giugno, non ero piu lo stesso ragazzo che era entrato in Turchia poche settimane prima.",
      "E senza saperlo, il viaggio stava per cambiare ancora una volta.",
    ],
  },
];

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
