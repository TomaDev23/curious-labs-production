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
 * @version 2.0.0
 * @author CuriousLabs
 * @scs SCS5
 * @doc contract_horizontal_product_scroll_v6.md
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from '../../../FramerProvider';
import { useResponsive, useDeviceCapabilities } from '../../../hooks/useBreakpoint';

// Import all page components
import { AegisPage } from './components/AegisPage';
import { ProductsPage } from './components/ProductsPage';
import { ServicesPage } from './components/ServicesPage';

// Import shared utilities and hooks
import { useDebugMode } from './components/useDebugMode';
import { pageVariants } from './components/imports_shared';

/**
 * Main Component - Lightweight container that orchestrates the three pages
 */
const HorizontalProductScrollV6 = ({ className = '' }) => {
  // Use unified responsive and capability hooks
  const { isMobile, isTablet } = useResponsive();
  const { prefersReducedMotion, performanceTier } = useDeviceCapabilities();
  
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const containerRef = useRef(null);
  const isDebug = useDebugMode();

  // Component mount effect - ensure ThoughtTrails detects the page
  useEffect(() => {
    // Initial ThoughtTrails detection when component mounts
    const initThoughtTrails = () => {
      if (window.thoughtTrails && typeof window.thoughtTrails.checkRouteAndActivate === 'function') {
        console.log('🌟 Initial ThoughtTrails detection on component mount');
        window.thoughtTrails.checkRouteAndActivate();
      }
    };

    // Run immediately and after a delay to ensure DOM is ready
    initThoughtTrails();
    const timer = setTimeout(initThoughtTrails, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Page data attributes mapping
  const pageDataAttributes = {
    0: 'aegis',
    1: 'products', 
    2: 'services'
  };

  // Handle stellar sequence completion
  useEffect(() => {
    const handleStellarComplete = () => {
      if (currentPage === 2) {
        console.log('🌌 Stellar sequence completed - releasing scroll lock');
        setIsScrollLocked(false);
      }
    };
    
    window.addEventListener('stellarSequenceComplete', handleStellarComplete);
    return () => window.removeEventListener('stellarSequenceComplete', handleStellarComplete);
  }, [currentPage]);

  // Scroll handling
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isScrollLocked) return;
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      if (delta > 0 && currentPage < 2) setCurrentPage((prev) => prev + 1);
      else if (delta < 0 && currentPage > 0) setCurrentPage((prev) => prev - 1);
    };

    const handleTouchMove = (e) => {
      if (!isScrollLocked) return;
      e.preventDefault();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentPage, isScrollLocked]);

  const handleScrollRelease = () => {
    if (currentPage === 2) setIsScrollLocked(false);
  };

  // Dispatch event when page changes to control ThoughtTrails visibility
  useEffect(() => {
    // Dispatch event to notify ThoughtTrails system about page change
    window.dispatchEvent(new CustomEvent('horizontalPageChange', {
      detail: { 
        pageIndex: currentPage,
        pageName: pageDataAttributes[currentPage],
        timestamp: Date.now()
      }
    }));
    
    console.log(`🌟 Horizontal page changed: ${currentPage} (${pageDataAttributes[currentPage]})`);
    
    // Add data attribute to the current page for easier selection
    const pages = document.querySelectorAll('section > .flex > .w-screen');
    pages.forEach((page, index) => {
      if (index === 1) { // Products page (second page)
        page.setAttribute('data-page', 'products');
      } else {
        page.removeAttribute('data-page');
      }
    });

    // Trigger ThoughtTrails detection after a short delay to ensure DOM is ready
    setTimeout(() => {
      if (window.thoughtTrails && typeof window.thoughtTrails.checkRouteAndActivate === 'function') {
        window.thoughtTrails.checkRouteAndActivate();
      }
    }, 100);
  }, [currentPage]);

  return (
    <section 
      className={`relative w-full h-screen overflow-hidden ${className} ${isDebug ? 'debug-mode' : ''}`} 
      style={{ marginTop: '-10vh' }}
      ref={containerRef}
    >
      {/* Spanning Background Gradient - Smooth transitions across all three pages */}
      <motion.div 
        className="absolute inset-0 w-[300vw] h-full z-[-10]"
        animate={{ x: `-${currentPage * 100}vw` }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to right,
                /* AEGIS Page (0-33.33%) */
                #060b14 0%,
                #0a1120 8%,
                #131c2f 16%,
                rgba(98, 153, 16, 0.15) 25%,
                rgba(19, 28, 47, 0.8) 30%,
                
                /* Transition to Products (30-40%) */
                rgba(15, 23, 42, 0.9) 33.33%,
                rgba(30, 41, 59, 0.8) 35%,
                rgba(45, 27, 79, 0.7) 38%,
                
                /* Products Page (33.33-66.66%) */
                #0f172a 40%,
                #1e293b 45%,
                #2d1b4f 55%,
                rgba(162, 52, 179, 0.4) 60%,
                rgba(186, 86, 16, 0.3) 63%,
                
                /* Transition to Services (63-70%) */
                rgba(15, 23, 42, 0.8) 66.66%,
                rgba(30, 41, 59, 0.7) 68%,
                rgba(45, 27, 79, 0.6) 70%,
                
                /* Services Page (66.66-100%) */
                #0f172a 72%,
                #1e293b 78%,
                #2d1b4f 85%,
                rgba(255, 107, 53, 0.15) 92%,
                rgba(255, 140, 66, 0.1) 100%
              )
            `,
          }}
        />
        
        {/* Spanning Noise Texture - Consistent across all pages */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='spanningNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23spanningNoise)' opacity='0.8'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px'
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
            Debug Mode: Page {currentPage + 1}/3<br />
            Scroll Lock: {isScrollLocked ? 'On' : 'Off'}<br />
            Press Ctrl+D to toggle debug
          </div>
        </div>
      )}
      
      {/* Horizontal Scroll Container */}
      <motion.div
        className="flex w-[300vw] h-full"
        animate={{ x: `-${currentPage * 100}vw` }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
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
      </motion.div>

      {/* Navigation Pagination */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-[30]">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 rounded-full cursor-pointer"
            animate={{ backgroundColor: currentPage === index ? '#d946ef' : 'rgba(255,255,255,0.2)' }}
            onClick={() => setCurrentPage(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
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
  const styleElement = document.createElement('style');
  styleElement.innerHTML = debugStyles;
  document.head.appendChild(styleElement);
}

HorizontalProductScrollV6.displayName = 'HorizontalProductScrollV6';

export const metadata = {
  id: 'horizontal_product_scroll_v6',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_horizontal_product_scroll_v6.md',
};

export default HorizontalProductScrollV6;