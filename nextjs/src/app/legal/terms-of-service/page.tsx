import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { TERMS } from "@/data/legal";

export const metadata: Metadata = {
  alternates: { canonical: "/legal/terms-of-service" },
  title: "Terms of Service | Finlete",
  description: TERMS.description,
};

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
