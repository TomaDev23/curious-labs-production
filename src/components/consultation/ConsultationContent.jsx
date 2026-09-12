import React from 'react';
import ConsultationIcons, { ClIcon } from './ConsultationIcons';
import ConsultationOrbit from './ConsultationOrbit';
import { StatTrio, OperatorView, HarnessGraph, TrustSpectrum, FlowGraph } from './ConsultationGraphs';
import { Reveal, Stagger, KineticHeading, ScrollRail } from './ConsultationMotion';
import useConsultationPage, { openReading, closeReading } from './useConsultationPage';

/* Three consolidated themes (T1–T3). Source subjects folded in:
   T1 ← S1 · T2 ← S2/S3/S4 (the core) · T3 ← S5/S6. These are areas the
   work draws from, never a menu to buy from. */
const SUBJECTS = [
  {
    id: 'S1',
    icon: 'search',
    number: '01',
    title: 'Find where AI is actually worth it.',
    text: 'Not every problem needs AI. I help you see where it genuinely earns its place in your business — and where it doesn’t.'
  },
  {
    id: 'S2',
    icon: 'layers',
    number: '02',
    title: 'Build the harness and the methods.',
    text: 'The setup that keeps AI dependable — the harness, the checks, the way of working — so it holds up when the work gets real, instead of collapsing under its own weight.'
  },
  {
    id: 'S3',
    icon: 'people',
    number: '03',
    title: 'Plan it, and train your people.',
    text: 'Plan the systems properly and teach the people who’ll use them, so what we put in place takes hold and keeps working — in English or Khmer.'
  }
];

const READINGS = [
  {
    id: 'method',
    key: 'R1',
    number: '01',
    title: 'About the method',
    question: 'How is the work organized, directed, and reviewed?',
    text: 'A prompt is only one part of how AI work is organized. The harness around it — context, stages, tools, handoffs, checks — is where the direction actually happens. I help you think about how the work is steered and how results are reviewed, instead of treating each output as a finished answer.'
  },
  {
    id: 'concept',
    key: 'R2',
    number: '02',
    title: 'About the concept',
    question: 'What changes when you operate AI across a larger undertaking?',
    text: 'The shift is from asking AI for isolated changes to directing it across a whole body of work. The operator’s view stays above the single request: what’s being attempted, how the pieces relate, and where direction and checking are needed. It isn’t just a bigger prompt.'
  },
  {
    id: 'technology',
    key: 'R3',
    number: '03',
    title: 'About the technology',
    question: 'Where can the capabilities help, and where should you not simply trust the output?',
    text: 'This is about the capabilities and their limits: where AI helps, where trust is warranted, and why checking matters. The focus is using and managing the technology in the work at hand — not tool rankings, not guarantees, not a how-to-code lesson.'
  },
  {
    id: 'experience',
    key: 'R4',
    number: '04',
    title: 'About the experience',
    question: 'How do business experience and AI practice connect?',
    text: 'Running businesses and operating AI point at the same question: how do you connect the technology to the work a company actually has to do? This draws on my own projects, a hospitality and food-and-beverage background, and years living and working in Cambodia.'
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
 * Editorial two-column row kept for reference; the modern pass moves the
 * figure plates out in favour of the graph components, so this helper is
 * retained but currently unused.
 */
function FigureRow({ figure, flip = false, children, className = '' }) {
  return (
    <div className={`cl-figure-row${flip ? ' cl-figure-row--flip' : ''} ${className}`.trim()}>
      <div className="cl-figure-row__copy">{children}</div>
      <div className="cl-figure-row__art">{figure}</div>
    </div>
  );
}
void FigureRow;

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
          <span className="cl-hero__vmeta" aria-hidden="true">STRATEGY · MANAGEMENT · AI</span>
          <div className="cl-hero__copy">
            <Reveal as="p" className="cl-eyebrow" y={12}><span>//</span> BUSINESS CONSULTATION IN THE AGE OF AI</Reveal>
            <KineticHeading
              id="cl-page-title"
              level="h1"
              lines={['Business consultation,', 'in the age of AI.']}
            />
            <Reveal as="p" className="cl-lead" delay={0.25}>
              I’m a business advisor who now operates AI hands-on, every day. If you’re trying to bring AI into your business — whether you’ve already started or don’t know where to begin — I help you work out what you actually need, and turn it into something you can act on. Business consultancy first, with a real AI focus on top.
            </Reveal>
            <Reveal as="p" className="cl-hero__invitation" delay={0.33}>
              Bring one real situation from your business. The first conversation is free.
            </Reveal>
            <Reveal className="cl-actions" delay={0.41}>
              <a className="cl-button cl-button--primary" href="#contact">
                Start a free conversation <ClIcon name="arrow" />
              </a>
              <a className="cl-button cl-button--secondary" href="#approach">
                See how it works <ClIcon name="diagonal" />
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
            <span className="cl-hero__meta-label">CURIOUSLABS // BUSINESS CONSULTATION · AI</span>
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
              <KineticHeading id="cl-audiences-title" level="h2" lines={['Two kinds of company.', 'Two ways in.']} />
            </div>
            <Reveal as="p" className="cl-section-intro" delay={0.2}>
              The focus is the same — getting genuine value from AI.<br />Where we begin depends on what kind of company you are.
            </Reveal>
          </header>

          <Stagger className="cl-audiences" step={0.12}>
            <Reveal as="article" className="cl-audience-card">
              <div className="cl-card-top">
                <span className="cl-icon-ring"><ClIcon name="code" /></span>
                <span className="cl-micro">INTEGRATING AI AT SCALE</span>
              </div>
              <h3>Technical companies</h3>
              <p>You already build tech products, and you want AI integrated into how the team works — but doing that at scale is a problem of its own. I help with the coordination and the harnessing rules that stop the AI sabotaging itself as you hand more of the work to it.</p>
              <p className="cl-card-foot">Business advisory. Not programming instruction.</p>
            </Reveal>
            <Reveal as="article" className="cl-audience-card cl-audience-card--biz">
              <div className="cl-card-top">
                <span className="cl-icon-ring"><ClIcon name="work" /></span>
                <span className="cl-micro">LEVERAGING AI</span>
              </div>
              <h3>Companies new to AI</h3>
              <p>You want to leverage AI but you’re not technical. I help you see where it genuinely helps — the real use cases — and design the harness that fits how your business actually works. Settings like hotels, restaurants, and factories are where I’ve done it.</p>
              <p className="cl-card-foot">Business consultation. No code required.</p>
            </Reveal>
          </Stagger>

          <Reveal as="p" className="cl-recognition__intro" y={14}>Whichever side you’re on, using AI well runs into the same three walls.</Reveal>
          <StatTrio />

          <Reveal as="p" className="cl-bridge" y={14}><span></span>It starts with your situation. We shape the work around it.</Reveal>
        </section>

        {/* ── D3 · Contribution ────────────────────────────────────── */}
        <ChapterMark n="02" label="WHAT I ACTUALLY DO" />
        <section id="contribution" className="cl-section" aria-labelledby="cl-contribution-title" data-cl-section="D3">
          <header className="cl-section-heading">
            <Reveal as="p" className="cl-eyebrow" y={12}><span>02 /</span> WHAT I ACTUALLY DO</Reveal>
            <KineticHeading
              id="cl-contribution-title"
              level="h2"
              lines={['Bring me the problem.', 'Leave with real clarity.']}
            />
            <Reveal as="p" className="cl-section-intro" delay={0.2}>
              This isn’t technical work — it’s business consultancy, from someone who operates AI hands-on every day. I sit down with you, work out what you actually need — whether you’re already using AI or just want to start — and give it back as clarity: solutions and ideas you can turn into a strategy of your own.
            </Reveal>
          </header>

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
              <h3>What an engagement can hold</h3>
            </div>
            <div>
              <p>At its core, a report and one-to-one sessions with the people it’s for. Everything around that — the materials, the format, who’s trained, how long it runs, what support follows — is set for your situation.</p>
              <p>Workshops, weekly meetings, ongoing support: all possible where they earn their place. None of them automatic.</p>
            </div>
          </Reveal>
          <Reveal className="cl-scope-note" y={18}>
            <p>This is business advisory, not engineering. I help you understand, decide, and plan — I don’t write your code or build your product.</p>
            <a className="cl-text-link" href="#contact">Discuss your situation <ClIcon name="arrow" /></a>
          </Reveal>
          <Reveal as="p" className="cl-bridge" y={14}><span></span>The aim is simple: new capability that actually lands inside a working business.</Reveal>
        </section>

        {/* ── D4 · The person ──────────────────────────────────────── */}
        <ChapterMark n="03" label="PERSONAL, NOT OFF-THE-SHELF" />
        <section id="person" className="cl-section" aria-labelledby="cl-person-title" data-cl-section="D4">
          <div className="cl-person">
              <Reveal as="p" className="cl-eyebrow" y={12}><span>03 /</span> PERSONAL, NOT OFF-THE-SHELF</Reveal>
              <KineticHeading id="cl-person-title" level="h2" lines={['The person you', 'would work with.']} />
              <Stagger className="cl-person__strands" step={0.09} delay={0.15}>
                <Reveal as="span" y={12}><ClIcon name="work" /> Business advisory</Reveal>
                <Reveal as="span" y={12}><ClIcon name="compass" /> Hands-on AI practice</Reveal>
                <Reveal as="span" y={12}><ClIcon name="pin" /> This market</Reveal>
              </Stagger>
              <Reveal as="p" className="cl-person__opening" y={18}>
                I’m a business advisor first — eighteen years in the Khmer market, and hands-on with AI every day. I sit where the two meet, which is exactly where a lot of businesses now find themselves.
              </Reveal>
              <Reveal as="p" y={16} delay={0.08}>
                There’s no team behind this. I meet you, work out what’s really going on, propose a direction, and do the work myself.
              </Reveal>
              <Stagger step={0.12}>
                <Reveal className="cl-person__detail">
                  <h3>AI practice</h3>
                  <p>My own system, website, and planning artifacts are built with the methods I use with clients. I don’t advise on AI from the outside — I operate it across a large body of my own work.</p>
                </Reveal>
                <Reveal className="cl-person__detail">
                  <h3>Business, and this market</h3>
                  <p>Eighteen years in the Khmer market — food and beverage, real estate, hotels and restaurants I’ve helped lead, and a share in a well-known local food business. I know how these places actually run, and I know this market. That’s the part generic AI advice can’t fake.</p>
                </Reveal>
                <Reveal className="cl-person__detail">
                  <h3>Cambodia and language</h3>
                  <p>English and Khmer, in my own words — not through a translator who strips out the nuance, and not by handing over a manual to follow. I teach the reasoning, so your team can actually use it.</p>
                </Reveal>
              </Stagger>
              <Reveal as="p" y={14}>
                One package: business consultancy and advisory, with a real AI focus on top — from someone who has actually done both sides.
              </Reveal>
              <Reveal y={14}>
                <a href="#experience" className="cl-text-link" onClick={() => openReading('experience')}>
                  More about my experience <ClIcon name="arrow" />
                </a>
              </Reveal>
          </div>
        </section>

        {/* ── D5 · The approach ────────────────────────────────────── */}
        <ChapterMark n="04" label="THE APPROACH" />
        <section id="approach" className="cl-section" aria-labelledby="cl-approach-title" data-cl-section="D5">
          <header className="cl-section-heading">
            <Reveal as="p" className="cl-eyebrow" y={12}><span>04 /</span> THE APPROACH</Reveal>
            <KineticHeading id="cl-approach-title" level="h2" lines={['Direct the work.', 'Keep checking it.']} />
            <Reveal as="p" className="cl-section-intro" delay={0.18}>
              Bringing AI into a business only works if the AI itself is dependable. This is how I make it dependable: I operate it the way you’d run a good team — clear direction, the right context, and checking where it matters — instead of trusting a single prompt to get it right.
            </Reveal>
            <Reveal as="p" className="cl-section-intro" delay={0.26}>
              That’s the difference between asking AI for one thing and running a whole body of work through it — knowing where to trust the output, and where to check it.
            </Reveal>
          </header>

          <Reveal className="cl-opview-wrap" y={20}>
            <OperatorView />
          </Reveal>

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
                    {reading.key === 'R1' && (
                      <div className="cl-reading__graph"><HarnessGraph /></div>
                    )}
                    {reading.key === 'R3' && (
                      <div className="cl-reading__graph"><TrustSpectrum /></div>
                    )}
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
          <header className="cl-section-heading">
            <Reveal as="p" className="cl-eyebrow" y={12}><span>05 /</span> FROM CONVERSATION TO AGREED WORK</Reveal>
            <KineticHeading id="cl-engagement-title" level="h2" lines={['A conversation first.', 'A tailored engagement after.']} />
            <Reveal as="p" className="cl-section-intro" delay={0.18}>
              The first conversation gives you understanding and a direction, free. Everything past it is proposed, confirmed, and agreed before any work starts.
            </Reveal>
          </header>

          <FlowGraph />

          <Reveal className="cl-boundary" y={22}>
            <span className="cl-icon-ring"><ClIcon name="shield" /></span>
            <div>
              <h3>Free discussion. Separately agreed work.</h3>
              <p>The first conversation gives you understanding and a direction. The email summary records what we discussed; the proposal and quote follow once I’ve had time to develop the approach.</p>
              <p>Materials and delivery only begin after the proposal is confirmed and the arrangements are settled.</p>
            </div>
          </Reveal>
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
      </main>
    </div>
  );
}

export default ConsultationContent;
