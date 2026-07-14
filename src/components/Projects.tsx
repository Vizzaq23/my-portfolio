"use client";

import { useCallback, useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import WorldLabel from "@/components/WorldLabel";
import { projects } from "@/data/projects";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const n = projects.length;

  const prevProject = useCallback(
    () => setCurrentIndex((prev) => (prev - 1 + n) % n),
    [n]
  );
  const nextProject = useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % n),
    [n]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prevProject();
      if (event.key === "ArrowRight") nextProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevProject, nextProject]);

  return (
    <section
      className="relative overflow-hidden border-t-4 border-black bg-cover bg-center py-14 sm:py-16"
      style={{
        backgroundImage: "url('/bckground2.png')",
        backgroundSize: "60%",
        backgroundPosition: "center top",
      }}
      aria-labelledby="projects-heading"
    >
      <div className="absolute inset-0 z-0 bg-black/40" />

      <div className="relative z-10 mb-8 sm:mb-10">
        <WorldLabel world={2} subtitle="Project Map" tone="dark" />
        <h2
          id="projects-heading"
          className="text-center font-display text-2xl font-bold text-brand-accent drop-shadow-[3px_3px_0px_#000] sm:text-3xl"
        >
          <span className="rounded bg-black/70 px-4 py-1">Projects</span>
        </h2>
      </div>

      {/* Mobile / tablet: scannable grid */}
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:gap-8 lg:hidden">
        {projects.map((p) => (
          <div key={p.id} className="flex justify-center">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {/* Desktop: carousel */}
      <div className="relative z-10 hidden lg:block">
        <div className="relative mx-auto flex h-[480px] max-w-5xl items-center justify-center px-16">
          <div className="pointer-events-none relative flex h-full w-full items-center justify-center">
            {projects.map((p, i) => {
              const position = (i - currentIndex + n) % n;
              let posClass =
                "absolute transition-all duration-500 ease-in-out motion-reduce:transition-none pointer-events-auto flex justify-center";

              if (position === 0) {
                posClass += " z-30 translate-x-0 scale-100 opacity-100";
              } else if (position === 1) {
                posClass += " z-20 translate-x-[260px] scale-[0.82] opacity-55";
              } else if (position === n - 1) {
                posClass += " z-20 -translate-x-[260px] scale-[0.82] opacity-55";
              } else {
                posClass += " pointer-events-none scale-50 opacity-0";
              }

              return (
                <div key={p.id} className={posClass} aria-hidden={position !== 0}>
                  {position === 0 ? (
                    <span
                      className="pointer-events-none absolute -left-7 top-1/2 z-40 -translate-y-1/2 font-display text-brand-accent drop-shadow-[2px_2px_0_#000] motion-reduce:hidden"
                      aria-hidden
                    >
                      ▶
                    </span>
                  ) : null}
                  <ProjectCard project={p} active={position === 0} />
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={prevProject}
            className="pointer-events-auto absolute left-2 z-50 min-h-11 min-w-11 border-2 border-yellow-400 bg-black px-3 py-2 font-display text-xs text-white transition hover:bg-yellow-400 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
            aria-label="Previous project"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={nextProject}
            className="pointer-events-auto absolute right-2 z-50 min-h-11 min-w-11 border-2 border-yellow-400 bg-black px-3 py-2 font-display text-xs text-white transition hover:bg-yellow-400 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
            aria-label="Next project"
          >
            Next
          </button>
        </div>

        {/* Pixel progress bar */}
        <div
          className="relative z-10 mx-auto mt-4 h-3 w-64 max-w-[70%] overflow-hidden border-2 border-black bg-black/60"
          aria-hidden
        >
          <div
            className="h-full bg-brand-accent transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${((currentIndex + 1) / n) * 100}%` }}
          />
        </div>

        <div
          className="relative z-10 mt-4 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Choose project"
        >
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={i === currentIndex}
              aria-label={`Show project: ${p.title}`}
              onClick={() => setCurrentIndex(i)}
              className={`h-4 w-4 border-2 border-black pixelated transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 ${
                i === currentIndex
                  ? "scale-110 bg-yellow-400"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <p className="relative z-10 mt-3 text-center font-sans text-xs text-white/80" aria-live="polite">
          {projects[currentIndex]?.title}
        </p>
      </div>
    </section>
  );
}
