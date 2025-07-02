// ✅ KEEP - MISSION CONTROL NAVBAR - CRITICAL PRODUCTION COMPONENT
// 🔴 CODE: NAV-MISSION-001
// 🧭 STATUS: MAIN NAVIGATION SYSTEM - WIDELY USED ACROSS SITE
// 📋 USED_IN: All Production Pages, All Product Pages, Codelab, Tools, About, Contact, Blog, Docs
// 🧬 FEATURES: Main navigation, responsive mobile menu, route handling
// ⚠️ WARNING: DO NOT REMOVE - CRITICAL SHARED NAVIGATION
// 📊 BUNDLE: Core navigation component
// 🎯 TYPE: Shared Navigation Component
// 🔗 DEPENDENCIES: react-router-dom, framer-motion

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../utils/assets';
import {  motion, AnimatePresence  } from '../../FramerProvider';

/**
 * MissionControlNavbar - Standalone Mission Control themed navigation bar
 * Extracted from HeroAtomic.jsx and made into a reusable component
 * 
 * Features:
 * - Hidden navbar with angled design
 * - Hover to expand functionality
 * - Black glassmorphism styling
 * - Mission control theme with status indicators
 * - Full routing support
 * - Mobile hamburger menu with Mission Control styling
 * 
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.alwaysExpanded - If true, navbar is always fully visible
 * @param {string} props.position - Position: 'fixed' (default) or 'relative'
 */
const MissionControlNavbar = ({ 
  className = '', 
  alwaysExpanded = false, 
  position = 'fixed' 
}) => {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(alwaysExpanded);
  const [activeSection, setActiveSection] = useState(null);
  const [utcTime, setUtcTime] = useState('');
  const [systemStatus] = useState('OPERATIONAL');
  const [isCommandPanelOpen, setIsCommandPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation sections with correct routing
  const navigationSections = [
    {
      id: 'command',
      label: 'Command Center',
      icon: '🎯',
      description: 'Primary mission control interface for all CuriousLabs operations and system oversight.',
      coordinates: 'CTRL-001',
      status: 'ACTIVE',
      original: 'Home',
      route: '/'
    },
    {
      id: 'engineering',
      label: 'Engineering Bay',
      icon: '⚡',
      description: 'Advanced development laboratories and experimental technology research facilities.',
      coordinates: 'ENG-002',
      status: 'ACTIVE',
      original: 'CodeLab',
      route: '/codelab'
    },
    {
      id: 'arsenal',
      label: 'Fleet Arsenal',
      icon: '🚀',
      description: 'Comprehensive catalog of deployed systems, tools, and technological solutions.',
      coordinates: 'ARS-003',
      status: 'ACTIVE',
      original: 'Products',
      route: '/arsenal'
    },
    {
      id: 'instruments',
      label: 'Instruments',
      icon: '🔧',
      description: 'Specialized utility systems and diagnostic tools for mission support operations.',
      coordinates: 'INST-004',
      status: 'STANDBY',
      original: 'Tools',
      route: '/tools'
    },
    {
      id: 'transmissions',
      label: 'Transmissions',
      icon: '📡',
      description: 'Communication logs, mission reports, and knowledge base documentation.',
      coordinates: 'COMM-005',
      status: 'ACTIVE',
      original: 'Blog',
      route: '/transmissions'
    },
    {
      id: 'crew',
      label: 'Crew Manifest',
      icon: '👥',
      description: 'Personnel records, mission history, and organizational structure information.',
      coordinates: 'CREW-006',
      status: 'ACTIVE',
      original: 'About',
      route: '/about'
    },
    {
      id: 'deepspace',
      label: 'Deep Space Comm',
      icon: '🌌',
      description: 'External communication systems and mission coordination protocols.',
      coordinates: 'DSC-007',
      status: 'STANDBY',
      original: 'Contact',
      route: '/contact'
    }
  ];

  // UTC Time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Status indicator animation variants
  const statusIndicatorVariants = {
    operational: {
      backgroundColor: ['#84cc16', '#65a30d', '#84cc16'],
      transition: { duration: 2, repeat: Infinity }
    },
    warning: {
      backgroundColor: ['#eab308', '#ca8a04', '#eab308'],
      transition: { duration: 1.5, repeat: Infinity }
    },
    critical: {
      backgroundColor: ['#ef4444', '#dc2626', '#ef4444'],
      transition: { duration: 1, repeat: Infinity }
    }
  };

  // Handle navbar expansion
  useEffect(() => {
    if (alwaysExpanded) {
      setIsNavbarExpanded(true);
    }
  }, [alwaysExpanded]);

  const navbarClasses = `${position} top-0 left-0 right-0 z-[300] ${className}`;

  return (
    <nav className={navbarClasses}>
      {/* Hidden Navbar with Angled Design */}
      <motion.div 
        className="relative"
        onMouseEnter={() => !alwaysExpanded && setIsNavbarExpanded(true)}
        onMouseLeave={() => !alwaysExpanded && setIsNavbarExpanded(false)}
      >
        {/* Visible Left Section with Angled Line - DESKTOP ONLY */}
        {!alwaysExpanded && (
          <div className="absolute top-0 left-0 z-10 hidden lg:block">
            <div 
              className="backdrop-blur-2xl bg-gradient-to-r from-black/70 via-black/80 to-transparent border-b border-lime-400/20 shadow-2xl shadow-black/50"
              style={{
                clipPath: 'polygon(0 0, 300px 0, 350px 100%, 0 100%)',
                width: '350px',
                height: '56px'
              }}
            >
              <div className="flex items-center h-14 px-6">
                {/* CuriousLabs Logo & Status */}
                <div className="flex items-center space-x-4">
                  <Link to="/">
                    <motion.div 
                      className="flex items-center space-x-2 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* CuriousLabs Logo */}
                      <div className="flex items-center space-x-2">
                        <img 
                          src={IMAGES.LOGO} 
                          alt="CuriousLabs" 
                          className="h-6 w-auto object-contain"
                          style={{ filter: 'drop-shadow(0 0 6px rgba(132, 204, 22, 0.4))' }}
                        />
                        <div>
                          <div className="text-lime-400 font-bold text-sm tracking-wide">CuriousLabs</div>
                          <div className="text-xs font-mono text-white/60 tracking-wider">MISSION CONTROL</div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>

                  {/* System Status Indicator */}
                  <Link to="/mission-control">
                    <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40 backdrop-blur-sm hover:bg-lime-400/20 hover:border-lime-400/50 transition-all duration-300 cursor-pointer">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        variants={statusIndicatorVariants}
                        animate="operational"
                      />
                      <span className="text-xs font-mono text-lime-400 tracking-wider font-semibold">
                        {systemStatus}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile-Only Simple Header */}
        <div className="lg:hidden">
          <div className="backdrop-blur-2xl bg-gradient-to-r from-black/70 via-black/80 to-black/70 border-b border-lime-400/20 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between h-14 px-4">
              {/* Mobile Logo */}
              <Link to="/">
                <motion.div 
                  className="flex items-center space-x-2 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={IMAGES.LOGO} 
                    alt="CuriousLabs" 
                    className="h-5 w-auto object-contain"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(132, 204, 22, 0.4))' }}
                  />
                  <div>
                    <div className="text-lime-400 font-bold text-xs tracking-wide">CuriousLabs</div>
                  </div>
                </motion.div>
              </Link>

              {/* Mobile Status & Menu */}
              <div className="flex items-center space-x-3">
                {/* Mobile OPERATIONAL Status */}
                <Link to="/mission-control">
                  <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full border border-lime-400/30 bg-black/40 backdrop-blur-sm hover:bg-lime-400/20 hover:border-lime-400/50 transition-all duration-300 cursor-pointer">
                    <motion.div
                      className="w-1 h-1 rounded-full"
                      variants={statusIndicatorVariants}
                      animate="operational"
                    />
                    <span className="text-xs font-mono text-lime-400 tracking-wider font-semibold">
                      OP
                    </span>
                  </div>
                </Link>

                {/* Mobile Menu Button */}
                <motion.button 
                  className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-black/30 border border-transparent hover:border-white/15 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                >
                  <motion.div
                    animate={isMobileMenuOpen ? "open" : "closed"}
                    variants={{
                      open: { rotate: 90 },
                      closed: { rotate: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMobileMenuOpen ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Full Navbar - Desktop Only - Revealed on Hover or Always Expanded */}
        <motion.div
          initial={{ opacity: alwaysExpanded ? 1 : 0, x: alwaysExpanded ? 0 : -100 }}
          animate={{ 
            opacity: isNavbarExpanded ? 1 : 0,
            x: isNavbarExpanded ? 0 : -100
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="hidden lg:block backdrop-blur-2xl bg-gradient-to-r from-black/70 via-black/80 to-black/70 border-b border-lime-400/20 shadow-2xl shadow-black/50"
        >
          <div className="max-w-full mx-auto px-8">
            <div className="flex items-center justify-between h-14">
              
              {/* CuriousLabs Logo & Branding - Left Side */}
              <div className="flex items-center space-x-3">
                <Link to="/">
                  <motion.div 
                    className="flex items-center space-x-2 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* CuriousLabs Logo */}
                    <div className="flex items-center space-x-2">
                      <img 
                        src={IMAGES.LOGO} 
                        alt="CuriousLabs" 
                        className="h-6 w-auto object-contain"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(132, 204, 22, 0.4))' }}
                      />
                      <div>
                        <div className="text-lime-400 font-bold text-sm tracking-wide">CuriousLabs</div>
                        <div className="text-xs font-mono text-white/60 tracking-wider">MISSION CONTROL</div>
                      </div>
                    </div>
                  </motion.div>
                </Link>

                {/* System Status Indicator */}
                <Link to="/mission-control">
                  <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40 backdrop-blur-sm hover:bg-lime-400/20 hover:border-lime-400/50 transition-all duration-300 cursor-pointer">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full"
                      variants={statusIndicatorVariants}
                      animate="operational"
                    />
                    <span className="text-xs font-mono text-lime-400 tracking-wider font-semibold">
                      {systemStatus}
                    </span>
                  </div>
                </Link>
              </div>

              {/* Navigation Sections - Full Width Distribution */}
              <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center space-x-8">
                  {navigationSections.map((section) => (
                    <motion.div
                      key={section.id}
                      className="relative group"
                      onMouseEnter={() => setActiveSection(section.id)}
                      onMouseLeave={() => setActiveSection(null)}
                      whileHover={{ y: -1 }}
                    >
                      <Link
                        to={section.route}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 backdrop-blur-sm ${
                          activeSection === section.id
                            ? 'bg-lime-400/20 text-lime-400 border border-lime-400/50 shadow-lg shadow-lime-400/20'
                            : 'text-white/80 hover:text-white hover:bg-black/30 border border-transparent hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs">{section.icon}</span>
                          <span className="font-mono tracking-wide">{section.label}</span>
                        </div>
                      </Link>

                      {/* Fixed Hover Panel - Black Glassmorphism */}
                      <AnimatePresence>
                        {activeSection === section.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 p-4 rounded-xl backdrop-blur-2xl bg-black/90 border border-lime-400/30 shadow-2xl shadow-black/60"
                            style={{ zIndex: 60 }}
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="text-lime-400 font-bold text-sm">{section.label}</div>
                                <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-0.5 rounded">{section.coordinates}</div>
                              </div>
                              
                              <div className="text-white/90 text-xs leading-relaxed">{section.description}</div>
                              
                              <div className="flex items-center justify-between pt-2 border-t border-white/15">
                                <div className="text-xs font-mono text-white/70">
                                  ORIG: <span className="text-lime-400">{section.original}</span>
                                </div>
                                <div className="flex items-center space-x-1.5">
                                  <div 
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      section.status === 'ACTIVE' ? 'bg-lime-400 animate-pulse' : 
                                      section.status === 'STANDBY' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
                                    }`}
                                  />
                                  <span className="text-xs font-mono text-white/70">{section.status}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* UTC Time & Command Panel - Right Side */}
              <div className="flex items-center space-x-3">
                {/* UTC Timer */}
                <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-lg bg-black/60 border border-white/15 backdrop-blur-sm">
                  <div className="text-xs font-mono text-white/70">UTC</div>
                  <div className="font-mono text-xs text-lime-400 tracking-wider font-semibold">{utcTime}</div>
                </div>

                {/* Emergency Command Panel */}
                <motion.button
                  className="hidden lg:flex px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 font-mono text-xs tracking-wider hover:bg-red-500/30 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-red-500/15"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCommandPanelOpen(!isCommandPanelOpen)}
                >
                  🚨 EMERGENCY
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[1000] lg:hidden"
            onClick={closeMobileMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-gradient-to-b from-black/90 via-black/95 to-black/90 border-l border-lime-400/20 backdrop-blur-2xl z-[1001]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header */}
              <div className="p-4 border-b border-lime-400/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={IMAGES.LOGO} 
                      alt="CuriousLabs" 
                      className="h-5 w-auto object-contain"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(132, 204, 22, 0.4))' }}
                    />
                    <div className="text-lime-400 font-bold text-sm tracking-wide">CuriousLabs</div>
                  </div>
                  
                  <motion.button
                    className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeMobileMenu}
                    aria-label="Close mobile menu"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Mobile Navigation Menu */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {navigationSections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={section.route}
                        onClick={closeMobileMenu}
                        className="group flex items-center space-x-3 p-3 rounded-lg bg-black/30 border border-white/10 hover:border-lime-400/30 hover:bg-lime-400/5 transition-all duration-300"
                      >
                        <span className="text-base">{section.icon}</span>
                        <span className="font-mono text-white text-sm tracking-wide group-hover:text-lime-400 transition-colors duration-300">
                          {section.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Emergency Command Panel Modal */}
      <AnimatePresence>
        {isCommandPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setIsCommandPanelOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/90 border border-red-500/50 rounded-xl p-6 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className="text-red-400 text-lg font-bold">🚨 EMERGENCY PROTOCOLS</div>
                <div className="text-white/80 text-sm">
                  Emergency command panel activated. All systems standing by for immediate response.
                </div>
                <button
                  onClick={() => setIsCommandPanelOpen(false)}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                >
                  Close Panel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MissionControlNavbar; 