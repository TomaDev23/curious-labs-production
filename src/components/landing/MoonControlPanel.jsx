import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from '../../FramerProvider';
import { getCurrentLunarData, getDistanceToEarth, getTideInfluence } from '../../utils/luneBridge';

/**
 * MoonControlPanel — the hero's lunar easter-egg.
 *
 * A NEW surface in the landing's design language (NOT the legacy board). It
 * docks to the BOTTOM of the hero so the moon stays fully visible above it —
 * the whole point is clicking phases and watching the real 3D moon change.
 * Only the lune *functions* are reused; the UI is bespoke.
 */

const PHASES = [
  { code: 'AUTO', name: 'Auto', value: null, glyph: '◐' },
  { code: 'NEW', name: 'New', value: 0, glyph: '🌑' },
  { code: 'WAX_C', name: 'Wax Cr.', value: 0.15, glyph: '🌒' },
  { code: 'FIRST', name: 'First ¼', value: 0.28, glyph: '🌓' },
  { code: 'WAX_G', name: 'Wax Gib.', value: 0.4, glyph: '🌔' },
  { code: 'FULL', name: 'Full', value: 0.5, glyph: '🌕' },
  { code: 'WAN_G', name: 'Wan Gib.', value: 0.6, glyph: '🌖' },
  { code: 'LAST', name: 'Last ¼', value: 0.72, glyph: '🌗' },
  { code: 'WAN_C', name: 'Wan Cr.', value: 0.85, glyph: '🌘' }
];

const CONDITIONS = [
  { code: 'supermoon', name: 'Supermoon' },
  { code: 'eclipse', name: 'Eclipse' }
];

// Tide rendered as a visual cue (arrow + short code) rather than the full word.
const TIDE = {
  High: { glyph: '▲', abbr: 'HI', rgb: '251,146,60' },
  Low: { glyph: '▼', abbr: 'LO', rgb: '56,189,248' },
  Neutral: { glyph: '≈', abbr: 'MID', rgb: '45,212,191' }
};

const PERIGEE = 356500;
const APOGEE = 406700;

const MoonControlPanel = ({ open, onPhaseChange, onAnomalyChange, onClose }) => {
  const [activePhase, setActivePhase] = useState('AUTO');
  const [activeAnomaly, setActiveAnomaly] = useState(null);
  const [now, setNow] = useState(() => new Date());

  const data = useMemo(() => {
    try {
      const lunar = getCurrentLunarData();
      const km = getDistanceToEarth();
      return { ...lunar, km, tide: getTideInfluence() };
    } catch {
      return { phase: 0, illumination: 0, age: 0, phaseName: 'Moon', km: 384400, tide: 'Neutral' };
    }
  }, []);

  // live clock while the panel is open (drives the LED + date/time readout)
  useEffect(() => {
    if (!open || typeof window === 'undefined') return undefined;
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearInterval(id);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const fmt = (opts) => {
    try { return new Intl.DateTimeFormat('en-GB', opts).format(now); } catch { return ''; }
  };
  const dateStr = fmt({ weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = fmt({ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  const selectPhase = (p) => {
    setActivePhase(p.code);
    onPhaseChange(p.value);
  };
  const toggleAnomaly = (code) => {
    const next = activeAnomaly === code ? null : code;
    setActiveAnomaly(next);
    onAnomalyChange(next);
  };

  const distK = Math.round(data.km / 1000);
  const markerPct = Math.min(100, Math.max(0, ((data.km - PERIGEE) / (APOGEE - PERIGEE)) * 100));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="false"
          aria-label="Lunar control"
        >
          <div className="pointer-events-auto mx-auto max-w-4xl overflow-hidden rounded-xl border border-white/12 bg-[#070b14]/85 shadow-[0_-20px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            {/* header — live LED + day/date/time */}
            <div className="flex items-center justify-between gap-3 border-b border-white/8 px-3 py-1.5">
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className="relative flex h-1.5 w-1.5" title="Live moon status">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400/70 motion-reduce:hidden" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.9)]" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-200/70">Lunar Control</span>
                <span className="rounded border border-white/10 bg-white/[0.04] px-1 py-0.5 font-mono text-[7px] uppercase tracking-[0.12em] text-slate-400">easter egg</span>
                <span className="h-2.5 w-px bg-white/10" aria-hidden="true" />
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-slate-300">{dateStr}</span>
                <span className="font-mono text-[9px] tabular-nums text-lime-200/80">{timeStr}</span>
              </div>
              <button
                type="button"
                aria-label="Close lunar control"
                onClick={onClose}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/12 bg-white/5 text-white/70 transition-colors hover:border-cyan-200/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/60"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="grid gap-2.5 p-2.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,370px)] sm:gap-3">
              {/* lunar distance — one wide module, the 3 readings combined into one chip */}
              <div className="flex flex-col justify-center rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">Lunar Distance</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-cyan-200/70">{data.phaseName}</span>
                </div>
                <div className="mt-0.5 flex items-end justify-between gap-3">
                  <div className="font-space text-2xl font-semibold tabular-nums leading-none text-white">
                    {distK}k <span className="text-xs font-normal text-slate-400">km</span>
                  </div>
                  {(() => {
                    const t = TIDE[data.tide] || TIDE.Neutral;
                    return (
                      <div className="flex items-center gap-2 rounded-md border border-white/8 bg-white/[0.03] px-2 py-1 font-mono text-[10px] tabular-nums">
                        <span><span className="text-slate-500">AGE </span><span className="text-slate-200">{data.age}d</span></span>
                        <span className="text-white/15">·</span>
                        <span><span className="text-slate-500">LUM </span><span className="text-cyan-100">{data.illumination}%</span></span>
                        <span className="text-white/15">·</span>
                        <span title={`Tide: ${data.tide}`}>
                          <span className="text-slate-500">TIDE </span>
                          <span className="font-semibold" style={{ color: `rgb(${t.rgb})` }}>{t.glyph} {t.abbr}</span>
                        </span>
                      </div>
                    );
                  })()}
                </div>
                <div className="relative mt-2 h-1.5 rounded-full bg-gradient-to-r from-rose-400/30 via-slate-500/30 to-cyan-400/30">
                  <span
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-amber-200 shadow-[0_0_10px_rgba(251,191,36,0.7)]"
                    style={{ left: `${markerPct}%` }}
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-1 flex justify-between font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500">
                  <span>356k perigee</span>
                  <span>407k apogee</span>
                </div>
              </div>

              {/* phase control: double-wide AUTO (armed LED) + 8 small square phases */}
              <div className="flex flex-col justify-between gap-2">
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">Phase</span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-500">
                      {activePhase === 'AUTO' ? 'auto-sync' : 'manual override'}
                    </span>
                  </div>
                  <div className="grid grid-cols-10 gap-1">
                    {(() => {
                      const armed = activePhase !== 'AUTO';
                      return (
                        <button
                          type="button"
                          onClick={() => selectPhase(PHASES[0])}
                          aria-label={armed ? 'Return to live auto phase' : 'Auto phase active'}
                          className={`col-span-2 flex items-center justify-center gap-1 rounded border transition-colors ${
                            armed ? 'border-red-400/50 bg-red-500/10' : 'border-lime-400/50 bg-lime-400/10'
                          }`}
                        >
                          <span className="relative flex h-1.5 w-1.5">
                            <span className={`absolute inline-flex h-full w-full rounded-full ${armed ? 'bg-red-400/70' : 'animate-ping bg-lime-400/70'} motion-reduce:hidden`} />
                            <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${armed ? 'bg-red-400' : 'bg-lime-400'}`} />
                          </span>
                          <span className={`font-space text-[10px] font-bold tracking-wide ${armed ? 'text-red-200' : 'text-lime-200'}`}>AUTO</span>
                        </button>
                      );
                    })()}
                    {PHASES.slice(1).map((p) => {
                      const on = activePhase === p.code;
                      return (
                        <button
                          key={p.code}
                          type="button"
                          title={p.name}
                          aria-label={p.name}
                          onClick={() => selectPhase(p)}
                          className={`flex aspect-square items-center justify-center rounded border transition-colors ${
                            on
                              ? 'border-cyan-300/60 bg-cyan-300/15'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]'
                          }`}
                        >
                          <span className="text-[13px] leading-none" aria-hidden="true">{p.glyph}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-500">Cond</span>
                  {CONDITIONS.map((c) => {
                    const on = activeAnomaly === c.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => toggleAnomaly(c.code)}
                        className={`rounded border px-2 py-0.5 font-space text-[10px] font-semibold transition-colors ${
                          on
                            ? 'border-amber-300/50 bg-amber-300/10 text-amber-100'
                            : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/25 hover:bg-white/[0.05]'
                        }`}
                      >
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoonControlPanel;
