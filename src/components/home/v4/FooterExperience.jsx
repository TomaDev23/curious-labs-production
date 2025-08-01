/**
 * 🛡️ KEEP - CRITICAL PRODUCTION COMPONENT
 * Code: FOOTER-001
 * Used in: All production pages (v6_atomic.jsx, codelab.jsx, tools.jsx, about.jsx, contact.jsx, blog.jsx, docs.jsx, product pages)
 * Features: Enhanced footer with cosmic theme integration, CTA bridge, cosmic styling, and responsive grid layout
 * Warning: DO NOT REMOVE - SHARED FOOTER COMPONENT
 * Bundle: Shared across all production pages
 * Type: Shared Footer Component
 * Dependencies: framer-motion, react-router-dom, MagneticButton, CosmicNoiseOverlay, ParticleField
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from '../../../FramerProvider';
import MagneticButton from '../../ui/MagneticButton';
import CosmicNoiseOverlay from '../../ui/CosmicNoiseOverlay';
import ParticleField from '../../ui/ParticleField';

/**
 * FooterExperience - Enhanced footer with cosmic theme integration
 * Features CTA bridge, cosmic styling, and responsive grid layout
 */
const FooterExperience = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Social media links
  const socialLinks = [
    { name: 'LinkedIn', icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' },
    { name: 'GitHub', icon: 'M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z' },
    { name: 'Twitter', icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z' },
  ];
  
  // Products, resources, and company links
  const links = {
    products: [
      { name: 'CodeLab', path: '/codelab' },
      { name: 'OpsPipe', path: '/products/opspipe' },
      { name: 'MoonSignal', path: '/products/moonsignal' },
      { name: 'Guardian', path: '/products/guardian' },
    ],
    resources: [
      { name: 'Instruments', path: '/tools' },
      { name: 'Contracts', path: '/dev/contracts' },
      { name: 'Blog', path: '/Transmissions' },
      { name: 'Museum', path: '/museum' },
    ],
    company: [
      { name: 'About', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy', path: '/privacy' },
    ]
  };

  return (
    <footer className="relative pt-12 bg-gradient-to-t from-black via-gray-900/90 to-transparent overflow-hidden pb-12 z-[100]">
      {/* Background enhancements - ensure they don't block clicks */}
      <CosmicNoiseOverlay opacity={0.03} blendMode="overlay" />
      <ParticleField density="low" yDirection="down" zIndex={0} />
      
      {/* Ambient background glow - ensure it's behind content */}
      <div className="absolute bottom-0 left-1/4 w-1/2 h-96 rounded-full opacity-10 blur-[100px] pointer-events-none z-0" 
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(17, 24, 39, 0) 70%)' }} 
      />
      
      {/* CTA Bridge Section */}
      <motion.div 
        className="container mx-auto px-4 text-center mb-16 relative z-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          style={{ 
            textShadow: '0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)'
          }}
          variants={itemVariants}
        >
          Ready to Redefine?
        </motion.h2>
        
        <motion.p 
          className="text-xl text-purple-300 mb-8"
          variants={itemVariants}
        >
          Join the frontier of AI-driven development
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Link to="/contact">
            <MagneticButton
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium relative overflow-hidden group shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] transition-shadow duration-300 z-10"
              aria-label="Start Your Journey - Begin your AI-driven development journey"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }}
            >
              <span className="relative z-10 animate-glow-text">Start Your Journey</span>
              <div className="absolute inset-0 opacity-0 bg-gradient-to-r from-purple-700 to-blue-700 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none"></div>
              <div className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-70 group-focus:opacity-70 blur-md bg-gradient-to-r from-purple-600/50 via-blue-500/50 to-purple-600/50 group-hover:animate-pulse-subtle group-focus:animate-pulse-subtle transition-opacity duration-300 pointer-events-none"></div>
            </MagneticButton>
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Glowing divider - ensure it doesn't block clicks */}
      <div className="relative h-px mb-16 pointer-events-none">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        <div className="absolute inset-x-0 h-[2px] blur-sm bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      </div>
      
      {/* Footer Grid - ensure proper z-index */}
      <div className="container mx-auto px-4 py-16 relative z-20">
        {/* Mobile: 2x2 grid, Tablet: 2x2 grid, Desktop: 1x4 grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {/* Company Info - Full width on mobile */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 lg:col-span-1 space-y-4 text-center md:text-left"
          >
            <h3 className="text-xl font-bold text-white">CuriousLabs</h3>
            <p className="text-gray-400 text-sm md:text-base">AI-powered solutions for modern development challenges. We're building the future of collaborative coding.</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              {socialLinks.map((link) => (
                <motion.a 
                  key={link.name}
                  href="#" 
                  aria-label={`Visit our ${link.name} page`}
                  className="text-gray-400 hover:text-purple-400 focus:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full p-1"
                  whileHover={{ y: -3 }}
                  whileFocus={{ y: -3 }}
                  tabIndex={0}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d={link.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Products - Compact mobile layout */}
          <motion.div variants={itemVariants} className="relative z-10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Products</h3>
            <ul className="space-y-2 md:space-y-3" role="list">
              {links.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-purple-400 focus:text-purple-400 transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1 -ml-2 relative z-10 cursor-pointer text-sm md:text-base"
                    aria-label={`${link.name} product page`}
                  >
                    <motion.span 
                      className="block w-1 h-1 rounded-full bg-purple-500 mr-2 pointer-events-none"
                      whileHover={{ scale: 2 }}
                      whileFocus={{ scale: 2 }}
                      transition={{ duration: 0.2 }}
                      aria-hidden="true"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Resources - Compact mobile layout */}
          <motion.div variants={itemVariants} className="relative z-10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Resources</h3>
            <ul className="space-y-2 md:space-y-3" role="list">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-purple-400 focus:text-purple-400 transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1 -ml-2 relative z-10 cursor-pointer text-sm md:text-base"
                    aria-label={`${link.name} resource page`}
                  >
                    <motion.span 
                      className="block w-1 h-1 rounded-full bg-blue-500 mr-2 pointer-events-none"
                      whileHover={{ scale: 2 }}
                      whileFocus={{ scale: 2 }}
                      transition={{ duration: 0.2 }}
                      aria-hidden="true"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Company - Compact mobile layout */}
          <motion.div variants={itemVariants} className="relative z-10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Company</h3>
            {/* Mobile: Centered container with 2+2 grid, Desktop: original vertical list */}
            <div className="flex justify-center md:justify-start">
              <ul className="grid grid-cols-2 gap-4 md:block md:space-y-3" role="list">
                {links.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-purple-400 focus:text-purple-400 transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-2 py-1 relative z-10 cursor-pointer text-sm md:text-base"
                      aria-label={`${link.name} company page`}
                    >
                      <motion.span 
                        className="block w-1 h-1 rounded-full bg-purple-500 mr-2 pointer-events-none"
                        whileHover={{ scale: 2 }}
                        whileFocus={{ scale: 2 }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          className="text-center text-gray-500 mt-16 pt-8 pb-8 border-t border-gray-800 relative z-10"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} CuriousLabs. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Powered by AI. Built with 💜 by curious minds.
          </p>
        </motion.div>
      </div>

      {/* Add Legacy View Easter Egg */}
      {/* TODO: Uncomment when legacy solar system is ready
      <motion.div 
        className="fixed bottom-8 left-8 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <Link 
          to="/legacy" 
          className="flex items-center space-x-2 bg-black/80 backdrop-blur-sm text-xs text-gray-400 hover:text-purple-400 px-3 py-2 rounded-full border border-gray-800 hover:border-purple-500 transition-all duration-300"
          aria-label="View legacy solar system"
        >
          <span className="text-xl">🪐</span>
          <span className="font-mono">Solar Preview</span>
        </Link>
      </motion.div>
      */}
    </footer>
  );
};

export default FooterExperience; 