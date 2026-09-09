# Content and interaction map

**v0.3 · Source IDs retained · all website wording remains draft until approved**

## Authority and traceability

Primary supplied text: `CuriousLabs_AI_Consultation_Chart_Mockup_v0.2.docx` (12 pages). Supporting boundaries: `CuriousLabs_AI_Consultation_Page_Flow_Wireframe_v0.1(1).docx` (15 pages). The four new screenshots are visual references. Their promotional language does not silently add a service, named method, delivery promise, or booking system.

The source documents refer to Discovery Dossier v0.3; that dossier was not independently available in this build. The references folder includes the exact supplied documents, not a rewritten substitute.

**Update, 9 September 2026 — this gap is now closed.** The owner supplied the eighteen discovery
answers directly. They are recorded in `DISCOVERY_ANSWERS_Q1-Q18.md`, which is now the primary
authority for page copy. Where an answer contradicts an inference made in this file or in the
wireframe, the answer wins. That file also lists what the answers deliberately keep off the page
and what still blocks publication.

## The complete page

| ID | v0.2 page | HTML anchor | Visible headline | Content and shape | Status before publication |
|---|---:|---|---|---|---|
| H1 | 2 | `cl-home-title` within separate invitation | A better way to work with AI. | Homepage message and supporting orbital, primary exploration action, secondary contact action. | Final copy and exact insertion verified in current homepage. |
| D1 | 3 | `overview` | Work with AI in a way that fits your business. | Personal, tailored consultation for both audiences; a free first conversation; two actions; location/language line. | Copy approval; no new commercial terms. |
| D2 | 3 | `audiences` | Where could this help? | Technical teams and businesses with non-coding needs, equally visible. Then trust, complexity, and scope. | Recognition language is not testimony. Sector names are possible settings only. |
| D3 | 4 | `contribution` | Start with the need. Build the right approach. | S1–S6, report/session starting expectation, optional workshops/support, scope boundary, useful workflow aim. | No package, fixed rate, duration, or included workshop is implied. |
| D4 | 5 | `person` | The person you would work with. | Hands-on AI practice, business-management background, Cambodia, personal English/Khmer explanation. Text-led; no fabricated portrait or public name. | Approve identity/title approach, exact biography, affiliations, and residence-duration wording. |
| D5 | 6–7 | `approach` | Direct the work. Keep checking it. | Visible explanation plus labeled illustrative contrast; four independent reading rows. | Opening paragraphs are drafts, not completed method articles. |
| D6 | 8 | `evidence` | Examples from my own work. | Two marked reserves for genuine own-work artifacts. Each needs origin, purpose, meaning, limit, and approved display. | Replace with approved assets or omit. Reserve cards are not publication content. |
| D7 | 9 | `engagement` | A conversation first. A tailored engagement after. | Discuss → Propose → Agree → Deliver; free/paid boundary; three separate documents; three visible clarifications. | Preserve commercial distinctions. No fixed percentage, deadline, price, or calendar. |
| D8 | 10 | `contact` | Start with one real business situation. | Free first meeting locally/online, direct messaging and email, regional travel by arrangement. | Supply approved destinations. No live contact is invented. |

v0.2 page 11 governs the mobile reading order; page 12 records proposed flow decisions and content gaps. v0.1 pages 13–15 provide the fuller rhythm, custody, and publication rules.

## S1–S6 subject families

| Source ID | Subject | Prototype element |
|---|---|---|
| S1 | Direction and solutions | `[data-cl-subject="S1"]` |
| S2 | Workflow and harness planning | `[data-cl-subject="S2"]` |
| S3 | Coordinated AI work | `[data-cl-subject="S3"]` |
| S4 | Planning and quality | `[data-cl-subject="S4"]` |
| S5 | Business use and adoption | `[data-cl-subject="S5"]` |
| S6 | Relevant training | `[data-cl-subject="S6"]` |

These are areas to draw from after understanding the business, not products that can be selected or purchased independently. Their descriptions are retained from the v0.2 card text.

## R1–R4 optional depth

| ID | Anchor | Closed row | Expanded content in this reference | Still reserved |
|---|---|---|---|---|
| R1 | `method` | About the method · How is the work organized, directed, and reviewed? | The v0.2 opening on prompts, harnesses, context, stages, tools, handoffs, roles, and checks. | Definitions of Maestro, Orchestrator mode, planning principles, and LEGIT; an approved example. |
| R2 | `concept` | About the concept · What changes when you operate AI across a larger undertaking? | The v0.2 opening on the operator view beyond isolated small requests. | The owner's fuller explanation and a concrete, labeled example. |
| R3 | `technology` | About the technology · Where can the capabilities help, and where should you not simply trust the output? | The v0.2 opening on capabilities, limits, trust, and checking. | The owner's explanatory model and selected examples. |
| R4 | `experience` | About the experience · How do my AI practice and business experience connect? | The v0.2 opening connecting project practice, hospitality/F&B, and Cambodia. | Approved roles, affiliations, project context, and related advisory wording. |

The four short draft openings are sufficient to demonstrate a real open state without fabricating the missing articles. Publishing an approved short paragraph is possible; filling each branch to an arbitrary word count is not mandatory. Do not publish “coming soon” proprietary-method cards or define the owner's named methods from general knowledge.

## Actions and destinations

| Control | Reference behavior | App behavior to preserve |
|---|---|---|
| H1 Explore consultation | Opens `index.html#overview`; within the inline modal it closes the modal and targets `#overview`. | Open the verified consultation route. |
| H1 Free first conversation | Opens `index.html#contact`; inline modal closes and targets `#contact`. | Open the consultation route at contact. |
| D1 Start a free conversation | In-page contact anchor. | No booking confirmation or appointment creation. |
| D1 See the approach | In-page approach anchor. | Preserve a direct fast path to the explanation. |
| Local page links | Contribution, person, approach, contact. | Remain distinct from the real global navigation. |
| D3 Discuss your situation | In-page contact anchor. | Same contact destination as the hero. |
| D4 More about my experience | Opens R4 inline and navigates to its anchor. | Open before moving focus/scroll; support direct deep links too. |
| R1–R4 summary | Toggles its own content only. | Keyboard-accessible; multiple rows may remain open. |
| Close this topic | Closes its own row and returns focus to that summary. | Does not reset the page or return to the top. |
| Proof reserve | No fabricated “view evidence” action. | Add a real larger view only after the artifact is approved. |
| Approved proof card | Local approved image and caption, with a native larger-view dialog. | Keep its limit visible, support Escape/close, return focus to its trigger. |
| Telegram / WhatsApp | Inactive without approved valid destinations. | Direct approved link; no compulsory form or QR. |
| Copy email | Disabled without a real address. With an address, copy or report a selectable fallback. | Do not claim success on failure. |
| Send email | Only becomes a `mailto:` link after approved configuration. | Opens a composer; does not send. |
| Homepage panel / Build notes | Review controls only. | Remove from the public build. |

## Evidence record contract

`js/config.js` accepts zero, one, or two records in `evidence`. A supported record has:

```js
{
  id: "a",             // "a" or "b"
  approved: true,       // only after owner approval of asset AND caption
  title: "…",
  origin: "…",
  purpose: "…",
  meaning: "…",
  limit: "…",
  imageSrc: "assets/approved-excerpt.webp",
  imageAlt: "…"
}
```

This is a schema, not an actual example. Image paths must be local assets under `assets/`; malformed or incomplete records do not activate a slot. File existence and image disclosure still require human/build verification. The reference does not possess any approved artifact.

If MoonSignal is later selected, retain only the context needed to explain the practice. Do not add returns, client-success claims, or a trading-product detour. The consultation can be understood without trading knowledge.

## Deliberate copy and visual changes from v0.2

The document's D1, D3, D4, D5, D7, D8, and H1 headlines are retained. The audience prompts have lost typographic quotation marks so they do not look like testimonials. Small section labels and bridge lines were added for web reading, such as “Who this is for” and “Go a little deeper.” The D6 introductory sentence is shortened while its contextual caption requirements stay intact.

There is no stock or invented portrait. D4 uses an editorial split instead of an empty identity box. No public name or title is inferred from prior conversations. The supplied “18 years living in Cambodia” statement is retained as draft biography text, not promoted to years of AI experience or silently updated with a new number.

The visual graphic has five supporting ideas—people, context, AI tools, review, workflow—around AI integration and human direction. It is not a sequential methodology. The screenshot's strategic “Big Questions” and “Big Pointers” boards are not added as new public-page sections. Their design cues inform the visual hierarchy instead.

The provided “Book Free Consultation” screenshot label is replaced by the document's “Start a free conversation.” No scheduler is implied. The proof slots and contact notices are explicit **reference-only** material rather than imaginary completed content.

## Publication decisions still needed

Approve the final public copy and identity treatment. Approve or shorten the deeper-reading text. Supply and redact real proof, or omit the section. Supply verified contact destinations and choose which channels are public. Add optional QR assets only after verification. Keep the English-first page distinct from English/Khmer discussion and training; later Khmer website copy is separate work.
