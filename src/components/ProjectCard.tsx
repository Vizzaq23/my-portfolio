import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  className?: string;
  /** Expanded layout used in the project browser. */
  featured?: boolean;
};

const cardShell =
  "project-cartridge relative flex h-full w-full max-w-[400px] flex-col border-4 border-black bg-white p-4 shadow-[6px_6px_0px_#000] transition duration-300";

export default function ProjectCard({
  project,
  className = "",
  featured = false,
}: ProjectCardProps) {
  const hasLink = Boolean(project.link);
  const shellClass = `${cardShell} ${featured ? "project-featured" : ""} ${className}`;

  return (
    <article className={shellClass} data-project-id={project.id}>
      <header className="project-card-heading">
        <div className="project-meta">
          <p className="project-category small-label">{project.category}</p>
          {project.badge === "NEW" ? <span className="project-new">NEW</span> : null}
          <span className="project-year">{project.year}</span>
        </div>
        <h3 className="font-sans text-xl font-bold leading-tight text-ink">{project.title}</h3>
      </header>

      <div className="project-preview relative mb-4 aspect-[16/9] w-full overflow-hidden border-2 border-black bg-black">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 800px) 90vw, 440px"
          unoptimized={project.image.endsWith(".svg")}
          className="object-cover"
          loading="lazy"
        />
      </div>

      <div className="project-copy flex flex-1 flex-col">
        <p className="project-summary font-sans text-base leading-relaxed text-ink">{project.summary}</p>

        <ul className="project-technologies mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-slate-300 bg-slate-100 px-2 py-1 font-sans text-xs font-semibold text-slate-800"
            >
              {tag}
            </li>
          ))}
        </ul>

        <p className="small-label project-highlights-label">Engineering highlights</p>
        <ul className="project-highlights mt-4 space-y-3 font-sans text-base leading-relaxed text-slate-700">
          {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        {project.detail ? (
          <details className="project-details mt-4 border-t border-slate-300 pt-3 font-sans">
            <summary className="cursor-pointer text-sm font-semibold text-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-800">Technical details</summary>
            <p className="mt-3 text-base leading-relaxed text-slate-700">{project.detail}</p>
          </details>
        ) : null}
        <div className="project-footer mt-5 flex">
          {hasLink ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — ${project.linkLabel} (opens in a new tab)`} className="no-underline inline-flex min-h-11 w-full items-center justify-center rounded border-2 border-red-950 bg-red-700 px-3 py-2 font-display text-[11px] leading-relaxed text-white transition hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-800">
              {project.linkLabel}
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span
              className="inline-block border-2 border-black bg-amber-400 px-3 py-1 font-display text-[10px] text-black"
              aria-label={`Status: ${project.status ?? "Unavailable"}`}
            >
              {project.status ?? "Unavailable"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
