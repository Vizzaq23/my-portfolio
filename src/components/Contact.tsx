"use client";

import Image from "next/image";
import WarpPipeLink from "@/components/WarpPipeLink";

const contactBtnClass =
  "no-underline inline-flex min-w-[11rem] flex-1 items-center justify-center gap-2 border-4 border-black px-5 py-3 font-display text-sm text-white shadow-[4px_4px_0px_#000] transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400 sm:min-w-[10.5rem] sm:flex-initial";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative min-h-[520px] scroll-mt-24 overflow-hidden border-t-4 border-blue-800 bg-black px-4 py-24 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(30,41,59,0.85),transparent_65%)]"
        aria-hidden
      />

      {/* Brick row — full-width repeating tile */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-8 bg-[url('/brickunder.png')] bg-repeat-x [background-size:32px_32px]"
        aria-hidden
      />

      {/* Warp pipe → top of page (left side) */}
      <WarpPipeLink
        href="#top"
        label="▲ Home"
        className="absolute bottom-8 left-3 z-[20] hidden sm:left-10 sm:block"
      />

      {/* Column */}
      <div className="pointer-events-none absolute bottom-8 left-40 hidden md:left-56 lg:block">
        <Image src="/undergroundColumn.png" alt="" width={24} height={80} />
      </div>

      {/* Enemy */}
      <div className="pointer-events-none absolute bottom-8 right-4 hidden animate-bounce sm:right-10 md:block motion-reduce:animate-none">
        <Image src="/enemy.png" alt="" width={40} height={40} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-1 text-center text-white sm:px-2">
        <div className="w-full rounded-2xl border-4 border-brand-accent bg-slate-900/95 p-6 shadow-[6px_6px_0_#000] ring-1 ring-white/10 backdrop-blur-sm sm:p-10">
          <h2
            id="contact-heading"
            className="mb-2 font-display text-2xl font-bold text-brand-accent drop-shadow-[3px_3px_0px_#000] sm:text-3xl"
          >
            <span className="rounded bg-black/70 px-4 py-1">Contact</span>
          </h2>
          <p className="mb-6 font-sans text-sm text-slate-400 sm:text-base">
            I usually reply within a few business days · email or LinkedIn works best
          </p>
          <p className="mb-8 max-w-lg font-sans text-sm leading-relaxed text-gray-200 sm:mx-auto sm:text-base">
            Open to internships and collaborative projects. Prefer email or LinkedIn — include your role
            and timeline for a faster reply.
          </p>

          <div className="flex flex-col flex-wrap items-stretch justify-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:qmviz23@gmail.com"
              className={`${contactBtnClass} bg-red-500`}
            >
              <Image
                src="/letter.png"
                alt=""
                width={20}
                height={20}
                className="pixelated h-5 w-5 shrink-0"
              />
              <span>Email</span>
            </a>

            <a
              href="https://www.linkedin.com/in/quintin-vizza/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${contactBtnClass} bg-blue-600`}
            >
              <Image
                src="/globe.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 shrink-0 opacity-90"
              />
              <span>LinkedIn</span>
            </a>

            <a href="tel:+16317474494" className={`${contactBtnClass} bg-green-600`}>
              <span aria-hidden className="font-sans text-base leading-none">
                ☎
              </span>
              <span>Phone</span>
            </a>
          </div>
        </div>
      </div>

      {/* Ground */}
      <div className="pointer-events-none absolute bottom-0 left-0 flex w-full">
        {Array.from({ length: 50 }).map((_, i) => (
          <Image
            key={i}
            src="/undergroundtile.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8"
          />
        ))}
      </div>
    </section>
  );
}
