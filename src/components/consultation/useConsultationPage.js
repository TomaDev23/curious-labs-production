import { useEffect } from 'react';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function targetFromHash() {
  let id;
  try {
    id = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return null;
  }
  if (!id) return null;
  return document.getElementById(id);
}

/**
 * Open the addressed reading row. On `hashchange` the element already exists,
 * so the browser performs the scroll itself and this is all that is needed.
 */
function applyHash() {
  const target = targetFromHash();
  if (target && target.matches('details.cl-reading')) {
    target.open = true;
  }
  return target;
}

/**
 * Land a cold deep link on its target.
 *
 * The route is lazy-rendered, so on a direct hit of `/ai-consultation#contribution`
 * the fragment target does not exist yet when the browser attempts its own
 * fragment scroll. It abandons that attempt and never retries, which left every
 * deep link sitting at the top of the page.
 *
 * One scroll on mount is not enough either: the cosmic background, the orbital
 * SVG and the webfonts all settle after first paint, and each one moves the
 * target. So this re-asserts the position until it sticks, then stops.
 */
function landOnHash() {
  const target = applyHash();
  if (!target) return () => {};

  let cancelled = false;
  let timer = 0;
  const deadline = Date.now() + 1500;

  const stop = () => {
    cancelled = true;
    clearTimeout(timer);
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    window.removeEventListener('keydown', stop);
  };
  // The visitor's own scrolling wins immediately.
  window.addEventListener('wheel', stop, { passive: true, once: true });
  window.addEventListener('touchstart', stop, { passive: true, once: true });
  window.addEventListener('keydown', stop, { once: true });

  const settle = () => {
    if (cancelled) return;
    const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    if (Math.abs(target.getBoundingClientRect().top - offset) > 2) {
      // 'instant', not 'auto': the root sets `scroll-behavior: smooth`, and
      // 'auto' defers to it — each re-assert would restart a smooth scroll
      // instead of landing. A deep link should arrive, not travel.
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    if (Date.now() < deadline) {
      // setTimeout rather than rAF: rAF does not run while the tab is hidden,
      // which is exactly when a link opened in a background tab needs this.
      timer = setTimeout(settle, 100);
    } else {
      stop();
    }
  };
  settle();

  return stop;
}

export default function useConsultationPage() {
  useEffect(() => {
    const onHashChange = () => applyHash();
    const stopLanding = landOnHash();
    window.addEventListener('hashchange', onHashChange);
    return () => {
      stopLanding();
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
}

export function openReading(id) {
  const target = document.getElementById(id);
  if (target && target.matches('details.cl-reading')) {
    target.open = true;
  }
}

export function closeReading(event) {
  const details = event.currentTarget.closest('details');
  if (!details) return;
  const summary = details.querySelector('summary');
  details.open = false;
  summary?.focus({ preventScroll: true });
  const top = summary?.getBoundingClientRect().top ?? 0;
  if (top < 85 || top > window.innerHeight - 60) {
    summary?.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}
