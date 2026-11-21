import type { MetadataRoute } from "next";
import { ALL_OFFERINGS } from "@/data/athletes";

const BASE = "https://finlete.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = ["", "/athletes", "/funded", "/about", "/legal/terms-of-service", "/legal/privacy-policy"];
  return [
    ...fixed.map((p) => ({ url: `${BASE}${p}`, lastModified: now })),
    ...ALL_OFFERINGS.map((a) => ({ url: `${BASE}/${a.slug}`, lastModified: now })),
  ];
}
