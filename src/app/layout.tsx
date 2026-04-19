import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Press_Start_2P } from "next/font/google";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quintin Vizza — Portfolio",
    template: "%s · Quintin Vizza",
  },
  description:
    "Computer engineering student: full-stack web (Next.js, TypeScript), ML tooling, Python, and shipped product features. Projects, resume, and contact.",
  keywords: [
    "Quintin Vizza",
    "portfolio",
    "computer engineering",
    "Next.js",
    "TypeScript",
    "software engineer",
    "intern",
  ],
  authors: [{ name: "Quintin Vizza" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Quintin Vizza",
    title: "Quintin Vizza — Portfolio",
    description:
      "Full-stack web, ML-adjacent tooling, and systems projects. Resume and contact.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quintin Vizza — Portfolio",
    description:
      "Computer engineering student — Next.js, TypeScript, Python, shipped features.",
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

        <footer className="bg-ink py-4 text-center text-sm font-sans text-white mt-10">
          © {new Date().getFullYear()} Quintin Vizza
        </footer>
      </body>
    </html>
  );
}
