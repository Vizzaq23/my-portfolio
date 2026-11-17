import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep local visual previews and production validation from sharing build files.
  distDir: process.env.PORTFOLIO_BUILD_DIR || ".next",
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [{ source: "/resume.pdf", destination: "/resume" }];
  },
};

export default nextConfig;
