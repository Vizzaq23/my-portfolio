import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";

const inter = localFont({
  src: [
    { path: "../fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const pixelFont = localFont({
  src: [{ path: "../fonts/PressStart2P-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-pixel",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

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
    url: siteUrl ?? "/",
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
        className={`${inter.variable} ${pixelFont.variable} font-sans bg-gray-50 text-ink antialiased`}
      >
        <JsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-brand-sky"
        >
          Skip to main content
        </a>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <footer className="bg-ink py-4 text-center text-sm font-sans text-white">
          © {new Date().getFullYear()} Quintin Vizza
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
