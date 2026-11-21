import Image from "next/image";
import Link from "next/link";
import { getAthlete, type Athlete } from "@/data/athletes";
import { OfferingGrid } from "./OfferingGrid";

/** The two pitchers the bundle is sold on, in order, and one line on each. */
const FEATURED: Record<string, { label: string; why: string }> = {
  zazueta: {
    label: "The headliner",
    why: "Dodgers right-hander and the No. 23 prospect in baseball. 2.41 ERA with 81 strikeouts in 67.1 innings in 2025.",
  },
  lagrange: {
    label: "The No. 2",
    why: "Yankees right-hander in Triple-A, the organization's No. 2 prospect and an MLB Top 100 name. Fastball up to 103 mph.",
  },
};

export function BundleMembers({ a }: { a: Athlete }) {
  if (!a.bundle) return null;
  const members = a.bundle.members.map((s) => getAthlete(s)).filter((m): m is Athlete => !!m);
  const featured = members.filter((m) => FEATURED[m.slug]);
  const rest = members.filter((m) => !FEATURED[m.slug]);
  return (
    <section className="section bio slash-top" id="athlete">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">Six pitchers, two headliners</h2>
          <p className="lead">
            Each has his own agreement with Finlete, and a bundle share is a slice of all six. Two of
            them carry the top billing. The other four are good prospects in their own right.
          </p>
        </div>

        <ol className="bm-top" role="list">
          {featured.map((m) => {
            const f = FEATURED[m.slug];
            const photo = m.photos.head ?? m.photos.action;
            return (
              <li key={m.slug}>
                <Link href={`/${m.slug}`} className="bm-card">
                  <div className="bm-photo">
                    <Image
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      alt=""
                      sizes="(max-width: 600px) 40vw, 200px"
                    />
                  </div>
                  <div className="bm-body">
                    <span className="bm-label">{f.label}</span>
                    <h3>
                      {m.firstName} {m.lastName}
                    </h3>
                    <p className="bm-meta">
                      {m.position}, {m.organization}
                      {m.level ? ` · ${m.level}` : ""}
                    </p>
                    <p className="bm-why">{f.why}</p>
                    <span className="ocard-cta">See his page</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>

        <h3 className="bm-sub">Four more good prospects</h3>
        <OfferingGrid items={rest} compact />

        <p className="note micro">
          A pitcher&apos;s own page may describe a separate, earlier offering. The bundle&apos;s
          terms are in its Form C.
        </p>
      </div>
    </section>
  );
}
