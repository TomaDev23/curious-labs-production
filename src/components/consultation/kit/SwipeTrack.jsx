import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ClIcon } from '../ConsultationIcons';

/**
 * Phone: native scroll-snap track with a name index and prev/next controls.
 * Desktop (>= desktopFrom) / very small phones (< stackBelow): the same
 * markup becomes the scene's grid or a plain stack; controls and index
 * hide. The two breakpoints are per-instance, so they're emitted as a
 * scoped <style> block (a real media query per instance) rather than a
 * shared stylesheet rule — still CSS driving the layout switch, no JS
 * toggling of layout classes.
 */
function SwipeTrack({
  label,
  items,
  desktopLayout = 'grid',
  desktopFrom = 900,
  stackBelow = 360,
  onActiveChange
}) {
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const instanceClass = `cl-track-${reactId}`;
  const [active, setActive] = useState(0);
  const railRef = useRef(null);
  const itemRefs = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const index = itemRefs.current.indexOf(entry.target);
            if (index !== -1) setActive(index);
          }
        });
      },
      { root: rail, threshold: 0.6 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const goTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    const item = itemRefs.current[clamped];
    if (item) {
      item.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
    setActive(clamped);
  }, [items.length, reduced]);

  return (
    <div className={`cl-track ${instanceClass}`} role="group" aria-label={label} data-desktop-layout={desktopLayout}>
      <style>{`
        @media (min-width: ${desktopFrom}px) {
          .${instanceClass} .cl-track__index, .${instanceClass} .cl-track__prev, .${instanceClass} .cl-track__next { display: none; }
          .${instanceClass} .cl-track__rail { display: grid; overflow: visible; scroll-snap-type: none; }
          .${instanceClass} .cl-track__item { flex: unset; scroll-snap-align: unset; }
        }
        @media (max-width: ${stackBelow - 1}px) {
          .${instanceClass} .cl-track__index, .${instanceClass} .cl-track__prev, .${instanceClass} .cl-track__next { display: none; }
          .${instanceClass} .cl-track__rail { display: flex; flex-direction: column; overflow: visible; scroll-snap-type: none; }
          .${instanceClass} .cl-track__item { flex: unset; scroll-snap-align: unset; }
        }
      `}</style>

      <div className="cl-track__index">
        {items.map((item, i) => (
          <button key={item.id} type="button" aria-current={i === active} onClick={() => goTo(i)}>
            {item.name}
          </button>
        ))}
      </div>

      <button type="button" className="cl-track__prev" aria-label="Previous" disabled={active === 0} onClick={() => goTo(active - 1)}>
        <ClIcon name="arrow" />
      </button>
      <button type="button" className="cl-track__next" aria-label="Next" disabled={active === items.length - 1} onClick={() => goTo(active + 1)}>
        <ClIcon name="arrow" />
      </button>

      <ul className="cl-track__rail" ref={railRef}>
        {items.map((item, i) => (
          <li
            key={item.id}
            id={item.id}
            className="cl-track__item"
            ref={(el) => { itemRefs.current[i] = el; }}
            data-active={i === active ? 'true' : undefined}
          >
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SwipeTrack;
