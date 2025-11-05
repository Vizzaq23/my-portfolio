"use client";

import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden font-['Press_Start_2P'] text-xs sm:text-sm leading-relaxed"
    >
      {/* Background Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-500" />

      {/* Floating Clouds */}
      <div className="absolute top-8 left-0 w-full flex justify-center opacity-80">
        {Array.from({ length: 10 }).map((_, i) => (
          <Image
            key={i}
            src="/cloud-mario.svg"
            alt="cloud"
            width={64}
            height={32}
            className="mx-4 animate-float-slow"
          />
        ))}
      </div>

    

      {/* Ground Layer */}
      <div className="absolute bottom-0 left-0 flex w-full">
        {Array.from({ length: 50 }).map((_, i) => (
          <Image
            key={i}
            src="/groundtile.png"
            alt="ground"
            width={48}
            height={32}
            className="w-10 h-10"
          />
        ))}
      </div>

      {/* Text Box */}
      <div className="relative z-10 bg-[#b3d9ff]/90 border-4 border-yellow-400 rounded-2xl shadow-[6px_6px_0_#000] max-w-3xl mx-auto p-8">
        <h2 className="text-2xl sm:text-3xl text-red-600 mb-6 flex items-center justify-center gap-2 drop-shadow-[2px_2px_0_#fff]">
          <span>About Me</span>
          <span role="img" aria-label="mushroom">
            🍄
          </span>
        </h2>
        <p className="text-black mb-6">
          Hey there! I’m <span className="text-red-500">Quintin</span> — a computer engineer who
          loves building fun, creative projects that mix code, hardware, and a bit of nostalgia.
          From AI dashboards to pixel-style games, I’m always working on something new (and usually
          debugging it, too).
        </p>
        <p className="text-black">
          If you’ve got an idea, question, or just want to chat about games and tech — hit the block
          below and let’s connect!
        </p>
      </div>
    </section>
  );
}
