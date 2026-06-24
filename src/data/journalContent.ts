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
    meta: "Data di pubblicazione: 19/5/2025",
    paragraphs: [
      "Dopo mesi passati in garage a preparare la Panda e a immaginare questo momento, il 4 maggio 2026 arriva finalmente il giorno della partenza da Brescia. La destinazione finale è la Georgia, ma in realtà non ho idea di cosa mi aspetti. So soltanto che è arrivato il momento di partire.",
      "La prima tappa è Genova. Prima ancora che il viaggio inizi davvero, passo a salutare un amico e a farmi aiutare con alcune ultime modifiche alla Panda, tra cui il montaggio delle molle di carico che dovranno sostenere tutto il peso dell’attrezzatura. Un ultimo caffè insieme, qualche chiacchiera e poi torno subito in strada.",
      "Da lì proseguo verso Roma. Ne approfitto per salutare altri amici e, soprattutto, Riccardo e Matteo due persone che, prima di me, hanno già percorso con una Fiat Panda le strade che sto per affrontare. Recupero anche le ultime cose che ancora mancano, piccoli dettagli che fino all’ultimo sembrano indispensabili e che, come scoprirò più avanti, spesso si rivelano molto meno importanti del previsto.",
      "Trascorro la prima vera notte di viaggio a Caserta. La mattina seguente percorro gli ultimi chilometri verso il porto di Brindisi, facendo prima un veloce passaggio da Lecce, una città in cui ho vissuto per alcuni anni e dove ho lasciato un pezzo di cuore.",
      "La sera mi imbarco sul traghetto diretto in Grecia.",
      "Guardo la Panda scomparire nella stiva e poco dopo mi ritrovo sul ponte, circondato soltanto dal mare. È uno di quei momenti in cui realizzi che ormai non si torna indietro. Dopo mesi di preparativi, problemi, dubbi e attese, il viaggio sta iniziando davvero.",
      "Non è la prima volta che sbarco a Igoumenitsa con un mezzo carico e pronto ad affrontare un lungo viaggio, ma questa volta la sensazione è quasi surreale. Trascorro la prima notte in Grecia in un piccolo appartamento poco distante dal porto. È una pausa breve, giusto il tempo di dormire, controllare che sulla Panda sia tutto a posto e ripartire.",
      "Da quel momento iniziano tre giorni che assomigliano a una piccola maratona.",
      "Decido di attraversare la Grecia passando dalle montagne, in direzione di Larissa, per poi proseguire verso est. Il meteo, però, non è dalla mia parte. Pioggia, freddo e strade molto più lente del previsto trasformano quelle giornate in una lunga sequenza di ore trascorse al volante. Continuo a guidare, ma a volte ho la sensazione di non avanzare mai.",
      "Nonostante tutto, i paesaggi sono incredibili. Attraverso montagne, villaggi sperduti e strade quasi completamente vuote. È proprio qui che inizio a capire davvero cosa significa vivere in viaggio. Non esistono più orari precisi, programmi rigidi o giornate già organizzate. Esiste soltanto una direzione da seguire e la possibilità di decidere, chilometro dopo chilometro, quando fermarsi e quando ripartire.",
      "Quando raggiungo Alessandropoli, per la prima volta dalla partenza, decido di fermarmi per un paio di giorni. È la prima vera pausa del viaggio. Ho bisogno di rallentare, riposare e prendere confidenza con questa nuova routine fatta di chilometri, mappe consultate all’ultimo momento e notti trascorse in luoghi scelti lungo la strada.",
      "Dopo qualche giorno arriva il momento di ripartire. Davanti a me c’è il confine con la Turchia.",
      "Non è la prima volta che metto piede in questo Paese. L’estate precedente ho provato a viaggiare lungo la costa turca in moto, ma non ero ancora pronto ad affrontare quel viaggio che si rivelò molto più difficile del previsto.",
      "Questa volta, però, ha tutto un altro sapore. Mi sento pronto, convinto e fiducioso.",
      "Come spesso accade all’inizio di un viaggio, i primi giorni sono un po’ turbolenti. Per questo decido di evitare Istanbul e di dirigermi subito verso l’interno del Paese. Non so ancora cosa aspettarmi, ma inizio a fare le prime conoscenze di viaggio: Jory e Kikki, dall’Olanda.",
      "Da quel momento in avanti, il viaggio inizierà a trasformarsi in qualcosa di completamente diverso da ciò che avevo immaginato.",
    ],
  },
  {
    label: "02",
    title: "La Turchia e il momento in cui ho smesso di correre",
    meta: "Data di pubblicazione: 10/6/26",
    paragraphs: [
      "Quando sono entrato in Turchia avevo ancora la mentalità dei primi giorni di viaggio. Ero partito con un obiettivo preciso e continuavo a macinare chilometri quasi senza fermarmi. Dormivo dove capitava, senza cercare posti particolari, vivendo ogni tappa soltanto come una transizione da un punto A a un punto B.",
      "Volevo semplicemente continuare ad andare avanti.",
      "Le prime destinazioni erano il lago Salato e poi Göreme. La Turchia mi sembrava immensa e avevo quasi la sensazione di dover recuperare del tempo. Ripensandoci oggi, probabilmente stavo soltanto correndo troppo.",
      "Quando sono arrivato al lago Salato mi sono trovato davanti alla prima vera delusione del viaggio. Era tardi ed era già buio. Pioveva, il tempo era terribile e le raffiche di vento superavano i sessanta chilometri orari.",
      "Mi aspettavo di trovare un piccolo deserto bianco sul quale sfrecciare con la Panda, ma il paesaggio che avevo immaginato era completamente diverso da quello che avevo davanti.",
      "Proprio quella sera, però, è scattata una scintilla che avrebbe dato il tono a tutto il resto del viaggio.",
      "Ho incontrato alcuni ragazzi che stavano viaggiando verso l’Australia a bordo di un vecchio van. Mi hanno visto solo e, incuriositi dal mio strano mezzo di trasporto, mi hanno invitato a trascorrere la serata con loro. Hanno cucinato anche per me e mi hanno ospitato nel loro van mentre fuori il vento continuava a scuotere ogni cosa.",
      "Ripensandoci, forse è stata proprio quella che inizialmente sembrava una delusione a regalarmi uno dei primi momenti davvero belli del viaggio.",
      "Nei giorni successivi ho raggiunto velocemente Göreme.",
      "Avevo sempre sognato di vedere la Cappadocia e le sue mongolfiere. La prima sera ho conosciuto quasi immediatamente una ragazza tedesca, Tati, che viaggiava da sola con il suo van Olaf e il suo cane Ludi. Abbiamo legato subito.",
      "La mattina seguente ci siamo incontrati prima dell’alba per vedere le mongolfiere. Era la prima volta per entrambi ed è stata un’esperienza davvero magica, difficile da descrivere a parole.",
      "Quello stesso pomeriggio è successa un’altra cosa assurda, ho incontrato nuovamente i ragazzi che mi avevano ospitato nel loro van qualche sera prima. Abbiamo pranzato tutti insieme e, nei giorni successivi, al gruppo si sono aggiunti altri due viaggiatori.",
      "Come se non bastasse poco dopo ho ritrovato anche Jory e Kikki, i due olandesi conosciuti durante il mio primo giorno in Turchia.",
      "Sembrava tutto surreale.",
      "A volte trascorri giorni interi cercando di organizzare un incontro con gli amici che vivono nella tua stessa città. Poi ti ritrovi dall’altra parte del mondo e continui a incontrare casualmente le stesse persone, a migliaia di chilometri e a distanza di giorni o settimane.",
      "Purtroppo, però, il tempo sembrava essersi messo contro di noi, pioveva quasi ininterrottamente e delle mongolfiere non c’era più traccia.",
      "Io e Tati, stufi della pioggia abbiamo deciso di cambiare programma e dirigerci verso il Mar Nero, nella speranza di trovare finalmente un po’ di sole.",
      "Per cinque giorni abbiamo viaggiato senza una meta precisa, attraversando villaggi, spiagge deserte e strade secondarie, fino a raggiungere Sinope, sulla costa del Mar Nero. Siamo rimasti lì per due notti, tra falò, chiacchiere e il silenzio del mare.",
      "Il brutto tempo sembrava non volerci dare tregua e abbiamo quindi deciso di ripartire.",
      "Quando viaggi da solo scopri quanto possa essere bello incontrare altre persone e condividere con loro una parte del cammino. Allo stesso tempo, però, impari che la solitudine non è più qualcosa da temere o sopportare, ma diventa spesso necessaria per ritrovare il proprio equilibrio.",
      "Una sensazione molto diversa da quella che provavo nella vita di città, dove stare da solo finiva spesso per pesarmi. Così le nostre strade si sono separate e siamo tornati a viaggiare in solitaria su strade diverse.",
      "Mi sono diretto verso il Dark Canyon, uno dei luoghi più incredibili che avessi visto fino a quel momento, una gola profonda 600 metri scavata dal fiume Eufrate, tra i distretti di İliç e Kemaliye, e un percorso mozzafiato scavato a mano nella roccia.",
      "Immediatamente il giorno seguente preso da un’agitazione ingiustificata, ho deciso di non fermarmi troppo. Ho continuato a guidare fino al monte Nemrut e poi verso Gaziantep, arrivando quasi al confine con la Siria.",
      "Lì ho incontrato una coppia di iracheni che mi ha offerto il pranzo e la cena. Mi hanno portato in un centro commerciale e mi hanno persino regalato una camicia, una kefiah e un paio di pantaloni nuovi.",
      "Forse hanno provato tenerezza, forse erano semplicemente delle persone di cuore o forse mi hanno scambiato per un senza tetto vedendomi viaggiare dentro una vecchia Panda.",
      "Non lo sapremo mai.",
      "Più passavano i giorni, più mi rendevo conto che la destinazione contava sempre meno. Erano i momenti nel mezzo a rendere speciale il viaggio, nonostante il mio umore fosse spesso altalenante.",
      "Era sempre presente quella convinzione distorta di dover essere costantemente produttivo, performante, impegnato a costruire qualcosa di concreto. Come se vivere un’esperienza non fosse sufficiente e fosse necessario trasformarla per forza in un risultato.",
      "Qualche tempo dopo sono tornato a Göreme, sperando di trovare finalmente il bel tempo. Quasi per caso, ho incontrato nuovamente Tati, la ragazza tedesca con cui avevo viaggiato fino a pochi giorni prima.",
      "Per cinque mattine consecutive abbiamo assistito allo spettacolo delle mongolfiere che si alzavano sopra la valle. Ci svegliavamo prima dell’alba, bevevamo un caffè e guardavamo il cielo riempirsi lentamente di colori.",
      "Erano momenti semplici, ma avevano qualcosa di profondamente magico.",
      "È stato proprio lì che ho capito una cosa.",
      "Ero partito pensando che il viaggio fosse una corsa, prima di dover tornare in fretta alla cosiddetta “vita reale”. Un susseguirsi di luoghi da raggiungere, strade da attraversare e chilometri da percorrere.",
      "In realtà, forse, quella era proprio la vita reale.",
      "Quella capacità di spegnere il cervello, il telefono e l’orologio. Di godersi il momento, il luogo e le persone. Di essere consapevole che non avrei saputo cosa sarebbe successo nel giro di poche ore o il giorno successivo e, nonostante questo, riuscire a rimanere presente.",
      "Per la prima volta provavo una serenità che non avevo mai conosciuto prima. Quasi come se, dopo anni, avessi finalmente capito ciò di cui cercava di parlarmi la mia psicologa, che probabilmente non avevo mai ascoltato davvero.",
      "Tutte quelle persone incontrate per caso, le cene condivise, i programmi cambiati all’ultimo momento, le mattine trascorse senza fretta e le esperienze che nessuna pianificazione avrebbe potuto prevedere avevano piantato un pensiero nella mia testa.",
      "Forse non ero io a essere sbagliato.",
      "Forse c’era sempre stato qualcosa di sbagliato nel modo in cui ci avevano insegnato a considerare “normale” la vita.",
      "Da quel momento ho capito che, invece di tornare verso casa, avrei dovuto fare una cosa che non avevo quasi mai fatto, mettere da parte, almeno per una volta, il lavoro, i soldi e le responsabilità. Spegnere quella parte della mia mente che cercava continuamente di razionalizzare tutto e provare a seguire l’istinto e le emozioni.",
      "Il 6 giugno ho lasciato Göreme e ho puntato la Panda verso la Georgia.",
      "Non ero più lo stesso ragazzo che, poche settimane prima, era entrato in Turchia pensando soltanto a macinare chilometri.",
      "E, senza ancora saperlo, il viaggio stava per cambiare ancora una volta.",
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
