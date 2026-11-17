"use client";

// Aceternity UI / Manu Arora: CLI-installed expandable-card-demo-standard.
// Original source: vendor/ui/expandable-card-demo-standard.json.
// Retains shared card/image/title layout animation; adds portfolio data and Radix accessibility.
import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects, type Project } from "@/data/projects";
import styles from "./expandable-projects.module.css";

export default function ExpandableProjects({ currentIndex, onSelect }: {
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  const [active, setActive] = useState<Project | null>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  const id = useId();
  const reducedMotion = useReducedMotion();
  const layoutId = (part: string, project: Project) => reducedMotion ? undefined : `${part}-${project.id}-${id}`;

  return (
    <Dialog.Root open={active !== null} onOpenChange={(open) => { if (!open) setActive(null); }}>
      <ul className={styles.list} aria-label="Expandable project cards">
        {projects.map((project, index) => (
          <li key={project.id}>
            <motion.button
              type="button"
              id={`project-panel-${project.id}`}
              layoutId={layoutId("card", project)}
              className={styles.card}
              data-selected={currentIndex === index}
              aria-label={`Explore ${project.title}`}
              aria-haspopup="dialog"
              onClick={(event) => { origin.current = event.currentTarget; onSelect(index); setActive(project); }}
            >
              <motion.span className={styles.thumbnail} layoutId={layoutId("image", project)}>
                <Image src={project.image} alt="" width={112} height={84} className={styles.image} />
              </motion.span>
              <span className={styles.cardCopy}>
                <span className={styles.meta}>Level {String(index + 1).padStart(2, "0")} · {project.year}</span>
                <motion.span className={styles.title} layoutId={layoutId("title", project)}>{project.title}</motion.span>
                <motion.span className={styles.category} layoutId={layoutId("description", project)}>{project.category}</motion.span>
              </span>
              <span className={styles.open} aria-hidden="true">Explore ↗</span>
            </motion.button>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {active && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }} />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount onCloseAutoFocus={(event) => { event.preventDefault(); origin.current?.focus(); }}>
              <motion.div className={styles.dialog} layoutId={layoutId("card", active)} transition={{ duration: reducedMotion ? 0 : 0.25 }}>
                <div className={styles.dialogBar}>
                  <span className={styles.meta}>Project cartridge · {active.year}</span>
                  <Dialog.Close className={styles.close} aria-label="Close project details">Close ×</Dialog.Close>
                </div>
                <div className={styles.scroll}>
                  <motion.div className={styles.heroImage} layoutId={layoutId("image", active)}>
                    <Image src={active.image} alt={active.imageAlt} width={800} height={450} className={styles.image} />
                  </motion.div>
                  <div className={styles.body}>
                    <motion.p className={styles.meta} layoutId={layoutId("description", active)}>{active.category}</motion.p>
                    <Dialog.Title asChild><motion.h3 className={styles.dialogTitle} layoutId={layoutId("title", active)}>{active.title}</motion.h3></Dialog.Title>
                    <Dialog.Description className={styles.summary}>{active.summary}</Dialog.Description>
                    <ul className={styles.tags} aria-label="Technologies">{active.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                    <h4 className={styles.subheading}>Engineering highlights</h4>
                    <ul className={styles.highlights}>{active.highlights.map(item => <li key={item}>{item}</li>)}</ul>
                    {active.detail && <p className={styles.summary}>{active.detail}</p>}
                    <div className={styles.actions}>
                      {active.link ? <a href={active.link} target="_blank" rel="noopener noreferrer">{active.linkLabel} ↗</a> : <p className={styles.status}>{active.status}</p>}
                      {active.id === "tcg-shelf" && <Link href="/projects/tcg-shelf">Engineering case study →</Link>}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
