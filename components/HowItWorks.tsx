"use client";
import { useLocale } from "./LocaleProvider";
import { t } from "@/lib/content";

export default function HowItWorks() {
  const { locale } = useLocale();
  return (
    <section id="come-funziona" className="bg-cream py-20 md:py-28">
      <div className="container-x">
        <h2 className="font-display text-3xl md:text-5xl text-forest max-w-2xl">
          {t.how.title[locale]}
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {t.how.steps.map((s, i) => (
            <div key={i} className="bg-white/60 border border-cream-dark rounded-2xl p-7">
              <h3 className="font-display text-2xl text-forest mb-3">{s.t[locale]}</h3>
              <p className="text-forest/75 leading-relaxed">{s.d[locale]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
