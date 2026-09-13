import React from 'react';
import {
  Band, Eyebrow, Display, Lead, Body, CardTitle, MicroLabel, QuoteBlock, Tagline,
  PrimaryButton, CircleArrow, NeonCard, IconRing, Chips
} from '../kit';
import DoorVisual from '../visuals/DoorVisual';
import doorsCopy from './copy/doors.copy';
import './css/sc-02-doors.css';

const ART_01 = {
  avif: '/consultation/art-01-earth-horizon-desktop.avif',
  webp: '/consultation/art-01-earth-horizon-desktop.webp'
};

// Words: scenes/copy/doors.copy.js (COPY_CANON). Only presentation lives here.
const DOORS = [
  { id: 'technical', accent: 'cyan', icon: 'code', ...doorsCopy.cards.technical },
  { id: 'business', accent: 'violet', icon: 'building', ...doorsCopy.cards.business }
];

/** Globe in the top-right of the band (desktop only), faded by a mask, with a thin orbit line. */
function DoorsBackdrop() {
  return (
    <div className="d-backdrop">
      <picture className="d-backdrop__globe">
        <source type="image/avif" srcSet={ART_01.avif} />
        <img src={ART_01.webp} width="2560" height="1440" alt="" loading="lazy" decoding="async" />
      </picture>
      <svg className="d-backdrop__orbit" viewBox="0 0 1000 400" preserveAspectRatio="none" focusable="false">
        <ellipse cx="560" cy="210" rx="470" ry="118" />
        <circle className="d-backdrop__orbit-dot" cx="1016" cy="182" r="4" />
      </svg>
    </div>
  );
}

/** Perspective ground plane shared by both cards, with a light pool under each door. */
function DoorsFloor() {
  return (
    <div className="d-floor" aria-hidden="true">
      <div className="d-floor__grid" />
      <div className="d-floor__pool d-floor__pool--technical" />
      <div className="d-floor__pool d-floor__pool--business" />
    </div>
  );
}

function DoorCard({ door }) {
  const titleId = `cl-door-${door.id}-title`;
  return (
    <NeonCard as="article" accent={door.accent} className={`d-card d-card--${door.id}`}>
      <div className="d-card__copy">
        <IconRing icon={door.icon} accent={door.accent} className="d-card__ring" />
        <MicroLabel className="d-card__micro">{door.micro}</MicroLabel>
        {/* Desktop and phone (MOCK-M1 short form) copy: only one pair is displayed, the other is display:none, so screen readers get one. */}
        <CardTitle id={titleId} feature lines={door.title} className="d-card__title d-card__title--desk" />
        <CardTitle lines={door.phoneTitle} className="d-card__title d-card__title--phone" />
        <CircleArrow href="#contact" label={`${door.cta}: ${door.micro.toLowerCase()}`} className="d-card__arrow" />
        <Body className="d-card__body d-card__body--desk">{door.body}</Body>
        <Body className="d-card__body d-card__body--phone">{door.phoneBody}</Body>
        <Chips items={door.chips} accent={door.accent} label={`${door.micro}: focus areas`} className="d-card__chips" />
        <PrimaryButton href="#contact" className="d-card__cta">{door.cta}</PrimaryButton>
        <p className="d-card__foot">{door.foot}</p>
      </div>
      <DoorVisual variant={door.id} />
    </NeonCard>
  );
}

function AudienceScene() {
  return (
    <Band
      id="audiences"
      sectionKey="D2"
      labelledBy="cl-audiences-title"
      className="d-band"
      art={<DoorsBackdrop />}
    >
      <header className="d-head">
        <div className="d-head__copy">
          <Eyebrow>{doorsCopy.eyebrow.text}</Eyebrow>
          <Display id="cl-audiences-title" lines={doorsCopy.headline.lines} />
          <Lead className="d-head__lead">{doorsCopy.lead.text}</Lead>
        </div>
        <QuoteBlock quote={doorsCopy.quote.lines} label={doorsCopy.quoteLabel.text} className="d-head__quote" />
      </header>

      <div className="d-doors">
        <DoorsFloor />
        {DOORS.map((door) => <DoorCard key={door.id} door={door} />)}
      </div>

      <div className="d-closers">
        <Tagline lines={doorsCopy.closerLeft.lines} className="d-closers__left" />
        <Tagline lines={doorsCopy.closerRight.lines} align="right" className="d-closers__right" />
        <Tagline lines={doorsCopy.closerPhone.lines} align="center" className="d-closers__phone" />
      </div>
    </Band>
  );
}

export default AudienceScene;
