import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const slides = Array.from({ length: 12 }, (_, index) => index + 1);

export default function Interview() {
  const canvasRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.title = 'Interview Presentation | CuriousLabs';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId;
    let width = 0;
    let height = 0;
    let stars = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
      height = canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
      const count = Math.max(34, Math.floor((window.innerWidth * window.innerHeight) / 11000));
      stars = Array.from({ length: count }, () => {
        const tone = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: (Math.random() * 1.2 + 0.2) * dpr,
          a: Math.random() * Math.PI * 2,
          s: Math.random() * 0.016 + 0.004,
          vx: (Math.random() - 0.5) * 0.035 * dpr,
          col: tone < 0.16 ? '169,139,255' : tone < 0.34 ? '79,214,255' : '255,255,255',
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        if (!reducedMotion) {
          star.a += star.s;
          star.x += star.vx;
          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
        }
        const alpha = reducedMotion ? 0.48 : 0.3 + Math.abs(Math.sin(star.a)) * 0.5;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.col},${alpha})`;
        ctx.fill();
      });

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(draw);
      }
    };

    const handleResize = () => {
      resize();
      if (reducedMotion) draw();
    };

    resize();
    draw();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      setProgress(Math.min(100, Math.max(0, (window.scrollY / max) * 100)));
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    update();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    const frames = Array.from(document.querySelectorAll('[data-slide-frame]'));
    if (!frames.length || !('IntersectionObserver' in window)) return undefined;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSlide(Number(entry.target.getAttribute('data-slide-number')));
        }
      });
    }, { rootMargin: '-42% 0px -48% 0px', threshold: 0.01 });

    frames.forEach((frame) => {
      revealObserver.observe(frame);
      activeObserver.observe(frame);
    });

    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  return (
    <div className="interview-page">
      <Helmet>
        <title>Interview Presentation | CuriousLabs</title>
        <meta
          name="description"
          content="A scrollable CuriousLabs interview presentation optimized for desktop and mobile reading."
        />
        <meta property="og:title" content="Interview Presentation | CuriousLabs" />
        <meta property="og:description" content="A responsive online interview deck from CuriousLabs." />
      </Helmet>

      <style>{`
        .interview-page{
          --bg0:#04050d; --line:rgba(120,140,255,.16); --line2:rgba(79,214,255,.28);
          --ink:#dbe1f5; --mut:#96a0c8; --cyan:#4fd6ff; --violet:#a98bff; --green:#b9ff57;
          min-height:100svh; color:var(--ink); background-color:var(--bg0);
          background-image:linear-gradient(180deg,#080b1c 0%,#050713 46%,#04050d 100%),
            linear-gradient(90deg,rgba(79,214,255,.04) 1px,transparent 1px),
            linear-gradient(180deg,rgba(169,139,255,.035) 1px,transparent 1px);
          background-size:auto,72px 72px,72px 72px;
          font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
          line-height:1.6; overflow:visible; padding-bottom:env(safe-area-inset-bottom);
        }
        .interview-page::before{
          content:""; position:fixed; inset:0; z-index:0; pointer-events:none;
          background:linear-gradient(135deg,rgba(79,214,255,.08),transparent 34%,rgba(185,255,87,.05) 100%);
        }
        .interview-stars{position:fixed; inset:0; z-index:1; display:block; opacity:.58; pointer-events:none}
        .interview-shell,.interview-nav,.interview-main,.interview-progress{position:relative}
        .interview-shell{
          z-index:80; padding-top:env(safe-area-inset-top);
          background:linear-gradient(180deg,rgba(2,4,14,.96),rgba(4,7,20,.88));
          border-bottom:1px solid rgba(132,204,22,.22); box-shadow:0 20px 55px rgba(0,0,0,.35);
          backdrop-filter:blur(18px);
        }
        .interview-shell-inner{display:flex; align-items:center; gap:18px; width:100%; padding:12px 22px}
        .interview-brand{display:flex; align-items:center; gap:10px; color:#fff; min-width:0; text-decoration:none}
        .interview-brand img{height:28px; width:auto; filter:drop-shadow(0 0 8px rgba(132,204,22,.35))}
        .interview-brand strong{display:block; font-size:15px; letter-spacing:.3px; color:var(--green)}
        .interview-brand small{
          display:block; margin-top:-2px; font-family:ui-monospace,"Cascadia Code",Consolas,monospace;
          font-size:10px; letter-spacing:1.6px; text-transform:uppercase; color:rgba(255,255,255,.58)
        }
        .interview-shell-links{display:flex; align-items:center; justify-content:flex-end; gap:8px; margin-left:auto; flex-wrap:wrap}
        .interview-shell-links a{
          color:rgba(255,255,255,.76); font-family:ui-monospace,"Cascadia Code",Consolas,monospace;
          font-size:12px; letter-spacing:.4px; padding:7px 10px; border:1px solid transparent;
          border-radius:8px; transition:.18s; text-decoration:none;
        }
        .interview-shell-links a:hover{color:#fff; background:rgba(132,204,22,.1); border-color:rgba(132,204,22,.22)}
        .interview-badge{
          display:flex; align-items:center; gap:7px; padding:7px 10px; border-radius:8px;
          border:1px solid rgba(79,214,255,.24); background:rgba(79,214,255,.07);
          color:rgba(255,255,255,.72); font-family:ui-monospace,"Cascadia Code",Consolas,monospace;
          font-size:11px; letter-spacing:.35px;
        }
        .interview-badge b{color:var(--cyan)}
        .interview-wrap{width:min(1180px,100%); margin:0 auto; padding:0 22px}
        .interview-nav{
          z-index:60;
          background:linear-gradient(180deg,rgba(6,8,20,.93),rgba(6,8,20,.62));
          border-bottom:1px solid var(--line); backdrop-filter:blur(14px);
        }
        .interview-nav .interview-wrap{display:flex; align-items:center; gap:16px; padding-top:8px; padding-bottom:8px}
        .interview-nav-label{flex:0 0 auto; color:#fff; font-weight:740; font-size:13px; letter-spacing:.5px}
        .interview-nav-label b{color:var(--cyan)}
        .interview-strip{
          min-width:0; display:flex; align-items:center; gap:6px; overflow-x:auto; overscroll-behavior-x:contain;
          padding:2px 2px 4px; scrollbar-width:thin; scrollbar-color:rgba(79,214,255,.45) rgba(6,8,20,.96);
        }
        .interview-strip::-webkit-scrollbar{height:6px}
        .interview-strip::-webkit-scrollbar-track{background:rgba(6,8,20,.96); border-radius:999px}
        .interview-strip::-webkit-scrollbar-thumb{background:rgba(79,214,255,.45); border-radius:999px}
        .interview-strip a{
          flex:0 0 auto; min-width:38px; text-align:center; padding:5px 8px; text-decoration:none;
          color:var(--mut); border:1px solid transparent; border-radius:8px;
          font-family:ui-monospace,"Cascadia Code",Consolas,monospace; font-size:12px; transition:.18s;
        }
        .interview-strip a:hover,.interview-strip a.is-active{color:#fff; background:rgba(79,214,255,.13); border-color:var(--line2)}
        .interview-progress{
          position:fixed; right:max(10px,env(safe-area-inset-right)); top:calc(16px + env(safe-area-inset-top));
          bottom:calc(24px + env(safe-area-inset-bottom)); width:8px; z-index:50; pointer-events:none;
        }
        .interview-progress span:first-child{
          position:absolute; inset:0 3px; border-radius:999px; background:rgba(120,140,255,.12);
          border:1px solid rgba(120,140,255,.14);
        }
        .interview-progress span:last-child{
          position:absolute; left:3px; right:3px; top:0; height:0%; border-radius:999px;
          background:linear-gradient(180deg,var(--cyan),var(--violet),var(--green));
          box-shadow:0 0 12px rgba(79,214,255,.55);
        }
        .interview-main{z-index:2}
        .interview-hero{
          position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden;
          clip:rect(0,0,0,0); white-space:nowrap; border:0;
        }
        .interview-kicker{
          margin:0 0 12px; font-family:ui-monospace,"Cascadia Code",Consolas,monospace;
          font-size:12px; letter-spacing:2px; color:var(--cyan); text-transform:uppercase;
        }
        .interview-title{margin:0; max-width:900px; color:#fff; font-size:clamp(36px,6vw,72px); line-height:1.04; letter-spacing:0}
        .interview-sub{max-width:760px; margin:20px 0 0; color:var(--mut); font-size:18px}
        .interview-meta-grid{display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-top:26px; max-width:840px}
        .interview-meta{border:1px solid var(--line); background:rgba(255,255,255,.035); border-radius:8px; padding:12px 13px; min-width:0}
        .interview-meta b{display:block; color:#fff; font-family:ui-monospace,"Cascadia Code",Consolas,monospace; font-size:13px}
        .interview-meta span{display:block; margin-top:4px; color:var(--mut); font-size:13px}
        .interview-deck{padding:clamp(10px,1.6vw,18px) 0 80px}
        .interview-deck .interview-wrap{width:100%; max-width:none; padding:0}
        .interview-head{
          display:none;
        }
        .interview-head h2{margin:0; color:#fff; font-size:24px; letter-spacing:0}
        .interview-head p{margin:5px 0 0; color:var(--mut); font-size:14px}
        .interview-pill{
          border:1px solid var(--line2); border-radius:8px; background:rgba(79,214,255,.055);
          color:var(--cyan); font-family:ui-monospace,"Cascadia Code",Consolas,monospace; font-size:12px; padding:8px 10px;
        }
        .interview-slide-list{display:grid; grid-template-columns:1fr; gap:clamp(14px,2vw,22px)}
        .interview-slide{
          scroll-margin-top:12px; border:0; border-radius:0; margin:0 auto;
          width:min(100vw,1600px); background:#000; box-shadow:0 20px 70px rgba(0,0,0,.36);
          overflow:hidden;
          opacity:0; transform:translateY(14px); transition:opacity .34s ease, transform .34s ease, border-color .2s ease;
        }
        .interview-slide.is-visible{opacity:1; transform:translateY(0)}
        .interview-slide:target{outline:1px solid rgba(79,214,255,.46); outline-offset:-1px}
        .interview-slide-bar{display:none}
        .interview-slide-bar b{color:#fff; font-weight:700}
        .interview-slide-media{padding:0; background:#000}
        .interview-slide-media img{
          display:block; width:100%; height:auto; aspect-ratio:16/9; object-fit:contain;
          background:#000; border-radius:0; pointer-events:none; user-select:none;
        }
        @media(max-width:760px){
          .interview-shell-inner{gap:10px; padding:8px 14px; flex-wrap:nowrap}
          .interview-brand img{height:24px}
          .interview-brand strong{font-size:13px}
          .interview-brand small{font-size:8px; letter-spacing:1.1px}
          .interview-shell-links{display:none}
          .interview-badge{margin-left:auto; min-width:0; padding:5px 7px; font-size:10px; white-space:nowrap}
          .interview-nav{z-index:70; padding-top:env(safe-area-inset-top)}
          .interview-nav .interview-wrap{padding:7px 8px; gap:8px}
          .interview-nav-label{display:none}
          .interview-strip{width:100%; gap:5px}
          .interview-strip a{min-width:34px; padding:5px 7px; font-size:11px}
          .interview-wrap{padding:0 16px}
          .interview-hero{padding:34px 0 12px}
          .interview-title{font-size:clamp(30px,9vw,42px)}
          .interview-sub{font-size:16px}
          .interview-meta-grid{grid-template-columns:1fr; margin-top:20px}
          .interview-meta{padding:9px 10px}
          .interview-meta b,.interview-meta span{font-size:12px}
          .interview-deck{padding-top:8px}
          .interview-slide-list{gap:10px}
          .interview-slide{scroll-margin-top:10px; width:100vw; box-shadow:0 14px 44px rgba(0,0,0,.34)}
          .interview-progress{right:4px; top:calc(14px + env(safe-area-inset-top)); bottom:calc(18px + env(safe-area-inset-bottom)); width:7px; opacity:.72}
        }
      `}</style>

      <canvas ref={canvasRef} className="interview-stars" aria-hidden="true" />

      <header className="interview-shell" aria-label="CuriousLabs site navigation">
        <div className="interview-shell-inner">
          <a className="interview-brand" href="/" aria-label="Back to the full CuriousLabs home page">
            <img src="/images/logo.svg" alt="" />
            <span>
              <strong>CuriousLabs</strong>
              <small>Mission Control</small>
            </span>
          </a>
          <nav className="interview-shell-links" aria-label="Site navigation">
            <a href="/">Home</a>
            <a href="/maestro/index.html">Maestro</a>
            <a href="/contact">Contact</a>
          </nav>
          <div className="interview-badge" aria-label="Deck size"><b>12</b> slides</div>
        </div>
      </header>

      <nav className="interview-nav" aria-label="Interview slide navigation">
        <div className="interview-wrap">
          <div className="interview-nav-label">Interview <b>Deck</b></div>
          <div className="interview-strip">
            {slides.map((slide) => (
              <a
                key={slide}
                href={`#slide-${slide}`}
                className={activeSlide === slide ? 'is-active' : ''}
                onClick={() => setActiveSlide(slide)}
              >
                {String(slide).padStart(2, '0')}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="interview-progress" aria-hidden="true">
        <span />
        <span style={{ height: `${progress.toFixed(1)}%` }} />
      </div>

      <main className="interview-main">
        <section className="interview-hero">
          <div className="interview-wrap">
            <p className="interview-kicker">CuriousLabs interview</p>
            <h1 className="interview-title">Interview Presentation</h1>
            <p className="interview-sub">CuriousLabs interview deck, prepared as a focused online presentation.</p>
            <div className="interview-meta-grid" aria-label="Presentation metadata">
              <div className="interview-meta"><b>Format</b><span>SVG slide deck</span></div>
              <div className="interview-meta"><b>Aspect</b><span>16:9 widescreen</span></div>
              <div className="interview-meta"><b>Delivery</b><span>Online presentation</span></div>
            </div>
          </div>
        </section>

        <section className="interview-deck" aria-label="Interview slide deck">
          <div className="interview-wrap">
            <div className="interview-head">
              <div>
                <h2>Presentation Slides</h2>
                <p>CuriousLabs interview sequence.</p>
              </div>
              <div className="interview-pill">Online deck</div>
            </div>

            <div className="interview-slide-list">
              {slides.map((slide) => (
                <article
                  className="interview-slide is-visible"
                  id={`slide-${slide}`}
                  key={slide}
                  data-slide-frame
                  data-slide-number={slide}
                >
                  <div className="interview-slide-bar">
                    <b>Slide {String(slide).padStart(2, '0')}</b>
                    <span>{slide} / {slides.length}</span>
                  </div>
                  <div className="interview-slide-media">
                    <img
                      src={`/interview/${slide}.svg`}
                      alt={`Interview presentation slide ${slide} of ${slides.length}`}
                      loading={slide === 1 ? 'eager' : 'lazy'}
                      fetchPriority={slide === 1 ? 'high' : undefined}
                      decoding="async"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
