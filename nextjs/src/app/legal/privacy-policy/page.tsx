import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { PRIVACY } from "@/data/legal";

export const metadata: Metadata = {
  alternates: { canonical: "/legal/privacy-policy" },
  title: "Privacy Policy | Finlete",
  description: PRIVACY.description,
};

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />;
}
