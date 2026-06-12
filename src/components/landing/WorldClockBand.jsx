import React, { useEffect, useRef, useState } from 'react';

/**
 * WorldClockBand — a compact "mission time" banner in the landing's design
 * language. Separate from the lunar module. Behaviour:
 *   • floats in at the bottom of the viewport once you scroll past the hero,
 *   • fades out when scrolling stops (so it never blocks reading),
 *   • returns on scroll, and finally DOCKS in-flow above the footer at the end.
 * A single 1s tick runs only while the band is active and the tab is visible.
 */

const CITIES = [
  { code: 'LAX', flag: '🇺🇸', tz: 'America/Los_Angeles', c: '56,189,248' },
  { code: 'NYC', flag: '🇺🇸', tz: 'America/New_York', c: '56,189,248' },
  { code: 'SAO', flag: '🇧🇷', tz: 'America/Sao_Paulo', c: '34,197,94' },
  { code: 'LON', flag: '🇬🇧', tz: 'Europe/London', c: '96,165,250' },
  { code: 'PAR', flag: '🇫🇷', tz: 'Europe/Paris', c: '129,140,248' },
  { code: 'BER', flag: '🇩🇪', tz: 'Europe/Berlin', c: '251,191,36' },
  { code: 'TLV', flag: '🇮🇱', tz: 'Asia/Jerusalem', c: '56,189,248' },
  { code: 'DXB', flag: '🇦🇪', tz: 'Asia/Dubai', c: '45,212,191' },
  { code: 'DEL', flag: '🇮🇳', tz: 'Asia/Kolkata', c: '251,146,60' },
  { code: 'BEJ', flag: '🇨🇳', tz: 'Asia/Shanghai', c: '248,113,113' },
  { code: 'TYO', flag: '🇯🇵', tz: 'Asia/Tokyo', c: '248,113,113' },
  { code: 'SYD', flag: '🇦🇺', tz: 'Australia/Sydney', c: '45,212,191' }
];

const fmt = (date, tz, seconds = false) => {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      ...(seconds ? { second: '2-digit' } : {})
    }).format(date);
  } catch {
    return '--:--';
  }
};

const ClockStrip = ({ date }) => (
  <div className="mx-auto flex max-w-7xl items-center gap-3 rounded-xl border border-white/10 bg-[#070b14]/80 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md sm:gap-4 sm:px-4">
    {/* UTC mission time */}
    <div className="flex shrink-0 items-center gap-2 border-r border-white/10 pr-3 sm:pr-4">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300/60 motion-reduce:hidden" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-300" />
      </span>
      <div>
        <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-lime-200/70">Mission Time</div>
        <div className="font-mono text-sm leading-none tabular-nums text-white">
          {fmt(date, 'UTC', true)}
          <span className="ml-1 text-[8px] text-slate-500">UTC</span>
        </div>
      </div>
    </div>

    {/* city strip */}
    <div className="flex flex-1 items-center gap-3 overflow-x-auto sm:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {CITIES.map((c) => (
        <div key={c.code} className="flex shrink-0 items-center gap-1.5">
          <span className="text-sm leading-none" aria-hidden="true">{c.flag}</span>
          <span className="font-space text-[11px] font-semibold text-slate-200">{c.code}</span>
          <span className="font-mono text-[11px] tabular-nums" style={{ color: `rgb(${c.c})` }}>
            {fmt(date, c.tz)}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const WorldClockBand = () => {
  const [date, setDate] = useState(null);
  const [floatVisible, setFloatVisible] = useState(false);
  const [docked, setDocked] = useState(false);
  const dockRef = useRef(null);

  // Dock detection: the in-flow band above the footer.
  useEffect(() => {
    const node = dockRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setDocked(entry.isIntersecting), {
      rootMargin: '0px 0px -8% 0px'
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Scroll reactivity: appear past the hero, fade ~1.4s after scrolling stops.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    let idle = 0;
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 2;
      if (past) {
        setFloatVisible(true);
        window.clearTimeout(idle);
        idle = window.setTimeout(() => setFloatVisible(false), 1400);
      } else {
        setFloatVisible(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(idle);
    };
  }, []);

  // Tick only while the band is actually shown.
  const active = docked || floatVisible;
  useEffect(() => {
    if (!active || typeof window === 'undefined' || document.hidden) return undefined;
    setDate(new Date());
    const id = window.setInterval(() => setDate(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [active]);

  const now = date || new Date();

  return (
    <>
      {/* docked slot — in-flow above the footer */}
      <div ref={dockRef} className="px-4 pb-8 pt-2 sm:px-6 lg:px-8" aria-label="World mission clock">
        <ClockStrip date={now} />
      </div>

      {/* floating preview while scrolling the lower page */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-3 z-40 px-3 transition-opacity duration-500 sm:px-4 ${
          floatVisible && !docked ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <ClockStrip date={now} />
      </div>
    </>
  );
};

export default WorldClockBand;
