"use client";
import { useState } from "react";
import { useLocale } from "./LocaleProvider";
import { destinations } from "@/lib/destinations";
import { track } from "@/lib/gtm";

export default function Comparison() {
  const { locale } = useLocale();
  const [selected, setSelected] = useState<string[]>(["rome", "barcelona", "lisbon"]);

  const toggle = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) {
        const next = prev.filter((s) => s !== slug);
        track("comparison_remove", { destination: slug });
        return next;
      }
      if (prev.length >= 3) return prev;
      track("comparison_add", { destination: slug });
      return [...prev, slug];
    });
  };

  const items = selected.map((s) => destinations.find((d) => d.slug === s)).filter(Boolean) as typeof destinations;

  return (
    <section className="py-20 bg-forest text-cream">
      <div className="container-x">
        <div className="text-xs uppercase tracking-[0.18em] text-burnt mb-3">
          {locale === "it" ? "Confronto" : "Compare"}
        </div>
        <h2 className="font-display text-3xl md:text-5xl mb-3">
          {locale === "it" ? "Quale fa per te?" : "Which one is for you?"}
        </h2>
        <p className="text-cream/70 mb-8">
          {locale === "it" ? "Seleziona fino a 3 città per confrontare prezzo, durata, vibe." : "Pick up to 3 cities to compare price, length, vibe."}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {destinations.map((d) => {
            const on = selected.includes(d.slug);
            return (
              <button
                key={d.slug}
                onClick={() => toggle(d.slug)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  on ? "bg-burnt text-cream border-burnt" : "border-cream/30 text-cream/80 hover:border-cream"
                }`}
              >
                {d.flag} {d.city[locale]}
              </button>
            );
          })}
        </div>
        {items.length > 0 && (
          <div className="overflow-x-auto rounded-2xl bg-forest-dark/60">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-cream/10">
                  <th className="p-4 text-xs uppercase tracking-wider text-cream/50 font-medium">{locale === "it" ? "Destinazione" : "Destination"}</th>
                  {items.map((c) => (
                    <th key={c.slug} className="p-4 font-display text-xl">{c.flag} {c.city[locale]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <Row label={locale === "it" ? "Da" : "From"} cells={items.map((c) => `€${c.price}`)} accent />
                <Row label={locale === "it" ? "Notti" : "Nights"} cells={items.map((c) => String(c.nights))} />
                <Row label={locale === "it" ? "Volo" : "Flight"} cells={items.map((c) => c.flightTime)} />
                <Row label={locale === "it" ? "Stagione" : "Season"} cells={items.map((c) => c.bestMonths)} />
                <Row label={locale === "it" ? "Vibe" : "Vibe"} cells={items.map((c) => c.tag[locale])} />
                <Row label={locale === "it" ? "Quartiere consigliato" : "Recommended area"} cells={items.map((c) => c.neighborhoods[0].name)} />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ label, cells, accent }: { label: string; cells: string[]; accent?: boolean }) {
  return (
    <tr className="border-b border-cream/5">
      <td className="p-4 text-cream/60 text-sm uppercase tracking-wider">{label}</td>
      {cells.map((c, i) => (
        <td key={i} className={`p-4 ${accent ? "font-display text-2xl text-burnt" : "text-cream"}`}>{c}</td>
      ))}
    </tr>
  );
}
