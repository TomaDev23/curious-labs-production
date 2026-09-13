# Mockup canon — the design we are building

**Owner, 2026-09-13:** "I like this design. I want to achieve this design across its different steps, with some
refinement later to the copy and replacing the character, maybe me. It uses the space correctly and has a mobile
version for us to use as a constant reference." → These mockups are the **binding visual target** for composition,
layout, scale, surfaces, motion anchors and the mobile flow. Nobody re-litigates the look; we build toward it.

Files (`references/mockups/`):

| ID | File | Scenes |
|---|---|---|
| MOCK-D0 | `../scene-crops/SC-01a_earth-hero.jpg` | SC-01 desktop hero (the hero image the owner approved earlier) |
| MOCK-D1 | `MOCK-D1_audiences-doors-walls_desktop.png` | SC-02 two doors + SC-03 three walls |
| MOCK-D2 | `MOCK-D2_what-i-do_desktop.png` | SC-04 what I actually do (harness orbital centrepiece) |
| MOCK-D3 | `MOCK-D3_approach-readings_desktop.png` | SC-06 approach path + four reading cards |
| MOCK-D4 | `MOCK-D4_engagement-faq-contact_desktop.png` | SC-07 engagement, SC-08 questions, SC-09 final horizon + footer |
| MOCK-D5 | `MOCK-D5_person-cambodia_desktop.png` | SC-05 person + this market |
| MOCK-M1 | `MOCK-M1_full-flow_mobile.png` | Phone flow for the whole page (three phone columns, read top→bottom, left→right) |

## 1 · Authority (where canon sits)

`_FRAMING_LOCKED.md` (meaning, voice, hard "don't invent" rules) > **MOCKUP_CANON (look, layout, mobile flow)** >
plan v1.0 (scene inventory, interactions, accessibility, QA) > `DRAMA_LAYER.md` > `TASKS.md`.

- Where the plan's geometry or a DR item differs from the mockup's composition → **the mockup wins**.
- Where the mockup's *words* break the locked framing → **the framing wins** (see §4). The slot stays; the words change.
- Accessibility/interaction contracts in the plan (INT-xx, QA-xx) still apply to everything built to canon.

## 2 · Global visual language (every scene)

- **Full-bleed cinematic bands.** Each scene is a wide band of art/space running edge to edge; content sits in a
  1320px column inside it. Bands are separated by a **thin full-width hairline**, not by card stacks or spacer gaps.
  Art never shows a boxed rectangle edge.
- **Eyebrow:** short lime dash + spaced uppercase mono label in lime (e.g. `— TWO AUDIENCES. ONE CONVERSATION.`).
  The old `01 ——— LABEL` chapter-mark rows are **not** in the canon → retire them as each scene is rebuilt (anchors stay).
- **Headlines:** very large cream Clash Display, tight leading, 2–4 short lines; hero-scale in every band
  (desktop ≈ 64–92px; phone ≈ 34–44px).
- **Body + quotes:** a **serif** for body paragraphs and editorial quotes (pending owner OK to self-host a serif, §5).
  Until then Inter Tight stays; build so the swap is one CSS variable (`--cl-serif`).
- **Editorial quote block** at the top-right of a band: cream quote, short lime rule, `● CURIOUSLABS` mono label;
  optional vertical mono word stack at the far edge (`PHNOM PENH / CAMBODIA / …`).
- **Scene closer taglines:** spaced mono, bottom-left and/or bottom-right of a band (`SAME CURIOSITY. / MORE POSSIBILITIES.`).
- **Surfaces:** dark glass cards with a **neon edge** (cyan / violet-magenta / lime per card), 12–16px radius,
  outer glow on the featured card; icon in a neon ring; outlined pill chips; lime primary button with arrow,
  ghost secondary button; small circular arrow buttons on card corners.
- **Accent mapping:** technical = cyan · non-technical = violet/magenta · action/emphasis = lime · warmth = amber sunrise.
- **Numbers:** large thin numerals (`01`, `02`) in the card accent colour.

## 3 · Scene targets

### SC-01 Hero — MOCK-D0 (desktop), MOCK-M1 col 1 top (phone)
- Desktop: headline left on open sky; globe bleeding off the lower-right with sunrise on the limb; **editorial
  quote block top-right**; lead, lime primary + ghost secondary buttons; no card, no box. **No orbital over the
  globe** (the orbital moves to SC-04, §3 SC-04).
- Phone: eyebrow, big headline, lead, full-width lime button + full-width ghost button; globe on the **right edge**
  behind the lower half with the quote over dark space; **3-column stat strip** with dividers
  (`18 YEARS IN CAMBODIA` · `AI HANDS-ON OPERATOR` · `REAL BUSINESSES — Hospitality, F&B, Real estate`), then a
  circular down-arrow. Text never sits on bright city lights.

### SC-02 Two doors — MOCK-D1 top (desktop), MOCK-M1 col 1 bottom (phone)
- Desktop: headline left, globe top-right with orbit line + quote; two large equal neon-edged cards (cyan / violet);
  each card = icon ring + mono label + big title + body + chips + **lime button inside the card**; **a real door on
  the outer third, standing open**, vista visible, door leaf swung outward beyond the card edge; glowing floor
  reflection; closer taglines under the cards.
- Phone: **stacked cards, not a swipe track, no doors**: icon ring + title + circular arrow button, body, chips.
  Closer tagline centred below.

### SC-03 Three walls — MOCK-D1 bottom (desktop); phone = plan INT-03 (not in MOCK-M1)
- Desktop: headline + intro over sky, moon top-right, vertical mono word stack; **three tall rock monoliths** across
  the stage, each with number + neon icon, title, body, one quote line; **glowing light paths (cyan / violet / lime)
  converge from the walls to a single point at bottom-centre** where a figure stands (placeholder character, §4);
  closer tagline + circular down-arrow.
- Phone: swipe track of the three walls (plan INT-03) in the same surface language.

### SC-04 What I actually do — MOCK-D2 (desktop), MOCK-M1 col 2 top (phone)
- Desktop: headline left, globe top-right + quote; **3-column triptych**: left card (01, compass icon, title,
  body, 3 icon rows, small image tile with caption), **centre featured card with violet neon edge: the orbital
  harness system** (glowing sphere core, rings, 5 node icons with labels + sublabels, formula line
  `CONTEXT × METHOD × PEOPLE = OUTCOMES`), right card (03, icon, title, body, 4 icon rows, image tile);
  arrows between cards; full-width "No fixed packages" band with icon + text + lime button; outcomes row; mountain
  horizon at the bottom; "NEXT → About me" cue. **This is where the owner-approved orbital instrument now lives**
  (DR-01 relocated) — node labels follow the plan's supported concepts (Context, Stages, Tools, Handoffs, Checks).
- Phone: three stacked cards (icon ring, title, body, lime mono tag, circular arrow); harness visual opens from card 02.

### SC-05 Person + this market — MOCK-D5 (desktop), MOCK-M1 col 2 bottom (phone)
- Desktop: big 4-line headline left over a **full-bleed night city photo with a person on a balcony** (character =
  placeholder, §4); quote block top-right + vertical word stack; 4-card credibility strip (icon ring + title +
  line); split band: portrait panel with quote (left), "Rooted in Cambodia" copy + chips (centre), framed city photo
  card (right); **"A clearer tomorrow" band with Earth at night and Cambodia highlighted** + side list card.
- Phone: headline, body, lime + ghost buttons, image card with figure + quote, 4 icon rows.

### SC-06 Approach + readings — MOCK-D3 (desktop), MOCK-M1 col 3 top (phone)
- Desktop: headline + lead + buttons left, Earth sunrise right + quote; **luminous wavy path with 4 glowing node
  icons** and step copy under each; "Four perspectives" band: **four tall image cards** (number, mono title,
  arrow button, cinematic image, title, body, chips); full-width quote band with 3 icon points.
- Phone: headline + lead, **4 numbered rows with + toggles** (the path as an accordion). Reading cards follow the plan (inline).

### SC-07 / SC-08 / SC-09 — MOCK-D4 (desktop), MOCK-M1 col 3 (phone)
- Engagement: headline left, galaxy sky, quote right; **four neon step cards with icons and arrows between**,
  mono closer line in each card. Phone: numbered rows with icon + arrow.
- Questions: headline + side text + "View all questions" ghost button; **two columns of numbered pill rows with +**.
- Final: "Start with a conversation" over **Earth + mountain sunrise horizon** with a standing figure (placeholder),
  lime + ghost buttons, 3 icon points; footer band with logo, quote, links, mono tagline.
  Phone: horizon image, contact card with lime button and a **channel icon row** (only when destinations exist).

## 4 · What we take from the mockups — and what we don't

**Take:** composition, scale, spacing, surfaces, icon usage, art direction, band structure, mobile flow, slot
inventory (quotes, taglines, chips, stat strips, image tiles).

**Don't take (framing rules win; the slot stays, the words change in the copy pass):**
- "we"/agency voice → "I". "Book a Conversation"/"Book" → free-conversation wording, no booking UI.
- Chips/services outside scope (Product strategy, Go-to-market, Data & security, Scalability, Tools & platforms…).
- Invented client quotes that read as testimonials (the walls' "It feels powerful…" lines) → brand/owner voice only.
- "18+" → exactly "18 years" (Khmer market / Cambodia). No "Higher productivity"/outcome claims, no national-impact stats.
- The mockup navbar (EMERGENCY, UTC clock, new menu) — navbar is out of scope.
- Signature scribble — never.
- Engagement shown as 3 steps on phone → keep the canonical 4 (Discuss → Propose → Agree → Deliver).

**Copy update (owner, 2026-09-13):** the mockups are now the reference for copy too → `COPY_CANON.md` holds the adapted strings per scene and replaces the placeholder approach below.

**Placeholder copy (superseded by COPY_CANON):** mockup taglines and quote lines that don't break the rules above may be used on the work
branch as placeholders, but only via `src/components/consultation/copySlots.js`, each entry marked
`placeholder: true` with its source mockup id — so the copy pass replaces them in one file.

**Characters (owner):** the figures are intended to be replaced later (possibly by the owner). Until then:
from-behind or silhouette figures only, never a face presented as the owner, never labelled with a name; each
figure is a **separate transparent layer** so a real photo can replace it without regenerating the scene.
Face portraits (MOCK-D5 portrait panel) wait for an owner photo; the slot collapses gracefully until then.
Cambodia highlight and any named city must be real (sourced outline / owner or licensed photo).

## 5 · Open owner decisions raised by canon
1. **Serif body/quote font** — OK to self-host an open-licence serif (e.g. Newsreader, OFL) as woff2 in `public/fonts/`? No npm dep.
2. **Phnom Penh night photos** for SC-05 (still required; generated cities can't be labelled Phnom Penh).
