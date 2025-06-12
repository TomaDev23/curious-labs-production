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
        <style jsx>{`
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

          {/* Section 1: Two Connected Experiences */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Child Interface */}
            <div className="glass-blue rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-purple-100/30" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">👶</span>
                  <h3 className="font-heading text-2xl font-bold text-slate-900">Child Interface</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: "🎭", text: "Personal companion that evolves from cute character to trusted friend" },
                    { icon: "🗣️", text: "Voice-first conversations with patient, natural responses" },
                    { icon: "🔒", text: "Age-appropriate privacy that grows with the child" },
                    { icon: "💭", text: "Remembers interests, jokes, and important moments" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-white/60 rounded-xl"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <p className="font-body text-slate-700 text-sm leading-relaxed">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Parent Dashboard */}
            <div className="glass-emerald rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 to-blue-100/30" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">👨‍👩‍👧‍👦</span>
                  <h3 className="font-heading text-2xl font-bold text-slate-900">Parent Dashboard</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: "📊", text: "Weekly emotional wellness summaries" },
                    { icon: "🧠", text: "Conversation themes and growth insights" },
                    { icon: "🚨", text: "Smart alerts for safety concerns or important patterns" },
                    { icon: "💬", text: "Family discussion suggestions based on child's interests" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-white/60 rounded-xl"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <p className="font-body text-slate-700 text-sm leading-relaxed">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Parent Stress Levels Graph */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="glass-ultra rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-blue-100/30" />
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">Parent Stress Levels</h3>
                  <p className="font-body text-slate-600">Before vs After Guardian Implementation</p>
                </div>
                
                {/* Stress Graph */}
                <div className="bg-white/80 rounded-2xl p-6 mb-6">
                  <div className="flex items-end justify-center gap-8 h-32 mb-4">
                    {/* Before Guardian */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-24 bg-gradient-to-t from-red-400 to-red-500 rounded-t-lg relative">
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-red-600 font-bold text-lg">74%</div>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="font-semibold text-red-700 text-sm">Before Guardian</div>
                        <div className="text-xs text-slate-600">High Stress</div>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex items-center mb-8">
                      <div className="text-blue-500 text-2xl">→</div>
                    </div>
                    
                    {/* After Guardian */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-8 bg-gradient-to-t from-emerald-400 to-emerald-500 rounded-t-lg relative">
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-emerald-600 font-bold text-lg">23%</div>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="font-semibold text-emerald-700 text-sm">After Guardian</div>
                        <div className="text-xs text-slate-600">Low Stress</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Curve Line */}
                  <div className="relative h-16 mb-4">
                    <svg className="w-full h-full" viewBox="0 0 400 60">
                      <path 
                        d="M 50 10 Q 200 50 350 15" 
                        stroke="url(#stressGradient)" 
                        strokeWidth="3" 
                        fill="none"
                        className="drop-shadow-sm"
                      />
                      <defs>
                        <linearGradient id="stressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute left-12 top-0 text-xs text-slate-600">Guardian Start</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Intelligent Safety System */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="text-center mb-12">
              <h3 className="font-heading text-3xl font-bold text-slate-900 mb-4">Intelligent Safety System</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Alert Types */}
              <div className="glass-purple rounded-3xl p-8 shadow-xl">
                <h4 className="font-heading text-xl font-bold text-slate-900 mb-6">Alert Types</h4>
                <div className="space-y-4">
                  {[
                    { color: "🔴", level: "Immediate", desc: "Safety concerns, crisis language", bg: "bg-red-50 border-red-200" },
                    { color: "🟡", level: "Important", desc: "Emotional patterns worth discussing", bg: "bg-yellow-50 border-yellow-200" },
                    { color: "🔵", level: "Weekly", desc: "Development insights and conversation highlights", bg: "bg-blue-50 border-blue-200" },
                    { color: "🟢", level: "Celebrations", desc: "Achievements and proud moments", bg: "bg-emerald-50 border-emerald-200" }
                  ].map((alert, i) => (
                    <motion.div
                      key={i}
                      className={`${alert.bg} border rounded-xl p-4`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{alert.color}</span>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{alert.level}</div>
                          <div className="text-slate-700 text-xs">{alert.desc}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Privacy Levels */}
              <div className="glass-blue rounded-3xl p-8 shadow-xl">
                <h4 className="font-heading text-xl font-bold text-slate-900 mb-6">Privacy Levels</h4>
                <div className="space-y-4">
                  {[
                    { age: "Young Kids", desc: "Open family sharing with safety focus", icon: "🧸" },
                    { age: "School Age", desc: "Some private thoughts with clear safety rules", icon: "🎒" },
                    { age: "Tweens/Teens", desc: "Increased privacy with protective oversight", icon: "🤝" }
                  ].map((level, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/60 rounded-xl p-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{level.icon}</span>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{level.age}</div>
                          <div className="text-slate-700 text-xs">{level.desc}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Family Connection Tools */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="text-center mb-12">
              <h3 className="font-heading text-3xl font-bold text-slate-900 mb-4">Family Connection Tools</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Communication Bridge */}
              <div className="glass-emerald rounded-3xl p-8 shadow-xl">
                <h4 className="font-heading text-xl font-bold text-slate-900 mb-6">Communication Bridge</h4>
                <div className="space-y-3">
                  {[
                    "Child can ask Guardian to help approach parents about sensitive topics",
                    "Guardian suggests family conversation starters",
                    "Shared celebration of emotional and academic milestones",
                    "Weekly insights help parents understand child's inner world"
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-700"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Customization Options */}
              <div className="glass-purple rounded-3xl p-8 shadow-xl">
                <h4 className="font-heading text-xl font-bold text-slate-900 mb-6">Customization Options</h4>
                <div className="space-y-4">
                  {[
                    { title: "Parent Settings", desc: "Adjust values alignment, communication style, topic boundaries" },
                    { title: "Child Choices", desc: "Personalize appearance, interaction style, interest focus" },
                    { title: "Safety Controls", desc: "Crisis protocols, professional integration, data privacy" }
                  ].map((option, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/60 rounded-xl p-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="font-semibold text-slate-900 text-sm mb-1">{option.title}</div>
                      <div className="text-slate-700 text-xs">{option.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 4: Crisis & Professional Support */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="glass-red rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="font-heading text-3xl font-bold text-slate-900 mb-4">Crisis & Professional Support</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: "🚨", title: "Immediate Safety", desc: "Alerts with professional resource guidance" },
                  { icon: "📋", title: "Documentation", desc: "Conversation records for therapeutic support" },
                  { icon: "🏠", title: "Life Events", desc: "Support during divorce, loss, moving, stress" },
                  { icon: "🌱", title: "Recovery", desc: "Adaptive assistance for healing process" }
                ].map((support, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/80 rounded-xl p-4 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-2xl mb-2">{support.icon}</div>
                    <div className="font-semibold text-slate-900 text-sm mb-1">{support.title}</div>
                    <div className="text-slate-700 text-xs">{support.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Section 5: Data Privacy & Control */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="glass-ultra rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="font-heading text-3xl font-bold text-slate-900 mb-4">Data Privacy & Control</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: "💻", title: "Local Processing", desc: "Device processing with minimal cloud storage" },
                  { icon: "🔐", title: "Family Control", desc: "Complete control over data location and sharing" },
                  { icon: "🔍", title: "Transparency", desc: "Clear safety classification system" },
                  { icon: "📤", title: "Data Freedom", desc: "Easy export/delete options" }
                ].map((privacy, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/80 rounded-xl p-4 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-2xl mb-2">{privacy.icon}</div>
                    <div className="font-semibold text-slate-900 text-sm mb-1">{privacy.title}</div>
                    <div className="text-slate-700 text-xs">{privacy.desc}</div>
                  </motion.div>
                ))}
              </div>
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