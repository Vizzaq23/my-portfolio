# The Quiet Relay — editable art prototype

Open `/atlas/ruins-preview/index.html`. Isolated from the approved room/title flow and live homepage. No build dependencies or image downloads.

This is a code-authored interpretation of the approved November 14 ruins concept, not the generated picture with distortion applied. It is a first art/motion pass, not finished production artwork.

## What controls what

- `assets.js`: palette, repeated editable stone tile placements, distant silhouette points, gate masonry, and the explorer's pixel matrix.
- `scene.js`: five separately rendered canvas layers: sky, architecture, water, light, life. Each can be disabled through Explore layers. Stone is static; water bands, reflections, energy pulse, floating shard, fern tips, and dust have independent time functions. No image warping.
- `scene.css`: responsive modern DOM shell, controls, focus styling, pixel scaling.
- `index.html`: semantic navigation, labeled keyboard controls and canvas description.

Arrow keys / A and D work when the scene has focus; buttons support pointer, touch and keyboard. Pause freezes ambient motion while leaving direct movement available. OS reduced-motion preference starts paused. Lost focus/hidden pages clear held input. No audio, flashing or entrance lockout.

Render coordinates are 840×470. Edit ground placements and sprite symbols directly; the shapes and tile data can later be replaced individually with artist-authored sprite sheets without flattening the scene. Native pixel geometry is editable now; no claim of Aseprite/LDtk exports. A small-screen viewport crops distant edges while keeping the character path and gateway visible. This study contains no new project content or destination journey.
