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

// Headline, intro, titles and bodies: COPY_DECK_v2 (unchanged from the
// previous scene). Slots the mockup adds come from doors.copy.js.
const DOORS = [
  {
    id: 'technical',
    accent: 'cyan',
    icon: 'code',
    micro: 'Integrating AI at scale',
    title: 'Technical companies',
    body: 'You already build tech products, and you want AI integrated into how the team works — but doing that at scale is a problem of its own. I help with the coordination and the harnessing rules that stop the AI sabotaging itself as you hand more of the work to it.',
    foot: 'Business advisory. Not programming instruction.',
    chips: doorsCopy.technical.chips.items
  },
  {
    id: 'business',
    accent: 'violet',
    icon: 'building',
    micro: 'Leveraging AI',
    title: 'Companies new to AI',
    body: 'You want to leverage AI but you’re not technical. I help you see where it genuinely helps — the real use cases — and design the harness that fits how your business actually works. Settings like hotels, restaurants, and factories are where I’ve done it.',
    foot: 'Business consultation. No code required.',
    chips: doorsCopy.business.chips.items
  }
];

/** Shallow globe in the top-right of the band (desktop only), faded out by a mask. */
function DoorsBackdrop() {
  return (
    <div className="d-backdrop">
      <picture className="d-backdrop__globe">
        <source type="image/avif" srcSet={ART_01.avif} />
        <img src={ART_01.webp} width="2560" height="1440" alt="" loading="lazy" decoding="async" />
      </picture>
    </div>
  );
}

function DoorCard({ door }) {
  const titleId = `cl-door-${door.id}-title`;
  return (
    <NeonCard as="article" accent={door.accent} className={`d-card d-card--${door.id}`} aria-labelledby={titleId}>
      <div className="d-card__copy">
        <IconRing icon={door.icon} accent={door.accent} className="d-card__ring" />
        <MicroLabel className="d-card__micro">{door.micro}</MicroLabel>
        <CardTitle id={titleId} feature className="d-card__title">{door.title}</CardTitle>
        <CircleArrow href="#contact" label={`${doorsCopy.cta.text}: ${door.title}`} className="d-card__arrow" />
        <Body className="d-card__body">{door.body}</Body>
        <Chips items={door.chips} accent={door.accent} label={`${door.title}: focus areas`} className="d-card__chips" />
        <PrimaryButton href="#contact" className="d-card__cta">{doorsCopy.cta.text}</PrimaryButton>
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
          <Display id="cl-audiences-title" lines={['Two kinds of company.', 'Two ways in.']} />
          <Lead className="d-head__lead">
            The focus is the same — getting genuine value from AI. Where we begin depends on what kind of company you are.
          </Lead>
        </div>
        <QuoteBlock quote={doorsCopy.quote.lines} label={doorsCopy.quoteLabel.text} className="d-head__quote" />
      </header>

      <div className="d-doors">
        {DOORS.map((door) => <DoorCard key={door.id} door={door} />)}
      </div>

      <div className="d-closers">
        <Tagline lines={doorsCopy.closerLeft.lines} className="d-closers__left" />
        <Tagline lines={doorsCopy.closerRight.lines} align="right" className="d-closers__right" />
      </div>
    </Band>
  );
}

export default AudienceScene;
