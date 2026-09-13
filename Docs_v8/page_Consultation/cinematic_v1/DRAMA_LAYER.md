# Drama layer — the dynamic moves kept on top of the plan

**Status:** owner-approved direction, 2026-09-13. The owner accepted the plan defaults (DEC-02 no general
pinning, DEC-03 inline readings, 2D-safe doors, no stand-in people, verified city photo) **and** asked that
the dynamic, dramatic ideas agreed earlier are not dropped. This file is how both hold at once.

**Rule for every DR item:** it is a *progressive enhancement*. The plan's default state is the base and must
be complete on its own: all text visible and real, keyboard/touch reachable, no scroll capture, no content on a
decorative surface. Each DR adds motion or depth on top, and each has a `prefers-reduced-motion` state equal to the
plan default. No new npm deps (framer-motion + CSS only). No WebGL/3D models.

| ID | Scene | The dramatic move | Plan clause it stays inside | Reduced motion / fallback |
|---|---|---|---|---|
| DR-01 | SC-01 hero | **Earth horizon stage + orbital instrument.** ART-01 bleeds off the right edge; the orbital sits over the globe's dark side as a translucent instrument (desktop ≥1100px only), with the **owner-approved option-1 labels**: centre `BUSINESS × AI` / `THE JUNCTION`; ring clockwise from top `YOUR NEEDS · CLARITY · STRATEGY · HARNESS · PEOPLE`; footer `BUSINESS FIRST. AI ON TOP.` Existing radar sweep kept. The headline gets a one-time light sheen across already-visible text. | SP-01-06 reserved "until exact words are approved" — the owner approved these words. Decorative, `aria-hidden`. INT-01: text visible at first paint. | Sweep and sheen off; orbital static. Hidden below 1100px (plan: don't spend a phone screen on it). |
| DR-02 | SC-02 doors | **Doors that open.** Each door card has a DOM door frame with a CSS-3D door leaf (`perspective` + `rotateY`), resting ajar. Hover/focus opens it wider and brightens the vista (ART-02/03). On phone the active card in the swipe track opens its door. | VIS-01 says no WebGL model and simple light reveal: the leaf is CSS, decorative, `aria-hidden`, and carries no text. INT-02 swipe/snap with prev/next and name index, no vertical capture. | Leaf static ajar; only the 2D light/edge change remains. |
| DR-03 | SC-03 walls | **Monoliths rise, light converges.** Three DOM monolith faces rise from the terrain (clip reveal + translate) as the stage enters. SVG light traces draw from each wall base to one convergence point (scroll-linked `pathLength`). When wall responses exist, opening one plays a short face-tilt flip decoration on the same DOM text. | VIS-02 traces are decorative, not metrics. INT-03: explicit button opens the response; the flip only decorates that state; no duplicate hidden face. | Walls and traces static and fully drawn. |
| DR-04 | SC-04 contribution | **The one lock-and-release beat.** On desktop ≥1100px the harness scene pins for about one viewport while the left and right areas slide in and harness nodes light one by one, then releases. | DEC-02 permits exactly one short sticky trial on SC-04 desktop. INT-04: no pinning on phone. Built **after** the static scene passes (WP-14). | No pin; final lit state shown. |
| DR-05 | SC-02/03/07 | **Swipe tracks on phone** — native scroll-snap cards (≈88% width, next edge peeking) with a name index and prev/next buttons. | INT-02, INT-03, INT-07. Stacked fallback ≤359px / enlarged text. | Snap still works; `scroll-behavior: auto`. |
| DR-06 | All seams | **Cinematic chapter seams.** Scene art fades through CSS mask edges; a thin light wipe crosses at chapter changes; low-amplitude parallax on art layers (desktop only). The hero globe dissolves into the doors' ground plane. | VIS-09, INT-11: never hides text, never intercepts scroll. | Static gradients; no parallax, no wipe. |
| DR-07 | SC-06 approach | **Drawing path.** The operator path draws as it enters; nodes light in sequence. | INT-05: text readable before the path completes. | Whole path visible immediately. |
| DR-08 | SC-06 readings | **Illustrated reading entries that open cinematically** — inline expansion with the entry image easing into a wider crop. | DEC-03 default: inline, independent `<details>`, hashes preserved. Bottom sheet stays off. | Instant open/close. |
| DR-09 | SC-07 / SC-09 | **Luminous engagement rail** that fills node to node; the **final horizon echoes the hero** (ART-01 derivative) with a faint return of the orbital ring. | INT-07 no auto-advance; SC-09 art low/right, contact state honest. | Rail fully drawn; static horizon. |

**Not in the drama layer (plan wins):** scroll hijacking outside DR-04, pinned stacks on phone, bottom-sheet
readings, generated people or silhouettes, generated "Phnom Penh", fake stats/bars, booking buttons.
