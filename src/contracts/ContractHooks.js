/**
 * CONTRACT SYSTEM REACT HOOKS & UTILITIES
 * 
 * React hooks and utilities for integrating the Master Contract System
 * with React components for seamless validation and monitoring.
 */

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import masterContractSystem from './MasterContractSystem.js';

// ==========================================
// CORE VALIDATION HOOKS
// ==========================================

/**
 * Hook for validating component props against contracts
 * @param {string} schemaName - Name of the schema to validate against
 * @param {Object} props - Props to validate
 * @param {Object} options - Validation options
 * @returns {Object} - Validation result and utilities
 */
export const useContractValidation = (schemaName, props, options = {}) => {
  const [validationResult, setValidationResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const previousPropsRef = useRef();

  const { 
    enableRealTime = true, 
    onValidationError = null,
    onValidationSuccess = null,
    throttleMs = 100 
  } = options;

  // Throttled validation function
  const validate = useCallback(() => {
    if (!masterContractSystem.initialized) {
      console.warn('Contract system not initialized');
      return;
    }

    setIsValidating(true);
    
    try {
      const result = masterContractSystem.validate(schemaName, props);
      setValidationResult(result);
      
      if (result.valid && onValidationSuccess) {
        onValidationSuccess(result);
      } else if (!result.valid && onValidationError) {
        onValidationError(result);
      }
    } catch (error) {
      console.error('Contract validation error:', error);
      setValidationResult({
        valid: false,
        errors: [error.message],
        warnings: [],
        data: props
      });
    } finally {
      setIsValidating(false);
    }
  }, [schemaName, props, onValidationError, onValidationSuccess]);

  // Effect for real-time validation
  useEffect(() => {
    if (!enableRealTime) return;

    // Check if props changed
    const propsChanged = JSON.stringify(props) !== JSON.stringify(previousPropsRef.current);
    if (!propsChanged && validationResult) return;

    const timeoutId = setTimeout(validate, throttleMs);
    previousPropsRef.current = props;

    return () => clearTimeout(timeoutId);
  }, [props, validate, enableRealTime, throttleMs, validationResult]);

  // Manual validation trigger
  const validateNow = useCallback(() => {
    validate();
  }, [validate]);

  return {
    result: validationResult,
    isValidating,
    isValid: validationResult?.valid || false,
    errors: validationResult?.errors || [],
    warnings: validationResult?.warnings || [],
    validatedData: validationResult?.data || props,
    validate: validateNow
  };
};

/**
 * Hook for monitoring contract violations in real-time
 * @param {string} contractName - Name of the contract to monitor
 * @param {Object} options - Monitoring options
 * @returns {Object} - Monitoring utilities and violation data
 */
export const useContractMonitor = (contractName, options = {}) => {
  const [violations, setViolations] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const monitorRef = useRef(null);

  const { 
    autoStart = true, 
    maxViolations = 100,
    onViolation = null 
  } = options;

  // Start monitoring
  const startMonitoring = useCallback(() => {
    if (isMonitoring) return;

    monitorRef.current = masterContractSystem.createMonitor(contractName, {
      onViolation: (violation) => {
        setViolations(prev => {
          const updated = [violation, ...prev].slice(0, maxViolations);
          return updated;
        });
        
        if (onViolation) {
          onViolation(violation);
        }
      }
    });

    monitorRef.current.start();
    setIsMonitoring(true);
  }, [contractName, maxViolations, onViolation]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    if (!isMonitoring || !monitorRef.current) return;

    monitorRef.current.stop();
    setIsMonitoring(false);
  }, []);

  // Clear violations
  const clearViolations = useCallback(() => {
    setViolations([]);
    if (monitorRef.current) {
      monitorRef.current.clearViolations();
    }
  }, []);

  // Record a violation manually
  const recordViolation = useCallback((violation) => {
    if (monitorRef.current) {
      monitorRef.current.recordViolation(violation);
    }
  }, []);

  // Auto-start monitoring - Fixed infinite loop
  useEffect(() => {
    if (autoStart && masterContractSystem.initialized && !isMonitoring) {
      startMonitoring();
    }

    return () => {
      if (monitorRef.current && isMonitoring) {
        monitorRef.current.stop();
        setIsMonitoring(false);
      }
    };
  }, [autoStart, contractName]); // Removed startMonitoring and stopMonitoring from dependencies

  return {
    violations,
    isMonitoring,
    violationCount: violations.length,
    startMonitoring,
    stopMonitoring,
    clearViolations,
    recordViolation
  };
};

// ==========================================
// COMPONENT LIFECYCLE HOOKS
// ==========================================

/**
 * Hook for tracking component lifecycle with contract validation
 * @param {string} componentName - Name of the component
 * @param {string} componentType - Type of component (atomic, molecular, etc.)
 * @param {Object} options - Lifecycle tracking options
 * @returns {Object} - Lifecycle state and utilities
 */
export const useComponentLifecycle = (componentName, componentType, options = {}) => {
  const [lifecycleState, setLifecycleState] = useState({
    mounted: false,
    loading: false,
    error: null,
    lastUpdate: 0
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    reRenderCount: 0
  });

  const renderStartTime = useRef(Date.now());
  const { enablePerformanceTracking = true } = options;

  // Track component mounting
  useEffect(() => {
    setLifecycleState(prev => ({
      ...prev,
      mounted: true,
      lastUpdate: Date.now()
    }));

    return () => {
      setLifecycleState(prev => ({
        ...prev,
        mounted: false
      }));
    };
  }, []);

  // Track re-renders and performance
  useEffect(() => {
    if (!enablePerformanceTracking) return;

    const renderTime = Date.now() - renderStartTime.current;
    
    setPerformanceMetrics(prev => ({
      ...prev,
      renderTime,
      reRenderCount: prev.reRenderCount + 1
    }));

    renderStartTime.current = Date.now();
  }, [enablePerformanceTracking]);

  // Set loading state
  const setLoading = useCallback((loading) => {
    setLifecycleState(prev => ({
      ...prev,
      loading,
      lastUpdate: Date.now()
    }));
  }, []);

  // Set error state
  const setError = useCallback((error) => {
    setLifecycleState(prev => ({
      ...prev,
      error,
      lastUpdate: Date.now()
    }));
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setLifecycleState(prev => ({
      ...prev,
      error: null,
      lastUpdate: Date.now()
    }));
  }, []);

  // Validate lifecycle state against contract
  const lifecycleData = useMemo(() => ({
    name: componentName,
    type: componentType,
    lifecycle: lifecycleState,
    performance: performanceMetrics
  }), [componentName, componentType, lifecycleState, performanceMetrics]);

  const { result: validationResult } = useContractValidation(
    'component-lifecycle', 
    lifecycleData,
    { enableRealTime: true }
  );

  return {
    lifecycle: lifecycleState,
    performance: performanceMetrics,
    setLoading,
    setError,
    clearError,
    isValid: validationResult?.valid || false,
    validationErrors: validationResult?.errors || []
  };
};

// ==========================================
// STATE MANAGEMENT HOOKS
// ==========================================

/**
 * Hook for validating global state against contracts
 * @param {Object} state - Global state object
 * @param {Object} options - Validation options
 * @returns {Object} - State validation utilities
 */
export const useGlobalStateValidation = (state, options = {}) => {
  const { enableRealTime = true, onStateViolation = null } = options;

  const { result, isValid, errors, warnings } = useContractValidation(
    'global-state',
    state,
    {
      enableRealTime,
      onValidationError: (result) => {
        console.warn('Global state contract violation:', result.errors);
        if (onStateViolation) {
          onStateViolation(result);
        }
      }
    }
  );

  return {
    isStateValid: isValid,
    stateErrors: errors,
    stateWarnings: warnings,
    validatedState: result?.data || state
  };
};

/**
 * Hook for managing performance-aware state
 * @param {*} initialValue - Initial state value
 * @param {Object} options - Performance options
 * @returns {Array} - [state, setState, performance]
 */
export const usePerformanceAwareState = (initialValue, options = {}) => {
  const [state, setState] = useState(initialValue);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    updateCount: 0,
    lastUpdateTime: 0,
    averageUpdateTime: 0
  });

  const { 
    throttleMs = 0, 
    enablePerformanceTracking = true,
    maxUpdatesPerSecond = 60 
  } = options;

  const lastUpdateRef = useRef(Date.now());
  const updateTimesRef = useRef([]);

  // Throttled setState
  const performanceSetState = useCallback((newValue) => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateRef.current;

    // Check rate limiting
    if (maxUpdatesPerSecond > 0) {
      const minInterval = 1000 / maxUpdatesPerSecond;
      if (timeSinceLastUpdate < minInterval) {
        setTimeout(() => performanceSetState(newValue), minInterval - timeSinceLastUpdate);
        return;
      }
    }

    // Apply throttling
    if (throttleMs > 0 && timeSinceLastUpdate < throttleMs) {
      setTimeout(() => performanceSetState(newValue), throttleMs - timeSinceLastUpdate);
      return;
    }

    // Update state
    setState(newValue);

    // Track performance
    if (enablePerformanceTracking) {
      const updateTime = Date.now() - now;
      updateTimesRef.current.push(updateTime);
      
      // Keep only recent update times
      if (updateTimesRef.current.length > 100) {
        updateTimesRef.current = updateTimesRef.current.slice(-50);
      }

      const averageUpdateTime = updateTimesRef.current.reduce((a, b) => a + b, 0) / updateTimesRef.current.length;

      setPerformanceMetrics(prev => ({
        updateCount: prev.updateCount + 1,
        lastUpdateTime: updateTime,
        averageUpdateTime
      }));
    }

    lastUpdateRef.current = now;
  }, [throttleMs, enablePerformanceTracking, maxUpdatesPerSecond]);

  return [state, performanceSetState, performanceMetrics];
};

// ==========================================
// NAVIGATION & ROUTING HOOKS
// ==========================================

/**
 * Hook for contract-validated navigation
 * @param {Object} options - Navigation options
 * @returns {Object} - Navigation utilities with contract validation
 */
export const useContractNavigation = (options = {}) => {
  const [navigationState, setNavigationState] = useState({
    currentRoute: window.location.pathname,
    previousRoute: null,
    routeParams: {},
    routeState: {},
    isNavigating: false
  });

  const { enableValidation = true } = options;

  // Validate navigation state
  const { isValid, errors } = useContractValidation(
    'global-state',
    { navigation: navigationState },
    { enableRealTime: enableValidation }
  );

  // Navigate with contract validation
  const navigate = useCallback((to, options = {}) => {
    const navigationEvent = {
      type: 'navigate',
      from: navigationState.currentRoute,
      to,
      params: options.params || {},
      state: options.state || {},
      timestamp: Date.now(),
      source: 'programmatic'
    };

    if (enableValidation) {
      const validationResult = masterContractSystem.validate('navigation-event', navigationEvent);
      if (!validationResult.valid) {
        console.error('Navigation contract violation:', validationResult.errors);
        return false;
      }
    }

    setNavigationState(prev => ({
      ...prev,
      previousRoute: prev.currentRoute,
      currentRoute: to,
      routeParams: options.params || {},
      routeState: options.state || {},
      isNavigating: true
    }));

    // Simulate navigation completion
    setTimeout(() => {
      setNavigationState(prev => ({
        ...prev,
        isNavigating: false
      }));
    }, 100);

    return true;
  }, [navigationState.currentRoute, enableValidation]);

  return {
    navigationState,
    navigate,
    isNavigationValid: isValid,
    navigationErrors: errors
  };
};

// ==========================================
// ERROR HANDLING HOOKS
// ==========================================

/**
 * Hook for contract-validated error handling
 * @param {string} componentName - Name of the component
 * @param {Object} options - Error handling options
 * @returns {Object} - Error handling utilities
 */
export const useContractErrorHandler = (componentName, options = {}) => {
  const [errorState, setErrorState] = useState(null);
  const [recoveryAttempts, setRecoveryAttempts] = useState(0);

  const { 
    maxRecoveryAttempts = 3,
    enableAutoRecovery = true,
    onError = null,
    onRecovery = null 
  } = options;

  // Handle error with contract validation
  const handleError = useCallback((error, errorInfo = {}) => {
    const errorData = {
      componentName,
      error: {
        name: error.name || 'Error',
        message: error.message || 'Unknown error',
        stack: error.stack,
        componentStack: errorInfo.componentStack
      },
      errorInfo,
      timestamp: Date.now(),
      recovery: {
        attempted: false,
        successful: false,
        fallbackUsed: false
      }
    };

    // Validate error data against contract
    const validationResult = masterContractSystem.validate('error-boundary', errorData);
    if (!validationResult.valid) {
      console.warn('Error boundary contract validation failed:', validationResult.errors);
    }

    setErrorState(validationResult.data);

    if (onError) {
      onError(errorData);
    }

    // Attempt auto-recovery
    if (enableAutoRecovery && recoveryAttempts < maxRecoveryAttempts) {
      setTimeout(() => {
        attemptRecovery();
      }, 1000 * Math.pow(2, recoveryAttempts)); // Exponential backoff
    }
  }, [componentName, recoveryAttempts, maxRecoveryAttempts, enableAutoRecovery, onError]);

  // Attempt error recovery
  const attemptRecovery = useCallback(() => {
    setRecoveryAttempts(prev => prev + 1);
    
    setErrorState(prev => ({
      ...prev,
      recovery: {
        ...prev.recovery,
        attempted: true
      }
    }));

    // Simulate recovery attempt
    setTimeout(() => {
      const successful = Math.random() > 0.3; // 70% success rate
      
      setErrorState(prev => ({
        ...prev,
        recovery: {
          ...prev.recovery,
          successful
        }
      }));

      if (successful) {
        setErrorState(null);
        setRecoveryAttempts(0);
        
        if (onRecovery) {
          onRecovery();
        }
      }
    }, 500);
  }, [onRecovery]);

  // Clear error
  const clearError = useCallback(() => {
    setErrorState(null);
    setRecoveryAttempts(0);
  }, []);

  return {
    errorState,
    hasError: errorState !== null,
    recoveryAttempts,
    handleError,
    attemptRecovery,
    clearError,
    canRetry: recoveryAttempts < maxRecoveryAttempts
  };
};

// ==========================================
// PERFORMANCE HOOKS
// ==========================================

/**
 * Hook for performance monitoring with contracts
 * @param {string} componentName - Name of the component to monitor
 * @param {Object} options - Performance monitoring options
 * @returns {Object} - Performance monitoring utilities
 */
export const usePerformanceMonitoring = (componentName, options = {}) => {
  const [performanceData, setPerformanceData] = useState({
    renderTime: 0,
    memoryUsage: 0,
    bundleSize: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0
  });

  const [budgetStatus, setBudgetStatus] = useState('ok');
  const performanceObserver = useRef(null);

  const { 
    enableRealTimeMonitoring = true,
    budgets = null 
  } = options;

  // Monitor performance metrics
  useEffect(() => {
    if (!enableRealTimeMonitoring) return;

    // Monitor paint metrics
    if ('PerformanceObserver' in window) {
      performanceObserver.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach(entry => {
          switch (entry.entryType) {
            case 'paint':
              if (entry.name === 'first-contentful-paint') {
                setPerformanceData(prev => ({
                  ...prev,
                  firstContentfulPaint: entry.startTime
                }));
              }
              break;
            case 'largest-contentful-paint':
              setPerformanceData(prev => ({
                ...prev,
                largestContentfulPaint: entry.startTime
              }));
              break;
            case 'layout-shift':
              setPerformanceData(prev => ({
                ...prev,
                cumulativeLayoutShift: prev.cumulativeLayoutShift + entry.value
              }));
              break;
          }
        });
      });

      performanceObserver.current.observe({ 
        entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] 
      });
    }

    return () => {
      if (performanceObserver.current) {
        performanceObserver.current.disconnect();
      }
    };
  }, [enableRealTimeMonitoring]);

  // Validate against performance budgets
  const validateBudgets = useCallback(() => {
    if (!budgets) return;

    const budgetData = {
      component: componentName,
      budgets,
      thresholds: {
        warning: 0.8,
        critical: 1.0
      }
    };

    const validationResult = masterContractSystem.validate('performance-budget', budgetData);
    
    if (!validationResult.valid) {
      setBudgetStatus('violation');
    } else {
      // Check if we're approaching budget limits
      const utilizationRatio = performanceData.renderTime / budgets.renderTime;
      if (utilizationRatio > 0.8) {
        setBudgetStatus('warning');
      } else if (utilizationRatio > 1.0) {
        setBudgetStatus('critical');
      } else {
        setBudgetStatus('ok');
      }
    }
  }, [componentName, budgets, performanceData]);

  // Track render time
  const trackRenderTime = useCallback((renderTime) => {
    setPerformanceData(prev => ({
      ...prev,
      renderTime
    }));
  }, []);

  return {
    performanceData,
    budgetStatus,
    trackRenderTime,
    validateBudgets,
    isPerformanceGood: budgetStatus === 'ok'
  };
};

// ==========================================
// UTILITY EXPORTS
// ==========================================

export default {
  useContractValidation,
  useContractMonitor,
  useComponentLifecycle,
  useGlobalStateValidation,
  usePerformanceAwareState,
  useContractNavigation,
  useContractErrorHandler,
  usePerformanceMonitoring
}; 