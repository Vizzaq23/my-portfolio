# Workshop layer assembly

Isolated art review at `/atlas/workshop-study/index.html`. No changes to the accepted original title or room intro.

The user approved the right-hand workshop from the cleanup comparison, rejecting the earlier primitive code-drawn art. These assets preserve richer shapes and material shading through generated transparent raster artwork. They are not hand-authored pixel art, an exact extraction, or a finished production tileset.

- `reference.png`: approved generated comparison, displayed as its right half using CSS.
- `building.png`: independently generated empty workshop shell with roof, wall, sill and interior. It retains baked highlights and shading.
- `props.png`: nine-cell transparent atlas: lantern, pirate flag, poster, left/right shutters, ivy, computer, plush, hat.
- `interior.png`: pendant, books and mug in three additional transparent cells.
- `assembly.js`: named frame extraction via alpha bounds, explicit placements, independent visibility/position/scale, lossless selected PNG export, placement JSON export. The ivy frame is reused twice. Building + thirteen prop instances = fourteen layers.

Sprite pixels remain raster; layout is editable. This is a static composition checkpoint before physics, animation, or relighting. Removing all baked lighting, matching consistent native pixel density and repairing any generated edge artifacts remain production work. No provider claims or licensing guarantees are made for branded character artwork.

Provenance: OpenAI built-in image generation, November 14 2026. Reference exec-0254474a-232f-4ba4-90fa-b753bc5194a6.png; building exec-80d274cf-7033-44ed-9c72-d504e77764f3.png; props exec-a3257dad-94a0-40b9-8648-22cddfb0b1fe.png; interior exec-5cc74dae-d444-48f7-9b0d-32d0eea7a986.png in this chat's generated_images folder. Source generation requested matching right-hand workshop style, shell with loose props removed, and strictly separated alpha atlases. Original generated files remain untouched.
