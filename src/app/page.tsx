"use client";

import Cloud from "@/components/Cloud";
import Block from "@/components/Block";
import Ground from "@/components/Ground";
import Projects from "@/components/Projects";
import useClouds from "@/hooks/useClouds";

export default function Home() {
  const clouds = useClouds();

  return (
    <>
      <section className="relative flex flex-col items-center justify-center h-[90vh] text-center bg-gradient-to-b from-sky-400 to-sky-200 text-white overflow-hidden rounded-2xl shadow-lg">
        {/* Clouds */}
        {clouds.map((cloud) => (
          <Cloud key={cloud.id} {...cloud} />
        ))}

        {/* Hero Content */}
        <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to My Portfolio
        </h2>
        <p className="text-lg mb-8 max-w-xl">
          I’m a Computer Engineering student passionate about building AI tools,
          games, and web apps. Let’s level up together!
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <a
            href="#projects"
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold shadow-md hover:scale-105 transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="bg-green-400 text-black px-6 py-3 rounded-lg font-bold shadow-md hover:scale-105 transition"
          >
            Contact Me
          </a>
        </div>

        {/* Floating Blocks */}
        <div className="absolute bottom-32 left-1/4 flex space-x-4">
          <Block type="brick" />
          <Block type="question" />
          <Block type="brick" />
        </div>

        {/* Ground */}
        <Ground />
      </section>

      {/* Projects */}
      <Projects />
    </>
  );
}
