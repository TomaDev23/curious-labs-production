// SC-07 engagement canon copy (COPY_CANON, MOTIF_PROGRESSION: no QuoteBlock
// here — the quote budget is spent on SC-01/05/09).
export const engagementCopy = {
  eyebrow: { text: 'Engagement flow', source: 'COPY_CANON' },
  h2: { lines: ['A simple path', 'from talk to action.'], source: 'COPY_CANON' },
  lead: {
    text: 'No complexity. No fluff. Just a clear process from a real conversation to agreed work.',
    source: 'COPY_CANON'
  },
  wordStack: { words: ['DIFFERENT CONTEXTS.', 'SAME MOMENTUM.', 'IDEAS INTO IMPACT.'], source: 'COPY_CANON' },
  boundary: {
    text: 'The first conversation is free; everything after it is proposed and agreed first.',
    source: 'COPY_DECK_v2 (cited by COPY_CANON)'
  },
  steps: {
    items: [
      {
        n: '01',
        icon: 'chat',
        title: 'Free conversation',
        text: 'Bring one real situation. I listen, ask, and give you my reading and a general direction.',
        phoneText: 'Bring one real situation. I listen and give you my reading.',
        tag: 'OPEN. PRACTICAL. NO PRESSURE.'
      },
      {
        n: '02',
        icon: 'file',
        title: 'Proposal',
        text: "An email summary straight after, then a scoped proposal and quote once I've thought it through.",
        phoneText: 'An email summary, then a scoped proposal and quote.',
        tag: 'CLEAR. RELEVANT. NO GENERIC PLANS.'
      },
      {
        n: '03',
        icon: 'shield',
        title: 'Agreed work',
        text: 'You confirm the proposal; we settle the contract and payment, and the work is scheduled.',
        phoneText: 'You confirm; we settle the contract and payment.',
        tag: 'FOCUSED. AGREED. CLEAR NEXT STEPS.'
      },
      {
        n: '04',
        icon: 'handoff',
        title: 'Delivery & support',
        text: 'I prepare the materials and deliver the report, the sessions and any support we agreed.',
        phoneText: 'I deliver the report, sessions and support we agreed.',
        tag: 'PRACTICAL. HANDS-ON. REAL CAPABILITY.'
      }
    ],
    source: 'COPY_CANON'
  }
};

export default engagementCopy;
