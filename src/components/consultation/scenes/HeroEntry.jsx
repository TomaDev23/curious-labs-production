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
 * play it at all, and cuts it short to the final state on any user input.
 */
export function useHeroEntry() {
  const [phase, setPhase] = useState(computeInitialPhase);

  useEffect(() => {
    if (phase !== 'entry') return undefined;

    const finish = () => setPhase('final');
    const events = ['scroll', 'wheel', 'keydown', 'pointerdown', 'touchstart'];
    events.forEach((type) => window.addEventListener(type, finish, { passive: true, once: true }));
    const timer = setTimeout(finish, 3200);
    markPlayed();

    return () => {
      events.forEach((type) => window.removeEventListener(type, finish));
      clearTimeout(timer);
    };
  }, [phase]);

  return phase;
}
