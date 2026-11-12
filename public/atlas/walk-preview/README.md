# CRT motion study

Isolated prototype at `/atlas/walk-preview/index.html`. Start the repository's Next server to view it. It does not replace the homepage or atlas route.

Approved direction: standing 1.68m eye height, dark textured 3D room, guided approach, user-triggered plug animation, warm TV reveal. Timing: 3.5s walk + 1.2s look down, interaction pause, 2.2s plug + 1s rise + 1.4s startup + 2.5s screen approach = 11.8s excluding pauses.

Native buttons support keyboard and touch. Replay resets the scene; skip jumps to the final view. Reduced motion fixes camera positions per beat and hides the hand movement; it is a rough cut-based alternative, not final fades. Tab visibility pauses playback.

This is an intentionally disposable geometry/motion blockout. No final plush/model assets, rigged finger articulation, sound, physics cable, game controls, or seamless playable handoff. The screen is a procedural illustration. Full art direction remains the approved storyboard, not these placeholder props. Mobile portrait crops the room more tightly.

Three.js 0.170.0 vendored from https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js with upstream MIT license in vendor/THREE-LICENSE.txt. No runtime CDN dependency. API reference: https://threejs.org/docs/.

Validation 2026-11-11: node syntax check, TypeScript no-emit, production build/lint/types passed. Browser tested full keyboard flow to 11.8s, mouse plug flow, corrected loose-plug framing, replay, reduced-motion checkbox and mid-sequence skip. No browser errors observed. Narrow and 1366x768 views inspected. Full reduced-motion journey, physical devices, screen readers and audio are not validated.
