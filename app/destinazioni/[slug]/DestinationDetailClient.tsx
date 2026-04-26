"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Destination } from "@/lib/destinations";
import { useLocale } from "@/components/LocaleProvider";
import { destinations } from "@/lib/destinations";
import { track, trackDestinationView, trackGallery, trackFAQ, trackCTA } from "@/lib/gtm";

export default function DestinationDetailClient({ d }: { d: Destination }) {
  const { locale } = useLocale();
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    trackDestinationView(d.slug);
  }, [d.slug]);

  const otherCities = destinations.filter((x) => x.slug !== d.slug).slice(0, 4);

  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img src={d.hero} alt={d.city[locale]} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-forest/10" />
        <div className="container-x relative h-full flex flex-col justify-end pb-14">
          <div className="text-cream/80 text-sm uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <span className="text-2xl">{d.flag}</span>
            <span>{d.country[locale]}</span>
            <span className="opacity-50">·</span>
            <span>{d.tag[locale]}</span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl text-cream leading-none">{d.city[locale]}</h1>
          <p className="mt-5 text-cream/90 text-xl max-w-2xl">{d.hook[locale]}</p>
          <div className="mt-7 flex flex-wrap gap-6 items-center text-cream">
            <Stat label={locale === "it" ? "Da" : "From"} value={`€${d.price}`} />
            <Stat label={locale === "it" ? "Notti" : "Nights"} value={String(d.nights)} />
            <Stat label={locale === "it" ? "Volo" : "Flight"} value={d.flightTime} />
            <Stat label={locale === "it" ? "Stagione" : "Season"} value={d.bestMonths} />
          </div>
          <div className="mt-7">
            <Link
              href="/#coupon"
              onClick={() => trackCTA("destination_hero", d.slug)}
              className="btn-primary"
            >
              {locale === "it" ? `Ricevi €50 di sconto su ${d.city[locale]}` : `Get €50 off ${d.city[locale]}`} →
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container-x max-w-3xl">
          <div className="text-xs uppercase tracking-wider text-burnt mb-3">{locale === "it" ? "Perché qui" : "Why here"}</div>
          <h2 className="font-display text-3xl md:text-5xl text-forest leading-tight">
            {locale === "it" ? `${d.nights} notti a ${d.city[locale]}, fatte bene.` : `${d.nights} nights in ${d.city[locale]}, done right.`}
          </h2>
          <div className="mt-6 space-y-4 text-forest/85 text-lg leading-relaxed">
            {d.intro[locale].map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-16">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-3">
            {d.gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => { setGalleryIdx(i); trackGallery(d.slug, i); }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <img src={src} alt={`${d.city[locale]} ${i + 1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 bg-forest text-cream">
        <div className="container-x">
          <div className="text-xs uppercase tracking-[0.18em] text-burnt mb-3">{locale === "it" ? "Quartieri scelti" : "Neighborhoods picked"}</div>
          <h2 className="font-display text-3xl md:text-5xl mb-10">{locale === "it" ? "Dove dormire e dove andare" : "Where to stay and where to go"}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {d.neighborhoods.map((n, i) => (
              <div key={i} className="border-l-2 border-burnt pl-5">
                <div className="font-display text-2xl mb-2">{n.name}</div>
                <p className="text-cream/75">{n.vibe[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-16">
        <div className="container-x max-w-4xl">
          <div className="text-xs uppercase tracking-wider text-burnt mb-3">{locale === "it" ? "Il giorno per giorno" : "Day by day"}</div>
          <h2 className="font-display text-3xl md:text-5xl text-forest mb-10">{locale === "it" ? "Itinerario consigliato" : "Suggested itinerary"}</h2>
          <ol className="space-y-8">
            {d.itinerary.map((day) => (
              <li key={day.day} className="border-t border-cream-dark pt-6 grid md:grid-cols-[100px_1fr] gap-6">
                <div className="font-display text-5xl text-burnt">D{day.day}</div>
                <div>
                  <h3 className="font-display text-2xl text-forest mb-3">{day.title[locale]}</h3>
                  <ul className="space-y-2 text-forest/85">
                    {day.items.map((it, j) => (
                      <li key={j} className="flex gap-3"><span className="text-burnt">›</span><span>{it[locale]}</span></li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Food + What's included */}
      <section className="py-16 bg-cream-dark/40">
        <div className="container-x grid md:grid-cols-2 gap-10">
          <div>
            <div className="text-xs uppercase tracking-wider text-burnt mb-3">{locale === "it" ? "Mangiare" : "Eat"}</div>
            <h2 className="font-display text-3xl text-forest mb-6">{locale === "it" ? "Tre indirizzi che non sbagli" : "Three addresses you can't miss"}</h2>
            <ul className="space-y-5">
              {d.food.map((f, i) => (
                <li key={i} className="bg-white/60 rounded-2xl p-5">
                  <div className="font-display text-xl text-forest">{f.name}</div>
                  <div className="text-forest/70 text-sm mt-1">{f.note[locale]}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-burnt mb-3">{locale === "it" ? "Cosa è incluso" : "What's included"}</div>
            <h2 className="font-display text-3xl text-forest mb-6">{locale === "it" ? "Nel pacchetto" : "In the package"}</h2>
            <ul className="space-y-2.5 text-forest/85">
              {d.whatIncluded[locale].map((it, i) => (
                <li key={i} className="flex gap-3"><span className="text-burnt font-bold">✓</span><span>{it}</span></li>
              ))}
            </ul>
            <div className="mt-6 p-5 rounded-xl bg-burnt/10 border border-burnt/30">
              <div className="text-xs uppercase tracking-wider text-burnt mb-1">{locale === "it" ? "Tip budget" : "Budget tip"}</div>
              <div className="text-forest/85 text-sm">{d.budgetTip[locale]}</div>
            </div>
            <div className="mt-3 p-5 rounded-xl bg-forest/5">
              <div className="text-xs uppercase tracking-wider text-forest/60 mb-1">{locale === "it" ? "Meteo" : "Weather"}</div>
              <div className="text-forest/85 text-sm">{d.weatherHint[locale]}</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container-x max-w-3xl">
          <div className="text-xs uppercase tracking-wider text-burnt mb-3">FAQ</div>
          <h2 className="font-display text-3xl md:text-4xl text-forest mb-8">
            {locale === "it" ? "Domande comuni" : "Common questions"}
          </h2>
          <div className="divide-y divide-cream-dark border-y border-cream-dark">
            {d.faq.map((f, i) => (
              <div key={i}>
                <button
                  onClick={() => { const next = openFaq === i ? null : i; setOpenFaq(next); if (next !== null) trackFAQ(f.q[locale], `destination/${d.slug}`); }}
                  className="w-full text-left py-5 flex items-center justify-between gap-6"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-display text-lg text-forest">{f.q[locale]}</span>
                  <span className="text-burnt text-2xl">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-forest/80">{f.a[locale]}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-dark text-cream">
        <div className="container-x max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-5xl">
            {locale === "it" ? `Pronti per ${d.city[locale]}?` : `Ready for ${d.city[locale]}?`}
          </h2>
          <p className="mt-4 text-cream/80 text-lg">
            {locale === "it"
              ? `Ricevi €50 di sconto sul pacchetto da €${d.price}.`
              : `Get €50 off the €${d.price} package.`}
          </p>
          <div className="mt-7">
            <Link
              href="/#coupon"
              onClick={() => trackCTA("destination_footer", d.slug)}
              className="btn-primary"
            >
              {locale === "it" ? "Ricevi il coupon" : "Get the coupon"} →
            </Link>
          </div>
        </div>
      </section>

      {/* Other destinations */}
      <section className="py-16">
        <div className="container-x">
          <div className="text-xs uppercase tracking-wider text-burnt mb-3">
            {locale === "it" ? "Altre destinazioni" : "Other destinations"}
          </div>
          <h2 className="font-display text-3xl text-forest mb-8">
            {locale === "it" ? "Esplora le altre città" : "Explore the others"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/destinazioni/${c.slug}`}
                onClick={() => track("related_destination_click", { from: d.slug, to: c.slug })}
                className="group block rounded-2xl overflow-hidden aspect-[4/5] relative"
              >
                <img src={c.hero} alt={c.city[locale]} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest to-transparent" />
                <div className="absolute bottom-4 left-4 text-cream">
                  <div className="text-xs uppercase tracking-wider opacity-80">{c.country[locale]}</div>
                  <div className="font-display text-2xl">{c.city[locale]}</div>
                  <div className="text-sm opacity-90">{`${locale === "it" ? "Da" : "From"} €${c.price}`}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider opacity-70">{label}</div>
      <div className="font-display text-2xl">{value}</div>
    </div>
  );
}
