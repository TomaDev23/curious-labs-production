import {  motion  } from '../../FramerProvider';

/**
 * 🛡️ KEEP - CRITICAL PRODUCTION SUB-ROUTE
 * Code: OPSPIPE-001
 * Used in: /products/opspipe route
 * Features: Pipeline automation, real-time monitoring, operational control
 * Warning: DO NOT REMOVE - CORE PRODUCT SUB-ROUTE
 * Bundle: Products sub-module
 * Type: Product Page Component
 * Dependencies: MissionControlNavbar, BackgroundLayerAtomic, ScrollToTop, FooterExperience
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';
import FooterExperience from '../../components/home/v4/FooterExperience';
import LegalLink from '../../components/LegalLink';
import { useUnifiedMobile } from '../../hooks/useBreakpoint';
import { useUnifiedDeviceCapabilities } from '../../hooks/useUnifiedDeviceCapabilities';
// Phase 3: Component Breakdown - Import extracted components
import OpsPipeArchitectureDiagram from './OpsPipe/OpsPipeArchitectureDiagram';
import MissionTimeline from './OpsPipe/MissionTimeline';
import './opspipe.css'; // For custom animations

// ========== PHASE 4: ANIMATION OPTIMIZATION ==========

// Animation Performance Manager
const useAnimationOptimization = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const rafRef = useRef(null);
  const animationPoolRef = useRef(new Map());

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Consolidated RAF for all animations
  const scheduleAnimation = useCallback((callback) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      if (isVisible && !prefersReducedMotion) {
        callback();
      }
    });
  }, [isVisible, prefersReducedMotion]);

  // Animation pool for reusing instances
  const getAnimation = useCallback((key, factory) => {
    if (!animationPoolRef.current.has(key)) {
      animationPoolRef.current.set(key, factory());
    }
    return animationPoolRef.current.get(key);
  }, []);

  return {
    isVisible,
    setIsVisible,
    prefersReducedMotion,
    scheduleAnimation,
    getAnimation,
    shouldAnimate: isVisible && !prefersReducedMotion
  };
};

// Optimized Motion Component with intersection observer
const OptimizedMotion = ({ children, className, ...motionProps }) => {
  const [ref, setRef] = useState(null);
  const { isVisible, setIsVisible, shouldAnimate } = useAnimationOptimization();

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, setIsVisible]);

  // Optimized animation variants
  const optimizedVariants = useMemo(() => {
    if (!shouldAnimate) {
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 }
      };
    }
    
    return {
      initial: motionProps.initial || { opacity: 0, y: 20 },
      animate: motionProps.animate || { opacity: 1, y: 0 },
      transition: {
        duration: motionProps.transition?.duration || 0.6,
        ease: [0.25, 0.1, 0.25, 1], // Optimized cubic-bezier
        ...motionProps.transition
      }
    };
  }, [shouldAnimate, motionProps]);

  return (
    <motion.div
      ref={setRef}
      className={className}
      {...optimizedVariants}
          style={{ 
        willChange: shouldAnimate ? 'transform, opacity' : 'auto',
        transform: 'translateZ(0)', // Force GPU acceleration
        ...motionProps.style
      }}
    >
      {children}
    </motion.div>
  );
};

// Performance-aware particle system
const useOptimizedParticles = (baseCount, deviceCapabilities) => {
  return useMemo(() => {
    // Handle null deviceCapabilities
    if (!deviceCapabilities) {
      return baseCount; // Default to full count if capabilities not loaded
    }
    
    const { isMobile, isLowPerformance } = deviceCapabilities;
    
    // Reduced particle counts for better performance
    if (isLowPerformance) return Math.max(1, Math.floor(baseCount * 0.3));
    if (isMobile) return Math.max(2, Math.floor(baseCount * 0.5));
    return baseCount;
  }, [baseCount, deviceCapabilities]);
};

// Optimized animation variants with hardware acceleration
const createOptimizedVariants = (prefersReducedMotion) => {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 1, scale: 1 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0 }
    };
  }

  return {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.05
    }
  };
};


// Loading placeholder for lazy sections
const LazyLoadPlaceholder = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Intersection Observer component for lazy loading
const IntersectionComponent = ({ children, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold]);

  return (
    <div ref={setRef} className="w-full">
      {isVisible ? children : <LazyLoadPlaceholder />}
              </div>
  );
};

export default function OpsPipe() {
  const { isMobile } = useUnifiedMobile();
  const deviceCapabilities = useUnifiedDeviceCapabilities();
  const [currentTime, setCurrentTime] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  // Phase 4: Animation optimization hooks
  const { shouldAnimate, prefersReducedMotion } = useAnimationOptimization();
  
  // Phase 4: Optimized particle counts
  const particleCount = useOptimizedParticles(12, deviceCapabilities);
  const dataStreamCount = useOptimizedParticles(6, deviceCapabilities);
  const energyBeamCount = useOptimizedParticles(3, deviceCapabilities);
  
  // Phase 4: Optimized animation variants
  const optimizedVariants = useMemo(() => createOptimizedVariants(prefersReducedMotion), [prefersReducedMotion]);

  // Performance-aware animation settings with null checks
  const animationSettings = useMemo(() => ({
    reducedMotion: prefersReducedMotion || (deviceCapabilities?.isLowPerformance || false),
    particleCount,
    dataStreamCount,
    energyBeamCount,
    enableHeavyAnimations: shouldAnimate && !(deviceCapabilities?.isLowPerformance || false),
    enableGpuAcceleration: !(deviceCapabilities?.isLowPerformance || false)
  }), [prefersReducedMotion, deviceCapabilities, shouldAnimate, particleCount, dataStreamCount, energyBeamCount]);

    const updateTime = () => {
      const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      timeZone: 'UTC' 
    });
    setCurrentTime(`${timeString} UTC`);
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Helmet>
        <title>OpsPipe - Operational Automation Suite | CuriousLabs</title>
        <meta name="description" content="Enterprise-grade operational automation with real-time monitoring, intelligent workflows, and defense-grade telemetry. Transform chaos into order." />
        <meta property="og:title" content="OpsPipe - Operational Automation Suite | CuriousLabs" />
        <meta property="og:description" content="Enterprise-grade operational automation with real-time monitoring, intelligent workflows, and defense-grade telemetry. Transform chaos into order." />
        <meta property="og:image" content="/assets/images/general/Page_Logos/OpsPipe_logo.webp" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/opspipe" />
        
        {/* Logo Preloading - Critical for hero section */}
        <link rel="preload" href="/assets/images/general/Page_Logos/OpsPipe_logo.webp" as="image" />
        
        {/* Premium Font Loading - Critical for sophisticated typography */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" as="style" />
        {!isMobile && !(deviceCapabilities?.isLowPerf || false) && (
          <>
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" as="style" />
          </>
        )}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {!isMobile && !(deviceCapabilities?.isLowPerf || false) && (
          <>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          </>
        )}
        
        {/* Advanced Typography & Visual System - OpsPipe Technical Theme */}
        <style jsx="true">{`
          /* Performance-aware CSS - Load based on device capabilities */
          ${!animationSettings.reducedMotion ? `
          /* Premium Typography Stack - Technical Operations Edition */
          .font-display {
            font-family: ${isMobile ? "'Inter', system-ui, sans-serif" : "'Orbitron', 'Space Grotesk', system-ui, sans-serif"};
            font-variation-settings: 'wght' 700;
            letter-spacing: -0.025em;
            line-height: 1.1;
          }
          
          .font-technical {
            font-family: ${isMobile ? "'Inter', system-ui, sans-serif" : "'Space Grotesk', 'Inter', system-ui, sans-serif"};
            font-variation-settings: 'wght' 600;
            letter-spacing: -0.015em;
            line-height: 1.2;
          }
          ` : `
          /* Reduced motion fallbacks */
          .font-display, .font-technical {
            font-family: 'Inter', system-ui, sans-serif;
            font-weight: 600;
            line-height: 1.2;
          }
          `}
          
          .font-body {
            font-family: 'Inter', system-ui, sans-serif;
            font-variation-settings: 'wght' 400;
            line-height: 1.7;
            letter-spacing: -0.01em;
          }
          
          .font-mono {
            font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
            font-variation-settings: 'wght' 500;
            letter-spacing: 0.05em;
          }

          ${!isMobile && !(deviceCapabilities?.isLowPerf || false) ? `
          .font-operational {
            font-family: 'Orbitron', 'Space Grotesk', sans-serif;
            font-variation-settings: 'wght' 600;
            letter-spacing: 0.02em;
            line-height: 1.3;
          }
          ` : `
          .font-operational {
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            line-height: 1.3;
          }
          `}

          /* Advanced Text Effects - Complete Mobile Bypass */
          ${!isMobile && !animationSettings.reducedMotion ? `
          /* Desktop - Full text effects */
          .text-glow-blue {
            text-shadow: 
              0 0 20px rgba(59, 130, 246, 0.6),
              0 0 40px rgba(59, 130, 246, 0.4),
              0 0 60px rgba(59, 130, 246, 0.3);
          }
          
          .text-glow-cyan {
            text-shadow: 
              0 0 15px rgba(34, 211, 238, 0.5),
              0 0 30px rgba(34, 211, 238, 0.3),
              0 0 45px rgba(34, 211, 238, 0.2);
          }
          
          .text-glow-orange {
            text-shadow: 
              0 0 20px rgba(251, 146, 60, 0.5),
              0 0 40px rgba(251, 146, 60, 0.3),
              0 0 60px rgba(251, 146, 60, 0.2);
          }
          
          .text-glow-lime {
            text-shadow: 
              0 0 20px rgba(132, 204, 22, 0.5),
              0 0 40px rgba(132, 204, 22, 0.3),
              0 0 60px rgba(132, 204, 22, 0.2);
          }

          .text-glow-purple {
            text-shadow: 
              0 0 20px rgba(139, 92, 246, 0.5),
              0 0 40px rgba(139, 92, 246, 0.3),
              0 0 60px rgba(139, 92, 246, 0.2);
          }

          .text-glow-emerald {
            text-shadow: 
              0 0 20px rgba(16, 185, 129, 0.5),
              0 0 40px rgba(16, 185, 129, 0.3),
              0 0 60px rgba(16, 185, 129, 0.2);
          }

          /* Enhanced 3D text effects - Desktop only */
          .text-3d-blue {
            text-shadow: 
              1px 1px 0 rgba(59, 130, 246, 0.8),
              2px 2px 0 rgba(59, 130, 246, 0.6),
              3px 3px 0 rgba(59, 130, 246, 0.4),
              4px 4px 0 rgba(59, 130, 246, 0.2),
              5px 5px 10px rgba(0, 0, 0, 0.3);
          }

          .text-3d-orange {
            text-shadow: 
              1px 1px 0 rgba(251, 146, 60, 0.8),
              2px 2px 0 rgba(251, 146, 60, 0.6),
              3px 3px 0 rgba(251, 146, 60, 0.4),
              4px 4px 0 rgba(251, 146, 60, 0.2),
              5px 5px 10px rgba(0, 0, 0, 0.3);
          }

          /* Advanced Gradient Text Effects - Desktop only */
          .gradient-text-operational {
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 25%, #84cc16 50%, #fb923c 75%, #8b5cf6 100%);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientShift 8s ease infinite;
          }
          
          .gradient-text-premium {
            background: linear-gradient(135deg, #fb923c 0%, #f59e0b 25%, #3b82f6 50%, #06b6d4 75%, #84cc16 100%);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientShift 12s ease infinite;
          }

          .gradient-text-technical {
            background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientShift 6s ease infinite;
          }

          /* Sophisticated Animations - Desktop only */
          .float-technical {
            animation: floatTechnical 6s ease-in-out infinite;
          }
          
          @keyframes floatTechnical {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-12px) rotate(1deg); }
            66% { transform: translateY(-6px) rotate(-0.5deg); }
          }
          
          .gradient-shift {
            background-size: 400% 400%;
            animation: gradientShift 8s ease infinite;
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          ` : `
          /* Mobile - Simplified effects with no expensive operations */
          .text-glow-blue, .text-glow-cyan, .text-glow-orange, 
          .text-glow-lime, .text-glow-purple, .text-glow-emerald {
            text-shadow: none;
          }

          .text-3d-blue, .text-3d-orange {
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          }

          /* Static gradient text - no animation */
          .gradient-text-operational, .gradient-text-premium, .gradient-text-technical {
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #84cc16 100%);
            background-size: 100% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: none;
          }

          /* Disable animations */
          .float-technical {
            animation: none;
          }
          
          .gradient-shift {
            animation: none;
          }
          `}
          
          .text-shadow-soft {
            text-shadow: ${isMobile ? '0 1px 2px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.3)'};
          }

          .text-shadow-technical {
            text-shadow: ${isMobile ? '0 1px 2px rgba(0, 0, 0, 0.1)' : '0 2px 8px rgba(59, 130, 246, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)'};
          }

          /* Backdrop-blur mobile optimization */
          .backdrop-blur-2xl {
            backdrop-filter: ${isMobile ? 'none' : 'blur(40px)'};
            background: ${isMobile ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.4)'};
          }

          .backdrop-blur-xl {
            backdrop-filter: ${isMobile ? 'none' : 'blur(24px)'};
            background: ${isMobile ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.3)'};
          }

          .backdrop-blur-md {
            backdrop-filter: ${isMobile ? 'none' : 'blur(12px)'};
            background: ${isMobile ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)'};
          }

          .backdrop-blur-sm {
            backdrop-filter: ${isMobile ? 'none' : 'blur(4px)'};
            background: ${isMobile ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'};
          }

          /* Enhanced Typography Hierarchy */
          .hero-title {
            font-family: 'Orbitron', serif;
            font-weight: 800;
            font-size: clamp(3rem, 8vw, 6rem);
            line-height: 0.9;
            letter-spacing: -0.03em;
          }
          
          .hero-subtitle {
            font-family: 'Inter', sans-serif;
            font-weight: 300;
            font-size: clamp(1.25rem, 3vw, 2rem);
            line-height: 1.4;
            letter-spacing: -0.01em;
          }
          
          .section-title {
            font-family: 'Orbitron', serif;
            font-weight: 700;
            font-size: clamp(2rem, 5vw, 3.5rem);
            line-height: 1.1;
            letter-spacing: -0.02em;
          }

          .section-subtitle {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 600;
            font-size: clamp(1.5rem, 4vw, 2.25rem);
            line-height: 1.2;
            letter-spacing: -0.015em;
          }
          
          .feature-title {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 600;
            font-size: clamp(1.25rem, 3vw, 1.75rem);
            line-height: 1.3;
            letter-spacing: -0.01em;
          }

          .body-large {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            font-size: clamp(1rem, 2.5vw, 1.25rem);
            line-height: 1.7;
            letter-spacing: -0.01em;
          }
          
          .body-technical {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            font-size: clamp(0.9rem, 2vw, 1.1rem);
            line-height: 1.8;
            letter-spacing: 0.01em;
          }

          .caption-technical {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
            font-size: clamp(0.75rem, 1.5vw, 0.875rem);
            line-height: 1.4;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }

          /* Advanced Hover States */
          .hover-lift-technical {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .hover-lift-technical:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 
              0 25px 50px -12px rgba(59, 130, 246, 0.25),
              0 0 60px rgba(59, 130, 246, 0.15);
          }

          .hover-glow-operational {
            transition: all 0.4s ease;
          }
          
          .hover-glow-operational:hover {
            text-shadow: 
              0 0 20px rgba(59, 130, 246, 0.8),
              0 0 40px rgba(59, 130, 246, 0.6),
              0 0 60px rgba(59, 130, 246, 0.4);
          }

          /* Color Palette Extensions */
          .bg-operational-primary {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%);
          }

          .bg-operational-secondary {
            background: linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
          }

          .bg-operational-premium {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
          }

          .border-operational-primary {
            border-color: rgba(59, 130, 246, 0.3);
          }

          .border-operational-secondary {
            border-color: rgba(251, 146, 60, 0.3);
          }

          .border-operational-accent {
            border-color: rgba(132, 204, 22, 0.3);
          }

          .border-operational-premium {
            border-color: rgba(139, 92, 246, 0.3);
          }

          /* Mobile Typography Improvements */
          @media (max-width: 768px) {
            .hero-title {
              font-size: clamp(2.5rem, 12vw, 4rem) !important;
              line-height: 1.0 !important;
            }
            
            .hero-subtitle {
              font-size: clamp(1.1rem, 4vw, 1.5rem) !important;
              line-height: 1.3 !important;
            }
            
            .section-title {
              font-size: clamp(1.75rem, 8vw, 2.5rem) !important;
              line-height: 1.1 !important;
            }
            
            .section-subtitle {
              font-size: clamp(1.25rem, 6vw, 1.75rem) !important;
              line-height: 1.2 !important;
            }
            
            .feature-title {
              font-size: clamp(1.1rem, 5vw, 1.5rem) !important;
              line-height: 1.3 !important;
            }
            
            .body-large {
              font-size: clamp(0.95rem, 3vw, 1.1rem) !important;
              line-height: 1.6 !important;
            }
            
            .body-technical {
              font-size: clamp(0.85rem, 2.5vw, 1rem) !important;
              line-height: 1.7 !important;
            }
            
            /* Mobile text effects optimization */
            .text-glow-blue, .text-glow-cyan, .text-glow-orange, .text-glow-lime, .text-glow-purple, .text-glow-emerald {
              text-shadow: 0 0 10px rgba(59, 130, 246, 0.4) !important;
            }
            
            /* Mobile spacing fixes */
            section {
              padding: 2rem 1rem !important;
            }
            
            .mobile-hero { 
              min-height: 100vh !important; 
              padding: 5rem 1rem 3rem 1rem !important;
            }
            
            .mobile-section { 
              min-height: auto !important; 
              padding: 3rem 1rem !important; 
            }

            .mobile-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            
            .mobile-flex {
              flex-direction: column !important;
              gap: 1rem !important;
            }
            
            .mobile-card {
              padding: 1.5rem !important;
              margin-bottom: 1rem !important;
            }
            
            /* Mobile Button Fixes */
            .mobile-button {
              width: 100% !important;
              padding: 0.75rem 1.5rem !important;
              font-size: 0.9rem !important;
            }
          }
          
          /* Tablet Responsive */
          @media (min-width: 769px) and (max-width: 1024px) {
            .hero-title {
              font-size: clamp(3rem, 8vw, 5rem) !important;
            }
            
            .hero-subtitle {
              font-size: clamp(1.2rem, 3vw, 1.8rem) !important;
            }
            
            .tablet-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }

          /* Performance Optimizations */
          * {
            will-change: auto;
          }
          
          .motion-reduce-compatible {
            transform: translateZ(0);
            backface-visibility: hidden;
          }

          /* Advanced Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #06b6d4);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #2563eb, #0891b2);
          }

          /* Holographic text effects */
          ${!animationSettings.reducedMotion ? `
          .text-holographic {
            background: linear-gradient(45deg, #3b82f6, #06b6d4, #84cc16, #fb923c, #8b5cf6);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: holographicShift 3s ease-in-out infinite;
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
          }

          @keyframes holographicShift {
            0%, 100% { 
              background-position: 0% 50%;
              filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
            }
            25% { 
              background-position: 100% 50%;
              filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.5));
            }
            50% { 
              background-position: 50% 0%;
              filter: drop-shadow(0 0 10px rgba(132, 204, 22, 0.5));
            }
            75% { 
              background-position: 50% 100%;
              filter: drop-shadow(0 0 10px rgba(251, 146, 60, 0.5));
            }
          }
          ` : `
          .text-holographic {
            color: #3b82f6;
          }
          `}

          /* Enhanced glitch effects - Performance conditional */
          ${!animationSettings.reducedMotion && !isMobile ? `
          .text-glitch {
            position: relative;
            animation: glitch 2s infinite;
          }

          .text-glitch::before,
          .text-glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .text-glitch::before {
            animation: glitch-1 0.5s infinite;
            color: #ff0000;
            z-index: -1;
          }

          .text-glitch::after {
            animation: glitch-2 0.5s infinite;
            color: #00ff00;
            z-index: -2;
          }

          @keyframes glitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
          }

          @keyframes glitch-1 {
            0%, 100% { transform: translate(0); }
            10% { transform: translate(-2px, -2px); }
            20% { transform: translate(2px, 2px); }
            30% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -2px); }
          }

          @keyframes glitch-2 {
            0%, 100% { transform: translate(0); }
            10% { transform: translate(2px, 2px); }
            20% { transform: translate(-2px, -2px); }
            30% { transform: translate(2px, -2px); }
            40% { transform: translate(-2px, 2px); }
          }
          ` : ''}
        `}</style>
      </Helmet>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* Mission Control Navbar */}
      <MissionControlNavbar />
      
      {/* Enhanced Atmospheric System - Mobile Bypass */}
      {(() => {
        // Complete mobile bypass for atmospheric system
        if (deviceCapabilities?.isMobile) return null;
        
        return (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Primary operational gradient orbs with enhanced movement */}
            <motion.div 
              className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-transparent rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-bl from-orange-500/25 via-amber-500/20 to-transparent rounded-full blur-3xl"
              animate={{ 
                scale: [1.1, 0.9, 1.1],
                opacity: [0.4, 0.7, 0.4],
                x: [0, -40, 0],
                y: [0, 40, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-lime-500/10 via-emerald-500/5 to-transparent rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Enhanced secondary atmospheric layers */}
            <motion.div 
              className="absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-to-tr from-purple-500/15 via-violet-500/10 to-transparent rounded-full blur-2xl"
              animate={{ 
                scale: [0.8, 1.3, 0.8],
                opacity: [0.2, 0.5, 0.2],
                x: [0, 30, 0],
                y: [0, -50, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
            <motion.div 
              className="absolute top-1/6 right-1/3 w-72 h-72 bg-gradient-to-bl from-cyan-500/20 via-teal-500/15 to-transparent rounded-full blur-3xl"
              animate={{ 
                scale: [1.2, 0.7, 1.2],
                opacity: [0.3, 0.6, 0.3],
                x: [0, -60, 0],
                y: [0, 20, 0]
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Advanced particle system - operational icons */}
            {Array.from({ length: animationSettings.particleCount }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-blue-500/20 text-lg"
                style={{
                  left: `${10 + i * 7}%`,
                  top: `${15 + (i % 5) * 15}%`
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0.3, 1.2, 0.3],
                  rotate: [0, 360, 0]
                }}
                transition={{
                  duration: 10 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 1.2,
                  ease: "easeInOut"
                }}
              >
                {['⚙️', '🔧', '📊', '⚡', '🔗', '💾', '🛡️', '🎯', '🚀', '📡', '⚗️', '🔬'][i]}
              </motion.div>
            ))}

            {/* Floating data streams */}
            {Array.from({ length: animationSettings.dataStreamCount }).map((_, i) => (
              <motion.div
                key={`stream-${i}`}
                className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${10 + i * 10}%`
                }}
                animate={{
                  y: [0, 200, 400],
                  opacity: [0, 0.8, 0],
                  scaleY: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "linear"
                }}
              />
            ))}

            {/* Pulsing grid overlay */}
            <motion.div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
              animate={{
                opacity: [0.03, 0.08, 0.03]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Dynamic energy beams */}
            {Array.from({ length: animationSettings.energyBeamCount }).map((_, i) => (
              <motion.div
                key={`beam-${i}`}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
                style={{
                  top: `${30 + i * 20}%`,
                  transform: 'rotate(-15deg)'
                }}
                animate={{
                  x: ['-100%', '200%'],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        );
      })()}

      <main className="relative z-20 pt-20 pb-16">
        {/* Enhanced Hero Section */}
        <section id="overview" className="max-w-7xl mx-auto px-4 py-16 mobile-hero">
          {/* Status Panel */}
          <OptimizedMotion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="backdrop-blur-2xl bg-operational-primary border border-operational-primary rounded-xl p-6 shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between mb-4 mobile-flex">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="font-mono caption-technical text-blue-400 text-glow-blue">OPS-002</span>
                  <span className="font-technical text-cyan-400 text-glow-cyan">OPERATIONAL AUTOMATION SUITE</span>
                </div>
                <div className="flex items-center space-x-4 mobile-flex">
                  <div className="text-center">
                    <div className="caption-technical text-orange-400 text-glow-orange">MISSION TIME</div>
                    <div className="font-mono text-white">{currentTime}</div>
                  </div>
                  <div className="text-center">
                    <div className="caption-technical text-lime-400 text-glow-lime">STATUS</div>
                    <div className="font-technical text-emerald-400 text-glow-emerald">ACTIVE</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mobile-grid">
                {[
                  { label: "PIPELINES", value: "47", status: "OPERATIONAL", color: "blue" },
                  { label: "AGENTS", value: "12", status: "ACTIVE", color: "cyan" },
                  { label: "THROUGHPUT", value: "1.2K/s", status: "OPTIMAL", color: "lime" },
                  { label: "UPTIME", value: "99.97%", status: "EXCELLENT", color: "emerald" }
                ].map((metric, index) => (
                  <div key={index} className={`text-center p-3 rounded-lg bg-${metric.color}-400/10 border border-${metric.color}-400/20 mobile-card`}>
                    <div className={`caption-technical text-${metric.color}-400 text-glow-${metric.color}`}>{metric.label}</div>
                    <div className={`font-technical text-xl text-white text-glow-${metric.color}`}>{metric.value}</div>
                    <div className={`text-xs text-${metric.color}-300`}>{metric.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </OptimizedMotion>

          {/* Hero Content */}
          <div className="text-center space-y-8">
            <OptimizedMotion
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="hero-title gradient-text-operational text-glow-blue hover-glow-operational">
                OpsPipe
              </h1>
              <div className="hero-subtitle text-white/90 text-shadow-technical max-w-4xl mx-auto mt-6">
                Enterprise-grade <span className="gradient-text-technical text-glow-cyan">operational automation</span> that transforms chaos into <span className="gradient-text-premium text-glow-orange">orchestrated precision</span>. Real-time monitoring, intelligent workflows, and defense-grade telemetry.
              </div>
            </OptimizedMotion>

            <OptimizedMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-6 mobile-flex"
            >
              <Link
                to="/contact"
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-technical py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20 text-glow-blue mobile-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Deploy OpsPipe
              </Link>
              <Link
                to="#architecture"
                className="inline-flex items-center bg-operational-secondary border border-operational-secondary text-orange-400 font-technical py-4 px-8 rounded-lg transition-all duration-300 hover:border-orange-400/50 hover:bg-orange-400/10 text-glow-orange mobile-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Explore Architecture
              </Link>
            </OptimizedMotion>
          </div>
        </section>
        
        {/* Product Description */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <OptimizedMotion
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-400"></div>
                <span className="text-blue-400 font-mono text-sm tracking-wider">MISSION BRIEF</span>
                </div>
                
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Transform Chaos into 
                <span className="block text-blue-400 gradient-blue-cyan text-glow-blue">Order</span>
                </h2>
                
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                OpsPipe is the enterprise-grade solution for automating, monitoring, and optimizing your operational processes. 
                Built with flexibility in mind, OpsPipe integrates seamlessly with your existing infrastructure while providing 
                the tools you need to scale efficiently.
              </p>
                
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Whether you're managing complex deployments, monitoring system health, or orchestrating multi-stage workflows, 
                you're experiencing the power of OpsPipe's intelligent automation working behind the scenes.
              </p>

              {/* Mission Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Uptime", value: "99.9%", icon: "⚡" },
                  { label: "Response", value: "<50ms", icon: "🚀" },
                  { label: "Accuracy", value: "99.7%", icon: "🎯" },
                  { label: "Scale", value: "∞", icon: "📈" }
                ].map((stat, index) => (
                  <div key={index} className="bg-black/20 backdrop-blur-sm border border-blue-400/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{stat.icon}</span>
                      <span className="text-blue-400 text-sm font-mono">{stat.label}</span>
                </div>
                    <div className="text-white font-bold text-xl">{stat.value}</div>
              </div>
                ))}
              </div>
            </OptimizedMotion>
            
            <OptimizedMotion
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-black/40 backdrop-blur-md border border-blue-400/30 rounded-2xl p-8 relative overflow-hidden">
                {/* Enhanced background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-32 h-32 border border-blue-400/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 right-4 w-24 h-24 border border-blue-400/30 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-cyan-400/20 rounded-full animate-pulse delay-500"></div>
                  </div>
                  
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-blue-500/8 via-cyan-500/4 to-transparent rounded-2xl"></div>
                
                <div className="relative z-10 text-center">
                  {/* Enhanced OpsPipe visualization */}
                  <OptimizedMotion
                    className="inline-block mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  >
                    <OptimizedMotion
                      className="relative w-28 h-28 mx-auto"
                      whileHover={{ 
                        scale: 1.1,
                        filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-full border border-blue-400/30 flex items-center justify-center">
                        <img
                          src="/assets/images/general/Page_Logos/OpsPipe_logo.webp"
                          alt="OpsPipe Logo"
                          className="w-20 h-20 object-contain"
                          style={{
                            filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))'
                          }}
                        />
                      </div>
                      {/* Orbital ring effect */}
                      <div className="absolute inset-0 border border-blue-400/20 rounded-full animate-spin-slow"></div>
                    </OptimizedMotion>
                  </OptimizedMotion>
                  
                  <h3 className="font-display text-headline text-premium mb-3 text-glow text-gray-300">OpsPipe Core Engine</h3>
                  <p className="text-blue-400 font-mono-enhanced text-sm mb-6 tracking-wider text-glow-subtle">OPERATIONAL COMMAND PROCESSOR</p>
                  <p className="text-gray-300 text-body-enhanced leading-relaxed mb-8 max-w-md mx-auto">
                    Intelligent processing engine orchestrating all mission-critical operations with advanced automation coordination protocols
                  </p>
                  
                  {/* Enhanced status indicators */}
                  <div className="flex justify-center gap-6 mt-8">
                    {[
                      { status: 'ACTIVE', color: 'lime-400', icon: '⚡' },
                      { status: 'SECURE', color: 'cyan-400', icon: '🔒' },
                      { status: 'READY', color: 'blue-400', icon: '🎯' }
                    ].map((item, index) => (
                      <OptimizedMotion 
                        key={index} 
                        className="flex flex-col items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 bg-${item.color} rounded-full animate-pulse`}></div>
                          <span className="text-xs">{item.icon}</span>
                        </div>
                        <span className={`text-${item.color} text-xs font-mono-enhanced font-bold`}>{item.status}</span>
                      </OptimizedMotion>
                    ))}
                      </div>
                    </div>
                  </div>
            </OptimizedMotion>
          </div>
        </section>
        
        {/* Enhanced Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
          <OptimizedMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title gradient-text-operational text-glow-blue mb-6">
              Operational Excellence
            </h2>
            <p className="body-large text-white/80 max-w-3xl mx-auto text-shadow-technical">
              Transform your operations with <span className="gradient-text-technical text-glow-cyan">intelligent automation</span> that adapts, learns, and scales with your business requirements.
            </p>
          </OptimizedMotion>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mobile-grid">
            {[
              {
                icon: "🤖",
                title: "Autonomous Agents",
                description: "AI-powered agents that handle complex operational tasks with minimal human intervention.",
                color: "blue",
                gradient: "from-blue-500/20 to-cyan-500/20",
                border: "border-blue-400/30"
              },
              {
                icon: "📊",
                title: "Real-Time Analytics",
                description: "Comprehensive dashboards providing instant insights into operational performance and bottlenecks.",
                color: "orange",
                gradient: "from-orange-500/20 to-amber-500/20",
                border: "border-orange-400/30"
              },
              {
                icon: "⚡",
                title: "Intelligent Workflows",
                description: "Dynamic process automation that adapts to changing conditions and optimizes efficiency.",
                color: "lime",
                gradient: "from-lime-500/20 to-emerald-500/20",
                border: "border-lime-400/30"
              },
              {
                icon: "🛡️",
                title: "Defense-Grade Security",
                description: "Enterprise security protocols with end-to-end encryption and audit trails.",
                color: "purple",
                gradient: "from-purple-500/20 to-violet-500/20",
                border: "border-purple-400/30"
              },
              {
                icon: "🔗",
                title: "Seamless Integration",
                description: "Connect with existing tools and systems through robust APIs and connectors.",
                color: "cyan",
                gradient: "from-cyan-500/20 to-teal-500/20",
                border: "border-cyan-400/30"
              },
              {
                icon: "📈",
                title: "Predictive Scaling",
                description: "Machine learning algorithms that predict and prepare for operational demands.",
                color: "emerald",
                gradient: "from-emerald-500/20 to-green-500/20",
                border: "border-emerald-400/30"
              }
            ].map((feature, index) => (
              <OptimizedMotion
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`backdrop-blur-2xl bg-gradient-to-br ${feature.gradient} ${feature.border} border rounded-xl p-6 hover-lift-technical mobile-card`}
              >
                <div className="text-4xl mb-4 float-technical">{feature.icon}</div>
                <h3 className={`feature-title text-${feature.color}-400 text-glow-${feature.color} mb-3`}>
                  {feature.title}
                </h3>
                <p className="body-technical text-white/70">
                  {feature.description}
                </p>
              </OptimizedMotion>
            ))}
          </div>
        </section>
        
        {/* Enhanced Architecture Section */}
        <IntersectionComponent threshold={0.1}>
        <section id="architecture" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
            <OptimizedMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title gradient-text-premium text-glow-orange mb-6">
              System Architecture
            </h2>
            <p className="body-large text-white/80 max-w-4xl mx-auto text-shadow-technical">
              Built on a <span className="gradient-text-technical text-glow-cyan">microservices architecture</span> that ensures scalability, reliability, and <span className="gradient-text-operational text-glow-lime">operational excellence</span> at enterprise scale.
            </p>
            </OptimizedMotion>

            <OptimizedMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-2xl bg-operational-primary border border-operational-primary rounded-xl p-8 mb-12"
          >
            <OpsPipeArchitectureDiagram />
            </OptimizedMotion>

          {/* Technical Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mobile-grid">
              <OptimizedMotion
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-2xl bg-operational-secondary border border-operational-secondary rounded-xl p-6"
            >
              <h3 className="section-subtitle text-orange-400 text-glow-orange mb-6">
                Core Components
              </h3>
              <div className="space-y-4">
                {[
                  { label: "OpsPipe OS", desc: "AI-powered orchestration engine", status: "ACTIVE" },
                  { label: "State Machine", desc: "Workflow coordination system", status: "OPERATIONAL" },
                  { label: "Decision Engine", desc: "Intelligent routing and logic", status: "OPTIMIZED" },
                  { label: "Recovery Manager", desc: "Fault tolerance and healing", status: "STANDBY" }
                ].map((component, index) => (
                    <OptimizedMotion
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-orange-400/20"
                    >
                    <div>
                      <div className="feature-title text-white">{component.label}</div>
                      <div className="body-technical text-white/60">{component.desc}</div>
                    </div>
                    <div className={`caption-technical px-3 py-1 rounded-full ${
                      component.status === 'ACTIVE' ? 'bg-blue-400/20 text-blue-400' :
                      component.status === 'OPERATIONAL' ? 'bg-lime-400/20 text-lime-400' :
                      component.status === 'OPTIMIZED' ? 'bg-emerald-400/20 text-emerald-400' :
                      'bg-orange-400/20 text-orange-400'
                    }`}>
                      {component.status}
                    </div>
                    </OptimizedMotion>
                ))}
              </div>
              </OptimizedMotion>

              <OptimizedMotion
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-2xl bg-operational-premium border border-operational-premium rounded-xl p-6"
            >
              <h3 className="section-subtitle text-purple-400 text-glow-purple mb-6">
                Performance Metrics
              </h3>
              <div className="space-y-6">
                {[
                  { metric: "Throughput", value: "1.2K ops/sec", change: "+15%", color: "cyan" },
                  { metric: "Latency", value: "< 50ms", change: "-23%", color: "lime" },
                  { metric: "Availability", value: "99.97%", change: "+0.02%", color: "emerald" },
                  { metric: "Error Rate", value: "0.03%", change: "-67%", color: "blue" }
                ].map((stat, index) => (
                    <OptimizedMotion
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                    <div className="body-technical text-white/80">{stat.metric}</div>
                    <div className="text-right">
                      <div className={`feature-title text-${stat.color}-400 text-glow-${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className={`caption-technical text-${stat.color}-300`}>
                        {stat.change}
                      </div>
                    </div>
                    </OptimizedMotion>
                ))}
              </div>
              </OptimizedMotion>
          </div>
        </section>
        </IntersectionComponent>
        
        {/* Phase 3: Component Breakdown - Mission Timeline extracted to separate component */}
        <MissionTimeline animationSettings={animationSettings} />
        
        {/* Enhanced LEGIT Framework Section - Black & Silver Monotone with Life */}
        <IntersectionComponent threshold={0.1}>
          <section id="legit" className="max-w-5xl mx-auto px-4 py-16 mobile-section">
            <OptimizedMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
              className="text-center mb-12"
          >
            <h2 className="section-title gradient-text-technical text-glow-cyan mb-6">
              LEGIT Framework
            </h2>
              <p className="body-large text-white/80 max-w-3xl mx-auto text-shadow-technical">
              Our <span className="gradient-text-premium text-glow-orange">Logged, Enforced, Grounded, Isolated, Tested</span> framework ensures every operation meets the highest standards of <span className="gradient-text-operational text-glow-lime">reliability and accountability</span>.
            </p>
            </OptimizedMotion>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mobile-grid">
            {[
              {
                icon: "📝",
                title: "Logged", 
                  description: "Complete audit trails with detailed operation logging and traceability."
              },
              {
                icon: "⚖️",
                title: "Enforced",
                  description: "Strict policy enforcement with automated compliance monitoring."
              },
              {
                icon: "🧠",
                title: "Grounded", 
                  description: "All data processing follows strict schema validation rules."
              },
              {
                icon: "🛡️",
                title: "Isolated",
                  description: "Each operation runs in its own context without shared state risk."
              },
              {
                icon: "✅",
                title: "Tested",
                  description: "Continuous evaluation ensures consistent and reliable results."
              }
            ].map((principle, index) => (
                <OptimizedMotion
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-800/80 border border-gray-500/40 rounded-lg p-4 text-center hover:bg-gradient-to-br hover:from-gray-800/90 hover:via-black/70 hover:to-gray-700/90 hover:border-gray-400/60 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 mobile-card"
                >
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gray-300/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon with glow */}
                  <div className="relative text-2xl mb-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300 text-white">
                      {principle.icon}
                    </div>
                    <div className="relative">{principle.icon}</div>
                  </div>
                  
                  {/* Title with silver gradient */}
                  <h3 className="relative text-lg font-semibold mb-2 transition-all duration-300">
                    <span className="bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:via-gray-100 group-hover:to-white">
                  {principle.title}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300">
                      {principle.title}
                    </div>
                </h3>
                  
                  {/* Description */}
                  <p className="relative text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {principle.description}
                </p>
                  
                  {/* Subtle border glow */}
                  <div className="absolute inset-0 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </OptimizedMotion>
            ))}
          </div>
        </section>
        </IntersectionComponent>

        {/* Enhanced Use Cases Gallery - Mission Scenarios - Black & Silver Monotone */}
        <IntersectionComponent threshold={0.1}>
        <section id="use-cases" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
            <OptimizedMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title gradient-text-operational text-glow-blue mb-6">
              Mission Scenarios
            </h2>
            <p className="body-large text-white/80 max-w-4xl mx-auto text-shadow-technical">
              Real-world <span className="gradient-text-technical text-glow-cyan">operational deployments</span> across industries, demonstrating OpsPipe's <span className="gradient-text-premium text-glow-orange">versatility and impact</span> in transforming business processes.
            </p>
            </OptimizedMotion>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mobile-grid">
            {[
              {
                title: "Financial Document Processing",
                description: "Ideal for growing businesses buried in receipts and invoices. OpsPipe parses documents, checks for errors, and auto-generates summaries — ready to sync with Xero, QuickBooks, or local accountants.\n\nCloses the gap between small ops and real bookkeeping, with zero manual entry.",
                icon: "💼",
                coordinates: "FDP-001",
                industry: "Financial Services"
              },
              {
                title: "F&B Back-Office Automation",
                description: "Streamline supplier invoices, inventory counts, and delivery platform sync. OpsPipe runs loops for restaurant chains, cafes, and hotels — no full-time admin needed.\n\nYou stay focused on food, we handle the paperwork.",
                icon: "🍽️",
                coordinates: "FNB-002",
                industry: "Food & Beverage"
              },
              {
                title: "Clinic Intake & Record Flow",
                description: "Simplifies form intake, ID validation, and patient routing. Clinics use OpsPipe to collect and process patient data while staying compliant and secure.\n\nCuts down wait times and admin load without touching your EMR.",
                icon: "🏥",
                coordinates: "HCR-003",
                industry: "Healthcare"
              },
              {
                title: "Academic Data Management",
                description: "Researchers and departments use OpsPipe to process survey data, lab reports, and grant paperwork. Auto-tagged, versioned, and export-ready — without spending hours on formatting.\n\nPerfect for teams who publish, not wrangle PDFs.",
                icon: "🎓",
                coordinates: "ADM-004",
                industry: "Education"
              },
              {
                title: "Retail Ops + Metrics Loop",
                description: "Daily receipts, stock counts, vendor slips — OpsPipe turns it all into structured dashboards. Supports POS exports, trend snapshots, and alert flags for busy stores.\n\nNo more waiting for accounting to understand what's happening in your own shop.",
                icon: "🛍️",
                coordinates: "RTL-005",
                industry: "Retail"
              },
              {
                title: "Personal Doc Manager",
                description: "A future consumer app powered by OpsPipe — designed to manage life's paperwork with zero stress. From receipts and bills to school forms and IDs, everything is auto-sorted, summarized, and searchable.\n\nOps-grade infrastructure, simplified for everyday use.",
                icon: "📂",
                coordinates: "PDM-006",
                industry: "Consumer"
              }
            ].map((useCase, index) => (
                <OptimizedMotion
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group h-full"
              >
                  <div className="group relative backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-800/80 border border-gray-500/40 rounded-xl p-6 shadow-2xl shadow-black/60 hover:bg-gradient-to-br hover:from-gray-800/90 hover:via-black/70 hover:to-gray-700/90 hover:border-gray-400/60 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 h-full flex flex-col mobile-card">
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gray-300/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                  <div className="flex items-center justify-between mb-4">
                      {/* Icon with glow */}
                      <div className="relative text-3xl opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300 text-white">
                          {useCase.icon}
                        </div>
                        <div className="relative">{useCase.icon}</div>
                      </div>
                      
                      {/* Coordinates badge */}
                      <div className="relative bg-black/30 px-2 py-1 rounded border border-gray-500/40 group-hover:border-gray-400/60 transition-colors duration-300">
                        <span className="bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent text-xs font-mono font-semibold">
                      {useCase.coordinates}
                        </span>
                    </div>
                  </div>
                  
                    {/* Industry tag */}
                    <div className="relative mb-2">
                      <span className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-clip-text text-transparent text-xs font-mono font-semibold">
                    {useCase.industry}
                      </span>
                  </div>
                  
                    {/* Title with silver gradient */}
                    <h3 className="relative text-lg font-semibold mb-3 transition-all duration-300">
                      <span className="bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:via-gray-100 group-hover:to-white">
                    {useCase.title}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300">
                        {useCase.title}
                      </div>
                  </h3>
                  
                    {/* Description */}
                    <p className="relative text-sm text-gray-400 leading-relaxed whitespace-pre-line flex-grow group-hover:text-gray-300 transition-colors duration-300">
                    {useCase.description}
                  </p>
                    
                    {/* Subtle border glow */}
                    <div className="absolute inset-0 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                </OptimizedMotion>
            ))}
          </div>
        </section>
        </IntersectionComponent>

        {/* Integration Ecosystem Section */}
        <IntersectionComponent threshold={0.1}>
        <section id="integrations" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
            <OptimizedMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-subtitle gradient-text-premium text-glow-orange mb-6">
              Integration Ecosystem
            </h2>
            <p className="text-body text-white/70 max-w-4xl mx-auto text-shadow-technical">
              OpsPipe connects seamlessly with your existing <span className="gradient-text-technical text-glow-cyan">technology stack</span>, providing <span className="gradient-text-operational text-glow-lime">unified operational control</span> across all your business systems.
            </p>
            </OptimizedMotion>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mobile-grid">
            {/* Input Sources */}
              <OptimizedMotion
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-2xl bg-operational-accent border border-operational-accent rounded-xl p-8"
            >
              <h3 className="text-lg font-semibold text-lime-400/90 text-glow-lime mb-6">
                📥 Input Sources
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Telegram Bot", desc: "Chat-based operations", status: "ACTIVE" },
                  { name: "File Upload", desc: "Document processing", status: "READY" },
                  { name: "POS Systems", desc: "Retail integration", status: "BETA" },
                  { name: "API Gateway", desc: "REST/GraphQL", status: "STABLE" },
                  { name: "Email Parser", desc: "Automated intake", status: "DEV" },
                  { name: "Web Forms", desc: "Direct submission", status: "ACTIVE" }
                ].map((source, index) => (
                    <OptimizedMotion
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-black/20 p-3 rounded-lg border border-lime-400/15"
                    >
                    <div className="text-white text-sm font-medium mb-1">{source.name}</div>
                    <div className="text-white/50 text-xs mb-2">{source.desc}</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-mono ${
                      source.status === 'ACTIVE' ? 'bg-emerald-400/15 text-emerald-400/90' :
                      source.status === 'STABLE' ? 'bg-blue-400/15 text-blue-400/90' :
                      source.status === 'READY' ? 'bg-cyan-400/15 text-cyan-400/90' :
                      source.status === 'BETA' ? 'bg-orange-400/15 text-orange-400/90' :
                      'bg-purple-400/15 text-purple-400/90'
                    }`}>
                      {source.status}
                    </div>
                    </OptimizedMotion>
                ))}
              </div>
              </OptimizedMotion>

            {/* Output Systems */}
              <OptimizedMotion
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-2xl bg-operational-premium border border-operational-premium rounded-xl p-8"
            >
              <h3 className="text-lg font-semibold text-purple-400/90 text-glow-purple mb-6">
                📤 Output Systems
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "OpsCockpit", desc: "Real-time dashboard", status: "LIVE" },
                  { name: "Web Admin", desc: "Control panel", status: "STABLE" },
                  { name: "OpsField Mobile", desc: "Field operations", status: "BETA" },
                  { name: "StaffBot", desc: "Team notifications", status: "ACTIVE" },
                  { name: "Knowledge Base", desc: "Documentation", status: "AUTO" },
                  { name: "Data Exports", desc: "Analytics feeds", status: "READY" }
                ].map((output, index) => (
                    <OptimizedMotion
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-black/20 p-3 rounded-lg border border-purple-400/15"
                    >
                    <div className="text-white text-sm font-medium mb-1">{output.name}</div>
                    <div className="text-white/50 text-xs mb-2">{output.desc}</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-mono ${
                      output.status === 'LIVE' ? 'bg-emerald-400/15 text-emerald-400/90' :
                      output.status === 'STABLE' ? 'bg-blue-400/15 text-blue-400/90' :
                      output.status === 'ACTIVE' ? 'bg-cyan-400/15 text-cyan-400/90' :
                      output.status === 'BETA' ? 'bg-orange-400/15 text-orange-400/90' :
                      output.status === 'AUTO' ? 'bg-lime-400/15 text-lime-400/90' :
                      'bg-purple-400/15 text-purple-400/90'
                    }`}>
                      {output.status}
                    </div>
                    </OptimizedMotion>
                ))}
              </div>
              </OptimizedMotion>
          </div>

          {/* Enterprise Connectors */}
            <OptimizedMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 backdrop-blur-2xl bg-operational-secondary border border-operational-secondary rounded-xl p-8"
          >
            <h3 className="text-lg font-semibold text-orange-400/90 text-glow-orange mb-6 text-center">
              🔗 Enterprise Connectors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mobile-grid">
              {[
                { name: "Xero", type: "Accounting" },
                { name: "QuickBooks", type: "Finance" },
                { name: "Slack", type: "Communication" },
                { name: "Teams", type: "Collaboration" },
                { name: "Salesforce", type: "CRM" },
                { name: "HubSpot", type: "Marketing" },
                { name: "Shopify", type: "E-commerce" },
                { name: "AWS", type: "Cloud" },
                { name: "Azure", type: "Platform" },
                { name: "GCP", type: "Infrastructure" },
                { name: "Stripe", type: "Payments" },
                { name: "Zapier", type: "Automation" }
              ].map((connector, index) => (
                  <OptimizedMotion
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black/20 p-3 rounded-lg border border-orange-400/15 text-center mobile-card"
                  >
                  <div className="text-white text-sm font-medium mb-1">{connector.name}</div>
                  <div className="text-orange-300/80 text-xs">{connector.type}</div>
                  </OptimizedMotion>
              ))}
            </div>
            </OptimizedMotion>
        </section>
        </IntersectionComponent>

        {/* Performance Metrics & ROI Section */}
        <IntersectionComponent threshold={0.1}>
        <section id="performance" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
            <OptimizedMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title gradient-text-technical text-glow-cyan mb-6">
              Quantified Impact
            </h2>
            <p className="body-large text-white/80 max-w-4xl mx-auto text-shadow-technical">
              Measurable <span className="gradient-text-premium text-glow-orange">operational improvements</span> and <span className="gradient-text-operational text-glow-lime">ROI metrics</span> from real OpsPipe deployments across industries.
            </p>
            </OptimizedMotion>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mobile-grid mb-16">
            {[
              {
                metric: "Processing Speed",
                value: "10x",
                improvement: "faster document processing",
                color: "blue",
                icon: "⚡"
              },
              {
                metric: "Error Reduction",
                value: "94%",
                improvement: "fewer manual errors",
                color: "emerald",
                icon: "🎯"
              },
              {
                metric: "Cost Savings",
                value: "$50K+",
                improvement: "annual operational savings",
                color: "orange",
                icon: "💰"
              },
              {
                metric: "Time Recovery",
                value: "15hrs",
                improvement: "per week saved per team",
                color: "purple",
                icon: "⏰"
              }
            ].map((stat, index) => (
                <OptimizedMotion
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`backdrop-blur-2xl bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20 border border-${stat.color}-400/30 rounded-xl p-6 text-center hover-lift-technical mobile-card`}
              >
                <div className="text-3xl mb-4 float-technical">{stat.icon}</div>
                <div className={`hero-subtitle text-${stat.color}-400 text-glow-${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className={`feature-title text-${stat.color}-300 mb-2`}>
                  {stat.metric}
                </div>
                <div className="body-technical text-white/70">
                  {stat.improvement}
                </div>
                </OptimizedMotion>
            ))}
          </div>

          {/* ROI Calculator Preview */}
            <OptimizedMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-2xl bg-operational-primary border border-operational-primary rounded-xl p-8"
          >
            <h3 className="section-subtitle text-blue-400 text-glow-blue mb-6 text-center">
              📊 ROI Impact Calculator
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mobile-grid">
              <div className="text-center">
                <div className="caption-technical text-cyan-400 text-glow-cyan mb-2">CURRENT MANUAL HOURS</div>
                <div className="hero-subtitle text-white mb-2">40hrs/week</div>
                <div className="body-technical text-white/60">Average team processing time</div>
              </div>
              <div className="text-center">
                <div className="caption-technical text-lime-400 text-glow-lime mb-2">WITH OPSPIPE</div>
                <div className="hero-subtitle text-lime-400 text-glow-lime mb-2">4hrs/week</div>
                <div className="body-technical text-white/60">90% automation achieved</div>
              </div>
              <div className="text-center">
                <div className="caption-technical text-orange-400 text-glow-orange mb-2">ANNUAL SAVINGS</div>
                <div className="hero-subtitle text-orange-400 text-glow-orange mb-2">$75,600</div>
                <div className="body-technical text-white/60">Based on $40/hr operational cost</div>
              </div>
            </div>
            </OptimizedMotion>
        </section>
        </IntersectionComponent>

        {/* Customer Success Stories */}
        <IntersectionComponent threshold={0.1}>
        <section id="success-stories" className="max-w-7xl mx-auto px-4 py-20 mobile-section">
            <OptimizedMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-title gradient-text-operational text-glow-blue mb-6">
              Mission Success Stories
            </h2>
            <p className="body-large text-white/80 max-w-4xl mx-auto text-shadow-technical">
              Real results from <span className="gradient-text-premium text-glow-orange">operational transformations</span> across diverse industries and <span className="gradient-text-technical text-glow-cyan">business scales</span>.
            </p>
            </OptimizedMotion>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mobile-grid">
            {[
              {
                company: "TechFlow Solutions",
                industry: "SaaS Startup",
                challenge: "Manual invoice processing consuming 20+ hours weekly",
                solution: "OpsPipe automated document parsing and validation workflows",
                result: "95% time reduction, zero processing errors in 6 months",
                metrics: { time: "18hrs saved/week", accuracy: "100%", roi: "340%" },
                color: "blue",
                avatar: "🏢"
              },
              {
                company: "Coastal Cafe Chain",
                industry: "Food & Beverage",
                challenge: "Multiple location inventory and supplier coordination chaos",
                solution: "Unified OpsPipe dashboard with real-time supplier sync",
                result: "Streamlined operations across 12 locations with predictive inventory",
                metrics: { efficiency: "+85%", waste: "-60%", profit: "+23%" },
                color: "orange",
                avatar: "☕"
              },
              {
                company: "MedCore Clinics",
                industry: "Healthcare",
                challenge: "Patient intake bottlenecks and compliance documentation",
                solution: "HIPAA-compliant OpsPipe workflows for patient processing",
                result: "50% faster patient onboarding with complete audit trails",
                metrics: { speed: "+120%", compliance: "100%", satisfaction: "+45%" },
                color: "emerald",
                avatar: "🏥"
              },
              {
                company: "Research University",
                industry: "Education",
                challenge: "Grant application and research data management inefficiencies",
                solution: "Academic-focused OpsPipe with automated report generation",
                result: "Doubled research output with standardized documentation",
                metrics: { output: "+200%", accuracy: "99.8%", time: "25hrs saved/week" },
                color: "purple",
                avatar: "🎓"
              }
            ].map((story, index) => (
                <OptimizedMotion
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`backdrop-blur-2xl bg-gradient-to-br from-${story.color}-500/20 to-${story.color}-600/20 border border-${story.color}-400/30 rounded-xl p-8 hover-lift-technical mobile-card`}
              >
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">{story.avatar}</div>
                  <div>
                    <h3 className={`feature-title text-${story.color}-400 text-glow-${story.color}`}>
                      {story.company}
                    </h3>
                    <div className={`caption-technical text-${story.color}-300`}>
                      {story.industry}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="caption-technical text-white/60 mb-1">CHALLENGE</div>
                    <div className="body-technical text-white/80">{story.challenge}</div>
                  </div>
                  <div>
                    <div className="caption-technical text-white/60 mb-1">SOLUTION</div>
                    <div className="body-technical text-white/80">{story.solution}</div>
                  </div>
                  <div>
                    <div className="caption-technical text-white/60 mb-1">RESULT</div>
                    <div className={`body-technical text-${story.color}-300`}>{story.result}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(story.metrics).map(([key, value], metricIndex) => (
                      <OptimizedMotion
                        key={metricIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: metricIndex * 0.1 }}
                        className="text-center p-3 bg-black/20 rounded-lg border border-white/10"
                      >
                      <div className={`feature-title text-${story.color}-400 text-glow-${story.color} text-sm`}>
                        {value}
                      </div>
                      <div className="caption-technical text-white/60 text-xs uppercase">
                        {key}
                      </div>
                      </OptimizedMotion>
                  ))}
                </div>
                </OptimizedMotion>
            ))}
          </div>
        </section>
        </IntersectionComponent>
        
        {/* CTA Section */}
        <section id="cta" className="max-w-7xl mx-auto px-4 py-16">
          <OptimizedMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-2xl bg-black/40 border border-blue-400/20 rounded-xl p-10 shadow-2xl shadow-black/60 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h2 className="font-space-enhanced text-display text-premium mb-6 text-gray-300">
              Own Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-glow-blue">Operations</span>
            </h2>
            
            <p className="text-body-enhanced text-white/80 text-readable mb-8 max-w-3xl mx-auto leading-relaxed">
              Take control of your operational workflow with enterprise-grade automation and intelligence that scales with your business.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-technical py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20 text-glow-blue mobile-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contact Mission Control
              </Link>
              <Link
                to="/codelab"
                className="inline-flex items-center bg-black/50 border border-blue-400/30 text-white font-technical py-4 px-8 rounded-lg transition-all duration-300 hover:border-blue-400/50 hover:bg-black/70"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Access Engineering Bay
              </Link>
            </div>
          </OptimizedMotion>
        </section>
      </main>
      
      <ScrollToTop />
      <LegalLink />
      <MissionControlNavbar />
      <FooterExperience />
    </div>
  );
} 

