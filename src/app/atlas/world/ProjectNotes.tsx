"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import ProjectDemo from "@/components/ProjectDemo";
import { trackPortfolioEvent } from "@/lib/analytics";

/** Shared complete content for world visits and the native, server-rendered reading list. */
export default function ProjectNotes({ project, inLibrary = false }: { project: Project; inLibrary?: boolean }) {
  const Heading = inLibrary ? "h4" : "h3";
  return <>
    <p className="journey-visit-summary">{project.summary}</p>
    <div className="journey-visit-columns">
      <div className="journey-visit-evidence">
        <div className="journey-project-image">
          <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) 90vw, 500px" unoptimized={project.image.endsWith(".svg")} className="object-contain" loading="lazy" />
        </div>
        {["pinball", "tcg-shelf", "adaptive-shooter"].includes(project.id) && <div className="journey-demo"><Heading>See it in action</Heading><ProjectDemo id={project.id} title={project.title} image={project.image} imageAlt={project.imageAlt} /></div>}
      </div>
      <div className="journey-visit-copy">
        <Heading>Engineering highlights</Heading>
        <ul className="journey-highlights">{project.highlights.map(item => <li key={item}>{item}</li>)}</ul>
        {project.detail && <><Heading>Technical details</Heading><p>{project.detail}</p></>}
        <Heading>Built with</Heading>
        <ul className="journey-tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        <div className="journey-visit-links">
          {project.link ? <a className="journey-button journey-button-gold" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${project.linkLabel} — ${project.title} (opens in a new tab)`} onClick={() => trackPortfolioEvent("project_link_click", {project_id: project.id, target: project.linkLabel ?? "external"})}>{project.linkLabel} ↗</a> : <p className="journey-project-status">{project.status}</p>}
          {project.id === "tcg-shelf" && <><Link className="journey-button" href="/projects/tcg-shelf">Engineering case study →</Link><a className="journey-text-link" href="https://github.com/Vizzaq23/TCG" target="_blank" rel="noopener noreferrer">View TCG Shelf code ↗</a></>}
        </div>
      </div>
    </div>
  </>;
}
