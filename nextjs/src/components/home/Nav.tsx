import { FinleteLogo } from "@/components/FinleteLogo";
import { LINKS } from "@/data/home";

export function Nav() {
  return (
    <header className="nav on-dark" id="nav">
      <div className="wrap">
        <a className="brand" href={LINKS.home} aria-label="Finlete home">
          <FinleteLogo height={24} />
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#athletes">Athletes</a>
          <a href="#how-it-works">How it works</a>
          <a href={LINKS.signIn}>Sign in</a>
        </nav>
        <div className="nav-actions">
          <a className="nav-signin-m" href={LINKS.signIn}>
            Sign in
          </a>
          <a className="btn btn-primary" href="#athletes">
            Browse athletes
          </a>
        </div>
      </div>
    </header>
  );
}
