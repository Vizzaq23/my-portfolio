# Player introduction / world map review

Title Start now opens `/atlas/player-preview/index.html` at the top level, including when embedded in the 3D TV. Skip to portfolio remains unchanged. `#map` opens the map directly.

First review pass: assembled sprite entrance, three equipment choices with real skill/project descriptions, cosmetic spotlight colors, concise about text, immediate header skip, four map destinations to original portfolio sections, selected-destination player marker. Keyboard buttons, live detail announcements, focus transfer on page changes, responsive stacking and CSS reduced-motion support included. Original homepage/project content is untouched.

This is not yet full character creation: hairstyle/clothes stay fixed, items are overlays on a static pose, and map travel is selection rather than an animated walk. The map now uses a moonlit coastal pixel-art backdrop with semantic HTML destinations. Equipment and lighting choices persist in sessionStorage for this browser tab; no tracking.

Character: imagegen transparent sprite based on approved night-screen likeness. Source `exec-1d50b704-cf81-4002-b614-9d01c2dfd354.png`, November12 2026; Chopper-shirt fan element retained at user request. Brief: adult blond/bearded character, black Chopper tee, charcoal trousers, teal rim light, crisp pixel art, transparent full-body standing pose. Equipment icons are authored SVG, rendered in browser.

Content checked against existing portfolio and `src/data/projects.ts`, `src/data/experience.ts`. Build (including types/lint) and JS syntax passed. Browser verified title Start route, circuit/notebook selection, cosmetic selection, keyboard map entry, four destination link values, and no horizontal overflow at the narrow review viewport. No production deployment.

November 13 polish: workshop portrait backdrop, coastal map artwork, compact desktop layout, visible mobile portfolio exit, matching equipment icons, arrow-key choice navigation, pause control, and tab-session equipment/light memory. Paused entrances stay visible when returning from the map. Generated image sources: workshop exec-9ba133e4-ba4b-4998-a849-00ce7e6d946c.png; world map exec-28baca4e-ee09-4278-a9f2-b20b53c0282a.png. Browser checked desktop and 390px layouts, loaded images, pause/return visibility, saved equipment on reload, map keyboard selection and destination URL. Build/type/lint and JavaScript syntax passed. Map remains selection-based; no walking sprite cycle or full character editor.
