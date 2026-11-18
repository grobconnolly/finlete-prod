"use client";

import Image from "next/image";
import {
  draperQuotePlaceholder,
  faqs,
  hypotheticalEarnings,
  hypotheticalInvestment,
  investors,
  perks,
  pressPlaceholders,
  riskLine,
  steps,
  testimonials,
} from "@/data/home-content";
import { fundedAthletes, fundedOfferingCount, getOffering } from "@/data/offerings";
import { ArrowIcon, PlusIcon } from "./icons";
import { useTrack } from "./variant";

export function SectionIntro({
  eyebrow,
  title,
  lede,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "intro center" : "intro"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
    </div>
  );
}

export function StepList() {
  return (
    <ol className="steps">
      {steps.map((step, index) => (
        <li key={step.title}>
          <span className="num" aria-hidden="true">
            {index + 1}
          </span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function InvestorBand({
  kicker,
  title,
  lede,
  align = "center",
}: {
  kicker: string;
  title?: string;
  lede: string;
  align?: "center" | "start";
}) {
  return (
    <section className="band band-dark">
      <div className={`wrap investor-band ${align}`}>
        <p className="eyebrow">{kicker}</p>
        {title ? <h2>{title}</h2> : null}
        <div className="logo-row">
          {investors.map((investor) => (
            <div className="logo-plate" key={investor.name}>
              <Image
                src={investor.src}
                alt={investor.name}
                width={investor.width}
                height={investor.height}
              />
            </div>
          ))}
        </div>
        <p className="investor-lede">{lede}</p>
        <p className="placeholder-chip">{draperQuotePlaceholder}</p>
      </div>
    </section>
  );
}

export function FundedNote() {
  return (
    <div className="section-foot" id="funded">
      <details className="funded">
        <summary>
          {fundedOfferingCount} offerings fully funded
          <PlusIcon />
        </summary>
        <ul className="funded-list">
          {fundedAthletes.map((athlete) => (
            <li key={athlete.slug}>
              {athlete.name} · {athlete.team}
            </li>
          ))}
          <li className="pending-name">[One funded athlete — name not in the source list]</li>
        </ul>
      </details>
      <a className="text-link" href="/athletes">
        Athlete pages <ArrowIcon />
      </a>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="band band-soft">
      <div className="wrap">
        <SectionIntro eyebrow="From our investors" title="Fans who got in early" center />
        <ul className="quotes">
          {testimonials.map((item) => (
            <li key={item.name}>
              <figure>
                <blockquote>
                  <p>“{item.quote}”</p>
                </blockquote>
                <figcaption>
                  {item.name}
                  {item.detail ? <span>{item.detail}</span> : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="caption">Testimonials are not a guarantee of future results.</p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="band" id="faq">
      <div className="wrap">
        <SectionIntro eyebrow="FAQ" title="Questions, answered" />
        <div className="faq">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <PlusIcon />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({
  title,
  lede,
  dark = false,
}: {
  title: string;
  lede: string;
  dark?: boolean;
}) {
  const track = useTrack();
  return (
    <section className={dark ? "band band-dark" : "band"}>
      <div className="wrap final">
        <h2>{title}</h2>
        <p className="lede">{lede}</p>
        <a
          className="btn btn-primary btn-auto"
          href="#open-offerings"
          onClick={() => track.cta("final")}
        >
          See open offerings
        </a>
        <p className="fine">{riskLine}</p>
      </div>
    </section>
  );
}

export function DetailStack({ scenario }: { scenario: "investment" | "earnings" }) {
  const avila = getOffering("avila");
  return (
    <section className="band band-soft">
      <div className="wrap">
        <SectionIntro eyebrow="Optional" title="More to know" lede="Open a section if you want it. You can skip all of this." />
        <div className="disclosure-stack">
          <details className="disclosure">
            <summary>
              See a hypothetical example
              <span className="disclosure-icon">
                <PlusIcon />
              </span>
            </summary>
            <div className="disclosure-body">
              {scenario === "investment" ? (
                <div className="hypo">
                  <p>
                    If {avila.firstName} earns <strong>{hypotheticalInvestment.careerEarnings}</strong> in
                    his MLB career, a <strong>{hypotheticalInvestment.investment}</strong> investment could
                    represent
                  </p>
                  <p className="big">{hypotheticalInvestment.illustratedValue}</p>
                  <p className="fine">{hypotheticalInvestment.downside}</p>
                  <p className="disclaimer">{hypotheticalInvestment.disclaimer}</p>
                </div>
              ) : (
                <>
                  <p>If he reaches the majors, you get a fixed share of what he earns. One example:</p>
                  <div className="earn-stack">
                    <div className="earn-row">
                      <span>Athlete earns</span>
                      <b>{hypotheticalEarnings.athleteEarns}</b>
                    </div>
                    <div className="earn-row">
                      <span>Finlete distributes</span>
                      <b>{hypotheticalEarnings.distributed}</b>
                    </div>
                    <div className="earn-row you">
                      <span>You earn</span>
                      <b>{hypotheticalEarnings.youEarn}</b>
                    </div>
                  </div>
                  <p className="disclaimer">{hypotheticalEarnings.disclaimer}</p>
                </>
              )}
            </div>
          </details>
          <details className="disclosure">
            <summary>
              Investor perks
              <span className="disclosure-icon">
                <PlusIcon />
              </span>
            </summary>
            <div className="disclosure-body">
              <ul className="perks">
                {perks.map((perk) => (
                  <li key={perk.label}>
                    <span>{perk.label}</span>
                    <b>{perk.amount}</b>
                  </li>
                ))}
              </ul>
              <p>Perk tiers come from the issuer. The offering documents have the full terms.</p>
            </div>
          </details>
          <details className="disclosure">
            <summary>
              As covered in
              <span className="disclosure-icon">
                <PlusIcon />
              </span>
            </summary>
            <div className="disclosure-body">
              <p>Press logos are placeholders until the lockups are approved.</p>
              <ul className="press-list">
                {pressPlaceholders.map((name) => (
                  <li key={name}>[Press logo — {name}]</li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
