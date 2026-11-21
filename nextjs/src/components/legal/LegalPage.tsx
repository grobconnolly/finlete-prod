import Link from "next/link";
import type { ReactNode } from "react";
import "@/app/home.css";
import "./legal.css";
import { Nav } from "@/components/home/Nav";
import { SiteFooter } from "@/components/home/SiteFooter";
import type { LegalDoc } from "@/data/legal";

/** Turns the email address, the site address and "Privacy Policy" into links. */
function linkify(text: string, doc: LegalDoc): ReactNode[] {
  const pattern =
    doc.slug === "terms-of-service"
      ? /(legal@finlete\.com|www\.finlete\.com|Our Privacy Policy)/g
      : /(legal@finlete\.com|www\.finlete\.com)/g;
  return text.split(pattern).map((part, i) => {
    if (part === "legal@finlete.com") {
      return (
        <a key={i} href="mailto:legal@finlete.com">
          {part}
        </a>
      );
    }
    if (part === "www.finlete.com") {
      return (
        <Link key={i} href="/">
          {part}
        </Link>
      );
    }
    if (part === "Our Privacy Policy") {
      return (
        <span key={i}>
          Our <Link href="/legal/privacy-policy">Privacy Policy</Link>
        </span>
      );
    }
    return part;
  });
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="page">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <article className="section legal">
          <div className="wrap">
            <header className="legal-head">
              <span className="eyebrow">Legal</span>
              <h1 className="h2">{doc.title}</h1>
              <p className="legal-date">Effective date: {doc.effective}</p>
            </header>
            <nav className="legal-toc" aria-label="On this page">
              <ol>
                {doc.sections.map((s) => (
                  <li key={s.n}>
                    <a href={`#s${s.n}`}>
                      {s.n}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="legal-body">
              {doc.sections.map((s) => (
                <section key={s.n} id={`s${s.n}`}>
                  <h2>
                    <span>{s.n}.</span> {s.title}
                  </h2>
                  {s.body.map((b, i) =>
                    typeof b === "string" ? (
                      <p key={i}>{linkify(b, doc)}</p>
                    ) : (
                      <ul key={i}>
                        {b.list.map((item) => (
                          <li key={item.text}>
                            {item.lead ? <b>{item.lead} </b> : null}
                            {linkify(item.text, doc)}
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </section>
              ))}
              <p className="legal-other">
                <Link href={doc.other.href}>Read the {doc.other.label}</Link>
              </p>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
