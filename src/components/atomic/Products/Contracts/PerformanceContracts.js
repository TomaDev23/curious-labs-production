/**
 * PERFORMANCE CONTRACTS & OPTIMIZATION STRATEGIES
 * 
 * Defines performance monitoring, throttling rules, and optimization
 * strategies for the Products component system.
 */

// ==========================================
// PERFORMANCE THRESHOLDS
// ==========================================

/**
 * Performance thresholds for different device capabilities
 */
export const PERFORMANCE_THRESHOLDS = {
  // Frame rate thresholds
  HIGH_REFRESH_RATE: 120, // fps
  STANDARD_REFRESH_RATE: 60, // fps
  LOW_REFRESH_RATE: 30, // fps
  
  // Memory thresholds (in MB)
  HIGH_MEMORY: 8192,
  MEDIUM_MEMORY: 4096,
  LOW_MEMORY: 2048,
  
  // CPU performance indicators
  HIGH_PERFORMANCE: 8, // logical cores
  MEDIUM_PERFORMANCE: 4,
  LOW_PERFORMANCE: 2,
  
  // Animation complexity levels
  FULL_ANIMATIONS: 'full',
  REDUCED_ANIMATIONS: 'reduced',
  MINIMAL_ANIMATIONS: 'minimal',
  NO_ANIMATIONS: 'none'
};

/**
 * Performance budget limits
 */
export const PERFORMANCE_BUDGETS = {
  // Animation limits
  MAX_CONCURRENT_ANIMATIONS: {
    highEnd: 20,
    midRange: 12,
    lowEnd: 6
  },
  
  // Particle system limits
  MAX_PARTICLES: {
    highEnd: 50,
    midRange: 25,
    lowEnd: 10
  },
  
  // DOM update frequency (ms)
  ANIMATION_FRAME_BUDGET: {
    highEnd: 16, // 60fps
    midRange: 33, // 30fps
    lowEnd: 66   // 15fps
  },
  
  // Memory usage targets (MB)
  MEMORY_BUDGET: {
    components: 50,
    animations: 25,
    imageCache: 100,
    total: 200
  }
};

// ==========================================
// DEVICE CAPABILITY DETECTION
// ==========================================

/**
 * Device capability assessment schema
 */
export const DEVICE_CAPABILITY_SCHEMA = {
  // Hardware detection
  hardwareLevel: {
    type: 'string',
    enum: ['high', 'medium', 'low'],
    description: 'Overall hardware performance level'
  },
  
  // Display capabilities
  screenSize: {
    type: 'object',
    properties: {
      width: { type: 'number' },
      height: { type: 'number' },
      pixelRatio: { type: 'number' }
    },
    description: 'Screen dimensions and pixel density'
  },
  
  refreshRate: {
    type: 'number',
    min: 30,
    max: 240,
    description: 'Display refresh rate in Hz'
  },
  
  // Input capabilities
  supportsHover: {
    type: 'boolean',
    description: 'Whether device supports hover interactions'
  },
  
  supportsPrecisePointer: {
    type: 'boolean',
    description: 'Whether device has precise pointing (mouse)'
  },
  
  supportsTouch: {
    type: 'boolean',
    description: 'Whether device supports touch input'
  },
  
  // User preferences
  prefersReducedMotion: {
    type: 'boolean',
    description: 'User prefers reduced motion animations'
  },
  
  prefersHighContrast: {
    type: 'boolean',
    description: 'User prefers high contrast visuals'
  },
  
  // Performance indicators
  estimatedMemory: {
    type: 'number',
    description: 'Estimated available memory in MB'
  },
  
  estimatedCores: {
    type: 'number',
    description: 'Estimated CPU cores'
  },
  
  connectionSpeed: {
    type: 'string',
    enum: ['slow-2g', '2g', '3g', '4g', 'wifi', 'unknown'],
    description: 'Network connection speed indicator'
  }
};

// ==========================================
// THROTTLING STRATEGIES
// ==========================================

/**
 * Animation throttling configurations
 */
export const THROTTLING_CONFIGS = {
  // Full performance - no throttling
  full: {
    animationScale: 1.0,
    particleCount: 1.0,
    complexityLevel: 'high',
    frameRateTarget: 60,
    enableBlur: true,
    enableShadows: true,
    enableGradients: true,
    enableParticles: true,
    enableComplexAnimations: true
  },
  
  // Reduced performance - light throttling
  reduced: {
    animationScale: 0.8,
    particleCount: 0.6,
    complexityLevel: 'medium',
    frameRateTarget: 45,
    enableBlur: true,
    enableShadows: false,
    enableGradients: true,
    enableParticles: true,
    enableComplexAnimations: false
  },
  
  // Minimal performance - heavy throttling
  minimal: {
    animationScale: 0.5,
    particleCount: 0.3,
    complexityLevel: 'low',
    frameRateTarget: 30,
    enableBlur: false,
    enableShadows: false,
    enableGradients: false,
    enableParticles: false,
    enableComplexAnimations: false
  },
  
  // No animations - maximum performance
  none: {
    animationScale: 0,
    particleCount: 0,
    complexityLevel: 'none',
    frameRateTarget: 15,
    enableBlur: false,
    enableShadows: false,
    enableGradients: false,
    enableParticles: false,
    enableComplexAnimations: false
  }
};

// ==========================================
// COMPONENT PERFORMANCE RULES
// ==========================================

/**
 * Performance rules for specific components
 */
export const COMPONENT_PERFORMANCE_RULES = {
  AegisPage: {
    // Architecture diagram complexity
    diagramComplexity: {
      high: 'full-interactive',
      medium: 'simplified-interactive', 
      low: 'static-image'
    },
    
    // Particle system rules
    particles: {
      high: 15,
      medium: 8,
      low: 3
    },
    
    // Animation duration scaling
    animationDuration: {
      high: 1.0,
      medium: 0.8,
      low: 0.6
    }
  },
  
  ProductsPage: {
    // Product card animation complexity
    cardAnimations: {
      high: 'full-hover-effects',
      medium: 'simple-hover-effects',
      low: 'no-hover-effects'
    },
    
    // Grid layout optimization
    gridOptimization: {
      high: 'css-grid-with-animations',
      medium: 'css-grid-reduced-animations',
      low: 'flexbox-static'
    },
    
    // Modal performance
    modalComplexity: {
      high: 'full-backdrop-blur',
      medium: 'simple-backdrop',
      low: 'solid-backdrop'
    }
  },
  
  ServicesPage: {
    // Typewriter effect optimization
    typewriterSpeed: {
      high: 50, // ms per character
      medium: 75,
      low: 100
    },
    
    // Stellar message complexity
    stellarComplexity: {
      high: 'full-effects',
      medium: 'reduced-effects',
      low: 'text-only'
    },
    
    // Cosmic environment layers
    cosmicLayers: {
      high: 5,
      medium: 3,
      low: 1
    }
  }
};

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

/**
 * Performance metrics to track
 */
export const PERFORMANCE_METRICS = {
  // Frame rate monitoring
  frameRate: {
    target: 60,
    warning: 45,
    critical: 30,
    measurement: 'fps'
  },
  
  // Memory usage
  memoryUsage: {
    target: 100, // MB
    warning: 150,
    critical: 200,
    measurement: 'MB'
  },
  
  // Animation performance
  animationDrops: {
    target: 0,
    warning: 5, // per minute
    critical: 15,
    measurement: 'count/min'
  },
  
  // DOM performance
  domNodes: {
    target: 1000,
    warning: 2000,
    critical: 5000,
    measurement: 'count'
  },
  
  // Render time
  renderTime: {
    target: 16, // ms (60fps)
    warning: 33, // 30fps
    critical: 66, // 15fps
    measurement: 'ms'
  }
};

/**
 * Performance monitor class
 */
export class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.isMonitoring = false;
    this.frameCount = 0;
    this.lastFrameTime = performance.now();
    this.fpsHistory = [];
    this.memoryHistory = [];
  }
  
  /**
   * Start performance monitoring
   */
  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.frameCount = 0;
    this.lastFrameTime = performance.now();
    
    // Start FPS monitoring
    this.monitorFrameRate();
    
    // Start memory monitoring if available
    if ('memory' in performance) {
      this.monitorMemoryUsage();
    }
    
    // Monitor DOM complexity
    this.monitorDOMComplexity();
    
    console.log('🔍 Performance monitoring started');
  }
  
  /**
   * Stop performance monitoring
   */
  stopMonitoring() {
    this.isMonitoring = false;
    this.observers.forEach(observer => observer.disconnect?.());
    this.observers = [];
    
    console.log('🔍 Performance monitoring stopped');
  }
  
  /**
   * Monitor frame rate
   */
  monitorFrameRate() {
    const measureFPS = () => {
      if (!this.isMonitoring) return;
      
      const now = performance.now();
      const delta = now - this.lastFrameTime;
      
      if (delta >= 1000) { // Update every second
        const fps = Math.round((this.frameCount * 1000) / delta);
        this.updateMetric('frameRate', fps);
        
        this.fpsHistory.push({ timestamp: now, fps });
        if (this.fpsHistory.length > 60) { // Keep 1 minute of history
          this.fpsHistory.shift();
        }
        
        this.frameCount = 0;
        this.lastFrameTime = now;
      }
      
      this.frameCount++;
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }
  
  /**
   * Monitor memory usage
   */
  monitorMemoryUsage() {
    const measureMemory = () => {
      if (!this.isMonitoring) return;
      
      if ('memory' in performance) {
        const memory = performance.memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        
        this.updateMetric('memoryUsage', usedMB);
        
        this.memoryHistory.push({ timestamp: performance.now(), memory: usedMB });
        if (this.memoryHistory.length > 60) {
          this.memoryHistory.shift();
        }
      }
      
      setTimeout(measureMemory, 1000); // Update every second
    };
    
    measureMemory();
  }
  
  /**
   * Monitor DOM complexity
   */
  monitorDOMComplexity() {
    const measureDOM = () => {
      if (!this.isMonitoring) return;
      
      const nodeCount = document.querySelectorAll('*').length;
      this.updateMetric('domNodes', nodeCount);
      
      setTimeout(measureDOM, 5000); // Update every 5 seconds
    };
    
    measureDOM();
  }
  
  /**
   * Update a performance metric
   */
  updateMetric(name, value) {
    const metric = PERFORMANCE_METRICS[name];
    if (!metric) return;
    
    this.metrics[name] = {
      value,
      timestamp: performance.now(),
      status: this.getMetricStatus(value, metric)
    };
    
    // Log warnings and critical issues
    if (this.metrics[name].status !== 'good') {
      console.warn(`⚠️ Performance ${this.metrics[name].status}: ${name} = ${value}${metric.measurement}`);
    }
  }
  
  /**
   * Determine metric status based on thresholds
   */
  getMetricStatus(value, metric) {
    if (value > metric.critical) return 'critical';
    if (value > metric.warning) return 'warning';
    return 'good';
  }
  
  /**
   * Get current performance summary
   */
  getPerformanceSummary() {
    return {
      metrics: { ...this.metrics },
      fpsHistory: [...this.fpsHistory],
      memoryHistory: [...this.memoryHistory],
      timestamp: performance.now()
    };
  }
  
  /**
   * Get recommended throttling level based on current performance
   */
  getRecommendedThrottling() {
    const fps = this.metrics.frameRate?.value || 60;
    const memory = this.metrics.memoryUsage?.value || 50;
    const domNodes = this.metrics.domNodes?.value || 1000;
    
    // Critical performance issues - use minimal animations
    if (fps < 20 || memory > 250 || domNodes > 5000) {
      return 'minimal';
    }
    
    // Performance warnings - use reduced animations
    if (fps < 35 || memory > 150 || domNodes > 2500) {
      return 'reduced';
    }
    
    // Good performance - use full animations
    return 'full';
  }
}

// ==========================================
// ADAPTIVE PERFORMANCE UTILITIES
// ==========================================

/**
 * Calculates optimal performance settings based on device capabilities
 * @param {Object} capabilities - Device capabilities object
 * @returns {Object} - Optimized performance configuration
 */
export const calculateOptimalSettings = (capabilities) => {
  let performanceLevel = 'medium';
  
  // Determine performance level based on capabilities
  if (capabilities.prefersReducedMotion) {
    performanceLevel = 'minimal';
  } else if (capabilities.hardwareLevel === 'high' && 
             capabilities.refreshRate >= 60 && 
             capabilities.estimatedMemory > 4096) {
    performanceLevel = 'high';
  } else if (capabilities.hardwareLevel === 'low' || 
             capabilities.estimatedMemory < 2048) {
    performanceLevel = 'low';
  }
  
  return {
    performanceLevel,
    throttlingConfig: THROTTLING_CONFIGS[performanceLevel === 'high' ? 'full' : 
                                        performanceLevel === 'low' ? 'minimal' : 'reduced'],
    budgets: {
      animations: PERFORMANCE_BUDGETS.MAX_CONCURRENT_ANIMATIONS[
        performanceLevel === 'high' ? 'highEnd' : 
        performanceLevel === 'low' ? 'lowEnd' : 'midRange'
      ],
      particles: PERFORMANCE_BUDGETS.MAX_PARTICLES[
        performanceLevel === 'high' ? 'highEnd' : 
        performanceLevel === 'low' ? 'lowEnd' : 'midRange'
      ]
    }
  };
};

/**
 * Creates a performance-aware animation configuration
 * @param {string} component - Component name
 * @param {string} performanceLevel - Performance level (high/medium/low)
 * @returns {Object} - Animation configuration
 */
export const createPerformanceAwareConfig = (component, performanceLevel) => {
  const rules = COMPONENT_PERFORMANCE_RULES[component];
  if (!rules) return {};
  
  const config = {};
  
  Object.keys(rules).forEach(property => {
    if (rules[property][performanceLevel]) {
      config[property] = rules[property][performanceLevel];
    }
  });
  
  return config;
};

// ==========================================
// EXPORTS
// ==========================================

// Create global performance monitor instance
export const globalPerformanceMonitor = new PerformanceMonitor();

export const PERFORMANCE_CONTRACT_VERSION = '1.0.0';
export const LAST_UPDATED = '2024-12-28';