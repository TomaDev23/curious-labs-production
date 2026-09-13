import { useEffect, useState } from 'react';

const STORAGE_KEY = 'cl-hero-entry-played';

function hasPlayed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function markPlayed() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // Private/blocked storage — nothing to remember; replaying once more is harmless.
  }
}

function computeInitialPhase() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'final';
  if (window.location.hash) return 'final';
  if (hasPlayed()) return 'final';
  return 'entry';
}

/**
 * DR-11 hero entry choreography gate. The timeline itself is pure CSS
 * (`.he-playing` rules in sc-01-hero.css); this hook only decides whether to
 * play it at all, and cuts it short to the final state on any real input.
 */
export function useHeroEntry() {
  const [phase, setPhase] = useState(computeInitialPhase);

  useEffect(() => {
    if (phase !== 'entry') return undefined;

    const finish = () => setPhase('final');
    const fallbackTimer = setTimeout(finish, 3200);

    // #MGR-033: two bugs, both around "too eager, too early". (1) An
    // unconditional, immediately-attached scroll listener tripped on a
    // load-time scroll (restoration / layout shift) with no real input.
    // (2) Marking `markPlayed()` synchronously at mount poisoned the flag
    // for React StrictMode's dev-only mount→unmount→remount cycle: mount 1
    // marks it played, mount 2 reads that and starts straight in 'final'.
    // Fixing both by deferring everything — the played-flag write included —
    // to a delayed attach point, whose timer a throwaway mount's cleanup
    // cancels before it can fire.
    let scrollBaseline = 0;
    const onScroll = () => {
      if (Math.abs(window.scrollY - scrollBaseline) > 40) finish();
    };
    const intentEvents = ['wheel', 'touchmove', 'keydown', 'pointerdown'];

    const attachTimer = setTimeout(() => {
      markPlayed();
      scrollBaseline = window.scrollY;
      window.addEventListener('scroll', onScroll, { passive: true });
      intentEvents.forEach((type) => window.addEventListener(type, finish, { passive: true, once: true }));
    }, 300);

    return () => {
      clearTimeout(attachTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', onScroll);
      intentEvents.forEach((type) => window.removeEventListener(type, finish));
    };
  }, [phase]);

  return phase;
}
