import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";
import "./level.css";
import "./portfolio.css";
import "./retro-home.css";
import "./retro-interface.css";
import "./retro-airship.css";
import "./cave-fish.css";
import "./project-map.css";
import "./github-activity.css";
import "./typography.css";
import NavBar from "@/components/NavBar";
import JsonLd from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site-url";

const bodyFont = localFont({
  src: "../fonts/IBMPlexSans-Variable.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-body",
  display: "swap",
});

const headingFont = localFont({
  src: [
    { path: "../fonts/ChakraPetch-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/ChakraPetch-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

const pixelFont = localFont({
  src: [{ path: "../fonts/PressStart2P-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-pixel",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Quintin Vizza — Software Engineer",
    template: "%s · Quintin Vizza",
  },
  description:
    "Portfolio of Quintin Vizza, a software engineer and Computer Engineering graduate building full-stack products, data-driven tools, game systems, and hardware-integrated software.",
  keywords: [
    "Quintin Vizza",
    "portfolio",
    "software engineer",
    "computer engineering",
    "Next.js",
    "TypeScript",
    "full-stack",
  ],
  authors: [{ name: "Quintin Vizza" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    ...(siteUrl ? { url: siteUrl } : {}),
    siteName: "Quintin Vizza",
    title: "Quintin Vizza — Software Engineer",
    description:
      "Portfolio of Quintin Vizza, a software engineer and Computer Engineering graduate building full-stack products, data-driven tools, game systems, and hardware-integrated software.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quintin Vizza — Software Engineer",
    description:
      "Software engineer and Computer Engineering graduate — full-stack products, data tools, game systems, and hardware-integrated software.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0284c7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${headingFont.variable} ${pixelFont.variable} font-sans bg-gray-50 text-ink antialiased`}
      >
        <JsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-brand-sky"
        >
          Skip to main content
        </a>
        <NavBar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <footer className="site-footer bg-ink text-sm font-sans text-white">
          <div>
            <p>© {new Date().getFullYear()} Quintin Vizza</p>
            <p>Built with Next.js & TypeScript. Inspired by the games I love.</p>
            <Link href="/#top" className="no-underline">Back to top <span aria-hidden="true">↑</span></Link>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
