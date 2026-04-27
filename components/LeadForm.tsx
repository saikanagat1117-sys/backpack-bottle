"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { t, destinations } from "@/lib/content";
import { track } from "@/lib/gtm";
import { readUTM } from "./UTMCapture";
import Countdown from "./Countdown";

export default function LeadForm() {
  const { locale } = useLocale();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          track("form_view", { form: "coupon_lead" });
          obs.disconnect();
        }
      }),
      { threshold: 0.4 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const onFocus = (field?: string) => {
    if (!started) {
      track("form_start", { form: "coupon_lead" });
      setStarted(true);
    }
    if (field) track("form_field_focus", { field });
  };
  const onBlurField = (field: string, val: string) => {
    if (val) track("form_field_blur", { field, filled: true });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    setStatus("sending");
    try {
      const utm = readUTM();
      const fbp = typeof document !== "undefined" ? document.cookie.match(/_fbp=([^;]+)/)?.[1] : undefined;
      const fbc = typeof document !== "undefined" ? document.cookie.match(/_fbc=([^;]+)/)?.[1] : undefined;
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale, utm, fbp, fbc }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        track("form_submit_error", { error: json.error || String(res.status) });
        setStatus("error");
        return;
      }
      // Only count conversion AFTER server confirms success (was firing on any fetch resolution before)
      track("form_submit", { form: "coupon_lead", destination: data.interest });
      track("coupon_download", { coupon_code: "BB50", value: 50, currency: "EUR" });
      router.push("/grazie");
    } catch (err) {
      track("form_submit_error", { error: String(err).slice(0, 80) });
      setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} id="coupon" className="bg-forest-dark text-cream py-20 md:py-28">
      <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="inline-block text-xs uppercase tracking-[0.18em] text-burnt mb-4">
            €50 off · 90 {locale === "it" ? "giorni" : "days"}
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">{t.form.title[locale]}</h2>
          <p className="mt-5 text-cream/80 text-lg max-w-lg">{t.form.sub[locale]}</p>
          <div className="mt-6"><Countdown /></div>
          <ul className="mt-8 space-y-2 text-cream/70 text-sm">
            <li>✓ {locale === "it" ? "Coupon consegnato via email in 30 secondi" : "Coupon delivered by email in 30 seconds"}</li>
            <li>✓ {locale === "it" ? "Guida PDF delle 5 destinazioni inclusa" : "5-destination PDF guide included"}</li>
            <li>✓ {locale === "it" ? "Disiscrivibile in un click, sempre" : "Unsubscribe in one click, anytime"}</li>
          </ul>
        </div>
        <form
          onSubmit={onSubmit}
          className="bg-cream text-forest rounded-2xl p-7 md:p-9 space-y-4"
          noValidate
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-forest/70">{t.form.name[locale]}</span>
              <input
                required
                name="name"
                onFocus={() => onFocus()}
                className="mt-1 w-full border-b border-forest/30 bg-transparent py-2 focus:outline-none focus:border-burnt"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-forest/70">{t.form.email[locale]}</span>
              <input
                required
                type="email"
                name="email"
                onFocus={() => onFocus()}
                className="mt-1 w-full border-b border-forest/30 bg-transparent py-2 focus:outline-none focus:border-burnt"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-forest/70">{t.form.city[locale]}</span>
            <select
              name="departure"
              onFocus={() => onFocus()}
              className="mt-1 w-full border-b border-forest/30 bg-transparent py-2 focus:outline-none focus:border-burnt"
            >
              <option>Milano</option>
              <option>Roma</option>
              <option>Bologna</option>
              <option>Venezia</option>
              <option>Torino</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-forest/70">{t.form.interest[locale]}</span>
            <select
              name="interest"
              onFocus={() => onFocus()}
              className="mt-1 w-full border-b border-forest/30 bg-transparent py-2 focus:outline-none focus:border-burnt"
            >
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.city[locale]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-start gap-3 pt-2 text-sm text-forest/80">
            <input required type="checkbox" name="consent" className="mt-1 accent-burnt" />
            <span>{t.form.consent[locale]}</span>
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary w-full disabled:opacity-70"
          >
            {status === "sending" ? t.form.sending[locale] : t.form.submit[locale]}
          </button>
          {status === "error" && <p className="text-burnt-dark text-sm">{t.form.error[locale]}</p>}
        </form>
      </div>
    </section>
  );
}
