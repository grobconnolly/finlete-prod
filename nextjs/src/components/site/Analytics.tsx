import Script from "next/script";

/**
 * The same tags finlete.com (Framer) and cart.finlete.com load, so the
 * funnel is continuous from site to checkout: Google Tag Manager served
 * through Stape, and Klaviyo's onsite script. Loaded after hydration.
 */
export function Analytics() {
  return (
    <>
      <Script id="gtm-stape" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://load.stape.finlete.com/4av1bcioycdfn.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','bjses=BwJZJC0iRDctPFAzT1ctRRhbVk1ISQ0NUwANDRUKHQZABQsO');`}
      </Script>
      <noscript>
        <iframe
          src="https://load.stape.finlete.com/ns.html?id=GTM-TCZ4P68D"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Script
        id="klaviyo-onsite"
        strategy="afterInteractive"
        src="https://static.klaviyo.com/onsite/js/Whhpe2/klaviyo.js"
      />
    </>
  );
}
