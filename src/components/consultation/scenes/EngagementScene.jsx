import React from 'react';
import ChapterMark from '../kit/ChapterMark';
import { ClIcon } from '../ConsultationIcons';
import { FlowGraph } from '../ConsultationGraphs';
import { Reveal, KineticHeading } from '../ConsultationMotion';

function EngagementScene() {
  return (
    <>
      {/* ── D7 · Engagement ──────────────────────────────────────── */}
      <ChapterMark n="05" label="FROM CONVERSATION TO AGREED WORK" />
      <section id="engagement" className="cl-section" aria-labelledby="cl-engagement-title" data-cl-section="D7">
        <header className="cl-section-heading">
          <Reveal as="p" className="cl-eyebrow" y={12}><span>05 /</span> FROM CONVERSATION TO AGREED WORK</Reveal>
          <KineticHeading id="cl-engagement-title" level="h2" lines={['A conversation first.', 'A tailored engagement after.']} />
          <Reveal as="p" className="cl-section-intro" delay={0.18}>
            The first conversation gives you understanding and a direction, free. Everything past it is proposed, confirmed, and agreed before any work starts.
          </Reveal>
        </header>

        <FlowGraph />

        <Reveal className="cl-boundary" y={22}>
          <span className="cl-icon-ring"><ClIcon name="shield" /></span>
          <div>
            <h3>Free discussion. Separately agreed work.</h3>
            <p>The first conversation gives you understanding and a direction. The email summary records what we discussed; the proposal and quote follow once I’ve had time to develop the approach.</p>
            <p>Materials and delivery only begin after the proposal is confirmed and the arrangements are settled.</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default EngagementScene;
