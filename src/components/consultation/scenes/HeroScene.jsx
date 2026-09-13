import React from 'react';
import { ClIcon } from '../ConsultationIcons';
import ConsultationOrbit from '../ConsultationOrbit';
import { Reveal, Stagger } from '../ConsultationMotion';

function HeroScene() {
  return (
    <>
      {/* ── D1 · Opening ─────────────────────────────────────────── */}
      <section id="overview" className="cl-hero cl-panel" aria-labelledby="cl-page-title" data-cl-section="D1">
        <span className="cl-panel__corner cl-panel__corner--tl" aria-hidden="true"></span>
        <span className="cl-panel__corner cl-panel__corner--tr" aria-hidden="true"></span>
        <span className="cl-panel__corner cl-panel__corner--bl" aria-hidden="true"></span>
        <span className="cl-panel__corner cl-panel__corner--br" aria-hidden="true"></span>
        <span className="cl-hero__vmeta" aria-hidden="true">STRATEGY · MANAGEMENT · AI</span>
        <div className="cl-hero__copy">
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
        <div className="cl-hero__visual">
          <div className="cl-hero__signal" aria-hidden="true"></div>
          <ConsultationOrbit />
        </div>
        <div className="cl-hero__meta">
          <span><ClIcon name="people" /> Personally delivered</span>
          <span><ClIcon name="pin" /> Phnom Penh / Online</span>
          <span><ClIcon name="chat" /> English &amp; Khmer</span>
          <span className="cl-hero__meta-label">CURIOUSLABS // BUSINESS CONSULTATION · AI</span>
        </div>
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
