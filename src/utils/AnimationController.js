import { useAnimation } from '../FramerProvider';

/**
 * AnimationController.js
 * Central orchestration for animation frames across cosmic backgrounds
 * LEGIT-compatible animation orchestrator - implements Animation Schema v1.5
 */
import React from 'react';

// Performance thresholds
const FPS_TARGET = 60;
const FPS_MIN_THRESHOLD = 30;
const FPS_CRITICAL_THRESHOLD = 15;
const FPS_SAMPLE_SIZE = 10;

// Animation priorities
const PRIORITY = {
  CRITICAL: 0,   // Must run every frame (core positioning)
  HIGH: 1,       // Important visual effects (moon glow)
  MEDIUM: 2,     // Standard animations (star twinkle)
  LOW: 3,        // Background effects (nebula movement)
  VERY_LOW: 4    // Purely decorative effects (subtle color shifts)
};

class AnimationController {
  constructor() {
    // Animation subscribers with callbacks and priorities
    this.subscribers = new Map();
    
    // Unique ID counter for subscribers
    this.nextId = 1;
    
    // Performance tracking
    this.frameCount = 0;
    this.lastFpsUpdate = performance.now();
    this.fpsHistory = [];
    this.currentFps = FPS_TARGET;
    
    // Throttling state
    this.throttleLevel = 0; // 0 = none, 1 = light, 2 = medium, 3 = heavy
    this.framesToSkip = 0;
    this.currentFrameCount = 0;
    
    // Device capability detection
    this.deviceCapability = this.detectDeviceCapability();
    
    // Start animation loop
    this.running = true;
    this.animationFrameId = window.requestAnimationFrame(this.animationLoop.bind(this));
    
    // 🎯 MOBILE FRAME THROTTLING: Reduce frame rate on mobile
    this.isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    this.targetFPS = this.isMobile ? 15 : 60; // 15fps on mobile, 60fps on desktop
    this.frameInterval = 1000 / this.targetFPS;
    this.frameSkipCounter = 0;
  }
  
  /**
   * The main animation loop that orchestrates all subscriber callbacks
   */
  animationLoop(currentTime) {
    if (!this.running) return;

    // 🎯 MOBILE THROTTLING: Skip frames to reduce load
    if (this.isMobile) {
      const deltaTime = currentTime - this.lastTime;
      if (deltaTime < this.frameInterval) {
        this.animationFrameId = window.requestAnimationFrame(this.animationLoop.bind(this));
        return;
      }
      
      // Skip every 4th frame on mobile for additional throttling
      this.frameSkipCounter = (this.frameSkipCounter + 1) % 4;
      if (this.frameSkipCounter === 0) {
        this.animationFrameId = window.requestAnimationFrame(this.animationLoop.bind(this));
        return;
      }
    }

    this.lastTime = currentTime;

    // Call all subscriber callbacks
    this.subscribers.forEach(callback => {
      try {
        callback(currentTime);
      } catch (error) {
        console.warn('Animation callback error:', error);
        // Remove problematic callback to prevent future errors
        this.subscribers.delete(callback);
      }
    });

    // Continue the animation loop
    this.animationFrameId = window.requestAnimationFrame(this.animationLoop.bind(this));
  }
  
  /**
   * Update throttling based on FPS measurements
   */
  updateThrottling() {
    if (this.currentFps <= FPS_CRITICAL_THRESHOLD) {
      // Critical - heavy throttling
      this.throttleLevel = 3;
      this.framesToSkip = 3; // Render every 4th frame
    } else if (this.currentFps <= FPS_MIN_THRESHOLD) {
      // Poor - medium throttling
      this.throttleLevel = 2;
      this.framesToSkip = 2; // Render every 3rd frame
    } else if (this.currentFps <= FPS_TARGET * 0.75) {
      // Below target - light throttling
      this.throttleLevel = 1;
      this.framesToSkip = 1; // Render every 2nd frame
    } else {
      // Good performance - no throttling
      this.throttleLevel = 0;
      this.framesToSkip = 0; // Render every frame
    }
  }
  
  /**
   * Subscribe to animation frame updates
   * @param {Function} callback - Function to call on animation frame
   * @param {Number} priority - Animation priority level (use PRIORITY enum)
   * @returns {Number} Subscription ID for later unsubscribing
   */
  subscribe(callback, priority = PRIORITY.MEDIUM) {
    const id = this.nextId++;
    this.subscribers.set(id, {
      callback,
      priority,
      enabled: true
    });
    return id;
  }
  
  /**
   * Unsubscribe from animation frame updates
   * @param {Number} id - Subscription ID to remove
   */
  unsubscribe(id) {
    this.subscribers.delete(id);
  }
  
  /**
   * Pause a specific animation subscriber
   * @param {Number} id - Subscription ID to pause
   */
  pauseSubscriber(id) {
    const subscriber = this.subscribers.get(id);
    if (subscriber) {
      subscriber.enabled = false;
    }
  }
  
  /**
   * Resume a specific animation subscriber
   * @param {Number} id - Subscription ID to resume
   */
  resumeSubscriber(id) {
    const subscriber = this.subscribers.get(id);
    if (subscriber) {
      subscriber.enabled = true;
    }
  }
  
  /**
   * Get current performance metrics
   */
  getPerformanceMetrics() {
    return {
      fps: this.currentFps,
      throttleLevel: this.throttleLevel,
      deviceCapability: this.deviceCapability,
      activeSubscribers: Array.from(this.subscribers.entries())
        .filter(([_, sub]) => sub.enabled)
        .length,
      totalSubscribers: this.subscribers.size
    };
  }
  
  /**
   * Detect device capability for animation
   * Returns a capability score from 1-5 (1 = low-end mobile, 5 = high-end desktop)
   */
  detectDeviceCapability() {
    // Start with a base score
    let score = 3;
    
    // Check if running in a browser
    if (typeof window === 'undefined') return score;
    
    // Device type detection (mobile/tablet vs desktop)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) {
      score -= 1;
    }
    
    // Check for low-memory devices
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
      score -= 1;
    }
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      score -= 1;
    }
    
    // Check for high-DPI displays that might stress the GPU
    if (window.devicePixelRatio > 2) {
      score -= 1;
    }
    
    // Limit the score to range 1-5
    return Math.max(1, Math.min(5, score));
  }
  
  /**
   * Check if the device has capability for a given effect
   * @param {String} effectType - Type of effect ('particles', 'blur', 'perspective')
   * @returns {Boolean} Whether the effect should be enabled
   */
  canUseEffect(effectType) {
    switch (effectType) {
      case 'particles':
        return this.deviceCapability >= 2;
      case 'blur':
        return this.deviceCapability >= 3;
      case 'perspective':
        return this.deviceCapability >= 4;
      case 'shadows':
        return this.deviceCapability >= 2;
      case 'complex_gradients':
        return this.deviceCapability >= 3;
      default:
        return true;
    }
  }
  
  /**
   * Get recommended particle count based on device capability
   * @param {Number} baseCount - Base number of particles for high-end devices
   * @returns {Number} Adjusted particle count for current device
   */
  getParticleCountForDevice(baseCount) {
    const factors = [0.2, 0.4, 0.6, 0.8, 1.0];
    return Math.round(baseCount * factors[this.deviceCapability - 1]);
  }
  
  /**
   * Clean up and stop the animation controller
   */
  dispose() {
    this.running = false;
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
    this.subscribers.clear();
  }
}

// Create a singleton instance
const controller = typeof window !== 'undefined' ? new AnimationController() : null;

// Export the controller and priority constants
export const animationController = controller;
export { PRIORITY };

// Export helper hook for components
export const useAnimationFrames = (callback, priority = PRIORITY.MEDIUM) => {
  if (typeof window === 'undefined' || !controller) return null;
  
  // Create a subscription on mount and clean up on unmount
  React.useEffect(() => {
    const id = controller.subscribe(callback, priority);
    return () => controller.unsubscribe(id);
  }, [callback, priority]);
  
  return controller;
};

export default controller; 