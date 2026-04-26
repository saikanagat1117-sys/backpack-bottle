"use client";
import { useEffect } from "react";
import { track } from "@/lib/gtm";

export default function OutboundLinkTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest("a") as HTMLAnchorElement | null;
      if (!a || !a.href) return;
      const isExternal = a.host && a.host !== window.location.host;
      const isPdf = a.href.toLowerCase().endsWith(".pdf");
      const isMailto = a.href.startsWith("mailto:");
      const isTel = a.href.startsWith("tel:");
      if (isExternal) track("outbound_click", { url: a.href, label: a.innerText.slice(0, 60) });
      if (isPdf) track("pdf_download", { url: a.href });
      if (isMailto) track("mailto_click", { url: a.href });
      if (isTel) track("tel_click", { url: a.href });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  return null;
}
