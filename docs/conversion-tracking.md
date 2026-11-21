# Conversion tracking on finlete.com

How an ad click becomes an attributed investment, and which part each piece plays.
Checked on 21 November 2026 against the live Google Tag Manager container (GTM-TCZ4P68D).

## The path

1. **Landing.** `src/components/site/Analytics.tsx` loads GTM through Stape and Klaviyo's
   onsite script. On every page load GTM fires the page view to both GA4 properties, the
   Stape server container, Meta, TikTok, Google Ads and PostHog. Cookies are set on
   `.finlete.com`, so `cart.finlete.com` sees the same visitor.
2. **Ad parameters are remembered.** `src/components/site/Attribution.tsx` stores the
   landing URL's `utm_*` and click ids (`fbclid`, `gclid`, `gbraid`, `wbraid`, `ttclid`,
   `msclkid`, `twclid`, `li_fat_id`, `ref`, `referral`) for the browser session. A new
   campaign or click id replaces the stored set. GTM also loads `finlete-tracker.js`,
   which keeps the four `utm_*` values in a 30-day `finlete_utm` cookie.
3. **Checkout links carry them.** When a link to `cart.finlete.com`, `app.finlete.com` or
   DealMaker is pressed, the stored parameters are added to it (never overwriting one
   already there). The cart turns query parameters into DealMaker tags, which is how an
   investment is attributed to a campaign.
4. **`invest_start`.** Every click on a cart link pushes
   `{ event: "invest_start", deal_id, offering_page, cta_location, value? }` to the
   dataLayer. GTM's InvestStart tags (Meta custom event and Stape) fire on it.
5. **In the cart.** The cart's own events take over: `step_viewed`, `initiate_checkout`,
   `checkout_email_captured`, `payment_redirect`, then `signed` and `funded` from
   DealMaker's webhooks.

## Events this site pushes

| Event | When | GTM today |
| --- | --- | --- |
| `invest_start` | Click on any cart link | Fires InvestStart (Meta, Stape) |
| `virtual_page_view` | In-site navigation (no reload) | No trigger yet |
| `alerts_signup` | Text or email alert sign-up succeeds (`channel` only) | No trigger yet |

## Two GTM changes worth making

- **Page views on in-site navigation.** GA4 only receives a page view on a full page
  load (the Framer site had the same gap). Add a Custom Event trigger for
  `virtual_page_view` to the GA4 and Meta page-view tags, or turn on "Page changes based
  on browser history events" in GA4's enhanced measurement. Do one, not both.
- **Alert sign-ups as leads.** Add a Custom Event trigger for `alerts_signup` if these
  should count as leads.

## Re-checking after a change

Land on any page with `?utm_source=test&utm_medium=cpc&utm_campaign=check&fbclid=X`,
click through to an offering, press Invest, and confirm the cart URL carries all four
and that GTM preview shows `invest_start`.
