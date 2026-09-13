// SC-03 copy — COPY_CANON.md §SC-03 (the mockup's words adapted to the locked framing).
// Edit COPY_CANON first, then sync here. `placeholder: true` marks slots COPY_CANON doesn't cover.
export const wallsCopy = {
  eyebrow: { text: 'Three walls. Real problems.', source: 'COPY_CANON' },
  headline: { lines: ['Great potential. Real barriers.'], source: 'COPY_CANON' },
  lead: {
    text: 'AI opens real opportunities — and real challenges. Whichever side you’re on, these are the three walls I see most often, and the ones I help you move through.',
    source: 'COPY_CANON'
  },
  walls: {
    source: 'COPY_CANON',
    items: [
      {
        label: 'Trust',
        title: ['AI is impressive', 'but hard to trust.'],
        text: 'The possibilities are real, but so are the questions. How reliable is it? Where does it need checking? Most companies don’t yet know how to rely on it when the work is real.'
      },
      {
        label: 'Complexity',
        title: ['Work collapses', 'under its own weight.'],
        text: 'It holds up for small tasks. The moment the work gets complicated — more steps, more people, more handoffs — the way most people use it falls apart.'
      },
      {
        label: 'Reliability',
        title: ['Good ideas stall', 'before real results.'],
        text: 'Changing one thing is easy. Directing a whole body of work so it comes out right is the real problem — and why so much AI use stays stuck in small steps.'
      }
    ]
  },
  wordStack: { words: ['Clarity', 'Direction', 'Practical outcomes'], source: 'COPY_CANON' },
  closer: { lines: ['Same barriers. Brighter paths.'], source: 'COPY_CANON' },
  nextLabel: { text: 'Next: what I actually do', placeholder: true, source: 'SCENE_SPECS SC-03 (aria label only)' }
};

export default wallsCopy;
