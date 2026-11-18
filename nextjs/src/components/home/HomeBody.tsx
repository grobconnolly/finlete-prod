"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import {
  earningsLine,
  faqs,
  investors,
  moneyFlow,
  regulatoryLine,
  riskLine,
  statsAsOf,
  steps,
  testimonial,
  trustStats,
} from "@/data/home-content";
import { fundedOfferingCount, openOfferings } from "@/data/offerings";
import type { VariantSource } from "@/lib/analytics";
import type { HomepageVariant } from "@/lib/homepage-variant";
import { AthleteCard } from "./AthleteCard";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { StickyCtaBar } from "./StickyCtaBar";
import { HomeFrame } from "./variant";

export function PageShell({
  variant,
  source,
  children,
}: {
  variant: HomepageVariant;
  source: VariantSource;
  children: ReactNode;
}) {
  return (
    <HomeFrame variant={variant} source={source}>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <StickyCtaBar />
    </HomeFrame>
  );
}

export function TrustBar() {
  return (
    <div className="trust">
      {/* TODO: Tim Draper quote — pending approval. Do not render until a real quote is approved. */}
      {/* TODO: funding portal legal name — pending confirmation. */}
      <div className="trust-inner">
        <div className="trust-row">
          <div className="trust-backers">
            <p className="trust-label">Backed by funds affiliated with Tim Draper</p>
            <div className="logo-row">
              {investors.map((investor) => (
                <Image
                  key={investor.name}
                  src={investor.src}
                  alt={investor.name}
                  width={investor.width}
                  height={investor.height}
                />
              ))}
            </div>
          </div>
          <div className="trust-rule" aria-hidden="true" />
          <div className="trust-stats">
            {trustStats.map((stat) => (
              <p key={stat.id}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </p>
            ))}
          </div>
        </div>
        <p className="trust-note">
          {statsAsOf} {regulatoryLine}
        </p>
      </div>
    </div>
  );
}

export function LowerHome() {
  return (
    <>
      <section className="band" id="how-it-works">
        <div className="wrap cols">
          <div className="section-head">
            <p className="kicker">How it works</p>
            <h2>Three steps. Then you wait on the career.</h2>
          </div>
          <ol className="grid-contents">
            {steps.map((step) => (
              <li className="step" key={step.n}>
                <span className="step-n">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band-sand" id="open-offerings">
        <div className="wrap cols">
          <div className="section-head">
            <p className="kicker">Open offerings</p>
            <h2>Four careers you can invest in.</h2>
          </div>
          {openOfferings.map((offering) => (
            <AthleteCard key={offering.slug} offering={offering} />
          ))}
          <p className="offer-note">
            <span>{fundedOfferingCount} offerings are already fully funded.</span>
            <a className="text-link" href="/athletes">
              All athletes
            </a>
          </p>
        </div>
      </section>

      <section className="band">
        <div className="wrap cols">
          <div className="section-head">
            <p className="kicker">How the money moves</p>
            <h2>Plain terms, no promise of a payoff.</h2>
          </div>
          <ol className="grid-contents">
            {moneyFlow.map((step) => (
              <li className="flow-item" key={step.n}>
                <span className="flow-n">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="flow-rule risk-line">
            {earningsLine} {riskLine}
          </p>
        </div>
      </section>

      <section className="band band-sand">
        <div className="wrap cols">
          <figure className="quote">
            <blockquote>“{testimonial.quote}”</blockquote>
            <figcaption>
              {testimonial.name}
              <span>{testimonial.detail}</span>
            </figcaption>
            <p className="note">One investor’s words. Not a guarantee of results.</p>
          </figure>
        </div>
      </section>

      <section className="band" id="faq">
        <div className="wrap cols">
          <div className="section-head">
            <p className="kicker">FAQ</p>
            <h2>The short version.</h2>
          </div>
          <div className="faq">
            {faqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
