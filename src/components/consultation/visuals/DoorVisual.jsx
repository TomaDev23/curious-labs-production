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
 * Decorative door frame (DR-02): a CSS-3D leaf resting ajar over the vista,
 * opening wider on the card's hover/focus-within (desktop CSS) or when
 * `active` is set (phone, driven by the SwipeTrack's active item). Purely
 * decorative — aria-hidden, carries no text.
 */
function DoorVisual({ variant, hinge = 'left', active = false }) {
  return (
    <div className={`cl-door cl-door--${variant}${active ? ' cl-door--active' : ''}`} aria-hidden="true">
      <SceneArt desktop={VISTA[variant]} className="cl-door__vista" />
      <div className={`cl-door__leaf cl-door__leaf--hinge-${hinge}`}>
        <span className="cl-door__bevel" />
        <span className="cl-door__handle" />
      </div>
    </div>
  );
}

export default DoorVisual;
