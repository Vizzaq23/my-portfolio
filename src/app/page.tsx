"use client";

import Cloud from "@/components/Cloud";
import Ground from "@/components/Ground";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import EndScene from "@/components/EndScene";
import useClouds from "@/hooks/useClouds";
import NavBar from "@/components/NavBar";
import Block from "@/components/Block";
import About from "@/components/About";
import Staircase from "@/components/Staircase";
import Platforms from "@/components/Platforms";
import Image from "next/image";

export default function Home() {
  const clouds = useClouds();

  return (
    <>
      {/* Top Navigation */}
      <NavBar />

      {/* === HERO SECTION === */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-sky-600">
        {clouds.map((cloud) => (
          <Cloud
            key={cloud.id}
            className="absolute"
            style={{
              top: cloud.top,
              left: `${cloud.left}%`,
              width: `${cloud.size}px`,
              height: `${cloud.size * 0.6}px`,
              opacity: cloud.opacity,
              transition: "left 0.1s linear, opacity 0.3s ease-in-out",
            }}
          />
        ))}

        <h1 className="text-6xl font-bold text-yellow-400 drop-shadow-lg mb-6">
          Hey, I&apos;m Quintin!
        </h1>

        <p className="text-xl max-w-xl text-white leading-relaxed">
          A Computer Engineering student who loves building{" "}
          <span className="text-green-400">AI tools</span>,{" "}
          <span className="text-red-400">video games</span>, and{" "}
          <span className="text-gray-200">web apps</span>. <br />
          Let&apos;s power up together!
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-6">
          <a href="#projects">
            <button className="px-6 py-3 bg-gray-200 text-black border-2 border-black transition transform active:translate-y-1 hover:scale-105">
              ▶ START <br /> VIEW PROJECTS
            </button>
          </a>
          <a href="#contact">
            <button className="px-6 py-3 bg-red-500 text-white border-2 border-black transition transform active:translate-y-1 hover:scale-105">
              ● SELECT <br /> CONTACT ME
            </button>
          </a>
        </div>

        {/* Floating Block Row */}
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

      {/* === PROJECTS SECTION === */}
      <div id="projects">
        <Projects />
      </div>

      {/* === ABOUT SECTION (NEW) === */}
      <About />

    

      {/* === CONTACT SECTION === */}
      <div id="contact">
        <Contact />
      </div>

      {/* Staircase and End Scene */}
      <Staircase />
      <EndScene />
    </>
  );
}
