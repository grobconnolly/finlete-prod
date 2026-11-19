"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { money, type Athlete } from "@/data/athletes";

/**
 * Sticky invest footer. Hidden while the hero's invest panel (#invest) is on
 * screen, then slides up and stays for the rest of the page on every size.
 */
export function InvestBar({ a }: { a: Athlete }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Phones and tablets: always shown, so the invest button is one tap away from the first screen.
    // Wider screens: shown once the hero's invest panel has scrolled off the top.
    const mq = window.matchMedia("(max-width: 960px)");
    const target = document.getElementById("invest");
    let io: IntersectionObserver | null = null;
    const apply = () => {
      io?.disconnect();
      io = null;
      if (mq.matches || !target || !("IntersectionObserver" in window)) {
        setShow(true);
        return;
      }
      io = new IntersectionObserver(
        ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
        { threshold: 0 },
      );
      io.observe(target);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      io?.disconnect();
    };
  }, []);

  const o = a.offering;
  return (
    <div className={`sticky-invest${show ? " show" : ""}`} aria-hidden={!show}>
      <div className="wrap si-inner">
        <div className="si-who">
          <Image
            src={a.photos.head.src}
            width={a.photos.head.width}
            height={a.photos.head.height}
            alt=""
            sizes="48px"
          />
          <div className="si-name">
            <b>
              {a.firstName} {a.lastName}
            </b>
            <span>
              {a.status === "open" ? "Open offering" : "Sold out"} · {a.position}, {a.organization}
            </span>
          </div>
        </div>
        <div className="si-price">
          <b>{money(o.sharePrice, true)}</b>
          <span>
            <em className="si-per">per share · </em>min {money(o.minimumInvestment, true)}
          </span>
        </div>
        <p className="si-risk">You can lose your entire investment.</p>
        <a className="btn btn-primary si-btn" href={o.cartUrl} rel="noopener" tabIndex={show ? 0 : -1}>
          Invest in {a.shortName}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
