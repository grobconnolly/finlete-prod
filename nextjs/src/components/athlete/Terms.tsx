import { formatPct, money, type Athlete } from "@/data/athletes";

export function Terms({ a }: { a: Athlete }) {
  const o = a.offering;
  const cells = [
    { num: money(o.sharePrice, true), label: "Share price" },
    { num: money(o.minimumInvestment, true), label: "Minimum investment" },
    { num: formatPct(o.pctOfPay), label: "Of his MLB pay" },
    { num: `${o.termYears} years`, label: "Of MLB contracts covered" },
    { num: o.totalShares.toLocaleString("en-US"), label: "Total shares" },
    { num: money(o.maximumRaise), label: "Maximum raise" },
  ];
  return (
    <section className="trust terms" id="terms" aria-label="Offering terms">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">Terms at a glance</h2>
          <p className="lead">
            Each share is 1% of his pre-tax, on-field MLB pay divided by 100,000. Minimum raise{" "}
            {money(o.minimumRaise)}. The Form C has the full terms.
          </p>
        </div>
        <dl className="scoreboard six">
          {cells.map((c) => (
            <div className="sb-cell" key={c.label}>
              <dd className="sb-num">{c.num}</dd>
              <dt className="sb-label">{c.label}</dt>
            </div>
          ))}
        </dl>
        <div className="term-note">
          <b>What the {o.termYears} years means.</b> The agreement covers every MLB contract he signs
          during the {o.termYears}-year term. Pay under those contracts counts whenever it is paid:
          if salary from one of them is deferred past year {o.termYears}, Finlete still collects it.
          Contracts signed after the term are not covered.
        </div>
        <p className="terms-docs">
          <a href={o.formC} rel="noopener">
            Form C
          </a>
          <a href={o.offeringCircular} rel="noopener">
            {o.offeringCircularLabel}
          </a>
          <a href="https://www.sec.gov/edgar/browse/?CIK=2010670" rel="noopener">
            All SEC filings
          </a>
        </p>
      </div>
    </section>
  );
}
