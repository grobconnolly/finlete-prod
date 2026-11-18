"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Offering } from "@/data/offerings";
import { AthleteCard } from "./AthleteCard";

const GAP = 22;

export function OfferingCarousel({ offerings }: { offerings: Offering[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  const syncEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({
      atStart: el.scrollLeft <= 2,
      atEnd: el.scrollLeft >= max - 2,
    });
  }, []);

  useEffect(() => {
    syncEdges();
  }, [syncEdges, offerings.length]);

  const move = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".athlete-card");
    const delta = (card?.offsetWidth ?? 300) + GAP;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * delta, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="offer-block">
      <div className="offer-arrows">
        <button
          type="button"
          className="offer-arrow"
          aria-label="Previous offerings"
          disabled={edges.atStart}
          onClick={() => move(-1)}
        >
          <Arrow direction="left" />
        </button>
        <button
          type="button"
          className="offer-arrow"
          aria-label="Next offerings"
          disabled={edges.atEnd}
          onClick={() => move(1)}
        >
          <Arrow direction="right" />
        </button>
      </div>
      <div
        className="offer-scroller"
        ref={scroller}
        onScroll={syncEdges}
        tabIndex={0}
        aria-label="Open offerings"
      >
        {offerings.map((offering) => (
          <AthleteCard key={offering.slug} offering={offering} />
        ))}
      </div>
    </div>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d={direction === "left" ? "M11 4 L6 9 L11 14" : "M7 4 L12 9 L7 14"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
