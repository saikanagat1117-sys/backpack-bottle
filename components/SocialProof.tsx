"use client";
import { useLocale } from "./LocaleProvider";
import { t } from "@/lib/content";

export default function SocialProof() {
  const { locale } = useLocale();
  return (
    <section className="bg-cream py-20">
      <div className="container-x">
        <h2 className="font-display text-3xl md:text-4xl text-forest max-w-3xl">
          {t.proof.title[locale]}
        </h2>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.proof.stats.map((s, i) => (
            <div key={i} className="border-l-2 border-burnt pl-5">
              <div className="font-display text-4xl md:text-5xl text-forest">{s.n}</div>
              <div className="text-sm text-forest/70 mt-1">{s.l[locale]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
