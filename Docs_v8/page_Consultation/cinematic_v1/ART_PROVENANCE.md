# Art provenance register (plan QA-27)

One row per file that ships in `public/consultation/`. Raw generations and `tools/art/_raw/log.jsonl`
are gitignored, so this register is the committed record. Keep the prompt verbatim (or link a
committed prompt file) so any asset can be regenerated.

| ART ID | Shipped files | Source (generated / owner photo / licensed) | Model · quality · gen size | Raw file (local) | Prompt | Crops / darken | Alt / caption decision | Owner approval (date) |
|---|---|---|---|---|---|---|---|---|
| ART-01 (DRAFT placeholder) | `public/consultation/art-01-earth-horizon-desktop.{avif,webp}` 2560×1440 | Generated (OpenAI) | gpt-image-2 · low · 2560×1440 | `tools/art/_raw/art-01-desktop-d2-2026-09-13T06-35-47.png` | `tools/art/prompts/art-01-desktop.txt` | none (native size) | decorative, `alt=""`, aria-hidden | manager pick 2026-09-13; **owner approval pending** |
| ART-01 (DRAFT placeholder) | `public/consultation/art-01-earth-horizon-mobile.{avif,webp}` 960×1280 | Generated (OpenAI) | gpt-image-2 · low · 1152×1536 | `tools/art/_raw/art-01-mobile-d2-2026-09-13T06-35-40.png` | `tools/art/prompts/art-01-mobile.txt` | cover → 960×1280, focus south | decorative, `alt=""` | manager pick 2026-09-13; **owner approval pending** |
| ART-04 (DRAFT placeholder) | `public/consultation/art-04-walls-terrain-desktop.{avif,webp}` 2560×1200 | Generated (OpenAI), `--ref` style probe `test-earth-horizon-2026-09-13T05-26-34.png` | gpt-image-2 · low · 2560×1200 | `tools/art/_raw/art-04-desktop-d2-2026-09-13T06-35-56.png` | `tools/art/prompts/art-04-desktop.txt` | none (native size) | decorative, `alt=""` | manager pick 2026-09-13; **owner approval pending** |
| ART-04 (DRAFT placeholder) | `public/consultation/art-04-walls-terrain-mobile.{avif,webp}` 960×1280 | Generated (OpenAI), same `--ref` | gpt-image-2 · low · 1152×1536 | `tools/art/_raw/art-04-mobile-d2-2026-09-13T06-35-44.png` | `tools/art/prompts/art-04-mobile.txt` | cover → 960×1280, focus south | decorative, `alt=""` | manager pick 2026-09-13; **owner approval pending** |
