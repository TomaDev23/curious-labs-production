import React from 'react';
import ChapterMark from '../kit/ChapterMark';
import { ClIcon } from '../ConsultationIcons';
import { StatTrio } from '../ConsultationGraphs';
import { Reveal, Stagger, KineticHeading } from '../ConsultationMotion';
import './css/sc-02-doors.css';
import './css/sc-03-walls.css';

function AudienceScene() {
  return (
    <>
      {/* ── D2 · Audiences ───────────────────────────────────────── */}
      <ChapterMark n="01" label="WHO THIS IS FOR" />
      <section id="audiences" className="cl-section" aria-labelledby="cl-audiences-title" data-cl-section="D2">
        <header className="cl-section-heading cl-heading-split">
          <div>
            <Reveal as="p" className="cl-eyebrow" y={12}><span>01 /</span> WHO THIS IS FOR</Reveal>
            <KineticHeading id="cl-audiences-title" level="h2" lines={['Two kinds of company.', 'Two ways in.']} />
          </div>
          <Reveal as="p" className="cl-section-intro" delay={0.2}>
            The focus is the same — getting genuine value from AI.<br />Where we begin depends on what kind of company you are.
          </Reveal>
        </header>

        <Stagger className="cl-audiences" step={0.12}>
          <Reveal as="article" className="cl-audience-card">
            <div className="cl-card-top">
              <span className="cl-icon-ring"><ClIcon name="code" /></span>
              <span className="cl-micro">INTEGRATING AI AT SCALE</span>
            </div>
            <h3>Technical companies</h3>
            <p>You already build tech products, and you want AI integrated into how the team works — but doing that at scale is a problem of its own. I help with the coordination and the harnessing rules that stop the AI sabotaging itself as you hand more of the work to it.</p>
            <p className="cl-card-foot">Business advisory. Not programming instruction.</p>
          </Reveal>
          <Reveal as="article" className="cl-audience-card cl-audience-card--biz">
            <div className="cl-card-top">
              <span className="cl-icon-ring"><ClIcon name="work" /></span>
              <span className="cl-micro">LEVERAGING AI</span>
            </div>
            <h3>Companies new to AI</h3>
            <p>You want to leverage AI but you’re not technical. I help you see where it genuinely helps — the real use cases — and design the harness that fits how your business actually works. Settings like hotels, restaurants, and factories are where I’ve done it.</p>
            <p className="cl-card-foot">Business consultation. No code required.</p>
          </Reveal>
        </Stagger>

        <Reveal as="p" className="cl-recognition__intro" y={14}>Whichever side you’re on, using AI well runs into the same three walls.</Reveal>
        <StatTrio />

        <Reveal as="p" className="cl-bridge" y={14}><span></span>It starts with your situation. We shape the work around it.</Reveal>
      </section>
    </>
  );
}

export default AudienceScene;
