import React from 'react';
import ChapterMark from '../kit/ChapterMark';
import { ClIcon } from '../ConsultationIcons';
import { Reveal, Stagger, KineticHeading } from '../ConsultationMotion';
import './css/sc-04-contribution.css';

/* Three consolidated themes (T1–T3). Source subjects folded in:
   T1 ← S1 · T2 ← S2/S3/S4 (the core) · T3 ← S5/S6. These are areas the
   work draws from, never a menu to buy from. */
const SUBJECTS = [
  {
    id: 'S1',
    icon: 'search',
    number: '01',
    title: 'Find where AI is actually worth it.',
    text: 'Not every problem needs AI. I help you see where it genuinely earns its place in your business — and where it doesn’t.'
  },
  {
    id: 'S2',
    icon: 'layers',
    number: '02',
    title: 'Build the harness and the methods.',
    text: 'The setup that keeps AI dependable — the harness, the checks, the way of working — so it holds up when the work gets real, instead of collapsing under its own weight.'
  },
  {
    id: 'S3',
    icon: 'people',
    number: '03',
    title: 'Plan it, and train your people.',
    text: 'Plan the systems properly and teach the people who’ll use them, so what we put in place takes hold and keeps working — in English or Khmer.'
  }
];

function ContributionScene() {
  return (
    <>
      {/* ── D3 · Contribution ────────────────────────────────────── */}
      <ChapterMark n="02" label="WHAT I ACTUALLY DO" />
      <section id="contribution" className="cl-section" aria-labelledby="cl-contribution-title" data-cl-section="D3">
        <header className="cl-section-heading">
          <Reveal as="p" className="cl-eyebrow" y={12}><span>02 /</span> WHAT I ACTUALLY DO</Reveal>
          <KineticHeading
            id="cl-contribution-title"
            level="h2"
            lines={['Bring me the problem.', 'Leave with real clarity.']}
          />
          <Reveal as="p" className="cl-section-intro" delay={0.2}>
            This isn’t technical work — it’s business consultancy, from someone who operates AI hands-on every day. I sit down with you, work out what you actually need — whether you’re already using AI or just want to start — and give it back as clarity: solutions and ideas you can turn into a strategy of your own.
          </Reveal>
        </header>

        <Stagger className="cl-subject-grid" step={0.075}>
          {SUBJECTS.map((subject) => (
            <Reveal as="article" key={subject.id} className={`cl-subject${subject.id === 'S1' ? ' cl-subject--feature' : ''}`} data-cl-subject={subject.id}>
              <div className="cl-card-top">
                <span className="cl-icon-ring"><ClIcon name={subject.icon} /></span>
                <span className="cl-subject__index" aria-hidden="true">{subject.number}</span>
              </div>
              <h3>{subject.title}</h3>
              <p>{subject.text}</p>
            </Reveal>
          ))}
        </Stagger>

        <Reveal className="cl-delivery-band" y={22}>
          <div>
            <p className="cl-micro">SHAPED AROUND YOUR WORK</p>
            <h3>What an engagement can hold</h3>
          </div>
          <div>
            <p>At its core, a report and one-to-one sessions with the people it’s for. Everything around that — the materials, the format, who’s trained, how long it runs, what support follows — is set for your situation.</p>
            <p>Workshops, weekly meetings, ongoing support: all possible where they earn their place. None of them automatic.</p>
          </div>
        </Reveal>
        <Reveal className="cl-scope-note" y={18}>
          <p>This is business advisory, not engineering. I help you understand, decide, and plan — I don’t write your code or build your product.</p>
          <a className="cl-text-link" href="#contact">Discuss your situation <ClIcon name="arrow" /></a>
        </Reveal>
        <Reveal as="p" className="cl-bridge" y={14}><span></span>The aim is simple: new capability that actually lands inside a working business.</Reveal>
      </section>
    </>
  );
}

export default ContributionScene;
