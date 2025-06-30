import { useEffect, useRef, useState } from 'react';
import { ScrollManager } from '../utils/ScrollManager';
import { isMobile } from '../utils/deviceTier';

/**
 * Hook to detect when scrolling past a certain threshold of the page
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Scroll threshold (0-1) to trigger (default: 0.85)
 * @param {boolean} options.once - If true, only triggers once (default: true)
 * @returns {boolean} isTriggered - Whether the threshold has been reached
 */
const useScrollTrigger = (config = {}) => {
  const {
    threshold = 100,
    direction = 'down',
    callback = null,
    triggerOnce = false
  } = config;

  const [triggered, setTriggered] = useState(false);
  const lastScrollY = useRef(0);
  const hasTriggered = useRef(false);
  const frameRef = useRef(null);
  
  // 🚨 SM-3: Replace useGlobalScroll with local ScrollManager subscription
  const [scrollY, setScrollY] = useState(0);
  const mobile = isMobile();
  const callbackRef = useRef(callback);
  
  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // 🚨 SM-3: ScrollManager subscription with mobile short-circuit
  useEffect(() => {
    // 🚨 MB-1: Skip scroll listeners on mobile for performance
    if (mobile) return;
    
    const unsubscribe = ScrollManager.subscribe((newScrollY) => {
      setScrollY(newScrollY);
    });

    return unsubscribe;
  }, [mobile]);

  useEffect(() => {
    const checkTrigger = () => {
      const scrollDirection = scrollY > lastScrollY.current ? 'down' : 'up';
      const shouldTrigger = 
        (direction === 'down' && scrollY > threshold) ||
        (direction === 'up' && scrollY < threshold) ||
        (direction === 'both' && Math.abs(scrollY - threshold) < 10);

      // Preserve original trigger logic exactly
      if (shouldTrigger && scrollDirection === direction) {
        if (!triggerOnce || !hasTriggered.current) {
          setTriggered(true);
          hasTriggered.current = true;
          
          // Preserve callback timing
          if (callback && typeof callback === 'function') {
            callback(scrollY, scrollDirection);
          }
        }
      } else if (!triggerOnce) {
        setTriggered(false);
      }

      lastScrollY.current = scrollY;
    };

    // Throttle with RAF - preserves original responsiveness
    const throttledCheck = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = requestAnimationFrame(checkTrigger);
    };

    throttledCheck();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scrollY, threshold, direction, callback, triggerOnce]);

  return {
    triggered,
    scrollY,
    reset: () => {
      setTriggered(false);
      hasTriggered.current = false;
    }
  };
};

export default useScrollTrigger; 