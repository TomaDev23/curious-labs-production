import { useEffect, useRef, useState } from 'react';
import { observe as sharedObserve, unobserve as sharedUnobserve } from '../utils/SharedIO';

/**
 * Custom hook for revealing elements when they enter the viewport
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin (CSS-style string)
 * @param {boolean} options.triggerOnce - Whether to trigger only once
 * @param {number} options.delay - Delay before revealing element
 * @returns {Object} {ref, isVisible, hasBeenVisible} - Ref to attach to element, visibility state, and whether it's been visible
 */
const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef(null);
  const unsubscribeRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 🚨 PHASE 2: Use SharedIO - Pure management, preserves all timing
    const unsubscribe = sharedObserve(
      element,
      (entry) => {
        if (entry.isIntersecting) {
          // Preserve original delay behavior
          if (delay > 0) {
            timeoutRef.current = setTimeout(() => {
              setIsVisible(true);
              if (!hasBeenVisible) {
                setHasBeenVisible(true);
              }
            }, delay);
          } else {
            setIsVisible(true);
            if (!hasBeenVisible) {
              setHasBeenVisible(true);
            }
          }
          
          // Preserve triggerOnce behavior
          if (triggerOnce && unsubscribeRef.current) {
            unsubscribeRef.current();
            unsubscribeRef.current = null;
          }
        } else if (!triggerOnce) {
          // Reset visibility if not triggerOnce
          setIsVisible(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }
      },
      { threshold, rootMargin }
    );

    unsubscribeRef.current = unsubscribe;

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasBeenVisible]);

  return {
    ref: elementRef,
    isVisible,
    hasBeenVisible
  };
};

export default useScrollReveal; 