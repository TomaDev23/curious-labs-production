import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ClIcon } from '../ConsultationIcons';
import {
  Band, Eyebrow, Display, Lead, WordStack,
  NeonCard, IconRing, CardTitle, Body, MicroLabel, NumberedRow
} from '../kit';
import engagementCopy from './copy/engagement.copy';
import './css/sc-07-engagement.css';

const ART_22 = {
  avif: '/consultation/art-22-momentum-ribbons.avif',
  webp: '/consultation/art-22-momentum-ribbons.webp'
};

const STEPS = engagementCopy.steps.items;

/** DR-09: the rail fills node to node once the row scrolls into view. */
function Rail() {
  const reduced = useReducedMotion();
  return (
    <div className="e-rail__line" aria-hidden="true">
      <motion.div
        className="e-rail__fill"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      {STEPS.map((step, i) => (
        <motion.span
          key={step.n}
          className="e-rail__node"
          style={{ left: `${(i / (STEPS.length - 1)) * 100}%` }}
          initial={reduced ? false : { opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.4, delay: reduced ? 0 : 0.15 + i * 0.28 }}
        />
      ))}
    </div>
  );
}

function StepCard({ step, i }) {
  const titleId = `cl-engagement-step-${step.n}`;
  return (
    <li className="e-step">
      <NeonCard as="article" accent="cyan" aria-labelledby={titleId} className="e-step__card">
        <span className="e-step__n" aria-hidden="true">{step.n}</span>
        <IconRing icon={step.icon} accent="cyan" className="e-step__ring" />
        <CardTitle as="h3" id={titleId} className="e-step__title">{step.title}</CardTitle>
        <Body className="e-step__body">{step.text}</Body>
        <MicroLabel className="e-step__tag">{step.tag}</MicroLabel>
      </NeonCard>
      {i < STEPS.length - 1 && (
        <span className="e-step__arrow" aria-hidden="true"><ClIcon name="arrow" /></span>
      )}
    </li>
  );
}

function EngagementScene() {
  return (
    <Band
      id="engagement"
      sectionKey="D7"
      labelledBy="cl-engagement-title"
      className="e-band"
      art={{ desktop: ART_22, scrim: 'bottom', position: '50% 30%' }}
    >
      <header className="e-head">
        <div className="e-head__copy">
          <Eyebrow>{engagementCopy.eyebrow.text}</Eyebrow>
          <Display id="cl-engagement-title" lines={engagementCopy.h2.lines} />
          <Lead className="e-head__lead">{engagementCopy.lead.text}</Lead>
        </div>
        <WordStack words={engagementCopy.wordStack.words} className="e-head__stack" />
      </header>

      <div className="e-rail">
        <Rail />
        <ol className="e-rail__steps">
          {STEPS.map((step, i) => <StepCard key={step.n} step={step} i={i} />)}
        </ol>
      </div>

      <ol className="e-phone-steps">
        {STEPS.map((step) => (
          <NumberedRow
            key={step.n}
            as="li"
            n={step.n}
            icon={step.icon}
            title={step.title}
            text={step.text}
            action={null}
          />
        ))}
      </ol>

      <p className="e-boundary">{engagementCopy.boundary.text}</p>
    </Band>
  );
}

export default EngagementScene;
