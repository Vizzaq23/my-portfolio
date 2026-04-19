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
            src="/brickunder.png"
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
      <div className="absolute bottom-8 right-20 animate-bounce motion-reduce:animate-none">
        <Image src="/enemy.png" alt="enemy" width={40} height={40} />
      </div>

      {/* Contact Box */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white py-20">
        <h2 className="mb-4 font-display text-2xl font-bold text-brand-accent drop-shadow-[2px_2px_0px_#000] sm:text-3xl">
          Contact
        </h2>
        <p className="mb-6 max-w-lg font-sans text-sm leading-relaxed text-gray-200 sm:text-base">
          Open to internships and collaborative projects. Prefer email or LinkedIn — include your role
          and timeline for a faster reply.
        </p>

        <div className="flex flex-col gap-4 md:flex-row">
          <a
            href="mailto:qmviz23@gmail.com"
            className="no-underline inline-block border-4 border-black bg-red-500 px-6 py-3 font-display text-sm text-white shadow-[4px_4px_0px_#000] transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
          >
            Email
          </a>

          <a
            href="https://www.linkedin.com/in/quintin-vizza/"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline inline-block border-4 border-black bg-blue-600 px-6 py-3 font-display text-sm text-white shadow-[4px_4px_0px_#000] transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
          >
            LinkedIn
          </a>

          <a
            href="tel:+16317474494"
            className="no-underline inline-block border-4 border-black bg-green-600 px-6 py-3 font-display text-sm text-white shadow-[4px_4px_0px_#000] transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
          >
            Phone
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
