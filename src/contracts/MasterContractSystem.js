/**
 * MASTER CONTRACT SYSTEM - CuriousLabs Application
 * 
 * Comprehensive contract system defining interfaces, schemas, and validation
 * rules for the entire application architecture.
 * 
 * Based on Architecture Map v1.0.0
 * Covers: Components, State, Events, Performance, Navigation, and Integration
 */

// ==========================================
// CORE APPLICATION CONTRACTS
// ==========================================

/**
 * Application Configuration Contract
 */
export const APPLICATION_CONFIG_SCHEMA = {
  name: { type: 'string', required: true, default: 'curious-labs-v6' },
  version: { type: 'string', required: true, default: '0.1.0' },
  environment: { 
    type: 'string', 
    required: true, 
    validation: (val) => ['development', 'production', 'staging'].includes(val),
    default: 'development'
  },
  performance: {
    type: 'object',
    required: true,
    schema: {
      lighthouseThreshold: { type: 'number', default: 95 },
      budgetThreshold: { type: 'number', default: 100 },
      memoryLimit: { type: 'number', default: 50 }
    }
  },
  features: {
    type: 'object',
    required: true,
    schema: {
      debugMode: { type: 'boolean', default: false },
      performanceMonitoring: { type: 'boolean', default: true },
      errorBoundaries: { type: 'boolean', default: true },
      reducedMotion: { type: 'boolean', default: false }
    }
  }
};

/**
 * Component Lifecycle Contract
 */
export const COMPONENT_LIFECYCLE_SCHEMA = {
  name: { type: 'string', required: true },
  type: { 
    type: 'string', 
    required: true,
    validation: (val) => ['atomic', 'molecular', 'organism', 'template', 'page'].includes(val)
  },
  props: { type: 'object', required: false, default: {} },
  state: { type: 'object', required: false, default: {} },
  lifecycle: {
    type: 'object',
    required: true,
    schema: {
      mounted: { type: 'boolean', default: false },
      loading: { type: 'boolean', default: false },
      error: { type: 'object', default: null },
      lastUpdate: { type: 'number', default: 0 }
    }
  },
  performance: {
    type: 'object',
    required: true,
    schema: {
      renderTime: { type: 'number', default: 0 },
      memoryUsage: { type: 'number', default: 0 },
      reRenderCount: { type: 'number', default: 0 }
    }
  }
};

// ==========================================
// STATE MANAGEMENT CONTRACTS
// ==========================================

/**
 * Global State Schema
 */
export const GLOBAL_STATE_SCHEMA = {
  scroll: {
    type: 'object',
    required: true,
    schema: {
      scrollY: { type: 'number', default: 0 },
      scrollDirection: { 
        type: 'string', 
        validation: (val) => ['up', 'down', 'none'].includes(val),
        default: 'none'
      },
      activeSection: { type: 'string', default: '' },
      scrollProgress: { type: 'number', validation: (val) => val >= 0 && val <= 1, default: 0 },
      isAtTop: { type: 'boolean', default: true },
      isAtBottom: { type: 'boolean', default: false }
    }
  },
  performance: {
    type: 'object',
    required: true,
    schema: {
      deviceCapabilities: {
        type: 'object',
        schema: {
          performanceTier: { 
            type: 'string',
            validation: (val) => ['full', 'reduced', 'minimal', 'none'].includes(val),
            default: 'full'
          },
          prefersReducedMotion: { type: 'boolean', default: false },
          isMobile: { type: 'boolean', default: false },
          isTablet: { type: 'boolean', default: false },
          devicePixelRatio: { type: 'number', default: 1 }
        }
      },
      metrics: {
        type: 'object',
        schema: {
          fps: { type: 'number', default: 60 },
          memoryUsage: { type: 'number', default: 0 },
          renderTime: { type: 'number', default: 0 },
          lastUpdate: { type: 'number', default: 0 }
        }
      }
    }
  },
  navigation: {
    type: 'object',
    required: true,  
    schema: {
      currentRoute: { type: 'string', required: true, default: '/' },
      previousRoute: { type: 'string', default: null },
      routeParams: { type: 'object', default: {} },
      routeState: { type: 'object', default: {} },
      isNavigating: { type: 'boolean', default: false }
    }
  },
  ui: {
    type: 'object',
    required: true,
    schema: {
      theme: { 
        type: 'string',
        validation: (val) => ['light', 'dark', 'auto'].includes(val),
        default: 'dark'
      },
      accentColor: { 
        type: 'string',
        validation: (val) => /^#[0-9A-F]{6}$/i.test(val),
        default: '#8B5CF6'
      },
      isLoading: { type: 'boolean', default: false },
      error: { type: 'object', default: null }
    }
  }
};

/**
 * Context Provider Contract
 */
export const CONTEXT_PROVIDER_SCHEMA = {
  name: { type: 'string', required: true },
  value: { type: 'object', required: true },
  actions: { type: 'object', required: false, default: {} },
  subscribers: { type: 'array', default: [] },
  lastUpdate: { type: 'number', default: 0 },
  performance: {
    type: 'object',
    schema: {
      renderCount: { type: 'number', default: 0 },
      subscriptionCount: { type: 'number', default: 0 }
    }
  }
};

// ==========================================
// ROUTING & NAVIGATION CONTRACTS
// ==========================================

/**
 * Route Definition Schema
 */
export const ROUTE_SCHEMA = {
  path: { type: 'string', required: true },
  name: { type: 'string', required: true },
  component: { type: 'function', required: true },
  layout: { type: 'function', required: false },
  meta: {
    type: 'object',
    schema: {
      title: { type: 'string', required: false },
      description: { type: 'string', required: false },
      keywords: { type: 'array', default: [] },
      requiresAuth: { type: 'boolean', default: false },
      performanceLevel: { 
        type: 'string',
        validation: (val) => ['full', 'reduced', 'minimal'].includes(val),
        default: 'full'
      }
    }
  },
  guards: { type: 'array', default: [] },
  children: { type: 'array', default: [] }
};

/**
 * Navigation Event Schema
 */
export const NAVIGATION_EVENT_SCHEMA = {
  type: { 
    type: 'string',
    required: true,
    validation: (val) => ['navigate', 'back', 'forward', 'replace', 'push'].includes(val)
  },
  from: { type: 'string', required: true },
  to: { type: 'string', required: true },
  params: { type: 'object', default: {} },
  state: { type: 'object', default: {} },
  timestamp: { type: 'number', required: true },
  source: { 
    type: 'string',
    validation: (val) => ['user', 'programmatic', 'browser'].includes(val),
    default: 'user'
  }
};

// ==========================================
// PERFORMANCE CONTRACTS
// ==========================================

/**
 * Performance Budget Schema
 */
export const PERFORMANCE_BUDGET_SCHEMA = {
  component: { type: 'string', required: true },
  budgets: {
    type: 'object',
    required: true,
    schema: {
      renderTime: { type: 'number', required: true }, // milliseconds
      memoryUsage: { type: 'number', required: true }, // MB
      bundleSize: { type: 'number', required: true }, // KB
      firstContentfulPaint: { type: 'number', default: 1600 }, // ms
      largestContentfulPaint: { type: 'number', default: 2500 }, // ms
      cumulativeLayoutShift: { type: 'number', default: 0.1 }
    }
  },
  thresholds: {
    type: 'object',
    schema: {
      warning: { type: 'number', default: 0.8 }, // 80% of budget
      critical: { type: 'number', default: 1.0 } // 100% of budget
    }
  }
};

/**
 * Device Capabilities Schema
 */
export const DEVICE_CAPABILITIES_SCHEMA = {
  screen: {
    type: 'object',
    schema: {
      width: { type: 'number', required: true },
      height: { type: 'number', required: true },
      pixelRatio: { type: 'number', default: 1 },
      orientation: { 
        type: 'string',
        validation: (val) => ['portrait', 'landscape'].includes(val)
      }
    }
  },
  performance: {
    type: 'object',
    schema: {
      memory: { type: 'number', default: 8 }, // GB
      cores: { type: 'number', default: 4 },
      tier: { 
        type: 'string',
        validation: (val) => ['high', 'medium', 'low'].includes(val),
        default: 'medium'
      }
    }
  },
  features: {
    type: 'object',
    schema: {
      webGL: { type: 'boolean', default: false },
      webGL2: { type: 'boolean', default: false },
      serviceWorker: { type: 'boolean', default: false },
      indexedDB: { type: 'boolean', default: false },
      localStorage: { type: 'boolean', default: false }
    }
  },
  preferences: {
    type: 'object',
    schema: {
      reducedMotion: { type: 'boolean', default: false },
      reducedData: { type: 'boolean', default: false },
      highContrast: { type: 'boolean', default: false }
    }
  }
};

// ==========================================
// ERROR HANDLING CONTRACTS
// ==========================================

/**
 * Error Boundary Schema
 */
export const ERROR_BOUNDARY_SCHEMA = {
  componentName: { type: 'string', required: true },
  error: {
    type: 'object',
    schema: {
      name: { type: 'string', required: true },
      message: { type: 'string', required: true },
      stack: { type: 'string', required: false },
      componentStack: { type: 'string', required: false }
    }
  },
  errorInfo: {
    type: 'object',
    schema: {
      componentStack: { type: 'string', required: true }
    }
  },
  timestamp: { type: 'number', required: true },
  recovery: {
    type: 'object',
    schema: {
      attempted: { type: 'boolean', default: false },
      successful: { type: 'boolean', default: false },
      fallbackUsed: { type: 'boolean', default: false }
    }
  }
};

/**
 * Error Recovery Strategy Schema
 */
export const ERROR_RECOVERY_SCHEMA = {
  errorType: { type: 'string', required: true },
  strategy: { 
    type: 'string',
    validation: (val) => ['retry', 'fallback', 'reload', 'redirect'].includes(val),
    required: true
  },
  maxRetries: { type: 'number', default: 3 },
  retryDelay: { type: 'number', default: 1000 }, // milliseconds
  fallbackComponent: { type: 'function', required: false },
  onError: { type: 'function', required: false },
  onRecovery: { type: 'function', required: false }
};

// ==========================================
// ANIMATION & VISUAL EFFECTS CONTRACTS
// ==========================================

/**
 * Animation Configuration Schema
 */
export const ANIMATION_CONFIG_SCHEMA = {
  name: { type: 'string', required: true },
  type: { 
    type: 'string',
    validation: (val) => ['entrance', 'exit', 'transition', 'idle', 'interaction'].includes(val),
    required: true
  },
  duration: { type: 'number', required: true }, // milliseconds
  easing: { 
    type: 'string',
    validation: (val) => ['linear', 'easeIn', 'easeOut', 'easeInOut', 'spring'].includes(val),
    default: 'easeOut'
  },
  variants: {
    type: 'object',
    schema: {
      initial: { type: 'object', required: true },
      animate: { type: 'object', required: true },
      exit: { type: 'object', required: false }
    }
  },
  performance: {
    type: 'object',
    schema: {
      throttled: { type: 'boolean', default: false },
      priority: { type: 'number', default: 1 }, // 1-10 scale
      canSkip: { type: 'boolean', default: true }
    }
  }
};

/**
 * Visual Effects Schema
 */
export const VISUAL_EFFECTS_SCHEMA = {
  name: { type: 'string', required: true },
  type: { 
    type: 'string',
    validation: (val) => ['particle', 'shader', 'css', 'svg', 'canvas'].includes(val),
    required: true
  },
  enabled: { type: 'boolean', default: true },
  performance: {
    type: 'object',
    schema: {
      gpuAccelerated: { type: 'boolean', default: false },
      frameRate: { type: 'number', default: 60 },
      particleCount: { type: 'number', default: 100 },
      complexity: { 
        type: 'string',
        validation: (val) => ['low', 'medium', 'high'].includes(val),
        default: 'medium'
      }
    }
  }
};

// ==========================================
// INTEGRATION CONTRACTS
// ==========================================

/**
 * Third-party Integration Schema
 */
export const INTEGRATION_SCHEMA = {
  name: { type: 'string', required: true },
  type: { 
    type: 'string',
    validation: (val) => ['analytics', 'monitoring', 'cdn', 'api', 'service'].includes(val),
    required: true
  },
  config: {
    type: 'object',
    schema: {
      apiKey: { type: 'string', required: false },
      endpoint: { type: 'string', required: false },
      timeout: { type: 'number', default: 5000 },
      retries: { type: 'number', default: 3 }
    }
  },
  status: {
    type: 'object',
    schema: {
      connected: { type: 'boolean', default: false },
      lastCheck: { type: 'number', default: 0 },
      errorCount: { type: 'number', default: 0 }
    }
  }
};

// ==========================================
// VALIDATION SYSTEM
// ==========================================

/**
 * Schema Validator
 */
export class SchemaValidator {
  constructor() {
    this.schemas = new Map();
    this.validationCache = new Map();
  }

  /**
   * Register a schema
   */
  registerSchema(name, schema) {
    this.schemas.set(name, schema);
  }

  /**
   * Validate data against schema
   */
  validate(schemaName, data) {
    const schema = this.schemas.get(schemaName);
    if (!schema) {
      throw new Error(`Schema '${schemaName}' not found`);
    }

    return this.validateObject(data, schema);
  }

  /**
   * Validate object against schema definition
   */
  validateObject(obj, schema) {
    const errors = [];
    const warnings = [];

    for (const [key, definition] of Object.entries(schema)) {
      const value = obj[key];
      const result = this.validateProperty(value, definition, key);
      
      if (!result.valid) {
        errors.push(...result.errors);
      }
      if (result.warnings) {
        warnings.push(...result.warnings);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      data: this.applyDefaults(obj, schema)
    };
  }

  /**
   * Validate individual property
   */
  validateProperty(value, definition, propertyName) {
    const errors = [];
    const warnings = [];

    // Check required
    if (definition.required && (value === undefined || value === null)) {
      errors.push(`${propertyName} is required`);
      return { valid: false, errors, warnings };
    }

    // Skip further validation if optional and not provided
    if (!definition.required && (value === undefined || value === null)) {
      return { valid: true, errors: [], warnings: [] };
    }

    // Type validation
    if (definition.type && !this.validateType(value, definition.type)) {
      errors.push(`${propertyName} must be of type ${definition.type}`);
    }

    // Custom validation
    if (definition.validation && !definition.validation(value)) {
      errors.push(`${propertyName} failed custom validation`);
    }

    // Nested schema validation
    if (definition.schema && typeof value === 'object') {
      const nestedResult = this.validateObject(value, definition.schema);
      if (!nestedResult.valid) {
        errors.push(...nestedResult.errors.map(err => `${propertyName}.${err}`));
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate type
   */
  validateType(value, expectedType) {
    switch (expectedType) {
      case 'string':
        return typeof value === 'string';
      case 'number':
        return typeof value === 'number' && !isNaN(value);
      case 'boolean':
        return typeof value === 'boolean';
      case 'array':
        return Array.isArray(value);
      case 'object':
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      case 'function':
        return typeof value === 'function';
      default:
        return true;
    }
  }

  /**
   * Apply default values
   */
  applyDefaults(obj, schema) {
    const result = { ...obj };

    for (const [key, definition] of Object.entries(schema)) {
      if (result[key] === undefined && definition.hasOwnProperty('default')) {
        result[key] = typeof definition.default === 'function' 
          ? definition.default() 
          : definition.default;
      }

      // Apply nested defaults
      if (definition.schema && result[key] && typeof result[key] === 'object') {
        result[key] = this.applyDefaults(result[key], definition.schema);
      }
    }

    return result;
  }
}

// ==========================================
// CONTRACT SYSTEM INITIALIZATION
// ==========================================

/**
 * Master Contract System
 */
export class MasterContractSystem {
  constructor() {
    this.validator = new SchemaValidator();
    this.monitors = new Map();
    this.initialized = false;
    
    this.registerAllSchemas();
  }

  /**
   * Register all schemas
   */
  registerAllSchemas() {
    const schemas = {
      'application-config': APPLICATION_CONFIG_SCHEMA,
      'component-lifecycle': COMPONENT_LIFECYCLE_SCHEMA,
      'global-state': GLOBAL_STATE_SCHEMA,
      'context-provider': CONTEXT_PROVIDER_SCHEMA,
      'route': ROUTE_SCHEMA,
      'navigation-event': NAVIGATION_EVENT_SCHEMA,
      'performance-budget': PERFORMANCE_BUDGET_SCHEMA,
      'device-capabilities': DEVICE_CAPABILITIES_SCHEMA,
      'error-boundary': ERROR_BOUNDARY_SCHEMA,
      'error-recovery': ERROR_RECOVERY_SCHEMA,
      'animation-config': ANIMATION_CONFIG_SCHEMA,
      'visual-effects': VISUAL_EFFECTS_SCHEMA,
      'integration': INTEGRATION_SCHEMA
    };

    for (const [name, schema] of Object.entries(schemas)) {
      this.validator.registerSchema(name, schema);
    }
  }

  /**
   * Initialize the contract system
   */
  initialize(config = {}) {
    if (this.initialized) {
      console.warn('Contract system already initialized');
      return;
    }

    // Validate configuration
    const configResult = this.validate('application-config', config);
    if (!configResult.valid) {
      throw new Error(`Invalid configuration: ${configResult.errors.join(', ')}`);
    }

    this.config = configResult.data;
    this.initialized = true;

    console.log('🔧 Master Contract System initialized', {
      version: '1.0.0',
      schemas: this.validator.schemas.size,
      config: this.config
    });
  }

  /**
   * Validate data against schema
   */
  validate(schemaName, data) {
    return this.validator.validate(schemaName, data);
  }

  /**
   * Create a monitoring system for a specific contract
   */
  createMonitor(contractName, options = {}) {
    const monitor = new ContractMonitor(contractName, options);
    this.monitors.set(contractName, monitor);
    return monitor;
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      schemas: this.validator.schemas.size,
      monitors: this.monitors.size,
      config: this.config,
      version: '1.0.0'
    };
  }
}

/**
 * Contract Monitor for real-time validation
 */
export class ContractMonitor {
  constructor(contractName, options = {}) {
    this.contractName = contractName;
    this.options = options;
    this.violations = [];
    this.isActive = false;
  }

  /**
   * Start monitoring
   */
  start() {
    this.isActive = true;
    console.log(`📊 Contract monitor started for: ${this.contractName}`);
  }

  /**
   * Stop monitoring
   */
  stop() {
    this.isActive = false;
    console.log(`⏹️ Contract monitor stopped for: ${this.contractName}`);
  }

  /**
   * Record a violation
   */
  recordViolation(violation) {
    if (!this.isActive) return;

    this.violations.push({
      ...violation,
      timestamp: Date.now(),
      contractName: this.contractName
    });

    // Keep only recent violations
    if (this.violations.length > 1000) {
      this.violations = this.violations.slice(-500);
    }

    if (this.options.onViolation) {
      this.options.onViolation(violation);
    }
  }

  /**
   * Get violations
   */
  getViolations(limit = 100) {
    return this.violations.slice(-limit);
  }

  /**
   * Clear violations
   */
  clearViolations() {
    this.violations = [];
  }
}

// ==========================================
// EXPORTS
// ==========================================

// Create and initialize system
const masterContractSystem = new MasterContractSystem();

// Initialize with proper default configuration
masterContractSystem.initialize({
  name: 'curious-labs-v6',
  version: '0.1.0',
  environment: 'development',
  performance: {
    lighthouseThreshold: 95,
    budgetThreshold: 100,
    memoryLimit: 50
  },
  features: {
    debugMode: true,
    performanceMonitoring: true,
    errorBoundaries: true,
    reducedMotion: false
  }
});

// Default export
export default masterContractSystem;

/**
 * Contract System Information
 */
export const CONTRACT_SYSTEM_INFO = {
  name: 'CuriousLabs Master Contract System',
  version: '1.0.0',
  lastUpdated: '2024-12-28',
  totalSchemas: 13,
  coverage: 'Full Application Architecture',
  features: [
    'Component Lifecycle Management',
    'State Management Contracts',
    'Performance Monitoring',
    'Error Handling Systems',
    'Animation & Visual Effects',
    'Navigation & Routing',
    'Real-time Validation',
    'Contract Monitoring'
  ]
}; 