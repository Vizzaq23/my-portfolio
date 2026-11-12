# Sunny comparison: observed execution

November 11, 2026. User authorized operation and observation, plus an independent Codex plan and implementation. No artificial specialist outputs or simulated execution.

## Actual attempt

The registered app launcher started the development package at `.sunny-dev/voyage-bar-m4/.sunny-dev/approval-qualified-38e3300/package/win-unpacked/Sunny HQ.exe`. Startup diagnostics identified source commit `38e33006135acbd44d6ccb5d14c976610b23cdbc`. Its initial window was blank. That task-launched process was stopped; no saved profile was replaced.

Launched the installed `0.11.0-smooth-48ba1a0` application. Startup log confirms source commit `48ba1a04aacba68b4761e0de0b1b5851dd16c3b3`, Electron 44.4.3, app 0.11.0. This UI rendered normally. Settings explicitly state supervised crew execution is unavailable in this build. Local profile explicitly states it does not edit files, browse or run checks. Codex is separately connected; that is not evidence of local inference.

Selected Portfolio in Luffy's local profile. Configured model label: `qwen2.5-coder:14b` (configuration, not proof of downloaded weights). Submitted the portfolio brief through **Ask locally**. The result was **Reply failed** and **Ollama is unavailable. Start it with a downloaded local model, then refresh.** The default endpoint `127.0.0.1:11434/api/tags` was also unavailable; no Ollama process or PATH command was found.

Observed flow: user brief → Portfolio/Luffy local profile → local provider attempt → unavailable-provider error. No model answer, specialist handoff, implementation, build or completed mission was observed. No cloud fallback used. Token counts and inference time unavailable; do not invent zeros or estimate a model speed from an immediate connection failure. The initial setup/inspection overhead is not model inference latency.

This was the initial blocked state, superseded by the authorized setup and completed runs below. Existing unrelated mission records were not resumed.

## Submitted local brief

Plan a professional, polished redesign of Quintin Vizza's portfolio. Preserve software and physical engineering, playful retro details, and Mario/One Piece identity. Audience: software engineering recruiters and collaborators. Projects: Pinball (Python/Pygame/Raspberry Pi physical machine), One Piece TCG Shelf, Sunny HQ, Adaptive Combat Trainer, TCG Coach, Trading Agent, AI Game Balancer, Custom Arcade Cabinet and Project Lavender. Preserve all original content. Previous folded-atlas and flat side-scrolling-world prototypes were rejected; do not reuse them. Deliver a creative brief, three distinct visual directions, recommendation and tradeoffs, asset needs, and staged implementation plan for one polished introduction/project/return journey before expansion. Advice based on this brief only: do not claim file access, browsing, artwork generation, implementation or tests. If supported, route to the smallest useful local team and report actual handoffs. Local models only; report provider failure rather than cloud fallback. This is a real comparison, not a simulation.

## Fairness limits

The local brief includes project descriptions because the local profile has no autonomous file access. Codex independently inspects the repository and can use image generation and a browser. Keep those capability differences visible. A future implementation test needs an isolated authorized output directory and an execution-capable qualified Sunny build; do not bypass its disabled gate to create a favorable demonstration.

## Authorized setup and successful direct reply

The user authorized installing Ollama and suitable weights. Hardware inspection found 64 GB RAM and an AMD Radeon RX 9070 XT. Installed official Ollama 0.40.16 through winget; installer hash verification passed. Pulled `qwen2.5-coder:14b` successfully (8,988,124,298 bytes; digest `9ec8897f747e246e970bc5cfdda85d22f1123dc2e3d34978a010a75968716849`). The running provider reported context length 16,384 and GPU residency. No Sunny source, execution gate or cloud fallback was changed.

Retried the same direct profile brief after refreshing the catalog. UI reached **Reply ready · advice only**. It proposed Retro Digital, Minimalist Futuristic and Anime-inspired directions, but gave generic tradeoffs and an invented multiweek schedule, including deployment/promotion as advice. No deployment occurred. Ollama recorded 918 generated tokens at 29.59 tokens/second; HTTP request duration 42.79 seconds. This direct profile did not hand off to specialists.

## Real local council

Used the separate **Talk to Luffy → Ask Luffy & crew** surface, selected Portfolio, and submitted a more explicit planning-only brief. This is a second, differently prompted run, not a repeat of the direct-profile benchmark. Full prompt and unedited model outputs are retained in [sunny-council-output.md](sunny-council-output.md).

Council `43638572-45ea-4b8d-8295-94cf54b87a18` reached `ready`: Luffy routing → Nami scope → Sanji flow/accessibility → Brook visual directions → Zoro cross-review → Luffy synthesis. All used `qwen2.5-coder:14b`, concurrency 1. UI showed all three contributions and a fresh cross-review ready. Saved record elapsed time: **298.284 seconds (4m 58s)**, excluding installation/download and the earlier direct reply.

Six sequential provider calls generated 147, 686, 888, 1460, 1917 and 1199 tokens respectively (6,297 total). The three specialist calls generated about 29–32 tokens/second; the longer review/synthesis calls about 17 tokens/second. These are observed local log rates, not general hardware benchmarks. No cloud-model token-cost comparison or electricity estimate was made.

### What worked

- The app performed real local routing, contributions, cross-review and synthesis; this was not a simulated crew transcript.
- Brook's full answer supplied all three directions, including composition, colors, typography, mobile, entry/return and asset requirements.
- The app visibly warned that reports were shortened for Luffy's context. The saved record confirms `synthesisLimited: true`.

### Where quality broke down

- Nami invented a 14-day schedule despite the explicit no-invented-deadlines constraint; Sanji and Luffy added different week estimates.
- Sanji asserted current navigation/accessibility defects and prior user complaints without inspecting the site or receiving those reports. These claims are unsupported, not audit findings.
- Brook misclassified Adaptive Combat Trainer as physical and leaned on generic visual styles and hypothetical portrait assets. Its minimal direction explicitly trades away some retro identity.
- Brook's full report contains a third direction, **Bold, Heroic with a Twist**, but the review and final synthesis treat the proposal as incomplete. The shortened context visibly loses useful work and produces unnecessary follow-up requests. This is an observed integration failure; no claim is made about an uninspected truncation implementation.
- Review did not reliably catch fabricated evidence or conflicting schedules. Luffy repeated the unsupported site analysis and recommended generic minimalism.

Sunny completed a local **planning** pipeline. It did not edit files, create visual assets, open a preview, run tests or implement this portfolio. The installed build's execution limitation remains. Repeating the same run is not a substitute for fixing context preservation and evidence handling.

## Independent implementation and comparison

Codex proposed three directions in [creative-brief.md](creative-brief.md) and a local [direction board](direction-board.html), then built the recommended builder's studio at `/studio`, on `codex/portfolio-restart`. Original content remains the source of truth. New miniature-workshop art is labeled concept illustration, not real project evidence or interactive 3D.

The prototype has an introduction, a nine-project filterable index, full original project records, real media/demos, and ordinary project/return links. It preserves the live homepage, About, experience, resume and contact routes. Production build, TypeScript and scoped ESLint passed. Browser checks covered all nine project routes, filtering, Pinball return, TCG playback/Escape/focus restoration and original homepage styling isolation. Desktop and mobile screenshots were inspected; one 320px check found no overflow. A later multi-size loop did not apply its requested viewport widths reliably and is **not** counted as a passing responsive matrix. Full assistive-technology and cross-browser audits were not repeated. Reduced-motion rules are implemented; not certified by a full accessibility audit.

The standalone direction-board HTML was not browser-reviewed: local file navigation was blocked by the browser security policy, and no alternate serving workaround was used. The separate running application preview was reviewed normally.

This is a workflow comparison, not a controlled model contest: Codex had repository, browser and image tools; Sunny had supplied text and local planning roles. User visual acceptance remains pending. Neither a successful build nor a completed council means the new direction is accepted. Next product step: review the studio composition and identity before adding richer motion or bespoke art. Next Sunny step: preserve complete specialist output through review/synthesis and distinguish observed evidence from proposed improvements, then separately qualify an execution-capable build.
