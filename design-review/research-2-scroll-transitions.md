I now have sufficient material from research to synthesize a high-signal brief. Let me compile the full response.

---

# Scroll-Driven Storytelling & Section Transitions: Design Brief for a Space/Fintech Landing Page

A research-grounded reference for the team. All patterns have been verified against current (2024-2026) live tutorials, documentation, and award-winning production sites.

---

## 1. Foundational Architecture: The Single-Canvas Spine

The most important structural decision on a space-themed single-page site is **whether the WebGL scene is continuous or per-section**. The premium answer is a persistent, full-viewport canvas behind all HTML content.

**Pattern: Fixed Canvas + Scrollable HTML Overlay**

- A single `<canvas>` sits `position: fixed; inset: 0; z-index: 0`
- All HTML sections scroll normally above it at `z-index: 1`
- The canvas scene evolves in response to the scrollbar — it never unmounts, so you avoid the GPU-cost of teardowns between sections
- This is the architecture used in the Codrops "Cinematic 3D Scroll" tutorial (Nov 2025): https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/

**R3F implementation:** `@14islands/r3f-scroll-rig` provides this out of the box via `<GlobalCanvas>` + `<SmoothScrollbar>`. DOM proxy elements track scroll position; `useTracker()` feeds world-space coordinates to WebGL objects without calling `getBoundingClientRect()` each frame. Lenis drives the smooth scroll on the main thread so the canvas stays in perfect lockstep.
https://github.com/14islands/r3f-scroll-rig

---

## 2. Pinned Scroll Scenes (The "Hold the Frame" Pattern)

A pinned section freezes the viewport while the scroll "budget" plays out an animation sequence. This is the primary tool for scene storytelling.

**GSAP implementation:**
```js
ScrollTrigger.create({
  trigger: ".scene-section",
  start: "top top",
  end: "+=3000",          // 3000px of scroll "budget"
  pin: true,
  scrub: 1,               // ties animation to scroll velocity with 1s lag
  animation: myTimeline,
});
```

- `scrub: 1` (not `scrub: true`) adds cinematic inertia — the animation trails the scroll slightly rather than snapping, which reads as physically weighted
- `scrub: 2.5` works well for SVG mask reveals where you want the trailing to feel like liquid
- Multiple `ScrollTrigger` instances with overlapping triggers create **scene chapters** without page jumps

**Layered zoom pattern** (Codrops Oct 2025): Stack 6 copies of a visual layer each scaled progressively smaller (`scale(1.0)` → `scale(0.15)`). As scroll progresses, the front layers zoom out and disappear, revealing depth. A single CSS custom property `--progress` drives all layers simultaneously — one `gsap.to()` on the root, not 6 separate tweens.
https://tympanus.net/codrops/2025/10/29/building-a-layered-zoom-scroll-effect-with-gsap-scrollsmoother-and-scrolltrigger/

---

## 3. Camera Travel Through Space

**Pattern A: ScrollTrigger + Camera Refs (GSAP + Three.js, no Theatre)**

Store camera target in a mutable ref updated by GSAP:
```js
const cameraRef = useRef({ x: 0, y: 0, z: 50 });

gsap.to(cameraRef.current, {
  z: 5,
  scrollTrigger: { trigger: "#section-2", scrub: 1.5 },
  onUpdate: () => camera.position.set(...)
});
```
Map distinct camera positions to scroll ranges (0–20% = approach planet, 20–50% = orbit, 50–80% = surface descent). Fog density and directional light angle shift in parallel to reinforce depth.

**Pattern B: Theatre.js keyframing + R3F (most editorial control)**

Theatre.js' visual editor lets you scrub through the timeline and manually pose the camera at each section boundary, then export to JSON. `useScroll()` from Drei maps scroll offset to Theatre's playhead. Set all keyframe interpolation to **linear** — cubic easing on camera paths produces nausea at slow scroll speeds.
https://tympanus.net/codrops/2023/02/14/animate-a-camera-fly-through-on-scroll-using-theatre-js-and-react-three-fiber/

**Starfield depth trick:** Three layers of star particles at different Z-depths moving at different scroll multipliers (0.02x / 0.1x / 0.4x). The differential drift creates strong depth without any 3D geometry. Combine with a subtle radial fog that clears at section centers to focus attention.

---

## 4. Scene Handoffs and Cross-Dissolves

### 4a. Full-Section Opacity Stack (Simplest, Most Reliable)

Position sections as `position: absolute` stacked inside a `position: relative` pinned container. All sections start `opacity: 0`. A GSAP timeline fades each section in and out in sequence as scroll progresses through the pinned container's budget.

```js
// Section overlay handoff pattern
gsap.timeline({ scrollTrigger: { pin: true, scrub: true, end: "+=4000" }})
  .to("#section-1", { opacity: 0, duration: 0.25 }, 0.25)
  .to("#section-2", { opacity: 1, duration: 0.25 }, 0.25)
  .to("#section-2", { opacity: 0, duration: 0.25 }, 0.75)
  .to("#section-3", { opacity: 1, duration: 0.25 }, 0.75);
```

The transition happens "quite suddenly" rather than gradually — a near-instant dissolve (0.1–0.2 scroll units) reads as a cinematic cut, not a fade.

Source: https://motion.page/learn/awesome-section-transitions/

### 4b. SVG Mask Wipe (Premium, Directional)

A white SVG rectangle expands over a black mask background — only the white area reveals the new section beneath. Multiple masks per section can create a "venetian blind" or radial reveal.

Critical implementation details from the March 2026 Codrops tutorial:
- Use `viewBox="0 0 100 100"` with virtual units — percentage-based math stays screen-size-agnostic
- Add `+0.1` overlap between adjacent mask rectangles to eliminate subpixel gaps
- Use `shape-rendering="crispEdges"` on the SVG
- `scrub: 2.0–2.5` gives the trailing inertia that makes the reveal feel physically propelled
- On resize, destroy and rebuild the ScrollTrigger timeline entirely — do not try to update coordinates in place

https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/

### 4c. Clip-Path Shape Morph

A `clip-path: polygon()` on the incoming section animates from a narrow horizontal slit (mimicking a spacecraft viewport opening) to `inset(0%)`. Pairs naturally with a space theme. GSAP handles polygon point interpolation cleanly. Avoid this on iOS Safari — `clip-path` animation on large DOM elements causes layer promotion issues.

---

## 5. The Rocket/Spaceship Launch Bridge Transition

This is a high-impact but high-risk pattern. Used correctly it serves as a **kinetic section divider** — the rocket physically bridges two chapters of the story. Done wrong, it reads as a gimmick.

### How to Build It

**SVG path approach (lightest):**
1. Draw an SVG path from the bottom of Section A to the top of Section B (a curved arc or vertical ascent line)
2. Use GSAP `MotionPath` plugin to slide a rocket/ship SVG along the path, synchronized to scroll via `scrub`
3. Emit a particle trail behind the rocket using a canvas element or simple CSS box-shadow cascade

```js
gsap.to(".rocket", {
  motionPath: {
    path: "#launch-path",
    align: "#launch-path",
    autoRotate: true,
    alignOrigin: [0.5, 0.5]
  },
  scrollTrigger: {
    trigger: ".section-bridge",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 1.5
  }
});
```

Official GSAP MotionPath docs: https://gsap.com/docs/v3/Plugins/MotionPathPlugin/

**WebGL particle exhaust approach (richer):**
- As scroll progress enters the launch range, increase particle emitter rate on the rocket position
- Particles drift downward with a slight spread and fade — models exhaust plume physically
- At peak scroll velocity, increase emitter intensity (use GSAP's `getVelocity()` or `ScrollTrigger.getVelocity()`) for a speed-responsive plume
- Tone it down: keep the plume monochromatic (white/pale amber) against deep black — colored rocket exhaust on dark backgrounds reads as festive, not premium

**Where it works best:**
- Between a "Problem" section and a "Solution" section — the rocket is metaphor for the platform's velocity
- Between a hero section and a features section — it sets the kinetic register for the rest of the page
- As a loader/transition into a pinned 3D scene

**Where it fails:**
- If scroll speed is variable and the rocket "stalls" mid-launch (scrub with low smoothing helps)
- If the rocket is detailed and illustrated — keep it minimal, iconographic; a silhouette or line-art
- On mobile, where scroll physics are non-linear — ensure the rocket snaps to start/end position if scroll is flicked past quickly

**Tasteful constraints:** One launch transition per page maximum. The rocket should disappear into the next section (fly off-screen top or dissolve into a star field) rather than stopping abruptly. The "arrival" in the next section can be a subtle light bloom or lens flare as the rocket exits frame.

---

## 6. Parallax Depth: Multi-Layer Construction

Framer Motion `useScroll` + `useTransform` is idiomatic for React-based parallax layers. The key is **three distinct speed tiers** minimum:

```jsx
const { scrollYProgress } = useScroll({ target: containerRef });
const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);   // slow
const midY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);  // medium
const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]); // fast
```

- Background: nebula/stars image, moves at ~0.2x scroll rate
- Mid: planet silhouette or atmospheric haze, ~0.5x
- Foreground: UI content or glowing particles, ~1x or slightly above

Motion.dev docs: https://motion.dev/tutorials/react-parallax

**Depth cue amplifiers:**
- Blur increases with distance (backdrop-filter: blur on far layers — but check performance; use a pre-blurred image instead on low-end devices)
- Opacity falls at far layers (0.4–0.7 for background nebulae)
- Scale-with-scroll: far layer scales very slowly (1.0 → 1.05) while near layer scales faster (1.0 → 1.15) — adds a breathing, zooming-in sense of approach

---

## 7. Continuous Journey: Avoiding the "Stacked Slabs" Problem

The main cause of slab-feel is **section breaks with no visual continuity**. Counter it with:

**Visual connective tissue:**
- A persistent star field in the fixed canvas that never resets — sections feel like windows into the same space
- A subtle scroll-progress indicator on the side (a thin vertical line, like a starship altitude gauge) that persists across all sections
- Section backgrounds that share a color gradient family — each section's dominant color is a shift along the same palette axis rather than a hard jump (e.g., void black → deep navy → indigo → midnight purple → back to black)

**Narrative momentum techniques:**
- End each section's pinned sequence with an "exit vector" — an element zooming toward the camera or flying off-screen that carries the eye toward the next section
- Use `ScrollTrigger.matchMedia()` to reduce pin budgets on mobile, keeping the journey tight on small screens
- Typography `SplitText` stagger reveals (GSAP) at section entries feel like data streaming in — appropriate for a fintech/quant context; character stagger of `0.015–0.025s` is the sweet spot for readability

**Scroll snap verdict for this use case:** Avoid `scroll-snap-type: mandatory` on a long narrative page. It is appropriate for a tight product tour (3–5 slides), but on a 8–12-section journey it traps users and breaks momentum. Use `scroll-snap-type: y proximity` at most — snaps only when the user stops naturally near a boundary, never hijacks a scroll gesture mid-flight.

---

## 8. Reduced Motion Safety

Every scroll-driven animation needs a fallback. The CSS pattern is:
```css
@media (prefers-reduced-motion: reduce) {
  .parallax-layer { transform: none !important; }
  .scroll-driven { animation: none !important; }
}
```

In React/GSAP, use a guard:
```js
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  // register ScrollTrigger animations
} else {
  // show static final-state of each section immediately
}
```

For CSS native scroll timelines (`animation-timeline: scroll()`), browsers automatically pause these when `prefers-reduced-motion: reduce` is set — but only for scroll-progress-driven animations, not view-timeline animations. Test both explicitly.

The rocket launch transition specifically: under reduced motion, skip the entire bridge animation and cross-dissolve directly between sections. The rocket is decorative, never load-bearing for comprehension.

Resources:
- https://www.joshwcomeau.com/react/prefers-reduced-motion/
- https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/

---

## 9. Performance Guardrails

| Risk | Mitigation |
|---|---|
| Multiple WebGL contexts | Single persistent canvas (r3f-scroll-rig or manual fixed canvas) |
| Lottie JSON bloat | Use `.lottie` (DotLottie) format; lazy-load on IntersectionObserver; defer 90KB runtime until in-viewport |
| Too many ScrollTrigger instances | `ScrollTrigger.batch()` for repeated elements; max ~20 individual instances per page |
| Device pixel ratio × large canvas | `dpr: Math.min(window.devicePixelRatio, 2)` in R3F renderer |
| CSS filter/blur on scroll | Use pre-blurred image variants instead of live `filter: blur()` on animated layers |
| VFX-JS scrolling lag | Currently has known performance issues; do not use for primary scroll animations; reserve for hover/entry effects |

---

## 10. Reference Stack Summary

| Need | Tool | Reference |
|---|---|---|
| Pinned scroll scenes, timelines | GSAP ScrollTrigger + ScrollSmoother | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ |
| Camera fly-through (editorial control) | Theatre.js + R3F | https://tympanus.net/codrops/2023/02/14/animate-a-camera-fly-through-on-scroll-using-theatre-js-and-react-three-fiber/ |
| Camera fly-through (code-first) | R3F + GSAP refs | https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/ |
| DOM-WebGL sync, scroll rig | r3f-scroll-rig (14islands) | https://github.com/14islands/r3f-scroll-rig |
| SVG mask section wipes | GSAP + SVG mask | https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/ |
| Layered zoom / depth zoom | GSAP + ScrollSmoother | https://tympanus.net/codrops/2025/10/29/building-a-layered-zoom-scroll-effect-with-gsap-scrollsmoother-and-scrolltrigger/ |
| React parallax layers | Motion.dev useScroll+useTransform | https://motion.dev/tutorials/react-parallax |
| Rocket path animation | GSAP MotionPath plugin | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/ |
| Full section dissolve overlay | GSAP opacity stack | https://motion.page/learn/awesome-section-transitions/ |
| CSS scroll timeline (native) | animation-timeline: scroll() | https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations |
| Reduced motion | Josh W. Comeau React hook | https://www.joshwcomeau.com/react/prefers-reduced-motion/ |
| Award-winning space scroll reference | Star Atlas (Awwwards SOTD) | https://www.awwwards.com/sites/star-atlas |
| Award-winning cosmic scrollytelling | A Cosmic Scroll Journey (Awwwards HM, 2024) | https://www.awwwards.com/sites/a-cosmic-scroll-journey |
| Scrollytelling inspiration vault | Awwwards storytelling collection | https://www.awwwards.com/awwwards/collections/storytelling/ |
