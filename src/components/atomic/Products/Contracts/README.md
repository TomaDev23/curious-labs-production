# Products Component Contracts System

A comprehensive contract system for the Products component ecosystem that provides type safety, validation, performance optimization, and event management.

## 📋 System Overview

The contract system consists of four main modules:

- **Component Contracts** - Component prop interfaces and validation
- **Data Contracts** - Data schemas and validation rules  
- **Event Contracts** - Custom event definitions and communication
- **Performance Contracts** - Performance optimization and monitoring

## 🚀 Quick Start

```javascript
// Import the complete contract system
import ContractSystem from './Contracts/index.js';

// Initialize the system
const system = ContractSystem.initialize({
  enablePerformanceMonitoring: true,
  enableEventMonitoring: true,
  validateOnInit: true
});

// Use the system
const config = system.createConfig('AegisPage', props, deviceCapabilities);
```

## 📁 File Structure

```
Contracts/
├── index.js                    # Main export and system integration
├── ComponentContracts.js       # Component prop interfaces
├── DataContracts.js           # Data schemas and validation
├── EventContracts.js          # Event system and communication
├── PerformanceContracts.js    # Performance optimization
└── README.md                  # This documentation
```

## 🔧 Component Contracts

Define prop interfaces and validation for all components.

### Usage

```javascript
import { validateComponentProps, AegisPageProps } from './ComponentContracts.js';

// Validate component props
const validation = validateComponentProps('AegisPage', props);
if (!validation.isValid) {
  console.error('Invalid props:', validation.errors);
}
```

### Available Interfaces

- `AegisPageProps` - Hero/intro section props
- `ProductsPageProps` - Products showcase props  
- `ServicesPageProps` - Services page props
- `EnhancedProductCardProps` - Product card props
- `ProductDetailModalProps` - Modal props
- `ThrottledAnimatePresenceProps` - Animation wrapper props
- `ServicesCosmicEnvironmentProps` - Cosmic environment props
- `CosmicUIProps` - UI overlay props
- `IntegratedTypographyProps` - Typography props

## 📊 Data Contracts

Define data schemas with validation rules and default values.

### Usage

```javascript
import { 
  PRODUCT_ITEM_SCHEMA, 
  validateObject, 
  DEFAULT_PRODUCT_ITEM 
} from './DataContracts.js';

// Validate product data
const validation = validateObject(PRODUCT_ITEM_SCHEMA, productData);
if (!validation.isValid) {
  console.error('Invalid product data:', validation.errors);
}

// Use default values
const newProduct = { ...DEFAULT_PRODUCT_ITEM, ...customData };
```

### Available Schemas

- `PRODUCT_ITEM_SCHEMA` - Product item structure
- `FULL_DESCRIPTION_SCHEMA` - Detailed product descriptions
- `ANIMATION_VARIANT_SCHEMA` - Animation configurations
- `PAGE_CHANGE_EVENT_SCHEMA` - Page change events
- `STELLAR_PHASE_EVENT_SCHEMA` - Stellar phase updates
- `PRODUCTS_PAGE_STATE_SCHEMA` - Products page state
- `SERVICES_PAGE_STATE_SCHEMA` - Services page state
- `THEME_CONFIG_SCHEMA` - Theme configurations

## 🎯 Event Contracts

Define custom events and communication patterns between components.

### Usage

```javascript
import { 
  EVENT_TYPES, 
  dispatchPageChangeEvent, 
  useCustomEvent 
} from './EventContracts.js';

// Dispatch events
dispatchPageChangeEvent({
  pageIndex: 1,
  pageName: 'Products',
  trigger: 'navigation'
});

// Listen to events (React hook)
useCustomEvent(EVENT_TYPES.HORIZONTAL_PAGE_CHANGE, (event) => {
  console.log('Page changed:', event.detail);
});
```

### Event Types

- **Navigation Events**
  - `HORIZONTAL_PAGE_CHANGE`
  - `PAGE_TRANSITION_START`
  - `PAGE_TRANSITION_COMPLETE`

- **Stellar Message Events**
  - `STELLAR_PHASE_UPDATE`
  - `STELLAR_SEQUENCE_COMPLETE`

- **Theme Events**
  - `UPDATE_ACCENT_COLOR`
  - `THEME_CHANGE`

- **Product Events**
  - `PRODUCT_CARD_HOVER`
  - `PRODUCT_MODAL_OPEN`
  - `PRODUCT_MODAL_CLOSE`

- **Performance Events**
  - `PERFORMANCE_THROTTLE_CHANGE`
  - `DEBUG_MODE_TOGGLE`

## ⚡ Performance Contracts

Define performance optimization strategies and monitoring.

### Usage

```javascript
import { 
  calculateOptimalSettings,
  createPerformanceAwareConfig,
  globalPerformanceMonitor 
} from './PerformanceContracts.js';

// Calculate optimal settings for device
const settings = calculateOptimalSettings(deviceCapabilities);

// Create performance-aware component config
const config = createPerformanceAwareConfig('AegisPage', settings.performanceLevel);

// Monitor performance
globalPerformanceMonitor.startMonitoring();
const metrics = globalPerformanceMonitor.getMetrics();
```

### Performance Levels

- **High** - Full animations and effects
- **Medium** - Reduced complexity
- **Low** - Minimal animations  
- **None** - Static content only

## 🔄 Integration Examples

### Complete Component Setup

```javascript
import { 
  createIntegratedComponentConfig,
  initializeContractSystem 
} from './Contracts/index.js';

// Initialize system
const system = initializeContractSystem({
  enablePerformanceMonitoring: true,
  enableEventMonitoring: true
});

// Create complete component configuration
const config = createIntegratedComponentConfig(
  'AegisPage', 
  baseProps, 
  deviceCapabilities
);

// Use the configuration
const MyComponent = () => {
  const { props, performance, events, validation } = config;
  
  // Component implementation with validated props and performance settings
  return <AegisPage {...props} performanceConfig={performance} />;
};
```

### Event-Driven Communication

```javascript
import { createEventSystem } from './Contracts/index.js';

// Create event system with monitoring
const eventSystem = createEventSystem(true);

// Component A dispatches event
const success = eventSystem.dispatch('HORIZONTAL_PAGE_CHANGE', {
  pageIndex: 2,
  pageName: 'Services',
  trigger: 'user_click'
});

// Component B listens for events
const cleanup = eventSystem.listen(['HORIZONTAL_PAGE_CHANGE'], (event) => {
  console.log('Page changed to:', event.detail.pageName);
});

// Cleanup when component unmounts
useEffect(() => cleanup, []);
```

### Performance Monitoring

```javascript
import { createPerformanceSystem } from './Contracts/index.js';

// Create performance system
const performanceSystem = createPerformanceSystem();

// Start monitoring
performanceSystem.start();

// Get recommendations
const recommendations = performanceSystem.getRecommendations();

// Apply optimizations
const optimizedConfig = performanceSystem.optimize('ProductsPage', baseConfig);

// Cleanup
useEffect(() => performanceSystem.stop, []);
```

## 🛠️ Development Workflow

### 1. Define Component Interface

```javascript
// In ComponentContracts.js
export const MyNewComponentProps = {
  title: { type: 'string', required: true },
  items: { type: 'array', required: true },
  theme: { type: 'string', default: 'default' }
};
```

### 2. Create Data Schema

```javascript
// In DataContracts.js
export const MY_COMPONENT_SCHEMA = {
  title: {
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 100
  },
  // ... more fields
};
```

### 3. Define Events

```javascript
// In EventContracts.js
export const MY_COMPONENT_EVENTS = {
  ITEM_SELECTED: 'my-component:item-selected',
  STATE_CHANGED: 'my-component:state-changed'
};
```

### 4. Add Performance Rules

```javascript
// In PerformanceContracts.js
export const COMPONENT_PERFORMANCE_RULES = {
  MyNewComponent: {
    animationComplexity: {
      high: 'full-effects',
      medium: 'reduced-effects',
      low: 'minimal-effects'
    }
  }
};
```

## 🔍 Validation and Debugging

### Enable Debug Mode

```javascript
const system = initializeContractSystem({
  enablePerformanceMonitoring: true,
  enableEventMonitoring: true,
  validateOnInit: true
});

// Validate system integrity
const validation = system.validate();
console.log('System validation:', validation);
```

### Component Validation

```javascript
// Validate props before rendering
const propValidation = validateComponentProps('AegisPage', props);
if (!propValidation.isValid) {
  console.error('Component validation failed:', propValidation.errors);
}

// Validate data before processing
const dataValidation = validateObject(PRODUCT_ITEM_SCHEMA, productData);
if (!dataValidation.isValid) {
  console.error('Data validation failed:', dataValidation.errors);
}
```

### Event Monitoring

```javascript
import { EventMonitor } from './EventContracts.js';

const monitor = new EventMonitor();
monitor.startMonitoring();

// View event logs
console.log('Event logs:', monitor.getLogs());

// Clear logs
monitor.clearLogs();
```

## 📈 Performance Monitoring

### Real-time Metrics

```javascript
const monitor = globalPerformanceMonitor;
monitor.startMonitoring();

// Get current metrics
const summary = monitor.getPerformanceSummary();
console.log('FPS:', summary.metrics.frameRate?.value);
console.log('Memory:', summary.metrics.memoryUsage?.value, 'MB');
```

### Adaptive Performance

```javascript
// Get recommended throttling based on current performance
const recommendedLevel = monitor.getRecommendedThrottling();

// Apply appropriate settings
const throttleConfig = THROTTLING_CONFIGS[recommendedLevel];
```

## 🧹 Cleanup and Memory Management

```javascript
// Complete system cleanup
const system = initializeContractSystem();

// When application unmounts
useEffect(() => {
  return () => {
    system.cleanup(); // Cleans up all monitoring and event listeners
  };
}, []);
```

## 📝 Best Practices

1. **Always validate props** before component rendering
2. **Use performance monitoring** in production builds
3. **Clean up event listeners** when components unmount
4. **Validate data schemas** before processing external data
5. **Monitor performance metrics** and adjust settings dynamically
6. **Use typed events** for component communication
7. **Follow the contract interfaces** for consistent development

## 🚨 Troubleshooting

### Common Issues

**Build Errors**
- Ensure all import paths are correct
- Check that contract files exist
- Validate schema definitions

**Performance Issues** 
- Enable performance monitoring
- Check recommended throttling levels
- Reduce animation complexity on low-end devices

**Event Issues**
- Verify event types are defined
- Check event payload validation
- Ensure proper cleanup of listeners

**Validation Errors**
- Check schema definitions match data structure
- Verify required fields are provided
- Ensure data types match expectations

---

## 📊 System Status

- **Version**: 1.0.0
- **Last Updated**: 2024-12-28
- **Components**: 9 component interfaces
- **Schemas**: 8 data schemas  
- **Events**: 15+ event types
- **Performance Rules**: 3 component rules

The contract system is fully operational and ready for production use! 🚀 