/**
 * @file GlobalFrameManager.js
 * @description Centralized frame management to prevent mobile crashes
 * @purpose Replace scattered useFrame calls with single orchestrated loop
 */

class GlobalFrameManager {
  constructor() {
    this.subscribers = new Map();
    this.isRunning = false;
    this.frameId = null;
    this.lastTime = 0;
    
    // Mobile optimization
    this.isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    this.targetFPS = this.isMobile ? 15 : 60;
    this.frameInterval = 1000 / this.targetFPS;
  }
  
  subscribe(id, callback, priority = 'normal') {
    this.subscribers.set(id, { callback, priority });
    
    if (!this.isRunning) {
      this.start();
    }
    
    return () => this.unsubscribe(id);
  }
  
  unsubscribe(id) {
    this.subscribers.delete(id);
    
    if (this.subscribers.size === 0) {
      this.stop();
    }
  }
  
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.frameId = requestAnimationFrame(this.loop.bind(this));
  }
  
  stop() {
    this.isRunning = false;
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }
  
  loop(currentTime) {
    if (!this.isRunning) return;
    
    // Mobile throttling
    if (currentTime - this.lastTime < this.frameInterval) {
      this.frameId = requestAnimationFrame(this.loop.bind(this));
      return;
    }
    
    this.lastTime = currentTime;
    
    // Execute subscribers by priority
    const priorityOrder = ['critical', 'high', 'normal', 'low'];
    
    priorityOrder.forEach(priority => {
      this.subscribers.forEach(({ callback, priority: subPriority }) => {
        if (subPriority === priority) {
          try {
            callback(currentTime);
          } catch (error) {
            console.warn(`Frame callback error for priority ${priority}:`, error);
          }
        }
      });
    });
    
    this.frameId = requestAnimationFrame(this.loop.bind(this));
  }
  
  destroy() {
    this.stop();
    this.subscribers.clear();
  }
}

// Global singleton
const globalFrameManager = new GlobalFrameManager();

export default globalFrameManager;

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    globalFrameManager.destroy();
  });
} 