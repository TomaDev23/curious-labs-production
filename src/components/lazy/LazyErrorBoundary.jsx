/**
 * @component LazyErrorBoundary
 * @description Specialized error boundary for lazy loading components with safe mode fallback
 * @version 1.0.0
 * @author CuriousLabs
 * 
 * Features:
 * - Catches React component errors
 * - Provides safe mode fallback
 * - Integrates with lazy loading debug system
 * - Production-ready error handling
 */

import React from 'react';
import { SafeModeLoader } from './SectionLoaders';
import lazyLoadingDebug from '../../utils/lazyLoadingDebug';

class LazyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
    this.maxRetries = 3;
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
      retryCount: this.state.retryCount + 1
    });

    // Log error to debug system
    try {
      const { componentName = 'Unknown' } = this.props;
      
      lazyLoadingDebug.trackComponentError(componentName, error, {
        context: 'error-boundary',
        errorInfo,
        retryCount: this.state.retryCount + 1,
        stack: error.stack
      });

      console.error(`🚨 LazyErrorBoundary caught error in ${componentName}:`, error, errorInfo);
    } catch (debugError) {
      console.warn('Failed to track error in debug system:', debugError);
    }

    // Send to production error tracking if available
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        tags: {
          component: this.props.componentName || 'LazyComponent',
          context: 'lazy-loading-boundary'
        },
        extra: errorInfo
      });
    }
  }

  handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null
      });
    }
  };

  render() {
    const { hasError, error, retryCount } = this.state;
    const { 
      children, 
      componentName = 'Component', 
      fallback, 
      enableRetry = true,
      className = '' 
    } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return typeof fallback === 'function' 
          ? fallback(error, this.handleRetry, retryCount)
          : fallback;
      }

      // Default safe mode fallback
      return (
        <div className={className}>
          <div className="min-h-screen flex items-center justify-center bg-black/90">
            <div className="text-center p-8 bg-gray-900/50 border border-red-400/30 rounded-lg max-w-md mx-4">
              <div className="text-red-400 text-lg font-space mb-4">⚠️ Component Error</div>
              <div className="text-white/70 text-sm mb-2">Failed to load: {componentName}</div>
              <div className="text-white/50 text-xs mb-4">
                A component error occurred during lazy loading
              </div>
              
              {/* Retry button */}
              {enableRetry && retryCount < this.maxRetries && (
                <button
                  onClick={this.handleRetry}
                  className="bg-lime-400/20 hover:bg-lime-400/30 text-lime-400 px-4 py-2 rounded text-sm mb-4 transition-colors"
                >
                  Retry ({this.maxRetries - retryCount} attempts left)
                </button>
              )}

              {/* Error details */}
              {error && (
                <details className="text-left text-xs text-white/40 bg-black/30 p-2 rounded">
                  <summary className="cursor-pointer mb-2">Error Details</summary>
                  <div className="space-y-2">
                    <div>
                      <strong>Error:</strong> {error.message}
                    </div>
                    {error.stack && (
                      <div>
                        <strong>Stack:</strong>
                        <pre className="mt-1 text-xs whitespace-pre-wrap break-all">
                          {error.stack.split('\n').slice(0, 5).join('\n')}
                        </pre>
                      </div>
                    )}
                    <div className="text-white/30 text-xs mt-2">
                      Retry Count: {retryCount}/{this.maxRetries}
                    </div>
                  </div>
                </details>
              )}

              <div className="mt-4 text-white/30 text-xs">
                This error has been logged for debugging
              </div>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default LazyErrorBoundary; 