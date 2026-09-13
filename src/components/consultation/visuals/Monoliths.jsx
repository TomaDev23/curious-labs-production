import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const FIGURE = {
  avif: '/consultation/art-09-figure-walker.avif',
  webp: '/consultation/art-09-figure-walker.webp'
};

/**
 * Light paths for SC-03 (MOCK-D1, DR-03): one glowing trace per wall, from the
 * base of each wall down to a single convergence point at the stage's
 * bottom-centre, where the placeholder figure stands. Geometry is measured
 * from the rendered walls, so the traces follow any layout. The traces draw
 * once when the stage comes into view (a scroll-linked version under-reported
 * progress); fully drawn and static under reduced motion. Decorative (aria-hidden).
 *
 * `stageRef` — the element that contains the walls (`wallSelector`) and this overlay.
 */
export function LightPaths({ stageRef, wallSelector, accents }) {
  const [geo, setGeo] = useState(null);
  const reduced = useReducedMotion();


  // useEffect, not useLayoutEffect: the parent's stage ref attaches after a child's layout effects run.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const measure = () => {
      const s = stage.getBoundingClientRect();
      const walls = [...stage.querySelectorAll(wallSelector)].map((el) => el.getBoundingClientRect());
      if (!s.width || walls.length === 0 || !walls[0].width) { setGeo(null); return; }
      setGeo({
        w: s.width,
        h: s.height,
        starts: walls.map((r) => ({ x: r.left - s.left + r.width / 2, y: r.bottom - s.top - 36 })),
        end: { x: s.width / 2, y: s.height - 6 }
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [stageRef, wallSelector]);

  if (!geo) return null;

  const { w, h, starts, end } = geo;
  const paths = starts.map((p) => {
    const dx = end.x - p.x;
    const dy = end.y - p.y;
    // A lazy S: drop under the wall, swing toward the centre, settle onto the point.
    // The centre wall sits right above the point, so it gets a sideways sway instead.
    const sway = Math.abs(dx) < 24 ? 34 : 0;
    return `M${p.x},${p.y} C${p.x + dx * 0.05 - sway},${p.y + dy * 0.45} ${p.x + dx * 0.6 + sway},${p.y + dy * 0.35} ${p.x + dx * 0.78 + sway * 0.4},${p.y + dy * 0.68} S${end.x},${end.y - dy * 0.1} ${end.x},${end.y}`;
  });

  return (
    <svg className="w-paths" viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true" focusable="false">
      <defs>
        <filter id="w-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <radialGradient id="w-pool">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".9" />
          <stop offset="35%" stopColor="#bfe9ff" stopOpacity=".45" />
          <stop offset="100%" stopColor="#5ee6f5" stopOpacity="0" />
        </radialGradient>
      </defs>
      {paths.map((d, i) => {
        const draw = reduced
          ? { initial: false }
          : {
            initial: { pathLength: 0 },
            whileInView: { pathLength: 1 },
            viewport: { once: true, amount: 0.4 },
            transition: { duration: 1.8, ease: [0.45, 0, 0.2, 1], delay: 0.35 + i * 0.15 }
          };
        return (
          <g key={d} className="w-paths__trace" style={{ color: accents[i] }}>
            <motion.path d={d} className="w-paths__glow" filter="url(#w-glow)" {...draw} />
            <motion.path d={d} className="w-paths__core" {...draw} />
          </g>
        );
      })}
      <ellipse cx={end.x} cy={end.y} rx="90" ry="16" fill="url(#w-pool)" className="w-paths__pool" />
    </svg>
  );
}

/** Placeholder walker at the convergence point — rendered only once the image loads. */
export function ConvergenceFigure() {
  const [state, setState] = useState('loading');
  if (state === 'failed') return null;
  return (
    <picture className={`w-figure${state === 'ready' ? ' w-figure--ready' : ''}`} aria-hidden="true">
      <source type="image/avif" srcSet={FIGURE.avif} />
      <img
        src={FIGURE.webp}
        width="640"
        height="960"
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={() => setState('ready')}
        onError={() => setState('failed')}
      />
    </picture>
  );
}

