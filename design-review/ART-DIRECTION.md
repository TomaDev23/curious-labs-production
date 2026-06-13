I have everything I need from the four critiques and research briefs. Producing the synthesized design-direction document now.

---

# CURIOUS LABS / MOONSIGNAL — DESIGN DIRECTION
### 2026 Launch · One Art-Directed Journey Through Space
*The definitive build brief. Decisions, not options. Protect the centerpieces, kill the cubical system, plant exactly two new cinematic beats.*

---

## 1. North-Star Concept

The page is **one continuous descent-and-launch through a single sky** — not a stack of slabs. You open by *leaving the moon* (the hero choreography you already have), you *descend through the product and into the runtime it stands on* (MoonSignal → AEGIS, product-on-top, engine-room-below), and you *launch back out* at the end (a finale blast-off into the same starfield the page opened in). The fixed cosmic backdrop is the spine that makes all of it read as one shot: galaxy fades in mid-page for immersion, fades out by the footer for a clean close. Every section is a different *altitude and instrument* in that single flight — never another centered eyebrow + glass-grid. The brand voice is **the instrument, not the brochure**: terse mono spec-text, real numbers at poster scale, one accent firing per zone with meaning. Craft is signalled by *considered friction* — overlap that resolves, type that breaks its box, asymmetry that's obviously a human's call.

**Tagline for the redesign:** **"Leave the moon. Descend the stack. Launch from stealth."** — a continuous flight, one sky, two new cinematic beats bookending the centerpieces you already nailed.

---

## 2. The Anti-Cubical System

This is the kit that kills the monotony. The disease is structural: `SectionShell` + `GlassPanel` + `Reveal` is an *engine for uniformity*. The cure is a small, explicit kit of archetypes so no two adjacent sections share a silhouette — but everything still reads as the same machine.

### 2A. Section-Layout Archetypes (assign exactly one per zone; no two neighbors repeat)

Add a `variant` prop to `SectionShell` that swaps the inner wrapper. The eyebrow becomes optional. ~40 lines.

| Archetype | Treatment | Assigned to | Why it's distinct |
|---|---|---|---|
| **Anchored** (current) | Left eyebrow + H2, content in `max-w-7xl`. The calm baseline. | **Articles** only | Earns its calm by contrast with everything around it. |
| **Editorial-Split** | H2 at `clamp(3.5rem,9vw,9rem)` pinned to left rail; body + modules flow right and **bleed past `max-w-7xl`** to the viewport edge. | **MoonSignal** | Breaks the centered box; fills the dead right column. |
| **Full-Bleed HUD** | No eyebrow. Section *opens* on the wide asset edge-to-edge (`left-1/2 -mx-[50vw] w-screen`); label floats as a mono tag over the asset. | **AEGIS console + stat band** | Makes the best asset the hero of its own section; "expands across the screen." |
| **Overlap-In** | Heading sits in negative top margin (`-mt-[12vh]`) overlapping the previous section's bottom — the Coming-Soon `-58vh` trick, generalized. | **Contact** | Kills the slab seam; creates Z-layering. |

**Spacing/rhythm rule:** Stop hardcoding `py-14 sm:py-20 lg:py-28` everywhere. The metronome *is* the template tell. Tighten transition/bridge zones (`py-10`), breathe the HUD heroes (`py-32`), so the eye gets tempo changes. Stagger card baselines inside grids (`mt-10` on a column) for masonry asymmetry instead of a perfect lattice.

### 2B. Card / Surface Variants (three, not one glass box)

Keep `GlassPanel` as the *quiet default only*. Add two siblings in `primitives.jsx`. **Rule: in any grid, exactly one card is elevated (Signal), one is Schematic, the rest are quiet.** That alone breaks the "4 identical glass boxes" silhouette while staying unified.

1. **GlassPanel (quiet)** — current treatment. Secondary/body cards.
2. **SchematicCard** — *no glass*. Blueprint dot underlay (`radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)` @ 22px) + 1px hairline border + a mono code tag in the corner (reuse the `MSL-0x` / `LEG-00x` codes). The "engineering substrate" signal — load-bearing for a quant OS. Use for the *primary* card in a grid.
3. **SignalCard** — accent-edged. One glowing 1px border in the zone's accent (`shadow-[0_0_0_1px_rgb(var(--accent)/0.4)]`), reserved for the single most important module per section (accent fires rarely = it means something).

Also formalize two **non-card structures** the redesign leans on hard:
- **Ledger row** (LEGIT, Field Notes index): big letter/number left, `divide-y divide-white/8` rows, right-aligned status pill. Replaces bento grids of word-spelling lists.
- **Open module / capability rail** (MoonSignal MSL-0x): border-left accent bar only + faint fill, no `backdrop-blur` — reads as entries in a spec sheet, not floating cards.

### 2C. Type Hierarchy Upgrade

Current ceiling is `text-3xl/4xl` — the "safe 64–80px cap" tell. Introduce **one oversized typographic moment per zone** via `clamp()`, set against micro 11px mono for violent (≥12:1) scale contrast — the Bloomberg "large signal / small context" move.

- **Display moments:** MoonSignal wordmark `clamp(3.5rem,9vw,9rem)` running past the left column; AEGIS hero stats `0.070ms` at `text-[7–8rem]`; the finale headline `clamp(3rem,11vw,11rem)`.
- **Second voice = mono.** JetBrains Mono is not just for code — it's the spec channel: `MSL-01 · DETERMINISTIC STATE`, `STATUS // BOOTSTRAPPING`, `REPLAY DRIFT // 0.00`, `T-00:03 · IGNITION`. Tabular-nums everywhere numbers live.
- **Keep:** Space Grotesk display + the existing palette semantics (lime=now, amber=AEGIS, teal/cyan=MoonSignal, violet=writing). Evolve, don't rebrand.

### 2D. Texture / Treatment (page-wide, anti-"default gradient")

- **Grain/noise overlay** — one fixed `feTurbulence` SVG layer at 3–5% opacity, `mix-blend-mode: overlay`, in `LandingCosmicBackground`. Kills the plasticity on the galaxy and every accent glow. ~15 lines, zero deps, large premium payoff.
- **Blueprint dot-grid** — a documented design token in `primitives.jsx` shared by `SchematicCard`, the Coming-Soon underlay, the AEGIS stat band, and the Articles underlay. One source of truth.
- **Accent discipline** — one accent per zone, firing on interactive states and key data only. Never four colors competing in one view.

---

## 3. The Motion & Transition System

One coherent grammar, inherited from the hero — not per-section guesses. The hero already proves the house style: a single eased curve (`easeOutExpo(smooth(...))`) driving translate/scale/rotate/halo/filter *together*, legato not staccato. Every new beat obeys that standard and the existing reduced-motion guards.

### 3A. Motion vocabulary (expand `Reveal` from one verb to three)

- **RevealUp** (current) — body copy only.
- **MaskWipe** — `clip-path: inset()` scroll-driven reveal for the big HUD assets, so they *materialize directionally* instead of fading. Driven by `useFlowingScrollProgress` with scrub-like lag.
- **StreamIn** — character/line stagger at `0.02s` for technical labels and the DREAMS/LEGIT acrostics, so they read as *data streaming in*. Collapses under the existing `useReducedMotion` guard.

### 3B. Depth & parallax

Three speed tiers minimum on the fixed canvas: background nebula/stars ~0.2x, mid haze ~0.5x, foreground content ~1x. Differential starfield drift (existing) is the depth engine — lean harder on the galaxy fade-in/out as connective tissue. A thin persistent **scroll-progress rail** (starship altitude gauge) on the page edge ties all sections into one flight. No `scroll-snap-type: mandatory` on this long a page — `proximity` at most.

### 3C. Section handoffs (entry + exit beats — the journey)

| Seam | Beat | Metaphor |
|---|---|---|
| **Load → Hero** | 600ms `StreamIn` on eyebrow + H1 (micro-beat before first scroll). | Power-on. |
| **Hero → ComingSoon** | **KEEP AS-IS.** The eased lift + late cross-dissolve into the `-58vh` panel is the one perfect seam. Do not add a ship here. | Moon departs. |
| **ComingSoon → MoonSignal** | Teal glow carries down into the section's first 200px; the stealth "Coming Soon" headline hands off to the real "MoonSignal" wordmark. One teal beat, two headlines, no divider. | Reveal exhales. |
| **MoonSignal → AEGIS** | **THE BLAST-OFF (see 3D).** Teal product launches *onto* the amber runtime — color baton-pass. | Launch onto the stack. |
| **AEGIS → Articles** | Amber→violet seam: amber glow cross-fades into violet Field Notes glow; vertical "FIELD NOTES" spine draws in via `scaleY`. (Optional tiny signal-packet uplink dissolving into the first card — *not* a second ship.) | Runtime → writing about it. |
| **Contact → Finale → Footer** | Galaxy `fadeOut` is the signal; finale band launches the ship off frame-top into the starfield; sky "uses up" as the page ends. | Launch from stealth. |

### 3D. THE BLAST-OFF — definitive call

The four critiques split on placement. **The decision: there are two ship moments, and they are different in register.**

**Primary (the signature WOW): MoonSignal → AEGIS.** This is the one that's *narratively load-bearing* — "MoonSignal runs on AEGIS" made kinetic. The probe launches from the pipeline's crescent-moon center, arcs **up-and-right** (rhyming with the hero's vector, reinforcing house grammar), trails a monochrome pale-teal plume, and **dissolves into starfield exactly as AEGIS's amber glow rises** — a literal teal→amber color baton-pass. It sits ~3000px below the moon beat, so they never read as duplicates. It converts the page's weakest seam (two stacked slabs) into its second signature moment.

> **Note on the dissent:** Critique 3 argued MoonSignal→AEGIS is a *descent* (engine room) and a ship there fights the hero. The resolution: the ship is the *product* leaving the product-section, not a hero-rocket re-departure — it *exits and dissolves* rather than heroically ascending, and AEGIS receives it as a grounded "plug-in / power-on" (the Scanline fires on entry). AEGIS itself stays earthbound and heavy. The ship belongs to MoonSignal's exit, not AEGIS's entrance.

**Secondary (the send-off): the finale band before the footer.** A second, *quieter* launch up the right margin, exiting frame-top into the fading starfield — the page's mic-drop, landing the "launch from stealth" thesis. This is acceptable as a second instance *only because* it's the literal end of the page (nothing after it to compete) and it pays off the open-by-leaving-the-moon symmetry.

**Asset:** minimal iconographic line-art / silhouette probe — *never* a detailed illustrated rocket (detailed = gimmick; silhouette = premium). Teal/cyan rim-light body, monochrome pale-amber/white exhaust only (colored exhaust on black reads festive). SVG, so MotionPath can align + auto-rotate.

**Trigger + motion:** scroll-scrubbed along an SVG `MotionPath` (`autoRotate`, `alignOrigin [0.5,0.5]`); user *drives* the launch — it never auto-plays. Plume emitter rate ↑ with `ScrollTrigger.getVelocity()` so a fast flick = bigger plume. **Never stalls mid-arc:** snaps to end-state on fast flick. Disappears into the next section, never stops abruptly.

**Reduced-motion fallback (non-negotiable, gate on existing `prefersReducedMotion`):** skip the bridge entirely — direct teal→amber cross-dissolve at MoonSignal→AEGIS; static docked ship at the finale. The ship is decorative, never load-bearing for comprehension.

**Page bookend:** Contact's 3D globe shrinks/drifts toward the horizon as the galaxy fades out — mirror of the moon's departure. The page opens on a moon leaving and closes on a globe settling.

---

## 4. Section-by-Section Direction

### HERO + COMING SOON
*Protect the front bookend; fix the one broken resting frame.*
1. **KEEP** the moon-departure math, the `-58vh` overlap, the cross-dissolve, all the perf discipline (3D unmount at p<0.94, idle-loaded 4K galaxy, DPR-capped starfield, RAF-throttled spotlight). This is the foundation, not the problem.
2. **Fix the Coming-Soon resting frame** *(highest-ROI single fix on the page)*: default the spotlight to a *composed* corner (`{78,64}`) so the resting state shows the "Coming Soon" wordmark clean with light pooled like a flashlight on a desk — the reveal becomes a reward for moving, not a circle floating mid-word.
3. **Replace the fake-SaaS-dashboard underlay** with a single coherent teal HUD instrument (LED ticker tape + 2–3 math glyphs `Vₜ = schema ∧ warmup ∧ parity` + a descending crescent) on the blueprint grid that's already there. Kills the "generic mockup clashing with the premium HUD" tell.
4. **Add** a pulsing ring + `DRAG TO REVEAL` mono microcopy so the interaction is discoverable.
> **WOW:** the spotlight reveal now resolves to a *composed poster* instead of a bug — a clean front bookend.

### MOONSIGNAL (#moon-signal)
*Invert the section: the pipeline is the spine; the browser chrome dies.*
1. **Kill the browser chrome** (`WindowChrome`/`ScreenshotFrame`/`ScreenshotCarousel`). Promote the **`ms_math_asset_1.png` pipeline** — your single best visual — to full-bleed centerpiece. Demote the 4 SVG screenshots to rotated, overlapping **"field capture" cards** bleeding off the right edge (the human-check signature). *Pure removal + reorder — biggest win for least work.*
2. **Editorial-Split header:** "MoonSignal" at `clamp(3.5rem,9vw,9rem)` running past the left column, with a floating mono spec block (`STATUS // BOOTSTRAPPING`, `RUNTIME // AEGIS`, `CLASS // AUTONOMOUS QUANT`).
3. **Break the 2×2 into a staggered capability rail:** `grid-cols-12` with varied spans/offsets so the left edge staircases; left vertical accent bars instead of footer hairlines; **MSL-04 AEGIS Safety Layer promoted** (amber-tinted SignalCard + `→ AEGIS` chip) — the row now *spells a relationship*, not four equals.
4. **Kill the hard `border-t` divider**; overlap MSL-04 and the pipeline on Z with a teal bleed.

**Module / strength depth (claim discipline, not outcomes — credible pre-launch):**
| Module | Label | Proof metric (method, not returns) |
|---|---|---|
| MSL-01 | Deterministic Market State | `REPLAY DRIFT // 0.00` (bit-identical) |
| MSL-02 | Live / Replay Parity | `CODE PATHS // 1` (one engine, two clocks) |
| MSL-03 | As-Of Research Discipline | `LOOKAHEAD LEAKS // 0` |
| MSL-04 | AEGIS Safety Layer | `STAGES GATED // 6 / 6 · → runs on AEGIS` |

Section dek: *"An autonomous quant platform built so the math can be audited — not trusted."* Pipeline H3: *"Six contracted stages. One auditable output."*
> **WOW:** a scroll-lit telemetry spine — 6 ticks ignite in sequence, each firing a pipeline stage's glow, formulas draw in via `stroke-dashoffset`, crescent blooms — *then the ship launches from that exact crescent* into AEGIS.

### AEGIS (#aegis)
*One hero (the console, full-bleed), one stat band (numbers as posters), one spine, one ledger.*
1. **Full-bleed the console** (`left-1/2 -mx-[50vw] w-screen`, re-pad inner to `max-w-[1600px]`). The `ResizeObserver` geometry handles any width — nearly free, and it finally "expands across the screen." Widen the reactor so it's the largest single object in the section.
2. **Stat band as posters** (highest-impact/lowest-effort here): a full-bleed row, *no card borders*, hairline-divided — `118+` / `41` / `0.070ms` / `5 / 5` at `text-[7rem]` tabular-nums, with `0.070ms` largest and amber-tinted. Count-up via `useInView`. The numbers are your credibility — stop rendering them as metadata.
3. **DREAMS → vertical reactor-rail, not a grid:** D·R·E·A·M·S as a connected spine (one packet descending through six), the machine render **bleeding off the right edge** (not in a rounded card). Each letter is **progressive disclosure** — click expands its real service list (Security's 41, AI's 4, etc.). Depth on demand, not a wall of cards.
4. **LEGIT → numbered spec ledger, not 5 bento tiles:** giant letter left, `LEG-00x` mono, lead-with-consequence line, right-aligned `✓ ENFORCED` pill, `divide-y` rows, one continuous accent bar threading all five. Keeps the acronym payoff, loses the monotony. Close on a thin compliance rule line (`· GDPR · HIPAA · CCPA · PCI-DSS · Zero Trust ·`).

**Module / strength depth:** lead each DREAMS layer with a number-led claim (Security: *"41 services. Zero requests skip the gate."*); lead each LEGIT row with the consequence (Logged: *"Nothing runs off the record."*). Add near the OUTPUT chip: *"MoonSignal is one tenant. The runtime is multi-product by design."* Use SLO source-of-truth verbatim (`0.070ms`, `<2ms RBAC ≥80% cache`) — precision is the credibility.
> **WOW:** the console becomes a "drill the runtime" instrument — hovering a layer (or its DREAMS spine letter) tints the core, brightens that path, dims others, **and re-computes the 7rem stat band to that layer's facts**, while the bleeding render highlights the matching pod. One `activeLayer` state driving four components at once — depth and wow are the same feature.

### TAIL — Articles · Contact · Ending
*Stop the energy leak; the page must land, not whisper.*
1. **Articles → editorial ledger:** vertical `writing-mode: vertical-rl` "FIELD NOTES" spine bleeding off the left gutter; **one hero feature** (MoonSignal Deck, `text-4xl/5xl` title overlapping a thumbnail that bleeds past the card edge) + two smaller heterogeneous stacked entries; a mono index strip (`001 / … · GUIDE`); blueprint dot underlay. Replace the Maestro placeholder with a real thumbnail or a text-forward `> orchestration.md` log card.
2. **Contact → one composed Comms Console:** drop `md:absolute`; asymmetric grid `lg:grid-cols-[minmax(380px,440px)_1fr]`; globe full-bleed off the right edge. Fix the palette drift (`gray-*` → `slate-*` + `ACCENTS`). Anchor with one oversized mono readout (live UTC mission clock / `LAT 11.55 · LNG 104.92`). Tighten height to `py-32` to kill the diagonal void. Rename the tab `contact_init` → `request_access`.
3. **World Clock → repurpose or cut:** kill the floating 12-city band; migrate "Mission Time" into the Contact console; keep at most a 3-city **market-sessions** line (NYC/LON/TYO) in the footer so it carries payload.
4. **The finale band** (the ending the page lacks): full-viewport-width, VW-scale headline (*"Built on AEGIS. Launching from stealth."* closes the loop) in the Coming-Soon cream, asymmetric twin CTAs (lime "Request access" + ghost "Recruiting? Talk to us"), the secondary blast-off launching off frame-top. **Demote "View the original site →"** to a tiny corner `/legacy` link — never the last word.
> **WOW:** the contact globe becomes a *live channel* — clicking Copy Email fires a bright arc from your home node across the globe + a ring pulse. The page visibly opens a channel the instant they reach out. One event handler rescues the weakest section.

---

## 5. Asset Production List

| # | Asset | Subject / Style / Palette | Format | Role · Where |
|---|---|---|---|---|
| 1 | **MoonSignal probe (the ship)** | Minimal iconographic silhouette / line-art craft — crescent-finned, *not* a detailed rocket. Teal/cyan rim-light body; pale-amber/white monochrome exhaust only. | SVG (for MotionPath align/auto-rotate) | The primary MoonSignal→AEGIS blast-off **and** the finale send-off. Must read at small scale and as a silhouette. |
| 2 | **Pale exhaust plume sprite** | Soft monochrome white→pale-amber radial blob, ~64px. Never multicolor. | SVG/PNG (or pure CSS box-shadow cascade) | Particle trail behind the ship. |
| 3 | **MoonSignal HUD instrument** | Dark teal panel: green LED ticker tape (mono glyphs), confidence sparkline, formula `Vₜ = schema ∧ warmup ∧ parity`, descending crescent top-right. 1px strokes, JetBrains Mono, on `#070b16` over blueprint grid. Teal `#2dd4bf` / cyan `#67e8f9` / amber ticks. | SVG or layered DOM (no raster) | **Replaces the fake dashboard** under the Coming-Soon spotlight. Must be legible inside a 300px circle. |
| 4 | **AEGIS right-bleed machine render** | Taller, **transparent-PNG** variant of the reactor: amber plasma core, 6 labeled module pods on cyan conduits feeding one teal "MoonSignal — external consumer" panel, soft right-edge falloff baked in. `#020308` base / amber `#F59E0B` / teal `#2DD4BF` / cyan `#38BDF8`. | Transparent PNG | DREAMS block right-zone, bleeding off the right edge. |
| 5 | **Real Maestro thumbnail** | Conductor node with converging agent signal-lines (the existing placeholder nails the concept). Violet→cyan on `#070b16` + faint blueprint grid. Style-match the deck SVGs. | SVG/PNG | Replaces `OrchestrationPlaceholder` in Articles. |
| 6 | **Finale background plate** | Wide low-detail nebula/horizon glow, cream `#dedac7` + teal, grain-overlaid (4–6%) so it's not a default gradient. Reuse the `ms_math_bg_1.png` aesthetic. | PNG + CSS grain | The "launching from stealth" finale band. |
| 7 | **Reframed field-capture SVGs** | Re-render existing `2_Markers`/`3_Win`/`4_Lab`/`5_Lab` on `#071016` teal-dark ground, *no* browser chrome — native instruments, not light-mode app shots. | SVG | MoonSignal rotated/overlapping capture cards. |
| 8 | **Grain/noise tile** | `feTurbulence` SVG, 3–5% opacity, overlay blend. | SVG filter (one reusable `<filter>`) | Page-wide fixed layer in `LandingCosmicBackground`. |
| 9 | **Blueprint dot-grid token** | `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)` @ 22px. | Pure CSS token | `SchematicCard`, Coming-Soon, AEGIS stat band, Articles underlay. |
| 10 | **Globe "home" node marker** | Small pulsing lime ring at your coordinates. | Globe data/CSS | Origin for the on-demand contact arc. |

---

## 6. Prioritized Roadmap

**Sprint 1 — Quick Wins** (do these first; mostly S effort, they flip the page from "AI template" to "art-directed" before any new asset):

| # | Move | Section | Impact | Effort |
|---|---|---|---|---|
| 1 | Fix Coming-Soon resting frame: composed spotlight corner + `DRAG TO REVEAL` + pulse ring | Hero/CS | **H** | **S** |
| 2 | Delete MoonSignal browser chrome; promote pipeline to centerpiece | MoonSignal | **H** | **S** |
| 3 | Add proof-metrics + tighter claim-copy to the 4 MSL modules | MoonSignal | **H** | **S** |
| 4 | Giant "MoonSignal" wordmark (clamp, off-grid) + mono spec block | MoonSignal | **H** | **S** |
| 5 | AEGIS stat band: 4 hero numbers as full-bleed posters, count-up | AEGIS | **H** | **S** |
| 6 | Full-bleed the AEGIS console (`-mx-[50vw]`), widen reactor | AEGIS | **H** | **S** |
| 7 | Grain/noise overlay + blueprint dot-grid token (page-wide) | Global | **M** | **S** |
| 8 | Fix Contact palette drift (`gray`→`slate`/`ACCENTS`) | Tail | **M** | **S** |
| 9 | Kill 12-city clock → 3-city market-sessions line; fix footer (demote `/legacy`) | Tail | **M** | **S** |
| 10 | Kill MoonSignal hard divider; Z-overlap MSL-04 ↔ pipeline | MoonSignal | **M** | **S** |
| 11 | Articles: vertical "FIELD NOTES" spine + blueprint underlay | Tail | **M** | **S** |

**Sprint 2 — Structural** (the kit + depth payload):

| # | Move | Section | Impact | Effort |
|---|---|---|---|---|
| 12 | Add `variant` prop to `SectionShell` (4 archetypes) | Global | **H** | **M** |
| 13 | Add `SchematicCard` + `SignalCard`; "1 elevated / 1 schematic / rest quiet" rule | Global | **H** | **M** |
| 14 | Replace MoonSignal dashboard underlay with teal HUD instrument (asset #3) | Hero/CS | **H** | **M** |
| 15 | MoonSignal 2×2 → staggered capability rail (varied spans, MSL-04 promoted) | MoonSignal | **H** | **M** |
| 16 | AEGIS LEGIT → numbered ledger + lead-with-consequence copy | AEGIS | **H** | **M** |
| 17 | AEGIS stat band reacts to `activeLayer` (the wow) | AEGIS | **H** | **M** |
| 18 | Globe-as-live-channel: arc + ring on Copy/hover (the tail wow) | Tail | **H** | **M** |
| 19 | Contact: drop `md:absolute`, asymmetric grid, full-bleed globe off right | Tail | **H** | **M** |
| 20 | Articles: break 3-up → 1 hero feature + 2 heterogeneous entries; replace Maestro | Tail | **H** | **M** |
| 21 | Finale band: VW headline + asymmetric twin CTAs | Tail | **H** | **M** |
| 22 | Expand motion vocab: `MaskWipe` (big assets) + `StreamIn` (acrostics/labels) | Global | **M** | **M** |
| 23 | AEGIS DREAMS spine + progressive disclosure + right-bleed render (asset #4) | AEGIS | **H** | **L** |
| 24 | Variable section rhythm (stop `py-28` everywhere) | Global | **L** | **S** |

**Sprint 3 — Cinematic Bets** (the signature beats; need new assets + scroll choreography):

| # | Move | Section | Impact | Effort |
|---|---|---|---|---|
| 25 | **BLAST-OFF: MoonSignal → AEGIS** probe on scrubbed MotionPath + teal→amber baton-pass + plume; reduced-motion = direct dissolve | MoonSignal/AEGIS | **H** | **L** |
| 26 | Scroll-lit telemetry spine linking modules → 6 pipeline stages (formulas draw-in) | MoonSignal | **M** | **L** |
| 27 | **Finale blast-off** send-off (ship off frame-top into starfield); reduced-motion = static docked ship | Tail | **H** | **L** |
| 28 | Page bookend: Contact globe shrinks toward horizon as galaxy fades out | Tail | **M** | **M** |
| 29 | AEGIS→Articles amber→violet seam handoff | AEGIS/Tail | **M** | **M** |

**Mobile (390px) — non-negotiable, build alongside each move, don't retrofit:** Articles keeps heterogeneity (hero full-width + 2 compact horizontal rows, spine → horizontal eyebrow); Contact stacks terminal above a capped globe (`h-[42vh]` or static node-map PNG), no `absolute`; finale headline rides `clamp`, CTAs stack lime-first; both blast-offs run a short on-enter launch or skip to static docked ship (scrubbed MotionPath stalls on mobile flick physics); market-clock wraps, never horizontal-scrolls. Honor `prefers-reduced-motion` everywhere.

---

## 7. What to Explicitly NOT Do

**Protect (touching these is a regression):**
- **Do NOT touch the hero moon-departure math** (`easeOutExpo(smooth(0.16,0.92,p))` driving everything together) or the `-58vh` cross-dissolve. This is the page's signature — it's your foundation, not your problem.
- **Do NOT add a ship at Hero→ComingSoon.** Two "leaving" gestures back-to-back fight each other; the moon-dissolve *is* the entry transition.
- **Do NOT regenerate `ms_math_asset_1.png`** to "improve" it — promote it. (Only re-export if you're adding scroll draw-in, and then only to SVG.)
- **Do NOT remove** the perf discipline (3D unmount, idle-loaded galaxy, DPR cap, RAF-throttled spotlight via CSS vars, SMIL packets, ResizeObserver geometry). New motion must meet the same standard.
- **Do NOT rebrand the palette.** Evolve the meaning-coded accents; don't add colors or swap the semantics.

**Don't overreach into gimmick:**
- **No detailed illustrated rocket.** Silhouette/line-art only; detailed = gimmick. Monochrome plume only — colored exhaust on black reads festive, not premium.
- **More than two ship beats per page is forbidden.** Primary (MoonSignal→AEGIS) is load-bearing; finale is the end-of-page send-off. Anything more cheapens both and the original moon departure.
- **No ship inside AEGIS' interior** — it's the grounded, earthbound infrastructure section; keep its register heavy.
- **A ship must never stall mid-arc.** Snap-to-end on fast flick; always exit/dissolve into the next section.
- **No outcome-claims for MoonSignal** ("98.7% win rate"). Claim *discipline/method* (determinism, parity, zero-leak) — that's what's credible in stealth.
- **No new dependencies if the existing stack covers it** (Tailwind arbitrary values, Framer `useScroll`/`useTransform`, `useFlowingScrollProgress`, R3F). Reach for GSAP MotionPath only for the two ship paths.
- **Don't bloat the centerpiece copy.** Depth comes from promoting existing data (service counts, SLOs, MSL codes) to prominent slots and mono spec-lines ≤8 words — not paragraphs.
- **Don't let "break the grid" become "nothing aligns."** Every overlap must visually resolve and stay readable; asymmetry is a deliberate call, not chaos.
- **Don't end on the old site.** "View the original site" is a tiny corner `/legacy` link — never the page's last word.

---

**Bottom line:** The centerpieces (moon choreography, math pipeline, reactor console, machine render, cosmic spine) are already premium — they're the foundation. The disease is the *system* (`SectionShell` + `GlassPanel` + `Reveal` = an engine for uniformity) and a journey that loses its camera the moment the moon dissolves. Ship Sprint 1 to flip the look this week, Sprint 2 to install the anti-cubical kit and the depth, Sprint 3 to plant the two cinematic launches. That's the whole arc from "good entry, then slabs" to "one continuous, art-directed flight through space."
