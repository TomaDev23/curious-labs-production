/**
 * @metadata
 * @component SceneController
 * @description Root orchestrator that manages scroll, animation phasing, and performance detection
 * @legit true
 * @version 1.1.0 - MOBILE OPTIMIZED
 * @author CuriousLabs
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';
// 🚨 SM-3: Replace useGlobalScroll with ScrollManager
import { ScrollManager } from '../../../utils/ScrollManager';
import { isMobile } from '../../../utils/deviceTier';

// Define types for scene phases and performance tiers
export const ScenePhases = {
  VOID: 'void',
  EMERGENCE: 'emergence',
  ACTIVATION: 'activation'
};

export const PerformanceTiers = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  MINIMAL: 'minimal'
};

// Mobile-optimized device capabilities
const MOBILE_CAPABILITIES = {
  performanceTier: PerformanceTiers.LOW,
  prefersReducedMotion: false,
  isMobile: true,
  isTablet: false,
  devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
};

// Create the context with default values
// 🚨 SM-4: Remove scrollPosition from context to stop re-renders
export const SceneContext = createContext({
  scenePhase: ScenePhases.VOID,
  deviceCapabilities: {
    performanceTier: PerformanceTiers.HIGH,
    prefersReducedMotion: false,
    isMobile: false,
    isTablet: false,
    devicePixelRatio: 1
  },
  horizontalScroll: 0,
  handleHorizontalScroll: () => {},
  advancePhase: () => {},
  setPhase: () => {}
});

// Custom hook for accessing scene context
export const useScene = () => useContext(SceneContext);

const SceneControllerV6 = ({ children }) => {
  // 🚨 MOBILE OPTIMIZATION: Complete bypass for mobile devices
  const mobile = isMobile();
  
  // 🚨 MOBILE: Static phase for mobile, dynamic for desktop
  const [scenePhase, setScenePhase] = useState(
    mobile ? ScenePhases.ACTIVATION : ScenePhases.VOID
  );
  
  // 🚨 MOBILE: Static capabilities for mobile, dynamic for desktop
  const [deviceCapabilities, setDeviceCapabilities] = useState(
    mobile ? MOBILE_CAPABILITIES : {
      performanceTier: PerformanceTiers.HIGH,
      prefersReducedMotion: false,
      isMobile: false,
      isTablet: false,
      devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
    }
  );
  
  // 🚨 SM-3: ScrollManager subscription with mobile short-circuit
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // 🚨 P2-1: Phase debouncing refs to prevent excessive re-renders
  const lastPhaseUpdate = useRef(0);
  const lastScrollY = useRef(0);
  const phaseUpdatePending = useRef(false);
  
  // Core state for scene management
  const [horizontalScroll, setHorizontalScroll] = useState(0);

  // 🚨 MOBILE OPTIMIZATION: Skip all scroll listeners on mobile
  useEffect(() => {
    if (mobile) {
      console.log('[MOBILE] Scene controller: Mobile bypass active - no scroll listeners');
      return;
    }
    
    const unsubscribe = ScrollManager.subscribe((newScrollY) => {
      setScrollPosition(newScrollY);
    }, 'scene'); // Use 'scene' category for batched updates

    return unsubscribe;
  }, [mobile]);

  // 🚨 MOBILE OPTIMIZATION: Skip device detection on mobile
  useEffect(() => {
    if (mobile) return; // Complete bypass for mobile
    
    const detectCapabilities = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check device type
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      
      // Get device pixel ratio
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      // Try to detect memory (not supported in all browsers)
      const memory = navigator.deviceMemory || 8; // Default to 8GB if not available
      
      // Determine performance tier based on device capabilities
      let performanceTier = PerformanceTiers.HIGH;
      
      if (prefersReducedMotion) {
        performanceTier = PerformanceTiers.MINIMAL;
      } else if (isMobile && memory <= 2) {
        performanceTier = PerformanceTiers.MINIMAL;
      } else if (isMobile || (memory <= 4)) {
        performanceTier = PerformanceTiers.LOW;
      } else if (isTablet || (memory <= 6)) {
        performanceTier = PerformanceTiers.MEDIUM;
      }
      
      // Update device capabilities state
      setDeviceCapabilities({
        performanceTier,
        prefersReducedMotion,
        isMobile,
        isTablet,
        devicePixelRatio
      });
    };
    
    // Detect capabilities initially
    detectCapabilities();
    
    window.addEventListener('resize', detectCapabilities);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', detectCapabilities);
    };
  }, [mobile]);

  // 🚨 MOBILE OPTIMIZATION: Skip automatic phase progression on mobile
  useEffect(() => {
    if (mobile) return; // Complete bypass for mobile
    
    // Skip animations if user prefers reduced motion
    if (deviceCapabilities.prefersReducedMotion) {
      setScenePhase(ScenePhases.ACTIVATION);
      return;
    }
    
    // Phase timing (in milliseconds)
    const phaseTiming = {
      [ScenePhases.VOID]: 1800,
      [ScenePhases.EMERGENCE]: 2200
    };
    
    // Only set timer if not already in final phase
    if (scenePhase !== ScenePhases.ACTIVATION) {
      const timer = setTimeout(() => {
        // Advance to next phase
        setScenePhase(prevPhase => {
          switch (prevPhase) {
            case ScenePhases.VOID:
              return ScenePhases.EMERGENCE;
            case ScenePhases.EMERGENCE:
              return ScenePhases.ACTIVATION;
            default:
              return prevPhase;
          }
        });
      }, phaseTiming[scenePhase]);
      
      return () => clearTimeout(timer);
    }
  }, [scenePhase, deviceCapabilities.prefersReducedMotion, mobile]);

  // 🚨 MOBILE OPTIMIZATION: Skip scroll-based phase progression on mobile
  useEffect(() => {
    if (mobile) return; // Complete bypass for mobile
    
    // 🚨 P2-1: DRAGON SLAYER - Debounced phase updates to prevent re-render storm
    const now = Date.now();
    const deltaY = Math.abs(scrollPosition - lastScrollY.current);
    const timeDelta = now - lastPhaseUpdate.current;
    
    // Only update phase if:
    // 1. Significant scroll movement (80px threshold)
    // 2. Sufficient time has passed (150ms debounce)
    // 3. No pending update already scheduled
    if (deltaY > 80 && timeDelta > 150 && !phaseUpdatePending.current) {
      phaseUpdatePending.current = true;
      
      // Batch phase updates to prevent cascade re-renders
      requestAnimationFrame(() => {
        // Double-check conditions in case of rapid scrolling
        const currentDelta = Math.abs(scrollPosition - lastScrollY.current);
        
        if (currentDelta > 50) { // Relaxed check in RAF
          // Handle scroll-based phase progression with hysteresis
          if (scrollPosition > 100 && scenePhase === ScenePhases.VOID) {
            console.log('[P2-1] Phase transition: VOID → EMERGENCE');
            setScenePhase(ScenePhases.EMERGENCE);
            lastPhaseUpdate.current = Date.now();
            lastScrollY.current = scrollPosition;
          } else if (scrollPosition > 300 && scenePhase === ScenePhases.EMERGENCE) {
            console.log('[P2-1] Phase transition: EMERGENCE → ACTIVATION');
            setScenePhase(ScenePhases.ACTIVATION);
            lastPhaseUpdate.current = Date.now();
            lastScrollY.current = scrollPosition;
          }
        }
        
        phaseUpdatePending.current = false;
      });
    }
  }, [scrollPosition, scenePhase, mobile]);
  
  // Function to advance to the next phase
  const advancePhase = useCallback(() => {
    if (mobile) return; // No phase changes on mobile
    
    setScenePhase(prevPhase => {
      switch (prevPhase) {
        case ScenePhases.VOID:
          return ScenePhases.EMERGENCE;
        case ScenePhases.EMERGENCE:
          return ScenePhases.ACTIVATION;
        default:
          return prevPhase;
      }
    });
  }, [mobile]);
  
  // Function to set phase directly
  const setPhase = useCallback((phase) => {
    if (mobile) return; // No phase changes on mobile
    
    if (Object.values(ScenePhases).includes(phase)) {
      setScenePhase(phase);
    } else {
      console.warn(`Invalid scene phase: ${phase}`);
    }
  }, [mobile]);
  
  // Handle horizontal scroll for product sections
  const handleHorizontalScroll = useCallback((scrollPosition) => {
    setHorizontalScroll(scrollPosition);
  }, []);
  
  // 🚨 MOBILE OPTIMIZATION: Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    scenePhase,
    deviceCapabilities,
    horizontalScroll,
    handleHorizontalScroll,
    advancePhase,
    setPhase
  }), [scenePhase, deviceCapabilities, horizontalScroll, handleHorizontalScroll, advancePhase, setPhase]);
  
  return (
    <SceneContext.Provider value={contextValue}>
      {children}
    </SceneContext.Provider>
  );
};

export default SceneControllerV6;