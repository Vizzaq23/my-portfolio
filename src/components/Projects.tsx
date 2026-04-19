"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const n = projects.length;

  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + n) % n);
  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % n);

  return (
    <section
      className="relative overflow-hidden border-t-4 border-black bg-cover bg-center py-16"
      style={{
        backgroundImage: "url('/bckground2.png')",
        backgroundSize: "60%",
        backgroundPosition: "center top",
      }}
      aria-labelledby="projects-heading"
    >
      <div className="absolute inset-0 z-0 bg-black/40" />

      <h2
        id="projects-heading"
        className="relative z-10 mb-8 text-center font-display text-2xl font-bold text-brand-accent drop-shadow-[3px_3px_0px_#000] sm:mb-10 sm:text-3xl"
      >
        <span className="rounded bg-black/70 px-4 py-1">Projects</span>
      </h2>

      {/* Mobile / tablet: scannable grid */}
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:hidden">
        {projects.map((p) => (
          <div key={p.id} className="flex justify-center">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {/* Desktop: carousel */}
      <div className="relative z-10 hidden lg:block">
        <div className="relative flex h-[460px] items-center justify-center">
          <div className="pointer-events-none relative flex h-full w-full items-center justify-center">
            {projects.map((p, i) => {
              const position = (i - currentIndex + n) % n;
              let posClass =
                "absolute transition-all duration-500 ease-in-out pointer-events-auto flex justify-center";

              if (position === 0) {
                posClass += " z-30 translate-x-0 scale-100 opacity-100 hover:scale-105";
              } else if (position === 1) {
                posClass += " z-20 translate-x-[280px] scale-75 opacity-40";
              } else if (position === n - 1) {
                posClass += " z-20 -translate-x-[280px] scale-75 opacity-40";
              } else {
                posClass += " opacity-0";
              }

              return (
                <div key={p.id} className={posClass}>
                  <ProjectCard project={p} />
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={prevProject}
            className="pointer-events-auto absolute left-6 z-50 border-2 border-yellow-400 bg-black px-3 py-1 font-display text-2xl text-white transition hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
            aria-label="Previous project"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={nextProject}
            className="pointer-events-auto absolute right-6 z-50 border-2 border-yellow-400 bg-black px-3 py-1 font-display text-2xl text-white transition hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
            aria-label="Next project"
          >
            ▶
          </button>
        </div>

        <div
          className="relative z-10 mt-6 flex justify-center gap-3"
          role="tablist"
          aria-label="Choose project"
        >
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Show project: ${p.title}`}
              onClick={() => setCurrentIndex(i)}
              className={`h-4 w-4 rounded-full border-2 border-black pixelated transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 ${
                i === currentIndex ? "scale-110 bg-yellow-400" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
