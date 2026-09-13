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
      <span className="w-wall__face" aria-hidden="true" />
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

const ROCK_EDGE = 'M0,70 L40,52 L78,64 L120,30 L168,58 L214,44 L262,72 L300,50 L352,62 L398,36 L446,66 L492,56 L540,74 L590,48 L636,68 L688,58 L720,76 L752,58 L806,70 L850,46 L902,66 L950,54 L996,72 L1044,40 L1092,62 L1140,50 L1188,70 L1236,34 L1284,60 L1330,48 L1380,66 L1440,44';

/** Dark jagged rock silhouettes along the wall bases, so the slabs stand in the terrain (desktop). */
function ForegroundRocks() {
  return (
    <svg className="w-rocks" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="w-rocks-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#070b10" />
          <stop offset="40%" stopColor="#05080c" stopOpacity=".75" />
          <stop offset="100%" stopColor="#05080c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${ROCK_EDGE} L1440,180 L0,180 Z`} fill="url(#w-rocks-fill)" />
      <path d={ROCK_EDGE} className="w-rocks__rim" />
    </svg>
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
      {/* Desktop only: the same terrain again, bottom-anchored, so rock ground continues under the walls and the figure. */}
      <picture className="w-backdrop__ground">
        <source media="(min-width: 1100px)" type="image/avif" srcSet={ART_04.desktop.avif} />
        <source media="(min-width: 1100px)" type="image/webp" srcSet={ART_04.desktop.webp} />
        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="" loading="lazy" decoding="async" />
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
        <ForegroundRocks />
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
