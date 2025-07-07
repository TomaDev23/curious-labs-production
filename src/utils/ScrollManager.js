import { isMobile } from './deviceTier';

// 🚨 CRITICAL FIX: Safe environment variable access for both HMR and SSR
const getEnvVar = (key, defaultValue = '') => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  // Fallback for browser environments where process is not defined
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }
  return defaultValue;
};

class MobileOptimizedScrollManager {
  constructor() {
    this.subscribers = new Map(); // Categorized subscribers
    this.scrollY = 0;
    this.ticking = false;
    this.isMobile = isMobile();
    this.throttleMs = this.isMobile ? 16 : 8; // 60fps mobile, 120fps desktop
    this._inited = false;
  }

  init() {
    if (typeof window !== "undefined" && !this._inited) {
      window.addEventListener("scroll", this.onScroll.bind(this), { passive: true });
      this._inited = true;
    }
  }

  // Batch updates by category to reduce re-renders
  notify(category = 'default') {
    const categorySubscribers = this.subscribers.get(category) || [];
    categorySubscribers.forEach(cb => {
      try {
        cb(this.scrollY);
      } catch (error) {
        console.warn(`ScrollManager callback error in category ${category}:`, error);
      }
    });
  }

  // Mobile-optimized scroll handler with batched updates
  onScroll() {
    this.scrollY = window.scrollY;
    if (!this.ticking) {
      requestAnimationFrame(() => {
        // Batch updates by priority
        this.notify('scene');  // Scene phase updates (highest priority)
        this.notify('lazy');   // Lazy loading updates (medium priority)
        if (getEnvVar('NODE_ENV') === 'development') {
          this.notify('debug'); // Debug updates (dev only)
        }
        this.notify('default'); // Other subscribers (lowest priority)
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  getScrollY() {
    return this.scrollY;
  }

  // Subscribe with category for batched updates
  subscribe(callback, category = 'default') {
    if (!this.subscribers.has(category)) {
      this.subscribers.set(category, []);
    }
    
    const categorySubscribers = this.subscribers.get(category);
    categorySubscribers.push(callback);
    
    return () => {
      const updatedSubscribers = categorySubscribers.filter(cb => cb !== callback);
      this.subscribers.set(category, updatedSubscribers);
    };
  }

  destroy() {
    if (typeof window !== 'undefined' && this._inited) {
      window.removeEventListener('scroll', this.onScroll.bind(this));
      this.subscribers.clear();
      this.scrollY = 0;
      this.ticking = false;
      this._inited = false;
    }
  }
}

// Create singleton instance
const scrollManager = new MobileOptimizedScrollManager();

// Export enhanced ScrollManager
export const ScrollManager = scrollManager;

// Auto-initialize
ScrollManager.init(); 