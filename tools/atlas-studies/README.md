# Realistic TV corner study

Separate Blender art-direction study, 2026-11-16. Does not modify the website, Cartridge title screen, or intro.

- `realistic-tv-corner.png`: 1600 x 1200 Cycles render.
- `realistic-tv-corner.blend`: editable scene with packed wood texture; verified reopening in Blender 5.2.1 LTS.
- `realistic_corner.py`: reproducible scene creation script. Run from repository root with Blender `--background --factory-startup --python tools/atlas-studies/realistic_corner.py`.

Reuses existing CRT and Chopper models from `public/atlas/walk-preview/assets/` and existing wood texture `tools/atlas-assets/sources/wood_planks.jpg`; consult the existing asset provenance files for original sources. Cabinet, console/controller, lamp, poster, books and room geometry are modeled by this script. No new downloaded assets.

Focus: believable rounded furniture, differentiated materials, cool window lighting, warm practical light, soft contact shadows. Existing stylized TV and Chopper remain; this is a direction study, not a finished photoreal room or runtime-ready replacement. Website integration and animation are deliberately deferred for review.

## Night lighting and object refinement

`night_corner.py` loads the first study and saves a separate `night-tv-corner.blend` and `night-tv-corner.png`. Reproduce with Blender `--background --factory-startup --python tools/atlas-studies/night_corner.py`.

Adds curved emissive CRT glass with a procedural phosphor raster, molded plastic microtexture, fluted knobs, short geometric fabric pile, brim stitching and reflective safety eyes. Darker ambient/practical lighting lets cool screen emission and supporting area lights lead the composition. The nearby fill is an artistic bounce approximation, not a physically calibrated TV output. The screen shows a neutral startup glow; no Cartridge assets are changed. Original study remains available for comparison. Render: Cycles, 128 samples, 1800 x 1350. This is an offline study, not an optimized browser asset.

## Walk, plug and power-on animation study

`animate_corner.py` loads the night study and creates `walk-plug-study.blend`. It contains a 12-second, 24 fps camera approach, articulated hand reach/grip, plug alignment/insertion, keyed flexible lead, release, CRT flicker and light spill. The TV stays unpowered until the insertion finishes. The last shot holds on the illuminated room. No Cartridge reveal or website integration is included.

Preview is intentionally a silent motion study at 768 x 576, 12 Cycles samples with denoising. Fine plush pile is hidden for rendering speed; the original night scene retains it. Hand geometry is a smooth procedural proxy, not a final scanned/rigged hand. Cable is an animated NURBS curve rather than a physics simulation; the outlet is staged to the left of the TV for readability.

Reproduce:

```powershell
blender --background --factory-startup --python tools/atlas-studies/animate_corner.py
uv run --with imageio-ffmpeg --no-project python tools/atlas-studies/encode_walk.py
```

Use `-- --stills` after the Blender script argument to render four check frames instead. Temporary frames and render log are ignored. The MP4 and editable Blender scene are the review artifacts; the existing web intro and Cartridge are preserved.
