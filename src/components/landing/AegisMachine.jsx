import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from '../../FramerProvider';
import { SectionShell, SectionLabel, Reveal, ACCENTS } from './primitives';
import { useMediaState } from './hooks';
import {
  AEGIS_META,
  AEGIS_SLOS,
  AEGIS_COMPLIANCE,
  AEGIS_GATEWAY,
  AEGIS_SECURITY,
  AEGIS_CORE,
  AEGIS_LAYERS,
  AEGIS_OUTPUT
} from '../../data/aegisArchitecture';

/**
 * AegisMachine — "the Reactor Console".
 *
 * A gamified system map that SHOWS AEGIS as a living runtime instead of
 * describing it: a HUD-framed console where a request flows through a security
 * intake, into a rotating plasma reactor core, then fans out to six runtime
 * layers and powers the Moon Signal output. Energy pulses travel the conduits,
 * the core breathes, a scanline sweeps the frame, and the telemetry ticks.
 *
 * Data-driven from src/data/aegisArchitecture.js. All ambient motion is gated
 * by useReducedMotion + CSS motion-reduce; the layout collapses to a clean
 * vertical stack on mobile.
 */

/* rgba bases per accent so we can build glows/strokes at any alpha */
const RGB = {
  amber: '245,158,11',
  cyan: '56,189,248',
  teal: '45,212,191',
  lime: '190,242,100',
  violet: '167,139,250'
};

const accentClass = (tone) => {
  switch (tone) {
    case 'lime':
      return { text: 'text-lime-200', dot: 'bg-lime-300', ring: 'border-lime-300/40' };
    case 'amber':
      return { text: 'text-amber-200', dot: 'bg-amber-300', ring: 'border-amber-300/40' };
    case 'teal':
      return { text: 'text-teal-200', dot: 'bg-teal-300', ring: 'border-teal-300/40' };
    case 'violet':
      return { text: 'text-violet-200', dot: 'bg-violet-300', ring: 'border-violet-300/40' };
    case 'cyan':
    default:
      return { text: 'text-cyan-200', dot: 'bg-cyan-300', ring: 'border-cyan-300/40' };
  }
};

/* ------------------------------- HUD chrome ------------------------------ */

const CornerBrackets = () => (
  <>
    {[
      'left-2 top-2 border-l border-t',
      'right-2 top-2 border-r border-t',
      'left-2 bottom-2 border-l border-b',
      'right-2 bottom-2 border-r border-b'
    ].map((pos) => (
      <span key={pos} className={`pointer-events-none absolute h-4 w-4 border-amber-300/25 ${pos}`} aria-hidden="true" />
    ))}
  </>
);

const Scanline = ({ active }) => {
  if (!active) return null;
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-[linear-gradient(180deg,transparent,rgba(125,211,252,0.06)_60%,rgba(125,211,252,0.12))]"
      aria-hidden="true"
      initial={{ y: '-20%', opacity: 0 }}
      animate={{ y: ['-20%', '520%'], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 7, ease: 'linear', repeat: Infinity, repeatDelay: 3 }}
    />
  );
};

/* ------------------------------- reactor --------------------------------- */

const Reactor = ({ animate }) => {
  const spin = animate ? '' : 'motion-reduce:animate-none';
  return (
    <div className="relative grid h-44 w-44 place-items-center sm:h-52 sm:w-52" aria-hidden="true">
      {/* ambient bloom */}
      <div className="pointer-events-none absolute h-[120%] w-[120%] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.28),transparent_62%)] blur-md" />

      {/* outer ring + orbiting nodes */}
      <div className={`absolute inset-0 rounded-full border border-amber-300/25 ${animate ? 'animate-[spin_30s_linear_infinite]' : ''} ${spin}`}>
        {[0, 90, 180, 270].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-amber-200/80 shadow-[0_0_8px_rgba(245,158,11,0.9)]"
            style={{ transform: `rotate(${deg}deg) translateY(-50%) translateY(-${88}px)` }}
          />
        ))}
      </div>

      {/* mid dashed ring, counter-rotating */}
      <div className={`absolute inset-[15%] rounded-full border border-dashed border-amber-200/30 ${animate ? 'animate-[spin_20s_linear_infinite_reverse]' : ''} ${spin}`} />

      {/* inner ring */}
      <div className={`absolute inset-[28%] rounded-full border border-amber-100/20 ${animate ? 'animate-[spin_12s_linear_infinite]' : ''} ${spin}`} />

      {/* plasma core */}
      <motion.div
        className="relative h-[42%] w-[42%] rounded-full bg-[radial-gradient(circle_at_50%_36%,rgba(255,240,190,0.95),rgba(245,158,11,0.55)_52%,rgba(124,60,4,0.25))] shadow-[0_0_44px_rgba(245,158,11,0.45)]"
        animate={
          animate
            ? {
                scale: [1, 1.07, 1],
                boxShadow: [
                  '0 0 34px rgba(245,158,11,0.40)',
                  '0 0 60px rgba(245,158,11,0.62)',
                  '0 0 34px rgba(245,158,11,0.40)'
                ]
              }
            : undefined
        }
        transition={animate ? { duration: 3.4, ease: 'easeInOut', repeat: Infinity } : undefined}
      />
    </div>
  );
};

const CoreLabel = () => (
  <div className="text-center">
    <div className="font-space text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/70">Reactor</div>
    <div className="font-space text-base font-semibold text-white">{AEGIS_CORE.name}</div>
    <div className="font-mono text-[10px] text-slate-400">{AEGIS_CORE.role}</div>
  </div>
);

/* ------------------------------- conduits -------------------------------- */

/* a horizontal energy line with a travelling pulse */
const ConduitH = ({ pulse, tone = 'amber', className = '' }) => {
  const rgb = RGB[tone] || RGB.amber;
  return (
    <div className={`relative h-px w-full min-w-[28px] ${className}`} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, rgba(${rgb},0.05), rgba(${rgb},0.45), rgba(${rgb},0.05))` }} />
      {pulse && (
        <motion.span
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
          style={{ background: `rgb(${rgb})`, boxShadow: `0 0 10px rgba(${rgb},0.9)` }}
          animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5 }}
        />
      )}
    </div>
  );
};

const ConduitV = ({ pulse, tone = 'teal', className = '' }) => {
  const rgb = RGB[tone] || RGB.teal;
  return (
    <div className={`relative w-px ${className}`} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(${rgb},0.05), rgba(${rgb},0.5), rgba(${rgb},0.05))` }} />
      {pulse && (
        <motion.span
          className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
          style={{ background: `rgb(${rgb})`, boxShadow: `0 0 10px rgba(${rgb},0.9)` }}
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 }}
        />
      )}
    </div>
  );
};

/* ------------------------------- ingress --------------------------------- */

const IngressNode = ({ kicker, title, sub, tone = 'amber' }) => {
  const a = accentClass(tone);
  return (
    <div className={`rounded-lg border ${a.ring} bg-white/[0.03] px-3 py-2 text-center`}>
      <div className={`font-space text-[9px] uppercase tracking-[0.16em] ${a.text} opacity-80`}>{kicker}</div>
      <div className="font-space text-sm font-semibold leading-tight text-white">{title}</div>
      {sub && <div className="font-mono text-[9px] text-slate-400">{sub}</div>}
    </div>
  );
};

const SecurityIntake = ({ scanIndex }) => (
  <div className="rounded-xl border border-amber-300/20 bg-white/[0.02] p-2.5">
    <div className="mb-2 flex items-center justify-between">
      <span className="rounded border border-amber-300/30 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-amber-200">
        {AEGIS_SECURITY.code} · {AEGIS_SECURITY.count}
      </span>
      <span className="font-space text-[9px] uppercase tracking-[0.14em] text-amber-200/70">Security</span>
    </div>
    <div className="flex flex-col gap-1.5">
      {AEGIS_SECURITY.stages.map((stage, i) => {
        const hot = scanIndex === i;
        return (
          <div
            key={stage.id}
            className={`flex items-center gap-2 rounded-md border px-2 py-1 transition-colors duration-300 ${
              hot ? 'border-amber-300/60 bg-amber-300/10' : 'border-white/10 bg-white/[0.02]'
            }`}
          >
            <span className={`font-mono text-[9px] font-semibold ${hot ? 'text-amber-100' : 'text-amber-200/70'}`}>{stage.id}</span>
            <span className="font-space text-[11px] font-medium leading-tight text-white">{stage.name}</span>
            <span
              className={`ml-auto h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                hot ? 'bg-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.9)]' : 'bg-white/15'
              }`}
              aria-hidden="true"
            />
          </div>
        );
      })}
    </div>
  </div>
);

/* ------------------------------ layer module ----------------------------- */

const LayerModule = ({ layer, active, dim, onActivate, onClear }) => {
  const a = accentClass(layer.accent);
  const rgb = RGB[layer.accent] || RGB.cyan;
  return (
    <div
      onMouseEnter={onActivate}
      onMouseLeave={onClear}
      onFocus={onActivate}
      onBlur={onClear}
      tabIndex={0}
      role="group"
      aria-label={`${layer.name} layer, ${layer.count} services`}
      className={`group relative cursor-default rounded-lg border bg-white/[0.025] p-3 outline-none transition-[transform,border-color,background-color,opacity] duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${a.ring} ${
        active ? '-translate-y-0.5 bg-white/[0.06]' : ''
      } ${dim ? 'opacity-45' : 'opacity-100'}`}
      style={active ? { boxShadow: `0 0 24px rgba(${rgb},0.22)`, borderColor: `rgba(${rgb},0.6)` } : undefined}
    >
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 rounded border ${a.ring} bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] font-semibold ${a.text}`}>
          <span className="grid h-3.5 w-3.5 place-items-center rounded-sm bg-white/10 text-[9px] text-white">{layer.code}</span>
          <span className="text-white/60">{layer.count}</span>
        </span>
        <span className={`h-1.5 w-1.5 rounded-full ${a.dot} ${active ? 'shadow-[0_0_8px_currentColor]' : ''}`} aria-hidden="true" />
      </div>
      <div className="mt-2 font-space text-sm font-semibold text-white">{layer.name}</div>
      <ul className="mt-1.5 space-y-0.5">
        {layer.services.slice(0, 3).map((svc) => (
          <li key={svc} className="flex items-center gap-1.5 font-mono text-[10px] leading-tight text-slate-400">
            <span className="h-0.5 w-0.5 shrink-0 rounded-full bg-white/30" aria-hidden="true" />
            {svc}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ------------------------------ telemetry -------------------------------- */

const TelemetryHud = ({ events }) => (
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
    <div className="rounded-lg border border-lime-300/25 bg-lime-300/[0.04] px-3 py-2">
      <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-lime-200/70">Events / s</div>
      <div className="mt-0.5 font-mono text-base font-semibold leading-none text-lime-200 tabular-nums">{events}</div>
    </div>
    {AEGIS_SLOS.map((slo) => (
      <div key={slo.label} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-slate-400">{slo.label}</div>
        <div className="mt-0.5 font-mono text-base font-semibold leading-none text-amber-100">
          {slo.value}
          <span className="ml-0.5 text-[10px] font-normal text-slate-400">{slo.unit}</span>
        </div>
        {slo.note && <div className="mt-0.5 font-mono text-[8px] text-teal-200/70">{slo.note}</div>}
      </div>
    ))}
  </div>
);

/* -------------------------------- section -------------------------------- */

export default function AegisMachine() {
  const reduce = useReducedMotion();
  const { isMobile } = useMediaState();
  const animate = !reduce && !isMobile;

  const [activeLayer, setActiveLayer] = useState(null);
  const [scanIndex, setScanIndex] = useState(0);
  const [events, setEvents] = useState(2048);

  // security intake scan sweep
  useEffect(() => {
    if (!animate) return;
    const id = window.setInterval(() => {
      setScanIndex((i) => (i + 1) % AEGIS_SECURITY.stages.length);
    }, 900);
    return () => window.clearInterval(id);
  }, [animate]);

  // live-ish throughput ticker
  useEffect(() => {
    if (!animate) return;
    const id = window.setInterval(() => {
      setEvents(1850 + Math.round(Math.abs(Math.sin(performance.now() / 1700)) * 480));
    }, 1100);
    return () => window.clearInterval(id);
  }, [animate]);

  const reactorOn = animate;

  return (
    <SectionShell id="aegis" tone="amber" labelledBy="aegis-heading">
      {/* intro */}
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <SectionLabel tone="amber">Base Runtime</SectionLabel>
        </Reveal>
        <Reveal delay={0.05} as="h2">
          <span
            id="aegis-heading"
            className="block font-space text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            AEGIS is the operating system.{' '}
            <span className={ACCENTS.teal.text}>Moon Signal runs on it.</span>
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            A live look at the runtime: every request is authenticated, governed, and traced through{' '}
            {AEGIS_META.totalServices} coordinated services before anything reaches the product layer.
          </p>
        </Reveal>
      </div>

      {/* ===================== THE CONSOLE ===================== */}
      <Reveal delay={0.1} y={32} className="mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.012] p-4 sm:p-6">
          {/* faint HUD grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:34px_34px]"
            aria-hidden="true"
          />
          <CornerBrackets />
          <Scanline active={animate} />

          {/* top status bar */}
          <div className="relative z-10 mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-200/70">{AEGIS_META.tagline}</div>
              <div className="font-space text-sm font-semibold text-white">{AEGIS_META.name}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-slate-400">{AEGIS_META.totalServices} services</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-300/30 bg-lime-300/10 px-2.5 py-1 font-space text-[10px] font-semibold uppercase tracking-[0.12em] text-lime-200">
                <span className="relative flex h-1.5 w-1.5">
                  {animate && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300/70" />}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-300" />
                </span>
                {AEGIS_META.status}
              </span>
            </div>
          </div>

          {/* ---------- DESKTOP: ingress → core → layers ---------- */}
          <div className="relative z-10 hidden items-center gap-2 lg:flex">
            {/* ingress */}
            <div className="flex w-[210px] shrink-0 flex-col gap-2">
              <IngressNode kicker="Client" title="User" sub="request" tone="cyan" />
              <div className="mx-auto h-3"><ConduitV pulse={animate} tone="cyan" className="h-3" /></div>
              <IngressNode kicker={`Gateway · ${AEGIS_GATEWAY.code}`} title={AEGIS_GATEWAY.name} sub={AEGIS_GATEWAY.role} tone="amber" />
              <div className="mx-auto h-3"><ConduitV pulse={animate} tone="amber" className="h-3" /></div>
              <SecurityIntake scanIndex={scanIndex} />
            </div>

            {/* conduit into core */}
            <ConduitH pulse={animate} tone="amber" className="flex-1" />

            {/* core column */}
            <div className="flex shrink-0 flex-col items-center gap-2">
              <Reactor animate={reactorOn} />
              <CoreLabel />
              <ConduitV pulse={animate} tone="teal" className="h-5" />
              <div
                className="rounded-lg border border-teal-300/40 bg-teal-300/[0.06] px-3 py-2 text-center shadow-[0_0_24px_-8px_rgba(45,212,191,0.5)]"
              >
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-teal-200/80">Output</div>
                <div className="font-space text-sm font-semibold text-white">{AEGIS_OUTPUT.name}</div>
                <div className="font-mono text-[9px] text-teal-200/70">{AEGIS_OUTPUT.role}</div>
              </div>
            </div>

            {/* conduit out to layers (brightens to active layer accent) */}
            <ConduitH pulse={animate} tone={activeLayer ? activeLayer.accent : 'cyan'} className="flex-1" />

            {/* layers */}
            <div className="grid w-[400px] shrink-0 grid-cols-2 gap-2.5 xl:w-[440px]">
              {AEGIS_LAYERS.map((layer) => (
                <LayerModule
                  key={layer.code}
                  layer={layer}
                  active={activeLayer?.code === layer.code}
                  dim={activeLayer && activeLayer.code !== layer.code}
                  onActivate={() => setActiveLayer(layer)}
                  onClear={() => setActiveLayer(null)}
                />
              ))}
            </div>
          </div>

          {/* ---------- MOBILE: vertical stack ---------- */}
          <div className="relative z-10 flex flex-col items-center gap-3 lg:hidden">
            <div className="grid w-full max-w-xs grid-cols-2 gap-2">
              <IngressNode kicker="Client" title="User" sub="request" tone="cyan" />
              <IngressNode kicker={`Gateway · ${AEGIS_GATEWAY.code}`} title={AEGIS_GATEWAY.name} sub={AEGIS_GATEWAY.role} tone="amber" />
            </div>
            <div className="w-full max-w-xs">
              <SecurityIntake scanIndex={scanIndex} />
            </div>
            <ConduitV pulse={false} tone="amber" className="h-5" />
            <Reactor animate={reactorOn} />
            <CoreLabel />
            <ConduitV pulse={false} tone="cyan" className="h-5" />
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">runtime layers</div>
            <div className="grid w-full grid-cols-2 gap-2.5">
              {AEGIS_LAYERS.map((layer) => (
                <LayerModule
                  key={layer.code}
                  layer={layer}
                  active={false}
                  dim={false}
                  onActivate={() => {}}
                  onClear={() => {}}
                />
              ))}
            </div>
            <ConduitV pulse={false} tone="teal" className="h-5" />
            <div className="rounded-lg border border-teal-300/40 bg-teal-300/[0.06] px-4 py-2 text-center">
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-teal-200/80">Output</div>
              <div className="font-space text-sm font-semibold text-white">{AEGIS_OUTPUT.name}</div>
              <div className="font-mono text-[9px] text-teal-200/70">{AEGIS_OUTPUT.role}</div>
            </div>
          </div>

          {/* telemetry strip */}
          <div className="relative z-10 mt-6 border-t border-white/10 pt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-200/70">Telemetry · SLOs</span>
              <div className="hidden gap-1.5 sm:flex">
                {AEGIS_COMPLIANCE.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <TelemetryHud events={events} />
            <div className="mt-3 flex flex-wrap gap-1.5 sm:hidden">
              {AEGIS_COMPLIANCE.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal delay={0.15} className="mt-8 text-center">
        <Link
          to="/products/aegis"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-amber-300/45 bg-amber-300/10 px-7 font-space text-sm font-semibold text-amber-100 transition-colors hover:border-amber-200/75 hover:bg-amber-300/15 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-black"
        >
          Explore AEGIS
        </Link>
      </Reveal>
    </SectionShell>
  );
}
