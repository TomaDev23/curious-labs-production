/**
 * @file scrollPipeline.js
 * @description Advanced scroll handling pipeline with performance optimizations
 * @legit true - Passes LEGIT protocol requirements
 */

import { isMobile } from './deviceTier';

/**
 * Creates a throttled scroll handler with RAF optimization
 * @param {Function} callback - Function to call on scroll
 * @param {Object} options - Configuration options
 * @returns {Function} Cleanup function
 */
export const createScrollPipeline = (callback, options = {}) => {
  // 🚨 CL-2: Early return on mobile to silence scroll listeners
  if (isMobile()) {
    return () => {}; // Return empty cleanup function
  }

  const {
    throttle = 16,
    passive = true,
    capture = false
  } = options;

  let ticking = false;
  let lastScrollY = 0;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (!ticking) {
      requestAnimationFrame(() => {
        callback({
          scrollY: currentScrollY,
          deltaY: currentScrollY - lastScrollY,
          direction: currentScrollY > lastScrollY ? 'down' : 'up'
        });
        
        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  };

  // Add event listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll, { passive, capture });
  }

  // Return cleanup function
  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll, { passive, capture });
    }
  };
};

/**
 * Advanced scroll observer with intersection detection
 * @param {HTMLElement} element - Element to observe
 * @param {Function} callback - Callback for scroll events
 * @param {Object} options - Observer options
 */
export const createScrollObserver = (element, callback, options = {}) => {
  // 🚨 CL-2: Early return on mobile
  if (isMobile()) {
    return () => {}; // Return empty cleanup function
  }

  if (!element || typeof callback !== 'function') {
    console.warn('[scrollPipeline] Invalid element or callback provided');
    return () => {};
  }

  const {
    threshold = [0, 0.25, 0.5, 0.75, 1],
    rootMargin = '0px'
  } = options;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      callback({
        element: entry.target,
        isIntersecting: entry.isIntersecting,
        intersectionRatio: entry.intersectionRatio,
        boundingClientRect: entry.boundingClientRect
      });
    });
  }, {
    threshold,
    rootMargin
  });

  observer.observe(element);

  return () => observer.disconnect();
}; 