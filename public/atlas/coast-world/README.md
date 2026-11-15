# Living coast — layered start-screen study

Preview `/atlas/coast-world/index.html`. This extends the approved richer workshop assets across the coastal title composition. The existing room intro and original start screen are preserved; this review route is not wired into the TV yet. Start / Skip open the existing portfolio.

## Assets and layers

- `environment.png`: generated transparent 3×3 atlas: turf, masonry, pipe, question block, lighthouse, boat, branch, shrub and Quintin idle sprite. Runtime alpha-trims each cell into a separate rendering source.
- `coast.png`: independent transparent distant coast / village / bridge backdrop.
- The workshop reuses `../workshop-study/` building, two prop atlases and the approved `placements.json`. Rendering preserves its architectural bands and separately authored prop positions. The complete workshop is cached for this title view; edit its component placements through the workshop study.
- Canvas sky/clouds/stars, solar and lunar discs, water/reflections, foreground silhouettes, color passes, emissive lamps and lighthouse beam are separate rendering passes. Layer checkboxes allow inspection. No full-screen generated image is used.

Generated source art retains baked shading and inconsistent fine pixel density; it is not a production normal-mapped/PBR tileset. Celestial lighting is a palette/alpha-mask/rim-light model, not full global illumination. Water is animated reflection bands, not fluid simulation. The idle character does not yet have a walking animation in this scene. Start remains a normal accessible link, not a new destination journey.

## Real New York time

`solar.mjs` uses the device's absolute clock and `America/New_York` through Intl. EST (-05:00) and EDT (-04:00) switch automatically. Coordinates are NYC 40.7128, -74.006, not the visitor's location; no location permission or network time service is requested. An incorrect device clock will produce incorrect scene time.

SunCalc 2.1.4 supplies seasonally changing sunrise/sunset, apparent sun/moon altitude and lunar fraction. New York civil noon is passed to avoid UTC-midnight day errors. Live mode recalculates every second and immediately on foregrounding. Preview modes use today's solar noon, sunrise +8 minutes, sunset -8 minutes, or dusk +75 minutes. Returning to Live resumes the current wall clock; previews do not alter the system clock. Solar position governs smooth palette transitions rather than fixed-hour switches.

The sky's 2D projection is art-directed to keep celestial bodies clear of the title, not a geographically oriented panorama. Sun/moon below the astronomical horizon do not contribute direct reflections; terrain may obscure a low disc. The moon's illuminated fraction is depicted with a simple pixel terminator, not a scientific lunar map. No weather or cloud-cover data is used.

Pause ambience and OS reduced-motion freeze water, foliage, boat bob and lighthouse sweep; the real clock and daylight still update. All preview controls are keyboard accessible. Animation rendering is capped to 30FPS and suspends while hidden.

## Verification

`node --test public/atlas/coast-world/solar.test.mjs` covers EST/EDT seasons, both DST boundaries, NY day at UTC midnight, summer/winter day lengths, presets and sunset continuity. Use `TZ=...` when running to check independence from the host zone. Browser review should compare all presets, Live clock progression, motion pause, layer toggles, reduced motion and mobile overflow.

## Provenance

Environment source: OpenAI imagegen `exec-ac31d6aa-81eb-4aa4-bb47-488d4b956ea3.png`; coast source `exec-44cb4669-1630-47b1-af05-a14bedbca9eb.png`, November 14 2026. Prompts requested a neutral-shaded transparent atlas matching the approved workshop and a separate low-detail coastal landscape without sky/water/celestial bodies. These are generated art assets, not hand-pixeled originals.

SunCalc is vendored unchanged from the npm registry package `suncalc@2.1.4`, package SHA1 `1ccebeb64e1a61a6c88c7e38fd0beceeaecf19c9`; `index.js` renamed `vendor/suncalc.mjs` for native module use. Its BSD-2-Clause license and upstream documentation are retained in `vendor/`. Source: https://github.com/mourner/suncalc . No dependency or lockfile changes and no runtime CDN requirement.

## Title comparison

type-study.html compares Beacon (custom SVG pixel lettering), Storybook (serif), and Cartridge (stacked pixel type) over one identical paused canvas capture. Full-size links use title=beacon, title=storybook, or title=cartridge with mode=night and still=1. Omitting title uses the selected Cartridge treatment; full-size Start continues to the homepage.

## Selected title and room connection

Cartridge is the approved default. walk-preview embeds this scene with tv=1. The same-origin bridge waits for artwork and fonts, keeps the TV dark until tv-start, then reveals the canvas and DOM title beneath a thin CRT line and center-out pixel mask. Reduced motion uses a brief fade. Replay resets the mask and room. A surface with a stable 1280px width and the browser aspect ratio is projected into the TV and interpolated to the full viewport rectangle, avoiding a layout change at handoff. Start and Skip navigate the top-level homepage. Other typography variants remain available for comparison.

The full-screen scene adds sky height for the viewport instead of stretching or cropping the artwork. Workshop, character, lighthouse, blocks, and pipe are smaller to open up the coast. Foreground leaves stay anchored to the top edge; platforms stay at the bottom.

Reference alignment (November 14): restored the substantial left workshop, central character and stepped right platforms using separate layers; raised distant cliffs, warmed workshop illumination, and added faint broad sky reflections independent of moon visibility. The original image is a composition reference, not used as a flat backdrop. Use screen=1 for a full-viewport standalone title without the TV waiting state.

## Pixel rendering and React controls

The runtime pixel-art module resamples each sized sprite to a two-world-unit grid, suppresses low-contrast speckles, maps to a compact indigo/teal/terracotta/amber palette, and caches the result. Source assets remain unchanged; this is a rendering treatment, not newly hand-drawn sprite art. The /atlas/play React wrapper adds a Radix dialog with Motion entrance, lighting presets, ambient pause and replay. Commands are restricted to the same-origin parent and forwarded through the room to the scene.

## Workshop and foliage redraw review

redraw-review.html compares the previous artwork with new workshop-v2.png and foliage-v2.png. Both are imagegen redraws guided by the user reference (November14), not filters over the old sprites. Workshop generation exec-17b9727a-bc07-4b75-9486-9c0f68126314; foliage generation exec-5efda3e7-8e80-4150-9bad-ad1201a95cac, alpha-cleanup edit exec-8259e84a-48c9-42b3-a658-e0b26a0d3c5e. Original files retained. Foliage uses four independently trimmed frames; workshop is one cutout with baked decorations and source lighting, so internal prop motion needs later separation. New sprites bypass the prior palette filter. art=previous retains old artwork for review. Character soles and shop base use GROUND_Y=818; workshop x=-8 places its masonry at the left edge without losing the wanted poster. guides=1 displays the contact line. Cartridge and other environment assets are unchanged in this pass.

## Independent wind and React Start

workshop-shell-v3.png removes the flag and ivy from the approved cutout; workshop-flag-v3.png is a separate cloth sprite. Generated edits exec-6da7764c-fd6a-4cbb-acd0-1fde91008339 and exec-a8a268ae-0974-4734-9b08-7ebd64b2715a, November14. Independent vines reuse foliage-v2 frame2. Flag/vines render in horizontal strips with an anchored top and increasing tip displacement, phase differences and slow gust envelope. This is art-directed cloth/plant motion, not a physics solver. Other workshop props remain static/baked.

Pointer parallax eases the distant coast by at most4 world units horizontally and canopy by10; character, shop and ground are stationary. Pause/reduced motion centers parallax and freezes wind. The React /atlas/play wrapper portals a Motion Start link into the scene: hover1.045 scale/-2px, press.95, spring420/24, reduced-motion no transform. Native pointer listeners on the iframe-owned element bridge realm-specific event checks; Motion drives the spring. Link remains native, keyboard accessible and navigates top-level homepage. Static scene-only previews retain their fallback Start link.

## Reference clouds and water

November 14: clouds-v2.png is a generated transparent four-cloud atlas (imagegen exec-8a54e678-5c40-46c4-bbbf-4ca9d244d5b7), cropped into separate lavender silhouettes. Slow independent drift preserves each shape. water.mjs replaces uniform stripes with seeded short pixel clusters, dark currents, and gently varying reflections. Solar/lunar positions and sunset color remain driven by solar.mjs. This is stylized animated water, not fluid simulation. Both layers share ambient pause/reduced-motion timing; Cartridge, workshop sprites, wind, and React Start remain unchanged.

## Distant coast and beacon

November 14: coast-v2.png is a reference-guided redraw (imagegen exec-d4081a20-ce7a-4580-8f80-aaf1345eda6f): deep teal mountain bands, violet cliff facets, smaller warm-window village and bridge. It bypasses the older palette-remapping filter to preserve its colors. Original coast.png retained. Mountains/village remain one transparent distant layer with shared parallax, not independently editable mountain tiles. lighthouse.mjs constructs a separate small two-unit pixel tower in code. BEACON anchors its lantern and existing animated glow/beam at (1150,469); base meets the grassy plateau. All existing ambient timing, pause, reduced motion, Cartridge and React Start are preserved.

## Character likeness and ground contact

November 14: character-v2.png is a photo-guided pixel-art redraw (imagegen exec-86c272f3-d7d7-4d5d-bd95-23947f4d6fea), with sandy swept hair, short beard, black Chopper shirt, necklace and purple shorts. Alpha-trimmed before proportional nearest-neighbor sizing to180 world units tall; original palette retained, no prior palette remapping. It is a single idle sprite, not a walk cycle. Shoes are bottom-anchored to GROUND_Y818; pipe now also uses GROUND_Y minus its130 height, correcting the previous23-unit gap. Grounded objects remain outside parallax. Cartridge and all existing ambient/React animations unchanged.

## Simplified sprite and planted idle

November 14: character-v3.png simplifies the character into larger pixel clusters; the first wide torso was rejected and replaced with a slimmer silhouette (imagegen exec-78cecb1a-02d5-45e1-bb56-9bf9c70fe2ab). character-idle.mjs keeps the lower third fixed and raises the upper body0-2 pixels over4.6 seconds. Two160ms eyelid closures occur at unequal intervals in an11.7-second cycle; eye coordinates are registered to this specific sprite. Shared scene time respects pause, and reduced motion explicitly draws the neutral open-eye pose. Pixel comparison verified identical shoe regions across breathing/blink poses. Full connected intro and live blink observed. This is an idle pose, not locomotion.

November14 proportion adjustment: render the head at82% around its neck anchor, leaving body/legs/shoes unchanged. Eyelids share the head transform, preserving blink registration; upper-body breathing still uses the same waist anchor. Source sprite unchanged.

## Moon glitter path

November14: water.mjs uses a moon-aligned rough-water reflection with perspective-compressed distant ripples, wider near-water spread, a silver core and dim blue edges. Stable seeded wave crests change exposure slowly with shared ambient time. Brightness follows lunar illuminated fraction and fades out in daylight/below horizon; zero illumination yields no reflection. Distant coast and foreground props occlude it through scene draw order. Broad unrelated sky highlights reduced. Art-directed approximation, not a physically based water simulation. Browser pixel checks verified200px moon movement produces200px reflection movement, shimmer changes with time, repeated time is stable, and hidden/day/new-moon states draw nothing.
