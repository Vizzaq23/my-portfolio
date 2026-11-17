# Play on and break the portfolio

The existing hero's **Explore portfolio** button turns the existing page content into the game world. The original **Play level** remains separate. No homepage sections or Mario artwork were replaced.

## Controls

- Left/right or A/D: walk across cards and individual letters.
- Space/Up/W: jump; press again in the air to reach another surface, even after breaking the previous one.
- X or the mobile Smash button: break a nearby letter or card. Hold to keep smashing. Letters take priority over the surrounding card.
- Jump into letters from underneath to knock them out.
- Down/S: drop through one-way surfaces.
- Restore page: immediately restore all broken cards and letters.
- Escape / Exit exploration: restore the page and leave the game.

The optional section selector is a shortcut, not a required route. The rejected grass-platform trail and its generator/tests were removed. Collision guides default off.

## Implementation

`portfolio-content.ts` uses DOM Ranges for individual Unicode graphemes, retaining the real text nodes, spacing, kerning and React ownership. Each non-whitespace glyph has its own collision rectangle. Text geometry is measured near the viewport; cards are measured across the document. These are glyph bounding rectangles, not pixel masks of letter outlines.

Breaking letters uses a CSS Custom Highlight with transparent text. Breaking cards temporarily hides the element and its descendants without collapsing the layout. Both are removed from collision immediately. Restore/exit clears highlights and temporary attributes; source content is never deleted and damage is not saved. Small fragments respect reduced motion. Existing solid Mario scenery keeps its original collision behavior.

Scroll, ordinary page interaction, window blur and resizing pause exploration. Keyboard/touch controls resume it. The camera reserves room above the dock, with temporary scrolling room at the document bottom.

## Verification — 2026-11-17

- Nine physics/content tests: individual narrow-glyph support and falling after removal, letter/card attack priority, facing, attack range, scenery exclusion, landing order, drop-through, solid side/head collisions, base jump limits and floor catches.
- TypeScript, focused ESLint and production build passed; final small input/viewport refinements checked again with types/lint.
- Browser: stood on individual heading letters; removed letters independently; broke a featured project article; Restore page returned cards and text.
- 390px: on-screen Smash, letter landing, upward head-bump break, restore and no horizontal overflow verified.
- Exit cleanup verified: no broken-card attributes or exploration mode remained; original heading text intact. Screenshot: `.playwright-mcp/portfolio-breakable-letters.jpg`.
- Physical touchscreen and all browser engines have not been tested. CSS Custom Highlight support is required for individual-letter hiding.

Accepted by the user as the gameplay base on 2026-11-17. This snapshot includes the existing homepage sections, refreshed Mario scenery, original hero level, map interactions, and reversible letter/card destruction. Production deployment is separate from saving this base in Git.
