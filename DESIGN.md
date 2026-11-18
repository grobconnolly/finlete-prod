# Finlete design system

The system behind the production homepage in `redesign/`. Pages use the
token names below, never raw values.

## Files

- `redesign/index.html`, `redesign/styles.css`: the page. The folder is
  self-contained (`img/`, `fonts/`) and uses document-relative paths, so it
  works from disk and from any folder URL.
- `scripts/sync-redesign.py`: copies it to `nextjs/public/redesign` with
  absolute `/redesign/` paths, because Next.js serves the page at
  `/redesign` with no trailing slash. Run it after every change.

## The idea

Finlete sits between a brokerage and a ballpark. The most characteristic
objects in that world are the **back of a baseball card** and the **term
sheet**: rows of labels and numbers, ruled lines, one typeface. The site
borrows that structure. Information sits in ruled rows and tables, sections
are separated by rules and white space, and the page earns trust the way a
funded company does: real proof, real numbers, real risk language, no
decoration.

The page does three things in order: make the promise, prove it, and let
the visitor price it for themselves.

1. **Promise.** "Invest in top MLB prospects. Earn as they do." The
   mission follows in the next line: capital so players can reach their
   potential.
2. **Proof.** A sold-out athlete ranked No. 27 in baseball in the hero,
   $1M+ raised, 1,000+ investments, investors and press, a ledger of nine
   funded athletes, one already in the majors, and the athletes' own words.
3. **Price it.** A simulator that shows the payout for any investment and
   any career outcome, including zero.

## Logo

Use the real lockup only: the angled F mark plus the italic FINLETE
wordmark, as inline SVG (path data in `redesign/index.html`, extracted
from the live site; also in `nextjs/src/components/FinleteLogo.tsx`).

- On light backgrounds the wordmark and upper F are `--navy`, the lower F
  is `--green-500`. On dark backgrounds they are `#fafafa`.
- 24px tall in the nav, 28px in the footer. Never redraw it, recolor the
  green, or set the name in a typeface.

## Color

One green. The verified primary from the live site is `#44a647`. It is a
surface color: buttons, tiles, the slider fill. Text on it is black, not
white (white fails contrast at 3.1:1; black passes at 6.4:1). Green text
on white uses `green-700`.

| Token | Value | Role |
| --- | --- | --- |
| `--green-500` | `#44a647` | Primary surface: buttons, rank tile, slider fill, final band. Ink text on it. |
| `--green-600` | `#3a9240` | Hover for primary surfaces. |
| `--green-700` | `#2f7d33` | Green text and links on white (5.1:1). |
| `--green-300` | `#5ad15e` | Green text on dark (10.1:1 on ink). Payout figure. |
| `--green-100` | `#e9f5e9` | Soft wash: the "You get" column, selected outcome row, funded pill. |
| `--navy` | `#1b2a39` | Logo wordmark only. |
| `--ink` / `--ink-2` / `--ink-hover` | `#0a0a0a` / `#171717` / `#262626` | Text and dark bands / card surface on dark / hover on ink buttons. |
| `--white` | `#ffffff` | Text on ink buttons, slider thumb, badges. |
| `--text-muted` | `#5c5c5c` | Secondary text on white (6.7:1). |
| `--text-on-dark` / `--text-muted-on-dark` | `#f4f4f2` / `#a3a3a3` | Body and secondary text on ink. |
| `--bg` / `--bg-soft` / `--photo-bg` | `#ffffff` / `#f6f6f5` / `#e6e6e4` | Page / alternate band / behind photos while they load. |
| `--rule` / `--rule-strong` | `#e5e5e5` / `#d6d6d3` | Rules on white / rules on the soft band and control borders. |
| `--rule-on-green` / `--rule-on-dark` / `--border-on-dark` | `#cfe6cf` / `#2a2a2a` / `#5a5a5a` | Rules on the green wash / on ink / outline buttons on ink. |
| `--track-edge` / `--track-neutral` | `#8a8a8a` / `#6b6b6b` | Slider track outline (3:1) / neutral comparison bar. |
| `--loss-on-dark` | `#ff9b93` | Loss figure in the simulator. |

No gradients, no glow, no gradient text. The only shadow is on the hero
athlete card.

## Typography

One family: **Archivo**, self-hosted as a variable font with its width
axis (`redesign/fonts/archivo-var-latin.woff2`, preloaded). Display text is
set expanded and heavy; everything else is normal width. Numbers use
tabular figures everywhere. Sizes are in `rem` so they follow the reader's
browser text size.

| Token | Size / line height | Width / weight | Use |
| --- | --- | --- | --- |
| `--fs-display` | clamp(36px, min(4.4vw, 7.6vh), 60px) / 1 | wdth 115, 800 | Hero headline, final band. Scales with viewport height so the hero fits one screen. 64px on large desktops. |
| `--fs-h2` | clamp(30px, 3.4vw, 46px) / 1.06 | wdth 112, 700 | Section headlines, milestone figures. |
| `--fs-h3` | 22px / 1.2 | wdth 105, 600 | Card names, sub-headlines. |
| `--fs-stat` | 30px / 1.1 | wdth 108, 700 | Proof numbers, slider values. |
| `--fs-lead` | 19px / 1.5 | 400 | Section intros. |
| `--fs-body` | 17px / 1.55 | 400 | Body. Max 62ch. |
| `--fs-small` | 15px / 1.5 | 400–600 | Row labels, nav, card meta. |
| `--fs-micro` | 13px / 1.45 | 500 | Legal, chips, table headers. Nothing is smaller. |

Sentence case everywhere. No all-caps labels. Two-sentence headlines break
between the sentences on desktop (`.sent`).

## Spacing, shape, depth

- 8-point scale: `4, 8, 12, 16, 24, 32, 48, 64, 96`.
- Content width `1200px`, gutter `24px` (16px below 600px). Section padding
  `96px` desktop, `64px` mobile.
- Radius: `4px` chips, `8px` buttons, inputs and the rank tile, `16px`
  cards and panels, `999px` pills.

## Components

**Announcement bar.** Ink, one line, a green "New" tag, one link. For a
single live launch only. Shortens to its first sentence on phones.

**Navigation.** Sticky, 64px, solid white with a rule. Logo left, five
anchors centred, "Sign in" (quiet) and "Browse offerings" (primary) right.
Below 960px the anchors collapse into a menu that also carries "Sign in"
and "Create a free account". The menu takes focus when it opens, returns
focus on Escape, closes on an outside tap, and scrolls on short screens.

**Buttons.** 48px min height, 8px radius, 17px/600. Primary: green fill,
ink text. Secondary: 1px ink border, fills ink on hover. Quiet: text only.
Full width below 520px. Every button says what happens.

**Hero.** Two columns at desktop, never taller than one viewport under the
bar and nav, down to 520px of viewport height (three tiers at 760, 620 and
520px), and capped at 820px so it does not stretch on tall screens. The
athlete card's photo flexes to make that true. One risk sentence is always
visible beside the buttons. On phones it stacks: a one-line ranking flag,
headline, intro, both buttons, proof numbers, athlete card, legal line.

**Featured athlete card.** Game photo, a green rank tile (the ranking is
the message, so it is the one big-number moment on the page), a status
chip, name, organization, three stats, and a link to the open offerings.

**Trust band.** "Backed by" investor logos and "Featured in" press logos,
rendered dark at fixed heights on `bg-soft`. Only outlets shown on the
live site.

**Exchange.** Two columns, "The athlete gets" and "You get", as ruled
lists, followed by one athlete quote and the three steps.

**Returns simulator.** Two range inputs (investment $300 to $10,000 with
four quick amounts; career MLB earnings $0 to $1B on a stepped scale so
realistic values are reachable), a six-outcome table that always includes
"Never reaches MLB" and a partial-loss case, and an ink result panel:
payout, a conditional plain-language verdict, a caveat, two comparison
bars, stake, multiple and term. It uses the same model as the simulator on
the offering pages. On phones the result sits directly under the sliders
so the figure is visible while dragging. A vertical scroll that starts on
a slider does not change its value.

**Offering card.** Dark band only. Square photo, status badge, name as a
heading, position and club, one factual highlight, share price and minimum
as ruled rows, one link that covers the whole card.

**Ledger.** A real table for funded athletes with row headers. Collapses
to stacked rows below 760px.

**FAQ.** Native `<details>`, risk questions first.

**Footer.** Ink. Logo, three link columns including SEC filings, then the
full regulatory text verbatim from the offering pages. Never set lighter
than `text-muted-on-dark`.

## Imagery

- Hero: real game photography of the featured athlete.
- Offering cards: the black-and-white Finlete portraits with the green
  slash, cropped square.
- Images are WebP at display size. No stock photos, no illustrations, no
  icons beyond the menu toggle, FAQ plus sign and social marks.

## Motion

Hover states at 150ms and the simulator bars at 200ms. Nothing animates on
scroll. All motion is disabled under `prefers-reduced-motion`.

## Writing

- Name the mechanism the same way every time: a share of the athlete's
  Major League earnings, held as shares issued by Finlete Funding, Inc.
- Payouts are annual, from pre-tax, on-field MLB income, for 25 years.
- Gains are always conditional ("in this scenario you would receive").
  Every simulated number is labelled simulated, and the caveat sits inside
  the result panel, not only in the footnote.
- Every ranking names its source. Statistics carry their season.
- Risk is written in the same voice and size as the benefits.
- Facts about athletes come from their live Finlete profile or the team.
  Do not restate a ranking or statistic that is not published there.

## Responsive and accessibility rules

- No horizontal scroll from 320px up.
- Tap targets are at least 44px tall, including nav links.
- The primary call to action is above the fold on a 375×667 phone.
- Multi-column sections stack at 900px; cards go 4, 2, 1.
- Keyboard focus is never hidden under the sticky nav.
- The simulator announces one summary after the reader stops adjusting it.

## Analytics

The page carries Finlete's existing Google Tag Manager and Klaviyo
loaders, guarded so they run only on `finlete.com`. Every call to action
has a `data-cta` name and pushes a `cta_click` event to the data layer.
