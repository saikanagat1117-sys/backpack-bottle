"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/gtm";

/** Fires `time_on_page` events at 30s/60s/120s/300s milestones,
 * and an `engaged_session` event after 30s of active engagement. */
export default function ReadingTimeTracker() {
  const path = usePathname();
  const start = useRef<number>(Date.now());
  const fired = useRef<Record<string, boolean>>({});
  const visible = useRef(true);

  useEffect(() => {
    start.current = Date.now();
    fired.current = {};
    const onVis = () => { visible.current = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);
    const id = setInterval(() => {
      if (!visible.current) return;
      const secs = Math.round((Date.now() - start.current) / 1000);
      [30, 60, 120, 300].forEach((m) => {
        const key = `t_${m}`;
        if (secs >= m && !fired.current[key]) {
          fired.current[key] = true;
          track("time_on_page", { seconds: m, path });
          if (m === 30) track("engaged_session", { path });
        }
      });
    }, 5000);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [path]);

  return null;
}
