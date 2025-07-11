// ✅ NEW - LEGAL LINK COMPONENT
// 🔴 CODE: LEGAL-LINK-001
// ⚖️ STATUS: LEGAL QUICK ACCESS - FLOATING LINK
// 📋 COMPONENTS: Link, motion
// 🧬 FEATURES: Flashing legal icon, overlay positioning
// 📊 BUNDLE: Lightweight legal access component
// 🎯 USAGE: Bottom-left floating legal access

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from '../FramerProvider';

export default function LegalLink() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="fixed bottom-6 left-6 z-[60]"
    >
      <Link
        to="/legal"
        className="group relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full backdrop-blur-xl border border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 hover:scale-110"
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(245, 158, 11, 0.1)'
        }}
        aria-label="View Legal Declaration"
      >
        {/* Legal Icon with Flashing Effect */}
        <div className="relative">
          <span className="text-amber-400 text-sm md:text-base group-hover:text-white transition-colors duration-300">
            ⚖️
          </span>
          
          {/* Flashing Ring Animation */}
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/40 animate-ping opacity-75 group-hover:opacity-100"></div>
          
          {/* Subtle Glow Effect */}
          <div 
            className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)',
              filter: 'blur(4px)'
            }}
          ></div>
        </div>
        
        {/* Hover Tooltip */}
        <div className="absolute bottom-full left-0 mb-2 px-3 py-1 bg-black/90 backdrop-blur-sm border border-amber-400/30 rounded-lg text-xs text-amber-400 font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Legal Declaration
          <div className="absolute top-full left-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-400/30"></div>
        </div>
      </Link>
    </motion.div>
  );
} 