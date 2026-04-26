"use client";
import { useLocale } from "./LocaleProvider";
import { t } from "@/lib/content";
import { destinations } from "@/lib/destinations";
import { trackCTA } from "@/lib/gtm";
import Link from "next/link";

export default function Hero() {
  const { locale } = useLocale();
  const featured = destinations.slice(0, 5);
  return (
    <section className="relative bg-forest-dark text-cream overflow-hidden">
      {/* Animated mosaic of destination thumbs */}
      <div className="absolute inset-0 grid grid-cols-5 opacity-30" aria-hidden>
        {featured.map((d, i) => (
          <div key={d.slug} className="relative h-full">
            <img src={d.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/85 to-forest-dark/40" aria-hidden />

      <div className="container-x relative py-24 md:py-32 lg:py-40">
        <div className="inline-flex items-center gap-2 bg-cream/10 border border-cream/20 rounded-full px-4 py-1.5 mb-7 backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-burnt animate-pulse" />
          <span className="text-xs uppercase tracking-[0.18em] text-cream/90">
            {locale === "it" ? "Offerta early-booking · Estate 2026" : "Early-booking offer · Summer 2026"}
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl text-cream">
          {locale === "it" ? (
            <>Basta con la <span className="italic text-burnt">ricerca infinita</span>.<br />Solo i weekend europei che valgono.</>
          ) : (
            <>Skip the <span className="italic text-burnt">research fatigue</span>.<br />European weekends that actually deliver.</>
          )}
        </h1>
        <p className="mt-7 text-lg md:text-xl text-cream/80 max-w-2xl leading-relaxed">
          {locale === "it"
            ? "10 destinazioni curate. Voli + hotel inclusi. Prezzi trasparenti. €50 di sconto sulla tua prima prenotazione, valido 90 giorni."
            : "10 curated destinations. Flights + hotels bundled. Transparent pricing. €50 off your first booking, valid 90 days."}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#coupon"
            onClick={() => trackCTA("hero_primary")}
            className="btn-primary text-base"
          >
            {locale === "it" ? "Ricevi il coupon da €50" : "Get the €50 coupon"} →
          </a>
          <Link
            href="#destinazioni"
            onClick={() => trackCTA("hero_secondary")}
            className="inline-flex items-center justify-center border border-cream/30 hover:bg-cream/10 text-cream font-medium px-6 py-3 rounded-full transition-colors"
          >
            {locale === "it" ? "Esplora le 10 città" : "Explore the 10 cities"}
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-cream/60">
          <span>✓ {locale === "it" ? "Nessuna carta richiesta" : "No card required"}</span>
          <span>✓ {locale === "it" ? "Validità 90 giorni" : "90-day validity"}</span>
          <span>✓ {locale === "it" ? "GDPR compliant" : "GDPR compliant"}</span>
          <span>✓ {locale === "it" ? "Disiscrivibile in 1 click" : "1-click unsubscribe"}</span>
        </div>
      </div>

      {/* Destination strip */}
      <div className="relative border-t border-cream/10 bg-forest-dark/70 backdrop-blur">
        <div className="container-x py-5 flex items-center gap-6 overflow-x-auto">
          <div className="text-xs uppercase tracking-wider text-cream/50 shrink-0">
            {locale === "it" ? "Destinazioni" : "Destinations"}
          </div>
          {destinations.map((d) => (
            <Link
              key={d.slug}
              href={`/destinazioni/${d.slug}`}
              className="text-cream/85 hover:text-burnt text-sm whitespace-nowrap shrink-0 transition-colors"
            >
              {d.flag} {d.city[locale]}
              <span className="text-cream/40"> · €{d.price}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
