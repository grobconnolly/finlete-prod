import type { NextConfig } from "next";

/**
 * Pixel-perfect static mirror of finlete.com.
 *
 * Every page is a captured Framer HTML file at its exact URL path inside
 * `public/`:
 *   /                          → public/index.html
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
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Static redesign prototype lives in public/redesign; Next.js only
      // serves public files at their exact path, so map the clean URL.
      { source: "/redesign", destination: "/redesign/index.html" },
    ];
  },
};

export default nextConfig;
