import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// ✅ NEW: Import CosmicLoader for 3D routes
const CosmicLoader = lazy(() => import('./components/CosmicLoader'));

// 🚀 CRITICAL: Lazy load UnifiedWebGLProvider to prevent bundling all 3D code upfront
const UnifiedWebGLProvider = lazy(() => import('./3d/engine/UnifiedWebGLProvider').then(module => ({ default: module.UnifiedWebGLProvider })));

// 🚀 LAZY LOAD EVERYTHING - Even basic components for maximum optimization
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const ErrorBoundary = lazy(() => import('./components/ErrorBoundary'));
const BackgroundManager = lazy(() => import('./components/sandbox/BackgroundManager'));
const SafeV4CosmicPage = lazy(() => import('./pages/safe_v4_cosmic.jsx'));
const JourneyV2 = lazy(() => import('./pages/journey-v2.jsx'));
const LegacyIndexSafeReview = lazy(() => import('./pages/legacy_index_safe_review.jsx'));
const CosmicRevDev = lazy(() => import('./pages/CosmicRevDev'));
const HomeLayout = lazy(() => import('./layouts/HomeLayout'));

// ✅ SLEEP-UNTIL-CALLED: All pages lazy loaded with route-level splitting
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

// ✅ 3D ROUTES: Only these 3 pages need 3D
// 🎯 V7 UPDATE: Homepage now uses wrapper for 3D isolation
const HomePage_v7_wrapper = lazy(() => import('./pages/HomePage_v7_wrapper.jsx')); // Homepage - 3D isolated to component level
const CosmicRevPage = lazy(() => import('./pages/cosmic-rev.jsx')); // Cosmic route - 3D with loader
const PlanetSandboxWithStarsPage = lazy(() => import('./pages/dev/planet-sandbox-with-stars.jsx')); // Dev 3D route

// ✅ NON-3D ROUTES: Clean routes with no 3D overhead
const DevV4CosmicPage = lazy(() => import('./pages/dev_v4_cosmic.jsx'));
const BackgroundSandbox = lazy(() => import('./pages/background_sandbox.jsx'));
const HomeV5AtomicPage = lazy(() => import('./pages/HomeV5AtomicPage.jsx'));
const V6ProductsPage = lazy(() => import('./pages/v6-products.tsx'));
const V6ProductsPage2 = lazy(() => import('./pages/v6-products2.tsx'));
const Museum = lazy(() => import('./pages/museum.jsx'));
const CombinedParallaxTest = lazy(() => import('./pages/dev/combined-parallax-test.jsx'));
const PlanetSandboxPage = lazy(() => import('./pages/dev/planet-sandbox.jsx'));

// 🚀 LAZY LOAD HEAVY UTILS - Only load when needed
const loadThoughtTrails = () => import('./lib/thoughtTrails');
const loadPerformanceMonitor = () => import('./lib/performanceMonitor');

// Performance monitoring context
const PerformanceContext = React.createContext({
  metrics: {},
  addMetric: () => {}
});

// ✅ NEW: Simple loading fallback for non-3D routes
const SimpleLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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

// 🚀 OPTIMIZED: Lazy load ThoughtTrails system only when needed
const useThoughtTrails = () => {
  const location = useLocation();
  const [thoughtTrails, setThoughtTrails] = useState(null);
  
  useEffect(() => {
    // Only load ThoughtTrails on specific pages that need it
    const pagesNeedingTrails = ['/products', '/tools'];
    const needsTrails = pagesNeedingTrails.some(path => location.pathname.startsWith(path));
    
    if (needsTrails && !thoughtTrails) {
      console.log('🌟 Loading ThoughtTrails system for:', location.pathname);
      
      loadThoughtTrails().then(({ default: thoughtTrailsModule }) => {
        setThoughtTrails(thoughtTrailsModule);
        thoughtTrailsModule.init();
        
        window.addEventListener('thoughtTrailsReady', () => {
          console.log('🌟 ThoughtTrails ready for:', location.pathname);
        });
      });
    } else if (!needsTrails && thoughtTrails) {
      console.log('🌟 Cleaning up ThoughtTrails for:', location.pathname);
      thoughtTrails.destroy();
      setThoughtTrails(null);
    }
    
    return () => {
      if (thoughtTrails) {
        thoughtTrails.destroy();
      }
    };
  }, [location.pathname, thoughtTrails]);
  
  return thoughtTrails;
};

export default function App() {
  const location = useLocation();
  const [metrics, setMetrics] = useState({});
  
  // 🎯 REMOVED: Conditional 3D detection and double wrapping
  // Let components handle their own 3D context needs
  // const routes3D = ['/', '/cosmic-rev', '/dev/planet-sandbox-with-stars'];
  // const needs3D = routes3D.includes(location.pathname);

  const addMetric = (key, value) => {
    setMetrics(prev => ({
      ...prev,
      [key]: {
        ...value,
        timestamp: Date.now()
      }
    }));
  };

  // 🚀 SURGICAL FIX: Remove conditional 3D wrapping - let components handle their own context
  // 🚀 OPTIMIZED: Lazy load performance monitoring only in development
  useEffect(() => {
    // ⛔ DISABLED: Performance monitoring temporarily disabled for audit
    return;
    
    if (process.env.NODE_ENV === 'development') {
      loadPerformanceMonitor().then(({ generatePerformanceReport }) => {
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
      });
    }
  }, [metrics]);

  return (
    <Suspense fallback={null}>
      <PerformanceContext.Provider value={{ metrics, addMetric }}>
        {/* 🚀 SURGICAL FIX: Remove conditional 3D wrapping - let components handle their own context */}
        <AppRoutes />
      </PerformanceContext.Provider>
    </Suspense>
  );
}

// 🎯 ROUTES COMPONENT: Single source of truth for all routes
const AppRoutes = () => (
  <>
    <Suspense fallback={null}>
      <ScrollToTop />
    </Suspense>
    
    {/* BackgroundManager only renders on permitted routes */}
    <BackgroundManagerWrapper />
    
    <Routes>
      {/* 🚀 HOMEPAGE V7 ISOLATED: HomePage_v7_wrapper (3D engine isolated!) */}
      <Route path="/" element={
        <Suspense fallback={<SimpleLoader />}>
          {import.meta.env.DEV ? (
            <React.StrictMode>
              <Suspense fallback={<SafeV4CosmicPage />}>
                <ErrorBoundary fallback={<SafeV4CosmicPage />}>
                  <HomePage_v7_wrapper />
                </ErrorBoundary>
              </Suspense>
            </React.StrictMode>
          ) : (
            <Suspense fallback={<SafeV4CosmicPage />}>
              <ErrorBoundary fallback={<SafeV4CosmicPage />}>
                <HomePage_v7_wrapper />
              </ErrorBoundary>
            </Suspense>
          )}
        </Suspense>
      } />
      
      {/* 🏛️ MUSEUM: Code Museum - Development History Archive */}
      <Route path="/museum" element={
        <Suspense fallback={<SimpleLoader />}>
          <Museum />
        </Suspense>
      } />
      
      {/* 🏛️ MUSEUM: Original V4 Cosmic experience preserved */}
      <Route path="/dev-v4-cosmic" element={
        <Suspense fallback={<SimpleLoader />}>
          {import.meta.env.DEV ? (
            <React.StrictMode>
              <Suspense fallback={<SafeV4CosmicPage />}>
                <ErrorBoundary fallback={<SafeV4CosmicPage />}>
                  <DevV4CosmicPage />
                </ErrorBoundary>
              </Suspense>
            </React.StrictMode>
          ) : (
            <Suspense fallback={<SafeV4CosmicPage />}>
              <ErrorBoundary fallback={<SafeV4CosmicPage />}>
                <DevV4CosmicPage />
              </ErrorBoundary>
            </Suspense>
          )}
        </Suspense>
      } />
      
      {/* Safe fallback version that can be accessed directly */}
      <Route path="/safe" element={
        <Suspense fallback={<SimpleLoader />}>
          <SafeV4CosmicPage />
        </Suspense>
      } />
      
      <Route path="/products" element={
        <Suspense fallback={<SimpleLoader />}>
          <ProductsPortal />
        </Suspense>
      } />
      <Route path="/products/aegis" element={
        <Suspense fallback={<SimpleLoader />}>
          <Aegis />
        </Suspense>
      } />
      <Route path="/products/opspipe" element={
        <Suspense fallback={<SimpleLoader />}>
          <OpsPipe />
        </Suspense>
      } />
      <Route path="/products/moonsignal" element={
        <Suspense fallback={<SimpleLoader />}>
          <MoonSignal />
        </Suspense>
      } />
      <Route path="/products/curious" element={
        <Suspense fallback={<SimpleLoader />}>
          <Curious />
        </Suspense>
      } />
      <Route path="/products/guardian" element={
        <Suspense fallback={<SimpleLoader />}>
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
        <Suspense fallback={<SimpleLoader />}>
          <Tools />
        </Suspense>
      } />
      <Route path="/tools/final-purge" element={
        <Suspense fallback={<SimpleLoader />}>
          <FinalPurgePage />
        </Suspense>
      } />
      <Route path="/codelab" element={
        <Suspense fallback={<SimpleLoader />}>
          <CodeLab />
        </Suspense>
      } />
      <Route path="/blog" element={
        <Suspense fallback={<SimpleLoader />}>
          <Blog />
        </Suspense>
      } />
      <Route path="/about" element={
        <Suspense fallback={<SimpleLoader />}>
          <About />
        </Suspense>
      } />
      <Route path="/contact" element={
        <Suspense fallback={<SimpleLoader />}>
          <Contact />
        </Suspense>
      } />
      <Route path="/docs" element={
        <Suspense fallback={<SimpleLoader />}>
          <Documentation />
        </Suspense>
      } />
      <Route path="/docs/*" element={
        <Suspense fallback={<SimpleLoader />}>
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
        <Suspense fallback={<SimpleLoader />}>
          <CombinedParallaxTest />
        </Suspense>
      } />
      
      {/* 🚨 ISOLATED: /dev/planet-sandbox - TEMPORARILY UNMOUNTED */}
      {/* Route will be restored once system is fully optimized */}
      {/* <Route path="/dev/planet-sandbox" element={
        <Suspense fallback={<LoadingFallback />}>
          <PlanetSandboxPage />
        </Suspense>
      } /> */}
      
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
        <Suspense fallback={<SimpleLoader />}>
          <BackgroundSandbox />
        </Suspense>
      } />
      
      <Route path="/home-v5" element={
        <Suspense fallback={<SimpleLoader />}>
          <HomeV5AtomicPage />
        </Suspense>
      } />
      
      {/* ✅ NEW: 3D ROUTES WITH COSMIC LOADER */}
      {/* 🚀 Cosmic Rev - 3D route with cosmic loading experience */}
      <Route path="/cosmic-rev" element={
        <Suspense fallback={
          <Suspense fallback={<SimpleLoader />}>
            <CosmicLoader message="🌌 Preparing cosmic revision interface..." />
          </Suspense>
        }>
          <CosmicRevPage />
        </Suspense>
      } />
      
      {/* 🚀 Planet Sandbox with Stars - 3D dev route with cosmic loading */}
      <Route path="/dev/planet-sandbox-with-stars" element={
        <Suspense fallback={
          <Suspense fallback={<SimpleLoader />}>
            <CosmicLoader message="🪐 Warming up stellar engines..." />
          </Suspense>
        }>
          <PlanetSandboxWithStarsPage />
        </Suspense>
      } />
      
      {/* 🚨 KEEP: V6 Products - static museum */}
      <Route path="/v6-products" element={
        <Suspense fallback={<SimpleLoader />}>
          <V6ProductsPage />
        </Suspense>
      } />
      
      <Route path="/v6-products2" element={
        <Suspense fallback={<SimpleLoader />}>
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
        <Suspense fallback={<SimpleLoader />}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  </>
);
