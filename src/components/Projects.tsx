"use client";

import Image from "next/image";

const projects = [
  {
    title: "Arcade Machine",
    year: "2021",
    description:
      "Designed and built a custom 2-player arcade box using Fusion 360, CNC, laser engraving, vinyl & decals. Loaded 5000+ vintage ROMs and decorated with retro decals — my proudest early project combining engineering + creativity.",
    image: "/projects/arcade-machine.png", // place screenshot here
    link: "https://sites.google.com/view/quintinvizza-com/arcade-machine",
  },
  // Add more projects later
];

export default function Projects() {
  return (
    <section className="relative bg-sky-700 py-16 border-t-8 border-black">
      {/* Section Title */}
      <h2 className="text-4xl text-center text-yellow-400 font-bold pixelated drop-shadow-[3px_3px_0px_#000] mb-12">
        Projects
      </h2>

      {/* Grid of Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-8 md:px-20">
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-300 border-4 border-black shadow-[6px_6px_0px_#000] hover:-translate-y-2 hover:shadow-[8px_8px_0px_#000] transition-transform transform flex flex-col items-center p-4 pixelated"
          >
            {/* Project Image */}
            <div className="w-full h-40 bg-black flex items-center justify-center mb-4 border-2 border-white">
              <Image
                src={p.image}
                alt={p.title}
                width={250}
                height={160}
                className="pixelated object-contain"
              />
            </div>

            {/* Title + Year */}
            <h3 className="text-lg font-bold text-black text-center">
              {p.title}
            </h3>
            <span className="text-xs text-gray-800">{p.year}</span>

            {/* Description */}
            <p className="text-sm text-black text-center mt-2 leading-relaxed">
              {p.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
