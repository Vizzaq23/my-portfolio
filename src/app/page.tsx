"use client";

import HeroClouds from "@/components/HeroClouds";
import Ground from "@/components/Ground";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import EndScene, { HeroHills } from "@/components/EndScene";
import NavBar from "@/components/NavBar";
import Block from "@/components/Block";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Staircase from "@/components/Staircase";
import Platforms from "@/components/Platforms";
import HeroIdleSprite from "@/components/HeroIdleSprite";
import WarpPipeLink from "@/components/WarpPipeLink";
import HeroIntro from "@/components/HeroIntro";

const ctaClass =
  "no-underline inline-flex min-h-11 min-w-[9.5rem] items-center justify-center px-5 py-3 border-2 border-black text-center text-sm font-display leading-snug shadow-[3px_3px_0_#000] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:translate-y-0.5 active:shadow-[2px_2px_0_#000] sm:min-w-[10.5rem] sm:text-base";

export default function Home() {
  return (
    <>
      <NavBar />

      <section
        id="top"
        className="hero-cursor-zone relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-sky-600 px-4 pb-28 pt-32 text-center sm:pb-32 sm:pt-36"
      >
        <HeroIntro />
        <HeroClouds />
        <div className="hero-sun hidden sm:block" aria-hidden />

        <span
          className="hero-sparkle left-[18%] top-[28%]"
          style={{ animationDelay: "0.2s" }}
          aria-hidden
        />
        <span
          className="hero-sparkle right-[22%] top-[34%]"
          style={{ animationDelay: "1.1s" }}
          aria-hidden
        />
        <span
          className="hero-sparkle left-[42%] top-[22%]"
          style={{ animationDelay: "1.8s" }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
          <p className="hero-enter hero-enter-delay-1 mb-2 font-display text-[9px] uppercase tracking-widest text-sky-100 drop-shadow-[2px_2px_0_#000] sm:text-[10px]">
            World 1 — Overworld
          </p>
          <p className="hero-enter hero-enter-delay-1 mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sky-100 sm:text-sm">
            Software Engineer · Computer Engineering Graduate
          </p>
          <h1 className="hero-enter hero-enter-delay-2 font-display text-3xl font-bold leading-tight text-brand-accent drop-shadow-[4px_4px_0_rgba(0,0,0,0.35)] sm:text-4xl md:text-5xl lg:text-6xl">
            Quintin Vizza
          </h1>

          <p className="hero-enter hero-enter-delay-3 mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/95 sm:mt-6 sm:text-lg md:text-xl">
            I build full-stack products, data-driven tools, game systems, and
            hardware-integrated software using TypeScript, Python, React, Next.js,
            and C#.
          </p>

          <p className="hero-enter hero-enter-delay-3 mt-4 inline-flex items-center gap-2 border-2 border-black bg-black/50 px-3 py-1.5 font-display text-[9px] text-brand-accent shadow-[3px_3px_0_#000] sm:text-[10px]">
            <span
              className="inline-block h-2.5 w-2.5 animate-pulse bg-green-400 motion-reduce:animate-none"
              aria-hidden
            />
            Open to full-time roles
          </p>

          <div className="hero-enter hero-enter-delay-4 mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <a href="#projects" className={`${ctaClass} bg-gray-200 text-black`}>
              View Projects
            </a>
            <a href="/resume.pdf" className={`${ctaClass} bg-amber-400 text-black`}>
              Résumé
            </a>
            <a href="#contact" className={`${ctaClass} bg-red-500 text-white`}>
              Contact
            </a>
          </div>

          <p className="hero-enter hero-enter-delay-4 mt-5 hidden font-sans text-xs text-white/80 sm:block">
            Tip: tap the{" "}
            <span className="font-semibold text-brand-accent">?</span> blocks to
            reveal skills
          </p>
        </div>

        <div className="absolute bottom-[16vh] z-[15] flex gap-[2vw] sm:bottom-[18vh] sm:gap-[1vw] md:bottom-[20vh]">
          <div className="hidden sm:block">
            <Block type="empty" />
          </div>
          <Block
            type="question"
            skills={["TypeScript", "Next.js", "Python", "React", "Tailwind"]}
          />
          <div className="hidden sm:block">
            <Block type="empty" />
          </div>
          <Block
            type="question"
            skills={["APIs", "Supabase", "Git", "CI", "Hardware"]}
          />
          <div className="hidden sm:block">
            <Block type="empty" />
          </div>
        </div>

        <Platforms />
        <div className="absolute bottom-0 w-full">
          <Ground />
        </div>

        <WarpPipeLink
          href="#contact"
          label="Contact"
          className="absolute bottom-[64px] left-[12%] z-[25] -translate-x-1/2 sm:left-[18%]"
        />

        <div className="pointer-events-none absolute inset-0 z-[35]">
          <HeroHills />
        </div>

        <HeroIdleSprite />

        <div className="pointer-events-none absolute inset-0 z-[45]">
          <Staircase />
          <EndScene />
        </div>
      </section>

      <div id="projects" className="scroll-mt-28 sm:scroll-mt-24">
        <Projects />
      </div>

      <About />

      <Experience />

      <Contact />
    </>
  );
}
