# Visual system and CSS map

**v0.3 · Proposed implementation, informed by the supplied images**

## Direction

Keep the website's cosmic identity, but give the consultation readable surfaces. The visual hierarchy is cream headlines, grey-blue body copy, lime actions and small navigational marks, cool panel edges, and a restrained orbital. The heavier technical decoration belongs around the hero; it should not sit directly behind every reading paragraph.

The reference uses code-authored SVG and CSS instead of embedding a screenshot as the page. All headlines, paragraphs, buttons, captions, and expanded readings remain real text. The uploaded PNGs live in `references/` for comparison, not as runtime backgrounds. No new image-generation asset, font file, canvas renderer, or texture download is required.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--cl-bg` | `#03090e` | Page-level reference background. |
| `--cl-panel` | `#071117` | Panel foundation. |
| `--cl-panel-raised` | `#0a171f` | Raised content/reading surface. |
| `--cl-cream` | `#f4efdc` | Headlines and strong text. |
| `--cl-text` | `#c2cdd4` | Main body text. |
| `--cl-muted` | `#96aab7` | Supporting text and technical captions. |
| `--cl-lime` | `#c6f75b` | Primary action, links, small emphasis. |
| `--cl-ice` | `#afd4df` | Icons and secondary accents. |
| `--cl-line` | `#2b414c` | Panel/section borders. |
| `--cl-line-soft` | `#1b2b35` | Internal separators. |
| `--cl-amber` | `#d9bf8b` | Reference-only pending notices. |
| `--cl-max` | `1320px` | Maximum page content width. |
| `--cl-radius` | `14px` | Feature-panel rounding. |
| `--cl-card-radius` | `10px` | Smaller content-card rounding. |

These values are proposals based on the references, not claims that the production site already uses them. The width is a deliberate visual-study expansion from the earlier document's 1,160–1,240 px starting range.

All variables are scoped to `.cl-consultation`, not `:root`. The component stylesheet prefixes its selectors with that class. This is intended to make integration safer, not to replace regression testing against the real site's CSS.

## Typography

The stack is `Inter, Helvetica Neue, Arial, sans-serif`. It uses an available local/browser font and does not load Inter remotely. In production, use the site's approved font stack. Do not bundle font files from this environment or acquire a new font dependency just to imitate the screenshot.

The hero uses a fluid 42–70 px starting range, with a smaller phone range. Section titles use roughly 34–49 px; body text is generally 16–18 px, with smaller supporting captions and process clarifications. Letter spacing is tighter on large headings and wider on the small monospace labels. Let headings wrap naturally instead of encoding the screenshots' exact line breaks.

Micro-labels on the orbital and in the review UI are decorative or secondary. The offer, audiences, scope, free-to-paid boundary, and contact action must never depend on reading them.

## Spacing and responsive shape

| Range | Behavior |
|---|---|
| Above 1,100 px | Split hero, two audience cards, three-column subject grid, editorial splits, two proof cards, four process steps. |
| 901–1,100 px | Tighter splits and padding; keep the orbital alongside the hero where it fits. |
| 621–900 px | Hero copy → metadata → smaller orbital; two-column subject grid and process; contact becomes one main column. |
| Up to 620 px | Single-column audience/subject/proof/process/contact cards; compact typography; independent inline reading. |
| Up to 359 px | Additional headline/gutter adjustment; no forced non-wrapping phrase. |

Side gutters begin around 20 px on phones and grow toward 40 px. Section spacing ranges from 64 to 108 px. Panels have roughly 24–48 px padding. None of the eight sections has a fixed viewport height. Open readings, longer approved copy, and later language additions should grow naturally.

The main hero primary action comes before the decorative orbital on phones. Do not reorder it below the illustration to imitate a desktop screenshot.

## Section rhythm

D1 is the strongest feature panel. D2 uses two balanced panels and a compact recognition strip. D3 uses a restrained six-card grid and a plain delivery band. D4 is editorial, with no fabricated portrait. D5 is mostly prose and quiet reading rows. D6 reserves comfortable image/caption space. D7 is a modest process and clarification band. D8 is a practical closing contact panel.

The homepage H1 is a single generous invitation, not a duplicate consultation page. At narrow widths its text/actions come first, with an optional smaller orbital afterward.

## Orbital and SVG ownership

The graphic's center is AI integration / human direction. Outer labels are people, context, AI tools, review, and workflow. These are supporting ideas, not a named framework or a promised delivery sequence. It is marked decorative for assistive technology because the important meaning is already stated in the surrounding text.

Each graphic requires unique IDs for its gradients, clipping paths, pattern, and filters. The reference uses `hero-*` and `home-*` prefixes. In a component implementation use a stable unique prefix; do not duplicate IDs when reusing a component. Shared icon symbols use the `cl-i-*` namespace and should be defined once per document.

Keep the scene static by default. Avoid parallax that carries content out of reading order, automatic carousels, constant canvas redraw, and scroll-dependent text visibility. Reuse the site's background owner rather than introducing a second one.

## Controls and states

Primary buttons are lime with dark text. Secondary buttons use a restrained outline. Text links have a directional icon. Keyboard focus is visible. The primary target size is about 50 px, with 44 px or larger utility controls where practical.

Native `<details>` rows supply the open/closed state; several may remain open. The close action returns focus to its summary. Native dialogs supply the homepage study and larger approved proof view, with visible close buttons and Escape behavior. Review controls are not a proposed part of the published site.

The unconfigured contact appearance is intentionally muted and non-navigable. It demonstrates missing input; it is not a public disabled-button design to ship. Hide unapproved channels or complete them before publication. A real email remains selectable when clipboard access fails.

The reduced-motion media query disables transitions and smooth scrolling in the reference. There is no essential animation to suppress. The forced-colors rules preserve basic borders and disclosure marks; an actual assistive-technology/high-contrast test remains part of the project handoff.

## CSS ownership boundary

Transfer or translate `tokens.css` and `consultation.css`. Do not transfer `demo-shell.css` into the live route: it contains the preview's `body` treatment, compact global-looking header, footer, background stars, reference toolbar, and homepage-context placeholders.

The standalone file embeds all three because it must stand alone for review. That convenience is not an instruction to bypass the host's content security policy or use inline styles/scripts in production. Use the project's normal asset pipeline and policy.
