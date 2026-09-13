# 00_INDEX — cinematic consultation build

Entry point for every seat. Owned by `[MGR]`; others propose changes via the ledger.

## Summary
Rebuilding `/ai-consultation` as nine cinematic scenes (plan v1.0) on branch `design/cinematic-consultation`, with a
four-seat team (protocol v2): **AI consultation manager** (specs, art, audits) and three builders on file-disjoint lanes —
**A** (Opus: kit, doors, walls, harness), **B** (Codex: person, approach), **C** (Sonnet: hero, engagement, questions, contact).
Target: every scene built to the owner's mockups (`MOCKUP_CANON.md`).

## Read in this order
1. `TEAM_PROTOCOL.md` — seats, file lanes, git rules, communication, mark format.
2. `LEDGER.md` — the live coordination log (append-only).
3. `TASKS.md` — task board + M1 cards + asset contract.
4. **`MOCKUP_CANON.md` — the binding visual target (owner, 2026-09-13); mockups in `references/mockups/`.**
4a. `CANON_KIT.md` — shared tokens, type scale, primitives (lane A builds it; everyone uses it).
4a1. **`MOTIF_PROGRESSION.md` — owner 2026-09-13: the image journey + light-line thread + layout rhythm; overrides mockup reuse of Earth/quote blocks.**
4a2. **`COPY_CANON.md` — the words for every scene slot (mockup copy adapted to the framing).**
4b. `SCENE_SPECS.md` — per-scene build spec: layout, phone flow, art paths, copy rule, acceptance.
5. `DRAMA_LAYER.md` — the dynamic moves layered on the plan (DR-01…09; canon wins where they differ).
6. `CuriousLabs_Consultation_Cinematic_Build_Plan_v1.0.md` — design contract (scenes, spaces, art register, interactions, QA).
7. `BUILD_BREAKDOWN.md` — how the plan maps onto the art pipeline, tracks and milestones.
8. Higher authority, unchanged: `../_FRAMING_LOCKED.md` → `../COPY_DECK_v2.md`.

## Artifacts
| File | What |
|---|---|
| `CuriousLabs_Consultation_Cinematic_Build_Plan_v1.0.{md,docx}` | Owner's design contract (docx carries the scene crops) |
| `CuriousLabs_Consultation_Design_Tracker_v1.0.xlsx` | Owner's live status workbook (owner updates from ledger reports) |
| `references/scene-crops/SC-*.jpg` | Composition references per scene (extracted from the docx) |
| `references/thumbnails/REF-*.jpg` | Low-res REF-00…05 thumbnails (full PNGs pending from owner) |
| `references/mockups/MOCK-*.png` | **Binding design mockups** D1–D5 desktop + M1 phone flow (see MOCKUP_CANON.md) |
| `MOCKUP_CANON.md` | What must match per scene, what is not taken from the mockups, placeholder-copy and character rules |
| `BUILD_BREAKDOWN.md` | Plan ↔ art pipeline alignment, tracks, milestones, decisions |
| `DRAMA_LAYER.md` | DR-01…09 progressive-enhancement moves |
| `TEAM_PROTOCOL.md` | Two-seat operating contract |
| `TASKS.md` | Task board (B-xx builder, M-xx manager) |
| `LEDGER.md` | Coordination marks |
| `ART_PROVENANCE.md` | Committed record of every shipped image (QA-27) |

## Tools
- Art: `.claude/skills/create-art/SKILL.md` → `tools/art/{generate,export,contact}.mjs` (manager only).
- Orchestration method: `C:/AEGIS/skill_build/orchestrator-mode/SKILL.md` (+ `references/paired_orchestration.md`).

## Open findings (each with the test that settles it)
| Finding | Settled by |
|---|---|
| Wall responses (SC-03) have no approved copy | Owner/Captain supplies 3 responses (M-04) |
| Card B title undecided ("Companies new to AI" vs "Non-technical companies") | CP-01 owner decision |
| ART-05 needs a verified Phnom Penh night photo | Owner supplies photo(s) ≥2400px wide or approves licensed stock |
| Full-resolution REF-00…05 PNGs missing | Owner drops them into `references/` |
| Vercel preview deployments for the branch | Owner/manager confirms a preview URL after the first branch push |
