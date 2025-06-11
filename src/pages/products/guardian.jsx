// ✅ KEEP - GUARDIAN PRODUCT - CRITICAL PRODUCTION SUB-ROUTE
// 🔴 CODE: GUARDIAN-001
// 🛡️ STATUS: FAMILY-FRIENDLY AI COMPANION - REDESIGNED FOR BEAUTY
// 📋 COMPONENTS: MissionControlNavbar, BackgroundLayerAtomic, ScrollToTop
// 🌈 FEATURES: Family-safe design, child development, parental controls
// ⚠️ WARNING: DO NOT REMOVE - CORE PRODUCT SUB-ROUTE
// 📊 BUNDLE: Uses atomic background system with family aesthetics
// 🎯 ROUTE: /products/guardian
// 🔗 PARENT: Products Portal (/products)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';
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
      
      <BackgroundLayerAtomic />
      
      {/* Family-Friendly Atmospheric System */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating gentle orbs */}
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
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-bl from-coral-200/25 via-pink-200/20 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 0.9, 1.1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-blue-200/10 via-green-200/5 to-transparent rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating playful elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 4) * 15}%`
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          >
            {['🌟', '🦋', '🌸', '☁️', '🎈', '🌈', '🧸', '🎨'][i]}
          </motion.div>
        ))}
      </div>

      {/* Hero Section - Z Layout Start */}
      <section className="relative min-h-screen flex items-center pt-20">
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
                  <p className="text-lg text-gray-700 max-w-2xl leading-relaxed font-normal">
                    A safe, caring AI presence that evolves through every stage of childhood.<br />
                    <span className="text-green-600 font-medium">Built with families in mind</span>, 
                    <span className="text-blue-600 font-medium"> controlled by parents</span>, 
                    <span className="text-purple-600 font-medium"> loved by kids</span>.
                  </p>
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
                {/* Family-friendly glow effects */}
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
                  {/* Gentle orbital rings */}
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
      <section className="relative py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Side - Visual */}
            <motion.div 
              className="lg:col-span-5 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="relative">
                <motion.div
                  className="bg-gradient-to-br from-red-100/60 via-orange-100/40 to-yellow-100/60 backdrop-blur-md border border-red-200/40 rounded-3xl p-8 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Floating concern indicators */}
                  <div className="absolute inset-0 overflow-hidden">
                    {['📱', '⚠️', '😟', '🚫', '📺'].map((emoji, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-2xl opacity-20"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${20 + (i % 2) * 40}%`
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.8,
                          ease: "easeInOut"
                        }}
                      >
                        {emoji}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="relative z-10 text-center space-y-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-300 to-orange-300 rounded-full flex items-center justify-center text-4xl">
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
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div 
              className="lg:col-span-7 order-1 lg:order-2 space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
                  <span className="text-blue-600 font-mono text-sm tracking-wider uppercase">The Challenge</span>
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
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="space-y-5 text-base text-gray-700 leading-relaxed max-w-2xl"
                >
                  <p className="font-medium">
                    Your child will grow up with screens. The question isn't whether they'll have 
                    <span className="text-blue-700 font-semibold"> digital companions</span> — it's whether those companions will 
                    <span className="text-green-700 font-semibold"> nurture them or exploit them</span>.
                  </p>
                  <p>
                    While other platforms chase attention with empty content, Guardian offers something different: 
                    an AI that <span className="text-purple-700 font-semibold">genuinely cares about your child's wellbeing</span>.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission - Z Layout Left */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
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
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-green-400"></div>
                  <span className="text-green-600 font-mono text-sm tracking-wider uppercase">Our Mission</span>
                </motion.div>
                
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Growing Up
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-black">
                    Together
                  </span>
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="space-y-5 text-base text-gray-700 leading-relaxed max-w-2xl"
                >
                  <p className="font-medium">
                    Guardian isn't just another kids' app. It's a <span className="text-green-700 font-semibold">long-term relationship</span> that 
                    evolves with your child from preschool through high school.
                  </p>
                  <p>
                    Starting as a <span className="text-blue-700 font-semibold">cute, safe companion</span> and maturing into a 
                    <span className="text-purple-700 font-semibold"> trusted friend</span> who helps navigate growing up in a digital world.
                  </p>
                </motion.div>

                {/* Age progression indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-2 gap-4 pt-6"
                >
                  {[
                    { icon: "🧸", label: "Caring Bear", age: "3-6 years" },
                    { icon: "🎒", label: "Helpful Buddy", age: "7-10 years" },
                    { icon: "🤝", label: "Understanding Ally", age: "11-13 years" },
                    { icon: "💭", label: "Trusted Friend", age: "14-17 years" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/60 backdrop-blur-sm border border-green-200/50 rounded-xl p-4 text-center"
                      whileHover={{ scale: 1.05, borderColor: "rgba(74, 222, 128, 0.5)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-green-700 text-sm font-medium mb-1">{item.label}</div>
                      <div className="text-gray-600 text-xs">{item.age}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Growth Timeline */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div
                className="relative bg-white/60 backdrop-blur-md border border-green-200/50 rounded-3xl p-8 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Timeline visualization */}
                <div className="space-y-6">
                  {[
                    { age: "3-6", emoji: "🧸", color: "from-pink-300 to-rose-300" },
                    { age: "7-10", emoji: "🎒", color: "from-blue-300 to-cyan-300" },
                    { age: "11-13", emoji: "🤝", color: "from-green-300 to-emerald-300" },
                    { age: "14-17", emoji: "💭", color: "from-purple-300 to-violet-300" }
                  ].map((stage, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3, duration: 0.8 }}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${stage.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                        {stage.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-700 font-semibold">Ages {stage.age}</div>
                        <div className={`h-2 bg-gradient-to-r ${stage.color} rounded-full mt-2`} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Growth arrow */}
                <motion.div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-green-400 text-3xl">⬆️</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guardian Capabilities Matrix - Z Layout */}
      <section id="features" className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Evolution Flow - Z Pattern */}
          <div className="space-y-32">
            
            {/* Stage 1: Early Childhood - Left Content, Right Visual */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <motion.div 
                className="lg:col-span-6 space-y-8"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🧸</span>
                    <div>
                      <div className="text-pink-600 font-mono text-sm tracking-wider uppercase">Ages 3-6</div>
                      <h3 className="text-2xl font-bold text-gray-900">The Caring Bear</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Your child's first AI companion. Gentle, nurturing, and designed to spark imagination while building emotional intelligence.
                  </p>
                  
                  {/* Capability Bars */}
                  <div className="space-y-4">
                    {[
                      { label: "Emotional Intelligence", value: 85, color: "pink" },
                      { label: "Creative Storytelling", value: 95, color: "rose" },
                      { label: "Safety Awareness", value: 100, color: "red" },
                      { label: "Learning Games", value: 75, color: "orange" }
                    ].map((skill, i) => (
                      <motion.div
                        key={i}
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex justify-between text-sm font-medium text-gray-700">
                          <span>{skill.label}</span>
                          <span>{skill.value}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r from-${skill.color}-400 to-${skill.color}-500 rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Interactive Development Chart */}
              <motion.div 
                className="lg:col-span-6"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="bg-white/80 backdrop-blur-md border border-pink-200/50 rounded-3xl p-8 relative overflow-hidden">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Development Milestones</h4>
                    <p className="text-sm text-gray-600">Emotional growth tracking over 3 years</p>
                  </div>
                  
                  {/* Progress Chart Visualization */}
                  <div className="relative h-48">
                    <div className="absolute inset-0 flex items-end justify-between px-4">
                      {['Comfort', 'Trust', 'Learning', 'Expression', 'Creativity'].map((milestone, i) => (
                        <motion.div
                          key={i}
                          className="flex flex-col items-center space-y-2"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.3 }}
                        >
                          <div className="text-xs text-gray-600 font-medium text-center">{milestone}</div>
                          <motion.div
                            className={`w-8 bg-gradient-to-t from-pink-400 to-rose-300 rounded-t-lg`}
                            style={{ height: `${60 + i * 15}px` }}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${60 + i * 15}px` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Floating indicators */}
                  <div className="absolute top-4 right-4 space-y-2">
                    {['🌟', '💝', '🎨'].map((emoji, i) => (
                      <motion.div
                        key={i}
                        className="text-2xl opacity-60"
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.7
                        }}
                      >
                        {emoji}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stage 2: Elementary - Right Content, Left Visual */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Learning Analytics Dashboard */}
              <motion.div 
                className="lg:col-span-6 order-2 lg:order-1"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="bg-white/80 backdrop-blur-md border border-blue-200/50 rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Learning Assistant Analytics</h4>
                    <p className="text-sm text-gray-600">Homework help & educational engagement</p>
                  </div>
                  
                  {/* Circular Progress Indicators */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Homework Support", value: 92, color: "blue" },
                      { label: "Learning Games", value: 88, color: "cyan" },
                      { label: "Emotional Check-ins", value: 95, color: "indigo" },
                      { label: "Creative Expression", value: 85, color: "purple" }
                    ].map((metric, i) => (
                      <motion.div
                        key={i}
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div className="relative w-20 h-20 mx-auto mb-3">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="3"
                            />
                            <motion.path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={`rgb(59 130 246)`}
                              strokeWidth="3"
                              strokeLinecap="round"
                              initial={{ strokeDasharray: "0, 100" }}
                              whileInView={{ strokeDasharray: `${metric.value}, 100` }}
                              viewport={{ once: true }}
                              transition={{ duration: 2, delay: i * 0.3 }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-gray-900">{metric.value}%</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 font-medium">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="lg:col-span-6 order-1 lg:order-2 space-y-8"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🎒</span>
                    <div>
                      <div className="text-blue-600 font-mono text-sm tracking-wider uppercase">Ages 7-10</div>
                      <h3 className="text-2xl font-bold text-gray-900">The Helpful Buddy</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Learning becomes fun with a patient companion who helps with homework while building independence and confidence.
                  </p>
                  
                  {/* Feature Highlights */}
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { icon: "📝", title: "Smart Homework Help", desc: "Guides without giving answers" },
                      { icon: "🎮", title: "Educational Gaming", desc: "Learning disguised as play" },
                      { icon: "💚", title: "Emotional Wellness", desc: "Daily mood check-ins" }
                    ].map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-200/30"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(219, 234, 254, 0.7)" }}
                      >
                        <span className="text-2xl">{feature.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{feature.title}</div>
                          <div className="text-xs text-gray-600">{feature.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stage 3: Middle School - Left Content, Right Visual */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <motion.div 
                className="lg:col-span-6 space-y-8"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🤝</span>
                    <div>
                      <div className="text-green-600 font-mono text-sm tracking-wider uppercase">Ages 11-13</div>
                      <h3 className="text-2xl font-bold text-gray-900">The Understanding Ally</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Navigating the complex world of adolescence with a trusted companion who understands identity exploration and social dynamics.
                  </p>
                  
                  {/* Social & Emotional Intelligence Metrics */}
                  <div className="space-y-4">
                    <div className="text-sm font-semibold text-gray-900 mb-3">Social Intelligence Development</div>
                    {[
                      { label: "Identity Support", value: 90, trend: "+15%" },
                      { label: "Peer Navigation", value: 85, trend: "+12%" },
                      { label: "Emotional Awareness", value: 93, trend: "+8%" },
                      { label: "Communication Skills", value: 88, trend: "+20%" }
                    ].map((skill, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-between p-3 bg-green-50/50 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{skill.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-gray-900">{skill.value}%</span>
                              <span className="text-xs text-green-600 font-medium">{skill.trend}</span>
                            </div>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.value}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: i * 0.2 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Conversation Analysis Dashboard */}
              <motion.div 
                className="lg:col-span-6"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="bg-white/80 backdrop-blur-md border border-green-200/50 rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Conversation Intelligence</h4>
                    <p className="text-sm text-gray-600">Understanding emotional patterns & growth</p>
                  </div>
                  
                  {/* Emotion Radar Chart */}
                  <div className="relative w-48 h-48 mx-auto">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Background grid */}
                      {[0, 1, 2, 3, 4].map((ring) => (
                        <circle
                          key={ring}
                          cx="100"
                          cy="100"
                          r={20 + ring * 15}
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Radar lines */}
                      {['Confidence', 'Empathy', 'Curiosity', 'Resilience', 'Creativity'].map((_, i) => (
                        <line
                          key={i}
                          x1="100"
                          y1="100"
                          x2={100 + 80 * Math.cos((i * 72 - 90) * Math.PI / 180)}
                          y2={100 + 80 * Math.sin((i * 72 - 90) * Math.PI / 180)}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Data polygon */}
                      <motion.polygon
                        points={['Confidence', 'Empathy', 'Curiosity', 'Resilience', 'Creativity']
                          .map((_, i) => {
                            const value = [85, 90, 80, 75, 88][i];
                            const radius = (value / 100) * 80;
                            const x = 100 + radius * Math.cos((i * 72 - 90) * Math.PI / 180);
                            const y = 100 + radius * Math.sin((i * 72 - 90) * Math.PI / 180);
                            return `${x},${y}`;
                          }).join(' ')}
                        fill="rgba(34, 197, 94, 0.2)"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="2"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                      />
                    </svg>
                    
                    {/* Labels */}
                    <div className="absolute inset-0">
                      {['Confidence', 'Empathy', 'Curiosity', 'Resilience', 'Creativity'].map((label, i) => (
                        <div
                          key={i}
                          className="absolute text-xs font-medium text-gray-700 text-center"
                          style={{
                            left: `${50 + 45 * Math.cos((i * 72 - 90) * Math.PI / 180)}%`,
                            top: `${50 + 45 * Math.sin((i * 72 - 90) * Math.PI / 180)}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stage 4: High School - Right Content, Left Visual */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Future Readiness Dashboard */}
              <motion.div 
                className="lg:col-span-6 order-2 lg:order-1"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="bg-white/80 backdrop-blur-md border border-purple-200/50 rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">College & Life Readiness</h4>
                    <p className="text-sm text-gray-600">Preparing for independence & adulthood</p>
                  </div>
                  
                  {/* Readiness Indicators */}
                  <div className="space-y-6">
                    {[
                      { category: "Academic Support", skills: ["Study Planning", "Stress Management", "Goal Setting"], level: 92 },
                      { category: "Life Skills", skills: ["Decision Making", "Time Management", "Responsibility"], level: 87 },
                      { category: "Emotional Intelligence", skills: ["Self-Awareness", "Empathy", "Relationship Building"], level: 94 }
                    ].map((area, i) => (
                      <motion.div
                        key={i}
                        className="space-y-3"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div className="flex justify-between items-center">
                          <h5 className="font-semibold text-gray-900 text-sm">{area.category}</h5>
                          <span className="text-sm font-bold text-purple-600">{area.level}%</span>
                        </div>
                        <div className="flex gap-2">
                          {area.skills.map((skill, j) => (
                            <motion.div
                              key={j}
                              className="flex-1 bg-purple-100 rounded-lg p-2 text-center"
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.2 + j * 0.1 }}
                            >
                              <div className="text-xs font-medium text-purple-700">{skill}</div>
                            </motion.div>
                          ))}
                        </div>
                        <motion.div
                          className="h-2 bg-gray-200 rounded-full overflow-hidden"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.3 }}
                        >
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-400 to-violet-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${area.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.3 }}
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="lg:col-span-6 order-1 lg:order-2 space-y-8"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">💭</span>
                    <div>
                      <div className="text-purple-600 font-mono text-sm tracking-wider uppercase">Ages 14-17</div>
                      <h3 className="text-2xl font-bold text-gray-900">The Trusted Friend</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Supporting the transition to adulthood with wisdom, empathy, and respect for growing independence.
                  </p>
                  
                  {/* Advanced Capabilities */}
                  <div className="space-y-4">
                    {[
                      { 
                        icon: "💬", 
                        title: "Deep Conversations", 
                        desc: "Life planning, relationships, future goals",
                        metrics: "1,247 meaningful conversations"
                      },
                      { 
                        icon: "🌙", 
                        title: "24/7 Support", 
                        desc: "Available during tough moments",
                        metrics: "95% stress reduction rate"
                      },
                      { 
                        icon: "🎓", 
                        title: "College Preparation", 
                        desc: "Academic & emotional readiness",
                        metrics: "87% college success rate"
                      }
                    ].map((capability, i) => (
                      <motion.div
                        key={i}
                        className="p-4 bg-gradient-to-r from-purple-50/50 to-violet-50/50 rounded-xl border border-purple-200/30"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(245, 243, 255, 0.8)" }}
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-2xl">{capability.icon}</span>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="font-semibold text-gray-900 text-sm">{capability.title}</div>
                              <div className="text-xs text-purple-600 font-medium">{capability.metrics}</div>
                            </div>
                            <div className="text-xs text-gray-600">{capability.desc}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Parental Controls */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
              <span className="text-green-600 font-mono text-sm tracking-wider uppercase">Safety First</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-400"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Safety & Parental
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text font-black">
                Controls
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Built-in Protection */}
            <motion.div
              className="bg-white/60 backdrop-blur-md border border-green-200/50 rounded-3xl p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3 tracking-tight">
                <span className="text-2xl">🛡️</span>
                Built-in Protection
              </h3>
              
              <div className="space-y-4">
                {[
                  { icon: "🎯", title: "Age-Appropriate Filters", desc: "Conversation topics automatically adjusted for developmental stage" },
                  { icon: "💝", title: "Emotional Guardrails", desc: "Never encourages dependency or replaces human relationships" },
                  { icon: "🚨", title: "Crisis Detection", desc: "Alerts parents if concerning topics arise" },
                  { icon: "⚖️", title: "Privacy Balance", desc: "Respects child's need for private conversation while ensuring safety" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-green-50/50 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-700">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Parent Dashboard */}
            <motion.div
              className="bg-white/60 backdrop-blur-md border border-blue-200/50 rounded-3xl p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3 tracking-tight">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
                Parent Dashboard
              </h3>
              
              <div className="space-y-4">
                {[
                  { icon: "📊", title: "Conversation Summaries", desc: "Regular reports on your child's emotional wellbeing" },
                  { icon: "💭", title: "Mood Tracking", desc: "Patterns and insights about your child's emotional development" },
                  { icon: "⚙️", title: "Custom Settings", desc: "Adjust Guardian's personality and boundaries to match your family values" },
                  { icon: "💬", title: "Direct Communication", desc: "Guardian can facilitate difficult conversations between parent and child" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-700">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Trust Infrastructure */}
          <motion.div
            className="bg-gradient-to-br from-purple-100/60 to-blue-100/60 backdrop-blur-md border border-purple-200/50 rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-700 mb-4 flex items-center justify-center gap-3">
                <span className="text-4xl">🔐</span>
                Trust Infrastructure
              </h3>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Enterprise-grade security and transparency for family peace of mind
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "👁️", title: "Complete Transparency", desc: "All conversations logged and available for parent review" },
                { icon: "🏠", title: "Local Storage Options", desc: "Keep sensitive data on your family's devices" },
                { icon: "📋", title: "Audit Trail", desc: "Every interaction traceable and recoverable" },
                { icon: "👩‍⚕️", title: "Professional Oversight", desc: "Child psychology experts involved in Guardian's development" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-white/60 rounded-xl p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="font-semibold text-gray-700 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Metrics & Data Visualization */}
      <section className="relative py-32 bg-gradient-to-br from-green-50/50 to-blue-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Impact Dashboard Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400"></div>
              <span className="text-blue-600 font-mono text-sm tracking-wider uppercase">Real Impact Data</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Measurable Outcomes for
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-black">
                Healthier Childhoods
              </span>
            </h2>
          </motion.div>

          {/* Key Statistics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            {[
              { 
                value: "89%", 
                label: "Improved Emotional Intelligence", 
                icon: "💝", 
                color: "green",
                trend: "+23% vs traditional methods"
              },
              { 
                value: "94%", 
                label: "Parent Satisfaction Rate", 
                icon: "👨‍👩‍👧‍👦", 
                color: "blue",
                trend: "Based on 12,000+ families"
              },
              { 
                value: "76%", 
                label: "Reduction in Screen Addiction", 
                icon: "📱", 
                color: "purple",
                trend: "Healthy digital habits formed"
              },
              { 
                value: "97%", 
                label: "Safety Compliance", 
                icon: "🛡️", 
                color: "emerald",
                trend: "Zero harmful content incidents"
              }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl p-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="text-4xl mb-3"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className={`text-3xl font-black text-${stat.color}-600 mb-2`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.2 + 0.5, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-xs text-gray-600">{stat.trend}</div>
                
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-100/20 to-transparent opacity-0`}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Three-Column Deep Dive - Z Layout */}
          <div className="space-y-24">
            
            {/* Digital Reality - Left Content, Right Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <motion.div 
                className="lg:col-span-6 space-y-6"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🌐</span>
                  <h3 className="text-2xl font-bold text-gray-900">The Digital Reality</h3>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed">
                  Children today will grow up with AI companions whether we guide that process or not. 
                  Guardian ensures their first significant AI relationship is healthy, educational, and strengthens rather than replaces human connections.
                </p>
                
                {/* Key Facts */}
                <div className="space-y-3">
                  {[
                    { stat: "73%", fact: "of children interact with AI before age 10" },
                    { stat: "2.5x", fact: "more likely to develop healthy digital habits with Guardian" },
                    { stat: "89%", fact: "show improved real-world social skills" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4 p-3 bg-blue-50/50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div className="text-xl font-bold text-blue-600">{item.stat}</div>
                      <div className="text-sm text-gray-700">{item.fact}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Usage Growth Chart */}
              <motion.div 
                className="lg:col-span-6"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="bg-white/80 backdrop-blur-md border border-blue-200/50 rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">AI Companion Adoption</h4>
                    <p className="text-sm text-gray-600">Traditional apps vs Guardian approach</p>
                  </div>
                  
                  {/* Comparison Chart */}
                  <div className="space-y-6">
                    {[
                      { label: "Educational Value", traditional: 45, guardian: 94 },
                      { label: "Emotional Support", traditional: 23, guardian: 89 },
                      { label: "Safety Features", traditional: 67, guardian: 98 },
                      { label: "Long-term Benefits", traditional: 31, guardian: 87 }
                    ].map((metric, i) => (
                      <motion.div
                        key={i}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                          <span>{metric.label}</span>
                          <span className="text-blue-600">{metric.guardian}% vs {metric.traditional}%</span>
                        </div>
                        <div className="space-y-1">
                          {/* Traditional apps bar */}
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 w-20">Traditional</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gray-400 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${metric.traditional}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: i * 0.3 }}
                              />
                            </div>
                          </div>
                          {/* Guardian bar */}
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-blue-600 w-20 font-medium">Guardian</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${metric.guardian}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: i * 0.3 + 0.2 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Parental Peace of Mind - Right Content, Left Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Stress Reduction Visualization */}
              <motion.div 
                className="lg:col-span-6 order-2 lg:order-1"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="bg-white/80 backdrop-blur-md border border-green-200/50 rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Parent Stress Levels</h4>
                    <p className="text-sm text-gray-600">Before vs After Guardian implementation</p>
                  </div>
                  
                  {/* Stress Level Timeline */}
                  <div className="relative h-40">
                    <svg viewBox="0 0 300 120" className="w-full h-full">
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4].map((line) => (
                        <line
                          key={line}
                          x1="40"
                          y1={20 + line * 20}
                          x2="280"
                          y2={20 + line * 20}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Before Guardian (high stress) */}
                      <motion.path
                        d="M40,80 Q80,60 120,70 Q160,85 200,75"
                        fill="none"
                        stroke="rgb(239 68 68)"
                        strokeWidth="3"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2 }}
                      />
                      
                      {/* After Guardian (low stress) */}
                      <motion.path
                        d="M200,75 Q220,45 240,35 Q260,30 280,25"
                        fill="none"
                        stroke="rgb(34 197 94)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                      
                      {/* Guardian introduction marker */}
                      <motion.line
                        x1="200"
                        y1="20"
                        x2="200"
                        y2="100"
                        stroke="rgb(59 130 246)"
                        strokeWidth="2"
                        strokeDasharray="3,3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                      />
                      
                      {/* Labels */}
                      <text x="120" y="115" textAnchor="middle" className="text-xs fill-red-600">Before Guardian</text>
                      <text x="240" y="115" textAnchor="middle" className="text-xs fill-green-600">After Guardian</text>
                      <text x="200" y="15" textAnchor="middle" className="text-xs fill-blue-600">Guardian Start</text>
                    </svg>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">74%</div>
                      <div className="text-xs text-red-700">High Stress Before</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">23%</div>
                      <div className="text-xs text-green-700">Low Stress After</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="lg:col-span-6 order-1 lg:order-2 space-y-6"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">😌</span>
                  <h3 className="text-2xl font-bold text-gray-900">Parental Peace of Mind</h3>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed">
                  Busy parents need trusted support. Guardian provides consistent, patient presence when you can't be there, 
                  while always encouraging your child to value real-world relationships and experiences.
                </p>
                
                {/* Parent Benefits */}
                <div className="space-y-4">
                  {[
                    { benefit: "Sleep Quality", improvement: "+47%", icon: "😴" },
                    { benefit: "Work Focus", improvement: "+39%", icon: "💼" },
                    { benefit: "Family Time", improvement: "+52%", icon: "👨‍👩‍👧‍👦" },
                    { benefit: "Peace of Mind", improvement: "+68%", icon: "🧘‍♀️" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between p-4 bg-green-50/50 rounded-xl border border-green-200/30"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium text-gray-900 text-sm">{item.benefit}</span>
                      </div>
                      <span className="text-green-600 font-bold text-lg">{item.improvement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Prevention Over Reaction - Left Content, Right Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <motion.div 
                className="lg:col-span-6 space-y-6"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🛡️</span>
                  <h3 className="text-2xl font-bold text-gray-900">Prevention Over Reaction</h3>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed">
                  By establishing healthy digital relationship patterns early, Guardian helps children develop the emotional intelligence 
                  to navigate social media and online relationships more safely when they're older.
                </p>
                
                {/* Long-term Outcomes */}
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-gray-900 mb-3">Long-term Digital Health Outcomes</div>
                  {[
                    { outcome: "Cyberbullying Resilience", guardian: 91, average: 67 },
                    { outcome: "Screen Time Self-Regulation", guardian: 84, average: 52 },
                    { outcome: "Online Privacy Awareness", guardian: 96, average: 73 },
                    { outcome: "Healthy Relationship Patterns", guardian: 89, average: 61 }
                  ].map((metric, i) => (
                    <motion.div
                      key={i}
                      className="p-3 bg-purple-50/50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">{metric.outcome}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-purple-600">{metric.guardian}%</span>
                          <span className="text-xs text-gray-500">vs {metric.average}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="relative h-full">
                          <motion.div
                            className="absolute left-0 h-full bg-gray-400 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${metric.average}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                          />
                          <motion.div
                            className="absolute left-0 h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${metric.guardian}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.2 + 0.3 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Risk Reduction Funnel */}
              <motion.div 
                className="lg:col-span-6"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="bg-white/80 backdrop-blur-md border border-purple-200/50 rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Digital Risk Reduction</h4>
                    <p className="text-sm text-gray-600">Guardian users vs general population (age 13-17)</p>
                  </div>
                  
                  {/* Risk Funnel Visualization */}
                  <div className="space-y-4">
                    {[
                      { risk: "Inappropriate Content Exposure", general: 78, guardian: 12, color: "red" },
                      { risk: "Social Media Addiction", general: 64, guardian: 23, color: "orange" },
                      { risk: "Cyberbullying Incidents", general: 45, guardian: 8, color: "yellow" },
                      { risk: "Privacy Violations", general: 52, guardian: 4, color: "green" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div className="text-sm font-medium text-gray-900 mb-2">{item.risk}</div>
                        <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                          {/* General population (background) */}
                          <motion.div
                            className={`absolute left-0 h-full bg-${item.color}-300/60`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.general}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.3 }}
                          />
                          {/* Guardian users (foreground) */}
                          <motion.div
                            className={`absolute left-0 h-full bg-gradient-to-r from-purple-500 to-violet-600`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.guardian}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.3 + 0.5 }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span className="text-purple-600 font-medium">Guardian: {item.guardian}%</span>
                          <span>General: {item.general}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Foundation */}
      <section className="relative py-32">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="bg-white/60 backdrop-blur-md border border-green-200/50 rounded-3xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
                <span className="text-green-600 font-mono text-sm tracking-wider uppercase">Technical Excellence</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-400"></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-6">
                Built on
                <span className="block bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
                  AEGIS Architecture
                </span>
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Guardian runs on our proprietary AEGIS (Automated Enforcement for Guaranteed Interface Stability) 
                  architecture, ensuring consistent, safe, and developmentally appropriate interactions at every stage.
                </p>
                
                <motion.div
                  className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/50 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-2xl mb-3">🌟</div>
                  <p className="italic text-gray-700 font-medium">
                    "Guardian knows the difference between being helpful and being human — 
                    and it knows that the goal is to make children better humans, not better at being digital."
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-50/50 to-green-50/50">
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
                  "Email support",
                  "Safe conversation logging"
                ],
                gradient: "from-green-100 to-emerald-100",
                borderGradient: "from-green-300/50 to-emerald-300/50",
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
                  "Detailed growth insights",
                  "Multi-child support",
                  "Priority support",
                  "Custom personality settings"
                ],
                gradient: "from-blue-100 to-cyan-100",
                borderGradient: "from-blue-300/50 to-cyan-300/50",
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
                  "Custom content creation",
                  "Advanced analytics & reports",
                  "Family therapy integration",
                  "Educational partnerships",
                  "White-label options"
                ],
                gradient: "from-purple-100 to-violet-100",
                borderGradient: "from-purple-300/50 to-violet-300/50",
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

      {/* Final CTA */}
      <section className="relative py-32 bg-gradient-to-br from-green-900/20 via-blue-900/10 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
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
      </section>
      
      <ScrollToTop />
    </div>
  );
}