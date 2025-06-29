/**
 * @file SharedIO.js
 * @description Shared IntersectionObserver utility for MissionAtomic crash-hunt
 * @purpose Consolidate multiple observers to reduce iOS mobile crashes
 * @version 1.0.0
 */

class SharedIntersectionObserver {
  constructor() {
    this.observers = new Map();
    this.callbacks = new Map();
    this.elements = new WeakMap();
  }

  /**
   * Get or create a shared observer with specific options
   * @param {Object} options - IntersectionObserver options
   * @returns {IntersectionObserver} - Shared observer instance
   */
  getIO(options = {}) {
    const key = JSON.stringify({
      rootMargin: options.rootMargin || '50px',
      threshold: options.threshold || 0.1,
      root: options.root || null
    });

    if (!this.observers.has(key)) {
      const observer = new IntersectionObserver(
        (entries) => this.handleIntersection(key, entries),
        {
          rootMargin: '50px',
          threshold: 0.1,
          ...options
        }
      );

      this.observers.set(key, observer);
      this.callbacks.set(key, new Map());
    }

    return {
      observer: this.observers.get(key),
      key
    };
  }

  /**
   * Subscribe an element to intersection observation
   * @param {Element} element - DOM element to observe
   * @param {Function} callback - Callback function for intersection changes
   * @param {Object} options - Observer options
   * @returns {Function} - Unsubscribe function
   */
  observe(element, callback, options = {}) {
    if (!element || typeof callback !== 'function') {
      console.warn('[SharedIO] Invalid element or callback provided');
      return () => {};
    }

    const { observer, key } = this.getIO(options);
    const elementId = this.generateElementId(element);
    
    // Store callback for this element
    const callbacks = this.callbacks.get(key);
    callbacks.set(elementId, callback);
    
    // Store element reference
    this.elements.set(element, { key, elementId });
    
    // Start observing
    observer.observe(element);

    // Return unsubscribe function
    return () => this.unobserve(element);
  }

  /**
   * Unsubscribe an element from observation
   * @param {Element} element - DOM element to stop observing
   */
  unobserve(element) {
    const elementData = this.elements.get(element);
    if (!elementData) return;

    const { key, elementId } = elementData;
    const observer = this.observers.get(key);
    const callbacks = this.callbacks.get(key);

    if (observer) {
      observer.unobserve(element);
    }

    if (callbacks) {
      callbacks.delete(elementId);
    }

    this.elements.delete(element);
  }

  /**
   * Handle intersection events and route to appropriate callbacks
   * @param {string} key - Observer key
   * @param {IntersectionObserverEntry[]} entries - Intersection entries
   */
  handleIntersection(key, entries) {
    const callbacks = this.callbacks.get(key);
    if (!callbacks) return;

    entries.forEach(entry => {
      const elementId = this.generateElementId(entry.target);
      const callback = callbacks.get(elementId);
      
      if (callback) {
        try {
          callback(entry);
        } catch (error) {
          console.warn('[SharedIO] Callback error:', error);
        }
      }
    });
  }

  /**
   * Generate unique ID for DOM element
   * @param {Element} element - DOM element
   * @returns {string} - Unique element identifier
   */
  generateElementId(element) {
    if (!element._sharedIOId) {
      element._sharedIOId = `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    return element._sharedIOId;
  }

  /**
   * Get statistics about current observers
   * @returns {Object} - Observer statistics
   */
  getStats() {
    return {
      totalObservers: this.observers.size,
      totalCallbacks: Array.from(this.callbacks.values())
        .reduce((sum, callbacks) => sum + callbacks.size, 0),
      observedElements: this.elements.size || 0
    };
  }

  /**
   * Cleanup all observers and callbacks
   */
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.callbacks.clear();
    // WeakMap will be garbage collected automatically
  }
}

// Create singleton instance
const sharedIO = new SharedIntersectionObserver();

export default sharedIO;

// Export convenience methods
export const getIO = (options) => sharedIO.getIO(options);
export const observe = (element, callback, options) => sharedIO.observe(element, callback, options);
export const unobserve = (element) => sharedIO.unobserve(element);
export const cleanup = () => sharedIO.cleanup();
export const getStats = () => sharedIO.getStats(); 