import HeroClouds from "@/components/HeroClouds";
import HeroSun from "@/components/HeroSun";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import About from "@/components/About";
import Experience from "@/components/Experience";
import PlayableHero from "@/components/PlayableHero";
import HeroProfile from "@/components/HeroProfile";
import WorldMotion from "@/components/WorldMotion";
import RetroSky from "@/components/RetroSky";
import OnePieceEasterEgg from "@/components/OnePieceEasterEgg";
import styles from "./home-refresh.module.css";


export default function Home() {
  return (
    <>
      <WorldMotion />

      <section
        id="top"
        className={`${styles.hero} hero-cursor-zone relative flex flex-col items-center overflow-hidden px-4 text-center`}
      >
        <HeroClouds />
        <HeroSun />
        <RetroSky world="home" />

        <HeroProfile />

        <PlayableHero />
        <OnePieceEasterEgg kind="nami" />

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
