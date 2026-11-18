# Finlete design system

The system behind the production homepage in `redesign/` (`index.html` +
`styles.css`). Pages use the token names below, never raw values.

## The idea

Finlete sits between a brokerage and a ballpark. The most characteristic
objects in that world are the **back of a baseball card** and the **term
sheet**: rows of labels and numbers, ruled lines, one typeface. The site
borrows that structure. Information sits in ruled rows and tables, sections
are separated by rules and white space, and the page earns trust the way a
funded company does: real proof, real numbers, real risk language, no
decoration.

The page is built to do three things in order: make the promise, prove it,
and let the visitor price it for themselves.

1. **Promise.** Invest in top MLB prospects, earn when they make it. The
   mission is stated in the same breath: capital for the player now.
2. **Proof.** A sold-out athlete ranked No. 27 in baseball in the hero,
   $1M+ raised, 1,000+ investments, investors and press, a ledger of nine
   funded athletes, one already in the majors.
3. **Price it.** A simulator that shows the payout for any investment and
   any career outcome, including zero.

## Logo

Use the real lockup only: the angled F mark plus the italic FINLETE
wordmark, as an inline SVG (path data in `redesign/index.html`, extracted
from the live site; also in `nextjs/src/components/FinleteLogo.tsx`).

- On light backgrounds the wordmark and upper F are `--navy` (`#1b2a39`),
  the lower F is `--green-500`.
- On dark backgrounds the wordmark and upper F are `#fafafa`.
- 24px tall in the nav, 28px in the footer. Never redraw it, recolor the
  green, or set the name in a typeface.

## Color

One green. The verified primary from the live site is `#44a647`. It is a
surface color: buttons, tiles, the slider fill. Text on it is black, not
white (white fails contrast at 3.1:1; black passes at 6.4:1). Green text
on white uses `green-700`.

| Token | Value | Role |
| --- | --- | --- |
| `--green-500` | `#44a647` | Primary surface: buttons, rank tile, slider fill, final CTA band. Ink text on it. |
| `--green-600` | `#3a9240` | Hover for primary surfaces. |
| `--green-700` | `#2f7d33` | Green text and links on white (5.1:1). |
| `--green-300` | `#5ad15e` | Green text on dark (10.1:1 on ink). Payout figure. |
| `--green-100` | `#e9f5e9` | Soft wash: the "You get" column, selected scenario row, funded pill. |
| `--navy` | `#1b2a39` | Logo wordmark only. |
| `--ink` | `#0a0a0a` | Text, announcement bar, offerings band, simulator result, footer. |
| `--ink-2` | `#171717` | Card surface inside dark bands. |
| `--text-muted` | `#5c5c5c` | Secondary text on white (6.7:1). |
| `--text-on-dark` | `#f4f4f2` | Body text on ink. |
| `--text-muted-on-dark` | `#a3a3a3` | Secondary text on ink (7.9:1). |
| `--bg` / `--bg-soft` | `#ffffff` / `#f6f6f5` | Page / alternate band (trust, simulator, FAQ). |
| `--rule` / `--rule-on-dark` | `#e5e5e5` / `#2a2a2a` | All rules and borders. |

Loss states in the simulator use `#ff9b93` on ink. No gradients, no glow,
no gradient text.

## Typography

One family: **Archivo**, loaded as a variable font with its width axis.
Display text is set expanded and heavy; everything else is normal width.
Numbers use `font-variant-numeric: tabular-nums` everywhere.

| Token | Size / line height | Width / weight | Use |
| --- | --- | --- | --- |
| `--fs-display` | clamp(36px, min(4.4vw, 7.6vh), 60px) / 1 | wdth 115, 800 | Hero headline, final CTA. Scales with viewport height so the hero always fits one screen. |
| `--fs-h2` | clamp(30px, 3.4vw, 46px) / 1.06 | wdth 112, 700 | Section headlines, milestone figures. |
| `--fs-h3` | 22px / 1.2 | wdth 105, 600 | Card names, sub-headlines. |
| `--fs-stat` | 30px / 1.1 | wdth 108, 700 | Proof numbers, slider values. |
| `--fs-lead` | 19px / 1.5 | 400 | Section intros. |
| `--fs-body` | 17px / 1.55 | 400 | Body. Max 62ch. |
| `--fs-small` | 15px / 1.5 | 400–600 | Row labels, nav, card meta. |
| `--fs-micro` | 13px / 1.45 | 500 | Legal, chips, table headers. |

Sentence case everywhere. No all-caps labels, no letter-spaced eyebrows.

## Spacing, shape, depth

- 8-point scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- Content width `1200px`, gutter `24px` (16px below 600px). Section padding
  `96px` desktop, `64px` mobile.
- Radius: `4px` chips, `8px` buttons and inputs, `16px` cards and panels,
  `999px` pills.
- One shadow, on the hero athlete card only. Everything else is flat and
  separated by rules.

## Components

**Announcement bar.** Ink, one line, a green "New" tag, one link. For a
single live launch only. Shortens to its first sentence on phones.

**Navigation.** Sticky, 64px, translucent white with a rule. Logo, five
anchors, "Sign in" (quiet), "Browse offerings" (primary). Below 960px the
anchors collapse into a menu that also carries "Sign in".

**Buttons.** 48px min height, 8px radius, 17px/600. Primary: green fill,
ink text. Secondary: 1px ink border, fills ink on hover. Quiet: text only.
Full width below 520px. Every button says what happens: "Browse open
offerings", "View Avila's offering".

**Hero.** Two columns at desktop, exactly one viewport tall under the bar
and nav (`100svh`), at every laptop size down to 1024×768. The athlete
card's photo flexes to make that true. On phones it stacks: headline,
intro, both buttons, proof numbers, athlete card, legal line.

**Featured athlete card.** Action photo, a green rank tile (the ranking is
the message, so it is the one big-number moment on the page), a status
chip, name, organization, and a three-stat row.

**Trust band.** "Backed by" investor logos and "Featured in" press logos,
rendered dark at fixed heights (38px / 20px) on `bg-soft`.

**Exchange.** Two columns, "The athlete gets" and "You get", as ruled
lists. The second column carries the green wash.

**Returns simulator.** Two range inputs (investment $300 to $10,000;
career MLB earnings $0 to $1B on a stepped scale so realistic values are
reachable), a five-outcome table that always includes "Never reaches MLB",
and an ink result panel: payout, a plain-language verdict, two comparison
bars, stake, multiple and term. It uses the same model as the simulator on
the offering pages. Loss and zero outcomes are stated as plainly as gains.

**Offering card.** Dark band only. Photo at 4:5 (16:11 on phones), status
badge, name, position and club, one factual highlight, share price and
minimum as ruled rows, one button.

**Ledger.** A real table for funded athletes: athlete, organization,
notable, offering status. Collapses to stacked rows below 760px.

**FAQ.** Native `<details>`, risk questions first.

**Footer.** Ink. Logo, three link columns, then the full regulatory text
verbatim from the offering pages. It is not optional and is never set
lighter than `text-muted-on-dark`.

## Imagery

- Hero: real game photography of the featured athlete.
- Offering cards: the black-and-white Finlete cut-out portraits with the
  green slash (`assets/img/athletes/hero-stage-*.png`).
- No stock photos, no illustrations, no icons beyond the menu toggle, FAQ
  plus sign and social marks.

## Motion

Hover states at 150ms and the simulator bars at 200ms. Nothing animates on
scroll. All motion is disabled under `prefers-reduced-motion`.

## Writing

- Name the mechanism the same way every time: a share of the athlete's
  Major League earnings. Not "equity in a player", not "a loan".
- Payouts are annual, from pre-tax, on-field MLB income, for 25 years.
- Every simulated number is labelled simulated. Every ranking names its
  source.
- Risk is written in the same voice and size as the benefits.
- Facts about athletes come from their live Finlete profile. Do not
  restate a ranking or statistic that is not published there or supplied
  by the team.

## Responsive rules

- No horizontal scroll from 360px up.
- Tap targets are at least 44px tall.
- The primary call to action is above the fold on a 375×667 phone.
- Multi-column sections stack at 900px; cards go 4, 2, 1.
