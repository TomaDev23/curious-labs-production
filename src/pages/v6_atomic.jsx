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
// Lazy load HeroAtomic to prevent Three.js contamination
const HeroAtomic = lazy(() => import('../components/atomic/HeroAtomic')); // CODE: ATOMIC-COMP-001
import ProcessLegacyAtomic from '../components/atomic/ProcessLegacyAtomic'; // CODE: ATOMIC-COMP-002
import MissionAtomic from '../components/atomic/MissionAtomic'; // CODE: ATOMIC-COMP-003
// import ProductScrollAtomic from '../components/atomic/ProductScrollAtomic'; // Removed
import OurProducts_newV6 from '../components/atomic/OurProducts_newV6'; // CODE: ATOMIC-COMP-004 (102KB needs optimization)
import ServicesOrbitalAtomic from '../components/atomic/ServicesOrbitalAtomic'; // CODE: ATOMIC-COMP-005
import ContactTerminalAtomic from '../components/atomic/ContactTerminalAtomic'; // CODE: ATOMIC-COMP-006

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
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-white/60">Loading Hero...</div>
          </div>
        }>
          <HeroAtomic />
        </Suspense>
        <MissionAtomic />
        <OurProducts_newV6 />
        <ServicesOrbitalAtomic />
        <ProcessLegacyAtomic />
        <ContactTerminalAtomic />
        {/* 🔴 ATOMIC SCENES END 🔴 */}

      </LayoutWrapper>
    </SceneControllerV6>
  );
};

export default V6AtomicPage; 