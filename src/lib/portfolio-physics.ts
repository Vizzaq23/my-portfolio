export type Surface = { id: number; left: number; right: number; top: number; bottom: number; solid: boolean };
export type Walker = { x: number; y: number; vy: number; grounded: boolean; jumps: number; support: number | null };
export const BODY_WIDTH = 28;
export const BODY_HEIGHT = 58;

/** Document coordinates: x is body-left; y is feet, increasing down the page. */
export function stepWalker(s: Walker, surfaces: Surface[], direction: number, dt: number, width: number, floor: number, drop = false) {
  let x = Math.max(0, Math.min(width - BODY_WIDTH, s.x + direction * 260 * dt));
  for (const b of surfaces) {
    if (!b.solid || s.y <= b.top + .5 || s.y - BODY_HEIGHT >= b.bottom - .5) continue;
    if (direction > 0 && s.x + BODY_WIDTH <= b.left + .5 && x + BODY_WIDTH > b.left) x = Math.min(x, b.left - BODY_WIDTH);
    if (direction < 0 && s.x >= b.right - .5 && x < b.right) x = Math.max(x, b.right);
  }
  s.x = x;
  const oldFeet = s.y;
  s.vy = Math.min(1000, s.vy + 1900 * dt);
  let feet = s.y + s.vy * dt;
  let support: number | null = null;
  for (const b of surfaces) {
    if (s.x + BODY_WIDTH <= b.left || s.x >= b.right) continue;
    if (s.vy >= 0 && (!drop || b.solid) && oldFeet <= b.top + .6 && feet >= b.top) {
      if (support === null || b.top < feet) { feet = b.top; support = b.id; }
    } else if (s.vy < 0 && b.solid && oldFeet - BODY_HEIGHT >= b.bottom - .5 && feet - BODY_HEIGHT < b.bottom) {
      feet = Math.max(feet, b.bottom + BODY_HEIGHT);
      s.vy = 0;
    }
  }
  if (feet >= floor) { feet = floor; support = -1; }
  if (feet < BODY_HEIGHT) { feet = BODY_HEIGHT; s.vy = Math.max(0, s.vy); }
  s.y = feet;
  s.grounded = support !== null;
  s.support = support;
  if (s.grounded) { s.vy = 0; s.jumps = 0; }
}

export function jumpWalker(s: Walker) {
  if (!s.grounded && s.jumps >= 2) return false;
  s.vy = -760;
  s.jumps = s.grounded ? 1 : s.jumps + 1;
  s.grounded = false;
  s.support = null;
  return true;
}
