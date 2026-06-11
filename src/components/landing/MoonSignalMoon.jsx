import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { useMediaState, useNearViewport } from './hooks';

const MoonSphereProxy = lazy(() => import('../atomic/proxies/MoonSphereProxy'));

/**
 * MoonSignalMoon
 *
 * The moon, leveraged. In the Moon Signal section the real 3D moon acts as the
 * section's gravity well: as you scroll it into view it drifts upward and its
 * glow swells — a quiet "reveal" that ties the brand (Moon Signal) to the visual.
 *
 * Performance:
 *  - 3D only mounts when near viewport AND desktop AND motion allowed.
 *  - the scroll-linked drift writes transform straight to a ref (no React state,
 *    no re-render of the 3D canvas) and is rAF-throttled.
 *  - mobile / reduced-motion / no-WebGL fall back to a static CSS moon.
 */
const CssMoon = () => (
  <div className="relative h-full w-full" aria-hidden="true">
    <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_68%_32%,rgba(245,247,255,0.95),rgba(165,174,190,0.78)_22%,rgba(82,91,112,0.92)_52%,rgba(17,22,35,0.98)_78%)] shadow-[0_0_90px_rgba(226,232,240,0.18)]" />
    <div className="absolute left-[30%] top-[35%] h-[9%] w-[14%] rounded-full bg-slate-600/45 blur-[2px]" />
    <div className="absolute right-[30%] top-[28%] h-[6%] w-[10%] rounded-full bg-slate-700/35 blur-[1px]" />
    <div className="absolute bottom-[28%] left-[46%] h-[7%] w-[12%] rounded-full bg-slate-800/35 blur-[2px]" />
  </div>
);

const MoonSignalMoon = ({ className = '', debugPhase = 0.62 }) => {
  const [nearRef, isNear] = useNearViewport('420px');
  const { isMobile, prefersReducedMotion } = useMediaState();
  const driftRef = useRef(null);

  const shouldRender3D = isNear && !isMobile && !prefersReducedMotion;

  // Scroll-linked parallax drift — write transform directly, never via state.
  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;
    const node = driftRef.current;
    const anchor = nearRef.current;
    if (!node || !anchor) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = anchor.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (below viewport) → 0 (centered) → 1 (above viewport)
      const center = rect.top + rect.height / 2;
      const rel = Math.max(-1, Math.min(1, (vh / 2 - center) / (vh / 2 + rect.height / 2)));
      const translateY = (-rel * 26).toFixed(2); // drifts up as it rises
      const scale = (1 + rel * 0.04).toFixed(3); // swells slightly past center
      node.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [prefersReducedMotion, nearRef]);

  return (
    <div ref={nearRef} className={`relative aspect-square ${className}`}>
      {/* glow well behind the moon */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.16),rgba(45,212,191,0.06)_45%,transparent_68%)]"
        aria-hidden="true"
      />
      <div ref={driftRef} className="relative h-full w-full will-change-transform [transition:transform_120ms_linear]">
        {shouldRender3D ? (
          <Suspense fallback={<CssMoon />}>
            <MoonSphereProxy className="h-full w-full" debugPhase={debugPhase} />
          </Suspense>
        ) : (
          <CssMoon />
        )}
      </div>
    </div>
  );
};

export default MoonSignalMoon;
