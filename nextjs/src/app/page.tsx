import type { Metadata } from "next";
import { HomeExperiment } from "@/components/home/HomeExperiment";

export const metadata: Metadata = {
  title: "Invest in a player's career | Finlete",
  description:
    "Finlete lets fans invest in a minor-league baseball player's career from $300. If he reaches the majors, you share in his MLB earnings. You could lose your entire investment.",
  icons: { icon: "/brand/favicon.png" },
};

/**
 * Shipping homepage for the Next.js app (the Vercel project).
 * The previous Framer mirror remains at /index.html. See HOMEPAGE_EXPERIMENT.md.
 */
export default function HomePage() {
  return <HomeExperiment />;
}
