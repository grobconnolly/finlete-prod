import type { CSSProperties } from "react";

function Arrow({ green = false }: { green?: boolean }) {
  return <li className={green ? "marrow g" : "marrow"} aria-hidden="true" />;
}

/** The example used throughout: a 1% agreement cut into 100,000 shares. */
const PIECES = 100; // each square is 1,000 shares
const MINE = 37; // the one square a 1,000-share holder has

/**
 * How Finlete works, told as a marketplace: the athlete lists a % of his
 * potential earnings, Finlete splits that agreement into shares, fans buy
 * the shares, and the agreement pays shareholders if he reaches MLB.
 */
export function MoneyFlow() {
  return (
    <section className="section money light slash-top" id="how-it-works">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">How Finlete works</h2>
          <p className="lead">
            Finlete is a marketplace where top athletes sell a % of their potential future
            earnings.
          </p>
        </div>
        <div className="mflow">
          <div className="mrow">
            <div className="mrow-head">
              <span className="mrow-n">1</span>
              <h3>The athlete lists a % of his potential earnings</h3>
            </div>
            <ol className="mline">
              <li className="mnode">
                <b>Athlete in the minors</b>
                <span>wants capital now, with no debt</span>
              </li>
              <Arrow />
              <li className="mnode doc">
                <b>Income Share Agreement</b>
                <span>he agrees to pay 1% of his MLB pay for 25 years</span>
              </li>
              <Arrow />
              <li className="mnode">
                <b>Finlete</b>
                <span>holds the agreement and crowdfunds it</span>
              </li>
            </ol>
          </div>

          <div className="mrow">
            <div className="mrow-head">
              <span className="mrow-n">2</span>
              <h3>Finlete splits the agreement into shares, and fans buy them</h3>
            </div>
            <ol className="mline">
              <li className="mnode doc">
                <b>The 1% agreement</b>
                <span>one contract, too big for one fan</span>
              </li>
              <Arrow green />
              <li className="mpieces">
                <div
                  className="pieces"
                  role="img"
                  aria-label="The agreement drawn as 100 equal squares, one of them highlighted"
                >
                  {Array.from({ length: PIECES }, (_, i) => (
                    <i
                      key={i}
                      className={i === MINE ? "mine" : undefined}
                      style={{ "--i": i } as CSSProperties}
                    />
                  ))}
                </div>
                <p className="pieces-cap">
                  <b>100,000 equal shares.</b> <span className="pieces-key" aria-hidden="true" />
                  Buy 1,000 and you hold one piece in a hundred.
                </p>
              </li>
              <Arrow green />
              <li className="mnode">
                <b>Fans</b>
                <span>
                  buy the shares. Each share carries an equal piece of whatever the agreement pays
                </span>
              </li>
            </ol>
            <p className="mmoney">
              <b>Where the money goes:</b> what fans pay for the shares goes to the athlete, up
              front.
            </p>
          </div>

          <div className="mrow">
            <div className="mrow-head">
              <span className="mrow-n">3</span>
              <h3>If he reaches MLB, the agreement pays</h3>
              <span className="when">during the 25-year term</span>
            </div>
            <div className="msplit">
              <ol className="mline msrc">
                <li className="mnode">
                  <b>MLB pay</b>
                  <span>what his club pays him</span>
                </li>
                <Arrow />
                <li className="mnode acct">
                  <b>Shared bank account</b>
                  <span>his MLB pay lands here first</span>
                </li>
              </ol>
              <div className="mbr">
                <div
                  className="mbar"
                  role="img"
                  aria-label="The account splits his MLB pay: 99% to the athlete, 1% to Finlete"
                >
                  <i />
                  <i />
                </div>
                <ol className="mline">
                  <li className="pct">99%</li>
                  <Arrow />
                  <li className="mnode">
                    <b>Athlete</b>
                    <span>keeps 99% of his MLB pay</span>
                  </li>
                </ol>
                <ol className="mline">
                  <li className="pct g">1%</li>
                  <Arrow green />
                  <li className="mnode doc">
                    <b>Finlete</b>
                    <span>collects the 1% under the Income Share Agreement</span>
                  </li>
                  <Arrow green />
                  <li className="mnode">
                    <b>Shareholders</b>
                    <span>split by shares held, less a 10% management fee</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="mrow">
            <div className="mrow-head">
              <span className="mrow-n off">4</span>
              <h3>If he never reaches MLB</h3>
            </div>
            <p className="mnever">
              The agreement pays nothing. Shareholders lose their entire investment. He owes
              nothing back.
            </p>
          </div>

          <p className="mnote">
            Example: a 1% agreement split into 100,000 shares. The shares are athlete-specific
            preferred stock issued by Finlete Funding, Inc. Each offering&apos;s Form C states its
            own percentage, share count and terms.
          </p>
        </div>
      </div>
    </section>
  );
}
