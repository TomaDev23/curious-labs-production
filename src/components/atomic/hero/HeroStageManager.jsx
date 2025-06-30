// @file src/components/atomic/hero/HeroStageManager.jsx
// @description Scroll-based controller for Cosmic Arrival hero scene

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollManager } from '../../../utils/ScrollManager';
import { isMobile } from '../../../utils/deviceTier';

/**
 * HeroStageManager - Orchestrates hero section animations and transitions
 * Manages stage progression, timing, and visual effects
 */
const HeroStageManager = ({ children, onStageChange, enableParallax = true }) => {
  // 🚨 CL-2: Early return on mobile to silence scroll listeners
  if (isMobile()) {
    return (
      <div className="hero-stage-manager mobile-simplified">
        {children}
      </div>
    );
  }

  const [scrollY, setScrollY] = useState(0);
  const [currentStage, setCurrentStage] = useState('intro');
  const [stageProgress, setStageProgress] = useState(0);
  const containerRef = useRef(null);

  // Stage definitions
  const stages = {
    intro: { start: 0, end: 200 },
    reveal: { start: 200, end: 600 },
    interact: { start: 600, end: 1000 },
    transition: { start: 1000, end: 1400 }
  };

  // Subscribe to ScrollManager
  useEffect(() => {
    const unsubscribe = ScrollManager.subscribe((newScrollY) => {
      setScrollY(newScrollY);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Calculate current stage based on scroll position
    let newStage = 'intro';
    let progress = 0;

    Object.entries(stages).forEach(([stageName, stageData]) => {
      if (scrollY >= stageData.start && scrollY < stageData.end) {
        newStage = stageName;
        progress = (scrollY - stageData.start) / (stageData.end - stageData.start);
      }
    });

    if (newStage !== currentStage) {
      setCurrentStage(newStage);
      onStageChange?.(newStage);
    }

    setStageProgress(progress);
  }, [scrollY, currentStage, onStageChange]);

  // Parallax transform for container
  const parallaxTransform = enableParallax 
    ? `translateY(${scrollY * 0.5}px)` 
    : 'translateY(0px)';

  return (
    <motion.div
      ref={containerRef}
      className="hero-stage-manager"
      style={{
        transform: parallaxTransform,
        willChange: 'transform'
      }}
      data-stage={currentStage}
      data-progress={stageProgress}
    >
      <AnimatePresence mode="wait">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              key: `stage-${currentStage}-${index}`,
              currentStage,
              stageProgress,
              scrollY
            });
          }
          return child;
        })}
      </AnimatePresence>

      {/* Stage indicator (debug) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
          Stage: {currentStage} ({Math.round(stageProgress * 100)}%)
          <br />
          Scroll: {scrollY}px
        </div>
      )}
    </motion.div>
  );
};

export default HeroStageManager; 