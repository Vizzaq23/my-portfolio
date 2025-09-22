"use client";

import Cloud from "@/components/Cloud";
import Ground from "@/components/Ground";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import EndScene from "@/components/EndScene";
import useClouds from "@/hooks/useClouds";
import QuestionBlock from "@/components/QuestionBlock";
import NavBar from "@/components/NavBar";

export default function Home() {
  const clouds = useClouds();

  return (
    <>
      {/* NavBar */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[90vh] pt-24 text-center bg-gradient-to-b from-sky-400 to-sky-200 text-white overflow-hidden shadow-lg">
        {/* Clouds */}
        {clouds.map((cloud) => (
          <Cloud key={cloud.id} {...cloud} />
        ))}

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-[2px_2px_0px_#000000] text-yellow-300">
          Hey, I’m Quintin!
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-white drop-shadow-[1px_1px_0px_#000000]">
          A Computer Engineering student who loves building{" "}
          <span className="text-green-300 font-bold">AI tools</span>,{" "}
          <span className="text-red-400 font-bold">video games</span>, and{" "}
          <span className="text-blue-300 font-bold">web apps</span>. Let’s power up
          together!
        </p>

        {/* NES-style Buttons */}
        <div className="flex space-x-6">
          <a
            href="#projects"
            className="bg-gray-300 text-black px-8 py-3 rounded-sm font-bold uppercase tracking-widest 
                       shadow-[3px_3px_0px_#000000] border border-black
                       hover:translate-y-[-3px] hover:shadow-[4px_4px_0px_#000000] 
                       transition flex flex-col items-center"
          >
            ⏯ START
            <span className="text-xs font-normal mt-1">View Projects</span>
          </a>

          <a
            href="#contact"
            className="bg-red-500 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest 
                       shadow-[3px_3px_0px_#000000] border border-black
                       hover:translate-y-[-3px] hover:shadow-[4px_4px_0px_#000000] 
                       transition flex flex-col items-center"
          >
            ⏺ SELECT
            <span className="text-xs font-normal mt-1">Contact Me</span>
          </a>
        </div>

        {/* Interactive Blocks */}
        <div className="absolute bottom-32 flex justify-center space-x-4">
          <QuestionBlock />
          <QuestionBlock />
          <QuestionBlock />
        </div>

         {/* Ground + End Scene anchored to bottom */}
        <div className="absolute bottom-0 left-0 w-full flex items-end justify-end">
          <Ground />
          <EndScene />
        </div>
      </section>
  {/* === Projects Section === */}
      <Projects />

      {/* === Contact Section === */}
      <Contact />
    </>
  );
}
