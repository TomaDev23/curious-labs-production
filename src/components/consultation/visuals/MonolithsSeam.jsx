import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * DR-10 · SC-03 → SC-04 seam (TASKS A-06). The walker at the walls'
 * convergence point turns, walks out of frame and pulls the SC-04 header in
 * along a violet light thread. Scroll position scrubs everything — no timers.
 *
 * How it sits in the page: the seam is the first block of the SC-04 band and
 * is pulled up by one viewport, so its sticky layer overlaps the last screen
 * of the walls. Its walker is placed exactly where the walls' figure stands
 * (that figure and its light pool are hidden while the seam exists). The pin
 * lasts one viewport of scroll and releases exactly when the SC-04 band top
 * reaches the viewport top, so #contribution lands on the settled state.
 *
 * Only mounted on desktop (≥1100px) without reduced motion — see useWalkerSeam.
 */

const WALK = 'left'; // owner can flip to 'right'

const FRAMES = {
  back: { avif: '/consultation/art-09-figure-walker.avif', webp: '/consultation/art-09-figure-walker.webp' },
  threeQuarter: { avif: '/consultation/art-19a-walker-three-quarter-left.avif', webp: '/consultation/art-19a-walker-three-quarter-left.webp' },
  stride1: { avif: '/consultation/art-19b-walker-profile-left-stride-1.avif', webp: '/consultation/art-19b-walker-profile-left-stride-1.webp' },
  stride2: { avif: '/consultation/art-19c-walker-profile-left-stride-2.avif', webp: '/consultation/art-19c-walker-profile-left-stride-2.webp' }
  // passing (art-19d) rejected in #MGR-046 (lost the backpack); re-add here and in CYCLE when a new one lands.
};
const FRAME_KEYS = Object.keys(FRAMES);
const GROUND = { avif: '/consultation/art-04-walls-terrain-desktop.avif', webp: '/consultation/art-04-walls-terrain-desktop.webp' };
const CYCLE = ['stride1', 'stride2'];

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ramp = (p, a, b) => clamp01((p - a) / (b - a));
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/** Desktop ≥1100px and motion allowed. Re-evaluates on viewport / preference change. */
export function useWalkerSeam() {
  const query = '(min-width: 1100px) and (prefers-reduced-motion: no-preference)';
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setOn(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return on;
}

/*
 * Placeholder poses until ART-19 lands (A-06, owner-approved): simple
 * silhouettes in the walker's palette, facing left. Limb geometry per pose in
 * a 640×960 box, feet on y≈950.
 */
const POSES = {
  stride1: { armNear: [322, 222, 236, 470], armFar: [338, 222, 436, 455], legNear: [318, 520, 262, 736, 214, 944], legFar: [342, 520, 392, 736, 452, 934] },
  stride2: { armNear: [322, 222, 424, 462], armFar: [338, 222, 246, 462], legNear: [318, 520, 382, 736, 448, 940], legFar: [342, 520, 280, 736, 222, 938] },
  passing: { armNear: [322, 222, 300, 486], armFar: [338, 222, 478, 382], legNear: [318, 520, 300, 736, 300, 946], legFar: [342, 520, 360, 736, 356, 942] }
};

function PoseSilhouette({ pose, threeQuarter = false }) {
  if (threeQuarter) {
    return (
      <svg viewBox="0 0 640 960" className="ws-pose-svg" aria-hidden="true" focusable="false">
        <g className="ws-pose-svg__rim">
          <ellipse cx="320" cy="118" rx="60" ry="64" />
          <path d="M236 200 Q320 168 404 200 L420 540 L220 540 Z" />
          <path className="l" d="M250 520 L232 940 M390 520 L408 940" />
          <path className="l" d="M236 214 L200 500 M404 214 L436 500" />
        </g>
        <g className="ws-pose-svg__body">
          <ellipse cx="320" cy="118" rx="54" ry="58" />
          <path d="M240 204 Q320 174 400 204 L414 536 L226 536 Z" />
          <rect x="360" y="214" width="78" height="240" rx="28" />
          <path className="l" d="M252 520 L236 940 M388 520 L404 940" />
          <path className="l" d="M240 216 L206 496 M400 216 L430 496" />
        </g>
      </svg>
    );
  }
  const g = POSES[pose];
  const limb = (a) => `M${a[0]} ${a[1]} L${a[2]} ${a[3]}`;
  const leg = (a) => `M${a[0]} ${a[1]} L${a[2]} ${a[3]} L${a[4]} ${a[5]} l-46 6`;
  return (
    <svg viewBox="0 0 640 960" className="ws-pose-svg" aria-hidden="true" focusable="false">
      <g className="ws-pose-svg__rim">
        <circle cx="318" cy="112" r="62" />
        <path d="M276 180 L362 180 L376 540 L290 540 Z" />
        <rect x="352" y="196" width="104" height="262" rx="34" />
        <path className="l" d={limb(g.armFar)} />
        <path className="l" d={leg(g.legFar)} />
        <path className="l" d={leg(g.legNear)} />
        <path className="l" d={limb(g.armNear)} />
      </g>
      <g className="ws-pose-svg__far">
        <path className="l" d={limb(g.armFar)} />
        <path className="l" d={leg(g.legFar)} />
      </g>
      <g className="ws-pose-svg__body">
        <circle cx="318" cy="112" r="56" />
        <rect x="356" y="200" width="96" height="254" rx="30" />
        <path d="M280 184 L358 184 L372 536 L294 536 Z" />
        <path className="l" d={leg(g.legNear)} />
        <path className="l" d={limb(g.armNear)} />
      </g>
    </svg>
  );
}

/** One pose frame: the ART-19 file if it loads, otherwise the placeholder silhouette. */
function PoseFrame({ name, frameRef }) {
  const [failed, setFailed] = useState(false);
  const src = FRAMES[name];
  return (
    <span ref={frameRef} className={`ws-frame ws-frame--${name}`}>
      {name !== 'back' && failed ? (
        <PoseSilhouette pose={name} threeQuarter={name === 'threeQuarter'} />
      ) : (
        <picture>
          <source type="image/avif" srcSet={src.avif} />
          <img src={src.webp} width="640" height="960" alt="" decoding="async" onError={() => setFailed(true)} />
        </picture>
      )}
    </span>
  );
}

export function WalkerSeam({ children }) {
  const seamRef = useRef(null);
  const layerRef = useRef(null);
  const walkerRef = useRef(null);
  const poolRef = useRef(null);
  const threadRef = useRef(null);
  const threadSvgRef = useRef(null);
  const knotRef = useRef(null);
  const groundRef = useRef(null);
  const headerRef = useRef(null);
  const frameRefs = useRef({});
  const geo = useRef({ x: 0, bottom: 0, headerLeft: 0, headerMidY: 0, headerRight: 0, anchorX: 0, anchorY: 0, w: 0, h: 0 });

  // Place the walker where the walls' figure stands, in layer coordinates (document geometry, so measure unpinned).
  useLayoutEffect(() => {
    const measure = () => {
      const seam = seamRef.current;
      const layer = layerRef.current;
      const header = headerRef.current;
      if (!seam || !layer || !header) return;
      const seamTop = seam.getBoundingClientRect().top + window.scrollY;
      const layerRect = layer.getBoundingClientRect();
      const figure = document.querySelector('#walls .w-figure');
      const fig = figure && figure.getBoundingClientRect();
      const g = geo.current;
      g.w = layerRect.width;
      g.h = layerRect.height;
      if (fig && fig.width) {
        g.x = fig.left + fig.width / 2 - layerRect.left;
        g.bottom = fig.bottom + window.scrollY - seamTop; // from the layer top while the layer is unpinned
      } else {
        g.x = layerRect.width / 2;
        g.bottom = layerRect.height * 0.62;
      }
      // Header text block in layer coordinates, measured with the scrub transform cleared
      // (the wrapper is full width; the centred block inside it is what reads).
      const box = header.firstElementChild || header;
      const eyebrow = header.querySelector('.k-eyebrow');
      const prev = header.style.transform;
      header.style.transform = 'none';
      const b = box.getBoundingClientRect();
      const e = (eyebrow || box).getBoundingClientRect();
      header.style.transform = prev;
      g.headerLeft = b.left - layerRect.left;
      g.headerRight = b.right - layerRect.left;
      g.headerMidY = b.top - layerRect.top + Math.min(24, b.height / 2);
      // The thread ties onto the eyebrow's leading dash (the far dash when walking right).
      g.anchorX = (WALK === 'left' ? e.left - 6 : e.right + 6) - layerRect.left;
      g.anchorY = e.top + e.height / 2 - layerRect.top;
      walkerRef.current.style.left = `${g.x}px`;
      walkerRef.current.style.top = `${g.bottom}px`;
      poolRef.current.style.left = `${g.x}px`;
      poolRef.current.style.top = `${g.bottom}px`;
      threadSvgRef.current.setAttribute('viewBox', `0 0 ${g.w} ${g.h}`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    const walls = document.getElementById('walls');
    if (walls) ro.observe(walls);
    window.addEventListener('load', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', measure);
      document.querySelectorAll('#walls .w-paths, #walls .w-foot, #walls .w-backdrop').forEach((el) => { el.style.opacity = ''; });
    };
  }, []);

  // Scrub on scroll (rAF-throttled). Progress p: 0 when the seam top meets the viewport top, 1 when the pin releases.
  useEffect(() => {
    let raf = 0;
    const dir = WALK === 'left' ? -1 : 1;
    const render = () => {
      raf = 0;
      const seam = seamRef.current;
      if (!seam) return;
      const rect = seam.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? clamp01(-rect.top / travel) : 0;
      const g = geo.current;
      const vw = document.documentElement.clientWidth;
      seam.style.setProperty('--ws-p', p.toFixed(4));

      // The walls' paths and closer hand over to the pinned walker: they fade as the pin begins.
      const wallsOpacity = String(1 - ramp(p, 0, 0.14));
      // Looked up per frame: the walls' path SVG mounts only after its own measurement.
      document.querySelectorAll('#walls .w-paths, #walls .w-foot').forEach((el) => { el.style.opacity = wallsOpacity; });
      // #MGR-refine: fade the walls' own terrain backdrop out fast at the start of the pin,
      // otherwise it stays painted under the seam's ws-ground (same ART-04 file) and the two
      // terrain layers overlap as a jagged double surface while the walker is pinned.
      const wallsBackdropOpacity = String(1 - ramp(p, 0, 0.08));
      document.querySelectorAll('#walls .w-backdrop').forEach((el) => { el.style.opacity = wallsBackdropOpacity; });

      // Pose: back → three-quarter → profile walk cycle.
      let pose = 'back';
      if (p >= 0.2) pose = CYCLE[Math.floor((p - 0.2) / 0.06) % CYCLE.length];
      else if (p >= 0.12) pose = 'threeQuarter';
      FRAME_KEYS.forEach((k) => { const el = frameRefs.current[k]; if (el) el.style.opacity = k === pose ? '1' : '0'; });

      // Walk: from the convergence point until fully past the edge by p = 0.9.
      const walk = easeInOut(ramp(p, 0.2, 0.9));
      const exitDistance = dir < 0 ? g.x + (vw - g.w) / 2 + 160 : g.w - g.x + (vw - g.w) / 2 + 160;
      const dx = dir * walk * exitDistance;
      const flip = dir < 0 ? 1 : -1; // poses face left; mirror when walking right
      walkerRef.current.style.transform = `translate(calc(-50% + ${dx}px), -100%) scaleX(${flip})`;
      poolRef.current.style.transform = `translate(calc(-50% + ${dx}px), -50%)`;
      poolRef.current.style.opacity = String(1 - 0.8 * walk);

      // Ground strip travels with the pinned walker once the walls' own terrain has scrolled away,
      // and is gone before the pin releases (so it never scrolls up as a band).
      groundRef.current.style.opacity = (ramp(p, 0.04, 0.2) * (1 - ramp(p, 0.72, 0.9))).toFixed(3);

      // Header slides in from the far side, attached to the thread's end.
      const pull = easeInOut(ramp(p, 0.3, 0.9));
      const enterDistance = dir < 0 ? vw - g.headerLeft + 40 : g.headerRight + 40;
      const hx = -dir * (1 - pull) * enterDistance;
      headerRef.current.style.transform = `translateX(${hx}px)`;
      headerRef.current.style.opacity = String(0.15 + 0.85 * pull);

      // Thread: trailing hand → header's leading edge (or the viewport edge until the header arrives), with a slight sag.
      const threadOn = ramp(p, 0.25, 0.32) * (1 - ramp(p, 0.9, 1));
      const handX = g.x + dx + dir * -0.16 * 127;
      const handY = g.bottom - 0.55 * 190;
      const edge = dir < 0 ? Math.min(g.anchorX + hx, g.w + (vw - g.w) / 2) : Math.max(g.anchorX + hx, -(vw - g.w) / 2);
      const endY = g.anchorY;
      const midX = (handX + edge) / 2;
      const sag = 46 + 0.06 * Math.abs(edge - handX);
      threadRef.current.setAttribute('d', `M${handX.toFixed(1)},${handY.toFixed(1)} Q${midX.toFixed(1)},${(Math.max(handY, endY) + sag).toFixed(1)} ${edge.toFixed(1)},${endY.toFixed(1)}`);
      threadSvgRef.current.style.opacity = threadOn.toFixed(3);
      knotRef.current.setAttribute('cx', edge.toFixed(1));
      knotRef.current.setAttribute('cy', endY.toFixed(1));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(render); };
    render();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={seamRef} className={`ws-seam ws-seam--${WALK}`}>
      <div ref={layerRef} className="ws-layer">
        <picture ref={groundRef} className="ws-ground" aria-hidden="true">
          <source type="image/avif" srcSet={GROUND.avif} />
          <img src={GROUND.webp} width="2560" height="1200" alt="" decoding="async" />
        </picture>
        <span ref={poolRef} className="ws-pool" aria-hidden="true" />
        <svg ref={threadSvgRef} className="ws-thread" aria-hidden="true" focusable="false" preserveAspectRatio="none">
          <path ref={threadRef} className="ws-thread__line" d="M0,0" />
          <circle ref={knotRef} className="ws-thread__knot" r="3.5" />
        </svg>
        <span ref={walkerRef} className="ws-walker" aria-hidden="true">
          {FRAME_KEYS.map((name) => (
            <PoseFrame key={name} name={name} frameRef={(el) => { frameRefs.current[name] = el; }} />
          ))}
        </span>
        <div ref={headerRef} className="ws-header">{children}</div>
      </div>
    </div>
  );
}
