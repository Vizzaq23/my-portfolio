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

## Playable handoff — 2026-11-12

The CRT now displays the same canvas used by the playable foreground. After the intro (or Skip intro), keyboard focus moves to the character controller. Arrow keys/A/D move; Space jumps with variable height, 100ms coyote time and 120ms buffering; E opens a nearby door. Physics uses a fixed 120Hz step. Ground is continuous: exploration has no death penalty. One-way ledges provide optional jumps.

All nine doors and the direct All projects menu use `/atlas/catalog`, a static Next route importing the authoritative `src/data/projects.ts`. Native dialogs show original descriptions, highlights, imagery, tags and links. Escape returns to the same world position; original project pages remain linked for demos and expanded case studies. Background game input stops while dialogs are open or the page loses focus. Touch buttons are available.

Validation: production build/lint/types passed; browser keyboard movement, jump, door entry, Escape return, all-nine directory, replay and full normal intro-to-game passed. No browser console errors observed. This is a functional first playable pass, not final world artwork. Rich project interiors, bespoke building art, animation polish, and seamless aspect-ratio matching at the final camera/canvas cut remain unfinished.

## Correction — current homepage on CRT

The user rejected the separate platformer. The active intro no longer imports or mounts world.js or requests /atlas/catalog. Instead it projects a live, inert same-origin iframe of `/` onto the television face. TV remains dark until startup; after the camera approach, normal navigation opens `/#top`. Skip uses the same destination. The existing homepage and its content are unchanged. The earlier playable-pass notes above are historical, not the accepted direction.

## Cloud start screen — 2026-11-12

Intro now opens with a personal introduction card, exact HeroClouds SVG paths, homepage sky gradient, and existing Press Start 2P / IBM Plex Sans fonts. Start begins the guided walk; reduced-motion selection transfers to the room; direct Skip to portfolio remains available while models load. Room controls stay inert while start screen is visible. Browser verified desktop1366x768, mobile390x844, keyboard Start, reduced-motion transfer and direct homepage skip. Build/lint/types and JS syntax passed. Homepage untouched.
