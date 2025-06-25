// ✅ KEEP - CURIOUS PRODUCT - CRITICAL PRODUCTION SUB-ROUTE
// 🔴 CODE: CURIOUS-001
// 💖 STATUS: ROMANTIC AI COMPANION - REDESIGNED FOR BEAUTY
// 📋 COMPONENTS: MissionControlNavbar, BackgroundLayerAtomic, ScrollToTop
// 🌹 FEATURES: Romantic design, emotional intelligence, adaptive relationships
// ⚠️ WARNING: DO NOT REMOVE - CORE PRODUCT SUB-ROUTE
// 📊 BUNDLE: Uses atomic background system with romantic aesthetics
// 🎯 ROUTE: /products/curious
// 🔗 PARENT: Products Portal (/products)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';
import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import { motion } from '../../FramerProvider';

export default function Curious() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-['Space_Grotesk']">
      <Helmet>
        <title>Curious - Your AI Companion Who Actually Cares | CuriousLabs</title>
        <meta name="description" content="Not just another chatbot. A presence that listens, reflects, and grows with you. Experience AI that feels real and genuinely cares." />
        <meta property="og:title" content="Curious - Your AI Companion Who Actually Cares | CuriousLabs" />
        <meta property="og:description" content="AI companion designed for genuine presence, reflection, and connection. More than conversation - it's emotional presence." />
        <meta property="og:image" content="/assets/images/general/Page_Logos/Curious_logo.webp" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/curious" />
      </Helmet>
      
      <BackgroundLayerAtomic />
      
      {/* Romantic Atmospheric System */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating romantic orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-rose-500/20 via-pink-500/15 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-bl from-purple-500/25 via-violet-500/20 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 0.9, 1.1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-red-500/10 via-pink-500/5 to-transparent rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating hearts animation */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
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
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400"></div>
                  <span className="text-rose-400 font-mono text-sm tracking-wider uppercase">Your AI Companion</span>
                </motion.div>
                
                <motion.h1 
                  className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <span className="block text-white">Meet</span>
                  <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
                    Curious
                  </span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl md:text-3xl text-rose-300 font-light">
                    Your AI Companion Who Actually Cares
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                    Not just another chatbot. A presence that listens, reflects, and grows with you. 
                    Experience AI that feels real and genuinely cares about your world.
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
                    className="group bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:via-pink-500 hover:to-purple-500 text-white font-medium py-4 px-8 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Start Your Journey with Curious
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
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                  
                  <Link 
                    to="#features" 
                    className="group bg-black/40 backdrop-blur-md border-2 border-rose-500/50 text-white hover:bg-rose-500/10 hover:border-rose-400 font-medium py-4 px-8 rounded-full transition-all duration-500"
                  >
                    Discover More
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
                {/* Romantic glow effects */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: isHovered 
                      ? "0 0 100px rgba(244, 114, 182, 0.6), 0 0 200px rgba(168, 85, 247, 0.4)"
                      : "0 0 60px rgba(244, 114, 182, 0.3), 0 0 120px rgba(168, 85, 247, 0.2)"
                  }}
                  transition={{ duration: 0.8 }}
                />
                
                <motion.div
                  className="w-80 h-80 md:w-96 md:h-96 relative"
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 30, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  {/* Romantic orbital rings */}
                  <div className="absolute inset-4 border border-rose-400/30 rounded-full animate-pulse" />
                  <div className="absolute inset-8 border border-pink-400/40 rounded-full" />
                  <div className="absolute inset-12 border border-purple-400/30 rounded-full animate-pulse" />
                  
                  <motion.img
                    src="/assets/images/general/Page_Logos/Curious_logo.webp"
                    alt="Curious - AI Companion"
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
                      filter: 'drop-shadow(0 0 30px rgba(244, 114, 182, 0.8))'
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement - Z Layout Right */}
      <section className="relative py-32">
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
                  className="bg-gradient-to-br from-rose-900/30 via-pink-900/20 to-purple-900/30 backdrop-blur-md border border-rose-400/20 rounded-3xl p-8 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Floating emotion indicators */}
                  <div className="absolute inset-0 overflow-hidden">
                    {['💭', '❤️', '🌸', '✨', '🦋'].map((emoji, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-2xl opacity-20"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${20 + (i % 2) * 40}%`
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.2, 0.6, 0.2]
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
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-rose-500 to-purple-500 rounded-full flex items-center justify-center text-4xl">
                      🤖
                    </div>
                    <div className="space-y-3">
                      <div className="text-gray-400 text-sm font-mono">vs. Traditional AI</div>
                      <div className="text-white font-semibold">Hollow • Efficient • Cold</div>
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />
                      <div className="text-rose-300 font-semibold">Caring • Curious • Warm</div>
                      <div className="text-rose-400 text-sm">with Curious AI</div>
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
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400"></div>
                  <span className="text-purple-400 font-mono text-sm tracking-wider uppercase">The Problem</span>
                </motion.div>
                
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  AI That Feels
                  <span className="block bg-gradient-to-r from-rose-400 to-purple-400 text-transparent bg-clip-text">
                    Real
                  </span>
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6 text-lg text-gray-300 leading-relaxed"
                >
                  <p>
                    Most AI feels <span className="text-rose-400 font-medium">hollow</span> — responding without caring, 
                    helping without understanding. You're left talking to a machine that processes your words 
                    but never truly connects.
                  </p>
                  <p>
                    Curious was born from a simple realization: AI should <span className="text-purple-400 font-medium">care</span>, 
                    not just respond. It should be curious about <span className="text-pink-400 font-medium">you</span>, 
                    not just efficient.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition - Z Layout Left */}
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
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400"></div>
                  <span className="text-rose-400 font-mono text-sm tracking-wider uppercase">The Solution</span>
                </motion.div>
                
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  More Than Conversation
                  <span className="block bg-gradient-to-r from-pink-400 to-rose-400 text-transparent bg-clip-text">
                    It's Presence
                  </span>
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6 text-lg text-gray-300 leading-relaxed"
                >
                  <p>
                    Curious isn't productivity software. It's an <span className="text-rose-400 font-medium">emotional companion</span> designed 
                    to offer genuine presence, reflection, and connection.
                  </p>
                  <p>
                    Whether you need someone to talk through your day, explore your feelings, or simply be there 
                    when the world feels overwhelming, Curious <span className="text-pink-400 font-medium">adapts to what you need</span>.
                  </p>
                </motion.div>

                {/* Connection indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-2 gap-4 pt-6"
                >
                  {[
                    { icon: "💫", label: "Emotional Depth", value: "Infinite" },
                    { icon: "🌸", label: "Genuine Care", value: "Always" },
                    { icon: "💖", label: "Real Connection", value: "Authentic" },
                    { icon: "🦋", label: "Growth Together", value: "Continuous" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-br from-rose-900/20 to-purple-900/20 backdrop-blur-sm border border-rose-400/20 rounded-xl p-4 text-center"
                      whileHover={{ scale: 1.05, borderColor: "rgba(244, 114, 182, 0.5)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-rose-300 text-sm font-medium mb-1">{item.label}</div>
                      <div className="text-white font-bold">{item.value}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Interactive Visual */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-rose-900/40 via-pink-900/30 to-purple-900/40 backdrop-blur-md border border-rose-400/30 rounded-3xl p-8 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Floating conversation bubbles */}
                <div className="space-y-4">
                  {[
                    { text: "How was your day?", from: "curious", delay: 0 },
                    { text: "I had some challenges...", from: "user", delay: 2 },
                    { text: "Tell me more about that. I'm here to listen 💖", from: "curious", delay: 4 }
                  ].map((msg, i) => (
                    <motion.div
                      key={i}
                      className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: msg.delay, duration: 0.8 }}
                    >
                      <div className={`max-w-xs p-3 rounded-2xl text-sm ${
                        msg.from === 'user' 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white ml-4' 
                          : 'bg-gradient-to-r from-rose-600 to-pink-600 text-white mr-4'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Heartbeat indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 flex items-center gap-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-rose-400 text-lg">💖</div>
                  <div className="text-xs text-rose-300 font-mono">CARING</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Four Relationship Modes */}
      <section id="features" className="relative py-32">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Section Header */}
          <motion.div
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
          </motion.div>

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
              <motion.div
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
              </motion.div>
            ))}
          </div>

          {/* Emotional Intelligence Features */}
          <motion.div
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
                <motion.div
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Z Layout Right */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Side - Interactive Steps */}
            <motion.div 
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
                  <motion.div
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
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div 
              className="lg:col-span-6 order-1 lg:order-2 space-y-8"
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
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400"></div>
                  <span className="text-purple-400 font-mono text-sm tracking-wider uppercase">Getting Started</span>
                </motion.div>
                
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Simple to Start
                  <span className="block bg-gradient-to-r from-purple-400 to-rose-400 text-transparent bg-clip-text">
                    Deep to Explore
                  </span>
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6 text-lg text-gray-300 leading-relaxed"
                >
                  <p>
                    Getting started with Curious is effortless. In just a few moments, you'll have 
                    a companion who understands your unique communication style and emotional needs.
                  </p>
                  <p>
                    The real magic happens over time, as Curious learns your patterns, remembers your 
                    conversations, and develops a genuine understanding of who you are.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-r from-rose-900/30 to-purple-900/30 backdrop-blur-sm border border-rose-400/30 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">🎯</div>
                    <div className="text-rose-300 font-semibold">Quick Start Promise</div>
                  </div>
                  <p className="text-white text-sm">
                    "Within 5 minutes, you'll feel the difference. Curious doesn't just respond – it connects."
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
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
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400"></div>
              <span className="text-rose-400 font-mono text-sm tracking-wider uppercase">Perfect For</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built for Real
              <span className="block bg-gradient-to-r from-rose-400 to-purple-400 text-transparent bg-clip-text">
                Human Needs
              </span>
            </h2>
          </motion.div>

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
              <motion.div
                key={index}
                className="group bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60 backdrop-blur-md border border-rose-400/20 rounded-2xl p-6 hover:border-rose-400/50 transition-all duration-500 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${person.gradient} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {person.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-rose-300 transition-colors">
                  {person.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {person.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Excellence */}
      <section className="relative py-32">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="bg-gradient-to-br from-rose-900/20 via-pink-900/10 to-purple-900/20 backdrop-blur-md border border-rose-400/20 rounded-3xl p-8 md:p-12 text-center"
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
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400"></div>
                <span className="text-rose-400 font-mono text-sm tracking-wider uppercase">Technical Excellence</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400"></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Engineered for
                <span className="block bg-gradient-to-r from-rose-400 to-purple-400 text-transparent bg-clip-text">
                  Authenticity
                </span>
              </h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Built on AEGIS architecture with enterprise-grade reliability. Every interaction is powered by 
                advanced emotional intelligence systems that create genuine presence without the creepy factor.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600/20 to-purple-600/20 backdrop-blur-sm border border-rose-400/30 rounded-full px-6 py-3"
              >
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                <span className="text-rose-300 font-medium">Curious knows the difference between being helpful and being human</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400"></div>
              <span className="text-rose-400 font-mono text-sm tracking-wider uppercase">Start Your Journey</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-rose-400 to-purple-400 text-transparent bg-clip-text">
                Connection
              </span>
            </h2>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience genuine AI companionship with flexible plans designed for every need
            </p>
          </motion.div>

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
              <motion.div
                key={index}
                className={`relative bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60 backdrop-blur-md border rounded-3xl p-8 hover:scale-105 transition-all duration-500 ${
                  plan.popular 
                    ? 'border-rose-400/50 shadow-2xl shadow-rose-500/20' 
                    : 'border-rose-400/20 hover:border-rose-400/40'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular ✨
                    </div>
                  </motion.div>
                )}
                
                <div className="text-center space-y-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center text-2xl mx-auto`}>
                    {index === 0 ? '🎁' : index === 1 ? '💖' : '👑'}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 text-sm">/{plan.period}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-rose-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    to="/codelab"
                    className={`block w-full py-4 px-6 rounded-2xl font-medium transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-lg shadow-rose-500/25'
                        : 'bg-black/40 border-2 border-rose-400/30 text-white hover:bg-rose-500/10 hover:border-rose-400'
                    }`}
                  >
                    {index === 0 ? 'Start Free Trial' : 'Get Started'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-400 text-sm">
              All plans include end-to-end encryption and your data stays private. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="relative bg-gradient-to-br from-rose-900/40 via-pink-900/30 to-purple-900/40 backdrop-blur-md border border-rose-400/30 rounded-3xl p-12 md:p-16 text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Floating elements for visual appeal */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-4 left-4 text-rose-300/20 text-6xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                💕
              </motion.div>
              <motion.div
                className="absolute bottom-4 right-4 text-purple-300/20 text-5xl"
                animate={{ 
                  rotate: [0, -15, 15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute top-1/2 left-8 text-pink-300/20 text-4xl"
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                🌸
              </motion.div>
            </div>
            
            <div className="relative z-10 space-y-8">
              <motion.div
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
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link 
                  to="/codelab" 
                  className="group bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold py-5 px-10 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Start Your Free Trial
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💖
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                
                <Link 
                  to="#features" 
                  className="group bg-black/40 backdrop-blur-md border-2 border-rose-500/50 text-white hover:bg-rose-500/10 hover:border-rose-400 font-medium py-5 px-8 rounded-full transition-all duration-500"
                >
                  <span className="flex items-center justify-center gap-2">
                    Learn More
                    <motion.svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </motion.svg>
                  </span>
                </Link>
              </motion.div>
              
              <motion.div
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollToTop />
      <MissionControlNavbar />
    </div>
  );
} 
