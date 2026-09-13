# CONTINUITY — AI consultation manager [MGR] · 2026-09-13

Single resume anchor for this seat (update in place; never start a second one). Pointer-based: re-read the live files,
don't trust copies.

## §0 · ON RESUME — DO THIS FIRST
1. Read project memory index `C:\Users\Admin\.claude\projects\C--curious-labs-production1\memory\MEMORY.md`, then the
   cards `consultation-team-run.md`, `consultation-design-round-direction.md`, `consultation-page-positioning.md`,
   `art-bridge.md`.
2. Load as FILES: owner's `C:/AEGIS/skill_build/orchestrator-mode/SKILL.md` (+ `references/paired_orchestration.md`),
   `C:/AEGIS/skill_build/flush-handoff/SKILL.md`, repo skill `.claude/skills/create-art/SKILL.md`.
3. Read, in this order (all under `Docs_v8/page_Consultation/cinematic_v1/`): `00_INDEX.md` → `TEAM_PROTOCOL.md` (v2) →
   `MOTIF_PROGRESSION.md` → `MOCKUP_CANON.md` → `COPY_CANON.md` → `CANON_KIT.md` → `SCENE_SPECS.md` → `DRAMA_LAYER.md`
   → `TASKS.md` (v2 board at top) → `ART_QUEUE.md` → **`LEDGER.md` tail from `#MGR-047` onward**. Look at
   `references/mockups/MOCK-*.png` yourself.
4. **RE-DERIVE the live pin (§4) at source:** `git branch --show-current`, `git log --oneline -10`, `git status --short`,
   `grep -nE '^#(MGR|A|B|C)-[0-9]+' LEDGER.md | tail -15`. Next manager mark id = last `#MGR-nnn` + 1.
5. **Fold what landed during the flush:** every `#A-/#B-/#C-` mark after `#MGR-053` is unaudited → audit each (read the
   mark, open its capture paths, ACK / STEER / BLOCKING). Known at flush time: `#C-007` (C-05 lane-C QA pass, commit
   `dfffe8a`) landed and is **not yet audited**.
6. Re-arm the ledger watch (a persistent Monitor that emits new `^#(A|B|C)-` lines containing DONE/BLOCKING/ESCALATE/
   ASSETS/STEER, polling every 20s). Then work §6. Confirm by producing, not by asking.

## §1 · IDENTITY + SEAT
- **AI consultation manager `[MGR]`** (Opus), desktop session titled "AI consultation manager"; peers message it via
  session tools (`list_sessions` → title) or SendMessage peer name shown by ListAgents. Resume under this seat — no new
  seat, no new ledger series.
- Mandate: specs, art direction + all art curation/export/provenance, independent audit of every builder DONE against the
  mockups, owner communication, decisions and task routing. Four-seat team (protocol v2):
  - `[BLD-A]` "AI consultation builder A" (Opus) — session `local_bb1044a5-7800-46ba-89cc-3eab46937ca4`; lane A = kit,
    SC-02 doors, SC-03 walls, SC-04 contribution/harness, DR-10 walker seam, SC-09 final/contact/footer; owns the
    **headless-Chrome capture pipeline** (A-08).
  - `[BLD-B]` Codex (no session messaging — ledger only; manager polls) — SC-05 person, SC-06 approach; also **generates
    all art** via its built-in image tool (ART_QUEUE).
  - `[BLD-C]` Sonnet "AI consultation builder" (title may still lack " C") — session
    `local_2424a9f8-1aa8-4191-9323-11555e31248f`; SC-01 hero (+ DR-11 entry), SC-07 engagement, SC-08 questions.

## §2 · FENCES + HOLDS
- **Never edit `src/**`** (builders' lanes). Manager lane = `public/consultation/**`, `tools/art/**`, `.claude/skills/**`,
  `Docs_v8/page_Consultation/cinematic_v1/**`. Commit own paths by pathspec; push to `design/cinematic-consultation`;
  never checkout/stash/reset/merge; **no merge to `main` without an explicit owner instruction** (main = live Vercel).
- Ledger is append-only; seat-scoped ids; re-read tail before appending; don't generate ids inside `$( )` subshells
  (that caused duplicate ids once).
- Framing hard rules (`../_FRAMING_LOCKED.md`): "I" not agency "we"; no "Book"/booking; no out-of-scope services; no
  testimonials/claims/fake numbers; "18 years" exact (Khmer market residence); contact channels stay PENDING (no dead
  buttons); no face/identity presented as the owner (placeholder figures from behind only); generated "Phnom Penh"
  images are placeholders (never captioned as documentary).
- Art route: **Codex finals via ART_QUEUE**; paid OpenAI API (`tools/art/generate.mjs`, key in `tools/art/.env`) for
  **cheap low drafts only** — high-quality API needs owner OK (owner found cost surprising).
- No new npm deps, no global `:root` tokens, navbar/landing/MoonSignal/AEGIS untouched.
- **Verification lesson:** don't raise a visual BLOCKING from one racing capture (a false "kit bug" happened); the in-app
  Browser pane doesn't advance CSS animation timelines or reliably fire lazy-load while backgrounded, and Chrome MCP
  captures freeze on this page. Use builder A's A-08 full-page captures for visual truth; use JS measurement for logic.

## §3 · COOPERATION WITH THE OWNER
- Owner (towcambodia@gmail.com, "TomaDev23") is driving a design pilot for /ai-consultation; if it lands, the landing page
  gets the same treatment. Wants **dramatic, mobile-first, cinematic, non-repetitive**; builds **to the mockups** (look,
  layout, copy), within the locked framing.
- Report bottom-line first, plain language, what changed and what's open; send visual evidence (SendUserFile of
  side-by-sides/strips) rather than describing. Owner decides; manager routes and enforces. Don't ask resolvable questions
  — decide under the canon docs and say so; only irreducible owner decisions go up.
- The owner reviews on their own browser; owner-only visual checks (e.g. DR-11 hero entry) are called out explicitly.
- Don't build/commit per tiny tweak on the live main; work happens on the branch; ask before any merge/release.

## §4 · LIVE PIN — last-verified 2026-09-13T17:18 — RE-DERIVE ON RESUME, do not trust this line
- Branch `design/cinematic-consultation`, HEAD `b5ee4c5`; main at `895198d` (start point, pushed).
- Ledger: last manager mark `#MGR-053`; last builder marks `#A-017`, `#B-014`, `#C-007` (C-007 unaudited).
- Phone page height at 390: 13,896 (A-08) → **11,219** (after lanes A+B trims, before C-05); target ≤ 10,000, stretch 8,500.
- Dev server: owner's, `http://localhost:5173/ai-consultation` (never start one).

## §5 · DONE MAP (pointers — don't redo)
- Design system + rules: `MOCKUP_CANON.md` (binding look), `MOTIF_PROGRESSION.md` (journey + light-line thread + layout
  rhythm; Earth only SC-01/SC-09; quote blocks only SC-01/05/09), `COPY_CANON.md` (mockup words adapted to framing),
  `CANON_KIT.md`, `SCENE_SPECS.md`, `DRAMA_LAYER.md` (DR-10 walker seam, DR-11 hero entry = owner additions).
- All nine scenes built on the kit and accepted (details + commits in `LEDGER.md` #MGR-010…#MGR-053): hero (C), doors +
  walls with rock faces + harness + walker seam with real poses + final/contact/footer (A), person + approach (B),
  engagement + questions (C). Desktop full-page audit clean (`#MGR-047`).
- Art: every shipped file listed in `ART_PROVENANCE.md`; queue history + picks in `ART_QUEUE.md` (19d dropped).
- Tooling: `tools/art/{generate,export,contact}.mjs` + skill `create-art` (streaming generator; alpha export; contact sheets).
- Full-page capture sets (lane A scratch, re-runnable): `C:/Users/Admin/AppData/Local/Temp/claude/C--curious-labs-production1/67bea9c6-b251-4993-900b-b646e2055a68/scratchpad/A08/` (`d1440_*`, `p390_*`, `*_strip.png`); script `.../scratchpad/fullpage.mjs` + `stitch.py`.

## §6 · STANDING QUEUE (in order)
1. **Audit `#C-007`** (C-05 lane-C QA: phone hero quote off city lights, hero ≤ 1 screen, keyboard/focus, reduced motion,
   320/768/1024). Done-test: ACK/STEER mark posted.
2. **Ask [BLD-A] to re-run A-08 at p390** (per `#MGR-053`) → read new total docH + strip. Done-test: phone docH ≤ 10,000;
   if not, route the next cuts (largest bands first) to the owning lanes.
3. **A-05 (lane A): retire any remaining ChapterMark rows + final scene order** once all lanes' phone passes are accepted.
4. **Seams/continuity pass** vs `MOTIF_PROGRESSION §2` (light-line thread visible per scene; soft dissolves; hairlines only
   after SC-03 and SC-06) using the fresh desktop strip; route deltas per lane.
5. **Release readiness (M-06):** `npm run build` (one builder), zero console errors, QA-01…35 spot list from the plan,
   owner review package (desktop + phone strips + open decisions). **Then ask the owner before any merge to main.**
6. Update the owner's tracker status report (owner updates the .xlsx) and memory cards at milestones.

## §7 · OPEN OWNER DECISIONS / CHECKS
- **DR-11 hero entry** — owner must watch it in a real browser (fresh incognito tab, don't scroll ~3s); harness can't verify
  animation. Recommendation: accept if neon flicker → typing → rise-in reads clean; route timing tweaks to lane C.
- **Real photos** — generated Phnom Penh placeholders (ART-05) and placeholder figures stay until owner supplies real
  photos/portrait (recommend owner shoots a rooftop/riverside night photo). Don't caption generated images as documentary.
- **Contact destinations** — still PENDING (Telegram/WhatsApp/email/Facebook); page shows honest pending state.
- **Footer "Home" link** was removed (in-page anchors only) — owner may want it back.
- **Release** — merge `design/cinematic-consultation` → `main` only on explicit owner instruction.
- **Landing page** — the same method is the planned next step if the owner approves this pilot.

## §8 · OWNED-BY-OTHERS TAILS
- [BLD-A]: A-08 p390 re-run pending (after C-05), then A-05; owns capture pipeline. Messages via session id above.
- [BLD-B] Codex: phone compression done; ART_QUEUE fully drained (19d dropped). Idle/next per ledger — give new work via
  ledger marks only (no messaging).
- [BLD-C]: C-05 posted `#C-007` (awaiting audit). No scenes left in lane C after that except fixes.
- Captain / owner: copy refinements go into `COPY_CANON.md` (manager lane); builders sync their scene copy files.
