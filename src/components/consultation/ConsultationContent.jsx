import React from 'react';
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

function ConsultationContent() {
  useConsultationPage();

  return (
    <div className="cl-consultation">
      <ConsultationIcons />
      <ScrollRail />
      <a className="cl-skip-link" href="#cl-main">Skip to consultation content</a>

      <main id="cl-main" className="cl-main" tabIndex={-1}>
        <HeroScene />
        <AudienceScene />
        <ContributionScene />
        <PersonScene />
        <ApproachScene />
        <EngagementScene />
        <QuestionsScene />
        <ContactScene />
      </main>
    </div>
  );
}

export default ConsultationContent;
