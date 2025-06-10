/**
 * EVENT CONTRACTS & COMMUNICATION PROTOCOLS
 * 
 * Defines all custom events, event handlers, and communication patterns
 * used between components in the Products system.
 */

// ==========================================
// EVENT TYPE CONSTANTS
// ==========================================

/**
 * All custom event types used in the system
 */
export const EVENT_TYPES = {
  // Page navigation events
  HORIZONTAL_PAGE_CHANGE: 'horizontalPageChange',
  PAGE_TRANSITION_START: 'pageTransitionStart',
  PAGE_TRANSITION_COMPLETE: 'pageTransitionComplete',
  
  // Stellar message events
  STELLAR_PHASE_UPDATE: 'stellarPhaseUpdate',
  STELLAR_SEQUENCE_COMPLETE: 'stellarSequenceComplete',
  STELLAR_MESSAGE_PAUSE: 'stellarMessagePause',
  STELLAR_MESSAGE_RESUME: 'stellarMessageResume',
  
  // Theme and visual events
  UPDATE_ACCENT_COLOR: 'updateAccentColor',
  THEME_CHANGE: 'themeChange',
  VISUAL_MODE_CHANGE: 'visualModeChange',
  
  // Product interaction events
  PRODUCT_CARD_HOVER: 'productCardHover',
  PRODUCT_MODAL_OPEN: 'productModalOpen',
  PRODUCT_MODAL_CLOSE: 'productModalClose',
  
  // Performance and debug events
  PERFORMANCE_THROTTLE_CHANGE: 'performanceThrottleChange',
  DEBUG_MODE_TOGGLE: 'debugModeToggle',
  ANIMATION_PREFERENCE_CHANGE: 'animationPreferenceChange',
  
  // ThoughtTrails integration events
  THOUGHT_TRAILS_INIT: 'thoughtTrailsInit',
  THOUGHT_TRAILS_UPDATE: 'thoughtTrailsUpdate',
  THOUGHT_TRAILS_COMPLETE: 'thoughtTrailsComplete'
};

// ==========================================
// EVENT PAYLOAD SCHEMAS
// ==========================================

/**
 * Schema for horizontal page change events
 */
export const HorizontalPageChangePayload = {
  pageIndex: {
    type: 'number',
    required: true,
    min: 0,
    max: 2,
    description: 'Target page index (0=aegis, 1=products, 2=services)'
  },
  
  previousPageIndex: {
    type: 'number',
    required: false,
    min: 0,
    max: 2,
    description: 'Previous page index'
  },
  
  pageName: {
    type: 'string',
    required: false,
    enum: ['aegis', 'products', 'services'],
    description: 'Human-readable page name'
  },
  
  trigger: {
    type: 'string',
    required: false,
    enum: ['scroll', 'click', 'keyboard', 'programmatic', 'gesture'],
    description: 'What triggered the page change'
  },
  
  timestamp: {
    type: 'number',
    required: false,
    description: 'Event timestamp'
  }
};

/**
 * Schema for stellar phase update events
 */
export const StellarPhaseUpdatePayload = {
  phase: {
    type: 'string',
    required: true,
    enum: ['materialization', 'constellation', 'breathing', 'dissolution'],
    description: 'Current stellar sequence phase'
  },
  
  progress: {
    type: 'number',
    required: true,
    min: 0,
    max: 1,
    description: 'Progress through current phase (0-1)'
  },
  
  totalProgress: {
    type: 'number',
    required: false,
    min: 0,
    max: 1,
    description: 'Overall sequence progress (0-1)'
  },
  
  phaseStartTime: {
    type: 'number',
    required: false,
    description: 'Timestamp when current phase started'
  },
  
  sequenceStartTime: {
    type: 'number',
    required: false,
    description: 'Timestamp when entire sequence started'
  }
};

/**
 * Schema for accent color update events
 */
export const UpdateAccentColorPayload = {
  color: {
    type: 'string',
    required: true,
    validation: (val) => /^#[0-9A-Fa-f]{6}$/.test(val),
    description: 'New accent color as hex code'
  },
  
  previousColor: {
    type: 'string',
    required: false,
    validation: (val) => /^#[0-9A-Fa-f]{6}$/.test(val),
    description: 'Previous accent color for transitions'
  },
  
  cardBounds: {
    type: 'object',
    required: false,
    description: 'DOMRect of the featured card element'
  },
  
  source: {
    type: 'string',
    required: false,
    enum: ['product-card', 'modal', 'programmatic'],
    description: 'What triggered the color change'
  },
  
  transitionDuration: {
    type: 'number',
    required: false,
    min: 0,
    default: 300,
    description: 'Duration for color transition in ms'
  }
};

/**
 * Schema for product interaction events
 */
export const ProductInteractionPayload = {
  productId: {
    type: 'number',
    required: true,
    description: 'ID of the product being interacted with'
  },
  
  productTitle: {
    type: 'string',
    required: false,
    description: 'Title of the product for debugging'
  },
  
  cardElement: {
    type: 'object',
    required: false,
    description: 'DOM element reference'
  },
  
  cardBounds: {
    type: 'object',
    required: false,
    description: 'DOMRect of the card element'
  },
  
  interactionType: {
    type: 'string',
    required: false,
    enum: ['hover', 'click', 'focus', 'select'],
    description: 'Type of interaction'
  }
};

// ==========================================
// EVENT DISPATCHER UTILITIES
// ==========================================

/**
 * Creates and dispatches a custom event with validation
 * @param {string} eventType - Event type from EVENT_TYPES
 * @param {Object} payload - Event payload data
 * @param {Element|Window} target - Target to dispatch event on (default: window)
 * @returns {boolean} - Whether the event was dispatched successfully
 */
export const dispatchCustomEvent = (eventType, payload = {}, target = window) => {
  try {
    const event = new CustomEvent(eventType, {
      detail: payload,
      bubbles: true,
      cancelable: true
    });
    
    return target.dispatchEvent(event);
  } catch (error) {
    console.error(`Failed to dispatch event ${eventType}:`, error);
    return false;
  }
};

/**
 * Dispatches a page change event
 * @param {number} pageIndex - Target page index
 * @param {Object} options - Additional options
 */
export const dispatchPageChange = (pageIndex, options = {}) => {
  const payload = {
    pageIndex,
    pageName: ['aegis', 'products', 'services'][pageIndex],
    timestamp: Date.now(),
    ...options
  };
  
  return dispatchCustomEvent(EVENT_TYPES.HORIZONTAL_PAGE_CHANGE, payload);
};

/**
 * Dispatches a stellar phase update event
 * @param {string} phase - Current phase
 * @param {number} progress - Phase progress (0-1)
 * @param {Object} options - Additional options
 */
export const dispatchStellarPhaseUpdate = (phase, progress, options = {}) => {
  const payload = {
    phase,
    progress,
    timestamp: Date.now(),
    ...options
  };
  
  return dispatchCustomEvent(EVENT_TYPES.STELLAR_PHASE_UPDATE, payload);
};

/**
 * Dispatches an accent color update event
 * @param {string} color - New color hex code
 * @param {Object} options - Additional options
 */
export const dispatchAccentColorUpdate = (color, options = {}) => {
  const payload = {
    color,
    timestamp: Date.now(),
    ...options
  };
  
  return dispatchCustomEvent(EVENT_TYPES.UPDATE_ACCENT_COLOR, payload);
};

/**
 * Dispatches a product interaction event
 * @param {number} productId - Product ID
 * @param {string} interactionType - Type of interaction
 * @param {Object} options - Additional options
 */
export const dispatchProductInteraction = (productId, interactionType, options = {}) => {
  const payload = {
    productId,
    interactionType,
    timestamp: Date.now(),
    ...options
  };
  
  const eventType = {
    hover: EVENT_TYPES.PRODUCT_CARD_HOVER,
    click: EVENT_TYPES.PRODUCT_MODAL_OPEN,
    focus: EVENT_TYPES.PRODUCT_CARD_HOVER
  }[interactionType] || EVENT_TYPES.PRODUCT_CARD_HOVER;
  
  return dispatchCustomEvent(eventType, payload);
};

// ==========================================
// EVENT LISTENER UTILITIES
// ==========================================

/**
 * Creates a typed event listener with cleanup
 * @param {string} eventType - Event type to listen for
 * @param {Function} handler - Event handler function
 * @param {Object} options - Listener options
 * @returns {Function} - Cleanup function to remove listener
 */
export const createEventListener = (eventType, handler, options = {}) => {
  const { target = window, once = false, passive = false } = options;
  
  const wrappedHandler = (event) => {
    try {
      handler(event.detail, event);
    } catch (error) {
      console.error(`Error in event handler for ${eventType}:`, error);
    }
  };
  
  target.addEventListener(eventType, wrappedHandler, { once, passive });
  
  // Return cleanup function
  return () => {
    target.removeEventListener(eventType, wrappedHandler);
  };
};

/**
 * Creates multiple event listeners with single cleanup
 * @param {Array} listeners - Array of [eventType, handler, options] tuples
 * @returns {Function} - Cleanup function for all listeners
 */
export const createEventListeners = (listeners) => {
  const cleanupFunctions = listeners.map(([eventType, handler, options]) => 
    createEventListener(eventType, handler, options)
  );
  
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
};

// ==========================================
// HOOK INTEGRATION HELPERS
// ==========================================

/**
 * React hook for listening to custom events
 * @param {string} eventType - Event type to listen for
 * @param {Function} handler - Event handler
 * @param {Array} deps - Dependencies array for useEffect
 */
export const useCustomEventListener = (eventType, handler, deps = []) => {
  // This would be implemented in a React hook file, included here for reference
  console.log('useCustomEventListener should be implemented in a React hook file');
};

/**
 * React hook for dispatching events with cleanup
 * @returns {Function} - Dispatch function
 */
export const useEventDispatcher = () => {
  // This would be implemented in a React hook file
  return dispatchCustomEvent;
};

// ==========================================
// EVENT VALIDATION
// ==========================================

/**
 * Validates an event payload against its schema
 * @param {string} eventType - Event type
 * @param {Object} payload - Payload to validate
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export const validateEventPayload = (eventType, payload) => {
  const schemas = {
    [EVENT_TYPES.HORIZONTAL_PAGE_CHANGE]: HorizontalPageChangePayload,
    [EVENT_TYPES.STELLAR_PHASE_UPDATE]: StellarPhaseUpdatePayload,
    [EVENT_TYPES.UPDATE_ACCENT_COLOR]: UpdateAccentColorPayload,
    [EVENT_TYPES.PRODUCT_CARD_HOVER]: ProductInteractionPayload,
    [EVENT_TYPES.PRODUCT_MODAL_OPEN]: ProductInteractionPayload,
    [EVENT_TYPES.PRODUCT_MODAL_CLOSE]: ProductInteractionPayload
  };
  
  const schema = schemas[eventType];
  if (!schema) {
    return { valid: false, errors: [`No schema found for event type: ${eventType}`] };
  }
  
  const errors = [];
  
  Object.keys(schema).forEach(key => {
    const schemaProp = schema[key];
    const value = payload[key];
    
    // Check required fields
    if (schemaProp.required && (value === undefined || value === null)) {
      errors.push(`Required field '${key}' is missing`);
      return;
    }
    
    // Skip validation if optional and not provided
    if (!schemaProp.required && (value === undefined || value === null)) {
      return;
    }
    
    // Type validation
    if (schemaProp.type && typeof value !== schemaProp.type) {
      errors.push(`Field '${key}' expected ${schemaProp.type}, got ${typeof value}`);
    }
    
    // Custom validation
    if (schemaProp.validation && !schemaProp.validation(value)) {
      errors.push(`Field '${key}' failed custom validation`);
    }
    
    // Enum validation
    if (schemaProp.enum && !schemaProp.enum.includes(value)) {
      errors.push(`Field '${key}' must be one of: ${schemaProp.enum.join(', ')}`);
    }
    
    // Range validation for numbers
    if (typeof value === 'number') {
      if (schemaProp.min !== undefined && value < schemaProp.min) {
        errors.push(`Field '${key}' must be >= ${schemaProp.min}`);
      }
      if (schemaProp.max !== undefined && value > schemaProp.max) {
        errors.push(`Field '${key}' must be <= ${schemaProp.max}`);
      }
    }
  });
  
  return { valid: errors.length === 0, errors };
};

// ==========================================
// DEBUG AND MONITORING
// ==========================================

/**
 * Event monitoring for debugging
 */
export class EventMonitor {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000;
    this.listeners = new Map();
  }
  
  /**
   * Start monitoring events
   * @param {string[]} eventTypes - Event types to monitor
   */
  startMonitoring(eventTypes = Object.values(EVENT_TYPES)) {
    eventTypes.forEach(eventType => {
      const listener = (event) => {
        this.logEvent(eventType, event.detail);
      };
      
      window.addEventListener(eventType, listener);
      this.listeners.set(eventType, listener);
    });
  }
  
  /**
   * Stop monitoring events
   */
  stopMonitoring() {
    this.listeners.forEach((listener, eventType) => {
      window.removeEventListener(eventType, listener);
    });
    this.listeners.clear();
  }
  
  /**
   * Log an event
   */
  logEvent(eventType, payload) {
    const logEntry = {
      timestamp: Date.now(),
      eventType,
      payload: JSON.parse(JSON.stringify(payload)), // Deep clone
    };
    
    this.logs.unshift(logEntry);
    
    // Keep only recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }
    
    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📡 Event: ${eventType}`, payload);
    }
  }
  
  /**
   * Get event logs
   */
  getLogs(eventType = null, limit = 100) {
    let filtered = this.logs;
    
    if (eventType) {
      filtered = this.logs.filter(log => log.eventType === eventType);
    }
    
    return filtered.slice(0, limit);
  }
  
  /**
   * Clear logs
   */
  clearLogs() {
    this.logs = [];
  }
}

// Create global monitor instance
export const globalEventMonitor = new EventMonitor();

// ==========================================
// EXPORTS
// ==========================================

export const EVENT_CONTRACT_VERSION = '1.0.0';
export const LAST_UPDATED = '2024-12-28'; 