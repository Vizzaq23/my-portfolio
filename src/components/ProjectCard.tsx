import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  className?: string;
  /** Emphasize the active carousel card */
  active?: boolean;
};

const cardShell =
  "pixelated relative flex h-full w-full max-w-[280px] min-h-[420px] flex-col border-4 border-black bg-yellow-300 p-3 shadow-[6px_6px_0px_#000] transition duration-300";

export default function ProjectCard({
  project,
  className = "",
  active = false,
}: ProjectCardProps) {
  const hasLink = Boolean(project.link);
  const shellClass = `${cardShell} ${
    active ? "ring-4 ring-brand-accent ring-offset-2 ring-offset-black" : ""
  } ${hasLink ? "hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000]" : ""} ${className}`;

  const content = (
    <>
      {project.badge === "NEW" ? (
        <span className="absolute -left-2 -top-2 z-10 border-2 border-black bg-red-500 px-2 py-0.5 font-display text-[9px] text-white shadow-[2px_2px_0_#000]">
          NEW
        </span>
      ) : null}

      <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden border-2 border-black bg-black">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 1024px) 280px, 280px"
          unoptimized={project.image.endsWith(".svg")}
          className="object-cover pixelated"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-sm font-bold leading-tight text-black sm:text-base">
            {project.title}
          </h3>
          <span className="shrink-0 font-display text-[9px] text-gray-800">
            {project.year}
          </span>
        </div>

        <ul className="mt-2 flex flex-wrap gap-1" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-black/20 bg-black/10 px-1.5 py-0.5 font-sans text-[9px] font-medium text-black sm:text-[10px]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <p className="mt-2 font-sans text-xs leading-snug text-black">
          {project.summary}
        </p>
        {project.detail ? (
          <p className="mt-2 line-clamp-4 font-sans text-[11px] leading-snug text-ink-muted">
            {project.detail}
          </p>
        ) : null}
      </div>

      <div className="mt-3 flex justify-center">
        {hasLink ? (
          <span className="inline-block border-2 border-black bg-red-500 px-3 py-1 font-display text-xs text-white">
            {project.linkLabel}
          </span>
        ) : (
          <span
            className="inline-block border-2 border-black bg-amber-400 px-3 py-1 font-display text-[10px] text-black"
            aria-label={`Status: ${project.status ?? "Unavailable"}`}
          >
            {project.status ?? "Unavailable"}
          </span>
        )}
      </div>
    </>
  );

  if (hasLink && project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`no-underline ${shellClass}`}
        aria-label={`${project.title} — ${project.linkLabel} (opens in a new tab)`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={shellClass} aria-label={`${project.title} — ${project.status}`}>
      {content}
    </div>
  );
}
