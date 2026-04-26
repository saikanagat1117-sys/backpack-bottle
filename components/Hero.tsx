"use client";
import { useLocale } from "./LocaleProvider";
import { t } from "@/lib/content";
import { track } from "@/lib/gtm";

export default function Hero() {
  const { locale } = useLocale();
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/80 to-cream" aria-hidden />
      <div className="container-x relative py-20 md:py-28 lg:py-32">
        <span className="inline-block text-xs uppercase tracking-[0.18em] text-burnt font-medium mb-5">
          {t.hero.eyebrow[locale]}
        </span>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-forest leading-[1.05] max-w-4xl whitespace-pre-line">
          {t.hero.title[locale]}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-forest/80 max-w-2xl leading-relaxed">
          {t.hero.sub[locale]}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#coupon"
            onClick={() => track("cta_click", { location: "hero_primary" })}
            className="btn-primary"
          >
            {t.hero.cta1[locale]} →
          </a>
          <a
            href="#destinazioni"
            onClick={() => track("cta_click", { location: "hero_secondary" })}
            className="btn-secondary"
          >
            {t.hero.cta2[locale]}
          </a>
        </div>
        <p className="mt-6 text-sm text-forest/60">{t.hero.proof[locale]}</p>
      </div>
    </section>
  );
}
