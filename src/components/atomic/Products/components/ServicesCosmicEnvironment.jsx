import React from 'react';
import { motion } from '../../../../FramerProvider';

/**
 * Services Page Cosmic Environment Component
 * Creates the background cosmic atmosphere for the services page
 */
export const ServicesCosmicEnvironment = () => (
  <div className="absolute inset-0 overflow-hidden z-[-20]">
    {/* Layer 1: Services Page Enhanced Base Gradient */}
    <motion.div
      className="absolute inset-0 opacity-40"
      style={{
        background: `
          linear-gradient(135deg, #0f172a 0%, #1e293b 20%, #2d1b4f 40%, rgba(255, 107, 53, 0.15) 70%, rgba(255, 140, 66, 0.1) 100%),
          radial-gradient(ellipse at 20% 80%, rgba(244, 81, 30, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(255, 107, 53, 0.15) 0%, transparent 40%)
        `,
        backgroundSize: '200% 200%, 100% 100%, 100% 100%',
      }}
      animate={{ 
        backgroundPosition: ['0% 0%, 0% 0%, 0% 0%', '100% 100%, 10% 10%, -10% -10%'] 
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    />
    
    {/* Layer 2: Services Page Floating Cosmic Orbs */}
    {Array.from({ length: 8 }).map((_, i) => {
      const size = 20 + Math.random() * 60;
      const colors = ['#FF6B35', '#FF8C42', '#F4511E'];
      const color = colors[i % 3];

      return (
        <motion.div
          key={`services-cosmic-orb-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: `radial-gradient(circle, ${color}40 0%, ${color}20 30%, transparent 70%)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      );
    })}
    
    {/* Layer 3: Services Page Enhanced Cosmic Grid - REMOVED */}
    
    {/* Layer 4: Services Page Enhanced Nebula Effects */}
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 25% 40%, rgba(255, 107, 53, 0.3) 0%, rgba(255, 140, 66, 0.15) 40%, transparent 70%)',
        filter: 'blur(60px)',
      }}
      animate={{ 
        scale: [1, 1.2, 1],
        x: [0, 40, 0],
        y: [0, -30, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 75% 60%, rgba(244, 81, 30, 0.25) 0%, rgba(255, 107, 53, 0.12) 35%, transparent 60%)',
        filter: 'blur(80px)',
      }}
      animate={{ 
        scale: [1.1, 0.9, 1.1],
        x: [-20, 20, -20],
        y: [10, -10, 10]
      }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Layer 5: Dynamic Noise Texture */}
    <div 
      className="absolute inset-0 opacity-40 mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cosmicNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cosmicNoise)' opacity='0.8'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px'
      }}
    />
  </div>
);