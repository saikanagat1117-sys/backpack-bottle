"use client";
import { useLocale } from "./LocaleProvider";
import { t } from "@/lib/content";

export default function ValueProp() {
  const { locale } = useLocale();
  return (
    <section className="bg-forest text-cream py-20 md:py-28">
      <div className="container-x">
        <h2 className="font-display text-3xl md:text-5xl max-w-3xl leading-tight">
          {t.value.title[locale]}
        </h2>
        <p className="mt-6 text-cream/80 text-lg max-w-2xl leading-relaxed">
          {t.value.body[locale]}
        </p>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.pillars.map((p, i) => (
            <div key={i} className="border-t border-cream/20 pt-5">
              <div className="text-burnt font-display text-3xl mb-3">0{i + 1}</div>
              <h3 className="font-display text-xl mb-2">{p.t[locale]}</h3>
              <p className="text-cream/70 text-sm leading-relaxed">{p.d[locale]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
