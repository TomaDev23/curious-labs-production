# Scene specs — build each scene to its mockup

Each spec = the mockup region, desktop layout, phone layout, kit primitives, art paths, copy sources, motion.
Rules for all scenes: `MOCKUP_CANON.md` (what to take / not take), `CANON_KIT.md` (primitives + sizes),
plan v1.0 INT/QA contracts. **Acceptance for every scene:** desktop 1440×900 and phone captures looked at next to
the mockup, a delta list in the DONE mark, no visible art box edges, no text on bright art, no horizontal overflow at
320/390/1440, reduced-motion = complete static page.

**Copy:** headings and body = the text already in the scene file (from COPY_DECK_v2). New slots the mockup has
(quotes, taglines, chips, stat labels, card micro labels, image captions) get placeholder text in
`src/components/consultation/scenes/copy/<scene>.copy.js`, each `{ text, placeholder: true, source }`. Mockup strings
may be used only if they pass MOCKUP_CANON §4 — otherwise write a neutral placeholder derived from existing page copy
and list it in DONE. Never "we", "Book", out-of-scope services, testimonials, numbers not in the framing.

**Art:** paths below. `[ready]` exists now; `[coming]` is produced by the manager — code against the path; `SceneArt`
and `ImageTile` must render a clean fallback until the file exists.

---

## SC-01 Hero · lane C · MOCK-D0 + MOCK-M1 col 1 top
Covered by TASKS **C-01** (= former B-05R + copy slots). Art: `art-01-earth-horizon-{desktop,mobile}` [ready; phone is 900×1600].

## SC-02 Two doors · lane A · MOCK-D1 top + MOCK-M1 col 1 bottom
- Band with ART-01 desktop reused as a shallow globe top-right (`position 100% 0%`, faded) — desktop only.
- Grid: header row (Eyebrow + Display 2 lines + Lead left, cols 1–8; QuoteBlock right, cols 10–12).
- Two `NeonCard`s 6/6, gap 36px, min-height ~440px, cyan / violet. Inside each: left 62% copy (IconRing, micro label,
  h3, serif body, chips, PrimaryButton "Discuss your situation →" to `#contact`), right 38% **DoorVisual**: neon frame
  flush with the card's right edge, vista image, leaf hinged on the frame's outer edge swung outward so ~40% of the leaf
  projects beyond the card edge, handle dot, floor glow ellipse below the frame, faint reflective floor under both cards.
- Taglines under the cards: left and right.
- Phone: Eyebrow, Display, Lead; two stacked NeonCards (IconRing + title + CircleArrow in a row, body, chips); no doors,
  no globe; tagline centred.
- Art: `art-02-door-technical`, `art-03-door-business` [ready]. Reuse `visuals/DoorVisual.jsx` parked by lane C if useful.
- Motion: DR-02 (leaf opens further on card hover/focus; static under reduced motion).

## SC-03 Three walls · lane A · MOCK-D1 bottom (phone = plan INT-03)
- Band art: `art-04-walls-terrain-{desktop,mobile}` [ready v2]. Eyebrow + Display + Lead top-left; moon is in the art;
  WordStack right.
- Three monoliths across cols 1–12 (each ~30% wide, gap 3%), height ~520px, tops irregular (clip-path), faces dark stone
  (`--k-surface` + subtle noise gradient) with a 2px accent light seam on the inner edge. Content: big thin accent number
  + IconRing-less neon icon (40px) in a row, h3 28px, serif body. No quotes.
- SVG light paths (cyan/violet/lime), 2px core + 10px blurred glow, from each wall's bottom-centre curving down to the
  convergence point at bottom-centre of the band; figure `art-09-figure-walker` [ready] 150px tall with feet on that point.
- Tagline + CircleArrow (down, to `#contribution`) centred at the band bottom.
- Phone: Eyebrow, Display, Lead, SwipeTrack of monolith cards (paths + figure hidden), tagline.
- Motion: DR-03 (walls rise, paths draw on scroll).

## SC-04 What I actually do · lane A · MOCK-D2 + MOCK-M1 col 2 top
- Band with ART-01 desktop as a shallow top-right globe (desktop). Header: Eyebrow + Display + Lead left, QuoteBlock right,
  WordStack between.
- Triptych: cols 1–3 / 4–9 / 10–12, arrows (CircleArrow-less thin lime arrows) between cards.
  - Left `NeonCard cyan`: "01 — CLARITY FIRST" micro row, IconRing, h3 (area 1 title), body, 3 `IconRow`s, `ImageTile`
    (`art-13-tile-city-lights` [coming]) with 2-line caption.
  - Centre `NeonCard violet featured`: "02 — THE CORE", IconRing + h3 (area 2 title) + body, then the **HarnessSystem**
    visual (~420px): glowing sphere core image `art-12-harness-core` [coming] with SVG orbit rings around it, 5 nodes
    (IconRing 56px) at pentagon positions with label + sublabel: Context, Stages, Tools, Handoffs, Checks (plan-supported);
    thin connectors; formula line mono at the bottom (placeholder slot, e.g. `CONTEXT × METHOD × PEOPLE = OUTCOMES`).
    **The orbital from `_orbit.svg` retires here** — reuse its ring/sweep language, not the old SVG file.
  - Right `NeonCard cyan`: "03 — TURN INTO ACTION", IconRing, h3 (area 3), body, 4 `IconRow`s, `ImageTile`
    (`art-14-tile-summit` [coming]).
- Full-width `NeonCard` band: icon + "No fixed packages"-style title (use the existing delivery-band heading) + body +
  PrimaryButton to `#contact`. Then the scope line (existing). No "typical outcomes" claims row.
- Bottom: mountain horizon art `art-15-horizon-mountains` [coming] full-bleed; "NEXT → About me" cue linking `#person`.
- Phone: three stacked NeonCards (IconRing, title, body, lime mono tag, CircleArrow). Card 02's arrow toggles the
  HarnessSystem inline (ExpandToggle).
- Motion: nodes light in sequence on enter; DR-04 pin is a later, separate task.

## SC-05 Person + this market · lane B · MOCK-D5 + MOCK-M1 col 2 bottom
- Band 1 (hero-like): full-bleed `art-05-balcony-city-{desktop,mobile}` [coming — generated realistic placeholder];
  Eyebrow + Display (existing person headline, 4 lines at canon scale) + serif body + PrimaryButton ("More about my
  experience" → opens R4) + GhostButton to `#contact`, cols 1–5, over the dark left; QuoteBlock + WordStack top-right;
  tagline bottom-right.
- Band 2: 4-up credibility `NeonCard`s (compact, IconRing + title + line) from the existing person strands/details:
  18 years in the Khmer market · Hospitality, F&B, real estate · Current AI operator · One person, both sides.
- Band 3 split: left panel (portrait slot → **collapses** until an owner photo exists; use a quote + WordStack on dark
  space instead), centre "Rooted in Cambodia" eyebrow + h3 + serif body (existing market/language copy) + chips,
  right framed `ImageTile` `art-05-riverside-dusk` [coming] with caption.
- Band 4 "A clearer tomorrow": Earth-at-night art (ART-01 desktop reused, `position 60% 100%`) with the Cambodia marker
  (a lime pin line + label; **no generated country outline** — accurate outline waits for a sourced SVG) + side list card.
  If the band has no approved copy, keep it to the image + marker + the existing closing sentence.
- Phone: headline, body, buttons, image card (`art-05-balcony-city-mobile`) with quote, 4 `IconRow`s.

## SC-06 Approach + readings · lane B · MOCK-D3 + MOCK-M1 col 3 top
- Band 1: Eyebrow + Display (existing approach headline) + Lead + buttons left; Earth sunrise `art-06-earth-sunrise`
  [coming] right; QuoteBlock; tagline.
- Band 2 path: header left (existing operator/contrast copy) + short side text right; **luminous wavy SVG path** across the
  width with 4 glowing IconRing nodes (alternating heights), step title + serif text under each node. Steps come from the
  existing OperatorView/contrast content reorganised into 4 steps — if the copy doesn't split cleanly, list it in DONE.
- Band 3 "Four perspectives": 4 tall `NeonCard`s (R1–R4): number + mono title + CircleArrow, `ImageTile`-style image
  (`art-07-reading-method`, `art-08-reading-concept`, `art-10-reading-technology`, `art-11-reading-experience` [coming]),
  h3, serif body, chips. **Each card still opens its reading inline** (native `<details>` / hash `#method` etc. preserved).
- Band 4: full-width quote NeonCard with 3 icon points (placeholder copy slots).
- Phone: headline + lead, 4 `NumberedRow`s with `+` (steps), then reading cards stacked.
- Motion: DR-07 path draws, nodes light; DR-08 inline expansion.

## SC-07 Engagement · lane C · MOCK-D4 top + MOCK-M1 col 3 middle
- Band art: galaxy sky `art-16-galaxy-band` [coming]. Eyebrow + Display + Lead left; QuoteBlock + WordStack right.
- Four `NeonCard`s in a row with thin lime arrows between: number, neon icon (56px), title, serif text, hairline,
  mono closer line (placeholder). Steps = canonical Discuss → Propose → Agree → Deliver from the existing FlowGraph data.
- Phone: `NumberedRow`s with icon + arrow (all four steps).
- Keep the existing free/agreed boundary sentence below.

## SC-08 Questions · lane C · MOCK-D4 middle
- Eyebrow + Display left, side text + GhostButton "View all questions" right.
- Two columns of numbered pill rows (`NumberedRow` action plus): first 8 questions visible from the existing
  QUESTION_GROUPS (keep every question reachable — "View all" reveals the rest in place). Answers open inline.
- Phone: one column, first 6 visible, reveal button.

## SC-09 Final horizon + contact · lane C · MOCK-D4 bottom + MOCK-M1 col 3 bottom
- Band art: Earth limb + mountain sunrise `art-17-final-horizon-{desktop,mobile}` [coming] with the walker figure layer
  (`art-09-figure-walker` [ready]) standing on the right ridge. Eyebrow + Display (existing contact headline) + Lead +
  PrimaryButton to the contact area + GhostButton; 3 icon points row (placeholder slots); tagline top-right.
- Contact state: **pending** — a clear status note instead of channel buttons; the channel icon row renders only when
  destinations exist (none now).
- Footer band: logo + quote + links + mono tagline (the page shell footer in `ai-consultation.jsx` belongs to lane C).
- Phone: horizon image, NeonCard with headline, text, lime button, pending note.
