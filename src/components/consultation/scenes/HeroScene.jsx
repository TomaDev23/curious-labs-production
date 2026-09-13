import React from 'react';
import { ClIcon } from '../ConsultationIcons';
import {
  Band, Eyebrow, Display, Lead, QuoteBlock, StatStrip,
  PrimaryButton, GhostButton, CircleArrow
} from '../kit';
import heroCopy from './copy/hero.copy';
import './css/sc-01-hero.css';

const ART_01_DESKTOP = {
  avif: '/consultation/art-01-earth-horizon-desktop.avif',
  webp: '/consultation/art-01-earth-horizon-desktop.webp',
  width: 2560,
  height: 1440
};
const ART_01_MOBILE = {
  avif: '/consultation/art-01-earth-horizon-mobile.avif',
  webp: '/consultation/art-01-earth-horizon-mobile.webp',
  width: 900,
  height: 1600
};

function HeroScene() {
  return (
    <Band
      id="overview"
      sectionKey="D1"
      labelledBy="cl-page-title"
      className="h-band"
      art={{
        priority: true,
        scrim: 'left',
        desktop: ART_01_DESKTOP,
        mobile: ART_01_MOBILE,
        position: '70% 50%',
        parallax: 24
      }}
    >
      <div className="h-grid">
        <div className="h-copy">
          <Eyebrow>{heroCopy.eyebrow.text}</Eyebrow>
          <Display as="h1" id="cl-page-title" size="hero" lines={heroCopy.h1.lines} />
          <Lead className="h-lead">{heroCopy.lead.text}</Lead>
          <p className="h-invite">
            Bring one real situation from your business. The first conversation is free.
          </p>
          <div className="h-actions">
            <PrimaryButton href="#contact">Start a free conversation</PrimaryButton>
            <GhostButton href="#approach" icon="diagonal">See how it works</GhostButton>
          </div>
        </div>
        <QuoteBlock quote={heroCopy.quote.text} label={heroCopy.quoteLabel.text} className="h-quote" />
      </div>

      <div className="h-meta">
        <span><ClIcon name="people" /> Personally delivered</span>
        <span><ClIcon name="pin" /> Phnom Penh / Online</span>
        <span><ClIcon name="chat" /> English &amp; Khmer</span>
      </div>

      <div className="h-phone-stats">
        <StatStrip items={heroCopy.stats.items} />
        <CircleArrow href="#audiences" label="See the two kinds of company" direction="down" />
      </div>
    </Band>
  );
}

export default HeroScene;
