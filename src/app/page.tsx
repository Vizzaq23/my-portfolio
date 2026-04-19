"use client";

import HeroClouds from "@/components/HeroClouds";
import Ground from "@/components/Ground";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import EndScene from "@/components/EndScene";
import NavBar from "@/components/NavBar";
import Block from "@/components/Block";
import About from "@/components/About";
import Staircase from "@/components/Staircase";
import Platforms from "@/components/Platforms";

const ctaClass =
  "no-underline inline-flex flex-col items-center justify-center min-w-[10rem] px-5 py-3 border-2 border-black text-center text-sm font-display leading-snug transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:translate-y-0.5 sm:min-w-[11rem] sm:px-6 sm:text-base";

export default function Home() {
  return (
    <>
      <NavBar />

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-sky-600 px-4 pb-24 pt-28 text-center sm:pt-32">
        <HeroClouds />

        <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sky-100 sm:text-sm">
          Computer Engineering · Software &amp; ML
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight text-brand-accent drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
          Quintin Vizza
        </h1>

        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/95 sm:text-lg md:text-xl">
          I build production web features, ML-adjacent tooling, and game tech — from Next.js dashboards
          and data pipelines to hardware-backed projects. Strong in TypeScript, Python, and shipping
          end-to-end.
        </p>

        <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5">
          <a
            href="#projects"
            className={`${ctaClass} bg-gray-200 text-black hover:scale-[1.02]`}
          >
            View projects
          </a>
          <a
            href="/resume.pdf"
            className={`${ctaClass} bg-amber-400 text-black hover:scale-[1.02]`}
          >
            Resume (PDF)
          </a>
          <a
            href="#contact"
            className={`${ctaClass} bg-red-500 text-white hover:scale-[1.02]`}
          >
            Contact
          </a>
        </div>

        <div className="absolute bottom-[20vh] flex gap-[1vw]">
          <Block type="empty" />
          <Block type="question" />
          <Block type="empty" />
          <Block type="question" />
          <Block type="empty" />
        </div>

        <Platforms />
        <div className="absolute bottom-0 w-full">
          <Ground />
        </div>
      </section>

      <div id="projects" className="scroll-mt-24">
        <Projects />
      </div>

      <About />

      <div id="contact" className="scroll-mt-24">
        <Contact />
      </div>

      <div className="relative min-h-[300px] w-full overflow-hidden">
        <Staircase />
        <EndScene />
      </div>
    </>
  );
}
