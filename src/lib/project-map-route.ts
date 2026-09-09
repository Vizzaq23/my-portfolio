export const projectLevels = [
  { id: "lavender", x: 13.5, y: 23.3, label: "Project Lavender" },
  { id: "arcade", x: 8.8, y: 44.5, label: "Arcade Cabinet" },
  { id: "game-balancer", x: 32.3, y: 80.9, label: "Game Balancer" },
  { id: "adaptive-shooter", x: 58.2, y: 84.7, label: "Combat Trainer" },
  { id: "pinball", x: 84.9, y: 76.2, label: "Pinball" },
  { id: "tcg-shelf", x: 89.3, y: 23.8, label: "TCG Shelf" },
] as const;

type Point = { x: number; y: number; jump?: boolean; level?: string };
const point = (x: number, y: number, jump = false): Point => ({ x, y, jump });
const stop = (index: number): Point => ({ ...projectLevels[index], level: projectLevels[index].id });

// Foot positions on the cream paths and bridges, in percentages of the 3:2 map.
const path: Point[] = [
  stop(0), point(12.7,27), point(12.5,30.5), point(10.8,33.1), point(7.6,35.8), point(6.9,40.5), point(7.1,43.5),
  stop(1), point(13.3,47.1), point(16.4,52.5), point(18.6,57.5), point(18.9,60.5), point(16.5,67.5), point(17,70.6), point(20.3,74.8), point(25.5,78.3),
  stop(2), point(35.4,81.6), point(39.1,82.2), point(42.3,82.5), point(46.5,83.2), point(52,83.8),
  stop(3), point(59.7,82.3), point(65.5,81), point(69.3,80.3), point(74.9,78.9), point(79.4,77.2),
  stop(4), point(89.2,74), point(91.2,71.3), point(90.3,67.6), point(88.9,65.4), point(93.8,63.7),
  point(95.8,41.8,true), point(95.1,35.5), point(93.6,31.3), point(94.8,28.2), point(93.3,26.3), stop(5),
];

let distance = 0;
const route = path.map((position, index) => {
  if (index > 0) distance += Math.hypot(position.x - path[index - 1].x, (position.y - path[index - 1].y) * 2 / 3);
  return { ...position, distance };
});
export const routeLength = distance;

export function levelDistance(id: string) {
  return route.find((position) => position.level === id)?.distance ?? 0;
}

/** A single distance along the route makes mid-run reversals continuous. */
export function positionOnRoute(travelled: number) {
  const clamped = Math.max(0, Math.min(routeLength, travelled));
  const nextIndex = route.findIndex((position, index) => index > 0 && position.distance >= clamped);
  const end = route[nextIndex < 0 ? route.length - 1 : nextIndex];
  const start = route[Math.max(0, (nextIndex < 0 ? route.length - 1 : nextIndex) - 1)];
  const t = (clamped - start.distance) / (end.distance - start.distance);
  return {
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t,
    hop: end.jump ? Math.sin(t * Math.PI) : 0,
    facing: Math.sign(end.x - start.x) || 1,
  };
}

export function advanceAlongRoute(current: number, target: number, seconds: number) {
  const step = Math.max(0, seconds) * 31;
  return current + Math.sign(target - current) * Math.min(Math.abs(target - current), step);
}
