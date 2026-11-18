/**
 * Copy and platform totals for both homepage variants.
 * Figures are the Nov 2026 snapshot and the attached designs — nothing else.
 */

export const riskLine =
  "Prospects may never reach the MLB. You could lose your entire investment.";

export const statsAsOf = "Platform totals since Feb 2024, as of Nov 2026.";

export const platformStats = [
  { id: "raised", value: "$1.0M", label: "Raised for athletes" },
  { id: "investments", value: "1,187", label: "Fan investments" },
  { id: "average", value: "$1,352", label: "Average investment" },
  { id: "repeat", value: "27.0%", label: "Repeat investment rate" },
  { id: "athletes", value: "12", label: "Athletes" },
  { id: "minimum", value: "$300", label: "Minimum investment" },
] as const;

export type StatId = (typeof platformStats)[number]["id"];

export function statsById(ids: readonly StatId[]) {
  return ids.map((id) => {
    const stat = platformStats.find((item) => item.id === id);
    if (!stat) throw new Error(`Unknown stat: ${id}`);
    return stat;
  });
}

export const steps = [
  {
    title: "Pick a player you believe in",
    body: "Look through the open offerings and choose whose career you want to back.",
  },
  {
    title: "Invest from $300",
    body: "Checkout takes about 3 minutes on DealMaker, an SEC-registered broker-dealer.",
  },
  {
    title: "Follow his career",
    body: "If he makes the majors, you earn a fixed share of his MLB pay.",
  },
] as const;

export const moneyFlow = [
  "You invest",
  "A Reg CF offering holds it",
  "The player gets money now",
  "If he makes the majors, you share in his pay",
] as const;

export const perks = [
  { label: "Digital stock certificate", amount: "$300" },
  { label: "Signed memorabilia", amount: "$2,500" },
  { label: "VIP experience", amount: "$5,000" },
  { label: "1:1 virtual meet & greet", amount: "$10,000" },
] as const;

export const testimonials = [
  {
    quote:
      "As a baseball fan, investing in a player's future was something I couldn't resist.",
    name: "Matt F.",
    detail: "",
  },
  {
    quote:
      "You feel proud when the athlete succeeds because you've been with them from the beginning.",
    name: "Derek L.",
    detail: "",
  },
  {
    quote: "Royals fan, and I feel like he has a real chance to succeed.",
    name: "Stephen P.",
    detail: "Invested in Luinder Avila's career",
  },
] as const;

export const faqs = [
  {
    q: "What am I actually buying?",
    a: "You buy shares in a Regulation Crowdfunding offering. Those shares pay a fixed percentage of the player's future MLB earnings. You invest in his career, not in the player himself.",
  },
  {
    q: "What if he never reaches the majors?",
    a: "There may be no earnings to share, and you could lose your entire investment. These offerings are speculative, and you may not be able to sell your shares.",
  },
  {
    q: "How do I invest?",
    a: "The minimum is $300. Checkout happens on DealMaker, an SEC-registered broker-dealer. Offerings are made by Finlete Funding, Inc. under Regulation Crowdfunding.",
  },
  {
    q: "What does Finlete earn?",
    a: "[Finlete fee structure — confirm exact terms.] Fees and use of proceeds are in each offering's Form C.",
  },
] as const;

/** Static illustrations from the design comps. Not a calculator and not a projection. */
export const hypotheticalInvestment = {
  careerEarnings: "$100M",
  investment: "$2,500",
  illustratedValue: "≈ $15,408",
  downside: "What if he never makes it? You could lose all of it.",
  disclaimer:
    "Hypothetical illustration only — not a projection or guarantee.",
};

export const hypotheticalEarnings = {
  athleteEarns: "$100M",
  distributed: "$1M",
  youEarn: "$3,600",
  disclaimer:
    "Hypothetical illustration only — not a projection or guarantee.",
};

/** Names only. Logo files exist in the repo; this page does not use them until approved. */
export const pressPlaceholders = [
  "Yahoo Finance",
  "LA Times",
  "Sportico",
  "Sports Business Journal",
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

export const draperQuotePlaceholder = "[Tim Draper quote — pending approval]";

export const legalDisclosure =
  "Offerings are made under Regulation Crowdfunding by Finlete Funding, Inc. Investments are processed through DealMaker, an SEC-registered broker-dealer [confirm exact entity + FINRA/SIPC wording]. Investing in Reg CF offerings is speculative and illiquid; you could lose your entire investment. Read each offering's Form C before investing.";

export const pendingLegalLinks = [
  "Form C filings",
  "Offering terms",
  "Risk factors",
] as const;

export const signInUrl = "https://app.finlete.com";

export const primaryNav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Open offerings", href: "#open-offerings" },
  { label: "Funded athletes", href: "#funded" },
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
