import React from 'react';
import { AnimatePresence } from '../../../../FramerProvider';
import { usePerformanceThrottle } from './usePerformanceThrottle';

/**
 * Throttled AnimatePresence wrapper
 * Respects performance settings and automatically disables animations when needed
 */
export const ThrottledAnimatePresence = ({ children, ...props }) => {
  const { shouldAnimate } = usePerformanceThrottle();
  
  if (!shouldAnimate) {
    return children;
  }
  
  return (
    <AnimatePresence {...props}>
      {children}
    </AnimatePresence>
  );
};