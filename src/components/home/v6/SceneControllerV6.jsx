/**
 * @metadata
 * @component SceneController
 * @description Root orchestrator that manages scroll, animation phasing, and performance detection
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
  // 🚨 MB-1: Mobile short-circuit - disable scroll-based scene phasing on mobile
  const mobile = isMobile();
  
  // 🚨 SM-3: Replace useGlobalScroll with local ScrollManager subscription
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // 🚨 P2-1: Phase debouncing refs to prevent excessive re-renders
  const lastPhaseUpdate = useRef(0);
  const lastScrollY = useRef(0);
  const phaseUpdatePending = useRef(false);
  
  // Core state for scene management
  const [scenePhase, setScenePhase] = useState(ScenePhases.VOID);
  const [horizontalScroll, setHorizontalScroll] = useState(0);
  
  // Device capabilities state
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    performanceTier: PerformanceTiers.HIGH,
    prefersReducedMotion: false,
    isMobile: false,
    isTablet: false,
    devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
  });

  // 🚨 SM-3: ScrollManager subscription with mobile short-circuit
  useEffect(() => {
    // 🚨 MB-1: Skip scroll listeners on mobile
    if (mobile) return;
    
    const unsubscribe = ScrollManager.subscribe((newScrollY) => {
      setScrollPosition(newScrollY);
    });

    return unsubscribe;
  }, [mobile]);

  // Detect device capabilities on component mount
  useEffect(() => {
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
    
    // 🚨 MB-1: Skip resize listener on mobile
    if (!mobile) {
      window.addEventListener('resize', detectCapabilities);
    }
    
    // Cleanup
    return () => {
      if (!mobile) {
        window.removeEventListener('resize', detectCapabilities);
      }
    };
  }, [mobile]);

  // Handle automatic phase progression with appropriate timing
  useEffect(() => {
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
  }, [scenePhase, deviceCapabilities.prefersReducedMotion]);

  // 🚨 P2-1: CRITICAL FIX - Debounced scroll-based phase progression
  useEffect(() => {
    // 🚨 MB-1: Skip scroll-based scene phasing on mobile - use static phases
    if (mobile) {
      // Mobile gets simplified static progression - no scroll dependency
      if (scenePhase === ScenePhases.VOID) {
        const timer = setTimeout(() => setScenePhase(ScenePhases.EMERGENCE), 2000);
        return () => clearTimeout(timer);
      }
      return;
    }
    
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
  }, []);
  
  // Function to set phase directly
  const setPhase = useCallback((phase) => {
    if (Object.values(ScenePhases).includes(phase)) {
      setScenePhase(phase);
    } else {
      console.warn(`Invalid scene phase: ${phase}`);
    }
  }, []);
  
  // Handle horizontal scroll for product sections
  const handleHorizontalScroll = useCallback((scrollPosition) => {
    setHorizontalScroll(scrollPosition);
  }, []);
  
  // 🚨 SM-4: Create context value WITHOUT scrollPosition to prevent re-renders
  const contextValue = {
    scenePhase,
    deviceCapabilities,
    horizontalScroll,
    handleHorizontalScroll,
    advancePhase,
    setPhase
  };
  
  return (
    <SceneContext.Provider value={contextValue}>
      {children}
    </SceneContext.Provider>
  );
};

export default SceneControllerV6;