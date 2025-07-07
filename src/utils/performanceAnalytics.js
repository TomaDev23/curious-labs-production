/**
 * @module performanceAnalytics
 * @description Production-ready performance monitoring for smart lazy loading
 * @version 1.1.0 - PRODUCTION OPTIMIZED
 * @author CuriousLabs
 * 
 * Features:
 * - Core Web Vitals tracking
 * - Component load time monitoring
 * - Lazy loading performance metrics
 * - Memory usage tracking
 * - Production-safe logging
 */

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

class PerformanceAnalytics {
  constructor() {
    // 🚨 PRODUCTION OPTIMIZATION: Complete debug elimination in production builds
    const IS_PRODUCTION = getEnvVar('NODE_ENV') === 'production';
    const IS_DEBUG_BUILD = getEnvVar('REACT_APP_DEBUG') === 'true';
    
    this.isDebugMode = false;
    this.metrics = new Map();
    this.componentTimings = new Map();
    this.lazyLoadEvents = [];
    this.isProduction = IS_PRODUCTION;
    this.isEnabled = this.isProduction || localStorage.getItem('debug-perf') === 'true';
    
    // 🚨 PRODUCTION OPTIMIZATION: Skip debug initialization in production
    if (!IS_PRODUCTION || IS_DEBUG_BUILD) {
      this.initializeDebugMode();
    }
    
    if (this.isEnabled) {
      this.initializeCoreWebVitals();
      this.initializeNavigationTiming();
    }
  }

  initializeDebugMode() {
    // 🚨 PRODUCTION OPTIMIZATION: Complete bypass in production
    if (getEnvVar('NODE_ENV') === 'production' && getEnvVar('REACT_APP_DEBUG') !== 'true') {
      return;
    }
    
    // Check URL params for debug mode
    const urlParams = new URLSearchParams(window.location.search);
    const urlDebug = urlParams.get('perf-debug') === 'true';
    
    // Check localStorage for persistent debug mode
    const localDebug = localStorage.getItem('performance-debug') === 'true';
    
    // Check environment variable for development
    const envDebug = getEnvVar('NODE_ENV') === 'development';
    
    // Only enable debug mode if explicitly requested
    this.isDebugMode = urlDebug || localDebug;
    
    // 🎯 PRODUCTION CLEANUP: Only log in development
    if (this.isDebugMode && getEnvVar('NODE_ENV') === 'development') {
      console.log('📊 Performance Analytics Debug Mode: ENABLED');
      console.log('💡 Use performanceAnalytics.setDebug(false) to disable logging');
    }
  }

  setDebug(enabled) {
    // 🚨 PRODUCTION OPTIMIZATION: Skip debug mode changes in production
    if (getEnvVar('NODE_ENV') === 'production' && getEnvVar('REACT_APP_DEBUG') !== 'true') {
      return;
    }
    
    this.isDebugMode = enabled;
    localStorage.setItem('performance-debug', enabled.toString());
    // 🎯 PRODUCTION CLEANUP: Only log in development
    if (getEnvVar('NODE_ENV') === 'development') {
      console.log(`📊 Performance Analytics Debug: ${enabled ? 'ENABLED' : 'DISABLED'}`);
    }
  }

  // Initialize Core Web Vitals tracking
  initializeCoreWebVitals() {
    if (typeof window === 'undefined') return;

    // Track LCP (Largest Contentful Paint)
    this.observeMetric('largest-contentful-paint', (entry) => {
      this.recordMetric('LCP', entry.startTime, {
        element: entry.element?.tagName,
        url: entry.url
      });
    });

    // Track FID (First Input Delay) 
    this.observeMetric('first-input', (entry) => {
      this.recordMetric('FID', entry.processingStart - entry.startTime, {
        eventType: entry.name
      });
    });

    // Track CLS (Cumulative Layout Shift)
    this.observeMetric('layout-shift', (entry) => {
      if (!entry.hadRecentInput) {
        this.recordMetric('CLS', entry.value, {
          sources: entry.sources?.map(s => s.node?.nodeName)
        });
      }
    });
  }

  // Track navigation timing
  initializeNavigationTiming() {
    if (typeof window === 'undefined' || !window.performance) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          this.recordMetric('DOMContentLoaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
          this.recordMetric('LoadComplete', navigation.loadEventEnd - navigation.loadEventStart);
          this.recordMetric('TTFB', navigation.responseStart - navigation.requestStart);
        }
      }, 0);
    });
  }

  // Generic performance observer
  observeMetric(type, callback) {
    try {
      if (typeof window === 'undefined' || !window.PerformanceObserver) return;
      
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(callback);
      });
      
      observer.observe({ type, buffered: true });
    } catch (error) {
      // Silently fail in production
      if (!this.isProduction) {
        console.warn(`Failed to observe ${type}:`, error);
      }
    }
  }

  // Record a performance metric
  recordMetric(name, value, metadata = {}) {
    const timestamp = Date.now();
    const metric = {
      name,
      value: Math.round(value * 100) / 100, // Round to 2 decimal places
      timestamp,
      metadata,
      url: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
    };

    this.metrics.set(`${name}-${timestamp}`, metric);

    // 🎯 PRODUCTION CLEANUP: Only log in debug mode and development
    if (this.isDebugMode && getEnvVar('NODE_ENV') === 'development') {
      console.log(`📊 ${name}: ${typeof value === 'number' ? value.toFixed(2) : value}ms`, metadata);
    }

    // Send to analytics in production (you can integrate with your analytics service)
    if (this.isProduction && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        custom_map: metadata
      });
    }

    return metric;
  }

  // Track component lazy loading
  trackLazyLoad(componentName, startTime, endTime, metadata = {}) {
    const loadTime = endTime - startTime;
    const event = {
      componentName,
      loadTime: Math.round(loadTime * 100) / 100,
      startTime,
      endTime,
      timestamp: Date.now(),
      metadata
    };

    this.lazyLoadEvents.push(event);
    this.componentTimings.set(componentName, event);

    this.recordMetric(`LazyLoad-${componentName}`, loadTime, {
      strategy: metadata.strategy,
      priority: metadata.priority,
      bundleSize: metadata.bundleSize
    });
  }

  // Track viewport entry for lazy loading
  trackViewportEntry(componentName, strategy, metadata = {}) {
    this.recordMetric(`ViewportEntry-${componentName}`, Date.now(), {
      strategy,
      rootMargin: metadata.rootMargin,
      threshold: metadata.threshold
    });
  }

  // Get performance summary
  getPerformanceSummary() {
    const summary = {
      coreWebVitals: this.getCoreWebVitals(),
      lazyLoadingStats: this.getLazyLoadingStats(),
      componentTimings: Object.fromEntries(this.componentTimings),
      totalMetrics: this.metrics.size,
      timestamp: Date.now()
    };

    return summary;
  }

  // Get Core Web Vitals summary
  getCoreWebVitals() {
    const vitals = {};
    const vitalTypes = ['LCP', 'FID', 'CLS'];
    
    vitalTypes.forEach(type => {
      const entries = Array.from(this.metrics.values())
        .filter(m => m.name === type)
        .sort((a, b) => b.timestamp - a.timestamp);
      
      if (entries.length > 0) {
        vitals[type] = {
          value: entries[0].value,
          rating: this.getRating(type, entries[0].value),
          timestamp: entries[0].timestamp
        };
      }
    });

    return vitals;
  }

  // Get lazy loading statistics  
  getLazyLoadingStats() {
    if (this.lazyLoadEvents.length === 0) return null;

    const loadTimes = this.lazyLoadEvents.map(e => e.loadTime);
    const avgLoadTime = loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length;
    
    return {
      totalComponents: this.lazyLoadEvents.length,
      averageLoadTime: Math.round(avgLoadTime * 100) / 100,
      fastestLoad: Math.min(...loadTimes),
      slowestLoad: Math.max(...loadTimes),
      componentsLoaded: this.lazyLoadEvents.map(e => e.componentName)
    };
  }

  // Rate Core Web Vitals (Google thresholds)
  getRating(metric, value) {
    const thresholds = {
      LCP: { good: 2500, needsImprovement: 4000 },
      FID: { good: 100, needsImprovement: 300 },
      CLS: { good: 0.1, needsImprovement: 0.25 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  }

  // Clear old metrics (memory management)
  clearOldMetrics(maxAge = 300000) { // 5 minutes
    const cutoff = Date.now() - maxAge;
    for (const [key, metric] of this.metrics.entries()) {
      if (metric.timestamp < cutoff) {
        this.metrics.delete(key);
      }
    }
  }

  // Enable debug mode
  enableDebug() {
    // 🚨 PRODUCTION OPTIMIZATION: Skip debug enabling in production
    if (getEnvVar('NODE_ENV') === 'production' && getEnvVar('REACT_APP_DEBUG') !== 'true') {
      return;
    }
    
    this.setDebug(true);
    if (typeof window !== 'undefined') {
      window.performanceAnalytics = this;
    }
  }

  // Disable debug mode
  disableDebug() {
    // 🚨 PRODUCTION OPTIMIZATION: Skip debug disabling in production
    if (getEnvVar('NODE_ENV') === 'production' && getEnvVar('REACT_APP_DEBUG') !== 'true') {
      return;
    }
    
    this.setDebug(false);
    if (typeof window !== 'undefined') {
      delete window.performanceAnalytics;
    }
  }

  // Export data for analysis
  exportData() {
    return {
      metrics: Object.fromEntries(this.metrics),
      componentTimings: Object.fromEntries(this.componentTimings),
      lazyLoadEvents: this.lazyLoadEvents,
      summary: this.getPerformanceSummary()
    };
  }
}

// Create singleton instance
const performanceAnalytics = new PerformanceAnalytics();

// Global access for debugging
if (typeof window !== 'undefined') {
  window.perfAnalytics = performanceAnalytics;
}

export default performanceAnalytics; 