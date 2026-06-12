import React, { useEffect, useRef } from 'react';
import { useMediaState } from './hooks';
import useFlowingScrollProgress from '../../hooks/useFlowingScrollProgress';

/**
 * LandingCosmicBackground
 *
 * One persistent, fixed backdrop behind ALL landing-page content so the page
 * reads as a single continuous space. This is the connective tissue that gives
 * the page its "flow".
 *
 * Layers (back to front):
 *   1. deep-space base gradient
 *   2. a real galaxy (milky way) image whose opacity RAMPS IN on scroll — the
 *      hero stays clean/dark, then the page transitions into the galaxy as you
 *      scroll past it, and it persists for the rest of the page
 *   3. a performance-tiered canvas starfield (gentle twinkle + slow drift)
 *   4. a soft vignette
 *
 * Self-contained: no scene context. Mobile + reduced-motion aware.
 */
const GALAXY_SRC = '/assets/images/planets/4k/milkyway_Light.webp';

const LandingCosmicBackground = () => {
  const canvasRef = useRef(null);
  const galaxyRef = useRef(null);
  const { isMobile, prefersReducedMotion } = useMediaState();

  /* ---- galaxy image: defer the 4K WebP off the critical path. It's invisible
     (opacity 0) until the hero scrolls away, so there's no reason to fetch it
     during first paint — load it on idle once the hero has rendered. ---- */
  useEffect(() => {
    const node = galaxyRef.current;
    if (!node) return undefined;
    let cancelled = false;
    const load = () => {
      if (!cancelled && galaxyRef.current) {
        galaxyRef.current.style.backgroundImage = `url("${GALAXY_SRC}")`;
      }
    };
    const ric = typeof window !== 'undefined' ? window.requestIdleCallback : null;
    const handle = ric ? ric(load, { timeout: 2500 }) : window.setTimeout(load, 1800);
    return () => {
      cancelled = true;
      if (ric && window.cancelIdleCallback) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  /* ---- galaxy: fade IN across the mid page, then fade OUT toward the bottom
     so the hero starts (and the footer ends) on the clean starry base. ---- */
  useFlowingScrollProgress({
    mode: 'document',
    stateful: false,
    onUpdate: (p) => {
      const node = galaxyRef.current;
      if (!node) return;

      const smooth = (a, b, t) => {
        const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
        return x * x * (3 - 2 * x);
      };
      const maxOpacity = isMobile ? 0.3 : 0.5;
      const fadeIn = smooth(0.1, 0.32, p); // hero clean → galaxy rises mid-page
      const fadeOut = 1 - smooth(0.74, 0.97, p); // → recedes back to starry at the end
      node.style.opacity = String(maxOpacity * fadeIn * fadeOut);
    }
  });

  /* ---- starfield ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    const count = isMobile ? 70 : 170;
    const makeStars = () =>
      Array.from({ length: count }, () => {
        const roll = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: roll > 0.92 ? Math.random() * 1.5 + 1.1 : Math.random() * 1.0 + 0.3,
          baseAlpha: Math.random() * 0.45 + 0.3,
          twinkleSpeed: Math.random() * 0.7 + 0.15,
          twinklePhase: Math.random() * Math.PI * 2,
          drift: Math.random() * 0.05 + 0.015,
          tint: roll > 0.95 ? '125,211,252' : roll < 0.04 ? '251,191,36' : '255,255,255'
        };
      });

    let stars = makeStars();

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.tint}, ${s.baseAlpha})`;
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (prefersReducedMotion) {
      drawStatic();
      const onResizeStatic = () => {
        setSize();
        stars = makeStars();
        drawStatic();
      };
      window.addEventListener('resize', onResizeStatic);
      return () => window.removeEventListener('resize', onResizeStatic);
    }

    let raf = 0;
    let last = 0;
    let elapsed = 0;
    const targetFps = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFps;

    const animate = (now) => {
      raf = requestAnimationFrame(animate);
      const delta = now - last;
      if (delta < frameInterval) return;
      last = now;
      elapsed += delta / 1000;

      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        s.y += s.drift;
        if (s.y > height + 2) {
          s.y = -2;
          s.x = Math.random() * width;
        }
        const twinkle = 0.5 + 0.5 * Math.sin(elapsed * s.twinkleSpeed + s.twinklePhase);
        const alpha = s.baseAlpha * (0.45 + 0.55 * twinkle);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.tint}, ${alpha})`;
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        if (s.size > 1.1) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${s.tint}, ${alpha * 0.14})`;
          ctx.arc(s.x, s.y, s.size * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    raf = requestAnimationFrame(animate);

    const onResize = () => {
      setSize();
      stars = makeStars();
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [isMobile, prefersReducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* 1. deep-space base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(20,184,166,0.08),transparent_44%),linear-gradient(180deg,#02040a_0%,#04070f_45%,#020308_100%)]" />
      {/* 2. galaxy — fades in on scroll */}
      <div
        ref={galaxyRef}
        className="absolute inset-0 bg-cover bg-center opacity-0 will-change-[opacity]"
        style={{
          // backgroundImage is set on idle (see effect above) to keep the 4K
          // WebP off the first-paint critical path.
          filter: 'saturate(1.05) brightness(0.9)'
        }}
      />
      {/* color wash to bind the galaxy to the brand palette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(45,212,191,0.05),transparent_55%),radial-gradient(circle_at_18%_88%,rgba(167,139,250,0.05),transparent_45%)]" />
      {/* 3. starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* 4. vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
};

export default LandingCosmicBackground;
