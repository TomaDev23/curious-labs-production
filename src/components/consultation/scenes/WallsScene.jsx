import React from 'react';
import { StatTrio } from '../ConsultationGraphs';
import { Reveal } from '../ConsultationMotion';
import './css/sc-03-walls.css';

/**
 * SC-03 three walls. Interim (A-02): the existing walls content moved out of
 * AudienceScene unchanged, so the doors band can stand alone. A-03 rebuilds
 * this scene to MOCK-D1 bottom.
 */
function WallsScene() {
  return (
    <section id="walls" className="cl-section" aria-label="The three walls" data-cl-section="D2">
      <Reveal as="p" className="cl-recognition__intro" y={14}>Whichever side you’re on, using AI well runs into the same three walls.</Reveal>
      <StatTrio />

      <Reveal as="p" className="cl-bridge" y={14}><span></span>It starts with your situation. We shape the work around it.</Reveal>
    </section>
  );
}

export default WallsScene;
