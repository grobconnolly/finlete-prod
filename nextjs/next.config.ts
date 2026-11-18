import type { NextConfig } from "next";

/**
 * Pixel-perfect static mirror of finlete.com.
 *
 * Every page is a captured Framer HTML file at its exact URL path inside
 * `public/`:
 *   /                          → src/app/page.tsx (homepage A/B experiment)
 *   /index.html                → public/index.html (previous Framer mirror)
 *   /about                     → public/about/index.html
 *   /athletes                  → public/athletes/index.html
 *   /avila, /escobar, /ornelas,
 *   /padilla, /santos, /teodo  → public/<slug>/index.html
 *   /athlete-landingpage-2026  → public/athlete-landingpage-2026/index.html
 *   /legal/terms-of-service    → public/legal/terms-of-service/index.html
 *   /legal/privacy-policy      → public/legal/privacy-policy/index.html
 *
 * Assets (images, fonts) are served from public/images/ and public/fonts/,
 * referenced by absolute paths from inside each mirrored HTML file.
 *
 * `vercel.json` sets framework=nextjs so Vercel runs `next build` (rather
 * than treating this as a static-HTML-only project).
 */
const mirrorPages = [
  "about",
  "athletes",
  "avila",
  "escobar",
  "ornelas",
  "padilla",
  "santos",
  "teodo",
  "athlete-landingpage-2026",
  "legal/terms-of-service",
  "legal/privacy-policy",
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async rewrites() {
    return mirrorPages.map((path) => ({
      source: `/${path}`,
      destination: `/${path}/index.html`,
    }));
  },
};

export default nextConfig;
