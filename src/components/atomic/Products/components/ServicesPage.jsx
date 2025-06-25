import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from '../../../../FramerProvider';
import { StellarMessageComponent } from '../../../StellarMessageGrok';
import { ServicesCosmicEnvironment } from './ServicesCosmicEnvironment';
import { IntegratedTypography } from './IntegratedTypography';
import { CosmicUI } from './CosmicUI';
import { useDeviceCapabilities } from '../../../../hooks/useBreakpoint';

/**
 * Services Page Component
 * Handles the "Stellar Message" experience with typewriter effect and cosmic UI
 */
export const ServicesPage = ({ onScrollRelease }) => {
  const [text, setText] = useState('');
  const [isStellarActive, setIsStellarActive] = useState(false);
  const [stellarPhase, setStellarPhase] = useState('materialization');
  const [stellarProgress, setStellarProgress] = useState(0);
  const [showFloatingWords, setShowFloatingWords] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showStellarHint, setShowStellarHint] = useState(false);
  const fullText = 'We Care, We Create: Ethical, responsible products with humans at the core.';

  // Listen for stellar message activation and phase updates
  useEffect(() => {
    const handleStellarActivation = (e) => {
      if (e.detail.pageIndex === 2) {
        setIsStellarActive(true);
        setText(''); // Clear the text when stellar is active
        setShowFloatingWords(true);
        setShowStellarHint(false);
      } else {
        setIsStellarActive(false);
        setShowFloatingWords(false);
      }
    };

    // Listen for stellar phase updates
    const handleStellarPhase = (e) => {
      if (e.detail.phase) {
        setStellarPhase(e.detail.phase);
        setStellarProgress(e.detail.progress || 0);
      }
    };

    // Listen for stellar sequence completion
    const handleStellarComplete = () => {
      if (isStellarActive) {
        console.log('🌌 Stellar sequence completed in ServicesPage');
        setTimeout(() => {
          onScrollRelease();
        }, 1000); // Brief delay before releasing scroll
      }
    };

    // Simple pause control for StellarMessage
    const handleKeyPress = (e) => {
      if (isStellarActive && e.key === 'p') {
        e.preventDefault();
        // Find and pause the stellar message
        const stellarButtons = document.querySelectorAll('button');
        const pauseButton = Array.from(stellarButtons).find(btn => 
          btn.textContent.includes('Pause') || btn.textContent.includes('Resume')
        );
        if (pauseButton) {
          pauseButton.click();
          console.log('🎬 Stellar message paused/resumed');
        }
      }
    };

    window.addEventListener('horizontalPageChange', handleStellarActivation);
    window.addEventListener('stellarPhaseUpdate', handleStellarPhase);
    window.addEventListener('stellarSequenceComplete', handleStellarComplete);
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('horizontalPageChange', handleStellarActivation);
      window.removeEventListener('stellarPhaseUpdate', handleStellarPhase);
      window.removeEventListener('stellarSequenceComplete', handleStellarComplete);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isStellarActive, onScrollRelease]);

  // Enhanced typewriter effect with skip functionality
  useEffect(() => {
    // Only run typewriter if stellar is not active
    if (isStellarActive) return;
    
    // ✅ SURGICAL FIX: Prevent infinite recursion by tracking completion state
    if (typewriterComplete) return;
    
    // FIXED: Replace setInterval with requestAnimationFrame to prevent DOM.resolveNode errors
    let index = 0;
    let frameId;
    let lastTime = 0;
    let completed = false; // Local completion flag to prevent race conditions
    
    const typewriter = (currentTime) => {
      // Early exit if already completed
      if (completed) return;
      
      // Throttle to ~15fps (67ms intervals) instead of 20fps to reduce DOM stress
      if (currentTime - lastTime >= 67) {
        setText(fullText.slice(0, index));
        index++;
        
        // Enable skip after 25% of text is shown
        if (index >= Math.floor(fullText.length * 0.25) && !canSkip) {
          setCanSkip(true);
        }
        
        if (index > fullText.length) {
          completed = true; // Set local flag first
          setTypewriterComplete(true);
          setShowStellarHint(true);
          setShowFloatingWords(true);
          return; // Exit animation loop
        }
        
        lastTime = currentTime;
      }
      
      // Only continue animation if not completed
      if (!completed) {
        frameId = requestAnimationFrame(typewriter);
      }
    };
    
    frameId = requestAnimationFrame(typewriter);
    
    return () => {
      completed = true; // Ensure cleanup sets completion flag
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isStellarActive, typewriterComplete, fullText.length]); // ✅ FIXED: Added missing typewriterComplete dependency

  // Keyboard controls for skip and stellar activation
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Skip typewriter if allowed
      if (canSkip && !typewriterComplete && ['Space', 'Enter', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
        setText(fullText);
        setTypewriterComplete(true);
        setShowStellarHint(true);
        setShowFloatingWords(true);
        return;
      }
      
      // Activate stellar message after typewriter completes
      if (typewriterComplete && e.code === 'Enter') {
        e.preventDefault();
        // The main component handles page changes, no need to dispatch here
        // window.dispatchEvent(new CustomEvent('horizontalPageChange', {
        //   detail: { pageIndex: 2 }
        // }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canSkip, typewriterComplete, fullText]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Cosmic Environment */}
      <ServicesCosmicEnvironment />
      
      {/* Integrated Typography Layer */}
      <IntegratedTypography 
        isStellarActive={isStellarActive}
        stellarPhase={stellarPhase}
        showFloatingWords={showFloatingWords}
      />
      
      {/* Enhanced Particles - hide when stellar is active */}
      {!isStellarActive && Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`cosmic-particle-${i}`}
          className="absolute rounded-full z-[5]"
          style={{ 
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            backgroundColor: i % 3 === 0 ? '#FF6B35' : i % 3 === 1 ? '#FF8C42' : '#ffffff',
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${Math.random() * 8 + 4}px currentColor`
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{ 
            duration: 3 + Math.random() * 4, 
            repeat: Infinity, 
            repeatDelay: Math.random() * 2,
            ease: "easeInOut" 
          }}
        />
      ))}
      
      {/* Shooting Star Effects - hide when stellar is active */}
      {!isStellarActive && Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute w-px h-20 z-[5]"
          style={{
            background: `linear-gradient(to bottom, #FF6B35, transparent)`,
            top: `${Math.random() * 40}%`,
            left: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)'
          }}
          animate={{
            x: ['0vw', '100vw'],
            y: ['0vh', '50vh'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 8 + 6,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Main Text Reveal - hide when stellar is active */}
      {!isStellarActive && (
        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-white text-center max-w-2xl z-[15] relative"
          style={{ 
            textShadow: '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 140, 66, 0.3)',
            lineHeight: 1.3
          }}
        >
          {text}
          <motion.span 
            className="inline-block ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ color: '#FF6B35' }}
          >
            |
          </motion.span>
        </motion.h2>
      )}

      {/* Cosmic UI Elements */}
      <CosmicUI 
        isStellarActive={isStellarActive}
        stellarPhase={stellarPhase}
        stellarProgress={stellarProgress}
        canSkip={canSkip}
        typewriterComplete={typewriterComplete}
        showStellarHint={showStellarHint}
        text={text}
      />

      {/* StellarMessage Component - ONLY active on third page */}
      {isStellarActive && (
        <div className="absolute inset-0 z-[50]">
          <StellarMessageComponent />
        </div>
      )}
    </div>
  );
};