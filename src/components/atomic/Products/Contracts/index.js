/**
 * PRODUCTS SYSTEM CONTRACTS - MAIN INDEX
 * 
 * Unified export of all contract modules for the Products component system.
 * This serves as the single entry point for all contract definitions.
 */

// Import all contract modules
import * as ComponentContracts from './ComponentContracts.js';
import * as DataContracts from './DataContracts.js';
import * as EventContracts from './EventContracts.js';
import * as PerformanceContracts from './PerformanceContracts.js';

// ==========================================
// UNIFIED CONTRACT SYSTEM
// ==========================================

/**
 * Complete contract system information
 */
export const CONTRACT_SYSTEM_INFO = {
  version: '1.0.0',
  lastUpdated: '2024-12-28',
  modules: {
    components: ComponentContracts.COMPONENT_CONTRACT_VERSION,
    data: DataContracts.DATA_CONTRACT_VERSION,
    events: EventContracts.EVENT_CONTRACT_VERSION,
    performance: PerformanceContracts.PERFORMANCE_CONTRACT_VERSION
  },
  description: 'Complete contract system for the Products component ecosystem'
};

// ==========================================
// COMPONENT CONTRACTS
// ==========================================

// Re-export all component contracts
export const {
  // Core data structures
  ProductItem,
  ProductFullDescription,
  AnimationVariants,
  
  // Component prop interfaces
  AegisPageProps,
  ProductsPageProps,
  ServicesPageProps,
  EnhancedProductCardProps,
  ProductDetailModalProps,
  ThrottledAnimatePresenceProps,
  ServicesCosmicEnvironmentProps,
  CosmicUIProps,
  IntegratedTypographyProps,
  
  // Hook interfaces
  ResponsiveHookReturn,
  DeviceCapabilitiesHookReturn,
  PerformanceThrottleHookReturn,
  DebugModeHookReturn,
  
  // Event interfaces
  HorizontalPageChangeEvent,
  StellarSequenceCompleteEvent,
  
  // Constants and validation
  ANIMATION_CONSTANTS,
  THEME_CONFIGURATION,
  validateProductItem,
  validateThemeConfig,
  validateComponentProps,
  createTypeValidator
} = ComponentContracts;

// ==========================================
// DATA CONTRACTS
// ==========================================

// Re-export all data contracts
export const {
  // Schemas
  PRODUCT_ITEM_SCHEMA,
  FULL_DESCRIPTION_SCHEMA,
  ANIMATION_VARIANT_SCHEMA,
  PAGE_CHANGE_EVENT_SCHEMA,
  STELLAR_PHASE_EVENT_SCHEMA,
  PRODUCTS_PAGE_STATE_SCHEMA,
  SERVICES_PAGE_STATE_SCHEMA,
  THEME_CONFIG_SCHEMA,
  
  // Default values
  DEFAULT_PRODUCT_ITEM,
  DEFAULT_ANIMATION_VARIANTS,
  DEFAULT_THEME_CONFIG,
  
  // Validation functions
  validateSchema,
  validateObject,
  createValidator,
  getSchemaByName,
  
  // Schema registry
  SCHEMA_REGISTRY
} = DataContracts;

// ==========================================
// EVENT CONTRACTS
// ==========================================

// Re-export all event contracts
export const {
  // Event types
  EVENT_TYPES,
  
  // Event payload schemas
  HorizontalPageChangePayload,
  StellarPhaseUpdatePayload,
  UpdateAccentColorPayload,
  ProductInteractionPayload,
  
  // Event utilities
  createCustomEvent,
  dispatchCustomEvent,
  dispatchPageChangeEvent,
  dispatchStellarPhaseUpdate,
  dispatchAccentColorUpdate,
  dispatchProductInteraction,
  
  // Event listeners
  createTypedEventListener,
  createMultiEventListener,
  useCustomEvent,
  useEventDispatcher,
  
  // Event validation
  validateEventPayload,
  
  // Event monitoring
  EventMonitor
} = EventContracts;

// ==========================================
// PERFORMANCE CONTRACTS
// ==========================================

// Re-export all performance contracts
export const {
  // Performance thresholds
  PERFORMANCE_THRESHOLDS,
  PERFORMANCE_BUDGETS,
  
  // Device capabilities
  DEVICE_CAPABILITY_SCHEMA,
  
  // Throttling configurations
  THROTTLING_CONFIGS,
  COMPONENT_PERFORMANCE_RULES,
  
  // Performance metrics
  PERFORMANCE_METRICS,
  PerformanceMonitor,
  globalPerformanceMonitor,
  
  // Utility functions
  calculateOptimalSettings,
  createPerformanceAwareConfig
} = PerformanceContracts;

// ==========================================
// INTEGRATION HELPERS
// ==========================================

/**
 * Creates a complete component configuration using all contract systems
 * @param {string} componentName - Name of the component
 * @param {Object} baseProps - Base props for the component
 * @param {Object} deviceCapabilities - Device capabilities
 * @returns {Object} - Complete component configuration
 */
export const createIntegratedComponentConfig = (componentName, baseProps = {}, deviceCapabilities = {}) => {
  // Validate base props using component contracts
  const propValidator = createTypeValidator(componentName + 'Props');
  const validatedProps = propValidator ? propValidator(baseProps) : baseProps;
  
  // Calculate performance settings
  const performanceSettings = calculateOptimalSettings(deviceCapabilities);
  
  // Create performance-aware configuration
  const performanceConfig = createPerformanceAwareConfig(componentName, performanceSettings.performanceLevel);
  
  // Combine all configurations
  return {
    props: validatedProps,
    performance: {
      level: performanceSettings.performanceLevel,
      throttling: performanceSettings.throttlingConfig,
      budgets: performanceSettings.budgets,
      componentRules: performanceConfig
    },
    events: {
      dispatcher: (eventType, payload) => dispatchCustomEvent(eventType, payload),
      validator: (eventType, payload) => validateEventPayload(eventType, payload)
    },
    validation: {
      validateProps: propValidator,
      validateData: (schema, data) => validateObject(schema, data)
    }
  };
};

/**
 * Creates a complete data validation pipeline
 * @param {string} schemaName - Name of the schema to validate against
 * @returns {Function} - Validation function
 */
export const createDataValidationPipeline = (schemaName) => {
  const schema = getSchemaByName(schemaName);
  if (!schema) {
    console.warn(`Schema '${schemaName}' not found in registry`);
    return (data) => ({ isValid: true, data, errors: [] });
  }
  
  return (data) => {
    const validation = validateObject(schema, data);
    
    if (!validation.isValid) {
      console.error(`Data validation failed for schema '${schemaName}':`, validation.errors);
    }
    
    return validation;
  };
};

/**
 * Creates an event system with full validation and monitoring
 * @param {boolean} enableMonitoring - Whether to enable event monitoring
 * @returns {Object} - Complete event system
 */
export const createEventSystem = (enableMonitoring = false) => {
  const monitor = enableMonitoring ? new EventMonitor() : null;
  
  if (monitor) {
    monitor.startMonitoring();
  }
  
  return {
    // Event dispatching with validation
    dispatch: (eventType, payload) => {
      const isValid = validateEventPayload(eventType, payload);
      if (!isValid.valid) {
        console.error(`Invalid event payload for ${eventType}:`, isValid.errors);
        return false;
      }
      
      dispatchCustomEvent(eventType, payload);
      return true;
    },
    
    // Event listening with cleanup
    listen: (eventTypes, handler) => {
      return createMultiEventListener(eventTypes, handler);
    },
    
    // Event monitoring
    monitor,
    
    // Cleanup function
    cleanup: () => {
      if (monitor) {
        monitor.stopMonitoring();
      }
    }
  };
};

/**
 * Creates a complete performance monitoring and optimization system
 * @returns {Object} - Performance system
 */
export const createPerformanceSystem = () => {
  const monitor = new PerformanceMonitor();
  
  return {
    // Start monitoring
    start: () => monitor.startMonitoring(),
    
    // Stop monitoring
    stop: () => monitor.stopMonitoring(),
    
    // Get current performance metrics
    getMetrics: () => monitor.getPerformanceSummary(),
    
    // Get recommended settings
    getRecommendations: () => ({
      throttling: monitor.getRecommendedThrottling(),
      settings: calculateOptimalSettings({
        hardwareLevel: monitor.getRecommendedThrottling() === 'full' ? 'high' : 
                      monitor.getRecommendedThrottling() === 'minimal' ? 'low' : 'medium'
      })
    }),
    
    // Apply performance optimizations
    optimize: (componentName, baseConfig) => {
      const recommendations = monitor.getRecommendedThrottling();
      return createPerformanceAwareConfig(componentName, recommendations);
    },
    
    // Monitor instance
    monitor
  };
};

// ==========================================
// CONTRACT VALIDATION
// ==========================================

/**
 * Validates the entire contract system integrity
 * @returns {Object} - Validation result
 */
export const validateContractSystem = () => {
  const results = {
    isValid: true,
    errors: [],
    warnings: [],
    modules: {}
  };
  
  // Check if all required modules are present
  const requiredModules = ['ComponentContracts', 'DataContracts', 'EventContracts', 'PerformanceContracts'];
  const availableModules = [ComponentContracts, DataContracts, EventContracts, PerformanceContracts];
  
  requiredModules.forEach((moduleName, index) => {
    const module = availableModules[index];
    if (!module) {
      results.errors.push(`Missing required module: ${moduleName}`);
      results.isValid = false;
    } else {
      results.modules[moduleName] = 'available';
    }
  });
  
  // Validate schema registry
  if (SCHEMA_REGISTRY && Object.keys(SCHEMA_REGISTRY).length === 0) {
    results.warnings.push('Schema registry is empty');
  }
  
  // Validate event types
  if (EVENT_TYPES && Object.keys(EVENT_TYPES).length === 0) {
    results.warnings.push('No event types defined');
  }
  
  // Log results
  if (results.errors.length > 0) {
    console.error('❌ Contract system validation failed:', results.errors);
  } else if (results.warnings.length > 0) {
    console.warn('⚠️ Contract system validation warnings:', results.warnings);
  } else {
    console.log('✅ Contract system validation passed');
  }
  
  return results;
};

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Initialize the complete contract system
 * @param {Object} options - Initialization options
 * @returns {Object} - Initialized system
 */
export const initializeContractSystem = (options = {}) => {
  const {
    enablePerformanceMonitoring = false,
    enableEventMonitoring = false,
    validateOnInit = true
  } = options;
  
  console.log('🚀 Initializing Products Contract System...');
  
  // Validate system integrity
  if (validateOnInit) {
    const validation = validateContractSystem();
    if (!validation.isValid) {
      throw new Error('Contract system validation failed');
    }
  }
  
  // Create subsystems
  const eventSystem = createEventSystem(enableEventMonitoring);
  const performanceSystem = createPerformanceSystem();
  
  // Start monitoring if requested
  if (enablePerformanceMonitoring) {
    performanceSystem.start();
  }
  
  console.log('✅ Products Contract System initialized successfully');
  
  return {
    // System information
    info: CONTRACT_SYSTEM_INFO,
    
    // Subsystems
    events: eventSystem,
    performance: performanceSystem,
    
    // Utilities
    createConfig: createIntegratedComponentConfig,
    createValidator: createDataValidationPipeline,
    validate: validateContractSystem,
    
    // Cleanup
    cleanup: () => {
      eventSystem.cleanup();
      performanceSystem.stop();
      console.log('🧹 Contract system cleaned up');
    }
  };
};

// ==========================================
// DEFAULT EXPORT
// ==========================================

export default {
  // System info
  ...CONTRACT_SYSTEM_INFO,
  
  // Initialize function
  initialize: initializeContractSystem,
  
  // Validation
  validate: validateContractSystem,
  
  // All contracts
  components: ComponentContracts,
  data: DataContracts,
  events: EventContracts,
  performance: PerformanceContracts
}; 