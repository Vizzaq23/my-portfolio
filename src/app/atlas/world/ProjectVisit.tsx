"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import ProjectNotes from "./ProjectNotes";

export default function ProjectVisit({ project, onClose, returnTo }: {
  project: Project | null;
  onClose: () => void;
  returnTo: React.RefObject<HTMLElement | null>;
}) {
  const title = useRef<HTMLHeadingElement>(null);
  return <Dialog.Root open={project !== null} onOpenChange={open => { if (!open) onClose(); }}>
    <Dialog.Portal>
      <Dialog.Overlay className="journey-visit-overlay" />
      <Dialog.Content className={"journey-visit atlas-visit" + (project?.id === "pinball" ? " atlas-arcade-room" : "")} aria-describedby={undefined}
        onOpenAutoFocus={event => { event.preventDefault(); title.current?.focus(); }}
        onCloseAutoFocus={event => { event.preventDefault(); returnTo.current?.focus({ preventScroll: true }); }}>
        {project && <>
          <div className="journey-visit-toolbar">
            <span>{project.id === "pinball" ? "Inside Pioneer Arcade" : "Project field notes"} <span aria-hidden="true">/</span> {project.year}</span>
            <Dialog.Close className="journey-button journey-close">Back to world <span aria-hidden="true">×</span></Dialog.Close>
          </div>
          {project.id === "pinball" && <div className="atlas-room-intro" aria-hidden="true"><span className="atlas-room-lamp" /><span className="atlas-room-sign">PIONEER<br /><strong>ARCADE</strong></span><span className="atlas-room-caption">THE BUILD BEHIND THE GAME<br /><small>Python · Pygame · Raspberry Pi</small></span><span className="atlas-room-lamp" /></div>}
          <div className="journey-visit-body" data-visit-project={project.id}>
            <p className="journey-eyebrow">{project.category}{project.badge ? ` · ${project.badge}` : ""}</p>
            <Dialog.Title ref={title} tabIndex={-1}>{project.title}</Dialog.Title>
            <ProjectNotes project={project} />
          </div>
        </>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
