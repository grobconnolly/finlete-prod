"use client";

import Image from "next/image";
import { headlines, riskLine } from "@/data/home-content";
import { getOffering } from "@/data/offerings";
import type { VariantSource } from "@/lib/analytics";
import { LowerHome, PageShell, TrustBar } from "./HomeBody";
import { useTrack } from "./variant";

export function PlayerStoryHome({ source }: { source: VariantSource }) {
  return (
    <PageShell variant="player-story" source={source}>
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
          <p className="kicker">
            {avila.name} · {avila.teamShort} · {avila.position}
          </p>
          <h1>{headlines.playerStory}</h1>
          <p className="lede">
            Royals pitcher, major-league debut in 2025. Invest in {avila.firstName}&apos;s career
            from $300. Any share of future earnings follows the offering terms.
          </p>
          <a
            className="btn hero-cta"
            href={avila.checkoutUrl}
            onClick={() => {
              track.cta("hero");
              track.checkout(avila.checkoutUrl, avila.slug, "hero");
            }}
          >
            {avila.cta}
          </a>
          <a className="text-link" href="#open-offerings" onClick={() => track.cta("hero-secondary")}>
            See the other offerings
          </a>
          <p className="risk-line">{riskLine}</p>
        </div>
        <div className="hero-media">
          <div className="portrait">
            <Image
              className="cover"
              src={avila.photo ?? "/brand/athletes/avila.png"}
              alt={`${avila.name}, ${avila.team} pitcher`}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 540px"
              style={{ objectPosition: "center 34%" }}
            />
          </div>
        </div>
      </div>
      <TrustBar />
    </section>
  );
}
