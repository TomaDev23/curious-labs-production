import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Editorial figures for the consultation page.
 *
 * These are ATMOSPHERIC, not evidence and not method diagrams. They exist to
 * break the page's vertical rhythm and give each editorial row a visual side.
 * Nothing here is labelled as a named method, a client artifact, or a measured
 * result — see Docs_v8/page_Consultation/CONTENT_MAP.md.
 *
 * Strokes draw themselves in as the plate enters the viewport, and collapse to
 * a plain static drawing under `prefers-reduced-motion`.
 */

const W = 440;
const H = 340;
const EASE = [0.16, 1, 0.3, 1];

/** A stroke that draws itself once, in view. */
function Draw({ d, delay = 0, duration = 1.15, ...rest }) {
  const reduced = useReducedMotion();
  if (reduced) return <path d={d} {...rest} />;
  return (
    <motion.path
      d={d}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ pathLength: { duration, ease: EASE, delay }, opacity: { duration: 0.3, delay } }}
      {...rest}
    />
  );
}

/** A circle that pops in. */
function Pop({ delay = 0, ...rest }) {
  const reduced = useReducedMotion();
  if (reduced) return <circle {...rest} />;
  return (
    <motion.circle
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{ transformOrigin: `${rest.cx}px ${rest.cy}px` }}
      {...rest}
    />
  );
}

function Fade({ children, delay = 0 }) {
  const reduced = useReducedMotion();
  if (reduced) return <g>{children}</g>;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.g>
  );
}

function Field({ id }) {
  return (
    <>
      <defs>
        <pattern id={`${id}-dots`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#2b414c" opacity=".5" />
        </pattern>
        <radialGradient id={`${id}-glow`} cx="50%" cy="46%" r="60%">
          <stop offset="0%" stopColor="#1d4a5c" stopOpacity=".42" />
          <stop offset="100%" stopColor="#040d12" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-lime`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c6f75b" stopOpacity=".25" />
          <stop offset="50%" stopColor="#c6f75b" />
          <stop offset="100%" stopColor="#c6f75b" stopOpacity=".3" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-glow)`} />
      <rect width={W} height={H} fill={`url(#${id}-dots)`} opacity=".55" />
    </>
  );
}

function Frame({ children, label }) {
  return (
    <div className="cl-figure" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} role="presentation" focusable="false">
        {children}
      </svg>
      {label ? <span className="cl-figure__tag">{label}</span> : null}
    </div>
  );
}

const mono = { fontFamily: 'ui-monospace, monospace', fill: '#96aab7' };

/* ── D2 · two audiences, one shared need ─────────────────────────────── */
export function FigureAudiences() {
  const id = 'clf-aud';
  return (
    <Frame label="DIFFERENT WORK · SHARED NEED">
      <Field id={id} />
      {/* Two circles of r=78 centred 88px apart, so they actually read as a
          Venn: left-only, right-only, and a shared lens at x=220. */}
      <Draw d="M176 92a78 78 0 1 0 0 156 78 78 0 1 0 0-156" fill="none" stroke="#c6f75b" strokeWidth="1.3" opacity=".55" duration={1.3} />
      <Draw d="M264 92a78 78 0 1 1 0 156 78 78 0 1 1 0-156" fill="none" stroke="#afd4df" strokeWidth="1.3" opacity=".55" duration={1.3} delay={0.15} />
      <Fade delay={0.9}>
        <path
          d="M220 105.6A78 78 0 0 0 220 234.4A78 78 0 0 0 220 105.6Z"
          fill="#c6f75b"
          opacity=".13"
          stroke="#c6f75b"
          strokeWidth="1"
          strokeOpacity=".5"
        />
      </Fade>
      <Pop cx="220" cy="170" r="4.5" fill="#f4efdc" delay={1.05} />
      <Fade delay={1.1}>
        <g fill="#2b414c">
          {[[126, 140], [142, 188], [118, 206], [156, 216], [110, 168], [150, 124]].map(([x, y], i) => (
            <circle key={`a${i}`} cx={x} cy={y} r="2.8" />
          ))}
          {[[314, 140], [298, 188], [322, 206], [284, 216], [330, 168], [290, 124]].map(([x, y], i) => (
            <circle key={`b${i}`} cx={x} cy={y} r="2.8" />
          ))}
        </g>
        <text x="140" y="286" {...mono} fontSize="10" textAnchor="middle" letterSpacing="1.3">TECHNICAL</text>
        <text x="300" y="286" {...mono} fontSize="10" textAnchor="middle" letterSpacing="1.3">NON-CODING</text>
        <text x="220" y="72" fill="#f4efdc" fontFamily="ui-monospace, monospace" fontSize="10.5" textAnchor="middle" letterSpacing="1.6" opacity=".92">
          DIRECTION
        </text>
      </Fade>
    </Frame>
  );
}

/* ── D3 · many subjects, one situation ───────────────────────────────── */
export function FigureSubjects() {
  const id = 'clf-sub';
  const nodes = [
    { x: 220, y: 66, r: 7.5, lit: true },
    { x: 353, y: 124, r: 5.5, lit: false },
    { x: 353, y: 216, r: 7, lit: true },
    { x: 220, y: 274, r: 5, lit: false },
    { x: 87, y: 216, r: 7, lit: true },
    { x: 87, y: 124, r: 5.5, lit: false }
  ];
  return (
    <Frame label="SUBJECTS DRAWN FROM · NOT A MENU">
      <Field id={id} />
      <Draw d="M220 66a104 104 0 1 1 -.1 0" fill="none" stroke="#2b414c" strokeWidth="1" duration={1.4} />
      <Fade delay={0.5}>
        <circle cx="220" cy="170" r="64" fill="none" stroke="#2b414c" strokeWidth="1" opacity=".55" strokeDasharray="3 6" />
        <circle cx="220" cy="170" r="142" fill="none" stroke="#2b414c" strokeWidth="1" opacity=".3" strokeDasharray="2 10" />
      </Fade>
      {nodes.map((n, i) => (
        <Draw
          key={`l${i}`}
          d={`M220 170L${n.x} ${n.y}`}
          stroke={n.lit ? '#c6f75b' : '#2b414c'}
          strokeWidth={n.lit ? 1.2 : 1}
          opacity={n.lit ? 0.55 : 0.7}
          strokeDasharray={n.lit ? '' : '3 5'}
          fill="none"
          delay={0.55 + i * 0.07}
          duration={0.6}
        />
      ))}
      {nodes.map((n, i) => (
        <Pop
          key={`n${i}`}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.lit ? '#c6f75b' : '#081720'}
          stroke={n.lit ? '#c6f75b' : '#466975'}
          strokeWidth="1.2"
          opacity={n.lit ? 0.94 : 1}
          delay={0.8 + i * 0.07}
        />
      ))}
      <Fade delay={1.25}>
        <circle cx="220" cy="170" r="23" fill="#04121a" stroke="#afd4df" strokeWidth="1.2" />
        <circle cx="220" cy="170" r="4.5" fill="#f4efdc" />
        <g fill="none" stroke="#afd4df" strokeWidth="1" opacity=".7">
          <path d="M220 139v-9M220 201v9M189 170h-9M251 170h9" />
        </g>
        <text x="220" y="322" {...mono} fontSize="9.5" textAnchor="middle" letterSpacing="1.5" opacity=".85">
          YOUR SITUATION AT THE CENTRE
        </text>
      </Fade>
    </Frame>
  );
}

/* ── D4 · three strands into one line of work ────────────────────────── */
export function FigureStrands() {
  const id = 'clf-str';
  const strands = [
    { d: 'M46 92C150 92 156 170 262 170L404 170', c: '#c6f75b', label: 'AI PRACTICE' },
    { d: 'M46 170C156 170 156 170 262 170L404 170', c: '#afd4df', label: 'BUSINESS' },
    { d: 'M46 248C150 248 156 170 262 170L404 170', c: '#d9bf8b', label: 'CAMBODIA' }
  ];
  return (
    <Frame label="THREE STRANDS · ONE CONVERSATION">
      <Field id={id} />
      {strands.map((s, i) => (
        <Draw key={i} d={s.d} fill="none" stroke={s.c} strokeWidth="1.4" opacity=".82" strokeLinecap="round" delay={i * 0.12} duration={1.2} />
      ))}
      {[92, 170, 248].map((y, i) => (
        <g key={i}>
          <Pop cx="46" cy={y} r="6" fill="#04121a" stroke={strands[i].c} strokeWidth="1.4" delay={0.15 + i * 0.12} />
          <Pop cx="46" cy={y} r="2.2" fill={strands[i].c} delay={0.2 + i * 0.12} />
        </g>
      ))}
      <Fade delay={1.15}>
        <path d="M262 58v224" fill="none" stroke="#2b414c" strokeWidth="1" strokeDasharray="3 6" opacity=".7" />
        <circle cx="262" cy="170" r="14" fill="#04121a" stroke="#f4efdc" strokeWidth="1.2" opacity=".92" />
        <circle cx="262" cy="170" r="3.5" fill="#f4efdc" />
        <path d="M382 162l10 8-10 8" fill="none" stroke="#f4efdc" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity=".88" />
        {strands.map((s, i) => (
          <text key={s.label} x="46" y={[74, 152, 230][i]} {...mono} fontSize="9" letterSpacing="1.3" opacity=".9" fill={s.c}>
            {s.label}
          </text>
        ))}
      </Fade>
    </Frame>
  );
}

/* ── D5 · directed work with review points ───────────────────────────── */
export function FigureDirection() {
  const id = 'clf-dir';
  const stages = [78, 148, 218, 288, 358];
  const scatter = [
    [102, 76], [144, 58], [186, 84], [222, 62], [260, 88], [300, 66], [338, 80], [122, 98], [276, 54], [360, 62], [166, 100]
  ];
  return (
    <Frame label="DIRECTED · CHECKED · DIRECTED AGAIN">
      <Field id={id} />
      <Fade>
        <text x="42" y="40" {...mono} fontSize="9.5" letterSpacing="1.5" opacity=".8">ISOLATED REQUESTS</text>
        <g fill="#2b414c">
          {scatter.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" />)}
        </g>
      </Fade>

      <Fade delay={0.35}>
        <path d="M42 192h356" stroke="#2b414c" strokeWidth="1" fill="none" />
      </Fade>
      <Draw d="M42 192h316" stroke={`url(#${id}-lime)`} strokeWidth="1.8" fill="none" strokeLinecap="round" delay={0.45} duration={1.2} />
      {stages.map((x, i) => (
        <g key={i}>
          <Fade delay={0.6 + i * 0.1}>
            <line x1={x} y1="181" x2={x} y2="203" stroke="#466975" strokeWidth="1" />
          </Fade>
          <Pop
            cx={x}
            cy="192"
            r={i === 4 ? 4 : 6}
            fill={i === 4 ? '#081720' : '#04121a'}
            stroke={i === 4 ? '#466975' : '#c6f75b'}
            strokeWidth="1.3"
            delay={0.65 + i * 0.1}
          />
        </g>
      ))}

      {[113, 183, 253].map((x, i) => (
        <g key={i}>
          <Fade delay={1.05 + i * 0.1}>
            <path d={`M${x} 192v24`} stroke="#2b414c" strokeWidth="1" strokeDasharray="2 4" fill="none" />
          </Fade>
          <Draw
            d={`M${x - 5} 224l4 4 7-8`}
            fill="none"
            stroke="#afd4df"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            delay={1.15 + i * 0.1}
            duration={0.4}
          />
        </g>
      ))}
      <Fade delay={1.5}>
        <text x="42" y="278" {...mono} fontSize="9.5" letterSpacing="1.5" opacity=".8">REVIEW POINTS</text>
      </Fade>
      <Draw
        d="M288 203c0 36-74 44-116 25"
        fill="none"
        stroke="#afd4df"
        strokeWidth="1.1"
        strokeDasharray="4 5"
        opacity=".62"
        delay={1.55}
        duration={0.9}
      />
      <Fade delay={2.3}>
        <path d="M180 222l-9 6 10 5" fill="none" stroke="#afd4df" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" opacity=".62" />
      </Fade>
    </Frame>
  );
}

/* ── D7 · free conversation, then agreed work ────────────────────────── */
export function FigureEngagement() {
  const id = 'clf-eng';
  const cols = [
    { x: 82, h: 46, lit: false },
    { x: 172, h: 84, lit: true },
    { x: 262, h: 124, lit: true },
    { x: 352, h: 170, lit: true }
  ];
  const reduced = useReducedMotion();
  return (
    <Frame label="FREE CONVERSATION · THEN AGREED WORK">
      <Field id={id} />
      <Fade>
        <path d="M126 46v240" stroke="#c6f75b" strokeWidth="1" strokeDasharray="4 6" opacity=".6" fill="none" />
        <text x="42" y="38" fill="#c6f75b" fontFamily="ui-monospace, monospace" fontSize="9.5" letterSpacing="1.4" opacity=".9">FREE</text>
        <text x="140" y="38" {...mono} fontSize="9.5" letterSpacing="1.4" opacity=".85">PROPOSED · AGREED · DELIVERED</text>
        <path d="M42 266h356" stroke="#2b414c" strokeWidth="1" fill="none" />
      </Fade>
      {cols.map((c, i) => {
        const y = 266 - c.h;
        const common = {
          x: c.x - 18,
          width: 36,
          rx: 3,
          fill: c.lit ? '#0d1f14' : '#081720',
          stroke: c.lit ? '#c6f75b' : '#466975',
          strokeWidth: 1.2
        };
        return (
          <g key={i}>
            {reduced ? (
              <rect y={y} height={c.h} {...common} />
            ) : (
              <motion.rect
                initial={{ height: 0, y: 266 }}
                whileInView={{ height: c.h, y }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.2 + i * 0.12 }}
                {...common}
              />
            )}
            <Fade delay={0.85 + i * 0.12}>
              <rect x={c.x - 18} y={y} width="36" height="3" fill={c.lit ? '#c6f75b' : '#466975'} opacity={c.lit ? 0.9 : 0.6} />
              <text x={c.x} y="286" {...mono} fontSize="10" textAnchor="middle" letterSpacing=".9">{`0${i + 1}`}</text>
            </Fade>
          </g>
        );
      })}
      <Draw d="M100 212c24 0 30-28 54-28M190 172c24 0 30-28 54-28M280 132c24 0 30-28 54-28" fill="none" stroke="#afd4df" strokeWidth="1" opacity=".48" delay={1.1} duration={0.9} />
    </Frame>
  );
}
