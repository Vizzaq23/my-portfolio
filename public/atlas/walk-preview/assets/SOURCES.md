# Asset provenance — 2026-11-12

## Project-authored Blender models

`crt.glb`, `chopper.glb`, `hand.glb` are exported from the reproducible script `tools/atlas-assets/build_models.py` using installed Blender 5.2.1 LTS. Editable source: `tools/atlas-assets/hero-assets.blend`. No purchased models or paid generation were used. The Chopper interpretation is fan art of the user's requested character, not a CC0 character license. No third-party model pack was incorporated.

The hand uses eight named finger pivots and a thumb pivot, not a skinned humanoid skeleton. Browser animation drives the joints. Models are under 1 MB and 30,000 exported position vertices each. `model-stats.json` records pre-export Blender counts; `verify_assets.py` checks actual exported counts and GLB boundaries.

## Poly Haven textures — CC0-1.0

- `wood_planks.jpg`: Wood Planks, Amal Kumar. https://polyhaven.com/a/wood_planks
- `plastered_wall.jpg`: Plastered Wall, Amal Kumar. https://polyhaven.com/a/plastered_wall
- License: https://polyhaven.com/license and https://creativecommons.org/publicdomain/zero/1.0/
- Original 1K diffuse JPG downloads are retained. Browser resamples to 256px, applies repeat and material tint. Source MD5 metadata was checked against downloaded bytes. Original URLs/MD5s: `tools/atlas-assets/sources/polyhaven.json`.
- Metadata retrieved through the public API: Powered by Poly Haven. No API calls are made by the running portfolio.

## Freesound footstep recording — CC0-1.0

`footsteps-wood.mp3`: **Retro-Styled Footsteps - Wood**, MalikArsYasakani.

- Source and license declaration: https://freesound.org/people/MalikArsYasakani/sounds/845090/
- Downloaded public high-quality preview: https://cdn.freesound.org/previews/845/845090_16860678-hq.mp3
- This is the MP3 preview, not the source WAV. Browser loops at 0.8 playback rate at low volume during walking.
- Plug click, startup hiss, and transition tone are project-authored Web Audio synthesis, not downloaded recordings.
- Audio is off by default; user must explicitly enable it. Replay, skip and hidden tabs stop active sound nodes.

## Libraries and unused candidates

Three.js 0.170.0 GLTFLoader and BufferGeometryUtils are vendored alongside the previously vendored core, under `vendor/THREE-LICENSE.txt`. Only import paths changed to local relative paths.

Blockbench and Aseprite were not installed or used; Blender handles this pass's model authoring. The PSX Horror Starter Pack was not imported because its asset-redistribution terms need further review for a public source repository. No purchase was made. The game-dev packaging CLI was unavailable, so the provided local validation/manifest workflow is a manual fallback, not a claimed canonical game-dev receipt.

`manifest.json` records SHA-256 values for the runtime asset bytes. Verify with `uv run --no-project python tools/atlas-assets/verify_assets.py` from the repository root.

## Start-screen typography

PressStart2P-Regular.ttf and IBMPlexSans-Variable.woff2 are copies of the existing repository fonts under src/fonts, reused for visual continuity. Their SIL OFL license files are included alongside them. Press Start license source: https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/OFL.txt . These added fonts are outside the earlier 3D-asset manifest.
