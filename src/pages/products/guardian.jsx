// ✅ KEEP - GUARDIAN PRODUCT - CRITICAL PRODUCTION SUB-ROUTE
// 🔴 CODE: GUARDIAN-001
// 🛡️ STATUS: FAMILY-FRIENDLY AI COMPANION - REDESIGNED FOR BEAUTY
// 📋 COMPONENTS: MissionControlNavbar, BackgroundLayerGuardian, ScrollToTop
// 🌈 FEATURES: Family-safe design, child development, parental controls
// ⚠️ WARNING: DO NOT REMOVE - CORE PRODUCT SUB-ROUTE
// 📊 BUNDLE: Uses atomic background system with family aesthetics
// 🎯 ROUTE: /products/guardian
// 🔗 PARENT: Products Portal (/products)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerGuardian from '../../components/atomic/BackgroundLayerGuardian';
import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import { motion } from '../../FramerProvider';

export default function Guardian() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 text-gray-900 overflow-hidden relative font-['Inter'] antialiased">
      <Helmet>
        <title>Guardian - The AI Companion That Grows With Your Child | CuriousLabs</title>
        <meta name="description" content="From teddy bear to trusted friend. A safe, caring AI presence that evolves through every stage of childhood with complete parental control." />
        <meta property="og:title" content="Guardian - The AI Companion That Grows With Your Child | CuriousLabs" />
        <meta property="og:description" content="Safe AI companion that grows with your child from preschool through high school. Built with families in mind." />
        <meta property="og:image" content="/assets/images/general/Page_Logos/Guardian_logo.webp" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/guardian" />
      </Helmet>
      
      <BackgroundLayerGuardian />
      <MissionControlNavbar />
      
      {/* Family-Friendly Atmospheric System */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-green-200/30 via-blue-200/20 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-bl from-blue-200/25 via-green-200/20 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 0.9, 1.1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Floating playful elements */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            style={{
              left: `${20 + i * 12}%`,
              top: `${25 + (i % 3) * 20}%`
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut"
            }}
          >
            {['🌟', '🛡️', '🌈', '💝', '🎨', '⭐'][i]}
          </motion.div>
        ))}
      </div>

      {/* Hero Section - Z Layout Start */}
      <section className="relative h-[100vh] flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
            
            {/* Left Side - Content */}
            <motion.div 
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-green-400"></div>
                  <span className="text-green-600 font-mono text-sm tracking-wider uppercase">Family Safe AI</span>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <span className="block text-gray-900 mb-2">Guardian</span>
                  <span className="block bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-transparent bg-clip-text font-extrabold">
                    Grows
                  </span>
                  <span className="block text-gray-700 text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">With Your Child</span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl md:text-2xl text-blue-700 font-medium tracking-wide">
                    From teddy bear to trusted friend
                  </h2>
                  
                  {/* RESERVED SPACE 1: Main value proposition paragraph */}
                  <div className="bg-white/60 backdrop-blur-sm border border-green-200/50 rounded-2xl p-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      [RESERVED FOR YOUR LONGER CONTENT] - Main value proposition and emotional connection paragraph goes here. This space is specifically reserved for your better, more compelling copy that will replace the scattered small text throughout the page.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Link 
                    to="/codelab" 
                    className="group bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 hover:from-green-300 hover:via-blue-300 hover:to-purple-300 text-white font-medium py-4 px-8 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/25 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Protect Your Child's Digital Future
                      <motion.svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                  
                  <Link 
                    to="#features" 
                    className="group bg-white/80 backdrop-blur-md border-2 border-green-300/50 text-gray-700 hover:bg-green-50 hover:border-green-400 font-medium py-4 px-8 rounded-full transition-all duration-500"
                  >
                    See How It Works
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Logo */}
            <motion.div 
              className="lg:col-span-5 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="relative"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: isHovered 
                      ? "0 0 80px rgba(74, 222, 128, 0.4), 0 0 120px rgba(96, 165, 250, 0.3)"
                      : "0 0 40px rgba(74, 222, 128, 0.2), 0 0 80px rgba(96, 165, 250, 0.2)"
                  }}
                  transition={{ duration: 0.8 }}
                />
                
                <motion.div
                  className="w-80 h-80 md:w-96 md:h-96 relative"
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 40, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <div className="absolute inset-4 border border-green-300/40 rounded-full animate-pulse" />
                  <div className="absolute inset-8 border border-blue-300/50 rounded-full" />
                  <div className="absolute inset-12 border border-purple-300/40 rounded-full animate-pulse" />
                  
                  <motion.img
                    src="/assets/images/general/Page_Logos/Guardian_logo.webp"
                    alt="Guardian - Family AI Companion"
                    className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                    animate={{ 
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(74, 222, 128, 0.6))'
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement - Z Layout Right */}
      <section className="relative h-[80vh] flex items-center bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side - Visual */}
            <motion.div 
              className="lg:col-span-5 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
                <motion.div
                  className="bg-gradient-to-br from-red-100/60 via-orange-100/40 to-yellow-100/60 backdrop-blur-md border border-red-200/40 rounded-3xl p-8 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-300 to-orange-300 rounded-full flex items-center justify-center text-3xl">
                      📱
                    </div>
                    <div className="space-y-3">
                      <div className="text-gray-600 text-sm font-mono">Current Reality</div>
                      <div className="text-gray-800 font-semibold">Empty Content • Attention Seeking • Exploitative</div>
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
                      <div className="text-green-700 font-semibold">Nurturing • Educational • Safe</div>
                      <div className="text-green-600 text-sm">with Guardian AI</div>
                    </div>
                  </div>
                </motion.div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div 
              className="lg:col-span-7 order-1 lg:order-2 space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
                  <span className="text-blue-600 font-mono text-sm tracking-wider uppercase">Mission Statement</span>
                </motion.div>
                
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Screen Time That
                  <span className="block bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text font-black">
                    Actually Matters
                  </span>
                </motion.h2>
                
              {/* RESERVED SPACE 2: Mission explanation paragraph */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                className="bg-blue-50/50 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-6"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  [RESERVED FOR YOUR LONGER CONTENT] - Deep dive into the mission, why current solutions fail, and what makes Guardian different. This replaces all the scattered small text about digital companions and exploitation.
                  </p>
                </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kids Side Section - Growth Journey */}
      <section id="features" className="relative h-[150vh] flex items-center py-16">
        <div className="max-w-7xl mx-auto px-4 w-full">
            
            <motion.div 
            className="text-center mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
              <span className="text-green-600 font-mono text-sm tracking-wider uppercase">For Kids</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-400"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                  Growing Up
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-black">
                    Together
                  </span>
            </h2>

            {/* RESERVED SPACE 3: Kids growth philosophy */}
            <div className="bg-gradient-to-br from-green-50/60 to-blue-50/60 backdrop-blur-sm border border-green-200/50 rounded-2xl p-8 max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                [RESERVED FOR YOUR LONGER CONTENT] - The philosophy behind Guardian's growth approach, how it evolves with children, and why this long-term relationship matters. This consolidates all the mission content into one powerful statement.
              </p>
              </div>
            </motion.div>

          {/* Unified Age Progression Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Age Timeline Visual */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="bg-white/80 backdrop-blur-md border border-green-200/50 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Development Journey</h4>
                  <p className="text-sm text-gray-600">Ages 3-17: Complete growth companion</p>
                </div>
                
                <div className="space-y-6">
                  {[
                    { age: "3-6", emoji: "🧸", label: "Caring Bear", color: "from-pink-300 to-rose-300", skills: ["Emotional Intelligence", "Creative Play", "Safety Awareness"] },
                    { age: "7-10", emoji: "🎒", label: "Helpful Buddy", color: "from-blue-300 to-cyan-300", skills: ["Homework Support", "Learning Games", "Independence"] },
                    { age: "11-13", emoji: "🤝", label: "Understanding Ally", color: "from-green-300 to-emerald-300", skills: ["Identity Support", "Social Navigation", "Emotional Growth"] },
                    { age: "14-17", emoji: "💭", label: "Trusted Friend", color: "from-purple-300 to-violet-300", skills: ["Life Planning", "Decision Making", "Future Readiness"] }
                  ].map((stage, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2, duration: 0.8 }}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${stage.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                        {stage.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-700 font-semibold">Ages {stage.age}</span>
                          <span className="text-sm text-gray-500">• {stage.label}</span>
                      </div>
                        <div className="flex gap-1 flex-wrap">
                          {stage.skills.map((skill, j) => (
                            <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Interactive Features */}
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    icon: "🎨", 
                    title: "Creative Expression", 
                    desc: "Art, music, storytelling that grows with imagination",
                    color: "from-pink-400 to-rose-400"
                  },
                  { 
                    icon: "🧠", 
                    title: "Learning Adventures", 
                    desc: "Personalized education that adapts to learning style",
                    color: "from-blue-400 to-cyan-400"
                  },
                  { 
                    icon: "💝", 
                    title: "Emotional Growth", 
                    desc: "Safe space to explore feelings and build confidence",
                    color: "from-green-400 to-emerald-400"
                  },
                  { 
                    icon: "🌟", 
                    title: "Future Ready", 
                    desc: "Skills for tomorrow while staying grounded in humanity",
                    color: "from-purple-400 to-violet-400"
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-500"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Parents Side Section - Safety & Controls */}
      <section className="relative h-[150vh] flex items-center py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side - Content */}
            <motion.div 
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400"></div>
                  <span className="text-purple-600 font-mono text-sm tracking-wider uppercase">For Parents</span>
                </motion.div>
                
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Complete Control &
                  <span className="block bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text font-black">
                    Peace of Mind
                  </span>
                </motion.h2>
                
                {/* RESERVED SPACE 4: Parents control philosophy */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="bg-purple-50/50 backdrop-blur-sm border border-purple-200/50 rounded-2xl p-6"
                >
                  <p className="text-lg text-gray-700 leading-relaxed">
                    [RESERVED FOR YOUR LONGER CONTENT] - Deep dive into parental controls, safety features, and how parents maintain oversight while allowing healthy growth. This consolidates all the safety and control messaging.
                  </p>
                </motion.div>

                {/* Parent Control Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: "🛡️", title: "Real-time Monitoring", desc: "See every conversation and interaction in your dashboard" },
                    { icon: "⏰", title: "Time Controls", desc: "Set healthy boundaries with flexible scheduling" },
                    { icon: "🎯", title: "Content Filtering", desc: "Age-appropriate responses with your values in mind" },
                    { icon: "📊", title: "Growth Reports", desc: "Weekly insights into your child's development" }
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-xl border border-purple-200/30"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</div>
                        <div className="text-xs text-gray-600">{feature.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Safety Dashboard Visual */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="bg-white/80 backdrop-blur-md border border-purple-200/50 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Parent Dashboard</h4>
                  <p className="text-sm text-gray-600">Complete oversight & control</p>
                </div>
                
                <div className="space-y-6">
                  {/* Safety Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "100%", label: "Safe Interactions", color: "from-green-400 to-emerald-400" },
                      { value: "24/7", label: "Monitoring", color: "from-blue-400 to-cyan-400" },
                      { value: "0", label: "Privacy Violations", color: "from-purple-400 to-violet-400" },
                      { value: "∞", label: "Parental Control", color: "from-pink-400 to-rose-400" }
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        className="text-center bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                      >
                        <div className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm`}>
                          {stat.value}
                        </div>
                        <div className="text-xs font-medium text-gray-700">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Control Panel Preview */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200/50">
                    <div className="text-xs font-semibold text-gray-700 mb-3">Quick Controls</div>
                    <div className="space-y-2">
                      {["Screen Time", "Content Filter", "Conversation Review", "Emergency Stop"].map((control, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">{control}</span>
                          <div className="w-8 h-4 bg-green-400 rounded-full relative">
                            <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Streamlined */}
      <section className="relative h-[100vh] flex items-center py-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
              <span className="text-green-600 font-mono text-sm tracking-wider uppercase">Family Plans</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-400"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
                Family Plan
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Safe, nurturing AI companionship that grows with your child through every stage of development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                gradient: "from-green-100 to-emerald-100",
                buttonStyle: "bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-300 hover:to-emerald-300"
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
                gradient: "from-blue-100 to-cyan-100",
                buttonStyle: "bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-300 hover:to-cyan-300"
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
                gradient: "from-purple-100 to-violet-100",
                buttonStyle: "bg-gradient-to-r from-purple-400 to-violet-400 hover:from-purple-300 hover:to-violet-300"
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative bg-gradient-to-br ${plan.gradient} border rounded-3xl p-8 ${plan.popular ? 'ring-2 ring-blue-300 shadow-2xl' : 'shadow-lg'} hover:shadow-xl transition-all duration-500`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-sm font-bold py-2 px-6 rounded-full shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    ✨ Most Popular
                  </motion.div>
                )}
                
                <div className="text-center space-y-6">
                  <div className="space-y-3">
                    <div className="text-4xl">{plan.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-700">{plan.name}</h3>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-gray-700">
                      {plan.price}
                      {plan.price !== "Free" && <span className="text-lg text-gray-500 font-normal">/{plan.period}</span>}
                    </div>
                    {plan.price === "Free" && <div className="text-sm text-gray-500">{plan.period}</div>}
                  </div>
                  
                  <Link
                    to="/codelab"
                    className={`block w-full ${plan.buttonStyle} text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105`}
                  >
                    {plan.price === "Free" ? "Start Free Trial" : "Choose Plan"}
                  </Link>
                  
                  <div className="space-y-3 text-left">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust indicators */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-green-500">🔒</span>
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">👨‍👩‍👧‍👦</span>
                <span>Complete parental control</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">❌</span>
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Family Future */}
      <footer className="relative h-[100vh] flex items-center py-12 bg-gradient-to-br from-green-50/30 via-blue-50/30 to-purple-50/30">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <motion.div
            className="text-center space-y-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-7xl mb-6"
              >
                🛡️
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-gray-700 leading-tight">
                Your Child's Digital
                <span className="block bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-transparent bg-clip-text">
                  Future Starts Here
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Give your child the gift of a healthy first AI relationship. 
                <span className="text-green-600 font-medium"> Guardian grows with them</span>, 
                <span className="text-blue-600 font-medium"> protects them</span>, and 
                <span className="text-purple-600 font-medium"> prepares them</span> for a digital world 
                where they'll always value human connection above all else.
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
            >
              <Link
                to="/codelab"
                className="group bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 hover:from-green-300 hover:via-blue-300 hover:to-purple-300 text-white font-bold text-lg py-4 px-10 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/25 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="text-2xl">🌟</span>
                  Start Free 14-Day Trial
                  <motion.svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              
              <div className="text-sm text-gray-500 font-mono">
                No credit card required • Full access • Cancel anytime
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating family elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['👨‍👩‍👧‍👦', '💝', '🌟', '🛡️', '🌈'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-10"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + (i % 3) * 30}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut"
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
}