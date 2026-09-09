import React from 'react';
import { Link } from 'react-router-dom';
import ConsultationIcons, { ClIcon } from './ConsultationIcons';
import ConsultationOrbit from './ConsultationOrbit';
import './consultation.css';

/**
 * Homepage H1 invitation panel — a single, calm invitation into the
 * consultation route. Inserted immediately before MoonSignalShowcase.
 *
 * Wrapped in `.cl-consultation` so the scoped consultation tokens and
 * `.cl-home-invitation` styles apply here without leaking onto the rest
 * of the homepage. The orbital uses a `home-` ID prefix so its gradient/clip
 * IDs cannot collide with the consultation hero's `hero-*` IDs.
 */
export default function HomeInvitation() {
  return (
    <div className="cl-consultation cl-home-invitation-host">
      <ConsultationIcons />
      <section
        className="cl-home-invitation cl-panel"
        aria-labelledby="cl-home-title"
        data-cl-section="H1"
      >
        <span className="cl-panel__corner cl-panel__corner--tl" aria-hidden="true"></span>
        <span className="cl-panel__corner cl-panel__corner--tr" aria-hidden="true"></span>
        <span className="cl-panel__corner cl-panel__corner--bl" aria-hidden="true"></span>
        <span className="cl-panel__corner cl-panel__corner--br" aria-hidden="true"></span>
        <div className="cl-home-invitation__copy">
          <p className="cl-eyebrow"><span>//</span> AI INTEGRATION CONSULTATION</p>
          <h2 id="cl-home-title">A better way to <span className="cl-keep">work with AI.</span></h2>
          <p className="cl-lead">I help technical teams and businesses plan and use AI through consultation tailored to their work, people, and goals.</p>
          <div className="cl-actions">
            <Link className="cl-button cl-button--primary" to="/ai-consultation">
              Explore consultation <ClIcon name="arrow" />
            </Link>
            <Link className="cl-button cl-button--secondary" to="/ai-consultation#contact">
              Free first conversation <ClIcon name="diagonal" />
            </Link>
          </div>
          <p className="cl-home-invitation__caption">PERSONAL GUIDANCE <span>·</span> PRACTICAL AI WORK</p>
        </div>
        <div className="cl-home-invitation__visual">
          <ConsultationOrbit prefix="home" />
        </div>
      </section>
    </div>
  );
}
