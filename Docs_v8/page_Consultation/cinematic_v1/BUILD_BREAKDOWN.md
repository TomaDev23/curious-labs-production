# Cinematic consultation — build breakdown (alignment note)

**Date:** 2026-09-13 · **For:** owner + build/art agents · **Status:** proposal for owner review.
This note does not replace the design contract. Authority order is unchanged:
`_FRAMING_LOCKED.md` > `COPY_DECK_v2.md` > `CuriousLabs_Consultation_Cinematic_Build_Plan_v1.0.md` (scenes, spaces,
art register, interactions, QA) > reference images (composition only). Live status stays in
`CuriousLabs_Consultation_Design_Tracker_v1.0.xlsx`.

---

## 1 · Where we already are

| Area | State | Plan item it serves |
|---|---|---|
| Design package filed in repo | `Docs_v8/page_Consultation/cinematic_v1/` (plan .md/.docx, tracker .xlsx, `references/scene-crops` SC-01…09, `references/thumbnails` REF-00…05) | WP-01 / WP-03 inputs |
| Art pipeline | **Built, verified, committed** (`3df5c5c`): `tools/art/generate.mjs`, `export.mjs`, `contact.mjs` + `.claude/skills/create-art` | WP-04, WP-05, QA-27, QA-28 |
| Page code | Unchanged since the plan's pinned cut `a49e632` (the only later commit is tools/skill) | WP-01 baseline still valid |
| Production art | None approved. Two low-quality **style probes** exist (Earth horizon, rock plateau) — not ART candidates | ART-01 / ART-04 direction only |

### Verified pipeline capabilities vs the art register

| Plan need | Pipeline reality (tested 2026-09-13) |
|---|---|
| Text-free raster masters | Yes — every prompt forbids text; reviewed before use |
| ART-01 2560×1440 master | Native (sizes must be divisible by 16; up to 3840×2160 verified). No upscaling |
| Separate phone crops | Generate a **native portrait** per asset — cropping landscapes to 9:16 lost the subject in testing |
| One look across a set | `--ref` style anchor (edits endpoint) works |
| Doors / cutouts with alpha | `--background transparent` produces real alpha |
| Budgets (hero ≤600 KB desktop / ≤350 KB phone; secondary ≤350/200) | Test exports: 54–168 KB (AVIF/WebP) — large headroom |
| Provenance (QA-27) | Raw log is gitignored → shipped files get a row in `ART_PROVENANCE.md` |
| Owner review | `contact.mjs` sheets before anything enters the page |

## 2 · Art register → how each asset gets made

Generation sizes are the plan's sizes snapped to the model's /16 rule.

| ART | Asset | Route | Desktop gen | Phone gen | Blocker |
|---|---|---|---|---|---|
| ART-01 | Earth-at-night / Asia horizon (SC-01, SC-09) | Generate | 2560×1440 | 1152×1536 native portrait → 640/960 exports | — |
| ART-02 | Technical doorway vista (cyan) | Generate | 1040×1456 (5:7) | derivative 640×900 | — |
| ART-03 | Business doorway vista (warm/violet) | Generate with `--ref` ART-02 | 1040×1456 | derivative 640×900 | ART-02 approved first |
| ART-04 | Three-walls terrain, small luminous path, **no figures, no monoliths** | Generate | 2560×1200 | 1152×1536 native portrait | — |
| ART-05 | **Verified** Phnom Penh at night | **Owner photo or licensed** — not generated | 2400×1600 source | 1080×1350 + short landscape cut | Owner supplies photo(s) |
| ART-06 | Dawn / Earth transition | Derivative of ART-01 first | crop | crop | ART-01 approved |
| ART-07 | Method reading path | Derivative of ART-04 (1200×800) | crop | 640×640 | ART-04 approved |
| ART-08 | Technology reading | Prefer SVG (VIS-05) | — | — | — |
| ART-09 | Real portrait | Deferred — owner photo only | — | — | Owner |
| ART-10 | Regional map | Deferred — sourced SVG | — | — | DEC-06 |

**Batch A (WP-04) estimate:** ~16 low-quality drafts (ART-01 ×5, ART-02 ×3, ART-03 ×3, ART-04 ×5) → one contact
sheet per asset → ~6 high-quality finals → exports + provenance rows.

## 3 · Build tracks

Three tracks run in parallel; each scene closes only through the plan's gates
(copy → art → desktop → phone → evidence → owner).

**Track A — Art (agent, create-art skill):** WP-04 batch A → WP-05 derivatives (ART-06/07) once masters are approved; ART-05 integrates owner photos.

**Track B — Build (agent):**
1. **WP-01 baseline** — record SHA, section heights at 1440 and 390, current screenshots.
2. **WP-06 static semantic skeleton** — split `ConsultationContent.jsx` into `scenes/*.jsx` with **no visual change**; keep D IDs, hashes, native readings, navbar, footer. Remove content-gating reveals from the hero (INT-01). No copy or art dependency, so it can start first.
3. **Scene kit** (built inside the pilot, reused after): `SceneArt` (`<picture>` desktop/phone sources + scrim + fail-safe background), `SceneSeam` (CSS mask edges, VIS-09), `SwipeTrack` (native scroll-snap + prev/next + name index + stacked fallback at 320px/zoom — INT-02/03/07), `ExpandToggle` (real button, `aria-expanded`, no hidden tab stops).
4. **WP-07 hero** with ART-01 draft → **WP-08 doors + walls pilot** with ART-02…04 drafts.
5. Then WP-09 contribution/harness → WP-10 person (city-only fallback) → WP-11 approach + R1–R4 → WP-12 engagement/questions/contact.
6. WP-13 responsive/state → WP-14 motion → WP-15 load/regression → finals swapped to high-quality art.

**Track C — Owner + copy editor:** WP-02 copy gates CP-01…09, decisions below, ART-05 photos, contact destinations (DEC-05).

Proposed file layout (names are proposals, matching the plan's seams):

```text
src/components/consultation/
  ConsultationContent.jsx        # thin: assembles scenes
  scenes/  HeroScene · AudienceScene · WallsScene · ContributionScene · PersonScene
           ApproachScene · EngagementScene · QuestionsScene · ContactScene
  visuals/ DoorVisual · Monoliths · HarnessSystem · OperatorPath · TrustVisual · EngagementRail
  kit/     SceneArt · SceneSeam · SwipeTrack · ExpandToggle
  consultation.css / consultation-scenes.css   # all scoped under .cl-consultation
public/consultation/  art-01-earth-horizon-{desktop,mobile}.{avif,webp} …
```

## 4 · Milestones

| Milestone | Contents | Exit |
|---|---|---|
| **M0** (done) | Package filed; art pipeline + skill committed | — |
| **M1 · first review slice** | WP-01, WP-06, kit, WP-07 hero, WP-08 doors + walls, all with **draft** art | Owner reviews SC-01…03 at 1440 and 390 (screenshots + real phone) — locks the visual language |
| **M2** | SC-04 harness, SC-05 person (city fallback or owner photo) | Same gates |
| **M3** | SC-06 + R1–R4, SC-07 engagement, SC-08 questions, SC-09 contact (pending state) | Same gates |
| **M4** | WP-13…15 QA passes; final high-quality art; provenance complete | QA-01…35 evidence |
| **M5** | WP-17 owner approval → commit/push on instruction. WP-18 homepage later | Owner release instruction |

## 5 · Decisions needed (differences between the plan and earlier conversation)

1. **Hero orbital.** The plan omits orbital labels (SP-01-06) and lets the Earth carry the hero. The earlier "option 1" orbital text becomes moot. *Recommend: drop the orbital from the hero.*
2. **Door motion.** Plan VIS-01 = 2D light/edge reveal. Alternative: a CSS 3D swing (not WebGL, purely decorative, no content on the door leaf). *Owner choice; default 2D.*
3. **Scroll locking.** DEC-02 = no pinned scenes, at most one later sticky trial on SC-04 desktop. This is stricter than the earlier "lock, slide, release" idea. Drama comes from art, seams, swipe tracks and local motion. *Recommend: accept the plan default.*
4. **Readings.** DEC-03 = inline expansion on both layouts, not bottom sheets. *Recommend: accept.*
5. **ART-05 photos.** A verified Phnom Penh night image can't be generated honestly. *Owner: supply 2–3 night shots (rooftop/riverside, ≥2400 px wide) or approve licensed stock.*
6. **Full-resolution references.** The plan cites a `references/` ZIP folder that wasn't in the handoff; only docx-embedded thumbnails are filed. *Owner: drop the six PNGs into `cinematic_v1/references/`.*
7. **Tracker updates.** Agents can't edit the .xlsx without installing a spreadsheet library outside the repo. *Choose: owner updates the workbook from agent reports, or allow a scratch-only install so agents update it directly.*
8. **Phone evidence (QA-06/31/32).** The Chrome harness can't emulate 390 px and blanks below the fold. *Proposal: allow the app's built-in Browser pane (real mobile viewport emulation) for 390×844 screenshots, plus the owner's real-phone check.*
9. **Concurrent copy editing.** WP-06 moves strings from `ConsultationContent.jsx` into `scenes/*.jsx`. *The copy agent should pause edits to that file during the split, then edit the scene files.*

## 6 · Resolved 2026-09-13 (owner)

Defaults accepted for §5.3–§5.8 **and** the earlier dynamic direction kept as progressive enhancement — see
`DRAMA_LAYER.md` (DR-01…09). §5.1: the hero orbital stays on desktop with the option-1 labels (DR-01). §5.2: the 2D
light reveal is the base state, with a decorative CSS-3D door leaf layered on top (DR-02). Work proceeds as a two-seat team (`TEAM_PROTOCOL.md`) on branch
`design/cinematic-consultation`; tasks in `TASKS.md`, coordination in `LEDGER.md`.
