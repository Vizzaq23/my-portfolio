"use client";

import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-[500px] scroll-mt-24 flex-col items-center justify-center overflow-hidden text-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-500" />

      <div className="absolute left-0 top-8 flex w-full justify-center opacity-80">
        {Array.from({ length: 10 }).map((_, i) => (
          <Image
            key={i}
            src="/cloud-mario.svg"
            alt=""
            width={64}
            height={32}
            className="mx-4 animate-float-slow"
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 flex w-full">
        {Array.from({ length: 50 }).map((_, i) => (
          <Image
            key={i}
            src="/groundtile.png"
            alt=""
            width={48}
            height={32}
            className="h-10 w-10"
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-3xl rounded-2xl border-4 border-yellow-400 bg-[#b3d9ff]/90 p-6 shadow-[6px_6px_0_#000] sm:p-8">
        <h2 className="mb-4 font-display text-xl text-red-600 drop-shadow-[2px_2px_0_#fff] sm:mb-6 sm:text-2xl md:text-3xl">
          About
        </h2>
        <p className="mb-4 font-sans text-base leading-relaxed text-ink sm:mb-6 sm:text-lg">
          I&apos;m a computer engineering student focused on{" "}
          <strong className="font-semibold">full-stack web</strong>,{" "}
          <strong className="font-semibold">ML tooling</strong>, and{" "}
          <strong className="font-semibold">systems-level thinking</strong>. Recent work spans
          Next.js dashboards, Python services, and data-heavy features in production settings.
        </p>
        <p className="font-sans text-base leading-relaxed text-ink sm:text-lg">
          I also ship creative hardware and game-adjacent projects — same discipline: prototype
          fast, measure outcomes, document tradeoffs.{" "}
          <a
            href="/resume.pdf"
            className="font-semibold text-red-600 underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Download my resume (PDF)
          </a>{" "}
          or use the contact section below.
        </p>
      </div>
    </section>
  );
}
