"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useLocale } from "./LocaleProvider";
import { destinations } from "@/lib/destinations";
import { track, trackPricingFilter } from "@/lib/gtm";

export default function Destinations() {
  const { locale } = useLocale();
  const [filter, setFilter] = useState<"all" | "weekend" | "extended" | "under350">("all");

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      if (filter === "weekend") return d.nights === 2;
      if (filter === "extended") return d.nights >= 3;
      if (filter === "under350") return d.price < 350;
      return true;
    });
  }, [filter]);

  const setF = (f: typeof filter) => { setFilter(f); trackPricingFilter("destination_filter", f); };

  const filters: { id: typeof filter; label: { it: string; en: string } }[] = [
    { id: "all", label: { it: "Tutte (10)", en: "All (10)" } },
    { id: "weekend", label: { it: "Weekend 2 notti", en: "Weekend (2 nights)" } },
    { id: "extended", label: { it: "Esteso 3+ notti", en: "Extended (3+ nights)" } },
    { id: "under350", label: { it: "Sotto €350", en: "Under €350" } },
  ];

  return (
    <section id="destinazioni" className="bg-cream-dark/40 py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-burnt mb-2">
              {locale === "it" ? "10 destinazioni" : "10 destinations"}
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-forest">
              {locale === "it" ? "Scegli la tua city break europea" : "Pick your European city break"}
            </h2>
            <p className="mt-3 text-forest/70 max-w-xl">
              {locale === "it" ? "Da Milano, Roma, Bologna, Venezia, Torino. Tutte raggiungibili in 1h30–3h di volo." : "From Milan, Rome, Bologna, Venice, Turin. All reachable in 1.5–3h by flight."}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setF(f.id)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                filter === f.id ? "bg-forest text-cream border-forest" : "border-forest/30 text-forest hover:border-burnt hover:text-burnt"
              }`}
            >
              {f.label[locale]}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filtered.map((d) => (
            <Link
              key={d.slug}
              href={`/destinazioni/${d.slug}`}
              onClick={() => track("destination_card_click", { destination: d.slug, source: "home_grid" })}
              className="group relative block rounded-2xl overflow-hidden bg-forest/5 aspect-[3/4]"
            >
              <img
                src={d.hero}
                alt={d.city[locale]}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
              <div className="absolute top-3 left-3 text-xs uppercase tracking-wider bg-cream text-forest rounded-full px-3 py-1 flex items-center gap-1">
                <span className="text-base">{d.flag}</span>
                <span>{d.tag[locale]}</span>
              </div>
              <div className="absolute bottom-0 p-5 text-cream">
                <div className="text-[10px] uppercase tracking-wider opacity-80">{d.country[locale]}</div>
                <h3 className="font-display text-2xl">{d.city[locale]}</h3>
                <div className="mt-1.5 flex items-baseline gap-1.5 text-sm">
                  <span className="opacity-75">{locale === "it" ? "Da" : "From"}</span>
                  <span className="font-display text-xl text-burnt">€{d.price}</span>
                  <span className="text-xs opacity-75">· {d.nights}n</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
