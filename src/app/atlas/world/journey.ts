import { projects } from "@/data/projects";

/** Presentation only. Project copy and media remain owned by data/projects.ts. */
export const journeyStops = [
  { id: "pinball", place: "Pioneer Arcade", kind: "arcade", chapter: "Build & play" },
  { id: "tcg-shelf", place: "Collector’s Corner", kind: "shop", chapter: "Build & play" },
  { id: "sunny-hq", place: "Sunny Workspace", kind: "ship", chapter: "Ideas in motion" },
  { id: "adaptive-shooter", place: "Training Grounds", kind: "trainer", chapter: "Ideas in motion" },
  { id: "tcg-coach", place: "Replay Club", kind: "cards", chapter: "Ideas in motion" },
  { id: "trading-agent", place: "Research Station", kind: "research", chapter: "Research & systems" },
  { id: "game-balancer", place: "Balance Lab", kind: "lab", chapter: "Research & systems" },
  { id: "arcade", place: "The Workshop", kind: "workshop", chapter: "Where it began" },
  { id: "lavender", place: "Lavender Garden", kind: "garden", chapter: "Where it began" },
] as const;

export type LandmarkKind = (typeof journeyStops)[number]["kind"];

export const journeyProjects = journeyStops.map(stop => {
  const project = projects.find(project => project.id === stop.id);
  if (!project) throw new Error(`Missing journey project: ${stop.id}`);
  return { ...stop, project };
});
