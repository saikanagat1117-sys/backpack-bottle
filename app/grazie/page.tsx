"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { useEffect } from "react";
import { track } from "@/lib/gtm";

export default function Grazie() {
  const { locale } = useLocale();
  useEffect(() => {
    track("thank_you_view", { value: 50, currency: "EUR" });
  }, []);
  return (
    <>
      <Nav />
      <main className="min-h-[70vh] flex items-center bg-cream">
        <div className="container-x py-24 max-w-2xl">
          <div className="inline-block text-xs uppercase tracking-[0.18em] text-burnt mb-5">
            {locale === "it" ? "Coupon inviato" : "Coupon sent"}
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-forest leading-tight">
            {locale === "it" ? "Grazie! Il tuo coupon è in arrivo." : "Thanks! Your coupon is on its way."}
          </h1>
          <p className="mt-5 text-forest/80 text-lg">
            {locale === "it"
              ? "Controlla la tua casella email nei prossimi minuti (anche lo spam, al sicuro). Trovi il codice BB50 e la guida PDF delle 5 destinazioni."
              : "Check your inbox in the next few minutes (spam folder too, just in case). You'll find code BB50 and the PDF guide to the 5 destinations."}
          </p>
          <div className="mt-8 bg-white/60 border border-cream-dark rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-forest/60">
              {locale === "it" ? "Il tuo codice" : "Your code"}
            </div>
            <div className="font-display text-4xl text-burnt tracking-wider">BB50</div>
            <div className="text-sm text-forest/70 mt-2">
              {locale === "it"
                ? "€50 di sconto su prenotazioni da €300+ · valido 90 giorni"
                : "€50 off bookings from €300+ · valid 90 days"}
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/backpack-bottle-coupon-BB50.pdf"
              download
              onClick={() => track("coupon_download", { coupon_code: "BB50", value: 50, currency: "EUR", method: "direct_download" })}
              className="btn-primary"
            >
              {locale === "it" ? "Scarica il coupon PDF" : "Download the coupon PDF"} ↓
            </a>
            <Link href="/" className="btn-secondary">
              ← {locale === "it" ? "Torna alla home" : "Back home"}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
