# Task board — Milestone 1 (hero + two doors + three walls)

Owned by `[MGR]`. `[BLD]` reports progress only via `LEDGER.md` marks; the manager updates the Status column.
Plan refs: SC-01…03, SP-01-xx…SP-03-xx, INT-01…03, VIS-01/02/09, WP-01/06/07/08. Drama refs: DR-01/02/03/05/06.
Read before starting: `TEAM_PROTOCOL.md`, `DRAMA_LAYER.md`, plan sections SC-01…SC-03 + "Interaction contracts".

| Task | Seat | Title | Depends on | Status |
|---|---|---|---|---|
| B-00 | BLD | Onboard + environment check | — | Queued |
| B-01 | BLD | Baseline record (WP-01) | B-00 | Queued |
| B-02 | BLD | Split `ConsultationContent.jsx` into scene files — **no visual change** (WP-06) | B-01 | Queued |
| B-03 | BLD | Hero visible-first (INT-01) | B-02 | Queued |
| B-04 | BLD | Scene kit: `SceneArt`, `SceneSeam`, `SwipeTrack`, `ExpandToggle` | B-02 | Queued |
| B-05 | BLD | SC-01 Earth hero stage + orbital instrument (WP-07, DR-01) | B-03, B-04 | Queued |
| B-06 | BLD | SC-02 two doors (WP-08, DR-02, DR-05) | B-04 | Queued |
| B-07 | BLD | SC-03 three walls (WP-08, DR-03, DR-05) | B-04 | Queued |
| B-08 | BLD | M1 seams + motion + QA evidence (DR-06) | B-05…B-07 | Queued |
| M-01 | MGR | ART-01 Earth horizon drafts → owner sheet → placeholder export | — | Queued |
| M-02 | MGR | ART-04 terrain drafts → owner sheet → placeholder export | — | Queued |
| M-03 | MGR | ART-02 / ART-03 doorway vistas (ART-03 `--ref` ART-02) | — | Queued |
| M-04 | MGR | Copy asks → owner/Captain: wall responses, card B title, hero lead (CP-01/03) | — | Queued |
| M-05 | MGR | Audit every B task (independent read + browser check) → ACK / STEER / BLOCKING | each DONE | Standing |
| M-06 | MGR | M1 owner review package (desktop + phone captures, open gates) | B-08 | Queued |

---

## Asset contract (builder codes against these paths before the files exist)

Manager delivers to `public/consultation/` and posts an `ASSETS` mark. Until then `SceneArt` must fail
gracefully (no broken-image icon; fallback gradient shows). Draft files are low quality; finals replace them in
place under the same names.

| Art | Desktop | Phone |
|---|---|---|
| ART-01 Earth horizon | `/consultation/art-01-earth-horizon-desktop.avif` + `.webp` — 2560×1440 | `/consultation/art-01-earth-horizon-mobile.avif` + `.webp` — 960×1280 |
| ART-02 Technical doorway vista | `/consultation/art-02-door-technical.avif` + `.webp` — 640×896 (used both widths) | same file |
| ART-03 Business doorway vista | `/consultation/art-03-door-business.avif` + `.webp` — 640×896 | same file |
| ART-04 Three-walls terrain | `/consultation/art-04-walls-terrain-desktop.avif` + `.webp` — 2560×1200 | `/consultation/art-04-walls-terrain-mobile.avif` + `.webp` — 960×1280 |

---

## B-00 · Onboard + environment check
1. Read `TEAM_PROTOCOL.md`, `DRAMA_LAYER.md`, this file, plan sections SC-01…03 and the interaction contracts.
2. `git branch --show-current` must print `design/cinematic-consultation`. If not, **stop** and raise `BLOCKING`.
3. Probe the dev server (see protocol). Open the page in the Browser pane at 1440×900 and at the `mobile` preset.
4. Append `#L-… START [BLD] B-00` and then `DONE` with: branch, dev URL, tools available (Browser pane yes/no).

## B-01 · Baseline record (WP-01)
Create **nothing in `src/`**. Post the results as a `DONE` mark (not a file; the manager files it):
- `git rev-parse HEAD`.
- In the page (desktop 1440×900 and phone preset), via `javascript_tool`: `document.documentElement.scrollHeight`, and for each `section[data-cl-section]` its `id` + `offsetHeight`.
- `document.documentElement.scrollWidth > innerWidth` at phone width (overflow true/false).
- **Fingerprint for B-02** — `.cl-main` text length + SHA-256, taken **after scrolling the whole page once** (reveals must have fired; wait 1.5 s at the bottom, then scroll to top):
  `const t = document.querySelector('.cl-main').textContent.replace(/\s+/g,' ').trim(); [t.length, Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)))).map(b=>b.toString(16).padStart(2,'0')).join('')]`
  (`textContent` with whitespace collapsed, so animation/visibility state can't change the value).
- The id list: `[...document.querySelectorAll('[id]')].map(e=>e.id).join(',')`.
- Console errors at load (count + first message).

## B-02 · Split into scene files — no visual change (WP-06)
Goal: `ConsultationContent.jsx` becomes a thin assembler; every section lives in its own file. **Markup, class names, ids, `data-cl-section` attributes, copy strings and component props are moved verbatim.**

Create:
```
src/components/consultation/kit/ChapterMark.jsx      ← the ChapterMark function
src/components/consultation/scenes/HeroScene.jsx      ← D1 <section id="overview"> + the "EXPLORE THE PAGE" jump-links nav
src/components/consultation/scenes/AudienceScene.jsx  ← ChapterMark 01 + D2 <section id="audiences"> (doors AND the StatTrio block, still one section)
src/components/consultation/scenes/ContributionScene.jsx ← ChapterMark 02 + D3 + SUBJECTS
src/components/consultation/scenes/PersonScene.jsx    ← ChapterMark 03 + D4
src/components/consultation/scenes/ApproachScene.jsx  ← ChapterMark 04 + D5 + READINGS
src/components/consultation/scenes/EngagementScene.jsx ← ChapterMark 05 + D7
src/components/consultation/scenes/QuestionsScene.jsx ← ChapterMark 06 + D9 + QUESTION_GROUPS
src/components/consultation/scenes/ContactScene.jsx   ← ChapterMark 07 + D8
```
Each scene returns a fragment `<>ChapterMark…<section…>…</section></>`. `ConsultationContent.jsx` keeps: `useConsultationPage()`, the `.cl-consultation` wrapper, `<ConsultationIcons />`, `<ScrollRail />`, the skip link, `<main id="cl-main">`, and renders the scenes in the current order. Delete the unused `FigureRow` helper and its `void FigureRow;` line. **Do not delete** `ConsultationFigures.jsx` or any other file.

Self-checks (all must pass, post values in `DONE`):
- Same `.cl-main` innerText SHA-256 and length as B-01 (same method, same width).
- Same `[id]` list, same `section[data-cl-section]` order.
- No new console errors. Deep link `/ai-consultation#method` still opens and lands on reading R1; `#experience` link in the person section still opens R4.
Commit: `[BLD] B-02: split consultation page into scene files (no visual change)`.

## B-03 · Hero visible-first (INT-01)
In `HeroScene.jsx` only:
- Eyebrow, lead, invitation, actions and meta must **never start at `opacity: 0`** and must not wait for scroll/IntersectionObserver. Replace their `<Reveal>` wrappers with plain elements (same tag, same className).
- `<h1>`: render the `KineticHeading` lines statically (same markup as its reduced-motion branch: lines joined with `<br />`, same `id`, class). Keep the gradient text styling.
- DR-01 sheen: a one-time light sheen crossing the already-visible h1 (CSS `::after` gradient animation, ~1.4 s, starts ~0.3 s after load, runs once). Disabled under `prefers-reduced-motion` (already global in `consultation.css`).
- Put new CSS in a **new** file `src/components/consultation/consultation-scenes.css`, imported once from `src/pages/ai-consultation.jsx` right after `consultation.css`. Every selector starts with `.cl-consultation`.
Self-check: hard reload with the page at the top, screenshot within 1 s — headline, lead, both buttons and meta visible. Same at phone preset.

## B-04 · Scene kit
All in `src/components/consultation/kit/`, styles in `consultation-scenes.css`. No new deps.

**`SceneArt.jsx`** — `({ desktop, mobile, priority = false, position = 'center', scrim = 'none' | 'left' | 'bottom' | 'top', className = '' })` where `desktop`/`mobile` = `{ avif, webp, width, height }` (mobile optional → desktop used).
- Renders `<div className="cl-art cl-art--scrim-{scrim} {className}" aria-hidden="true">` containing `<picture>`: `<source media="(max-width: 767px)" type="image/avif" srcSet={mobile.avif}>`, same for webp, then desktop avif `<source>`, then `<img src={desktop.webp} width height alt="" decoding="async" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}>`.
- `onError` on the img → set state `failed` → hide the `<picture>`; container keeps a CSS fallback background (deep navy radial gradient) so text contrast survives (QA-26).
- CSS: container `position:absolute; inset:0; overflow:hidden; background: radial-gradient(...)`; img `width:100%; height:100%; object-fit:cover; object-position: var(--cl-art-pos)`. Scrim = gradient overlay `::after` (left: `linear-gradient(90deg, #020308 0%, #020308e6 38%, transparent 72%)`; bottom/top analogous).
- Low-amplitude parallax (DR-06): optional prop `parallax` (px, default 0) using framer `useScroll`/`useTransform` on the img, desktop ≥1100px only (`matchMedia`), off under `useReducedMotion()`.

**`SceneSeam.jsx`** — `({ edge = 'bottom', height = 160 })` → absolutely positioned `aria-hidden` div, gradient from transparent to the page background (`#020308`) so full-bleed art dissolves into the next scene. Optional `wipe` prop: a thin 1px light line (`linear-gradient(90deg, transparent, var(--cl-accent), transparent)`) that sweeps once when it enters view (framer `whileInView`, once); static under reduced motion.

**`SwipeTrack.jsx`** — `({ label, items: [{ id, name, content }], desktopLayout = 'grid', desktopFrom = 900, stackBelow = 360, onActiveChange })`
- Markup: wrapper `<div className="cl-track" role="group" aria-label={label}>`; a name index `<div className="cl-track__index">` with one `<button type="button" aria-current={active}>` per item (text = `name`); prev/next `<button>`s with `aria-label="Previous"/"Next"` (disabled at ends); `<ul className="cl-track__rail">` with `<li className="cl-track__item" id={id}>{content}</li>`.
- Phone: rail `display:flex; overflow-x:auto; scroll-snap-type:x mandatory; scroll-padding-inline: var(--cl-gutter); gap: 14px`; items `flex: 0 0 88%; scroll-snap-align: start`; hide scrollbar visually but keep it scrollable. Active index via IntersectionObserver on items (`root` = rail, threshold 0.6). Buttons scroll with `item.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest', inline: 'start' })`. **Never** call `preventDefault` on touch/wheel.
- `≥ desktopFrom`: rail becomes the scene's grid (CSS only; controls/index `display:none`). `< stackBelow`: items stack vertically, controls hidden.
- Expose active index through `onActiveChange(i)` (used by DR-02 doors) and `data-active="true"` on the active `li`.

**`ExpandToggle.jsx`** — `({ id, label, children })` → `<button type="button" className="cl-expand" aria-expanded aria-controls={id}>` + `<div id={id} className="cl-expand__panel" hidden={!open}>`. Hidden panel has no reachable tab stops. Opening animates (CSS keyframe fade/rise 0.3 s) and is instant under reduced motion. Focus stays on the button.

Self-check: a temporary demo is **not** committed. Verify each component inside B-05…B-07 instead; B-04 `DONE` just lists the files and the API.

## B-05 · SC-01 Earth hero stage + orbital (WP-07, DR-01)
Keep all hero copy/links exactly as in B-03. Layout changes in `HeroScene.jsx` + `consultation-scenes.css`:
- **Remove the glass panel look** from the hero: drop `cl-panel` class and the four `cl-panel__corner` spans and the `cl-hero__vmeta` strip from the hero section (plan: copy sits on open sky, not in a card). Keep `id="overview"`, `data-cl-section="D1"`, `aria-labelledby`.
- New structure: `<section id="overview" className="cl-hero-stage" …>` → `<SceneArt priority scrim="left" desktop={ART-01 desktop} mobile={ART-01 mobile} position="70% 50%" parallax={24} className="cl-hero-stage__art" />` + `<div className="cl-hero-stage__grid">` (12 columns, max 1320px) with copy in columns 1–6 and the orbital in columns 8–12 + the meta strip spanning all 12 at the bottom + `<SceneSeam edge="bottom" />`.
- **Full-bleed art:** the art element breaks out of `.cl-main` width: `position:absolute; top:0; bottom:0; left:50%; width:100vw; transform:translateX(-50%)`. The page root already uses `overflow-x-clip` — confirm no horizontal scroll at 320/390/1440.
- Height: `min-height: clamp(640px, 88vh, 820px)` desktop; phone `min-height: 600px`, grows with content; **never** a fixed height. Pull the section up under the navbar area so the art starts at the page top: the page shell has `pt-24` in `ai-consultation.jsx` — use a negative top margin on the art only (`top: -96px`) rather than changing the shell padding, and keep the copy clear of the navbar.
- Phone (<768px): SceneArt uses the mobile source; art sits behind/below the copy with scrim `top`-to-dark so the upper 55% stays calm for text; copy + actions first; meta strip wraps as plain lines (not tiny chips).
- **Orbital (DR-01):** in `_orbit.svg` change only text content: the five outer `<text>` labels, clockwise from top (x=320,y=56 / x=530,y=199 / x=459,y=518 / x=176,y=518 / x=107,y=199) → `YOUR NEEDS`, `CLARITY`, `STRATEGY`, `HARNESS`, `PEOPLE`; centre `AI` → `BUSINESS`, `INTEGRATION` → `× AI`; `HUMAN DIRECTION` → `THE JUNCTION`. In `ConsultationOrbit.jsx` footer text → `BUSINESS FIRST. AI ON TOP.` Swap node icons (`<use href="#cl-i-…">`) only if an obviously better existing icon id exists in `ConsultationIcons.jsx`; otherwise leave them. Show the orbital only ≥1100px (`display:none` below), positioned over the globe's dark side, max ~460px, opacity ~.9, existing radar sweep kept.
- Remove the old `.cl-hero` visual wrapper usage from the hero markup; leave the old `.cl-hero*` CSS rules in `consultation.css` untouched (dead rules are cleaned later by the manager's call).
Self-checks: 1440×900 and phone captures; initial-load visibility (B-03 still true); no overflow; with the art files missing the fallback gradient shows and text is readable; no console errors. Then again after the manager's `ASSETS` mark for ART-01.

## B-06 · SC-02 two doors (WP-08, DR-02, DR-05)
In `AudienceScene.jsx` (doors part) + `visuals/DoorVisual.jsx` + CSS. Copy = exactly what is in the code now (eyebrow, headline, intro, both cards' micro/title/body/foot).
- Desktop ≥900px: header band full width (existing split heading), then two **equal** door cards 6/6. Each card: inner two-thirds = copy; outer third = `<DoorVisual variant="technical|business" active={hover||focus} />`. Remove the old hover `translateY` lift on these cards.
- Card add-on (SP-02-06): a text link `Discuss your situation →` to `#contact` at the card foot (same `cl-text-link` + `ClIcon name="arrow"` as in D3).
- **DoorVisual (DR-02):** `aria-hidden="true"`. Frame = rounded-top rectangle with a glowing edge (technical `var(--cl-cyan)`, business warm-violet: `#a78bfa` edge with `#d9bf8b` inner glow). Inside: vista `<picture>` (ART-02 / ART-03, `object-fit:cover`, fallback gradient) and a **door leaf** div hinged on the outer edge: `transform-origin: right center` (or left, whichever reads as opening toward the copy), `perspective: 900px` on the frame, resting `rotateY(-28deg)`, active `rotateY(-64deg)` + vista `brightness(1.15)`, transition .8s cubic-bezier(.16,1,.3,1). Leaf: dark panel gradient, thin bevel line, small handle dot. Reduced motion: leaf fixed at resting angle, only the edge glow intensifies.
- Active = card `:hover`/`:focus-within` on desktop (CSS), and on phone the `SwipeTrack` active item (`onActiveChange` → `active` prop).
- Phone <900px: the two cards go into `<SwipeTrack label="Two kinds of company" items=[{name: card A title}, {name: card B title}] />`; the door visual moves to the top of each card as a shallow band (height ~180px) so the text stays dominant; both names visible in the index.
- Ground plane (SP-02-07): under the cards a decorative perspective floor (`repeating-linear-gradient` grid lines, `transform: perspective(600px) rotateX(62deg)`, fading out) leading into the walls. `aria-hidden`.
Self-checks: both doors reachable by mouse, keyboard (Tab lands on the links, door opens on focus-within) and touch/prev/next; stacked at 320px; captures at 1440 and phone; no overflow.

## B-07 · SC-03 three walls (WP-08, DR-03, DR-05)
In `scenes/WallsScene.jsx` (rendered **inside** the `#audiences` section after the doors, replacing the `<StatTrio />` usage and the recognition intro/bridge there) + `visuals/Monoliths.jsx` + CSS. Copy source: the `PROBLEMS` array in `ConsultationGraphs.jsx` (move it into `WallsScene.jsx` or export it — don't retype), the intro sentence and the bridge sentence currently in `AudienceScene`.
- Stage: intro sentence on open sky, then a wide stage with `<SceneArt scrim="top" desktop/mobile={ART-04} position="50% 70%" />` behind three **monolith** articles (desktop: 3 equal columns, each ~ 4/12).
- Monolith face: `<article className="cl-monolith">` with `clip-path: polygon(...)` giving an irregular stone top edge, dark stone gradient background (opaque enough for 4.5:1 text), a 1px accent edge light on one side (cyan / violet / lime per wall), content: big number (`01`), label (`TRUST`…), `<h3>` title, `<p>` text. **No bars, no metrics** — the old `cl-stat__bar` is not carried over.
- Response slot: each wall item has `response: null` in the data. Render `<ExpandToggle>` **only if `response` is a non-empty string**. Right now all three are null → no toggle renders. (Manager is collecting the copy — M-04.) When present, opening plays the DR-03 face-tilt decoration (`rotateX` 6° → 0 over .5 s) on the same article.
- DR-03 motion: monoliths rise into place when the stage enters (framer `whileInView`, once: `clipPath inset(100% 0 0 0) → inset(0)` + `y: 40 → 0`, staggered .12 s). Light traces: `visuals/Monoliths.jsx` renders an absolutely positioned `aria-hidden` SVG under the walls with three paths from each wall base to one convergence point bottom-centre; `pathLength` driven by `useScroll({ target, offset: ['start 80%', 'end 40%'] })`; colours match the wall accents; soft glow via a blurred duplicate stroke. Reduced motion: walls static, paths fully drawn.
- Phone <900px: intro, then `<SwipeTrack label="Three walls" items={TRUST, COMPLEXITY, RELIABILITY} />`, terrain art behind with the mobile source; traces hidden on phone.
- Keep the D2 bridge sentence after the stage.
Self-checks: all three problems readable without hover at both widths; no hidden duplicate text; keyboard reaches track controls; captures at 1440 and phone; no overflow at 320.

## B-08 · M1 seams, motion, QA evidence
- DR-06: `SceneSeam` between hero → doors (globe dissolves into the ground plane) and doors → walls; one light wipe at the walls stage entry.
- Verify reduced-motion parity by code reading (every framer animation branch checks `useReducedMotion()`; CSS animations covered by the global reduced-motion rule) and list each animated element in the `DONE` mark.
- Evidence in the `DONE` mark: capture ids/paths for SC-01…03 at 1440×900 and phone preset (scroll each into view first), `scrollWidth` at 320/390/1440, console error count, `#audiences` and `#overview` deep links, and the new page height at phone width vs B-01.
- Run `npm run build` once; report pass/fail.

---

## Manager cards (for the record)

- **M-01 ART-01:** 3 × 2560×1440 + 2 × 1152×1536 low drafts per plan ART-01 brief (dark left 50–55% desktop / upper 55% phone, bright rim lower-right, no people/text) → contact sheet → owner pick → export draft placeholders to the asset contract paths → `ASSETS` mark → provenance row (DRAFT).
- **M-02 ART-04:** 3 × 2560×1200 + 2 × 1152×1536; terrain + small luminous path, clear midground, **no monoliths, no figures**.
- **M-03 ART-02/03:** 3 × 1040×1456 each; ART-03 generated with `--ref` the approved ART-02. Export 640×896.
- **M-04 copy asks** (to owner/Captain, no invention): three wall responses (one or two sentences each, "how the consultation addresses it"), card B title decision (CP-01), hero lead length for the new stage (SP-01-02).
- **M-05 audits:** for each `DONE`: read the diff, check against this card + plan + drama layer, run the page at both widths, then `ACK` or `STEER`/`BLOCKING` with the exact fix.
- **M-06 owner package:** M1 captures + open gates + decisions → owner.
