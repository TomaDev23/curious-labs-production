/**
 * 🎯 COOLING PASS: Off-screen Component Unmounting Hook
 * Contract v8.0 Compliant - Mobile thermal relief through smart unmounting
 * 
 * Features:
 * - Mobile-only unmounting (desktop always renders)
 * - Conservative thresholds to prevent aggressive unmounting
 * - 120ms fade-in guard to eliminate visual pop-in
 * - IntersectionObserver for performance
 */

import { useState, useEffect, useRef } from 'react';
import { isMobile } from '../utils/deviceTier'; // ✅ Contract v8.0 approved pattern

/**
 * Hook for managing off-screen component unmounting with fade protection
 * @param {Object} threshold - Viewport thresholds for unmounting
 * @param {number} threshold.top - Pixels above viewport to keep mounted (default: -50)
 * @param {number} threshold.bottom - Pixels below viewport to keep mounted (default: 200)
 * @returns {Object} Hook interface with ref, render state, and fade styles
 */
export const useOffscreenUnmount = (threshold = { top: -50, bottom: 200 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isRemounting, setIsRemounting] = useState(false);
  const mobile = isMobile(); // ✅ Contract approved mobile detection
  
  useEffect(() => {
    // 🎯 CONTRACT COMPLIANCE: Desktop always renders, mobile gets smart unmounting
    if (!mobile || !ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const { top, bottom } = entry.boundingClientRect;
        const viewport = window.innerHeight;
        
        // Conservative mounting logic - generous buffer zones
        const shouldMount = top > -threshold.top && bottom < viewport + threshold.bottom;
        
        if (!isVisible && shouldMount) {
          // 🎨 FADE-IN GUARD: Prevent visual pop-in
          setIsRemounting(true);
          setIsVisible(true);
          
          // 120ms fade-in protection
          const fadeTimeout = setTimeout(() => {
            setIsRemounting(false);
          }, 120);
          
          return () => clearTimeout(fadeTimeout);
        } else if (isVisible && !shouldMount) {
          setIsVisible(false);
          setIsRemounting(false);
        }
      },
      { 
        threshold: 0,
        // Additional buffer for smooth transitions
        rootMargin: `${threshold.top}px 0px ${threshold.bottom}px 0px`
      }
    );
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [mobile, threshold.top, threshold.bottom, isVisible]);
  
  return {
    // Ref to attach to the component container
    ref,
    
    // Whether component should render (desktop always true)
    shouldRender: mobile ? isVisible : true,
    
    // Fade-in styles to prevent pop-in on remount
    fadeInStyle: isRemounting ? {
      opacity: 0,
      animation: 'fadeIn 120ms ease-out forwards'
    } : {},
    
    // Debug info (development only)
    debug: process.env.NODE_ENV === 'development' ? {
      isMobile: mobile,
      isVisible,
      isRemounting,
      threshold
    } : null
  };
};

/**
 * 🎯 PRESET CONFIGURATIONS for common use cases
 */

// Conservative - for critical components
export const useOffscreenUnmountConservative = () => 
  useOffscreenUnmount({ top: -100, bottom: 300 });

// Aggressive - for heavy 3D components
export const useOffscreenUnmountAggressive = () => 
  useOffscreenUnmount({ top: -25, bottom: 100 });

// Default export
export default useOffscreenUnmount; 