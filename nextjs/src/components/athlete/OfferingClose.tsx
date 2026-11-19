import { money, type Athlete } from "@/data/athletes";
import { LINKS } from "@/data/home";

export function OfferingClose({ a }: { a: Athlete }) {
  const o = a.offering;
  return (
    <section className="cta oc">
      <div className="wrap">
        <div>
          <h2 className="display">Invest in {a.shortName}&apos;s career.</h2>
          <p className="oc-terms">
            {money(o.sharePrice, true)} per share. Minimum {money(o.minimumInvestment, true)}. Cancel
            for any reason until 48 hours before a closing.
          </p>
        </div>
        <div className="actions">
          <a className="btn btn-primary" href={o.cartUrl} rel="noopener">
            Make an investment now
          </a>
          <a href={`${LINKS.contact}?subject=${encodeURIComponent(`Question about the ${a.lastName} offering`)}`}>
            Or ask us a question
          </a>
        </div>
        <ul className="oc-docs" role="list">
          <li>
            <a href={o.formC} rel="noopener">
              Form C
            </a>
          </li>
          <li>
            <a href={o.offeringCircular} rel="noopener">
              Offering circular
            </a>
          </li>
          <li>
            <a href="https://www.dealmaker.tech/" rel="noopener">
              DealMaker
            </a>
          </li>
          <li>
            <a
              href="https://www.sec.gov/resources-small-businesses/exempt-offerings/regulation-crowdfunding"
              rel="noopener"
            >
              Regulation CF
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
