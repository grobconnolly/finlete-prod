"use client";

import Image from "next/image";
import type { Offering } from "@/data/offerings";
import { useTrack } from "./variant";

/**
 * One Card-athlete structure for every offering.
 * Collapsed photo + identity + amount + progress, plus one CTA.
 * The expanded share-price footer is omitted: only Avila has a confirmed
 * share price, and a mixed footer would change card heights.
 */
export function AthleteCard({ offering }: { offering: Offering }) {
  const track = useTrack();
  const percent = offering.percentOfMax;
  const showStat = offering.kind === "player" && offering.keyStat.length > 0;

  const onClick = () => {
    track.offering(offering.slug, offering.name);
    track.cta("offering-card");
    track.checkout(offering.checkoutUrl, offering.slug, "offering-card");
  };

  return (
    <article className="athlete-card">
      <div className="athlete-photo">
        {offering.photo ? (
          <Image
            className="cover"
            src={offering.photo}
            alt=""
            fill
            sizes="300px"
            style={{ objectPosition: offering.photoFocus }}
          />
        ) : (
          <div className="athlete-photo-empty" />
        )}
        <div className="athlete-shade" aria-hidden="true" />
        <span className="athlete-status">Available</span>
        <div className="athlete-chips">
          <div className="athlete-chips-main">
            {offering.rankLabel ? (
              <span className="athlete-chip">{offering.rankLabel}</span>
            ) : null}
          </div>
          {offering.positionLabel ? (
            <span className="athlete-chip">{offering.positionLabel}</span>
          ) : null}
        </div>
      </div>
      <div className="athlete-info">
        <div className="athlete-avatar">
          {offering.photo ? (
            <Image
              src={offering.photo}
              alt=""
              fill
              sizes="40px"
              style={{ objectPosition: offering.photoFocus }}
            />
          ) : null}
        </div>
        <h3 className="athlete-name">{offering.name}</h3>
        <p className="athlete-team">{offering.team}</p>
        <p className="athlete-stat" aria-hidden={showStat ? undefined : true}>
          {showStat ? offering.keyStat : ""}
        </p>
        <p className="athlete-amount">{offering.raisedDisplay}</p>
        {percent != null ? (
          <div
            className="athlete-track"
            role="progressbar"
            aria-label={`${percent}% of maximum raised for ${offering.name}`}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${percent}%` }} />
          </div>
        ) : (
          <div
            className="athlete-track"
            role="progressbar"
            aria-label={`Raised amount for ${offering.name}`}
            aria-valuetext={`Percent of maximum is not reported for ${offering.name}.`}
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: "0%" }} />
          </div>
        )}
        <a className="athlete-cta" href={offering.checkoutUrl} onClick={onClick}>
          {offering.cta}
        </a>
      </div>
    </article>
  );
}
