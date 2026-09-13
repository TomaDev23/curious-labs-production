import React from 'react';
import { ClIcon } from '../ConsultationIcons';
import ConsultationOrbit from '../ConsultationOrbit';
import { Reveal, Stagger } from '../ConsultationMotion';
import SceneArt from '../kit/SceneArt';
import SceneSeam from '../kit/SceneSeam';

const ART_01_DESKTOP = {
  avif: '/consultation/art-01-earth-horizon-desktop.avif',
  webp: '/consultation/art-01-earth-horizon-desktop.webp',
  width: 2560,
  height: 1440
};
const ART_01_MOBILE = {
  avif: '/consultation/art-01-earth-horizon-mobile.avif',
  webp: '/consultation/art-01-earth-horizon-mobile.webp',
  width: 960,
  height: 1280
};

function HeroScene() {
  return (
    <>
      {/* ── D1 · Opening ─────────────────────────────────────────── */}
      <section id="overview" className="cl-hero-stage" aria-labelledby="cl-page-title" data-cl-section="D1">
        <SceneArt
          priority
          scrim="left"
          desktop={ART_01_DESKTOP}
          mobile={ART_01_MOBILE}
          position="70% 50%"
          parallax={24}
          className="cl-hero-stage__art"
        />
        <div className="cl-hero-stage__grid">
          <div className="cl-hero-stage__copy">
            <p className="cl-eyebrow"><span>//</span> BUSINESS CONSULTATION IN THE AGE OF AI</p>
            <h1 id="cl-page-title">
              Business consultation,<br />in the age of AI.
            </h1>
            <p className="cl-lead">
              I’m a business advisor who now operates AI hands-on, every day. If you’re trying to bring AI into your business — whether you’ve already started or don’t know where to begin — I help you work out what you actually need, and turn it into something you can act on. Business consultancy first, with a real AI focus on top.
            </p>
            <p className="cl-hero__invitation">
              Bring one real situation from your business. The first conversation is free.
            </p>
            <div className="cl-actions">
              <a className="cl-button cl-button--primary" href="#contact">
                Start a free conversation <ClIcon name="arrow" />
              </a>
              <a className="cl-button cl-button--secondary" href="#approach">
                See how it works <ClIcon name="diagonal" />
              </a>
            </div>
          </div>
          <div className="cl-hero-stage__orbit">
            <ConsultationOrbit />
          </div>
          <div className="cl-hero__meta">
            <span><ClIcon name="people" /> Personally delivered</span>
            <span><ClIcon name="pin" /> Phnom Penh / Online</span>
            <span><ClIcon name="chat" /> English &amp; Khmer</span>
            <span className="cl-hero__meta-label">CURIOUSLABS // BUSINESS CONSULTATION · AI</span>
          </div>
        </div>
        <SceneSeam edge="bottom" />
      </section>

      <Stagger className="cl-jump-links" as="nav" aria-label="On this page" step={0.055}>
        <Reveal as="span" className="cl-micro" y={10}>EXPLORE THE PAGE</Reveal>
        <Reveal as="a" href="#contribution" y={10}>What I help with <ClIcon name="arrow" /></Reveal>
        <Reveal as="a" href="#person" y={10}>About me <ClIcon name="arrow" /></Reveal>
        <Reveal as="a" href="#approach" y={10}>The approach <ClIcon name="arrow" /></Reveal>
        <Reveal as="a" href="#questions" y={10}>Questions <ClIcon name="arrow" /></Reveal>
        <Reveal as="a" href="#contact" y={10}>Contact <ClIcon name="arrow" /></Reveal>
      </Stagger>
    </>
  );
}

export default HeroScene;
