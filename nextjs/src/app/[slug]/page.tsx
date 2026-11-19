import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../home.css";
import "../athlete.css";
import { ATHLETES, getAthlete } from "@/data/athletes";
import { Nav } from "@/components/home/Nav";
import { SiteFooter } from "@/components/home/SiteFooter";
import { AthleteHero } from "@/components/athlete/AthleteHero";
import { InvestBar } from "@/components/athlete/InvestBar";
import { Terms } from "@/components/athlete/Terms";
import { HowItWorks } from "@/components/athlete/HowItWorks";
import { PayoutIllustration } from "@/components/athlete/PayoutIllustration";
import { Bio } from "@/components/athlete/Bio";
import { Statement } from "@/components/athlete/Statement";
import { Videos } from "@/components/athlete/Videos";
import { Spotlight } from "@/components/athlete/Spotlight";
import { Perks } from "@/components/athlete/Perks";
import { OfferingFaq } from "@/components/athlete/OfferingFaq";
import { OfferingClose } from "@/components/athlete/OfferingClose";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return ATHLETES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getAthlete(slug);
  if (!a) return {};
  return {
    title: `${a.firstName} ${a.lastName} | Finlete`,
    description: `Invest in ${a.firstName} ${a.lastName}, ${a.position.toLowerCase()} in the ${a.organization} organization. Shares in a % of his future MLB pay under Regulation Crowdfunding. Investing is speculative and you can lose your entire investment.`,
  };
}

export default async function AthletePage({ params }: Props) {
  const { slug } = await params;
  const a = getAthlete(slug);
  if (!a) notFound();

  return (
    <div className="page has-invest-bar">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <AthleteHero a={a} />
        <Terms a={a} />
        <HowItWorks a={a} />
        <PayoutIllustration a={a} />
        <Bio a={a} />
        <Statement a={a} />
        <Videos ids={a.videos} name={a.firstName} />
        <Spotlight a={a} />
        <Perks />
        <OfferingFaq a={a} />
        <OfferingClose a={a} />
      </main>
      <SiteFooter perks />
      <InvestBar a={a} />
    </div>
  );
}
