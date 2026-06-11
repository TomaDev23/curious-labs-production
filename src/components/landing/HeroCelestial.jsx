import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
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
  <div ref={innerRef} className="w-full min-w-0 max-w-[16.5rem] will-change-[transform,opacity] sm:max-w-[18rem]">
    <SectionLabel tone="lime">Curious Labs</SectionLabel>
    <h1 className="max-w-full break-words font-space text-2xl font-semibold leading-[1.05] tracking-[-0.015em] text-white sm:text-3xl lg:text-[2.3rem]">
      Building MoonSignal
    </h1>
    <p className="mt-3 max-w-full text-xs leading-6 text-slate-300/90 sm:text-[0.82rem]">
      Curious Labs is a research laboratory developing a cutting-edge algorithmic quant-trading machine.
    </p>
    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
      <a
        href="#moon-signal"
        className="inline-flex min-h-9 w-full items-center justify-center rounded-md bg-lime-300 px-4 font-space text-[11px] font-semibold text-curious-dark-950 transition-colors hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-lime-200 focus:ring-offset-2 focus:ring-offset-black sm:w-auto"
      >
        Moon Signal
      </a>
      <a
        href="#aegis"
        className="inline-flex min-h-9 w-full items-center justify-center rounded-md border border-amber-200/35 bg-amber-100/[0.05] px-4 font-space text-[11px] font-semibold text-amber-100 transition-colors hover:border-amber-100/60 hover:bg-amber-100/10 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-black sm:w-auto"
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

const MobileHero = () => {
  const sectionRef = useRef(null);
  // Pause/unmount the 3D moon once the hero scrolls offscreen so it doesn't
  // keep rendering every frame down the whole page (mobile perf).
  const [moonLive, setMoonLive] = useState(true);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setMoonLive(entry.isIntersecting), {
      rootMargin: '160px'
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-8 pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-[clamp(6vh,10vh,14vh)] flex justify-center">
        <div className="relative aspect-square max-h-[58svh] w-[108vw] max-w-[480px] [animation:moonIdleDrift_12s_ease-in-out_infinite] motion-reduce:animate-none">
          <div className="absolute inset-[9%] rounded-full bg-[radial-gradient(circle,rgba(226,232,240,0.11),rgba(125,211,252,0.035)_48%,transparent_72%)] blur-2xl" aria-hidden="true" />
          <div className="relative h-full w-full [filter:brightness(1.16)_contrast(1.06)]">
            {moonLive ? (
              <Suspense fallback={<MoonFallback />}>
                <MoonSphereProxy
                  className="h-full w-full"
                  cameraFov={23.5}
                  rotation={[0.1, -0.05, 0]}
                  loadingFallback={<MoonFallback />}
                />
              </Suspense>
            ) : (
              <MoonFallback />
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <HeroCopy />
      </div>
    </section>
  );
};

/* ----------------------- choreographed celestial ---------------------- */

const smooth = (a, b, t) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};
const lerp = (a, b, t) => a + (b - a) * t;
// Cinematic "release then settle" — accelerates gently, decelerates long.
const easeOutExpo = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -9 * x));

const CelestialStage = () => {
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const moonRef = useRef(null);
  const tiltRef = useRef(null);
  const haloRef = useRef(null);
  const filterRef = useRef(null);
  const cueRef = useRef(null);

  // Once the moon has fully cross-dissolved away, unmount the 3D canvas so it
  // stops rendering for the rest of the page (the sticky moon would otherwise
  // keep invalidating every frame all the way down). A ref guards the setState
  // so we only flip at the threshold, not every scroll frame.
  const [moonLive, setMoonLive] = useState(true);
  const moonLiveRef = useRef(true);

  useFlowingScrollProgress({
    targetRef: sectionRef,
    stateful: false,
    onUpdate: (p) => {
      const live = p < 0.94;
      if (live !== moonLiveRef.current) {
        moonLiveRef.current = live;
        setMoonLive(live);
      }
      if (moonRef.current) {
        // One continuous eased channel drives the whole departure so the moon
        // glides (legato) instead of ramping evenly (staccato).
        const e = easeOutExpo(smooth(0.16, 0.92, p));
        const ty = -58 * e;                       // climbs toward the rising panel
        const tx = 7 * Math.sin((e * Math.PI) / 2); // gentle rightward arc
        const rot = 6 * e;
        const sc = lerp(1, 0.3, e);
        moonRef.current.style.transform = `translate3d(${tx}vw, ${ty}vh, 0) rotate(${rot}deg) scale(${sc})`;
        // Lingers, then cross-dissolves late as the Coming Soon panel arrives.
        moonRef.current.style.opacity = String(1 - smooth(0.72, 0.96, p));

        if (tiltRef.current) {
          tiltRef.current.style.transform = `perspective(1400px) rotateX(${lerp(4.5, 0, e)}deg) rotateY(${lerp(-5.5, 0, e)}deg)`;
        }
        // Atmospheric payoff: halo cools/expands and the rim catches light as
        // the moon recedes (transform/opacity/filter only — no layout).
        if (haloRef.current) {
          haloRef.current.style.transform = `scale(${lerp(1, 1.25, e)})`;
          haloRef.current.style.opacity = String(lerp(1, 0.4, e));
        }
        if (filterRef.current) {
          filterRef.current.style.filter = `brightness(${lerp(1.2, 1.32, e)}) contrast(${lerp(1.08, 1.14, e)})`;
        }
      }

      if (copyRef.current) {
        // Overlaps the moon's lift so the eye tracks one coordinated motion.
        const t = smooth(0.18, 0.66, p);
        copyRef.current.style.opacity = String(1 - t);
        copyRef.current.style.transform = `translate3d(${lerp(0, 28, t)}px, ${lerp(0, -150, t)}px, 0)`;
      }

      if (cueRef.current) {
        // Persists through the first deliberate scroll before fading.
        cueRef.current.style.opacity = String(1 - smooth(0.06, 0.18, p));
      }
    }
  });

  return (
    <section ref={sectionRef} className="relative h-[190vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative h-[88vmin] w-[88vmin] min-h-[min(620px,84vmin)] min-w-[min(620px,84vmin)] max-h-[900px] max-w-[900px]">
            <div ref={moonRef} className="h-full w-full will-change-[transform,opacity]" style={{ transformOrigin: 'center' }}>
              <div
                ref={tiltRef}
                className="h-full w-full will-change-transform"
                style={{ transform: 'perspective(1400px) rotateX(4.5deg) rotateY(-5.5deg)' }}
              >
                <div ref={haloRef} className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(226,232,240,0.10),rgba(125,211,252,0.035)_45%,transparent_70%)] blur-2xl will-change-[transform,opacity]" aria-hidden="true" />
                <div ref={filterRef} className="relative h-full w-full [filter:brightness(1.2)_contrast(1.08)]">
                  {moonLive ? (
                    <Suspense fallback={<MoonFallback />}>
                      <MoonSphereProxy className="h-full w-full" cameraFov={22.5} rotation={[0.11, -0.04, 0]} loadingFallback={<MoonFallback />} />
                    </Suspense>
                  ) : (
                    <MoonFallback />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-[6.5vh] z-10 px-5 sm:px-7 lg:px-10 xl:px-12">
          <div className="w-full">
            <HeroCopy innerRef={copyRef} />
          </div>
        </div>

        <div ref={cueRef} className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-1.5" aria-hidden="true">
          <span className="font-space text-[10px] uppercase tracking-[0.2em] text-slate-400">Scroll</span>
          <span className="h-7 w-px bg-gradient-to-b from-slate-400/70 to-transparent [animation:moonCueBob_1.9s_ease-in-out_infinite] motion-reduce:animate-none" />
        </div>
      </div>
    </section>
  );
};

export default function HeroCelestial() {
  const { isMobile, prefersReducedMotion } = useMediaState();
  if (prefersReducedMotion) return <StaticHero />;
  if (isMobile) return <MobileHero />;
  return <CelestialStage />;
}
