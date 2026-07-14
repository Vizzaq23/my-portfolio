import Image from "next/image";
import WorldLabel from "@/components/WorldLabel";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative flex min-h-[520px] scroll-mt-28 flex-col items-center justify-center overflow-hidden px-4 pb-28 pt-16 text-center sm:scroll-mt-24 sm:pb-32 sm:pt-20"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-sky-300 to-sky-500" />

      <Image
        src="/about-platform-left.png"
        alt=""
        width={105}
        height={150}
        sizes="(max-width: 1023px) 96px, 128px"
        className="pointer-events-none absolute bottom-10 left-[max(0.5rem,calc((100vw_-_56rem)_/_2_-_7rem))] z-[4] hidden h-auto w-24 select-none drop-shadow-[0_4px_0_rgba(0,0,0,0.12)] sm:block sm:w-28 md:w-32"
        aria-hidden
      />
      <Image
        src="/about-platform-right.png"
        alt=""
        width={105}
        height={150}
        sizes="(max-width: 1023px) 96px, 128px"
        className="pointer-events-none absolute bottom-10 right-[max(0.5rem,calc((100vw_-_56rem)_/_2_-_7rem))] z-[4] hidden h-auto w-24 select-none drop-shadow-[0_4px_0_rgba(0,0,0,0.12)] sm:block sm:w-28 md:w-32"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-0 top-8 z-[2] h-10 w-full opacity-80"
        aria-hidden
      >
        <div className="mx-auto flex max-w-5xl justify-around px-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <Image
              key={i}
              src="/cloud-mario.svg"
              alt=""
              width={64}
              height={32}
              className="animate-float-slow motion-reduce:animate-none"
            />
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[3] h-10 w-full bg-[url('/groundTile.png')] bg-repeat-x [background-size:40px_40px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl border-4 border-yellow-400 bg-[#b3d9ff]/90 p-6 shadow-[6px_6px_0_#000] ring-1 ring-white/50 backdrop-blur-sm sm:p-10">
        <WorldLabel world={3} subtitle="Player Profile" tone="light" />
        <p className="mb-3 inline-flex items-center gap-2 border-2 border-black bg-brand-accent px-2 py-1 font-display text-[9px] text-black shadow-[2px_2px_0_#000] sm:text-[10px]">
          <span aria-hidden>★</span>
          Graduated May 2026
        </p>

        <h2
          id="about-heading"
          className="mb-6 font-display text-2xl font-bold text-brand-accent drop-shadow-[3px_3px_0px_#000] sm:mb-8 sm:text-3xl"
        >
          <span className="rounded bg-black/70 px-4 py-1">About</span>
        </h2>

        <div className="grid gap-6 text-left md:grid-cols-2 md:gap-10 md:items-start">
          <p className="font-sans text-base leading-relaxed text-ink sm:text-lg">
            I&apos;m a Computer Engineering graduate from Sacred Heart University
            with a minor in Mathematics. I enjoy building software across full-stack
            web development, data tools, game systems, and hardware-integrated
            projects.
          </p>

          <div className="flex flex-col gap-6">
            <p className="font-sans text-base leading-relaxed text-ink sm:text-lg">
              My work includes production dashboards, collector platforms, adaptive
              gameplay systems, and a full-scale pinball machine. I&apos;m especially
              interested in software roles connected to gaming, sports, trading cards,
              consumer products, or technically ambitious startups.
            </p>
            <div className="flex flex-col gap-2 sm:items-start">
              <a
                href="/resume.pdf"
                className="no-underline inline-flex min-h-11 w-full items-center justify-center border-4 border-black bg-red-500 px-5 py-2.5 font-display text-sm text-white shadow-[4px_4px_0px_#000] transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 sm:w-auto sm:min-w-[14rem]"
              >
                Download my résumé (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
