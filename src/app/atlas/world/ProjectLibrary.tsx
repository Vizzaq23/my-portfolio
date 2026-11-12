import Image from "next/image";
import { journeyProjects } from "./journey";
import ProjectNotes from "./ProjectNotes";

export default function ProjectLibrary() {
  return <section className="journey-library" aria-labelledby="journey-library-title">
    <div className="journey-library-heading">
      <div><p className="journey-eyebrow">THE COMPLETE COLLECTION / {journeyProjects.length} PROJECTS</p><h2 id="journey-library-title">Things I’ve built.</h2></div>
      <p>Software, hardware, and the space between.<br />Open a project for the full story.</p>
    </div>
    <div className="journey-library-list">
      {journeyProjects.map(({ project }, index) => <details key={project.id} className="journey-library-project" id={`notes-${project.id}`}>
        <summary>
          <span className="journey-library-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span className="journey-library-thumbnail"><Image src={project.image} alt="" fill sizes="(max-width: 767px) 64px, 112px" unoptimized={project.image.endsWith(".svg")} className="object-cover" loading="lazy" /></span>
          <span className="journey-library-label"><span>{project.category}{project.badge ? " · NEW" : ""}</span><h3>{project.title}</h3><span className="journey-library-status">{project.status ?? project.tags.slice(0, 3).join(" · ")}</span></span>
          <span className="journey-library-year">{project.year}</span><span className="journey-library-expand" aria-hidden="true">+</span>
        </summary>
        <div className="journey-library-notes" data-library-project={project.id}><ProjectNotes project={project} inLibrary /></div>
      </details>)}
    </div>
    <noscript><p className="journey-nojs-note">Video links: <a href="/demos/tcg-20260911.mp4">TCG Shelf walkthrough</a> · <a href="/demos/trainer-20260911.mp4">Combat Trainer walkthrough</a> · <a href="https://www.linkedin.com/feed/update/urn:li:activity:7453827527732539392/">Pinball showcase</a></p></noscript>
  </section>;
}
