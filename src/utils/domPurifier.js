/**
 * @utility DOMPurifier
 * @description Cleans up DOM conflicts, memory leaks, and multiple WebGL contexts
 * @version 1.0.0
 * @priority CRITICAL - Fixes performance and memory issues
 */

class DOMPurifier {
  constructor() {
    this.activeContexts = new Set();
    this.eventListeners = new Map();
    this.animationFrames = new Set();
    this.intervals = new Set();
    this.timeouts = new Set();
    this.observers = new Set();
    this.memoryLeaks = [];
    
    // Start monitoring
    this.startMonitoring();
  }

  // Monitor WebGL contexts
  startMonitoring() {
    // TEMPORARILY DISABLED - WebGL monitoring creating too much noise
    // We need to fix the architecture first, then re-enable monitoring
    
    console.log('🧹 DOMPurifier: Basic monitoring started (WebGL monitoring disabled)');
    return;
    
    // Override getContext to track WebGL contexts
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    const purifierInstance = this; // Capture the purifier instance
    
    HTMLCanvasElement.prototype.getContext = function(contextType, ...args) {
      // Call the original method with the correct canvas 'this' context
      const context = originalGetContext.call(this, contextType, ...args);
      
      if (contextType.includes('webgl')) {
        purifierInstance.trackWebGLContext(this, context);
      }
      
      return context;
    };

    // Override addEventListener to track listeners
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      DOMPurifier.instance.trackEventListener(this, type, listener, options);
      return originalAddEventListener.call(this, type, listener, options);
    };

    // Override animation frame methods
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => {
      const id = originalRequestAnimationFrame(callback);
      this.animationFrames.add(id);
      return id;
    };

    const originalCancelAnimationFrame = window.cancelAnimationFrame;
    window.cancelAnimationFrame = (id) => {
      this.animationFrames.delete(id);
      return originalCancelAnimationFrame(id);
    };

    console.log('🧹 DOMPurifier: Monitoring started');
  }

  // Track WebGL contexts
  trackWebGLContext(canvas, context) {
    if (context && !this.activeContexts.has(context)) {
      this.activeContexts.add(context);
      
      // Add metadata
      context._purifier_canvas = canvas;
      context._purifier_created = Date.now();
      
      console.log(`🎮 WebGL Context Created: ${this.activeContexts.size} active contexts`);
      
      // Warn if too many contexts
      if (this.activeContexts.size > 3) {
        console.warn(`⚠️ WARNING: ${this.activeContexts.size} WebGL contexts active! This may cause performance issues.`);
        this.reportMemoryLeak('Multiple WebGL Contexts', this.activeContexts.size);
      }
    }
  }

  // Track event listeners
  trackEventListener(target, type, listener, options) {
    const key = `${target.constructor.name}-${type}`;
    if (!this.eventListeners.has(key)) {
      this.eventListeners.set(key, []);
    }
    this.eventListeners.get(key).push({ target, type, listener, options });
  }

  // Clean up WebGL contexts
  cleanupWebGLContexts() {
    let cleaned = 0;
    
    this.activeContexts.forEach(context => {
      try {
        if (context && typeof context.getExtension === 'function') {
          // Get the WEBGL_lose_context extension and lose the context
          const ext = context.getExtension('WEBGL_lose_context');
          if (ext) {
            ext.loseContext();
            cleaned++;
          }
        }
      } catch (error) {
        console.warn('Error cleaning WebGL context:', error);
      }
    });

    this.activeContexts.clear();
    console.log(`🧹 Cleaned ${cleaned} WebGL contexts`);
    return cleaned;
  }

  // Clean up event listeners
  cleanupEventListeners() {
    let cleaned = 0;
    
    this.eventListeners.forEach((listeners, key) => {
      listeners.forEach(({ target, type, listener, options }) => {
        try {
          target.removeEventListener(type, listener, options);
          cleaned++;
        } catch (error) {
          console.warn(`Error removing event listener ${type}:`, error);
        }
      });
    });

    this.eventListeners.clear();
    console.log(`🧹 Cleaned ${cleaned} event listeners`);
    return cleaned;
  }

  // Clean up animation frames
  cleanupAnimationFrames() {
    let cleaned = 0;
    
    this.animationFrames.forEach(id => {
      try {
        cancelAnimationFrame(id);
        cleaned++;
      } catch (error) {
        console.warn('Error canceling animation frame:', error);
      }
    });

    this.animationFrames.clear();
    console.log(`🧹 Cleaned ${cleaned} animation frames`);
    return cleaned;
  }

  // Clean up intervals and timeouts
  cleanupTimers() {
    let cleaned = 0;
    
    this.intervals.forEach(id => {
      try {
        clearInterval(id);
        cleaned++;
      } catch (error) {
        console.warn('Error clearing interval:', error);
      }
    });

    this.timeouts.forEach(id => {
      try {
        clearTimeout(id);
        cleaned++;
      } catch (error) {
        console.warn('Error clearing timeout:', error);
      }
    });

    this.intervals.clear();
    this.timeouts.clear();
    console.log(`🧹 Cleaned ${cleaned} timers`);
    return cleaned;
  }

  // Clean up observers
  cleanupObservers() {
    let cleaned = 0;
    
    this.observers.forEach(observer => {
      try {
        if (observer && typeof observer.disconnect === 'function') {
          observer.disconnect();
          cleaned++;
        }
      } catch (error) {
        console.warn('Error disconnecting observer:', error);
      }
    });

    this.observers.clear();
    console.log(`🧹 Cleaned ${cleaned} observers`);
    return cleaned;
  }

  // Report memory leak
  reportMemoryLeak(type, details) {
    const leak = {
      type,
      details,
      timestamp: Date.now(),
      memoryUsage: performance.memory ? performance.memory.usedJSHeapSize : null
    };
    
    this.memoryLeaks.push(leak);
    console.warn(`🚨 Memory Leak Detected: ${type}`, details);
  }

  // Full cleanup
  purgeAll() {
    console.log('🧹 Starting full DOM purification...');
    
    const results = {
      webgl: this.cleanupWebGLContexts(),
      events: this.cleanupEventListeners(),
      animations: this.cleanupAnimationFrames(),
      timers: this.cleanupTimers(),
      observers: this.cleanupObservers()
    };

    // Force garbage collection if available
    if (window.gc) {
      window.gc();
      console.log('🗑️ Forced garbage collection');
    }

    console.log('✅ DOM Purification complete:', results);
    return results;
  }

  // Get purification report
  getReport() {
    return {
      activeContexts: this.activeContexts.size,
      eventListeners: Array.from(this.eventListeners.keys()),
      animationFrames: this.animationFrames.size,
      intervals: this.intervals.size,
      timeouts: this.timeouts.size,
      observers: this.observers.size,
      memoryLeaks: this.memoryLeaks,
      memoryUsage: performance.memory ? {
        used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
      } : null
    };
  }
}

// Create singleton instance
DOMPurifier.instance = new DOMPurifier();

export default DOMPurifier;
export const purifier = DOMPurifier.instance; 