"use client";

import Image from "next/image";

export default function Contact() {
  return (
    <section className="relative min-h-[500px] bg-black border-t-4 border-blue-800 overflow-hidden">
      {/* Floating Brick Row */}
      <div className="absolute top-0 left-0 w-full flex justify-center">
        {Array.from({ length: 33 }).map((_, i) => (
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

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="qmviz23@gmail.com"
            className="inline-block px-6 py-3 bg-red-500 text-white border-4 border-black shadow-[4px_4px_0px_#000] hover:scale-110 transition"
          >
            Email Me →
          </a>

          <a
            href="https://www.linkedin.com/in/quintin-vizza/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white border-4 border-black shadow-[4px_4px_0px_#000] hover:scale-110 transition"
          >
            LinkedIn →
          </a>

          <a
            href="tel:+16317474494"
            className="inline-block px-6 py-3 bg-green-500 text-white border-4 border-black shadow-[4px_4px_0px_#000] hover:scale-110 transition"
          >
            Call Me →
          </a>
        </div>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 flex w-full">
        {Array.from({ length: 50 }).map((_, i) => (
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
