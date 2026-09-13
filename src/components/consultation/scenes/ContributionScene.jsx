import React, { useState } from 'react';
import {
  Band, Eyebrow, Display, Lead, Body, CardTitle, MicroLabel, Tagline,
  PrimaryButton, CircleArrow, NeonCard, IconRing, IconRow, ImageTile
} from '../kit';
import { ClIcon } from '../ConsultationIcons';
import HarnessSystem from '../visuals/HarnessSystem';
import { WalkerSeam, useWalkerSeam } from '../visuals/MonolithsSeam';
import copy from './copy/contribution.copy';
import './css/sc-04-contribution.css';

const ART = {
  mountains: { avif: '/consultation/art-15-horizon-mountains.avif', webp: '/consultation/art-15-horizon-mountains.webp' },
  cityGrid: { avif: '/consultation/art-25-tile-city-grid.avif', webp: '/consultation/art-25-tile-city-grid.webp' },
  cityTile: { avif: '/consultation/art-13-tile-city-lights.avif', webp: '/consultation/art-13-tile-city-lights.webp', width: 960, height: 640 },
  summitTile: { avif: '/consultation/art-14-tile-summit.avif', webp: '/consultation/art-14-tile-summit.webp', width: 960, height: 640 }
};

const CLARITY_ICONS = ['search', 'chart', 'people'];
const ACTION_ICONS = ['laptop', 'people', 'rocket', 'refresh'];

/** "The work" (MOTIF_PROGRESSION): no Earth — the harness core is the light source; mountain ridge along the bottom. */
function ContributionBackdrop() {
  return (
    <div className="c-backdrop">
      <picture className="c-backdrop__mountains">
        <source type="image/avif" srcSet={ART.mountains.avif} />
        <img src={ART.mountains.webp} width="1916" height="821" alt="" loading="lazy" decoding="async" />
      </picture>
    </div>
  );
}

/**
 * One of the three cards. Desktop shows everything; on phone the card
 * collapses to ring + title + arrow + body + tag, and the arrow toggles the
 * details (rows + tile, or the harness system for the core card).
 */
function WorkCard({ id, accent, ringAccent, icon, featured, card, children }) {
  const [open, setOpen] = useState(false);
  const titleId = `c-${id}-title`;
  const detailsId = `c-${id}-details`;

  return (
    <NeonCard
      as="article"
      accent={accent}
      featured={featured}
      className={`c-card c-card--${id}`}
      aria-labelledby={titleId}
      data-open={open ? 'true' : undefined}
    >
      <div className="c-card__rule">
        <span className="c-card__n" aria-hidden="true">{card.n}</span>
        <span className="c-card__dash" aria-hidden="true" />
        <MicroLabel className="c-card__micro">{card.micro}</MicroLabel>
      </div>
      <div className="c-card__heading">
        <IconRing icon={icon} accent={ringAccent} className="c-card__ring" />
        <CardTitle id={titleId} lines={card.title} feature={featured} className="c-card__title" />
        <CircleArrow
          label={`${copy.toggleLabel.text}: ${card.micro}`}
          className="c-card__toggle"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((v) => !v)}
        />
      </div>
      <Body className="c-card__body">{card.body}</Body>
      <p className="c-card__tag">{card.micro}</p>
      <div id={detailsId} className="c-card__details">{children}</div>
    </NeonCard>
  );
}

function ContributionScene() {
  const { clarity, core, action } = copy.cards;
  const seam = useWalkerSeam();

  const header = (
    <header className="c-head">
      <Eyebrow>{copy.eyebrow.text}</Eyebrow>
      <Display id="cl-contribution-title" lines={copy.headline.lines} />
      <Lead className="c-head__lead">{copy.lead.text}</Lead>
    </header>
  );

  return (
    <Band id="contribution" sectionKey="D3" labelledBy="cl-contribution-title" className="c-band" art={<ContributionBackdrop />}>
      {/* DR-10: on desktop with motion the walker seam carries the header in; otherwise it sits in the flow. */}
      {seam ? <WalkerSeam>{header}</WalkerSeam> : header}

      <div className="c-triptych">
        <WorkCard id="clarity" accent="cyan" ringAccent="lime" icon="compass" card={clarity}>
          <ul className="c-rows">
            {clarity.rows.map((row, i) => (
              <li key={row}><IconRow icon={CLARITY_ICONS[i]} title={row} /></li>
            ))}
          </ul>
          <ImageTile src={ART.cityGrid} fallbackSrc={ART.cityTile} caption={clarity.tileCaption} ratio="16 / 10" className="c-tile" />
        </WorkCard>

        <span className="c-arrow" aria-hidden="true"><ClIcon name="arrow" /></span>

        <WorkCard id="core" accent="violet" ringAccent="violet" icon="gear" featured card={core}>
          <HarnessSystem nodes={core.nodes} formula={core.formula} className="c-harness" />
        </WorkCard>

        <span className="c-arrow" aria-hidden="true"><ClIcon name="arrow" /></span>

        <WorkCard id="action" accent="cyan" ringAccent="cyan" icon="people" card={action}>
          <ul className="c-rows">
            {action.rows.map((row, i) => (
              <li key={row}><IconRow icon={ACTION_ICONS[i]} title={row} /></li>
            ))}
          </ul>
          <ImageTile src={ART.summitTile} caption={action.tileCaption} ratio="16 / 10" position="70% 50%" className="c-tile" />
        </WorkCard>
      </div>

      <NeonCard accent="cyan" className="c-packages">
        <div className="c-packages__lead">
          <IconRing icon="sliders" accent="cyan" size={60} />
          <CardTitle lines={copy.packages.title} className="c-packages__title" />
        </div>
        <Body className="c-packages__body">{copy.packages.body}</Body>
        <div className="c-packages__action">
          <PrimaryButton href="#contact">{copy.packages.cta}</PrimaryButton>
          <p className="c-packages__tag">{copy.packages.tag}</p>
        </div>
      </NeonCard>

      <div className="c-foot">
        <Tagline lines={copy.closer.lines} className="c-foot__closer" />
        <a className="c-next" href="#person">
          <span className="c-next__rail" aria-hidden="true" />
          <span className="c-next__copy">
            <span className="c-next__eyebrow">{copy.next.eyebrow}</span>
            <span className="c-next__line">{copy.next.lines[0]}</span>
            <span className="c-next__line">{copy.next.lines[1]}</span>
          </span>
        </a>
      </div>
    </Band>
  );
}

export default ContributionScene;
