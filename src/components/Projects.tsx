"use client";

import { useState } from "react";
import Image from "next/image";

const projectArcade = {
  title: "Arcade Machine",
  year: "2021",
  description:
    "Designed and built a custom 2-player arcade box using Fusion 360, CNC, laser engraving, vinyl & decals. Loaded 5000+ vintage ROMs and added personal flair with stickers and saw my engineering + creative skills come alive.",
  image: "/projects/arcade-machine.jpg",
  link: "https://sites.google.com/view/quintinvizza-com/arcade-machine",
};

const projectLavender = {
  title: "Saint Anthony’s goes Lavender",
  year: "2021",
  description:
    "Collaborated with the Project Lavender initiative to design and fabricate custom coins & pins for the ‘Code Lavender’ wellness project. These tokens served as positive reminders for hospital workers.",
  image: "/projects/project-lavender-thumb.jpg",
  link: "https://www.stanthonyshs.org/project-lavender/",
};

const projects = [projectArcade, projectLavender];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevProject = () =>
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  const nextProject = () =>
    setCurrentIndex((prev) => (prev + 1) % projects.length);

  return (
    <section className="relative bg-sky-800 py-16 border-t-4 border-black overflow-hidden">
      {/* Section Title */}
      <h2 className="text-3xl text-center text-yellow-400 font-bold pixelated drop-shadow-[2px_2px_0px_#000] mb-10">
        Projects
      </h2>

      {/* Carousel Wrapper */}
      <div className="relative flex items-center justify-center">
        {/* Prev Arrow */}
        <button
          onClick={prevProject}
          className="absolute left-6 z-20 bg-black text-white text-2xl px-3 py-1 border-2 border-yellow-400 hover:scale-110 transition"
        >
          ◀
        </button>

        {/* Project Cards */}
        <div className="flex items-center justify-center w-full h-[420px] relative">
          {projects.map((p, i) => {
            const position =
              (i - currentIndex + projects.length) % projects.length;

            // base styles for all cards
            let styles =
              "absolute transition-all duration-500 ease-in-out flex flex-col justify-between";

            if (position === 0) {
              // Active card in center
              styles +=
                " scale-100 z-30 translate-x-0 opacity-100 hover:scale-105";
            } else if (position === 1) {
              // Next card
              styles +=
                " scale-75 z-20 translate-x-[260px] opacity-40";
            } else if (position === projects.length - 1) {
              // Previous card
              styles +=
                " scale-75 z-20 -translate-x-[260px] opacity-40";
            } else {
              // Hidden
              styles += " opacity-0";
            }

            return (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles} group pixelated w-[260px] min-h-[360px] bg-yellow-300 border-4 border-black shadow-[6px_6px_0px_#000] p-3 transition-all duration-300 hover:min-h-[480px] hover:z-50`}
              >
                {/* Image */}
                <div className="flex items-center justify-center h-28 bg-black border-2 border-white mb-2 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={160}
                    height={120}
                    className="object-contain pixelated w-full h-full"
                  />
                </div>

                {/* Title + Description */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-black leading-tight">
                    {p.title}
                  </h3>
                  <span className="text-[10px] text-gray-800">{p.year}</span>

                  {/* Short description normally, full on hover */}
                  <p className="text-xs text-black mt-1 leading-snug overflow-hidden line-clamp-4 group-hover:line-clamp-none group-hover:overflow-visible transition-all duration-300">
                    {p.description}
                  </p>
                </div>

                {/* Button pinned bottom */}
                <div className="mt-2 flex justify-center">
                  <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs border-2 border-black hover:scale-105 transition">
                    View Full Project →
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Next Arrow */}
        <button
          onClick={nextProject}
          className="absolute right-6 z-20 bg-black text-white text-2xl px-3 py-1 border-2 border-yellow-400 hover:scale-110 transition"
        >
          ▶
        </button>
      </div>
    </section>
  );
}
