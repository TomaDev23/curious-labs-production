import React from 'react';
import {
  Band,
  Body,
  CardTitle,
  Chips,
  Display,
  Eyebrow,
  GhostButton,
  IconRing,
  IconRow,
  ImageTile,
  NeonCard,
  PrimaryButton,
  QuoteBlock,
  WordStack
} from '../kit';
import { openReading } from '../useConsultationPage';
import { PERSON_COPY } from './copy/person.copy';
import './css/sc-05-person.css';

const ART_05_DESKTOP = {
  avif: '/consultation/art-05-balcony-city-desktop.avif',
  webp: '/consultation/art-05-balcony-city-desktop.webp',
  width: 2560,
  height: 1440
};

const ART_05_MOBILE = {
  avif: '/consultation/art-05-balcony-city-mobile.avif',
  webp: '/consultation/art-05-balcony-city-mobile.webp',
  width: 900,
  height: 1600
};

const ART_05_RIVERSIDE = {
  avif: '/consultation/art-05-riverside-dusk.avif',
  webp: '/consultation/art-05-riverside-dusk.webp',
  width: 960,
  height: 1200
};

const ART_01_EARTH = {
  avif: '/consultation/art-01-earth-horizon-desktop.avif',
  webp: '/consultation/art-01-earth-horizon-desktop.webp',
  width: 2560,
  height: 1440
};

const text = (slot) => slot.text;
const texts = (slots) => slots.map(text);

function PersonScene() {
  return (
    <div className="sc05">
      <Band
        id="person"
        sectionKey="D4"
        labelledBy="cl-person-title"
        className="sc05__hero"
        art={{ desktop: ART_05_DESKTOP, mobile: ART_05_MOBILE, position: '56% 50%', scrim: 'left', parallax: 18 }}
      >
        <div className="sc05__hero-grid">
          <div className="sc05__hero-copy">
            <Eyebrow>{text(PERSON_COPY.eyebrow)}</Eyebrow>
            <Display id="cl-person-title" className="sc05__hero-title sc05__hero-title--desktop" lines={texts(PERSON_COPY.title)} />
            <Display className="sc05__hero-title sc05__hero-title--mobile" lines={texts(PERSON_COPY.phoneTitle)} />
            <Body className="sc05__opening">{text(PERSON_COPY.body)}</Body>
            <div className="sc05__actions sc05__actions--desktop">
              <PrimaryButton href="#contact">{text(PERSON_COPY.primaryAction)}</PrimaryButton>
              <GhostButton href="#experience" onClick={() => openReading('experience')}>{text(PERSON_COPY.secondaryAction)}</GhostButton>
            </div>
            <div className="sc05__actions sc05__actions--mobile">
              <PrimaryButton href="#experience" onClick={() => openReading('experience')}>{text(PERSON_COPY.phonePrimaryAction)}</PrimaryButton>
              <GhostButton href="#contact">{text(PERSON_COPY.phoneSecondaryAction)}</GhostButton>
            </div>
          </div>

          <QuoteBlock className="sc05__hero-quote" quote={text(PERSON_COPY.quote)} label={text(PERSON_COPY.quoteLabel)} />
          <WordStack className="sc05__hero-words" words={texts(PERSON_COPY.wordStack)} />
        </div>

        <div className="sc05__mobile-image">
          <ImageTile src={ART_05_MOBILE} ratio="9 / 13" position="52% 42%" />
          <blockquote>{text(PERSON_COPY.localQuote)}</blockquote>
        </div>
      </Band>

      <Band className="sc05__credibility" hairline="bottom">
        <ul className="sc05__credibility-cards">
          {PERSON_COPY.credibility.map((item, index) => (
            <NeonCard as="li" key={text(item.title)} accent={index === 3 ? 'violet' : 'cyan'}>
              <IconRing icon={item.icon} accent={index === 3 ? 'violet' : 'cyan'} />
              <div>
                <CardTitle>{text(item.title)}</CardTitle>
                {item.subtitle && <span className="sc05__credibility-subtitle">{text(item.subtitle)}</span>}
                <Body>{text(item.line)}</Body>
              </div>
            </NeonCard>
          ))}
        </ul>
        <div className="sc05__credibility-rows">
          {PERSON_COPY.phoneCredibility.map((item, index) => (
            <IconRow
              key={text(item.title)}
              bare
              accent={index === 3 ? 'violet' : 'cyan'}
              icon={item.icon}
              title={text(item.title)}
              text={text(item.line)}
            />
          ))}
        </div>
      </Band>

      <Band className="sc05__rooted" hairline="bottom">
        <div className="sc05__rooted-grid">
          <div className="sc05__local-quote">
            <WordStack words={texts(PERSON_COPY.localWordStack)} />
            <blockquote>{text(PERSON_COPY.localQuote)}</blockquote>
          </div>
          <div className="sc05__rooted-copy">
            <Eyebrow>{text(PERSON_COPY.rootedEyebrow)}</Eyebrow>
            <CardTitle feature>
              {texts(PERSON_COPY.rootedTitle).map((line, index) => (
                <React.Fragment key={line}>{index > 0 && <br />}{line}</React.Fragment>
              ))}
            </CardTitle>
            <Body>{text(PERSON_COPY.rootedBody)}</Body>
            <Chips items={texts(PERSON_COPY.rootedChips)} accent="cyan" label="Local experience" />
          </div>
          <ImageTile
            className="sc05__riverside"
            src={ART_05_RIVERSIDE}
            caption={texts(PERSON_COPY.riversideCaption)}
            ratio="4 / 5"
            position="50% 50%"
          />
        </div>
      </Band>

      <Band
        className="sc05__tomorrow"
        art={{ desktop: ART_01_EARTH, position: '60% 100%', scrim: 'left', parallax: 12 }}
        hairline="bottom"
      >
        <div className="sc05__tomorrow-copy">
          <Eyebrow>{text(PERSON_COPY.tomorrowEyebrow)}</Eyebrow>
          <Display as="h2" lines={texts(PERSON_COPY.tomorrowTitle)} />
          <Body>{text(PERSON_COPY.tomorrowBody)}</Body>
          <ul className="sc05__tomorrow-points">
            {PERSON_COPY.tomorrowPoints.map((point) => <li key={text(point)}>{text(point)}</li>)}
          </ul>
        </div>
        <div className="sc05__cambodia-marker" aria-label="Cambodia">
          <span className="sc05__cambodia-pin" aria-hidden="true" />
          <span>{text(PERSON_COPY.cambodiaLabel)}</span>
        </div>
      </Band>
    </div>
  );
}

export default PersonScene;
