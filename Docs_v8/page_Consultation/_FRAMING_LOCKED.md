# AI Consultation page · LOCKED FRAMING

**Status: canonical. Locked with the owner on 2026-09-12.** This file is the anti-drift
authority for *intent and voice*. If anything else in this folder contradicts it, **this wins.**
Copy lines live in `COPY_DECK_v2.md`; the owner's raw answers live in `DISCOVERY_ANSWERS_Q1-Q18.md`.
Read all three before writing a word. Do not re-derive the positioning from older files
(`CONTENT_MAP.md`, the wireframe `.docx`, the v0.3 HTML) — they predate these decisions.

---

## 1 · The positioning, in one line

**Business consultation in the age of AI.** He is a **business advisor first**; AI is a real,
hands-on **extra focus on top** — not the subject, not a course, not technical work.

## 2 · The story (the spine — never lose this)

He is a capable business advisor sitting at the **junction** where his own capability is being
augmented by AI. He meets clients standing at that **same junction** — they know AI matters but
don't know how to make it work for their business.

**What he actually does:** sits down, understands their needs and problems *with them*, and
**feeds back clarity — solutions and ideas they can turn into their own strategy.** Then, whether
they already use AI or just want to, he helps them **leverage it, define the harness and the right
methods, and plan and train the systems.**

It is **business consultancy — not technical work** — with a serious, practical AI focus layered
on. The AI-craft (operator's view / harness / auditing / agents) is the **proof he can make the AI
dependable**, a credibility layer under "The approach" — **never the headline.**

## 3 · Who it's for — two client types, CO-EQUAL

- **Technical companies.** Companies **already shipping tech products** who want AI integrated into
  how the team works but don't know how to do it **at scale**. He helps on **coordination and the
  harnessing rules that stop the AI sabotaging itself** as more work is handed to it.
  *(This does NOT mean "companies that happen to use technology.")*
- **Non-technical companies.** Companies that **want to leverage AI but aren't technical.** He
  helps them **see the real use cases** and **design the harness that fits their needs.**

Same underlying focus (genuine value from AI); two different doors in.

## 4 · What he actually does — the three areas (his own words)

Consolidated from the old S1–S6 into three. They are **areas drawn from, never a menu to buy from.**

1. **Leverage** — find where AI is *actually worth it* (and where it isn't).
2. **Harness & methods** — build the harness, the checks, the way of working, so it stays
   dependable instead of collapsing under its own weight.
3. **Plan & train** — plan the systems and train the people, so it takes hold and keeps working.

Baseline engagement: **a report + one-to-one sessions**, then tailored (recipients, format,
length, support). Free first conversation → email summary → scoped proposal & quote → agree →
deliver.

## 5 · Who he is (credentials = the package)

- **18 years in the Khmer market** (this is market/residence experience — **never** re-labelled as
  years of AI experience).
- **F&B and real estate.** Led hotels and restaurants to success; holds a share in a **well-known
  local food business** (unnamed).
- Ties this to **current AI-operator experience** → **one complete package: business consultancy
  and advisory, with a real AI focus on top, from one person who has actually done both sides.**
- Differentiator: **local market understanding + real operating experience that generic AI advice
  can't fake.**

## 6 · Order of importance (the focus)

1. Business consultation, AI-focused — the junction; business advisor first.
2. Local market + real operating experience.
3. Tailored, per case; "I", no team.
4. The consulting act: understand → clarity → strategy.
5. AI-craft (operator view / harness) — credibility layer, **not** the lead.

## 7 · Voice rules

**Do:** first-person, human, concrete, plain. Short sentences. Use his own vocabulary — *sit down
with you, real clarity, worth it, harness, collapse under its own weight, both sides, junction,
this market.* Let the value carry; keep caveats thin.

**Don't:** plastic AI filler — *unlock, empower, seamless, robust, cutting-edge, leverage the power
of, game-changer, drive results, in today's fast-paced world, elevate, supercharge,* or triads of
adjectives. No bland, non-committal "parve" lines (the owner's word for the rejected *"Start with
the need. Build the right approach."*).

## 8 · Hard constraints (do NOT invent)

- Don't define **Maestro, Orchestrator mode, LEGIT, or the planning principles** — unspecified.
- No **prices, durations, deposit %, testimonials, client logos, or case-study claims.**
- **"18 years" = Cambodia/Khmer-market experience, never AI experience.** Don't "fix" the number.
- No fabricated **name, title, or portrait.**
- **Contact channels are PENDING** — no Telegram/WhatsApp/email/Facebook destinations supplied yet.
  Ship no dead buttons; keep the pending state.
- **D6 Evidence stays omitted** until real, approved own-work artifacts (Origin/Purpose/Meaning/Limit).
- Don't publish **internal commercial intent** (e.g. "enough to get excited but too little to
  leverage"; any specific fee).
- **"I"**, not "we" ("we" = consultant + client, never a fake team).
- Khmer capability = spoken discussion/training in his own words; it does **not** mean the written
  page or every deliverable is bilingual. English-first page; Khmer site copy is later work.

## 9 · Current page state (as of 2026-09-12)

Route `/ai-consultation`. Copy from `COPY_DECK_v2.md` is **implemented and verified live**.
Files: `src/components/consultation/ConsultationContent.jsx`, `ConsultationGraphs.jsx`,
`consultation.css` (scoped tokens on `.cl-consultation`, not `:root`).

Section order: **Hero → Audiences (2 client types + 3 problems: Trust/Complexity/Reliability) →
What I actually do (3 themes) → Person → Approach (operator view + R1–R4 readings) → Engagement
flow → Questions (FAQ) → Contact (pending channels).**

## 10 · Open items / what's next

- **Copy:** owner wants a higher-instance pass to reach "the next level." Copy is solid but not
  final — sharpen, don't restart. Everything above is locked; the words can still improve.
- **Audiences section** — pending owner steer: reframe the two cards so both doors clearly open
  onto *business consultancy with AI*, matching the junction voice.
- **Design round (not yet done):**
  1. Decorative **orbital** still reads "AI INTEGRATION / HUMAN DIRECTION" + "PEOPLE. PROCESSES.
     POSSIBILITIES." — off-message now; revisit.
  2. **Hero vertical whitespace** — a lot of empty space below the hero copy; tighten.
  3. Keep the cosmic background / cream headlines / lime actions system; calmer than the old dense
     boards. Don't add 3D, new deps, or global `:root` tokens.

## Working rules for this repo

- **PowerShell** shell — never `&&`, chain with `;`. Bash tool also available for POSIX.
- Dev server runs on **localhost:5173** (kept up by the owner) — **don't start your own.**
- **Don't build after every small tweak**; review, then ask before committing. **Don't run git**
  unless asked. Verify visually in the browser (desktop + a phone width).
