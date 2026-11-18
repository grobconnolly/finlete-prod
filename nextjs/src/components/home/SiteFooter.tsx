import Image from "next/image";
import Link from "next/link";
import {
  footerCompany,
  footerLegal,
  footerProduct,
  legalDisclosure,
  socials,
} from "@/data/home-content";
import { FacebookIcon, InstagramIcon, XIcon } from "./icons";

const icons = {
  X: XIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
} as const;

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link className="logo-chip" href="/" aria-label="Finlete home">
              <Image
                className="logo-img"
                src="/brand/finlete-logo.png"
                alt="Finlete"
                width={148}
                height={28}
              />
            </Link>
            <p className="footer-tag">Back the players of tomorrow.</p>
            <div className="socials">
              {socials.map((item) => {
                const Icon = icons[item.label];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={`${item.label} (opens in a new tab)`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
          <FooterColumn label="Company" items={footerCompany} />
          <FooterColumn label="Product" items={footerProduct} />
          <FooterColumn label="Legal" items={footerLegal} />
        </div>
        <div className="legal-block">
          {/* TODO: Form C, offering-terms, and risk-factor URLs. */}
          <p>{legalDisclosure}</p>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Finlete. All rights reserved.</p>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  items,
}: {
  label: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <nav aria-label={label}>
      <p className="footer-label">{label}</p>
      <ul>
        {items.map((item) => {
          const external = item.href.startsWith("http") || item.href.startsWith("mailto:");
          return (
            <li key={item.label}>
              <a
                href={item.href}
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
                {external && item.href.startsWith("http") ? (
                  <span className="sr-only"> (opens in a new tab)</span>
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
