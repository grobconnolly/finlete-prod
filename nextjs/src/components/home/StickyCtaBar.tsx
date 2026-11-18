"use client";

import { useEffect, useState } from "react";
import { useTrack } from "./variant";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  const track = useTrack();

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-cta">
      <a
        className="btn btn-primary"
        href="#open-offerings"
        onClick={() => track.cta("sticky")}
      >
        See open offerings
      </a>
    </div>
  );
}
