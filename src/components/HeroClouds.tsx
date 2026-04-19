"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type CloudState = {
  top: string;
  left: number;
  speed: number;
  size: number;
  opacity: number;
  delay: number;
};

function createCloud(): CloudState {
  const size = Math.floor(Math.random() * 60) + 60;
  return {
    top: `${Math.random() * 15 + 5}%`,
    left: -30,
    speed: (120 / size) * 0.1,
    size,
    opacity: 0,
    delay: Math.floor(Math.random() * 50) + 20,
  };
}

/** Same layout on server and first client paint — avoids hydration mismatch from Math.random(). */
function getStaticClouds(): CloudState[] {
  return Array.from({ length: 6 }).map((_, i) => {
    const size = 72 + (i % 3) * 12;
    return {
      top: `${8 + (i % 3) * 4}%`,
      left: 8 + i * 14,
      speed: (120 / size) * 0.1,
      size,
      opacity: 0.88,
      delay: 0,
    };
  });
}

export default function HeroClouds() {
  const cloudsRef = useRef<CloudState[]>(getStaticClouds());
  const elsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }
    cloudsRef.current = Array.from({ length: 6 }).map(() => {
      const c = createCloud();
      return { ...c, left: Math.random() * 100, opacity: 1, delay: 0 };
    });
    setMotionReady(true);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !motionReady) {
      return;
    }

    const tick = () => {
      cloudsRef.current = cloudsRef.current.map((cloud) => {
        if (cloud.delay > 0) {
          return { ...cloud, delay: cloud.delay - 1 };
        }

        const newLeft = cloud.left + cloud.speed;
        let newOpacity = cloud.opacity;

        if (newLeft > 100) {
          newOpacity = Math.max(0, cloud.opacity - 0.05);
        }

        if (newLeft > 120) {
          return createCloud();
        }

        if (newLeft > -20 && newLeft < 20 && newOpacity < 1) {
          newOpacity = Math.min(1, cloud.opacity + 0.05);
        }

        return { ...cloud, left: newLeft, opacity: newOpacity };
      });

      elsRef.current.forEach((el, i) => {
        const c = cloudsRef.current[i];
        if (!el || !c) return;
        el.style.top = c.top;
        el.style.left = `${c.left}%`;
        el.style.width = `${c.size}px`;
        el.style.height = `${c.size * 0.6}px`;
        el.style.opacity = String(c.opacity);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduceMotion, motionReady]);

  const staticClouds = useMemo(() => getStaticClouds(), []);

  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => {
        const c =
          reduceMotion || !motionReady ? staticClouds[i] : cloudsRef.current[i];
        if (!c) return null;
        return (
          <div
            key={i}
            ref={(el) => {
              elsRef.current[i] = el;
            }}
            className="pointer-events-none absolute will-change-[left,opacity]"
            style={{
              top: c.top,
              left: `${c.left}%`,
              width: `${c.size}px`,
              height: `${c.size * 0.6}px`,
              opacity: c.opacity,
              transition: reduceMotion ? "none" : "opacity 0.3s ease-in-out",
            }}
          >
            <Image
              src="/cloud-mario.svg"
              alt=""
              width={100}
              height={60}
              className="h-full w-full object-contain"
            />
          </div>
        );
      })}
    </>
  );
}
