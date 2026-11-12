# CRT motion study

Isolated prototype at `/atlas/walk-preview/index.html`. Start the repository's Next server to view it. It does not replace the homepage or atlas route.

Approved direction: standing 1.68m eye height, dark textured 3D room, guided approach, user-triggered plug animation, warm TV reveal. Timing: 3.5s walk + 1.2s look down, interaction pause, 2.2s plug + 1s rise + 1.4s startup + 2.5s screen approach = 11.8s excluding pauses.

Native buttons support keyboard and touch. Replay resets the scene; skip jumps to the final view. Reduced motion fixes camera positions per beat and hides the hand movement; it is a rough cut-based alternative, not final fades. Tab visibility pauses playback.

This is an intentionally disposable geometry/motion blockout. No final plush/model assets, rigged finger articulation, sound, physics cable, game controls, or seamless playable handoff. The screen is a procedural illustration. Full art direction remains the approved storyboard, not these placeholder props. Mobile portrait crops the room more tightly.

## Room art pass — 2026-11-12

Room construction now lives in `room.js`. Added deliberately patterned wood, plaster, plaid and woven maps; staggered floorboards; bed posts/pillow/cover; chamfered CRT with controls, grille and feet; console/controller; seated Chopper with muzzle, eyes, crossed hat marking and branched antlers; nautical rug/poster; shelves, desk, books, plant and fixtures. All are local mesh/canvas constructions, not generated concept images presented as 3D. Moonlight casts shadows; TV glow can be inspected from the doorway using the review-only toggle. The toggle is disabled during playback, and replay restores the dark state.

This is the first modeled art pass, not a claim of matching the approved concept's final quality. Hand/cable motion and sound remain next-stage work. Animation durations and camera positions are unchanged. JavaScript syntax checks and production build/lint/types passed. Browser: 1366x768 dark/warm views, full keyboard approach/plug through 11.8s, replay, no console errors, 390x844 controls/layout inspected. Screenshot: `.playwright-mcp/crt-room-refined-warm.png`.

## Blender assets and sound — 2026-11-12

Replaced the CRT, Chopper and hand placeholders with local Blender-authored GLBs. Separate finger joints now close during the reach. Added Poly Haven CC0 wood/plaster maps and opt-in Freesound CC0 footsteps, with synthesized plug/static/transition sounds. Provenance and exclusions are in `assets/SOURCES.md`; editable Blender project and builder live in `tools/atlas-assets`.

Study view selects the normal sequence, TV/Chopper close-up, or stationary hand grip. Replay restores the default scene. These are review controls, not final portfolio UI. The approximately12-second timeline is unchanged. Sound decoding is verified in browser, but speaker playback/balance needs human listening. The screen remains illustrative rather than a playable handoff. Cable and hand poses are still stylized; no physics solver or skinned full-body rig is claimed.

Validation: all three GLBs passed header, embedded-resource, buffer-boundary, vertex-budget and size checks; SHA-256 manifest verified. JavaScript syntax and production build/lint/types passed. Browser confirmed authored-assets loaded and audio decoded; normal keyboard and reduced-motion journeys both completed11.8s; replay and sound toggle worked; close-up grip and TV views visually inspected;390x844 controls fit. No console errors observed. Screenshot `.playwright-mcp/crt-blender-assets.png`. No paid assets, production deployment or homepage modification.

Three.js 0.170.0 vendored from https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js with upstream MIT license in vendor/THREE-LICENSE.txt. No runtime CDN dependency. API reference: https://threejs.org/docs/.

Validation 2026-11-11: node syntax check, TypeScript no-emit, production build/lint/types passed. Browser tested full keyboard flow to 11.8s, mouse plug flow, corrected loose-plug framing, replay, reduced-motion checkbox and mid-sequence skip. No browser errors observed. Narrow and 1366x768 views inspected. Full reduced-motion journey, physical devices, screen readers and audio are not validated.
