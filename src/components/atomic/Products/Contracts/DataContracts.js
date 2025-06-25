/**
 * DATA CONTRACTS & SCHEMAS
 * 
 * Defines the exact data structures, validation rules, and default values
 * for all data used in the Products component system.
 */

// ==========================================
// PRODUCT DATA SCHEMA
// ==========================================

/**
 * Complete schema for a product item with all required and optional fields
 */
export const PRODUCT_ITEM_SCHEMA = {
  // Required fields
  id: {
    type: 'number',
    required: true,
    validation: (val) => Number.isInteger(val) && val > 0,
    description: 'Unique positive integer identifier'
  },
  
  title: {
    type: 'string',
    required: true,
    validation: (val) => typeof val === 'string' && val.length > 0,
    maxLength: 50,
    description: 'Product name - should be concise and memorable'
  },
  
  summary: {
    type: 'string',
    required: true,
    validation: (val) => typeof val === 'string' && val.length > 0,
    maxLength: 100,
    description: 'Brief one-line description for cards'
  },
  
  features: {
    type: 'array',
    required: true,
    validation: (val) => Array.isArray(val) && val.length > 0,
    itemType: 'string',
    minItems: 1,
    maxItems: 10,
    description: 'Array of feature descriptions'
  },
  
  accentColor: {
    type: 'string',
    required: true,
    validation: (val) => /^#[0-9A-Fa-f]{6}$/.test(val),
    description: 'Hex color code for theming (e.g., #84cc16)'
  },
  
  illustrationSrc: {
    type: 'string',
    required: true,
    validation: (val) => typeof val === 'string' && val.startsWith('/'),
    description: 'Absolute path to product illustration image'
  },
  
  // Optional fields with defaults
  tagline: {
    type: 'string',
    required: false,
    default: '',
    maxLength: 80,
    description: 'Marketing tagline for modal display'
  },
  
  backContent: {
    type: 'string',
    required: false,
    default: '',
    maxLength: 300,
    description: 'Extended description for back of card'
  },
  
  theme: {
    type: 'string',
    required: false,
    default: 'lime',
    enum: ['lime', 'magenta', 'amber', 'cyan'],
    description: 'Theme name - must match THEME_CONFIGS'
  },
  
  bgGradient: {
    type: 'string',
    required: false,
    default: 'from-slate-900/50 to-slate-700/30',
    description: 'Tailwind gradient classes for backgrounds'
  },
  
  fullDescription: {
    type: 'object',
    required: false,
    default: null,
    schema: 'FULL_DESCRIPTION_SCHEMA',
    description: 'Detailed product information for modals'
  }
};

/**
 * Schema for detailed product descriptions
 */
export const FULL_DESCRIPTION_SCHEMA = {
  whatItIs: {
    type: 'string',
    required: true,
    maxLength: 500,
    description: 'Complete definition of what the product is'
  },
  
  howItWorks: {
    type: 'array',
    required: true,
    itemType: 'string',
    minItems: 1,
    maxItems: 8,
    description: 'Step-by-step how the product functions'
  },
  
  whyItMatters: {
    type: 'string',
    required: true,
    maxLength: 300,
    description: 'Value proposition and importance'
  }
};

// ==========================================
// ANIMATION CONFIG SCHEMAS
// ==========================================

/**
 * Schema for Framer Motion animation variants
 */
export const ANIMATION_VARIANT_SCHEMA = {
  initial: {
    type: 'object',
    required: false,
    description: 'Initial animation state'
  },
  
  animate: {
    type: 'object',
    required: false,
    description: 'Target animation state'
  },
  
  exit: {
    type: 'object',
    required: false,
    description: 'Exit animation state'
  },
  
  transition: {
    type: 'object',
    required: false,
    properties: {
      duration: { type: 'number', min: 0 },
      delay: { type: 'number', min: 0 },
      ease: { type: 'string' },
      repeat: { type: 'number', min: 0 },
      repeatType: { type: 'string', enum: ['loop', 'reverse', 'mirror'] }
    },
    description: 'Animation timing and easing configuration'
  }
};

// ==========================================
// EVENT DATA SCHEMAS
// ==========================================

/**
 * Schema for page change events
 */
export const PAGE_CHANGE_EVENT_SCHEMA = {
  pageIndex: {
    type: 'number',
    required: true,
    min: 0,
    max: 2,
    description: 'Target page index (0=aegis, 1=products, 2=services)'
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
    enum: ['scroll', 'click', 'keyboard', 'programmatic'],
    description: 'What triggered the page change'
  }
};

/**
 * Schema for stellar phase updates
 */
export const STELLAR_PHASE_EVENT_SCHEMA = {
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
  
  timestamp: {
    type: 'number',
    required: false,
    description: 'Timestamp when phase started'
  }
};

// ==========================================
// COMPONENT STATE SCHEMAS
// ==========================================

/**
 * Schema for ProductsPage component state
 */
export const PRODUCTS_PAGE_STATE_SCHEMA = {
  currentPage: {
    type: 'number',
    required: true,
    min: 0,
    max: 3,
    default: 0,
    description: 'Index of currently active product'
  },
  
  selectedProduct: {
    type: 'object',
    required: false,
    default: null,
    schema: 'PRODUCT_ITEM_SCHEMA',
    description: 'Product selected for detailed modal view'
  }
};

/**
 * Schema for ServicesPage component state
 */
export const SERVICES_PAGE_STATE_SCHEMA = {
  text: {
    type: 'string',
    required: true,
    default: '',
    description: 'Current typewriter text content'
  },
  
  isStellarActive: {
    type: 'boolean',
    required: true,
    default: false,
    description: 'Whether stellar message component is active'
  },
  
  stellarPhase: {
    type: 'string',
    required: true,
    default: 'materialization',
    enum: ['materialization', 'constellation', 'breathing', 'dissolution'],
    description: 'Current phase of stellar sequence'
  },
  
  stellarProgress: {
    type: 'number',
    required: true,
    default: 0,
    min: 0,
    max: 1,
    description: 'Progress through stellar sequence (0-1)'
  },
  
  typewriterComplete: {
    type: 'boolean',
    required: true,
    default: false,
    description: 'Whether typewriter animation has completed'
  },
  
  canSkip: {
    type: 'boolean',
    required: true,
    default: false,
    description: 'Whether user can skip typewriter animation'
  }
};

// ==========================================
// DEFAULT VALUES
// ==========================================

/**
 * Default product item for testing/fallbacks
 */
export const DEFAULT_PRODUCT_ITEM = {
  id: 0,
  title: 'Default Product',
  summary: 'A placeholder product item',
  features: ['Default feature'],
  accentColor: '#84cc16',
  illustrationSrc: '/assets/images/placeholder.png',
  tagline: 'Default tagline',
  backContent: 'Default back content',
  theme: 'lime',
  bgGradient: 'from-slate-900/50 to-slate-700/30',
  fullDescription: {
    whatItIs: 'A default product description',
    howItWorks: ['Default functionality'],
    whyItMatters: 'Default value proposition'
  }
};

/**
 * Default animation variants
 */
export const DEFAULT_ANIMATION_VARIANTS = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeOut' }
};

/**
 * Default theme configuration
 */
export const DEFAULT_THEME_CONFIG = {
  name: 'default',
  primaryColor: '#84cc16',
  secondaryColor: '#65a30d',
  gradientFrom: 'from-slate-900/50',
  gradientTo: 'to-slate-700/30',
  particleColors: ['#84cc16', '#22d3ee', '#ffffff']
};

// ==========================================
// VALIDATION FUNCTIONS
// ==========================================

/**
 * Validates a value against a schema property
 * @param {*} value - Value to validate
 * @param {Object} schemaProp - Schema property definition
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export const validateSchemaProperty = (value, schemaProp) => {
  const errors = [];
  
  // Check required
  if (schemaProp.required && (value === undefined || value === null)) {
    errors.push(`Required field is missing`);
    return { valid: false, errors };
  }
  
  // Skip further validation if optional and not provided
  if (!schemaProp.required && (value === undefined || value === null)) {
    return { valid: true, errors: [] };
  }
  
  // Type validation
  if (schemaProp.type && typeof value !== schemaProp.type) {
    if (!(schemaProp.type === 'array' && Array.isArray(value))) {
      errors.push(`Expected ${schemaProp.type}, got ${typeof value}`);
    }
  }
  
  // Custom validation function
  if (schemaProp.validation && !schemaProp.validation(value)) {
    errors.push(`Custom validation failed`);
  }
  
  // String length validation
  if (typeof value === 'string') {
    if (schemaProp.maxLength && value.length > schemaProp.maxLength) {
      errors.push(`String too long (max: ${schemaProp.maxLength})`);
    }
    if (schemaProp.minLength && value.length < schemaProp.minLength) {
      errors.push(`String too short (min: ${schemaProp.minLength})`);
    }
  }
  
  // Array validation
  if (Array.isArray(value)) {
    if (schemaProp.minItems && value.length < schemaProp.minItems) {
      errors.push(`Array too short (min: ${schemaProp.minItems})`);
    }
    if (schemaProp.maxItems && value.length > schemaProp.maxItems) {
      errors.push(`Array too long (max: ${schemaProp.maxItems})`);
    }
  }
  
  // Number range validation
  if (typeof value === 'number') {
    if (schemaProp.min !== undefined && value < schemaProp.min) {
      errors.push(`Number too small (min: ${schemaProp.min})`);
    }
    if (schemaProp.max !== undefined && value > schemaProp.max) {
      errors.push(`Number too large (max: ${schemaProp.max})`);
    }
  }
  
  // Enum validation
  if (schemaProp.enum && !schemaProp.enum.includes(value)) {
    errors.push(`Value not in allowed enum: ${schemaProp.enum.join(', ')}`);
  }
  
  return { valid: errors.length === 0, errors };
};

/**
 * Validates an entire object against a schema
 * @param {Object} obj - Object to validate
 * @param {Object} schema - Schema definition
 * @returns {Object} - { valid: boolean, errors: Object }
 */
export const validateObject = (obj, schema) => {
  const allErrors = {};
  let isValid = true;
  
  // Check all schema properties
  Object.keys(schema).forEach(key => {
    const result = validateSchemaProperty(obj[key], schema[key]);
    if (!result.valid) {
      allErrors[key] = result.errors;
      isValid = false;
    }
  });
  
  return { valid: isValid, errors: allErrors };
};

/**
 * Creates a valid object with defaults from schema
 * @param {Object} schema - Schema definition
 * @param {Object} overrides - Values to override defaults
 * @returns {Object} - Valid object with defaults applied
 */
export const createDefaultObject = (schema, overrides = {}) => {
  const result = {};
  
  Object.keys(schema).forEach(key => {
    const schemaProp = schema[key];
    
    if (overrides.hasOwnProperty(key)) {
      result[key] = overrides[key];
    } else if (schemaProp.hasOwnProperty('default')) {
      result[key] = schemaProp.default;
    } else if (schemaProp.required) {
      // Set a reasonable default for required fields
      switch (schemaProp.type) {
        case 'string': result[key] = ''; break;
        case 'number': result[key] = 0; break;
        case 'boolean': result[key] = false; break;
        case 'array': result[key] = []; break;
        case 'object': result[key] = {}; break;
        default: result[key] = null;
      }
    }
  });
  
  return result;
};

// ==========================================
// SCHEMA REGISTRY
// ==========================================

/**
 * Registry of all available schemas
 */
export const SCHEMA_REGISTRY = {
  PRODUCT_ITEM_SCHEMA,
  FULL_DESCRIPTION_SCHEMA,
  ANIMATION_VARIANT_SCHEMA,
  PAGE_CHANGE_EVENT_SCHEMA,
  STELLAR_PHASE_EVENT_SCHEMA,
  PRODUCTS_PAGE_STATE_SCHEMA,
  SERVICES_PAGE_STATE_SCHEMA
};

/**
 * Gets a schema by name
 * @param {string} schemaName - Name of schema to retrieve
 * @returns {Object|null} - Schema definition or null if not found
 */
export const getSchema = (schemaName) => {
  return SCHEMA_REGISTRY[schemaName] || null;
};

export const DATA_CONTRACT_VERSION = '1.0.0';
export const LAST_UPDATED = '2024-12-28'; 