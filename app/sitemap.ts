import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";
import { posts } from "@/app/blog/posts";

const SITE = "https://backpack-bottle.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/blog", "/privacy", "/measurement", "/stack"].map((p) => ({
    url: `${SITE}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1.0 : 0.7,
  }));
  const destRoutes = destinations.map((d) => ({
    url: `${SITE}/destinazioni/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const blogRoutes = posts.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...destRoutes, ...blogRoutes];
}
