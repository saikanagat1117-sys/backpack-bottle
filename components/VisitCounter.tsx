"use client";
import { useEffect } from "react";

export default function VisitCounter() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const k = "bb_visits";
    const n = parseInt(localStorage.getItem(k) || "0", 10) + 1;
    localStorage.setItem(k, String(n));
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "visit_count_set", visit_count: n });
  }, []);
  return null;
}
