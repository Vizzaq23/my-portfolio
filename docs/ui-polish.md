# Retro UI polish

Branch: codex/retro-ui-polish. Baseline: b4a9270. No deployment.

Preserve the game scenes, pixel title, palette and factual project content.
Impeccable, Emil Design Engineering and Design Taste informed the changes.
The Figma MCP was used for an editable refinement specification:
https://www.figma.com/design/eFFLP1zdPJ2yjtI8TpYhXj
This is a specification board, not a full website mockup.

## Changes

- Mobile/tablet utility navigation uses the existing Chakra Petch face at 14–15px; the pixel identity remains.
- Featured projects use a single column below 1280px and three columns above. Summaries lead; demo metadata is expandable; an all-projects shortcut skips to the map.
- Reduced-motion skill reveals remain static and visible.
- A hero scenery toggle pauses decorative CSS motion and both JavaScript runners, remembers the session choice, and honors the system reduced-motion setting.
- Demos have loading/error/retry states and direct-file fallback links. Keyboard focus moves to the player. External embedded content still depends on LinkedIn; its original-video link remains available.
- Raised actions have a short pressed response.

## Verification

Lint and TypeScript passed. Production build passed.
Chromium checks at 320, 390, 768 and 1440px found no global horizontal overflow.
Reduced-motion skill label computed opacity 1 with animation none.
Video playback reached readyState 4; an intentionally missing source displayed the recovery state, and Retry restored playback and focus.
The scenery control set its pressed state, session preference, paused cloud animation and stopped the hero runner.
Reviewed mobile hero and tablet/desktop project screenshots.

An initial local preview cache collision was resolved by stopping the dev server before rebuilding.
No claim of full WCAG certification, physical-device coverage, or improved field performance.
