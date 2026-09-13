import React from 'react';
import {
  Band, Eyebrow, Display, Lead, Body, CardTitle, MicroLabel, QuoteBlock, WordStack, Tagline,
  PrimaryButton, GhostButton, CircleArrow,
  NeonCard, IconRing, Chips, StatStrip, IconRow, NumberedRow, ImageTile
} from './index';

/**
 * Dev-only gallery of every canon-kit primitive (`/ai-consultation?kit=1`).
 * Loaded through a DEV-guarded lazy import in ConsultationContent, so it
 * never ships. The phone column is the same gallery in a 390px iframe
 * (`?kit=1&frame=phone`) so the real phone media queries apply.
 * Gallery strings are specimen text, not page copy.
 */

const TOKENS = [
  ['--k-cream', '#f4efdc'], ['--k-ink-body', '#c9d2d8'], ['--k-ink-muted', '#8fa3b0'],
  ['--k-lime', '#c6f75b'], ['--k-cyan', '#5ee6f5'], ['--k-violet', '#b085ff'],
  ['--k-magenta', '#e27bff'], ['--k-amber', '#f2b35e']
];

const ICONS = [
  'arrow', 'plus', 'code', 'building', 'brain', 'network', 'user', 'people', 'compass', 'gear',
  'book', 'chart', 'rocket', 'refresh', 'sliders', 'laptop', 'bolt', 'tool', 'handoff', 'stages',
  'shield', 'search', 'layers', 'file', 'chat', 'mail', 'pin'
];

const ART_TILE = { avif: '/consultation/art-05-riverside-dusk.avif', webp: '/consultation/art-05-riverside-dusk.webp', width: 960, height: 1200 };
const ART_MISSING = { avif: '/consultation/art-13-tile-city-lights.avif', webp: '/consultation/art-13-tile-city-lights.webp' };
const ART_BAND = {
  desktop: { avif: '/consultation/art-04-walls-terrain-desktop.avif', webp: '/consultation/art-04-walls-terrain-desktop.webp', width: 2560, height: 1200 },
  mobile: { avif: '/consultation/art-04-walls-terrain-mobile.avif', webp: '/consultation/art-04-walls-terrain-mobile.webp', width: 960, height: 1280 },
  position: '50% 30%',
  scrim: 'top'
};

function Spec({ name, children }) {
  return (
    <div className="k-gallery__spec">
      <p className="k-gallery__name">{name}</p>
      {children}
    </div>
  );
}

function Sample({ accent, featured }) {
  return (
    <NeonCard accent={accent} featured={featured}>
      <div className="k-gallery__row">
        <IconRing icon={accent === 'violet' ? 'building' : accent === 'lime' ? 'compass' : 'code'} accent={accent} />
        <MicroLabel>{featured ? `${accent} · featured` : `${accent} accent`}</MicroLabel>
      </div>
      <CardTitle lines={['Card title', 'on two lines.']} feature={featured} className="k-gallery__gap" />
      <Body className="k-gallery__gap">Serif body copy sits here at the card size, a few short lines long.</Body>
      <Chips items={['Chip one', 'Second chip', 'Third']} accent={accent} className="k-gallery__gap" />
      <div className="k-gallery__row k-gallery__gap">
        <PrimaryButton href="#kit">Primary action</PrimaryButton>
        <CircleArrow href="#kit" label="Open" />
      </div>
    </NeonCard>
  );
}

function GalleryBody() {
  return (
    <>
      <Band id="kit-type" hairline="bottom">
        <div className="k-gallery__head">
          <div>
            <Eyebrow>Canon kit v1 · gallery</Eyebrow>
            <Display as="h1" size="hero" lines={['Hero display,', 'two short lines.']} />
            <Lead className="k-gallery__gap">Serif lead at 21px: a calm paragraph that introduces the band in two or three lines.</Lead>
            <div className="k-gallery__row k-gallery__gap">
              <PrimaryButton href="#kit">Primary button</PrimaryButton>
              <GhostButton href="#kit" icon="arrow">Ghost button</GhostButton>
            </div>
          </div>
          <div className="k-gallery__side">
            <WordStack words={['Ideas', 'People', 'Real world']} />
            <QuoteBlock quote="Specimen quote. Three short lines of serif." />
          </div>
        </div>
      </Band>

      <Band id="kit-art" hairline="bottom" art={ART_BAND}>
        <Eyebrow>Band with full-bleed art</Eyebrow>
        <Display lines={['Scene display,', 'up to four lines.']} />
        <div className="k-gallery__taglines">
          <Tagline lines={['Left closer line', 'second line']} />
          <Tagline lines={['Centred closer']} align="center" />
          <Tagline lines={['Right closer line', 'second line']} align="right" />
        </div>
      </Band>

      <Band id="kit-cards" hairline="bottom">
        <Spec name="NeonCard · IconRing · MicroLabel · CardTitle · Body · Chips · PrimaryButton · CircleArrow">
          <div className="k-gallery__grid">
            <Sample accent="cyan" />
            <Sample accent="violet" />
            <Sample accent="lime" />
            <Sample accent="violet" featured />
          </div>
        </Spec>
      </Band>

      <Band id="kit-rows" hairline="bottom">
        <div className="k-gallery__grid">
          <Spec name="StatStrip">
            <StatStrip items={[
              { big: 'ONE', label: 'Mono label', note: 'Small serif note', accent: 'cyan' },
              { big: 'TWO', label: 'Mono label', note: 'Small serif note', accent: 'lime' },
              { big: 'THREE', label: 'Mono label', note: 'Small serif note', accent: 'violet' }
            ]} />
          </Spec>
          <Spec name="IconRow · framed + bare">
            <div className="k-gallery__stack">
              <IconRow icon="search" title="Framed icon row" text="Serif supporting line" />
              <IconRow icon="chart" title="Framed, lime accent" accent="lime" />
              <IconRow icon="user" title="Bare icon row" text="Used in the phone person list" bare />
            </div>
          </Spec>
          <Spec name="NumberedRow · disclosure / link / numeral + icon">
            <div className="k-gallery__stack">
              <NumberedRow n="1" title="Disclosure row" text="Opens a panel in place">
                Panel text, hidden until the row is opened.
              </NumberedRow>
              <NumberedRow n="2" title="Link row" text="Arrow action, whole row is a link" action="arrow" href="#kit" />
              <NumberedRow n="03" badge="numeral" icon="chat" title="Numeral + icon" text="Engagement phone style" action="arrow" accent="cyan" />
            </div>
          </Spec>
          <Spec name="ImageTile · art + missing-file fallback">
            <div className="k-gallery__tiles">
              <ImageTile src={ART_TILE} caption={['Caption line one', 'line two']} ratio="4 / 3" />
              <ImageTile src={ART_MISSING} caption={['Missing file', 'gradient fallback']} ratio="4 / 3" />
            </div>
          </Spec>
          <Spec name="CircleArrow · right / down / toggle">
            <div className="k-gallery__row">
              <CircleArrow href="#kit" label="Next" />
              <CircleArrow href="#kit" label="Down" direction="down" />
              <CircleArrow label="Toggle" aria-expanded="true" />
            </div>
          </Spec>
          <Spec name="Tokens">
            <ul className="k-gallery__swatches">
              {TOKENS.map(([name, hex]) => (
                <li key={name}><span style={{ background: hex }} />{name}</li>
              ))}
            </ul>
          </Spec>
        </div>
        <Spec name="Icons (sprite)">
          <ul className="k-gallery__icons">
            {ICONS.map((name) => (
              <li key={name}><IconRing icon={name} accent="cyan" size={48} /><span>{name}</span></li>
            ))}
          </ul>
        </Spec>
      </Band>
    </>
  );
}

const GALLERY_CSS = `
.cl-consultation .k-gallery { padding-bottom: 80px; }
.cl-consultation .k-gallery__name { margin: 0 0 14px; font: 500 11px/1.4 var(--k-font-mono); letter-spacing: .14em; text-transform: uppercase; color: var(--k-ink-muted); }
.cl-consultation .k-gallery__spec { margin-bottom: 36px; min-width: 0; }
.cl-consultation .k-gallery__head { display: grid; grid-template-columns: minmax(0, 8fr) minmax(0, 4fr); gap: 40px; }
.cl-consultation .k-gallery__side { display: flex; gap: 32px; justify-content: flex-end; align-items: flex-start; }
.cl-consultation .k-gallery__row { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
.cl-consultation .k-gallery__gap { margin-top: 20px; }
.cl-consultation .k-gallery__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px; }
.cl-consultation .k-gallery__stack { display: grid; gap: 12px; }
.cl-consultation .k-gallery__tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.cl-consultation .k-gallery__taglines { display: flex; justify-content: space-between; gap: 24px; margin-top: 200px; }
.cl-consultation .k-gallery__swatches { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 0; padding: 0; list-style: none; font: 12px var(--k-font-mono); color: var(--k-ink-body); }
.cl-consultation .k-gallery__swatches li { display: flex; align-items: center; gap: 10px; }
.cl-consultation .k-gallery__swatches span { width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--k-hairline); }
.cl-consultation .k-gallery__icons { display: flex; flex-wrap: wrap; gap: 18px; margin: 0; padding: 0; list-style: none; }
.cl-consultation .k-gallery__icons li { display: grid; justify-items: center; gap: 6px; width: 72px; font: 10px var(--k-font-mono); color: var(--k-ink-muted); }
.cl-consultation .k-gallery__phone { display: block; width: 390px; height: 5200px; margin: 0 auto; border: 1px solid var(--k-hairline); border-radius: 24px; background: #020308; }
@media (max-width: 767px) {
  .cl-consultation .k-gallery__head, .cl-consultation .k-gallery__grid { grid-template-columns: minmax(0, 1fr); }
  .cl-consultation .k-gallery__side { justify-content: flex-start; }
  .cl-consultation .k-gallery__taglines { flex-direction: column; margin-top: 120px; }
}
`;

function KitGallery() {
  const phoneFrame = new URLSearchParams(window.location.search).get('frame') === 'phone';

  return (
    <div className="k-gallery" id="kit">
      <style>{GALLERY_CSS}</style>
      <GalleryBody />
      {!phoneFrame && (
        <Band id="kit-phone" hairline="none">
          <Eyebrow>Phone · 390px frame</Eyebrow>
          <iframe className="k-gallery__phone" title="Kit gallery at phone width" src="/ai-consultation?kit=1&frame=phone" />
        </Band>
      )}
    </div>
  );
}

export default KitGallery;
