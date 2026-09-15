import React from 'react';
import {
  Band, Eyebrow, Display, Lead, Body, CardTitle, MicroLabel, Tagline,
  PrimaryButton, NeonCard, IconRing, Chips, QuoteBlock
} from '../kit';
import DoorVisual from '../visuals/DoorVisual';
import doorsCopy from './copy/doors.copy';
import './css/sc-02-doors.css';

const DOORS = [
  { id: 'business', accent: 'amber', icon: 'building', vista: 'business', ...doorsCopy.cards.business },
  { id: 'product', accent: 'cyan', icon: 'network', vista: 'product', featured: true, ...doorsCopy.cards.product },
  { id: 'ai', accent: 'violet', icon: 'brain', vista: 'technical', ...doorsCopy.cards.ai }
];

function DoorsBackdrop() {
  return (
    <div className="d-backdrop" aria-hidden="true">
      <span className="d-backdrop__nebula" />
      <span className="d-backdrop__stars" />
      <span className="d-backdrop__dissolve" />
    </div>
  );
}

function ForegroundRocks() {
  return (
    <svg className="d-rocks" viewBox="0 0 1440 190" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="d-rock-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#142633" />
          <stop offset=".28" stopColor="#09131b" />
          <stop offset="1" stopColor="#02060a" />
        </linearGradient>
        <linearGradient id="d-rock-rim" x1="0" x2="1">
          <stop offset="0" stopColor="#f5bf58" stopOpacity=".58" />
          <stop offset=".5" stopColor="#5ee6f5" stopOpacity=".42" />
          <stop offset="1" stopColor="#b085ff" stopOpacity=".58" />
        </linearGradient>
      </defs>
      <path d="M0 118 32 91 65 103 101 64 128 88 176 51 207 81 247 73 286 112 326 96 365 126 410 111 452 131 493 108 535 125 577 117 617 137 660 119 704 130 744 109 788 128 831 115 876 133 918 111 962 123 1004 94 1046 112 1083 72 1118 91 1152 55 1187 80 1230 43 1266 74 1304 61 1342 96 1381 78 1440 116V190H0Z" fill="url(#d-rock-fill)" />
      <path d="M0 151 54 132 96 145 148 111 205 139 253 120 312 150 374 126 432 153 495 137 550 158 611 132 670 154 726 136 789 160 850 132 913 154 974 125 1033 149 1092 116 1144 147 1208 107 1265 139 1328 112 1382 145 1440 126V190H0Z" fill="#020509" opacity=".92" />
      <g fill="none" stroke="#8cb7c8" strokeOpacity=".13" strokeWidth="1">
        <path d="m65 103 63-15 48-37 31 30 40-8" />
        <path d="m286 112 40-16 39 30 45-15 42 20" />
        <path d="m962 123 42-29 42 18 37-40 35 19" />
        <path d="m1152 55 35 25 43-37 36 31 38-13" />
      </g>
      <path d="M0 118 32 91 65 103 101 64 128 88 176 51 207 81 247 73 286 112 326 96 365 126 410 111 452 131 493 108 535 125 577 117 617 137 660 119 704 130 744 109 788 128 831 115 876 133 918 111 962 123 1004 94 1046 112 1083 72 1118 91 1152 55 1187 80 1230 43 1266 74 1304 61 1342 96 1381 78 1440 116" fill="none" stroke="url(#d-rock-rim)" strokeWidth="1.2" />
    </svg>
  );
}

function DoorsFloor() {
  return (
    <div className="d-floor" aria-hidden="true">
      <div className="d-floor__surface" />
      {DOORS.map((door) => (
        <React.Fragment key={door.id}>
          <div className={`d-floor__pool d-floor__pool--${door.id}`} />
          <div className={`d-floor__reflection d-floor__reflection--${door.id}`} />
        </React.Fragment>
      ))}
      <ForegroundRocks />
    </div>
  );
}

function DoorCard({ door }) {
  const titleId = `cl-door-${door.id}-title`;
  return (
    <div className={`d-door-unit d-door-unit--${door.id}`}>
      <NeonCard as="article" accent={door.accent} featured={door.featured} className={`d-card d-card--${door.id}`}>
        <div className="d-card__copy">
          <div className="d-card__intro">
            <IconRing icon={door.icon} accent={door.accent} className="d-card__ring" />
            <MicroLabel className="d-card__micro">{door.micro}</MicroLabel>
          </div>
          <CardTitle id={titleId} lines={door.title} className="d-card__title" />
          <Body className="d-card__body">{door.body}</Body>
          <Chips items={door.chips} accent={door.accent} label={`${door.title.join(' ')} focus areas`} className="d-card__chips" />
          <PrimaryButton href="#contact" className="d-card__cta">{door.cta}</PrimaryButton>
        </div>
        <Tagline lines={door.side.lines} className="d-card__side" />
        <DoorVisual variant={door.vista} />
      </NeonCard>
      <Tagline lines={door.foot.lines} align={door.id === 'business' ? 'left' : door.id === 'ai' ? 'right' : 'center'} className="d-card__foot" />
    </div>
  );
}

function PathConnector() {
  return (
    <svg className="d-connect__line" viewBox="0 0 1000 170" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="d-path-gradient" x1="0" x2="1">
          <stop offset="0" stopColor="#f5bf58" />
          <stop offset=".5" stopColor="#5ee6f5" />
          <stop offset="1" stopColor="#b085ff" />
        </linearGradient>
        <filter id="d-path-glow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <path d="M70 72 C230 72 260 148 500 91 C740 34 765 72 930 72" />
      <path className="d-connect__line-glow" d="M70 72 C230 72 260 148 500 91 C740 34 765 72 930 72" />
    </svg>
  );
}

function Connections() {
  return (
    <section className="d-connect" aria-labelledby="cl-door-connections-title">
      <div className="d-connect__head">
        <Eyebrow>{doorsCopy.connections.eyebrow}</Eyebrow>
        <Display as="h3" id="cl-door-connections-title" lines={doorsCopy.connections.title} />
        <Lead>{doorsCopy.connections.lead}</Lead>
      </div>
      <div className="d-connect__map">
        <PathConnector />
        {DOORS.map((door) => (
          <div key={door.id} className={`d-connect__point d-connect__point--${door.id} k-acc-${door.accent}`}>
            <IconRing icon={door.icon} accent={door.accent} size={62} />
            <MicroLabel>{door.connectionTitle}</MicroLabel>
            <Body>{door.connectionBody}</Body>
          </div>
        ))}
      </div>
      <Tagline lines={doorsCopy.connections.foot.lines} align="center" className="d-connect__foot" />
    </section>
  );
}

function AudienceScene() {
  return (
    <Band id="audiences" sectionKey="D2" labelledBy="cl-audiences-title" className="d-band" hairline="none" art={<DoorsBackdrop />}>
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

      <Tagline lines={doorsCopy.closer.lines} align="center" className="d-closer" />
      <Connections />
    </Band>
  );
}

export default AudienceScene;
