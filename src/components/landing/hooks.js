import { useEffect, useRef, useState } from 'react';

/**
 * Shared media/viewport hooks for the CuriousLabs landing page.
 * Kept dependency-free (no scene context) so every landing component can
 * make the same mobile / reduced-motion decisions.
 */

export const useMediaState = () => {
  const [state, setState] = useState({
    isMobile: false,
    prefersReducedMotion: false
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mobileQuery = window.matchMedia('(max-width: 820px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateState = () => {
      setState({
        isMobile: mobileQuery.matches,
        prefersReducedMotion: motionQuery.matches
      });
    };

    updateState();
    mobileQuery.addEventListener?.('change', updateState);
    motionQuery.addEventListener?.('change', updateState);

    return () => {
      mobileQuery.removeEventListener?.('change', updateState);
      motionQuery.removeEventListener?.('change', updateState);
    };
  }, []);

  return state;
};

/**
 * Returns [ref, hasEntered]. hasEntered flips true once the node first
 * approaches the viewport (rootMargin look-ahead) and stays true. Use to
 * defer mounting of heavy content (3D, canvases) until it is near screen.
 */
export const useNearViewport = (rootMargin = '300px') => {
  const ref = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasEntered) return;

    if (typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasEntered, rootMargin]);

  return [ref, hasEntered];
};

/**
 * Tracks scroll progress (0 → 1) across a target element as it travels
 * through the viewport. Lightweight rAF-throttled scroll listener; respects
 * reduced motion by returning a static 0.5 so consumers can render a neutral
 * mid-state. Useful for scroll-linked visuals (e.g. the moon drift/brighten).
 */
export const useSectionProgress = (enabled = true) => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      setProgress(0.5);
      return;
    }

    let raf = 0;
    const compute = () => {
      raf = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the section's top hits the bottom of the viewport,
      // 1 when the section's bottom passes the top of the viewport.
      const raw = (vh - rect.top) / (vh + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled]);

  return [ref, progress];
};
