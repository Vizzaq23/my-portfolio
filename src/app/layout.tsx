import type { Metadata } from "next";
import "./globals.css";
import { Press_Start_2P } from "next/font/google";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quintin Vizza Portfolio",
  description: "Portfolio showcasing AI, games, and web apps",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pixelFont.className} bg-gray-50 text-gray-900`}>
        {/* === Page Content === */}
        <main>{children}</main>

        {/* === Footer === */}
        <footer className="bg-gray-900 text-white text-center py-4 mt-10">
          © {new Date().getFullYear()} Quintin Vizza
        </footer>
      </body>
    </html>
  );
}
