/**
 * 🛡️ KEEP - CRITICAL PRODUCTION COMPONENT
 * Code: MISSION-ATOMIC-001
 * Used in: v6_atomic.jsx (Main Homepage)
 * Features: Eclipse-style mission statement with numbered points and neon animations
 * Warning: DO NOT REMOVE - CORE ATOMIC MISSION SECTION
 * Bundle: Core atomic homepage bundle
 * Type: Atomic Mission Component
 * Dependencies: framer-motion, MissionControlBoard
 */

/**
 * @component MissionAtomic
 * @description Eclipse-style mission statement with numbered points
 * @version 1.0.0
 * @type atomic
 */

import React, { useState, useEffect, Suspense, lazy, useRef, useCallback } from 'react';
import {  motion, useAnimation  } from '../../FramerProvider';

// 🚀 LAZY LOAD: Convert MissionControlBoard to lazy loading for bundle optimization
const MissionControlBoard = lazy(() => import('../cosmic/MissionControlBoard'));

// 🌙 STATIC MOON: Direct import to eliminate observer conflicts
const MissionMoonWithCanvas = lazy(() => import('../../3d/components/moon/MissionMoonWithCanvas'));

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

// 🎯 SIMPLE CONTENT-FIRST LOADING - No PerformanceObserver (iOS Safe)
const useContentFirstLoading = () => {
  const [contentLoaded, setContentLoaded] = useState(false);
  
  // NO useEffect - will be handled in main component
  return { contentLoaded, setContentLoaded };
};

// Advanced Neon Arc Animation Component - NO EFFECTS
const NeonArcAnimation = ({ children, sceneStep, prefersReducedMotion = false }) => {
  const controls = useAnimation();
  
  // NO useEffect - animations will be handled in main component
  // Set base neon effect immediately
  React.useLayoutEffect(() => {
    controls.set({ 
      opacity: 1.0,
      textShadow: '0 0 8px rgba(0, 255, 255, 0.6), 0 0 16px rgba(0, 255, 255, 0.3)' 
    });
  }, [controls]);

  return (
    <div className="relative">
      <motion.div
        className="text-white/80 text-xs font-mono"
        style={{ 
          zIndex: 155,
          willChange: 'opacity, text-shadow',
          filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.3))',
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
  // 🎯 UNIFIED MOBILE DETECTION: Replace useState pattern
  const { isMobile, isHydrated } = useUnifiedMobile();
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [useSimpleEclipse, setUseSimpleEclipse] = useState(false);
  const [isHighEnd, setIsHighEnd] = useState(true);
  
  // ⭐ Moon state management
  const [moonPhaseOverride, setMoonPhaseOverride] = useState(null);
  const [moonAnomalyMode, setMoonAnomalyMode] = useState(null);
  
  // 🎯 BACKGROUND LOADING STATE - Moved to main component
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [backgroundError, setBackgroundError] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [contentLoaded, setContentLoaded] = useState(false);
  
  // 🌙 STATIC MOON: Simple ref without conflicting observer
  const moonRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  
  const controls = useAnimation();
  const moonControls = useAnimation();
  
  // ✅ SINGLE MEGA-CONSOLIDATED EFFECT - Everything in one place
  useEffect(() => {
    if (!isHydrated) return;
    
    let cleanupFunctions = [];
    
    // 1. Content Loading Timer
    const contentTimer = setTimeout(() => {
      setContentLoaded(true);
    }, 100);
    cleanupFunctions.push(() => clearTimeout(contentTimer));
    
    // 2. Background Image Loading
    const imageSrc = getBackgroundImageSrc(isMobile);
    if (imageSrc) {
      setImageUrl(imageSrc);
      
      const preloadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
          img.src = src;
          imageRef.current = img;
        });
      };
      
      const loadTimer = setTimeout(() => {
        preloadImage(imageSrc)
          .then(() => {
            setBackgroundLoaded(true);
            setBackgroundError(false);
          })
          .catch((error) => {
            console.warn(`Background image failed to load: ${error.message}`);
            setBackgroundError(true);
            setBackgroundLoaded(false);
          });
      }, 800);
      
      cleanupFunctions.push(() => {
        clearTimeout(loadTimer);
        if (imageRef.current) {
          imageRef.current = null;
        }
      });
    }
    
    // 3. Motion Preference Detection
    const setupMotionPreference = () => {
      try {
        if (!window.matchMedia || typeof window.matchMedia !== 'function') {
          setPrefersReducedMotion(false);
          return null;
        }
        
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!mediaQuery) {
          setPrefersReducedMotion(false);
          return null;
        }
        
        setPrefersReducedMotion(mediaQuery.matches);
        
        const handleChange = (e) => {
          try {
            setPrefersReducedMotion(e.matches);
          } catch (error) {
            console.warn('Motion preference change failed:', error);
          }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } catch (error) {
        console.warn('Motion preference setup failed:', error);
        setPrefersReducedMotion(false);
        return null;
      }
    };
    
    // 4. Eclipse Mode Setup
    const setupEclipseMode = () => {
      setUseSimpleEclipse(isMobile && prefersReducedMotion);
      
      // Add CSS animation for eclipse nebula effect
      let styleSheet = null;
      try {
        const eclipseStyles = `
          @keyframes eclipsePulse {
            0%, 100% { 
              opacity: 0.7; 
              transform: scale(1); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1.05); 
            }
          }
        `;

        if (typeof document !== 'undefined' && document.head) {
          styleSheet = document.createElement('style');
          styleSheet.type = 'text/css';
          styleSheet.innerText = eclipseStyles;
          document.head.appendChild(styleSheet);
        }
      } catch (error) {
        console.warn('Eclipse animation setup failed:', error);
      }
      
      return () => {
        try {
          if (styleSheet && document.head && document.head.contains(styleSheet)) {
            document.head.removeChild(styleSheet);
          }
        } catch (error) {
          console.warn('Eclipse cleanup failed:', error);
        }
      };
    };
    
    // Execute all setup functions
    const motionCleanup = setupMotionPreference();
    const eclipseCleanup = setupEclipseMode();
    
    // Collect cleanup functions
    if (motionCleanup) cleanupFunctions.push(motionCleanup);
    if (eclipseCleanup) cleanupFunctions.push(eclipseCleanup);
    
    // Single cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          console.warn('Cleanup function failed:', error);
        }
      });
    };
  }, [isMobile, isHydrated]); // ✅ MINIMAL DEPENDENCIES

  // ⭐ Enhanced: Mission Control Board phase and anomaly change handler
  const handleMissionControlPhaseChange = (phase) => {
    // Only log in development to reduce console spam
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 MISSION ATOMIC: Received phase change from Mission Control - ${phase}`);
    }
    setMoonPhaseOverride(phase);
  };
  
  // ⭐ NEW: Mission Control Board anomaly change handler
  const handleMissionControlAnomalyChange = (anomalyMode) => {
    try {
      // Store previous phase when entering eclipse mode
      if (anomalyMode === 'eclipse' && moonAnomalyMode !== 'eclipse') {
        const previousPhase = moonPhaseOverride;
        setMoonPhaseOverride(0.75); // Waning Gibbous phase value
        
        // 🎯 SAFE: Store the previous phase for restoration later
        try {
          if (typeof window !== 'undefined') {
            window.previousEclipsePhase = previousPhase;
          }
        } catch (windowError) {
          // Silent fail - not critical
        }
      }
      // Restore previous phase when exiting eclipse mode
      else if (anomalyMode !== 'eclipse' && moonAnomalyMode === 'eclipse') {
        try {
          if (typeof window !== 'undefined' && window.previousEclipsePhase !== undefined) {
            setMoonPhaseOverride(window.previousEclipsePhase);
            delete window.previousEclipsePhase;
          } else {
            setMoonPhaseOverride(null);
          }
        } catch (windowError) {
          setMoonPhaseOverride(null);
        }
      }
      
      setMoonAnomalyMode(anomalyMode);
    } catch (error) {
      // Silent fail with fallback
      try {
        setMoonAnomalyMode(anomalyMode);
      } catch (setError) {
        // Silent fail
      }
    }
  };

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
  
  const eclipseVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.6,
        ease: "easeOut"
      }
    }
  };
  
  // Enhanced debug indicator with strategy info - only show if explicitly debug=true
  const debug = typeof window !== 'undefined' && window.lazyDebug && window.lazyDebug.debug === 'true';
  const isInSafeMode = debug && !contentLoaded;
  const hasBeenInView = backgroundLoaded || backgroundError;
  const strategy = { rootMargin: '100px', priority: 'high', expectedSize: 'large' };
  const performanceTier = 'Tier 1';
  const errorRetryCount = useRef(0);

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full bg-curious-dark-900 overflow-hidden"
      style={{ 
        minHeight: '195vh', // Increased by 15vh to extend background upward
        paddingBottom: '8rem',
        marginTop: '-15vh', // Negative margin to extend background upward without moving content
        paddingTop: 'calc(6rem + 15vh)', // Adjust padding to compensate for negative margin
        mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.8) 35%, black 45%, black 55%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 85%, transparent 100%)',
        WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.8) 35%, black 45%, black 55%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 85%, transparent 100%)',
        contain: 'layout style',
        outline: '3px solid lime',
        outlineOffset: '-3px',
        position: 'relative'
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      variants={sectionVariants}
    >
      {/* 🎯 BACKGROUND LAYERS - Progressive Loading Architecture */}
      
      {/* Layer 1: Instant Fallback Gradient - Never blocks LCP */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #000814 0%, #001d3d 25%, #003566 50%, #0353a4 75%, #023e7d 100%)',
          zIndex: 15 // Increased from 1 to bring above hero mask
        }}
      />
      
      {/* Layer 2: Progressive Milkyway Background - Loads after LCP */}
      {backgroundLoaded && imageUrl && (
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover', // 🎯 MOBILE FIX: Always fill container completely
            backgroundPosition: isMobile ? 'center 30%' : 'center', // 🎯 Better mobile positioning
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed', // 🎯 CRITICAL: Fixed crashes iOS Safari
            opacity: 1.0, // Full opacity when loaded
            zIndex: 20, // Increased from 2 to bring above hero mask
            willChange: 'opacity'
          }}
        />
      )}
      
      {/* Layer 3: Error Fallback - Enhanced gradient if image fails */}
      {backgroundError && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, #001d3d 0%, #000814 40%, #000000 100%)',
            zIndex: 20 // Increased from 2 to bring above hero mask
          }}
        />
      )}
      
      {/* Layer 4: Content Overlay - Always visible */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'rgba(0, 8, 20, 0.1)', // Reduced opacity from 0.2 to 0.1 to unmute background
          zIndex: 25 // Increased from 3 to maintain hierarchy
        }}
      />

      {/* Main content wrapper - Clean z-index above all backgrounds */}
      <div className="relative w-full h-full opacity-100" style={{ zIndex: 50 }}>
        {/* 🎯 LCP PROTECTION: Priority content renders first */}
        <div style={{ willChange: 'auto', contain: 'layout' }}>
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
      </div>
      
      {/* Eclipse/Circle with Mission Statement - Moved Up 40vh */}
      <motion.div 
        className={`absolute ${isMobile ? 'top-[40vh] left-1/2 -translate-x-1/2' : 'top-[40vh] left-4 md:left-16'}`}
        variants={eclipseVariants}
        style={{ zIndex: 35 }}
      >
        {/* Cosmic background effects - Bottom left corner nebula */}
        <div 
          className="absolute w-[600px] h-[400px] md:w-[700px] md:h-[460px]"
          style={{
            background: 'radial-gradient(circle at 0% 100%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            filter: 'blur(30px)',
            transform: 'translate(-30%, 30%)'
          }}
        ></div>

        {/* Cosmic Shimmering Gradient Layer */}
        <div 
          className="absolute animate-pulse"
          style={{
            width: '80vw',
            height: '60vh',
            background: 'radial-gradient(ellipse at 50% 60%, rgba(100, 0, 150, 0.15) 0%, rgba(50, 0, 100, 0.1) 30%, rgba(255, 100, 0, 0.05) 60%, transparent 80%)',
            filter: 'blur(60px)',
            transform: 'translate(-50%, -40%)',
            zIndex: 0
          }}
        ></div>

        {/* Combined and Reshaped Engulfing Nebula */}
        <div 
          className="absolute"
          style={{
            width: '150vw', 
            height: '150vh',
            bottom: '-25vh',
            left: '-25vw',
            background: `
              radial-gradient(ellipse at 15% 85%, rgba(220,220,240,0.25) 0%, rgba(200,200,220,0.1) 30%, transparent 65%),
              radial-gradient(ellipse at center, rgba(160, 32, 240, 0.06) 0%, transparent 70%)
            `,
            filter: 'blur(90px)',
          }}
        ></div>

        {/* Translucent Padding Nebula */}
        <div 
          className="absolute"
          style={{
            width: '70vw',
            height: '90vh',
            background: 'radial-gradient(ellipse at 30% 70%, rgba(200,200,220,0.1) 0%, rgba(200,200,220,0.05) 40%, transparent 70%)',
            filter: 'blur(50px)',
            transform: 'translate(-40%, -60%) rotate(-25deg)',
            zIndex: 0
          }}
        ></div>

        {/* Additional nebula effects */}
        <div 
          className="absolute w-[400px] h-[1000px] md:w-[460px] md:h-[1200px]"
          style={{
            background: 'radial-gradient(circle at 0% 70%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 15%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            filter: 'blur(30px)',
            transform: 'translate(-30%, -70%) rotate(-15deg)'
          }}
        ></div>

        <div 
          className="absolute w-[400px] h-[400px] md:w-[460px] md:h-[460px]"
          style={{
            background: 'radial-gradient(circle at 20% 70%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 15%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            filter: 'blur(30px)',
            transform: 'translate(-20%, 10%)'
          }}
        ></div>

        {/* Main black circle - REPLACED WITH CINEMATIC MOON */}
        <div className="relative flex items-center justify-center transform -translate-x-4 -translate-y-4">
          {/* Eclipse Nebula Background - CSS only, outside of Three.js */}
          {moonAnomalyMode === 'eclipse' && (
            <div className="absolute inset-0 w-[700px] h-[700px] md:w-[780px] md:h-[780px] pointer-events-none" style={{ zIndex: 36 }}>
              {/* Main nebula layer */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 140, 0, 0.5) 0%, rgba(255, 100, 20, 0.3) 20%, rgba(200, 60, 10, 0.15) 40%, rgba(100, 30, 5, 0.08) 60%, rgba(50, 15, 2, 0.03) 80%, transparent 95%)',
                  filter: 'blur(30px)',
                  animation: 'eclipsePulse 4s ease-in-out infinite',
                  borderRadius: '50%'
                }}
              />
              
              {/* Secondary nebula layer */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 120, 40, 0.4) 0%, rgba(255, 80, 20, 0.25) 25%, rgba(180, 50, 10, 0.12) 50%, rgba(90, 25, 5, 0.06) 75%, transparent 90%)',
                  filter: 'blur(40px)',
                  animation: 'eclipsePulse 6s ease-in-out infinite reverse',
                  borderRadius: '50%'
                }}
              />
              
              {/* Outer atmospheric glow */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 100, 0, 0.2) 0%, rgba(255, 60, 0, 0.1) 30%, rgba(200, 40, 0, 0.05) 60%, rgba(100, 20, 0, 0.02) 80%, transparent 95%)',
                  filter: 'blur(60px)',
                  animation: 'eclipsePulse 8s ease-in-out infinite',
                  borderRadius: '50%',
                  transform: 'scale(1.2)'
                }}
              />
              
              {/* Inner corona effect */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 200, 100, 0.3) 0%, rgba(255, 140, 60, 0.15) 30%, rgba(255, 100, 30, 0.08) 50%, rgba(200, 80, 20, 0.04) 70%, transparent 85%)',
                  filter: 'blur(20px)',
                  animation: 'eclipsePulse 3s ease-in-out infinite',
                  borderRadius: '50%'
                }}
              />
              
              {/* Additional soft glow layer */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 160, 80, 0.15) 0%, rgba(255, 120, 40, 0.08) 35%, rgba(200, 80, 20, 0.04) 60%, transparent 80%)',
                  filter: 'blur(50px)',
                  animation: 'eclipsePulse 5s ease-in-out infinite',
                  borderRadius: '50%',
                  transform: 'scale(1.4)'
                }}
              />
            </div>
          )}
          
          {/* Moon Container - Centered on left side with PHASE 2 SSR protection */}
          <div className="absolute left-[calc(20%-200px)] top-[calc(50%-200px)] w-[400px] h-[400px] z-10">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/30"></div>
              </div>
            }>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="w-full h-full"
              >
                {/* ✅ PHASE 2: SSR-safe canvas loading with hydration guard */}
                {isHydrated && typeof window !== 'undefined' && (
                  <MissionMoonWithCanvas 
                    className="w-[400px] h-[400px]" 
                    debugPhase={moonPhaseOverride}
                    anomalyMode={moonAnomalyMode}
                  />
                )}
                {/* ✅ PHASE 2: SSR fallback - show placeholder during hydration */}
                {(!isHydrated || typeof window === 'undefined') && (
                  <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-full">
                    <div className="text-white/40 text-sm">Loading...</div>
                  </div>
                )}
              </motion.div>
            </Suspense>
          </div>
          
          {/* Text content container - MOVED TO BOTTOM LEFT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-[2%] left-[8%] z-20 text-left max-w-[460px] p-6 rounded-lg backdrop-blur-sm bg-black/10"
            style={{ zIndex: 38 }}
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="uppercase tracking-widest text-sm text-white/60 mb-1 font-medium"
            >
              <span className="inline-block mr-1 transform rotate-45">↑</span> our mission
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="text-4xl font-light mb-3 tracking-wide"
            >
              Human-first AI
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
          <NeonArcAnimation sceneStep={6}>
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
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        viewport={{ once: true }}
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

      {/* Mission Control Command Board - Full Screen Width */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true, margin: "-10%" }}
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
          mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8vh, rgba(0,0,0,0.6) 15vh, rgba(0,0,0,0.9) 25vh, black 35vh, black 50vh, rgba(0,0,0,0.8) 60vh, rgba(0,0,0,0.4) 70vh, transparent 80vh)',
          WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8vh, rgba(0,0,0,0.6) 15vh, rgba(0,0,0,0.9) 25vh, black 35vh, black 50vh, rgba(0,0,0,0.8) 60vh, rgba(0,0,0,0.4) 70vh, transparent 80vh)'
        }}
      />

      {/* Mission Noise Texture Layer - overlays the transition asset */}
      <div 
        className="absolute bottom-0 w-full h-[60vh] pointer-events-none opacity-25 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='missionNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23missionNoise)' opacity='0.8'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
          zIndex: 6,
          mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 5vh, rgba(0,0,0,0.4) 12vh, rgba(0,0,0,0.8) 22vh, black 32vh)',
          WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 5vh, rgba(0,0,0,0.4) 12vh, rgba(0,0,0,0.8) 22vh, black 32vh)'
        }}
      />

      {/* Additional Dissolve Layer for smoother transition */}
      <div 
        className="absolute bottom-0 w-full h-[60vh] pointer-events-none opacity-15 mix-blend-multiply"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 40%, transparent 70%)',
          zIndex: 7,
          mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10vh, rgba(0,0,0,0.7) 20vh, black 30vh)',
          WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10vh, rgba(0,0,0,0.7) 20vh, black 30vh)'
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

      {/* Enhanced debug indicator with strategy info - only show if explicitly debug=true */}
      {debug && !isInSafeMode && (
        <div className="fixed top-4 right-4 z-[9999] bg-gray-900/95 border border-lime-400/30 text-white text-xs p-3 rounded-lg shadow-xl">
          <div className="font-bold text-lime-400 mb-1">{componentName}</div>
          <div className="space-y-1">
            <div>Status: {hasBeenInView ? '✅ Loaded' : '⏳ Waiting'}</div>
            <div>Strategy: {strategy.rootMargin}</div>
            <div>Priority: <span className={`${strategy.priority === 'high' ? 'text-red-400' : strategy.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>{strategy.priority}</span></div>
            <div>Size: {strategy.expectedSize}</div>
            <div>Tier: {performanceTier}</div>
            {errorRetryCount.current > 0 && (
              <div className="text-yellow-400">Retries: {errorRetryCount.current}</div>
            )}
            {/* 🎯 LCP Protection Status */}
            <div className="border-t border-lime-400/20 pt-1 mt-1">
              <div className="text-lime-300 font-semibold">LCP Protection:</div>
              <div>Content: {contentLoaded ? '✅' : '⏳'}</div>
              <div>Background: {backgroundLoaded ? '✅' : '⏳'}</div>
              <div>LCP Safe: {contentLoaded ? '✅' : '⚠️'}</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MissionAtomic; 