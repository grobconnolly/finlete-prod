import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import "@/components/fx/fx.css";
import { RevealOnScroll } from "@/components/fx/Reveal";
import { Analytics } from "@/components/site/Analytics";

// Variable font with the width axis: the homepage uses font-stretch 105–125%.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const DESCRIPTION =
  "Finlete is a marketplace where top athletes sell a % of their potential future earnings. Investing is speculative and you can lose your entire investment.";

export const metadata: Metadata = {
  metadataBase: new URL("https://finlete.com"),
  title: "Invest in athletes' careers | Finlete",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Finlete",
    title: "Invest in athletes' careers | Finlete",
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Finlete" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invest in athletes' careers | Finlete",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <RevealOnScroll />
        <Analytics />
      </body>
    </html>
  );
}
