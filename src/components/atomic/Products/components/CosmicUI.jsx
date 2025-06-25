import React from 'react';
import { motion, AnimatePresence } from '../../../../FramerProvider';

/**
 * Cosmic UI Elements Component
 * Handles the UI overlays and indicators for the services page
 */
export const CosmicUI = ({ 
  isStellarActive, 
  stellarPhase, 
  stellarProgress, 
  canSkip, 
  typewriterComplete, 
  showStellarHint, 
  text 
}) => (
  <div className="absolute inset-0 pointer-events-none z-[20]">
    {/* Phase Indicator - Top Left */}
    <AnimatePresence>
      {isStellarActive && (
        <motion.div 
          className="absolute top-8 left-8 flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-2 h-2 rounded-full bg-orange-400"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-mono text-white/70 uppercase tracking-wider">
            {stellarPhase === 'materialization' && 'Initializing System...'}
            {stellarPhase === 'constellation' && 'Connecting Networks...'}
            {stellarPhase === 'breathing' && 'System Active...'}
            {stellarPhase === 'dissolution' && 'Transcending...'}
          </span>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Progress Visualization - Bottom Center */}
    <AnimatePresence>
      {isStellarActive && (
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <svg width="120" height="60" viewBox="0 0 120 60">
            {/* Background arc */}
            <path
              d="M 10,50 Q 60,10 110,50"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
            {/* Progress arc */}
            <motion.path
              d="M 10,50 Q 60,10 110,50"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="2"
              strokeDasharray="100"
              strokeLinecap="round"
              animate={{
                strokeDashoffset: 100 - (stellarProgress * 100),
                strokeOpacity: [0.6, 1, 0.6]
              }}
              transition={{
                strokeDashoffset: { duration: 0.5, ease: "easeOut" },
                strokeOpacity: { duration: 2, repeat: Infinity }
              }}
            />
            {/* Progress indicator */}
            <motion.circle
              key="progress-indicator"
              cx={Math.max(10, Math.min(110, 10 + ((stellarProgress || 0) * 100)))}
              cy={Math.max(10, Math.min(50, 50 - Math.sin((stellarProgress || 0) * Math.PI) * 40))}
              r={2}
              fill="#FF8C42"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
          
          {/* Progress percentage */}
          <div className="text-center mt-2">
            <motion.span 
              className="text-xs font-mono text-white/50"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.round(stellarProgress * 100)}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Mission Statement Enhancement - Only during typewriter */}
    <AnimatePresence>
      {!isStellarActive && text.length > 20 && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Subtle emphasis lines */}
          <motion.div
            className="absolute -left-8 top-0 w-1 h-full bg-gradient-to-b from-transparent via-orange-400 to-transparent"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleY: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -right-8 top-0 w-1 h-full bg-gradient-to-b from-transparent via-orange-400 to-transparent"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleY: [1.2, 0.8, 1.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>

    {/* Skip Hint - after typewriter completes */}
    <AnimatePresence>
      {!isStellarActive && canSkip && !typewriterComplete && (
        <motion.div
          className="absolute bottom-8 left-8 text-xs text-white/40 font-mono"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Press SPACE to skip →
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Stellar Activation Hint - after typewriter completes */}
    <AnimatePresence>
      {!isStellarActive && typewriterComplete && showStellarHint && (
        <motion.div
          className="absolute bottom-8 right-8 text-sm text-white/60 font-mono"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="flex items-center space-x-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Press ENTER for Stellar Message</span>
            <motion.div
              className="w-1 h-1 rounded-full bg-orange-400"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);