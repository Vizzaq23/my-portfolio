"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectWorldMap from "@/components/ProjectWorldMap";
import ProjectBackdrop from "@/components/ProjectBackdrop";
import OnePieceEasterEgg from "@/components/OnePieceEasterEgg";
import { projects } from "@/data/projects";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selected = projects[currentIndex];
  const changeProject = (step: number) => setCurrentIndex((index) => (index + step + projects.length) % projects.length);

  return (
    <section className="project-world relative" aria-labelledby="projects-heading">
      <ProjectWorldMap currentIndex={currentIndex} onSelect={setCurrentIndex} />
      <div className="project-detail-world">
        <ProjectBackdrop />
        <OnePieceEasterEgg kind="zoro" placement="project-island" />
        <div className="project-browser project-detail-dock relative z-10 mx-auto" id="project-details" tabIndex={-1}>
          <div className="project-browser-toolbar">
            <p className="small-label text-amber-200">Inside the project</p>
            <div className="flex items-center gap-3">
              <span className="project-count font-sans text-sm tabular-nums text-slate-200" aria-hidden="true">{String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
              <button className="project-step" type="button" aria-label="Previous project" onClick={() => changeProject(-1)}>←</button>
              <button className="project-step" type="button" aria-label="Next project" onClick={() => changeProject(1)}>→</button>
            </div>
          </div>
          <div className="project-stage">
            {projects.map((project, index) => (
              <div id={"project-panel-" + project.id} key={project.id} hidden={index !== currentIndex}>
                <ProjectCard project={project} featured />
              </div>
            ))}
          </div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">Showing project {currentIndex + 1} of {projects.length}: {selected.title}</p>
      </div>
      </div>
    </section>
  );
}
