"use client";

import Image from "next/image";
import { cardSubtitle, type Offering } from "@/data/offerings";
import { BaseballIcon } from "./icons";
import { useTrack } from "./variant";

export function AthleteCard({
  offering,
  featured = false,
  ratio = "45",
}: {
  offering: Offering;
  featured?: boolean;
  ratio?: "45" | "43";
}) {
  const track = useTrack();
  const subtitle = cardSubtitle(offering, featured);
  const keyLine = featured
    ? `Key stat: ${offering.keyStat}${offering.sharePrice ? ` · ${offering.sharePrice}` : ""}`
    : offering.keyStat;

  const Title = featured ? "h2" : "h3";

  return (
    <article className={featured ? "card featured" : "card"}>
      <a
        className="card-link"
        href={offering.checkoutUrl}
        onClick={() => {
          track.offering(offering.slug, offering.name);
          track.cta("offering-card");
          track.checkout(offering.checkoutUrl, offering.slug, "offering-card");
        }}
      >
        <div className={`card-photo ratio-${ratio}`}>
          <span className="status-chip">
            <i />
            Open
          </span>
          {offering.photo ? (
            <Image
              className="cover"
              src={offering.photo}
              alt=""
              fill
              sizes={featured ? "(max-width: 960px) 100vw, 440px" : "(max-width: 720px) 100vw, 280px"}
              {...(featured ? { priority: true } : { loading: "eager" as const })}
            />
          ) : (
            <div className="bundle-art">
              <BaseballIcon />
              <p>6 pitchers</p>
            </div>
          )}
        </div>
        <div className="card-body">
          <Title>{offering.name}</Title>
          <p className="meta">{subtitle}</p>
          <p className="stat">{keyLine}</p>
          <div className="raised-row">
            <b>
              {offering.raisedDisplay}
              {featured ? " raised" : ""}
            </b>
            {offering.percentOfMax != null ? (
              <span className="pct">{offering.percentOfMax}%</span>
            ) : null}
          </div>
          {offering.percentOfMax != null ? (
            <div
              className="bar"
              role="progressbar"
              aria-label={`${offering.percentOfMax}% of maximum raised for ${offering.name}`}
              aria-valuenow={offering.percentOfMax}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span style={{ width: `${offering.percentOfMax}%` }} />
            </div>
          ) : null}
          <span className="btn btn-card card-cta">{offering.cta}</span>
        </div>
      </a>
    </article>
  );
}
