"use client";

import Image from "next/image";
import { riskLine, statsAsOf, statsById } from "@/data/home-content";
import { getOffering, openOfferings } from "@/data/offerings";
import type { VariantSource } from "@/lib/analytics";
import { AthleteCard } from "./AthleteCard";
import { RiskNote } from "./RiskNote";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { StatBlock } from "./StatBlock";
import { StickyCtaBar } from "./StickyCtaBar";
import {
  DetailStack,
  Faq,
  FinalCta,
  FundedNote,
  InvestorBand,
  SectionIntro,
  StepList,
  Testimonials,
} from "./SharedSections";
import { HomeFrame, useTrack } from "./variant";

export function PlayerStoryHome({ source }: { source: VariantSource }) {
  const avila = getOffering("avila");
  const others = openOfferings.filter((offering) => offering.slug !== avila.slug);

  return (
    <HomeFrame variant="player-story" source={source}>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <section className="band">
          <div className="wrap">
            <SectionIntro eyebrow="Luinder's journey" title="Follow the path to the majors" />
            <ol className="timeline">
              <li>
                <p className="when">Signed</p>
                <p>Signed by the {avila.team} organization</p>
              </li>
              <li>
                <p className="when">Minors</p>
                <p>Rose to {avila.rankLabel} through the minor leagues</p>
              </li>
              <li>
                <p className="when">Finlete offering</p>
                <p>
                  {avila.raisedDisplay} raised
                  {avila.percentOfMax != null ? ` — ${avila.percentOfMax}% of the maximum` : ""}
                </p>
              </li>
              <li>
                <p className="when">{avila.keyStat}</p>
                <p>Made his Major League debut in 2025</p>
              </li>
            </ol>
          </div>
        </section>
        <InvestorBand
          align="start"
          kicker="Backed by"
          title="Investors who believe in the model"
          lede="Funds affiliated with Tim Draper (Draper Startup House, Draper Goren Blockchain) and the North Texas Angel Network."
        />
        <section className="band">
          <div className="wrap">
            <SectionIntro eyebrow="The scoreboard" title="Fans are already in" />
            <StatBlock
              columns={3}
              stats={statsById(["raised", "investments", "repeat"])}
            />
            <p className="caption">{statsAsOf}</p>
          </div>
        </section>
        <section className="band band-soft" id="how-it-works">
          <div className="wrap">
            <SectionIntro eyebrow="How Finlete works" title="Three steps to back a player" />
            <StepList />
          </div>
        </section>
        <section className="band" id="open-offerings">
          <div className="wrap">
            <SectionIntro
              eyebrow="Open offerings"
              title="Or back someone else"
              lede="Same idea. A different career."
            />
            <div className="cards cols-3">
              {others.map((offering) => (
                <AthleteCard key={offering.slug} offering={offering} ratio="43" />
              ))}
            </div>
            <FundedNote />
          </div>
        </section>
        <DetailStack scenario="earnings" />
        <Testimonials />
        <Faq />
        <FinalCta
          dark
          title="Find the player you believe in"
          lede="Start with Luinder, or pick another open offering."
        />
      </main>
      <SiteFooter />
      <StickyCtaBar />
    </HomeFrame>
  );
}

function Hero() {
  const avila = getOffering("avila");
  const track = useTrack();
  return (
    <section className="band-story" id="hero">
      <div className="story-layout">
        <div className="story-photo">
          <Image
            className="cover"
            src={avila.photo ?? "/brand/athletes/avila.png"}
            alt={`${avila.name}, ${avila.team} pitcher`}
            fill
            priority
            sizes="(max-width: 960px) 100vw, 560px"
          />
          <div className="story-chips">
            <div className="chip-stack">
              <span className="photo-chip">
                <i />
                {avila.rankLabel}
              </span>
              <span className="photo-chip">
                <i />
                {avila.keyStat}
              </span>
            </div>
            <span className="status-chip">Open offering</span>
          </div>
          <div className="story-overlay">
            <p className="story-kicker">
              {avila.name} · {avila.team} · {avila.position}
            </p>
            <h1 className="story-hero-title">From the minors to the majors — back his career.</h1>
          </div>
        </div>
        <div className="story-copy">
          <p className="hero-lede">
            Finlete lets you invest in {avila.firstName}&apos;s career from $300. If he makes the
            majors, you share in what he earns.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-primary btn-auto"
              href={avila.checkoutUrl}
              onClick={() => {
                track.cta("hero");
                track.checkout(avila.checkoutUrl, avila.slug, "hero");
              }}
            >
              {avila.cta}
            </a>
            <a
              className="btn btn-secondary btn-auto"
              href="#open-offerings"
              onClick={() => track.cta("hero-secondary")}
            >
              See all open offerings
            </a>
          </div>
          <ul className="trust-row">
            <li>Reg CF</li>
            <li>SEC-registered broker-dealer</li>
            <li>$300 minimum</li>
          </ul>
          <RiskNote>{riskLine}</RiskNote>
        </div>
      </div>
    </section>
  );
}
