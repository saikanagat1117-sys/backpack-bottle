"use client";
import { useEffect } from "react";
import { track } from "@/lib/gtm";

/** Detects rage clicks (3+ clicks in same area within 1s) and dead clicks (clicks
 * that don't change DOM within 500ms). Mirrors Microsoft Clarity behavioural signals
 * into GA4 so you can build conversion-suppression segments. */
export default function RageClickDetector() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let recent: { x: number; y: number; t: number; el: string }[] = [];
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.tagName.toLowerCase() + (target.id ? "#" + target.id : "") + (target.className ? "." + String(target.className).slice(0, 30) : "");
      const now = Date.now();
      // Rage click: 3+ in 1s, within 30px box
      recent = recent.filter((r) => now - r.t < 1000);
      recent.push({ x: e.clientX, y: e.clientY, t: now, el });
      if (recent.length >= 3) {
        const xs = recent.map((r) => r.x);
        const ys = recent.map((r) => r.y);
        if (Math.max(...xs) - Math.min(...xs) < 30 && Math.max(...ys) - Math.min(...ys) < 30) {
          track("rage_click", { element: el, count: recent.length });
          recent = [];
        }
      }
      // Dead click: did DOM change?
      const before = document.body.innerHTML.length;
      setTimeout(() => {
        const after = document.body.innerHTML.length;
        if (Math.abs(after - before) < 5) {
          // No meaningful DOM change → dead click
          if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
            track("dead_click", { element: el });
          }
        }
      }, 500);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
