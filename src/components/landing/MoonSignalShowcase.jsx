import React, { useEffect, useState } from 'react';
import {
  SectionShell,
  SectionLabel,
  Reveal,
  Stagger,
  StaggerItem,
  GlassPanel,
  ACCENTS
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
    copy: 'As-of inputs and contract-locked math keep formulas reviewable instead of hard-coded into strategy instincts.',
    body: 'Every decision stays reviewable and auditable — never a black box.'
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
      <div className="overflow-hidden rounded-xl border border-white/10 bg-curious-dark-900/70 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-[2px] ring-1 ring-teal-300/10">
        <WindowChrome url={url} />
        <div className="relative aspect-[16/10] w-full bg-[#071016]">
          {hasImage ? (
            <img
              key={src}
              src={src}
              alt={alt || 'Moon Signal screenshot'}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
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
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % frames.length);
    }, 3600);
    return () => window.clearInterval(interval);
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
      {!isMobile && frames.length > 1 && (
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
        className="pointer-events-none absolute inset-x-0 -top-72 -z-10 h-[calc(100%+28rem)] bg-[radial-gradient(ellipse_at_72%_18%,rgba(20,184,166,0.20),rgba(20,184,166,0.09)_34%,transparent_68%),linear-gradient(180deg,transparent_0%,rgba(20,184,166,0.10)_24%,rgba(20,184,166,0.075)_62%,transparent_100%)]"
        style={{
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 18%, #000 78%, transparent 100%)',
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 18%, #000 78%, transparent 100%)'
        }}
        aria-hidden="true"
      />
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
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

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2" step={0.08}>
            {QUALITIES.map((q) => (
              <StaggerItem key={q.code}>
                <GlassPanel className="flex h-full flex-col p-5">
                  <span className="font-space text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-200/70">
                    {q.code}
                  </span>
                  <h3 className="mt-3 font-space text-base font-semibold text-white">
                    {q.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
                    {q.copy || q.body}
                  </p>
                  <span
                    className={`mt-4 h-px w-full bg-gradient-to-r ${accent.rule}`}
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
    </SectionShell>
  );
};

export default MoonSignalShowcase;
