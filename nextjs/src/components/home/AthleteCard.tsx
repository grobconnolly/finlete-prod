"use client";

import Image from "next/image";
import { cardSubtitle, type Offering } from "@/data/offerings";
import { useTrack } from "./variant";

export function AthleteCard({
  offering,
  layout = "grid",
}: {
  offering: Offering;
  layout?: "grid" | "feature";
}) {
  const track = useTrack();
  const onClick = () => {
    track.offering(offering.slug, offering.name);
    track.cta("offering-card");
    track.checkout(offering.checkoutUrl, offering.slug, "offering-card");
  };

  if (layout === "feature") {
    return (
      <article className="feature-card">
        <div className="feature-photo">
          {offering.photo ? (
            <Image
              className="cover"
              src={offering.photo}
              alt=""
              fill
              sizes="180px"
              priority
              style={{ objectPosition: offering.photoFocus }}
            />
          ) : null}
        </div>
        <div className="feature-body">
          <h2>{offering.name}</h2>
          <p className="meta">{cardSubtitle(offering, true)}</p>
          <p className="meta">
            {offering.keyStat}
            {offering.sharePrice ? ` · ${offering.sharePrice}` : ""}
          </p>
          <div className="raised-row">
            <b>{offering.raisedDisplay} raised</b>
            {offering.percentOfMax != null ? <span>{offering.percentOfMax}%</span> : null}
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
              <i style={{ width: `${offering.percentOfMax}%` }} />
            </div>
          ) : null}
          <a className="text-link" href={offering.checkoutUrl} onClick={onClick}>
            {offering.cta}
          </a>
        </div>
      </article>
    );
  }

  return (
    <article className="card">
      <a className="card-link" href={offering.checkoutUrl} onClick={onClick}>
        <div className="card-photo">
          <span className="status">Open</span>
          {offering.photo ? (
            <Image
              className="cover"
              src={offering.photo}
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 280px"
              loading="eager"
              style={{ objectPosition: offering.photoFocus }}
            />
          ) : (
            <div className="bundle-art">
              <strong>06</strong>
              <span>Six pitchers, one offering</span>
            </div>
          )}
        </div>
        <div className="card-body">
          <h3>{offering.name}</h3>
          <p className="meta">{cardSubtitle(offering)}</p>
          <p className="meta">{offering.keyStat}</p>
          <div className="raised-row">
            <b>{offering.raisedDisplay}</b>
            {offering.percentOfMax != null ? <span>{offering.percentOfMax}%</span> : null}
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
              <i style={{ width: `${offering.percentOfMax}%` }} />
            </div>
          ) : null}
          <span className="btn card-cta">{offering.cta}</span>
        </div>
      </a>
    </article>
  );
}
