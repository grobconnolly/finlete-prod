"use client";

import { createContext, useContext, type ReactNode } from "react";
import { capture, isCartLink, type CtaLocation, type VariantSource } from "@/lib/analytics";
import type { HomepageVariant } from "@/lib/homepage-variant";

const VariantContext = createContext<HomepageVariant>("trust-first");

export function VariantProvider({
  variant,
  children,
}: {
  variant: HomepageVariant;
  children: ReactNode;
}) {
  return <VariantContext.Provider value={variant}>{children}</VariantContext.Provider>;
}

export function useVariant() {
  return useContext(VariantContext);
}

export function useTrack() {
  const variant = useVariant();

  return {
    cta(location: CtaLocation) {
      capture("home_cta_clicked", { variant, cta_location: location });
    },
    offering(athlete: string, athleteName: string) {
      capture("offering_card_clicked", {
        variant,
        athlete,
        athlete_name: athleteName,
      });
    },
    checkout(href: string, athlete: string, location: CtaLocation) {
      if (!isCartLink(href)) return;
      capture("checkout_clicked", {
        variant,
        href,
        athlete,
        cta_location: location,
      });
    },
  };
}

export function HomeFrame({
  variant,
  source,
  children,
}: {
  variant: HomepageVariant;
  source: VariantSource;
  children: ReactNode;
}) {
  return (
    <VariantProvider variant={variant}>
      <div
        className={`home home-${variant}`}
        data-ready="true"
        data-variant={variant}
        data-variant-source={source}
      >
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </div>
    </VariantProvider>
  );
}
