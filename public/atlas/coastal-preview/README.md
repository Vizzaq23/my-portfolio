# Coastal asset build 01

Preview: `/atlas/coastal-preview/index.html`. This isolated study does not change the original title, room intro, Start destination, or homepage.

## Editable art pipeline

`art.mjs` contains the palette and 17 independent transparent sprite factories: ground/brick tiles, workshop, lantern, poster, lighthouse, plants, boat, flag, pipe, question block, and five character frames. Each asset is drawn at its native resolution. No generated backdrop, texture, screenshot, or cutout is loaded. The approved cleanup image is visual reference only; this is an interpretation, not an exact reproduction.

The Asset workbench displays every actual sprite with individual transparent PNG downloads. Download sprite sheet exports the packed atlas; Download atlas JSON provides its matching named frame rectangles. Both are generated from the same factories and can be loaded into another renderer later. Checked-in exports live in `assets/`: 17 individual PNGs plus `coastal-sprites.png` and `coastal-sprites.json`. Regenerate them from the workbench after changing the source factories. Character poses are a first pass; production-quality sprite animation still needs artistic iteration.

`world.mjs` owns placements, collision rectangles, light origins, occluders, and plant anchors. `scene.mjs` composites cached sky/architecture, independent water bands, boat bob, foliage/poster springs, player sprites, then lighting. DOM typography uses the existing local Press Start 2P font, keeping buttons and links accessible.

## Physics and lighting

`physics.mjs` uses a 120Hz accumulator, acceleration/friction, gravity, solid AABB collision, jump buffering, coyote time, and variable jump height. Ground, pipe, stairs, and blocks are solid. There are no hazards or gated portfolio content. Water is a visual animation, not a fluid simulation.

Point lights use raycast visibility polygons against explicit rectangle occluders, clipped radial falloff and screen blending. Lighting is computed separately from sprites; changing the lantern slider does not repaint source artwork. This is simple 2D occluded lighting, not a normal-map/PBR renderer. The character receives light but does not cast a moving shadow yet. Lighthouse beam and water highlights are separate stylistic layers.

Pause ambience / OS reduced motion stops water, wind and light movement; direct player input continues. Escape returns to the title. Input resets on blur/hidden tabs. Original start screen and direct portfolio links remain available. Touch controls work without mandatory keyboard input.

## Verify

`node --test public/atlas/coastal-preview/physics.test.mjs`

Browser checks: Start/Escape, run/jump/land, collision overlay, lights off/on, strength slider, independent sprite downloads, pause/reduced motion, narrow viewport. Project checks: `npm run build`, `npx tsc --noEmit`.
