import Image from "next/image";
import { money, type Athlete } from "@/data/athletes";

export function AthleteHero({ a }: { a: Athlete }) {
  const o = a.offering;
  return (
    <section className="hero on-dark ah" id="top">
      <div className="wrap">
        <div className="ah-grid">
          <div className="ah-copy">
            <span className="hero-label">
              {a.status === "open" ? "Open offering" : "Sold out"}
              {a.badge ? ` · ${a.badge}` : ""}
            </span>
            <h1 className="ah-h1">
              <span className="first">{a.firstName}</span>
              <span className="last">{a.lastName}</span>
            </h1>
            <p className="ah-sub">
              {a.position}, {a.organization}. {a.level === "MLB" ? "Major leagues." : `${a.level} level, ${a.team}.`}
            </p>
            <ul className="ah-tags" aria-label="What to know">
              {a.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p className="lead">
              You get a % of his future MLB earnings for {o.termYears} years. If he never makes it,
              you get nothing.
            </p>

            <div className="ah-invest" id="invest">
              <div className="ah-price">
                <span className="num">{money(o.sharePrice, true)}</span>
                <span className="per">per share</span>
                <span className="min">Minimum {money(o.minimumInvestment, true)}</span>
              </div>
              <div className="ah-invest-actions">
                <a className="btn btn-primary" href={o.cartUrl} rel="noopener">
                  Invest in {a.shortName}
                </a>
                <a className="btn btn-secondary" href="#videos">
                  Watch video
                </a>
              </div>
              <p className="ah-invest-note">
                Checkout runs on DealMaker Securities, the broker-dealer for this offering.
              </p>
            </div>

            <p className="hero-legal">
              Investing is speculative and you can lose your entire investment. Read the{" "}
              <a href={o.formC} rel="noopener">
                Form C
              </a>{" "}
              before you invest.
            </p>
          </div>

          <figure className="ah-photo">
            <Image
              src={a.photos.action.src}
              width={a.photos.action.width}
              height={a.photos.action.height}
              alt={a.photos.action.alt}
              sizes="(max-width: 960px) 100vw, 50vw"
              preload
            />
          </figure>
        </div>
      </div>

      {a.quote && (
        <div className="ah-quote">
          <div className="wrap">
            <blockquote>
              <p>“{a.quote.text}”</p>
              <footer>
                {a.quote.who}, {a.quote.outlet}
              </footer>
            </blockquote>
          </div>
        </div>
      )}
    </section>
  );
}
