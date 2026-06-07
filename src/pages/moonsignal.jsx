import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const slides = Array.from({ length: 17 }, (_, index) => index + 1);
const contactEmailCodes = [116, 111, 119, 99, 97, 109, 98, 111, 100, 105, 97, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];

const getContactEmail = () => String.fromCharCode(...contactEmailCodes);

export default function MoonSignalDeck() {
  const canvasRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const [progress, setProgress] = useState(0);
  const [copyState, setCopyState] = useState('idle');

  const writeClipboardText = async (text) => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (error) {
        console.warn('Clipboard API copy failed, trying textarea fallback.', error);
      }
    }

    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '-9999px';
    textArea.style.width = '1px';
    textArea.style.height = '1px';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (!copied) {
      throw new Error('Clipboard copy was blocked');
    }
  };

  const copyContactEmail = async () => {
    setCopyState('copying');

    try {
      await writeClipboardText(getContactEmail());
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 2600);
    } catch (error) {
      console.error(error);
      setCopyState('failed');
      window.setTimeout(() => setCopyState('idle'), 3200);
    }
  };

  useEffect(() => {
    document.title = 'MoonSignal Presentation | CuriousLabs';
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
      const count = Math.max(40, Math.floor((window.innerWidth * window.innerHeight) / 10500));
      stars = Array.from({ length: count }, () => {
        const tone = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: (Math.random() * 1.2 + 0.2) * dpr,
          a: Math.random() * Math.PI * 2,
          s: Math.random() * 0.015 + 0.003,
          vx: (Math.random() - 0.5) * 0.032 * dpr,
          col: tone < 0.18 ? '255,190,92' : tone < 0.44 ? '75,226,190' : '220,235,255',
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
        const alpha = reducedMotion ? 0.44 : 0.26 + Math.abs(Math.sin(star.a)) * 0.5;
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
    const frames = Array.from(document.querySelectorAll('[data-moonsignal-slide]'));
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

  const copyButtonLabel = copyState === 'copying'
    ? 'Copying...'
    : copyState === 'copied'
      ? 'Email copied'
      : copyState === 'failed'
        ? 'Copy failed'
        : 'CONTACT-Copy email';

  return (
    <div className="moonsignal-page">
      <Helmet>
        <title>MoonSignal Presentation | CuriousLabs</title>
        <meta
          name="description"
          content="A responsive MoonSignal presentation deck with full-width online slide viewing."
        />
        <meta property="og:title" content="MoonSignal Presentation | CuriousLabs" />
        <meta property="og:description" content="A responsive MoonSignal online deck prepared for full-screen review." />
      </Helmet>

      <style>{`
        .moonsignal-page{
          --bg0:#040508; --line:rgba(111,244,214,.16); --line2:rgba(255,190,92,.28);
          --ink:#dfe8ee; --mut:#9eb1bb; --teal:#4be2be; --amber:#ffbe5c; --blue:#78d6ff;
          min-height:100svh; color:var(--ink); background-color:var(--bg0);
          background-image:linear-gradient(180deg,#081014 0%,#05080d 46%,#040508 100%),
            linear-gradient(90deg,rgba(75,226,190,.035) 1px,transparent 1px),
            linear-gradient(180deg,rgba(255,190,92,.026) 1px,transparent 1px);
          background-size:auto,72px 72px,72px 72px;
          font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
          line-height:1.6; overflow:visible; padding-bottom:env(safe-area-inset-bottom);
        }
        .moonsignal-page::before{
          content:""; position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            linear-gradient(135deg,rgba(75,226,190,.07),transparent 34%,rgba(255,190,92,.055) 100%),
            radial-gradient(circle at 50% 0%,rgba(120,214,255,.055),transparent 34%);
        }
        .moonsignal-stars{position:fixed; inset:0; z-index:1; display:block; opacity:.56; pointer-events:none}
        .moonsignal-shell,.moonsignal-nav,.moonsignal-note,.moonsignal-main,.moonsignal-progress,.moonsignal-footer{position:relative}
        .moonsignal-shell{
          z-index:80; padding-top:env(safe-area-inset-top);
          background:linear-gradient(180deg,rgba(2,8,10,.96),rgba(4,10,13,.88));
          border-bottom:1px solid rgba(75,226,190,.22); box-shadow:0 20px 55px rgba(0,0,0,.35);
          backdrop-filter:blur(18px);
        }
        .moonsignal-shell-inner{display:flex; align-items:center; gap:18px; width:100%; padding:12px 22px}
        .moonsignal-brand{display:flex; align-items:center; gap:10px; color:#fff; min-width:0; text-decoration:none}
        .moonsignal-brand img{height:28px; width:auto; filter:drop-shadow(0 0 8px rgba(75,226,190,.35))}
        .moonsignal-brand strong{display:block; font-size:15px; letter-spacing:.3px; color:var(--teal)}
        .moonsignal-brand small{
          display:block; margin-top:-2px; font-family:ui-monospace,"Cascadia Code",Consolas,monospace;
          font-size:10px; letter-spacing:1.6px; text-transform:uppercase; color:rgba(255,255,255,.58)
        }
        .moonsignal-shell-links{display:flex; align-items:center; justify-content:flex-end; gap:8px; margin-left:auto; flex-wrap:wrap}
        .moonsignal-shell-links a{
          color:rgba(255,255,255,.76); font-family:ui-monospace,"Cascadia Code",Consolas,monospace;
          font-size:12px; letter-spacing:.4px; padding:7px 10px; border:1px solid transparent;
          border-radius:8px; transition:.18s; text-decoration:none;
        }
        .moonsignal-shell-links a:hover{color:#fff; background:rgba(75,226,190,.1); border-color:rgba(75,226,190,.22)}
        .moonsignal-badge{
          display:flex; align-items:center; gap:7px; padding:7px 10px; border-radius:8px;
          border:1px solid rgba(255,190,92,.25); background:rgba(255,190,92,.075);
          color:rgba(255,255,255,.72); font-family:ui-monospace,"Cascadia Code",Consolas,monospace;
          font-size:11px; letter-spacing:.35px;
        }
        .moonsignal-badge b{color:var(--amber)}
        .moonsignal-wrap{width:min(1180px,100%); margin:0 auto; padding:0 22px}
        .moonsignal-nav{
          z-index:60;
          background:linear-gradient(180deg,rgba(5,10,13,.93),rgba(5,10,13,.62));
          border-bottom:1px solid var(--line); backdrop-filter:blur(14px);
        }
        .moonsignal-nav .moonsignal-wrap{display:flex; align-items:center; gap:16px; padding-top:8px; padding-bottom:8px}
        .moonsignal-nav-label{flex:0 0 auto; color:#fff; font-weight:740; font-size:13px; letter-spacing:.5px}
        .moonsignal-nav-label b{color:var(--teal)}
        .moonsignal-strip{
          min-width:0; display:flex; align-items:center; gap:6px; overflow-x:auto; overscroll-behavior-x:contain;
          padding:2px 2px 4px; scrollbar-width:thin; scrollbar-color:rgba(75,226,190,.45) rgba(5,10,13,.96);
        }
        .moonsignal-strip::-webkit-scrollbar{height:6px}
        .moonsignal-strip::-webkit-scrollbar-track{background:rgba(5,10,13,.96); border-radius:999px}
        .moonsignal-strip::-webkit-scrollbar-thumb{background:rgba(75,226,190,.45); border-radius:999px}
        .moonsignal-strip a{
          flex:0 0 auto; min-width:38px; text-align:center; padding:5px 8px; text-decoration:none;
          color:var(--mut); border:1px solid transparent; border-radius:8px;
          font-family:ui-monospace,"Cascadia Code",Consolas,monospace; font-size:12px; transition:.18s;
        }
        .moonsignal-strip a:hover,.moonsignal-strip a.is-active{color:#fff; background:rgba(75,226,190,.12); border-color:rgba(75,226,190,.34)}
        .moonsignal-note{
          z-index:4; border-bottom:1px solid var(--line);
          background:linear-gradient(180deg,rgba(7,12,14,.88),rgba(7,12,14,.58));
          backdrop-filter:blur(14px);
        }
        .moonsignal-note .moonsignal-wrap{
          display:flex; align-items:center; gap:10px; padding-top:10px; padding-bottom:10px;
          color:rgba(255,255,255,.82); font-size:13px;
        }
        .moonsignal-note-icon{
          flex:0 0 auto; display:inline-flex; align-items:center; justify-content:center;
          width:25px; height:20px; border:1px solid rgba(255,190,92,.42); border-radius:5px;
          color:var(--amber); font-family:ui-monospace,"Cascadia Code",Consolas,monospace; font-size:10px; font-weight:800;
        }
        .moonsignal-progress{
          position:fixed; right:max(10px,env(safe-area-inset-right)); top:calc(16px + env(safe-area-inset-top));
          bottom:calc(24px + env(safe-area-inset-bottom)); width:8px; z-index:50; pointer-events:none;
        }
        .moonsignal-progress span:first-child{
          position:absolute; inset:0 3px; border-radius:999px; background:rgba(75,226,190,.12);
          border:1px solid rgba(75,226,190,.14);
        }
        .moonsignal-progress span:last-child{
          position:absolute; left:3px; right:3px; top:0; height:0%; border-radius:999px;
          background:linear-gradient(180deg,var(--teal),var(--amber),var(--blue));
          box-shadow:0 0 12px rgba(75,226,190,.52);
        }
        .moonsignal-main{z-index:2}
        .moonsignal-hero{
          position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden;
          clip:rect(0,0,0,0); white-space:nowrap; border:0;
        }
        .moonsignal-deck{padding:clamp(10px,1.6vw,18px) 0 54px}
        .moonsignal-deck .moonsignal-wrap{width:100%; max-width:none; padding:0}
        .moonsignal-slide-list{display:grid; grid-template-columns:1fr; gap:clamp(14px,2vw,22px)}
        .moonsignal-slide{
          scroll-margin-top:12px; border:0; border-radius:0; margin:0 auto;
          width:min(100vw,1600px); background:#000; box-shadow:0 20px 70px rgba(0,0,0,.36);
          overflow:hidden;
          opacity:0; transform:translateY(14px); transition:opacity .34s ease, transform .34s ease;
        }
        .moonsignal-slide.is-visible{opacity:1; transform:translateY(0)}
        .moonsignal-slide:target{outline:1px solid rgba(75,226,190,.46); outline-offset:-1px}
        .moonsignal-slide-media{padding:0; background:#000}
        .moonsignal-slide-media img{
          display:block; width:100%; height:auto; aspect-ratio:16/9; object-fit:contain;
          background:#000; border-radius:0; pointer-events:none; user-select:none;
        }
        .moonsignal-footer{
          z-index:3; border-top:1px solid var(--line);
          background:linear-gradient(180deg,rgba(4,8,10,.56),rgba(2,4,5,.92));
          padding:18px 0 calc(22px + env(safe-area-inset-bottom));
        }
        .moonsignal-footer .moonsignal-wrap{
          display:flex; align-items:center; justify-content:space-between; gap:14px;
        }
        .moonsignal-footer-copy{min-width:0}
        .moonsignal-footer-copy b{display:block; color:#fff; font-size:14px; line-height:1.25}
        .moonsignal-footer-copy span{display:block; margin-top:2px; color:var(--mut); font-size:12px; line-height:1.35}
        .moonsignal-contact-button{
          appearance:none; display:inline-flex; align-items:center; justify-content:center; gap:8px; min-height:38px;
          border:1px solid rgba(75,226,190,.34); border-radius:8px; background:linear-gradient(180deg,#6ff2d5,#4be2be);
          color:#03100d; font-family:ui-monospace,"Cascadia Code",Consolas,monospace;
          font-size:12px; font-weight:800; letter-spacing:.2px; line-height:1; padding:10px 12px; cursor:pointer;
          transition:filter .18s,transform .18s,box-shadow .18s;
          box-shadow:0 0 0 rgba(75,226,190,0);
        }
        .moonsignal-contact-button:hover{filter:brightness(1.05); transform:translateY(-1px); box-shadow:0 0 20px rgba(75,226,190,.18)}
        .moonsignal-contact-button:disabled{opacity:.68; cursor:wait; transform:none}
        .moonsignal-contact-icon{
          flex:0 0 auto; display:inline-flex; align-items:center; justify-content:center;
          width:21px; height:18px; border:1px solid rgba(3,16,13,.32); border-radius:5px;
          font-size:9px; font-weight:900;
        }
        @media(max-width:760px){
          .moonsignal-shell-inner{gap:10px; padding:8px 14px; flex-wrap:nowrap}
          .moonsignal-brand img{height:24px}
          .moonsignal-brand strong{font-size:13px}
          .moonsignal-brand small{font-size:8px; letter-spacing:1.1px}
          .moonsignal-shell-links{display:none}
          .moonsignal-badge{margin-left:auto; min-width:0; padding:5px 7px; font-size:10px; white-space:nowrap}
          .moonsignal-nav{z-index:70; padding-top:env(safe-area-inset-top)}
          .moonsignal-nav .moonsignal-wrap{padding:7px 8px; gap:8px}
          .moonsignal-nav-label{display:none}
          .moonsignal-strip{width:100%; gap:5px}
          .moonsignal-strip a{min-width:34px; padding:5px 7px; font-size:11px}
          .moonsignal-note .moonsignal-wrap{padding:9px 12px; font-size:12px; line-height:1.35}
          .moonsignal-wrap{padding:0 16px}
          .moonsignal-deck{padding-top:8px}
          .moonsignal-slide-list{gap:10px}
          .moonsignal-slide{scroll-margin-top:10px; width:100vw; box-shadow:0 14px 44px rgba(0,0,0,.34)}
          .moonsignal-progress{right:4px; top:calc(14px + env(safe-area-inset-top)); bottom:calc(18px + env(safe-area-inset-bottom)); width:7px; opacity:.72}
          .moonsignal-footer .moonsignal-wrap{display:block; padding:0 12px}
          .moonsignal-footer-copy b{font-size:13px}
          .moonsignal-footer-copy span{font-size:11px}
          .moonsignal-contact-button{width:100%; margin-top:10px; min-height:38px; font-size:11px}
        }
      `}</style>

      <canvas ref={canvasRef} className="moonsignal-stars" aria-hidden="true" />

      <header className="moonsignal-shell" aria-label="CuriousLabs site navigation">
        <div className="moonsignal-shell-inner">
          <a className="moonsignal-brand" href="/" aria-label="Back to the full CuriousLabs home page">
            <img src="/images/logo.svg" alt="" />
            <span>
              <strong>CuriousLabs</strong>
              <small>Mission Control</small>
            </span>
          </a>
          <nav className="moonsignal-shell-links" aria-label="Site navigation">
            <a href="/">Home</a>
            <a href="/maestro/index.html">Maestro</a>
            <a href="/contact">Contact</a>
          </nav>
          <div className="moonsignal-badge" aria-label="Deck size"><b>{slides.length}</b> slides</div>
        </div>
      </header>

      <nav className="moonsignal-nav" aria-label="MoonSignal slide navigation">
        <div className="moonsignal-wrap">
          <div className="moonsignal-nav-label">MoonSignal <b>Deck</b></div>
          <div className="moonsignal-strip">
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

      <section className="moonsignal-note" aria-label="Viewing note">
        <div className="moonsignal-wrap">
          <span className="moonsignal-note-icon" aria-hidden="true">FS</span>
          <span>Best viewed full screen to capture all details.</span>
        </div>
      </section>

      <div className="moonsignal-progress" aria-hidden="true">
        <span />
        <span style={{ height: `${progress.toFixed(1)}%` }} />
      </div>

      <main className="moonsignal-main">
        <section className="moonsignal-hero">
          <h1>MoonSignal Presentation</h1>
          <p>MoonSignal online deck, prepared as a focused full-width presentation.</p>
        </section>

        <section className="moonsignal-deck" aria-label="MoonSignal slide deck">
          <div className="moonsignal-wrap">
            <div className="moonsignal-slide-list">
              {slides.map((slide) => (
                <article
                  className="moonsignal-slide is-visible"
                  id={`slide-${slide}`}
                  key={slide}
                  data-moonsignal-slide
                  data-slide-number={slide}
                >
                  <div className="moonsignal-slide-media">
                    <img
                      src={`/moonsignal/${slide}.svg`}
                      alt={`MoonSignal presentation slide ${slide} of ${slides.length}`}
                      loading={slide === 1 ? 'eager' : 'lazy'}
                      fetchpriority={slide === 1 ? 'high' : undefined}
                      decoding="async"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="moonsignal-footer">
        <div className="moonsignal-wrap">
          <div className="moonsignal-footer-copy">
            <b>Property of Tom Steinmetz</b>
            <span>Limited distribution.</span>
          </div>
          <button
            className="moonsignal-contact-button"
            type="button"
            onClick={copyContactEmail}
            disabled={copyState === 'copying'}
            aria-live="polite"
          >
            <span className="moonsignal-contact-icon" aria-hidden="true">{copyState === 'copied' ? 'OK' : 'CP'}</span>
            <span>{copyButtonLabel}</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
