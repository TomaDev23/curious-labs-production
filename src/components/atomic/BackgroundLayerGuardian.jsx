/**
 * @component BackgroundLayerGuardian
 * @description Family-friendly sunrise-to-day-sky background system for Guardian page
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true
 */

// ✅ KEEP - GUARDIAN BACKGROUND SYSTEM - CRITICAL PRODUCTION COMPONENT
// 🔴 CODE: BG-GUARDIAN-001
// 🌅 STATUS: GUARDIAN SUNRISE BACKGROUND - FAMILY-FRIENDLY THEME
// 📋 USED_IN: Guardian Product Page Only
// 🧬 FEATURES: Sunrise gradient, day sky transition, sun glare effects, optimistic atmosphere
// ⚠️ WARNING: DO NOT REMOVE - GUARDIAN PAGE SPECIFIC COMPONENT
// 📊 BUNDLE: Guardian-specific background system
// 🎯 TYPE: Page-Specific Background Component
// 🔗 DEPENDENCIES: react

import React, { useEffect, useState, useMemo, memo } from 'react';

// Internal performance detection (simplified for Guardian)
const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    performanceTier: 'high',
    prefersReducedMotion: false,
    isMobile: false
  });

  useEffect(() => {
    const detectCapabilities = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const memory = navigator.deviceMemory || 8;
      
      let performanceTier = 'high';
      if (prefersReducedMotion) {
        performanceTier = 'minimal';
      } else if (isMobile && memory <= 2) {
        performanceTier = 'low';
      } else if (isMobile || memory <= 4) {
        performanceTier = 'medium';
      }
      
      setCapabilities({
        performanceTier,
        prefersReducedMotion,
        isMobile
      });
    };
    
    detectCapabilities();
    
    // Create media query listeners for proper cleanup
    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(max-width: 767px)')
    ];
    
    mediaQueries.forEach(mq => mq.addEventListener('change', detectCapabilities));
    window.addEventListener('resize', detectCapabilities);
    
    return () => {
      mediaQueries.forEach(mq => mq.removeEventListener('change', detectCapabilities));
      window.removeEventListener('resize', detectCapabilities);
    };
  }, []);

  return capabilities;
};

// ✅ KEEP - GUARDIAN BACKGROUND COMPONENT
const BackgroundLayerGuardian = memo(() => {
  const { performanceTier, prefersReducedMotion } = useDeviceCapabilities();
  
  // Memoize expensive style calculations
  const baseGradientStyle = useMemo(() => ({
    background: `
      linear-gradient(180deg, 
        #1e3a8a 0%,           /* Deep blue at top (hero) */
        #3b82f6 15%,          /* Medium blue */
        #60a5fa 30%,          /* Lighter blue */
        #93c5fd 45%,          /* Sky blue */
        #dbeafe 60%,          /* Very light blue */
        #f0f9ff 75%,          /* Almost white */
        #fef3c7 85%,          /* Warm sunrise yellow */
        #fed7aa 95%,          /* Soft peach */
        #fecaca 100%          /* Gentle pink at bottom */
      )
    `,
    zIndex: 1
  }), []);

  const sunGlareStyle = useMemo(() => ({
    background: 'radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(254, 243, 199, 0.3) 20%, rgba(253, 224, 71, 0.2) 40%, rgba(251, 191, 36, 0.1) 60%, transparent 80%)',
    filter: 'blur(60px)',
    zIndex: 10,
    transform: 'translate(200px, -200px)'
  }), []);

  const secondaryGlowStyle = useMemo(() => ({
    background: 'radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.6) 0%, rgba(254, 243, 199, 0.4) 30%, rgba(253, 224, 71, 0.2) 60%, transparent 80%)',
    filter: 'blur(40px)',
    zIndex: 12,
    transform: 'translate(100px, -100px)'
  }), []);
  
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      
      {/* Base Sunrise-to-Day Sky Gradient */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={baseGradientStyle}
      />

      {/* Sun Glare Effect - Positioned in upper right */}
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
        style={sunGlareStyle}
      />

      {/* Secondary Sun Glow - More intense center */}
      <div 
        className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={secondaryGlowStyle}
      />

      {/* Atmospheric Light Rays - Subtle directional lighting */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.1) 0%, 
              rgba(254, 243, 199, 0.08) 25%, 
              rgba(253, 224, 71, 0.06) 50%, 
              transparent 75%
            )
          `,
          filter: 'blur(80px)',
          zIndex: 8
        }}
      />

      {/* Horizon Glow - Warm light at the bottom sections */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none"
        style={{
          background: `
            linear-gradient(0deg, 
              rgba(254, 243, 199, 0.3) 0%, 
              rgba(253, 224, 71, 0.2) 20%, 
              rgba(251, 191, 36, 0.1) 40%, 
              transparent 80%
            )
          `,
          filter: 'blur(100px)',
          zIndex: 5
        }}
      />

      {/* Gentle Cloud-like Wisps - Only on high performance */}
      {performanceTier === 'high' && !prefersReducedMotion && (
        <>
          <div 
            className="absolute top-[20vh] left-[10%] w-[300px] h-[100px] pointer-events-none opacity-20"
            style={{
              background: 'radial-gradient(ellipse 300px 100px at center, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 40%, transparent 70%)',
              filter: 'blur(30px)',
              zIndex: 15,
              animation: 'float 20s ease-in-out infinite'
            }}
          />
          
          <div 
            className="absolute top-[40vh] right-[15%] w-[250px] h-[80px] pointer-events-none opacity-15"
            style={{
              background: 'radial-gradient(ellipse 250px 80px at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 80%)',
              filter: 'blur(25px)',
              zIndex: 14,
              animation: 'float 25s ease-in-out infinite reverse'
            }}
          />

          <div 
            className="absolute top-[60vh] left-[20%] w-[200px] h-[60px] pointer-events-none opacity-10"
            style={{
              background: 'radial-gradient(ellipse 200px 60px at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 60%, transparent 90%)',
              filter: 'blur(20px)',
              zIndex: 13,
              animation: 'float 30s ease-in-out infinite'
            }}
          />
        </>
      )}

      {/* Optimistic Light Overlay - Brightens the overall mood */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 0%, 
              rgba(255, 255, 255, 0.1) 0%, 
              rgba(254, 243, 199, 0.05) 30%, 
              transparent 70%
            )
          `,
          zIndex: 20
        }}
      />

      {/* CSS Animations for floating clouds */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-3px); }
          75% { transform: translateY(-15px) translateX(2px); }
        }
      `}</style>
      
    </div>
  );
});

BackgroundLayerGuardian.displayName = 'BackgroundLayerGuardian';

export default BackgroundLayerGuardian; 