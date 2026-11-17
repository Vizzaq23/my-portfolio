# Realistic TV corner study

Separate Blender art-direction study, 2026-11-16. Does not modify the website, Cartridge title screen, or intro.

- `realistic-tv-corner.png`: 1600 x 1200 Cycles render.
- `realistic-tv-corner.blend`: editable scene with packed wood texture; verified reopening in Blender 5.2.1 LTS.
- `realistic_corner.py`: reproducible scene creation script. Run from repository root with Blender `--background --factory-startup --python tools/atlas-studies/realistic_corner.py`.

Reuses existing CRT and Chopper models from `public/atlas/walk-preview/assets/` and existing wood texture `tools/atlas-assets/sources/wood_planks.jpg`; consult the existing asset provenance files for original sources. Cabinet, console/controller, lamp, poster, books and room geometry are modeled by this script. No new downloaded assets.

Focus: believable rounded furniture, differentiated materials, cool window lighting, warm practical light, soft contact shadows. Existing stylized TV and Chopper remain; this is a direction study, not a finished photoreal room or runtime-ready replacement. Website integration and animation are deliberately deferred for review.
