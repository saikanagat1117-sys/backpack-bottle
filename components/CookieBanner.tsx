"use client";
import { useEffect, useState } from "react";
import { useLocale } from "./LocaleProvider";
import { t } from "@/lib/content";

export default function CookieBanner() {
  const { locale } = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bb_consent");
    if (!saved) setShow(true);
    else pushConsent(saved === "granted");
  }, []);

  function pushConsent(granted: boolean) {
    window.dataLayer = window.dataLayer || [];
    const state = granted ? "granted" : "denied";
    // Native gtag consent update — required for GA4 to flip consent state.
    // gtag works by pushing IArguments-like arrays into dataLayer.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function gtag(...args: unknown[]) { (window.dataLayer as any).push(args); }
    gtag("consent", "update", {
      ad_storage: state,
      analytics_storage: state,
      ad_user_data: state,
      ad_personalization: state,
    });
    // Custom event mirror for GTM triggers + Clarity
    window.dataLayer.push({
      event: "consent_update",
      ad_storage: state,
      analytics_storage: state,
      ad_user_data: state,
      ad_personalization: state,
    });
  }

  function decide(granted: boolean) {
    localStorage.setItem("bb_consent", granted ? "granted" : "denied");
    pushConsent(granted);
    setShow(false);
  }

  if (!show) return null;
  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:max-w-md bg-forest text-cream rounded-2xl shadow-2xl p-5 z-50">
      <p className="text-sm leading-relaxed">{t.cookie.msg[locale]}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => decide(true)} className="btn-primary !px-4 !py-2 text-sm flex-1">
          {t.cookie.accept[locale]}
        </button>
        <button
          onClick={() => decide(false)}
          className="border border-cream/30 rounded-full px-4 py-2 text-sm flex-1 hover:bg-cream/10"
        >
          {t.cookie.reject[locale]}
        </button>
      </div>
    </div>
  );
}
