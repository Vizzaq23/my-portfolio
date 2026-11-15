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
