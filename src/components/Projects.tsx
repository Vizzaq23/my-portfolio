"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectDemo from "@/components/ProjectDemo";
import ProjectCard from "@/components/ProjectCard";
import ProjectDisclosure from "@/components/ProjectDisclosure";
import ProjectWorldMap from "@/components/ProjectWorldMap";
import ProjectBackdrop from "@/components/ProjectBackdrop";
import OnePieceEasterEgg from "@/components/OnePieceEasterEgg";
import { projects, featuredProjects } from "@/data/projects";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selected = projects[currentIndex];
  const changeProject = (step: number) => setCurrentIndex((index) => (index + step + projects.length) % projects.length);

  return (
    <section className="project-world relative" aria-labelledby="featured-projects-heading">
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-12 font-sans">
        <h2 id="featured-projects-heading" className="text-3xl font-bold text-slate-950">Selected engineering work</h2>
        <p className="mt-3 text-lg text-slate-950">Three featured builds. Explore the map below for all nine projects, including my latest AI and research work.</p>
        <a href="#all-projects" className="mt-3 inline-flex min-h-11 items-center font-semibold text-slate-950 underline underline-offset-4">Explore all {projects.length} projects →</a>
        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <article key={project.id} className="featured-glass-card text-slate-950">
              <ProjectDemo id={project.id} title={project.title} image={project.image} imageAlt={project.imageAlt} />
              <div className="featured-glass-body">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-600">{project.category}{project.badge === "NEW" ? " · NEW" : ""}</p>
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-3 leading-relaxed">{project.summary}</p>
              <p className="mt-3 text-sm font-semibold">{project.tags.join(" · ")}</p>
              <ProjectDisclosure title="Engineering highlights" className="mt-4">
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
              </ProjectDisclosure>
              <div className="mt-5 flex flex-wrap gap-4 font-semibold text-blue-800">
                {project.link ? <a className="inline-flex min-h-11 items-center underline" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel} ↗</a> : <span className="inline-flex min-h-11 items-center text-sm text-slate-600">{project.status}</span>}
                {project.id === "tcg-shelf" && <a className="inline-flex min-h-11 items-center underline" href="https://github.com/Vizzaq23/TCG" target="_blank" rel="noopener noreferrer">View code ↗</a>}
                {project.id === "tcg-shelf" && <Link className="inline-flex min-h-11 items-center underline" href="/projects/tcg-shelf">Engineering case study →</Link>}
              </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div id="all-projects" className="scroll-mt-40" tabIndex={-1}>
        <ProjectWorldMap currentIndex={currentIndex} onSelect={setCurrentIndex} />
      </div>
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
