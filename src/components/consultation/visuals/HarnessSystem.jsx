import React, { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { ClIcon } from '../ConsultationIcons';

const CORE = { avif: '/consultation/art-12-harness-core.avif', webp: '/consultation/art-12-harness-core.webp' };

// Stage geometry in a 460 × 500 space; nodes sit on a pentagon around the core.
const W = 460;
const H = 500;
const CX = 230;
const CY = 238;
const R = 176;
const ICONS = ['layers', 'stages', 'tool', 'handoff', 'shield'];
const ANGLES = [-90, -18, 54, 126, 198];

const NODES = ANGLES.map((deg, i) => {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad), icon: ICONS[i] };
});

/**
 * SC-04 centrepiece (MOCK-D2): the harness as a system — glowing core
 * (art-12, screen-blended so its black disappears), orbit rings, and five
 * nodes (Context, Stages, Tools, Handoffs, Checks) that light in sequence
 * when the visual enters the view. The node labels are real text in a list;
 * rings and connectors are decorative. Reduced motion: lit from the start.
 */
function HarnessSystem({ nodes, formula, className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const lit = reduced || inView;

  return (
    <div ref={ref} className={`hx ${lit ? 'hx--lit' : ''} ${className}`.trim()}>
      <div className="hx__stage" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg className="hx__rings" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
          <circle className="hx__ring hx__ring--outer" cx={CX} cy={CY} r={R + 30} />
          <circle className="hx__ring hx__ring--path" cx={CX} cy={CY} r={R} />
          <ellipse className="hx__ring hx__ring--orbit" cx={CX} cy={CY} rx={R + 22} ry={62} transform={`rotate(-16 ${CX} ${CY})`} />
          <ellipse className="hx__ring hx__ring--orbit2" cx={CX} cy={CY} rx={120} ry={R - 20} transform={`rotate(24 ${CX} ${CY})`} />
          {NODES.map((n, i) => (
            <line
              key={n.icon}
              className="hx__link"
              style={{ transitionDelay: `${0.2 + i * 0.18}s` }}
              x1={n.x}
              y1={n.y}
              x2={CX + (n.x - CX) * 0.52}
              y2={CY + (n.y - CY) * 0.52}
            />
          ))}
          <g className="hx__sweep" style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <circle cx={CX} cy={CY - R} r="3.5" className="hx__sweep-dot" />
          </g>
        </svg>

        <picture className="hx__core" aria-hidden="true">
          <source type="image/avif" srcSet={CORE.avif} />
          <img src={CORE.webp} width="900" height="900" alt="" loading="lazy" decoding="async" />
        </picture>

        <ul className="hx__nodes">
          {nodes.map((node, i) => (
            <li
              key={node.label}
              className={`hx__node hx__node--${i + 1}`}
              style={{
                left: `${(NODES[i].x / W) * 100}%`,
                top: `${(NODES[i].y / H) * 100}%`,
                transitionDelay: `${0.15 + i * 0.18}s`
              }}
            >
              <span className="hx__icon" aria-hidden="true"><ClIcon name={NODES[i].icon} /></span>
              <span className="hx__label">{node.label}</span>
              <span className="hx__sub">{node.sub}</span>
            </li>
          ))}
        </ul>
      </div>

      {formula && (
        <p className="hx__formula">
          <span className="k-sr-only">{`${formula.slice(0, -1).join(' times ')} equals ${formula[formula.length - 1]}`}</span>
          {formula.map((word, i) => (
            <React.Fragment key={word}>
              {i > 0 && <span className="hx__op" aria-hidden="true">{i === formula.length - 1 ? '=' : '×'}</span>}
              <span aria-hidden="true">{word}</span>
            </React.Fragment>
          ))}
        </p>
      )}
    </div>
  );
}

export default HarnessSystem;
