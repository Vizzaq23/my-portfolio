"use client";

import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative flex min-h-[520px] scroll-mt-24 flex-col items-center justify-center overflow-hidden px-4 pb-28 pt-14 text-center sm:pb-32"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-sky-300 to-sky-500" />

      {/* Mushroom platforms — separate crops; sit in side gutters when wide, corners when narrow */}
      <Image
        src="/about-platform-left.png"
        alt=""
        width={105}
        height={150}
        sizes="(max-width: 1023px) 96px, 128px"
        className="pointer-events-none absolute bottom-10 left-[max(0.5rem,calc((100vw_-_56rem)_/_2_-_7rem))] z-[4] h-auto w-24 select-none drop-shadow-[0_4px_0_rgba(0,0,0,0.12)] sm:w-28 md:w-32"
        aria-hidden
      />
      <Image
        src="/about-platform-right.png"
        alt=""
        width={105}
        height={150}
        sizes="(max-width: 1023px) 96px, 128px"
        className="pointer-events-none absolute bottom-10 right-[max(0.5rem,calc((100vw_-_56rem)_/_2_-_7rem))] z-[4] h-auto w-24 select-none drop-shadow-[0_4px_0_rgba(0,0,0,0.12)] sm:w-28 md:w-32"
        aria-hidden
      />

      <div className="absolute left-0 top-8 z-[2] flex w-full justify-center opacity-80">
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

      <div className="absolute bottom-0 left-0 z-[3] flex w-full pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <Image
            key={i}
            src="/groundTile.png"
            alt=""
            width={48}
            height={32}
            className="h-10 w-10"
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl rounded-2xl border-4 border-yellow-400 bg-[#b3d9ff]/85 p-6 shadow-[6px_6px_0_#000] ring-1 ring-white/50 backdrop-blur-sm sm:p-10">
        <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink/80 sm:text-sm">
          Computer engineering · Software &amp; ML
        </p>

        <h2
          id="about-heading"
          className="mb-8 font-display text-2xl font-bold text-brand-accent drop-shadow-[3px_3px_0px_#000] sm:mb-10 sm:text-3xl"
        >
          <span className="rounded bg-black/70 px-4 py-1">About</span>
        </h2>

        <div className="grid gap-8 text-left md:grid-cols-2 md:gap-10 md:items-start">
          <p className="font-sans text-base leading-relaxed text-ink sm:text-lg">
            I&apos;m a computer engineering student focused on{" "}
            <strong className="font-semibold">full-stack web</strong>,{" "}
            <strong className="font-semibold">ML tooling</strong>, and{" "}
            <strong className="font-semibold">systems-level thinking</strong>. Recent work spans
            Next.js dashboards, Python services, and data-heavy features in production settings.
          </p>

          <div className="flex flex-col gap-6">
            <p className="font-sans text-base leading-relaxed text-ink sm:text-lg">
              I also ship creative hardware and game-adjacent projects — same discipline: prototype
              fast, measure outcomes, document tradeoffs.
            </p>
            <div className="flex flex-col gap-2 sm:items-start">
              <a
                href="/resume.pdf"
                className="no-underline inline-flex w-full items-center justify-center border-4 border-black bg-red-500 px-5 py-2.5 font-display text-sm text-white shadow-[4px_4px_0px_#000] transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 sm:w-auto sm:min-w-[14rem]"
              >
                Download my resume (PDF)
              </a>
              <p className="text-center font-sans text-sm text-ink-muted sm:text-left">
                Or reach out via the contact section below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
