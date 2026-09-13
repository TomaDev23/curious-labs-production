import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Band, Eyebrow, Display, Lead, MicroLabel, CardTitle, Body, WordStack, Tagline, CircleArrow, SwipeTrack } from '../kit';
import { ClIcon } from '../ConsultationIcons';
import { LightPaths, ConvergenceFigure } from '../visuals/Monoliths';
import wallsCopy from './copy/walls.copy';
import './css/sc-03-walls.css';

const ART_04 = {
  desktop: { avif: '/consultation/art-04-walls-terrain-desktop.avif', webp: '/consultation/art-04-walls-terrain-desktop.webp', width: 2560, height: 1200 },
  mobile: { avif: '/consultation/art-04-walls-terrain-mobile.avif', webp: '/consultation/art-04-walls-terrain-mobile.webp', width: 960, height: 1280 }
};

const WALL_META = [
  { id: 'wall-trust', n: '01', accent: 'cyan', icon: 'brain' },
  { id: 'wall-complexity', n: '02', accent: 'violet', icon: 'network' },
  { id: 'wall-reliability', n: '03', accent: 'lime', icon: 'shield' }
];
const WALLS = WALL_META.map((meta, i) => ({ ...meta, ...wallsCopy.walls.items[i], name: wallsCopy.walls.items[i].label }));

const PATH_ACCENTS = ['var(--k-cyan)', 'var(--k-violet)', 'var(--k-lime)'];

function WallFace({ wall, index }) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      className={`w-wall w-wall--${index + 1} k-acc-${wall.accent}`}
      aria-labelledby={`${wall.id}-title`}
      initial={reduced ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
    >
      <div className="w-wall__head">
        <span className="w-wall__n" aria-hidden="true">{wall.n}</span>
        <span className="w-wall__icon" aria-hidden="true"><ClIcon name={wall.icon} /></span>
      </div>
      <MicroLabel className="w-wall__label">{wall.label}</MicroLabel>
      <CardTitle id={`${wall.id}-title`} lines={wall.title} className="w-wall__title" />
      <Body className="w-wall__text">{wall.text}</Body>
    </motion.article>
  );
}

function WallsBackdrop() {
  return (
    <div className="w-backdrop">
      <picture className="w-backdrop__art">
        <source media="(max-width: 767px)" type="image/avif" srcSet={ART_04.mobile.avif} />
        <source media="(max-width: 767px)" type="image/webp" srcSet={ART_04.mobile.webp} />
        <source type="image/avif" srcSet={ART_04.desktop.avif} />
        <img src={ART_04.desktop.webp} width={ART_04.desktop.width} height={ART_04.desktop.height} alt="" loading="lazy" decoding="async" />
      </picture>
    </div>
  );
}

function WallsScene() {
  const stageRef = useRef(null);
  const items = WALLS.map((wall, i) => ({ id: wall.id, name: wall.name, content: <WallFace wall={wall} index={i} /> }));

  return (
    <Band id="walls" sectionKey="D2" labelledBy="cl-walls-title" className="w-band" art={<WallsBackdrop />}>
      <header className="w-head">
        <div className="w-head__copy">
          <Eyebrow>{wallsCopy.eyebrow.text}</Eyebrow>
          <Display id="cl-walls-title" lines={wallsCopy.headline.lines} />
          <Lead className="w-head__lead">{wallsCopy.lead.text}</Lead>
        </div>
        <WordStack words={wallsCopy.wordStack.words} className="w-head__stack" />
      </header>

      <div className="w-stage" ref={stageRef}>
        <SwipeTrack label="The three walls" items={items} desktopFrom={1100} />
        <LightPaths stageRef={stageRef} wallSelector=".cl-track__item" accents={PATH_ACCENTS} />
        <ConvergenceFigure />
      </div>

      <div className="w-foot">
        <Tagline lines={wallsCopy.closer.lines} align="center" className="w-foot__closer" />
        <span className="w-foot__line" aria-hidden="true" />
        <CircleArrow href="#contribution" label={wallsCopy.nextLabel.text} direction="down" />
      </div>
    </Band>
  );
}

export default WallsScene;
