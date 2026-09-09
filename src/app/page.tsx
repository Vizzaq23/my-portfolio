import HeroClouds from "@/components/HeroClouds";
import HeroSun from "@/components/HeroSun";
import Ground from "@/components/Ground";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import EndScene from "@/components/EndScene";
import Block from "@/components/Block";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Staircase from "@/components/Staircase";
import Platforms from "@/components/Platforms";
import HeroIdleSprite from "@/components/HeroIdleSprite";
import WarpPipeLink from "@/components/WarpPipeLink";
import HeroProfile from "@/components/HeroProfile";
import WorldMotion from "@/components/WorldMotion";
import RetroOverworld from "@/components/RetroOverworld";
import RetroSky from "@/components/RetroSky";


export default function Home() {
  return (
    <>
      <WorldMotion />

      <section
        id="top"
        className="hero-cursor-zone relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-sky-600 px-4 pb-28 pt-32 text-center sm:pb-32 sm:pt-36"
      >
        <RetroOverworld />
        <HeroClouds />
        <HeroSun />
        <RetroSky world="home" />

        <HeroProfile />

        <p className="level-hint">A little play: tap a ? block to reveal a skill.</p>

        <div className="level-skill-blocks absolute z-[40] flex gap-3 sm:gap-4">
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
          className="runner-obstacle absolute bottom-[64px] left-[12%] z-[38] -translate-x-1/2 sm:left-[18%]"
        />

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
