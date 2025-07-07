import { motion } from '../FramerProvider';

/**
 * ✅ KEEP - CODELAB-001
 * 
 * CRITICAL PRODUCTION COMPONENT
 * Usage: /codelab route - Engineering Bay page
 * Features: Developer tools showcase, LEGIT compliance, service grid
 * Dependencies: CodelabFloatflowLayout, MissionControlNavbar, FooterExperience
 * Bundle: Core codelab page
 * Type: Page Component
 * 
 * ⚠️ DO NOT REMOVE - MAIN CODELAB PAGE
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { services } from '../../data/services';
import useReveal from '../hooks/useReveal.js';

// ✅ KEEP - SHARED PRODUCTION COMPONENTS
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import FooterExperience from '../components/home/v4/FooterExperience';
import ScrollToTop from '../components/ScrollToTop';
import BackgroundLayerAtomic from '../components/atomic/BackgroundLayerAtomic';
import Testimonials from '../components/Testimonials';
import ServiceModal from '../components/ServiceModal';

// ✅ KEEP - CODELAB LAYOUT SYSTEM
import CodelabFloatflowLayout from '../layouts/CodelabFloatflowLayout.jsx';

// ✅ KEEP - CODELAB ATOMIC COMPONENTS
import HeroSection from '../components/codelab/HeroSection';
import FeaturesSection from '../components/codelab/FeaturesSection';
import ProcessSection from '../components/codelab/ProcessSection';
import CTASection from '../components/codelab/CTASection';
import LegitSection from '../components/codelab/LegitSection';
import MetricsLogsSection from '../components/codelab/MetricsLogsSection';

// 🚀 COSMIC MISSION CONTROL - Smart logging system (moved outside component)
const createMissionLog = (() => {
  let initialized = false;
  let lastRenderCount = 0;
  const renderThreshold = 5; // Alert after 5+ rapid renders
  
  return {
    initiate: () => {
      if (!initialized) {
        console.log('🚀 [MISSION CONTROL] Engineering Bay initializing...');
        console.log('🛰️ [COSMIC-NET] Establishing quantum link to developer arsenal');
        console.log('⚡ [POWER-CORE] All systems nominal - Welcome, Commander');
        initialized = true;
      }
    },
    renderAlert: () => {
      lastRenderCount++;
      if (lastRenderCount === renderThreshold) {
        console.warn('⚠️ [MISSION CONTROL] Excessive render cycles detected - Check for infinite loops, Commander');
        console.log('🔧 [AUTO-REPAIR] Temporal stabilizers engaged');
      }
    },
    serviceDeployment: (services) => {
      if (!initialized) return;
      console.log(`🎯 [DEPLOYMENT] ${services.length} engineering modules loaded and ready for deployment`);
      console.log('🌌 [COSMIC-GRID] All service coordinates locked and verified');
    }
  };
})();

// ✅ KEEP - CODELAB COMPONENT
export default function CodeLab() {
  // Initialize mission only once
  createMissionLog.initiate();
  createMissionLog.renderAlert();
  
  // 🎮 COSMIC DEVELOPER CONSOLE EASTER EGG
  useEffect(() => {
    // Add a special developer command to the global scope
    if (typeof window !== 'undefined' && !window.cosmicProtocol) {
      window.cosmicProtocol = {
        activate: () => {
          console.log('🌌 [COSMIC PROTOCOL ACTIVATED]');
          console.log('🚀 Welcome to the hidden developer dimension, Commander!');
          console.log('⚡ Your coding powers have been enhanced beyond mortal limits');
          console.log('🎯 Available cosmic commands:');
          console.log('   • cosmicProtocol.boost() - Temporary productivity surge');
          console.log('   • cosmicProtocol.status() - Check cosmic developer status');
          console.log('   • cosmicProtocol.wisdom() - Receive cosmic coding wisdom');
          console.log('💫 May the code be with you, always.');
        },
        boost: () => {
          console.log('⚡ [COSMIC BOOST] Developer efficiency increased to 200%!');
          console.log('🔥 All bugs will fear your presence for the next 30 minutes');
        },
        status: () => {
          console.log('🛰️ [COSMIC STATUS] Developer Level: Legendary');
          console.log('🌟 Mission Completion Rate: 99.97%');
          console.log('🚀 Code Quality Index: Transcendent');
        },
        wisdom: () => {
          const wisdoms = [
            '🔮 "The best code is written not just for machines, but for future developers"',
            '⚡ "Debug with patience, for every bug teaches cosmic lessons"',
            '🌌 "In the vast universe of code, simplicity is the ultimate sophistication"',
            '💫 "A well-named variable is worth a thousand comments"',
            '🚀 "Code fearlessly, but test even more fearlessly"'
          ];
          const wisdom = wisdoms[Math.floor(Math.random() * wisdoms.length)];
          console.log(`🧙 [COSMIC WISDOM] ${wisdom}`);
        }
      };
      console.log('🎮 [EASTER EGG] Try typing "cosmicProtocol.activate()" in the console!');
    }
  }, []);
  
  const [activeService, setActiveService] = useState(null);
  const [missionTime, setMissionTime] = useState(new Date());
  
  // Fix the infinite render loop - memoize the timer setup
  useEffect(() => {
    console.log('⏰ [CHRONOMETER] Mission time synchronization initiated');
    const timer = setInterval(() => {
      setMissionTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
      console.log('🛑 [SHUTDOWN] Chronometer offline - Mission phase complete');
    };
  }, []); // Empty dependency array to prevent re-runs
  
  // Animation variants for staggered row animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  // Enhanced service data with mission coordinates and status
  const enhancedServices = services.map((service, index) => ({
    ...service,
    coordinates: `ENG-${String(index + 1).padStart(3, '0')}`,
    status: ['OPERATIONAL', 'ACTIVE', 'MONITORING', 'STANDBY', 'RESEARCH'][index % 5],
    classification: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'][index % 4]
  }));
  
  // Log service deployment only once per initialization
  useMemo(() => {
    createMissionLog.serviceDeployment(enhancedServices);
    return enhancedServices;
  }, []); // Only run once
  
  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'OPERATIONAL': return 'text-lime-400 bg-lime-400/20';
      case 'ACTIVE': return 'text-blue-400 bg-blue-400/20';
      case 'MONITORING': return 'text-yellow-400 bg-yellow-400/20';
      case 'STANDBY': return 'text-orange-400 bg-orange-400/20';
      case 'RESEARCH': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };
  
  // 🎮 COSMIC EASTER EGGS - Developer interaction rewards
  const cosmicEasterEggs = [
    '🌟 [QUANTUM-LINK] Tool accessed - Neural pathways synchronized, Commander',
    '⚡ [ENERGY-SURGE] Developer powers amplified by 127%',
    '🔮 [COSMIC-WISDOM] The universe smiles upon your code choices',
    '🚀 [HYPERDRIVE] Productivity engines at maximum efficiency',
    '🛸 [ALIEN-TECH] Unknown beneficial side effects detected',
    '🌌 [STELLAR-BOOST] Your code now has cosmic significance',
    '💫 [STARDUST] Legacy code transformed into pure art',
    '🔥 [PHOENIX-MODE] Your debugging skills have transcended reality',
    '🎯 [BULLSEYE] Target locked - Mission success probability: 99.97%',
    '🌈 [RAINBOW-BRIDGE] Connection to developer nirvana established'
  ];
  
  const handleServiceAccess = (serviceId, serviceName) => {
    setActiveService(serviceId);
    // Random cosmic easter egg
    const randomEgg = cosmicEasterEggs[Math.floor(Math.random() * cosmicEasterEggs.length)];
    console.log(randomEgg);
    console.log(`🎯 [TOOL-ACCESS] ${serviceName} module engaged - Prepare for enhanced development`);
  };
  
  // Divide services into tiers
  const tier1 = enhancedServices.slice(0, 2); // Trace Agent, Security Harden Agent
  const tier2 = enhancedServices.slice(2, 4); // CI/CD Pipeline, Trace & Audit Pack
  const tier3 = enhancedServices.slice(4, 6); // LEGIT Compliance, AI Agent Wrapper

  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden font-mono">
        <Helmet>
          <title>Engineering Bay - Developer Arsenal | CuriousLabs</title>
          <meta name="description" content="Access our advanced engineering arsenal of LEGIT-compliant developer tools, patterns, and AI logic built for mission-critical systems." />
          <meta property="og:title" content="Engineering Bay - Developer Arsenal | CuriousLabs" />
          <meta property="og:description" content="Access our advanced engineering arsenal of LEGIT-compliant developer tools, patterns, and AI logic built for mission-critical systems." />
          <meta property="og:image" content="/images/logo.svg" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://curiouslabs.io/codelab" />
        </Helmet>
        
        {/* Background System */}
        <BackgroundLayerAtomic />
        
        {/* Atmospheric Glow */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <MissionControlNavbar />
        
        <main className="flex-grow relative z-10">
          {/* Mission Status Panel */}
          <motion.div 
            className="fixed top-20 right-4 z-50 bg-black/80 backdrop-blur-md border border-lime-400/30 rounded-lg p-3 text-xs"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-lime-400 font-mono mb-1">ENG-BAY STATUS</div>
            <div className="text-white font-mono">{missionTime.toUTCString().slice(17, 25)} UTC</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
              <span className="text-lime-400">OPERATIONAL</span>
            </div>
          </motion.div>
          
          {/* New FloatflowLayout wrapper for the whole page */}
          <CodelabFloatflowLayout>
            <div className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-10 max-w-7xl">
              {/* New HeroSection component */}
              <HeroSection />
              
              {/* New FeaturesSection component */}
              <FeaturesSection />
              
              {/* Featured Tools Grid */}
              <section className="py-16 relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
                    Engineering Arsenal
                    <div className="h-1 w-24 bg-gradient-to-r from-lime-400 to-cyan-400 mx-auto mt-2 rounded-full" />
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Mission-critical developer tools and patterns engineered for production-grade systems
                  </p>
                </motion.div>
                
                {/* Tier 1: Center alignment with enhanced glassmorphism cards */}
                <motion.div 
                  className="flex flex-wrap justify-center gap-8 mb-16"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={containerVariants}
                >
                  {tier1.map((service, idx) => (
                    <motion.div
                      key={service.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-black/40 backdrop-blur-md border border-lime-400/20 rounded-2xl p-8 shadow-2xl 
                                 transition-all duration-300 hover:border-lime-400/50 hover:shadow-lime-400/20
                                 w-full sm:w-[47%] md:w-[45%] relative group cursor-pointer"
                      onClick={() => handleServiceAccess(service.id, service.title)}
                      onKeyDown={(e) => e.key === "Enter" && handleServiceAccess(service.id, service.title)}
                      tabIndex={0}
                      role="button"
                    >
                      {/* Status Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-2 text-xs font-mono">
                          <span className="text-lime-400">{service.coordinates}</span>
                          <span className="text-gray-500">|</span>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(service.status)}`}>
                            {service.status}
                          </span>
                        </div>
                        <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse opacity-60" />
                      </div>

                      {/* Enhanced tag section */}
                      <div className="flex gap-2 text-xs mb-4 font-semibold tracking-wide">
                        {service.categoryTag && (
                          <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
                            {service.categoryTag}
                          </span>
                        )}
                        {service.trustTag && (
                          <span className="bg-lime-500/20 text-lime-300 px-3 py-1 rounded-full border border-lime-500/30">
                            {service.trustTag}
                          </span>
                        )}
                      </div>

                      {/* title + subtitle */}
                      <h3 className="text-white font-bold text-2xl mb-3 group-hover:text-lime-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 text-base leading-relaxed mb-6">{service.subtitle}</p>

                      {/* Enhanced CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-lime-400 font-mono text-sm group-hover:text-white transition-colors">
                          → ACCESS TOOL
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-lime-400 rounded-full animate-pulse" />
                          <div className="w-1 h-1 bg-lime-400 rounded-full animate-pulse delay-200" />
                          <div className="w-1 h-1 bg-lime-400 rounded-full animate-pulse delay-400" />
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-lime-400/5 to-cyan-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Tier 2: Left alignment with enhanced medium cards */}
                <motion.div 
                  className="flex flex-wrap justify-start gap-6 mb-20"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={containerVariants}
                >
                  {tier2.map((service, idx) => (
                    <motion.div
                      key={service.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -3 }}
                      className="bg-black/30 backdrop-blur-md border border-cyan-400/20 rounded-2xl p-6 shadow-xl 
                                 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-400/20
                                 w-full sm:w-[45%] md:w-[40%] relative group cursor-pointer"
                      onClick={() => handleServiceAccess(service.id, service.title)}
                      onKeyDown={(e) => e.key === "Enter" && handleServiceAccess(service.id, service.title)}
                      tabIndex={0}
                      role="button"
                    >
                      {/* Status Header */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-2 text-xs font-mono">
                          <span className="text-cyan-400">{service.coordinates}</span>
                          <span className="text-gray-500">|</span>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(service.status)}`}>
                            {service.status}
                          </span>
                        </div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60" />
                      </div>

                      {/* Enhanced tag section */}
                      <div className="flex gap-2 text-xs mb-3 font-semibold tracking-wide">
                        {service.categoryTag && (
                          <span className="bg-cyan-500/15 text-cyan-300 px-2 py-1 rounded border border-cyan-500/25">
                            {service.categoryTag}
                          </span>
                        )}
                        {service.trustTag && (
                          <span className="bg-lime-500/15 text-lime-300 px-2 py-1 rounded border border-lime-500/25">
                            {service.trustTag}
                          </span>
                        )}
                      </div>

                      {/* title + subtitle */}
                      <h3 className="text-white font-bold text-xl mb-2 group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">{service.subtitle}</p>

                      {/* Enhanced CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-400 font-mono text-xs group-hover:text-white transition-colors">
                          → ACCESS TOOL
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-200" />
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Tier 3: Right alignment with enhanced smaller cards */}
                <motion.div 
                  className="flex flex-wrap justify-end gap-6 mb-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={containerVariants}
                >
                  {tier3.map((service, idx) => (
                    <motion.div
                      key={service.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-black/25 backdrop-blur-md border border-purple-400/20 rounded-2xl p-5 shadow-lg 
                                 transition-all duration-300 hover:border-purple-400/50 hover:shadow-purple-400/20
                                 w-full sm:w-[43%] md:w-[38%] relative group cursor-pointer"
                      onClick={() => handleServiceAccess(service.id, service.title)}
                      onKeyDown={(e) => e.key === "Enter" && handleServiceAccess(service.id, service.title)}
                      tabIndex={0}
                      role="button"
                    >
                      {/* Status Header */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-2 text-xs font-mono">
                          <span className="text-purple-400">{service.coordinates}</span>
                          <span className="text-gray-500">|</span>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(service.status)}`}>
                            {service.status}
                          </span>
                        </div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60" />
                      </div>

                      {/* Enhanced tag section */}
                      <div className="flex gap-2 text-xs mb-3 font-semibold tracking-wide">
                        {service.categoryTag && (
                          <span className="bg-purple-500/15 text-purple-300 px-2 py-1 rounded border border-purple-500/25">
                            {service.categoryTag}
                          </span>
                        )}
                        {service.trustTag && (
                          <span className="bg-lime-500/15 text-lime-300 px-2 py-1 rounded border border-lime-500/25">
                            {service.trustTag}
                          </span>
                        )}
                      </div>

                      {/* title + subtitle */}
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">{service.subtitle}</p>

                      {/* Enhanced CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400 font-mono text-xs group-hover:text-white transition-colors">
                          → ACCESS TOOL
                        </span>
                        <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
                      </div>

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </motion.div>
              </section>
              
              {/* Contract System in Action Section */}
              <section className="py-20 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"
                    animate={{ 
                      scale: [1.2, 1, 1.2],
                      opacity: [0.4, 0.2, 0.4]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-12"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 
                               border border-cyan-400/30 rounded-full backdrop-blur-sm"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="text-2xl"
                    >
                      🧬
                    </motion.div>
                    <span className="text-cyan-400 font-mono text-sm tracking-wider">CONTRACT-SYS-001</span>
                  </motion.div>
                  
                  <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-500 text-transparent bg-clip-text">
                      Contract System
                    </span>
                    <br />
                    <span className="text-white">in Action</span>
                    <motion.div 
                      className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: 128 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </h2>
                  <motion.p 
                    className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Witness our advanced contract validation system in real-time. Monitor schema compliance, 
                    performance budgets, and system health with live debugging capabilities.
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-4xl mx-auto"
                >
                  <Link 
                    to="/dev/contracts"
                    className="group block relative"
                  >
                    <motion.div
                      className="bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl 
                                 border border-cyan-400/30 rounded-3xl p-8 sm:p-12 shadow-2xl 
                                 transition-all duration-500 group-hover:border-cyan-400/60 
                                 group-hover:shadow-cyan-400/20 relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.02,
                        y: -8
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      {/* Animated gradient overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-400/5 to-cyan-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={{
                          background: [
                            "linear-gradient(90deg, rgba(34, 211, 238, 0.05) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(34, 211, 238, 0.05) 100%)",
                            "linear-gradient(90deg, rgba(168, 85, 247, 0.05) 0%, rgba(34, 211, 238, 0.05) 50%, rgba(168, 85, 247, 0.05) 100%)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      {/* Status indicators */}
                      <div className="flex flex-wrap justify-between items-start mb-8 relative z-10">
                        <div className="flex flex-wrap gap-3">
                          <motion.div
                            className="flex items-center gap-2 px-3 py-1 bg-lime-400/20 border border-lime-400/30 rounded-full"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
                            <span className="text-lime-400 font-mono text-xs">OPERATIONAL</span>
                          </motion.div>
                          <motion.div
                            className="flex items-center gap-2 px-3 py-1 bg-cyan-400/20 border border-cyan-400/30 rounded-full"
                            animate={{ opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          >
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                            <span className="text-cyan-400 font-mono text-xs">MONITORING</span>
                          </motion.div>
                        </div>
                        <motion.div
                          className="text-right"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="text-white/60 font-mono text-xs">SYSTEM STATUS</div>
                          <div className="text-cyan-400 font-mono text-sm">99.97% UPTIME</div>
                        </motion.div>
                      </div>

                      {/* Main content */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
                        <div>
                          <motion.h3 
                            className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            Live Dashboard Access
                          </motion.h3>
                          <motion.p 
                            className="text-gray-300 text-base leading-relaxed mb-6"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                          >
                            Experience real-time contract validation, performance monitoring, and system health 
                            tracking. Debug schema compliance, export metrics, and monitor violations as they happen.
                          </motion.p>
                          
                          <motion.div 
                            className="space-y-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            {[
                              "Real-time schema validation",
                              "Performance budget monitoring", 
                              "Live violation tracking",
                              "Debug export capabilities"
                            ].map((feature, index) => (
                              <motion.div 
                                key={index}
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                              >
                                <motion.div
                                  className="w-2 h-2 bg-cyan-400 rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                />
                                <span className="text-gray-300 text-sm">{feature}</span>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>

                        <div className="relative">
                          <motion.div
                            className="bg-black/60 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-cyan-400 font-mono text-sm">CONTRACT_DASHBOARD</span>
                              <motion.div
                                className="flex gap-1"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <div className="w-2 h-2 bg-lime-400 rounded-full" />
                                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                                <div className="w-2 h-2 bg-red-400 rounded-full" />
                              </motion.div>
                            </div>
                            
                            <div className="space-y-3 font-mono text-xs">
                              <motion.div 
                                className="text-lime-400"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                ✓ Schema Validation: ACTIVE
                              </motion.div>
                              <motion.div 
                                className="text-cyan-400"
                                animate={{ opacity: [1, 0.7, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                              >
                                📊 Performance: 12ms render
                              </motion.div>
                              <motion.div 
                                className="text-purple-400"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                              >
                                🔍 Debug Export: READY
                              </motion.div>
                              <div className="text-gray-400">
                                🧬 Contracts: 13 schemas loaded
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      {/* Call to action */}
                      <motion.div 
                        className="mt-8 flex items-center justify-between relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <div className="flex items-center gap-4">
                          <motion.span 
                            className="text-cyan-400 font-mono text-lg group-hover:text-white transition-colors duration-300"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            → LAUNCH DASHBOARD
                          </motion.span>
                          <motion.div 
                            className="flex items-center gap-1"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-200" />
                            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-400" />
                          </motion.div>
                        </div>
                        
                        <motion.div
                          className="px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 
                                     border border-cyan-400/30 rounded-full text-cyan-400 font-mono text-xs
                                     group-hover:from-cyan-400/20 group-hover:to-purple-400/20 
                                     group-hover:border-cyan-400/50 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          /dev/contracts
                        </motion.div>
                      </motion.div>

                      {/* Subtle grid pattern overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none" />
                    </motion.div>
                  </Link>
                </motion.div>
              </section>
              
              {/* New ProcessSection component */}
              <ProcessSection />
              
              {/* New CTASection component */}
              <CTASection />
              
              {/* New LegitSection component */}
              <LegitSection />
            </div>
            
            {/* Section Divider */}
            <hr className="my-12 border-lime-400/20" />
            
            {/* New MetricsLogsSection component */}
            <MetricsLogsSection />
            
            {/* Section Divider */}
            <hr className="my-12 border-lime-400/20" />
            
            {/* Testimonials Section (Enhanced) - COMMENTED OUT - UNREADY */}
            {/*
            <section className="max-w-7xl mx-auto mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Engineering Testimonials
                  <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-2 rounded-full" />
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Feedback from fellow engineers and mission commanders
                </p>
              </motion.div>
              <motion.div 
                className="bg-black/30 backdrop-blur-md border border-purple-400/20 rounded-2xl p-8 shadow-2xl hover:border-purple-400/40 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Testimonials />
              </motion.div>
            </section>
            */}
          </CodelabFloatflowLayout>
        </main>
        
        {/* Service Modals */}
        {services.map((service) => (
          <ServiceModal
            key={service.id}
            isOpen={activeService === service.id}
            onClose={() => setActiveService(null)}
            title={service.title}
            subtitle={service.subtitle}
            bullets={service.bullets}
            trustTag={service.trustTag}
            categoryTag={service.categoryTag}
            outcome={service.outcome}
            cta={service.cta}
            onCtaClick={() => console.log(`Requested: ${service.id}`)}
          />
        ))}
        
        <FooterExperience />
        <ScrollToTop />
      </div>
    </>
  );
} 