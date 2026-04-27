"use client";
import { useEffect, useState } from "react";
import { useLocale } from "./LocaleProvider";
import { track } from "@/lib/gtm";

const SEEN_KEY = "bb_exit_seen";
const SUPPRESS_DAYS = 7;

export default function ExitIntent() {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Suppress if already shown in last 7 days, or user already on /grazie
    if (window.location.pathname.startsWith("/grazie")) return;
    try {
      const raw = localStorage.getItem(SEEN_KEY);
      if (raw && Date.now() - parseInt(raw, 10) < SUPPRESS_DAYS * 86400000) return;
    } catch {}
    // Desktop only; mobile uses scroll-up sentinel
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) trigger();
    };
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (lastScrollY - y > 250 && y < 200) trigger();
      lastScrollY = y;
    };
    function trigger() {
      setOpen(true);
      try { localStorage.setItem(SEEN_KEY, String(Date.now())); } catch {}
      track("exit_intent_shown", { device: isMobile ? "mobile" : "desktop" });
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    }

    if (isMobile) window.addEventListener("scroll", onScroll, { passive: true });
    else document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (!open) return null;
  const close = () => {
    setOpen(false);
    track("exit_intent_dismissed", {});
  };
  const accept = () => {
    track("exit_intent_accepted", {});
    setOpen(false);
    document.getElementById("coupon")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className="fixed inset-0 z-[100] bg-forest-dark/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={close}
    >
      <div
        className="bg-cream rounded-2xl p-7 md:p-9 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs uppercase tracking-[0.18em] text-burnt mb-3">
          {locale === "it" ? "Aspetta · Prima di andare" : "Wait · Before you go"}
        </div>
        <h3 className="font-display text-3xl text-forest leading-tight mb-3">
          {locale === "it"
            ? "Ti regaliamo €50 sul tuo prossimo weekend europeo"
            : "Take €50 off your next European weekend"}
        </h3>
        <p className="text-forest/75 mb-6">
          {locale === "it"
            ? "Codice BB50 · valido 90 giorni · 5 destinazioni curate · niente spam."
            : "Code BB50 · valid 90 days · 5 curated destinations · no spam."}
        </p>
        <div className="flex gap-3">
          <button onClick={accept} className="btn-primary flex-1">
            {locale === "it" ? "Sì, lo voglio" : "Yes, I want it"}
          </button>
          <button onClick={close} className="text-forest/60 hover:text-forest text-sm px-3">
            {locale === "it" ? "No grazie" : "No thanks"}
          </button>
        </div>
      </div>
    </div>
  );
}
