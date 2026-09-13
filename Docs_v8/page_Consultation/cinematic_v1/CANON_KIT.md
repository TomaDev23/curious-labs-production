# Canon kit — the shared visual system (built once, used by every scene)

Owner of the code: **[BLD-A]**. Spec owner: **[MGR]**. Source: the mockups in `references/mockups/`.
Why: every scene must look like one designer drew it. Scenes compose these primitives; they don't restyle them.
Measurements are read off the mockups (drawn ≈1122px wide for a 1440px screen → ×1.28) and are targets, not
approximations to ignore. Phone values come from MOCK-M1.

## 1 · Tokens (`kit/kit.css`, scoped on `.cl-consultation`)

| Token | Value | Use |
|---|---|---|
| `--k-cream` | `#f4efdc` | Display headlines, quote text |
| `--k-ink-body` | `#c9d2d8` | Serif body |
| `--k-ink-muted` | `#8fa3b0` | Secondary text |
| `--k-lime` | `#c6f75b` | Primary buttons, eyebrow, key labels |
| `--k-cyan` | `#5ee6f5` | Technical accent, neon edges |
| `--k-violet` | `#b085ff` | Non-technical accent, featured card |
| `--k-magenta` | `#e27bff` | Secondary violet highlight (icon rings on violet cards) |
| `--k-amber` | `#f2b35e` | Sunrise warmth, rare |
| `--k-surface` | `linear-gradient(160deg, #0b1822e6, #060d14f2)` | Card fill |
| `--k-hairline` | `rgba(130, 180, 210, .16)` | Band separators, card inner rules |
| `--k-radius-card` | `14px` | Cards |
| `--k-radius-pill` | `999px` | Chips |
| `--k-font-display` | Clash Display 600 | Headlines, card titles |
| `--k-font-serif` | **Newsreader** 400/500 + italic (self-hosted, `public/consultation/fonts/`) | Body paragraphs, leads, quotes |
| `--k-font-sans` | Inter Tight | Buttons, small UI text, list rows |
| `--k-font-mono` | JetBrains Mono | Eyebrows, micro labels, taglines |

`@font-face` (put in `kit/kit.css`; `font-display: swap`):
```
Newsreader 400 normal → /consultation/fonts/newsreader-latin-400-normal.woff2
Newsreader 400 italic → /consultation/fonts/newsreader-latin-400-italic.woff2
Newsreader 500 normal → /consultation/fonts/newsreader-latin-500-normal.woff2
Newsreader 500 italic → /consultation/fonts/newsreader-latin-500-italic.woff2
```
Newsreader is OFL-1.1 (fontsource 5.3.0).

## 2 · Type scale

| Role | Desktop 1440 | Phone 390 | Details |
|---|---|---|---|
| Hero display | `clamp(44px, 5.6vw, 84px)` | 38–42px | Clash 600, line-height .98, letter-spacing -.02em, cream |
| Scene display (h2) | `clamp(38px, 4.6vw, 68px)` | 32–36px | Clash 600, lh 1.0, 2–4 short lines |
| Card title (h3) | 28px (feature card 32px) | 22px | Clash 600, lh 1.1 |
| Lead (serif) | 21px / lh 1.45 | 17px / 1.5 | Newsreader 400, `--k-ink-body`, max 46–52ch |
| Body (serif) | 17px / 1.55 | 15.5px / 1.55 | Newsreader 400 |
| Quote (serif) | 26px / 1.25 | 22px | Newsreader 400, cream, curly quotes, 3–4 short lines |
| Eyebrow | 12px mono, `letter-spacing .24em`, uppercase, lime | 10.5px | preceded by an 18px × 1.5px lime dash, 12px gap |
| Micro label | 11px mono, `.2em`, uppercase | 10px | accent colour of its card |
| Tagline (closer) | 11px mono, `.3em`, uppercase, cream 80% | 10px | 2 lines, bottom corners of a band |
| Button | 15px Inter Tight 600 | 15px | |

## 3 · Primitives (`src/components/consultation/kit/`)

| Component | Props | Look (desktop → phone) |
|---|---|---|
| `Band` | `id, sectionKey, art?, hairline='bottom', className, children` | Full-bleed `<section>`: art layer (via `SceneArt`) spans the viewport, content in the 1320px column, vertical padding 96px → 56px, 1px `--k-hairline` rule at the band edge across the full viewport. **Never clips its art** (no `overflow:hidden` on the section; clip only inside the art layer). |
| `Eyebrow` | `children` | lime dash + mono label (§2). |
| `Display` | `as='h2', lines[] or children, size='scene'\|'hero'` | §2; renders lines with `<br/>`, no masked reveal (text is visible at first paint). |
| `Lead` | `children` | serif lead (§2). |
| `QuoteBlock` | `quote, label='CURIOUSLABS', align='right'` | serif quote; 28×2px lime rule below; `● LABEL` mono lime (dot = 6px lime circle with glow). Width ~300px. Phone: full width, 22px. |
| `WordStack` | `words[]` | vertical list of mono 10px `.3em` words at a band edge, 1px hairline left of it, cream 55%. Hidden < 900px. |
| `NeonCard` | `accent='cyan'\|'violet'\|'lime', featured=false, children` | `--k-surface`, `--k-radius-card`, 1.5px border in accent at 70%, glow `0 0 0 1px accent/25%, 0 0 36px -6px accent/45%, inset 0 0 48px accent/7%`; featured: border 100%, glow 60px, plus a 1px inner hairline 10px inset. Padding 40px → 22px. |
| `IconRing` | `icon, accent, size=64` | circle, 1.5px accent border, inner radial glow, icon 28px in accent. Phone 52px. |
| `Chip` | `children, accent` | pill, 34px tall, 1px accent/55% border, 12.5px Inter Tight, cream 85%, padding 0 14px. Wrap with 8px gaps. |
| `PrimaryButton` / `GhostButton` | `href, children, icon='arrow'` | lime fill, ink text, 50px tall, radius 7px, soft lime glow / 1px cream-40% outline. Full width on phone. |
| `CircleArrow` | `href, label, direction='right'\|'down'` | 44px circle, 1px cream/40% border, arrow 18px; hover border lime. |
| `Tagline` | `lines[]` | §2 closer. |
| `StatStrip` | `items[{big,label,note,accent}]` | 3 columns with 1px hairline dividers; big word Clash 30px accent, mono label, small serif note. Phone-first (desktop may reuse). |
| `IconRow` | `icon, title, text` | 48px icon ring (no border fill) + title (Inter Tight 15px cream) + text (serif 14px muted) inside a 1px hairline rounded row, 14px radius. |
| `NumberedRow` | `n, title, text, action='plus'\|'arrow'` | number badge (cyan, 40px circle or large mono numeral), title + text, right-side `+` or arrow; 1px hairline rounded row. Used by SC-06 phone, SC-07 phone, SC-08. |
| `ImageTile` | `src (avif/webp), caption[]` | rounded 12px image with bottom gradient and a 2-line mono caption bottom-left. |

Motion rules for primitives: none by default. Scenes add motion (DRAMA_LAYER) around them; reduced motion = static.

## 4 · Kit gallery (for audits)

In development only, `?kit=1` on `/ai-consultation` renders a gallery of every primitive (each accent, phone and
desktop widths) instead of the page — guarded by `import.meta.env.DEV`, so it never ships. The manager audits the
kit against the mockups there before scenes adopt it.
