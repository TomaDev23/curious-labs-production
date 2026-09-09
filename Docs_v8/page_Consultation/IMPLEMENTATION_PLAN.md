# Implementation plan

**CuriousLabs AI consultation · v0.3 · 9 September 2026**

## 1. Objective and boundary

Add a dedicated, readable AI consultation page and one invitation panel on the existing homepage. Preserve the site's recognizable dark cosmic / cream / lime identity while giving the consultation its own clear reading path.

The deliverable in this package is a reference implementation. It is not a merged change, live route, approved set of commercial terms, or completed asset library. Its HTML is intended to remove guesswork about shape, copy placement, responsive order, actions, and open states. Current production integration still requires reading the actual repository.

**In scope:** a consultation route, H1 homepage invitation, D1–D8 content, R1–R4 inline reading, approved contact actions, selected evidence when available, responsive styling, and necessary accessibility/integration checks.

**Out of scope:** redesigning the global navigation or homepage; changing MoonSignal/AEGIS behavior; product implementation services; pricing packages; a checkout, scheduler, contact database, compulsory form, mailing list, analytics campaign, new authentication system, or new 3D subsystem. Do not turn this task into the older repository-cleanup campaign.

## 2. Source and decision rules

The supplied v0.2 chart controls the latest structure and draft copy, with v0.1 supplying the fuller boundaries. New owner decisions outrank both. The screenshots guide the visuals only. For example, the screenshots' generic six-stage “Discover / Design / Pilot / Review / Train / Operate” graphic is **not** adopted as the owner's named operating method, and “Book Free Consultation” is **not** interpreted as permission to create a booking calendar.

The underlying Discovery Dossier was not independently read for this build. Do not claim that it was audited. The historical inventory and contract-system attachments do not establish current routes, imports, providers, or build health.

The following are proposed presentation decisions, not newly approved service decisions: the 1,320 px maximum content width; a five-node decorative orbital; the simplified standalone review shell; exact CSS tokens; independent native disclosures; implementation configuration; and the precise microcopy changes recorded in `CONTENT_MAP.md`.

## 3. Phase A — inspect only the integration seam

Read the current checkout before editing. Identify the actual router, active homepage, global navigation/footer, background owner, shared typography, and the surrounding MoonSignal promotional panel. Read the project's local instructions and normal build/test commands. Record the branch/commit reviewed and the concrete file paths.

The old inventory provides **candidate search starting points only**: `src/App.jsx`, `src/pages/v6_atomic.jsx`, `src/components/navigation/MissionControlNavbar.jsx`, and `src/components/home/v4/FooterExperience.jsx`. These paths have not been verified at current HEAD. Do not import them just because they appear here.

Determine whether the site already uses route-level metadata, scroll restoration, error boundaries, shared CSS variables, SVG icons, and reduced-motion conventions. Reuse those conventions. Inspect adopted contract usage where relevant; do not bolt on an initialization example from an older attachment.

**Exit condition:** a small integration map naming the actual route file, page component location, exact H1 insertion point, shell/background ownership, and build commands. No wider audit is requested. Where a path differs from the old inventory, follow the real checkout and record the difference.

## 4. Phase B — add the isolated page shell

Use a route such as `/ai-consultation` only after confirming the route naming convention. This route is proposed, not already registered. Direct entry must make sense without first visiting MoonSignal or AEGIS. Verify refresh/deep-link behavior under the actual hosting configuration.

Wrap the page in the existing site shell. The prototype's compact header and footer are review substitutes, not replacements for the real navigation. Do not reproduce the red Emergency control or a fabricated operational/UTC status. Reuse real branding rather than the provisional CSS mark.

Keep the consultation classes and tokens scoped under `.cl-consultation`. Import `tokens.css` and `consultation.css` or translate them into the project's local styling convention. **Do not import `demo-shell.css` into the live site.** Its `body`, background, header, and review-panel rules belong only to the standalone reference.

Use one owner for the background. Where the app already supplies a cosmic background, remove the standalone treatment rather than stacking a second fixed canvas or background lifecycle. The new orbital can remain lightweight SVG; it has no requirement for WebGL, continuous animation, or a new provider.

**Exit condition:** the route renders inside the real shell without a duplicate navbar/footer, horizontal page overflow, extra background engine, or global CSS regression.

## 5. Phase C — transfer the main reading path

Preserve the order and the IDs that relate the code to the chart:

| Source | Recommended component boundary | Anchor | Shape |
|---|---|---|---|
| D1 | `ConsultationHero` | `overview` | Message, two actions, orbital, personal/location/language line. |
| D2 | `ConsultationAudiences` | `audiences` | Equal audience panels, then trust/complexity/scope prompts. |
| D3 | `ConsultationContribution` | `contribution` | Six subject cards, delivery note, scope clarification, contact link. |
| D4 | `ConsultationPerson` | `person` | Text-led introduction; add a real portrait only when supplied. |
| D5 | `ConsultationApproach` | `approach` | Visible explanation, illustrative contrast, four reading rows. |
| D6 | `ConsultationEvidence` | `evidence` | Up to two approved own-work examples with context. |
| D7 | `ConsultationEngagement` | `engagement` | Discuss → Propose → Agree → Deliver, then visible clarifications. |
| D8 | `ConsultationContact` | `contact` | Invitation, direct messaging/email, local/online information. |

These are suggested component names, not assertions about existing files. Use a small number of sensible components; there is no requirement to turn every label into an atom. Keep the copy co-located or in one coherent content module rather than creating competing text sources.

One public `<h1>` belongs to the dedicated page. Section headings are `<h2>`, cards/subtopics `<h3>`. The H1 source identifier denotes the homepage invitation; it does not require an additional HTML `<h1>`. The invitation uses a `<h2>`.

Do not present the audience statements as customer quotations. Do not introduce a package selector, compulsory audience choice, testimonials, or sector logos. Training remains part of a tailored engagement. Personal delivery remains “I”; “we” is the consultant and client working together, not a fabricated delivery team.

**Exit condition:** all supported substantive content is represented once, the service can be understood without opening a reading row, and the source IDs remain traceable.

## 6. Phase D — implement small, explicit behaviors

### Navigation and disclosure

D1's primary action goes to `#contact`; its secondary action goes to `#approach`. D3 also links to contact. D4's experience link opens R4 at `#experience` inside D5. The prototype demonstrates this behavior; port it into the framework rather than running the demo DOM initializer over framework-owned nodes.

R1–R4 open independently in place. Multiple topics may remain open. A visible close action restores focus to the same row. Preserve native keyboard operation. Direct deep links should open the relevant row, including a fresh page load. Do not replace the reading path with a modal or four separate routes at this stage.

### Contacts

The delivered `js/config.js` intentionally contains no addresses or handles. The reference only activates valid destinations after an explicit approval flag. This is configuration hygiene, not a claim of comprehensive security or verification of ownership.

Use approved HTTPS Telegram and WhatsApp destinations, and the approved public email. A main-page CTA only reaches the contact options; it does not confirm a meeting. “Send email” opens a mail composer and does not send automatically. Copy-email feedback must announce success only after the copy operation succeeds. Keep the address selectable and provide a clear fallback when copying is unavailable.

Direct links stay primary on phones. QR assets are **not implemented or fabricated in this skeleton** because there are no payloads. After the destinations are approved, generate local QR assets, verify each scan against the exact intended destination, and expose them only as optional aids. Do not rely on a QR shown on the same phone to complete contact. Facebook remains absent until its real page is confirmed.

### Evidence

The two visible proof cards are design reserves, not public evidence. A usable example needs its actual local asset, origin, purpose, meaning, limitation, approved redactions, alt text, and permission for any larger view. The reference config supports an approved record for slot `a` or `b`, with a native larger-view dialog and an explicit close button. These assets have not yet been supplied.

For publication, replace an approved slot with its real example or omit it. If neither is ready, omit D6 rather than publishing empty frames. Never use the newly authored orbital, a sample planning graph, or the screenshot's decorative complexity as proof of delivered work.

**Exit condition:** all visible public controls lead somewhere real or perform the stated action. Empty reference controls, unapproved channels, and unfilled expansion controls do not ship.

## 7. Phase E — insert H1 without disturbing the homepage

Keep the current moon-led opening. Insert the invitation **immediately before the MoonSignal promotional panel**. Leave the existing MoonSignal and AEGIS sections otherwise unchanged. The modal/standalone homepage preview marks surrounding content as preserved; it is not a reconstruction of the current homepage.

Use the compact H1 copy from `fragments/homepage-invitation.html`. In the app, convert `index.html#overview` and `index.html#contact` into the verified router destinations. Keep the main CTA as exploration of the consultation page and the secondary route as a free-first-conversation shortcut.

Do not duplicate the subject catalogue, biography, evidence, or engagement process in H1. Reuse the orbital component only where appropriate; one shared icon symbol definition is sufficient. Avoid duplicate SVG IDs if multiple orbital instances share a document; parameterize the prefix, as `hero-*` and `home-*` demonstrate.

**Exit condition:** the new invitation is in the intended seam, its links work under the real router, and the rest of the homepage remains intact.

## 8. Phase F — visual, responsive, and regression checks

Use the supplied references for atmosphere, not for copying all decorative text. Keep the cream headline, lime primary action, dark blue-black surfaces, thin cool borders, and restrained orbital. Quieter editorial sections should stay quieter; do not turn every section into another hero infographic.

Compare the page at 320, 390, 768, 1,024, 1,440, and 1,920 CSS pixels, including open readings and dialogs. On narrow screens the hero's message and actions precede the decorative visual; audience panels, subject cards, evidence, steps, and contacts stack. Essential text must not depend on hover, animation, an image, a horizontal carousel, or tiny orbital labels.

Test keyboard focus, skip navigation, headings, contrasts, independent disclosures, focus restoration, reduced-motion settings, selectable email, rejected clipboard permission, direct route refresh, anchor offsets below the real fixed navbar, and all actual approved contact destinations. The English layout must be content-led and able to grow for later Khmer text; do not claim the launch page is already bilingual.

Run the project's real build and existing tests. Verify that the homepage, MoonSignal/AEGIS sections, nav behavior, route transitions, and existing background do not regress. Audit for imported demo CSS, duplicate providers, broken asset paths, debug controls, placeholder captions, and stale alternative copies.

**Exit condition:** recorded results against the actual app, not merely a screenshot of the standalone file.

## 9. Publication gate

Approval of this reference is not approval of every line of copy. Before launch, obtain an explicit copy/identity decision; verify the residence-duration wording; confirm the scope and free-to-paid sequence; approve whatever reading paragraphs will be public; and provide at least one verified contact route. Hide any other unconfigured channels instead of publishing dead actions.

A portrait, complete method articles, QR codes, Facebook page, and two evidence artifacts are not mandatory launch dependencies. Their absence should produce a simpler supported page. The final biography still needs approval, and an unready evidence section must not survive as a placeholder.

Remove the preview shell, build-note UI, reference-only status bars, empty evidence cards, unconfigured controls, and all copied source documents from the deploy output. Remove `noindex` only as an intentional production SEO decision; do not treat that metadata as access control. Do not commit contacts, client material, or internal method details that have not been approved for public use.

## 10. Delivery and rollback

Keep the change narrow and reviewable: new page/components, scoped styles, one route, one homepage insertion, approved local assets, and the necessary tests. Report the branch/commit, exact files changed, screenshots at representative widths, build/test results, remaining content gates, and known limitations. Do not report “production ready” while placeholder or approval gates remain.

Rollback should remove the new route and H1 insertion and their unused page-specific files, leaving the existing shell/background/products unchanged. Do not restructure the entire site to make rollback possible.
