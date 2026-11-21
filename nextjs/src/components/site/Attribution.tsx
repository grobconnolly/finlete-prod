"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Conversion tracking that used to come from Framer, now done by the site.
 *
 * 1. Ad parameters reach the checkout. Framer carried the landing URL's
 *    query string onto every link. Here the campaign and click-id params
 *    are remembered for the browser session and added to checkout links at
 *    the moment they are used, so a visitor who lands on the homepage from
 *    an ad and invests three pages later still arrives at the cart with
 *    their utm_*, fbclid, gclid and the rest. The cart turns those into
 *    DealMaker tags, which is how an investment is attributed to a campaign.
 * 2. `invest_start` is pushed to the dataLayer on every checkout-link
 *    click. Google Tag Manager's InvestStart tags (Meta and the Stape
 *    server container) fire on that event.
 * 3. After an in-site navigation, the page view is reported and
 *    finlete-tracker.js (loaded by GTM) is asked to decorate the new links.
 *
 * Nothing here identifies a person: only campaign values are stored.
 */
const KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "gad_source",
  "ttclid",
  "msclkid",
  "twclid",
  "li_fat_id",
  "ref",
  "referral",
];
/** A new one of these means a new ad click: it replaces what was stored. */
const CLICK_KEYS = ["utm_campaign", "fbclid", "gclid", "gbraid", "wbraid", "ttclid", "msclkid", "twclid"];
const STORE = "finlete_attribution";
const CHECKOUT = /(^|\.)cart\.finlete\.com$|(^|\.)app\.finlete\.com$|dealmaker/i;

type Params = Record<string, string>;
type DL = Record<string, unknown>[] & { push: (...a: unknown[]) => number };

function readStored(): Params {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) || "{}") as Params;
  } catch {
    return {};
  }
}

function capture(): Params {
  const found: Params = {};
  try {
    const q = new URLSearchParams(window.location.search);
    for (const k of KEYS) {
      const v = q.get(k);
      if (v) found[k] = v.slice(0, 300);
    }
  } catch {
    /* ignore */
  }
  const stored = readStored();
  if (!Object.keys(found).length) return stored;
  const fresh = CLICK_KEYS.some((k) => found[k] && found[k] !== stored[k]);
  const next = fresh ? found : { ...stored, ...found };
  try {
    sessionStorage.setItem(STORE, JSON.stringify(next));
  } catch {
    /* private mode: the params still apply to this page */
  }
  return next;
}

function checkoutLink(target: EventTarget | null): HTMLAnchorElement | null {
  const el = target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
  if (!el) return null;
  try {
    return CHECKOUT.test(new URL(el.href).hostname) ? el : null;
  } catch {
    return null;
  }
}

function decorate(a: HTMLAnchorElement) {
  const params = capture();
  try {
    const url = new URL(a.href);
    let changed = false;
    for (const [k, v] of Object.entries(params)) {
      if (!url.searchParams.has(k)) {
        url.searchParams.set(k, v);
        changed = true;
      }
    }
    if (changed) a.href = url.toString();
  } catch {
    /* leave the link as it is */
  }
}

function placement(a: Element): string {
  if (a.closest(".sticky-invest")) return "sticky_bar";
  if (a.closest(".sim-cta")) return "payout_illustration";
  if (a.closest(".ah")) return "offering_hero";
  if (a.closest(".oc")) return "offering_close";
  if (a.closest(".card")) return "home_card";
  if (a.closest(".nav")) return "nav";
  return "other";
}

function dataLayer(): DL {
  const w = window as unknown as { dataLayer?: DL };
  w.dataLayer = w.dataLayer || ([] as unknown as DL);
  return w.dataLayer;
}

export function Attribution() {
  const pathname = usePathname();

  // Remember ad parameters, and prepare/announce checkout clicks.
  useEffect(() => {
    capture();
    const prep = (e: Event) => {
      const a = checkoutLink(e.target);
      if (a) decorate(a);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") prep(e);
    };
    const onClick = (e: MouseEvent) => {
      const a = checkoutLink(e.target);
      if (!a) return;
      decorate(a);
      let host = "";
      let dealId: string | null = null;
      let amount: number | null = null;
      try {
        const url = new URL(a.href);
        host = url.hostname;
        dealId = url.searchParams.get("id");
        const n = Number(url.searchParams.get("amount"));
        amount = Number.isFinite(n) && n > 0 ? n : null;
      } catch {
        /* ignore */
      }
      if (host !== "cart.finlete.com") return;
      dataLayer().push({
        event: "invest_start",
        deal_id: dealId,
        offering_page: window.location.pathname,
        cta_location: placement(a),
        ...(amount ? { value: amount, currency: "USD" } : {}),
      });
    };
    // pointerdown and contextmenu cover "open in new tab" and "copy link".
    document.addEventListener("pointerdown", prep, true);
    document.addEventListener("contextmenu", prep, true);
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("pointerdown", prep, true);
      document.removeEventListener("contextmenu", prep, true);
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  // In-site navigation: nothing reloads, so tell the tags about the new page.
  useEffect(() => {
    const w = window as unknown as {
      __finleteFirstPath?: string;
      FinleteTracker?: { decorate?: () => unknown };
    };
    if (w.__finleteFirstPath === undefined) {
      w.__finleteFirstPath = pathname; // the landing page view is GTM's own
      return;
    }
    capture();
    dataLayer().push({
      event: "virtual_page_view",
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
    try {
      w.FinleteTracker?.decorate?.();
    } catch {
      /* never break the page for tracking */
    }
  }, [pathname]);

  return null;
}
