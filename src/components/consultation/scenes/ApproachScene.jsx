import React from 'react';
import ChapterMark from '../kit/ChapterMark';
import { ClIcon } from '../ConsultationIcons';
import { OperatorView, HarnessGraph, TrustSpectrum } from '../ConsultationGraphs';
import { Reveal, Stagger, KineticHeading } from '../ConsultationMotion';
import { closeReading } from '../useConsultationPage';
import './css/sc-06-approach.css';

const READINGS = [
  {
    id: 'method',
    key: 'R1',
    number: '01',
    title: 'About the method',
    question: 'How is the work organized, directed, and reviewed?',
    text: 'A prompt is only one part of how AI work is organized. The harness around it — context, stages, tools, handoffs, checks — is where the direction actually happens. I help you think about how the work is steered and how results are reviewed, instead of treating each output as a finished answer.'
  },
  {
    id: 'concept',
    key: 'R2',
    number: '02',
    title: 'About the concept',
    question: 'What changes when you operate AI across a larger undertaking?',
    text: 'The shift is from asking AI for isolated changes to directing it across a whole body of work. The operator’s view stays above the single request: what’s being attempted, how the pieces relate, and where direction and checking are needed. It isn’t just a bigger prompt.'
  },
  {
    id: 'technology',
    key: 'R3',
    number: '03',
    title: 'About the technology',
    question: 'Where can the capabilities help, and where should you not simply trust the output?',
    text: 'This is about the capabilities and their limits: where AI helps, where trust is warranted, and why checking matters. The focus is using and managing the technology in the work at hand — not tool rankings, not guarantees, not a how-to-code lesson.'
  },
  {
    id: 'experience',
    key: 'R4',
    number: '04',
    title: 'About the experience',
    question: 'How do business experience and AI practice connect?',
    text: 'Running businesses and operating AI point at the same question: how do you connect the technology to the work a company actually has to do? This draws on my own projects, a hospitality and food-and-beverage background, and years living and working in Cambodia.'
  }
];

function ApproachScene() {
  return (
    <>
      {/* ── D5 · The approach ────────────────────────────────────── */}
      <ChapterMark n="04" label="THE APPROACH" />
      <section id="approach" className="cl-section" aria-labelledby="cl-approach-title" data-cl-section="D5">
        <header className="cl-section-heading">
          <Reveal as="p" className="cl-eyebrow" y={12}><span>04 /</span> THE APPROACH</Reveal>
          <KineticHeading id="cl-approach-title" level="h2" lines={['Direct the work.', 'Keep checking it.']} />
          <Reveal as="p" className="cl-section-intro" delay={0.18}>
            Bringing AI into a business only works if the AI itself is dependable. This is how I make it dependable: I operate it the way you’d run a good team — clear direction, the right context, and checking where it matters — instead of trusting a single prompt to get it right.
          </Reveal>
          <Reveal as="p" className="cl-section-intro" delay={0.26}>
            That’s the difference between asking AI for one thing and running a whole body of work through it — knowing where to trust the output, and where to check it.
          </Reveal>
        </header>

        <Reveal className="cl-opview-wrap" y={20}>
          <OperatorView />
        </Reveal>

        <Reveal className="cl-contrast" y={24}>
          <div>
            <span className="cl-micro">AN ISOLATED REQUEST</span>
            <p>“Help me change this one thing.”</p>
          </div>
          <span className="cl-contrast__arrow" aria-hidden="true"><ClIcon name="arrow" /></span>
          <div>
            <span className="cl-micro">AN OPERATOR’S VIEW</span>
            <p>“What is the wider task, what context is needed, and how will the work be directed and checked?”</p>
          </div>
        </Reveal>
        <Reveal as="p" className="cl-caption" y={10}>Illustrative wording—not a client case or a named method.</Reveal>

        <Reveal className="cl-readings-heading" y={18}>
          <h3>Go a little deeper.</h3>
          <p>Open the subjects that interest you.</p>
        </Reveal>
        <Stagger className="cl-readings" step={0.08}>
          {READINGS.map((reading) => (
            <Reveal as="div" key={reading.id} y={16}>
              <details id={reading.id} className="cl-reading" data-cl-reading={reading.key}>
                <summary>
                  <span className="cl-reading__number">{reading.number}</span>
                  <span className="cl-reading__label">
                    <strong>{reading.title}</strong>
                    <span>{reading.question}</span>
                  </span>
                  <span className="cl-plus" aria-hidden="true"></span>
                </summary>
                <div className="cl-reading__body">
                  <p>{reading.text}</p>
                  {reading.key === 'R1' && (
                    <div className="cl-reading__graph"><HarnessGraph /></div>
                  )}
                  {reading.key === 'R3' && (
                    <div className="cl-reading__graph"><TrustSpectrum /></div>
                  )}
                  <button type="button" className="cl-text-button" onClick={closeReading}>
                    Close this topic <ClIcon name="close" />
                  </button>
                </div>
              </details>
            </Reveal>
          ))}
        </Stagger>
      </section>
    </>
  );
}

export default ApproachScene;
