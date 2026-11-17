# Custom level-map wave

2026-11-16 — Original Canvas2D strip deformation wraps the existing ProjectWorldMap. No Aceternity Pro source, new dependencies, or new homepage sections. This is a shallow wave with pointer tilt, not the reference's full 3D slab implementation.

MapWaveSurface.tsx draws the existing artwork in 112 strips and applies matching vertical offsets to the nine native level buttons and runner. Hovering a button or link holds the surface steady for selection. Existing selection, previews, keyboard navigation and runner routing remain in ProjectWorldMap. map-wave.module.css preserves the heading stacking order and original-image fallback.

Touch/coarse pointers, keyboard navigation, reduced motion and the existing scenery-pause setting use the flat original image. Rendering pauses offscreen and in hidden documents; painting is capped at 30fps and pixel ratio at 1.5. Missing canvas context or failed image loading retains the original image.

Verified locally at http://localhost:3041/: all nine desktop and emulated 390px touch selections update aria-pressed and the selected preview; Home/End navigation selects endpoints and flattens the map. Reduced-motion and scenery-pause toggles restore the original image. Wave anchor offsets change over time and offscreen state becomes paused. Heading remains visible. Focused ESLint and TypeScript checks pass. No production build or physical-device check for this change.

Artwork SHA256 remains 60BFF03D6EB903786E89A3C890D714C5B09A8365DEF4070243CEA17D44B62368. Local changes only; not committed, pushed or deployed.
