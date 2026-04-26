export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  read: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "weekend-barcellona-3-giorni",
    title: "Weekend a Barcellona in 3 giorni: l'itinerario che i local approverebbero",
    excerpt:
      "Gràcia invece di Las Ramblas, vermut prima di cena, e il Parc del Guinardó al tramonto. Ecco come vivere Barcellona in 72 ore senza trappole per turisti.",
    tag: "Itinerari",
    date: "18 aprile 2026",
    read: "6 min",
    body: [
      "Barcellona è una delle città europee più visitate, e proprio per questo la maggior parte dei viaggiatori finisce schiacciata sulle solite tre strade: Las Ramblas, il Barrio Gótico, la Sagrada Família. Niente di sbagliato — ma un weekend ben speso qui guarda altrove.",
      "Giorno 1 — Gràcia. Arriva il venerdì pomeriggio, lascia i bagagli in un boutique hotel in zona Passeig de Sant Joan, e cammina verso Gràcia. È il quartiere dove vivono i locali, con piazzette che diventano sale da pranzo all'aperto, bar di vermut e librerie indipendenti. Cena da Cal Boter o La Pepita.",
      "Giorno 2 — Mare e design. Colazione a El Born (Caravelle o Satan's Coffee), poi a piedi al MACBA, una pausa a El Xampanyet per tapas alle 13, e pomeriggio a Barceloneta per un bagno fuori stagione. Aperitivo al tramonto al Bar Marsella.",
      "Giorno 3 — La vista che nessuno conosce. Invece del Park Güell affollato, sali al Parc del Guinardó o ai Bunkers del Carmel. La vista è la stessa, la folla no. Pranzo tardivo di paella vera (non da turisti) da Can Solé, poi rientro.",
      "Il pacchetto Backpack & Bottle per Barcellona parte da €320 per 3 notti, con volo dai principali aeroporti italiani e hotel 3-4 stelle già vagliati per posizione e recensioni.",
    ],
  },
  {
    slug: "quando-prenotare-voli-europa",
    title: "Quando prenotare i voli in Europa nel 2026 (dati reali, non miti)",
    excerpt:
      "Il mito del 'martedì sera' è vecchio. Ecco i dati aggiornati sul miglior momento per prenotare un weekend europeo — e perché 6–8 settimane prima è il nuovo sweet spot.",
    tag: "Prenotazione",
    date: "10 aprile 2026",
    read: "5 min",
    body: [
      "Negli ultimi dieci anni la saggezza comune sui voli è stata riciclata all'infinito: 'prenota di martedì', 'aspetta l'ultimo minuto', 'usa l'incognito'. La maggior parte di questi consigli oggi è falsa o irrilevante.",
      "I dati aggregati del 2025 su rotte intra-europee mostrano un pattern chiaro: le tariffe più basse cadono tra 6 e 8 settimane prima della partenza. Prima è troppo presto (le compagnie non hanno ancora aperto la dinamica completa), dopo è troppo tardi (inventario residuo e premium di last minute).",
      "Il giorno della settimana conta poco. I sistemi di pricing dinamico hanno eroso il vantaggio del martedì. Quello che conta davvero è il giorno di viaggio: decollo giovedì mattina / rientro domenica sera costa in media il 18% in meno di venerdì sera / domenica sera.",
      "Regola pratica per un weekend a Barcellona, Lisbona, Praga, Amsterdam o Roma: blocca il volo 6–8 settimane prima, parti di giovedì, torna di domenica. Non usare l'incognito — non fa differenza misurabile. Sì al confronto su Google Flights + Skyscanner in parallelo.",
      "Il coupon Backpack & Bottle da €50 è valido 90 giorni: perfetto per prenotare ora e partire tra 6–12 settimane — esattamente il sweet spot.",
    ],
  },
  {
    slug: "5-destinazioni-europee-sotto-400",
    title: "5 destinazioni europee sotto i €400 per un weekend (voli + hotel)",
    excerpt:
      "Barcellona, Lisbona, Praga, Amsterdam, Roma: il confronto trasparente per capire dove spendi davvero meno e dove vale la pena investire qualche euro in più.",
    tag: "Confronti",
    date: "2 aprile 2026",
    read: "7 min",
    body: [
      "Il prezzo di un weekend europeo non è mai quello che compare sui banner di Ryanair. Un conto è il volo, un altro è un hotel decente in una zona dove vorresti effettivamente dormire. Ecco un confronto onesto delle cinque destinazioni che proponiamo.",
      "Roma — da €280 per 2 notti. Quartieri consigliati: Monti, Trastevere. Da evitare: dintorni Termini. Qualità/prezzo imbattibile se vivi nel Nord Italia.",
      "Praga — da €295 per 2 notti. Malá Strana e Vinohrady sono i quartieri giusti. La città più economica del lotto una volta atterrati: birra, cena e trasporti costano il 40% in meno rispetto a Roma.",
      "Barcellona — da €320 per 3 notti. Eixample o Gràcia, mai la Rambla. La leva qui è il volo: economicissimo tutto l'anno dai principali scali italiani.",
      "Lisbona — da €345 per 3 notti. Príncipe Real o Alfama per il miglior equilibrio tra atmosfera e camminabilità. Cibo e vino fra i più economici d'Europa occidentale.",
      "Amsterdam — da €365 per 3 notti. È la più cara per hotel, ma l'esperienza del centro compatto compensa. Jordaan o De Pijp.",
      "Il trucco non è sempre scegliere la più economica, ma capire dove il tuo budget vale di più per il tipo di viaggio che vuoi fare. I pacchetti Backpack & Bottle sono tutti all-in: volo, hotel, tasse, senza sorprese.",
    ],
  },
];
