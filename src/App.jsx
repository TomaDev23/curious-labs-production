import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

// Import BackgroundManager from sandbox (new implementation)
import BackgroundManager from './components/sandbox/BackgroundManager';

// Import native ThoughtTrails system
import thoughtTrails from './lib/thoughtTrails';

// 🚀 CRITICAL: Import Unified WebGL Provider to fix 19 WebGL contexts disaster
import { UnifiedWebGLProvider } from './3d/engine/UnifiedWebGLProvider';

// 🚀 PHASE 6: Import Performance Monitor for bundle optimization
import performanceMonitor, { generatePerformanceReport } from './lib/performanceMonitor';

// Main Page (critical, keep eager loaded)
// import Home from './pages/index.jsx'; // 🔄 COMMENTED OUT - Legacy index page, dead but keeping for component reference
import SafeV4CosmicPage from './pages/safe_v4_cosmic.jsx';
import JourneyV2 from './pages/journey-v2.jsx';
import LegacyIndexSafeReview from './pages/legacy_index_safe_review.jsx';

// Restore lazy loading for BackgroundSandbox
// import BackgroundSandbox from './pages/background_sandbox.jsx';

// Lazy-loaded pages for better performance
const ProductsPortal = lazy(() => import('./pages/products/index.jsx'));
const Aegis = lazy(() => import('./pages/products/aegis.jsx'));
const OpsPipe = lazy(() => import('./pages/products/opspipe.jsx'));
const MoonSignal = lazy(() => import('./pages/products/moonsignal.jsx'));
const Curious = lazy(() => import('./pages/products/curious.jsx'));
const Guardian = lazy(() => import('./pages/products/guardian.jsx'));
const Tools = lazy(() => import('./pages/tools.jsx'));
const FinalPurgePage = lazy(() => import('./pages/FinalPurgePage.jsx'));
const CodeLab = lazy(() => import('./pages/codelab.jsx'));
const Blog = lazy(() => import('./pages/blog.jsx'));
const About = lazy(() => import('./pages/about.jsx'));
const Contact = lazy(() => import('./pages/contact.jsx'));
const Documentation = lazy(() => import('./pages/docs.jsx'));
const NotFound = lazy(() => import('./pages/404.jsx'));

// Legacy and remaining pages - cleaned up after Phase 2 file removal
const DevV4CosmicPage = lazy(() => import('./pages/dev_v4_cosmic.jsx'));
const BackgroundSandbox = lazy(() => import('./pages/background_sandbox.jsx'));
// 🗑️ REMOVED: const BackgroundFinal = lazy(() => import('./pages/background_final.jsx')); - MOVED TO BACKUP
const HomeV5AtomicPage = lazy(() => import('./pages/HomeV5AtomicPage.jsx'));
// 🗑️ REMOVED: const V6HomePage = lazy(() => import('./pages/v6_home.jsx')); - MOVED TO BACKUP
const V6AtomicPage = lazy(() => import('./pages/v6_atomic.jsx'));
const V6ProductsPage = lazy(() => import('./pages/v6-products.tsx'));
const V6ProductsPage2 = lazy(() => import('./pages/v6-products2.tsx'));
// 🗑️ REMOVED: const OurProductsPage = lazy(() => import('./pages/our-products.jsx')); - MOVED TO BACKUP
// 🗑️ REMOVED: const ProcessComparisonPage = lazy(() => import('./pages/process_comparison.jsx')); - MOVED TO BACKUP
// 🗑️ REMOVED: const ScrollTestPage = lazy(() => import('./pages/demo/scroll-test.jsx')); - MOVED TO BACKUP
import CosmicRevDev from './pages/CosmicRevDev';
import HomeLayout from './layouts/HomeLayout';
const Museum = lazy(() => import('./pages/museum.jsx'));

// Remaining dev pages - cleaned up after Phase 2 file removal
// 🗑️ REMOVED: const ParallaxTest = lazy(() => import('./pages/dev/parallax-test.jsx')); - MOVED TO BACKUP
// 🗑️ REMOVED: const MouseParallaxTest = lazy(() => import('./pages/dev/mouse-parallax-test.jsx')); - MOVED TO BACKUP
const CombinedParallaxTest = lazy(() => import('./pages/dev/combined-parallax-test.jsx'));
// ✅ CONTAMINATION FIXED: Re-enabling dev routes
const PlanetSandboxPage = lazy(() => import('./pages/dev/planet-sandbox.jsx'));
// 🗑️ REMOVED: const DevIndex = lazy(() => import('./pages/dev/index.jsx')); - MOVED TO BACKUP
// 🗑️ REMOVED: const StellarABTest = lazy(() => import('./pages/dev/stellar-ab-test.jsx')); - MOVED TO BACKUP

// 🗑️ REMOVED: 3D ENGINE TEST PAGES - All moved to backup
// 🗑️ REMOVED: const Test3DPage = lazy(() => import('./pages/3d-test.jsx')); - MOVED TO BACKUP
// 🗑️ REMOVED: const Test3DPageSimple = lazy(() => import('./pages/3d-test-simple.jsx')); - MOVED TO BACKUP
// 🗑️ REMOVED: const Test3DPageDebug = lazy(() => import('./pages/3d-test-debug.jsx')); - MOVED TO BACKUP

// Performance monitoring context
const PerformanceContext = React.createContext({
  metrics: {},
  addMetric: () => {}
});

// Loading fallback component - simplified without legacy redirect
const LoadingFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-curious-dark-900">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-8"></div>
      <p className="text-white text-center max-w-md px-4">
        Loading the cosmic experience...
      </p>
    </div>
  );
};

// BackgroundManagerWrapper component that only renders on specific routes
const BackgroundManagerWrapper = () => {
  const location = useLocation();
  const allowedPaths = ['/', '/safe'];
  const shouldRenderBackground = allowedPaths.includes(location.pathname);
  
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [renderStart, setRenderStart] = useState(null);
  const { addMetric } = React.useContext(PerformanceContext);
  
  // Check for user's motion preference
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Set render start time for performance monitoring
    setRenderStart(performance.now());
    
    // Listen for changes
    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
      console.log(`User prefers reduced motion: ${e.matches}`);
    };
    
    // Modern browsers use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Older browsers use deprecated addListener
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  
  // Track render completion time
  useEffect(() => {
    return () => {
      if (renderStart && shouldRenderBackground) {
        const renderEnd = performance.now();
        const renderTime = renderEnd - renderStart;
        addMetric('backgroundManager', { 
          renderTime,
          route: location.pathname,
          timestamp: new Date().toISOString()
        });
        console.log(`BackgroundManager render time: ${renderTime.toFixed(2)}ms`);
      }
    };
  }, [renderStart, shouldRenderBackground, location.pathname, addMetric]);
  
  return shouldRenderBackground ? (
    <Suspense fallback={null}>
      <BackgroundManager />
    </Suspense>
  ) : null;
};

export default function App() {
  // Initialize native ThoughtTrails system once
  useEffect(() => {
    console.log('🌟 App: Initializing ThoughtTrails system...');
    
    // Initialize the cosmic trail system
    thoughtTrails.init();
    
    // Performance metrics
    const startTime = performance.now();
    
    // Listen for ready event
    const handleReady = () => {
      const endTime = performance.now();
      console.log(`🌟 ThoughtTrails ready in ${(endTime - startTime).toFixed(2)}ms`);
    };
    
    window.addEventListener('thoughtTrailsReady', handleReady);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('thoughtTrailsReady', handleReady);
      thoughtTrails.destroy();
      console.log('🌟 ThoughtTrails system cleaned up');
    };
  }, []); // Run once on mount
  
  // Performance metrics state
  const [metrics, setMetrics] = useState({});
  
  // Add performance metric
  const addMetric = (key, value) => {
    setMetrics(prev => {
      const newMetrics = { ...prev };
      if (!newMetrics[key]) {
        newMetrics[key] = [];
      }
      newMetrics[key].push(value);
      
      // Limit array size to prevent memory issues
      if (newMetrics[key].length > 50) {
        newMetrics[key] = newMetrics[key].slice(-50);
      }
      
      return newMetrics;
    });
  };
  
  // Log performance metrics periodically in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const intervalId = setInterval(() => {
        if (Object.keys(metrics).length > 0) {
          console.log('Performance metrics:', metrics);
        }
        
        // 🚀 PHASE 6: Generate bundle optimization report
        const optimizationReport = generatePerformanceReport();
        if (optimizationReport) {
          console.log('🎯 Phase 6 Bundle Optimization Status:', {
            bundleAnalysis: optimizationReport.bundle,
            memoryTrend: optimizationReport.memory?.growth || 0,
            chunkEfficiency: optimizationReport.bundle?.chunks?.successful / optimizationReport.bundle?.chunks?.total || 0
          });
        }
      }, 60000); // Log every minute
      
      return () => clearInterval(intervalId);
    }
  }, [metrics]);

  return (
    <UnifiedWebGLProvider>
      <PerformanceContext.Provider value={{ metrics, addMetric }}>
        <ScrollToTop />
        
        {/* BackgroundManager only renders on permitted routes */}
        <BackgroundManagerWrapper />
        
        <Routes>
          {/* 🚀 HOMEPAGE NOW OPTIMIZED: V6AtomicPage (bulletproof!) */}
          <Route path="/" element={
            <Suspense fallback={<LoadingFallback />}>
              <React.StrictMode>
                <ErrorBoundary fallback={<SafeV4CosmicPage />}>
                  <V6AtomicPage />
                </ErrorBoundary>
              </React.StrictMode>
            </Suspense>
          } />
          
          {/* 🏛️ MUSEUM: Code Museum - Development History Archive */}
          <Route path="/museum" element={
            <Suspense fallback={<LoadingFallback />}>
              <Museum />
            </Suspense>
          } />
          
          {/* 🏛️ MUSEUM: Original V4 Cosmic experience preserved */}
          <Route path="/dev-v4-cosmic" element={
            <Suspense fallback={<LoadingFallback />}>
              <React.StrictMode>
                <ErrorBoundary fallback={<SafeV4CosmicPage />}>
                  <DevV4CosmicPage />
                </ErrorBoundary>
              </React.StrictMode>
            </Suspense>
          } />
          
          {/* Safe fallback version that can be accessed directly */}
          <Route path="/safe" element={<SafeV4CosmicPage />} />
          
          <Route path="/products" element={
            <Suspense fallback={<LoadingFallback />}>
              <ProductsPortal />
            </Suspense>
          } />
          <Route path="/products/aegis" element={
            <Suspense fallback={<LoadingFallback />}>
              <Aegis />
            </Suspense>
          } />
          <Route path="/products/opspipe" element={
            <Suspense fallback={<LoadingFallback />}>
              <OpsPipe />
            </Suspense>
          } />
          <Route path="/products/moonsignal" element={
            <Suspense fallback={<LoadingFallback />}>
              <MoonSignal />
            </Suspense>
          } />
          <Route path="/products/curious" element={
            <Suspense fallback={<LoadingFallback />}>
              <Curious />
            </Suspense>
          } />
          <Route path="/products/guardian" element={
            <Suspense fallback={<LoadingFallback />}>
              <Guardian />
            </Suspense>
          } />
          
          {/* Our Products - New unified products page */}
          {/* <Route path="/our-products" element={
            <Suspense fallback={<LoadingFallback />}>
              <OurProductsPage />
            </Suspense>
          } /> */}
          
          <Route path="/tools" element={
            <Suspense fallback={<LoadingFallback />}>
              <Tools />
            </Suspense>
          } />
          <Route path="/tools/final-purge" element={
            <Suspense fallback={<LoadingFallback />}>
              <FinalPurgePage />
            </Suspense>
          } />
          <Route path="/codelab" element={
            <Suspense fallback={<LoadingFallback />}>
              <CodeLab />
            </Suspense>
          } />
          <Route path="/blog" element={
            <Suspense fallback={<LoadingFallback />}>
              <Blog />
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<LoadingFallback />}>
              <About />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<LoadingFallback />}>
              <Contact />
            </Suspense>
          } />
          <Route path="/docs" element={
            <Suspense fallback={<LoadingFallback />}>
              <Documentation />
            </Suspense>
          } />
          <Route path="/docs/*" element={
            <Suspense fallback={<LoadingFallback />}>
              <Documentation />
            </Suspense>
          } />
          {/* 🗑️ GO: /universe - bye */}
          {/* <Route path="/universe" element={
            <Suspense fallback={<LoadingFallback />}>
              <UniverseExperience />
            </Suspense>
          } /> */}
          
          {/* 🗑️ GO: /dev main index - bye */}
          {/* <Route path="/dev" element={
            <Suspense fallback={<LoadingFallback />}>
              <DevPage />
            </Suspense>
          } /> */}
          
          {/* 🗑️ GO: All dev routes except the KEEP ones */}
          {/* <Route path="/dev/index" element={
            <Suspense fallback={<LoadingFallback />}>
              <DevIndex />
            </Suspense>
          } /> */}
          
          {/* 🗑️ GO: /dev/parallax-test - bye */}
          {/* <Route path="/dev/parallax-test" element={
            <Suspense fallback={<LoadingFallback />}>
              <ParallaxTest />
            </Suspense>
          } /> */}
          
          {/* 🗑️ GO: /dev/mouse-parallax-test - bye */}
          {/* <Route path="/dev/mouse-parallax-test" element={
            <Suspense fallback={<LoadingFallback />}>
              <MouseParallaxTest />
            </Suspense>
          } /> */}
          
          {/* 🚨 KEEP: /dev/combined-parallax-test - handle last */}
          <Route path="/dev/combined-parallax-test" element={
            <Suspense fallback={<LoadingFallback />}>
              <CombinedParallaxTest />
            </Suspense>
          } />
          
          {/* 🚨 KEEP: /dev/planet-sandbox - KEEP!!!! (bring back when ready) */}
          <Route path="/dev/planet-sandbox" element={
            <Suspense fallback={<LoadingFallback />}>
              <PlanetSandboxPage />
            </Suspense>
          } />
          
          {/* 🔍 LEGACY REVIEW: Mount old index.jsx for examination */}
          {/* <Route path="/dev/legacy-index-review" element={
            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary fallback={<SafeV4CosmicPage />}>
                <LegacyIndexSafeReview />
              </ErrorBoundary>
            </Suspense>
          } /> */}
          
          {/* 🗑️ GO: /dev/stellar-ab-test - bye */}
          {/* <Route path="/dev/stellar-ab-test" element={
            <Suspense fallback={<LoadingFallback />}>
              <StellarABTest />
            </Suspense>
          } /> */}
          
          {/* 🗑️ GO: /background-final - bye */}
          {/* <Route path="/background-final" element={
            <Suspense fallback={<LoadingFallback />}>
              <BackgroundFinal />
            </Suspense>
          } /> */}
          
          {/* 🚨 KEEP: /background-sandbox - Background System Sandbox */}
          <Route path="/background-sandbox" element={
            <Suspense fallback={<LoadingFallback />}>
              <BackgroundSandbox />
            </Suspense>
          } />
          
          <Route path="/home-v5" element={
            <Suspense fallback={<LoadingFallback />}>
              <HomeV5AtomicPage />
            </Suspense>
          } />
          
          <Route path="/cosmic-rev" element={<CosmicRevDev />} />
          
          {/* 🗑️ GO: THE BIG ONE - /v6 main target - bye bye */}
          {/* <Route path="/v6" element={
            <Suspense fallback={<LoadingFallback />}>
              <React.StrictMode>
                <ErrorBoundary fallback={<SafeV4CosmicPage />}>
                  <V6HomePage />
                </ErrorBoundary>
              </React.StrictMode>
            </Suspense>
          } /> */}
          
          {/* 🚨 KEEP: V6 Products - static museum */}
          <Route path="/v6-products" element={
            <Suspense fallback={<LoadingFallback />}>
              <V6ProductsPage />
            </Suspense>
          } />
          
          <Route path="/v6-products2" element={
            <Suspense fallback={<LoadingFallback />}>
              <V6ProductsPage2 />
            </Suspense>
          } />
          
          {/* 🗑️ GO: /process-comparison - bye */}
          {/* <Route path="/process-comparison" element={
            <Suspense fallback={<LoadingFallback />}>
              <ProcessComparisonPage />
            </Suspense>
          } /> */}
          
          {/* 🗑️ GO: /demo/scroll-test - bye */}
          {/* <Route path="/demo/scroll-test" element={
            <Suspense fallback={<LoadingFallback />}>
              <ScrollTestPage />
            </Suspense>
          } /> */}
          
          {/* 🗑️ GO: 3D test pages - bye */}
          {/* <Route path="/3d-test" element={
            <Suspense fallback={<LoadingFallback />}>
              <Test3DPage />
            </Suspense>
          } /> */}
          
          {/* <Route path="/3d-test-simple" element={
            <Suspense fallback={<LoadingFallback />}>
              <Test3DPageSimple />
            </Suspense>
          } /> */}
          
          {/* <Route path="/3d-test-debug" element={
            <Suspense fallback={<LoadingFallback />}>
              <Test3DPageDebug />
            </Suspense>
          } /> */}
          
          <Route path="*" element={
            <Suspense fallback={<LoadingFallback />}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </PerformanceContext.Provider>
    </UnifiedWebGLProvider>
  );
}
