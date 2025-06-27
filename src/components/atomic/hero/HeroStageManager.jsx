// @file src/components/atomic/hero/HeroStageManager.jsx
// @description Scroll-based controller for Cosmic Arrival hero scene

import { useEffect, useState, useCallback, useRef } from 'react';

const HeroStageManager = ({ setSceneStep }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const lastScrollRatioRef = useRef(-1);
  const setSceneStepRef = useRef(setSceneStep);

  // ✅ FIXED: Keep setSceneStep ref updated to avoid dependency cycles
  useEffect(() => {
    setSceneStepRef.current = setSceneStep;
  }, [setSceneStep]);

  // ✅ FIXED: SSR-safe hydration check
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // ✅ FIXED: SSR-safe motion preference detection
  useEffect(() => {
    if (!isHydrated) return;

    try {
      // Safe window API access with error handling
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      // Listen for changes
      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (error) {
      console.warn('matchMedia access failed:', error);
      // Safe fallback - assume no reduced motion preference
      setPrefersReducedMotion(false);
    }
  }, [isHydrated]);

  // ✅ FIXED: Stable scroll handler using refs to avoid dependency cycles
  const handleScrollRef = useRef();
  handleScrollRef.current = useCallback(() => {
    if (!isHydrated) return;

    // Clear existing timeout to throttle calls
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Throttle scroll handling to 16ms (60fps)
    scrollTimeoutRef.current = setTimeout(() => {
      try {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const scrollRatio = scrollY / viewportHeight;
        
        // Only update if ratio changed significantly (prevent micro-updates)
        if (Math.abs(scrollRatio - lastScrollRatioRef.current) < 0.05) return;
        
        lastScrollRatioRef.current = scrollRatio;
        
        // ✅ FIXED: Batched state calculation - single update instead of 8
        let newStep;
        if (scrollRatio < 0.1) newStep = 1;
        else if (scrollRatio < 0.2) newStep = 2;
        else if (scrollRatio < 0.3) newStep = 3;
        else if (scrollRatio < 0.4) newStep = 4;
        else if (scrollRatio < 0.5) newStep = 5;
        else if (scrollRatio < 0.6) newStep = 6;
        else if (scrollRatio < 0.7) newStep = 7;
        else newStep = 8;
        
        // Use ref to avoid dependency cycle
        setSceneStepRef.current(newStep);
      } catch (error) {
        console.warn('Scroll handling error:', error);
        // Safe fallback - set to final step
        setSceneStepRef.current(8);
      }
    }, 16); // 16ms throttle for 60fps
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    // ✅ FIXED: Reduced motion bypass - skip scroll handling entirely
    if (prefersReducedMotion) {
      setSceneStepRef.current(8);
      return;
    }

    // Stable scroll handler reference
    const handleScroll = () => handleScrollRef.current();

    // Call once immediately to set initial state
    handleScroll();
    
    // ✅ FIXED: Passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up any pending timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [prefersReducedMotion, isHydrated]); // ✅ REMOVED handleScroll dependency

  return null;
};

export default HeroStageManager; 