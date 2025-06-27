/**
 * 🛡️ KEEP - CRITICAL PRODUCTION COMPONENT
 * Code: PRODUCTS-ATOMIC-001
 * Used in: v6_atomic.jsx (Main Homepage)
 * Features: Main products showcase section with horizontal scroll and product cards
 * Warning: DO NOT REMOVE - CORE ATOMIC PRODUCTS SECTION
 * Bundle: Core atomic homepage bundle
 * Type: Atomic Products Component
 * Dependencies: framer-motion, react, StellarMessageGrok, useBreakpoint
 */

/**
 * @metadata
 * @component HorizontalProductScrollV6
 * @description Unified horizontal scroll section with AEGIS intro, Products carousel, and Services outro
 * @legit true
 * @version 2.1.0 - "Mobile Optimized"
 * @author CuriousLabs
 * @scs SCS5
 * @doc contract_horizontal_product_scroll_v6.md
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from '../../../FramerProvider';
import { useResponsive, useDeviceCapabilities } from '../../../hooks/useBreakpoint';

// Import page components
import { AegisPage } from './components/AegisPage';
import { ProductsPage } from './components/ProductsPage';
// COMMENTED OUT - ServicesPage needs work, temporarily disabled
// import { ServicesPage } from './components/ServicesPage';

// Import shared utilities and hooks
import { useDebugMode } from './components/useDebugMode';
import { pageVariants } from './components/imports_shared';

// Optimized ThoughtTrails hook with mobile awareness
const useThoughtTrails = () => {
  const [thoughtTrails, setThoughtTrails] = useState(null);
  const { isMobile, isTablet } = useResponsive();
  const { prefersReducedMotion, performanceTier } = useDeviceCapabilities();
  const isActivatedRef = useRef(false);
  const initTimeoutRef = useRef(null);

  useEffect(() => {
    let trailsInstance = null;
    
    const initializeTrails = async () => {
      if (isActivatedRef.current) return;
      
      // Skip initialization for reduced motion preference
      if (prefersReducedMotion) {
        console.log('ThoughtTrails disabled due to reduced motion preference');
        return;
      }
      
      try {
        // Add delay for mobile devices to ensure DOM is ready
        if (isMobile && initTimeoutRef.current) {
          clearTimeout(initTimeoutRef.current);
        }
        
        const initDelay = isMobile ? 300 : 100;
        
        initTimeoutRef.current = setTimeout(async () => {
          // Lazy import the ThoughtTrails
          const { default: ThoughtTrails } = await import('../../../lib/thoughtTrails.js');
          trailsInstance = ThoughtTrails;
          
          // Initialize if not already done
          if (!trailsInstance.isInitialized && !trailsInstance.isDestroyed) {
            trailsInstance.init();
          }
          
          // Listen for the ready event
          const handleReady = () => {
            setThoughtTrails(trailsInstance);
            isActivatedRef.current = true;
          };
          
          if (trailsInstance.isInitialized) {
            handleReady();
          } else {
            window.addEventListener('thoughtTrailsReady', handleReady, { once: true });
          }
        }, initDelay);
        
      } catch (error) {
        console.warn('Failed to load ThoughtTrails:', error);
      }
    };

    // Initialize trails when component mounts
    initializeTrails();

    // Cleanup when component unmounts
    return () => {
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
      
      if (trailsInstance && isActivatedRef.current) {
        trailsInstance.deactivate();
        isActivatedRef.current = false;
      }
    };
  }, [isMobile, isTablet, prefersReducedMotion, performanceTier]);

  return thoughtTrails;
};

/**
 * Main Component - Optimized container with mobile responsiveness
 */
const HorizontalProductScrollV6 = ({ className = '' }) => {
  // Use unified responsive and capability hooks
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { prefersReducedMotion, performanceTier } = useDeviceCapabilities();
  
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const containerRef = useRef(null);
  const lastWheelTime = useRef(0);
  const wheelThrottle = useRef(null);
  const isDebug = useDebugMode();

  // Initialize ThoughtTrails for this component
  const thoughtTrails = useThoughtTrails();

  // Page data attributes for event dispatch - Updated for 2 pages
  const pageDataAttributes = ['aegis', 'products']; // Removed 'services'

  // Mobile-optimized page change handler
  const handlePageChange = useCallback((newPage) => {
    if (isTransitioning || newPage === currentPage) return;
    
    setIsTransitioning(true);
    setCurrentPage(newPage);
    
    // Reset transition lock after animation completes
    const transitionDelay = isMobile ? 600 : 400;
    setTimeout(() => setIsTransitioning(false), transitionDelay);
  }, [currentPage, isTransitioning, isMobile]);

  // Handle stellar sequence completion - COMMENTED OUT for 2-page system
  /*
  useEffect(() => {
    const handleStellarComplete = () => {
      if (currentPage === 2) {
        setIsScrollLocked(false);
      }
    };
    
    window.addEventListener('stellarSequenceComplete', handleStellarComplete);
    return () => window.removeEventListener('stellarSequenceComplete', handleStellarComplete);
  }, [currentPage]);
  */

  // Optimized wheel handling with throttling - Updated for 2 pages
  const handleWheel = useCallback((e) => {
    if (!isScrollLocked || isTransitioning) return;
    
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastWheelTime.current < (isMobile ? 200 : 150)) return;
    lastWheelTime.current = now;
    
    const delta = e.deltaY || e.deltaX;
    if (delta > 0 && currentPage < 1) { // Changed from 2 to 1
      handlePageChange(currentPage + 1);
    } else if (delta < 0 && currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
  }, [currentPage, isScrollLocked, isTransitioning, isMobile, handlePageChange]);

  // Mobile touch handling
  const handleTouchStart = useCallback((e) => {
    if (!isScrollLocked || isTransitioning) return;
    
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  }, [isScrollLocked, isTransitioning]);

  const handleTouchMove = useCallback((e) => {
    if (!isScrollLocked || isTransitioning) return;
    e.preventDefault();
  }, [isScrollLocked, isTransitioning]);

  const handleTouchEnd = useCallback((e) => {
    if (!isScrollLocked || isTransitioning) return;
    
    const touch = e.changedTouches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
    
    const deltaX = touchStart.x - touch.clientX;
    const deltaY = Math.abs(touchStart.y - touch.clientY);
    
    // Minimum swipe distance and ensure horizontal swipe
    const minSwipeDistance = isMobile ? 50 : 75;
    if (Math.abs(deltaX) > minSwipeDistance && deltaY < Math.abs(deltaX) * 0.5) {
      if (deltaX > 0 && currentPage < 1) { // Changed from 2 to 1
        handlePageChange(currentPage + 1);
      } else if (deltaX < 0 && currentPage > 0) {
        handlePageChange(currentPage - 1);
      }
    }
  }, [touchStart, currentPage, isMobile, isTransitioning, handlePageChange]);

  // Event listeners setup with proper cleanup
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isScrollLocked) return;
    
    // 🎯 MOBILE CRASH FIX: Proper event listener cleanup
    const wheelHandler = (e) => handleWheel(e);
    const touchStartHandler = (e) => handleTouchStart(e);
    const touchMoveHandler = (e) => handleTouchMove(e);
    const touchEndHandler = (e) => handleTouchEnd(e);
    
    container.addEventListener('wheel', wheelHandler, { passive: false });
    container.addEventListener('touchstart', touchStartHandler, { passive: true });
    container.addEventListener('touchmove', touchMoveHandler, { passive: false });
    container.addEventListener('touchend', touchEndHandler, { passive: true });
    
    return () => {
      // 🎯 CRITICAL: Always cleanup ALL event listeners to prevent memory leaks
      if (container) {
        container.removeEventListener('wheel', wheelHandler);
        container.removeEventListener('touchstart', touchStartHandler);
        container.removeEventListener('touchmove', touchMoveHandler);
        container.removeEventListener('touchend', touchEndHandler);
      }
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, isScrollLocked]);

  const handleScrollRelease = useCallback(() => {
    // COMMENTED OUT - no longer needed for 2-page system
    // if (currentPage === 2) setIsScrollLocked(false);
  }, [currentPage]);

  // Dispatch event when page changes to control ThoughtTrails visibility
  useEffect(() => {
    // Dispatch event to notify ThoughtTrails system about page change
    window.dispatchEvent(new CustomEvent('horizontalPageChange', {
      detail: { 
        pageIndex: currentPage,
        pageName: pageDataAttributes[currentPage],
        timestamp: Date.now(),
        isMobile,
        isTablet,
        performanceTier
      }
    }));
    
    // Control ThoughtTrails activation based on current page and device capabilities
    if (thoughtTrails && !prefersReducedMotion) {
      if (currentPage === 0 || currentPage === 1) {
        // Activate on AEGIS (0) and Products (1) pages
        if (!thoughtTrails.isActive) {
          // Add slight delay on mobile for smoother transitions
          const activationDelay = isMobile ? 200 : 50;
          setTimeout(() => {
            if (thoughtTrails && !thoughtTrails.isDestroyed) {
              thoughtTrails.activate();
            }
          }, activationDelay);
        }
      } 
      // REMOVED: Services page deactivation logic since we only have 2 pages now
      // else {
      //   // Deactivate on Services (2) page
      //   if (thoughtTrails.isActive) {
      //     thoughtTrails.deactivate();
      //   }
      // }
    }
  }, [currentPage, thoughtTrails, isMobile, isTablet, prefersReducedMotion, performanceTier]);

  // Animation variants optimized for different devices
  const containerVariants = {
    animate: {
      x: `-${currentPage * 100}vw`,
      transition: {
        type: 'spring',
        stiffness: isMobile ? 80 : 100,
        damping: isMobile ? 25 : 20,
        mass: isMobile ? 1.2 : 1,
        duration: isMobile ? 0.6 : 0.4
      }
    }
  };

  const backgroundVariants = {
    animate: {
      x: `-${currentPage * 100}vw`,
      transition: {
        type: 'spring',
        stiffness: isMobile ? 80 : 100,
        damping: isMobile ? 25 : 20,
        mass: isMobile ? 1.2 : 1,
        duration: isMobile ? 0.6 : 0.4
      }
    }
  };

  return (
    <section 
      className={`relative w-full h-screen overflow-hidden ${className} ${isDebug ? 'debug-mode' : ''}`} 
      style={{ marginTop: '-10vh' }}
      ref={containerRef}
    >
      {/* Spanning Background Gradient - Optimized for mobile - Updated for 2 pages */}
      <motion.div 
        className="absolute inset-0 w-[200vw] h-full z-[-10]"
        variants={backgroundVariants}
        animate="animate"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to right,
                /* AEGIS Page (0-50%) */
                #060b14 0%,
                #0a1120 12%,
                #131c2f 25%,
                rgba(98, 153, 16, 0.15) 35%,
                rgba(19, 28, 47, 0.8) 45%,
                
                /* Transition to Products (45-55%) */
                rgba(15, 23, 42, 0.9) 50%,
                rgba(30, 41, 59, 0.8) 52%,
                rgba(45, 27, 79, 0.7) 55%,
                
                /* Products Page (50-100%) */
                #0f172a 60%,
                #1e293b 70%,
                #2d1b4f 80%,
                rgba(162, 52, 179, 0.4) 90%,
                rgba(186, 86, 16, 0.3) 100%
              )
            `
          }}
        />
        
        {/* Noise Texture - Reduced complexity on mobile */}
        <div 
          className="absolute inset-0 mix-blend-overlay"
          style={{
            opacity: isMobile ? 0.15 : 0.20,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='${isMobile ? '120' : '180'}' height='${isMobile ? '120' : '180'}' viewBox='0 0 ${isMobile ? '120' : '180'} ${isMobile ? '120' : '180'}' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='spanningNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${isMobile ? '0.7' : '0.85'}' numOctaves='${isMobile ? '2' : '4'}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23spanningNoise)' opacity='0.8'/%3E%3C/svg%3E")`,
            backgroundSize: `${isMobile ? '120px 120px' : '180px 180px'}`
          }}
        />
      </motion.div>

      {/* Debug Grid Overlay */}
      {isDebug && (
        <div className="fixed inset-0 z-[50] pointer-events-none">
          <div className="w-full h-full grid grid-cols-12 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-full border border-red-500 opacity-20" />
            ))}
          </div>
          <div className="absolute top-4 right-4 bg-black/80 text-white p-2 rounded text-xs">
            Debug Mode: Page {currentPage + 1}/2<br />
            Scroll Lock: {isScrollLocked ? 'On' : 'Off'}<br />
            Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}<br />
            Performance: {performanceTier}<br />
            Press Ctrl+D to toggle debug
          </div>
        </div>
      )}
      
      {/* Pages Container - Updated for 2 pages */}
      <motion.div 
        className="flex w-[200vw] h-full z-[1]"
        variants={containerVariants}
        animate="animate"
      >
        {/* Page 1: AEGIS */}
        <motion.div 
          className="w-screen h-screen" 
          variants={pageVariants} 
          initial="initial" 
          animate="animate" 
          exit="exit"
        >
          <AegisPage />
        </motion.div>

        {/* Page 2: Products */}
        <motion.div 
          className="w-screen h-screen" 
          data-page="products" 
          variants={pageVariants} 
          initial="initial" 
          animate="animate" 
          exit="exit"
        >
          <ProductsPage />
        </motion.div>

        {/* Page 3: Services */}
        {/* COMMENTED OUT - ServicesPage needs work, temporarily disabled
        <motion.div 
          className="w-screen h-screen z-[3]" 
          data-page="services" 
          variants={pageVariants} 
          initial="initial" 
          animate="animate" 
          exit="exit"
        >
          <ServicesPage onScrollRelease={handleScrollRelease} />
        </motion.div>
        */}
      </motion.div>

      {/* Navigation Pagination - Mobile optimized - Updated for 2 pages */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-[30] ${isMobile ? 'bottom-6' : 'bottom-8'}`}>
        {[0, 1].map((index) => (
          <motion.div
            key={index}
            className={`rounded-full cursor-pointer ${isMobile ? 'w-4 h-4' : 'w-3 h-3'}`}
            animate={{ 
              backgroundColor: currentPage === index ? '#d946ef' : 'rgba(255,255,255,0.2)',
              scale: currentPage === index ? (isMobile ? 1.3 : 1.2) : 1
            }}
            onClick={() => !isTransitioning && handlePageChange(index)}
            whileHover={{ scale: isMobile ? 1.4 : 1.2 }}
            whileTap={{ scale: isMobile ? 1.1 : 0.9 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>

      {/* Mobile swipe indicator (only show on first visit) */}
      {isMobile && currentPage === 0 && (
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-white/60 text-sm z-[30]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <span>Swipe to explore</span>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

// Add debug styles to the component
const debugStyles = `
.debug-mode * {
  outline: 1px dashed rgba(255, 0, 0, 0.2);
}
.debug-mode [style*="z-index"], .debug-mode [class*="z-"]:after {
  position: relative;
}
.debug-mode [style*="z-index"]:after, .debug-mode [class*="z-"]:after {
  content: attr(style);
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 8px;
  padding: 2px;
  z-index: [9999];
}
`;

// Inject debug styles if needed
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('horizontal-scroll-debug-styles');
  if (!existingStyle) {
    const styleElement = document.createElement('style');
    styleElement.id = 'horizontal-scroll-debug-styles';
    styleElement.innerHTML = debugStyles;
    document.head.appendChild(styleElement);
  }
}

HorizontalProductScrollV6.displayName = 'HorizontalProductScrollV6';

export const metadata = {
  id: 'horizontal_product_scroll_v6',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_horizontal_product_scroll_v6.md',
  version: '2.1.0'
};

export default HorizontalProductScrollV6;