/**
 * 🔴 KEEP - ATOMIC BUILD - MAIN HOMEPAGE 🔴
 * 🏠 CODE: ATOMIC-HOME-001
 * 🚨 DO NOT REMOVE - THIS IS THE LIVE HOMEPAGE
 * 
 * @page v6_atomic.jsx
 * @desc Atomic rebuild of CuriousLabs V6 homepage with Smart Lazy Loading
 * @status Production Ready - Smart Loading Integrated
 * @structure Flat scene-based components with intelligent loading strategies
 * @source Forked from: v6_home.jsx
 * @performance Smart lazy loading with viewport-based strategies
 */

import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
// 🔴 KEEP - ATOMIC CONTROLLERS 🔴
import SceneControllerV6 from '../components/home/v6/SceneControllerV6'; // CODE: ATOMIC-CTRL-001
import LayoutWrapper from '../components/home/v6/LayoutWrapper'; // CODE: ATOMIC-CTRL-002
import CosmicBackgroundSystemV6 from '../components/home/v6/CosmicBackgroundSystemV6'; // CODE: ATOMIC-CTRL-003

// 🚀 NEW - SMART LAZY LOADING SYSTEM
import SmartLazySection from '../components/lazy/SmartLazySection';

// --- TEMPORARY: Scene imports will be replaced one by one ---
// import HeroSequenceV6 from '../components/home/v6/HeroSequenceV6'; // Removed
// import HorizontalProductScrollV6 from '../components/home/v6/HorizontalProductScrollV6'; // Removed
// import ServicesOrbital from '../components/home/v6/ServicesOrbital'; // Removed
// import ProcessCards from '../components/home/v6/ProcessCards'; // Removed
// import MissionStatementV6 from '../components/home/v6/MissionStatementV6'; // Removed
// import ContactTerminal from '../components/home/v6/ContactTerminal'; // Removed

// --- 🔴 KEEP - ATOMIC COMPONENTS 🔴 ---
// 🚀 OPTIMIZED: Smart lazy load critical components with strategic loading distances
const HeroAtomic = lazy(() => import('../components/atomic/HeroAtomic')); // CODE: ATOMIC-COMP-001
const MissionAtomic = lazy(() => import('../components/atomic/MissionAtomic')); // CODE: ATOMIC-COMP-003 - Smart lazy loading
const HorizontalProductScrollV6 = lazy(() => import('../components/atomic/Products/HorizontalProductScrollV6')); // CODE: ATOMIC-COMP-004 - Preemptive loading
const ServicesOrbitalAtomic = lazy(() => import('../components/atomic/ServicesOrbitalAtomic')); // CODE: ATOMIC-COMP-005 - Standard lazy loading
const ContactTerminalAtomic = lazy(() => import('../components/atomic/ContactTerminalAtomic')); // CODE: ATOMIC-COMP-006 - Late loading

// Keep ProcessLegacyAtomic eager since it's smaller and configured as non-lazy
import ProcessLegacyAtomic from '../components/atomic/ProcessLegacyAtomic'; // CODE: ATOMIC-COMP-002

// 🚀 PERFORMANCE MONITORING - Track loading performance
const usePerformanceMonitoring = () => {
  React.useEffect(() => {
    // Mark homepage navigation start
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark('homepage-start');
      
      // Track when page is fully interactive
      const markInteractive = () => {
        performance.mark('homepage-interactive');
        if (performance.measure) {
          try {
            performance.measure('homepage-load-time', 'homepage-start', 'homepage-interactive');
            const measure = performance.getEntriesByName('homepage-load-time')[0];
            console.log(`📊 Homepage Load Time: ${Math.round(measure.duration)}ms`);
          } catch (e) {
            // Ignore measurement errors
          }
        }
      };

      // Mark interactive after a small delay to ensure components are ready
      const timer = setTimeout(markInteractive, 1000);
      return () => clearTimeout(timer);
    }
  }, []);
};

const V6AtomicPage = () => {
  // Initialize performance monitoring
  usePerformanceMonitoring();

  return (
    <SceneControllerV6>
      <LayoutWrapper>
        <CosmicBackgroundSystemV6 />

        {/* 🔴 VISIBLE DEBUG MARKER - UPDATED WITH SMART LOADING INFO 🔴 */}
        <div className="fixed bottom-4 right-4 z-[9999] bg-red-600/95 backdrop-blur-sm border-2 border-red-400 rounded-lg px-3 py-2 shadow-xl">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-white font-bold text-xs">
              🏠 ATOMIC-HOME-001
            </span>
          </div>
          <div className="text-red-200 text-xs font-mono mt-1">
            Smart Loading Active
          </div>
        </div>

        {/* 🔴 ATOMIC SCENES WITH SMART LOADING - ALL KEEP 🔴 */}
        
        {/* Hero - Immediate load (no lazy loading wrapper) */}
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-8 h-8 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <HeroAtomic />
        </Suspense>
        
        {/* Mission - Early loading strategy */}
        <SmartLazySection componentName="MissionAtomic">
          <MissionAtomic />
        </SmartLazySection>
        
        {/* Products - Preemptive loading for heavy component */}
        <SmartLazySection componentName="HorizontalProductScrollV6">
          <HorizontalProductScrollV6 />
        </SmartLazySection>
        
        {/* Services - Standard loading strategy */}
        <SmartLazySection componentName="ServicesOrbitalAtomic">
          <ServicesOrbitalAtomic />
        </SmartLazySection>
        
        {/* Process - Keep eager (no lazy loading) */}
        <ProcessLegacyAtomic />
        
        {/* Contact - Late loading strategy */}
        <SmartLazySection componentName="ContactTerminalAtomic">
          <ContactTerminalAtomic />
        </SmartLazySection>
        
        {/* 🔴 ATOMIC SCENES END 🔴 */}

      </LayoutWrapper>
    </SceneControllerV6>
  );
};

export default V6AtomicPage; 