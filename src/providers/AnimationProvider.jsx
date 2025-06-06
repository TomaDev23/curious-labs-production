import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * AnimationProvider - Global Framer Motion optimization
 * 
 * Uses LazyMotion to load animation features once globally instead of
 * per-component, reducing DOM operations and improving performance.
 * 
 * This addresses the DOM.resolveNode error cascade by consolidating
 * Framer Motion's feature registration.
 */
export const AnimationProvider = ({ children }) => (
  <LazyMotion features={domAnimation} strict>
    {children}
  </LazyMotion>
);

export default AnimationProvider; 