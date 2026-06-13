import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from '../../FramerProvider';
import { SectionShell, SectionLabel, Reveal, Stagger, StaggerItem, ACCENTS, Lightbox } from './primitives';
import { useMediaState } from './hooks';
import {
  AEGIS_META,
  AEGIS_SLOS,
  AEGIS_COMPLIANCE,
  AEGIS_GATEWAY,
  AEGIS_SECURITY,
  AEGIS_CORE,
  AEGIS_LAYERS,
  AEGIS_OUTPUT,
  AEGIS_BRIEF_LEDE,
  AEGIS_DREAMS,
  AEGIS_LEGIT_PROTOCOL
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
  violet: '167,139,250',
  blue: '96,165,250'
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
    case 'blue':
      return { text: 'text-blue-200', dot: 'bg-blue-300', ring: 'border-blue-300/40' };
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
      <span key={pos} className={`pointer-events-none absolute h-4 w-4 border-white/15 ${pos}`} aria-hidden="true" />
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

const Reactor = ({ animate, accentRgb = RGB.cyan, size = 'h-44 w-44 sm:h-52 sm:w-52' }) => {
  const spin = animate ? '' : 'motion-reduce:animate-none';
  return (
    <div className={`relative grid place-items-center ${size}`} aria-hidden="true">
      {/* ambient bloom — tints toward the active layer (cool cyan at rest) */}
      <div
        className="pointer-events-none absolute h-[124%] w-[124%] rounded-full blur-md transition-colors duration-500"
        style={{ background: `radial-gradient(circle, rgba(${accentRgb},0.26), rgba(245,158,11,0.14) 42%, transparent 64%)` }}
      />

      {/* outer ring + orbiting nodes — ring picks up the active accent */}
      <div
        className={`absolute inset-0 rounded-full border transition-colors duration-500 ${animate ? 'animate-[spin_30s_linear_infinite]' : ''} ${spin}`}
        style={{ borderColor: `rgba(${accentRgb},0.35)` }}
      >
        {[0, 90, 180, 270].map((deg) => (
          <span key={deg} className="absolute inset-0" style={{ transform: `rotate(${deg}deg)` }}>
            <span
              className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: `rgba(${accentRgb},0.85)`, boxShadow: `0 0 8px rgba(${accentRgb},0.9)` }}
            />
          </span>
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

const TelemetryHud = ({ events, tintRgb }) => (
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
    <div className="rounded-lg border border-lime-300/25 bg-lime-300/[0.04] px-3 py-2">
      <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-lime-200/70">Events / s</div>
      <div className="mt-0.5 font-mono text-base font-semibold leading-none text-lime-200 tabular-nums">{events}</div>
    </div>
    {AEGIS_SLOS.map((slo) => (
      <div key={slo.label} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-slate-400">{slo.label}</div>
        <div
          className="mt-0.5 font-mono text-base font-semibold leading-none tabular-nums transition-colors duration-300"
          style={{ color: tintRgb ? `rgb(${tintRgb})` : 'rgb(254,243,199)' }}
        >
          {slo.value}
          <span className="ml-0.5 text-[10px] font-normal text-slate-400">{slo.unit}</span>
        </div>
        {slo.note && <div className="mt-0.5 font-mono text-[8px] text-teal-200/70">{slo.note}</div>}
      </div>
    ))}
  </div>
);

/* ------------------------------- conduits SVG ----------------------------- */

/**
 * MachineConduits — a single measured SVG overlay that draws the request path
 * (client → gateway → intake → core) and the six fan-out curves (core → each
 * layer), with colour-coded data packets travelling each path. Geometry is
 * measured from the live DOM so the curves track the real card positions at any
 * width. Packets use native SMIL <animateMotion> (cheap, GPU-composited,
 * auto-pauses when the tab is hidden) and only render when `animate` is true —
 * under reduced motion the paths stay lit but static.
 */
const MachineConduits = ({ geo, layers, activeCode, animate }) => {
  if (!geo || !geo.w || !geo.coreOut) return null;

  const { w, h, coreIn, coreOut, intakeRight, intakeTop, gatewayTop, gatewayBottom, client, layers: layerPts } = geo;

  const curve = (a, b) => {
    const dx = b.x - a.x;
    return `M ${a.x},${a.y} C ${a.x + dx * 0.5},${a.y} ${b.x - dx * 0.45},${b.y} ${b.x},${b.y}`;
  };
  const vcurve = (a, b) => `M ${a.x},${a.y} C ${a.x},${(a.y + b.y) / 2} ${b.x},${(a.y + b.y) / 2} ${b.x},${b.y}`;

  const fan = layerPts
    .map((pt, i) => {
      if (!pt) return null;
      const layer = layers[i];
      const rgb = RGB[layer.accent] || RGB.cyan;
      const active = activeCode === layer.code;
      const dim = activeCode && !active;
      return { id: `aegis-fan-${i}`, d: curve(coreOut, pt), rgb, active, dim, dur: active ? 1.7 : 2.7, delay: (i % 3) * 0.5 + (i >= 3 ? 0.25 : 0) };
    })
    .filter(Boolean);

  const feeds = [];
  if (client && gatewayTop) feeds.push({ id: 'aegis-c1', d: vcurve(client, gatewayTop), rgb: RGB.cyan, dur: 1.6, delay: 0 });
  if (gatewayBottom && intakeTop) feeds.push({ id: 'aegis-c2', d: vcurve(gatewayBottom, intakeTop), rgb: RGB.amber, dur: 1.6, delay: 0.45 });
  if (intakeRight && coreIn) feeds.push({ id: 'aegis-trunk', d: curve(intakeRight, coreIn), rgb: RGB.amber, dur: 2.0, delay: 0.2 });

  const all = [...feeds, ...fan];

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="aegis-packet-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      {/* static lit paths */}
      {all.map((p) => (
        <path
          key={p.id}
          d={p.d}
          stroke={`rgba(${p.rgb},${p.active ? 0.7 : p.dim ? 0.12 : 0.26})`}
          strokeWidth={p.active ? 1.5 : 1}
          strokeLinecap="round"
          style={{ transition: 'stroke 0.4s ease' }}
        />
      ))}

      {/* travelling packets */}
      {animate &&
        all.map((p) => (
          <g key={`${p.id}-pk`} opacity={p.dim ? 0.25 : 1} style={{ transition: 'opacity 0.4s ease' }}>
            {/* soft halo */}
            <circle r={p.active ? 5 : 4} fill={`rgb(${p.rgb})`} opacity="0.5" filter="url(#aegis-packet-glow)">
              <animateMotion dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" path={p.d} />
              <animate attributeName="opacity" values="0;0.5;0.5;0" keyTimes="0;0.12;0.82;1" dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            </circle>
            {/* core dot */}
            <circle r={p.active ? 2.6 : 2.1} fill="#fff">
              <animateMotion dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" path={p.d} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.82;1" dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
    </svg>
  );
};

/* ------------------------------- briefing -------------------------------- */

/**
 * AegisBriefing — the prose layer beneath the console. A sticky DREAMS acrostic
 * on the left, the X+B "spine" and the Legit invariants on the right. Reuses the
 * shared landing primitives so its entrance matches every other section. Lives
 * INSIDE the AEGIS SectionShell (no extra section / lazy boundary).
 */
/* Centered, ruled eyebrow (lines both sides) for the LEGIT module header. */
const CenterLabel = ({ children, tone = 'violet' }) => {
  const accent = ACCENTS[tone] || ACCENTS.violet;
  return (
    <div className={`mb-5 flex items-center justify-center gap-3 font-space text-[11px] font-semibold uppercase tracking-[0.2em] ${accent.label}`}>
      <span className={`h-px w-9 bg-gradient-to-l ${accent.rule}`} />
      <span>{children}</span>
      <span className={`h-px w-9 bg-gradient-to-r ${accent.rule}`} />
    </div>
  );
};

const AEGIS_ASSET = '/assets/aegis/aegis-machine.webp';
const AEGIS_ASSET_FULL = '/assets/aegis/aegis-machine-full.webp';

const AegisBriefing = () => {
  const [zoom, setZoom] = useState(false);

  return (
    <>
      {/* ── machine intelligence: DREAMS acrostic + visual asset ── */}
      <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        {/* LEFT — DREAMS acrostic */}
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel tone="amber">The DREAMS architecture</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-md text-[15px] leading-relaxed text-slate-300">{AEGIS_BRIEF_LEDE}</p>
          </Reveal>
          <Stagger className="mt-8 space-y-3" step={0.06}>
            {AEGIS_DREAMS.map((row) => {
              const a = accentClass(row.accent);
              return (
                <StaggerItem key={row.letter}>
                  <div className="flex items-start gap-4">
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-md border ${a.ring} bg-white/[0.03] font-space text-lg font-semibold ${a.text}`}
                      aria-hidden="true"
                    >
                      {row.letter}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <div className="font-space text-sm font-semibold text-white">{row.name}</div>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-slate-400">{row.blurb}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* RIGHT — machine visual (click to enlarge) */}
        <div className="lg:col-span-7">
          <Reveal y={28}>
            <figure className="lg:sticky lg:top-24">
              <button
                type="button"
                onClick={() => setZoom(true)}
                aria-label="Enlarge the AEGIS machine diagram"
                className="group relative block w-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.02] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <img
                  src={AEGIS_ASSET}
                  alt="AEGIS runtime machine — request pipeline flowing through the security layers into the core and fanning out to the DREAMS layers."
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                />
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  ⤢ Expand
                </span>
              </button>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                AEGIS V5 · request pipeline & layer fan-out — click to enlarge
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* ── LEGIT protocol ── */}
      <div className="mt-16 lg:mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <CenterLabel tone="violet">{AEGIS_LEGIT_PROTOCOL.eyebrow}</CenterLabel>
          </Reveal>
          <Reveal delay={0.05} as="h3">
            <span className="block bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 bg-clip-text font-space text-2xl font-semibold text-transparent sm:text-4xl">
              {AEGIS_LEGIT_PROTOCOL.title}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:mt-4 sm:text-[15px]">
              {AEGIS_LEGIT_PROTOCOL.lede}
            </p>
          </Reveal>
        </div>

        {/* Each card leads with its big LEGIT letter so scanning the row spells the
            acronym; the title + precise definition make it a real spec, not fluff. */}
        <Stagger className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-5" step={0.06}>
          {AEGIS_LEGIT_PROTOCOL.cards.map((card) => {
            const a = accentClass(card.accent);
            const rgb = RGB[card.accent] || RGB.cyan;
            return (
              <StaggerItem key={card.code} className="h-full">
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-xl border ${a.ring} bg-gradient-to-b from-white/[0.05] to-white/[0.012] p-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 sm:p-5`}
                  style={{ boxShadow: '0 0 0 0 rgba(0,0,0,0)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 30px -6px rgba(${rgb},0.45)`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0,0,0,0)'; }}
                >
                  {/* top accent hairline */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.8), transparent)` }}
                    aria-hidden="true"
                  />
                  {/* big letter watermark glow */}
                  <span
                    className="pointer-events-none absolute -right-3 -top-5 select-none font-space text-[5.5rem] font-semibold leading-none opacity-[0.06] sm:text-[7rem]"
                    style={{ color: `rgb(${rgb})` }}
                    aria-hidden="true"
                  >
                    {card.letter}
                  </span>

                  <div className="relative flex items-start justify-between">
                    <span
                      className="font-space text-4xl font-semibold leading-none sm:text-5xl"
                      style={{
                        backgroundImage: `linear-gradient(160deg, rgb(${rgb}), rgba(${rgb},0.4))`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent'
                      }}
                      aria-hidden="true"
                    >
                      {card.letter}
                    </span>
                    <span className={`font-mono text-[9px] tracking-[0.14em] sm:text-[10px] ${a.text} opacity-70`}>{card.code}</span>
                  </div>

                  <div className={`relative mt-3 font-space text-base font-semibold ${a.text}`}>{card.title}</div>
                  <p className="relative mt-1.5 text-xs leading-relaxed text-slate-400 sm:text-[13px]">{card.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      <Lightbox open={zoom} src={AEGIS_ASSET_FULL} alt="AEGIS machine — enlarged" onClose={() => setZoom(false)} />
    </>
  );
};

/* ------------------------------ stat posters ----------------------------- */

/**
 * StatBand — the runtime's credibility, rendered as full-bleed posters instead
 * of metadata. Four numbers (services · security · auth latency · invariants)
 * at clamp() display scale, hairline-divided, no card borders. Each counts up
 * once when the band scrolls into view (gated by the section's `animate`).
 */
const StatPoster = ({ value, decimals = 0, prefix = '', suffix = '', label, accent = false, animate, start }) => {
  const [n, setN] = useState(animate ? 0 : value);

  useEffect(() => {
    if (!animate || !start) {
      setN(value);
      return undefined;
    }
    let raf = 0;
    let t0 = 0;
    const dur = 1100;
    const tick = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [animate, start, value]);

  const display = decimals ? n.toFixed(decimals) : Math.round(n);
  return (
    <div className="flex min-w-0 flex-col px-5 py-5 sm:px-7 sm:py-6">
      <div
        className={`flex items-baseline whitespace-nowrap font-space font-semibold leading-none tabular-nums ${
          accent ? 'text-amber-200' : 'text-white'
        }`}
      >
        <span className="text-[clamp(2.5rem,5.4vw,5.75rem)]">
          {prefix}
          {display}
        </span>
        {suffix && (
          <span className="ml-1 text-[clamp(0.85rem,1.5vw,1.6rem)] font-medium text-slate-400">
            {suffix}
          </span>
        )}
      </div>
      <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:text-[11px]">
        {label}
      </div>
    </div>
  );
};

const StatBand = ({ animate }) => {
  const ref = useRef(null);
  const [start, setStart] = useState(!animate);

  useEffect(() => {
    if (!animate) return undefined;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setStart(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          io.disconnect();
        }
      },
      { rootMargin: '-12% 0px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [animate]);

  return (
    <div ref={ref} className="relative left-1/2 mt-10 w-screen -ml-[50vw] sm:mt-12">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-white/10 border-y border-white/10 lg:grid-cols-4 lg:divide-y-0">
          <StatPoster value={118} suffix="+" label="Coordinated services" animate={animate} start={start} />
          <StatPoster value={41} label="Security pipeline" animate={animate} start={start} />
          <StatPoster value={0.07} decimals={2} suffix="ms" label="JWT auth · p50" accent animate={animate} start={start} />
          <StatPoster value={5} suffix=" / 5" label="LEGIT invariants" animate={animate} start={start} />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------- section -------------------------------- */

export default function AegisMachine() {
  const reduce = useReducedMotion();
  const { isMobile } = useMediaState();
  const animate = !reduce && !isMobile;

  const [activeLayer, setActiveLayer] = useState(null);
  const [scanIndex, setScanIndex] = useState(0);
  const [events, setEvents] = useState(2048);

  // ── conduit geometry: measure card anchor points so the SVG curves track
  //    the real layout at any width (and after the display font swaps in). ──
  const [geo, setGeo] = useState(null);
  const diagramRef = useRef(null);
  const coreRef = useRef(null);
  const clientRef = useRef(null);
  const gatewayRef = useRef(null);
  const intakeRef = useRef(null);
  const layerRefs = useRef([]);

  useEffect(() => {
    const root = diagramRef.current;
    if (!root || typeof window === 'undefined') return undefined;

    const point = (el, side, base) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const midY = r.top - base.top + r.height / 2;
      const midX = r.left - base.left + r.width / 2;
      if (side === 'left') return { x: r.left - base.left, y: midY };
      if (side === 'right') return { x: r.right - base.left, y: midY };
      if (side === 'top') return { x: midX, y: r.top - base.top };
      if (side === 'bottom') return { x: midX, y: r.bottom - base.top };
      return { x: midX, y: midY };
    };

    const measure = () => {
      const base = root.getBoundingClientRect();
      if (!base.width) {
        setGeo((g) => (g ? null : g));
        return;
      }
      setGeo({
        w: base.width,
        h: base.height,
        client: point(clientRef.current, 'bottom', base),
        gatewayTop: point(gatewayRef.current, 'top', base),
        gatewayBottom: point(gatewayRef.current, 'bottom', base),
        intakeTop: point(intakeRef.current, 'top', base),
        intakeRight: point(intakeRef.current, 'right', base),
        coreIn: point(coreRef.current, 'left', base),
        coreOut: point(coreRef.current, 'right', base),
        layers: layerRefs.current.map((el) => point(el, 'left', base))
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    window.addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const activeRgb = activeLayer ? (RGB[activeLayer.accent] || RGB.cyan) : RGB.cyan;

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
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-base">
            A live look at the runtime: every request is authenticated, governed, and traced through{' '}
            {AEGIS_META.totalServices} coordinated services before anything reaches the product layer.
          </p>
        </Reveal>
      </div>

      {/* ===================== STAT BAND (numbers as posters) ===================== */}
      <StatBand animate={animate} />

      {/* ===================== THE CONSOLE (full-bleed) ===================== */}
      <Reveal delay={0.1} y={32} className="relative left-1/2 mt-8 w-screen -ml-[50vw] sm:mt-10">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.012] p-4 sm:p-6 lg:p-8">
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

          {/* ---------- DESKTOP: a tall pass-through console ---------- */}
          {/* INTAKE rail → REACTOR hub → LAYER fan, wired by the measured SVG. */}
          <div
            ref={diagramRef}
            className="relative z-10 hidden min-h-[480px] xl:min-h-[540px] lg:block"
          >
            <MachineConduits geo={geo} layers={AEGIS_LAYERS} activeCode={activeLayer?.code} animate={animate} />

            <div className="relative z-10 grid h-full grid-cols-[200px_1fr_430px] items-center gap-5 xl:grid-cols-[240px_1fr_540px]">
              {/* INTAKE rail */}
              <div className="flex flex-col gap-5">
                <div ref={clientRef}>
                  <IngressNode kicker="Client" title="User" sub="request" tone="cyan" />
                </div>
                <div ref={gatewayRef}>
                  <IngressNode kicker={`Gateway · ${AEGIS_GATEWAY.code}`} title={AEGIS_GATEWAY.name} sub={AEGIS_GATEWAY.role} tone="amber" />
                </div>
                <div ref={intakeRef}>
                  <SecurityIntake scanIndex={scanIndex} />
                </div>
              </div>

              {/* REACTOR hub */}
              <div className="flex flex-col items-center justify-center gap-3">
                <div ref={coreRef} className="flex flex-col items-center gap-2">
                  <Reactor animate={reactorOn} accentRgb={activeRgb} size="h-52 w-52 xl:h-80 xl:w-80" />
                  <CoreLabel />
                </div>
                <div className="rounded-lg border border-teal-300/40 bg-teal-300/[0.06] px-4 py-2 text-center shadow-[0_0_28px_-8px_rgba(45,212,191,0.55)]">
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-teal-200/80">Output</div>
                  <div className="font-space text-sm font-semibold text-white">{AEGIS_OUTPUT.name}</div>
                  <div className="font-mono text-[9px] text-teal-200/70">{AEGIS_OUTPUT.role}</div>
                </div>
              </div>

              {/* LAYER fan */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {AEGIS_LAYERS.map((layer, i) => (
                  <div key={layer.code} ref={(el) => { layerRefs.current[i] = el; }}>
                    <LayerModule
                      layer={layer}
                      active={activeLayer?.code === layer.code}
                      dim={activeLayer && activeLayer.code !== layer.code}
                      onActivate={() => setActiveLayer(layer)}
                      onClear={() => setActiveLayer(null)}
                    />
                  </div>
                ))}
              </div>
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
            <TelemetryHud events={events} tintRgb={activeLayer ? activeRgb : null} />
            <div className="mt-3 flex flex-wrap gap-1.5 sm:hidden">
              {AEGIS_COMPLIANCE.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        </div>
      </Reveal>

      {/* briefing: DREAMS architecture + X/B spine + Legit invariants */}
      <AegisBriefing />

      {/* CTA */}
      <Reveal delay={0.15} className="mt-12 text-center">
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
