"use client";

import { useId, useState, type FormEvent } from "react";
import { LINKS } from "@/data/home";

/**
 * Text-alert sign-up. There is no SMS provider connected yet, so the form
 * does not send the number anywhere. It tells the visitor that plainly and
 * offers email instead. Wire `onSubmit` to the provider when one exists.
 */
export function Signup() {
  const phoneId = useId();
  const [status, setStatus] = useState<"idle" | "pending">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");
  }

  return (
    <section className="section soft signup" id="alerts">
      <div className="wrap">
        <div className="signup-panel">
          <div className="signup-copy">
            <span className="eyebrow on-dark">Stay in touch</span>
            <h2 className="h2">Get a text when a new athlete opens</h2>
            <p className="lead">One message when an offering opens. Nothing else.</p>
            <form className="sms-form" onSubmit={onSubmit} noValidate>
              <label className="sr" htmlFor={phoneId}>
                Mobile number
              </label>
              <input
                id={phoneId}
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                placeholder="Mobile number"
              />
              <button className="btn btn-primary" type="submit">
                Text me
              </button>
            </form>
            {status === "pending" ? (
              <p className="sms-legal" role="status">
                Text alerts are not live yet. Email{" "}
                <a href={LINKS.contact}>info@finlete.com</a> and we will add you to the list.
              </p>
            ) : (
              <p className="sms-legal">
                By entering your number you agree to receive marketing texts from Finlete.
                Message and data rates may apply. Reply STOP to opt out.
              </p>
            )}
            <p className="sms-alt">
              <a href={LINKS.contact}>Or email me instead</a>
            </p>
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
