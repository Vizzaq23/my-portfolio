"use client";
// Aceternity UI / Manu Arora. https://ui.aceternity.com/licence
// Registry source retained in vendor/ui/timeline.json. Local theme, responsive
// measurement, optional heading and reduced-motion changes documented there.
import {
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => setHeight(element.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="aceternity-timeline w-full font-sans"
      ref={containerRef}
    >
      <div ref={ref} role="list" aria-label="Career milestones" className="relative mx-auto pb-12">
        {data.map((item, index) => (
          <div
            key={index}
            role="listitem"
            className="timeline-entry flex justify-start pt-8 md:pt-16 md:gap-6"
          >
            <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start md:w-48 md:shrink-0">
              <div aria-hidden="true" className="h-8 absolute left-0 w-8 rounded-full bg-[#172b50] flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-amber-300 border-2 border-amber-100" />
              </div>
              <h3 className="timeline-date hidden md:block md:pl-12 text-xl font-bold text-slate-950">
                {item.title}
              </h3>
            </div>

            <div className="relative min-w-0 pl-10 md:pl-0 w-full">
              <h3 className="timeline-date md:hidden block text-lg mb-4 text-left font-bold text-slate-950">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          aria-hidden="true"
          className="timeline-track absolute left-[15px] top-0 overflow-hidden w-[2px] bg-slate-700/30 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: reducedMotion ? height : heightTransform,
              opacity: reducedMotion ? 1 : opacityTransform,
            }}
            className="timeline-beam absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-amber-300 via-amber-400 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
