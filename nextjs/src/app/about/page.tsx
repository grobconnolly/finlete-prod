import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "../home.css";
import "./about.css";
import { Nav } from "@/components/home/Nav";
import { ProofBand } from "@/components/home/ProofBand";
import { SiteFooter } from "@/components/home/SiteFooter";
import { LINKS } from "@/data/home";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About | Finlete",
  description:
    "Finlete helps athletes go further while letting fans be part of the journey. Meet the team and the mission.",
};

/** Copy is the About page from finlete.com, carried over as written. */
const TEAM = [
  { name: "Rob Connolly", role: "Co-Founder & CEO", photo: "/img/about/rob-connolly.webp" },
  { name: "Max Eisenberg", role: "Co-Founder & COO", photo: "/img/about/max-eisenberg.webp" },
  { name: "Michael Bryan", role: "Advisor & Ex-BLA", photo: "/img/about/michael-bryan.webp" },
  { name: "Paul Anderson", role: "Advisor & Barstool Sports", photo: "/img/about/paul-anderson.webp" },
];

export default function AboutPage() {
  return (
    <div className="page">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <section className="hero on-dark ab-hero">
          <div className="wrap">
            <span className="hero-label">About Finlete</span>
            <h1 className="display">Welcome to the future of sports</h1>
            <p className="lead">
              Finlete is a new way to invest in the game. We help athletes go further while letting
              fans be part of the journey.
            </p>
          </div>
        </section>

        <section className="section ab-letter">
          <div className="wrap">
            <div className="ab-letter-body">
              <h2 className="h2">Welcome to Finlete!</h2>
              <p>
                We understand the hard work, dedication, and passion that&rsquo;s required for
                athletes to reach their full potential. We help them stay focused on their journey
                by providing them with access to the funding they need, without incurring debt.
              </p>
              <p>
                Most aspiring pro athletes earn modest salaries and have no long-term financial
                guarantees. Upfront cash can mean better training, nutrition, support for family,
                and peace of mind.
              </p>
              <p>
                For fans, it&rsquo;s a chance to join an investment opportunity that used to be
                reserved for private hedge funds, and to build deeper connections with the sports
                and athletes they love.
              </p>
              <p>
                Finlete is a sports investment platform designed for everyone &ndash; empowering
                athletes, giving fans a seat at the table, and building the future of the game
                together.
              </p>
              <p className="ab-sign">
                <b>Be more than a fan. Become an investor.</b>
                <span>&ndash; Team Finlete</span>
              </p>
            </div>
            <aside className="ab-mission">
              <span className="eyebrow">Our mission</span>
              <h2>Level the playing field</h2>
              <p>
                We believe world-class talent shouldn&rsquo;t be held back by money. Finlete gives
                emerging athletes the funding they need to train, compete, and grow. At the same
                time, everyday investors get the chance to share in their success.
              </p>
            </aside>
          </div>
        </section>

        <section className="section soft ab-team slash-top">
          <div className="wrap">
            <div className="ab-team-head">
              <div className="section-head">
                <span className="eyebrow">Meet our team</span>
                <h2 className="h2">Built by sports lovers, tech leaders, and startup operators.</h2>
                <p className="lead">
                  Finlete was founded by lifelong baseball fans and entrepreneurs with experience in
                  finance, sports, and technology. Rob and Max met through the San Diego startup
                  community and teamed up to build something new &ndash; a way to let fans invest
                  in an exclusive sports asset class.
                </p>
              </div>
              <div className="ab-founders">
                <Image
                  src="/img/about/founders.webp"
                  width={1400}
                  height={950}
                  alt="Max Eisenberg and Rob Connolly in Finlete shirts"
                  sizes="(max-width: 960px) 100vw, 520px"
                />
              </div>
            </div>
            <h3 className="ab-sub">Our starting lineup</h3>
            <ul className="ab-lineup" role="list">
              {TEAM.map((m) => (
                <li key={m.name}>
                  <div className="ab-photo">
                    <Image src={m.photo} width={480} height={480} alt="" sizes="(max-width: 600px) 45vw, 260px" />
                  </div>
                  <b>{m.name}</b>
                  <span>{m.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ProofBand />

        <section className="cta">
          <div className="wrap">
            <h2 className="display">Invest in athletes&rsquo; careers.</h2>
            <div className="actions">
              <Link className="btn btn-primary" href="/athletes">
                View our athletes
              </Link>
              <a href={LINKS.contact}>Or ask us a question</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
