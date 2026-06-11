import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import HeroDisclosureNotice from '../components/atomic/HeroDisclosureNotice';
import LandingCosmicBackground from '../components/landing/LandingCosmicBackground';
import HeroCelestial from '../components/landing/HeroCelestial';
import { useNearViewport } from '../components/landing/hooks';

const ContactTerminalAtomic = lazy(() => import('../components/atomic/ContactTerminalAtomic'));

// Landing content sections (lazy so the hero paints first)
const AegisMachine = lazy(() => import('../components/landing/AegisMachine'));
const MoonSignalShowcase = lazy(() => import('../components/landing/MoonSignalShowcase'));
const ArticlesSection = lazy(() => import('../components/landing/ArticlesSection'));

const MoonSignalRevealSection = () => {
  const frameRef = useRef(null);
  const spotRef = useRef({ x: 66, y: 48 });
  const rafRef = useRef(0);
  const [isActive, setIsActive] = useState(false);

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
    WebkitMaskImage: 'radial-gradient(circle var(--spot-size,clamp(130px,17vw,260px)) at var(--spot-x,66%) var(--spot-y,48%), transparent 0 48%, #000 49%)',
    maskImage: 'radial-gradient(circle var(--spot-size,clamp(130px,17vw,260px)) at var(--spot-x,66%) var(--spot-y,48%), transparent 0 48%, #000 49%)'
  };

  const coverStyle = {
    ...coverMask,
    background:
      'radial-gradient(circle at 70% 18%, rgba(118,255,223,0.13), transparent 29%), radial-gradient(circle at 20% 82%, rgba(203,255,112,0.055), transparent 34%), linear-gradient(135deg, #383a37 0%, #2f312f 42%, #272928 100%)'
  };

  return (
    <section
      className="relative z-20 -mt-[58vh] overflow-hidden px-4 pb-20 pt-0 sm:px-6 lg:px-8"
      aria-labelledby="moon-signal-preview-heading"
    >
      <h2 id="moon-signal-preview-heading" className="sr-only">Moon Signal — Coming Soon</h2>
      <div
        ref={frameRef}
        tabIndex={0}
        role="img"
        aria-label="Moon Signal coming soon preview with a movable circular reveal."
        className="relative mx-auto min-h-[620px] max-w-7xl cursor-crosshair overflow-hidden rounded-2xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-200/70 max-sm:min-h-[560px]"
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
          />
          <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_60%_34%,transparent_0%,rgba(3,7,13,0.12)_64%,rgba(3,7,13,0.42)_100%)]" />
        </div>

        <div className="absolute inset-0 z-10" style={coverStyle}>
          <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.34)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.35)_0_1px,transparent_1px),radial-gradient(circle_at_76%_64%,rgba(139,255,225,0.36)_0_1px,transparent_1px)] [background-size:28px_28px,46px_46px]" />
          <div className="absolute left-6 top-6 flex items-center gap-3 sm:left-10 sm:top-10">
            <img
              src="/assets/images/general/Page_Logos/MoonSignal_logo.webp"
              alt=""
              className="h-11 w-11 object-contain sm:h-14 sm:w-14"
              loading="lazy"
            />
            <span className="font-space text-2xl font-medium text-[#dedac7] drop-shadow-[0_0_18px_rgba(125,211,252,0.15)] sm:text-4xl">Moon Signal</span>
          </div>

          <div className="absolute left-6 top-[28%] sm:left-10 lg:left-14">
            <div
              aria-hidden="true"
              className="max-w-[11ch] font-space text-6xl font-semibold leading-none tracking-normal text-[#dedac7] drop-shadow-[0_0_24px_rgba(245,245,220,0.08)] sm:text-8xl lg:text-[9rem]"
            >
              Coming Soon
            </div>
            <p className="mt-7 max-w-md font-space text-sm leading-relaxed text-[#dedac7]/72 sm:text-base">
              The Moon Signal console — currently in private build.
            </p>
          </div>
        </div>

        <div
          className="pointer-events-none absolute z-10 rounded-full border border-cyan-100/45 shadow-[0_0_0_1px_rgba(15,23,42,0.25),0_0_52px_rgba(103,232,249,0.24)] transition-[width,height] duration-200"
          style={{
            left: 'var(--spot-x,66%)',
            top: 'var(--spot-y,48%)',
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
      {/* seam: fade the continuous cosmic field down into the terminal */}
      <div className="pointer-events-none h-24 w-full bg-[linear-gradient(180deg,transparent,#070C1A)]" aria-hidden="true" />
      <Suspense
        fallback={
          <section className="flex min-h-[70vh] items-center justify-center bg-curious-dark-900 px-4 text-center">
            <div className="font-space text-sm uppercase tracking-[0.16em] text-lime-300/70">Opening contact channel</div>
          </section>
        }
      >
        {isNear ? <ContactTerminalAtomic /> : (
          <section className="flex min-h-[70vh] items-center justify-center bg-curious-dark-900 px-4 text-center">
            <div className="font-space text-sm uppercase tracking-[0.16em] text-lime-300/70">Opening contact channel</div>
          </section>
        )}
      </Suspense>
    </div>
  );
};

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

      <HeroDisclosureNotice />
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

        {/* ───────────────────────── FOOTER ──────────────────────────── */}
        <footer className="bg-curious-dark-900 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="font-space text-xs uppercase tracking-[0.16em] text-slate-400">
              Curious Labs · Building the Moon Signal era
            </p>
            <Link
              to="/legacy"
              className="font-space text-sm font-semibold uppercase tracking-[0.14em] text-slate-400 transition-colors hover:text-lime-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-200 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              View the previous site →
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
