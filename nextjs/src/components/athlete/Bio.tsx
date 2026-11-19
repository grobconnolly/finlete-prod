import Image from "next/image";
import { ageOn, type Athlete } from "@/data/athletes";

export function Bio({ a }: { a: Athlete }) {
  const b = a.bio;
  const facts: [string, string][] = [
    ["Position", `${a.position} (${a.positionAbbr})`],
    ["Born", `${b.birthdateLabel} (${ageOn(b.birthdate)})`],
    ["Birthplace", b.birthplace],
    [b.bats ? "Bats / throws" : "Throws", b.bats ? `${b.bats} / ${b.throws}` : b.throws],
    ["Height / weight", `${b.height} / ${b.weight}`],
    ["Organization", a.organization],
    ["Organization prospect rank", b.orgRank],
    ["MLB Top 100", b.top100],
    ["Current level", a.level],
    ["Current team", a.team],
  ];
  if (b.acquired) facts.push(["How acquired", b.acquired]);
  if (b.eta) facts.push(["Projected MLB arrival", b.eta]);
  return (
    <section className="section bio slash-top" id="athlete">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">
            Meet {a.firstName} {a.lastName}
          </h2>
        </div>
        <div className="bio-grid">
          <figure className="bio-photo">
            <Image
              src={a.photos.cutout.src}
              width={a.photos.cutout.width}
              height={a.photos.cutout.height}
              alt=""
              sizes="(max-width: 960px) 60vw, 360px"
            />
          </figure>
          <dl className="bio-facts">
            {facts.map(([k, v]) => (
              <div className="row-line" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="stats">
          <h3 className="h3">{a.stats.kind === "hitting" ? "Hitting" : "Pitching"}</h3>
          <div className="stats-scroll">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Season</th>
                  {a.stats.columns.map((c) => (
                    <th key={c} className="num">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {a.stats.rows.map((r) => (
                  <tr key={r.label}>
                    <td className="nm">{r.label}</td>
                    {r.values.map((v, i) => (
                      <td key={a.stats.columns[i]} className="num">
                        {v ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note micro">
            Statistics and rankings from {a.stats.source}. A projected arrival is a scouting
            estimate, not a promise. None of this predicts MLB earnings.
          </p>
        </div>
      </div>
    </section>
  );
}
