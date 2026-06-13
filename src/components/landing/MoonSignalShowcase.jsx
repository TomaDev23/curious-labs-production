import React, { useEffect, useState } from 'react';
import {
  SectionShell,
  SectionLabel,
  Reveal,
  Stagger,
  StaggerItem,
  GlassPanel,
  ACCENTS,
  Lightbox
} from './primitives';
import { motion, useReducedMotion } from '../../FramerProvider';
import { useMediaState } from './hooks';

/**
 * MoonSignalShowcase
 *
 * The Moon Signal "qualities + preview" block. Sits between the AEGIS runtime
 * machine and the spotlight reveal. Narrative + qualities grid + swappable
 * screenshot placeholders. No 3D, no "coming soon" reveal — those live elsewhere.
 *
 * Tone: teal/cyan, calm motion. Surfaces are translucent so the persistent
 * cosmic starfield shows through.
 */

const QUALITIES = [
  {
    code: 'MSL-01',
    title: 'Deterministic Market State',
    body: 'Snapshots and deltas keep every decision grounded in calculated, repeatable market data.'
  },
  {
    code: 'MSL-02',
    title: 'Live/Replay Parity',
    body: 'Historical replays reuse the same context shape as live trading, so old windows can be rerun under matching conditions.'
  },
  {
    code: 'MSL-03',
    title: 'As-Of Research Discipline',
    body: 'As-of inputs and contract-locked math keep formulas reviewable instead of hard-coded into strategy instincts.'
  },
  {
    code: 'MSL-04',
    title: 'AEGIS Safety Layer',
    body: 'Monitor boards, bus bars, and emergency stops keep execution observable, governed, and ready to halt when needed.'
  }
];

/* ── Window chrome: the bar with 3 dots + faux URL ───────────────────── */
const WindowChrome = ({ url }) => (
  <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
    </div>
    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-white/10 bg-black/30 px-2.5 py-1">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300/70" aria-hidden="true" />
      <span className="truncate font-space text-[11px] tracking-wide text-slate-400">
        {url}
      </span>
    </div>
  </div>
);

/* ── Skeleton "chart" placeholder content ────────────────────────────── */
const SkeletonChart = () => (
  <div className="flex h-full flex-col gap-4" aria-hidden="true">
    {/* header row */}
    <div className="flex items-center justify-between">
      <div className="h-2.5 w-24 rounded-full bg-white/10" />
      <div className="h-2.5 w-10 rounded-full bg-teal-300/20" />
    </div>
    {/* bar chart */}
    <div className="flex flex-1 items-end gap-2">
      {[42, 68, 35, 80, 55, 72, 48, 90].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-teal-300/10 to-cyan-300/30"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
    {/* baseline */}
    <div className="h-px w-full bg-white/10" />
  </div>
);

/* ── Skeleton "list" placeholder content ─────────────────────────────── */
const SkeletonList = () => (
  <div className="flex h-full flex-col gap-3" aria-hidden="true">
    {[
      { w: 'w-3/4', dot: 'bg-teal-300/50' },
      { w: 'w-2/3', dot: 'bg-white/15' },
      { w: 'w-5/6', dot: 'bg-cyan-300/40' },
      { w: 'w-1/2', dot: 'bg-white/15' },
      { w: 'w-4/5', dot: 'bg-white/15' }
    ].map((row, i) => (
      <div key={i} className="flex items-center gap-3">
        <span className={`h-2 w-2 shrink-0 rounded-full ${row.dot}`} />
        <span className={`h-2.5 rounded-full bg-white/10 ${row.w}`} />
        <span className="ml-auto h-2.5 w-8 rounded-full bg-white/[0.07]" />
      </div>
    ))}
  </div>
);

/**
 * A single product "frame": window chrome + content area. When `src` is given,
 * renders the real image; otherwise renders an obvious, swappable placeholder.
 */
const ScreenshotFrame = ({ src, alt, caption, url, variant, className = '', fit = 'cover' }) => {
  const hasImage = Boolean(src);
  return (
    <figure className={`group ${className}`}>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-curious-dark-900/70 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-[2px] ring-1 ring-teal-300/15">
        <WindowChrome url={url} />
        <div className="relative aspect-[16/10] w-full bg-[radial-gradient(ellipse_at_50%_30%,rgba(45,212,191,0.10),transparent_62%),#071016]">
          {hasImage ? (
            <>
              <motion.img
                key={src}
                src={src}
                alt={alt || 'Moon Signal screenshot'}
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 h-full w-full scale-[1.04] blur-[1.5px] ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
              />
              {/* glass sheen: keeps the preview a hint, not a full disclosure */}
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_38%,rgba(7,16,22,0.16))]"
                aria-hidden="true"
              />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col bg-[radial-gradient(circle_at_50%_30%,rgba(45,212,191,0.08),transparent_60%)]">
              {/* swappable placeholder content */}
              <div className="flex-1 p-5">
                {variant === 'list' ? <SkeletonList /> : <SkeletonChart />}
              </div>
              {/* centered placeholder label */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="rounded-full border border-teal-300/20 bg-black/40 px-3 py-1 font-space text-[11px] uppercase tracking-[0.22em] text-teal-200/70 backdrop-blur-sm">
                  Moon Signal preview
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 font-space text-[11px] uppercase tracking-[0.16em] text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

const MOON_SIGNAL_SCREENSHOTS = [
  {
    src: '/moonsignal/Landing/2_Markers.svg',
    alt: 'Moon Signal marker workspace preview.',
    caption: 'Signal markers'
  },
  {
    src: '/moonsignal/Landing/3_Win.svg',
    alt: 'Moon Signal review window preview.',
    caption: 'Review window'
  },
  {
    src: '/moonsignal/Landing/4_Lab.svg',
    alt: 'Moon Signal research lab preview.',
    caption: 'Research lab'
  },
  {
    src: '/moonsignal/Landing/5_Lab.svg',
    alt: 'Moon Signal analysis lab preview.',
    caption: 'Analysis lab'
  }
];

const DEFAULT_SCREENSHOTS = MOON_SIGNAL_SCREENSHOTS;

const ScreenshotCarousel = ({ frames, reduce, isMobile }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || frames.length <= 1) return undefined;
    let interval = 0;
    const start = () => {
      if (interval || document.hidden) return;
      interval = window.setInterval(() => {
        setActive((current) => (current + 1) % frames.length);
      }, 3600);
    };
    const stop = () => {
      if (interval) window.clearInterval(interval);
      interval = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [frames.length, reduce]);

  const current = frames[active] || frames[0];
  const next = frames[(active + 1) % frames.length] || current;
  const ambient =
    reduce || isMobile
      ? undefined
      : {
          animate: { y: [0, -8, 0] },
          transition: { duration: 9, ease: 'easeInOut', repeat: Infinity }
        };

  return (
    <div className="relative">
      {!isMobile && !reduce && frames.length > 1 && (
        <motion.div
          {...ambient}
          className="pointer-events-none absolute -bottom-12 right-0 w-[58%] opacity-45 blur-[0.2px]"
          aria-hidden="true"
        >
          <ScreenshotFrame
            src={next.src}
            alt=""
            caption=""
            url="app.moonsignal.dev/research"
            fit="contain"
          />
        </motion.div>
      )}

      <ScreenshotFrame
        src={current.src}
        alt={current.alt}
        caption={current.caption}
        url="app.moonsignal.dev/signals"
        fit="contain"
        className="relative z-10 lg:max-w-[88%]"
      />

      {frames.length > 1 && (
        <div className="mt-4 flex gap-2" aria-label="Moon Signal preview carousel status">
          {frames.map((frame, index) => (
            <span
              key={frame.src}
              className={[
                'h-1.5 rounded-full transition-all duration-300',
                index === active ? 'w-8 bg-teal-200/80 shadow-[0_0_14px_rgba(94,234,212,0.45)]' : 'w-1.5 bg-white/20'
              ].join(' ')}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Math principles: the deterministic 6-stage signal pipeline ───────── */
const MATH_ASSET = '/moonsignal/Landing/ms_math_asset_1.png';

const MathPrinciples = () => {
  const [zoom, setZoom] = useState(false);

  return (
    <div className="mt-16 border-t border-white/[0.06] pt-14 sm:mt-20 sm:pt-16 lg:mt-24 lg:pt-20">
      <div className="max-w-2xl">
        <Reveal>
          <SectionLabel tone="teal">Math principles</SectionLabel>
        </Reveal>

        <Reveal delay={0.05} y={20}>
          <h3 className="font-space text-2xl font-semibold tracking-tight text-slate-100/90 sm:text-3xl">
            A deterministic signal pipeline
          </h3>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
            Every MoonSignal decision walks the same six contracted stages — from raw market
            state to a single, auditable output. Each stage is a reviewable formula rather than a
            black box: snapshots in, bounded confidence out, and contract validation gating
            anything that reaches execution.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} y={28} className="mt-9 sm:mt-11">
        <figure>
          <button
            type="button"
            onClick={() => setZoom(true)}
            aria-label="Enlarge the MoonSignal math pipeline diagram"
            className="group relative block w-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.02] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)] ring-1 ring-teal-300/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-200/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <img
              src={MATH_ASSET}
              alt="MoonSignal math pipeline — market state, feature field, confidence boundary, strategy consensus, contract validation, and signal output, each shown with its governing formula."
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              className="w-full transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              ⤢ Expand
            </span>
          </button>
          <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
            Market State → Feature Field → Confidence Boundary → Strategy Consensus → Contract Validation → Signal Output · click to enlarge
          </figcaption>
        </figure>
      </Reveal>

      <Lightbox
        open={zoom}
        src={MATH_ASSET}
        alt="MoonSignal math pipeline — enlarged"
        onClose={() => setZoom(false)}
      />
    </div>
  );
};

const MoonSignalShowcase = ({ screenshots }) => {
  const reduce = useReducedMotion();
  const { isMobile } = useMediaState();
  const accent = ACCENTS.teal;

  const frames =
    Array.isArray(screenshots) && screenshots.length > 0
      ? screenshots
      : MOON_SIGNAL_SCREENSHOTS;

  // The preview carousel owns the browser-frame motion and supplied SVG loop.
  return (
    <SectionShell id="moon-signal" tone="teal" labelledBy="moon-signal-heading" glow={false}>
      <div
        className="pointer-events-none absolute inset-x-0 -top-72 -z-10 h-[calc(100%+28rem)] bg-[radial-gradient(ellipse_at_72%_18%,rgba(20,184,166,0.10),rgba(20,184,166,0.045)_34%,transparent_68%),linear-gradient(180deg,transparent_0%,rgba(20,184,166,0.05)_24%,rgba(20,184,166,0.038)_60%,transparent_100%)]"
        style={{
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 20%, #000 66%, transparent 100%)',
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 20%, #000 66%, transparent 100%)'
        }}
        aria-hidden="true"
      />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ── Narrative + qualities ───────────────────────────────── */}
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel tone="teal">Current Project</SectionLabel>
          </Reveal>

          <Reveal delay={0.05} y={20}>
            <h2
              id="moon-signal-heading"
              className="font-space text-3xl font-semibold tracking-tight text-slate-100/90 sm:text-4xl"
            >
              MoonSignal
            </h2>
            <p className="mt-3 font-space text-lg font-medium text-teal-200/85">
              An algorithmic autonomous trading platform in development.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
              MoonSignal ingests and analyzes market data, executes trades,
              monitors them with dynamic ratcheting and trailing stop-loss, and
              manages positions to closure.
            </p>
          </Reveal>

          <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:gap-4" step={0.08}>
            {QUALITIES.map((q) => (
              <StaggerItem key={q.code}>
                <GlassPanel className="flex h-full flex-col p-4 sm:p-5">
                  <span className="font-space text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-200/70 sm:text-[11px] sm:tracking-[0.18em]">
                    {q.code}
                  </span>
                  <h3 className="mt-2.5 font-space text-sm font-semibold text-white sm:mt-3 sm:text-base">
                    {q.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-[13px]">
                    {q.body}
                  </p>
                  <span
                    className={`mt-3 h-px w-full bg-gradient-to-r ${accent.rule} sm:mt-4`}
                    aria-hidden="true"
                  />
                </GlassPanel>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* ── Screenshot frames ───────────────────────────────────── */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1} className="h-full">
            <ScreenshotCarousel frames={frames} reduce={reduce} isMobile={isMobile} />
          </Reveal>
        </div>
      </div>

      {/* ── Math principles band: the deterministic signal pipeline ─── */}
      <MathPrinciples />
    </SectionShell>
  );
};

export default MoonSignalShowcase;
