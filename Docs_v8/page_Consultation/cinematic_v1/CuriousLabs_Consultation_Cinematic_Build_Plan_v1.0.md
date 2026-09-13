# CuriousLabs Consultation Cinematic Build Plan v1.0

Document sections:
1. Cinematic consultation Desktop + mobile build plan
2. How to use this plan
3. The complete page map
4. Desktop and phone are two designs
5. SC-01 · Earth hero
6. SC-02 · Two audience doors
7. SC-03 · The three walls
8. SC-04 · What I actually do
9. SC-05 · The person and this market
10. SC-06 · Approach and deeper readings
11. R1–R4 · What happens after a tap
12. SC-07 · From conversation to agreed work
13. SC-08 · Questions before the conversation
14. SC-09 · Final horizon and contact
15. Shared spaces and the homepage seam
16. Artwork: separate the picture from the page
17. Artwork register · core scenes
18. Artwork register · reuse, readings and held items
19. Coded visual artifacts
20. Interaction contracts · entry and depth
21. Interaction contracts · navigation and completion
22. Copy gates before visual sign-off
23. Build work · foundation and first scenes
24. Build work · completion and release review
25. Acceptance checks · content and layout
26. Acceptance checks · behavior and delivery
27. Decisions, progress and next handoff
28. Source and reference register
29. The six visual references


## Cinematic consultation
Desktop + mobile build plan


# CuriousLabs consultation — cinematic build plan v1.0

Date: 2026-09-13. Repository: TomaDev23/curious-labs-production; pinned main a49e6324c385bad24cf64d5314db241a67c6621e. Route: /ai-consultation. No repository changes, git commands, server startup or browser QA were performed in this planning task.


9 scenes; 68 spaces; 10 artwork entries (including held/optional entries); 9 coded visuals; 11 interactions; 18 work packages; 35 checks. Companion workbook holds live status after handoff; this document and its Markdown mirror hold the design contract. Neither replaces _FRAMING_LOCKED.md or COPY_DECK_v2.md.



## How to use this plan


## Control
Authority: SRC-01 intent > approved SRC-02 wording; SRC-03 raw detail; REF images govern only visual composition. The latest dramatic preference supersedes only the earlier quiet visual direction, not content, identity, contact or accessibility gates.


A source read through GitHub confirmed the same main SHA. This task did not execute the local site. The 14,500px/17-screen measurement is attributed to the pasted agent report, not re-verified. Image approval ≠ copy approval ≠ tested implementation.



## The complete page map


| Scene | Chapter | Legacy | Anchor | Reference |
| --- | --- | --- | --- | --- |

| SC-01 Earth hero | Opening | D1 | #overview | REF-00 |

| SC-02 Two audience doors | Scroll 1 · entry | D2 · first half | #audiences | REF-01 |

| SC-03 The three walls | Scroll 1 · difficulty | D2 · second half | #audiences (subregion) | REF-01 |

| SC-04 What I actually do | Scroll 2 | D3 | #contribution | REF-02 |

| SC-05 The person and this market | Scroll 3 | D4 | #person | REF-03 |

| SC-06 Approach and deeper readings | Scroll 4 | D5 + R1–R4 | #approach | REF-04 |

| SC-07 From conversation to agreed work | Scroll 5 · process | D7 | #engagement | REF-05 |

| SC-08 Questions before the conversation | Scroll 5 · reassurance | D9 | #questions | REF-05 |

| SC-09 Final horizon and contact | Scroll 5 · close | D8 + footer | #contact | REF-05 |

Shared shell SC-00 remains. Evidence D6 omitted. Homepage SC-10 deferred. Scene title/ID is a planning handle, not a proposed new public title.



## Desktop and phone are two designs


## Responsive proposals
1440×900 primary desktop; 390×844 primary phone; also 320×568, 768×1024, 1024×768, optionally 1920×1080. Max content width 1320px. Phone padding 20–24px (16px narrow fallback), body 16–18px, control target 44×44px. Proposed closed-page budget 6,500–8,500px at 390×844. All are targets, not measured results. Content is never clipped to meet them.



## SC-01 · Earth hero


**Purpose:** Introduce the business advisor, the offer and the free first conversation. AI is a serious focus within the offer, not the consultant’s whole identity.

**Signature:** An oversized Earth-at-night horizon spills beyond the right edge. Copy occupies dark open sky; it is not enclosed in another glass card.

**Desktop:** 12-column content grid, maximum 1320px. Copy spans columns 1–6; globe occupies 6–12 behind a left-to-right dark scrim. Keep title, lead, invitation and actions visible from first render. A low metadata strip closes the scene.

**Phone:** One copy column. Use a separately approved crop: planet lower/right, dark upper half. Copy and actions come before optional art extent and metadata. Allow height to grow; never crop text to fit one screen.

**Height targets:** At 1440×900: 640–820px. At 390×844: 600–780px. Targets only; no fixed-height text containers.


**Source:** SRC-02 §1; SRC-01 §§1–6. Headline retained; lead still needs the planned copy pass.

**Implementation seam:** Existing D1 in ConsultationContent.jsx; proposed HeroScene.jsx; review hero uses of ConsultationMotion.jsx.


| Space | Layer | Desktop | Phone | Art | Interaction | Copy source |
| --- | --- | --- | --- | --- | --- | --- |

| SP-01-01 Eyebrow + headline | HTML | Top-left; one h1. 6 columns. | Full width; natural line breaks. |  | INT-01 | SRC-02 §1 |

| SP-01-02 Advisor lead + invitation | HTML | Under heading; 45–65-word lead allowance. | Short visible lead; aim 5–7 lines at 390px, expand if approved meaning needs it. |  | INT-01 | SRC-01 §§1–6; SRC-02 §1 |

| SP-01-03 Primary + secondary actions | Control | Inline: free conversation → #contact; approach → #approach. | Full-width actions, minimum 44px hit area. |  | INT-09 | SRC-02 §1 |

| SP-01-04 Earth atmosphere + protective scrim | Image + CSS | Right/bottom, about half the scene. | Distinct mobile crop below/behind copy; no text in image. | ART-01 | INT-11 | Visual only |

| SP-01-05 Personal delivery / place / spoken languages | HTML | Low horizontal strip. | Wrapping compact lines, never tiny compressed chips. |  |  | SRC-02 §1; SRC-03 Q11–12 |

| SP-01-06 Decorative quote / orbital labels | Reserved | Omit until exact words are approved. | Omit; do not spend a phone screen on a slogan. |  |  | DEC-01 |

| SP-01-07 Transition + section navigation | Control | Quiet inline anchors after hero; globe fades into next scene. | Wrapping anchors; no second fixed bar covering content. |  | INT-09 | Existing anchors |

**Acceptance:** Full headline, lead and primary action are visible without scrolling to trigger animation. Planet crop leaves a quiet text area on both widths. No obsolete AI INTEGRATION wording survives in visible labels, page title or footer.

**Held / corrected:** No booking calendar, fake contact action, 18+ metric or portrait. Orbital slogan options remain unapproved; the globe can carry the mood without words.



## SC-02 · Two audience doors


**Purpose:** Let two co-equal company types recognize themselves in the same business-consultation offer.

**Signature:** Two architectural doorways, cyan and warm-violet, with real text beside or across their dark panels. Different views; equal status.

**Desktop:** Equal 6/6 columns and matched card depth. Each door visual uses the outer third of its card; text uses the inner two-thirds. A single introduction spans the top. Read-more controls do something real; decoration is not a second offer.

**Phone:** Native horizontal two-item list, about 88% card width with the next edge showing. Both audience names remain visible in a compact index above it. Previous/next controls supplement swipe. At 320px or enlarged text, permit a stacked fallback.

**Height targets:** Desktop: 620–820px. Phone: 600–780px for the visible track. Both cards remain reachable.


**Source:** SRC-01 §3; SRC-02 §2. Replace beginner-stage framing with technical / non-technical company framing after approval.

**Implementation seam:** Existing D2 audience articles; proposed AudienceScene.jsx and DoorVisual.jsx.


| Space | Layer | Desktop | Phone | Art | Interaction | Copy source |
| --- | --- | --- | --- | --- | --- | --- |

| SP-02-01 Section heading + shared invitation | HTML | Full-width top band. | Before audience-name index. |  |  | SRC-02 §2; copy pass |

| SP-02-02 Technical-company copy | HTML | Left inner two-thirds. | First track item; essential meaning visible, not hidden on a flip side. |  | INT-02 | SRC-01 §3 |

| SP-02-03 Technical doorway / cyan vista | Image + DOM | Outer right third of first door panel. | Shallower crop on right or top, text remains dominant. | ART-02 | INT-02 | Visual only |

| SP-02-04 Non-technical-company copy | HTML | Right card inner two-thirds. | Second track item; not labeled as beginner-only. |  | INT-02 | SRC-01 §3 |

| SP-02-05 Business doorway / warm vista | Image + DOM | Outer right third of second panel. | Match technical card’s crop depth and status. | ART-03 | INT-02 | Visual only |

| SP-02-06 Detail links + track navigation | Control | Optional “Discuss your situation” anchors; no booking UI. | Names + count + previous/next; all links must resolve. |  | INT-02; INT-09 | SRC-02 §2; interaction proposal |

| SP-02-07 Ground plane + seam into walls | CSS | A shared perspective floor, then landscape transition. | Short seam; no empty spacer screen. |  | INT-11 | Visual only |

**Acceptance:** Technical companies means teams already shipping products, not anyone who uses computers. A non-technical business already using AI still recognizes itself. Both doors have equal visual weight and can be reached without dragging.

**Held / corrected:** Do not import Product strategy, Go-to-market, deployment promises, “You know AI,” or “We will help” from generated images. No speculative client history.



## SC-03 · The three walls


**Purpose:** Make trust, growing complexity and reliable execution recognizable without changing the offer into a reliability course.

**Signature:** Three rock-like monolith fronts rise from a cinematic terrain. Thin light traces link them. No fake statistics or performance bars.

**Desktop:** Heading on open sky; three 4-column monolith panels across the lower stage. Use real HTML over calm, dark surfaces; keep landscape behind, not inside every paragraph.

**Phone:** Compact heading followed by one user-swiped wall at a time. Keep all three labels in the track index. A tap reveals the response below the question. Stacked fallback at small widths or when text is enlarged.

**Height targets:** Desktop: 520–720px. Phone: 500–680px closed. Expanded responses add real document height.


**Source:** SRC-02 §2; SRC-03 Q1. Labels: Trust / Complexity / Reliability. Larger-scope work belongs in the explanation; do not silently rename the third topic.

**Implementation seam:** Existing StatTrio in ConsultationGraphs.jsx; proposed WallsScene.jsx. Preserve D2 relationship; subanchor #problems is optional, additive.


| Space | Layer | Desktop | Phone | Art | Interaction | Copy source |
| --- | --- | --- | --- | --- | --- | --- |

| SP-03-01 Three-problem introduction | HTML | Across sky above monoliths. | Visible before the track. |  |  | SRC-02 §2 |

| SP-03-02 Trust monolith + response | HTML + DOM | One of three equal panels; no drawn text. | One track item; response opens by explicit button. |  | INT-03 | SRC-03 Q1; SRC-02 §2 |

| SP-03-03 Complexity monolith + response | HTML + DOM | One of three equal panels; no drawn text. | One track item; response opens by explicit button. |  | INT-03 | SRC-03 Q1; SRC-02 §2 |

| SP-03-04 Reliability monolith + response | HTML + DOM | One of three equal panels; no drawn text. | One track item; response opens by explicit button. |  | INT-03 | SRC-03 Q1; SRC-02 §2 |

| SP-03-05 Terrain and luminous path | Image + SVG | Full-bleed lower stage behind the walls. | Portrait crop; keep foreground shallow. | ART-04 | INT-11 | Visual only |

| SP-03-06 Response controls / track index | Control | Explicit open/close, not hover-only flip. | Previous/next plus three topic names. |  | INT-03 | Interaction proposal |

| SP-03-07 Bridge into the consultation | HTML | One short sentence under stage. | One line or short paragraph; no additional large card. |  |  | SRC-02 §2; copy pass |

**Acceptance:** Front faces explain all three problems without needing a hover. Responses are not hidden exclusively on an inaccessible back face. “Every time” and any invented failure rates are absent.

**Held / corrected:** Latest picture says “stuck in small steps”; source deck says Reliability. Resolve in the copy pass, not by copying the image. Foreground explorer is unnecessary and should be omitted.



## SC-04 · What I actually do


**Purpose:** Explain the consulting act and the three areas it can draw on. The harness can be the visual center without becoming the page’s positioning.

**Signature:** Asymmetric triptych: 3 columns / 6 columns / 3 columns. A luminous harness diagram fills the center; side areas are editorial and lighter.

**Desktop:** Open headline and intro, then left opportunity area, central harness, right plan/train. A single tailoring/delivery band below spans all columns. Keep no more than one scope statement.

**Phone:** Three compact areas in source order. The harness diagram is readable at full content width; its deeper explanation belongs in R1. No pinned stack in the default phone version. Do not make three poster-height cards.

**Height targets:** Desktop: 780–1040px. Phone: 850–1100px closed. Fit to approved copy, not a rigid viewport.


**Source:** SRC-02 §3; SRC-01 §4; SRC-03 Q4/Q9/Q10. Three areas, not packages. Report + one-to-one sessions baseline, then tailored.

**Implementation seam:** Existing SUBJECTS and delivery band; proposed ContributionScene.jsx; reuse/rework HarnessGraph as HarnessSystem.jsx.


| Space | Layer | Desktop | Phone | Art | Interaction | Copy source |
| --- | --- | --- | --- | --- | --- | --- |

| SP-04-01 Consulting act: problem → clarity | HTML | Open full-width headline + concise intro. | First, before methods. |  |  | SRC-02 §3 |

| SP-04-02 Area 1: where AI is worth it | HTML | Left 3 columns; compact copy. | First compact row. |  | INT-04 | SRC-01 §4 / T1 |

| SP-04-03 Area 2: harness and methods | HTML | Central 6-column heading + explanation. | Second row, stronger visual emphasis. |  | INT-04 | SRC-01 §4 / T2 |

| SP-04-04 Harness visual | SVG + DOM | Center, largest visual element. | Full content width; minimum readable labels. No rasterized labels. |  | INT-04 | Generic concepts from SRC-05; VIS-03 |

| SP-04-05 Area 3: plan and train | HTML | Right 3 columns. | Third compact row. |  | INT-04 | SRC-01 §4 / T3 |

| SP-04-06 Tailoring + delivery baseline | HTML | One full-width band below areas. | One compact explanation; expand formats only on request. |  |  | SRC-03 Q4/Q9/Q10 |

| SP-04-07 Scope statement + discussion link | HTML + control | Single low-emphasis line with valid #contact link. | After delivery band; no repeated exclusions. |  | INT-09 | SRC-03 Q4/Q7 |

| SP-04-08 Optional outcomes / decorative quote band | Reserved | Omit unless separately approved and supported. | Omit; do not add another screen of vague claims. |  |  | DEC-01 |

**Acceptance:** All three area titles remain real text and visible in the primary path. The diagram labels use supported generic concepts, not invented named-method definitions. Visual emphasis on the harness does not replace the business-consulting introduction.

**Held / corrected:** No guaranteed outcomes strip, implementation/deployment menu, “measurement” score, governance certification or new product-development promise. Optional sticky emphasis is a separately tested experiment.



## SC-05 · The person and this market


**Purpose:** Connect business judgment, local knowledge and current AI practice as one personal package. Communicate direct delivery and spoken Khmer honestly.

**Signature:** Editorial change of pace: city lights, warm amber and a wide narrative column. Not a row of AI feature cards and not an invented biography portrait.

**Desktop:** Lead copy left (5 columns), approved city visual right (7). A compact credibility band follows, then two narrative areas on market experience and language. Optional accurate regional inset is held, not required.

**Phone:** Lead and factual background first; then a shallow city crop; then compact credibility facts and language. Keep a route to R4. Do not preserve the mockup’s repeated portrait and map blocks just to fill space.

**Height targets:** Desktop: 760–1080px. Phone: 820–1080px closed. No multiple full-screen portrait sequences.


**Source:** SRC-01 §5; SRC-03 Q8/Q11/Q12. Eighteen years means residence/Khmer-market experience, not eighteen years of AI or a verified consultancy tenure.

**Implementation seam:** Existing person block and #experience link; proposed PersonScene.jsx.


| Space | Layer | Desktop | Phone | Art | Interaction | Copy source |
| --- | --- | --- | --- | --- | --- | --- |

| SP-05-01 Business-first introduction | HTML | Left 5 columns. | Top, before city art. |  |  | SRC-01 §5 |

| SP-05-02 Approved city / future portrait space | Image | Right 7 columns; person-free city by default. | Shallow crop after introduction. | ART-05 | INT-11 | SRC-03 Q8; identity held |

| SP-05-03 18 years / sectors / current AI facts | HTML | A compact 3–4-part strip, not oversized stats. | Two short columns or stacked facts; keep “18 years” exact. |  |  | SRC-01 §5 |

| SP-05-04 Market and operating experience | HTML | One editorial paragraph; hotels, restaurants, F&B, real estate. | Before AI-practice detail. |  |  | SRC-01 §5; SRC-03 Q8 |

| SP-05-05 Personal delivery + spoken Khmer | HTML | Paired with market paragraph; explain reasoning directly. | Full width; recipients include whoever needs the help. |  |  | SRC-03 Q4/Q11/Q14 |

| SP-05-06 More about my experience | Control | Link opens R4 and lands at it. | Same behavior; visible focus on return. |  | INT-06; INT-09 | SRC-02 §4; SRC-08 |

| SP-05-07 Regional map / Cambodia-from-space inset | Reserved | Optional accurate map only; otherwise collapse space. | Omit by default; region/travel stays text. | ART-10 |  | DEC-06 |

**Acceptance:** No fabricated face, silhouette, signature or public name stands in for the owner. Any image labeled Phnom Penh is verified and its usage rights recorded. Khmer refers to spoken explanation/training; written bilingual deliverables are not implied.

**Held / corrected:** Generated people in REF-03 are not approved assets. Replace with a verified person-free city scene until a real portrait is supplied. Remove unsupported factory-operating credentials and national-impact promises.



## SC-06 · Approach and deeper readings


**Purpose:** Explain the operator perspective as supporting craft, then reward curiosity with four genuinely different deeper readings.

**Signature:** A drawing path through open space, followed by four illustrated reading entries. A cinematic transition, not a second services grid.

**Desktop:** Opening statement and operator contrast above a luminous path. Four equal reading summaries across; expanded material stays in the document flow beneath its associated summary. Preserve reading identity and return path.

**Phone:** Short introduction, then a compact vertical/diagonal SVG rather than a tiny wide diagram. Reading summaries use two columns at 390px if readable and one column at 320px. Inline expansion is the default; a modal bottom sheet is not yet approved.

**Height targets:** Desktop: 760–1020px closed. Phone: 780–1040px closed. Reading panels expand naturally; closed-page target excludes their length.


**Source:** SRC-02 §5; SRC-03 Q2–Q3/Q16. R1 method, R2 concept, R3 technology, R4 experience; no invented Maestro/Orchestrator/LEGIT detail.

**Implementation seam:** Existing OperatorView, READINGS, native details and useConsultationPage.js; proposed ApproachScene.jsx + ReadingCard.jsx.


| Space | Layer | Desktop | Phone | Art | Interaction | Copy source |
| --- | --- | --- | --- | --- | --- | --- |

| SP-06-01 Approach headline + operator perspective | HTML | Open intro, not a full hero repetition. | Brief first block. |  |  | SRC-02 §5 |

| SP-06-02 Directed work / checking path | SVG + HTML | Wide luminous path with meaningful labels. | Compact vertical arrangement; no scaled-down illegible labels. |  | INT-05 | SRC-05 OperatorView; VIS-04 |

| SP-06-03 Method reading: summary + full panel | HTML + image | One illustrated entry; panel opens in flow. | 2 columns if readable; 1 at 320px; panel full content width. | ART-07 | INT-06; INT-09 | SRC-02 §5 / R1; SRC-03 Q16 |

| SP-06-04 Concept reading: summary + full panel | HTML + image | One illustrated entry; panel opens in flow. | 2 columns if readable; 1 at 320px; panel full content width. | ART-06 | INT-06; INT-09 | SRC-02 §5 / R2; SRC-03 Q16 |

| SP-06-05 Technology reading: summary + full panel | HTML + image | One illustrated entry; panel opens in flow. | 2 columns if readable; 1 at 320px; panel full content width. | ART-08 | INT-06; INT-09 | SRC-02 §5 / R3; SRC-03 Q16 |

| SP-06-06 Experience reading: summary + full panel | HTML + image | One illustrated entry; panel opens in flow. | 2 columns if readable; 1 at 320px; panel full content width. | ART-05 | INT-06; INT-09 | SRC-02 §5 / R4; SRC-03 Q16 |

| SP-06-07 Close controls + in-page return behavior | Control | Within each open topic. | Close never loses place or hides behind mobile browser UI. |  | INT-06 | SRC-08 |

| SP-06-08 Approach horizon / chapter seam | Image + CSS | Shallow art behind the introduction and transition. | Share/crop existing art; no duplicate tall mood block. | ART-06 | INT-11 | Visual only |

**Acceptance:** Closed summaries already explain what each topic offers. Each opened topic adds information rather than repeating the operator sentence. All four hashes open their topic; close returns focus; multiple topics can remain open.

**Held / corrected:** The mockup’s generic four-step service journey is a composition reference, not a replacement for the operator-view content. Bottom sheets or single-open behavior need an explicit behavior change decision.



## R1–R4 · What happens after a tap


| Reading | Question | Additional content | Asset |
| --- | --- | --- | --- |

| R1 / #method | What surrounds the prompt? | Context, stages, tools, handoffs and checks. Show how work is directed and reviewed. Use VIS-03 if it adds explanation rather than duplicating the contribution graphic. | ART-07 / VIS-03 |

| R2 / #concept | What changes at a larger scope? | Contrast isolated requests with directing a whole undertaking. Explain relationships and decisions at a higher level. Not a bigger-prompt tutorial. | ART-06 / VIS-04 |

| R3 / #technology | Where does trust need checking? | Describe useful capabilities and limitations in plain language. No ranking list, performance score or guarantee. Use a qualitative visual. | ART-08 / VIS-05 |

| R4 / #experience | How do both sides connect? | Make the business-to-AI connection more specific than the biography summary, using only supplied facts. Do not invent a project result to add depth. | ART-05 / optional owner detail |

States: closed, open, cold link, close/focus return, reduced motion. Independent inline reading is default. Bottom sheet behavior requires DEC-03 and explicit modal accessibility/history work. New markup must not silently break SRC-08.



## SC-07 · From conversation to agreed work


**Purpose:** Explain the real sequence and the distinction between the free discussion, proposal and paid deliverable.

**Signature:** Four milestones on a luminous rail, with restrained document cues. Clear sequence rather than another feature grid.

**Desktop:** Horizontal rail: Discuss → Propose → Agree → Deliver. Each milestone has one short paragraph. Meeting summary belongs before proposal; report belongs to delivery.

**Phone:** A compact four-step list is visible to everyone. Richer step panels can use a native horizontal swipe track with previous/next buttons. Never require swiping to discover that agreement precedes work.

**Height targets:** Desktop: 420–560px. Phone: 430–590px closed. No pinned horizontal scrolling.


**Source:** SRC-02 §6; SRC-03 Q5/Q13. Free conversation → summary → scoped quote → confirmation/contract/payment → preparation/report/sessions/agreed support.

**Implementation seam:** Existing FlowGraph; proposed EngagementScene.jsx and EngagementRail.jsx.


| Space | Layer | Desktop | Phone | Art | Interaction | Copy source |
| --- | --- | --- | --- | --- | --- | --- |

| SP-07-01 Engagement introduction | HTML | Above rail, brief. | Before compact step list. |  |  | SRC-02 §6 |

| SP-07-02 Discuss: free conversation | HTML | One rail milestone. | Listed name + reachable detailed panel. |  | INT-07 | SRC-03 Q5/Q13 |

| SP-07-03 Propose: summary then scoped quote | HTML | One rail milestone. | Listed name + reachable detailed panel. |  | INT-07 | SRC-03 Q5/Q13 |

| SP-07-04 Agree: contract and payment arrangements | HTML | One rail milestone. | Listed name + reachable detailed panel. |  | INT-07 | SRC-03 Q5/Q13 |

| SP-07-05 Deliver: prepare materials, report and sessions | HTML | One rail milestone. | Listed name + reachable detailed panel. |  | INT-07 | SRC-03 Q5/Q13 |

| SP-07-06 Luminous rail + document cues | SVG + HTML | Connects all four milestones. | Vertical/compact rail; rich panels optional swipe. |  | INT-07 | VIS-06 |

| SP-07-07 Free / separately agreed boundary | HTML | Single sentence below rail. | Single compact statement, not another card stack. |  |  | SRC-03 Q5/Q13 |

**Acceptance:** The Agree milestone exists before preparation and delivery. No invented fee, service duration or deposit percentage is shown. Summary, proposal/quote and paid report are not presented as the same document.

**Held / corrected:** Do not copy the latest image’s “Agreed work → Support & delivery” simplification over the canonical process. “A few days” remains a soft intention, not a service deadline.



## SC-08 · Questions before the conversation


**Purpose:** Answer remaining practical concerns without repeating the whole page.

**Signature:** A quiet editorial pause between dramatic landscape scenes. Thin rules, clear questions, no decorative gauges.

**Desktop:** Grouped question summaries in two columns only when the reading order stays clear. Short answers open underneath. A real “all questions” control exposes the remaining set in the same page.

**Phone:** One column. Show a proposed first set of six high-value question titles; reveal the remaining questions with a labeled button. Each answer is an independent details element.

**Height targets:** Desktop: 380–560px closed. Phone: 430–650px with the first six questions closed. Expanded content grows naturally.


**Source:** SRC-02 §7 plus all current QUESTION_GROUPS in SRC-04. Exact visible six and final answers require editorial approval; do not silently delete the rest.

**Implementation seam:** Existing QUESTION_GROUPS and details; proposed QuestionsScene.jsx.


| Space | Layer | Desktop | Phone | Art | Interaction | Copy source |
| --- | --- | --- | --- | --- | --- | --- |

| SP-08-01 FAQ heading + short context | HTML | Editorial heading left, optional supporting sentence right. | Full width; no multi-line marketing preamble. |  |  | SRC-02 §7 |

| SP-08-02 Priority question summaries + answers | HTML + control | Grouped into logical columns. | First six titles proposed; independent expand/collapse. |  | INT-08 | SRC-04 QUESTION_GROUPS; copy pass |

| SP-08-03 Remaining questions + reveal control | HTML + control | After initial groups, preserve all remaining entries. | “View all questions” exposes remaining items in place. |  | INT-08 | SRC-04 QUESTION_GROUPS |

| SP-08-04 Bridge to contact | HTML + control | One quiet #contact link. | No duplicate multi-step explanation. |  | INT-09 | SRC-02 §7–8 |

**Acceptance:** Every existing question is accounted for, retained or explicitly merged in the copy deck. Industry history and business-first hierarchy are corrected. “View all” is a real control and not a link to an invented resource page.

**Held / corrected:** The eight generated mockup questions are not an approved FAQ replacement. Do not publish guaranteed results timelines or a made-up minimum engagement.



## SC-09 · Final horizon and contact


**Purpose:** End with an invitation into a real business conversation. Keep geography, spoken language and the pending-contact state honest.

**Signature:** Earth horizon echoes the opening. Copy sits on dark sky; contact controls sit on solid surfaces only when destinations exist.

**Desktop:** Copy on left, horizon low/right. In ready state, show actual messaging/email options with QR as secondary. In pending state, collapse the empty controls area into one clear, noninteractive status note.

**Phone:** Invitation and contact status first; then shallow horizon. In ready state, direct links precede QR. Never show a “Book” button without a booking service; no overlapping sticky action bar.

**Height targets:** Desktop: 450–650px. Phone: 500–700px including a compact footer. Pending state may be shorter.


**Source:** SRC-02 §8; SRC-03 Q5/Q11/Q12/Q15. Phnom Penh/vicinity or online; regional travel by arrangement; destinations remain pending.

**Implementation seam:** Existing D8 and shell footer; proposed ContactScene.jsx. Keep metadata cleanup in src/pages/ai-consultation.jsx.


| Space | Layer | Desktop | Phone | Art | Interaction | Copy source |
| --- | --- | --- | --- | --- | --- | --- |

| SP-09-01 Final invitation + free boundary | HTML | Left half over dark sky. | First block; free versus separately agreed work stays clear. |  |  | SRC-02 §8 |

| SP-09-02 Earth-horizon return | Image + CSS | Low/right, paired with opening art. | Shallow derivative crop, not a new full-screen poster. | ART-01 | INT-11 | Visual only |

| SP-09-03 Pending contact state | HTML | One visible status note; no inert buttons. | Full width; collapse blank card spaces. |  | INT-10 | SRC-03 Q15 |

| SP-09-04 Ready contact controls + QR | Control | Approved Telegram / WhatsApp / email destinations only; QR secondary. | Direct taps first, QR secondary; Facebook only when supplied. |  | INT-10 | SRC-03 Q15 |

| SP-09-05 Availability + spoken language | HTML | Below invitation. | Wrapping plain text, never clipped chips. |  |  | SRC-03 Q11–12 |

| SP-09-06 Site footer / Home link | HTML + control | Existing shell footer, revised copy only. | Compact vertical stack. |  | INT-09 | SRC-07; copy pass |

**Acceptance:** Pending and ready states are tested separately; no dead icons or QR codes. Email copy/composer does not claim a message was sent or a meeting booked. Shared footer/nav match the site; no invented resources, signature or social accounts.

**Held / corrected:** No LinkedIn, calendar or destination copied from another page without approval. Contact is a launch blocker, not a reason to fabricate controls.



## Shared spaces and the homepage seam


| Space | Desktop | Phone |
| --- | --- | --- |

| SP-00-01 Existing navigation and skip link | Reuse MissionControlNavbar; do not copy mockup menu. | Existing mobile nav; skip link remains reachable. |

| SP-00-02 Shared cosmic background / section seams | One shared background, local overlays. | No new canvas or duplicate starfield. |

| SP-00-03 Global type / spacing / focus rules | Scoped .cl-consultation styles only. | 320px and text-resize fallback, visible focus. |

| SP-00-04 Page title / description / social metadata | Business-first approved wording; preserve noindex hold. | Same metadata; no duplicated implementation. |

| SP-00-05 Route and anchor integration | Preserve /ai-consultation and all canonical hashes. | Test cold deep links and browser Back. |

| SP-10-01 Homepage invitation panel | After existing moon-led opening, immediately before MoonSignalShowcase, per earlier seam; recheck before use. | Copy/action first; compact reused Earth crop. |

| SP-10-02 Homepage route links + regression | /ai-consultation and /ai-consultation#contact only; no product section replacement. | Existing home page still works and reads in order. |

New component names are proposals. Existing route, IDs, navbar, shared background and page-scoped styles are preserved. Homepage action is deferred, not automatically authorized by this document.



## Artwork: separate the picture from the page


## Artwork pipeline
Brief → text-free master/source → separately approved desktop + mobile crops → optimized exports → live HTML/DOM integration → scene evidence. Proposed budgets: hero ≤350KB mobile / ≤600KB desktop; secondary image ≤200KB / ≤350KB; first viewport images ~600KB; mobile art total ~2.5MB. These are planning targets, not measured performance. No production art generated in this task.



## Artwork register · core scenes


### ART-01 — Earth-at-night / Asia horizon
Type: Raster master + derivatives; Core; Not started. Scenes: SC-01; SC-09; SC-10. Reference: REF-00; REF-05

Desktop: 2560×1440 starting master; web candidate 1920/2560 widths.

Phone: Separate 1080×1440 portrait crop; export 640/960 widths.

Text-safe: Dark left 50–55% on desktop; upper 55% on phone. Bright rim lower/right.

Production: Generate text-free mood art; no labels, borders, buttons, people or UI. Reuse as hero and final horizon; one source, separate crops.


### ART-02 — Technical doorway vista
Type: Raster insert; Core; Not started. Scenes: SC-02. Reference: REF-01

Desktop: 1000×1400 portrait source; crop into the outer third of door card.

Phone: 640×900 derivative; frame built as DOM, not baked typography.

Text-safe: Dark frame edge adjoining copy.

Production: Blue/cyan imagined city/space view; not a real office or client site. Door frame, glow and opening movement live in VIS-01.


### ART-03 — Business doorway vista
Type: Raster insert; Core; Not started. Scenes: SC-02. Reference: REF-01

Desktop: 1000×1400 portrait source paired with ART-02.

Phone: 640×900 derivative, equal prominence.

Text-safe: Copy-side edge remains dark.

Production: Warm/violet imagined business-city horizon, no factual location label. No people or company logos.


### ART-04 — Three-walls terrain
Type: Raster landscape; Core; Not started. Scenes: SC-03. Reference: REF-01

Desktop: 2560×1200 landscape; clear midground for three DOM monoliths.

Phone: 1080×1440 alternative crop without tall empty foreground.

Text-safe: Text is on opaque monolith faces, not rock texture.

Production: Text-free rock terrain, small luminous path, no figures. The three walls remain real DOM/SVG shapes.


### ART-05 — Verified Phnom Penh at night
Type: Approved photo / licensed asset; Core; Not started. Scenes: SC-05; SC-06 R4. Reference: REF-03 composition only

Desktop: 2400×1600 source; subject matter and rights must be recorded.

Phone: 1080×1350 crop plus a short landscape phone cut.

Text-safe: Keep lights clear of any overlaid copy; use separate copy panel when necessary.

Production: Owner-supplied or licensed, verifiably Phnom Penh. No synthetic person pretending to be the consultant. Generated mood art must not be labeled documentary.



## Artwork register · reuse, readings and held items


### ART-06 — Dawn / Earth transition
Type: Optional raster reuse; Optional; Not started. Scenes: SC-06 R2; SC-09. Reference: REF-04; REF-05

Desktop: Prefer derivative of ART-01; new 2400×1200 master only if distinct scene is needed.

Phone: 1080×1200 derivative; cap decorative vertical space.

Text-safe: Dark text zone above/left; sun below the reading line.

Production: Shallow chapter transition, not another redundant hero. Reuse before commissioning a new master.


### ART-07 — Method reading / path through terrain
Type: Reading crop; Optional; Not started. Scenes: SC-06 R1. Reference: REF-04

Desktop: 1200×800 source or derivative of ART-04.

Phone: 640×640 crop for reading summary.

Text-safe: No text in raster.

Production: A path illustrates sequence only; it must not suggest a defined proprietary method.


### ART-08 — Technology reading / star field
Type: Texture or CSS replacement; Optional; Not started. Scenes: SC-06 R3. Reference: REF-04

Desktop: Reuse shared space treatment; optional 1200×800 raster.

Phone: 640×640 derivative if used.

Text-safe: No labels; actual technology explanation remains HTML.

Production: Prefer a small live SVG orbital from VIS-05 over another large raster.


### ART-09 — Real owner portrait
Type: Future owner-supplied photo; Deferred; Deferred. Scenes: SC-05. Reference: REF-03 is not likeness authority

Desktop: Only after owner supplies/approves the photo and public identity.

Phone: Art-directed crop approved separately.

Text-safe: No synthesized stand-in, including a biography silhouette.

Production: Reserved slot has a city-only fallback and collapses gracefully.


### ART-10 — Accurate regional map
Type: Future sourced SVG; Deferred; Deferred. Scenes: SC-05 optional inset. Reference: REF-03 composition only

Desktop: Approved, accurate geography and usage rights.

Phone: Omit by default.

Text-safe: Labels real HTML/SVG, verified boundaries.

Production: No generated national outline or unsubstantiated impact statistics.



## Coded visual artifacts


| ID | Visual | Scenes | Technology | Desktop | Phone/static | Interaction |
| --- | --- | --- | --- | --- | --- | --- |

| VIS-01 | Two doorway frames | SC-02 | DOM/CSS + ART-02/03 | Equal frames; simple 2D light/edge reveal; no WebGL door model. | Two names, reachable cards, same status on phone. | INT-02 |

| VIS-02 | Three monoliths | SC-03 | DOM/SVG + ART-04 | Three legible fronts; light traces are decorative, not metrics. | Essential problem copy always visible; response opens explicitly. | INT-03 |

| VIS-03 | Harness system | SC-04; SC-06 R1 | SVG/DOM | Use supported nodes: Context, Stages, Tools, Handoffs, Checks. Central work, no invented certifications or numerical reliability score. | Readable at 320px or replace radial layout with labeled vertical list. | INT-04 |

| VIS-04 | Operator work path | SC-06 | SVG + HTML | Isolated requests versus directed, checked work. Labels describe concepts, not named methods. | Vertical alternative; static final state with reduced motion. | INT-05 |

| VIS-05 | Technology / trust visual | SC-06 R3 | SVG + HTML | Qualitative explanation of trust and checking. No calibrated risk score or guarantee. | Readable paired statements rather than a tiny gauge. | INT-06 |

| VIS-06 | Engagement rail | SC-07 | SVG/CSS + ordered HTML list | Discuss, Propose, Agree, Deliver. Distinct summary, quote and report cues. | All step names visible; detail panels optional swipe. | INT-07 |

| VIS-07 | Four illustrated reading entries | SC-06 | HTML details + image crops | One entry per R1–R4; expanded material adds depth. Preserve hashes and independent opening. | Two columns only while readable; full-width expansion. | INT-06 |

| VIS-08 | Shared icons / UI marks | All | Existing ConsultationIcons | Reuse icon system, focus styles and directional arrows. No extra icon package. | Touch targets at least 44px by this plan’s acceptance target. | INT-09 |

| VIS-09 | Chapter transitions | All | CSS masks/gradients | Scene-edge seams, optional short light wipe; never wipe away required text. | Static or subtle, no scroll interception. | INT-11 |


## Interaction contracts · entry and depth


### INT-01 — Hero readiness
Desktop: Headline, intro, invitation and actions render fully visible. Decorative art may settle after them.

Phone: Same rule. No wait for scroll/IntersectionObserver.

Reduced: Static art. All content present.

Checks: Initial load, refresh, cold anchor return, reduced motion, slow asset load.


### INT-02 — Two-door exploration
Desktop: Subtle 2D light response on hover/focus; valid anchors or explicit detail controls only.

Phone: Native swipe/snap with named previous/next and visible two-name index; no vertical-scroll capture.

Reduced: No animated door motion; manual navigation remains.

Checks: Reach both doors by touch, mouse and keyboard; stacked 320px fallback.


### INT-03 — Wall response
Desktop: Explicit expand control reveals response. A visual flip may decorate the same state, not create duplicate accessible text.

Phone: Tap-to-expand; next/previous on track. No hover-only content.

Reduced: Immediate open/close; static monoliths.

Checks: Focus survives change; hidden face has no tab stops; all three topics reachable.


### INT-04 — Harness emphasis
Desktop: Draw connectors or highlight a node once. Optional short sticky contribution scene only after approval and fit checks.

Phone: No pinning. Diagram or readable list; explain selected node in HTML.

Reduced: Final static network/list.

Checks: Labels legible at 320px; effect paused offscreen; no invented method/metric.


### INT-05 — Operator path
Desktop: Short path draw as the art enters view; text is already readable.

Phone: Compact path, light progress only when appropriate.

Reduced: Whole path visible immediately.

Checks: No explanation depends on animation completion.


### INT-06 — Deeper reading
Desktop: Native inline details default. Open several topics; each full panel stays associated with its summary.

Phone: Inline drawer default. Bottom sheet is an unapproved alternative, not a second copy of the content.

Reduced: Instant open/close; same information.

Checks: Cold #method/#concept/#technology/#experience links, close-to-summary focus, keyboard and Back.



## Interaction contracts · navigation and completion


### INT-07 — Engagement sequence
Desktop: Horizontal visual rail, ordered HTML list. No auto-advancing stages.

Phone: Four names visible; optional manual detail track with next/previous.

Reduced: Static ordered list.

Checks: Agree precedes Deliver; sequence visible without swiping; keyboard works.


### INT-08 — Questions
Desktop: Independent details; actual reveal-more button for additional questions.

Phone: Single column; no compressed two-column answers.

Reduced: Instant state change.

Checks: Every question remains available; “View all” works; no fabricated external resource.


### INT-09 — Anchors / page movement
Desktop: Keep existing canonical hashes and navbar offset. User scrolling cancels corrective deep-link movement.

Phone: Same, including orientation/browser toolbar changes.

Reduced: No smooth travel.

Checks: Cold deep links, existing #experience CTA, focus, keyboard and browser Back.


### INT-10 — Contact pending → ready
Desktop: Pending = explanation only. Ready = approved destinations plus optional QR.

Phone: Direct links first; QR secondary. Copy confirmation is specific and honest.

Reduced: No change in functionality.

Checks: No # dead links, unsupplied handles, hidden-but-focusable controls or false “sent/booked” notices.


### INT-11 — Atmosphere / chapter motion
Desktop: Local small parallax and edge wipes, never scroll hijack or text concealment. No new dependencies/3D.

Phone: Lower amplitude or static; normal vertical reading.

Reduced: No parallax, pulsing, drawing, masks or sticky choreography.

Checks: Check route cleanup, offscreen pause, no ongoing flashes, stable content dimensions.



## Copy gates before visual sign-off


| Gate | Topic | Scenes | Resolution | Source |
| --- | --- | --- | --- | --- |

| CP-01 | Hero and audience entry | SC-01; SC-02 | Keep business-advisor-first and the junction. Both technical and non-technical companies are co-equal; not advanced vs beginner. | SRC-01 §§1–3; SRC-02 §§1–2 |

| CP-02 | First-person and scope | All | Replace fabricated agency “we”; consultation/planning/training is core. No automatic engineering, deployment, product strategy or go-to-market menu. | SRC-01 §§4/7/8; SRC-03 Q4/Q7 |

| CP-03 | Reliability and experience claims | SC-02; SC-03; SC-08 | Remove “every time,” unsupported factory operating history and implied prior AI engagements in every example industry. | SRC-03 Q1/Q8; earlier source-to-copy review |

| CP-04 | Person and local knowledge | SC-05 | Use 18 years exactly as residence/market experience, F&B and real estate, led hotels/restaurants, unnamed shareholding; no generated identity/signature. | SRC-01 §5/8 |

| CP-05 | Method names and reading depth | SC-04; SC-06 | Keep only supported generic concepts. R1–R4 have distinct jobs; do not define Maestro, Orchestrator, LEGIT or planning principles. | SRC-03 Q2–Q3/Q16 |

| CP-06 | Engagement steps | SC-07 | Discuss → Propose → Agree → Deliver. Separate summary, quote and paid report. No fixed financial/service promises. | SRC-02 §6; SRC-03 Q5/Q13 |

| CP-07 | Contact and language | SC-01; SC-09 | No Book calendar/LinkedIn or unsupplied channels. Spoken English/Khmer, not guaranteed bilingual written delivery. | SRC-03 Q11/Q12/Q15 |

| CP-08 | FAQ, titles and peripheral labels | SC-00; SC-08; SC-09 | Complete exact FAQ text in COPY_DECK_v2; bring metadata/footer/orbital labels into line. Preserve noindex until authorized. | SRC-02 §§7–8; SRC-07 |

| CP-09 | Artwork wording and proofs | All | Image slogans, “typical outcomes,” made-up quotes/logos and national-impact bands do not become approved copy. D6 remains omitted. | SRC-01 §8; latest visual references |


## Build work · foundation and first scenes


| Work | Owner role | Dependencies | Scope | Deliverable | Initial status |
| --- | --- | --- | --- | --- | --- |

| WP-01 Pin baseline and copy holds | Build agent + owner | — | Record branch SHA, route, files, existing screenshots/measurements. Do not assume the 14,500px report was independently reproduced. | Baseline record; no code change. | For review |

| WP-02 Approve copy by scene | Copy editor + owner | WP-01 | Resolve all CP items; keep COPY_DECK_v2 as source of truth. Geometry prototyping may proceed with labeled baseline copy. | Approved per-scene copy, including FAQ and metadata. | Not started |

| WP-03 Approve reference-to-space mapping | Owner + design agent | WP-01 | Review SC-01–09, mobile transformations and omission decisions. Confirm visual direction without adopting image text. | Scene cards and DEC choices approved. | For review |

| WP-04 Art batch A: Earth / doors / walls | Asset maker + owner | WP-03 | Prepare text-free ART-01–04 with separate desktop/mobile crops. | Approved masters, derivatives, rights/provenance records. | Not started |

| WP-05 Art batch B: city / reading accents | Asset maker + owner | WP-03 | Source verified ART-05; prefer reuse for ART-06–08. Keep portrait/map deferred. | Approved city and reading crops; no fictional identity. | Not started |

| WP-06 Static semantic scene skeleton | Build agent | WP-01; WP-03 | Refactor existing route in place; preserve D IDs/hashes, nav, footer, scope and native readings. | Every section visible without motion, desktop and phone. | Not started |

| WP-07 Hero: visible-first + globe | Build agent | WP-02 SC-01; WP-04; WP-06 | Install responsive art and scrim; remove content-gating reveal behavior only where needed. | SC-01 desktop + phone screenshots and first-load checks. | Not started |

| WP-08 Two doors + three walls pilot | Build agent | WP-02 SC-02/03; WP-04; WP-06 | Use these as the vertical slice for visual language and touch interactions. | SC-02/03 at 1440 and 390, all cards/expansions tested. | Not started |

| WP-09 Contribution and harness | Build agent | WP-02 SC-04; WP-06; WP-08 | Build asymmetric scene and lightweight VIS-03; no service-menu drift. | SC-04 default plus mobile and reduced-motion states. | Not started |


## Build work · completion and release review


| Work | Owner role | Dependencies | Scope | Deliverable | Initial status |
| --- | --- | --- | --- | --- | --- |

| WP-10 Person and local context | Build agent | WP-02 SC-05; WP-05; WP-06 | Editorial city scene; business background before AI detail; approved spoken-language wording. | SC-05 with city-only fallback and R4 link check. | Not started |

| WP-11 Approach and all four readings | Build agent | WP-02 SC-06; WP-05; WP-06 | Build VIS-04/05/07; preserve independent details and deep-link behavior. | R1–R4 closed/open/closed screenshots plus keyboard record. | Not started |

| WP-12 Engagement, questions and contact | Build agent | WP-02 SC-07/08/09; WP-06 | Canonical four steps; complete FAQ; honest contact pending state. | SC-07–09 verified with all primary in-page links. | Not started |

| WP-13 Responsive / state pass | Build agent + QA reviewer | WP-07…WP-12 | Check 320/390/768/1024/1440, text resize, no overflow, deep links and contacts. | Viewport/state acceptance record, not just hero captures. | Not started |

| WP-14 Motion and atmosphere pass | Build agent + QA reviewer | WP-13 | Add INT effects after static scenes pass; optional sticky trial only if DEC-02 approved. | Normal/reduced-motion parity; no hidden content. | Not started |

| WP-15 Asset / load / regression pass | Build agent + QA reviewer | WP-13; WP-14 | Optimize served derivatives, check no art-load shift and no global style or homepage regressions. | QA evidence at representative widths and load conditions. | Not started |

| WP-16 Real contact wiring | Owner + build agent | DEC-05; WP-12 | Only supplied destinations; test on desktop and phone. Facebook remains absent until supplied. | Ready contact state, QR validation if included. | Blocked |

| WP-17 Owner approval and release review | Owner + build agent | WP-02…WP-16 | Review copy, desktop, phone, reduced motion and QA evidence. Ask before any git/commit/push; no automatic publishing. | Explicit approval and release instruction. | Not started |

| WP-18 Homepage invitation later | Owner + build agent | WP-17; DEC-07 | Reuse approved Earth/copy in the agreed seam; do not replace the existing opening or MoonSignal. | Homepage + destination regression review. | Deferred |


## Acceptance checks · content and layout


| Check | Area | Pass condition | Scope | Priority | Initial status |
| --- | --- | --- | --- | --- | --- |

| QA-01 | Source / scope | Record baseline SHA and inspect current tree before future edits; do not overwrite unpublished local work. | All | Required | Not tested |

| QA-02 | Copy | Final scene wording matches approved COPY_DECK_v2 and locked hierarchy; CP-01–09 resolved. | All | Required | Not tested |

| QA-03 | Claims | No fabricated portraits, signatures, case studies, factory history, performance figures or guarantees. | SC-02/03/05/08 | Required | Not tested |

| QA-04 | Initial visibility | Hero headline, lead, invitation, actions and meta visible without scrolling. | SC-01 | Required | Not tested |

| QA-05 | Desktop visual | Capture every scene at 1440×900 and confirm composition, crop and distinct rhythm. | All | Required | Not tested |

| QA-06 | Phone visual | Capture every scene at 390×844; same information available, no tiny desktop diagrams. | All | Required | Not tested |

| QA-07 | Narrow phone | 320×568: no horizontal document overflow, all touch controls readable/reachable. | All | Required | Not tested |

| QA-08 | Tablet | 768×1024: intentionally stacked/two-column layouts, no half-desktop collisions. | All | Required | Not tested |

| QA-09 | Small desktop | 1024×768: no heading/diagram/card overlap; wide art still has text-safe zone. | All | Required | Not tested |

| QA-10 | Large desktop | 1920×1080: content stays bounded while art may bleed beyond it. | All | Recommended | Not tested |

| QA-11 | Text enlargement | At 200% zoom/enlarged text, no clipped labels or locked scene heights; overflow transforms to stacked layout. | All | Required | Not tested |

| QA-12 | Reading order | Keyboard and assistive order follow the narrative; only one h1, clear section landmarks. | All | Required | Not tested |

| QA-13 | Focus | Visible focus on every control; close returns focus; hidden details contain no reachable hidden controls. | All | Required | Not tested |

| QA-14 | Door track | Both audiences reachable by keyboard, touch and previous/next; vertical page scrolling never trapped. | SC-02 | Required | Not tested |

| QA-15 | Wall response | Each problem and response can be consumed without hover; no duplicate exposed front/back text. | SC-03 | Required | Not tested |

| QA-16 | Harness diagram | Nodes readable at 320px or replaced with equivalent labeled list; no false gauges. | SC-04 | Required | Not tested |

| QA-17 | All readings | Open/close R1–R4 individually and more than one at once; expanded panel adds distinct information. | SC-06 | Required | Not tested |

| QA-18 | Cold reading links | Direct load and refresh #method, #concept, #technology, #experience land/open correctly. | SC-06 | Required | Not tested |


## Acceptance checks · behavior and delivery


| Check | Area | Pass condition | Scope | Priority | Initial status |
| --- | --- | --- | --- | --- | --- |

| QA-19 | Section links | Direct load and click #overview/#audiences/#contribution/#person/#approach/#engagement/#questions/#contact. | All | Required | Not tested |

| QA-20 | Navigation history | Back/forward and close do not strand focus or fight user scroll; titles clear navbar. | All | Required | Not tested |

| QA-21 | Engagement order | Discuss/Propose/Agree/Deliver and three document types match Q13. | SC-07 | Required | Not tested |

| QA-22 | FAQ retention | Every baseline question is retained or explicitly approved as merged; reveal-all works. | SC-08 | Required | Not tested |

| QA-23 | Pending contacts | No dead icons, booking/calendar claims, QR placeholders or # links that pretend to contact. | SC-09 | Required | Not tested |

| QA-24 | Ready contacts | Approved email and messaging destinations work; copy feedback accurate; QR resolves to same destination. | SC-09 | Release gate | Not tested |

| QA-25 | Reduced motion | Full information, static final art, no parallax/path drawing/sticky sequence required. | All | Required | Not tested |

| QA-26 | Art failure | Disable or fail a background request; content, layout, controls and contrast remain usable. | All | Required | Not tested |

| QA-27 | Image provenance | Record approved source, generation or license, crops, dimensions, alt/caption choice. Verify any named place. | All artwork | Required | Not tested |

| QA-28 | Load budget | Check hero prioritization, below-fold lazy loading, explicit image dimensions, and per-viewport transferred art. | All | Required | Not tested |

| QA-29 | Runtime / cleanup | No new runtime errors; motion listeners/observers clean up on route changes; no extra dependencies or global tokens. | All | Required | Not tested |

| QA-30 | Contrast / touch | Actual art-backed text remains legible. Target 4.5:1 body, 3:1 large text; controls at least 44×44px under this plan. | All | Required | Not tested |

| QA-31 | Real phone | Owner/device check on Safari iOS and/or Android browser; label emulator-only checks accurately. | All | Required | Not tested |

| QA-32 | Screenshot blanking | If capture blanks below fold, record capture failure, inspect viewport state and get real-browser evidence; JS dimensions alone cannot mark visual QA passed. | All | Required | Not tested |

| QA-33 | Home regression | Existing homepage/product/nav unchanged. If shared backdrop is adjusted, verify / and /ai-consultation. | SC-00/10 | Required | Not tested |

| QA-34 | Metadata / publication | Page title, description, social preview and footer agree with approved copy; noindex remains until owner authorizes removal. | SC-00/09 | Required | Not tested |

| QA-35 | Owner review | Owner approves desktop, phone, key interactive states and open issues before any commit/push/release instruction. | All | Release gate | Not tested |


## Decisions, progress and next handoff


| Decision | Status | Default / hold | Impact |
| --- | --- | --- | --- |

| DEC-01 Approved wording per scene | Pending | Use SRC-02 as working baseline; approve CP-01–09 before release. Image text is not authority. | Copy sign-off; do not restart positioning. |

| DEC-02 Dramatic motion / pinning | Proposed default | Dramatic imagery and local motion; no pinned scene initially. At most one short contribution sticky trial after static mobile passes. | No scroll hijacking or content hidden behind animation. |

| DEC-03 Reading drawer behavior | Proposed default | Inline, independent accessible readings on both layouts. Bottom sheets are optional later, not automatically approved. | Preserve hashes, keyboard and return-to-summary behavior. |

| DEC-04 Person imagery | Pending asset | Verified person-free city image now. Actual portrait only after explicit owner supply/approval. | Portrait absence does not block city-only design. |

| DEC-05 Contact destinations | Blocked | Owner supplies actual Telegram / WhatsApp / email. Facebook only when created. | Blocks live contact conversion and launch, not scene prototyping. |

| DEC-06 Regional map / national-impact band | Deferred | Omit generated geography and impact claims. Add only a sourced, approved map if it earns its space. | No reserved empty gap in the page. |

| DEC-07 Homepage invitation integration | Deferred | Do after the dedicated page is approved and separately authorized; preserve existing moon opening. | Recheck the MoonSignalShowcase seam before editing. |

| DEC-08 Mobile length / visible FAQ set | Proposed default | 8–10 screens at 390×844 closed is a planning budget, not a hard limit. Start with six FAQ titles and keep all others reachable. | No text clipping or hidden essential meaning to hit the number. |

Tracking: workbook is the live execution status surface after handoff; document/Markdown are the design contract. Scene IDs and space IDs remain stable. Source copy stays in COPY_DECK_v2. A scene is complete only with approved inputs, desktop+mobile acceptance, reduced-motion parity, attached QA evidence and owner review.



## Source and reference register


SRC-01 — Locked intent and voice
https://github.com/TomaDev23/curious-labs-production/blob/a49e6324c385bad24cf64d5314db241a67c6621e/Docs_v8/page_Consultation/_FRAMING_LOCKED.md
Meaning and boundaries. Wins over earlier documents and image text.


SRC-02 — Current copy deck
https://github.com/TomaDev23/curious-labs-production/blob/a49e6324c385bad24cf64d5314db241a67c6621e/Docs_v8/page_Consultation/COPY_DECK_v2.md
Wording baseline, not blanket approval of every existing line. Corrections still need approval.


SRC-03 — Owner discovery answers
https://github.com/TomaDev23/curious-labs-production/blob/a49e6324c385bad24cf64d5314db241a67c6621e/Docs_v8/page_Consultation/DISCOVERY_ANSWERS_Q1-Q18.md
Service, recipients, process, languages, geography and publication holds.


SRC-04 — Page content
https://github.com/TomaDev23/curious-labs-production/blob/a49e6324c385bad24cf64d5314db241a67c6621e/src/components/consultation/ConsultationContent.jsx
Existing sections, FAQs and readings at the pinned cut; earlier source review in this conversation.


SRC-05 — Current visual components
https://github.com/TomaDev23/curious-labs-production/blob/a49e6324c385bad24cf64d5314db241a67c6621e/src/components/consultation/ConsultationGraphs.jsx
StatTrio, OperatorView, HarnessGraph, TrustSpectrum and FlowGraph; source review in this conversation.


SRC-06 — Page CSS
https://github.com/TomaDev23/curious-labs-production/blob/a49e6324c385bad24cf64d5314db241a67c6621e/src/components/consultation/consultation.css
Existing scoped styling; exact new geometry below is proposed, not measured.


SRC-07 — Page shell
https://github.com/TomaDev23/curious-labs-production/blob/a49e6324c385bad24cf64d5314db241a67c6621e/src/pages/ai-consultation.jsx
Navbar, background, metadata, noindex and footer; source review in this conversation.


SRC-08 — Reading and hash behavior
https://github.com/TomaDev23/curious-labs-production/blob/a49e6324c385bad24cf64d5314db241a67c6621e/src/components/consultation/useConsultationPage.js
Re-read for this plan: native details, deep links, focus return and user-scroll priority.


SRC-09 — Motion primitives
https://github.com/TomaDev23/curious-labs-production/blob/a49e6324c385bad24cf64d5314db241a67c6621e/src/components/consultation/ConsultationMotion.jsx
Re-read for this plan: Reveal, Stagger, KineticHeading, Parallax and reduced-motion branches.


SRC-10 — Earlier integration handoff
https://github.com/TomaDev23/curious-labs-production/blob/a49e6324c385bad24cf64d5314db241a67c6621e/Docs_v8/page_Consultation/NEXT_PASS_HANDOFF.md
Reference only for scope and homepage seam; not current copy authority.



## The six visual references


### REF-00 — Earth hero
File in bundle: references/REF-00_ai_mission_control_moonsignal_consultation.png
Purpose: Opening globe, black negative space, cream type, lime action. Ignore generated copy and altered homepage placement.
SHA-256: 0ef6c5829e6a6fdb279cd146ef1a8bc23e4a7828175e65c852b6c1b51c4bda5a


### REF-01 — Two doors and three walls
File in bundle: references/REF-01_different_starting_points_same_destination.png
Purpose: Equal cyan/warm doors; rocky monolith landscape. Ignore invented services and pronouns.
SHA-256: 46d7eb6f946d404955462b2e43c5c04b614e120d9c364641ec760f84a50ee624


### REF-02 — Three areas / harness centerpiece
File in bundle: references/REF-02_from_curiosity_to_practical_ai_outcomes.png
Purpose: Larger center visual flanked by two narrower areas; tailoring band. Not a service menu.
SHA-256: 65be9ff8aa210cd019a4d303822cca1254c6bc31fa013650e5ba31e7e15f6d00


### REF-03 — Person / Cambodia
File in bundle: references/REF-03_curiouslabs_practical_ai_for_cambodia.png
Purpose: Editorial city composition and credibility bands only. Generated portraits, signatures and geographic map are NOT approved.
SHA-256: 05b342c98aece8ebd90dd87f06307695432696c7a8f2c18b506e20cd2b1895c8


### REF-04 — Approach / deeper reading
File in bundle: references/REF-04_practical_paths_through_the_cosmos.png
Purpose: Luminous path and four illustrated reading entries. Image text does not define the methods.
SHA-256: d8a2405edd9264a19f8c1e0ebedfe9f943e7a51adbc6316e807870706e86b8c6


### REF-05 — Engagement / FAQ / final horizon
File in bundle: references/REF-05_curiouslabs_from_conversation_to_impact.png
Purpose: Connected steps, quiet questions, Earth-horizon close. Keep canonical agreement step; no booking controls.
SHA-256: d8a505682424ebfe95e62e0f26cfc5c08b62e6126447ec2b4af2e25c878c376c
