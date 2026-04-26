"use client";
import Link from "next/link";
import { useLocale } from "./LocaleProvider";
import { t } from "@/lib/content";
import { track } from "@/lib/gtm";
import Wordmark from "./Wordmark";

export default function Nav() {
  const { locale, setLocale } = useLocale();
  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur border-b border-cream-dark">
      <div className="container-x flex items-center justify-between h-16">
        <Wordmark size="md" />
        <nav className="hidden md:flex items-center gap-7 text-sm text-forest/80">
          <a href="#destinazioni" className="hover:text-forest">{t.nav.destinations[locale]}</a>
          <a href="#come-funziona" className="hover:text-forest">{t.nav.how[locale]}</a>
          <Link href="/blog" className="hover:text-forest">{t.nav.blog[locale]}</Link>
          <Link href="/measurement" className="hover:text-forest text-burnt/90">Measurement</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "it" ? "en" : "it")}
            className="text-xs uppercase tracking-wider text-forest/70 hover:text-forest border border-forest/30 rounded-full px-3 py-1"
            aria-label="Toggle language"
          >
            {locale === "it" ? "EN" : "IT"}
          </button>
          <a
            href="#coupon"
            onClick={() => track("cta_click", { location: "nav" })}
            className="btn-primary !px-4 !py-2 text-sm"
          >
            {t.nav.cta[locale]}
          </a>
        </div>
      </div>
    </header>
  );
}
