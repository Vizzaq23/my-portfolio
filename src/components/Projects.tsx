"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectDemo from "@/components/ProjectDemo";
import ArcadeHover from "@/components/ArcadeHover";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import ExpandableProjects from "@/components/expandable-card-demo-standard";
import ProjectDisclosure from "@/components/ProjectDisclosure";
import ProjectWorldMap from "@/components/ProjectWorldMap";
import ProjectBackdrop from "@/components/ProjectBackdrop";
import OnePieceEasterEgg from "@/components/OnePieceEasterEgg";
import { projects, featuredProjects } from "@/data/projects";
import styles from "@/app/home-refresh.module.css";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selected = projects[currentIndex];
  const changeProject = (step: number) => setCurrentIndex((index) => (index + step + projects.length) % projects.length);

  return (
    <section className="project-world relative" aria-labelledby="featured-projects-heading">
      <div className={styles.selectedWork}>
        <div className={styles.workInner}>
        <header className={styles.workHeading}>
          <div><h2 id="featured-projects-heading">Made to be played.<br />Built to work.</h2>
          <p>Selected projects in software, games, and everything between.</p></div>
          <a href="#all-projects" className={styles.allProjects}>Explore all {projects.length} projects <span aria-hidden="true">↘</span></a>
        </header>
        <div className={styles.featuredGrid}>
          {featuredProjects.map((project) => (
            <ArcadeHover key={project.id} className={`${styles.projectCard} ${project.id === "tcg-shelf" ? styles.leadProject : styles.sideProject}`}>
              <GlowingEffect disabled={false} variant="gold" spread={45} proximity={40} inactiveZone={0.15} borderWidth={3} movementDuration={0.3} className="z-30" />
              <ProjectDemo id={project.id} title={project.title} image={project.image} imageAlt={project.imageAlt} />
              <div className={styles.projectBody}>
              <p className={styles.category}>{project.category} <span>{project.year}</span></p>
              <h3>{project.title}</h3>
              <p className={styles.summary}>{project.summary}</p>
              <p className={styles.tags}>{project.tags.join(" · ")}</p>
              <ProjectDisclosure title="Engineering highlights" className="mt-4">
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
              </ProjectDisclosure>
              <div className={styles.projectLinks}>
                {project.link ? <a className="inline-flex min-h-11 items-center underline" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel} ↗</a> : <span className="inline-flex min-h-11 items-center text-sm text-slate-600">{project.status}</span>}
                {project.id === "tcg-shelf" && <a className="inline-flex min-h-11 items-center underline" href="https://github.com/Vizzaq23/TCG" target="_blank" rel="noopener noreferrer">View code ↗</a>}
                {project.id === "tcg-shelf" && <Link className="inline-flex min-h-11 items-center underline" href="/projects/tcg-shelf">Engineering case study →</Link>}
              </div>
              </div>
            </ArcadeHover>
          ))}
        </div>
        <div className={styles.mapInvitation}><p>There&apos;s more beyond the featured work.</p><a href="#all-projects">Enter the project world <span aria-hidden="true">↓</span></a></div>
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
            <p className="small-label text-amber-200">Open a project cartridge</p>
            <div className="flex items-center gap-3">
              <span className="project-count font-sans text-sm tabular-nums text-slate-200" aria-hidden="true">{String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
              <button className="project-step" type="button" aria-label="Previous project" onClick={() => changeProject(-1)}>←</button>
              <button className="project-step" type="button" aria-label="Next project" onClick={() => changeProject(1)}>→</button>
            </div>
          </div>
          <ExpandableProjects currentIndex={currentIndex} onSelect={setCurrentIndex} />
          <p className="sr-only" aria-live="polite" aria-atomic="true">Showing project {currentIndex + 1} of {projects.length}: {selected.title}</p>
      </div>
      </div>
    </section>
  );
}
