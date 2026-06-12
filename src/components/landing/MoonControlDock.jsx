import React from 'react';

/**
 * MoonControlDock — a minimal, solid vertical capsule for the hero's right edge.
 * Shows the current moon phase glyph + illumination + age, and opens the full
 * lunar control surface on click. Purely presentational; the heavy control board
 * is loaded lazily by the parent only when this is clicked.
 */

const PHASE_GLYPHS = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

export const phaseGlyph = (phase = 0) => PHASE_GLYPHS[Math.round((phase % 1) * 8) % 8];

const MoonControlDock = ({ lunar, onOpen, className = '' }) => {
  const glyph = phaseGlyph(lunar?.phase ?? 0);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Lunar control — ${lunar?.phaseName || 'moon phase'}, ${lunar?.illumination ?? 0}% lit. Open controls.`}
      className={`group pointer-events-auto flex flex-col items-center gap-2.5 rounded-2xl border border-white/12 bg-white/[0.04] px-2.5 py-3 backdrop-blur-md transition-colors duration-300 hover:border-cyan-200/40 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60 ${className}`}
    >
      <span className="text-2xl leading-none drop-shadow-[0_0_10px_rgba(125,211,252,0.25)]" aria-hidden="true">
        {glyph}
      </span>
      <span className="h-px w-5 bg-white/15" aria-hidden="true" />
      <span className="font-mono text-[10px] tabular-nums leading-none text-cyan-100/90">{lunar?.illumination ?? 0}%</span>
      <span className="font-mono text-[10px] tabular-nums leading-none text-slate-400">{lunar?.age ?? 0}d</span>
      <span className="mt-0.5 rotate-180 font-space text-[9px] uppercase tracking-[0.22em] text-slate-500 transition-colors group-hover:text-cyan-200/70 [writing-mode:vertical-rl]">
        Lunar
      </span>
      <span
        className="grid h-5 w-5 place-items-center rounded-full border border-white/12 text-[10px] text-slate-400 transition-colors group-hover:border-cyan-200/40 group-hover:text-cyan-100"
        aria-hidden="true"
      >
        ⌃
      </span>
    </button>
  );
};

export default MoonControlDock;
