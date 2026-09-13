import React from 'react';
import SceneArt from '../kit/SceneArt';

const VISTA = {
  technical: {
    avif: '/consultation/art-02-door-technical.avif',
    webp: '/consultation/art-02-door-technical.webp',
    width: 640,
    height: 896
  },
  business: {
    avif: '/consultation/art-03-door-business.avif',
    webp: '/consultation/art-03-door-business.webp',
    width: 640,
    height: 896
  }
};

/**
 * Open doorway on the outer third of a door card (MOCK-D1, DR-02): a neon
 * frame around the vista, a CSS-3D leaf hinged on the frame's outer edge and
 * swung toward the viewer so it overhangs the card, and a floor glow.
 * Desktop/tablet only; purely decorative (aria-hidden, no text). The leaf
 * opens further on the card's hover/focus-within via CSS; static under
 * reduced motion.
 */
function DoorVisual({ variant }) {
  return (
    <div className={`d-door d-door--${variant}`} aria-hidden="true">
      <span className="d-door__glow" />
      <SceneArt desktop={VISTA[variant]} position="50% 60%" className="d-door__vista" />
      <span className="d-door__leaf">
        <span className="d-door__panel" />
        <span className="d-door__handle" />
      </span>
    </div>
  );
}

export default DoorVisual;
