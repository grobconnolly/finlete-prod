import Link from "next/link";
import type { Athlete } from "@/data/athletes";

export function HowItWorks({ a }: { a: Athlete }) {
  const steps = [
    {
      n: "1",
      h: "Invest in his career",
      p: `You buy shares in this offering. Finlete sends ${a.shortName} the capital, with no debt, so he can train, eat and recover like a big leaguer.`,
    },
    {
      n: "2",
      h: "Follow his journey",
      p: "Watch his progress through the minors. Updates, stats and the wins along the way.",
    },
    {
      n: "3",
      h: "A % of his MLB pay",
      p: `If he reaches MLB, Finlete collects its % of the pay from every MLB contract he signs during the ${a.offering.termYears}-year term, including pay deferred past the term, and passes it to shareholders twice a year, less a management fee.`,
    },
  ];
  return (
    <section className="section slash-top hiw" id="how-it-works">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">How it works</h2>
          <p className="lead">This is not fantasy. This is not gambling. This is investing.</p>
        </div>
        <ol className="hiw-steps">
          {steps.map((s) => (
            <li key={s.n}>
              <span className="mrow-n">{s.n}</span>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </li>
          ))}
        </ol>
        <p className="hiw-never">
          <span className="mrow-n off">!</span>
          <span>
            If he never reaches MLB, there is no MLB pay, so nothing is paid. You lose your entire
            investment. He owes nothing back.{" "}
            <Link href="/#how-it-works">See where the money goes</Link>
          </span>
        </p>
      </div>
    </section>
  );
}
