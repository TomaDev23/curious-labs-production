import React from 'react';
import { Link } from 'react-router-dom';
import {
  SectionShell,
  SectionLabel,
  Reveal,
  Stagger,
  StaggerItem,
  GlassPanel,
  ACCENTS
} from './primitives';
import { useMediaState } from './hooks';
import { motion, useReducedMotion } from '../../FramerProvider';

/**
 * ArticlesSection — "Field Notes": three live pieces surfaced as link cards.
 *
 * Each card is a single link surface (Maestro is a static HTML page outside
 * react-router, so it uses a plain <a>; the two decks are router routes and
 * use <Link>). The Maestro thumbnail is a swappable CSS/SVG placeholder; the
 * two decks use their real first-slide SVGs.
 */

const ARTICLES = [
  {
    id: 'maestro',
    tone: 'violet',
    badge: 'Guide',
    meta: 'The Orchestration Method',
    title: 'The Orchestration Method',
    description:
      'Conduct many agents, converge on truth — the method behind multi-agent orchestration.',
    cta: 'Read',
    href: '/maestro',
    external: true, // static HTML page outside react-router
    placeholder: true // no real thumbnail yet
  },
  {
    id: 'interview',
    tone: 'cyan',
    badge: 'Deck',
    meta: '12 slides',
    title: 'The Interview',
    description: 'A CuriousLabs interview deck — 12 slides, with a copyable transcript.',
    cta: 'Open',
    to: '/interview',
    thumb: '/interview/1.svg',
    thumbAlt: 'First slide of the CuriousLabs interview deck'
  },
  {
    id: 'moonsignal',
    tone: 'teal',
    badge: 'Deck',
    meta: '17 slides',
    title: 'Moon Signal Deck',
    description: 'The Moon Signal presentation — 17 slides, best viewed full-screen.',
    cta: 'Open',
    to: '/moonsignal',
    thumb: '/moonsignal/1.svg',
    thumbAlt: 'First slide of the Moon Signal deck'
  }
];

/**
 * Placeholder thumbnail for Maestro — an abstract "orchestration" motif:
 * a conductor node and converging signal lines, in violet/cyan. Clearly
 * swappable for a real thumbnail (replace this block with an <img>).
 */
const OrchestrationPlaceholder = ({ animate }) => {
  const reduce = useReducedMotion();
  const drift = animate && !reduce;
  return (
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(167,139,250,0.22),transparent_55%),radial-gradient(circle_at_80%_82%,rgba(56,189,248,0.16),transparent_55%)]"
      aria-hidden="true"
      data-placeholder="maestro-thumbnail"
    >
      <svg
        viewBox="0 0 320 180"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="presentation"
      >
        <defs>
          <linearGradient id="maestro-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(167,139,250,0.9)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0.55)" />
          </linearGradient>
        </defs>
        {/* converging signal lines from the agents to the conductor node */}
        <g stroke="url(#maestro-line)" strokeWidth="1" fill="none" opacity="0.7">
          <path d="M40 34 C 110 70, 130 80, 160 90" />
          <path d="M40 90 C 110 90, 130 90, 160 90" />
          <path d="M40 146 C 110 110, 130 100, 160 90" />
          <path d="M280 34 C 210 70, 190 80, 160 90" />
          <path d="M280 90 C 210 90, 190 90, 160 90" />
          <path d="M280 146 C 210 110, 190 100, 160 90" />
        </g>
        {/* agent nodes */}
        <g fill="rgba(226,232,240,0.55)">
          {[
            [40, 34],
            [40, 90],
            [40, 146],
            [280, 34],
            [280, 90],
            [280, 146]
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" />
          ))}
        </g>
        {/* conductor node */}
        <motion.circle
          cx="160"
          cy="90"
          r="9"
          fill="rgba(167,139,250,0.95)"
          {...(drift
            ? {
                animate: { r: [9, 11, 9], opacity: [0.95, 0.7, 0.95] },
                transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              }
            : {})}
        />
        <circle cx="160" cy="90" r="16" fill="none" stroke="rgba(167,139,250,0.45)" strokeWidth="1" />
      </svg>
    </div>
  );
};

const Thumbnail = ({ article, animate }) => {
  const accent = ACCENTS[article.tone] || ACCENTS.violet;
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-curious-dark-950/60">
      {/* faint accent wash behind the slide so each card keeps its identity */}
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{ background: accent.glow }}
        aria-hidden="true"
      />
      {article.placeholder ? (
        <OrchestrationPlaceholder animate={animate} />
      ) : (
        <img
          src={article.thumb}
          alt={article.thumbAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" aria-hidden="true" />
    </div>
  );
};

const CardBody = ({ article, animate }) => {
  const accent = ACCENTS[article.tone] || ACCENTS.violet;
  return (
    <div className="flex h-full flex-col p-4 sm:p-5">
      <Thumbnail article={article} animate={animate} />

      <div className="mt-5 flex items-center gap-3">
        <span
          className={`inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] ${accent.text}`}
        >
          {article.badge}
        </span>
        {article.meta && (
          <span className="font-space text-[11px] uppercase tracking-[0.14em] text-slate-400">
            {article.meta}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-space text-lg font-semibold text-white sm:text-xl">
        {article.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{article.description}</p>

      <div className="mt-5 flex-1" />
      <span
        className={`inline-flex items-center gap-1.5 font-space text-sm font-medium ${accent.text}`}
      >
        {article.cta}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
          &rarr;
        </span>
      </span>
    </div>
  );
};

const ArticleCard = ({ article, animate }) => {
  const accentLabel = `${article.cta} ${article.title}`;
  const focusRing =
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-white/40';

  const sharedClass = `group block h-full min-h-[44px] rounded-xl ${focusRing}`;

  if (article.external) {
    return (
      <a href={article.href} aria-label={accentLabel} className={sharedClass}>
        <GlassPanel className="h-full">
          <CardBody article={article} animate={animate} />
        </GlassPanel>
      </a>
    );
  }

  return (
    <Link to={article.to} aria-label={accentLabel} className={sharedClass}>
      <GlassPanel className="h-full">
        <CardBody article={article} animate={animate} />
      </GlassPanel>
    </Link>
  );
};

const ArticlesSection = () => {
  const { isMobile } = useMediaState();
  // Keep the ambient placeholder pulse cheap on mobile.
  const animate = !isMobile;

  return (
    <SectionShell id="writing" tone="violet" labelledBy="writing-heading">
      <Reveal>
        <SectionLabel tone="violet">Field Notes</SectionLabel>
        <h2
          id="writing-heading"
          className="max-w-2xl font-space text-3xl font-semibold leading-tight text-white sm:text-4xl"
        >
          Writing &amp; live work
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Live pieces and decks — on orchestration, signal, and how the work actually runs.
        </p>
      </Reveal>

      <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article) => (
          <StaggerItem key={article.id} className="h-full">
            <ArticleCard article={article} animate={animate} />
          </StaggerItem>
        ))}
      </Stagger>
    </SectionShell>
  );
};

export default ArticlesSection;
