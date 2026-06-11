import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { SectionLabel } from './primitives';
import { useMediaState } from './hooks';
import useFlowingScrollProgress from '../../hooks/useFlowingScrollProgress';

const MoonSphereProxy = lazy(() => import('../atomic/proxies/MoonSphereProxy'));

/* ----------------------------- fallback ------------------------------ */

const MoonFallback = () => (
  <div className="relative h-full w-full overflow-hidden rounded-full" aria-hidden="true">
    <div className="absolute inset-[9%] rounded-full bg-[radial-gradient(circle_at_68%_30%,rgba(245,247,255,0.92),rgba(166,174,190,0.78)_23%,rgba(76,84,104,0.9)_52%,rgba(16,20,32,0.98)_78%)] shadow-[0_0_90px_rgba(226,232,240,0.18)]" />
    <div className="absolute left-[28%] top-[34%] h-[8%] w-[14%] rounded-full bg-slate-600/45 blur-[2px]" />
    <div className="absolute right-[31%] top-[28%] h-[6%] w-[10%] rounded-full bg-slate-700/35 blur-[1px]" />
    <div className="absolute bottom-[29%] left-[46%] h-[7%] w-[12%] rounded-full bg-slate-800/35 blur-[2px]" />
  </div>
);

/* ------------------------------- copy --------------------------------- */

const HeroCopy = ({ innerRef }) => (
  <div ref={innerRef} className="w-full min-w-0 max-w-[20rem] will-change-[transform,opacity] sm:max-w-[24rem]">
    <SectionLabel tone="lime">Curious Labs</SectionLabel>
    <h1 className="max-w-full break-words font-space text-3xl font-semibold leading-[1.08] tracking-normal text-white sm:text-4xl lg:text-5xl">
      Building the Moon Signal era.
    </h1>
    <p className="mt-4 max-w-full text-sm leading-7 text-slate-300 sm:text-[0.95rem]">
      Curious Labs is being reshaped around the actual work: AI-assisted research systems, signal thinking,
      and a quieter home for the projects that are moving forward now - all running on the AEGIS runtime.
    </p>
    <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
      <a
        href="#moon-signal"
        className="inline-flex min-h-10 w-full items-center justify-center rounded-md bg-lime-300 px-5 font-space text-xs font-semibold text-curious-dark-950 transition-colors hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-lime-200 focus:ring-offset-2 focus:ring-offset-black sm:w-auto"
      >
        Moon Signal
      </a>
      <a
        href="#aegis"
        className="inline-flex min-h-10 w-full items-center justify-center rounded-md border border-amber-200/35 bg-amber-100/[0.05] px-5 font-space text-xs font-semibold text-amber-100 transition-colors hover:border-amber-100/60 hover:bg-amber-100/10 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-black sm:w-auto"
      >
        AEGIS Runtime
      </a>
    </div>
  </div>
);

/* --------------------------- static fallback -------------------------- */

const StaticHero = () => (
  <section className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-8">
    <div className="mx-auto grid w-full max-w-7xl items-center gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr]">
      <HeroCopy />
      <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[460px]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(226,232,240,0.14),transparent_67%)] blur-2xl" aria-hidden="true" />
        <MoonFallback />
      </div>
    </div>
  </section>
);

/* ----------------------- choreographed celestial ---------------------- */

const smooth = (a, b, t) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};
const lerp = (a, b, t) => a + (b - a) * t;

const CelestialStage = () => {
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const moonRef = useRef(null);
  const cueRef = useRef(null);

  useFlowingScrollProgress({
    targetRef: sectionRef,
    stateful: false,
    onUpdate: (p) => {
      if (moonRef.current) {
        const e = smooth(0.16, 0.74, p);
        const ty = -48 * Math.pow(e, 1.22);
        const tx = 7 * Math.sin((e * Math.PI) / 2);
        const rot = 5 * e;
        const sc = lerp(1, 0.38, e);
        moonRef.current.style.transform = `translate3d(${tx}vw, ${ty}vh, 0) rotate(${rot}deg) scale(${sc})`;
        moonRef.current.style.opacity = String(1 - smooth(0.66, 0.84, p));
      }

      if (copyRef.current) {
        const t = smooth(0.12, 0.58, p);
        copyRef.current.style.opacity = String(1 - t);
        copyRef.current.style.transform = `translate3d(${lerp(0, 28, t)}px, ${lerp(0, -130, t)}px, 0)`;
      }

      if (cueRef.current) {
        cueRef.current.style.opacity = String(1 - smooth(0, 0.1, p));
      }
    }
  });

  return (
    <section ref={sectionRef} className="relative h-[190vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative h-[76vmin] w-[76vmin] min-h-[520px] min-w-[520px] max-h-[760px] max-w-[760px]">
            <div ref={moonRef} className="h-full w-full will-change-[transform,opacity]" style={{ transformOrigin: 'center' }}>
              <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(226,232,240,0.10),rgba(125,211,252,0.035)_45%,transparent_70%)] blur-2xl" aria-hidden="true" />
              <div className="relative h-full w-full [filter:brightness(1.2)_contrast(1.08)]">
                <Suspense fallback={<MoonFallback />}>
                  <MoonSphereProxy className="h-full w-full" rotation={[0.06, 0, 0]} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-[8vh] z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <HeroCopy innerRef={copyRef} />
          </div>
        </div>

        <div ref={cueRef} className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-1.5" aria-hidden="true">
          <span className="font-space text-[10px] uppercase tracking-[0.2em] text-slate-400">Scroll</span>
          <span className="h-7 w-px bg-gradient-to-b from-slate-400/70 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default function HeroCelestial() {
  const { isMobile, prefersReducedMotion } = useMediaState();
  if (isMobile || prefersReducedMotion) return <StaticHero />;
  return <CelestialStage />;
}
