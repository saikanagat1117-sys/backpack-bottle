"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { track } from "@/lib/gtm";
import type { Locale } from "@/lib/content";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void };
const LocaleCtx = createContext<Ctx>({ locale: "it", setLocale: () => {} });

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("it");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("bb_locale")) as Locale | null;
    if (saved === "en" || saved === "it") setLocaleState(saved);

    // Track visit count
    if (typeof window !== "undefined") {
      const visits = parseInt(localStorage.getItem("bb_visits") || "0", 10) + 1;
      localStorage.setItem("bb_visits", visits.toString());
      track("visit_count", { visit_number: visits });
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") localStorage.setItem("bb_locale", l);
  };

  return <LocaleCtx.Provider value={{ locale, setLocale }}>{children}</LocaleCtx.Provider>;
}

export const useLocale = () => useContext(LocaleCtx);
