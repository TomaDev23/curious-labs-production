// SC-09 copy — COPY_CANON.md §SC-09 for the horizon, phone card and footer; COPY_DECK_v2 §8 for the
// first-contact detail (free line, location, three steps, pending channels), which COPY_CANON leaves to the deck.
export const contactCopy = {
  eyebrow: { text: 'Let’s build what’s next', source: 'COPY_CANON' },
  headline: { lines: ['Start with', 'a conversation.'], source: 'COPY_CANON' },
  lead: {
    text: 'Bring a real situation. Let’s explore what’s possible with AI — practical, grounded, and focused on your business.',
    source: 'COPY_CANON'
  },
  primary: { text: 'Start a free conversation', source: 'COPY_CANON' },
  secondary: { text: 'See how it works', source: 'COPY_CANON' },
  points: {
    source: 'COPY_CANON',
    items: [
      { title: 'Real context', text: 'Your world, not theory' },
      { title: 'Practical ideas', text: 'Grounded and usable' },
      { title: 'Lasting value', text: 'More than just advice' }
    ]
  },
  tagline: { lines: ['Same curiosity.', 'A more useful tomorrow.'], source: 'COPY_CANON' },
  crumbs: { items: ['Ideas', 'People', 'Real world'], source: 'COPY_CANON' },
  card: {
    eyebrow: { text: 'Ready to talk?', source: 'COPY_CANON' },
    // Desktop card title/intro keep the deck's first-contact words; the phone card uses COPY_CANON's short form.
    title: { lines: ['Start with one real', 'business situation.'], source: 'COPY_DECK_v2' },
    intro: {
      text: 'Tell me a little about your company and what you’d like to do with AI. I’ll meet you, understand the situation, and talk through the directions worth taking.',
      source: 'COPY_DECK_v2'
    },
    phoneTitle: { lines: ['Start with', 'a conversation.'], source: 'COPY_CANON' },
    phoneBody: { text: 'Bring a question, a challenge, or just curiosity. No pressure — just a useful conversation.', source: 'COPY_CANON' },
    free: { text: 'The first consultation is free; anything beyond it is proposed and agreed separately.', source: 'COPY_DECK_v2' },
    location: { text: 'Phnom Penh and its vicinity, or online.', source: 'COPY_DECK_v2' },
    language: { text: 'English and Khmer discussion.', source: 'COPY_DECK_v2' },
    // Phone (≤767px) folds location + language into one row — COPY_CANON §SC-09, decided #MGR-055.
    phoneMeta: { text: 'Phnom Penh or online · English & Khmer', source: 'COPY_CANON' },
    caption: { text: 'Regional work and any travel arrangements are agreed separately.', source: 'COPY_DECK_v2' },
    stepsLabel: { text: 'How the first contact goes', source: 'COPY_DECK_v2' },
    steps: {
      source: 'COPY_DECK_v2',
      items: [
        { title: 'Tell me one situation', text: 'A few sentences about your business and what you would like AI to do in it.' },
        { title: 'We meet, at no cost', text: 'In Phnom Penh or online, in English or Khmer. I ask questions until I understand it.' },
        { title: 'You get it in writing', text: 'A short summary of the discussion. Anything further is proposed and agreed separately.' }
      ]
    },
    reassurance: { text: 'No form. No account. Just a conversation.', source: 'COPY_DECK_v2' },
    pending: {
      status: 'Pending · awaiting confirmation',
      text: 'Direct messaging and email will appear here once those destinations are confirmed.',
      source: 'COPY_DECK_v2 (contact channels pending, Q15)'
    }
  },
  footer: {
    quote: { lines: ['Local experience.', 'Real businesses. Now focused on AI.'], label: 'CuriousLabs', source: 'COPY_CANON' },
    links: {
      source: 'COPY_CANON (in-page anchors only)',
      items: [
        { label: 'About', href: '#person' },
        { label: 'Approach', href: '#approach' },
        { label: 'Experience', href: '#experience' },
        { label: 'Contact', href: '#contact' }
      ]
    },
    tagline: { text: 'Ideas × People × Real world', source: 'COPY_CANON' }
  }
};

export default contactCopy;
