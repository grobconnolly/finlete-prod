/**
 * Homepage copy. Figures are the Nov 2026 snapshot only.
 * Do not describe DealMaker as an SEC-registered broker-dealer here.
 * The repo does not confirm that wording. Say Reg CF and a FINRA-registered
 * funding portal, and leave the legal name as a placeholder.
 */

export const riskLine =
  "Prospects may never reach the MLB. You could lose your entire investment.";

export const earningsLine =
  "Any share of future earnings follows the offering terms. It is not guaranteed.";

/** Shown as-is. Do not append a portal legal name until it is confirmed. */
export const regulatoryLine = "Reg CF offerings through a FINRA-registered funding portal.";

// TODO: confirm the funding portal's legal name before adding it anywhere on the page.
// TODO: Tim Draper quote — pending approval. Do not render a quote block until the words are approved.

export const statsAsOf = "Since Feb 2024, as of Nov 2026.";

export const trustStats = [
  { id: "raised", value: "$1.0M", label: "Raised for athletes" },
  { id: "investments", value: "1,187", label: "Fan investments" },
] as const;

export const steps = [
  {
    n: "01",
    title: "Choose a career",
    body: "Pick a player you believe in.",
  },
  {
    n: "02",
    title: "Invest from $300",
    body: "Checkout is on the funding portal.",
  },
  {
    n: "03",
    title: "Follow the career",
    body: "Payouts, if any, follow the offering.",
  },
] as const;

export const moneyFlow = [
  { n: "01", title: "You invest", body: "From $300." },
  { n: "02", title: "The offering holds it", body: "A Reg CF security, not a gift to the player." },
  { n: "03", title: "The player receives funds", body: "Upfront, while he is still in the minors." },
  { n: "04", title: "Earnings, if any", body: "A defined portion, only if the offering says so." },
] as const;

export const testimonial = {
  quote: "Royals fan, and I feel like he has a real chance to succeed.",
  name: "Stephen P.",
  detail: "Invested in Luinder Avila's career",
};

export const faqs = [
  {
    q: "What am I buying?",
    a: "Shares in a Reg CF offering tied to a player's future MLB earnings. You invest in the career, not the person.",
  },
  {
    q: "What if he never reaches the majors?",
    a: "You could lose your entire investment. The securities are speculative and difficult to sell.",
  },
  {
    q: "Who handles the money?",
    a: "A FINRA-registered funding portal. The minimum is $300.",
  },
] as const;

export const investors = [
  {
    name: "Draper Startup House",
    src: "/brand/draper-startup-house.png",
    width: 1024,
    height: 340,
  },
  {
    name: "North Texas Angel Network",
    src: "/brand/ntan.png",
    width: 1032,
    height: 288,
  },
] as const;

export const legalDisclosure =
  "Offerings are made under Regulation Crowdfunding by Finlete Funding, Inc. Investments are processed through a FINRA-registered funding portal. Investing is speculative and illiquid. You could lose your entire investment. Read each offering's Form C before investing.";

// TODO: add Form C, offering-terms, and risk-factor URLs when the real links exist. Do not render bracketed placeholders.

export const signInUrl = "https://app.finlete.com";

export const primaryNav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Open offerings", href: "#open-offerings" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "#faq" },
] as const;

export const footerCompany = [
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "mailto:info@finlete.com" },
] as const;

export const footerProduct = [
  { label: "Athletes", href: "/athletes" },
  { label: "How it works", href: "#how-it-works" },
] as const;

export const footerLegal = [
  { label: "Terms", href: "/legal/terms-of-service" },
  { label: "Privacy", href: "/legal/privacy-policy" },
] as const;

export const socials = [
  { label: "X", href: "https://x.com/finlete" },
  { label: "Facebook", href: "https://www.facebook.com/FinletePro/" },
  { label: "Instagram", href: "https://www.instagram.com/finlete/" },
] as const;

/**
 * Headline options considered for this pass. The shipped lines are marked.
 * 1. You believe in him early. Invest in the career. — trust-first
 * 2. He reached the Royals. Invest in the career from here. — player-story
 * 3. Invest in the career before the highlight reel. — not shipped
 */
export const headlines = {
  trustFirst: "You believe in him early. Invest in the career.",
  playerStory: "He reached the Royals. Invest in the career from here.",
  alternate: "Invest in the career before the highlight reel.",
} as const;
