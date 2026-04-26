"use client";
import Link from "next/link";
import { useLocale } from "./LocaleProvider";
import { t } from "@/lib/content";
import Wordmark from "./Wordmark";

export default function Footer() {
  const { locale } = useLocale();
  return (
    <footer className="bg-forest text-cream/80 py-14">
      <div className="container-x grid md:grid-cols-3 gap-10">
        <div>
          <Wordmark light size="lg" />
          <p className="mt-3 text-sm max-w-sm">{t.footer.tag[locale]}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-cream/60 mb-3">
            {t.footer.nav[locale]}
          </div>
          <ul className="space-y-2 text-sm">
            <li><a href="#destinazioni">{t.nav.destinations[locale]}</a></li>
            <li><a href="#come-funziona">{t.nav.how[locale]}</a></li>
            <li><Link href="/blog">{t.nav.blog[locale]}</Link></li>
            <li><Link href="/measurement">Measurement plan</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-cream/60 mb-3">
            {t.footer.legal[locale]}
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy">{t.footer.privacy[locale]}</Link></li>
            <li><Link href="/privacy#terms">{t.footer.terms[locale]}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-10 pt-6 border-t border-cream/10 text-xs text-cream/50">
        {t.footer.copy[locale]}
      </div>
    </footer>
  );
}
