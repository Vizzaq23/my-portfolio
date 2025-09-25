"use client";

import Image from "next/image";

export default function Contact() {
  return (
    <section className="relative min-h-[500px] bg-black border-t-4 border-blue-800 overflow-hidden">
      {/* Floating Brick Row */}
      <div className="absolute top-24 left-1/4 flex space-x-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <Image
            key={i}
            src="/Brickunder.png"
            alt="brick"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        ))}
      </div>

      {/* Pipe */}
      <div className="absolute bottom-8 left-10">
        <Image src="/pipe.png" alt="pipe" width={100} height={100} />
      </div>

      {/* Column */}
      <div className="absolute bottom-8 left-56">
        <Image src="/undergroundColumn.png" alt="column" width={24} height={80} />
      </div>

      {/* Enemy */}
      <div className="absolute bottom-8 right-20 animate-bounce">
        <Image src="/enemy.png" alt="enemy" width={40} height={40} />
      </div>

      {/* Contact Box */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white py-20">
        <h2 className="text-3xl font-bold text-yellow-400 pixelated drop-shadow-[2px_2px_0px_#000] mb-4">
          Contact Me
        </h2>
        <p className="mb-6 text-sm max-w-lg">
          Let’s connect and build something amazing together!
        </p>
        <a
          href="mailto:youremail@example.com"
          className="inline-block px-6 py-3 bg-red-500 text-white border-4 border-black shadow-[4px_4px_0px_#000] hover:scale-110 transition"
        >
          Email Me →
        </a>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 flex w-full">
        {Array.from({ length: 40 }).map((_, i) => (
          <Image
            key={i}
            src="/undergroundtile.png"
            alt="ground"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        ))}
      </div>
    </section>
  );
}
