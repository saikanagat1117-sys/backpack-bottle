"use client";
import { useState } from "react";
import { useLocale } from "./LocaleProvider";

const reviews = [
  {
    name: "Giulia M.",
    city: "Milano",
    trip: "Lisbona, 3 notti",
    quote: { it: "Ho prenotato in 4 minuti dal divano. Hotel a Príncipe Real esattamente come descritto. Il fado consigliato a Mesa de Frades vale il viaggio.", en: "Booked in 4 minutes from the sofa. Hotel in Príncipe Real exactly as described. The Mesa de Frades fado tip alone was worth the trip." },
    rating: 5,
  },
  {
    name: "Marco D.",
    city: "Bologna",
    trip: "Praga weekend",
    quote: { it: "Niente sorprese al checkout, niente upselling. Volo + hotel + birre = €310. Fantastico.", en: "No checkout surprises, no upselling. Flight + hotel + beers = €310. Brilliant." },
    rating: 5,
  },
  {
    name: "Sofia T.",
    city: "Torino",
    trip: "Barcellona estivo",
    quote: { it: "Quartiere Gràcia è stata la scelta giusta. Hotel boutique, terrazza, zero turisti chiassosi. Non torno più alle Ramblas.", en: "Gràcia was the right call. Boutique hotel, terrace, zero loud tourists. Never going back to Las Ramblas." },
    rating: 5,
  },
  {
    name: "Andrea P.",
    city: "Roma",
    trip: "Amsterdam con bici",
    quote: { it: "L'idea di includere la bici è geniale. Tre giorni e abbiamo girato tutto. La mappa con i locali era oro.", en: "Including the bike was genius. Three days and we covered everything. The locals' map was gold." },
    rating: 5,
  },
];

export default function Testimonials() {
  const { locale } = useLocale();
  const [i, setI] = useState(0);
  const r = reviews[i];
  return (
    <section className="bg-cream py-20">
      <div className="container-x max-w-4xl">
        <div className="text-xs uppercase tracking-[0.18em] text-burnt mb-3">
          {locale === "it" ? "Cosa dicono i viaggiatori" : "What travellers say"}
        </div>
        <div className="bg-white/60 border border-cream-dark rounded-3xl p-8 md:p-12 relative">
          <div className="text-burnt text-7xl absolute top-2 left-6 font-display leading-none opacity-50">"</div>
          <div className="flex gap-1 mb-5 text-burnt">
            {Array.from({ length: r.rating }).map((_, j) => <span key={j}>★</span>)}
          </div>
          <p className="font-display text-2xl md:text-3xl text-forest leading-snug">{r.quote[locale]}</p>
          <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="font-display text-lg text-forest">{r.name}</div>
              <div className="text-sm text-forest/70">{r.city} · {r.trip}</div>
            </div>
            <div className="flex gap-2">
              {reviews.map((_, j) => (
                <button
                  key={j}
                  onClick={() => setI(j)}
                  className={`w-2 h-2 rounded-full transition-all ${j === i ? "bg-burnt w-8" : "bg-forest/30"}`}
                  aria-label={`Review ${j + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-forest/50">
          {locale === "it" ? "Testimonianze illustrative — Backpack & Bottle è un progetto accademico (Group 3, Bologna Business School)." : "Illustrative testimonials — Backpack & Bottle is an academic project (Group 3, Bologna Business School)."}
        </p>
      </div>
    </section>
  );
}
