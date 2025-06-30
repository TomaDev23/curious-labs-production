import { useEffect, useState, useRef } from 'react';
import { ScrollManager } from '../utils/ScrollManager';
import { isMobile } from '../utils/deviceTier';

/**
 * Custom hook to track scroll progress (0-1) throughout the page
 * Used for scroll-based animations and transitions
 * @returns {number} - Normalized scroll progress (0-1)
 */
const useScrollProgress = (targetRef = null) => {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef(null);
  
  // 🚨 SM-3: Replace useGlobalScroll with local ScrollManager subscription
  const [scrollY, setScrollY] = useState(0);
  const mobile = isMobile();

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
    const calculateProgress = () => {
      if (targetRef && targetRef.current) {
        // Preserve original element-based progress calculation
        const element = targetRef.current;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Original progress math - unchanged
        const scrollStart = elementTop - windowHeight;
        const scrollEnd = elementTop + elementHeight;
        const scrollRange = scrollEnd - scrollStart;
        
        if (scrollRange > 0) {
          const currentProgress = Math.max(0, Math.min(1, (scrollY - scrollStart) / scrollRange));
          setProgress(currentProgress);
        }
      } else {
        // Preserve original document progress calculation
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = documentHeight > 0 ? scrollY / documentHeight : 0;
        setProgress(Math.max(0, Math.min(1, currentProgress)));
      }
    };

    // Throttle with RAF - preserves original smoothness
    const throttledUpdate = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = requestAnimationFrame(calculateProgress);
    };

    throttledUpdate();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scrollY, targetRef]);

  return progress;
};

export default useScrollProgress; 