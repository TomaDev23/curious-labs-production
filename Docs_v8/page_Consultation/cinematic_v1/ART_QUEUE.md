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
| 5 | art-06-earth-sunrise | `art-06-earth-sunrise.txt` | landscape | `art-06-earth-sunrise` | B · SC-06 band 1 | Queued |
| 6 | art-07-reading-method | `art-07-reading-method.txt` | landscape | `art-07-reading-method` | B · SC-06 R1 card | Queued |
| 7 | art-08-reading-concept | `art-08-reading-concept.txt` | landscape | `art-08-reading-concept` | B · SC-06 R2 card | Queued |
| 8 | art-10-reading-technology | `art-10-reading-technology.txt` | landscape | `art-10-reading-technology` | B · SC-06 R3 card | Queued |
| 9 | art-11-reading-experience | `art-11-reading-experience.txt` | landscape | `art-11-reading-experience` | B · SC-06 R4 card (placeholder figure) | Queued |
| 10 | art-16-galaxy-band | `art-16-galaxy-band.txt` | landscape (wide) | `art-16-galaxy-band` | C · SC-07 | Queued |
| 11 | art-17-final-horizon-desktop | `art-17-final-horizon-desktop.txt` | landscape | `art-17-final-horizon-desktop` | C · SC-09 | Queued |
| 12 | art-17-final-horizon-mobile | `art-17-final-horizon-mobile.txt` | **portrait** | `art-17-final-horizon-mobile` | C · SC-09 phone | Queued |

Figures in rows 3 and 9 are placeholder characters (MOCKUP_CANON §4): small, from behind, no face.
