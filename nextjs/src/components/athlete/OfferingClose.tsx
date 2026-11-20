import Link from "next/link";
import { money, type Athlete } from "@/data/athletes";
import { LINKS } from "@/data/home";

export function OfferingClose({ a }: { a: Athlete }) {
  const o = a.offering;
  const open = a.status === "open" && o?.cartUrl;
  return (
    <section className="cta oc">
      <div className="wrap">
        <div>
          <h2 className="display">
            {open ? `Invest in ${a.shortName}'s career.` : `${a.lastName} is fully funded.`}
          </h2>
          <p className="oc-terms">
            {open && o
              ? `${money(o.sharePrice, true)} per share. ${o.minimumInvestment ? `Minimum ${money(o.minimumInvestment, true)}. ` : ""}Cancel for any reason until 48 hours before a closing.`
              : "This offering is closed. Other athletes are open now, and new offerings open through the season."}
          </p>
        </div>
        <div className="actions">
          {open && o ? (
            <a className="btn btn-primary" href={o.cartUrl} rel="noopener">
              Make an investment now
            </a>
          ) : (
            <Link className="btn btn-primary" href="/athletes">
              See open offerings
            </Link>
          )}
          <a
            href={`${LINKS.contact}?subject=${encodeURIComponent(`Question about the ${a.lastName} offering`)}`}
          >
            Or ask us a question
          </a>
        </div>
        {o && (
          <ul className="oc-docs" role="list">
            <li>
              <a href={o.formC} rel="noopener">
                Form C
              </a>
            </li>
            {o.offeringCircular && (
              <li>
                <a href={o.offeringCircular} rel="noopener">
                  Offering circular
                </a>
              </li>
            )}
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
        )}
      </div>
    </section>
  );
}
