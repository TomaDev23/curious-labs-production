/**
 * @component HeroAtomic
 * @description Self-contained hero section with planet visual and static content - 3D EARTH INTEGRATED
 * 
 * @metadata
 * @version 2.0.0
 * @author CuriousLabs
 * @legit true
 */

// ✅ KEEP - HERO ATOMIC - CRITICAL PRODUCTION COMPONENT
// 🔴 CODE: HERO-ATOMIC-001
// 🏠 STATUS: ATOMIC HOMEPAGE HERO SECTION
// 📋 USED_IN: v6_atomic.jsx (Main Homepage)
// 🧬 FEATURES: Hero section with 3D Earth, intro text, call-to-action
// ⚠️ WARNING: DO NOT REMOVE - MAIN HOMEPAGE HERO
// 📊 BUNDLE: Lazy loaded for performance (Three.js content)
// 🎯 TYPE: Homepage Hero Component
// 🌍 NEW: 3D Earth integration with React Three Fiber

import React, { useState, Suspense, lazy, useEffect, useCallback, useRef, useMemo } from 'react';
// Remove direct Canvas import - will be dynamically imported
import { useResponsive, useDeviceCapabilities, useUnifiedMobile } from '../../hooks/useBreakpoint';
import MissionControlNavbar from '../navigation/MissionControlNavbar';
import {  motion, AnimatePresence  } from '../../FramerProvider';
import { Link } from 'react-router-dom';

// Lazy imports for performance
const CanvasWrapper = lazy(() => import('./hero/CanvasWrapper'));
const HeroEarth = lazy(() => import('../../3d/components/earth/HeroEarth'));

import BackgroundLayerAtomic from './BackgroundLayerAtomic';
import HeroStageManager from './hero/HeroStageManager';

// Typewriter functionality - CLEAN IMPORTS
import { useTypewriter } from './hero/hooks/useTypewriter';
import useCoordinatedHeroLoading from './hero/hooks/useCoordinatedHeroLoading';

// Client-side only check for SSR compatibility
const isClient = typeof window !== 'undefined';

// Export metadata for LEGIT compliance
// export const metadata = {
//   id: 'hero_atomic',
//   scs: 'SCS-HERO-AEGIS',
//   type: 'atomic',
//   doc: 'contract_heroAtomic.md'
// };

const HeroAtomic = React.memo(() => {
  const [sceneStep, setSceneStep] = useState(8);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);

  // Use unified responsive hooks - FIXED: Hydration-safe mobile detection
  const { isMobile, isTablet, isDesktop, isHydrated } = useUnifiedMobile();
  const { prefersReducedMotion, performanceTier } = useDeviceCapabilities();

  // Typewriter coordination - CLEAN STATE MANAGEMENT
  const { typewriterComplete, handleTypewriterComplete } = useCoordinatedHeroLoading();
  
  // Memoize subtext to prevent recreation
  const subText = React.useMemo(() => 
    "We're building next-generation digital experiences powered by cutting-edge AI technology. Join us in shaping tomorrow's web.",
    []
  );

  // Typewriter for subtext - PERFORMANCE OPTIMIZED
  const { displayText, isComplete, start } = useTypewriter(subText, {
    speed: 40,
    delay: 800,
    onComplete: handleTypewriterComplete
  });

  // ✅ FIXED: Proper typewriter and 3D loading sequence with hydration safety
  useEffect(() => {
    // Wait for hydration to complete before applying mobile-specific logic
    if (!isHydrated) return;
    
    let typewriterTimer; // ✅ FIXED: Declare outside conditional to fix scope issue
    
    // Start typewriter on desktop, skip on mobile
    if (!isMobile) {
      typewriterTimer = setTimeout(() => {
        setShowTypewriter(true);
        start(); // Start the typewriter effect
      }, 500);
    }
    
    // Mobile: Simple delayed loading, Desktop: Keep original behavior
    const show3DTimer = isMobile 
      ? setTimeout(() => setShow3D(true), 1200) // Mobile: Simple 1.2s delay
      : setTimeout(() => setShow3D(true), 1500); // Desktop: Original timing
    
    return () => {
      if (typewriterTimer) { // ✅ FIXED: Check if timer exists before clearing
        clearTimeout(typewriterTimer);
      }
      clearTimeout(show3DTimer);
    };
  }, [isMobile, isHydrated, start]);

  // Memoized responsive classes for performance
  const responsiveClasses = React.useMemo(() => {
    return {
      container: `relative min-h-screen overflow-hidden`,
      section: `relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden ${isMobile ? 'pt-16' : 'pt-14'}`,
      planetBloom: `absolute z-[15] ${isMobile ? 'w-[450px] h-[450px]' : isTablet ? 'w-[675px] h-[675px]' : 'w-[1200px] h-[1200px]'} rounded-full blur-3xl pointer-events-none`,
      planetContainer: `absolute z-[20] ${isMobile ? 'w-[375px] h-[375px]' : isTablet ? 'w-[525px] h-[525px]' : 'w-[800px] h-[800px]'}`,
      // ✅ FIXED: Stabilized contentWrapper to prevent 0.279 CLS
      contentWrapper: `absolute z-[250] ${
        isMobile 
          ? 'bottom-[8%] left-[4%] right-[4%] max-w-none' 
          : 'bottom-[4%] left-[4%] max-w-[700px]'
      }`,
      title: `font-space font-semibold text-white leading-tight tracking-tight ${isMobile ? '' : 'whitespace-nowrap'} ${isMobile ? 'transition-opacity duration-300' : 'transition-all duration-300 group-hover:text-shadow-lg'}`,
      subtitle: `font-space text-white/85 leading-relaxed tracking-wide mb-4 ${isMobile ? 'transition-opacity duration-300' : 'transition-all duration-300 group-hover:text-white/95'}`
    };
  }, [isMobile, isTablet]);

  // Pre-calculated stable dimensions to prevent layout shifts - OPTIMIZED
  const stableDimensions = React.useMemo(() => {
    const titleFontSize = isMobile ? '1.5rem' : isTablet ? '1.875rem' : '2.25rem'; // 24px, 30px, 36px
    const titleLineHeight = isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem'; // 32px, 40px, 48px
    const subtitleFontSize = isMobile ? '0.875rem' : '1rem'; // 14px, 16px
    const subtitleLineHeight = isMobile ? '1.25rem' : '1.5rem'; // 20px, 24px
    
    const titleHeight = isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem';
    const subtitleHeight = isMobile ? '5rem' : '6rem'; // Increased for multi-line
    const ctaHeight = isMobile ? '3rem' : '2.5rem';
    const statusHeight = isMobile ? '1.5rem' : '2rem';
    const expandedContentHeight = isMobile ? '300px' : '384px';
    
    return {
      titleFontSize,
      titleLineHeight,
      subtitleFontSize,
      subtitleLineHeight,
      titleHeight,
      subtitleHeight,
      ctaHeight,
      statusHeight,
      expandedContentHeight,
      contentWidth: isMobile ? '100%' : '700px'
    };
  }, [isMobile, isTablet, isDesktop]);

  // Optimized planet positioning based on device
  const planetPosition = React.useMemo(() => {
    if (isMobile) return { top: '15%', right: '5%' };
    if (isTablet) return { top: '18%', right: '8%' };
    return { top: '10%', right: '20%' };
  }, [isMobile, isTablet]);

  // Optimized planet size - INCREASED BY +50% FOR BETTER VISUAL IMPACT
  const planetSize = React.useMemo(() => {
    if (isMobile) return '375px';     // Was 250 → +50% = 375
    if (isTablet) return '525px';     // Was 350 → +50% = 525  
    return '800px';                   // Was 600 → +25% = 750px (BIGGER)
  }, [isMobile, isTablet]);

  // Handle header toggle with performance consideration
  const handleHeaderToggle = useCallback(() => {
    setIsHeaderExpanded(!isHeaderExpanded);
  }, [isHeaderExpanded]);

  // Animation variants with reduced motion support - OPTIMIZED
  const animationVariants = React.useMemo(() => ({
    expandedContent: {
      initial: { maxHeight: 0, opacity: 0 },
      animate: { 
        maxHeight: isHeaderExpanded ? (isMobile ? 300 : 384) : 0, 
        opacity: isHeaderExpanded ? 1 : 0,
        transition: { 
          duration: prefersReducedMotion ? 0.1 : 0.5,
          ease: "easeInOut"
        }
      }
    },
    underline: {
      initial: { scaleX: 0 },
      hover: { 
        scaleX: 1,
        transition: { 
          duration: prefersReducedMotion ? 0.1 : 0.5,
          ease: "easeOut"
        }
      }
    }
  }), [isHeaderExpanded, prefersReducedMotion, isMobile]);

  return (
    <div 
      className={responsiveClasses.container}
      style={{
        background: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)'
      }}
    >
      {/* Mission Control Navbar - Now using standalone component */}
      <MissionControlNavbar />

      {/* HUD and Hero Stage Manager */}
      <HeroStageManager setSceneStep={setSceneStep} />
      
      <section className={responsiveClasses.section}>
        {/* Background layer - Loads immediately */}
        <BackgroundLayerAtomic />
        
        {/* 3D Earth with delayed entrance (1.5s after content) - MOBILE-GATED ANIMATION */}
        <AnimatePresence>
          {show3D && isClient && (
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 0 : 20, scale: isMobile ? 1 : 0.95 }} // Mobile: No scale/y animation
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: isMobile ? 0 : 20, scale: isMobile ? 1 : 0.95 }} // Mobile: No scale/y animation
              transition={{ 
                duration: isMobile ? 0.8 : 1.2, // Mobile: Faster, simpler transition
                ease: "easeInOut",
                opacity: { duration: isMobile ? 0.8 : 1.0, ease: "easeIn" },
                y: { duration: isMobile ? 0 : 1.2, ease: "easeOut" }, // Mobile: No y animation
                scale: { duration: isMobile ? 0 : 1.1, ease: "easeInOut" } // Mobile: No scale animation
              }}
              style={{
                position: 'absolute',
                ...planetPosition,
                zIndex: 20,
                width: planetSize,
                height: planetSize,
                // ✅ TILE MR-3.0 PHASE 1: Mobile-only layout anchoring
                ...(isMobile && {
                  minHeight: '360px',
                  contain: 'layout paint',
                  aspectRatio: '1 / 1',
                  overflow: 'hidden'
                }),
                // ✅ MOBILE-ONLY: Prevent transform-based layout shifts
                willChange: isMobile ? 'opacity' : 'transform, opacity'
              }}
            >
              <Suspense 
                fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="w-16 h-16 border-2 border-lime-400/30 border-t-lime-400 rounded-full animate-spin"></div>
                  </div>
                }
              >
                <CanvasWrapper
                  camera={{ 
                    position: [0, 0, 12], 
                    fov: 45 
                  }}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    background: 'transparent'
                  }}
                  gl={{ 
                    antialias: performanceTier !== 'minimal',
                    alpha: true,
                    powerPreference: 'high-performance'
                  }}
                  dpr={performanceTier === 'minimal' ? 1 : Math.min(window.devicePixelRatio, 2)}
                >
                  <HeroEarth />
                </CanvasWrapper>
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Controlled Planet Bloom - Atmospheric glow behind planet - EFFECTS TIER */}
        {show3D && (
          <div
            className={responsiveClasses.planetBloom}
            style={{
              ...planetPosition,
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.05) 0%, transparent 70%)'
            }}
          />
        )}
        
        {/* Enhanced Interactive Text content - responsive positioning - LOADS FIRST */}
        <div 
          className={responsiveClasses.contentWrapper}
          style={{
            // ✅ FIXED: Explicit dimensions to prevent layout shifts
            minHeight: isMobile ? '200px' : '250px',
            contain: 'layout style',
            willChange: 'auto'
          }}
        >
          <div className={isMobile ? 'mb-3' : 'mb-4'}>
            {/* Interactive header with hover effects - LCP OPTIMIZED */}
            <div 
              className={`group cursor-pointer mb-6 ${
                isMobile 
                  ? 'transition-opacity duration-300' // Mobile: No scale, opacity only
                  : 'transition-all duration-500 hover:scale-[1.02]' // Desktop: Keep scale effect
              }`}
              onClick={handleHeaderToggle}
              style={{
                contain: 'layout style paint',
                willChange: isMobile ? 'auto' : 'transform', // Mobile: No will-change for transform
                minHeight: stableDimensions.titleHeight,
                // ✅ MOBILE-ONLY: Prevent scale-based layout shifts
                transform: isMobile ? 'none' : undefined
              }}
            >
              <h1 
                className={`${responsiveClasses.title} hero-title-stable`}
                role="heading"
                aria-level={1}
                style={{
                  fontDisplay: 'optional',
                  contain: 'layout style',
                  priority: 'high',
                  minHeight: stableDimensions.titleHeight,
                  aspectRatio: 'auto',
                  fontSize: stableDimensions.titleFontSize,
                  lineHeight: stableDimensions.titleLineHeight,
                  fontOpticalSizing: 'auto',
                  textSizeAdjust: 'none'
                }}
              >
                We bring you a <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(132,204,22,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(132,204,22,0.8)] transition-all duration-300">universe</span> of solutions
                <span className={`inline-block ml-2 transition-transform duration-300 ${isHeaderExpanded ? 'rotate-180' : 'rotate-0'}`}>
                  <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-lime-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </h1>
              
              {/* Animated underline */}
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-lime-400/0 via-lime-400/60 to-lime-400/0 origin-left mt-2"
                variants={animationVariants.underline}
                initial="initial"
                whileHover="hover"
              />
            </div>

            {/* Collapsible expanded content with responsive layout - PROGRESSIVE LOADING */}
            <motion.div 
              className="overflow-hidden"
              variants={animationVariants.expandedContent}
              initial="initial"
              animate="animate"
              style={{
                contentVisibility: isHeaderExpanded ? 'visible' : 'auto',
                containIntrinsicSize: `auto ${stableDimensions.expandedContentHeight}`
              }}
            >
              <div className="bg-black/20 backdrop-blur-sm border border-lime-400/20 rounded-lg p-4 space-y-4">
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
                  {/* Mission Statement */}
                  <div 
                    className="group cursor-pointer p-3 rounded-lg bg-gradient-to-br from-lime-400/5 to-emerald-500/5 border border-lime-400/10 hover:border-lime-400/30 transition-all duration-300"
                    onMouseEnter={() => setActiveSection('mission')}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    <h2 className={`font-space ${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-lime-400 mb-2 flex items-center`}>
                      <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Our Mission
                    </h2>
                    <p className={`text-white/70 ${isMobile ? 'text-xs' : 'text-xs'} leading-relaxed`}>
                      Pioneering the future of digital experiences through AI-powered innovation and cutting-edge technology solutions.
                    </p>
                  </div>

                  {/* Technology Focus - Only show on larger screens or when expanded */}
                  {(!isMobile || isHeaderExpanded) && (
                    <div 
                      className="group cursor-pointer p-3 rounded-lg bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300"
                      onMouseEnter={() => setActiveSection('tech')}
                      onMouseLeave={() => setActiveSection(null)}
                    >
                      <h2 className={`font-space ${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-emerald-400 mb-2 flex items-center`}>
                        <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Technology
                      </h2>
                      <p className={`text-white/70 ${isMobile ? 'text-xs' : 'text-xs'} leading-relaxed`}>
                        Advanced AI systems, machine learning algorithms, and next-generation web technologies.
                      </p>
                    </div>
                  )}
                </div>

                {/* Quick Stats - Responsive layout */}
                <div className={`flex ${isMobile ? 'justify-around' : 'justify-between'} items-center pt-2 border-t border-lime-400/10`}>
                  <div className="text-center">
                    <div className={`text-lime-400 font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>50+</div>
                    <div className={`text-white/60 ${isMobile ? 'text-xs' : 'text-xs'}`}>Projects</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-emerald-400 font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>24/7</div>
                    <div className={`text-white/60 ${isMobile ? 'text-xs' : 'text-xs'}`}>Support</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-cyan-400 font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>99.9%</div>
                    <div className={`text-white/60 ${isMobile ? 'text-xs' : 'text-xs'}`}>Uptime</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Enhanced subheader with responsive text */}
            <div className="relative">
              {isMobile ? (
                // Mobile: Static text with fade-in to eliminate CLS
                <motion.p 
                  className={responsiveClasses.subtitle}
                  style={{
                    minHeight: stableDimensions.subtitleHeight,
                    contain: 'layout style',
                    fontSize: stableDimensions.subtitleFontSize,
                    lineHeight: stableDimensions.subtitleLineHeight,
                    textSizeAdjust: 'none'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  We're building next-generation digital experiences powered by cutting-edge AI technology. Join us in shaping tomorrow's web.
                </motion.p>
              ) : (
                // Desktop: Keep typewriter effect
                <p 
                  className={responsiveClasses.subtitle}
                  style={{
                    minHeight: stableDimensions.subtitleHeight,
                    contentVisibility: 'auto',
                    containIntrinsicSize: `auto ${stableDimensions.subtitleHeight}`,
                    contain: 'layout style',
                    fontSize: stableDimensions.subtitleFontSize,
                    lineHeight: stableDimensions.subtitleLineHeight,
                    textSizeAdjust: 'none'
                  }}
                >
                  {displayText}
                  {!isComplete && <span className="inline-block w-0.5 h-5 bg-lime-400 ml-1 animate-pulse">|</span>}
                </p>
              )}
              
              {/* Enhanced CTA with responsive layout - SHOWS AFTER TYPEWRITER OR IMMEDIATELY ON MOBILE */}
              <AnimatePresence>
                {(isComplete || isMobile) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      minHeight: stableDimensions.ctaHeight,
                      contain: 'layout style'
                    }}
                  >
                    <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-row space-x-4'} items-center justify-center mt-6`}>
                      {/* Primary CTA - Restored original design with mobile-optimized functionality */}
                      <Link
                        to="/tools"
                        className={`group/btn relative px-6 py-3 bg-gradient-to-r from-lime-400 to-emerald-500 text-curious-dark-900 font-medium rounded-full hover:shadow-lg hover:shadow-lime-400/20 transition-shadow inline-block ${
                          isMobile 
                            ? 'transition-opacity duration-300 active:opacity-75' // Mobile: No scale, opacity only
                            : 'transition-all duration-300 hover:scale-105 active:scale-98' // Desktop: Keep scale
                        }`}
                        style={{
                          willChange: isMobile ? 'auto' : 'transform',
                          transform: isMobile ? 'none' : undefined
                        }}
                      >
                        <span className="relative z-10">Explore Our Universe</span>
                      </Link>

                      {/* Secondary CTA - Restored original design with mobile-optimized functionality */}
                      <Link
                        to="/products"
                        className={`group/btn2 relative px-6 py-3 bg-transparent border border-lime-400/30 text-lime-400 font-medium rounded-full tracking-wide inline-block flex items-center gap-2 ${
                          isMobile 
                            ? 'transition-colors duration-300 active:bg-lime-400/10' // Mobile: No scale, colors only
                            : 'transition-all duration-300 hover:scale-110 active:scale-95 hover:border-lime-400/60' // Desktop: Keep scale
                        }`}
                        style={{
                          willChange: isMobile ? 'auto' : 'transform',
                          transform: isMobile ? 'none' : undefined
                        }}
                      >
                        <span className="w-2 h-2 bg-lime-400 rounded-full"></span>
                        <span className="relative z-10">System Online</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive status indicator - responsive */}
            <div 
              className={`${isMobile ? 'mt-3' : 'mt-4'} flex items-center ${isMobile ? 'justify-center' : ''} space-x-3`}
              style={{
                minHeight: stableDimensions.statusHeight,
                contentVisibility: 'auto',
                containIntrinsicSize: `auto ${stableDimensions.statusHeight}`,
                contain: 'layout style'
              }}
            >
              <div className="flex items-center space-x-2">
                <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-lime-400 rounded-full ${prefersReducedMotion ? '' : 'animate-pulse'}`}></div>
                <span className={`text-white/60 ${isMobile ? 'text-xs' : 'text-xs'} font-space`}>System Online</span>
              </div>
              
              {/* Performance indicator - hide on mobile if space is tight */}
              {(!isMobile || performanceTier !== 'minimal') && (
                <div className="flex items-center space-x-2">
                  <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-emerald-400 rounded-full ${prefersReducedMotion ? '' : 'animate-pulse'}`} style={{ animationDelay: '0.5s' }}></div>
                  <span className={`text-white/60 ${isMobile ? 'text-xs' : 'text-xs'} font-space`}>Performance: {performanceTier}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default HeroAtomic; 