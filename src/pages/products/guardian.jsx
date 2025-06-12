// ✅ KEEP - GUARDIAN PRODUCT - CRITICAL PRODUCTION SUB-ROUTE
// 🔴 CODE: GUARDIAN-001
// 🛡️ STATUS: FAMILY-FRIENDLY AI COMPANION - PRODUCTION-READY DESIGN
// 📋 COMPONENTS: MissionControlNavbar, BackgroundLayerGuardian, ScrollToTop
// 🌈 FEATURES: Family-safe design, child development, parental controls
// ⚠️ WARNING: DO NOT REMOVE - CORE PRODUCT SUB-ROUTE
// 📊 BUNDLE: Uses atomic background system with family aesthetics
// 🎯 ROUTE: /products/guardian
// 🔗 PARENT: Products Portal (/products)

import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerGuardian from '../../components/atomic/BackgroundLayerGuardian';
import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import GuardianKidsSection from '../../components/guardian/GuardianKidsSection';
import { motion } from '../../FramerProvider';

export default function Guardian() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 text-gray-900 overflow-hidden relative antialiased">
      <Helmet>
        <title>Guardian - The AI Companion That Grows With Your Child | CuriousLabs</title>
        <meta name="description" content="From teddy bear to trusted friend. A safe, caring AI presence that evolves through every stage of childhood with complete parental control." />
        <meta property="og:title" content="Guardian - The AI Companion That Grows With Your Child | CuriousLabs" />
        <meta property="og:description" content="Safe AI companion that grows with your child from preschool through high school. Built with families in mind." />
        <meta property="og:image" content="/assets/images/general/Page_Logos/Guardian_logo.webp" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/guardian" />
        
        {/* Premium Font Loading - Critical for sophisticated typography */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" as="style" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Space Grotesk Fallback */}
        <link rel="preload" href="/fonts/SpaceGrotesk-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/SpaceGrotesk-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/SpaceGrotesk-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Logo Preloading - Critical for hero section */}
        <link rel="preload" href="/assets/images/general/Page_Logos/Guardian_logo.webp" as="image" />
        
        {/* Advanced Typography & Visual System */}
        <style jsx="true">{`
          /* Premium Typography Stack */
          .font-heading {
            font-family: 'Inter', 'Monument Extended', 'Space Grotesk', system-ui, sans-serif;
            font-variation-settings: 'wght' 700;
            letter-spacing: -0.02em;
          }
          
          .font-body {
            font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
            font-variation-settings: 'wght' 400;
            line-height: 1.7;
          }
          
          .font-mono {
            font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
            font-variation-settings: 'wght' 500;
          }

          /* Advanced Glass Morphism - Adjusted for bright background */
          .glass-ultra {
            backdrop-filter: blur(40px) saturate(180%);
            background: rgba(255, 255, 255, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }
          
          .glass-emerald {
            backdrop-filter: blur(20px) saturate(150%);
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(16, 185, 129, 0.3);
            box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.15);
          }
          
          .glass-blue {
            backdrop-filter: blur(20px) saturate(150%);
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.3);
            box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.15);
          }
          
          .glass-purple {
            backdrop-filter: blur(20px) saturate(150%);
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(147, 51, 234, 0.3);
            box-shadow: 0 25px 50px -12px rgba(147, 51, 234, 0.15);
          }

          /* Advanced Text Effects - Adjusted for bright background */
          .text-glow-emerald {
            text-shadow: 
              0 0 20px rgba(16, 185, 129, 0.4),
              0 0 40px rgba(16, 185, 129, 0.3),
              0 0 60px rgba(16, 185, 129, 0.2);
          }
          
          .text-shadow-soft {
            text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }

          /* Sophisticated Animations */
          .float {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
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

          /* Enhanced Hover States */
          .hover-lift {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .hover-lift:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          }

          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #10b981, #3b82f6);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #059669, #2563eb);
          }

          /* Advanced Responsive Design */
          @media (max-width: 768px) {
            .glass-ultra, .glass-emerald, .glass-blue, .glass-purple {
              backdrop-filter: blur(15px);
            }
            
            .text-glow-emerald {
              text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
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
        `}</style>
      </Helmet>
      
      {/* Advanced Background System */}
      <div className="fixed inset-0 z-0">
        <BackgroundLayerGuardian />
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent" />
      </div>
      
      <MissionControlNavbar />
      
      {/* Hero Section - Fixed proportions and dark text */}
      <section className="relative h-[90vh] flex items-center pt-20 z-10">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[70vh]">
            
            {/* Left Side - Dark text for bright background */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="space-y-6">
                {/* Premium Category Label */}
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-emerald-600/80 to-emerald-800"></div>
                  <span className="font-mono text-emerald-800 text-sm tracking-[0.2em] uppercase font-medium bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-600/30">
                    Family Safe AI
                  </span>
                  <div className="h-[1px] w-8 bg-gradient-to-r from-emerald-800 to-transparent"></div>
                </motion.div>
                
                {/* Hero Typography - Dark colors */}
                <div className="space-y-4">
                  <motion.h1 
                    className="font-heading leading-[0.85] tracking-[-0.02em]"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <span className="block text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-2 text-shadow-soft">
                      Guardian
                    </span>
                    <span className="block text-4xl md:text-5xl lg:text-6xl font-light bg-gradient-to-r from-emerald-700 via-blue-700 to-purple-700 text-transparent bg-clip-text">
                      Grows
                    </span>
                    <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-gray-800 mt-2 tracking-wide">
                      With Your Child
                    </span>
                  </motion.h1>
                  
                  {/* Subtitle */}
                  <motion.div 
                    className="space-y-3"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  >
                    <h2 className="font-body text-xl md:text-2xl font-light text-blue-800 tracking-wide leading-relaxed">
                      From a digital teddy bear to a trusted friend
                    </h2>
                    
                    {/* Content Box */}
                    <div className="glass-emerald rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-blue-100/50" />
                      <p className="font-body text-base md:text-lg text-gray-800 leading-relaxed relative z-10">
                        <span className="font-medium text-emerald-800">The next generation will grow up with AI companions - whether we guide that process or not</span> - Guardian ensures their first meaningful digital relationship is one that nurtures emotional intelligence, builds confidence, and strengthens family bonds rather than replacing them.
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 pt-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <Link 
                    to="/codelab" 
                    className="group relative bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-500 hover:via-blue-500 hover:to-purple-500 text-white font-heading font-semibold text-base py-4 px-8 rounded-xl transition-all duration-700 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/25 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span className="text-xl">🛡️</span>
                      Protect Your Child's Digital Future
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                  
                  <Link 
                    to="#features" 
                    className="group glass-ultra font-heading font-medium text-base text-gray-800 hover:text-gray-900 py-4 px-8 rounded-xl transition-all duration-500 hover:border-emerald-600/50 hover:shadow-lg"
                  >
                    <span className="flex items-center gap-3">
                      See How It Works
                      <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Smaller logo */}
            <motion.div 
              className="lg:col-span-5 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 2, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="relative w-72 h-72 md:w-80 md:h-80 float">
                {/* Background Effects */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400/20 via-red-300/15 to-orange-300/10 blur-2xl"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-red-300/30 via-red-200/20 to-transparent blur-xl"></div>
                
                {/* Logo Container */}
                <div className="relative w-full h-full glass-ultra rounded-full border-2 border-red-400/40 shadow-xl shadow-red-500/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 via-transparent to-blue-400/5" />
                  <motion.img
                    src="/assets/images/general/Page_Logos/Guardian_logo.webp"
                    alt="Guardian - Family AI Companion"
                    className="w-3/4 h-3/4 object-contain relative z-10"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.4))'
                    }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement - Dark text */}
      <section className="relative h-[70vh] flex items-center z-10">
        <div className="absolute inset-0 glass-ultra" />
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side */}
            <motion.div 
              className="lg:col-span-5 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="glass-blue rounded-2xl p-8 relative overflow-hidden shadow-xl hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 via-orange-100/40 to-yellow-100/50" />
                <div className="text-center space-y-6 relative z-10">
                  <motion.div 
                    className="w-20 h-20 mx-auto glass-emerald rounded-full flex items-center justify-center text-3xl border-2 border-red-500/40"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    📱
                  </motion.div>
                  <div className="space-y-10">
                    <div className="font-mono text-gray-700 text-sm uppercase tracking-[0.15em]">Current Reality</div>
                    <div className="font-heading text-red-700 font-semibold text-base">Empty Content • Attention Seeking • Exploitative</div>
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-600/60 to-transparent rounded-full" />
                    <div className="font-heading text-emerald-700 font-semibold text-base">Nurturing • Educational • Safe</div>
                    <div className="font-mono text-emerald-800 text-sm tracking-wide">with Guardian AI</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side */}
            <motion.div 
              className="lg:col-span-7 order-1 lg:order-2 space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-blue-600/80 to-blue-800"></div>
                <span className="font-mono text-blue-800 text-sm tracking-[0.2em] uppercase font-medium bg-blue-100/80 px-3 py-1 rounded-full border border-blue-600/30">
                  Mission Statement
                </span>
              </div>
              
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Screen Time That
                <span className="block bg-gradient-to-r from-emerald-700 to-blue-700 text-transparent bg-clip-text font-black">
                  Actually Matters
                </span>
              </h2>
              
              <div className="glass-blue rounded-2xl p-6 shadow-xl">
                <p className="font-body text-lg text-gray-800 leading-relaxed">
                  <span className="font-medium text-blue-800">Unlike passive entertainment that isolates children behind screens</span> Guardian creates genuine connection through conversations that matter. Starting as a caring companion for bedtime stories and growing into a trusted friend for teenage challenges, Guardian remembers what's important to your child and helps them navigate each developmental stage with wisdom, humor, and appropriate boundaries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kids Side Section - Growth Journey - Now Componentized - 190vh */}
      <GuardianKidsSection />

      {/* Parents Side Section - Mature & Comprehensive */}
      <section className="relative min-h-[200vh] py-24 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20" />
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
          
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-slate-400 to-slate-600"></div>
              <span className="font-mono text-slate-700 text-sm tracking-[0.2em] uppercase font-medium bg-slate-100 px-4 py-2 rounded-full border border-slate-300">
                Guardian Parent-Child Interface
              </span>
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-slate-400 to-slate-600"></div>
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-8">
              Two Connected
              <span className="block bg-gradient-to-r from-blue-700 to-emerald-700 text-transparent bg-clip-text font-black">
                Experiences
              </span>
            </h2>
          </motion.div>

          {/* Section 1: Guardian Parent Hero - Connection Focus */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Left Side - Parent Hero Text */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-emerald rounded-3xl p-8 shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 to-blue-100/30" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">💝</span>
                    <h3 className="font-heading text-2xl font-bold text-slate-900">Connection, Not Surveillance</h3>
                  </div>
                  
                  <div className="space-y-4 font-body text-slate-800 leading-relaxed">
                    <p className="text-base">
                      <span className="font-semibold text-emerald-800">Your child's emotional world is complex, and as a busy parent, it's impossible to be present for every moment that matters.</span> Guardian gives you meaningful insights into what your child is really thinking about—their worries, achievements, questions, and growth—without invading their privacy or breaking their trust.
                    </p>
                    
                    <p className="text-base">
                      Instead of wondering what's going on in their head, you'll receive thoughtful summaries that help you understand when to step in, when to celebrate, and when to simply be there.
                    </p>
                    
                    <div className="bg-white/60 rounded-xl p-4 border-l-4 border-blue-500">
                      <p className="text-base">
                        <span className="font-semibold text-blue-800">This isn't about surveillance—it's about connection.</span> Guardian helps bridge the gap between your child's need for independence and your need to ensure they're thriving emotionally.
                      </p>
                    </div>
                    
                    <p className="text-base">
                      When your child processes big feelings with Guardian, you get the context to have better family conversations. When they achieve something meaningful, you know to celebrate it. When they're struggling, you have the insight to offer support in exactly the way they need it.
                    </p>
                    
                    <div className="bg-gradient-to-r from-purple-100/60 to-pink-100/60 rounded-xl p-4">
                      <p className="text-base font-medium text-purple-800">
                        Guardian turns the challenge of parenting in a digital age into an opportunity for deeper family understanding.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Enhanced Mobile Phone Dashboard Mockup */}
            <div className="relative">
              {/* Phone Frame Container */}
              <motion.div 
                className="relative mx-auto"
                style={{ 
                  width: '320px', 
                  height: '640px',
                  transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)'
                }}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                {/* Phone Outer Frame */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] shadow-2xl">
                  {/* Phone Screen */}
                  <div className="absolute inset-2 bg-white rounded-[2rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-white px-6 py-2 flex justify-between items-center text-xs font-mono text-slate-900 border-b border-slate-100">
                      <span className="font-semibold">9:41</span>
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

                    {/* App Content */}
                    <div className="h-full bg-gradient-to-br from-blue-50 to-emerald-50 overflow-y-auto">
                      {/* App Header */}
                      <div className="bg-white/80 backdrop-blur-sm px-4 py-4 border-b border-slate-200/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">📱</span>
                            <span className="font-bold text-slate-900 text-sm">Guardian Parent App</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-600">🔔</span>
                            <span className="text-slate-600">⚙️</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-slate-900 text-base">Emma (Age 9)</h4>
                            <p className="text-xs text-slate-600">This Week • Overall Wellness</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <span className="text-emerald-600 font-bold text-sm">+12%</span>
                              <span className="text-emerald-600 text-xs">↗️</span>
                            </div>
                            <div className="text-xs text-emerald-700 font-medium">Thriving 💚</div>
                          </div>
                        </div>
                      </div>

                      {/* Dashboard Content */}
                      <div className="p-4 space-y-4">
                        {/* Conversation Themes - Enhanced */}
                        <div className="bg-white/90 rounded-2xl p-4 shadow-sm">
                          <h5 className="font-bold text-slate-900 text-sm mb-3">This Week's Conversations (23 total)</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { topic: "Friendship", count: 8, color: "bg-purple-100 text-purple-800 border-purple-200" },
                              { topic: "School Projects", count: 6, color: "bg-blue-100 text-blue-800 border-blue-200" },
                              { topic: "Creative Writing", count: 5, color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
                              { topic: "Family Time", count: 4, color: "bg-yellow-100 text-yellow-800 border-yellow-200" }
                            ].map((theme, i) => (
                              <motion.div
                                key={i}
                                className={`${theme.color} border rounded-lg p-2 text-center`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <div className="font-semibold text-xs">{theme.topic}</div>
                                <div className="font-mono text-xs">({theme.count})</div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Enhanced Mood Trend */}
                        <div className="bg-white/90 rounded-2xl p-4 shadow-sm">
                          <h5 className="font-bold text-slate-900 text-sm mb-3">7-Day Emotional Pattern</h5>
                          <div className="space-y-3">
                            {/* Mood Chart */}
                            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-3">
                              <div className="flex items-end justify-between h-16 mb-2">
                                {[
                                  { day: "M", mood: "Happy", height: 75, color: "bg-emerald-400" },
                                  { day: "T", mood: "Anxious", height: 45, color: "bg-yellow-400" },
                                  { day: "W", mood: "Curious", height: 85, color: "bg-blue-400" },
                                  { day: "T", mood: "Excited", height: 90, color: "bg-purple-400" },
                                  { day: "F", mood: "Happy", height: 80, color: "bg-emerald-400" },
                                  { day: "S", mood: "Calm", height: 70, color: "bg-blue-300" },
                                  { day: "S", mood: "Excited", height: 88, color: "bg-purple-400" }
                                ].map((day, i) => (
                                  <motion.div
                                    key={i}
                                    className="flex flex-col items-center flex-1"
                                    initial={{ height: 0 }}
                                    whileInView={{ height: 'auto' }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <motion.div
                                      className={`${day.color} rounded-t w-full mb-1`}
                                      style={{ height: `${day.height}%` }}
                                      initial={{ height: 0 }}
                                      whileInView={{ height: `${day.height}%` }}
                                      viewport={{ once: true }}
                                      transition={{ delay: i * 0.1, duration: 0.5 }}
                                    />
                                    <span className="text-xs font-mono text-slate-600">{day.day}</span>
                                  </motion.div>
                                ))}
                              </div>
                              <p className="text-xs text-slate-600 text-center">Mostly positive with Tuesday dip (school test)</p>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Recent Insights */}
                        <div className="bg-white/90 rounded-2xl p-4 shadow-sm">
                          <h5 className="font-bold text-slate-900 text-sm mb-3">Recent Insights</h5>
                          <div className="space-y-3">
                            {/* Growth Moments */}
                            <div>
                              <h6 className="font-semibold text-emerald-800 text-xs mb-2 flex items-center gap-1">
                                🎯 Growth Moments
                              </h6>
                              <div className="space-y-1">
                                {[
                                  "Worked through presentation anxiety using breathing techniques",
                                  "Used 'frustrated' instead of 'mad' - vocabulary growing",
                                  "Asked for help with math instead of giving up"
                                ].map((moment, i) => (
                                  <motion.div
                                    key={i}
                                    className="flex items-start gap-2 text-xs text-slate-700"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <span className="text-emerald-600 mt-0.5">✅</span>
                                    <span>{moment}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* Discussion Opportunities */}
                            <div>
                              <h6 className="font-semibold text-blue-800 text-xs mb-2 flex items-center gap-1">
                                💡 Discussion Opportunities
                              </h6>
                              <div className="space-y-1">
                                {[
                                  "Mentioned wanting guitar lessons 3x this week 🎸",
                                  "Curious about 'how friendships work' 📚",
                                  "Excited about art project, wants to show family 🎨"
                                ].map((opportunity, i) => (
                                  <motion.div
                                    key={i}
                                    className="text-xs text-slate-700 flex items-start gap-1"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <span className="text-blue-600">•</span>
                                    <span>{opportunity}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* Gentle Alerts */}
                            <div>
                              <h6 className="font-semibold text-yellow-800 text-xs mb-2 flex items-center gap-1">
                                ⚠️ Gentle Alerts
                              </h6>
                              <div className="space-y-1">
                                {[
                                  "Mentioned feeling 'left out' during lunch twice 💭",
                                  "Some concern about upcoming group project 🏫"
                                ].map((alert, i) => (
                                  <motion.div
                                    key={i}
                                    className="text-xs text-slate-700 flex items-start gap-1"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <span className="text-yellow-600">•</span>
                                    <span>{alert}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Family Actions - Enhanced */}
                        <div className="bg-white/90 rounded-2xl p-4 shadow-sm">
                          <h5 className="font-bold text-slate-900 text-sm mb-3">🗣️ Suggested Conversations</h5>
                          <div className="space-y-2">
                            {[
                              "Tell me about your creative writing story",
                              "I heard you did great on your presentation!",
                              "Want to look at guitar lessons together?"
                            ].map((suggestion, i) => (
                              <motion.div
                                key={i}
                                className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-2"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <p className="text-xs text-slate-800 font-medium">"{suggestion}"</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Weekly Stats */}
                        <div className="bg-white/90 rounded-2xl p-4 shadow-sm">
                          <h5 className="font-bold text-slate-900 text-sm mb-3">📊 This Week's Data</h5>
                          <div className="grid grid-cols-2 gap-3 text-center">
                            {[
                              { label: "Conversations", value: "23", color: "text-blue-600" },
                              { label: "Avg Mood", value: "4.2", color: "text-emerald-600" },
                              { label: "Growth Moments", value: "3", color: "text-purple-600" },
                              { label: "Safety Alerts", value: "0", color: "text-emerald-600" }
                            ].map((stat, i) => (
                              <motion.div
                                key={i}
                                className="bg-slate-50 rounded-lg p-2"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <div className={`font-mono font-bold text-lg ${stat.color}`}>{stat.value}</div>
                                <div className="text-xs text-slate-600">{stat.label}</div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Navigation */}
                      <div className="bg-white/95 backdrop-blur-sm border-t border-slate-200/50 px-4 py-3">
                        <div className="flex justify-around">
                          {[
                            { icon: "📊", label: "Insights", active: true },
                            { icon: "🗣️", label: "Conversations", active: false },
                            { icon: "⚙️", label: "Settings", active: false },
                            { icon: "👨‍👩‍👧‍👦", label: "Family", active: false }
                          ].map((nav, i) => (
                            <motion.div
                              key={i}
                              className={`flex flex-col items-center gap-1 ${
                                nav.active ? 'text-blue-600' : 'text-slate-500'
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="text-sm">{nav.icon}</span>
                              <span className="text-xs font-medium">{nav.label}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Home Indicator */}
                      <div className="flex justify-center py-2">
                        <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Shadow */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-slate-900/40 rounded-[2.5rem] blur-xl transform translate-y-4 -z-10"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Guardian Unified Component - Investor Product Overview */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-slate-400 to-slate-600"></div>
                <span className="font-mono text-slate-700 text-sm tracking-[0.2em] uppercase font-medium bg-white px-4 py-2 rounded-full border border-slate-300 shadow-sm">
                  Guardian Platform Overview
                </span>
                <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-slate-400 to-slate-600"></div>
              </div>
              
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-4">
                Enterprise-Grade
                <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 text-transparent bg-clip-text font-black">
                  Child Development Platform
                </span>
              </h3>
            </div>

            {/* Z-Pattern Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
              
              {/* Top Left: Impact Metrics */}
              <motion.div 
                className="lg:col-span-5 bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <h4 className="font-heading text-xl font-semibold text-slate-900">Family Wellness Impact</h4>
                  </div>
                  
                  <div className="text-sm text-slate-600 font-medium mb-4">Research-Backed Results</div>
                  
                  {/* Parent Stress Reduction */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-800">Parent Stress Reduction</span>
                      <span className="font-mono text-sm text-slate-600">74% → 23%</span>
                    </div>
                    <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-400 via-yellow-400 to-emerald-500 rounded-full"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "77%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 gap-4 pt-4">
                    {[
                      { label: "Child Emotional Vocabulary", value: "+67%", color: "text-blue-600" },
                      { label: "Family Discussion Quality", value: "+340%", color: "text-purple-600" },
                      { label: "Screen Time Value", value: "89%", color: "text-emerald-600", subtitle: "educational vs entertainment" }
                    ].map((metric, i) => (
                      <motion.div
                        key={i}
                        className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                      >
                        <div>
                          <div className="font-medium text-slate-800 text-sm">{metric.label}</div>
                          {metric.subtitle && (
                            <div className="text-xs text-slate-500">{metric.subtitle}</div>
                          )}
                        </div>
                        <div className={`font-mono font-bold text-lg ${metric.color}`}>
                          {metric.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-xs text-slate-500 font-medium">
                      Based on 6-month beta with 127 families
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Top Right: Conversation Intelligence */}
              <motion.div 
                className="lg:col-span-7 bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h4 className="font-heading text-xl font-semibold text-slate-900">Real-Time Family Bridge</h4>
                  </div>
                  
                  <div className="text-sm text-slate-600 font-medium mb-4">This Week's Generated Insights:</div>
                  
                  {/* Insight Cards */}
                  <div className="space-y-3">
                    {[
                      { icon: "💬", text: "Emma's creative confidence is building", type: "Growth" },
                      { icon: "🎯", text: "Math anxiety decreased after Guardian support", type: "Progress" },
                      { icon: "🎸", text: "Strong interest in music - family opportunity", type: "Opportunity" }
                    ].map((insight, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                      >
                        <span className="text-lg flex-shrink-0">{insight.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-slate-800 text-sm">"{insight.text}"</div>
                          <div className="text-xs text-slate-500 mt-1">{insight.type}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Summary Stats */}
                  <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-4 border border-blue-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-mono font-bold text-xl text-blue-600">23 → 3</div>
                        <div className="text-xs text-slate-600">conversations → actionable family moments</div>
                      </div>
                      <div>
                        <div className="font-mono font-bold text-xl text-emerald-600 flex items-center justify-center gap-1">
                          ↗️ Positive
                        </div>
                        <div className="text-xs text-slate-600">emotional wellness trending</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Center Diagonal: Safety Architecture */}
              <motion.div 
                className="lg:col-span-12 bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="text-center space-y-8">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="text-2xl">🛡️</span>
                    <h4 className="font-heading text-2xl font-bold text-slate-900">Graduated Safety System</h4>
                  </div>

                  {/* Privacy Maturation Model */}
                  <div className="max-w-4xl mx-auto">
                    <div className="text-sm text-slate-600 font-medium mb-6">Privacy Maturation Model</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {[
                        { 
                          age: "Ages 3-6", 
                          title: "Foundation", 
                          desc: "Family transparency with safety education",
                          color: "emerald",
                          icon: "🧸"
                        },
                        { 
                          age: "Ages 7-10", 
                          title: "Development", 
                          desc: "Selective privacy with clear boundaries",
                          color: "blue",
                          icon: "🎒"
                        },
                        { 
                          age: "Ages 11-17", 
                          title: "Maturation", 
                          desc: "Advanced privacy with protective oversight",
                          color: "purple",
                          icon: "🤝"
                        }
                      ].map((stage, i) => (
                        <motion.div
                          key={i}
                          className={`bg-${stage.color}-50 border border-${stage.color}-200 rounded-xl p-4 text-center`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.5 }}
                        >
                          <div className="text-2xl mb-2">{stage.icon}</div>
                          <div className="font-semibold text-slate-900 text-sm mb-1">{stage.age}</div>
                          <div className={`font-medium text-${stage.color}-700 text-sm mb-2`}>{stage.title}</div>
                          <div className="text-xs text-slate-600">{stage.desc}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Crisis Response & Professional Integration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="font-semibold text-slate-900 text-sm mb-2">Crisis Response Hierarchy</div>
                        <div className="text-xs text-slate-600">Immediate → Important → Weekly → Celebration</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="font-semibold text-slate-900 text-sm mb-2">Professional Integration</div>
                        <div className="text-xs text-slate-600">Therapeutic data export capability</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Left: Technical Depth */}
              <motion.div 
                className="lg:col-span-5 bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <h4 className="font-heading text-xl font-semibold text-slate-900">Technical Architecture</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      "Multi-modal emotional pattern recognition",
                      "14-year relationship continuity architecture",
                      "Parent-child dual-interface synchronization",
                      "COPPA-compliant data sovereignty",
                      "Local processing with encrypted cloud backup",
                      "Developmental psychology-informed conversation flows"
                    ].map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.7 }}
                      >
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700 leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-xs text-slate-500 font-medium">
                      Enterprise-Grade Child Development Platform
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Right: Investment Readiness */}
              <motion.div 
                className="lg:col-span-7 bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <h4 className="font-heading text-xl font-semibold text-slate-900">Market Position & Validation</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Market Position */}
                    <div className="space-y-4">
                      <div className="text-sm font-medium text-slate-800 mb-3">Strategic Advantages</div>
                      {[
                        { label: "Regulatory Landscape", value: "Ahead of legislation curve" },
                        { label: "Competitive Moat", value: "First relationship-duration platform" },
                        { label: "Revenue Model", value: "Family SaaS + enterprise licensing" },
                        { label: "Beta Validation", value: "94% family retention rate" }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className="space-y-1"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.9 }}
                        >
                          <div className="text-xs font-medium text-slate-600">{item.label}</div>
                          <div className="text-sm text-slate-800">{item.value}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* IP Portfolio */}
                    <div className="space-y-4">
                      <div className="text-sm font-medium text-slate-800 mb-3">Intellectual Property</div>
                      <div className="space-y-3">
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <div className="font-medium text-blue-800 text-sm">Technical IP</div>
                          <div className="text-xs text-blue-600 mt-1">Emotional memory management system</div>
                        </div>
                        <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                          <div className="font-medium text-emerald-800 text-sm">Business IP</div>
                          <div className="text-xs text-emerald-600 mt-1">Child development safety protocols</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics Summary */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="font-mono font-bold text-xl text-amber-600">127</div>
                        <div className="text-xs text-slate-600">Beta Families</div>
                      </div>
                      <div>
                        <div className="font-mono font-bold text-xl text-amber-600">94%</div>
                        <div className="text-xs text-slate-600">Retention Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Pricing Section - Dark text and better proportions */}
      <section className="relative h-[110vh] flex items-center py-12 z-10">
        <div className="absolute inset-0 glass-ultra" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-emerald-600/80 to-emerald-800"></div>
              <span className="font-mono text-emerald-800 text-sm tracking-[0.2em] uppercase font-medium bg-emerald-100/80 px-4 py-2 rounded-full border border-emerald-600/30">
                Family Plans
              </span>
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-emerald-600/80 to-emerald-800"></div>
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-emerald-700 to-blue-700 text-transparent bg-clip-text">
                Family Plan
              </span>
            </h2>
            <p className="font-body text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Safe, nurturing AI companionship that grows with your child through every stage of development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: "Guardian Starter",
                price: "Free",
                period: "14-day trial",
                icon: "🎁",
                popular: false,
                description: "Perfect for trying Guardian with your family",
                features: [
                  "14-day full access trial",
                  "All age-appropriate modes",
                  "Basic parental dashboard",
                  "Email support"
                ],
                gradient: "from-emerald-100/50 to-emerald-200/50",
                accentColor: "emerald"
              },
              {
                name: "Guardian Family",
                price: "$24",
                period: "per month",
                icon: "💝",
                popular: true,
                description: "Complete family AI companion experience",
                features: [
                  "Unlimited conversations",
                  "All evolutionary stages (3-17 years)",
                  "Advanced parental controls",
                  "Multi-child support",
                  "Priority support"
                ],
                gradient: "from-blue-100/50 to-blue-200/50",
                accentColor: "blue"
              },
              {
                name: "Guardian Premium",
                price: "$39",
                period: "per month",
                icon: "👑",
                popular: false,
                description: "Enhanced features for mindful families",
                features: [
                  "Everything in Family plan",
                  "Professional consultation access",
                  "Advanced analytics & reports",
                  "Family therapy integration"
                ],
                gradient: "from-purple-100/50 to-purple-200/50",
                accentColor: "purple"
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative glass-${plan.accentColor} rounded-2xl p-6 ${
                  plan.popular 
                    ? 'ring-2 ring-emerald-600 shadow-xl shadow-emerald-600/20 scale-105' 
                    : 'shadow-lg hover:shadow-xl'
                } hover:scale-[1.02] transition-all duration-700 overflow-hidden`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient}`} />
                
                {plan.popular && (
                  <motion.div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-heading font-bold py-2 px-6 rounded-full shadow-lg border border-emerald-500/50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    ✨ Most Popular
                  </motion.div>
                )}
                
                <div className="text-center space-y-6 relative z-10">
                  <div className="space-y-3">
                    <motion.div 
                      className="text-4xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {plan.icon}
                    </motion.div>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="font-body text-gray-700">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-heading text-4xl md:text-5xl font-bold text-gray-900">
                      {plan.price}
                      {plan.price !== "Free" && (
                        <span className="text-lg text-gray-700 font-normal">/{plan.period}</span>
                      )}
                    </div>
                    {plan.price === "Free" && (
                      <div className="font-body text-gray-700">{plan.period}</div>
                    )}
                  </div>
                  
                  <Link
                    to="/contact"
                    className={`block w-full bg-gradient-to-r from-${plan.accentColor}-600 to-${plan.accentColor}-700 hover:from-${plan.accentColor}-500 hover:to-${plan.accentColor}-600 text-white font-heading font-semibold text-base py-3 px-6 rounded-xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                  >
                    {plan.price === "Free" ? "Start Free Trial" : "Choose Plan"}
                  </Link>
                  
                  <div className="space-y-3 text-left">
                    {plan.features.map((feature, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-3 font-body text-gray-800"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="text-emerald-600 text-lg flex-shrink-0 mt-0.5">✓</span>
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-800">
              {[
                { icon: "🔒", text: "Enterprise-grade security", color: "emerald" },
                { icon: "👨‍👩‍👧‍👦", text: "Complete parental control", color: "blue" },
                { icon: "❌", text: "Cancel anytime", color: "purple" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-2 font-body"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`text-xl text-${item.color}-600`}>{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Dark text and better proportions */}
      <footer className="relative h-[80vh] flex items-center py-12 z-10">
        <div className="absolute inset-0 glass-ultra" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 via-blue-100/20 to-purple-100/20" />
        <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
          <motion.div
            className="text-center space-y-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl md:text-7xl mb-6 float"
              >
                🛡️
              </motion.div>
              
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Child's Digital
                <span className="block bg-gradient-to-r from-emerald-700 via-blue-700 to-purple-700 text-transparent bg-clip-text">
                  Future Starts Here
                </span>
              </h2>
              
              <div className="glass-emerald rounded-2xl p-6 md:p-8 max-w-4xl mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-blue-100/50" />
                <p className="font-body text-lg md:text-xl text-gray-800 leading-relaxed relative z-10">
                  Give your child the gift of a healthy first AI relationship. 
                  <span className="text-emerald-700 font-medium"> Guardian grows with them</span>, 
                  <span className="text-blue-700 font-medium"> protects them</span>, and 
                  <span className="text-purple-700 font-medium"> prepares them</span> for a digital world 
                  where they'll always value human connection above all else.
                </p>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6"
            >
              <Link
                to="/codelab"
                className="group relative bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-500 hover:via-blue-500 hover:to-purple-500 text-white font-heading font-bold text-lg py-5 px-10 rounded-xl transition-all duration-700 transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="text-2xl">🌟</span>
                  Start Free 14-Day Trial
                  <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <div className="font-mono text-gray-700 text-center">
                <div className="text-base">No credit card required</div>
                <div className="text-sm opacity-75">Full access • Cancel anytime</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
}