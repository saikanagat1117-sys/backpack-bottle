"use client";
import { useState } from "react";
import { useLocale } from "./LocaleProvider";
import { trackNewsletterSignup } from "@/lib/gtm";

export default function Newsletter() {
  const { locale } = useLocale();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    trackNewsletterSignup("footer_strip");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: "yes", departure: "newsletter", interest: "newsletter", locale, source: "newsletter_strip" }),
      });
    } catch {}
    setDone(true);
  };

  return (
    <section className="py-14 bg-burnt">
      <div className="container-x flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="font-display text-2xl md:text-3xl text-cream">
            {locale === "it" ? "Un'idea di viaggio ogni martedì." : "One travel idea every Tuesday."}
          </div>
          <p className="text-cream/85 text-sm mt-1">
            {locale === "it" ? "Una destinazione · una storia · un prezzo. Niente spam." : "One destination · one story · one price. No spam."}
          </p>
        </div>
        {done ? (
          <div className="text-cream font-display text-xl">
            {locale === "it" ? "Iscritto. A martedì! ↗" : "Subscribed. See you Tuesday! ↗"}
          </div>
        ) : (
          <form onSubmit={submit} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={locale === "it" ? "tua@email.com" : "your@email.com"}
              className="px-4 py-3 rounded-full bg-cream text-forest min-w-[260px] focus:outline-none"
            />
            <button type="submit" className="bg-forest text-cream px-6 py-3 rounded-full hover:bg-forest-dark transition-colors">
              {locale === "it" ? "Iscrivimi" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
