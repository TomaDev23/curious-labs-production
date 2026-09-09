# Handover · AI consultation page · review + design buff

**Date:** 9 September 2026  
**Route live:** `/ai-consultation`  
**Status:** First integration pass is in the app. Structure and copy from v0.3 are on the route. This is **not** publication-ready. Homepage invitation is **not** inserted yet.

Your job: review what is live, then give the page a **design buff and upgrade** without turning this into a site redesign, architecture change, or content-invention pass.

---

## Mission for the next agent

1. Open the live route and the v0.3 HTML reference side by side.
2. Review layout, type, spacing, background relationship, mobile order, focus, and section rhythm.
3. Upgrade the **visual craft** of this page so it sits naturally on the current landing-page cosmic background, while staying a readable consultation page rather than another product splash.
4. Keep the service meaning, sequence, and copy constraints intact.
5. Report what you changed, what you left, and what still needs owner input.

Do **not** start by rebuilding the page from scratch. Buff the existing React implementation.

---

## Working environment

- Repo: `C:\curious-labs-production1`
- Shell: **PowerShell only. Never use `&&`.** Chain with `;` or separate commands.
- Do not delete files unless the owner explicitly says so.
- Do not run git commands unless the owner asks.
- Do not expand into navbar redesign, product pages, 3D, providers, or repo cleanup.
- Verify UI in the browser: desktop and a narrow phone width. Click, scroll, open readings, follow in-page links. A single screenshot is not verification.

Dev server: `npm run dev` (Vite, port **5173**).  
Page: `http://localhost:5173/ai-consultation`

---

## Read this first, in this order

### Live code (source of truth for what shipped)

1. `src/pages/ai-consultation.jsx` — page shell, Helmet, background, footer
2. `src/components/consultation/ConsultationContent.jsx` — D1–D5, D7, D8
3. `src/components/consultation/consultation.css` — scoped tokens + layout
4. `src/components/consultation/ConsultationOrbit.jsx` + `_orbit.svg`
5. `src/components/consultation/ConsultationIcons.jsx`
6. `src/components/consultation/useConsultationPage.js`
7. `src/App.jsx` — lazy route `/ai-consultation` next to `/contact`
8. `src/pages/CuriousLabsLanding.jsx` — live homepage; H1 insertion point is **not used yet**
9. `src/components/landing/LandingCosmicBackground.jsx` — shared backdrop

### Design authority (do not treat screenshots as service copy)

10. `Docs_v8/page_Consultation/CuriousLabs_AI_Consultation_v0.3.html` — open this; it is the visual/structural reference
11. `Docs_v8/page_Consultation/CONTENT_MAP.md` — IDs, anchors, what is draft
12. `Docs_v8/page_Consultation/DESIGN_SYSTEM.md` — palette, rhythm, CSS ownership
13. `Docs_v8/page_Consultation/IMPLEMENTATION_PLAN.md` — phases, in/out of scope
14. `Docs_v8/page_Consultation/AGENT_HANDOFF.md` — original integration rules (still in force)
15. `Docs_v8/page_Consultation/homepage-invitation.html` — H1 fragment; **not wired**
16. `Docs_v8/page_Consultation/QA_REPORT.md` — what the HTML reference checked (Chromium only)

The v0.2 chart is the copy/shape source. v0.1 is the fuller boundary document (`CuriousLabs_AI_Consultation_Page_Flow_Wireframe_v0.1.docx` is in this folder). Screenshot promotional lines such as “Book Free Consultation” and the generic six-stage cycle are **not** adopted.

---

## What is already implemented

Live sequence on `/ai-consultation`:

`D1 Offer → D2 Audiences → D3 Contribution → D4 Person → D5 Approach (R1–R4) → D7 Engagement → D8 Contact`

| Piece | State |
|---|---|
| Route `/ai-consultation` | Registered, lazy-loaded |
| `MissionControlNavbar` | Reused; do not replace |
| `LandingCosmicBackground` | Reused as the only page background |
| Compact landing-style footer | Present; not `FooterExperience` (that footer fights the cosmic bg) |
| Scoped `.cl-consultation` CSS | Tokens live on the component class, not `:root` |
| Site fonts | `--cl-font` is Clash Display / Inter Tight; `--cl-mono` is JetBrains Mono |
| Orbital SVG | Inline via `?raw`; IDs are `hero-*`; one instance only |
| Native `<details>` for R1–R4 | Independent; several may stay open |
| Hash `#method` `#concept` `#technology` `#experience` | Opens that reading on load / hashchange |
| D4 “More about my experience” | Opens `#experience` then scrolls |
| Close-this-topic | Closes that row and restores focus to its summary |
| Skip link | Present |
| `noindex, nofollow` | On until owner says otherwise |

Eyebrow numbers on the live page were shifted after omitting D6 (`05` = engagement, `06` = contact). Source IDs `data-cl-section="D7"` / `"D8"` were kept.

---

## What was deliberately omitted

These are **not** bugs. Do not put them back as placeholders.

- **D6 Evidence.** No approved artifacts. Empty proof slots must not ship. Add D6 only with real, approved own-work images plus Origin / Purpose / Meaning / Limit. If still unready, keep it omitted.
- **Telegram / WhatsApp / email actions.** Config is empty on purpose. Dead buttons must not ship. Do not copy `contact@curiouslabs.kh` from `/contact` unless the owner explicitly approves it for this page.
- **Homepage H1 invitation.** Not inserted. Planned seam: `CuriousLabsLanding.jsx`, **immediately before** `<MoonSignalShowcase />` (after `HeroCelestial` and `MoonSignalRevealSection`). Leave MoonSignal and AEGIS untouched. Convert fragment links to `/ai-consultation` and `/ai-consultation#contact`. If you add the orbital there, give it unique IDs (`home-*`), not `hero-*`.
- **Demo shell.** No fake UTC/status bar, no “Homepage panel / Build notes”, no `demo-shell.css`.
- **Portrait, public name/title, Facebook, QR codes.**

Contact section currently shows invitation copy, location/language, and a short note that destinations will appear after confirmation.

---

## Hard content rules (do not invent)

- Personal delivery: “I”. “We” = consultant + client, not a fake team.
- Not a course, package, coding lesson, booking calendar, or product-development shop.
- Do not define Maestro, Orchestrator mode, LEGIT, or planning principles.
- “18 years” is **residence in Cambodia**, not years of AI experience. Do not “fix” the number.
- Free first conversation ≠ meeting booked. Email composer ≠ mail sent.
- Do not add prices, durations, deposit %, testimonials, client logos, or case-study claims.
- Do not add a form, account, checkout, scheduler, mailing list, or analytics funnel.

Copy on the page is **draft until owner approval**. Visual upgrade may tighten hierarchy and spacing; it may not silently rewrite the service.

---

## Known issues to inspect in the design buff

Treat these as the upgrade brief. Confirm in the browser before rewriting.

1. **Background vs page length.** `LandingCosmicBackground` fades the galaxy in/out on **document** scroll, tuned for the long homepage. On this shorter page the galaxy may stay too faint, peak in the wrong place, or vanish too early. Buff the *relationship* (overlay, panel opacity, vignette), but do **not** fork a second starfield/WebGL engine. If you need a consultation-only opacity curve, keep it local and tiny.
2. **Navbar overlap / anchor offset.** Desktop navbar is a corner clip (~56px) plus hover expand; mobile is a full 56px bar. `--cl-anchor-offset` is 96px. Check whether section titles hide under the bar on `#approach`, `#contact`, `#experience`. Page padding is `pt-16 lg:pt-8`.
3. **Contact panel.** Two-column grid with no channel cards leaves a sparse right column. Redesign that empty state; do not invent buttons.
4. **Scrollbar.** Landing uses a cyan→violet→lime scrollbar via a page-scoped `<style>`. Consultation does not. Match or omit intentionally.
5. **Type and weight.** Clash Display is a display face. Hero/section sizes came from the Inter-based reference. Check tracking, wrap, and whether body copy should lean more on Inter Tight.
6. **Quiet sections vs hero.** D5/D7 should stay editorial. Do not turn every block into another orbital infographic.
7. **Narrow widths.** Reference targets: 320, 390, 768, 1024, 1440. On phones: hero copy and CTAs before the orbital; audience/subject/process/contact stack; no horizontal overflow.
8. **Focus and motion.** Visible `:focus-visible`; `prefers-reduced-motion` already kills transitions in `consultation.css`. Keep it.
9. **Orbital.** Decorative (`aria-hidden`). Labels are not the offer. If reused on the homepage, unique gradient/clip IDs are mandatory.
10. **Landing regression.** If you touch `LandingCosmicBackground` or the navbar, re-check `/` as well as `/ai-consultation`.

Out of scope unless the owner asks in this pass: homepage H1 insert, real contact wiring, evidence, bilingual Khmer site copy.

---

## Design buff — what “upgrade” means here

Allowed:

- Spacing, type scale, panel translucency, borders, hover/focus, reading-row open state
- Hero/orbital balance against the galaxy
- Mobile stacking and tap targets
- Contact empty-state composition
- Small shared-token tweaks **inside** `.cl-consultation`
- Optional H1 homepage panel **only if** you can do it without disturbing MoonSignal/AEGIS, and you still have time after the page itself looks right

Not allowed:

- New 3D, Framer-heavy scroll theatre, autoplaying canvas, extra providers
- New npm dependencies
- Global CSS / `:root` token dump
- Rewriting the offer into a product or course
- Shipping fake contacts, fake proof, or “coming soon” method cards

Visual north star: cream headlines, lime actions, cool thin borders, restrained orbital, cosmic background showing through readable panels. Calmer than the dense screenshot boards. The live landing (`/`) is the atmosphere; the v0.3 HTML is the consultation reading path.

---

## File map

```
src/pages/ai-consultation.jsx
src/components/consultation/
  ConsultationContent.jsx
  ConsultationIcons.jsx
  ConsultationOrbit.jsx
  _orbit.svg
  consultation.css
  useConsultationPage.js
src/App.jsx                          # route only

Docs_v8/page_Consultation/           # reference pack + this handover
  NEXT_PASS_HANDOFF.md               # this file
  AGENT_HANDOFF.md                   # original integrate-from-HTML brief
  CONTENT_MAP.md
  DESIGN_SYSTEM.md
  IMPLEMENTATION_PLAN.md
  QA_REPORT.md
  CuriousLabs_AI_Consultation_v0.3.html
  index.html / consultation-main.html
  homepage-invitation.html
  consultation.css / tokens.css      # reference copies; live CSS is under src/
```

Rollback for the first pass: remove the route in `App.jsx` and the `src/pages/ai-consultation.jsx` + `src/components/consultation/` files. Homepage was not changed.

---

## Acceptance for this pass

- `/ai-consultation` still direct-loadable and refresh-safe
- D1–D5, D7, D8 still present and in order; R1–R4 still independent
- No leaked styles onto `/` or product pages
- No horizontal overflow at 320 and 1440
- Keyboard: skip link, buttons, summaries, close-restore-focus
- Reduced motion does not hide meaning
- No dead contact controls, no empty evidence frames
- Browser-checked: hero, open a reading, close it, `#contact`, `#experience`, one phone width
- Report: files changed, screenshots (desktop + phone), remaining content gates, what you did **not** do

Do not call it publication-ready while copy, identity, contacts, and (optional) evidence are still gated.
