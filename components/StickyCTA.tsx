"use client";
import { useEffect, useState } from "react";
import { useLocale } from "./LocaleProvider";
import { trackCTA } from "@/lib/gtm";

export default function StickyCTA() {
  const { locale } = useLocale();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <a
      href="#coupon"
      onClick={() => trackCTA("sticky_floating")}
      className="fixed bottom-6 right-6 z-30 bg-burnt text-cream rounded-full shadow-2xl px-5 py-3 font-medium hover:bg-burnt-dark transition-colors flex items-center gap-2 md:hidden"
    >
      €50 →
    </a>
  );
}
