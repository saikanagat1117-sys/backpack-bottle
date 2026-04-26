export type Locale = "it" | "en";

// Re-export rich destinations from /lib/destinations.ts
export { destinations, destinationBySlug } from "./destinations";

// Legacy (kept for backwards compat in case anywhere imports it directly)
export const _legacyDestinations = [
  {
    slug: "rome",
    city: { it: "Roma", en: "Rome" },
    country: { it: "Italia", en: "Italy" },
    price: 280,
    nights: 2,
    img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    tag: { it: "Classico", en: "Classic" },
  },
  {
    slug: "barcelona",
    city: { it: "Barcellona", en: "Barcelona" },
    country: { it: "Spagna", en: "Spain" },
    price: 320,
    nights: 3,
    img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
    tag: { it: "Mare & città", en: "Coast & city" },
  },
  {
    slug: "amsterdam",
    city: { it: "Amsterdam", en: "Amsterdam" },
    country: { it: "Paesi Bassi", en: "Netherlands" },
    price: 365,
    nights: 3,
    img: "https://images.unsplash.com/photo-1534351590666-13e3e96c5017?auto=format&fit=crop&w=1200&q=80",
    tag: { it: "Canali & design", en: "Canals & design" },
  },
  {
    slug: "lisbon",
    city: { it: "Lisbona", en: "Lisbon" },
    country: { it: "Portogallo", en: "Portugal" },
    price: 345,
    nights: 3,
    img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80",
    tag: { it: "Atlantico", en: "Atlantic" },
  },
  {
    slug: "prague",
    city: { it: "Praga", en: "Prague" },
    country: { it: "Rep. Ceca", en: "Czech Rep." },
    price: 295,
    nights: 2,
    img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=80",
    tag: { it: "Storica", en: "Historic" },
  },
];

export const t = {
  nav: {
    destinations: { it: "Destinazioni", en: "Destinations" },
    how: { it: "Come funziona", en: "How it works" },
    blog: { it: "Blog", en: "Blog" },
    cta: { it: "Ottieni il coupon", en: "Get the coupon" },
  },
  hero: {
    eyebrow: {
      it: "Offerta early-booking · Estate 2026",
      en: "Early-booking offer · Summer 2026",
    },
    title: {
      it: "Basta con la ricerca infinita.\nSolo i weekend europei che valgono davvero.",
      en: "Skip the research fatigue.\nEuropean city breaks, only the ones worth booking.",
    },
    sub: {
      it: "5 destinazioni selezionate. Voli + hotel inclusi. Prezzi trasparenti. Ricevi €50 di sconto sulla tua prima prenotazione.",
      en: "5 curated destinations. Flights + hotels bundled. Transparent pricing. Get €50 off your first booking.",
    },
    cta1: { it: "Ricevi il coupon da €50", en: "Get the €50 coupon" },
    cta2: { it: "Vedi destinazioni", en: "See destinations" },
    proof: {
      it: "Nessuna carta richiesta · Validità 90 giorni · GDPR compliant",
      en: "No card required · 90-day validity · GDPR compliant",
    },
  },
  value: {
    title: {
      it: "Il tempo di un weekend vale più di 12 tab aperte su Booking.",
      en: "A weekend away is worth more than 12 open Booking tabs.",
    },
    body: {
      it: "Backpack & Bottle seleziona 3-5 pacchetti per città tra le migliori 5 destinazioni europee da 1h30–3h di volo dall'Italia. Niente trappole per turisti, niente prezzi che cambiano al checkout. Solo viaggi curati, con prezzi chiari, pronti in 5 minuti.",
      en: "Backpack & Bottle curates 3–5 packages per city across the top 5 European destinations 1.5–3 hours from Italy. No tourist traps, no prices that jump at checkout. Just curated trips with transparent pricing, bookable in 5 minutes.",
    },
  },
  pillars: [
    {
      t: { it: "Curati, non infiniti", en: "Curated, not overwhelming" },
      d: {
        it: "3-5 opzioni per destinazione, già vagliate per posizione e recensioni.",
        en: "3–5 options per city, pre-vetted for location and reviews.",
      },
    },
    {
      t: { it: "Prezzo chiaro, all-in", en: "All-in transparent pricing" },
      d: {
        it: "Volo + hotel + tasse. Quello che vedi è quello che paghi.",
        en: "Flight + hotel + taxes. What you see is what you pay.",
      },
    },
    {
      t: { it: "Esperienze autentiche", en: "Authentic local experiences" },
      d: {
        it: "Quartieri dove vivono i locali, non le trappole per turisti.",
        en: "Neighbourhoods where locals actually live — not tourist traps.",
      },
    },
    {
      t: { it: "Prenoti in 5 minuti", en: "Book in 5 minutes" },
      d: {
        it: "Pacchetti pronti, personalizzabili. Zero fatica di pianificazione.",
        en: "Ready-made packages, customisable. Zero planning fatigue.",
      },
    },
  ],
  how: {
    title: { it: "Come funziona", en: "How it works" },
    steps: [
      {
        t: { it: "1. Richiedi il coupon", en: "1. Claim the coupon" },
        d: {
          it: "Lascia la tua email. Ricevi subito €50 di sconto + la guida alle 5 destinazioni.",
          en: "Drop your email. Get €50 off instantly + our 5-destination guide.",
        },
      },
      {
        t: { it: "2. Scegli la tua città", en: "2. Pick your city" },
        d: {
          it: "Sfoglia 3-5 pacchetti selezionati per ogni destinazione. Date flessibili.",
          en: "Browse 3–5 curated packages per destination. Flexible dates.",
        },
      },
      {
        t: { it: "3. Prenota e parti", en: "3. Book and go" },
        d: {
          it: "Applica il coupon al checkout. Conferma via email con e-ticket.",
          en: "Apply the coupon at checkout. Instant email confirmation with e-tickets.",
        },
      },
    ],
  },
  destinations: {
    title: { it: "Le 5 destinazioni", en: "The 5 destinations" },
    sub: {
      it: "Tutte raggiungibili in 1h30–3h di volo da Milano, Roma, Bologna, Venezia, Torino.",
      en: "All reachable in 1.5–3 hours by flight from Milan, Rome, Bologna, Venice, Turin.",
    },
    from: { it: "Da", en: "From" },
    nights: { it: "notti", en: "nights" },
  },
  proof: {
    title: {
      it: "Perché i viaggiatori scelgono Backpack & Bottle",
      en: "Why travellers pick Backpack & Bottle",
    },
    stats: [
      { n: "500+", l: { it: "hotel vagliati", en: "hotels pre-vetted" } },
      { n: "5 min", l: { it: "per prenotare", en: "to book" } },
      { n: "0", l: { it: "costi nascosti", en: "hidden fees" } },
      { n: "€50", l: { it: "di sconto immediato", en: "instant discount" } },
    ],
  },
  form: {
    title: {
      it: "Ricevi il tuo coupon da €50",
      en: "Get your €50 coupon",
    },
    sub: {
      it: "Inserisci la tua email. Ti inviamo subito il coupon + la guida PDF delle 5 città. Valido 90 giorni.",
      en: "Enter your email. We'll send you the coupon + the 5-city PDF guide instantly. Valid 90 days.",
    },
    name: { it: "Nome", en: "First name" },
    email: { it: "Email", en: "Email" },
    city: { it: "Città di partenza preferita", en: "Preferred departure city" },
    interest: { it: "Destinazione che ti interessa di più", en: "Destination you're most curious about" },
    consent: {
      it: "Accetto di ricevere il coupon e i deal settimanali. Letta la privacy policy.",
      en: "I agree to receive the coupon and weekly deals. I have read the privacy policy.",
    },
    submit: { it: "Ricevi il coupon", en: "Send me the coupon" },
    sending: { it: "Invio in corso…", en: "Sending…" },
    error: { it: "Qualcosa è andato storto. Riprova.", en: "Something went wrong. Try again." },
  },
  footer: {
    tag: {
      it: "Weekend europei curati. Prezzi trasparenti. Prenotazione in 5 minuti.",
      en: "Curated European weekends. Transparent pricing. Book in 5 minutes.",
    },
    nav: { it: "Navigazione", en: "Navigation" },
    legal: { it: "Legale", en: "Legal" },
    privacy: { it: "Privacy & Cookie", en: "Privacy & Cookies" },
    terms: { it: "Termini", en: "Terms" },
    copy: {
      it: "© 2026 Backpack & Bottle · Progetto accademico, Bologna Business School",
      en: "© 2026 Backpack & Bottle · Academic project, Bologna Business School",
    },
  },
  cookie: {
    msg: {
      it: "Usiamo cookie tecnici e di marketing (Google Analytics, Meta Pixel) per migliorare l'esperienza e misurare le campagne. Puoi accettare, rifiutare o gestire le preferenze.",
      en: "We use technical and marketing cookies (Google Analytics, Meta Pixel) to improve your experience and measure campaigns. Accept, reject or manage preferences.",
    },
    accept: { it: "Accetta tutti", en: "Accept all" },
    reject: { it: "Solo necessari", en: "Necessary only" },
  },
};
