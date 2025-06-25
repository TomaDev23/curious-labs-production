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
import { useResponsive, useDeviceCapabilities } from '../../hooks/useBreakpoint';
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

  // Use unified responsive hooks
  const { isMobile, isTablet, isDesktop } = useResponsive();
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

  // ✅ NEW: Content-first loading sequence
  useEffect(() => {    
    // Start typewriter effect immediately
    start();
    
    // 3D planet delays 1.5 seconds (as requested)
    const timer = setTimeout(() => {
      setShow3D(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [start]);

  // Memoized responsive classes for performance
  const responsiveClasses = React.useMemo(() => {
    return {
      container: `relative min-h-screen overflow-hidden`,
      section: `relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden ${isMobile ? 'pt-16' : 'pt-14'}`,
      planetBloom: `absolute z-[15] ${isMobile ? 'w-[450px] h-[450px]' : isTablet ? 'w-[675px] h-[675px]' : 'w-[1200px] h-[1200px]'} rounded-full blur-3xl pointer-events-none`,
      planetContainer: `absolute z-[20] ${isMobile ? 'w-[375px] h-[375px]' : isTablet ? 'w-[525px] h-[525px]' : 'w-[800px] h-[800px]'}`,
      contentWrapper: `absolute ${isMobile ? 'bottom-[8%] left-[4%] right-[4%] max-w-none' : 'bottom-[4%] left-[4%] max-w-[700px]'} z-[250]`,
      title: `font-space ${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-2xl md:text-3xl'} font-semibold text-white leading-tight tracking-tight ${isMobile ? '' : 'whitespace-nowrap'} transition-all duration-300 group-hover:text-shadow-lg`,
      subtitle: `font-space ${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-base md:text-lg'} text-white/85 leading-relaxed tracking-wide mb-4 transition-all duration-300 group-hover:text-white/95`
    };
  }, [isMobile, isTablet]);

  // Pre-calculated stable dimensions to prevent layout shifts - OPTIMIZED
  const stableDimensions = React.useMemo(() => {
    const titleHeight = isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem';
    const subtitleHeight = isMobile ? '4rem' : '5rem';
    const ctaHeight = isMobile ? '3rem' : '2.5rem';
    const statusHeight = isMobile ? '1.5rem' : '2rem';
    const expandedContentHeight = isMobile ? '300px' : '384px';
    
    return {
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
        
        {/* 3D Earth with delayed entrance (1.5s after content) - SMOOTH FADE-IN */}
        <AnimatePresence>
          {show3D && isClient && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ 
                duration: 1.2, 
                ease: "easeInOut",
                opacity: { duration: 1.0, ease: "easeIn" },
                y: { duration: 1.2, ease: "easeOut" },
                scale: { duration: 1.1, ease: "easeInOut" }
              }}
              style={{
                position: 'absolute',
                ...planetPosition,
                zIndex: 20,
                width: planetSize,
                height: planetSize
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
        <div className={responsiveClasses.contentWrapper}>
          <div className={isMobile ? 'mb-3' : 'mb-4'}>
            {/* Interactive header with hover effects - LCP OPTIMIZED */}
            <div 
              className="group cursor-pointer transition-all duration-500 hover:scale-[1.02] mb-6"
              onClick={handleHeaderToggle}
              style={{
                contain: 'layout style paint',
                willChange: 'auto',
                minHeight: stableDimensions.titleHeight
              }}
            >
              <h1 
                className={responsiveClasses.title}
                role="heading"
                aria-level={1}
                style={{
                  fontDisplay: 'swap',
                  contain: 'layout style',
                  priority: 'high',
                  minHeight: stableDimensions.titleHeight,
                  aspectRatio: 'auto'
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
              <p 
                className={responsiveClasses.subtitle}
                style={{
                  minHeight: stableDimensions.subtitleHeight,
                  contentVisibility: 'auto',
                  containIntrinsicSize: `auto ${stableDimensions.subtitleHeight}`,
                  contain: 'layout style'
                }}
              >
                {displayText}
                {!isComplete && <span className="inline-block w-0.5 h-5 bg-lime-400 ml-1 animate-pulse">|</span>}
              </p>
              
              {/* Enhanced CTA with responsive layout - SHOWS AFTER TYPEWRITER */}
              <div 
                className={`${isMobile ? 'justify-center flex-col space-y-3' : 'justify-between'} mt-4`}
                style={{
                  minHeight: stableDimensions.ctaHeight,
                  contentVisibility: typewriterComplete ? 'visible' : 'auto',
                  containIntrinsicSize: `auto ${stableDimensions.ctaHeight}`
                }}
              >
                <AnimatePresence>
                  {typewriterComplete && (
                    <motion.div 
                      className={`flex items-center ${isMobile ? 'justify-center flex-col space-y-3' : 'justify-between'}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: "easeOut"
                      }}
                    >
                      <div className={`flex items-center ${isMobile ? 'space-x-3' : 'space-x-4'}`}>
                        <Link 
                          to="/products"
                          className={`group/btn relative ${isMobile ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-sm'} bg-gradient-to-r from-lime-400 to-emerald-500 text-curious-dark-900 font-space font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-98 tracking-wide overflow-hidden inline-block`}
                          onMouseEnter={() => setActiveSection('cta')}
                          onMouseLeave={() => setActiveSection(null)}
                          aria-label="Explore our products and services"
                        >
                          <span className="relative z-10">Explore Our Universe</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-lime-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Animated particles on hover - Skip on reduced motion */}
                          {!prefersReducedMotion && (
                            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                              <div className={`absolute top-1 left-2 ${isMobile ? 'w-0.5 h-0.5' : 'w-1 h-1'} bg-white/60 rounded-full animate-ping`}></div>
                              <div className={`absolute bottom-1 right-3 ${isMobile ? 'w-0.5 h-0.5' : 'w-1 h-1'} bg-white/60 rounded-full animate-ping`} style={{ animationDelay: '0.5s' }}></div>
                            </div>
                          )}
                        </Link>

                        {/* Secondary action button - responsive size */}
                        <Link 
                          to="/blog"
                          className={`${isMobile ? 'p-1.5' : 'p-2'} border border-lime-400/30 rounded-full text-lime-400 hover:bg-lime-400/10 hover:border-lime-400/60 transition-all duration-300 hover:scale-110 active:scale-95 inline-block`}
                          aria-label="Visit our blog"
                        >
                          <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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