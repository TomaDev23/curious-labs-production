// SC-02 placeholder copy slots (MOCKUP_CANON §4). Headline, intro, card titles
// and bodies stay in AudienceScene.jsx (COPY_DECK_v2). Every entry here is a
// placeholder for the copy pass: { text, placeholder: true, source }.
export const doorsCopy = {
  eyebrow: { text: 'Two audiences. One conversation.', placeholder: true, source: 'MOCK-D1' },
  quote: { lines: ['Two paths.', 'A wider horizon.'], placeholder: true, source: 'MOCK-D1' },
  quoteLabel: { text: 'CuriousLabs', placeholder: true, source: 'MOCK-D1' },
  closerLeft: { lines: ['Same curiosity.', 'More possibilities.'], placeholder: true, source: 'MOCK-D1' },
  closerRight: { lines: ['Same destination.', 'A more useful tomorrow.'], placeholder: true, source: 'MOCK-D1' },
  cta: { text: 'Discuss your situation', placeholder: true, source: 'TASKS B-06 canon amendment' },
  technical: {
    chips: { items: ['Team coordination', 'Harnessing rules', 'AI at scale'], placeholder: true, source: 'deck card A body' }
  },
  business: {
    chips: { items: ['Real use cases', 'Harness design', 'How your business works'], placeholder: true, source: 'deck card B body' }
  }
};

export default doorsCopy;
