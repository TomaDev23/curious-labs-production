# Art bridge (tools/art)

Text-free scene art for the CuriousLabs pages, generated through the OpenAI Images API, then
cropped/compressed for the web. **Agents: use the `create-art` skill** —
`.claude/skills/create-art/SKILL.md` has the verified workflow, flags, rules and gotchas.

- `generate.mjs` — Images API (generations; `--ref` → edits for style continuity; `--background transparent`)
- `export.mjs` — sharp cover-crop → `public/consultation/<slug>-{desktop,mobile}.{avif,webp}` with a size-budget table
- `contact.mjs` — labelled contact sheet for owner review (alpha on a magenta checker)
- `.env` — `OPENAI_API_KEY` (gitignored; never `.env.local`, never `VITE_`-prefixed)
- `_raw/` — raw PNGs, previews, contact sheets, `log.jsonl` spend log (gitignored)

No new npm deps: Node 24 `fetch` + the repo's existing `sharp`.
