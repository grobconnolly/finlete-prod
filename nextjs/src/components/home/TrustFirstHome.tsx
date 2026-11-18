"use client";

import { riskLine, statsAsOf, statsById } from "@/data/home-content";
import { getOffering, openOfferings } from "@/data/offerings";
import { ArrowIcon } from "./icons";
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
import type { VariantSource } from "@/lib/analytics";
import { moneyFlow } from "@/data/home-content";

export function TrustFirstHome({ source }: { source: VariantSource }) {
  return (
    <HomeFrame variant="trust-first" source={source}>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <InvestorBand
          kicker="Backed by investors including"
          lede="Finlete's company investors include funds affiliated with Tim Draper."
        />
        <section className="band">
          <div className="wrap">
            <SectionIntro
              eyebrow="The scoreboard"
              title="Real fans, real investments"
              center
            />
            <StatBlock stats={statsById(["raised", "investments", "average", "repeat", "athletes", "minimum"])} />
            <p className="caption">{statsAsOf}</p>
          </div>
        </section>
        <section className="band band-soft">
          <div className="wrap">
            <h2 className="statement">
              Most minor leaguers earn less than a living wage while they chase the majors.
            </h2>
          </div>
        </section>
        <section className="band" id="how-it-works">
          <div className="wrap">
            <SectionIntro eyebrow="How it works" title="Three steps to back a player" />
            <StepList />
          </div>
        </section>
        <section className="band band-soft" id="open-offerings">
          <div className="wrap">
            <SectionIntro
              eyebrow="Open offerings"
              title="Find a player to back"
              lede="Four offerings are open. Pick one career to invest in."
            />
            <div className="cards cols-4">
              {openOfferings.map((offering) => (
                <AthleteCard key={offering.slug} offering={offering} />
              ))}
            </div>
            <FundedNote />
          </div>
        </section>
        <section className="band">
          <div className="wrap">
            <SectionIntro eyebrow="The structure" title="How your money flows" />
            <ol className="flow">
              {moneyFlow.map((step, index) => (
                <li key={step} className={index === moneyFlow.length - 1 ? "payoff" : undefined}>
                  {step}
                </li>
              ))}
            </ol>
            <div className="flow-follow">
              <RiskNote />
            </div>
          </div>
        </section>
        <DetailStack scenario="investment" />
        <Testimonials />
        <Faq />
        <FinalCta
          title="Be there from the first pitch."
          lede="Find a player to back. Start at $300."
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
    <section className="band-hero" id="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="trust-kicker">Regulation CF · SEC-registered broker-dealer</p>
          <h1>Back a future big leaguer before the big leagues do.</h1>
          <p className="hero-lede">
            Finlete lets fans invest in a minor-league player&apos;s career. You start at $300.
            If he makes the majors, you share in what he earns.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-primary btn-auto"
              href="#open-offerings"
              onClick={() => track.cta("hero")}
            >
              See open offerings
            </a>
            <a className="text-link" href="#how-it-works">
              How it works <ArrowIcon />
            </a>
          </div>
          <RiskNote>{riskLine}</RiskNote>
        </div>
        <AthleteCard offering={avila} featured />
      </div>
    </section>
  );
}
