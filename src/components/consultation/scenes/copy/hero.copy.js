// SC-01 hero canon copy (MOCK-D0 / M1). Owner decision 2026-09-13: mockup
// words are now the default copy for every scene slot (#MGR-016).
// Authority: _FRAMING_LOCKED.md > COPY_CANON > COPY_DECK_v2.
export const heroCopy = {
  eyebrow: { text: 'AI consultation', source: 'COPY_CANON' },
  h1: { lines: ['Business consultation', 'in the age of AI.'], source: 'COPY_CANON' },
  lead: {
    text: "A business advisor first. AI as a serious, hands-on focus. Sit down with me, bring one real situation, and we'll find where AI is worth it, define the methods, and plan the work.",
    source: 'COPY_CANON'
  },
  quote: { text: 'Same curiosity. More real-world problems.', source: 'COPY_CANON' },
  quoteLabel: { text: 'CURIOUSLABS', source: 'COPY_CANON' },
  stats: {
    items: [
      { big: '18', label: 'YEARS IN CAMBODIA', note: 'Real market experience' },
      { big: 'AI', label: 'HANDS-ON OPERATOR', note: 'Not just theory' },
      { big: 'REAL', label: 'BUSINESSES', note: 'Hospitality, F&B, Real estate' },
    ],
    source: 'COPY_CANON'
  },
};

export default heroCopy;
