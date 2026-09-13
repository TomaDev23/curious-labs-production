# Art queue — Codex generates, manager curates

**Route (owner, 2026-09-13):** Codex's built-in `image_gen` tool produces the art; the paid OpenAI API is no longer used
for finals. Codex output is tool-managed (test: 1536×1024 PNG, no size/quality control) — fine for cards, tiles,
readings and dark atmosphere bands. Already-shipped 2560px art (ART-01…05, 09) stays.

**Workflow**
1. `[MGR]` adds a row below with the prompt file (`tools/art/prompts/<id>.txt`) and the target use.
2. `[BLD-B]` generates **2 variants** per row, saves raw PNGs to `tools/art/_raw/codex-<id>-v1.png`, `-v2.png`
   (the only files outside lane B that B may write; `_raw` is gitignored), then posts one `#B-nnn ASSETS-RAW` mark
   listing the files. Ask for portrait in the prompt when the row says portrait. Never add text, logos, faces.
3. `[MGR]` reviews on a contact sheet, picks, exports with `tools/art/export.mjs` to `public/consultation/`, records
   provenance, posts `#MGR-nnn ASSETS`, and asks for a re-roll with notes if nothing works.
4. Builders code against the target paths now; `SceneArt`/`ImageTile` show a fallback until the file exists.

Generate in priority order; interleave with X-01/X-02 build work (e.g. while waiting on the kit).

| Pri | ID | Prompt file | Orientation | Target path(s) under `/consultation/` | Used by | Status |
|---|---|---|---|---|---|---|
| 1 | art-12-harness-core | `art-12-harness-core.txt` | square/landscape, **pure black bg** | `art-12-harness-core.{avif,webp}` | A · SC-04 centre | Done (v1) |
| 2 | art-13-tile-city-lights | `art-13-tile-city-lights.txt` | landscape | `art-13-tile-city-lights` | A · SC-04 left tile | Done (v1) |
| 3 | art-14-tile-summit | `art-14-tile-summit.txt` | landscape | `art-14-tile-summit` | A · SC-04 right tile (placeholder figure) | Done (v2) |
| 4 | art-15-horizon-mountains | `art-15-horizon-mountains.txt` | landscape (wide) | `art-15-horizon-mountains` | A · SC-04 bottom band | Done (v1) |
| 5 | art-06-earth-sunrise | `art-06-earth-sunrise.txt` | landscape | `art-06-earth-sunrise` | B · SC-06 band 1 | Done |
| 6 | art-07-reading-method | `art-07-reading-method.txt` | landscape | `art-07-reading-method` | B · SC-06 R1 card | Done |
| 7 | art-08-reading-concept | `art-08-reading-concept.txt` | landscape | `art-08-reading-concept` | B · SC-06 R2 card | Done |
| 8 | art-10-reading-technology | `art-10-reading-technology.txt` | landscape | `art-10-reading-technology` | B · SC-06 R3 card | Done |
| 9 | art-11-reading-experience | `art-11-reading-experience.txt` | landscape | `art-11-reading-experience` | B · SC-06 R4 card (placeholder figure) | Done |
| 10 | art-16-galaxy-band | `art-16-galaxy-band.txt` | landscape (wide) | `art-16-galaxy-band` | C · SC-07 | Done |
| 11 | art-17-final-horizon-desktop | `art-17-final-horizon-desktop.txt` | landscape | `art-17-final-horizon-desktop` | C · SC-09 | Done |
| 12 | art-17-final-horizon-mobile | `art-17-final-horizon-mobile.txt` | **portrait** | `art-17-final-horizon-mobile` | C · SC-09 phone | Done |
| 13 | art-18-monolith-face | `art-18-monolith-face.txt` | **portrait, transparent** (else pure black) | `art-18-monolith-face.{avif,webp}` | A · SC-03 wall faces | Done (v1, real alpha) |

Figures in rows 3 and 9 are placeholder characters (MOCKUP_CANON §4): small, from behind, no face.

### Batch 4 — walker poses for DR-10 (same character as `art-09-figure-walker`)
Prompt file `art-19-walker-turnaround.txt`; replace `{POSE}` per row; pass `public/consultation/art-09-figure-walker.webp` (or `tools/art/_raw/art-09-figure-walker-final-*.png`) as the **reference image** so all poses are the same person. Portrait, transparent. 2 variants each.

| Pri | ID | {POSE} | Target | Status |
|---|---|---|---|---|
| 14 | art-19a-walker-three-quarter-left | standing, body turned three-quarters to the viewer's left, head looking left, arms relaxed | `art-19a-walker-three-quarter-left` | Done (v1) |
| 15 | art-19b-walker-profile-left-stride-1 | full side profile facing the viewer's left, mid-stride walking, left leg forward, right arm forward | `art-19b-walker-profile-left-stride-1` | Done (v1) |
| 16 | art-19c-walker-profile-left-stride-2 | full side profile facing the viewer's left, mid-stride walking, right leg forward, left arm forward | `art-19c-walker-profile-left-stride-2` | Done (v1) |
| 17 | art-19d-walker-profile-left-passing | full side profile facing the viewer's left, legs passing under the body between strides, one arm slightly raised behind as if pulling a line | `art-19d-walker-profile-left-passing` | Dropped — reroll returned a painted checkerboard; stride cycle used instead (#MGR-052) |

### Batch 5 — motif progression (MOTIF_PROGRESSION.md §4) — **do before batch 4 walker poses? No: after art-18, before batch 4**
| Pri | ID | Prompt file | Orientation | Replaces | Status |
|---|---|---|---|---|---|
| 18 | art-21-first-light-ridges | `art-21-first-light-ridges.txt` | landscape wide | ART-06 in SC-06 band 1 | Done |
| 19 | art-20-river-predawn | `art-20-river-predawn.txt` | landscape wide | ART-01 reuse in SC-05 band 4 | Done |
| 20 | art-25-tile-city-grid | `art-25-tile-city-grid.txt` | landscape | ART-13 SC-04 left tile | Done |
| 21 | art-23-reading-converging-roads | `art-23-reading-converging-roads.txt` | landscape | ART-08 R2 card | Done |
| 22 | art-24-reading-valley-overlook | `art-24-reading-valley-overlook.txt` | landscape | ART-11 R4 card (placeholder figure) | Done |
| 23 | art-22-momentum-ribbons | `art-22-momentum-ribbons.txt` | landscape wide | ART-16 SC-07 band | Done |
Order for Codex: row 13 (art-18) → batch 5 (rows 18–23) → batch 4 (rows 14–17).
