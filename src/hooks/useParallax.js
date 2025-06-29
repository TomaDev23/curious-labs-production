import { useEffect, useRef, useState } from 'react';
import { useGlobalScroll } from './useGlobalScroll.jsx';

/**
 * Hook to create parallax scrolling effects
 * @param {Object} options - Configuration options
 * @param {number} options.speed - Parallax speed multiplier (default: 0.25)
 * @param {boolean} options.isMobile - Whether the device is mobile (default: false)
 * @returns {Object} - Object containing transform style and current scrollY value
 */
const useParallax = (options = {}) => {
  const { speed = 0.25, isMobile = false, offset = 0 } = options;
  
  const elementRef = useRef(null);
  const [transform, setTransform] = useState('translateY(0px)');
  const frameRef = useRef(null);
  
  // 🚨 PHASE 2: Use global scroll - Pure management, preserves parallax math
  const scrollY = useGlobalScroll();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Preserve original parallax calculation exactly
    const updateParallax = () => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Original parallax math - unchanged
      const parallaxOffset = (scrollY - elementTop + windowHeight) * speed + offset;
      setTransform(`translateY(${parallaxOffset}px)`);
    };

    // Throttle with RAF - preserves original smoothness
    const throttledUpdate = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = requestAnimationFrame(updateParallax);
    };

    // Update on scroll change
    throttledUpdate();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scrollY, speed, offset]);

  // For mobile, round the value to improve performance
  const mobileTransform = `translateY(${isMobile ? Math.round(scrollY * speed) : scrollY * speed}px)`;
  
  return { elementRef, transform, scrollY, mobileTransform };
};

export default useParallax; 