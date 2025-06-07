/**
 * 🔴 KEEP - ATOMIC BUILD - MAIN HOMEPAGE 🔴
 * 🏠 CODE: ATOMIC-HOME-001
 * 🚨 DO NOT REMOVE - THIS IS THE LIVE HOMEPAGE
 * 
 * @page v6_atomic.jsx
 * @desc Atomic rebuild of CuriousLabs V6 homepage
 * @status Experimental – In development
 * @structure Flat scene-based components, no nested layout controllers
 * @source Forked from: v6_home.jsx
 */

import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
// 🔴 KEEP - ATOMIC CONTROLLERS 🔴
import SceneControllerV6 from '../components/home/v6/SceneControllerV6'; // CODE: ATOMIC-CTRL-001
import LayoutWrapper from '../components/home/v6/LayoutWrapper'; // CODE: ATOMIC-CTRL-002
import CosmicBackgroundSystemV6 from '../components/home/v6/CosmicBackgroundSystemV6'; // CODE: ATOMIC-CTRL-003

// --- TEMPORARY: Scene imports will be replaced one by one ---
// import HeroSequenceV6 from '../components/home/v6/HeroSequenceV6'; // Removed
// import HorizontalProductScrollV6 from '../components/home/v6/HorizontalProductScrollV6'; // Removed
// import ServicesOrbital from '../components/home/v6/ServicesOrbital'; // Removed
// import ProcessCards from '../components/home/v6/ProcessCards'; // Removed
// import MissionStatementV6 from '../components/home/v6/MissionStatementV6'; // Removed
// import ContactTerminal from '../components/home/v6/ContactTerminal'; // Removed

// --- 🔴 KEEP - ATOMIC COMPONENTS 🔴 ---
// 🚀 OPTIMIZED: Lazy load critical components for better bundle splitting
const HeroAtomic = lazy(() => import('../components/atomic/HeroAtomic')); // CODE: ATOMIC-COMP-001
const MissionAtomic = lazy(() => import('../components/atomic/MissionAtomic')); // CODE: ATOMIC-COMP-003 - Convert to lazy
const OurProducts_newV6 = lazy(() => import('../components/atomic/OurProducts_newV6')); // CODE: ATOMIC-COMP-004 (102KB - MUST be lazy)
const ServicesOrbitalAtomic = lazy(() => import('../components/atomic/ServicesOrbitalAtomic')); // CODE: ATOMIC-COMP-005 - Convert to lazy
const ContactTerminalAtomic = lazy(() => import('../components/atomic/ContactTerminalAtomic')); // CODE: ATOMIC-COMP-006 - Convert to lazy

// Keep ProcessLegacyAtomic eager since it's smaller and less likely to cause issues
import ProcessLegacyAtomic from '../components/atomic/ProcessLegacyAtomic'; // CODE: ATOMIC-COMP-002

// Optimized loading component - SIMPLIFIED
const AtomicSectionLoader = ({ children, sectionName }) => (
  <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  }>
    {children}
  </Suspense>
);

const V6AtomicPage = () => {
  return (
    <SceneControllerV6>
      <LayoutWrapper>
        <CosmicBackgroundSystemV6 />

        {/* 🔴 VISIBLE RED DEBUG MARKER - MOVED TO CORNER 🔴 */}
        <div className="fixed bottom-4 right-4 z-[9999] bg-red-600/95 backdrop-blur-sm border-2 border-red-400 rounded-lg px-3 py-2 shadow-xl">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-white font-bold text-xs">
              🏠 ATOMIC-HOME-001
            </span>
          </div>
          <div className="text-red-200 text-xs font-mono mt-1">
            Main Homepage - KEEP
          </div>
        </div>

        {/* 🔴 ATOMIC SCENES START HERE - ALL KEEP 🔴 */}
        <AtomicSectionLoader sectionName="Hero">
          <HeroAtomic />
        </AtomicSectionLoader>
        
        <AtomicSectionLoader sectionName="Mission">
          <MissionAtomic />
        </AtomicSectionLoader>
        
        <AtomicSectionLoader sectionName="Products">
          <OurProducts_newV6 />
        </AtomicSectionLoader>
        
        <AtomicSectionLoader sectionName="Services">
          <ServicesOrbitalAtomic />
        </AtomicSectionLoader>
        
        <ProcessLegacyAtomic />
        
        <AtomicSectionLoader sectionName="Contact">
          <ContactTerminalAtomic />
        </AtomicSectionLoader>
        {/* 🔴 ATOMIC SCENES END 🔴 */}

      </LayoutWrapper>
    </SceneControllerV6>
  );
};

export default V6AtomicPage; 