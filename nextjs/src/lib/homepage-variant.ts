export const HOMEPAGE_FLAG_KEY = "homepage-redesign-test";
export const FLAG_TIMEOUT_MS = 1500;

export const homepageVariants = ["trust-first", "player-story"] as const;
export type HomepageVariant = (typeof homepageVariants)[number];

export function parseForcedVariant(
  value: string | string[] | null | undefined,
): HomepageVariant | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "trust-first" || raw === "player-story") return raw;
  return null;
}

export function variantFromFlag(flag: unknown): HomepageVariant | null {
  if (flag === "trust-first" || flag === "player-story") return flag;
  return null;
}
