# Team protocol — AI consultation manager + AI consultation builder

Paired run under the owner's **orchestrator-mode** skill (`C:/AEGIS/skill_build/orchestrator-mode/SKILL.md`,
especially `references/paired_orchestration.md`). Ledger contract: **advisory + mandatory-ack**.

## Seats

| Seat | Tag | Model | Owns | Never does |
|---|---|---|---|---|
| **AI consultation manager** | `[MGR]` | Opus | Design direction, task cards (`TASKS.md`), art creation (`create-art` skill), asset delivery, independent audit of every builder task, owner communication, decisions, provenance, tracker status reports | Edit `src/**` page code |
| **AI consultation builder** | `[BLD]` | Sonnet | All page code: `src/components/consultation/**`, `src/pages/ai-consultation.jsx`; self-verification in the browser; builder marks in the ledger | Generate art, change task scope, make owner decisions, touch files outside its lane |
| **Owner** | `[OWNER]` | — | Copy approval (Captain), art approval, decisions, release | — |

## File lanes (file-disjoint; operator-confirmed co-build)

- **[BLD]:** `src/components/consultation/**`, `src/pages/ai-consultation.jsx`.
- **[MGR]:** `public/consultation/**`, `tools/art/**`, `.claude/skills/**`, `Docs_v8/page_Consultation/cinematic_v1/**`.
- **Shared, append-only:** `Docs_v8/page_Consultation/cinematic_v1/LEDGER.md` — both append marks at the end; never edit or delete an earlier mark. Re-read the tail right before appending.
- **Out of bounds for both without an owner mark:** `src/components/navigation/**`, `src/components/landing/**` (if ever touched, re-check `/`), MoonSignal/AEGIS, `package.json` / new deps, `vercel.json`, any other route.
- A needed edit outside your lane → `STEER` mark to the owning seat; don't make it yourself.

## Git (one shared working tree — read carefully)

- Work branch: **`design/cinematic-consultation`**. Both seats stay on it. **Never** `checkout`, `switch`, `stash`, `reset`, `rebase`, `pull`, `merge`, or commit to `main`. Merge to `main` happens only on an owner instruction.
- Commit **only your lane's paths**, by explicit pathspec — never `git add -A`, `git add .`, or `git commit -a`:
  ```
  git add <new files in your lane>
  git commit -m "[BLD] B-02: split scenes (no visual change)" -m "Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>" -- <your paths>
  git push origin design/cinematic-consultation
  ```
  Manager commits use `[MGR]` and `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- Commit when a task's self-checks pass (branch commits are reversible). The manager audits after; a `BLOCKING` mark is fixed by a follow-up commit, never by rewriting history.
- `index.lock` present → wait ~5 s and retry. Never delete it unless it is older than 2 minutes.
- Management docs (`TASKS.md`, `LEDGER.md`, `00_INDEX.md`) are committed and pushed immediately after meaningful changes, in their own commit.

## Communication

- **Ledger first.** Every task start, finish, question, and finding is a mark in `LEDGER.md`.
- **Direct messages** (desktop session messaging, sessions named exactly `AI consultation manager` / `AI consultation builder`) only to wake the other seat: *task ready for audit*, *blocked*, *assets ready*, *new tasks queued*. Body = one line pointing at the mark id (e.g. "B-02 ready for audit — see #L-012"). Batch; don't ping per small item.
- Only `[MGR]` escalates to the owner. `[BLD]` raises `ESCALATE` marks; the manager carries them.

## Mark format (append at end of LEDGER.md)

```
#L-<nnn>  <TYPE>  [<TAG>]  <YYYY-MM-DDTHH:MM>
<one clear claim / instruction / result; reference task ids and prior #L ids>
```

Types: `START` · `DONE` (task self-checks passed, commit sha) · `OBSERVATION` · `STEER` (must respond) · `BLOCKING` (halts that task) · `ACK` · `DEFER` (with reason) · `ESCALATE` · `ASSETS` (files delivered, paths).
Every `STEER` / `BLOCKING` gets `ACK`-and-act, `DEFER`-with-reason, or `ESCALATE`. No silent ignores. Next id = last id + 1.

## Working rules (both seats)

- Repo shell is PowerShell (no `&&`; chain with `;`). The Bash tool also works.
- Dev server is the owner's, already running — probe `http://localhost:5173/ai-consultation` (tab title "AI Integration Consultation | CuriousLabs"; if 5173 is another app, try 5174). **Never start a server.** `npm run build` only at a milestone check.
- Browser evidence: desktop 1440×900 and phone 390×844. Use the app's **Browser pane** (`preview_start` with the localhost URL, `resize_window` preset `mobile`) for phone captures; Chrome can't emulate phone width here, and its screenshots blank below the fold. Reveals gate on scroll, so scroll a section into view before capturing; fall back to `read_page`/`get_page_text` for content checks, but a blank capture is not a pass (QA-32).
- Copy is owned by the owner/Captain: **use the text already in the code or `COPY_DECK_v2.md`; never invent copy.** Missing copy → build the slot so it renders nothing, and add an `ESCALATE` mark.
- Authority: `_FRAMING_LOCKED.md` (meaning, voice, don't-invent rules) > `COPY_DECK_v2.md` (words) > **`MOCKUP_CANON.md` + `references/mockups/` (the binding look, layout and mobile flow — build to the picture)** > plan v1.0 (scenes, interactions, QA) > `DRAMA_LAYER.md` > `TASKS.md`.
- Every scene DONE includes desktop + phone captures compared with its mockup and a list of remaining deltas.
