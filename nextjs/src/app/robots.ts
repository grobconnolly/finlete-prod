import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Working copies and comparisons, not pages for visitors.
      disallow: ["/framer", "/redesign", "/app", "/api/"],
    },
    sitemap: "https://finlete.com/sitemap.xml",
  };
}
