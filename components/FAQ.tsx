"use client";
import { useState } from "react";
import { useLocale } from "./LocaleProvider";
import { trackFAQ } from "@/lib/gtm";

const faqs = [
  {
    q: { it: "Come funziona il coupon BB50?", en: "How does the BB50 coupon work?" },
    a: { it: "Inserisci la tua email, ricevi subito il codice BB50. Lo applichi al checkout su prenotazioni da €300 in su, valido 90 giorni.", en: "Enter your email, get code BB50 instantly. Apply at checkout on bookings of €300+, valid 90 days." },
  },
  {
    q: { it: "Quali aeroporti italiani sono coperti?", en: "Which Italian airports are covered?" },
    a: { it: "Milano (MXP, LIN), Roma (FCO), Bologna (BLQ), Venezia (VCE), Torino (TRN). Voli diretti su tutte le destinazioni.", en: "Milan (MXP, LIN), Rome (FCO), Bologna (BLQ), Venice (VCE), Turin (TRN). Direct flights on all destinations." },
  },
  {
    q: { it: "Posso modificare le date dopo la prenotazione?", en: "Can I change dates after booking?" },
    a: { it: "Sì, fino a 14 giorni prima del viaggio (€25 fee). Cancellazione gratuita 30+ giorni prima.", en: "Yes, up to 14 days before travel (€25 fee). Free cancellation 30+ days ahead." },
  },
  {
    q: { it: "I prezzi sono davvero \"all-in\"?", en: "Are prices really all-in?" },
    a: { it: "Sì. Volo + hotel + tasse + bagaglio a mano. Bagaglio in stiva e add-on opzionali sono separati e dichiarati prima del checkout.", en: "Yes. Flight + hotel + taxes + cabin baggage. Hold baggage and optional add-ons are separate and disclosed before checkout." },
  },
  {
    q: { it: "Cosa succede se l'email non arriva?", en: "What if the email doesn't arrive?" },
    a: { it: "Controlla spam e promozioni. Dopo 5 minuti scrivici a hello@backpackandbottle.example — risposta in 2h lavorative.", en: "Check spam and promotions. After 5 minutes email hello@backpackandbottle.example — reply in 2 working hours." },
  },
  {
    q: { it: "I miei dati sono al sicuro?", en: "Is my data safe?" },
    a: { it: "Sì. GDPR-compliant, server EU, cookie consent v2, disiscrivibile in un click sempre. Vedi privacy.", en: "Yes. GDPR-compliant, EU servers, cookie consent v2, one-click unsubscribe always. See privacy." },
  },
  {
    q: { it: "È un progetto accademico, vero?", en: "Is this really an academic project?" },
    a: { it: "Sì — Group 3, Digital Platforms Lab, Bologna Business School. Le destinazioni sono realistiche, il booking è simulato. Il sito mostra come funzionerebbe live.", en: "Yes — Group 3, Digital Platforms Lab, Bologna Business School. Destinations are realistic, booking is simulated. The site shows what a live version would look like." },
  },
];

export default function FAQ() {
  const { locale } = useLocale();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 bg-cream">
      <div className="container-x max-w-3xl">
        <div className="text-xs uppercase tracking-[0.18em] text-burnt mb-3">FAQ</div>
        <h2 className="font-display text-3xl md:text-5xl text-forest mb-8">
          {locale === "it" ? "Domande frequenti" : "Frequently asked"}
        </h2>
        <div className="border-y border-cream-dark divide-y divide-cream-dark">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => { const next = open === i ? null : i; setOpen(next); if (next !== null) trackFAQ(f.q[locale], "home"); }}
                className="w-full text-left py-5 flex items-center justify-between gap-6 group"
                aria-expanded={open === i}
              >
                <span className="font-display text-lg text-forest group-hover:text-burnt transition-colors">{f.q[locale]}</span>
                <span className="text-burnt text-2xl shrink-0">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <div className="pb-5 text-forest/80 leading-relaxed">{f.a[locale]}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
