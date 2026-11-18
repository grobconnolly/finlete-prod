# Homepage A/B test

The Next.js app is the site Vercel deploys (`nextjs/` is the project root, `vercel.json` sets `framework: nextjs`). `/` is that app's homepage. This experiment replaces the captured Framer mirror at `/`. The mirror file is still available at `/index.html`. The older React slice at `/app` is unchanged.

The root Bootstrap site is a separate static clone. It is not what this Vercel project serves, and its athlete pages repeat Luinder Avila's numbers. Do not add offering figures there.

## Preview

```text
http://localhost:3000/?variant=trust-first
http://localhost:3000/?variant=player-story
```

`trust-first` is Variant A (Trust-First Scoreboard). `player-story` is Variant B (Player Story). The query param wins over PostHog and does not enroll the browser in the experiment (`qa_override: true` on events). Filter those events out of the results.

Without the query param, the page shows a neutral skeleton until the flag resolves, then falls back to `trust-first` if PostHog has no key, errors, or does not answer within 1.5 seconds. A late flag does not swap the page.

## Set the PostHog key

1. In PostHog: Project settings → Project API key.
2. In `nextjs/`, copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_POSTHOG_KEY` to the `phc_...` key.
4. Set `NEXT_PUBLIC_POSTHOG_HOST` to `https://us.i.posthog.com` or `https://eu.i.posthog.com`.
5. Restart `npm run dev`. On Vercel, add the same variables to the project and redeploy.

The key is a project write key, not a personal secret, but it still does not belong in source.

## Create the experiment

In PostHog → Experiments → New experiment:

| Setting | Value |
| --- | --- |
| Feature flag key | `homepage-redesign-test` |
| Control | `trust-first` (50%) |
| Test | `player-story` (50%) |
| Primary metric | Trend of `home_cta_clicked`, unique users |
| Secondary metric | Trend of `checkout_clicked`, unique users |

`home_cta_clicked` properties: `variant`, `cta_location` (`hero`, `hero-secondary`, `sticky`, `offering-card`, `header`, `final`).

`checkout_clicked` fires only for a click whose URL host is `cart.finlete.com`. Properties: `variant`, `href`, `athlete`, `cta_location`.

Also captured: `$pageview` (with `homepage_variant`, `qa_override`, `variant_fallback`) and `offering_card_clicked` (`athlete`, `athlete_name`).

Exposure comes from `getFeatureFlag('homepage-redesign-test')` when the flag returns in time. Visitors who hit the 1.5s fallback are marked `variant_fallback: true` and are not enrolled. Exclude `qa_override` and `variant_fallback` from the experiment read.

## What changed for clarity

The comps are the source, with the busy parts folded so a first visit has one idea per section:

- The hero says what Finlete is in one plain sentence, then one filled button.
- Variant B's photo is shorter on a phone so that sentence and the button sit in the first screen. Desktop uses the same two-column arrangement as Variant A.
- Calculator, perks, and press are closed disclosures ("More to know").
- Offering cards stack. There is no carousel.
- Progress bars render only when we know the percent of maximum (Avila, 39.9%). The other raised amounts are shown without an invented bar.

## Placeholders Rob needs to fill

Offering numbers live only in `src/data/offerings.ts`. Copy and placeholders live in `src/data/home-content.ts`.

- PostHog project key (above).
- Tim Draper quote. The page shows `[Tim Draper quote — pending approval]`.
- DealMaker legal entity and any FINRA/SIPC wording. The footer keeps the bracket from the design.
- Form C, offering-terms, and risk-factor URLs. They are labeled "link pending" and are not links.
- Finlete's fee, in the FAQ item marked `[Finlete fee structure — confirm exact terms.]`
- Cart ids. Avila uses `https://cart.finlete.com/?id=3994` from `learn-a` / `learn-b`. Padilla, Mejia, and Pitcher Bundle 1 point at `https://cart.finlete.com` with no id.
- Percent of maximum for every open offering except Avila, if a progress bar should appear.
- The ninth funded athlete. The snapshot says 9 funded offerings and names 8.
- Press logos. Names are shown as `[Press logo — …]` until the lockups are approved.
- Hypothetical examples inside "See a hypothetical example". They are the design-comp illustrations, labeled as not a projection. Confirm the math before launch.
