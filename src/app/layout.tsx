import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

// 👾 Futuristic font
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"], // regular + bold
});

export const metadata: Metadata = {
  title: "Quintin Vizza | Portfolio",
  description: "Portfolio site for Computer Engineering student Quintin Vizza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${orbitron.className} min-h-screen bg-gray-900 text-white`}>
        {/* 🔹 Navbar */}
        <header className="sticky top-0 bg-gray-950 border-b border-gray-800 z-50">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <a
              href="/"
              className="text-2xl font-extrabold text-green-400 hover:text-blue-400 transition"
            >
              QV • Portfolio
            </a>
            <div className="flex gap-3 text-sm">
              <a
                href="/"
                className="px-3 py-2 bg-gray-800 rounded-md text-gray-200 hover:bg-blue-500 hover:text-white transition"
              >
                Home
              </a>
              <a
                href="/projects"
                className="px-3 py-2 bg-gray-800 rounded-md text-gray-200 hover:bg-blue-500 hover:text-white transition"
              >
                Projects
              </a>
              <a
                href="/about"
                className="px-3 py-2 bg-gray-800 rounded-md text-gray-200 hover:bg-blue-500 hover:text-white transition"
              >
                About
              </a>
              <a
                href="/contact"
                className="px-3 py-2 bg-gray-800 rounded-md text-gray-200 hover:bg-blue-500 hover:text-white transition"
              >
                Contact
              </a>
            </div>
          </nav>
        </header>

        {/* 🔹 Main content */}
        <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>

        {/* 🔹 Footer */}
        <footer className="border-t border-gray-800 text-center text-gray-400 py-6 text-sm">
          <div className="flex justify-center gap-4 mb-3">
            <a
              href="https://github.com/Vizzaq23"
              target="_blank"
              className="px-4 py-2 bg-gray-800 rounded-md hover:bg-blue-500 hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="px-4 py-2 bg-gray-800 rounded-md hover:bg-blue-500 hover:text-white transition"
            >
              LinkedIn
            </a>
          </div>
          © {new Date().getFullYear()} Quintin Vizza
        </footer>
      </body>
    </html>
  );
}
