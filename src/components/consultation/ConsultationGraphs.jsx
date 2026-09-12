import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Modern editorial data-viz for the consultation page.
 * These REPLACE the atmospheric placeholder figure plates. They are real
 * visual components that communicate the concepts in the copy: the three
 * problems, the operator view, the harness, the trust spectrum, and the
 * engagement flow. Clean stroke work, accent colour, scroll-driven narrative
 * motion — not a sci-fi HUD. framer-motion is already a dependency.
 * Everything degrades to a static, fully-visible state under reduced motion.
 */

const EASE = [0.16, 1, 0.3, 1];

/* ── StatTrio · the three problems (D2 / P1–P3) ──────────────────── */
const PROBLEMS = [
  { n: '01', label: 'TRUST', accent: 'var(--cl-cyan)', soft: 'rgba(103,232,249,0.18)',
    title: 'From brute force into a trusted team member.',
    text: 'AI can do remarkable things — but most companies don’t yet know how to rely on it when the work is real.' },
  { n: '02', label: 'COMPLEXITY', accent: 'var(--cl-violet)', soft: 'rgba(167,139,250,0.18)',
    title: 'Without it collapsing under its own weight.',
    text: 'It holds up for small tasks. The moment the work gets complicated, the way most people use it falls apart.' },
  { n: '03', label: 'RELIABILITY', accent: 'var(--cl-amber)', soft: 'rgba(217,191,139,0.18)',
    title: 'From a good idea to a reliable result.',
    text: 'Changing one thing is easy. Directing a whole body of work so it comes out right, every time, is the real problem.' }
];

export function StatTrio() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 40%'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const bars = PROBLEMS.map((_, i) => useTransform(p, [0, 1], [0, 100 - i * 12]));
  return (
    <div className="cl-stat-trio" ref={ref}>
      {PROBLEMS.map((prob, i) => (
        <motion.article
          key={prob.n} className="cl-stat"
          style={{ '--stat-accent': prob.accent, '--stat-soft': prob.soft }}
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
        >
          <div className="cl-stat__head">
            <span className="cl-stat__n">{prob.n}</span>
            <span className="cl-stat__label">{prob.label}</span>
          </div>
          <h3 className="cl-stat__title">{prob.title}</h3>
          <p className="cl-stat__text">{prob.text}</p>
          <div className="cl-stat__bar" aria-hidden="true">
            <motion.span className="cl-stat__bar-fill" style={{ width: reduced ? '78%' : bars[i] }} />
          </div>
        </motion.article>
      ))}
    </div>
  );
}

/* ── OperatorView · the D5 centrepiece ─────────────────────────── */
const DOTS = Array.from({ length: 11 }, (_, i) => i);

export function OperatorView() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 30%'] });
  const prog = useSpring(scrollYProgress, { stiffness: 80, damping: 28, mass: 0.5 });
  const spineLen = useTransform(prog, [0, 0.6], [0, 1]);
  const arrowOp = useTransform(prog, [0.7, 1], [0, 1]);
  const dots = DOTS.map((i) => {
    const scattered = 40 + ((i * 53) % 220);
    return {
      x: 60 + i * 32,
      y: useTransform(prog, [0, 1], [scattered, 130]),
      opacity: useTransform(prog, [0, 0.5, 1], [0.5, 0.8, 1]),
      i
    };
  });
  const checks = [0.3, 0.6, 0.9].map((at) => useTransform(prog, [at - 0.12, at], [0, 1]));
  return (
    <div className="cl-opview" ref={ref}>
      <div className="cl-opview__stage">
        <svg viewBox="0 0 420 260" className="cl-opview__svg" role="presentation" focusable="false">
          <defs>
            <linearGradient id="cl-op-spine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--cl-accent)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="var(--cl-accent)" />
              <stop offset="100%" stopColor="var(--cl-accent)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <motion.path d="M50 130 H 380" fill="none" stroke="url(#cl-op-spine)" strokeWidth="2" strokeLinecap="round" style={{ pathLength: reduced ? 1 : spineLen }} />
          {[0.3, 0.6, 0.9].map((at, i) => (
            <motion.g key={i} style={{ opacity: reduced ? 1 : checks[i] }}>
              <line x1={50 + at * 330} y1="118" x2={50 + at * 330} y2="142" stroke="var(--cl-accent)" strokeWidth="1.4" opacity="0.7" />
              <circle cx={50 + at * 330} cy="130" r="5" fill="#07121a" stroke="var(--cl-accent)" strokeWidth="1.6" />
              <text x={50 + at * 330} y="160" fill="var(--cl-muted)" fontSize="9" fontFamily="ui-monospace, monospace" textAnchor="middle" letterSpacing="1.2">CHECK</text>
            </motion.g>
          ))}
          {dots.map((d) => (
            <motion.circle key={d.i} cx={d.x} cy={reduced ? 130 : d.y} r="3.4" fill={d.i % 3 === 0 ? 'var(--cl-accent)' : '#9fb4bd'} style={{ opacity: reduced ? 0.9 : d.opacity }} />
          ))}
          <motion.path d="M384 130 l-8 -5 v 10 z" fill="var(--cl-accent)" style={{ opacity: reduced ? 1 : arrowOp }} />
        </svg>
        <div className="cl-opview__legend">
          <span className="cl-opview__legend-item"><i className="cl-opview__dot cl-opview__dot--scattered" />Isolated requests</span>
          <span className="cl-opview__legend-arrow">→</span>
          <span className="cl-opview__legend-item"><i className="cl-opview__dot cl-opview__dot--aligned" />A directed, checked flow</span>
        </div>
      </div>
    </div>
  );
}

/* ── HarnessGraph · R1 / the method ─────────────────────────────── */
const HARNESS_NODES = [
  { id: 'context', label: 'CONTEXT', angle: -90 },
  { id: 'stages', label: 'STAGES', angle: -18 },
  { id: 'tools', label: 'TOOLS', angle: 54 },
  { id: 'handoffs', label: 'HANDOFFS', angle: 126 },
  { id: 'checks', label: 'CHECKS', angle: 198 }
];

export function HarnessGraph() {
  const reduced = useReducedMotion();
  const R = 92, cx = 150, cy = 150;
  return (
    <div className="cl-harness">
      <svg viewBox="0 0 300 300" className="cl-harness__svg" role="presentation" focusable="false">
        {HARNESS_NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = cx + R * Math.cos(rad), y = cy + R * Math.sin(rad);
          return (
            <motion.line key={`s${node.id}`} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--cl-accent)" strokeWidth="1" strokeOpacity="0.4"
              initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.08 }} />
          );
        })}
        {HARNESS_NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = cx + R * Math.cos(rad), y = cy + R * Math.sin(rad);
          return (
            <motion.g key={node.id}
              initial={reduced ? false : { opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.4 + i * 0.08 }} style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r="20" fill="#07121a" stroke="var(--cl-accent)" strokeWidth="1.2" />
              <text x={x} y={y + 3.5} fill="var(--cl-text)" fontSize="8" fontFamily="ui-monospace, monospace" textAnchor="middle" letterSpacing="0.6">{node.label}</text>
            </motion.g>
          );
        })}
        <motion.g
          initial={reduced ? false : { opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.6, ease: EASE }} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r="30" fill="var(--cl-accent)" fillOpacity="0.12" stroke="var(--cl-accent)" strokeWidth="1.6" />
          <circle cx={cx} cy={cy} r="4" fill="var(--cl-cream)" />
          <text x={cx} y={cy + 50} fill="var(--cl-cream)" fontSize="10" fontFamily="ui-monospace, monospace" textAnchor="middle" letterSpacing="1.4">THE WORK</text>
        </motion.g>
      </svg>
    </div>
  );
}

/* ── TrustSpectrum · R3 / the technology ────────────────────────── */
export function TrustSpectrum() {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const fillW = useTransform(p, [0, 1], ['0%', '100%']);
  const markerLeft = useTransform(p, [0, 1], [8, 92]);
  return (
    <div className="cl-trust" ref={ref}>
      <div className="cl-trust__bar" aria-hidden="true">
        <motion.span className="cl-trust__fill" style={{ width: reduced ? '100%' : fillW }} />
      </div>
      <div className="cl-trust__axis">
        <span className="cl-trust__end cl-trust__end--trust">Trust where appropriate</span>
        <span className="cl-trust__end cl-trust__end--check">Check where it matters</span>
      </div>
      <motion.div className="cl-trust__marker" style={{ left: reduced ? '62%' : markerLeft }}>
        <span className="cl-trust__marker-line" />
        <span className="cl-trust__marker-label">the operator’s line</span>
      </motion.div>
    </div>
  );
}

/* ── FlowGraph · D7 / engagement ───────────────────────────────── */
const FLOW_STEPS = [
  { n: '01', label: 'DISCUSS', title: 'A free conversation', text: 'We talk through your situation and the directions worth taking.', cost: 'FREE', doc: null },
  { n: '02', label: 'PROPOSE', title: 'A considered proposal', text: 'An email straight after to confirm what we discussed — then a few days to come back with a scoped proposal and quote.', cost: 'NO COMMITMENT', doc: 'Meeting summary' },
  { n: '03', label: 'AGREE', title: 'Clear arrangements', text: 'You confirm the proposal; we settle the contract and payment, and it’s booked.', cost: 'AGREED TERMS', doc: 'Proposal & quote' },
  { n: '04', label: 'DELIVER', title: 'Preparation & delivery', text: 'I prepare the materials and timeframe, then deliver the report, sessions, and any agreed support.', cost: 'AGREED SCOPE', doc: 'Paid report' }
];

export function FlowGraph() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 30%'] });
  const prog = useSpring(scrollYProgress, { stiffness: 80, damping: 28, mass: 0.5 });
  const railLen = useTransform(prog, [0, 1], [0, 1]);
  const nodeOps = FLOW_STEPS.map((_, i) => {
    const at = i / (FLOW_STEPS.length - 1);
    return useTransform(prog, [Math.max(0, at - 0.15), at], [0, 1]);
  });
  return (
    <div className="cl-flow" ref={ref}>
      <div className="cl-flow__rail" aria-hidden="true"><motion.span className="cl-flow__rail-fill" style={{ scaleX: reduced ? 1 : railLen }} /></div>
      <ol className="cl-flow__steps">
        {FLOW_STEPS.map((step, i) => (
            <motion.li key={step.n} className="cl-flow__step"
              initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}>
              <motion.span className="cl-flow__node" style={{ opacity: reduced ? 1 : nodeOps[i] }}>{step.n}</motion.span>
              <div className="cl-flow__body">
                <span className="cl-flow__label">{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="cl-flow__cost">{step.cost}</span>
                {step.doc && (
                  <motion.span className="cl-flow__doc"
                    initial={reduced ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.05 }}>
                    <i className="cl-flow__doc-icon" />{step.doc}
                  </motion.span>
                )}
              </div>
            </motion.li>
          ))}
      </ol>
    </div>
  );
}

