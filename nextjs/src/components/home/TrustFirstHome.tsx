"use client";

import { headlines, riskLine } from "@/data/home-content";
import { getOffering } from "@/data/offerings";
import type { VariantSource } from "@/lib/analytics";
import { AthleteCard } from "./AthleteCard";
import { LowerHome, PageShell, TrustBar } from "./HomeBody";
import { useTrack } from "./variant";

export function TrustFirstHome({ source }: { source: VariantSource }) {
  return (
    <PageShell variant="trust-first" source={source}>
      <Hero />
      <LowerHome />
    </PageShell>
  );
}

function Hero() {
  const avila = getOffering("avila");
  const track = useTrack();

  return (
    <section className="hero" id="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker">For baseball fans</p>
          <h1>{headlines.trustFirst}</h1>
          <p className="lede">
            Luinder Avila debuted for the Royals in 2025. From $300. Any portion of future
            earnings is set by the offering terms.
          </p>
          <a
            className="btn hero-cta"
            href="#open-offerings"
            onClick={() => track.cta("hero")}
          >
            See open offerings
          </a>
          <p className="risk-line">{riskLine}</p>
        </div>
        <div className="hero-media">
          <AthleteCard offering={avila} layout="feature" />
        </div>
      </div>
      <TrustBar />
    </section>
  );
}
