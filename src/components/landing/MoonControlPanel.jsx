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
          <div className="pointer-events-auto mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/12 bg-[#070b14]/85 shadow-[0_-20px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            {/* header — live LED + day/date/time */}
            <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-2">
              <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
                <span className="relative flex h-2 w-2" title="Live moon status">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400/70 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.9)]" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/70">Lunar Control</span>
                <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-400">easter egg</span>
                <span className="h-3 w-px bg-white/10" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-slate-300">{dateStr}</span>
                <span className="font-mono text-[10px] tabular-nums text-lime-200/80">{timeStr}</span>
              </div>
              <button
                type="button"
                aria-label="Close lunar control"
                onClick={onClose}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/12 bg-white/5 text-white/70 transition-colors hover:border-cyan-200/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/60"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="grid gap-3 p-3 sm:grid-cols-[minmax(0,290px)_minmax(0,1fr)] sm:gap-4">
              {/* lunar distance board — compact */}
              <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">Lunar Distance</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-200/70">{data.phaseName}</span>
                </div>
                <div className="mt-0.5 font-space text-xl font-semibold tabular-nums text-white">
                  {distK}k <span className="text-xs font-normal text-slate-400">km</span>
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
                <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-white/8 pt-2 font-mono text-[10px] tabular-nums">
                  <span className="text-slate-400">Age <span className="text-slate-200">{data.age}d</span></span>
                  <span className="text-slate-400">Light <span className="text-cyan-100">{data.illumination}%</span></span>
                  <span className="text-slate-400">Tide <span className="text-teal-200">{data.tide}</span></span>
                </div>
              </div>

              {/* phase + condition controls — 2 rows on desktop */}
              <div className="flex flex-col justify-between gap-2">
                <div>
                  <div className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">Phase — drives the moon</div>
                  <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5">
                    {PHASES.map((p) => {
                      const on = activePhase === p.code;
                      return (
                        <button
                          key={p.code}
                          type="button"
                          onClick={() => selectPhase(p)}
                          className={`flex items-center justify-center gap-1 rounded-lg border px-1.5 py-1.5 transition-colors ${
                            on
                              ? 'border-cyan-300/50 bg-cyan-300/10'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]'
                          }`}
                        >
                          <span className="text-sm leading-none" aria-hidden="true">{p.glyph}</span>
                          <span className={`font-space text-[10px] font-semibold ${on ? 'text-cyan-100' : 'text-slate-300'}`}>{p.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">Conditions</span>
                  {CONDITIONS.map((c) => {
                    const on = activeAnomaly === c.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => toggleAnomaly(c.code)}
                        className={`rounded-lg border px-3 py-1 font-space text-[10px] font-semibold transition-colors ${
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
