"use client";

import { useState, useEffect } from "react";

type Cloud = {
  id: number;
  top: string;
  left: number;
  speed: number;
  size: number;
  opacity: number;
  delay: number; // frames to wait before spawning
};

export default function useClouds() {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  // helper to create a new cloud off-screen left with random delay
  function createCloud(id: number): Cloud {
    const size = Math.floor(Math.random() * 60) + 60; // 60–120px wide
    return {
      id,
      top: `${Math.random() * 15 + 5}%`, // 5%–20% from top
      left: -30, // start off-screen left
      speed: (120 / size) * 0.1, // size controls speed
      size,
      opacity: 0,
      delay: Math.floor(Math.random() * 50) + 20, // wait 20–70 ticks
    };
  }

  useEffect(() => {
    // initial clouds (spread out on screen, no delay)
    const initial = Array.from({ length: 6 }).map((_, i) => {
      const c = createCloud(i);
      return { ...c, left: Math.random() * 100, opacity: 1, delay: 0 };
    });
    setClouds(initial);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setClouds((prev) =>
        prev.map((cloud) => {
          // If waiting to spawn, just decrement delay
          if (cloud.delay > 0) {
            return { ...cloud, delay: cloud.delay - 1 };
          }

          const newLeft = cloud.left + cloud.speed; // <-- CHANGED: const
          let newOpacity = cloud.opacity;

          // fade out near right edge
          if (newLeft > 100) {
            newOpacity = Math.max(0, cloud.opacity - 0.05);
          }

          // fully off-screen → respawn new cloud with random delay
          if (newLeft > 120) {
            return createCloud(cloud.id);
          }

          // fade in once entering screen
          if (newLeft > -20 && newLeft < 20 && newOpacity < 1) {
            newOpacity = Math.min(1, cloud.opacity + 0.05);
          }

          return { ...cloud, left: newLeft, opacity: newOpacity };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return clouds;
}
