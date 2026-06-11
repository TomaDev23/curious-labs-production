import React from 'react';
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
    title: 'Signal logic',
    body: 'Composable rules that turn raw inputs into reviewed, repeatable signals.'
  },
  {
    code: 'MSL-02',
    title: 'Research memory',
    body: 'Context that persists across sessions, so work resumes instead of starting cold.'
  },
  {
    code: 'MSL-03',
    title: 'Human-in-the-loop',
    body: 'Every decision stays reviewable and auditable — never a black box.'
  },
  {
    code: 'MSL-04',
    title: 'Runs on AEGIS',
    body: 'Governed, traceable execution inherited from the runtime beneath it.'
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
const ScreenshotFrame = ({ src, alt, caption, url, variant, className = '' }) => {
  const hasImage = Boolean(src);
  return (
    <figure className={`group ${className}`}>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-curious-dark-900/70 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-[2px] ring-1 ring-teal-300/10">
        <WindowChrome url={url} />
        <div className="relative aspect-[16/10] w-full">
          {hasImage ? (
            <img
              src={src}
              alt={alt || 'Moon Signal screenshot'}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
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

const DEFAULT_SCREENSHOTS = [
  { src: null, alt: '', caption: 'Signal dashboard — placeholder' },
  { src: null, alt: '', caption: 'Research log — placeholder' }
];

const MoonSignalShowcase = ({ screenshots }) => {
  const reduce = useReducedMotion();
  const { isMobile } = useMediaState();
  const accent = ACCENTS.teal;

  const frames =
    Array.isArray(screenshots) && screenshots.length > 0
      ? screenshots
      : DEFAULT_SCREENSHOTS;

  const primary = frames[0] || DEFAULT_SCREENSHOTS[0];
  const secondary = frames[1] || null;

  // Calm ambient float on the overlapping back frame — disabled on
  // reduced-motion and on mobile (where frames stack and there is no overlap).
  const ambient =
    reduce || isMobile
      ? undefined
      : {
          animate: { y: [0, -8, 0] },
          transition: { duration: 9, ease: 'easeInOut', repeat: Infinity }
        };

  return (
    <SectionShell id="moon-signal" tone="teal" labelledBy="moon-signal-heading">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        {/* ── Narrative + qualities ───────────────────────────────── */}
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel tone="teal">Current Project</SectionLabel>
          </Reveal>

          <Reveal delay={0.05} y={20}>
            <h2
              id="moon-signal-heading"
              className="font-space text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Moon Signal
            </h2>
            <p className={`mt-3 font-space text-lg font-medium ${accent.text}`}>
              An AI-assisted research and signal-design workbench.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
              Moon Signal is a focused space for research, signal logic, and
              human-reviewed decisions. It keeps the work, the reasoning, and the
              context in one place — built on the AEGIS runtime so every run is
              governed and traceable.
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
                    {q.body}
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
            {/* Mobile / tablet: stacked. Desktop: overlapping composition. */}
            <div className="relative">
              {/* primary frame */}
              <ScreenshotFrame
                src={primary.src}
                alt={primary.alt}
                caption={primary.caption}
                url="app.moonsignal.dev/signals"
                variant="chart"
                className="relative z-10 lg:max-w-[88%]"
              />

              {/* secondary frame: stacks below on mobile, overlaps on desktop */}
              {secondary && (
                <motion.div
                  {...ambient}
                  className="mt-6 lg:absolute lg:-bottom-12 lg:right-0 lg:mt-0 lg:w-[58%]"
                >
                  <ScreenshotFrame
                    src={secondary.src}
                    alt={secondary.alt}
                    caption={secondary.caption}
                    url="app.moonsignal.dev/research"
                    variant="list"
                  />
                </motion.div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
};

export default MoonSignalShowcase;
