import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { IconRing } from '../kit';

function OperatorPath({ steps }) {
  const reduced = useReducedMotion();
  const lineAnimation = reduced
    ? { initial: false }
    : {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 1.1, ease: 'easeOut' }
      };

  return (
    <div className="b-operator-path">
      <svg className="b-operator-path__line" viewBox="0 0 1200 230" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="b-operator-gradient" x1="0" x2="1">
            <stop offset="0" stopColor="var(--k-cyan)" />
            <stop offset=".72" stopColor="var(--k-cyan)" />
            <stop offset="1" stopColor="var(--k-lime)" />
          </linearGradient>
          <filter id="b-operator-glow" x="-20%" y="-80%" width="140%" height="260%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <motion.path
          d="M 0 145 C 170 30, 320 45, 455 118 S 750 210, 930 112 S 1110 60, 1200 42"
          fill="none"
          stroke="url(#b-operator-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
          opacity=".22"
          filter="url(#b-operator-glow)"
          {...lineAnimation}
        />
        <motion.path
          d="M 0 145 C 170 30, 320 45, 455 118 S 750 210, 930 112 S 1110 60, 1200 42"
          fill="none"
          stroke="url(#b-operator-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          {...lineAnimation}
        />
      </svg>

      <ol className="b-operator-path__steps">
        {steps.map((step, index) => (
          <motion.li
            key={step.title}
            className="b-operator-path__step"
            initial={reduced ? false : { opacity: 0.45, scale: 0.92 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.42, delay: index * 0.12 }}
          >
            <span className="b-operator-path__number">{String(index + 1).padStart(2, '0')}</span>
            <IconRing icon={step.icon} accent={index === steps.length - 1 ? 'lime' : 'cyan'} />
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default OperatorPath;
