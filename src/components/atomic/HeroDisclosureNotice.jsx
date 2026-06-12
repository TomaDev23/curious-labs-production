import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from '../../FramerProvider';

/**
 * HeroDisclosureNotice — a one-per-session modal. Now scoped to the LEGACY
 * (original) site only; the new landing no longer shows it. Prop-driven so the
 * same component can carry different copy / storage key if reused elsewhere.
 * Defaults describe the legacy/original site.
 */
const DEFAULTS = {
  storageKey: 'curiouslabs-legacy-disclosure-seen',
  tag: 'Archive note',
  title: 'You’re viewing the original site.',
  paragraphs: [
    'This is the original CuriousLabs homepage, kept online as an archive to explore. It was built for fun by a vibe coder who started with zero experience in tech, code, or AI, then learned by poking at the early AI tools of 2025 until something delightfully real took shape.',
    'It is happiest on desktop and is left largely as-is — mobile may arrive wearing one shoe and a brave smile. For the latest work, head back to the new Moon Signal landing page.'
  ],
  footnote: 'The new Moon Signal landing is where current work lives.',
  buttonLabel: 'Got it, show me the original'
};

const HeroDisclosureNotice = ({
  storageKey = DEFAULTS.storageKey,
  tag = DEFAULTS.tag,
  title = DEFAULTS.title,
  paragraphs = DEFAULTS.paragraphs,
  footnote = DEFAULTS.footnote,
  buttonLabel = DEFAULTS.buttonLabel
} = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const closeButtonRef = useRef(null);

  const handleDismiss = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(storageKey, 'true');
      } catch {
        // Session storage can be blocked in private or hardened browsers.
      }
    }

    setIsVisible(false);
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      setIsVisible(window.sessionStorage.getItem(storageKey) !== 'true');
    } catch {
      setIsVisible(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!isVisible || typeof window === 'undefined' || typeof document === 'undefined') return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDismiss, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[600] flex items-center justify-center bg-black/95 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="hero-disclosure-title"
            aria-describedby="hero-disclosure-copy"
            className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-lg border border-lime-300/25 bg-[#05070d] p-5 text-left shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close site note"
              onClick={handleDismiss}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-lime-300/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-lime-300/70"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-lime-300/20 bg-lime-300/10 px-3 py-1.5 font-space text-[11px] font-semibold uppercase tracking-[0.18em] text-lime-200">
              {tag}
            </div>

            <h2 id="hero-disclosure-title" className="font-space text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {title}
            </h2>

            <div id="hero-disclosure-copy" className="mt-4 space-y-4 text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {footnote && (
                <p className="font-space text-xs uppercase tracking-[0.16em] text-cyan-200/70">
                  {footnote}
                </p>
              )}

              <button
                type="button"
                onClick={handleDismiss}
                className="shrink-0 rounded-lg bg-lime-300 px-5 py-3 font-space text-sm font-semibold text-curious-dark-950 transition-colors hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-lime-200 focus:ring-offset-2 focus:ring-offset-black"
              >
                {buttonLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroDisclosureNotice;
