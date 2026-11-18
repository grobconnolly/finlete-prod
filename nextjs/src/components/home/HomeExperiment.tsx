"use client";

import { useEffect, useState } from "react";
import { resolveHomepageVariant, type VariantSource } from "@/lib/analytics";
import { parseForcedVariant, type HomepageVariant } from "@/lib/homepage-variant";
import { HomeSkeleton } from "./HomeSkeleton";
import { PlayerStoryHome } from "./PlayerStoryHome";
import { TrustFirstHome } from "./TrustFirstHome";
import "./home.css";

type Ready = { variant: HomepageVariant; source: VariantSource };

export function HomeExperiment() {
  const [ready, setReady] = useState<Ready | null>(null);

  useEffect(() => {
    const forced = parseForcedVariant(new URLSearchParams(window.location.search).get("variant"));
    if (forced) document.documentElement.dataset.qa = "1";
    else delete document.documentElement.dataset.qa;
    let cancel = false;
    resolveHomepageVariant(forced).then((result) => {
      if (!cancel) setReady(result);
    });
    return () => {
      cancel = true;
    };
  }, []);

  if (!ready) return <HomeSkeleton />;
  if (ready.variant === "player-story") {
    return <PlayerStoryHome source={ready.source} />;
  }
  return <TrustFirstHome source={ready.source} />;
}
