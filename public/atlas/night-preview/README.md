# Night title motion study

Open `/atlas/night-preview/index.html`. Standalone Canvas 2D study, separate from the existing 3D intro and live homepage. Start/Skip link directly to the current homepage.

Shared wind drives independent transparent foliage sprites with individual spring angles and response phases. The poster is a separate texture drawn as twelve connected paper segments, with the top segment fixed and lower segments responding to spring forces. Integration uses a fixed 120Hz timestep. Water uses shimmer fragments, without background displacement. Lighthouse and lamp lights are additive overlays. Pause freezes scene time; OS reduced-motion starts paused, with an explicit Play override. No audio or dependencies.

This is an articulated spring model, not a full cloth/fluid simulation. Background, canopy and poster are separate layers; no scene-row warping remains. The clean background removes the original poster, overhead canopy and baked lighthouse beam. Flag, grass, boats and character currently remain static; only water highlights animate. Foliage sprigs rotate independently at their stems, rather than simulating every individual leaf. Further authored sprite work can improve leaf variety and paper perspective.

`night.png`: generated concept from the approved November 12 2026 night palette exploration, source `exec-13d14b31-40d2-4853-9bbc-8fe064f4f83c.png`. Contains requested One Piece/Mario-inspired fan elements; not a claim of ownership of those characters.

`background.png`: imagegen clean-plate edit, source `exec-70307dab-4f03-4828-afda-3aa877e51303.png`. `foliage.png`: imagegen transparent moonlit sprig, source `exec-f178619b-da21-48a0-909d-f297f58a7700.png`. Poster texture is sampled from the original image during rendering. Briefs: remove poster/canopy/beam while preserving scene; generate isolated navy/teal/sage pixel foliage with transparent gaps. Generated assets were copied into this folder for runtime use.

Verified: JavaScript syntax, TypeScript check, Next production build, advancing scene time, stable pause, reduced-motion startup, and no horizontal overflow at 390px. Local preview server: port 3019.

Layered revision verification: syntax/types/build passed; browser verified loading all layers, advancing time, gust response and pause/resume. Reduced-motion logic and responsive layout retained from first pass.
