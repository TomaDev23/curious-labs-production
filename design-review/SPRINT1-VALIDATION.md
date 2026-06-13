# Sprint-1 Validation — adversarial review (12 verified findings of 15 raw)

Fixed in this pass: AEGIS reactor lg-track overflow, StatBand 0.070ms->0.07ms narrow-phone overflow, /legacy contrast (slate-600->slate-400).

---

All three load-bearing lines confirmed verbatim (line 803 grid, line 820 reactor sizing, line 638 stat poster decimals=3, line 367 slate-600). Findings match the working tree. Punch-list follows.

---

# Sprint-1 Landing Redesign — Implementer Punch-List

## 1. Must fix before review

Ordered by severity (both high).

| File | Issue | Fix |
|---|---|---|
| `AegisMachine.jsx` | **Reactor overflows the 1fr center track at lg (1024–1279px)**, colliding/clipping against both side rails. At 1024px the intrinsic grid is ~1028px in an 896px card (~132px overflow). `overflow-hidden` hides the scrollbar but not the visual collision. xl+ is fine. | Two edits. **Line 803** add an lg tier: `grid-cols-[200px_1fr_430px] items-center gap-5 xl:grid-cols-[240px_1fr_540px]`. **Line 820** size the reactor down for lg: `size="h-52 w-52 xl:h-80 xl:w-80"` (use `h-48 w-48` if you want the 124% bloom fully inside). Verify in a real browser at **1024px and 1180px** that the reactor ring clears both rails and no h-scrollbar appears. |
| `AegisMachine.jsx` | **StatBand `0.070ms` "ms" suffix overflows the divider into the neighbor cell on ≤~375px phones** (+20.7px at 320px). `whitespace-nowrap`, no `overflow-hidden` anywhere up to SectionShell, so it visibly paints across the hairline. Violates the ≤414px no-regress constraint. | **Line 638**: change `decimals={3}` → `decimals={2}` (renders `0.07ms`, drops the trailing-zero glyph, pulls the suffix back inside the cell at 320px). If 3 decimals are spec-required instead, lower the number-span clamp floor (line ~591) to `text-[clamp(1.9rem,5.4vw,5.75rem)]`. Verify at **320px and 360px**. |

## 2. Worth fixing this pass

Medium, quick, clearly improves it.

- **`/legacy` footer link fails WCAG AA contrast** — `CuriousLabsLanding.jsx` line 367: `text-slate-600` (#475569) = **2.72:1** on `#020308`, a real AA failure on a 10px interactive link. One-token fix: `text-slate-600` → **`text-slate-400`** (#94a3b8, ~8.04:1), keep `hover:text-slate-300`. Do **not** use slate-500 (~4.33:1, still under 4.5:1).

- **AEGIS stat band has no hero number** — `AegisMachine.jsx`: all four posters share `text-[clamp(2.5rem,5.4vw,5.75rem)]`; the amber `0.070ms` anchor is the same size as its siblings and the ceiling sits under ART-DIRECTION's 7rem. Add an optional `sizeClass` prop to `StatPoster` (default the current clamp on line 591), then on line 638 pass `sizeClass="text-[clamp(3rem,7vw,7rem)]"`; optionally pass `text-[clamp(2.25rem,4.6vw,4.75rem)]` to the other three so the accent clearly out-scales them. Keep clamp values as full string literals so the JIT scanner doesn't purge them. Delivers the "one number is the hero" intent. *(Slightly more than one line; do it now only if the AEGIS edits are already open — otherwise it's a clean Sprint-2 candidate.)*

## 3. Defer to Sprint 2

All real, all low/nit, all better handled with the larger structural pass — none gate this review.

- **MoonSignal capability rail is a flat 4-up lattice** (`MoonSignalShowcase.jsx` line 234) — the staircase/baseline-offset half of the brief is unaddressed. Sprint-1 one-liner if you want it cheap: add `lg:mt-8` to the promoted MSL-04 StaggerItem. The full 12-col varied-span rail is explicitly Sprint-2 #15.
- **Articles spine duplicates the eyebrow's "Field Notes" at lg+** (`ArticlesSection.jsx` lines 238/244) — retone one (spine → `FN · 003` index token, per ART-DIRECTION line 149) with the responsive editorial pass.
- **Articles spine + right-shift are lg-only, no sub-lg horizontal-eyebrow fallback** (`ArticlesSection.jsx`) — belongs with the Sprint-2 #20 responsive pass; brief's §6 "spine → horizontal eyebrow" mandate.
- **Grain layer not perf-tiered by isMobile/reduced-motion** (`LandingCosmicBackground.jsx` lines 206–213) — `isMobile` already destructured at line 27; gate or drop `mix-blend-overlay` on mobile. Low-end-mobile perf polish only.
- **MoonSignal "Current Project" eyebrow** softens the Editorial-Split no-eyebrow intent (line 195) — nit, design call.
- **MoonSignal wordmark tight at 320px during font-swap** (line 200) — nit, ~18px slack, overflow-x-clip means zero scrollbar risk. Optional `clamp(2.6rem,…)` floor.
- **Reveal frame aria-label omits arrow-key operability** (`CuriousLabsLanding.jsx` line 119) — nit a11y discoverability; append "use arrow keys to move it" to the existing aria-label.
- **"41 / Security pipeline" label** terser than siblings (line 637) — copy nit, intentionally mirrors `AEGIS_SECURITY.name`; leave or change to "Security services."

## 4. Verdict

**Sound enough to present — after the two `AegisMachine.jsx` must-fixes (lg reactor track + 0.070ms suffix overflow), which are both narrow, mechanical, and confined to AEGIS.** Fold in the slate-400 contrast fix while you're in the tree (one token). Everything else is low/nit polish or legitimately deferred to Sprint 2's structural work; none of it blocks the user's final review.
