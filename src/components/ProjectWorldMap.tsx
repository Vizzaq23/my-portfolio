"use client";

import { useRef, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import ProjectMapRunner from "@/components/ProjectMapRunner";
import { projectLevels } from "@/lib/project-map-route";

type Props = { currentIndex: number; onSelect: (index: number) => void };

export default function ProjectWorldMap({ currentIndex, onSelect }: Props) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = projects[currentIndex];

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % projects.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + projects.length) % projects.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = projects.length - 1;
    else return;
    event.preventDefault();
    onSelect(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className="project-map-canvas">
      <div className="project-map-intro">
        <p className="map-world-label">World 02 / Project map</p>
        <h2 id="projects-heading">Choose your next level.</h2>
        <p>Six projects. Six paths into my work.</p>
      </div>

      <div className="project-map-artboard">
        <Image src="/worlds/project-level-map.webp" alt="" fill sizes="100vw" className="project-level-art" />
        <nav className="project-levels" aria-label="Project levels">
          {projects.map((project, index) => {
            const level = projectLevels.find((item) => item.id === project.id)!;
            return (
              <button
                key={project.id}
                ref={(element) => { buttons.current[index] = element; }}
                className="project-level"
                type="button"
                style={{ "--level-x": `${level.x}%`, "--level-y": `${level.y}%` } as CSSProperties}
                aria-label={`Level ${index + 1}: ${project.title}`}
                aria-pressed={index === currentIndex}
                aria-controls={`project-panel-${project.id} project-map-preview`}
                onClick={() => onSelect(index)}
                onKeyDown={(event) => navigate(event, index)}
              >
                <span className="project-level-disc" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="project-level-name" aria-hidden="true">{level.label}</span>
              </button>
            );
          })}
        </nav>
        <ProjectMapRunner levelId={selected.id} />

        <div className="map-project-preview" id="project-map-preview">
          <div className="map-preview-image">
            <Image src={selected.image} alt="" fill sizes="360px" className="object-contain" />
          </div>
          <div className="map-preview-copy">
            <p className="map-preview-level">Level {String(currentIndex + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {selected.year}</p>
            <h3>{selected.title}</h3>
            <p className="map-preview-category">{selected.category}</p>
            <a className="map-details-link no-underline" href="#project-details">Explore this project <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <p className="project-map-hint">Select a numbered level to explore a project.</p>
      </div>
    </div>
  );
}
