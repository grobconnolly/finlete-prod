"use client";

import { useEffect, useRef, useState } from "react";
import type { Athlete } from "@/data/athletes";

/**
 * The Finlete site on Disqus (finlete-1.disqus.com), the one the owner's
 * Disqus login administers. An older site, "finlete", holds a 2024 thread
 * from the Vargas offering and is not used.
 */
const SHORTNAME = "finlete-1";
/** Threads are keyed by the page's public address, whatever host served it. */
const SITE = "https://finlete.com";

type DisqusConfig = { page: { url: string; identifier?: string; title: string } };
type DisqusWindow = Window & {
  DISQUS?: { reset: (o: { reload: boolean; config: (this: DisqusConfig) => void }) => void };
  disqus_config?: (this: DisqusConfig) => void;
};

/**
 * The public discussion for one offering, on Disqus. Each offering page has
 * its own thread.
 *
 * Disqus loads only when the section is about to scroll into view, so its
 * script and cookies cost nothing for someone who never reaches it. Moving
 * between offering pages re-points the one loaded embed at the new thread.
 */
export function Discussion({ a }: { a: Athlete }) {
  const ref = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);

  const url = `${SITE}/${a.slug}`;
  const title = a.bundle ? "Pitcher Bundle | Finlete" : `${a.firstName} ${a.lastName} | Finlete`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      // Nothing to wait on in a browser this old: load straight away.
      const id = requestAnimationFrame(() => setNear(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    const w = window as DisqusWindow;
    const config = function (this: DisqusConfig) {
      this.page.url = url;
      this.page.title = title;
    };
    if (w.DISQUS) {
      w.DISQUS.reset({ reload: true, config });
      return;
    }
    w.disqus_config = config;
    if (document.getElementById("disqus-embed")) return;
    const s = document.createElement("script");
    s.id = "disqus-embed";
    s.src = `https://${SHORTNAME}.disqus.com/embed.js`;
    s.async = true;
    s.setAttribute("data-timestamp", String(Date.now()));
    s.onerror = () => setFailed(true);
    document.body.appendChild(s);
  }, [near, url, title]);

  return (
    <section className="section soft discuss" id="discussion" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">Discussion</h2>
          <p className="lead">
            Ask a question or comment on this offering. Comments are public, and replies from the
            Finlete team are labeled.
          </p>
        </div>
        <div className="discuss-box">
          <div id="disqus_thread" />
          {failed ? (
            <p className="note" role="status">
              The discussion did not load. Check that your browser is not blocking disqus.com, or
              email <a href="mailto:info@finlete.com">info@finlete.com</a> with your question.
            </p>
          ) : null}
          <noscript>
            <p className="note">
              Turn on JavaScript to read and post comments, or email{" "}
              <a href="mailto:info@finlete.com">info@finlete.com</a>.
            </p>
          </noscript>
        </div>
        <p className="note micro">
          Comments are hosted by Disqus and are opinions of the people who post them, not statements
          by Finlete Funding, Inc. Nothing here is investment advice. The Form C has the terms of
          the offering.
        </p>
      </div>
    </section>
  );
}
