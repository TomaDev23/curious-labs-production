// ✅ KEEP - PRODUCTS PORTAL - CRITICAL PRODUCTION PAGE
// 🔴 CODE: PROD-PORTAL-001
// 🛍️ STATUS: MAIN PRODUCTS LANDING PAGE - CORE NAVBAR ROUTE
// 📋 COMPONENTS: MissionControlNavbar, BackgroundLayerAtomic, SolarSystemLayout
// 🧬 SUB-ROUTES: /aegis, /opspipe, /moonsignal, /curious, /guardian
// ⚠️ WARNING: DO NOT REMOVE - CORE NAVBAR ROUTE
// 📊 BUNDLE: Uses atomic background system
// 🎯 ROUTE: /products

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';
import SolarSystemLayout from '../../components/SolarSystemLayout';
import FooterExperience from '../../components/home/v4/FooterExperience';

// Product data for mobile view
import {  motion  } from '../../FramerProvider';

// Enhanced Typography CSS Styles
const typographyStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
  
  .font-inter-enhanced { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
  .font-playfair-enhanced { font-family: 'Playfair Display', Georgia, serif; }
  .font-mono-enhanced { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
  
  .text-hero-cosmic { font-size: clamp(3rem, 8vw, 6rem); font-weight: 800; line-height: 0.9; }
  .text-display-cosmic { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; line-height: 1.1; }
  .text-headline-cosmic { font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: 600; line-height: 1.2; }
  .text-subhead-cosmic { font-size: clamp(1.125rem, 3vw, 1.5rem); font-weight: 500; line-height: 1.4; }
  .text-body-cosmic { font-size: clamp(1rem, 2.5vw, 1.125rem); font-weight: 400; line-height: 1.6; }
  .text-caption-cosmic { font-size: clamp(0.875rem, 2vw, 1rem); font-weight: 400; line-height: 1.5; }
  .text-mono-cosmic { font-size: clamp(0.75rem, 1.5vw, 0.875rem); font-weight: 500; letter-spacing: 0.05em; }
  
  .gradient-cosmic-primary { background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .gradient-cosmic-curious { background: linear-gradient(135deg, #ec4899, #f43f5e, #ef4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .gradient-cosmic-guardian { background: linear-gradient(135deg, #f59e0b, #fbbf24, #facc15); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .gradient-cosmic-opspipe { background: linear-gradient(135deg, #06b6d4, #0891b2, #0e7490); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .gradient-cosmic-moonsignal { background: linear-gradient(135deg, #8b5cf6, #7c3aed, #6d28d9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .gradient-cosmic-aegis { background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706, #92400e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  
  .text-glow-cosmic { text-shadow: 0 0 10px rgba(251, 191, 36, 0.5), 0 0 20px rgba(251, 191, 36, 0.3), 0 0 30px rgba(251, 191, 36, 0.1); }
  .text-glow-curious { text-shadow: 0 0 10px rgba(236, 72, 153, 0.5), 0 0 20px rgba(236, 72, 153, 0.3), 0 0 30px rgba(236, 72, 153, 0.1); }
  .text-glow-guardian { text-shadow: 0 0 10px rgba(245, 158, 11, 0.5), 0 0 20px rgba(245, 158, 11, 0.3), 0 0 30px rgba(245, 158, 11, 0.1); }
  .text-glow-opspipe { text-shadow: 0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3), 0 0 30px rgba(6, 182, 212, 0.1); }
  .text-glow-moonsignal { text-shadow: 0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3), 0 0 30px rgba(139, 92, 246, 0.1); }
  .text-glow-aegis { text-shadow: 0 0 15px rgba(251, 191, 36, 0.6), 0 0 30px rgba(251, 191, 36, 0.4), 0 0 45px rgba(251, 191, 36, 0.2); }
  
  .text-shadow-cosmic { text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4); }
  .text-shadow-soft { text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4); }
  
  @media (prefers-reduced-motion: reduce) {
    .text-glow-cosmic, .text-glow-curious, .text-glow-guardian, .text-glow-opspipe, .text-glow-moonsignal, .text-glow-aegis { text-shadow: none; }
  }
`;

const productData = [
  { 
    icon: "/assets/images/general/Page_Logos/Aegis_logo.webp", 
    title: "Aegis", 
    path: "/products/aegis", 
    description: "Core Runtime Engine",
    status: "OPERATIONAL",
    coordinates: "CORE-001",
    classification: "CENTRAL_COMMAND",
    theme: "aegis"
  },
  { 
    icon: "/assets/images/general/Page_Logos/OpsPipe_logo.webp", 
    title: "OpsPipe", 
    path: "/products/opspipe", 
    description: "Operational Automation",
    status: "ACTIVE",
    coordinates: "OPS-002",
    classification: "AUTOMATION_SUITE",
    theme: "opspipe"
  },
  { 
    icon: "/assets/images/general/Page_Logos/MoonSignal_logo.webp", 
    title: "MoonSignal", 
    path: "/products/moonsignal", 
    description: "Analytics & Insights",
    status: "MONITORING",
    coordinates: "ANA-003",
    classification: "INTELLIGENCE_HUB",
    theme: "moonsignal"
  },
  { 
    icon: "/assets/images/general/Page_Logos/Guardian_logo.webp", 
    title: "Guardian", 
    path: "/products/guardian", 
    description: "Security & Monitoring",
    status: "STANDBY",
    coordinates: "SEC-004",
    classification: "DEFENSE_GRID",
    theme: "guardian"
  },
  { 
    icon: "/assets/images/general/Page_Logos/Curious_logo.webp", 
    title: "Curious", 
    path: "/products/curious", 
    description: "Intelligent Exploration",
    status: "RESEARCH",
    coordinates: "EXP-005",
    classification: "DISCOVERY_ENGINE",
    theme: "curious"
  }
];

// ✅ KEEP - PRODUCTS PORTAL COMPONENT
export default function ProductsPortal() {
  // Reference to track mounting
  const mountedRef = useRef(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [missionTime, setMissionTime] = useState('');
  
  // Mission time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setMissionTime(now.toUTCString().slice(17, 25));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Add listener for changes
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  // Ensure page always starts at the top when mounted
  useEffect(() => {
    if (!mountedRef.current) {
      // First render - ensure we're at the top
      window.scrollTo(0, 0);
      mountedRef.current = true;
    }
    
    return () => {
      // Clean up when unmounting
      mountedRef.current = false;
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPERATIONAL': return 'text-amber-400';
      case 'ACTIVE': return 'text-cyan-400';
      case 'MONITORING': return 'text-purple-400';
      case 'STANDBY': return 'text-yellow-400';
      case 'RESEARCH': return 'text-pink-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'OPERATIONAL': return 'bg-amber-400';
      case 'ACTIVE': return 'bg-cyan-400';
      case 'MONITORING': return 'bg-purple-400';
      case 'STANDBY': return 'bg-yellow-400';
      case 'RESEARCH': return 'bg-pink-400';
      default: return 'bg-gray-400';
    }
  };

  const getProductTheme = (theme) => {
    switch (theme) {
      case 'aegis': return {
        gradient: 'from-amber-500/20 to-yellow-600/10',
        border: 'border-amber-400/20 hover:border-amber-400/40',
        glow: 'hover:shadow-amber-500/20',
        text: 'group-hover:text-amber-400'
      };
      case 'opspipe': return {
        gradient: 'from-cyan-500/20 to-blue-600/10',
        border: 'border-cyan-400/20 hover:border-cyan-400/40',
        glow: 'hover:shadow-cyan-500/20',
        text: 'group-hover:text-cyan-400'
      };
      case 'moonsignal': return {
        gradient: 'from-purple-500/20 to-violet-600/10',
        border: 'border-purple-400/20 hover:border-purple-400/40',
        glow: 'hover:shadow-purple-500/20',
        text: 'group-hover:text-purple-400'
      };
      case 'guardian': return {
        gradient: 'from-yellow-500/20 to-amber-600/10',
        border: 'border-yellow-400/20 hover:border-yellow-400/40',
        glow: 'hover:shadow-yellow-500/20',
        text: 'group-hover:text-yellow-400'
      };
      case 'curious': return {
        gradient: 'from-pink-500/20 to-rose-600/10',
        border: 'border-pink-400/20 hover:border-pink-400/40',
        glow: 'hover:shadow-pink-500/20',
        text: 'group-hover:text-pink-400'
      };
      default: return {
        gradient: 'from-gray-500/20 to-gray-600/10',
        border: 'border-gray-400/20 hover:border-gray-400/40',
        glow: 'hover:shadow-gray-500/20',
        text: 'group-hover:text-gray-400'
      };
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Enhanced Typography Styles */}
      <style dangerouslySetInnerHTML={{ __html: typographyStyles }} />
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* Mission Control Navbar */}
      <MissionControlNavbar />
      
      {/* Main Content */}
      <main className="relative z-20 pt-20 pb-8" style={{ paddingBottom: '22vh' }}>
        {/* Streamlined Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-6"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                Fleet <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">Arsenal</span>
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-lime-400/0 via-lime-400/60 to-lime-400/0 w-32 mx-auto rounded-full"></div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-white/80 max-w-2xl mx-auto mb-6"
            >
              A constellation of integrated solutions orbiting around our <span className="text-lime-400 font-semibold">Aegis</span> core runtime engine.
            </motion.p>

            {/* Integrated Fleet Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="inline-flex items-center gap-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-white/90">All Systems Operational</span>
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="text-sm text-lime-400 font-mono">
                {missionTime}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Solar System Section - Desktop */}
        <section className="hidden lg:block w-full py-8">
          <div className="relative w-full">
            {/* System Overview Container */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="absolute z-30 max-w-sm left-8 top-1/2 transform -translate-y-1/2 xl:left-[calc(8rem+15vh)] xl:top-[calc(50%-15vh)]"
            >
              <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                {/* System Overview Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                  <span className="font-mono bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent text-sm uppercase tracking-wider font-semibold">
                    SYSTEM OVERVIEW
                  </span>
                </div>
                
                {/* Main Title */}
                <h2 className="text-white text-4xl font-bold mb-3">
                  Product
                </h2>
                <h2 className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(132,204,22,0.6)] text-4xl font-bold mb-4">
                  CONSTELLATION
                </h2>
                
                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed">
                  Every CuriousLabs solution orbits around <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent font-semibold">Aegis</span> — our mission-critical runtime core.
                </p>
              </div>
            </motion.div>
            
            <SolarSystemLayout 
              products={productData} 
              onProductHover={setActiveProduct}
              activeProduct={activeProduct}
            />
          </div>
        </section>

        {/* Compact Mobile View */}
        <section className="lg:hidden max-w-4xl mx-auto px-4 py-8">
          <div className="grid gap-4">
            {productData.map((product, index) => {
              const theme = getProductTheme(product.theme);
              
              return (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <Link
                    to={product.path}
                    className={`block bg-gradient-to-br ${theme.gradient} backdrop-blur-sm border ${theme.border} rounded-lg p-4 transition-all duration-300 ${theme.glow} hover:shadow-lg hover:scale-[1.01]`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={product.icon} 
                          alt={`${product.title} icon`} 
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-white">
                            {product.title}
                          </h3>
                          <div className={`w-1.5 h-1.5 ${getStatusBg(product.status)} rounded-full`}></div>
                        </div>
                        <p className="text-sm text-white/70">
                          {product.description}
                        </p>
                      </div>
                      
                      <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
      
      <FooterExperience />
      <ScrollToTop />
    </div>
  );
} 