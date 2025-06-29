/**
 * 🛡️ KEEP - CRITICAL PRODUCTION COMPONENT
 * Code: MISSION-ATOMIC-001
 * Used in: v6_atomic.jsx (Main Homepage)
 * Features: Eclipse-style mission statement with numbered points and neon animations
 * Warning: DO NOT REMOVE - CORE ATOMIC MISSION SECTION
 * Bundle: Core atomic homepage bundle
 * Type: Atomic Mission Component
 * Dependencies: framer-motion, MissionControlBoard
 * 
 * 🚨 MOBILE CRASH FIX: Simplified version eliminating complex observers and race conditions
 */

/**
 * @component MissionAtomic
 * @description Eclipse-style mission statement with numbered points
 * @version 2.0.0 - MOBILE CRASH FIX
 * @type atomic
 */

import React, { useState, useEffect, Suspense, lazy, useRef, useCallback } from 'react';
import {  motion, useAnimation  } from '../../FramerProvider';
import { observe as sharedObserve, unobserve as sharedUnobserve } from '../../utils/SharedIO';

// 🚀 LAZY LOAD: Convert MissionControlBoard to lazy loading for bundle optimization
const MissionControlBoard = lazy(() => import('../cosmic/MissionControlBoard'));

// 🌙 PROXY MOON: Use MoonSphereProxy for proper 3D isolation
const MoonSphereProxy = lazy(() => import('./proxies/MoonSphereProxy'));

// 🎯 UNIFIED MOBILE DETECTION: Replace inconsistent patterns
import { useUnifiedMobile } from '../../hooks/useBreakpoint';

// Component metadata for LEGIT compliance
export const metadata = {
  id: 'mission_atomic',
  scs: 'SCS-ATOMIC-VISUAL',
  type: 'atomic',
  doc: 'contract_mission_atomic.md'
};

// 🎯 PROGRESSIVE BACKGROUND LOADING - NO HOOKS, PURE FUNCTIONS ONLY
const getBackgroundImageSrc = (isMobile) => {
  // 🎯 FIXED: Use correct existing image paths
  if (isMobile) {
    return '/assets/images/planets/4k/milkyway_Light.webp';     // 159KB - Mobile/Tablet
  } else {
    return '/assets/images/planets/4k/milkyway_Light_big.webp'; // 683KB - Desktop
  }
};

// 🚨 CRASH FIX: Simple visibility detection without complex observers
const useSimpleVisibility = (ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 🚨 MA-3: Use SharedIO instead of creating individual observer
    const unsubscribe = sharedObserve(
      element,
      (entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenInView(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    unsubscribeRef.current = unsubscribe;
    
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, []);

  return { isVisible, hasBeenInView };
};

// Add new hook for moon viewport loading - MA-4 ENHANCED + MA-3 SHARED IO
const useMoonViewportLoading = () => {
  const [shouldLoadMoon, setShouldLoadMoon] = useState(false);
  const mountedRef = useRef(true);
  const timersRef = useRef([]);
  const unsubscribeRef = useRef(null);

  // 🚨 MA-4: Enhanced timer management for this hook
  const addTimer = useCallback((timerId) => {
    if (mountedRef.current) {
      timersRef.current.push(timerId);
    }
    return timerId;
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(timer => {
      try {
        clearTimeout(timer);
      } catch (error) {
        console.warn('[MA-4] useMoonViewportLoading timer cleanup failed:', error);
      }
    });
    timersRef.current = [];
  }, []);

  useEffect(() => {
    // Safety checks for mobile/older browsers
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      // Fallback: load immediately if IntersectionObserver not supported
      if (mountedRef.current) setShouldLoadMoon(true);
      return;
    }

    // Observe the moon section with retry logic using SharedIO
    const observeMoonSection = () => {
      const moonSection = document.querySelector('[data-moon-section]');
      if (moonSection) {
        // 🚨 MA-3: Use SharedIO for moon section observation
        const unsubscribe = sharedObserve(
          moonSection,
          (entry) => {
            if (entry.isIntersecting && mountedRef.current) {
              setShouldLoadMoon(true);
              // Unsubscribe after first trigger (load once)
              if (unsubscribeRef.current) {
                unsubscribeRef.current();
                unsubscribeRef.current = null;
              }
            }
          },
          { 
            threshold: 0.1,
            rootMargin: '200px 0px 0px 0px' // Start loading 200px before moon comes into view
          }
        );
        
        unsubscribeRef.current = unsubscribe;
        return true;
      }
      return false;
    };

    // Try to observe immediately
    if (!observeMoonSection()) {
      // If element not found, retry after a short delay (for hydration)
      const retryTimeout = addTimer(setTimeout(() => {
        if (!mountedRef.current) return; // 🚀 MA-4: Mount guard
        if (!observeMoonSection()) {
          // If still not found, fallback to immediate loading
          if (mountedRef.current) setShouldLoadMoon(true);
        }
      }, 100));
      
      // 🚨 MA-4: Add fallback timeout to prevent infinite waiting
      const fallbackTimeout = addTimer(setTimeout(() => {
        if (mountedRef.current && !shouldLoadMoon) {
          console.warn('[MA-4] Moon section not found, loading immediately');
          setShouldLoadMoon(true);
        }
      }, 2000)); // 2 second fallback

      return () => {
        mountedRef.current = false;
        // 🚨 MA-4: Clear all tracked timers
        clearAllTimers();
        // 🚨 MA-3: Clean up SharedIO subscription
        if (unsubscribeRef.current) {
          unsubscribeRef.current();
          unsubscribeRef.current = null;
        }
      };
    }

    return () => {
      mountedRef.current = false;
      clearAllTimers();
      // 🚨 MA-3: Clean up SharedIO subscription
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [addTimer, clearAllTimers]);

  return shouldLoadMoon;
};

// Advanced Neon Arc Animation Component - SIMPLIFIED + VIEWPORT OPTIMIZED + MA-3 SHARED IO
const NeonArcAnimation = ({ children, prefersReducedMotion = false }) => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const animationRef = useRef(null);
  const unsubscribeRef = useRef(null);
  
  // 🚨 MA-1: Viewport detection to pause off-screen animations + MA-3: SharedIO
  useEffect(() => {
    const element = containerRef.current;
    if (!element || !window.IntersectionObserver) {
      // Fallback: assume visible if no IntersectionObserver
      setIsInViewport(true);
      return;
    }

    // 🚨 MA-3: Use SharedIO for viewport detection
    const unsubscribe = sharedObserve(
      element,
      (entry) => {
        const isVisible = entry.isIntersecting;
        setIsInViewport(isVisible);
        
        // 🚨 MA-1: Pause/resume animations based on viewport
        if (isVisible && !prefersReducedMotion) {
          // Resume animation when in viewport
          controls.start({
            opacity: 1.0,
            textShadow: '0 0 8px rgba(0, 255, 255, 0.6), 0 0 16px rgba(0, 255, 255, 0.3)',
            transition: { duration: 0.3 }
          });
        } else {
          // Pause animation when off-screen or reduced motion
          controls.stop();
          controls.set({ 
            opacity: prefersReducedMotion ? 1.0 : 0.8,
            textShadow: prefersReducedMotion ? 'none' : '0 0 4px rgba(0, 255, 255, 0.3)'
          });
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start animation 50px before entering viewport
      }
    );

    unsubscribeRef.current = unsubscribe;
    
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [controls, prefersReducedMotion]);

  // Set initial state immediately
  React.useLayoutEffect(() => {
    if (prefersReducedMotion) {
      controls.set({ 
        opacity: 1.0,
        textShadow: 'none'
      });
    } else {
      controls.set({ 
        opacity: 0.8,
        textShadow: '0 0 4px rgba(0, 255, 255, 0.3)'
      });
    }
  }, [controls, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        className="text-white/80 text-xs font-mono"
        style={{ 
          zIndex: 155,
          willChange: isInViewport && !prefersReducedMotion ? 'opacity, text-shadow' : 'auto',
          filter: isInViewport && !prefersReducedMotion ? 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.3))' : 'none',
          position: 'relative'
        }}
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
};

const MissionAtomic = () => {
  // 🚨 CRASH FIX: Simplified state management
  const isMountedRef = useRef(true);
  const containerRef = useRef(null);
  
  // 🚨 MA-4: Enhanced timer tracking for all component timers
  const timersRef = useRef([]);
  const intervalsRef = useRef([]);
  const animationFramesRef = useRef([]);
  
  // 🎯 UNIFIED MOBILE DETECTION
  const { isMobile, isHydrated } = useUnifiedMobile();
  
  // 🚨 CRASH FIX: Minimal state - no complex observer states
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  
  // ⭐ Moon state management - SIMPLIFIED
  const [moonPhaseOverride, setMoonPhaseOverride] = useState(null);
  const [moonAnomalyMode, setMoonAnomalyMode] = useState(null);
  
  // 🚨 CRASH FIX: Simple visibility detection
  const { isVisible, hasBeenInView } = useSimpleVisibility(containerRef);
  
  const shouldLoadMoon = useMoonViewportLoading();
  
  // 🚨 MA-4: Enhanced timer management utility functions
  const addTimer = useCallback((timerId) => {
    if (isMountedRef.current) {
      timersRef.current.push(timerId);
    }
    return timerId;
  }, []);

  const addInterval = useCallback((intervalId) => {
    if (isMountedRef.current) {
      intervalsRef.current.push(intervalId);
    }
    return intervalId;
  }, []);

  const addAnimationFrame = useCallback((frameId) => {
    if (isMountedRef.current) {
      animationFramesRef.current.push(frameId);
    }
    return frameId;
  }, []);

  const clearAllTimers = useCallback(() => {
    // Clear all timeouts
    timersRef.current.forEach(timerId => {
      try {
        clearTimeout(timerId);
      } catch (error) {
        console.warn('[MA-4] Timer cleanup failed:', error);
      }
    });
    timersRef.current = [];

    // Clear all intervals
    intervalsRef.current.forEach(intervalId => {
      try {
        clearInterval(intervalId);
      } catch (error) {
        console.warn('[MA-4] Interval cleanup failed:', error);
      }
    });
    intervalsRef.current = [];

    // Clear all animation frames
    animationFramesRef.current.forEach(frameId => {
      try {
        cancelAnimationFrame(frameId);
      } catch (error) {
        console.warn('[MA-4] Animation frame cleanup failed:', error);
      }
    });
    animationFramesRef.current = [];
  }, []);
  
  // 🚨 CRASH FIX: SINGLE, SIMPLE EFFECT - No mega-consolidation
  useEffect(() => {
    if (!isHydrated) return;
    
    let cleanup = [];
    
    // 1. Motion preference detection
    try {
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery) {
          setPrefersReducedMotion(mediaQuery.matches);
          
          const handleChange = (e) => {
            if (isMountedRef.current) setPrefersReducedMotion(e.matches);
          };
          
          if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            cleanup.push(() => mediaQuery.removeEventListener('change', handleChange));
          }
        }
      }
    } catch (error) {
      console.warn('Motion preference setup failed:', error);
    }
    
    // 2. Background image loading - SIMPLIFIED with MA-4 timer tracking
    const imageSrc = getBackgroundImageSrc(isMobile);
    if (imageSrc) {
      setImageUrl(imageSrc);
      
      const img = new Image();
      img.onload = () => {
        if (isMountedRef.current) setBackgroundLoaded(true);
      };
      img.onerror = () => {
        if (isMountedRef.current) setBackgroundLoaded(false);
      };
      img.src = imageSrc;
      
      // 🚨 MA-4: Enhanced image loading timeout with timer tracking
      const imageTimeout = addTimer(setTimeout(() => {
        if (isMountedRef.current && !backgroundLoaded) {
          console.warn('[MA-4] Background image loading timeout');
          setBackgroundLoaded(false);
        }
      }, 10000)); // 10 second timeout
      
      cleanup.push(() => {
        img.src = '';
        img.onload = null;
        img.onerror = null;
        clearTimeout(imageTimeout);
      });
    }
    
    return () => {
      isMountedRef.current = false;
      
      // 🚨 MA-4: Clear all tracked timers on cleanup
      clearAllTimers();
      
      cleanup.forEach(fn => {
        try {
          fn();
        } catch (error) {
          console.warn('Cleanup failed:', error);
        }
      });
    };
  }, [isMobile, isHydrated, addTimer, clearAllTimers, backgroundLoaded]);

  // ⭐ Mission Control Board handlers - SIMPLIFIED with MA-4 guards
  const handleMissionControlPhaseChange = useCallback((phase) => {
    if (!isMountedRef.current) return;
    
    // 🚨 MA-4: Add debounce timer with tracking
    const debounceTimer = addTimer(setTimeout(() => {
      if (isMountedRef.current) {
        setMoonPhaseOverride(phase);
      }
    }, 100));
    
  }, [addTimer]);
  
  const handleMissionControlAnomalyChange = useCallback((anomalyMode) => {
    if (!isMountedRef.current) return;
    
    // 🚨 MA-4: Add debounce timer with tracking
    const debounceTimer = addTimer(setTimeout(() => {
      if (isMountedRef.current) {
        setMoonAnomalyMode(anomalyMode);
      }
    }, 100));
    
  }, [addTimer]);

  // Self-contained mission points data
  const MISSION_POINTS = [
    {
      id: "01",
      title: "Intelligence with memory",
      description: "Our systems don't just execute—they learn, evolve, and genuinely understand you."
    },
    {
      id: "02", 
      title: "Judgment with humanity",
      description: "Every interface we craft keeps the human in command—enhancing, not replacing, your intuition."
    },
    {
      id: "03",
      title: "Innovation with conscience", 
      description: "We fuse ethical clarity into code and design—because responsible AI isn't optional, it's foundational."
    }
  ];

  // Animation variants (respecting reduced motion preference)
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const missionPointVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.2,
        duration: prefersReducedMotion ? 0.1 : 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full bg-curious-dark-900 overflow-hidden"
      style={{ 
        minHeight: '195vh',
        paddingBottom: '8rem',
        marginTop: '-15vh',
        paddingTop: 'calc(6rem + 15vh)',
        // 🚨 MOBILE-ONLY FIX: Disable complex mask gradients on mobile to prevent iOS WebKit crashes
        ...(isMobile ? {
          // Mobile: Simple opacity-based masking
          opacity: 0.95,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.8) 35%, black 45%, black 55%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 85%, transparent 100%)'
        } : {
          // Desktop: Keep original complex mask gradients
          mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.8) 35%, black 45%, black 55%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 85%, transparent 100%)',
          WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.8) 35%, black 45%, black 55%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 85%, transparent 100%)'
        }),
        contain: 'layout style',
        position: 'relative'
      }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      {/* 🎯 BACKGROUND LAYERS - Simplified Progressive Loading */}
      
      {/* Layer 1: Instant Fallback Gradient */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #000814 0%, #001d3d 25%, #003566 50%, #0353a4 75%, #023e7d 100%)',
          zIndex: 15
        }}
      />
      
      {/* Layer 2: Progressive Background - Only if loaded */}
      {backgroundLoaded && imageUrl && (
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: isMobile ? 'center 30%' : 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed',
            opacity: 1.0,
            zIndex: 20,
            willChange: 'opacity'
          }}
        />
      )}
      
      {/* Layer 3: Content Overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'rgba(0, 8, 20, 0.1)',
          zIndex: 25
        }}
      />

      {/* Main content wrapper */}
      <div className="relative w-full h-full opacity-100" style={{ zIndex: 50 }}>
        {/* Right Section with Numbered Mission Points */}
        <div className={`${isMobile ? 'px-6' : 'md:ml-[45%] md:mr-[5%] pr-4 md:pr-8'} flex flex-col space-y-16 md:space-y-32 mt-16 md:mt-24`}>
          {MISSION_POINTS.map((point, index) => (
            <motion.div 
              key={point.id}
              className="grid grid-cols-12 items-center gap-4 group cursor-pointer relative"
              style={{ zIndex: 60 }}
              custom={index}
              variants={missionPointVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Hover background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-lime-400/5 via-emerald-500/5 to-cyan-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm -z-10" />
              <div className="absolute inset-0 border border-lime-400/10 rounded-xl opacity-0 group-hover:opacity-100 group-hover:border-lime-400/30 transition-all duration-500 -z-10" />
              
              {/* For odd indices (or all on mobile) */}
              {(index % 2 === 0 && !isMobile) ? (
                <>
                  <div className="col-span-7 col-start-1 pr-4 relative z-10">
                    <div className="text-right transform group-hover:translate-x-[-8px] transition-transform duration-300">
                      <h3 className="text-white text-xl md:text-2xl mb-2 group-hover:text-lime-400 transition-colors duration-300 relative">
                        {point.title}
                        <div className="absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-lime-400 to-emerald-500 w-0 group-hover:w-full transition-all duration-500" />
                      </h3>
                      <p className="text-white/70 text-xs md:text-sm group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-5 col-start-8 pl-4 relative z-10">
                    <div className="text-white text-[80px] md:text-[120px] font-light opacity-90 group-hover:opacity-100 group-hover:text-lime-400 transition-all duration-300 transform group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(132,204,22,0.6)]">
                      {point.id}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {!isMobile && (
                    <div className="col-span-5 col-start-1 pr-4 relative z-10">
                      <div className="text-white text-[80px] md:text-[120px] font-light opacity-90 text-right group-hover:opacity-100 group-hover:text-lime-400 transition-all duration-300 transform group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(132,204,22,0.6)]">
                        {point.id}
                      </div>
                    </div>
                  )}
                  <div className={`${isMobile ? 'col-span-12' : 'col-span-7 col-start-6'} pl-4 relative z-10`}>
                    {isMobile && (
                      <div className="text-white text-[60px] font-light opacity-90 mb-2 group-hover:opacity-100 group-hover:text-lime-400 transition-all duration-300 transform group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(132,204,22,0.6)]">
                        {point.id}
                      </div>
                    )}
                    <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                      <h3 className="text-white text-xl md:text-2xl mb-2 group-hover:text-lime-400 transition-colors duration-300 relative">
                        {point.title}
                        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-lime-400 to-emerald-500 w-0 group-hover:w-full transition-all duration-500" />
                      </h3>
                      <p className="text-white/70 text-xs md:text-sm group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </>
              )}
              
              {/* Hover particles effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-4 left-8 w-1 h-1 bg-lime-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
                <div className="absolute top-12 right-12 w-1 h-1 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                <div className="absolute bottom-8 left-16 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Eclipse/Circle with Mission Statement */}
      <motion.div 
        className={`absolute ${isMobile ? 'top-[40vh] left-1/2 -translate-x-1/2' : 'top-[40vh] left-4 md:left-16'}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{
          duration: prefersReducedMotion ? 0.1 : 0.6,
          ease: "easeOut"
        }}
        style={{ zIndex: 35 }}
      >
        {/* Cosmic background effects */}
        <div 
          className="absolute w-[600px] h-[400px] md:w-[700px] md:h-[460px]"
          style={{
            background: 'radial-gradient(circle at 0% 100%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            filter: 'blur(30px)',
            transform: 'translate(-30%, 30%)'
          }}
        />

        {/* 🚨 CRASH FIX: SIMPLIFIED MOON - No complex canvas mounting logic */}
        <div className="relative flex items-center justify-center transform -translate-x-4 -translate-y-4" data-moon-section>
          {/* Moon Container - Restored to original positioning */}
          <div className="w-[700px] h-[700px] md:w-[780px] md:h-[780px]" style={{ zIndex: 37 }}>
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-[280px] h-[280px] rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center">
                  <div className="text-white/60 text-sm">Loading Moon...</div>
                </div>
              </div>
            }>
              {/* 🚨 LAZY LOADING: Only load moon when scrolled into viewport */}
              {isHydrated && typeof window !== 'undefined' && shouldLoadMoon && (
                <MoonSphereProxy 
                  className="w-[400px] h-[400px]" 
                  debugPhase={moonPhaseOverride}
                  anomalyMode={moonAnomalyMode}
                />
              )}
            </Suspense>
          </div>
          
          {/* Text content container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-[2%] left-[8%] z-20 text-left max-w-[460px] p-6 rounded-lg backdrop-blur-sm bg-black/10"
            style={{ zIndex: 38 }}
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="uppercase tracking-widest text-sm text-white/60 mb-1 font-medium"
            >
              <span className="inline-block mr-1 transform rotate-45">↑</span> our mission
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="text-4xl font-light mb-3 tracking-wide"
            >
              Human-first AI
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="text-sm text-white/90 leading-relaxed max-w-[400px]"
            >
              We are building responsible, ethical systems for a future where technology aligns with human well-being.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Metadata text - right side of the circle */}
      {!isMobile && (
        <div 
          className="absolute bottom-[calc(45%+48vh)] left-[44rem]"
          style={{ zIndex: 39 }}
        >
          <NeonArcAnimation prefersReducedMotion={prefersReducedMotion}>
            limbo<br />
            {'}'}
            <div className="mt-6">
              this is not<br />
              a hobby<br />
              it is a mission;
            </div>
            <div className="mt-6">
              {'})'}
              <br />
              humanly digital
              <br />
              ------------
            </div>
          </NeonArcAnimation>
        </div>
      )}
      
      {/* New era badge */}
      <motion.div 
        className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-white/90 flex items-center px-3 py-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ zIndex: 40 }}
      >
        <div className="mr-3 flex space-x-1">
          <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs">⊕</span>
          <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs">⊕</span>
          <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs">⊖</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-light">new era</span>
          <span className="text-xs ml-8">01</span>
        </div>
      </motion.div>
      
      {/* Heart icon */}
      <div className="absolute top-8 left-8 z-20" style={{ zIndex: 41 }}>
        <span className="text-white/70 text-xl">♡</span>
      </div>
      
      {/* Decorative slashes */}
      <div className="absolute top-8 right-[30%] z-20 text-white/50 font-light" style={{ zIndex: 42 }}>
        //<br/>//<br/>//
      </div>

      {/* Mission Control Command Board */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 w-full pb-[32vh]"
        style={{ zIndex: 45 }}
      >
        <Suspense fallback={
          <div className="w-full flex items-center justify-center mx-2 md:mx-4" style={{ height: '33vh', minHeight: '270px', maxHeight: '400px' }}>
            <div className="w-full h-full rounded-lg bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center">
              <div className="text-white/60 text-sm font-mono">Loading Mission Control Board...</div>
            </div>
          </div>
        }>
          <MissionControlBoard 
            currentPhase={moonPhaseOverride}
            onPhaseChange={handleMissionControlPhaseChange}
            onAnomalyChange={handleMissionControlAnomalyChange}
            className="w-full"
            showSlidingControl={true}
          />
        </Suspense>
      </motion.div>

      {/* Transition art between Mission and Products */}
      <div
        className="absolute bottom-0 w-full h-[60vh] pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/images/general/transition_item1.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 70%',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6,
          zIndex: 5,
          // 🚨 MOBILE-ONLY FIX: Disable complex mask gradients on mobile
          ...(isMobile ? {
            // Mobile: Simple opacity fade
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.8) 60%, transparent 100%)'
          } : {
            // Desktop: Keep original complex mask gradients
            mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8vh, rgba(0,0,0,0.6) 15vh, rgba(0,0,0,0.9) 25vh, black 35vh, black 50vh, rgba(0,0,0,0.8) 60vh, rgba(0,0,0,0.4) 70vh, transparent 80vh)',
            WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8vh, rgba(0,0,0,0.6) 15vh, rgba(0,0,0,0.9) 25vh, black 35vh, black 50vh, rgba(0,0,0,0.8) 60vh, rgba(0,0,0,0.4) 70vh, transparent 80vh)'
          })
        }}
      />

      {/* Mission Noise Texture Layer */}
      <div 
        className="absolute bottom-0 w-full h-[60vh] pointer-events-none opacity-25 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='missionNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23missionNoise)' opacity='0.8'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
          zIndex: 6,
          // 🚨 MOBILE-ONLY FIX: Disable complex mask gradients on mobile
          ...(isMobile ? {
            // Mobile: Simple opacity fade
            opacity: 0.15
          } : {
            // Desktop: Keep original complex mask gradients
            mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 5vh, rgba(0,0,0,0.4) 12vh, rgba(0,0,0,0.8) 22vh, black 32vh)',
            WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 5vh, rgba(0,0,0,0.4) 12vh, rgba(0,0,0,0.8) 22vh, black 32vh)'
          })
        }}
      />

      {/* Additional Dissolve Layer for smoother transition */}
      <div 
        className="absolute bottom-0 w-full h-[60vh] pointer-events-none opacity-15 mix-blend-multiply"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 40%, transparent 70%)',
          zIndex: 7,
          // 🚨 MOBILE-ONLY FIX: Disable complex mask gradients on mobile
          ...(isMobile ? {
            // Mobile: Simple opacity
            opacity: 0.1
          } : {
            // Desktop: Keep original complex mask gradients
            mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10vh, rgba(0,0,0,0.7) 20vh, black 30vh)',
            WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10vh, rgba(0,0,0,0.7) 20vh, black 30vh)'
          })
        }}
      />

      {/* Smolder transition gradient for AEGIS handoff */}
      <div
        className="absolute bottom-0 w-full h-[50vh] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.3) 20%, rgba(15, 23, 42, 0.7) 60%, #0f172a 100%)',
          zIndex: 8
        }}
      />
    </motion.div>
  );
};

export default MissionAtomic; 