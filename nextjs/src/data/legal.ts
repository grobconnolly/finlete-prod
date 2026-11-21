/**
 * Terms of Service and Privacy Policy, verbatim from finlete.com as of
 * 21 November 2026. Legal text: change the wording only on counsel's word.
 * A string is a paragraph; a `list` is a bulleted list whose items may carry
 * a bold lead-in.
 */
export type LegalBlock = string | { list: { lead?: string; text: string }[] };
export type LegalSection = { n: string; title: string; body: LegalBlock[] };
export type LegalDoc = {
  slug: "terms-of-service" | "privacy-policy";
  title: string;
  effective: string;
  description: string;
  sections: LegalSection[];
  other: { href: string; label: string };
};

export const TERMS: LegalDoc = {
  slug: "terms-of-service",
  title: "Terms of Service",
  effective: "December 2023",
  description: "The terms that apply when you use finlete.com, the Finlete app and Finlete's services.",
  other: { href: "/legal/privacy-policy", label: "Privacy Policy" },
  sections: [
    {
      n: "1",
      title: "Acceptance of terms",
      body: [
        "Welcome to Finlete. These Terms of Service (“Terms”) are a contract between you and Finlete, LLC, a [State] limited liability company. By using www.finlete.com, our mobile application, and our services (collectively, the “Platform”), you agree to these Terms. If you disagree with any part of the terms, you may not access the Platform.",
      ],
    },
    {
      n: "2",
      title: "Description of service",
      body: [
        "Finlete connects fans with high‑potential athletes, offering a unique model for fans to purchase future earnings contracts from athletes. This Platform is designed to facilitate these interactions and transactions.",
      ],
    },
    {
      n: "3",
      title: "User eligibility and registration",
      body: [
        "To use Finlete, you must be at least 18 years of age. By registering, you agree to provide accurate and complete information and to update this information to keep it current.",
      ],
    },
    {
      n: "4",
      title: "Use of platform",
      body: [
        "The Platform allows registered users to purchase future earnings contracts from athletes. All transactions must comply with these Terms, and Finlete reserves the right to modify or terminate the service for any user at its discretion.",
      ],
    },
    {
      n: "5",
      title: "Proprietary rights",
      body: [
        "All content on the Platform, including text, graphics, logos, and software, is the property of Finlete. You are granted a limited, non‑exclusive right to access and use the Platform for personal transactions related to the purchase of future earnings contracts.",
      ],
    },
    {
      n: "6",
      title: "User conduct",
      body: [
        "Users must not use the Platform for any unlawful activities or transactions. The Platform is intended for personal use to purchase future earnings contracts from athletes. Users agree to comply with all applicable laws and regulations.",
      ],
    },
    {
      n: "7",
      title: "Transactions",
      body: [
        "When you engage in a transaction to purchase a future earnings contract from an athlete, you understand that you are entering into a binding agreement directly with the athlete. Finlete is not a party to these transactions.",
      ],
    },
    {
      n: "8",
      title: "No financial advice",
      body: [
        "Finlete does not provide investment, financial, legal, or tax advice. Any decision to purchase a future earnings contract from an athlete through the Platform is made at your own risk. We advise consulting with a professional advisor for any financial decisions.",
      ],
    },
    {
      n: "9",
      title: "Privacy and data usage",
      body: [
        "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information.",
      ],
    },
    {
      n: "10",
      title: "Limitation of liability",
      body: [
        "Finlete shall not be liable for any damages resulting from your use of the Platform, including any losses incurred as a result of purchasing future earnings contracts from athletes.",
      ],
    },
    {
      n: "11",
      title: "Amendments to terms",
      body: [
        "Finlete reserves the right to modify these Terms at any time. Your continued use of the Platform after any such changes constitutes your acceptance of the new Terms.",
      ],
    },
    {
      n: "12",
      title: "Contact information",
      body: [
        "For any questions or concerns regarding these Terms or the Platform, please contact us at legal@finlete.com.",
      ],
    },
    {
      n: "13",
      title: "SMS",
      body: [
        "Finlete, also known as “Finlete, Inc,” offers our customers the option to engage in conversations with our team to provide fast solutions. Message frequency varies. Message and data rates may apply. Text HELP to 619‑373‑8466 for assistance. Reply STOP to opt‑out. Carriers are not liable for any delays or undelivered messages.",
      ],
    },
  ],
};

export const PRIVACY: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  effective: "June 2026",
  description: "How Finlete collects, uses, shares and protects your personal information.",
  other: { href: "/legal/terms-of-service", label: "Terms of Service" },
  sections: [
    {
      n: "1",
      title: "Introduction",
      body: [
        "Welcome to Finlete. We respect the privacy of our users and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.finlete.com, use our mobile application, or engage with our services.",
      ],
    },
    {
      n: "2",
      title: "Information Collection",
      body: [
        "We collect information that you provide directly to us when you register on the Platform, engage in transactions, or communicate with us. This may include: Personal identification information: Name, email address, postal address, phone number; Transaction information: Details about purchases of future earnings contracts and payment information; Identity and financial information collected during the investment process (including identity verification and bank-connection details, processed by our broker-dealer and payment partners); Community content: posts, replies, and media you share in investor community features; Communications: your communications with Finlete's support team.",
        "We also automatically collect certain information when you visit our Platform, such as: Log and usage data; Device information, including IP address, browser type, and operating system.",
      ],
    },
    {
      n: "3",
      title: "Use of Information",
      body: [
        "The information we collect is used to: provide and maintain our services; process transactions; provide customer support and respond to your inquiries; improve and personalize your experience; for marketing purposes, subject to your consent where required by law; and to comply with legal obligations.",
      ],
    },
    {
      n: "4",
      title: "Sharing of Information",
      body: [
        "We share personal information only as needed to operate Finlete, including with:",
        {
          list: [
            { lead: "Authentication:", text: "Clerk (account login)." },
            {
              lead: "Securities offerings & transactions:",
              text: "Finlete Funding, Inc.'s offerings are conducted through our registered broker-dealer, DealMaker Securities, which collects and processes the information required to complete an investment (including identity verification / KYC).",
            },
            { lead: "Bank connections:", text: "Plaid (to securely link a bank account for dividend payouts)." },
            { lead: "Hosting & databases:", text: "our cloud hosting and database providers." },
            { lead: "Community features:", text: "GIPHY (GIF search)." },
            {
              lead: "Analytics & product measurement:",
              text: "providers that help us understand app usage.",
            },
            { text: "Athletes, to facilitate transactions." },
            {
              text: "Law enforcement or government officials when compelled by subpoena, court order, or similar legal process, or to comply with legal obligations.",
            },
          ],
        },
        "These providers are authorized to use your information only to perform services for us.",
      ],
    },
    {
      n: "5",
      title: "Data Security",
      body: [
        "We implement a variety of security measures to maintain the safety of your personal information. However, no system can be completely secure, and we cannot guarantee the absolute security of your information.",
      ],
    },
    {
      n: "6",
      title: "Data Retention & Account Deletion",
      body: [
        "You can delete your account at any time from within the Finlete mobile app (Account → Delete Account), or by emailing legal@finlete.com. Deleting your account removes your login and profile information. As a securities platform, we are legally required to retain certain investment and transaction records (including records held by our broker-dealer) even after account deletion, in accordance with applicable securities laws and recordkeeping rules. We retain such information only as long as required by law.",
      ],
    },
    {
      n: "7",
      title: "Your Data Rights",
      body: [
        "Depending on your jurisdiction, you may have rights to access, update, delete, or port your personal data, to object to or restrict its processing, and to withdraw consent. To exercise any of these rights, contact us at legal@finlete.com, and we will respond as required by applicable law.",
      ],
    },
    {
      n: "8",
      title: "Third-Party Websites",
      body: [
        "Our Platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.",
      ],
    },
    {
      n: "9",
      title: "Changes to This Privacy Policy",
      body: [
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
      ],
    },
    {
      // Numbered "9" a second time on the old page; renumbered, wording unchanged.
      n: "10",
      title: "Contact Us",
      body: [
        "If you have any questions about this Privacy Policy, please contact us at legal@finlete.com.",
      ],
    },
  ],
};
