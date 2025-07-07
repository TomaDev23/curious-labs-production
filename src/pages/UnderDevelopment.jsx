// ✅ KEEP - UNDER DEVELOPMENT - FALLBACK PAGE
// 🔴 CODE: DEV-001
// 🚧 STATUS: UNDER DEVELOPMENT FALLBACK - PRODUCTION READY
// 📋 COMPONENTS: MissionControlNavbar, BackgroundLayerAtomic, ScrollToTop
// 🧬 FEATURES: Development status, progress indicators, contact CTA
// ⚠️ WARNING: FALLBACK PAGE FOR UNFINISHED ROUTES
// 📊 BUNDLE: Uses atomic background system, mobile optimized
// 🎯 ROUTE: Fallback for 404/unfinished product pages

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import ScrollToTop from '../components/ScrollToTop';
import BackgroundLayerAtomic from '../components/atomic/BackgroundLayerAtomic';

// ✅ KEEP - UNDER DEVELOPMENT COMPONENT
import { motion } from '../FramerProvider';

// 🚨 MOBILE OPTIMIZATION: Add mobile detection
import { useUnifiedMobile } from '../hooks/useBreakpoint';

// 🚨 PRODUCTION CLEANUP: Safe environment variable access
const getEnvVar = (key, defaultValue = '') => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }
  return defaultValue;
};

// 🚨 PRODUCTION CLEANUP: Conditional logging
const isDev = getEnvVar('NODE_ENV') === 'development';
const debugLog = (...args) => {
  if (isDev) console.log(...args);
};

export default function UnderDevelopment() {
  // 🚨 MOBILE OPTIMIZATION: Mobile detection
  const { isMobile } = useUnifiedMobile();
  const location = useLocation();
  
  // 🚨 PRODUCTION CLEANUP: Debug initialization
  if (isDev) {
    debugLog('🚧 [DEV] Under Development page initializing...');
    debugLog('📍 [ROUTE] Current path:', location.pathname);
  }

  const [missionTime, setMissionTime] = useState(new Date());
  const [progressPhase, setProgressPhase] = useState(0);
  
  // 🚨 MOBILE OPTIMIZATION: Reduce timer frequency on mobile
  useEffect(() => {
    const interval = isMobile ? 5000 : 1000; // 5s on mobile, 1s on desktop
    const timer = setInterval(() => {
      setMissionTime(new Date());
    }, interval);
    return () => clearInterval(timer);
  }, [isMobile]);

  // Progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgressPhase((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // 🚨 MOBILE OPTIMIZATION: Simplified motion props for mobile
  const getMotionProps = (desktopProps) => {
    if (isMobile) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0 }
      };
    }
    return desktopProps;
  };

  // Extract product name from path
  const getProductName = (pathname) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length >= 2 && segments[0] === 'products') {
      return segments[1].charAt(0).toUpperCase() + segments[1].slice(1);
    }
    return 'Product';
  };

  const productName = getProductName(location.pathname);
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-['Space_Grotesk']">
      <Helmet>
        <title>{productName} - Under Development | CuriousLabs</title>
        <meta name="description" content={`${productName} is currently under development. We're working hard to bring you this amazing product. Stay tuned for updates!`} />
        <meta property="og:title" content={`${productName} - Under Development | CuriousLabs`} />
        <meta property="og:description" content={`${productName} is currently under development. We're working hard to bring you this amazing product.`} />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://curiouslabs.io${location.pathname}`} />
      </Helmet>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* 🚨 MOBILE OPTIMIZATION: Reduce atmospheric effects on mobile */}
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-2xl" />
        </div>
      )}
      
      <MissionControlNavbar />
      
      {/* 🚨 MOBILE OPTIMIZATION: Simplified mission status on mobile */}
      <motion.div 
        className="fixed top-20 right-4 z-50 bg-black/80 backdrop-blur-md border border-blue-400/30 rounded-lg p-3 text-xs"
        {...getMotionProps({
          initial: { opacity: 0, x: 100 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.5 }
        })}
      >
        <div className="text-blue-400 font-mono mb-1">DEV STATUS</div>
        <div className="text-white font-mono">{missionTime.toUTCString().slice(17, 25)} UTC</div>
        <div className="flex items-center gap-2 mt-1">
          <div className={`w-2 h-2 bg-blue-400 rounded-full ${!isMobile ? 'animate-pulse' : ''}`} />
          <span className="text-blue-400">IN PROGRESS</span>
        </div>
      </motion.div>
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16 relative z-10">
        {/* Main Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
          <motion.div
            {...getMotionProps({
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1, ease: "easeOut" }
            })}
            className="mb-8"
          >
            {/* Development Icon */}
            <motion.div
              className="inline-block mb-8 relative"
              {...getMotionProps({
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 1, delay: 0.3, ease: "easeOut" }
              })}
            >
              <motion.div
                className="relative w-32 h-32 mx-auto"
                {...(!isMobile && {
                  animate: { rotate: 360 },
                  transition: { duration: 20, repeat: Infinity, ease: "linear" }
                })}
              >
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50">
                  <span className="text-6xl">🚧</span>
                </div>
                {/* Orbital rings */}
                {!isMobile && (
                  <>
                    <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-4 border border-purple-400/40 rounded-full animate-spin-reverse"></div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            {...getMotionProps({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.3 }
            })}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
              <span className="text-blue-400 font-mono text-sm tracking-wider">DEV-001</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 text-transparent bg-clip-text">
                {productName}
              </span>
            </h1>
            
            <div className="text-xl sm:text-2xl text-blue-400 font-mono mb-4 tracking-wide">
              UNDER DEVELOPMENT
            </div>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              We're working hard to bring you this amazing product. Our development team is crafting something special 
              that will enhance your experience with the CuriousLabs ecosystem.
            </p>
          </motion.div>
          
          {/* Progress Indicators */}
          <motion.div
            {...getMotionProps({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.6 }
            })}
            className="mb-16"
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-blue-400 font-mono text-sm">DEVELOPMENT PROGRESS</span>
              </div>
              
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      i <= progressPhase ? 'bg-blue-400' : 'bg-gray-600'
                    } ${i === progressPhase && !isMobile ? 'animate-pulse' : ''}`}
                  />
                ))}
              </div>
              
              <div className="text-center text-gray-400 text-sm font-mono">
                {['PLANNING', 'BUILDING', 'TESTING', 'LAUNCHING'][progressPhase]}
              </div>
            </div>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            {...getMotionProps({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.9 }
            })}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <Link 
              to="/contact" 
              className={`group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 ${!isMobile ? 'transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25' : ''}`}
            >
              <span className="flex items-center justify-center gap-2">
                GET NOTIFIED
                <svg className={`w-4 h-4 ${!isMobile ? 'group-hover:translate-x-1' : ''} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 3v4a1 1 0 01-1 1H5m5-4L4 10v10a2 2 0 002 2h4" />
                </svg>
              </span>
            </Link>
            <Link 
              to="/products" 
              className={`group bg-black/40 backdrop-blur-md border border-blue-500/50 text-white hover:bg-blue-500/10 hover:border-blue-400 font-medium py-4 px-8 rounded-lg transition-all duration-300`}
            >
              <span className="flex items-center justify-center gap-2">
                EXPLORE OTHER PRODUCTS
                <svg className={`w-4 h-4 ${!isMobile ? 'group-hover:rotate-45' : ''} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </Link>
          </motion.div>

          {/* Development Timeline */}
          <motion.div
            {...getMotionProps({
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 1.2 }
            })}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-black/30 backdrop-blur-md border border-blue-400/20 rounded-2xl p-8 hover:border-blue-400/40 transition-all duration-300">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                What We're Building
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Advanced Features",
                    description: "Cutting-edge functionality designed for maximum efficiency and user experience.",
                    icon: "⚡",
                    status: "IN PROGRESS"
                  },
                  {
                    title: "Seamless Integration",
                    description: "Perfect compatibility with the entire CuriousLabs ecosystem and third-party tools.",
                    icon: "🔗",
                    status: "PLANNING"
                  },
                  {
                    title: "Enterprise Ready",
                    description: "Built for scale with enterprise-grade security, reliability, and performance.",
                    icon: "🏢",
                    status: "TESTING"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-black/20 backdrop-blur-sm border border-blue-400/20 rounded-lg p-6 text-center">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                    <div className="flex items-center justify-center gap-1">
                      <div className={`w-2 h-2 bg-blue-400 rounded-full ${!isMobile ? 'animate-pulse' : ''}`}></div>
                      <span className="text-blue-400 text-xs font-mono">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      
      <ScrollToTop />
    </div>
  );
} 