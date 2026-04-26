import type { Locale } from "./content";

export type Destination = {
  slug: string;
  city: { it: string; en: string };
  country: { it: string; en: string };
  countryCode: string;
  flag: string;
  price: number;
  nights: number;
  flightTime: string;
  currency: string;
  bestMonths: string;
  tag: { it: string; en: string };
  hero: string;
  gallery: string[];
  hook: { it: string; en: string };
  intro: { it: string[]; en: string[] };
  neighborhoods: { name: string; vibe: { it: string; en: string } }[];
  food: { name: string; note: { it: string; en: string } }[];
  itinerary: {
    day: number;
    title: { it: string; en: string };
    items: { it: string; en: string }[];
  }[];
  whatIncluded: { it: string[]; en: string[] };
  faq: { q: { it: string; en: string }; a: { it: string; en: string } }[];
  weatherHint: { it: string; en: string };
  budgetTip: { it: string; en: string };
};

export const destinations: Destination[] = [
  {
    slug: "rome",
    city: { it: "Roma", en: "Rome" },
    country: { it: "Italia", en: "Italy" },
    countryCode: "IT",
    flag: "🇮🇹",
    price: 280,
    nights: 2,
    flightTime: "1h 15min",
    currency: "EUR",
    bestMonths: "Apr–Jun, Sep–Oct",
    tag: { it: "Classico", en: "Classic" },
    hero: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1200&q=80",
    ],
    hook: {
      it: "Tre giorni che bastano. Niente Colosseo affollato alle 11. Niente trattorie da turisti.",
      en: "Three days, done right. No 11am Colosseum scrum. No tourist-trap trattorias.",
    },
    intro: {
      it: [
        "Roma in 48 ore funziona se decidi prima cosa lasciare fuori. Il nostro pacchetto seleziona Monti e Trastevere come basi, evita Termini, e suggerisce orari intelligenti per i grandi monumenti (Colosseo all'apertura, Vaticano martedì pomeriggio).",
        "Hotel boutique 3-4 stelle in zone pedonali. Volo diretto da Milano (1h15) o treno alta velocità da Bologna (2h05).",
      ],
      en: [
        "Rome in 48 hours works if you decide what to leave out first. Our package puts you in Monti or Trastevere, avoids Termini, and suggests smart timings for the big sights (Colosseum at opening, Vatican Tuesday afternoon).",
        "3-4 star boutique hotel in walkable zones. Direct flight from Milan (1h15) or high-speed train from Bologna (2h05).",
      ],
    },
    neighborhoods: [
      { name: "Monti", vibe: { it: "Cool, vinoteche, artigiani, dietro al Colosseo", en: "Cool, wine bars, artisans, just behind the Colosseum" } },
      { name: "Trastevere", vibe: { it: "Atmosfera, cene all'aperto, viuzze acciottolate", en: "Atmosphere, outdoor dining, cobbled lanes" } },
      { name: "Testaccio", vibe: { it: "Gastronomia romana vera, mercato leggendario", en: "Real Roman food, legendary market" } },
    ],
    food: [
      { name: "Cacio e pepe @ Felice a Testaccio", note: { it: "Prenotare 2 settimane prima.", en: "Book two weeks ahead." } },
      { name: "Pizza al taglio @ Bonci Pizzarium", note: { it: "Pranzo veloce, eccellente.", en: "Fast lunch, exceptional." } },
      { name: "Suppli @ Trapizzino", note: { it: "Spuntino pomeridiano.", en: "Afternoon snack." } },
    ],
    itinerary: [
      {
        day: 1,
        title: { it: "Centro storico + tramonto", en: "Historic centre + sunset" },
        items: [
          { it: "Mattina: passeggiata da Piazza Navona al Pantheon. Caffè a Sant'Eustachio.", en: "Morning: stroll Piazza Navona to the Pantheon. Coffee at Sant'Eustachio." },
          { it: "Pranzo: Roscioli o Pianostrada.", en: "Lunch: Roscioli or Pianostrada." },
          { it: "Pomeriggio: Galleria Borghese (prenotare). Tramonto al Pincio.", en: "Afternoon: Galleria Borghese (book ahead). Sunset at the Pincio." },
        ],
      },
      {
        day: 2,
        title: { it: "Roma antica + Trastevere", en: "Ancient Rome + Trastevere" },
        items: [
          { it: "Apertura Colosseo + Foro Romano (biglietto 24h, salta-fila).", en: "Colosseum + Forum at opening (24h skip-the-line ticket)." },
          { it: "Pranzo a Testaccio. Mercato + Felice.", en: "Lunch in Testaccio. Market + Felice." },
          { it: "Sera a Trastevere. Aperitivo a Freni e Frizioni.", en: "Evening in Trastevere. Aperitivo at Freni e Frizioni." },
        ],
      },
    ],
    whatIncluded: {
      it: ["Volo A/R da MXP/FCO/BLQ", "2 notti hotel 3-4★ centro", "Tasse e bagaglio a mano", "Mappa curata + 5 prenotazioni ristorante suggerite", "Concierge WhatsApp 9–21"],
      en: ["Round-trip flight from MXP/FCO/BLQ", "2 nights 3-4★ central hotel", "Taxes + cabin baggage", "Curated map + 5 suggested restaurant bookings", "WhatsApp concierge 9–9"],
    },
    faq: [
      { q: { it: "Posso aggiungere una notte?", en: "Can I add a night?" }, a: { it: "Sì, +€95/notte. Si può estendere a Napoli (+€120 totali con treno).", en: "Yes, +€95/night. You can extend to Naples (+€120 total incl. train)." } },
      { q: { it: "Il volo è diretto?", en: "Is the flight direct?" }, a: { it: "Sempre diretto. Selezioniamo orari decenti (no voli alle 5 del mattino).", en: "Always direct. We pick decent hours (no 5am flights)." } },
    ],
    weatherHint: { it: "Aprile-giugno: 18-26°C, luce dorata. Luglio-agosto evitare.", en: "Apr–Jun: 18–26°C, golden light. Avoid Jul–Aug." },
    budgetTip: { it: "Spesa media in città: €50–70/giorno cibo+caffè.", en: "Average daily spend in town: €50–70 food + coffee." },
  },
  {
    slug: "barcelona",
    city: { it: "Barcellona", en: "Barcelona" },
    country: { it: "Spagna", en: "Spain" },
    countryCode: "ES",
    flag: "🇪🇸",
    price: 320,
    nights: 3,
    flightTime: "1h 50min",
    currency: "EUR",
    bestMonths: "May–Jun, Sep",
    tag: { it: "Mare & città", en: "Coast & city" },
    hero: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591290619762-c1cd1b67ab35?auto=format&fit=crop&w=1200&q=80",
    ],
    hook: {
      it: "Gràcia invece di Las Ramblas. Vermut alle 19. Bunkers del Carmel al tramonto.",
      en: "Gràcia instead of Las Ramblas. Vermut at 7. Bunkers del Carmel at sunset.",
    },
    intro: {
      it: [
        "Barcellona ha tre città dentro: quella per turisti (Ramblas), quella per locali (Gràcia, Poblenou) e quella che si arrampica sulla collina (Sarrià, Tibidabo). Il nostro pacchetto evita la prima e mescola le altre due.",
        "Hotel boutique a Eixample (camminabilità) o Gràcia (atmosfera). Voli da tutti gli scali principali in 1h50.",
      ],
      en: [
        "Barcelona has three cities inside: the tourist one (Ramblas), the local one (Gràcia, Poblenou) and the one climbing the hill (Sarrià, Tibidabo). Our package skips the first and mixes the other two.",
        "Boutique hotel in Eixample (walkability) or Gràcia (atmosphere). Flights from all major Italian airports in 1h50.",
      ],
    },
    neighborhoods: [
      { name: "Gràcia", vibe: { it: "Indipendente, piazze, vermut, pranzi lunghi", en: "Indie, plazas, vermut, long lunches" } },
      { name: "El Born", vibe: { it: "Design, tapas, Picasso", en: "Design, tapas, Picasso" } },
      { name: "Poblenou", vibe: { it: "Ex-industriale, mare, brunch", en: "Ex-industrial, beach, brunch" } },
    ],
    food: [
      { name: "Vermut @ La Pubilla", note: { it: "Domenica mattina è religione locale.", en: "Sunday morning is a local ritual." } },
      { name: "Tapas @ El Xampanyet", note: { it: "Solo in piedi, banco affollato, vale.", en: "Standing only, packed bar, worth it." } },
      { name: "Paella vera @ Can Solé", note: { it: "Non Las Ramblas. Mai.", en: "Not Las Ramblas. Ever." } },
    ],
    itinerary: [
      {
        day: 1,
        title: { it: "Gràcia + Eixample", en: "Gràcia + Eixample" },
        items: [
          { it: "Mattina: Casa Vicens, primo Gaudí. Pranzo Cal Boter.", en: "Morning: Casa Vicens, first Gaudí. Lunch Cal Boter." },
          { it: "Passeggiata Passeig de Gràcia: Casa Batlló da fuori, Casa Milà.", en: "Walk Passeig de Gràcia: Casa Batlló from outside, Casa Milà." },
          { it: "Cena tapas El Xampanyet a El Born.", en: "Tapas dinner at El Xampanyet in El Born." },
        ],
      },
      {
        day: 2,
        title: { it: "Sagrada + Bunkers", en: "Sagrada + Bunkers" },
        items: [
          { it: "Sagrada Família alle 9 (biglietto incluso, salta-fila).", en: "Sagrada Família at 9 (ticket included, skip-the-line)." },
          { it: "Pomeriggio: spiaggia Barceloneta o MACBA.", en: "Afternoon: Barceloneta beach or MACBA." },
          { it: "Tramonto Bunkers del Carmel (NON Park Güell affollato).", en: "Sunset at Bunkers del Carmel (not crowded Park Güell)." },
        ],
      },
      {
        day: 3,
        title: { it: "Gotico + Poblenou", en: "Gothic + Poblenou" },
        items: [
          { it: "Mattina Barri Gòtic: Cattedrale, Plaça Reial.", en: "Morning Barri Gòtic: Cathedral, Plaça Reial." },
          { it: "Pranzo Caravelle a El Born. Pomeriggio in Poblenou.", en: "Lunch Caravelle in El Born. Afternoon in Poblenou." },
        ],
      },
    ],
    whatIncluded: {
      it: ["Volo A/R", "3 notti hotel 3-4★ Eixample/Gràcia", "Sagrada Família salta-fila incluso", "Mappa curata + 6 prenotazioni", "Concierge WhatsApp"],
      en: ["Round-trip flight", "3 nights 3-4★ in Eixample/Gràcia", "Sagrada Família skip-the-line included", "Curated map + 6 bookings", "WhatsApp concierge"],
    },
    faq: [
      { q: { it: "È sicura per gruppi?", en: "Safe for groups?" }, a: { it: "Sì. Pickpockets nelle Ramblas, evitate.", en: "Yes. Pickpockets on Las Ramblas — avoid." } },
      { q: { it: "Va bene l'inglese?", en: "Will English work?" }, a: { it: "Centro: sì. Quartieri locali: utile spagnolo base.", en: "Centre: yes. Local neighborhoods: basic Spanish helps." } },
    ],
    weatherHint: { it: "Maggio: 22°C perfetti. Agosto pesante e affollato.", en: "May: 22°C perfect. August heavy and crowded." },
    budgetTip: { it: "Tapas + vino: €25–35/persona. Cena ristorante: €40–60.", en: "Tapas + wine: €25–35/person. Sit-down dinner: €40–60." },
  },
  {
    slug: "amsterdam",
    city: { it: "Amsterdam", en: "Amsterdam" },
    country: { it: "Paesi Bassi", en: "Netherlands" },
    countryCode: "NL",
    flag: "🇳🇱",
    price: 365,
    nights: 3,
    flightTime: "2h 10min",
    currency: "EUR",
    bestMonths: "Apr–May, Sep",
    tag: { it: "Canali & design", en: "Canals & design" },
    hero: "https://images.unsplash.com/photo-1534351590666-13e3e96c5017?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576924542622-772579d6f8d3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584003564911-a4abc8a83d2b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558551649-e44c8f992010?auto=format&fit=crop&w=1200&q=80",
    ],
    hook: {
      it: "Bici a noleggio dal primo giorno. Jordaan + De Pijp. Niente Coffee Shop turistici.",
      en: "Rental bike day one. Jordaan + De Pijp. Skip the tourist coffeeshops.",
    },
    intro: {
      it: [
        "Amsterdam funziona davvero solo in bici. Il nostro pacchetto include il noleggio per tutti i giorni e un itinerario disegnato per ruote, non piedi.",
        "Hotel boutique in Jordaan o De Pijp. Voli diretti 2h10 da MXP/FCO/BLQ.",
      ],
      en: [
        "Amsterdam only really works on a bike. Our package includes rental for all days and an itinerary designed for wheels, not feet.",
        "Boutique hotel in Jordaan or De Pijp. Direct flights 2h10 from MXP/FCO/BLQ.",
      ],
    },
    neighborhoods: [
      { name: "Jordaan", vibe: { it: "Canali stretti, gallerie, lunch slow", en: "Narrow canals, galleries, slow lunches" } },
      { name: "De Pijp", vibe: { it: "Mercato Albert Cuyp, multi-culti, brunch", en: "Albert Cuyp market, multi-culti, brunch" } },
      { name: "Oost", vibe: { it: "Brewery + parchi + quieto", en: "Brewery + parks + quiet" } },
    ],
    food: [
      { name: "Stroopwafel @ Albert Cuyp", note: { it: "Caldo, appena fatto.", en: "Hot, fresh off the press." } },
      { name: "Bitterballen @ De Ysbreeker", note: { it: "Aperitivo classico.", en: "Classic aperitivo snack." } },
      { name: "Brunch @ Bakers & Roasters", note: { it: "Coda 30 min, vale.", en: "30-min queue, worth it." } },
    ],
    itinerary: [
      {
        day: 1,
        title: { it: "Bici + canali", en: "Bike + canals" },
        items: [
          { it: "Ritiro bici. Giro anello canali (Prinsengracht).", en: "Pick up bike. Canal ring loop (Prinsengracht)." },
          { it: "Casa di Anne Frank (biglietto 9:00, prenotato).", en: "Anne Frank House (9am ticket, pre-booked)." },
          { it: "Pranzo Winkel 43 (mela pie famosa).", en: "Lunch Winkel 43 (famous apple pie)." },
        ],
      },
      {
        day: 2,
        title: { it: "Musei + De Pijp", en: "Museums + De Pijp" },
        items: [
          { it: "Rijksmuseum apertura. Vermeer + Rembrandt.", en: "Rijksmuseum at opening. Vermeer + Rembrandt." },
          { it: "Pranzo De Pijp. Mercato Albert Cuyp.", en: "Lunch De Pijp. Albert Cuyp market." },
          { it: "Heineken Experience + cena.", en: "Heineken Experience + dinner." },
        ],
      },
      {
        day: 3,
        title: { it: "Oost + brewery", en: "Oost + brewery" },
        items: [
          { it: "Brouwerij 't IJ sotto al mulino.", en: "Brouwerij 't IJ under the windmill." },
          { it: "NEMO Science Museum tetto = vista gratis.", en: "NEMO Science Museum rooftop = free view." },
        ],
      },
    ],
    whatIncluded: {
      it: ["Volo A/R", "3 notti hotel 3-4★", "Bici 3 giorni inclusa", "Casa Anne Frank salta-fila", "Mappa ciclabile curata"],
      en: ["Round-trip flight", "3 nights 3-4★ hotel", "3-day bike rental included", "Anne Frank House skip-line", "Curated cycling map"],
    },
    faq: [
      { q: { it: "Devo saper andare in bici bene?", en: "Do I need to be a confident cyclist?" }, a: { it: "Base sì. La città è piatta. Ti diamo 30 min di onboarding.", en: "Basic yes. The city is flat. We give you a 30-min onboarding." } },
    ],
    weatherHint: { it: "Aprile fiori. Settembre meno piovoso.", en: "April for flowers. September less rainy." },
    budgetTip: { it: "Cara per cibo: pianifica €60–80/giorno.", en: "Pricey for food: budget €60–80/day." },
  },
  {
    slug: "lisbon",
    city: { it: "Lisbona", en: "Lisbon" },
    country: { it: "Portogallo", en: "Portugal" },
    countryCode: "PT",
    flag: "🇵🇹",
    price: 345,
    nights: 3,
    flightTime: "2h 50min",
    currency: "EUR",
    bestMonths: "Apr–Jun, Sep–Oct",
    tag: { it: "Atlantico", en: "Atlantic" },
    hero: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518634441303-7c4523f8e7ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588535949054-d83a8e8d4f10?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556007499-a45fd5dba36f?auto=format&fit=crop&w=1200&q=80",
    ],
    hook: {
      it: "Pastel de nata alle 10. Tram 28 alle 14. Belém al tramonto. Fado alle 22.",
      en: "Pastel de nata at 10. Tram 28 at 2. Belém at sunset. Fado at 10pm.",
    },
    intro: {
      it: [
        "Lisbona è la capitale economica più sottostimata d'Europa occidentale. Ottimo cibo a metà prezzo di Roma. Vista su sette colli.",
        "Hotel a Príncipe Real o Alfama. Voli 2h50 (TAP, ITA, easyJet).",
      ],
      en: [
        "Lisbon is the most underrated affordable capital in western Europe. Great food at half Rome prices. Views over seven hills.",
        "Hotel in Príncipe Real or Alfama. 2h50 flights (TAP, ITA, easyJet).",
      ],
    },
    neighborhoods: [
      { name: "Príncipe Real", vibe: { it: "Concept store, terrazze, calmo", en: "Concept stores, terraces, calm" } },
      { name: "Alfama", vibe: { it: "Vecchia Lisbona, fado, scalinate", en: "Old Lisbon, fado, staircases" } },
      { name: "LX Factory", vibe: { it: "Ex-fabbrica, design, libreria storica", en: "Old factory complex, design, legendary bookshop" } },
    ],
    food: [
      { name: "Pastéis de Belém", note: { it: "L'originale dal 1837. Coda mobile.", en: "The original since 1837. Queue moves fast." } },
      { name: "Bacalhau @ Cervejaria Ramiro", note: { it: "Pesce e crostacei. Aspetta seduto al bar.", en: "Seafood. Wait at the bar." } },
      { name: "Ginjinha @ A Ginjinha", note: { it: "Liquore di amarena, banco minuscolo.", en: "Sour-cherry liqueur, tiny bar." } },
    ],
    itinerary: [
      {
        day: 1,
        title: { it: "Centro storico", en: "Historic centre" },
        items: [
          { it: "Mattina Baixa + Chiado. Caffè a A Brasileira.", en: "Morning Baixa + Chiado. Coffee at A Brasileira." },
          { it: "Tram 28 fino ad Alfama (sì è da turisti, sì vale).", en: "Tram 28 to Alfama (yes touristy, yes worth it)." },
          { it: "Tramonto Miradouro de Santa Catarina.", en: "Sunset at Miradouro de Santa Catarina." },
        ],
      },
      {
        day: 2,
        title: { it: "Belém + LX Factory", en: "Belém + LX Factory" },
        items: [
          { it: "Mattina Belém: Torre, Mosteiro, pasteis originali.", en: "Morning Belém: Tower, Monastery, original pasteis." },
          { it: "Pomeriggio LX Factory.", en: "Afternoon LX Factory." },
          { it: "Sera Fado intimo a Mesa de Frades (prenotato).", en: "Evening intimate Fado at Mesa de Frades (booked)." },
        ],
      },
      {
        day: 3,
        title: { it: "Gita Sintra (opzionale)", en: "Day trip Sintra (optional)" },
        items: [
          { it: "Treno 40 min. Palácio da Pena + Quinta da Regaleira.", en: "40-min train. Palácio da Pena + Quinta da Regaleira." },
        ],
      },
    ],
    whatIncluded: {
      it: ["Volo A/R", "3 notti hotel 3-4★ centro", "Tram 28 e Belém Tower inclusi", "Itinerario Sintra opzionale (treno extra €5)", "Mappa curata"],
      en: ["Round-trip flight", "3 nights 3-4★ central hotel", "Tram 28 + Belém Tower included", "Sintra day-trip option (€5 extra train)", "Curated map"],
    },
    faq: [
      { q: { it: "Sintra vale la gita?", en: "Is Sintra worth a day trip?" }, a: { it: "Sì, ma alle 8 di mattina, prima delle folle.", en: "Yes, but go at 8am, before the crowds." } },
    ],
    weatherHint: { it: "Aprile-giugno: 17-24°C, mare ancora freddo.", en: "Apr–Jun: 17–24°C, sea still chilly." },
    budgetTip: { it: "Cibo molto economico: cena vino incluso €25–35.", en: "Food cheap: dinner with wine €25–35." },
  },
  {
    slug: "prague",
    city: { it: "Praga", en: "Prague" },
    country: { it: "Repubblica Ceca", en: "Czech Republic" },
    countryCode: "CZ",
    flag: "🇨🇿",
    price: 295,
    nights: 2,
    flightTime: "1h 45min",
    currency: "CZK",
    bestMonths: "Apr–Jun, Sep",
    tag: { it: "Storica", en: "Historic" },
    hero: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=1200&q=80",
    ],
    hook: {
      it: "Vinohrady invece di Old Town Square. Birra a 2 euro. Architettura Art Nouveau.",
      en: "Vinohrady instead of Old Town Square. €2 beer. Art Nouveau architecture.",
    },
    intro: {
      it: [
        "Praga ha un problema: il centro storico è perfetto ma assediato. La nostra strategia è dormire fuori (Vinohrady) e visitare in orari intelligenti.",
        "Voli diretti 1h45. Ottobre dorato, dicembre mercatini.",
      ],
      en: [
        "Prague has a problem: the historic centre is perfect but overrun. Our move is to sleep outside (Vinohrady) and visit at smart times.",
        "Direct flights 1h45. October golden, December markets.",
      ],
    },
    neighborhoods: [
      { name: "Vinohrady", vibe: { it: "Edwardiano, parchi, brunch, locali", en: "Edwardian, parks, brunch, locals" } },
      { name: "Malá Strana", vibe: { it: "Sotto il castello, tranquillo, ristoranti", en: "Below the castle, quiet, restaurants" } },
      { name: "Žižkov", vibe: { it: "Bohemien, birrerie, torre famosa", en: "Bohemian, breweries, famous tower" } },
    ],
    food: [
      { name: "Svíčková @ U Modré Kachničky", note: { it: "Carne brasata classica.", en: "Classic braised beef." } },
      { name: "Trdelník", note: { it: "Turistico ma divertente. Una volta basta.", en: "Touristy but fun. Once is enough." } },
      { name: "Pilsner @ Lokál", note: { it: "Birra non pastorizzata.", en: "Unpasteurised beer." } },
    ],
    itinerary: [
      {
        day: 1,
        title: { it: "Centro + ponte", en: "Centre + bridge" },
        items: [
          { it: "Old Town Square alle 8 (vuota). Orologio astronomico.", en: "Old Town Square at 8 (empty). Astronomical clock." },
          { it: "Pranzo Lokál Dlouhááá. Pomeriggio Charles Bridge.", en: "Lunch Lokál Dlouhááá. Afternoon Charles Bridge." },
          { it: "Sera Vinohrady: cena + birreria.", en: "Evening Vinohrady: dinner + brewery." },
        ],
      },
      {
        day: 2,
        title: { it: "Castello + Malá Strana", en: "Castle + Malá Strana" },
        items: [
          { it: "Castello apertura + St Vitus.", en: "Castle at opening + St Vitus Cathedral." },
          { it: "Pranzo Malá Strana. Pomeriggio John Lennon Wall.", en: "Lunch Malá Strana. Afternoon John Lennon Wall." },
        ],
      },
    ],
    whatIncluded: {
      it: ["Volo A/R", "2 notti hotel 3-4★ Vinohrady", "Castello + St Vitus inclusi", "Mappa + locali consigliati"],
      en: ["Round-trip flight", "2 nights 3-4★ in Vinohrady", "Castle + St Vitus included", "Map + recommended local spots"],
    },
    faq: [
      { q: { it: "Si paga in euro?", en: "Can I pay in euros?" }, a: { it: "Solo nei tourist trap. Usa CZK con carta.", en: "Only in tourist traps. Use CZK by card." } },
    ],
    weatherHint: { it: "Maggio: 18°C. Dicembre per mercatini, freddo serio.", en: "May: 18°C. December for markets, seriously cold." },
    budgetTip: { it: "Pasto completo €15–25. Birra €2.50.", en: "Full meal €15–25. Beer €2.50." },
  },
  // ---- 5 NEW DESTINATIONS ----
  {
    slug: "paris",
    city: { it: "Parigi", en: "Paris" },
    country: { it: "Francia", en: "France" },
    countryCode: "FR",
    flag: "🇫🇷",
    price: 395,
    nights: 3,
    flightTime: "2h",
    currency: "EUR",
    bestMonths: "May–Jun, Sep",
    tag: { it: "Iconica", en: "Iconic" },
    hero: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1200&q=80",
    ],
    hook: {
      it: "Le Marais a piedi. Croissant alle 8. Picnic Pont des Arts. Nessun museo affollato.",
      en: "Le Marais on foot. Croissant at 8. Picnic Pont des Arts. Skip the crowded museums.",
    },
    intro: {
      it: [
        "Parigi funziona per quartieri. Le Marais (boutique + falafel), Saint-Germain (caffè storici), Canal Saint-Martin (giovane). Il nostro pacchetto sceglie un hotel a Le Marais e itinerari per quartiere.",
      ],
      en: [
        "Paris works neighborhood by neighborhood. Le Marais (boutiques + falafel), Saint-Germain (historic cafés), Canal Saint-Martin (young). Our package books a Le Marais hotel and walks you through, district by district.",
      ],
    },
    neighborhoods: [
      { name: "Le Marais", vibe: { it: "Centrale, walkable, gay-friendly, design", en: "Central, walkable, gay-friendly, design" } },
      { name: "Saint-Germain", vibe: { it: "Caffè letterari, librerie, sofisticato", en: "Literary cafés, bookshops, sophisticated" } },
      { name: "Canal Saint-Martin", vibe: { it: "Giovane, brunch, vintage", en: "Young, brunch, vintage" } },
    ],
    food: [
      { name: "Croissant @ Du Pain et des Idées", note: { it: "Migliori della città. 8:00.", en: "Best in town. Get there at 8." } },
      { name: "Falafel @ L'As du Fallafel", note: { it: "Coda 20 min, take-away.", en: "20-min queue, take-away." } },
      { name: "Bistrot @ Septime", note: { it: "Prenotare 3 settimane prima.", en: "Book 3 weeks ahead." } },
    ],
    itinerary: [
      {
        day: 1,
        title: { it: "Le Marais + isole", en: "Le Marais + islands" },
        items: [
          { it: "Mattina Place des Vosges. Picasso Museum.", en: "Morning Place des Vosges. Picasso Museum." },
          { it: "Pranzo falafel. Pomeriggio Île de la Cité + Île Saint-Louis.", en: "Lunch falafel. Afternoon Île de la Cité + Île Saint-Louis." },
        ],
      },
      {
        day: 2,
        title: { it: "Louvre + Tuileries + Eiffel", en: "Louvre + Tuileries + Eiffel" },
        items: [
          { it: "Louvre 9:00 (biglietto incluso). Solo 3 ali.", en: "Louvre at 9 (ticket included). Just 3 wings." },
          { it: "Pranzo Café Marly. Tuileries. Tramonto a Trocadéro.", en: "Lunch Café Marly. Tuileries. Sunset at Trocadéro." },
        ],
      },
      {
        day: 3,
        title: { it: "Montmartre + Saint-Germain", en: "Montmartre + Saint-Germain" },
        items: [
          { it: "Sacré-Cœur all'apertura. Pranzo Saint-Germain.", en: "Sacré-Cœur at opening. Lunch Saint-Germain." },
        ],
      },
    ],
    whatIncluded: {
      it: ["Volo A/R", "3 notti boutique Le Marais", "Louvre salta-fila", "Mappa quartieri", "5 prenotazioni"],
      en: ["Round-trip flight", "3 nights boutique Le Marais", "Louvre skip-the-line", "Neighborhood map", "5 bookings"],
    },
    faq: [
      { q: { it: "Eurostar dall'Italia?", en: "Eurostar from Italy?" }, a: { it: "No, treni TGV via Lione: 7h. Volo migliore.", en: "No, TGV via Lyon: 7h. Flight is better." } },
    ],
    weatherHint: { it: "Maggio-giugno perfetti. Agosto chiusura locali.", en: "May–June perfect. August many places close." },
    budgetTip: { it: "Cena €40–70. Boulangerie pranzo €10.", en: "Dinner €40–70. Bakery lunch €10." },
  },
  {
    slug: "vienna",
    city: { it: "Vienna", en: "Vienna" },
    country: { it: "Austria", en: "Austria" },
    countryCode: "AT",
    flag: "🇦🇹",
    price: 335,
    nights: 3,
    flightTime: "1h 30min",
    currency: "EUR",
    bestMonths: "May–Jun, Sep, Dec markets",
    tag: { it: "Imperiale", en: "Imperial" },
    hero: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551867633-194f125bddfa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583678283306-8b8e60b04e3e?auto=format&fit=crop&w=1200&q=80",
    ],
    hook: {
      it: "Caffè Sacher senza coda. Klimt al Belvedere. Naschmarkt sabato mattina.",
      en: "Sacher coffee without the queue. Klimt at Belvedere. Naschmarkt Saturday morning.",
    },
    intro: {
      it: [
        "Vienna è una capitale che si gira a piedi. Storia imperiale ma ritmo umano. Gli abitanti vivono nei caffè, non nei bar.",
      ],
      en: [
        "Vienna is a capital you walk. Imperial history at human pace. Locals live in cafés, not bars.",
      ],
    },
    neighborhoods: [
      { name: "Innere Stadt", vibe: { it: "Centro storico UNESCO", en: "UNESCO historic centre" } },
      { name: "Neubau (7th)", vibe: { it: "Hipster, design, ristoranti nuovi", en: "Hipster, design, new restaurants" } },
      { name: "Karmeliterviertel (2nd)", vibe: { it: "Ebraico storico, mercato, calmo", en: "Historic Jewish, market, quiet" } },
    ],
    food: [
      { name: "Wiener Schnitzel @ Figlmüller", note: { it: "Grande come il piatto.", en: "Plate-sized." } },
      { name: "Sachertorte @ Demel", note: { it: "Migliore di Sacher (controverso).", en: "Better than Sacher (controversial)." } },
      { name: "Tafelspitz @ Plachutta", note: { it: "Manzo bollito imperiale.", en: "Imperial boiled beef." } },
    ],
    itinerary: [
      {
        day: 1,
        title: { it: "Imperiale", en: "Imperial" },
        items: [
          { it: "Hofburg + Sisi Museum.", en: "Hofburg + Sisi Museum." },
          { it: "Pranzo Café Central. Albertina pomeriggio.", en: "Lunch Café Central. Albertina afternoon." },
        ],
      },
      {
        day: 2,
        title: { it: "Klimt + Schönbrunn", en: "Klimt + Schönbrunn" },
        items: [
          { it: "Belvedere mattina (Klimt Bacio).", en: "Belvedere morning (Klimt's Kiss)." },
          { it: "Schönbrunn pomeriggio.", en: "Schönbrunn afternoon." },
        ],
      },
      {
        day: 3,
        title: { it: "Neubau + mercato", en: "Neubau + market" },
        items: [
          { it: "Naschmarkt sabato. MuseumsQuartier.", en: "Naschmarkt Saturday. MuseumsQuartier." },
        ],
      },
    ],
    whatIncluded: {
      it: ["Volo A/R", "3 notti hotel 3-4★ Innere Stadt", "Belvedere + Schönbrunn salta-fila", "Mappa caffè storici"],
      en: ["Round-trip flight", "3 nights 3-4★ Innere Stadt", "Belvedere + Schönbrunn skip-line", "Historic cafés map"],
    },
    faq: [
      { q: { it: "Mercatini di Natale?", en: "Christmas markets?" }, a: { it: "Pacchetto dicembre disponibile, +€40.", en: "December package available, +€40." } },
    ],
    weatherHint: { it: "Maggio mite. Dicembre magico ma -2°C.", en: "May mild. December magical but -2°C." },
    budgetTip: { it: "Café 2h con torta = €15. Cena €30–50.", en: "2h café with cake = €15. Dinner €30–50." },
  },
  {
    slug: "berlin",
    city: { it: "Berlino", en: "Berlin" },
    country: { it: "Germania", en: "Germany" },
    countryCode: "DE",
    flag: "🇩🇪",
    price: 305,
    nights: 3,
    flightTime: "1h 50min",
    currency: "EUR",
    bestMonths: "May–Sep",
    tag: { it: "Underground", en: "Underground" },
    hero: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587330979470-3016b6702d89?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551708698-91c4ad1edab2?auto=format&fit=crop&w=1200&q=80",
    ],
    hook: {
      it: "Kreuzberg. Currywurst alle 2 di notte. Tempelhof in bici. Niente Disneyland del Muro.",
      en: "Kreuzberg. Currywurst at 2am. Tempelhof by bike. Skip the Wall theme park.",
    },
    intro: {
      it: [
        "Berlino è cinque città in una. Mitte istituzionale, Kreuzberg multi-culti, Friedrichshain notturna, Prenzlauer Berg famiglie, Charlottenburg classico. Stiamo a Kreuzberg.",
      ],
      en: [
        "Berlin is five cities in one. Institutional Mitte, multi-culti Kreuzberg, nightlife Friedrichshain, family Prenzlauer Berg, classic Charlottenburg. We stay in Kreuzberg.",
      ],
    },
    neighborhoods: [
      { name: "Kreuzberg", vibe: { it: "Multi-culti, street food turco, club, arte", en: "Multi-culti, Turkish street food, clubs, art" } },
      { name: "Mitte", vibe: { it: "Storia, gallerie, ristoranti", en: "History, galleries, restaurants" } },
      { name: "Friedrichshain", vibe: { it: "Notturno, Berghain, Boxhagener Platz", en: "Nightlife, Berghain, Boxhagener Platz" } },
    ],
    food: [
      { name: "Döner @ Mustafa's Gemüse Kebap", note: { it: "Coda lunga, leggenda.", en: "Long queue, legendary." } },
      { name: "Currywurst @ Curry 36", note: { it: "Spuntino notturno classico.", en: "Classic late-night snack." } },
      { name: "Brunch @ House of Small Wonder", note: { it: "Mitte, prenotare.", en: "Mitte, book ahead." } },
    ],
    itinerary: [
      {
        day: 1,
        title: { it: "Storia + East Side Gallery", en: "History + East Side Gallery" },
        items: [
          { it: "Brandenburger Tor + Memoriale Olocausto.", en: "Brandenburg Gate + Holocaust Memorial." },
          { it: "Pomeriggio East Side Gallery in bici.", en: "Afternoon East Side Gallery by bike." },
        ],
      },
      {
        day: 2,
        title: { it: "Musei + Tempelhof", en: "Museums + Tempelhof" },
        items: [
          { it: "Museumsinsel mattina (Pergamon o Neues).", en: "Museum Island morning (Pergamon or Neues)." },
          { it: "Pomeriggio Tempelhofer Feld (ex aeroporto, bici).", en: "Tempelhofer Feld afternoon (old airport, bike)." },
        ],
      },
      {
        day: 3,
        title: { it: "Kreuzberg deep", en: "Kreuzberg deep" },
        items: [
          { it: "Türkenmarkt giovedì. Görlitzer Park.", en: "Türkenmarkt Thursday. Görlitzer Park." },
        ],
      },
    ],
    whatIncluded: {
      it: ["Volo A/R", "3 notti hotel Kreuzberg", "Bici 2 giorni inclusa", "Museumsinsel pass", "Mappa club + ristoranti"],
      en: ["Round-trip flight", "3 nights Kreuzberg hotel", "2-day bike rental", "Museum Island pass", "Club + restaurant map"],
    },
    faq: [
      { q: { it: "Berghain?", en: "Berghain?" }, a: { it: "Coda 4h, dress code dark, niente garanzia. Buona fortuna.", en: "4h queue, dark dress code, no guarantees. Good luck." } },
    ],
    weatherHint: { it: "Estate europea perfetta. Inverno duro.", en: "Perfect European summer. Winter is harsh." },
    budgetTip: { it: "Capitale economica: pasto €12–25, birra €4.", en: "Cheap capital: meal €12–25, beer €4." },
  },
  {
    slug: "copenhagen",
    city: { it: "Copenaghen", en: "Copenhagen" },
    country: { it: "Danimarca", en: "Denmark" },
    countryCode: "DK",
    flag: "🇩🇰",
    price: 425,
    nights: 3,
    flightTime: "2h 15min",
    currency: "DKK",
    bestMonths: "May–Aug",
    tag: { it: "Hygge", en: "Hygge" },
    hero: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599507593362-c8b87b2c1a98?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568797629192-789acf8e4df3?auto=format&fit=crop&w=1200&q=80",
    ],
    hook: {
      it: "Bici sempre. Reffen street food. Tivoli al tramonto. Smørrebrød a pranzo.",
      en: "Bike always. Reffen street food. Tivoli at sunset. Smørrebrød for lunch.",
    },
    intro: {
      it: [
        "Copenaghen è cara ma è la migliore design-city d'Europa. Si gira tutto in bici, il porto è balneabile, il cibo nuovo nordico è esploso.",
      ],
      en: [
        "Copenhagen is expensive but Europe's best design city. Bike everywhere, swimmable harbour, new Nordic food scene exploded.",
      ],
    },
    neighborhoods: [
      { name: "Vesterbro", vibe: { it: "Hipster, ex-meatpacking, ristoranti", en: "Hipster, ex-meatpacking, restaurants" } },
      { name: "Nørrebro", vibe: { it: "Multi-culti, Superkilen park, Jægersborggade", en: "Multi-culti, Superkilen park, Jægersborggade" } },
      { name: "Christianshavn", vibe: { it: "Canali, Christiania, calmo", en: "Canals, Christiania, quiet" } },
    ],
    food: [
      { name: "Smørrebrød @ Aamanns Etablissement", note: { it: "Open-sandwich, classico moderno.", en: "Open sandwich, modern classic." } },
      { name: "Reffen", note: { it: "Street-food port. Domenica = vita.", en: "Street-food port. Sunday = the move." } },
      { name: "Hot dog @ DØP", note: { it: "Bio. Davanti al Round Tower.", en: "Organic. Next to the Round Tower." } },
    ],
    itinerary: [
      {
        day: 1,
        title: { it: "Centro + Nyhavn", en: "Centre + Nyhavn" },
        items: [
          { it: "Strøget pedonale. Nyhavn (foto, poi via).", en: "Strøget pedestrian street. Nyhavn (photo, then leave)." },
          { it: "Tivoli al tramonto.", en: "Tivoli at sunset." },
        ],
      },
      {
        day: 2,
        title: { it: "Bici + porto", en: "Bike + harbour" },
        items: [
          { it: "Tour bici: Christianshavn → Refshaleøen → Reffen.", en: "Bike: Christianshavn → Refshaleøen → Reffen." },
          { it: "Bagno al porto (sì, è pulito).", en: "Harbour swim (yes, it's clean)." },
        ],
      },
      {
        day: 3,
        title: { it: "Design + Nørrebro", en: "Design + Nørrebro" },
        items: [
          { it: "Designmuseum. Pranzo Jægersborggade.", en: "Designmuseum. Lunch Jægersborggade." },
        ],
      },
    ],
    whatIncluded: {
      it: ["Volo A/R", "3 notti hotel 3-4★", "Bici 3 giorni", "Tivoli + Designmuseum", "Mappa hygge"],
      en: ["Round-trip flight", "3 nights 3-4★ hotel", "3-day bike", "Tivoli + Designmuseum", "Hygge map"],
    },
    faq: [
      { q: { it: "Davvero così cara?", en: "Really that expensive?" }, a: { it: "Sì. Pacchetto fisso aiuta. Pranzi al volo.", en: "Yes. Fixed package helps. Cheap lunches recommended." } },
    ],
    weatherHint: { it: "Estate luce 18h. Inverno buio 16:00.", en: "Summer 18h light. Winter dark by 4pm." },
    budgetTip: { it: "Cara: pasto €25–60. Drink €10–14.", en: "Pricey: meal €25–60. Drink €10–14." },
  },
  {
    slug: "athens",
    city: { it: "Atene", en: "Athens" },
    country: { it: "Grecia", en: "Greece" },
    countryCode: "GR",
    flag: "🇬🇷",
    price: 295,
    nights: 3,
    flightTime: "2h 30min",
    currency: "EUR",
    bestMonths: "Apr–Jun, Sep–Oct",
    tag: { it: "Sole & rovine", en: "Sun & ruins" },
    hero: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602509471307-9aaa1aaba2d6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1597211833712-5e41faa202ea?auto=format&fit=crop&w=1200&q=80",
    ],
    hook: {
      it: "Acropoli all'apertura. Souvlaki a Plaka. Tramonto a Lycabettus. Mare 30 min.",
      en: "Acropolis at opening. Souvlaki in Plaka. Sunset on Lycabettus. Sea 30 min away.",
    },
    intro: {
      it: [
        "Atene si fa in 3 giorni se inviti il sole. Acropoli all'apertura, mare a Vouliagmeni nel pomeriggio, tramonto in collina, cena tarda.",
      ],
      en: [
        "Athens works in 3 days if you invite the sun. Acropolis at opening, swim at Vouliagmeni in the afternoon, sunset on the hill, late dinner.",
      ],
    },
    neighborhoods: [
      { name: "Plaka", vibe: { it: "Sotto l'Acropoli, turistico ma carino", en: "Under the Acropolis, touristy but pretty" } },
      { name: "Koukaki", vibe: { it: "Locale, ristoranti veri, centrale", en: "Local, real restaurants, central" } },
      { name: "Exarchia", vibe: { it: "Anarcho-punk, street art, librerie", en: "Anarcho-punk, street art, bookshops" } },
    ],
    food: [
      { name: "Souvlaki @ Kostas", note: { it: "1950. Stessa ricetta.", en: "Since 1950. Same recipe." } },
      { name: "Bougatsa @ Bougatsadiko Thessaloniki", note: { it: "Colazione greca classica.", en: "Classic Greek breakfast." } },
      { name: "Mezze @ Karamanlidika", note: { it: "Vino + 6 piatti = €25.", en: "Wine + 6 dishes = €25." } },
    ],
    itinerary: [
      {
        day: 1,
        title: { it: "Acropoli + Plaka", en: "Acropolis + Plaka" },
        items: [
          { it: "Acropoli 8:00. Museo dell'Acropoli (incluso).", en: "Acropolis at 8. Acropolis Museum (included)." },
          { it: "Pranzo Plaka. Pomeriggio Anafiotika.", en: "Lunch Plaka. Afternoon Anafiotika." },
          { it: "Tramonto Lycabettus.", en: "Sunset on Lycabettus." },
        ],
      },
      {
        day: 2,
        title: { it: "Mare a Vouliagmeni", en: "Sea at Vouliagmeni" },
        items: [
          { it: "Mattino Agorà + Kerameikos.", en: "Morning Agora + Kerameikos." },
          { it: "Pomeriggio Astir Beach (taxi 30 min).", en: "Afternoon Astir Beach (30-min taxi)." },
        ],
      },
      {
        day: 3,
        title: { it: "Koukaki + Exarchia", en: "Koukaki + Exarchia" },
        items: [
          { it: "Mercato Centrale. Pranzo souvlaki.", en: "Central Market. Lunch souvlaki." },
          { it: "Sera Exarchia: street art + cena.", en: "Evening Exarchia: street art + dinner." },
        ],
      },
    ],
    whatIncluded: {
      it: ["Volo A/R", "3 notti hotel 3★ Koukaki", "Acropoli + Museo salta-fila", "Transfer aeroporto", "Mappa mare 30 min"],
      en: ["Round-trip flight", "3 nights 3★ Koukaki", "Acropolis + Museum skip-line", "Airport transfer", "30-min beach map"],
    },
    faq: [
      { q: { it: "Posso aggiungere isole?", en: "Can I add islands?" }, a: { it: "Sì. Aegina (1h ferry) +€80. Hydra +€140.", en: "Yes. Aegina (1h ferry) +€80. Hydra +€140." } },
    ],
    weatherHint: { it: "Maggio: 24°C, mare 19°C. Agosto: 35°C, evita.", en: "May: 24°C, sea 19°C. August: 35°C, avoid." },
    budgetTip: { it: "Mezze + vino €15–20. Souvlaki €4.", en: "Mezze + wine €15–20. Souvlaki €4." },
  },
];

export const destinationBySlug = (slug: string) => destinations.find((d) => d.slug === slug);
