const slot = (text, source = 'COPY_CANON') => ({ text, placeholder: true, source });

export const PERSON_COPY = {
  eyebrow: slot('THE PERSON BEHIND CURIOUSLABS'),
  title: [
    slot('A business advisor first.'),
    slot('An AI operator'),
    slot('in practice.')
  ],
  phoneTitle: [slot('18 years in the'), slot('Khmer market.')],
  body: slot("I've worked in the Khmer market for 18 years — leading and advising real businesses in hospitality, food & beverage and real estate. Today I bring that experience directly into AI, helping businesses move from ideas to practical outcomes."),
  primaryAction: slot('Start a conversation →'),
  secondaryAction: slot('More about my experience'),
  phonePrimaryAction: slot('My background'),
  phoneSecondaryAction: slot("Let's talk"),
  quote: slot('Real places. Real businesses. Real possibilities.'),
  quoteLabel: slot('CURIOUSLABS', 'MOCK-D5'),
  wordStack: [slot('PHNOM PENH'), slot('CAMBODIA'), slot('A BRIGHTER TOMORROW')],
  credibility: [
    {
      icon: 'pin',
      title: slot('18 years'),
      subtitle: slot('in the Khmer market'),
      line: slot('Hands-on experience across different business cycles.')
    },
    {
      icon: 'work',
      title: slot('Hospitality, F&B, Real estate'),
      line: slot('From operations to strategy, in on-the-ground businesses.')
    },
    {
      icon: 'gear',
      title: slot('Current AI operator'),
      line: slot('I use AI daily in my own work — building, testing, and applying what actually works.')
    },
    {
      icon: 'handoff',
      title: slot('A practical bridge'),
      line: slot('Where real business experience meets practical AI use.')
    }
  ],
  phoneCredibility: [
    { icon: 'pin', title: slot('18 years in Cambodia'), line: slot('Hospitality, F&B, Real estate') },
    { icon: 'gear', title: slot('Current AI operator'), line: slot('Hands-on, not just theory') },
    { icon: 'handoff', title: slot('Bridging business and technology'), line: slot('Practical, grounded, and local') },
    { icon: 'compass', title: slot('Straightforward working style'), line: slot('Clear, direct, and focused') }
  ],
  rootedEyebrow: slot('ROOTED IN CAMBODIA'),
  rootedTitle: [slot('Real context.'), slot('Real perspective.')],
  rootedBody: slot('Eighteen years in Cambodia have given me a deep understanding of the people, the culture, and what it really takes to build and run a business here. That local insight shapes every conversation — because AI only creates value when it fits your reality, your team, and your customers.'),
  rootedChips: [slot('Local market'), slot('People and culture'), slot('Practical advice'), slot('English & Khmer')],
  localQuote: slot('Local experience. Real businesses. Now focused on AI.'),
  localWordStack: [slot('BUSINESS'), slot('PEOPLE'), slot('PLACES'), slot('AI'), slot('POSSIBILITIES')],
  riversideCaption: [slot('SAME MARKET.'), slot('NEW POSSIBILITIES.')],
  tomorrowEyebrow: slot('A CLEARER TOMORROW'),
  tomorrowTitle: [slot('Practical AI,'), slot('right here at home.')],
  tomorrowBody: slot('Supporting local businesses to work smarter, solve real problems, and find new opportunities with AI — here in Cambodia.'),
  tomorrowPoints: [slot('Local businesses'), slot('Real problems'), slot('New opportunities'), slot('English & Khmer')],
  cambodiaLabel: slot('CAMBODIA')
};
