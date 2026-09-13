import React from 'react';
import ChapterMark from '../kit/ChapterMark';
import { ClIcon } from '../ConsultationIcons';
import { Reveal, Stagger, KineticHeading } from '../ConsultationMotion';
import './css/sc-09-contact.css';

function ContactScene() {
  return (
    <>
      {/* ── D8 · Contact ─────────────────────────────────────────── */}
      <ChapterMark n="07" label="LET’S START A CONVERSATION" />
      <section id="contact" className="cl-section cl-contact cl-panel" aria-labelledby="cl-contact-title" data-cl-section="D8">
        <div className="cl-contact__intro">
          <Reveal as="p" className="cl-eyebrow" y={12}><span>07 /</span> LET’S START A CONVERSATION</Reveal>
          <KineticHeading id="cl-contact-title" level="h2" lines={['Start with one real', 'business situation.']} />
          <Reveal as="p" delay={0.2}>
            Tell me a little about your company and what you’d like to do with AI. I’ll meet you, understand the situation, and talk through the directions worth taking.
          </Reveal>
          <Reveal as="p" className="cl-contact__free" delay={0.28}>
            The first consultation is free; any further work is proposed and agreed separately.
          </Reveal>
          <Stagger className="cl-location" step={0.09} delay={0.32}>
            <Reveal as="span" y={12}><ClIcon name="pin" /> Phnom Penh and its vicinity, or online.</Reveal>
            <Reveal as="span" y={12}><ClIcon name="chat" /> English and Khmer discussion.</Reveal>
          </Stagger>
          <Reveal as="p" className="cl-caption" delay={0.42}>Regional work and any travel arrangements are agreed separately.</Reveal>
        </div>
        <div className="cl-contact__options">
          <Reveal className="cl-contact__next" y={22} delay={0.15}>
            <p className="cl-micro">HOW THE FIRST CONTACT GOES</p>
            <ol className="cl-next-list">
              {[
                ['Tell me one situation', 'A few sentences about your business and what you would like AI to do in it.'],
                ['We meet, at no cost', 'In Phnom Penh or online, in English or Khmer. I ask questions until I understand it.'],
                ['You get it in writing', 'A short summary of the discussion. Anything further is proposed and agreed separately.']
              ].map(([title, text], i) => (
                <li key={title}>
                  <span className="cl-next-list__n" aria-hidden="true">{`0${i + 1}`}</span>
                  <span>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="cl-contact__reassurance">No form. No account. Just a conversation.</p>
            <p className="cl-caption">Direct messaging and email will appear here once those destinations are confirmed.</p>
            <span className="cl-contact__pending" aria-hidden="true">
              <span className="cl-contact__pending-dot"></span>PENDING · AWAITING CONFIRMATION
            </span>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default ContactScene;
