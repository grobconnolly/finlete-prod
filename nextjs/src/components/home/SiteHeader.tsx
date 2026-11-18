"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { primaryNav, signInUrl } from "@/data/home-content";
import { CloseIcon, MenuIcon } from "./icons";
import { useTrack } from "./variant";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const track = useTrack();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap header-bar">
        <Link className="logo-link" href="/" aria-label="Finlete home">
          <Image
            className="logo-img"
            src="/brand/finlete-logo.png"
            alt="Finlete"
            width={148}
            height={28}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {primaryNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                if (item.href === "#open-offerings") track.cta("header");
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="sign-in" href={signInUrl}>
            Sign in
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="mobile-panel" id="mobile-menu">
          <nav className="wrap" aria-label="Primary mobile">
            {primaryNav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href={signInUrl} onClick={() => setOpen(false)}>
              Sign in
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
