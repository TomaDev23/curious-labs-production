import { motion, AnimatePresence, useInView, useAnimation, useScroll, useTransform, useReducedMotion  } from 'framer-motion';

export const FramerProvider = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export { motion, AnimatePresence, useInView, useAnimation, useScroll, useTransform, useReducedMotion }; 