import { useEffect, useRef, useState } from 'react';
import { useGlobalScroll } from './useGlobalScroll.jsx';

/**
 * Custom hook for creating parallax motion effects based on scroll position
 * @param {Object} options - Configuration options for the parallax effect
 * @param {number} options.speed - Speed of the parallax effect (default: 0.5)
 * @param {boolean} options.horizontal - Whether to apply parallax horizontally (default: false)
 * @param {boolean} options.reverse - Whether to reverse the direction of the parallax effect (default: false)
 * @param {number} options.xRange - Range of horizontal movement in pixels (default: 20)
 * @param {number} options.yRange - Range of vertical movement in pixels (default: 20)
 * @param {string} options.easing - CSS easing function to use (default: 'cubic-bezier(0.5, 0, 0.5, 1)')
 * @param {boolean} options.disabled - Whether to disable the parallax effect (default: false)
 * @param {boolean} options.debug - Whether to enable debug mode (default: false)
 * @returns {Object} - The style object to apply to the element and ref to attach
 */
const useParallaxMotion = (config = {}) => {
  const {
    speed = 0.5,
    direction = 'vertical',
    offset = 0,
    smooth = true,
    threshold = 0
  } = config;

  const elementRef = useRef(null);
  const [motionValue, setMotionValue] = useState(0);
  const frameRef = useRef(null);
  const smoothValueRef = useRef(0);
  
  // 🚨 PHASE 2: Use global scroll - Pure management, preserves motion math
  const scrollY = useGlobalScroll();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateMotion = () => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      
      // Preserve original motion calculation exactly
      const distance = elementCenter - windowCenter;
      let motionOffset = distance * speed + offset;
      
      // Apply threshold - original behavior preserved
      if (Math.abs(motionOffset) < threshold) {
        motionOffset = 0;
      }
      
      if (smooth) {
        // Preserve smooth interpolation behavior
        smoothValueRef.current += (motionOffset - smoothValueRef.current) * 0.1;
        setMotionValue(smoothValueRef.current);
      } else {
        setMotionValue(motionOffset);
      }
    };

    // Throttle with RAF - preserves original smoothness
    const throttledUpdate = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = requestAnimationFrame(updateMotion);
    };

    throttledUpdate();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scrollY, speed, direction, offset, smooth, threshold]);

  // Generate transform based on direction - preserves original behavior
  const getTransform = () => {
    switch (direction) {
      case 'horizontal':
        return `translateX(${motionValue}px)`;
      case 'both':
        return `translate(${motionValue}px, ${motionValue}px)`;
      default:
        return `translateY(${motionValue}px)`;
    }
  };

  return {
    elementRef,
    motionValue,
    transform: getTransform()
  };
};

export default useParallaxMotion; 