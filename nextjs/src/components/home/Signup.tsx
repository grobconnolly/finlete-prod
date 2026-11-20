"use client";

import { useId, useState, type FormEvent } from "react";
import { LINKS } from "@/data/home";

type Channel = "sms" | "email";
type Status = "idle" | "sending" | "done" | "unavailable" | "invalid" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePhone(raw: string): string | null {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+") && digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

/**
 * New-athlete alerts. One form, two channels: text by default, email on the
 * switch underneath. The browser posts to /api/subscribe, which forwards to
 * Klaviyo when the keys are set and says so plainly when they are not.
 */
export function Signup() {
  const inputId = useId();
  const [channel, setChannel] = useState<Channel>("sms");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const isSms = channel === "sms";

  function switchChannel() {
    setChannel(isSms ? "email" : "sms");
    setValue("");
    setStatus("idle");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const contact = isSms ? normalizePhone(value) : EMAIL.test(value.trim()) ? value.trim() : null;
    if (!contact) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, contact }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; configured?: boolean };
      if (res.ok && data.ok) setStatus("done");
      else if (data.configured === false) setStatus("unavailable");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section soft signup" id="alerts">
      <div className="wrap">
        <div className="signup-panel">
          <div className="signup-copy">
            <span className="eyebrow on-dark">Stay in touch</span>
            <h2 className="h2">{isSms ? "Get a text when a new athlete opens" : "Get an email when a new athlete opens"}</h2>
            <p className="lead">One message when an offering opens. Nothing else.</p>

            {status === "done" ? (
              <p className="sms-done" role="status">
                You&rsquo;re on the list. We&rsquo;ll {isSms ? "text" : "email"} you when the next athlete opens.
              </p>
            ) : (
              <form className="sms-form" onSubmit={onSubmit} noValidate>
                <label className="sr" htmlFor={inputId}>
                  {isSms ? "Mobile number" : "Email address"}
                </label>
                {isSms ? (
                  <input
                    key="sms"
                    id={inputId}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Mobile number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    aria-invalid={status === "invalid"}
                  />
                ) : (
                  <input
                    key="email"
                    id={inputId}
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    autoCapitalize="none"
                    placeholder="Email address"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    aria-invalid={status === "invalid"}
                  />
                )}
                <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "One moment…" : isSms ? "Text me" : "Email me"}
                </button>
              </form>
            )}

            {status === "invalid" ? (
              <p className="sms-legal sms-warn" role="alert">
                {isSms ? "Enter a mobile number with area code." : "Enter a valid email address."}
              </p>
            ) : status === "unavailable" ? (
              <p className="sms-legal" role="status">
                {isSms ? "Text" : "Email"} alerts are not live yet. Email{" "}
                <a href={LINKS.contact}>info@finlete.com</a> and we will add you to the list.
              </p>
            ) : status === "error" ? (
              <p className="sms-legal sms-warn" role="alert">
                That did not go through. Try again, or email <a href={LINKS.contact}>info@finlete.com</a>.
              </p>
            ) : status === "done" ? null : isSms ? (
              <p className="sms-legal">
                By entering your number you agree to receive marketing texts from Finlete. Message and
                data rates may apply. Reply STOP to opt out.
              </p>
            ) : (
              <p className="sms-legal">
                One email per new offering, plus the occasional update. Unsubscribe any time.
              </p>
            )}

            {status === "done" ? null : (
              <p className="sms-alt">
                <button type="button" className="sms-switch" onClick={switchChannel}>
                  {isSms ? "Or email me instead" : "Or text me instead"}
                </button>
              </p>
            )}
          </div>
          <div className="signup-side">
            <div className="app-box">
              <h3>Get the Finlete app</h3>
              <p>Follow your athletes and invest from your phone.</p>
              <div className="app-btns">
                <a className="app-btn" href={LINKS.appStore}>
                  <small>Download on the</small>App Store
                </a>
                <a className="app-btn" href={LINKS.googlePlay}>
                  <small>Get it on</small>Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
