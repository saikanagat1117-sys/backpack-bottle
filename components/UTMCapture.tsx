"use client";
import { useEffect } from "react";

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

// On first hit with UTM params, stash them in localStorage with a 30-day TTL.
// LeadForm reads them later and includes in the /api/lead payload.
export default function UTMCapture() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const found: Record<string, string> = {};
      KEYS.forEach((k) => {
        const v = url.searchParams.get(k);
        if (v) found[k] = v;
      });
      if (Object.keys(found).length > 0) {
        const payload = {
          ...found,
          _captured_at: Date.now(),
          _landing_page: url.pathname,
          _referrer: document.referrer || "direct",
        };
        localStorage.setItem("bb_utm", JSON.stringify(payload));
      }
    } catch {}
  }, []);
  return null;
}

export function readUTM(): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("bb_utm");
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // 30-day TTL
    if (Date.now() - (parsed._captured_at || 0) > 30 * 24 * 3600 * 1000) {
      localStorage.removeItem("bb_utm");
      return {};
    }
    return parsed;
  } catch {
    return {};
  }
}
