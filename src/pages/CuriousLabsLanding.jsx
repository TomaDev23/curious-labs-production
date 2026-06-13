import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import LandingCosmicBackground from '../components/landing/LandingCosmicBackground';
import HeroCelestial from '../components/landing/HeroCelestial';
import WorldClockBand from '../components/landing/WorldClockBand';
import { useNearViewport, useMediaState } from '../components/landing/hooks';

const ContactTerminalAtomic = lazy(() => import('../components/atomic/ContactTerminalAtomic'));

// Landing content sections (lazy so the hero paints first)
const AegisMachine = lazy(() => import('../components/landing/AegisMachine'));
const MoonSignalShowcase = lazy(() => import('../components/landing/MoonSignalShowcase'));
const ArticlesSection = lazy(() => import('../components/landing/ArticlesSection'));

const MoonSignalRevealSection = () => {
  const frameRef = useRef(null);
  // Resting spot is a composed corner (not mid-word): the cover reads as a
  // clean "Coming Soon" poster with light pooled like a flashlight on a desk,
  // so the reveal becomes a reward for moving rather than a circle floating
  // over the headline.
  const spotRef = useRef({ x: 78, y: 64 });
  const rafRef = useRef(0);
  const [isActive, setIsActive] = useState(false);
  // The big -58vh pull-up is only correct under the desktop CelestialStage hero
  // (sticky 190vh). On the mobile / reduced-motion heroes it would yank this
  // panel up over the hero copy, so only overlap when the celestial hero runs.
  const { isMobile, prefersReducedMotion } = useMediaState();
  const celestial = !isMobile && !prefersReducedMotion;

  // Drive the mask position via CSS vars written straight to the element —
  // pointermove fires ~100x/s, so we never run that through React state.
  const applySpot = () => {
    rafRef.current = 0;
    const node = frameRef.current;
    if (!node) return;
    node.style.setProperty('--spot-x', `${spotRef.current.x}%`);
    node.style.setProperty('--spot-y', `${spotRef.current.y}%`);
  };

  const scheduleApply = () => {
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(applySpot);
  };

  useEffect(() => {
    applySpot();
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const moveSpot = (clientX, clientY) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nextX = ((clientX - rect.left) / rect.width) * 100;
    const nextY = ((clientY - rect.top) / rect.height) * 100;
    spotRef.current = {
      x: Math.min(88, Math.max(12, nextX)),
      y: Math.min(82, Math.max(18, nextY))
    };
    scheduleApply();
  };

  const handlePointerMove = (event) => {
    if (!isActive) setIsActive(true);
    moveSpot(event.clientX, event.clientY);
  };

  const handleKeyDown = (event) => {
    const step = event.shiftKey ? 10 : 5;
    const next = { ...spotRef.current };

    if (event.key === 'ArrowLeft') next.x -= step;
    else if (event.key === 'ArrowRight') next.x += step;
    else if (event.key === 'ArrowUp') next.y -= step;
    else if (event.key === 'ArrowDown') next.y += step;
    else return;

    event.preventDefault();
    spotRef.current = {
      x: Math.min(88, Math.max(12, next.x)),
      y: Math.min(82, Math.max(18, next.y))
    };
    if (!isActive) setIsActive(true);
    scheduleApply();
  };

  // --spot-x / --spot-y are written via ref (above); only --spot-size is
  // React-driven (changes rarely, on enter/leave) and carries a fallback.
  const frameStyle = {
    '--spot-size': isActive ? 'clamp(150px, 19vw, 300px)' : 'clamp(130px, 17vw, 260px)'
  };

  const coverMask = {
    WebkitMaskImage: 'radial-gradient(circle var(--spot-size,clamp(130px,17vw,260px)) at var(--spot-x,78%) var(--spot-y,64%), transparent 0 48%, #000 49%)',
    maskImage: 'radial-gradient(circle var(--spot-size,clamp(130px,17vw,260px)) at var(--spot-x,78%) var(--spot-y,64%), transparent 0 48%, #000 49%)'
  };

  const coverStyle = {
    ...coverMask,
    backgroundColor: '#070b16',
    backgroundImage: "url('/moonsignal/Landing/ms_math_bg_1.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <section
      className={`relative z-20 overflow-hidden px-4 pt-0 sm:px-6 lg:px-8 ${celestial ? '-mt-[58vh] pb-20' : 'mt-0 pb-12'}`}
      aria-labelledby="moon-signal-preview-heading"
    >
      <h2 id="moon-signal-preview-heading" className="sr-only">Moon Signal — Coming Soon</h2>
      <div
        ref={frameRef}
        tabIndex={0}
        role="img"
        aria-label="Moon Signal coming soon preview with a movable circular reveal."
        className="relative mx-auto min-h-[620px] max-w-7xl cursor-crosshair overflow-hidden rounded-2xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-200/70 max-sm:min-h-[480px]"
        style={frameStyle}
        onPointerDown={handlePointerMove}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsActive(true)}
        onPointerLeave={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onKeyDown={handleKeyDown}
      >
        <div className="absolute inset-0 z-0 isolate bg-[#071016]">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:42px_42px]" />
          {/* teal pre-echo of MoonSignal — the descending hero moon dissolves into this glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] mx-auto h-28 max-w-4xl bg-[radial-gradient(ellipse_at_50%_0%,rgba(45,212,191,0.16),transparent_70%)] blur-md" aria-hidden="true" />
          <div className="absolute -bottom-24 left-[2%] h-[54%] w-[56%] rounded-[50%] bg-[radial-gradient(circle_at_50%_12%,rgba(97,232,184,0.28),rgba(20,94,73,0.55)_44%,rgba(4,18,24,0.96)_78%)] blur-sm" />
          <div className="absolute bottom-0 left-0 h-[42%] w-[46%] bg-[linear-gradient(155deg,rgba(24,63,61,0.0),rgba(23,75,64,0.84)_44%,rgba(7,13,19,0.96))]" />

          <div className="absolute left-[12%] top-[14%] hidden w-[24%] min-w-56 rounded-lg border border-emerald-200/10 bg-[#123727] p-5 shadow-2xl shadow-black/35 md:block">
            <div className="font-space text-[10px] uppercase tracking-[0.16em] text-emerald-100/55">Signal Stack</div>
            {['Watchlist', 'Models', 'Risk Window', 'Review Queue'].map((item, index) => (
              <div key={item} className="mt-4 flex items-center justify-between border-b border-white/10 pb-3 text-xs text-emerald-50/80">
                <span>{item}</span>
                <span className="text-cyan-200/80">0{index + 2}</span>
              </div>
            ))}
          </div>

          <div className="absolute right-[8%] top-[8%] h-[92%] w-[48%] min-w-[390px] rotate-[7deg] rounded-lg bg-[#f6f2e7] p-6 text-slate-900 shadow-[0_36px_100px_rgba(0,0,0,0.42)] max-md:right-[-35%] max-md:min-w-[360px] max-sm:right-[-58%] max-sm:top-[18%] max-sm:w-[96%]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="font-space text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Home</div>
                <div className="mt-1 text-sm text-slate-400">Moon Signal console</div>
              </div>
              <div className="rounded-md bg-emerald-100 px-3 py-1 font-space text-xs font-semibold text-emerald-700">Private</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                ['Active signals', '286', '+14%'],
                ['Total sessions', '1,324', '+8%'],
                ['Time saved', '1,680h', '+21%'],
                ['Review passes', '98.7%', '+3%']
              ].map(([label, value, delta]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-xs text-slate-500">{label}</div>
                  <div className="mt-4 font-space text-2xl font-semibold text-slate-950">{value}</div>
                  <div className="mt-2 text-xs text-emerald-500">{delta}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="font-space text-sm font-semibold text-slate-900">Signal Confidence</div>
                <div className="text-xs text-slate-400">30 day window</div>
              </div>
              <div className="relative h-44 overflow-hidden rounded-md bg-slate-50">
                <div className="absolute inset-x-0 top-1/4 h-px bg-slate-200" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
                <div className="absolute inset-x-0 top-3/4 h-px bg-slate-200" />
                <div className="absolute left-4 right-4 top-14 h-20 rounded-[50%] border-t-2 border-cyan-400" />
                <div className="absolute left-4 right-4 top-20 h-20 rounded-[50%] border-t-2 border-amber-300" />
                <div className="absolute left-4 right-4 top-28 h-16 rounded-[50%] border-t-2 border-emerald-400" />
              </div>
            </div>
          </div>
          <img
            src="/moonsignal/Landing/1_Coming_soon.svg"
            alt=""
            className="absolute inset-0 z-[1] h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          />
          <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_60%_34%,transparent_0%,rgba(3,7,13,0.12)_64%,rgba(3,7,13,0.42)_100%)]" />
        </div>

        <div className="absolute inset-0 z-10" style={coverStyle}>
          {/* subtle left-edge scrim keeps the cream copy legible over the artwork */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(7,11,22,0.62)_0%,rgba(7,11,22,0.28)_34%,transparent_58%)]" aria-hidden="true" />
          <div className="absolute left-6 top-6 flex items-center gap-3 sm:left-10 sm:top-10">
            <img
              src="/assets/images/general/Page_Logos/MoonSignal_logo.webp"
              alt=""
              className="h-11 w-11 object-contain sm:h-14 sm:w-14"
              loading="lazy"
            />
            <span className="font-space text-2xl font-medium text-[#dedac7] drop-shadow-[0_0_18px_rgba(125,211,252,0.15)] sm:text-4xl">Moon Signal</span>
          </div>

          <div className="absolute left-6 top-[24%] sm:left-10 sm:top-[28%] lg:left-14">
            <div
              aria-hidden="true"
              className="max-w-[11ch] font-space text-5xl font-semibold leading-none tracking-normal text-[#dedac7] drop-shadow-[0_0_24px_rgba(245,245,220,0.08)] sm:text-8xl lg:text-[9rem]"
            >
              Coming Soon
            </div>
            <p className="mt-5 max-w-md font-space text-sm leading-relaxed text-[#dedac7]/72 sm:mt-7 sm:text-base">
              MoonSignal is currently bootstrapping in stealth.
            </p>
          </div>
        </div>

        {/* soft inset vignette on all four edges: frames the panel and keeps the
            top softened so the descending moon still cross-dissolves into it */}
        <div className="pointer-events-none absolute inset-0 z-[11] rounded-2xl shadow-[inset_0_0_64px_14px_rgba(2,3,8,0.5)]" aria-hidden="true" />

        {/* discoverability: a pulsing echo of the spotlight + a mono cue, both
            shown only at rest so the reveal reads as interactive. */}
        {!isActive && (
          <>
            <span
              className="pointer-events-none absolute z-10 rounded-full border border-cyan-200/35 motion-safe:animate-ping"
              style={{
                left: 'var(--spot-x,78%)',
                top: 'var(--spot-y,64%)',
                width: 'var(--spot-size,clamp(130px,17vw,260px))',
                height: 'var(--spot-size,clamp(130px,17vw,260px))',
                transform: 'translate(-50%, -50%)'
              }}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-6 z-[12] flex justify-center" aria-hidden="true">
              <span className="rounded-full border border-cyan-100/20 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-100/65 backdrop-blur-sm">
                ↔ Drag to reveal
              </span>
            </div>
          </>
        )}

        <div
          className="pointer-events-none absolute z-10 rounded-full border border-cyan-100/45 shadow-[0_0_0_1px_rgba(15,23,42,0.25),0_0_52px_rgba(103,232,249,0.24)] transition-[width,height] duration-200"
          style={{
            left: 'var(--spot-x,78%)',
            top: 'var(--spot-y,64%)',
            width: 'var(--spot-size,clamp(130px,17vw,260px))',
            height: 'var(--spot-size,clamp(130px,17vw,260px))',
            transform: 'translate(-50%, -50%)'
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

const SectionFallback = ({ label }) => (
  <section className="flex min-h-[40vh] items-center justify-center px-4 text-center">
    <div className="font-space text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
  </section>
);

const LazySection = ({ children, label, rootMargin = '480px' }) => {
  const [sectionRef, isNear] = useNearViewport(rootMargin);
  return (
    <div ref={sectionRef}>
      <Suspense fallback={<SectionFallback label={label} />}>
        {isNear ? children : <SectionFallback label={label} />}
      </Suspense>
    </div>
  );
};

const LazyContactSection = () => {
  const [sectionRef, isNear] = useNearViewport('520px');

  return (
    <div ref={sectionRef} className="relative">
      <Suspense
        fallback={
          <section className="flex min-h-[70vh] items-center justify-center px-4 text-center">
            <div className="font-space text-sm uppercase tracking-[0.16em] text-lime-300/70">Opening contact channel</div>
          </section>
        }
      >
        {isNear ? <ContactTerminalAtomic transparent /> : (
          <section className="flex min-h-[70vh] items-center justify-center px-4 text-center">
            <div className="font-space text-sm uppercase tracking-[0.16em] text-lime-300/70">Opening contact channel</div>
          </section>
        )}
      </Suspense>
    </div>
  );
};

/* The page's ending — a full-width send-off that closes the "leave the moon →
   launch from stealth" loop, in the Coming-Soon cream, with asymmetric CTAs. */
const FinaleBand = () => (
  <section
    className="relative overflow-hidden px-4 py-28 sm:px-6 sm:py-36 lg:px-8"
    aria-labelledby="finale-heading"
  >
    <div
      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_120%,rgba(222,218,199,0.10),transparent_60%),radial-gradient(ellipse_at_72%_0%,rgba(45,212,191,0.08),transparent_55%)]"
      aria-hidden="true"
    />
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-teal-200/70">// Mission status</p>
      <h2
        id="finale-heading"
        className="mt-4 max-w-[15ch] font-space font-semibold leading-[0.92] tracking-[-0.02em] text-[#dedac7] text-[clamp(2.6rem,8vw,7rem)]"
      >
        Built on AEGIS. Launching from stealth.
      </h2>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a
          href="#contact"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-lime-300 px-6 font-space text-sm font-semibold text-curious-dark-950 transition-colors hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-lime-200 focus:ring-offset-2 focus:ring-offset-black"
        >
          Request access
        </a>
        <a
          href="#contact"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-6 font-space text-sm font-semibold text-white/85 transition-colors hover:border-white/45 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
        >
          Recruiting? Talk to us&nbsp;→
        </a>
      </div>
    </div>
  </section>
);

export default function CuriousLabsLanding() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#020308] text-white">
      <Helmet>
        <title>Curious Labs | Moon Signal</title>
        <meta
          name="description"
          content="Curious Labs builds AEGIS, an AI Edge runtime, and Moon Signal, an AI-assisted research and signal-design project."
        />
        <meta property="og:title" content="Curious Labs | Moon Signal" />
        <meta
          property="og:description"
          content="A focused Curious Labs landing page for AEGIS, Moon Signal, research, and the current project work."
        />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* One persistent cosmic backdrop behind everything — the page's "flow". */}
      <LandingCosmicBackground />

      <MissionControlNavbar />

      <main className="relative z-10">
        {/* ──── HERO → celestial transition: Earth recedes, Moon grows to cover ──── */}
        <HeroCelestial />

        {/* ──────────────────── COMING SOON (spotlight reveal) ─────────────────── */}
        <MoonSignalRevealSection />

        {/* ───────────────────────── MOON SIGNAL ─────────────────────── */}
        <LazySection label="Loading Moon Signal" rootMargin="600px">
          <MoonSignalShowcase />
        </LazySection>

        {/* ───────────────────────── AEGIS MACHINE ───────────────────── */}
        <LazySection label="Loading AEGIS runtime" rootMargin="600px">
          <AegisMachine />
        </LazySection>

        {/* ───────────────────────── FIELD NOTES ─────────────────────── */}
        <LazySection label="Loading writing" rootMargin="500px">
          <ArticlesSection />
        </LazySection>

        {/* ───────────────────────── CONTACT ─────────────────────────── */}
        <LazyContactSection />

        {/* ───────────────────────── FINALE ──────────────────────────── */}
        <FinaleBand />

        {/* ─────────────────── WORLD CLOCK (mission time band) ─────────── */}
        {/* Eager mount: its scroll listener drives the floating/docking band. */}
        <WorldClockBand />

        {/* ───────────────────────── FOOTER ──────────────────────────── */}
        {/* Transparent so the persistent celestial background flows through. */}
        <footer className="px-4 pb-12 pt-2 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="font-space text-xs uppercase tracking-[0.16em] text-slate-400">
              Curious Labs · Building the Moon Signal era
            </p>
            {/* demoted: the old site is a tiny utility link, never the last word */}
            <Link
              to="/legacy"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-slate-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              /legacy
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
