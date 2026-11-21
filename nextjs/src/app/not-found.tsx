import Link from "next/link";
import "./home.css";
import { Nav } from "@/components/home/Nav";
import { SiteFooter } from "@/components/home/SiteFooter";

export const metadata = { title: "Page not found | Finlete" };

export default function NotFound() {
  return (
    <div className="page">
      <Nav />
      <main id="main">
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <h1 className="h2">That page is not here</h1>
              <p className="lead">
                The link may be old, or the offering may have moved. These will get you back on
                track.
              </p>
            </div>
            <p style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: 0 }}>
              <Link className="btn btn-primary" href="/athletes">
                Browse athletes
              </Link>
              <Link className="btn btn-secondary" href="/">
                Go to the homepage
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
