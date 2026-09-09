import React from 'react';
import orbitSvg from './_orbit.svg?raw';

/**
 * Decorative orbital diagram. `prefix` rewrites the SVG's gradient/clip/filter
 * IDs so the graphic can be reused on the same document without ID collisions.
 * The consultation hero uses the default `hero-` prefix; the homepage
 * invitation passes `home-`.
 */
export default function ConsultationOrbit({ prefix = 'hero' }) {
  const html =
    prefix === 'hero'
      ? orbitSvg
      : orbitSvg.replace(/hero-/g, `${prefix}-`);
  return (
    <div className="cl-orbit" aria-hidden="true">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className="cl-orbit__footer">
        <span className="cl-cross">+</span> PEOPLE. PROCESSES. POSSIBILITIES.
      </div>
    </div>
  );
}
