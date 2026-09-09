import React from 'react';
import ConsultationIcons, { ClIcon } from './ConsultationIcons';
import ConsultationOrbit from './ConsultationOrbit';
import {
  FigureAudiences,
  FigureSubjects,
  FigureStrands,
  FigureDirection,
  FigureEngagement
} from './ConsultationFigures';
import { Reveal, Stagger, KineticHeading, Parallax, ScrollRail } from './ConsultationMotion';
import useConsultationPage, { openReading, closeReading } from './useConsultationPage';

const SUBJECTS = [
  {
    id: 'S1',
    icon: 'compass',
    number: '01',
    title: 'Direction and solutions',
    text: 'Understand the situation and identify a sensible approach to using AI.'
  },
  {
    id: 'S2',
    icon: 'layers',
    number: '02',
    title: 'Workflow and harness planning',
    text: 'Plan the prompts, context, stages, tools, handoffs, and checks around the work.'
  },
  {
    id: 'S3',
    icon: 'people',
    number: '03',
    title: 'Coordinated AI work',
    text: 'Understand how people can use AI together, and how AI agents can work under human direction.'
  },
  {
    id: 'S4',
    icon: 'shield',
    number: '04',
    title: 'Planning and quality',
    text: 'Manage AI work against the intended scope, architecture constraints, and review expectations.'
  },
  {
    id: 'S5',
    icon: 'work',
    number: '05',
    title: 'Business use and adoption',
    text: 'Connect the technology with management, operations, and the people doing the work.'
  },
  {
    id: 'S6',
    icon: 'learn',
    number: '06',
    title: 'Relevant training',
    text: 'Teach the people involved what they need to understand and use in their own situation.'
  }
];

const STEPS = [
  { number: '01', label: 'DISCUSS', cost: 'FREE', title: 'A free conversation', text: 'Understand the situation and discuss possible directions.' },
  { number: '02', label: 'PROPOSE', cost: 'NO COMMITMENT', title: 'A considered proposal', text: 'An email straight after the meeting, then a few days to develop a scoped proposal and quote.' },
  { number: '03', label: 'AGREE', cost: 'AGREED TERMS', title: 'Clear arrangements', text: 'Confirm the proposal, then arrange the contract, payment, and agreed deposit.' },
  { number: '04', label: 'DELIVER', cost: 'AGREED SCOPE', title: 'Preparation & delivery', text: 'Prepare the materials and timeframe, then deliver the agreed report, sessions, and support.' }
];

const READINGS = [
  {
    id: 'method',
    key: 'R1',
    number: '01',
    title: 'About the method',
    question: 'How is the work organized, directed, and reviewed?',
    text: 'A prompt is only one part of the way AI work is organized. The surrounding harness includes context, stages, tools, handoffs, and checks. I help people think about how the work is directed, how AI roles are managed, and how results are reviewed, rather than treating each output as a finished answer.'
  },
  {
    id: 'concept',
    key: 'R2',
    number: '02',
    title: 'About the concept',
    question: 'What changes when you operate AI across a larger undertaking?',
    text: 'The shift is from asking AI for isolated small changes to directing it across a larger body of work. The operator’s view stays above the individual request: what is being attempted, how the pieces relate, and where direction and checking are needed. It is not simply a larger prompt or a longer unattended request.'
  },
  {
    id: 'technology',
    key: 'R3',
    number: '03',
    title: 'About the technology',
    question: 'Where can the capabilities help, and where should you not simply trust the output?',
    text: 'This conversation is about understanding the capabilities and their limits: where AI can help, where trust is appropriate, and why checking matters. The emphasis is on using and managing the technology in the work at hand—not on tool rankings, technical guarantees, or a how-to-code lesson.'
  },
  {
    id: 'experience',
    key: 'R4',
    number: '04',
    title: 'About the experience',
    question: 'How do my AI practice and business experience connect?',
    text: 'My AI practice and business-management experience inform the same question: how can the technology be connected to the work a business actually needs to do? This space brings together context from my own projects, hospitality and food-and-beverage background, and experience living and working in Cambodia.'
  }
];

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
        a: 'Most use of AI is small steps and isolated changes. The operator’s view sits above that: how prompts are designed, where the output can be trusted and where it cannot, how to put a harness around the capabilities, how to keep auditing the work, and how to break it across a team of agents so it does not collapse as it grows.'
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

/** Big ghost numeral + rule + label that opens each chapter. */
function ChapterMark({ n, label }) {
  return (
    <Reveal className="cl-chapter" y={18}>
      <span className="cl-chapter__num" aria-hidden="true">{n}</span>
      <span className="cl-chapter__rule" aria-hidden="true" />
      <span className="cl-chapter__label">{label}</span>
    </Reveal>
  );
}

/**
 * Editorial two-column row. `flip` puts the figure on the left at desktop
 * width; on narrow screens the copy always comes first regardless of `flip`.
 */
function FigureRow({ figure, flip = false, children, className = '' }) {
  return (
    <div className={`cl-figure-row${flip ? ' cl-figure-row--flip' : ''} ${className}`.trim()}>
      <div className="cl-figure-row__copy">{children}</div>
      <div className="cl-figure-row__art">
        <Parallax>{figure}</Parallax>
      </div>
    </div>
  );
}

function ConsultationContent() {
  useConsultationPage();

  return (
    <div className="cl-consultation">
      <ConsultationIcons />
      <ScrollRail />
      <a className="cl-skip-link" href="#cl-main">Skip to consultation content</a>

      <main id="cl-main" className="cl-main" tabIndex={-1}>
        {/* ── D1 · Opening ─────────────────────────────────────────── */}
        <section id="overview" className="cl-hero cl-panel" aria-labelledby="cl-page-title" data-cl-section="D1">
          <span className="cl-panel__corner cl-panel__corner--tl" aria-hidden="true"></span>
          <span className="cl-panel__corner cl-panel__corner--tr" aria-hidden="true"></span>
          <span className="cl-panel__corner cl-panel__corner--bl" aria-hidden="true"></span>
          <span className="cl-panel__corner cl-panel__corner--br" aria-hidden="true"></span>
          <span className="cl-hero__vmeta" aria-hidden="true">SYSTEMS · PEOPLE · POSSIBILITIES</span>
          <div className="cl-hero__copy">
            <Reveal as="p" className="cl-eyebrow" y={12}><span>//</span> AI INTEGRATION CONSULTATION</Reveal>
            <KineticHeading
              id="cl-page-title"
              level="h1"
              lines={['Work with AI in', 'a way that fits', 'your business.']}
            />
            <Reveal as="p" className="cl-lead" delay={0.25}>
              I help technical teams and non-technical businesses understand, plan, and manage AI work. Consultation, materials, and training are tailored to your needs—not a fixed course.
            </Reveal>
            <Reveal as="p" className="cl-hero__invitation" delay={0.33}>
              Bring one real situation from your business. We can discuss possible directions in a free first conversation.
            </Reveal>
            <Reveal className="cl-actions" delay={0.41}>
              <a className="cl-button cl-button--primary" href="#contact">
                Start a free conversation <ClIcon name="arrow" />
              </a>
              <a className="cl-button cl-button--secondary" href="#approach">
                See the approach <ClIcon name="diagonal" />
              </a>
            </Reveal>
          </div>
          <div className="cl-hero__visual">
            <div className="cl-hero__signal" aria-hidden="true"></div>
            <ConsultationOrbit />
          </div>
          <Reveal className="cl-hero__meta" delay={0.5}>
            <span><ClIcon name="people" /> Personally delivered</span>
            <span><ClIcon name="pin" /> Phnom Penh / Online</span>
            <span><ClIcon name="chat" /> English &amp; Khmer</span>
            <span className="cl-hero__meta-label">CURIOUSLABS // AI INTEGRATION CONSULTATION</span>
          </Reveal>
        </section>

        <Stagger className="cl-jump-links" as="nav" aria-label="On this page" step={0.055}>
          <Reveal as="span" className="cl-micro" y={10}>EXPLORE THE PAGE</Reveal>
          <Reveal as="a" href="#contribution" y={10}>What I help with <ClIcon name="arrow" /></Reveal>
          <Reveal as="a" href="#person" y={10}>About me <ClIcon name="arrow" /></Reveal>
          <Reveal as="a" href="#approach" y={10}>The approach <ClIcon name="arrow" /></Reveal>
          <Reveal as="a" href="#questions" y={10}>Questions <ClIcon name="arrow" /></Reveal>
          <Reveal as="a" href="#contact" y={10}>Contact <ClIcon name="arrow" /></Reveal>
        </Stagger>

        {/* ── D2 · Audiences ───────────────────────────────────────── */}
        <ChapterMark n="01" label="WHO THIS IS FOR" />
        <section id="audiences" className="cl-section" aria-labelledby="cl-audiences-title" data-cl-section="D2">
          <header className="cl-section-heading cl-heading-split">
            <div>
              <Reveal as="p" className="cl-eyebrow" y={12}><span>01 /</span> WHO THIS IS FOR</Reveal>
              <KineticHeading id="cl-audiences-title" level="h2" lines={['Where could this help?']} />
            </div>
            <Reveal as="p" className="cl-section-intro" delay={0.2}>
              Different kinds of work.<br />A shared need for direction.
            </Reveal>
          </header>

          <Stagger className="cl-audiences" step={0.12}>
            <Reveal as="article" className="cl-audience-card">
              <div className="cl-card-top">
                <span className="cl-icon-ring"><ClIcon name="code" /></span>
                <span className="cl-micro">BUILDING WITH TECHNOLOGY</span>
              </div>
              <h3>Technical teams</h3>
              <p>You already code, or have people building products. Learn to direct AI across more of the work, with planning, review, and control.</p>
              <p className="cl-card-foot">Not programming instruction.</p>
            </Reveal>
            <Reveal as="article" className="cl-audience-card cl-audience-card--biz">
              <div className="cl-card-top">
                <span className="cl-icon-ring"><ClIcon name="work" /></span>
                <span className="cl-micro">RUNNING A BUSINESS</span>
              </div>
              <h3>Businesses with non-coding needs</h3>
              <p>Explore AI for management, assistance, creation, and other work. Possible settings include hotels, restaurants, and factories.</p>
              <p className="cl-card-foot">Not a coding course in disguise.</p>
            </Reveal>
          </Stagger>

          <FigureRow figure={<FigureAudiences />} flip className="cl-figure-row--tight">
            <div className="cl-recognition">
              <Reveal as="p" className="cl-recognition__intro" y={14}>Does any of this sound familiar?</Reveal>
              <Stagger className="cl-recognition__list" step={0.1}>
                <Reveal as="article">
                  <p className="cl-micro">TRUST</p>
                  <p>AI does impressive things, but it behaves like brute force and the occasional miracle. We cannot rely on it the way we rely on someone in the team.</p>
                </Reveal>
                <Reveal as="article">
                  <p className="cl-micro">COMPLEXITY</p>
                  <p>It holds up for small steps. As soon as the work gets complicated, the way we use it collapses under its own weight.</p>
                </Reveal>
                <Reveal as="article">
                  <p className="cl-micro">SCOPE</p>
                  <p>We can change one thing at a time. We do not know how to direct a whole body of work with it and have the result come out reliably.</p>
                </Reveal>
              </Stagger>
            </div>
          </FigureRow>

          <Reveal as="p" className="cl-bridge" y={14}><span></span>The starting point is your situation. The scope comes after we understand it.</Reveal>
        </section>

        {/* ── D3 · Contribution ────────────────────────────────────── */}
        <ChapterMark n="02" label="WHAT WE COULD WORK ON" />
        <section id="contribution" className="cl-section" aria-labelledby="cl-contribution-title" data-cl-section="D3">
          <FigureRow figure={<FigureSubjects />}>
            <header className="cl-section-heading">
              <Reveal as="p" className="cl-eyebrow" y={12}><span>02 /</span> WHAT WE COULD WORK ON</Reveal>
              <KineticHeading
                id="cl-contribution-title"
                level="h2"
                lines={['Start with the need.', 'Build the right approach.']}
              />
              <Reveal as="p" className="cl-section-intro" delay={0.2}>
                We start with your situation, then choose the subjects and methods that fit. The consultation is shaped around your work and the people involved—not a fixed course or bundle.
              </Reveal>
            </header>
          </FigureRow>

          <Stagger className="cl-subject-grid" step={0.075}>
            {SUBJECTS.map((subject) => (
              <Reveal as="article" key={subject.id} className={`cl-subject${subject.id === 'S1' ? ' cl-subject--feature' : ''}`} data-cl-subject={subject.id}>
                <div className="cl-card-top">
                  <span className="cl-icon-ring"><ClIcon name={subject.icon} /></span>
                  <span className="cl-subject__index" aria-hidden="true">{subject.number}</span>
                </div>
                <h3>{subject.title}</h3>
                <p>{subject.text}</p>
              </Reveal>
            ))}
          </Stagger>

          <Reveal className="cl-delivery-band" y={22}>
            <div>
              <p className="cl-micro">SHAPED AROUND YOUR WORK</p>
              <h3>What the engagement can contain</h3>
            </div>
            <div>
              <p>The starting expectation is a report and one-to-one sessions with the relevant people. The materials, training format, recipients, duration, support, and cost are agreed for your situation.</p>
              <p>Workshops, weekly meetings, and continuing support can be considered where useful. They are possibilities, not automatic inclusions.</p>
            </div>
          </Reveal>
          <Reveal className="cl-scope-note" y={18}>
            <p>My focus is consultation, planning, and helping people manage AI work—not programming instruction or a standard product-development service.</p>
            <a className="cl-text-link" href="#contact">Discuss your situation <ClIcon name="arrow" /></a>
          </Reveal>
          <Reveal as="p" className="cl-bridge" y={14}><span></span>The aim is useful new capabilities inside a functional workflow.</Reveal>
        </section>

        {/* ── D4 · The person ──────────────────────────────────────── */}
        <ChapterMark n="03" label="PERSONAL, NOT OFF-THE-SHELF" />
        <section id="person" className="cl-section" aria-labelledby="cl-person-title" data-cl-section="D4">
          <FigureRow figure={<FigureStrands />} flip>
            <div className="cl-person">
              <Reveal as="p" className="cl-eyebrow" y={12}><span>03 /</span> PERSONAL, NOT OFF-THE-SHELF</Reveal>
              <KineticHeading id="cl-person-title" level="h2" lines={['The person you', 'would work with.']} />
              <Stagger className="cl-person__strands" step={0.09} delay={0.15}>
                <Reveal as="span" y={12}><ClIcon name="compass" /> Hands-on AI practice</Reveal>
                <Reveal as="span" y={12}><ClIcon name="work" /> Business management</Reveal>
                <Reveal as="span" y={12}><ClIcon name="pin" /> Cambodia</Reveal>
              </Stagger>
              <Reveal as="p" className="cl-person__opening" y={18}>
                I bring hands-on AI practice together with real business-management experience in Cambodia.
              </Reveal>
              <Reveal as="p" y={16} delay={0.08}>
                There is no team behind this. I meet you, work out what the situation actually is, propose a direction, and then do the work myself.
              </Reveal>
              <Stagger step={0.12}>
                <Reveal className="cl-person__detail">
                  <h3>AI practice</h3>
                  <p>My own system, website, and planning artifacts are built with the methods I teach. Operating AI across a large body of my own work is what informs the advice.</p>
                </Reveal>
                <Reveal className="cl-person__detail">
                  <h3>Business management</h3>
                  <p>I have led hotels and restaurants, and I hold a share in a prominent local food business. This sits alongside business consultancy and F&amp;B advisory, because the questions overlap more than people expect.</p>
                </Reveal>
                <Reveal className="cl-person__detail">
                  <h3>Cambodia and language</h3>
                  <p>I have lived in Cambodia for 18 years. I explain the reasoning in English and Khmer myself, rather than passing it through a translator or handing over a manual to follow.</p>
                </Reveal>
              </Stagger>
              <Reveal y={14}>
                <a href="#experience" className="cl-text-link" onClick={() => openReading('experience')}>
                  More about my experience <ClIcon name="arrow" />
                </a>
              </Reveal>
            </div>
          </FigureRow>
        </section>

        {/* ── D5 · The approach ────────────────────────────────────── */}
        <ChapterMark n="04" label="THE APPROACH" />
        <section id="approach" className="cl-section" aria-labelledby="cl-approach-title" data-cl-section="D5">
          <FigureRow figure={<FigureDirection />}>
            <header className="cl-section-heading">
              <Reveal as="p" className="cl-eyebrow" y={12}><span>04 /</span> THE APPROACH</Reveal>
              <KineticHeading id="cl-approach-title" level="h2" lines={['Direct the work.', 'Keep checking it.']} />
              <Reveal as="p" className="cl-section-intro" delay={0.18}>
                Using AI across a larger undertaking takes more than individual prompts. I focus on how the work is directed: its context, stages, tools, handoffs, and review.
              </Reveal>
              <Reveal as="p" className="cl-section-intro" delay={0.26}>
                That means understanding where the technology is useful, where its output needs checking, and how people stay in control.
              </Reveal>
            </header>
          </FigureRow>

          <Reveal className="cl-contrast" y={24}>
            <div>
              <span className="cl-micro">AN ISOLATED REQUEST</span>
              <p>“Help me change this one thing.”</p>
            </div>
            <span className="cl-contrast__arrow" aria-hidden="true"><ClIcon name="arrow" /></span>
            <div>
              <span className="cl-micro">AN OPERATOR’S VIEW</span>
              <p>“What is the wider task, what context is needed, and how will the work be directed and checked?”</p>
            </div>
          </Reveal>
          <Reveal as="p" className="cl-caption" y={10}>Illustrative wording—not a client case or a named method.</Reveal>

          <Reveal className="cl-readings-heading" y={18}>
            <h3>Go a little deeper.</h3>
            <p>Open the subjects that interest you.</p>
          </Reveal>
          <Stagger className="cl-readings" step={0.08}>
            {READINGS.map((reading) => (
              <Reveal as="div" key={reading.id} y={16}>
                <details id={reading.id} className="cl-reading" data-cl-reading={reading.key}>
                  <summary>
                    <span className="cl-reading__number">{reading.number}</span>
                    <span className="cl-reading__label">
                      <strong>{reading.title}</strong>
                      <span>{reading.question}</span>
                    </span>
                    <span className="cl-plus" aria-hidden="true"></span>
                  </summary>
                  <div className="cl-reading__body">
                    <p>{reading.text}</p>
                    <button type="button" className="cl-text-button" onClick={closeReading}>
                      Close this topic <ClIcon name="close" />
                    </button>
                  </div>
                </details>
              </Reveal>
            ))}
          </Stagger>
        </section>

        {/* ── D7 · Engagement ──────────────────────────────────────── */}
        <ChapterMark n="05" label="FROM CONVERSATION TO AGREED WORK" />
        <section id="engagement" className="cl-section" aria-labelledby="cl-engagement-title" data-cl-section="D7">
          <FigureRow figure={<FigureEngagement />} flip>
            <header className="cl-section-heading">
              <Reveal as="p" className="cl-eyebrow" y={12}><span>05 /</span> FROM CONVERSATION TO AGREED WORK</Reveal>
              <KineticHeading id="cl-engagement-title" level="h2" lines={['A conversation first.', 'A tailored engagement after.']} />
              <Reveal as="p" className="cl-section-intro" delay={0.18}>
                The first conversation provides understanding and general direction. Everything beyond it is proposed, confirmed, and agreed before the work begins.
              </Reveal>
            </header>
          </FigureRow>

          <Stagger className="cl-steps" as="ol" step={0.1}>
            {STEPS.map((step) => (
              <Reveal as="li" key={step.number} className="cl-step">
                <span className="cl-step__rail" aria-hidden="true"><i /></span>
                <div className="cl-step__head">
                  <span className="cl-step__number">{step.number}</span>
                  <span className="cl-micro">{step.label}</span>
                  <span className="cl-step__cost">{step.cost}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </Stagger>

          <Reveal className="cl-boundary" y={22}>
            <span className="cl-icon-ring"><ClIcon name="shield" /></span>
            <div>
              <h3>Free discussion. Separately agreed work.</h3>
              <p>The first conversation provides understanding and general direction. The email summary records the discussion; the proposal and quote follow after I have had time to develop the approach.</p>
              <p>Full materials and delivery preparation begin only after the proposal is confirmed and the contract and payment arrangements are sorted.</p>
            </div>
          </Reveal>

          <Stagger className="cl-three-docs" as="dl" step={0.1}>
            <Reveal as="div">
              <dt>Meeting summary</dt>
              <dd>A record of the conversation.</dd>
            </Reveal>
            <Reveal as="div">
              <dt>Proposal and quote</dt>
              <dd>The proposed scope and cost.</dd>
            </Reveal>
            <Reveal as="div">
              <dt>Paid report</dt>
              <dd>An agreed detailed deliverable.</dd>
            </Reveal>
          </Stagger>
        </section>

        {/* ── D9 · Questions ───────────────────────────────────────── */}
        <ChapterMark n="06" label="QUESTIONS PEOPLE ASK" />
        <section id="questions" className="cl-section cl-faq" aria-labelledby="cl-questions-title" data-cl-section="D9">
          <header className="cl-section-heading cl-heading-split">
            <div>
              <Reveal as="p" className="cl-eyebrow" y={12}><span>06 /</span> QUESTIONS PEOPLE ASK</Reveal>
              <KineticHeading id="cl-questions-title" level="h2" lines={['Before we talk.']} />
            </div>
            <Reveal as="p" className="cl-section-intro" delay={0.2}>
              The things worth knowing in advance—so the first conversation can be about your business instead.
            </Reveal>
          </header>

          {QUESTION_GROUPS.map((group) => (
            <div key={group.id} className={`cl-faq__group cl-faq__group--${group.id}`}>
              <Reveal className="cl-faq__label" y={16}>
                <p className="cl-micro">{group.label}</p>
                <p className="cl-faq__note">{group.note}</p>
              </Reveal>
              <Stagger className="cl-faq__items" step={0.07}>
                {group.items.map((item) => (
                  <Reveal as="div" key={item.q} y={14}>
                    <details className="cl-qa">
                      <summary>
                        <span className="cl-qa__q">{item.q}</span>
                        <span className="cl-plus cl-plus--sm" aria-hidden="true"></span>
                      </summary>
                      <p>{item.a}</p>
                    </details>
                  </Reveal>
                ))}
              </Stagger>
            </div>
          ))}

          <Reveal as="p" className="cl-bridge" y={14}><span></span>Anything not answered here is a good place to start the conversation.</Reveal>
        </section>

        {/* ── D8 · Contact ─────────────────────────────────────────── */}
        <ChapterMark n="07" label="LET’S START A CONVERSATION" />
        <section id="contact" className="cl-section cl-contact cl-panel" aria-labelledby="cl-contact-title" data-cl-section="D8">
          <span className="cl-panel__corner cl-panel__corner--tl" aria-hidden="true"></span>
          <span className="cl-panel__corner cl-panel__corner--tr" aria-hidden="true"></span>
          <span className="cl-panel__corner cl-panel__corner--bl" aria-hidden="true"></span>
          <span className="cl-panel__corner cl-panel__corner--br" aria-hidden="true"></span>
          <div className="cl-contact__intro">
            <Reveal as="p" className="cl-eyebrow" y={12}><span>07 /</span> LET’S START A CONVERSATION</Reveal>
            <KineticHeading id="cl-contact-title" level="h2" lines={['Start with one real', 'business situation.']} />
            <Reveal as="p" delay={0.2}>
              Tell me a little about your business and what you would like to do with AI. I will meet with you to understand the situation and discuss possible directions.
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
      </main>
    </div>
  );
}

export default ConsultationContent;
