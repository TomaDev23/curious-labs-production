import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from '../../FramerProvider';

/**
 * Landing-page design system.
 *
 * One restrained palette, one motion language, one set of section primitives —
 * so every section reads as part of the same machine, not a pile of templates.
 *
 * Palette intent:
 *   - base    : deep space (handled by LandingCosmicBackground)
 *   - lime     : primary action / "now"
 *   - amber    : AEGIS (the runtime / OS substrate)
 *   - teal/cyan : Moon Signal (the product on top)
 *   - violet   : writing / articles
 * Body copy is slate-300; muted labels slate-400/cyan-200.
 */

/* Glows pull from the :root accent CSS vars (src/index.css) so the whole page
 * shares one palette source. text/label/rule stay as Tailwind tokens. Labels
 * sit at /85 for legibility on the deep-space background. */
export const ACCENTS = {
  lime: {
    text: 'text-lime-300',
    label: 'text-lime-300/85',
    rule: 'from-lime-300/55 via-lime-300/15 to-transparent',
    glow: 'radial-gradient(circle at 50% 0%, rgb(var(--accent-now) / 0.10), transparent 45%)'
  },
  amber: {
    text: 'text-amber-200',
    label: 'text-amber-200/85',
    rule: 'from-amber-300/60 via-amber-300/15 to-transparent',
    glow: 'radial-gradient(circle at 16% 18%, rgb(var(--accent-aegis) / 0.06), transparent 36%)'
  },
  teal: {
    text: 'text-teal-200',
    label: 'text-teal-200/85',
    rule: 'from-teal-300/60 via-cyan-300/15 to-transparent',
    glow: 'radial-gradient(circle at 82% 28%, rgb(var(--accent-signal) / 0.11), transparent 44%)'
  },
  cyan: {
    text: 'text-cyan-200',
    label: 'text-cyan-200/85',
    rule: 'from-cyan-300/55 via-cyan-300/15 to-transparent',
    glow: 'radial-gradient(circle at 50% 30%, rgb(var(--accent-signal-2) / 0.10), transparent 45%)'
  },
  violet: {
    text: 'text-violet-200',
    label: 'text-violet-200/85',
    rule: 'from-violet-300/55 via-violet-300/15 to-transparent',
    glow: 'radial-gradient(circle at 78% 70%, rgb(var(--accent-write) / 0.10), transparent 42%)'
  }
};

const EASE = [0.22, 1, 0.36, 1];

/**
 * Eyebrow label: a short ruled tag above each section heading.
 */
export const SectionLabel = ({ children, tone = 'cyan' }) => {
  const accent = ACCENTS[tone] || ACCENTS.cyan;
  return (
    <div className={`mb-5 flex items-center gap-3 font-space text-[11px] font-semibold uppercase tracking-[0.18em] ${accent.label}`}>
      <span className={`h-px w-9 bg-gradient-to-r ${accent.rule}`} />
      <span>{children}</span>
    </div>
  );
};

/**
 * Reveal: the single scroll-entrance motion used everywhere. Fades + lifts
 * content once as it enters the viewport. Collapses to a plain element under
 * reduced-motion so nothing animates.
 */
export const Reveal = ({
  children,
  className,
  delay = 0,
  y = 24,
  as = 'div',
  once = true
}) => {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
};

/**
 * Stagger container + item — for grids/lists where children should cascade.
 * Use <Stagger><StaggerItem/>...</Stagger>.
 */
export const Stagger = ({ children, className, step = 0.08 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ visible: { transition: { staggerChildren: step } } }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className, y = 20 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * GlassPanel: the shared surface for cards/modules. Subtle translucent fill so
 * the cosmic background shows through; soft border; gentle hover lift.
 */
export const GlassPanel = ({ children, className = '', hover = true, as: Tag = 'div' }) => (
  <Tag
    className={[
      'relative rounded-xl border border-white/10 bg-white/[0.035] backdrop-blur-[2px]',
      'shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]',
      hover ? 'transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]' : '',
      className
    ].join(' ')}
  >
    {children}
  </Tag>
);

/**
 * Seam: an optional hairline divider with a soft glow, dropped between
 * sections to echo the old site's gradient "seams" without breaking the
 * continuous cosmic backdrop. Mostly the continuous background does the work;
 * use this sparingly where a section change wants a beat.
 */
export const Seam = ({ tone = 'cyan', className = '' }) => {
  const accent = ACCENTS[tone] || ACCENTS.cyan;
  return (
    <div className={`pointer-events-none relative mx-auto h-px w-full max-w-5xl ${className}`} aria-hidden="true">
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${accent.rule.replace('from-', 'via-').replace(' via-', ' ')} to-transparent`} />
    </div>
  );
};

/**
 * SectionShell: standard section wrapper. Transparent by default so the
 * persistent cosmic background flows through; an optional faint local accent
 * glow gives each section its own gravity without an opaque slab.
 */
export const SectionShell = ({
  id,
  children,
  tone,
  className = '',
  glow = true,
  labelledBy
}) => {
  const accent = ACCENTS[tone];
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate px-4 py-14 sm:px-6 sm:py-20 lg:py-28 lg:px-8 ${className}`}
    >
      {glow && accent && (
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: accent.glow }}
          aria-hidden="true"
        />
      )}
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
};

export const EASE_OUT = EASE;

/**
 * Lightbox: a full-bleed modal for enlarging a single image asset. Locks body
 * scroll while open, closes on Escape or backdrop click. Shared by the AEGIS
 * machine and the Moon Signal math-pipeline assets so they zoom identically.
 */
export const Lightbox = ({ open, src, alt, onClose }) => {
  useEffect(() => {
    if (!open || typeof document === 'undefined') return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[700] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={alt || 'Enlarged view'}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-white/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <motion.img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[94vw] rounded-lg border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
