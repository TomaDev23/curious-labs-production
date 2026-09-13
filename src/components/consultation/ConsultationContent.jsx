import React, { Suspense } from 'react';
import './kit/kit.css';
import ConsultationIcons from './ConsultationIcons';
import { ScrollRail } from './ConsultationMotion';
import useConsultationPage from './useConsultationPage';
import HeroScene from './scenes/HeroScene';
import AudienceScene from './scenes/AudienceScene';
import ContributionScene from './scenes/ContributionScene';
import PersonScene from './scenes/PersonScene';
import ApproachScene from './scenes/ApproachScene';
import EngagementScene from './scenes/EngagementScene';
import QuestionsScene from './scenes/QuestionsScene';
import ContactScene from './scenes/ContactScene';

// Dev-only canon kit gallery at `?kit=1` (CANON_KIT §4). The DEV guard lets
// the production build drop both the branch and the lazy chunk.
const KitGallery = import.meta.env.DEV ? React.lazy(() => import('./kit/KitGallery')) : null;
const showKit = () => KitGallery && new URLSearchParams(window.location.search).has('kit');

function ConsultationContent() {
  useConsultationPage();

  return (
    <div className="cl-consultation">
      <ConsultationIcons />
      <ScrollRail />
      <a className="cl-skip-link" href="#cl-main">Skip to consultation content</a>

      <main id="cl-main" className="cl-main" tabIndex={-1}>
        {showKit() ? (
          <Suspense fallback={null}><KitGallery /></Suspense>
        ) : (
          <>
            <HeroScene />
            <AudienceScene />
            <ContributionScene />
            <PersonScene />
            <ApproachScene />
            <EngagementScene />
            <QuestionsScene />
            <ContactScene />
          </>
        )}
      </main>
    </div>
  );
}

export default ConsultationContent;
