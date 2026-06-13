import React, { useState } from 'react';
import {
  SectionShell,
  SectionLabel,
  Reveal,
  Stagger,
  StaggerItem,
  Lightbox
} from './primitives';

/**
 * MoonSignalShowcase
 *
 * The Moon Signal section. Reworked so the deterministic math PIPELINE is the
 * centerpiece (it is the strongest asset on the page) and the product story is
 * told as a spec sheet, not a fake SaaS dashboard:
 *   - an editorial header: oversized off-grid wordmark + a mono spec block,
 *   - a differentiated capability rail (3 teal modules + the promoted amber
 *     AEGIS-safety module), each leading with a proof-metric of DISCIPLINE
 *     (replay drift, lookahead leaks…) — credible for a stealth product,
 *   - the full-width pipeline asset, bled into the rail with a teal glow (no
 *     hard divider).
 *
 * Tone: teal/cyan, calm. Surfaces stay translucent so the cosmic starfield
 * shows through.
 */

const QUALITIES = [
  {
    code: 'MSL-01',
    title: 'Deterministic Market State',
    body: 'Snapshots and deltas keep every decision grounded in calculated, repeatable market data.',
    metricLabel: 'Replay drift',
    metricValue: '0.00'
  },
  {
    code: 'MSL-02',
    title: 'Live / Replay Parity',
    body: 'Replays reuse the same context shape as live trading, so old windows rerun under matching conditions.',
    metricLabel: 'Code paths',
    metricValue: '1'
  },
  {
    code: 'MSL-03',
    title: 'As-Of Research Discipline',
    body: 'As-of inputs and contract-locked math keep formulas reviewable instead of baked into strategy instincts.',
    metricLabel: 'Lookahead leaks',
    metricValue: '0'
  },
  {
    code: 'MSL-04',
    title: 'AEGIS Safety Layer',
    body: 'Monitor boards, bus bars and emergency stops keep execution observable, governed and ready to halt.',
    metricLabel: 'Stages gated',
    metricValue: '6 / 6',
    promoted: true
  }
];

// Mono spec block beside the wordmark — reads as a system readout, not a dek.
const SPEC = [
  ['Status', 'Bootstrapping'],
  ['Runtime', 'AEGIS'],
  ['Class', 'Autonomous quant'],
  ['Stages', '6 contracted']
];

/**
 * CapabilityCard — replaces the uniform glass box. Three teal "open module"
 * cards (left accent bar, no glass) + one promoted amber SignalCard for the
 * AEGIS safety layer, so the row reads as a relationship, not four equals.
 */
const CapabilityCard = ({ q }) => {
  const promoted = q.promoted;
  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl p-5 transition-colors duration-300 ${
        promoted
          ? 'border border-amber-300/40 bg-amber-300/[0.05] shadow-[0_0_0_1px_rgba(245,158,11,0.12),0_0_36px_-12px_rgba(245,158,11,0.5)]'
          : 'border-y border-r border-l-2 border-white/[0.08] border-l-teal-300/55 bg-white/[0.02] hover:bg-white/[0.045]'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-200/70">
          {q.code}
        </span>
        {promoted && (
          <span className="rounded border border-amber-300/40 bg-amber-300/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-100">
            → AEGIS
          </span>
        )}
      </div>
      <h3 className="mt-3 font-space text-sm font-semibold text-white sm:text-[15px]">{q.title}</h3>
      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-400 sm:text-[13px]">{q.body}</p>
      <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-[0.1em]">
        <span className={`h-1 w-1 rounded-full ${promoted ? 'bg-amber-300/80' : 'bg-teal-300/70'}`} aria-hidden="true" />
        <span className="text-slate-500">{q.metricLabel}</span>
        <span className={`ml-auto tabular-nums ${promoted ? 'text-amber-100/90' : 'text-teal-200/90'}`}>
          {q.metricValue}
        </span>
      </div>
    </div>
  );
};

/* ── Math principles: the deterministic 6-stage signal pipeline (centerpiece) ─ */
const MATH_ASSET = '/moonsignal/Landing/ms_math_asset_1.png';

const MathPrinciples = () => {
  const [zoom, setZoom] = useState(false);

  return (
    <div className="relative mt-12 pt-10 sm:mt-16 sm:pt-12 lg:mt-20">
      {/* teal bleed connecting the capability rail to the pipeline — replaces
          the old hard border-t divider with a soft Z-overlap. */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 h-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(45,212,191,0.12),transparent_72%)]"
        aria-hidden="true"
      />

      <div className="max-w-2xl">
        <Reveal>
          <SectionLabel tone="teal">Math principles</SectionLabel>
        </Reveal>

        <Reveal delay={0.05} y={20}>
          <h3 className="font-space text-2xl font-semibold tracking-tight text-slate-100/90 sm:text-3xl">
            Six contracted stages. One auditable output.
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

const MoonSignalShowcase = () => {
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

      {/* ── Editorial header: oversized off-grid wordmark + mono spec block ── */}
      <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <Reveal>
            <SectionLabel tone="teal">Current Project</SectionLabel>
          </Reveal>
          <Reveal delay={0.05} y={20}>
            <h2
              id="moon-signal-heading"
              className="font-space font-semibold leading-[0.9] tracking-[-0.02em] text-slate-100/95 text-[clamp(3rem,9vw,8.5rem)]"
            >
              MoonSignal
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl font-space text-lg font-medium text-teal-200/85 sm:text-xl">
              An autonomous quant platform, built so the math can be audited — not trusted.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:pb-4">
          <Reveal delay={0.14}>
            <dl className="space-y-2.5 border-l-2 border-teal-300/40 pl-4 font-mono text-[11px] uppercase tracking-[0.16em]">
              {SPEC.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="text-teal-200/85">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-slate-300">
          MoonSignal ingests and analyzes market data, executes trades, monitors them with
          dynamic ratcheting and trailing stop-loss, and manages positions to closure.
        </p>
      </Reveal>

      {/* ── Capability rail: differentiated modules, AEGIS-safety promoted ── */}
      <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.08}>
        {QUALITIES.map((q) => (
          <StaggerItem key={q.code} className="h-full">
            <CapabilityCard q={q} />
          </StaggerItem>
        ))}
      </Stagger>

      {/* ── Pipeline centerpiece (promoted; the page's strongest visual) ─── */}
      <MathPrinciples />
    </SectionShell>
  );
};

export default MoonSignalShowcase;
