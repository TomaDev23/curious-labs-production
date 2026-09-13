# AI Consultation page · DESIGN CONTINUITY NOTE

**For a fresh Claude Code context resuming this work — focused on DESIGN.** Written 2026-09-13
by the copy-round agent before its context was cleared. The copy round is essentially done and
is being polished separately (owner + another agent / ChatGPT "Captain"). **Your job now is the
visual/design round, not copy.**

Live at **https://curiouslabs.space/ai-consultation** (production, `main`). Unlisted,
`noindex,nofollow`, low traffic — fine to iterate against.

---

## 0 · Read first, in order

1. `_FRAMING_LOCKED.md` — canonical intent + voice. **Do not rewrite copy to fight it.**
2. `COPY_DECK_v2.md` — the copy that's live now (source of truth). **Copy may still shift**
   under you because another agent is polishing it — design around the *structure*, not exact words.
3. `DESIGN_SYSTEM.md` — palette, rhythm, CSS ownership (scoped tokens).
4. `NEXT_PASS_HANDOFF.md` — the original design-buff brief; **still in force**. Its "Known issues"
   list is your punch list. `AGENT_HANDOFF.md` has the integration rules.

## 1 · Where the design stands

- Route `/ai-consultation`. Files:
  - `src/pages/ai-consultation.jsx` — shell, Helmet, background, footer
  - `src/components/consultation/ConsultationContent.jsx` — all sections
  - `src/components/consultation/ConsultationGraphs.jsx` — StatTrio, OperatorView, HarnessGraph, TrustSpectrum, FlowGraph (framer-motion, scroll-driven)
  - `src/components/consultation/consultation.css` — scoped layout + tokens on `.cl-consultation` (NOT `:root`)
  - `src/components/consultation/ConsultationOrbit.jsx` + `_orbit.svg` — the hero orbital (inline `?raw`)
  - `ConsultationIcons.jsx`, `ConsultationMotion.jsx` (Reveal/Stagger/KineticHeading/ScrollRail), `useConsultationPage.js`
- Background is the shared `src/components/landing/LandingCosmicBackground.jsx` (do not fork a 2nd starfield).
- Section order: **Hero → Audiences (2 client cards + 3-problem StatTrio) → What I actually do
  (3-theme grid: feature card + 2) → Person → Approach (OperatorView + contrast + R1–R4 details) →
  Engagement (FlowGraph) → Questions (FAQ) → Contact (channels PENDING)**.

## 2 · The design punch list (start here)

1. **Orbital is off-message.** `ConsultationOrbit` / `_orbit.svg` still read **"AI INTEGRATION /
   HUMAN DIRECTION"** (center) and **"PEOPLE. PROCESSES. POSSIBILITIES."** (lime footer). Update
   the text to fit "business consultation in the age of AI" (business-advisor-first, the junction).
   It's decorative (`aria-hidden`) — labels are not the offer, so keep them atmospheric, not a
   feature list. If reused on the homepage, unique gradient/clip IDs (`home-*` not `hero-*`).
2. **Hero vertical whitespace.** Big empty gap below the hero copy (hero grid `1.12fr .88fr`,
   `.cl-hero`). Rebalance the copy/orbital so it doesn't feel hollow. This is the owner's #1 eyesore.
3. **Background vs page length.** `LandingCosmicBackground` fades the galaxy on *document* scroll,
   tuned for the long homepage. On this shorter page it may peak/vanish in the wrong place. Tune the
   *relationship* (overlay, panel opacity, vignette) locally & tiny — don't fork the engine. If you
   touch `LandingCosmicBackground` or the navbar, **re-check `/` (landing) too.**
4. **Navbar overlap / anchor offset.** `--cl-anchor-offset` = 96px; navbar is a corner clip (~56px)
   desktop / full 56px bar mobile. Check titles aren't hidden under the bar at `#approach`,
   `#contact`, `#experience`.
5. **Contact right column is sparse** (channels are PENDING by design). Compose that empty state —
   do NOT invent Telegram/WhatsApp/email buttons. Keep the pending note.
6. **Scrollbar.** Landing uses a cyan→violet→lime scrollbar (page-scoped `<style>`). Consultation
   doesn't. Match or omit on purpose.
7. **Type & weight.** Clash Display is a display face (`--cl-font`); body is Inter Tight; mono is
   JetBrains Mono. Check tracking/wrap on headings; body may want more Inter Tight.
8. **Three-theme grid.** Currently feature card (T1 "Find where AI is actually worth it.") full-width
   + T2/T3 as a pair below. Consider whether the *harness* (T2, the core) deserves the feature slot.
9. **Responsive.** Targets 320 / 390 / 768 / 1024 / 1440. Mobile: hero copy + CTAs BEFORE the
   orbital; audience/subject/flow/contact stack; **no horizontal overflow** at 320 or 1440.
10. **Focus & motion.** Keep visible `:focus-visible`; `prefers-reduced-motion` already kills
    transitions in `consultation.css` — keep it. Reveals must not hide meaning.

## 3 · Guardrails (unchanged)

- No new npm deps, no new 3D / autoplay canvas / heavy framer scroll-theatre, no extra providers.
- No global CSS / `:root` token dump — keep tokens under `.cl-consultation`.
- Don't restructure the offer, don't ship fake contacts / fake proof / "coming soon" method cards.
- Don't touch MoonSignal / AEGIS / the navbar structurally.
- Homepage H1 invitation, real contact wiring, evidence (D6), Khmer site copy = out of scope unless asked.

## 4 · Working rules

- **PowerShell** (no `&&`, chain with `;`). Bash tool also available.
- Dev server runs on **localhost:5173** (owner keeps it up) — **don't start your own.**
- **Don't build after every tweak.** Review, then ask before committing. **Don't run git** unless asked.
- Verify in the browser at desktop AND a phone width. Note: Reveal animations gate on
  scroll-into-view, and screenshots can blank if the app window is behind another — fall back to
  `get_page_text` / `read_page` to confirm content.
- The page is already in production; treat visible changes as shipping the next time the owner pushes.

## 5 · Immediate suggested first move

Open the live page, walk it top-to-bottom desktop + 390px, and give the owner a short prioritized
design plan (orbital text + hero whitespace first). Then go section by section. Don't boil the ocean.
