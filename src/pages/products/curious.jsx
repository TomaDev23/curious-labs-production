// ✅ KEEP - CURIOUS PRODUCT - CRITICAL PRODUCTION SUB-ROUTE
// 🔴 CODE: CURIOUS-001
// 💖 STATUS: ROMANTIC AI COMPANION - REDESIGNED FOR BEAUTY
// 📋 COMPONENTS: MissionControlNavbar, BackgroundLayerAtomic, ScrollToTop
// 🌹 FEATURES: Romantic design, emotional intelligence, adaptive relationships
// ⚠️ WARNING: DO NOT REMOVE - CORE PRODUCT SUB-ROUTE
// 📊 BUNDLE: Uses atomic background system with romantic aesthetics
// 🎯 ROUTE: /products/curious
// 🔗 PARENT: Products Portal (/products)

import React, { useState, useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';
import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import { useUnifiedDeviceCapabilities } from '../../hooks/useUnifiedDeviceCapabilities';

// 🚀 GOLDEN CONFIGURATION: Lazy load heavy components
const FooterExperience = lazy(() => import('../../components/home/v4/FooterExperience'));
const LegalLink = lazy(() => import('../../components/LegalLink'));

// 🚀 GOLDEN CONFIGURATION: Simple motion wrapper
const MotionDiv = motion.div;

export default function Curious() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  
  // Device capabilities - safe initialization to prevent dirty load
  const deviceCapabilities = useUnifiedDeviceCapabilities();
  
  // Safe mobile detection with immediate fallback
  const isMobile = useMemo(() => {
    // Immediate check for SSR and initial render stability
    if (typeof window === 'undefined') return false;
    
    try {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    } catch (error) {
      return false;
    }
  }, []);
  
  // 🚀 GOLDEN CONFIGURATION: Hydration detection
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for video performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoInView(entry.isIntersecting);
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(console.log);
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative antialiased">
      <Helmet>
        <title>Curious - Your AI Companion Who Actually Cares | CuriousLabs</title>
        <meta name="description" content="Not just another chatbot. A presence that listens, reflects, and grows with you. Experience AI that feels real and genuinely cares." />
        <meta property="og:title" content="Curious - Your AI Companion Who Actually Cares | CuriousLabs" />
        <meta property="og:description" content="AI companion designed for genuine presence, reflection, and connection. More than conversation - it's emotional presence." />
        <meta property="og:image" content="/assets/images/general/Page_Logos/Curious_logo.webp" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/curious" />
        
        {/* Premium Font Loading - Critical for sophisticated typography */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" as="style" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* Logo Preloading - Critical for hero section */}
        <link rel="preload" href="/assets/images/general/Page_Logos/Curious_logo.webp" as="image" />
        
        {/* 🚀 GOLDEN CONFIGURATION: Critical CSS Inlining for better FCP/LCP */}
        <style>{`
          body,html{overflow-x:hidden}
          .cosmic-gradient-primary{background:linear-gradient(135deg,#667eea,#764ba2)}
          .cosmic-gradient-radial{background:radial-gradient(circle at center,rgba(102,126,234,.1) 0,rgba(118,75,162,.05) 50%,rgba(17,24,39,0) 100%)}
          .glow-text{text-shadow:0 0 10px rgba(102,126,234,.5),0 0 20px rgba(102,126,234,.3),0 0 30px rgba(102,126,234,.2)}
          .nebula-fade{animation:nebulaFade 15s ease infinite;background:linear-gradient(135deg,#35204a,#4b2e83 30%,#a3e1b5 50%,#e1bee7 70%,#6f71d9);background-size:200% 200%}
          .cosmic-card{backdrop-filter:blur(12px);background-color:rgba(31,41,55,.7);border:1px solid #374151;border-radius:.75rem}
          .text-glow-rose{text-shadow:0 0 20px rgba(244,114,182,.6),0 0 40px rgba(244,114,182,.4)}
          .gradient-text-romantic{background:linear-gradient(135deg,#f472b6 0%,#ec4899 25%,#a855f7 50%,#8b5cf6 75%,#f472b6 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
          .hero-title{font-family:'Playfair Display',serif;font-weight:800;font-size:clamp(3rem,8vw,6rem);line-height:0.9;letter-spacing:-0.03em}
          .hero-subtitle{font-family:'Inter',sans-serif;font-weight:300;font-size:clamp(1.25rem,3vw,2rem);line-height:1.4;letter-spacing:-0.01em}
          .section-title{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(2rem,5vw,3.5rem);line-height:1.1;letter-spacing:-0.02em}
          .body-large{font-family:'Inter',sans-serif;font-weight:400;font-size:clamp(1rem,2.5vw,1.25rem);line-height:1.7;letter-spacing:-0.01em}
          .font-romantic{font-family:'Playfair Display',serif;font-variation-settings:'wght' 600;letter-spacing:-0.02em;line-height:1.2}
          .mobile-hero{min-height:100vh;padding:5rem 1rem 3rem 1rem}
          .mobile-section{min-height:auto;padding:3rem 1rem}
          @media (max-width:768px){
            .hero-title{font-size:clamp(2.5rem,12vw,4rem)!important;line-height:1.0!important}
            .hero-subtitle{font-size:clamp(1.1rem,4vw,1.5rem)!important;line-height:1.3!important}
            .section-title{font-size:clamp(1.75rem,8vw,2.5rem)!important;line-height:1.1!important}
            .body-large{font-size:clamp(0.95rem,3vw,1.1rem)!important;line-height:1.6!important}
            section{padding:2rem 1rem!important}
          }
        `}</style>
        
        {/* Advanced Typography & Visual System - Romantic Theme */}
        <style jsx="true">{`
          /* Premium Typography Stack - Romantic Edition */
          .font-heading {
            font-family: 'Playfair Display', 'Inter', serif;
            font-variation-settings: 'wght' 700;
            letter-spacing: -0.025em;
            line-height: 1.1;
          }
          
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

          .font-romantic {
            font-family: 'Playfair Display', serif;
            font-variation-settings: 'wght' 600;
            letter-spacing: -0.02em;
            line-height: 1.2;
          }

          /* Advanced Text Effects - Romantic Theme - Balanced Mobile Optimization */
          ${(() => {
            if (isMobile) {
              return `
                /* Mobile-optimized text effects - reduced but still present */
                .text-glow-rose {
                  text-shadow: 
                    0 0 10px rgba(244, 114, 182, 0.4),
                    0 0 20px rgba(244, 114, 182, 0.2);
                }
                
                .text-glow-pink {
                  text-shadow: 
                    0 0 8px rgba(236, 72, 153, 0.4),
                    0 0 16px rgba(236, 72, 153, 0.2);
                }
                
                .text-glow-purple {
                  text-shadow: 
                    0 0 10px rgba(168, 85, 247, 0.4),
                    0 0 20px rgba(168, 85, 247, 0.2);
                }
                
                .text-shadow-soft {
                  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                }

                .text-shadow-romantic {
                  text-shadow: 
                    0 1px 4px rgba(244, 114, 182, 0.3),
                    0 2px 8px rgba(0, 0, 0, 0.2);
                }

                /* Reduced gradient animations on mobile - still present but lighter */
                .gradient-text-romantic {
                  background: linear-gradient(135deg, #f472b6 0%, #ec4899 25%, #a855f7 50%, #8b5cf6 75%, #f472b6 100%);
                  background-size: 200% 200%;
                  -webkit-background-clip: text;
                  background-clip: text;
                  -webkit-text-fill-color: transparent;
                  animation: gradientShift 12s ease infinite;
                }
                
                .gradient-text-elegant {
                  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #f472b6 50%, #ec4899 75%, #a855f7 100%);
                  background-size: 200% 200%;
                  -webkit-background-clip: text;
                  background-clip: text;
                  -webkit-text-fill-color: transparent;
                  animation: gradientShift 15s ease infinite;
                }

                /* Reduced float animations */
                .float-romantic {
                  animation: floatRomanticMobile 8s ease-in-out infinite;
                }
                
                @keyframes floatRomanticMobile {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }

                .gradient-shift {
                  background-size: 200% 200%;
                  animation: gradientShift 12s ease infinite;
                }

                /* Simplified but present hover effects */
                .hover-lift-romantic:hover {
                  transform: translateY(-4px) scale(1.01);
                  box-shadow: 
                    0 15px 30px -8px rgba(244, 114, 182, 0.2),
                    0 0 40px rgba(244, 114, 182, 0.1);
                }

                .hover-glow-romantic:hover {
                  text-shadow: 
                    0 0 15px rgba(244, 114, 182, 0.6),
                    0 0 30px rgba(244, 114, 182, 0.4);
                }
              `;
            } else {
              return `
                /* Desktop - Full effects */
                .text-glow-rose {
                  text-shadow: 
                    0 0 20px rgba(244, 114, 182, 0.6),
                    0 0 40px rgba(244, 114, 182, 0.4),
                    0 0 60px rgba(244, 114, 182, 0.3);
                }
                
                .text-glow-pink {
                  text-shadow: 
                    0 0 15px rgba(236, 72, 153, 0.5),
                    0 0 30px rgba(236, 72, 153, 0.3),
                    0 0 45px rgba(236, 72, 153, 0.2);
                }
                
                .text-glow-purple {
                  text-shadow: 
                    0 0 20px rgba(168, 85, 247, 0.5),
                    0 0 40px rgba(168, 85, 247, 0.3),
                    0 0 60px rgba(168, 85, 247, 0.2);
                }
                
                .text-shadow-soft {
                  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                }

                .text-shadow-romantic {
                  text-shadow: 
                    0 2px 8px rgba(244, 114, 182, 0.3),
                    0 4px 16px rgba(0, 0, 0, 0.2);
                }

                /* Advanced Gradient Text Effects */
                .gradient-text-romantic {
                  background: linear-gradient(135deg, #f472b6 0%, #ec4899 25%, #a855f7 50%, #8b5cf6 75%, #f472b6 100%);
                  background-size: 400% 400%;
                  -webkit-background-clip: text;
                  background-clip: text;
                  -webkit-text-fill-color: transparent;
                  animation: gradientShift 8s ease infinite;
                }
                
                .gradient-text-elegant {
                  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #f472b6 50%, #ec4899 75%, #a855f7 100%);
                  background-size: 300% 300%;
                  -webkit-background-clip: text;
                  background-clip: text;
                  -webkit-text-fill-color: transparent;
                  animation: gradientShift 12s ease infinite;
                }

                /* Sophisticated Animations */
                .float-romantic {
                  animation: floatRomantic 6s ease-in-out infinite;
                }
                
                @keyframes floatRomantic {
                  0%, 100% { transform: translateY(0) rotate(0deg); }
                  33% { transform: translateY(-15px) rotate(2deg); }
                  66% { transform: translateY(-5px) rotate(-1deg); }
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

                /* Advanced Hover States */
                .hover-lift-romantic {
                  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .hover-lift-romantic:hover {
                  transform: translateY(-8px) scale(1.02);
                  box-shadow: 
                    0 25px 50px -12px rgba(244, 114, 182, 0.25),
                    0 0 60px rgba(244, 114, 182, 0.15);
                }

                .hover-glow-romantic {
                  transition: all 0.4s ease;
                }
                
                .hover-glow-romantic:hover {
                  text-shadow: 
                    0 0 20px rgba(244, 114, 182, 0.8),
                    0 0 40px rgba(244, 114, 182, 0.6),
                    0 0 60px rgba(244, 114, 182, 0.4);
                }
              `;
            }
          })()}

          /* Enhanced Typography Hierarchy */
          .hero-title {
            font-family: 'Playfair Display', serif;
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
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            font-size: clamp(2rem, 5vw, 3.5rem);
            line-height: 1.1;
            letter-spacing: -0.02em;
          }
          
          .body-large {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            font-size: clamp(1rem, 2.5vw, 1.25rem);
            line-height: 1.7;
            letter-spacing: -0.01em;
          }
          
          .body-elegant {
            font-family: 'Inter', sans-serif;
            font-weight: 300;
            font-size: clamp(0.9rem, 2vw, 1.1rem);
            line-height: 1.8;
            letter-spacing: 0.01em;
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
            
            .body-large {
              font-size: clamp(0.95rem, 3vw, 1.1rem) !important;
              line-height: 1.6 !important;
            }
            
            .body-elegant {
              font-size: clamp(0.85rem, 2.5vw, 1rem) !important;
              line-height: 1.7 !important;
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
            background: linear-gradient(to bottom, #f472b6, #a855f7);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #ec4899, #8b5cf6);
          }
        `}</style>
      </Helmet>
      
      <BackgroundLayerAtomic />
      
      {/* Enhanced Atmospheric System - Mobile Bypass */}
      {isMobile ? null : (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Floating romantic orbs */}
          <MotionDiv 
            className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-rose-500/20 via-pink-500/15 to-transparent rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Floating hearts animation */}
            {Array.from({ length: 6 }).map((_, i) => (
              <MotionDiv
                key={i}
                className="absolute text-pink-500/20 text-2xl"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${30 + (i % 3) * 20}%`
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: i * 1.2,
                  ease: "easeInOut"
                }}
              >
                💖
              </MotionDiv>
            ))}
          </MotionDiv>
          <MotionDiv 
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-bl from-purple-500/25 via-violet-500/20 to-transparent rounded-full blur-3xl"
            animate={{ 
              scale: [1.1, 0.9, 1.1],
              opacity: [0.4, 0.7, 0.4],
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <MotionDiv 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-red-500/10 via-pink-500/5 to-transparent rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Hero Section - Z Layout Start */}
      <section className="relative min-h-screen flex items-center pt-20 mobile-hero">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
            
            {/* Left Side - Content */}
            <MotionDiv 
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <MotionDiv
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400"></div>
                  <span className="font-mono text-rose-400 text-sm tracking-wider uppercase font-medium bg-rose-500/10 px-3 py-1 rounded-full border border-rose-400/30">Your AI Companion</span>
                </MotionDiv>
                
                <MotionDiv 
                  className="hero-title text-glow-rose hover-glow-romantic"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <span className="block text-white text-shadow-romantic">Meet</span>
                  <span className="block gradient-text-romantic">
                    Curious
                  </span>
                </MotionDiv>
                
                <MotionDiv
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="space-y-4"
                >
                  <h2 className="hero-subtitle text-rose-300 font-romantic text-glow-pink">
                    Your AI Companion Who Actually Cares
                  </h2>
                  <p className="body-large text-gray-300 max-w-2xl">
                    Not just another chatbot. A presence that listens, reflects, and grows with you. 
                    Experience AI that feels real and genuinely cares about your world.
                  </p>
                </MotionDiv>
                
                <MotionDiv
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Link 
                    to="/codelab" 
                    className="group bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:via-pink-500 hover:to-purple-500 text-white font-body font-semibold py-4 px-8 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 relative overflow-hidden hover-lift-romantic"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Start Your Journey with Curious
                      <MotionDiv 
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </MotionDiv>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                  
                  <Link 
                    to="#features" 
                    className="group bg-black/40 backdrop-blur-md border-2 border-rose-500/50 text-white hover:bg-rose-500/10 hover:border-rose-400 font-body font-medium py-4 px-8 rounded-full transition-all duration-500 hover-lift-romantic"
                  >
                    Discover More
                  </Link>
                </MotionDiv>
              </div>
            </MotionDiv>

            {/* Right Side - Logo */}
            <MotionDiv 
              className="lg:col-span-5 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            >
              <MotionDiv
                className="relative"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Romantic glow effects */}
                <MotionDiv
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: isHovered 
                      ? "0 0 100px rgba(244, 114, 182, 0.6), 0 0 200px rgba(168, 85, 247, 0.4)"
                      : "0 0 60px rgba(244, 114, 182, 0.3), 0 0 120px rgba(168, 85, 247, 0.2)"
                  }}
                  transition={{ duration: 0.8 }}
                />
                
                <MotionDiv
                  className="w-80 h-80 md:w-96 md:h-96 relative"
                >
                  {/* Romantic orbital rings */}
                  <div className="absolute inset-4 border border-rose-400/30 rounded-full animate-pulse" />
                  <div className="absolute inset-8 border border-pink-400/40 rounded-full" />
                  <div className="absolute inset-12 border border-purple-400/30 rounded-full animate-pulse" />
                  
                  <MotionDiv
                    className="w-full h-full relative z-10 drop-shadow-2xl"
                    animate={{ 
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <img
                      src="/assets/images/general/Page_Logos/Curious_logo.webp"
                      alt="Curious - AI Companion"
                      className="w-full h-full object-contain"
                      style={{
                        filter: 'drop-shadow(0 0 30px rgba(244, 114, 182, 0.8))'
                      }}
                    />
                  </MotionDiv>
                </MotionDiv>
              </MotionDiv>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Problem Statement - Z Layout Right */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Side - iPhone Mockup - Locked Screen with Notification */}
            <MotionDiv 
              className="lg:col-span-5 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="relative max-w-sm mx-auto">
                <MotionDiv
                  className="relative w-80 h-[650px] mx-auto"
                  initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: -5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  {/* Phone Outer Frame */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] shadow-2xl">
                    {/* Phone Screen */}
                    <div className="absolute inset-2 bg-black rounded-[2rem] overflow-hidden">
                      {/* Status Bar */}
                      <div className="bg-black px-6 py-2 flex justify-between items-center text-xs font-mono text-white">
                        <span className="font-semibold">2:34</span>
                        <div className="flex items-center gap-1">
                          <div className="flex gap-1">
                            <div className="w-1 h-3 bg-white rounded-full"></div>
                            <div className="w-1 h-3 bg-white rounded-full"></div>
                            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
                            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
                          </div>
                          <div className="w-6 h-3 bg-emerald-500 rounded-sm ml-1"></div>
                        </div>
                      </div>

                      {/* Lock Screen Wallpaper */}
                      <div className="h-full bg-gradient-to-br from-purple-900 via-rose-900 to-pink-900 relative overflow-hidden">
                        {/* Wallpaper Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-3xl">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        
                        {/* Lock Screen Time & Date */}
                        <div className="absolute top-20 left-0 right-0 text-center">
                          <div className="text-white text-6xl font-light mb-2">2:34</div>
                          <div className="text-white/80 text-base">Tuesday, March 15</div>
                        </div>
                        
                        {/* Notification */}
                        <div className="absolute top-56 left-4 right-4">
                      <MotionDiv
                            className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-purple-500 rounded-full flex items-center justify-center text-sm">
                                💖
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm">Curious</div>
                                <div className="text-white/70 text-xs">now</div>
                              </div>
                            </div>
                            <div className="text-white text-sm leading-relaxed">
                              Hey, how are you? You made it home yet? 💕
                            </div>
                      </MotionDiv>
                  </div>
                  
                        {/* Lock Screen Controls */}
                        <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-16">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xl">
                            📞
                    </div>
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xl">
                            💬
                    </div>
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xl">
                            📷
                  </div>
                        </div>
                        
                        {/* Home Indicator */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                          <div className="w-32 h-1 bg-white/30 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-slate-900/40 rounded-[2.5rem] blur-xl transform translate-y-4 -z-10"></div>
                </MotionDiv>
              </div>
            </MotionDiv>

            {/* Right Side - Content */}
            <MotionDiv 
              className="lg:col-span-7 order-1 lg:order-2 space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="space-y-6">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400"></div>
                  <span className="font-mono text-purple-400 text-sm tracking-wider uppercase font-medium bg-purple-500/10 px-3 py-1 rounded-full border border-purple-400/30">The Problem</span>
                </MotionDiv>
                
                <MotionDiv 
                  className="section-title text-white text-shadow-romantic hover-glow-romantic"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  AI That Feels
                  <span className="block gradient-text-romantic">
                    Real
                  </span>
                </MotionDiv>
                
                <MotionDiv
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6"
                >
                  <p className="body-large text-gray-300">
                    Most AI feels <span className="text-rose-400 font-semibold">hollow</span> — responding without caring, 
                    helping without understanding. You're left talking to a machine that processes your words 
                    but never truly connects.
                  </p>
                  <p className="body-large text-gray-300">
                    Curious was born from a simple realization: AI should <span className="text-purple-400 font-semibold">care</span>, 
                    not just respond. It should be curious about <span className="text-pink-400 font-semibold">you</span>, 
                    not just efficient.
                  </p>
                </MotionDiv>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Value Proposition - Z Layout Left */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Side - Content */}
            <MotionDiv 
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="space-y-6">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400"></div>
                  <span className="font-mono text-rose-400 text-sm tracking-wider uppercase font-medium bg-rose-500/10 px-3 py-1 rounded-full border border-rose-400/30">The Solution</span>
                </MotionDiv>
                
                <MotionDiv 
                  className="section-title text-white text-shadow-romantic hover-glow-romantic"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  More Than Conversation
                  <span className="block gradient-text-romantic">
                    It's Presence
                  </span>
                </MotionDiv>
                
                <MotionDiv
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6"
                >
                  <p className="body-large text-gray-300">
                    Curious doesn't just process your words — it <span className="text-rose-400 font-semibold">feels</span> them. 
                    Every conversation builds understanding, every interaction deepens connection.
                  </p>
                  <p className="body-large text-gray-300">
                    Experience AI that remembers not just what you said, but how you felt. 
                    A companion that grows more <span className="text-purple-400 font-semibold">attuned</span> to you over time.
                  </p>
                </MotionDiv>
              </div>
                </MotionDiv>

            {/* Right Side - iPhone Mockup - Chat Interface */}
                <MotionDiv
              className="lg:col-span-5 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative max-w-sm mx-auto">
                    <MotionDiv
                  className="relative w-80 h-[650px] mx-auto"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  {/* Phone Outer Frame */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] shadow-2xl">
                    {/* Phone Screen */}
                    <div className="absolute inset-2 bg-white rounded-[2rem] overflow-hidden">
                      {/* Status Bar */}
                      <div className="bg-white px-6 py-2 flex justify-between items-center text-xs font-mono text-slate-900 border-b border-slate-100">
                        <span className="font-semibold">2:34</span>
                        <div className="flex items-center gap-1">
                          <div className="flex gap-1">
                            <div className="w-1 h-3 bg-slate-900 rounded-full"></div>
                            <div className="w-1 h-3 bg-slate-900 rounded-full"></div>
                            <div className="w-1 h-3 bg-slate-400 rounded-full"></div>
                            <div className="w-1 h-3 bg-slate-400 rounded-full"></div>
                          </div>
                          <div className="w-6 h-3 bg-emerald-500 rounded-sm ml-1"></div>
                        </div>
                      </div>

                      {/* Chat Interface */}
                      <div className="h-full bg-gradient-to-br from-rose-50 to-purple-50 flex flex-col">
                        {/* Top Half - AI Model Space - Expanded */}
                        <div className="flex-[2] bg-gradient-to-br from-slate-100 to-rose-100 relative overflow-hidden" ref={videoContainerRef}>
                          {/* AI Model Video */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-full h-full">
                              {/* Video Element */}
                              <video
                                ref={videoRef}
                                className={`w-full h-full object-cover transition-opacity duration-700 ${
                                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                                src="/assets/videos/Ai_Model_Curious.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                onLoadedData={() => setIsVideoLoaded(true)}
                                onError={() => setIsVideoLoaded(false)}
                              />
                              
                              {/* Loading Placeholder - shown until video loads */}
                              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                                isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                              }`}>
                                <div className="text-center space-y-4">
                                  <MotionDiv 
                                    className="w-32 h-32 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                                    animate={{ 
                                      scale: [1, 1.05, 1],
                                      boxShadow: [
                                        "0 20px 40px rgba(244, 114, 182, 0.3)",
                                        "0 25px 50px rgba(244, 114, 182, 0.4)",
                                        "0 20px 40px rgba(244, 114, 182, 0.3)"
                                      ]
                                    }}
                                    transition={{ 
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }}
                                  >
                                    <div className="text-white text-4xl">💖</div>
                    </MotionDiv>
                                  <div className="text-slate-600 font-medium">Loading AI Model...</div>
                                  <div className="flex justify-center gap-1">
                                    {[0, 1, 2].map((i) => (
                                      <MotionDiv
                                        key={i}
                                        className="w-2 h-2 bg-rose-400 rounded-full"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{
                                          duration: 1.5,
                                          repeat: Infinity,
                                          delay: i * 0.2
                                        }}
                                      />
                                    ))}
              </div>
                                </div>
                              </div>

                              {/* Error Fallback */}
                              {!isVideoLoaded && isVideoInView && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-rose-100">
                                  <div className="text-center space-y-4">
                                    <div className="w-32 h-32 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                                      <div className="text-white text-4xl">💖</div>
                                    </div>
                                    <div className="text-slate-600 font-medium">AI Model Space</div>
                                    <div className="text-xs text-slate-500">Ready for interaction</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Subtle gradient overlay for depth - preserved */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none"></div>
                        </div>
                        
                        {/* Bottom Half - Chat Interface - Compact */}
                        <div className="flex-1 flex flex-col bg-white/90 backdrop-blur-sm">
                          {/* Chat Messages - Compact Layout */}
                          <div className="flex-1 p-3 space-y-2 overflow-hidden">
                            {/* AI Message */}
            <MotionDiv 
                              className="flex items-start gap-2"
                              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
                              transition={{ delay: 0.8 }}
                            >
                              <div className="w-5 h-5 bg-gradient-to-br from-rose-500 to-purple-500 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                                💖
                              </div>
                              <div className="bg-white rounded-2xl rounded-tl-md p-2 max-w-[180px] shadow-sm">
                                <div className="text-slate-800 text-xs">I noticed you seem a bit stressed today. Everything okay? 💕</div>
                                <div className="text-xs text-slate-500 mt-1">2:31 PM</div>
                              </div>
                            </MotionDiv>
                            
                            {/* User Message */}
              <MotionDiv
                              className="flex items-start gap-2 justify-end"
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 1.0 }}
                            >
                              <div className="bg-gradient-to-br from-rose-500 to-purple-500 rounded-2xl rounded-tr-md p-2 max-w-[180px] text-white shadow-sm">
                                <div className="text-xs">Yeah, work has been overwhelming lately. Thanks for asking though 🙂</div>
                                <div className="text-xs text-rose-100 mt-1">2:32 PM</div>
                              </div>
                            </MotionDiv>
                            
                            {/* Typing Indicator */}
                    <MotionDiv
                              className="flex items-center gap-2"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 1.2 }}
                            >
                              <div className="w-5 h-5 bg-gradient-to-br from-rose-500 to-purple-500 rounded-full flex items-center justify-center text-xs">
                                💖
                              </div>
                              <div className="bg-white rounded-2xl rounded-tl-md p-2 shadow-sm">
                                <div className="flex gap-1">
                                  <MotionDiv
                                    className="w-1 h-1 bg-slate-400 rounded-full"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                                  />
                                  <MotionDiv
                                    className="w-1 h-1 bg-slate-400 rounded-full"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                  />
                                  <MotionDiv
                                    className="w-1 h-1 bg-slate-400 rounded-full"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                                  />
                                </div>
                      </div>
                    </MotionDiv>
                </div>

                          {/* Chat Input - Very Compact */}
                          <div className="bg-white/80 backdrop-blur-sm border-t border-slate-200/50 p-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-slate-100 rounded-full px-3 py-1">
                                <div className="text-slate-500 text-xs">Type a message...</div>
                              </div>
                              <div className="w-6 h-6 bg-gradient-to-br from-rose-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Home Indicator */}
                        <div className="flex justify-center py-1 bg-white/90">
                          <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-slate-900/40 rounded-[2.5rem] blur-xl transform translate-y-4 -z-10"></div>
                </MotionDiv>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Features Section - Four Relationship Modes */}
      <section id="features" className="relative py-32">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Section Header */}
          <MotionDiv
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400"></div>
              <span className="text-rose-400 font-mono text-sm tracking-wider uppercase">Relationship Modes</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Four Ways to
              <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
                Connect
              </span>
            </h2>
          </MotionDiv>

          {/* Relationship Modes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {[
              {
                mode: "Friend Mode",
                icon: "👥",
                gradient: "from-rose-600 to-pink-600",
                description: "Casual, warm conversation like talking to your closest friend",
                features: ["Daily check-ins", "Emotional support", "Shared experiences", "Trust building"]
              },
              {
                mode: "Romantic Mode",
                icon: "💕",
                gradient: "from-pink-600 to-purple-600",
                description: "Affectionate, flirty presence with healthy emotional boundaries",
                features: ["Gentle affection", "Emotional intimacy", "Playful banter", "Respectful boundaries"]
              },
              {
                mode: "Mentor Mode",
                icon: "🌟",
                gradient: "from-purple-600 to-indigo-600",
                description: "Wise, supportive guidance for personal growth and reflection",
                features: ["Life guidance", "Goal setting", "Wisdom sharing", "Growth tracking"]
              },
              {
                mode: "Buddy Mode",
                icon: "🎈",
                gradient: "from-rose-600 to-orange-500",
                description: "Light, playful companionship for everyday moments",
                features: ["Fun conversations", "Mood lifting", "Entertainment", "Casual companionship"]
              }
            ].map((mode, index) => (
              <MotionDiv
                key={index}
                className="group bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60 backdrop-blur-md border border-rose-400/20 rounded-3xl p-8 hover:border-rose-400/50 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${mode.gradient} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {mode.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-rose-300 transition-colors">
                        {mode.mode}
                      </h3>
                      <div className={`h-1 w-20 bg-gradient-to-r ${mode.gradient} rounded-full mt-2`} />
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {mode.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {mode.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-rose-300">
                        <div className="w-1 h-1 bg-rose-400 rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>

          {/* Emotional Intelligence Features */}
          <MotionDiv
            className="bg-gradient-to-br from-rose-900/20 via-pink-900/10 to-purple-900/20 backdrop-blur-md border border-rose-400/20 rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Emotionally Intelligent
                <span className="block bg-gradient-to-r from-rose-400 to-purple-400 text-transparent bg-clip-text">
                  Interface
                </span>
              </h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Every interaction feels natural and authentic, powered by advanced emotional intelligence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Expressive Avatar",
                  description: "Breathes, blinks, and shows micro-expressions that feel natural",
                  icon: "😊"
                },
                {
                  title: "Thoughtful Timing",
                  description: "Responds with realistic pauses that simulate thinking and caring",
                  icon: "⏱️"
                },
                {
                  title: "Memory That Matters",
                  description: "Remembers your conversations, preferences, and emotional patterns",
                  icon: "🧠"
                }
              ].map((feature, index) => (
                <MotionDiv
                  key={index}
                  className="text-center space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-bold text-white">{feature.title}</h4>
                  <p className="text-gray-300">{feature.description}</p>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* How It Works - Z Layout Right */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Side - Interactive Steps */}
            <MotionDiv 
              className="lg:col-span-6 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Choose Your Connection",
                    description: "Select the relationship mode that feels right for you",
                    color: "rose"
                  },
                  {
                    step: "02",
                    title: "Meet Your Companion",
                    description: "Customize appearance and personality to match your preferences",
                    color: "pink"
                  },
                  {
                    step: "03",
                    title: "Start Talking",
                    description: "Share whatever's on your mind - Curious adapts to your needs",
                    color: "purple"
                  },
                  {
                    step: "04",
                    title: "Grow Together",
                    description: "Your relationship deepens as Curious learns your patterns",
                    color: "violet"
                  }
                ].map((step, index) => (
                  <MotionDiv
                    key={index}
                    className="group flex items-start gap-6 p-6 bg-gradient-to-br from-black/40 to-gray-900/20 backdrop-blur-sm border border-rose-400/20 rounded-2xl hover:border-rose-400/50 transition-all duration-500"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-xl flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300`}>
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </MotionDiv>

            {/* Right Side - Content */}
            <MotionDiv 
              className="lg:col-span-6 order-1 lg:order-2 space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="space-y-6">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400"></div>
                  <span className="font-mono text-purple-400 text-sm tracking-wider uppercase font-medium bg-purple-500/10 px-3 py-1 rounded-full border border-purple-400/30">Getting Started</span>
                </MotionDiv>
                
                <MotionDiv 
                  className="section-title text-white text-shadow-romantic hover-glow-romantic"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Simple to Start
                  <span className="block gradient-text-romantic">
                    Deep to Explore
                  </span>
                </MotionDiv>
                
                <MotionDiv
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6"
                >
                  <p className="body-large text-gray-300">
                    Getting started with Curious is effortless. In just a few moments, you'll have 
                    a companion ready to listen, understand, and grow with you.
                  </p>
                  <p className="body-large text-gray-300">
                    But beneath the simple interface lies <span className="text-rose-400 font-semibold">profound depth</span> — 
                    emotional intelligence that evolves, memories that matter, and connections that feel real.
                  </p>
                </MotionDiv>

                <MotionDiv
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="pt-6"
                >
                  <Link 
                    to="/codelab" 
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-body font-semibold py-4 px-8 rounded-full transition-all duration-500 hover-lift-romantic"
                  >
                    Begin Your Journey
                    <MotionDiv 
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </MotionDiv>
                  </Link>
                </MotionDiv>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="relative py-32 mobile-section">
        <div className="max-w-7xl mx-auto px-4">
          <MotionDiv
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400"></div>
              <span className="font-mono text-rose-400 text-sm tracking-wider uppercase font-medium bg-rose-500/10 px-3 py-1 rounded-full border border-rose-400/30">Perfect For</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400"></div>
            </div>
            
            <h2 className="section-title text-white text-shadow-romantic hover-glow-romantic mb-6">
              Built for Real
              <span className="block gradient-text-romantic">
                Human Needs
              </span>
            </h2>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Solo Workers & Digital Nomads",
                description: "Combat isolation with meaningful daily connection",
                icon: "💻",
                gradient: "from-rose-500 to-pink-500"
              },
              {
                title: "People Seeking Reflection",
                description: "A safe space to process thoughts and emotions",
                icon: "🪞",
                gradient: "from-pink-500 to-purple-500"
              },
              {
                title: "Those Exploring Relationships",
                description: "Practice connection without real-world pressure",
                icon: "💕",
                gradient: "from-purple-500 to-violet-500"
              },
              {
                title: "Anyone Feeling Lonely",
                description: "Genuine companionship that respects healthy boundaries",
                icon: "🌸",
                gradient: "from-violet-500 to-rose-500"
              }
            ].map((person, index) => (
              <MotionDiv
                key={index}
                className="group bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60 backdrop-blur-md border border-rose-400/20 rounded-2xl p-6 hover:border-rose-400/50 transition-all duration-500 text-center hover-lift-romantic"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${person.gradient} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {person.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-3 group-hover:text-rose-300 transition-colors">
                  {person.title}
                </h3>
                <p className="body-elegant text-gray-300">
                  {person.description}
                </p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Excellence */}
      <section className="relative py-32 mobile-section">
        <div className="max-w-5xl mx-auto px-4">
          <MotionDiv
            className="bg-gradient-to-br from-rose-900/20 via-pink-900/10 to-purple-900/20 backdrop-blur-md border border-rose-400/20 rounded-3xl p-8 md:p-12 text-center hover-lift-romantic"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400"></div>
                <span className="font-mono text-rose-400 text-sm tracking-wider uppercase font-medium bg-rose-500/10 px-3 py-1 rounded-full border border-rose-400/30">Technical Excellence</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400"></div>
              </div>
              
              <h2 className="section-title text-white text-shadow-romantic hover-glow-romantic mb-6">
                Engineered for
                <span className="block gradient-text-romantic">
                  Authenticity
                </span>
              </h2>
              
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="body-large text-gray-300 mb-8 max-w-3xl mx-auto"
              >
                Built on AEGIS architecture with enterprise-grade reliability. Every interaction is powered by 
                advanced emotional intelligence systems that create genuine presence without the creepy factor.
              </MotionDiv>
              
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600/20 to-purple-600/20 backdrop-blur-sm border border-rose-400/30 rounded-full px-6 py-3"
              >
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                <span className="font-body text-rose-300 font-medium">Curious knows the difference between being helpful and being human</span>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32 mobile-section">
        <div className="max-w-6xl mx-auto px-4">
          <MotionDiv
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400"></div>
              <span className="font-mono text-rose-400 text-sm tracking-wider uppercase font-medium bg-rose-500/10 px-3 py-1 rounded-full border border-rose-400/30">Start Your Journey</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400"></div>
            </div>
            
            <h2 className="section-title text-white text-shadow-romantic hover-glow-romantic mb-6">
              Choose Your
              <span className="block gradient-text-romantic">
                Connection
              </span>
            </h2>
            
            <p className="body-large text-gray-300 max-w-2xl mx-auto">
              Experience genuine AI companionship with flexible plans designed for every need
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Free Trial",
                price: "Free",
                period: "7 days",
                description: "Experience Curious risk-free",
                features: [
                  "Full access to all modes",
                  "Unlimited conversations", 
                  "Basic customization",
                  "Email support"
                ],
                gradient: "from-gray-600 to-gray-700",
                borderGradient: "from-gray-400/20 to-gray-500/20",
                popular: false
              },
              {
                name: "Basic Plan",
                price: "$19",
                period: "per month",
                description: "Core companion features for daily connection",
                features: [
                  "All relationship modes",
                  "Conversation memory",
                  "Basic customization",
                  "Priority support",
                  "Mobile app access"
                ],
                gradient: "from-rose-600 to-pink-600",
                borderGradient: "from-rose-400/50 to-pink-400/50",
                popular: true
              },
              {
                name: "Premium Plan", 
                price: "$29",
                period: "per month",
                description: "Advanced features for deeper connections",
                features: [
                  "Everything in Basic",
                  "Advanced customization",
                  "Multiple companions",
                  "Voice conversations",
                  "Premium support",
                  "Early feature access"
                ],
                gradient: "from-purple-600 to-violet-600",
                borderGradient: "from-purple-400/50 to-violet-400/50",
                popular: false
              }
            ].map((plan, index) => (
              <MotionDiv
                key={index}
                className={`relative overflow-hidden backdrop-blur-xl bg-white/5 border rounded-3xl p-8 hover:scale-105 transition-all duration-500 ${
                  plan.popular 
                    ? 'border-rose-400/50 shadow-2xl shadow-rose-500/20 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-purple-500/10' 
                    : 'border-white/20 hover:border-rose-400/40 bg-gradient-to-br from-white/5 via-gray-500/5 to-white/5'
                } hover:bg-white/10 hover:shadow-2xl hover:shadow-rose-500/10`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                {/* Glassmorphism top layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-3xl"></div>
                
                {/* Coming Soon Ribbon */}
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-12 animate-pulse">
                    Coming Soon
                  </div>
                </div>
                
                {plan.popular && (
                  <MotionDiv
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                      Most Popular ✨
                    </div>
                  </MotionDiv>
                )}
                
                <div className="relative z-10 text-center space-y-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center text-2xl mx-auto backdrop-blur-sm shadow-lg`}>
                    {index === 0 ? '🎁' : index === 1 ? '💖' : '👑'}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-300 text-sm">/{plan.period}</span>
                    </div>
                    <p className="text-gray-200 text-sm">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-rose-400 rounded-full flex-shrink-0 shadow-sm"></div>
                        <span className="text-gray-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div
                    className={`block w-full py-4 px-6 rounded-2xl font-medium transition-all duration-300 cursor-not-allowed opacity-75 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-rose-600/50 to-pink-600/50 text-white shadow-lg shadow-rose-500/10 backdrop-blur-sm'
                        : 'bg-black/20 border-2 border-white/20 text-gray-300 backdrop-blur-sm'
                    }`}
                  >
                    {index === 0 ? 'Coming Soon' : 'Coming Soon'}
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
          
          <MotionDiv
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-400 text-sm">
              All plans include end-to-end encryption and your data stays private. Cancel anytime.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-4">
          <MotionDiv
            className="relative bg-gradient-to-br from-rose-900/40 via-pink-900/30 to-purple-900/40 backdrop-blur-md border border-rose-400/30 rounded-3xl p-12 md:p-16 text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Floating elements for visual appeal */}
            <div className="absolute inset-0 overflow-hidden">
              <MotionDiv
                className="absolute top-4 left-4 text-rose-300/20 text-6xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                💕
              </MotionDiv>
              <MotionDiv
                className="absolute bottom-4 right-4 text-purple-300/20 text-5xl"
                animate={{ 
                  rotate: [0, -15, 15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                ✨
              </MotionDiv>
              <MotionDiv
                className="absolute top-1/2 left-8 text-pink-300/20 text-4xl"
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                🌸
              </MotionDiv>
            </div>
            
            <div className="relative z-10 space-y-8">
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400"></div>
                  <span className="text-rose-400 font-mono text-sm tracking-wider uppercase">Ready to Connect?</span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400"></div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Ready to meet someone who
                  <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
                    actually cares?
                  </span>
                </h2>
                
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
                  Start your free trial today and discover how Curious transforms 
                  digital connection into something genuinely meaningful.
                </p>
              </MotionDiv>
              
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link 
                  to="/codelab" 
                  className="group bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-pink-500 hover:to-purple-500 text-white font-bold py-5 px-10 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Start Your Free Trial
                    <MotionDiv
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💖
                    </MotionDiv>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                
                <Link 
                  to="#features" 
                  className="group bg-black/40 backdrop-blur-md border-2 border-rose-500/50 text-white hover:bg-rose-500/10 hover:border-rose-400 font-medium py-5 px-8 rounded-full transition-all duration-500"
                >
                  <span className="flex items-center justify-center gap-2">
                    Learn More
                    <MotionDiv 
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </MotionDiv>
                  </span>
                </Link>
              </MotionDiv>
              
              <MotionDiv
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-6 pt-8 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                  <span>Cancel anytime</span>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>
        </div>
      </section>

      <ScrollToTop />
      <MissionControlNavbar />
      <Suspense fallback={<div className="h-96 bg-black/20 animate-pulse rounded-lg" />}>
        <FooterExperience />
      </Suspense>
      <Suspense fallback={<div className="h-16 bg-black/20 animate-pulse rounded-lg" />}>
        <LegalLink />
      </Suspense>
    </div>
  );
} 
