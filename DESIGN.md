# Finlete design system

Direction for the 2026 redesign. The prototype that follows it lives in
`redesign/` (`index.html` + `styles.css`). Pages use the token names below,
never raw values.

## The idea

Finlete sits between a brokerage and a ballpark. The most characteristic
objects in that world are the **back of a baseball card** and the **term
sheet**: rows of labels and numbers, ruled lines, one typeface, no
decoration. The site borrows that structure. Information is laid out in
ruled rows (label left, value right), sections are separated by rules and
white space rather than by cards and tinted bands, and the only loud thing
on the page is the headline.

What this replaces: three competing greens, cards for everything, an
all-caps eyebrow over every heading, one green word in each headline, and
a hero that talks about investing without showing anything you can invest
in. The new hero leads with a real live offering.

## Color

One green. The verified primary from the live site is `#44a647`. It is a
surface color: buttons, the progress fill, the slash motif. Text on it is
black, not white (white fails contrast at 3.1:1; black passes at 6.4:1).
For green text or links on a white background use the darker `green-700`.

| Token | Value | Role |
| --- | --- | --- |
| `--green-500` | `#44a647` | Primary surface: buttons, progress fill, live marker. Black text on it. |
| `--green-600` | `#3a9240` | Hover for primary surfaces. |
| `--green-700` | `#2f7d33` | Green text and links on white (5.1:1). |
| `--green-300` | `#5ad15e` | Green text on the dark section (10.1:1 on ink). |
| `--green-100` | `#e6f4e6` | Soft green wash for the single illustrative callout. Use once per page at most. |
| `--ink` | `#0a0a0a` | Text, the dark roster band, footer. |
| `--ink-2` | `#1a1a1a` | Card surfaces inside the dark band. |
| `--text` | `#0a0a0a` | Body text on white. |
| `--text-muted` | `#5c5c5c` | Secondary text on white (6.7:1). Never lighter than `#6b6b6b` for readable text. |
| `--text-on-dark` | `#f4f4f2` | Body text on ink. |
| `--text-muted-on-dark` | `#a3a3a3` | Secondary text on ink (7.9:1). |
| `--bg` | `#ffffff` | Page. |
| `--bg-soft` | `#f5f5f5` | Alternate panel (used for the FAQ and athlete CTA only). |
| `--rule` | `#e5e5e5` | All rules and borders on white. |
| `--rule-on-dark` | `#2a2a2a` | Rules on ink. |
| `--danger` | `#c0392b` | Form errors only. |

No gradients except the one baked into the athlete photography. No
gradient text. No glow.

## Typography

One family: **Archivo**, loaded as a variable font with its width axis.
Display text is set expanded (width 115) and heavy; everything else is
normal width. That gives the two-voice contrast of a display face and a
text face without a second family. Inter is retired.

Numbers everywhere use `font-variant-numeric: tabular-nums` so that stat
rows and prices align.

| Token | Size / line height | Width / weight | Use |
| --- | --- | --- | --- |
| `--fs-display` | clamp(44px, 6.2vw, 80px) / 0.98 | wdth 115, 800, tracking -0.025em | Hero headline only. |
| `--fs-h2` | clamp(32px, 3.6vw, 48px) / 1.05 | wdth 112, 700, tracking -0.02em | Section headlines. |
| `--fs-h3` | 24px / 1.2 | wdth 105, 600 | Sub-headlines, card names. |
| `--fs-lead` | 20px / 1.5 | 400 | Hero sub-paragraph. |
| `--fs-body` | 17px / 1.55 | 400 | Body. Max line length 64ch. |
| `--fs-small` | 15px / 1.5 | 400–500 | Labels in ruled rows, captions, nav. |
| `--fs-micro` | 13px / 1.4 | 500 | Legal, timestamps, chip text. |
| `--fs-stat` | 32px / 1 | wdth 108, 700 | Numbers in the proof row and term sheets. |

Sentence case everywhere. No all-caps labels, no letter-spaced eyebrows.

## Spacing

8-point scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

- Content width `1200px`, gutter `24px` (16px below 600px).
- Prose column `640px`.
- Section padding `96px` top and bottom on desktop, `64px` on mobile.
- Ruled rows: `16px` vertical padding, `1px` rule below.

## Shape and depth

| Token | Value | Use |
| --- | --- | --- |
| `--r-sm` | 4px | Chips, progress track. |
| `--r-md` | 8px | Buttons, inputs, FAQ items. |
| `--r-lg` | 16px | Offering cards, photos. |
| `--shadow-card` | `0 1px 2px rgba(0,0,0,.06), 0 16px 40px -16px rgba(0,0,0,.22)` | The hero offering card only. |

Everything else is flat and separated by rules. Cards are reserved for
things that are literally cards: athlete offerings.

## Components

**Buttons.** 48px tall, 8px radius, 17px/600, 20px horizontal padding.
- Primary: `green-500` fill, ink text. Hover `green-600`. Focus: 2px ink
  outline offset 2px.
- Secondary: transparent, 1px ink border, ink text. Hover: ink fill, white
  text.
- Quiet: no border, ink text underlined on hover.
- Disabled: 40% opacity, no pointer.
- On the dark band the primary stays green with ink text; the secondary
  becomes a white border.

**Links.** `green-700`, underlined, underline offset 3px. Hover: ink.

**Ruled row** (`.row-line`). The signature element. Flex, space-between,
label in `text-muted`, value in ink with tabular numerals, 1px rule below.

**Offering card.** Photo at 4:5, name at `fs-h3`, one line of position and
club, a ruled row for share price and minimum, a 6px progress track with
`green-500` fill, raised total and percent beneath, one primary button.

**Live marker.** An 8px `green-500` dot before the word "Raising now".
This is the only status treatment on the page.

**Navigation.** Sticky, white, 1px rule below, 64px tall. Logo left, four
links centre, "Sign in" quiet and "Browse offerings" primary on the right.
Collapses to logo plus primary button plus a menu toggle below 900px.

**FAQ.** Native `<details>` with a 1px rule between items and a plus sign
that rotates to a cross when open.

**Footer.** Ink background, three link columns, and the Regulation CF
broker-dealer disclaimer in `fs-micro` at full width. The disclaimer is
not optional.

## Imagery and icons

- Athlete photography is the existing black-and-white cut-out set with the
  green slash (`assets/img/athletes/hero-stage-*.png`). It is the only
  place the green appears as texture. Do not add stock photos or
  illustrations.
- Press logos render in grayscale at a fixed 24px height.
- Icons: none in the layout except the plus/cross on FAQ items and the
  menu toggle, both inline SVG, 1.5px stroke, currentColor.

## Motion

One moment: the progress bars fill to their value on first paint over
600ms. Hover states transition at 150ms. Nothing else moves. All motion is
disabled under `prefers-reduced-motion`.

## Writing

- Say what happens: "Browse live offerings", "Invest in Luinder Avila",
  not "Get started" or "Learn more".
- Name the mechanism plainly and the same way every time: shares in an
  athlete's future earnings. Not "equity", not "a loan".
- Every number that is illustrative says so next to the number.
- Risk and regulatory language is written in the same voice and size as
  the rest of the page, never hidden in a lighter grey.
