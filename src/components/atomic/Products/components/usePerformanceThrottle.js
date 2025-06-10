import { useState, useEffect } from 'react';

/**
 * Performance Throttle Hook
 * Automatically adjusts animations based on device capabilities and user preferences
 */
export const usePerformanceThrottle = () => {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [performanceLevel, setPerformanceLevel] = useState('high');
  
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Performance heuristics
    const isLowEndDevice = navigator.hardwareConcurrency <= 4;
    const isSlowConnection = navigator.connection?.effectiveType === '2g' || navigator.connection?.effectiveType === 'slow-2g';
    
    if (prefersReducedMotion || isLowEndDevice || isSlowConnection) {
      setPerformanceLevel('low');
      setShouldAnimate(false);
    } else if (isLowEndDevice) {
      setPerformanceLevel('medium');
    }
    
    // DISABLED: MutationObserver was causing DOM.resolveNode errors
    // Monitor DOM mutations for performance
    // let mutationCount = 0;
    // const observer = new MutationObserver((mutations) => {
    //   mutationCount += mutations.length;
    //   
    //   // If high DOM activity detected, temporarily reduce animations
    //   if (mutationCount > 100) {
    //     setDomActivityHigh(true);
    //     setShouldAnimate(false);
    //     
    //     // Reset after a delay
    //     setTimeout(() => {
    //       mutationCount = 0;
    //       setDomActivityHigh(false);
    //       if (!prefersReducedMotion && !isLowEndDevice) {
    //         setShouldAnimate(true);
    //       }
    //     }, 2000);
    //   }
    // });
    // 
    // observer.observe(document.body, {
    //   childList: true,
    //   subtree: true,
    //   attributes: true
    // });
    // 
    // return () => {
    //   observer.disconnect();
    // };
  }, []);
  
  return { shouldAnimate, performanceLevel };
};