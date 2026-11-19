import { money, type Athlete } from "@/data/athletes";

/** Fixed bottom bar on phones and tablets so the invest button is always one tap away. */
export function InvestBar({ a }: { a: Athlete }) {
  return (
    <div className="invest-bar" aria-label="Invest">
      <div className="ib-text">
        <b>{money(a.offering.sharePrice, true)} per share</b>
        <span>Minimum {money(a.offering.minimumInvestment, true)}</span>
      </div>
      <a className="btn btn-primary" href={a.offering.cartUrl} rel="noopener">
        Invest in {a.shortName}
      </a>
    </div>
  );
}
