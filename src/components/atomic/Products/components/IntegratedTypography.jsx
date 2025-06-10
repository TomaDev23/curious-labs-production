import React from 'react';
import { motion, AnimatePresence } from '../../../../FramerProvider';

/**
 * Integrated Typography Component
 * Handles the floating text elements and context words for services page
 */
export const IntegratedTypography = ({ 
  isStellarActive, 
  stellarPhase, 
  showFloatingWords 
}) => (
  <div className="absolute inset-0 flex items-center justify-center z-[10]">
    {/* Ghost Text Background - subtle depth layer */}
    <motion.div
      className="absolute text-4xl lg:text-6xl font-bold text-center opacity-5 pointer-events-none"
      style={{
        background: 'linear-gradient(45deg, #FF6B35, #FF8C42)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'blur(2px)',
        transform: 'scale(1.2)',
        lineHeight: 1.2
      }}
      animate={{
        scale: [1.2, 1.25, 1.2],
        opacity: isStellarActive ? [0.02, 0.08, 0.02] : 0.05
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      We Care, We Create:<br/>
      Ethical, responsible products<br/>
      with humans at the core.
    </motion.div>
    
    {/* Floating Context Words */}
    <AnimatePresence>
      {showFloatingWords && ['Innovation', 'Ethics', 'Humanity', 'Purpose', 'Future', 'Trust'].map((word, i) => (
        <motion.div
          key={`context-${word}`}
          className="absolute text-sm lg:text-lg font-light text-white/40 pointer-events-none select-none"
          style={{
            top: `${15 + (i * 12) + Math.random() * 20}%`,
            left: `${10 + (i * 14) + Math.random() * 60}%`,
            fontWeight: 300,
            letterSpacing: '0.1em'
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: stellarPhase === 'breathing' ? [0.2, 0.6, 0.2] : [0.1, 0.3, 0.1],
            y: [0, -15, 0],
            scale: [0.8, 1.1, 0.8]
          }}
          exit={{ opacity: 0, scale: 0.6, y: -30 }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        >
          {word}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);