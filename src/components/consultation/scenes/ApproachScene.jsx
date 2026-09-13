import React from 'react';
import { Band, Body, Display, Eyebrow, GhostButton, IconRow, Lead, NeonCard, NumberedRow, PrimaryButton, Tagline } from '../kit';
import { HarnessGraph, TrustSpectrum } from '../ConsultationGraphs';
import { closeReading } from '../useConsultationPage';
import OperatorPath from '../visuals/b-OperatorPath';
import ReadingCard from '../visuals/b-ReadingCard';
import { APPROACH_COPY } from './copy/approach.copy';
import './css/sc-06-approach.css';

const READINGS = [
  {
    id: 'method', key: 'R1', number: '01',
    text: 'A prompt is only one part of how AI work is organized. The harness around it — context, stages, tools, handoffs, checks — is where the direction actually happens. I help you think about how the work is steered and how results are reviewed, instead of treating each output as a finished answer.'
  },
  {
    id: 'concept', key: 'R2', number: '02',
    text: 'The shift is from asking AI for isolated changes to directing it across a whole body of work. The operator’s view stays above the single request: what’s being attempted, how the pieces relate, and where direction and checking are needed. It isn’t just a bigger prompt.'
  },
  {
    id: 'technology', key: 'R3', number: '03',
    text: 'This is about the capabilities and their limits: where AI helps, where trust is warranted, and why checking matters. The focus is using and managing the technology in the work at hand — not tool rankings, not guarantees, not a how-to-code lesson.'
  },
  {
    id: 'experience', key: 'R4', number: '04',
    text: 'Running businesses and operating AI point at the same question: how do you connect the technology to the work a company actually has to do? This draws on my own projects, a hospitality and food-and-beverage background, and years living and working in Cambodia.'
  }
];

const READING_ART = [
  { avif: '/consultation/art-07-reading-method.avif', webp: '/consultation/art-07-reading-method.webp', width: 800, height: 600 },
  { avif: '/consultation/art-23-reading-converging-roads.avif', webp: '/consultation/art-23-reading-converging-roads.webp', width: 800, height: 600 },
  { avif: '/consultation/art-10-reading-technology.avif', webp: '/consultation/art-10-reading-technology.webp', width: 800, height: 600 },
  { avif: '/consultation/art-24-reading-valley-overlook.avif', webp: '/consultation/art-24-reading-valley-overlook.webp', width: 800, height: 600 }
];

const ART_21 = {
  avif: '/consultation/art-21-first-light-ridges.avif',
  webp: '/consultation/art-21-first-light-ridges.webp',
  width: 1664,
  height: 936
};

const text = (slot) => slot.text;
const texts = (slots) => slots.map(text);

function ApproachScene() {
  const steps = APPROACH_COPY.steps.map((step) => ({
    icon: step.icon,
    title: text(step.title),
    text: text(step.text)
  }));

  return (
    <div className="sc06">
      <Band
        id="approach"
        sectionKey="D5"
        labelledBy="cl-approach-title"
        className="sc06__hero"
        art={{ desktop: ART_21, position: '24% 52%', scrim: 'right', parallax: 18 }}
      >
        <div className="sc06__hero-grid">
          <div className="sc06__hero-copy">
            <Eyebrow className="sc06__hero-eyebrow sc06__hero-eyebrow--desktop">{text(APPROACH_COPY.eyebrow)}</Eyebrow>
            <Eyebrow className="sc06__hero-eyebrow sc06__hero-eyebrow--mobile">{text(APPROACH_COPY.phoneEyebrow)}</Eyebrow>
            <Display id="cl-approach-title" lines={texts(APPROACH_COPY.title)} />
            <Lead>{text(APPROACH_COPY.lead)}</Lead>
            <div className="sc06__actions">
              <PrimaryButton href="#contact">{text(APPROACH_COPY.primaryAction)}</PrimaryButton>
              <GhostButton href="#approach-path">{text(APPROACH_COPY.secondaryAction)}</GhostButton>
            </div>
          </div>
          <Tagline className="sc06__hero-tagline" align="right" lines={texts(APPROACH_COPY.tagline)} />
        </div>
      </Band>

      <Band id="approach-path" className="sc06__path">
        <div className="sc06__path-header">
          <div>
            <Eyebrow>{text(APPROACH_COPY.pathEyebrow)}</Eyebrow>
            <Display as="h2" lines={texts(APPROACH_COPY.pathTitle)} />
          </div>
          <Body>{text(APPROACH_COPY.pathAside)}</Body>
        </div>
        <div className="sc06__path-desktop"><OperatorPath steps={steps} /></div>
        <div className="sc06__path-mobile">
          {steps.map((step, index) => (
            <NumberedRow key={step.title} n={index + 1} title={step.title} action="plus" accent={index === 3 ? 'lime' : 'cyan'}>
              <Body>{step.text}</Body>
            </NumberedRow>
          ))}
        </div>
      </Band>

      <Band id="perspectives" className="sc06__readings">
        <div className="sc06__readings-header">
          <div>
            <Eyebrow>{text(APPROACH_COPY.readingsEyebrow)}</Eyebrow>
            <Display as="h2" lines={texts(APPROACH_COPY.readingsTitle)} />
          </div>
          <Body>{text(APPROACH_COPY.readingsAside)}</Body>
        </div>
        <div className="sc06__reading-grid">
          {READINGS.map((reading, index) => {
            const cardCopy = APPROACH_COPY.readingCards[index];
            return (
              <ReadingCard
                key={reading.id}
                reading={{ ...reading, title: text(cardCopy.title), question: text(cardCopy.summary) }}
                label={text(cardCopy.label)}
                chips={texts(cardCopy.chips)}
                art={READING_ART[index]}
                onClose={closeReading}
              >
                {reading.key === 'R1' && <div className="cl-reading__graph"><HarnessGraph /></div>}
                {reading.key === 'R3' && <div className="cl-reading__graph"><TrustSpectrum /></div>}
              </ReadingCard>
            );
          })}
        </div>
      </Band>

      <Band className="sc06__closing" hairline="bottom">
        <NeonCard accent="cyan" className="sc06__closing-card">
          <blockquote>{text(APPROACH_COPY.closingQuote)}</blockquote>
          <div className="sc06__closing-points">
            {APPROACH_COPY.closingPoints.map((point) => (
              <IconRow
                key={text(point.title)}
                bare
                accent="lime"
                icon={point.icon}
                title={text(point.title)}
                text={text(point.text)}
              />
            ))}
          </div>
        </NeonCard>
      </Band>
    </div>
  );
}

export default ApproachScene;
