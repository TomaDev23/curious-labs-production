# Team protocol — manager + three builders (v2, 2026-09-13)

Paired/multi-seat run under the owner's **orchestrator-mode** skill (`C:/AEGIS/skill_build/orchestrator-mode/SKILL.md`,
especially `references/paired_orchestration.md`). Ledger contract: **advisory + mandatory-ack**.
v1 (manager + one builder) is superseded; its history stays in the ledger.

## Seats

| Seat | Tag | Engine | Lane | Owns |
|---|---|---|---|---|
| **AI consultation manager** | `[MGR]` | Opus | Management | Specs (`CANON_KIT.md`, `SCENE_SPECS.md`, `TASKS.md`), all art, audits against the mockups, owner comms, decisions, merges of scene order, provenance |
| **AI consultation builder A** | `[BLD-A]` | Opus | A — kit + hardest scenes | Canon kit, `ConsultationIcons.jsx`, `ConsultationContent.jsx` (scene order), SC-02 doors, SC-03 walls, SC-04 contribution/harness |
| **AI consultation builder B** | `[BLD-B]` | Codex | B — story scenes | SC-05 person, SC-06 approach + readings |
| **AI consultation builder C** | `[BLD-C]` | Sonnet (formerly `[BLD]`) | C — ends of the page | SC-01 hero finish, SC-07 engagement, SC-08 questions, SC-09 final + contact + page footer |
| **Owner** | `[OWNER]` | — | — | Copy approval (Captain), art approval, decisions, release |

## File lanes (file-disjoint — the rule that makes parallel work safe)

| Lane | Files it may edit |
|---|---|
| A | `src/components/consultation/kit/**` (incl. `kit/kit.css`), `ConsultationIcons.jsx`, `ConsultationContent.jsx`, `useConsultationPage.js`, `ConsultationMotion.jsx`, `scenes/AudienceScene.jsx`, `scenes/WallsScene.jsx`, `scenes/ContributionScene.jsx`, their `scenes/css/sc-02-doors.css`, `sc-03-walls.css`, `sc-04-contribution.css`, their `scenes/copy/*.copy.js`, `visuals/{DoorVisual,Monoliths,HarnessSystem}*` |
| B | `scenes/PersonScene.jsx`, `scenes/ApproachScene.jsx`, `scenes/css/sc-05-person.css`, `sc-06-approach.css`, their copy files, `visuals/{OperatorPath,ReadingCard}*` and any new `visuals/b-*` files |
| C | `scenes/HeroScene.jsx`, `scenes/EngagementScene.jsx`, `scenes/QuestionsScene.jsx`, `scenes/ContactScene.jsx`, `scenes/css/sc-01-hero.css`, `sc-07-engagement.css`, `sc-08-questions.css`, `sc-09-contact.css`, their copy files, `src/pages/ai-consultation.jsx` (shell + footer), `ConsultationOrbit.jsx`, `_orbit.svg`, new `visuals/c-*` files |
| MGR | `public/consultation/**`, `tools/art/**`, `.claude/skills/**`, `Docs_v8/page_Consultation/cinematic_v1/**` |

- **Each scene imports its own CSS file** (`import './css/sc-0X-….css'`). `consultation.css` is legacy and frozen;
  `consultation-scenes.css` is being emptied by A-00 (kit rules → `kit/kit.css`, hero rules → `scenes/css/sc-01-hero.css`)
  and then frozen. Every selector stays under `.cl-consultation`.
- Shared-but-owned files (`ConsultationGraphs.jsx`, `ConsultationFigures.jsx`, `consultation.css`): **frozen** — copy what
  you need into your lane; don't edit them.
- Need something in another lane (a kit prop, an icon, scene order)? `STEER` mark to that seat. Don't edit it.
- Out of bounds for all without an owner mark: navbar, `src/components/landing/**`, MoonSignal/AEGIS, `package.json` /
  new deps, `vercel.json`, other routes.

## Git (one shared working tree, one branch)

- Branch **`design/cinematic-consultation`** for everyone. **Never** `checkout`, `switch`, `stash`, `reset`, `rebase`,
  `pull`, `merge`, or commit to `main`.
- Commit **only your lane's paths** by explicit pathspec — never `git add -A` / `git add .` / `git commit -a`:
  `git add <new lane files>` then `git commit -m "[BLD-X] <task>: …" -m "Co-Authored-By: …" -- <lane paths>` then
  `git push origin design/cinematic-consultation`.
- Restoring your **own** uncommitted lane files is allowed with `git restore -- <your paths>`; never for anyone else's.
- `index.lock` → wait 5 s and retry (4 committers share one repo). Never delete it unless it is older than 2 minutes.
- Commit when a task's self-checks pass. Fixes after an audit are follow-up commits, never history rewrites.

## Shared dev server (one page, four editors)

- Owner's server, already running: `http://localhost:5173/ai-consultation`. Never start one.
- Keep your files compiling — save complete edits. A syntax error in any lane blanks the whole page for everyone.
- If the page is broken by another lane's file: post an `OBSERVATION` naming the file, then wait or work on non-visual parts.
  Don't fix other lanes' files.
- Kit gallery for audits: `http://localhost:5173/ai-consultation?kit=1` (dev only, built by A-01).

## Communication

- **Ledger first** (`LEDGER.md`, append-only). **New id scheme from #L-038 on:** each seat numbers its own marks —
  `#MGR-001`, `#A-001`, `#B-001`, `#C-001` … — so parallel writers never collide. Re-read the tail right before appending.
- **Direct messages** (desktop sessions) only to wake a seat: task DONE / blocked / assets ready / new tasks. One line
  pointing at the mark id. Session names: "AI consultation manager", "AI consultation builder A",
  "AI consultation builder B", "AI consultation builder C". A seat that can't message (e.g. Codex) uses the ledger only;
  the manager polls it.
- Only `[MGR]` talks to the owner. Builders raise `ESCALATE` marks.

## Mark format

```
#<SEAT>-<nnn>  <TYPE>  [<TAG>]  <YYYY-MM-DDTHH:MM from the shell clock>
<one clear claim / instruction / result; reference task ids and prior mark ids>
```
Types: `START` · `DONE` (self-checks passed, commit sha, captures compared with the mockup, delta list) · `OBSERVATION` ·
`STEER` (must respond) · `BLOCKING` (halts that task) · `ACK` · `DEFER` (with reason) · `ESCALATE` · `ASSETS`.

## Authority

`_FRAMING_LOCKED.md` (meaning, voice, don't-invent rules) > **`COPY_CANON.md` (scene words, from the mockups)** > `COPY_DECK_v2.md` (FAQ, readings, contact details) >
**`MOCKUP_CANON.md` + `references/mockups/`** (look, layout, phone flow) > `CANON_KIT.md` + `SCENE_SPECS.md` >
plan v1.0 (interactions, QA) > `DRAMA_LAYER.md` > `TASKS.md`.

## Working rules (all builders)

- Repo shell is PowerShell (no `&&`; chain with `;`). Bash also available.
- Evidence: desktop 1440×900 + phone (Browser pane `resize_window` preset `mobile`). Scroll a section into view
  before capturing. Compare each capture **with the mockup image** (open both). A blank capture is not a pass.
- Never invent copy (see `SCENE_SPECS.md` copy rule). Never add people, faces, "we", "Book", fake numbers or services.
- `npm run build` only at a milestone check the manager asks for.
