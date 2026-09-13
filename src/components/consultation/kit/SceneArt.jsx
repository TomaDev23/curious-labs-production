import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Full-bleed scene art plate: a `<picture>` with mobile/desktop avif+webp
 * sources, a CSS fallback gradient if the image 404s (QA-26), an optional
 * directional scrim, and low-amplitude parallax on desktop only (DR-06).
 */
function SceneArt({
  desktop,
  mobile,
  priority = false,
  position = 'center',
  scrim = 'none',
  className = '',
  parallax = 0
}) {
  const [failed, setFailed] = useState(false);
  const [desktopViewport, setDesktopViewport] = useState(false);
  const imgRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1100px)');
    setDesktopViewport(mq.matches);
    const onChange = (e) => setDesktopViewport(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const useParallax = parallax > 0 && desktopViewport && !reduced;

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], useParallax ? [-parallax, parallax] : [0, 0]);

  const mobileArt = mobile || desktop;

  return (
    <div
      className={`cl-art cl-art--scrim-${scrim} ${className}`.trim()}
      aria-hidden="true"
      style={{ '--cl-art-pos': position }}
    >
      {!failed && (
        <picture>
          <source media="(max-width: 767px)" type="image/avif" srcSet={mobileArt.avif} />
          <source media="(max-width: 767px)" type="image/webp" srcSet={mobileArt.webp} />
          <source type="image/avif" srcSet={desktop.avif} />
          <motion.img
            ref={imgRef}
            src={desktop.webp}
            width={desktop.width}
            height={desktop.height}
            alt=""
            decoding="async"
            loading={priority ? 'eager' : 'lazy'}
            fetchpriority={priority ? 'high' : 'auto'}
            onError={() => setFailed(true)}
            style={{ y }}
          />
        </picture>
      )}
    </div>
  );
}

export default SceneArt;
