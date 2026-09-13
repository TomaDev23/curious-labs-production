const slot = (text, source = 'COPY_CANON') => ({ text, placeholder: true, source });

export const APPROACH_COPY = {
  eyebrow: slot('THE APPROACH'),
  phoneEyebrow: slot('MY APPROACH'),
  title: [slot('Practical,'), slot('focused, and human.')],
  lead: slot("Every business is different. That's why I start with your reality — your goals, your context, your people — and shape a practical path from there."),
  quote: slot('Real progress starts where you are.'),
  quoteLabel: slot('CURIOUSLABS', 'MOCK-D3'),
  tagline: [slot('DIFFERENT BUSINESSES.'), slot('A BRIGHTER TOMORROW.')],
  primaryAction: slot('Start a free conversation →'),
  secondaryAction: slot('See how it works'),
  pathEyebrow: slot('HOW I WORK'),
  pathTitle: [slot('A clear path from conversation'), slot('to real work.')],
  pathAside: slot('Not a generic playbook. A tailored path, built with you.'),
  steps: [
    {
      icon: 'chat',
      title: slot('Start with your reality'),
      text: slot('I listen and ask until I understand your context, goals, constraints and opportunities.')
    },
    {
      icon: 'compass',
      title: slot("Focus on what's useful"),
      text: slot('Find where AI genuinely earns its place and set clear priorities.', 'COPY_CANON; framing adaptation')
    },
    {
      icon: 'gear',
      title: slot('Build a clear plan'),
      text: slot('The approach, the harness and the milestones — practical and tailored.')
    },
    {
      icon: 'rocket',
      title: slot('Work together'),
      text: slot('Training, hands-on support and checking, so it holds up in real work.')
    }
  ],
  readingsEyebrow: slot('EXPLORE THE DEEPER TOPICS'),
  readingsTitle: [slot('Four perspectives.'), slot('A complete picture.')],
  readingsAside: slot('Go deeper into what makes AI work in a real business — from the method to the experience behind it.'),
  readingCards: [
    {
      label: slot('THE METHOD'),
      title: slot('A directed, checked way of working.'),
      summary: slot('How the work is organised, directed and reviewed: the harness around the prompt.'),
      chips: ['Context', 'Stages', 'Checks'].map((value) => slot(value))
    },
    {
      label: slot('THE CONCEPT'),
      title: slot('Beyond the single request.'),
      summary: slot('What changes when you direct AI across a whole body of work, not one change at a time.'),
      chips: ['Scope', 'Direction', 'Relationships'].map((value) => slot(value))
    },
    {
      label: slot('THE TECHNOLOGY'),
      title: slot('Where to trust it, where to check.'),
      summary: slot('The capabilities and their limits, in plain language. No rankings, no guarantees.'),
      chips: ['Capabilities', 'Limits', 'Checking'].map((value) => slot(value))
    },
    {
      label: slot('THE EXPERIENCE'),
      title: slot('Both sides of the table.'),
      summary: slot('How running businesses and operating AI point at the same question.'),
      chips: ['Business', 'AI practice', 'This market'].map((value) => slot(value))
    }
  ],
  closingQuote: slot("It's not about AI for its own sake. It's about what it makes possible for your business."),
  closingPoints: [
    { icon: 'people', title: slot('Real conversations.'), text: slot('Real situations.') },
    { icon: 'compass', title: slot('Practical advice.'), text: slot('No jargon.') },
    { icon: 'bolt', title: slot('People first.'), text: slot('Always.') }
  ]
};
