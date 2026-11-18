"use client";

import posthog from "posthog-js";
import {
  FLAG_TIMEOUT_MS,
  HOMEPAGE_FLAG_KEY,
  type HomepageVariant,
  variantFromFlag,
} from "@/lib/homepage-variant";

export type CtaLocation =
  | "hero"
  | "hero-secondary"
  | "sticky"
  | "offering-card"
  | "header"
  | "final";

export type VariantSource = "query" | "flag" | "fallback";

type Resolution = {
  variant: HomepageVariant;
  source: VariantSource;
};

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

type Queued = { event: string; properties: Record<string, unknown> };

let ready = false;
let initPromise: Promise<void> | null = null;
let autoResolution: Promise<Resolution> | null = null;
let lastPageviewKey = "";
const queue: Queued[] = [];

export function posthogKeyConfigured(): boolean {
  return Boolean(POSTHOG_KEY);
}

export function isCartLink(href: string): boolean {
  try {
    return new URL(href, "https://finlete.com").hostname === "cart.finlete.com";
  } catch {
    return false;
  }
}

function flush() {
  const pending = queue.splice(0, queue.length);
  for (const item of pending) {
    posthog.capture(item.event, item.properties);
  }
}

export function ensurePosthog(): Promise<void> {
  if (!POSTHOG_KEY) return Promise.resolve();
  if (ready) return Promise.resolve();
  if (!initPromise) {
    initPromise = new Promise((resolve) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: false,
        capture_pageleave: true,
        persistence: "localStorage+cookie",
        loaded: () => {
          ready = true;
          flush();
          resolve();
        },
      });
    });
  }
  return initPromise;
}

export function capture(event: string, properties: Record<string, unknown> = {}) {
  if (!POSTHOG_KEY) return;
  if (!ready) {
    queue.push({ event, properties });
    return;
  }
  posthog.capture(event, properties);
}

function sendPageview(
  variant: HomepageVariant,
  qaOverride: boolean,
  variantFallback: boolean,
) {
  if (!ready) return;
  const key = `${variant}|${qaOverride}|${variantFallback}`;
  posthog.register({
    homepage_variant: variant,
    qa_override: qaOverride,
    variant_fallback: variantFallback,
  });
  if (lastPageviewKey === key) return;
  lastPageviewKey = key;
  posthog.capture("$pageview", {
    homepage_variant: variant,
    variant,
    qa_override: qaOverride,
    variant_fallback: variantFallback,
  });
}

async function resolveForced(variant: HomepageVariant): Promise<Resolution> {
  await ensurePosthog();
  sendPageview(variant, true, false);
  return { variant, source: "query" };
}

function resolveFromFlag(): Promise<Resolution> {
  if (!POSTHOG_KEY) {
    return Promise.resolve({ variant: "trust-first", source: "fallback" });
  }

  return new Promise((resolve) => {
    let settled = false;
    let unsubscribe: (() => void) | undefined;
    const timer = window.setTimeout(
      () => finish("trust-first", "fallback"),
      FLAG_TIMEOUT_MS,
    );

    function finish(variant: HomepageVariant, source: VariantSource) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      unsubscribe?.();
      sendPageview(variant, false, source === "fallback");
      resolve({ variant, source });
    }

    void ensurePosthog().then(() => {
      if (settled) return;
      unsubscribe = posthog.onFeatureFlags((_flags, _variants, context) => {
        if (settled) return;
        if (context?.errorsLoading) {
          finish("trust-first", "fallback");
          return;
        }
        // getFeatureFlag records the exposure PostHog experiments need.
        // Call it only when we will actually render that variant.
        const parsed = variantFromFlag(posthog.getFeatureFlag(HOMEPAGE_FLAG_KEY));
        finish(parsed ?? "trust-first", parsed ? "flag" : "fallback");
      });
    });
  });
}

/**
 * Query param wins for QA and does not call getFeatureFlag, so a preview
 * does not enroll the browser in the experiment. Everyone else waits for
 * the flag, then falls back to trust-first if PostHog is missing, blocked,
 * or silent for 1.5s. A late flag does not swap the page.
 */
export function resolveHomepageVariant(
  forced: HomepageVariant | null,
): Promise<Resolution> {
  if (forced) {
    // Show the QA variant immediately. Analytics can catch up.
    void resolveForced(forced);
    return Promise.resolve({ variant: forced, source: "query" });
  }
  if (!autoResolution) autoResolution = resolveFromFlag();
  return autoResolution;
}
