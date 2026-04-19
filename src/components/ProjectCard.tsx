import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export default function ProjectCard({ project, className = "" }: ProjectCardProps) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group pixelated flex w-full max-w-[260px] min-h-[360px] flex-col justify-between border-4 border-black bg-yellow-300 p-3 shadow-[6px_6px_0px_#000] transition-all duration-300 hover:min-h-[420px] hover:z-50 sm:max-w-[280px] ${className}`}
    >
      <div className="mb-2 flex h-28 items-center justify-center overflow-hidden border-2 border-black bg-black">
        <Image
          src={project.image}
          alt={project.title}
          width={160}
          height={120}
          unoptimized={project.image.endsWith(".svg")}
          className="h-full w-full object-contain pixelated"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="font-display text-base font-bold leading-tight text-black sm:text-lg">
          {project.title}
        </h3>
        <span className="font-display text-[10px] text-gray-800">{project.year}</span>
        <ul className="mt-2 flex flex-wrap gap-1" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm bg-black/10 px-1.5 py-0.5 font-sans text-[9px] font-medium text-black sm:text-[10px]"
            >
              {tag}
            </li>
          ))}
        </ul>
        <p className="mt-2 font-sans text-xs leading-snug text-black line-clamp-4 group-hover:line-clamp-none">
          {project.summary}
        </p>
        {project.detail ? (
          <p className="mt-2 hidden font-sans text-[11px] leading-snug text-ink-muted group-hover:block">
            {project.detail}
          </p>
        ) : null}
      </div>

      <div className="mt-3 flex justify-center">
        <span className="inline-block border-2 border-black bg-red-500 px-3 py-1 font-display text-xs text-white transition group-hover:scale-105">
          {project.linkLabel} →
        </span>
      </div>
    </a>
  );
}
