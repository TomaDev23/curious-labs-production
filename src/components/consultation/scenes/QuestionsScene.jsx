import React, { useState } from 'react';
import { Band, Eyebrow, Display, Body, GhostButton, NumberedRow } from '../kit';
import questionsCopy from './copy/questions.copy';
import './css/sc-08-questions.css';

/* Answers written from the owner's own discovery answers Q1–Q18 — see
   Docs_v8/page_Consultation/DISCOVERY_ANSWERS_Q1-Q18.md, which also records
   what those answers deliberately keep off the page: the named methods
   (Maestro, Orchestrator mode, LEGIT — unspecified), the internal wording about
   how much detail to withhold, and any figure or deposit percentage. */
const QUESTION_GROUPS = [
  {
    id: 'offer',
    label: 'WHAT THIS IS',
    note: 'The shape of the service, and its edges.',
    items: [
      {
        q: 'Is this AI consulting, or business consulting?',
        a: 'Both — it’s business consultation with AI at the centre. For a technical company, that’s advising on how to use the technology better. For a company that isn’t technical, it’s helping you find where AI fits and designing the setup to match. Same focus, two different starting points.'
      },
      {
        q: 'Is this a standard AI course?',
        a: 'No. I am not offering AI training as a general thing. I am offering a tailored solution built around understanding what your business needs and answering that. There is no fixed syllabus, no bundle, no set duration, and no fixed cost.'
      },
      {
        q: 'Do I need to be technical to get value from it?',
        a: 'No. I work with two groups: teams who already code or have people building products, and businesses with no code involvement at all — factories, restaurants, hotels — looking at assistance, management, or creation. Both need the same understanding of how to direct the technology.'
      },
      {
        q: 'Do you teach coding, or build the product for us?',
        a: 'Neither. I do not advise on how to code — I advise on how to manage AI to do the coding, and to use everything it can usefully do. Product development and design are not a standard offer; anything exceptional is discussed and agreed separately.'
      },
      {
        q: 'We already use AI. What would this add?',
        a: 'Most use of AI is small steps and isolated changes. The operator’s view sits above that: how prompts are designed, where the output can be trusted and where it can’t, how to put a harness around the capabilities, how to keep auditing the work, and how to spread it across a team of agents so it doesn’t collapse as it grows.'
      }
    ]
  },
  {
    id: 'working',
    label: 'WORKING TOGETHER',
    note: 'Who is involved, and what actually happens.',
    items: [
      {
        q: 'Who would I be working with?',
        a: 'Me. There is no team behind this. I meet you, assess the situation, suggest the direction or the next steps, and then do the work myself.'
      },
      {
        q: 'Who inside my business would you work with?',
        a: 'The first meetings are best with the people who can agree direction and commitment. After that I work with whoever the material is actually for. If that is the cashier, I will work with the cashier as readily as with the CEO.'
      },
      {
        q: 'What happens in the first conversation?',
        a: 'You bring one real situation. I listen, ask questions until I understand it, and give you my reading of it and a general direction. It is a conversation, not an assessment, and it commits you to nothing.'
      },
      {
        q: 'Is the first conversation really free?',
        a: 'Yes. Understanding and a general direction, at no cost. Anything beyond that is proposed and agreed separately.'
      },
      {
        q: 'What do I receive afterwards?',
        a: 'An email straight after the meeting confirming what we discussed. Then I take a few days to think the approach through properly and send a proposal and quote with a clear scope — that is the first real deliverable. If you confirm it, we arrange the contract and payment, and I begin preparing the materials and the timeframe.'
      }
    ]
  },
  {
    id: 'practical',
    label: 'PRACTICALITIES',
    note: 'Format, scope, place, and language.',
    items: [
      {
        q: 'What does the training actually look like?',
        a: 'At minimum, a report and one-to-one sessions with the people it is for. Beyond that it is shaped to your business: who receives it, how long it runs, and what support follows. Ongoing support or weekly meetings for a period are both possible — they are options, not automatic inclusions.'
      },
      {
        q: 'How long does it take, and what does it cost?',
        a: 'There is no fixed solution and no fixed cost. Both are proposed for your case once I understand the work. I would rather quote something real than attach a number to a package that does not exist.'
      },
      {
        q: 'Where do you work?',
        a: 'The free first consultation is in Phnom Penh and its vicinity, or online. The service itself is available throughout the region — I can come to wherever you want to meet, with the arrangements agreed for the case.'
      },
      {
        q: 'Which languages do you work in?',
        a: 'English and Khmer. I put the points into Khmer myself rather than passing them through a translator, which usually strips out the flavour and the nuance. My Khmer is not academic, but it is more than enough to teach a team the reasoning behind what we are doing — rather than handing them a manual to follow.'
      },
      {
        q: 'Do you work in my industry?',
        a: 'Possibly. Hotels, restaurants, and factories are settings I know from running businesses in them, but they are examples rather than a list of industries served. What matters is what the work involves, not which sector it sits in.'
      }
    ]
  }
];

const ALL_QUESTIONS = QUESTION_GROUPS.flatMap((group) => group.items);

function QuestionsScene() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Band id="questions" sectionKey="D9" labelledBy="cl-questions-title" className="q-band">
      <header className="q-head">
        <div className="q-head__copy">
          <Eyebrow>{questionsCopy.eyebrow.text}</Eyebrow>
          <Display id="cl-questions-title" lines={questionsCopy.h2.lines} />
        </div>
        <div className="q-head__side">
          <Body>{questionsCopy.side.text}</Body>
          {!expanded && (
            <GhostButton onClick={() => setExpanded(true)}>{questionsCopy.viewAll.text}</GhostButton>
          )}
        </div>
      </header>

      <ul className="q-grid" data-expanded={expanded}>
        {ALL_QUESTIONS.map((item, i) => (
          <NumberedRow
            key={item.q}
            as="li"
            className="q-item"
            n={String(i + 1).padStart(2, '0')}
            title={item.q}
            headingLevel={3}
          >
            <p>{item.a}</p>
          </NumberedRow>
        ))}
      </ul>

      <p className="q-bridge">Anything not answered here is a good place to start the conversation.</p>
    </Band>
  );
}

export default QuestionsScene;
