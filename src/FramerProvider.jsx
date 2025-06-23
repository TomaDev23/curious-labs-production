import { motion, AnimatePresence, useInView, useAnimation, useScroll, useTransform, useReducedMotion  } from 'framer-motion';

export function FramerProvider({ children }) {
  return (
    <>
      {children}
    </>
  );
}

// 🚀 OPTIMIZATION: Default export for lazy loading compatibility
export default FramerProvider;

export { motion, AnimatePresence, useInView, useAnimation, useScroll, useTransform, useReducedMotion }; 