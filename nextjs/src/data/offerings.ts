/**
 * Single source for offering figures.
 *
 * Every card and both homepage variants read this file. Do not copy one
 * athlete's raised amount, percent, or share price onto another profile —
 * the static site did that with Luinder Avila's numbers. If a figure is not
 * in the Nov 2026 snapshot or the homepage designs, leave it null.
 *
 * Cart ids: only Avila's (?id=3994) appears in this repo (learn-a / learn-b).
 * The others link to the cart host with no id until that id is confirmed.
 */

export const CART_HOST = "https://cart.finlete.com";

export type Offering = {
  slug: string;
  name: string;
  /** Given name for "Invest in {firstName}'s career". Empty for a bundle. */
  firstName: string;
  kind: "player" | "bundle";
  team: string;
  teamShort: string;
  position: string;
  /** Full position for the photo chip, e.g. "Pitcher (P)". Empty when unknown. */
  positionLabel: string;
  rankLabel: string;
  rankShort: string;
  keyStat: string;
  /** Set only when the snapshot states a share price. */
  sharePrice?: string;
  raisedDisplay: string;
  /** Set only when the snapshot states a percent of the maximum. */
  percentOfMax: number | null;
  status: "open";
  photo: string | null;
  /** object-position so each face sits in the same frame. */
  photoFocus: string;
  checkoutUrl: string;
  checkoutIdConfirmed: boolean;
  /** Always "invest in [name]'s career" (or "these careers" for the bundle). */
  cta: string;
};

export const offerings: Offering[] = [
  {
    slug: "avila",
    name: "Luinder Avila",
    firstName: "Luinder",
    kind: "player",
    team: "Kansas City Royals",
    teamShort: "Royals",
    position: "P",
    positionLabel: "Pitcher (P)",
    rankLabel: "#9 Royals prospect",
    rankShort: "#9 prospect",
    keyStat: "MLB debut 2025",
    sharePrice: "$1.46/share",
    raisedDisplay: "$43,695",
    percentOfMax: 39.9,
    status: "open",
    photo: "/brand/athletes/avila.png",
    photoFocus: "center 18%",
    checkoutUrl: `${CART_HOST}/?id=3994`,
    checkoutIdConfirmed: true,
    cta: "Invest in Luinder's career",
  },
  {
    slug: "padilla",
    name: "Yairo Padilla",
    firstName: "Yairo",
    kind: "player",
    team: "St. Louis Cardinals",
    teamShort: "Cardinals",
    position: "SS",
    positionLabel: "Shortstop (SS)",
    rankLabel: "#16 Cardinals prospect",
    rankShort: "#16 prospect",
    keyStat: ".396 OBP (2025)",
    raisedDisplay: "$15,508",
    percentOfMax: null,
    status: "open",
    photo: "/brand/athletes/padilla.png",
    photoFocus: "center 40%",
    checkoutUrl: CART_HOST,
    checkoutIdConfirmed: false,
    cta: "Invest in Yairo's career",
  },
  {
    slug: "mejia",
    name: "Esteban Mejia",
    firstName: "Esteban",
    kind: "player",
    team: "Baltimore Orioles",
    teamShort: "Orioles",
    position: "P",
    positionLabel: "Pitcher (P)",
    rankLabel: "#6 Orioles prospect",
    rankShort: "#6 prospect",
    keyStat: "102 MPH at 18",
    raisedDisplay: "$18,761",
    percentOfMax: null,
    status: "open",
    photo: "/brand/athletes/mejia.png",
    photoFocus: "center 32%",
    checkoutUrl: CART_HOST,
    checkoutIdConfirmed: false,
    cta: "Invest in Esteban's career",
  },
  {
    slug: "pitcher-bundle-1",
    name: "Pitcher Bundle 1",
    firstName: "",
    kind: "bundle",
    team: "Six pitchers",
    teamShort: "Six pitchers",
    position: "",
    positionLabel: "",
    rankLabel: "",
    rankShort: "",
    keyStat: "Six pitchers in one investment",
    raisedDisplay: "$27,486",
    percentOfMax: null,
    status: "open",
    photo: null,
    photoFocus: "center",
    checkoutUrl: CART_HOST,
    checkoutIdConfirmed: false,
    cta: "Invest in these careers",
  },
];

export const openOfferings = offerings;

export function getOffering(slug: string): Offering {
  const found = offerings.find((offering) => offering.slug === slug);
  if (!found) {
    throw new Error(`Unknown offering: ${slug}`);
  }
  return found;
}

export function cardSubtitle(offering: Offering, featured = false): string {
  if (offering.kind === "bundle") return "Six pitchers · one investment";
  if (featured) {
    return `${offering.team} · ${offering.position} · ${offering.rankLabel}`;
  }
  return `${offering.teamShort} · ${offering.position} · ${offering.rankShort}`;
}

/**
 * Closed offerings named in the Nov 2026 snapshot. No dollar amounts live
 * here on purpose — eight names were listed, and the snapshot's count is 9.
 */
export type FundedAthlete = {
  slug: string;
  name: string;
  team: string;
};

export const fundedAthletes: FundedAthlete[] = [
  { slug: "lagrange", name: "Carlos Lagrange", team: "New York Yankees" },
  { slug: "bernal", name: "Leonardo Bernal", team: "St. Louis Cardinals" },
  { slug: "escobar", name: "Aroon Escobar", team: "Philadelphia Phillies" },
  { slug: "santos", name: "Winston Santos", team: "Texas Rangers" },
  { slug: "teodo", name: "Emiliano Teodo", team: "Texas Rangers" },
  { slug: "ornelas", name: "Tirso Ornelas", team: "San Diego Padres" },
  { slug: "garcia", name: "Jhostynxon Garcia", team: "Pittsburgh Pirates" },
  { slug: "vargas", name: "Echedry Vargas", team: "Miami Marlins" },
];

/** The snapshot says 9 funded offerings. Only 8 names were listed. */
export const fundedOfferingCount = 9;
