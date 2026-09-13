import React from 'react';
import ChapterMark from '../kit/ChapterMark';
import { ClIcon } from '../ConsultationIcons';
import { Reveal, Stagger, KineticHeading } from '../ConsultationMotion';
import { openReading } from '../useConsultationPage';
import './css/sc-05-person.css';

function PersonScene() {
  return (
    <>
      {/* ── D4 · The person ──────────────────────────────────────── */}
      <ChapterMark n="03" label="PERSONAL, NOT OFF-THE-SHELF" />
      <section id="person" className="cl-section" aria-labelledby="cl-person-title" data-cl-section="D4">
        <div className="cl-person">
            <Reveal as="p" className="cl-eyebrow" y={12}><span>03 /</span> PERSONAL, NOT OFF-THE-SHELF</Reveal>
            <KineticHeading id="cl-person-title" level="h2" lines={['The person you', 'would work with.']} />
            <Stagger className="cl-person__strands" step={0.09} delay={0.15}>
              <Reveal as="span" y={12}><ClIcon name="work" /> Business advisory</Reveal>
              <Reveal as="span" y={12}><ClIcon name="compass" /> Hands-on AI practice</Reveal>
              <Reveal as="span" y={12}><ClIcon name="pin" /> This market</Reveal>
            </Stagger>
            <Reveal as="p" className="cl-person__opening" y={18}>
              I’m a business advisor first — eighteen years in the Khmer market, and hands-on with AI every day. I sit where the two meet, which is exactly where a lot of businesses now find themselves.
            </Reveal>
            <Reveal as="p" y={16} delay={0.08}>
              There’s no team behind this. I meet you, work out what’s really going on, propose a direction, and do the work myself.
            </Reveal>
            <Stagger step={0.12}>
              <Reveal className="cl-person__detail">
                <h3>AI practice</h3>
                <p>My own system, website, and planning artifacts are built with the methods I use with clients. I don’t advise on AI from the outside — I operate it across a large body of my own work.</p>
              </Reveal>
              <Reveal className="cl-person__detail">
                <h3>Business, and this market</h3>
                <p>Eighteen years in the Khmer market — food and beverage, real estate, hotels and restaurants I’ve helped lead, and a share in a well-known local food business. I know how these places actually run, and I know this market. That’s the part generic AI advice can’t fake.</p>
              </Reveal>
              <Reveal className="cl-person__detail">
                <h3>Cambodia and language</h3>
                <p>English and Khmer, in my own words — not through a translator who strips out the nuance, and not by handing over a manual to follow. I teach the reasoning, so your team can actually use it.</p>
              </Reveal>
            </Stagger>
            <Reveal as="p" y={14}>
              One package: business consultancy and advisory, with a real AI focus on top — from someone who has actually done both sides.
            </Reveal>
            <Reveal y={14}>
              <a href="#experience" className="cl-text-link" onClick={() => openReading('experience')}>
                More about my experience <ClIcon name="arrow" />
              </a>
            </Reveal>
        </div>
      </section>
    </>
  );
}

export default PersonScene;
