import React, { useState } from 'react';
import {
  Band, Eyebrow, Display, Lead, Body, CardTitle, MicroLabel, QuoteBlock, Tagline,
  PrimaryButton, GhostButton, NeonCard, IconRow, NumberedRow
} from '../kit';
import { IMAGES } from '../../../utils/assets';
import copy from './copy/contact.copy';
import './css/sc-09-contact.css';

const ART_17 = {
  desktop: { avif: '/consultation/art-17-final-horizon-desktop.avif', webp: '/consultation/art-17-final-horizon-desktop.webp', width: 1664, height: 936 },
  mobile: { avif: '/consultation/art-17-final-horizon-mobile.avif', webp: '/consultation/art-17-final-horizon-mobile.webp', width: 900, height: 1350 }
};
const WALKER = { avif: '/consultation/art-09-figure-walker.avif', webp: '/consultation/art-09-figure-walker.webp' };
const POINT_ICONS = ['compass', 'people', 'chart'];

/**
 * "Return" (MOTIF_PROGRESSION): from a mountain ridge the Earth rises over
 * the horizon — the hero seen from the other side. Full-bleed horizon stage
 * with the placeholder walker on the right ridge (rendered only once it
 * loads) and the light line closing as the horizon glow at the stage's foot.
 */
function HorizonArt() {
  const [walker, setWalker] = useState('loading');
  return (
    <div className="f-art" aria-hidden="true">
      <picture className="f-art__plate">
        <source media="(max-width: 767px)" type="image/avif" srcSet={ART_17.mobile.avif} />
        <source media="(max-width: 767px)" type="image/webp" srcSet={ART_17.mobile.webp} />
        <source type="image/avif" srcSet={ART_17.desktop.avif} />
        <img src={ART_17.desktop.webp} width={ART_17.desktop.width} height={ART_17.desktop.height} alt="" loading="lazy" decoding="async" />
      </picture>
      <span className="f-art__scrim" />
      {walker !== 'failed' && (
        <picture className={`f-art__walker${walker === 'ready' ? ' f-art__walker--ready' : ''}`}>
          <source type="image/avif" srcSet={WALKER.avif} />
          <img src={WALKER.webp} width="640" height="960" alt="" loading="lazy" decoding="async" onLoad={() => setWalker('ready')} onError={() => setWalker('failed')} />
        </picture>
      )}
      <span className="f-art__horizon" />
    </div>
  );
}

function ContactScene() {
  const { card } = copy;
  return (
    <Band id="contact" sectionKey="D8" labelledBy="cl-contact-title" hairline="none" className="f-band">
      <div className="f-stage">
        <HorizonArt />
        <div className="f-stage__aside">
          <Tagline lines={copy.tagline.lines} className="f-stage__tagline" />
          <p className="f-crumbs">
            <span className="k-sr-only">{copy.crumbs.items.join(', ')}</span>
            {copy.crumbs.items.map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 && <span className="f-crumbs__sep" aria-hidden="true">›</span>}
                <span aria-hidden="true">{item}</span>
              </React.Fragment>
            ))}
          </p>
        </div>

        <header className="f-head">
          <Eyebrow>{copy.eyebrow.text}</Eyebrow>
          <Display id="cl-contact-title" lines={copy.headline.lines} />
          <Lead className="f-head__lead">{copy.lead.text}</Lead>
          <div className="f-head__actions">
            <PrimaryButton href="#contact-card">{copy.primary.text}</PrimaryButton>
            <GhostButton href="#approach" icon="arrow">{copy.secondary.text}</GhostButton>
          </div>
        </header>

        <ul className="f-points">
          {copy.points.items.map((point, i) => (
            <li key={point.title}>
              <IconRow icon={POINT_ICONS[i]} title={point.title} text={point.text} bare accent="cyan" />
            </li>
          ))}
        </ul>

        <p className="f-stage__phone-tag" aria-hidden="true">{copy.footer.tagline.text}</p>
      </div>

      <NeonCard as="section" accent="lime" id="contact-card" className="f-card" aria-labelledby="f-card-title">
        <div className="f-card__intro">
          <Eyebrow as="p" className="f-card__eyebrow">{card.eyebrow.text}</Eyebrow>
          {/* Desktop keeps the deck's first-contact heading; phone shows COPY_CANON's short card. Only one pair is displayed. */}
          <CardTitle id="f-card-title" as="h3" feature lines={card.title.lines} className="f-card__title f-card__title--desk" />
          <CardTitle as="h3" feature lines={card.phoneTitle.lines} className="f-card__title f-card__title--phone" />
          <Body className="f-card__body f-card__body--desk">{card.intro.text}</Body>
          <Body className="f-card__body f-card__body--phone">{card.phoneBody.text}</Body>
          <p className="f-card__free">{card.free.text}</p>
          <div className="f-card__where">
            <IconRow icon="pin" title={card.location.text} bare accent="lime" />
            <IconRow icon="chat" title={card.language.text} bare accent="lime" />
          </div>
          <p className="f-card__caption">{card.caption.text}</p>
        </div>

        <div className="f-card__next">
          <MicroLabel as="p" className="f-card__steps-label">{card.stepsLabel.text}</MicroLabel>
          <ol className="f-steps">
            {card.steps.items.map((step, i) => (
              <li key={step.title}>
                <NumberedRow n={`0${i + 1}`} title={step.title} text={step.text} action={null} accent="lime" />
              </li>
            ))}
          </ol>
          <p className="f-card__reassurance">{card.reassurance.text}</p>
          <div className="f-pending" role="status">
            <span className="f-pending__status"><span className="f-pending__dot" aria-hidden="true" />{card.pending.status}</span>
            <p className="f-pending__text">{card.pending.text}</p>
          </div>
        </div>
      </NeonCard>
    </Band>
  );
}

/** Page footer band (MOCK-D4 bottom): logo, quote, in-page links, mono tagline. Rendered by the page shell. */
export function ConsultationFooter() {
  const { footer } = copy;
  return (
    <footer className="cl-consultation f-footer">
      <div className="f-footer__inner">
        <a className="f-footer__brand" href="#overview">
          <img src={IMAGES.LOGO} alt="" width="40" height="40" />
          <span>
            <span className="f-footer__name">CuriousLabs</span>
            <span className="f-footer__sub">Mission control</span>
          </span>
        </a>
        <QuoteBlock quote={footer.quote.lines} label={footer.quote.label} align="left" className="f-footer__quote" />
        <nav className="f-footer__nav" aria-label="Consultation page">
          <ul>
            {footer.links.items.map((link) => (
              <li key={link.href}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
          <p className="f-footer__tagline">{footer.tagline.text}</p>
        </nav>
      </div>
    </footer>
  );
}

export default ContactScene;
