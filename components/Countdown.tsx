"use client";
import { useEffect, useState } from "react";
import { useLocale } from "./LocaleProvider";

// Counts down to early-booking deadline (campaign end).
const DEADLINE = new Date("2026-06-15T23:59:59+02:00").getTime();

export default function Countdown({ compact = false }: { compact?: boolean }) {
  const { locale } = useLocale();
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, DEADLINE - now);
  if (ms <= 0) return null;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const label = locale === "it" ? "Offerta termina tra" : "Offer ends in";
  const dL = locale === "it" ? "g" : "d";
  const hL = "h";
  const mL = "m";
  const sL = "s";
  if (compact) {
    return (
      <div className="text-xs uppercase tracking-wider text-burnt">
        ⏳ {label}: {d}{dL} {h}{hL} {m}{mL} {s}{sL}
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-burnt/10 border border-burnt/30 rounded-full">
      <span className="text-xs uppercase tracking-wider text-burnt">⏳ {label}</span>
      <span className="font-display text-lg text-burnt-dark tabular-nums">
        {d}{dL} {h.toString().padStart(2, "0")}{hL} {m.toString().padStart(2, "0")}{mL} {s.toString().padStart(2, "0")}{sL}
      </span>
    </div>
  );
}
