import React, { createContext, useContext } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Motion primitives for the consultation page.
 *
 * Everything here degrades to a plain, instantly-visible element when the
 * visitor asks for reduced motion — content never depends on an animation
 * having run. framer-motion is already a project dependency; nothing new is
 * introduced.
 */

const EASE = [0.16, 1, 0.3, 1];

const StaggerContext = createContext(false);

/** Fade + rise as the element enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = '',
  as = 'div',
  once = true,
  ...rest
}) {
  const reduced = useReducedMotion();
  const inStagger = useContext(StaggerContext);
  const Tag = motion[as] || motion.div;

  if (reduced) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }

  const variants = {
    hidden: { opacity: 0, y },
    shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } }
  };

  // Inside a Stagger the parent drives the timing, so no viewport trigger here.
  if (inStagger) {
    return (
      <Tag className={className} variants={variants} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      variants={variants}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Parent that releases its <Reveal> children one after another. */
export function Stagger({ children, className = '', step = 0.09, delay = 0, as = 'div', ...rest }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduced) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }

  return (
    <StaggerContext.Provider value={true}>
      <Tag
        className={className}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: step, delayChildren: delay } }
        }}
        {...rest}
      >
        {children}
      </Tag>
    </StaggerContext.Provider>
  );
}

/** Headline that arrives one line at a time. `lines` is an array of strings. */
export function KineticHeading({ lines, className = '', id, level = 'h1' }) {
  const reduced = useReducedMotion();
  const Tag = level;

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {lines.map((line, i) => (
          <React.Fragment key={line}>
            {i > 0 ? <br /> : null}
            {line}
          </React.Fragment>
        ))}
      </Tag>
    );
  }

  const MotionTag = motion[level] || motion.h2;
  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-15% 0px' }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
    >
      {lines.map((line) => (
        <span className="cl-kine__line" key={line}>
          <motion.span
            className="cl-kine__inner"
            variants={{
              hidden: { y: '108%' },
              shown: { y: '0%', transition: { duration: 0.78, ease: EASE } }
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Slow counter-scroll drift, used to give the art plates some life. */
export function Parallax({ children, className = '', distance = 34 }) {
  const reduced = useReducedMotion();
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/** Thin lime rail that fills as the page is read. */
export function ScrollRail() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  if (reduced) return null;
  return <motion.div className="cl-scroll-rail" style={{ scaleX }} aria-hidden="true" />;
}

export { EASE };
