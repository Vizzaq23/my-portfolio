import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Quintin Vizza | Portfolio",
  description: "My professional portfolio site",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Quintin Vizza</h1>
            <nav className="space-x-4">
              <a href="#about" className="hover:underline">About</a>
              <a href="#projects" className="hover:underline">Projects</a>
              <a href="#contact" className="hover:underline">Contact</a>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-5xl mx-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-200 text-center p-4 mt-10">
          © {new Date().getFullYear()} Quintin Vizza
        </footer>
      </body>
    </html>
  );
}
