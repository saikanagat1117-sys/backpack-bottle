"use client";
import { useLocale } from "./LocaleProvider";
import { t, destinations } from "@/lib/content";
import { track } from "@/lib/gtm";

export default function Destinations() {
  const { locale } = useLocale();
  return (
    <section id="destinazioni" className="bg-cream-dark/40 py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-5xl text-forest">
              {t.destinations.title[locale]}
            </h2>
            <p className="mt-3 text-forest/70 max-w-xl">{t.destinations.sub[locale]}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((d) => (
            <a
              key={d.slug}
              href="#coupon"
              onClick={() => track("destination_card_click", { destination: d.slug })}
              className="group relative block rounded-2xl overflow-hidden bg-forest/5 aspect-[4/5]"
            >
              <img
                src={d.img}
                alt={d.city[locale]}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent" />
              <div className="absolute top-4 left-4 text-xs uppercase tracking-wider bg-cream text-forest rounded-full px-3 py-1">
                {d.tag[locale]}
              </div>
              <div className="absolute bottom-0 p-6 text-cream">
                <div className="text-sm opacity-80">{d.country[locale]}</div>
                <h3 className="font-display text-3xl">{d.city[locale]}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-sm opacity-75">{t.destinations.from[locale]}</span>
                  <span className="font-display text-2xl text-burnt">€{d.price}</span>
                  <span className="text-xs opacity-75">· {d.nights} {t.destinations.nights[locale]}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
