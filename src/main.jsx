import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import './styles/globals.css'
import initializePerformance from './utils/initializePerformance'
import { ScrollProvider } from './context/ScrollContext'

// Import DOM purifier to handle memory leaks and WebGL context issues
import { purifier } from './utils/domPurifier'

// ⛔ Performance monitor temporarily disabled for audit
// if (process.env.NODE_ENV === 'development') {
//   initializePerformance();
// }

// Initialize DOM monitoring
console.log('🚀 Starting application with DOM purification enabled');

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  purifier.reportMemoryLeak('Uncaught Error', event.error?.message);
});

// Global handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  purifier.reportMemoryLeak('Unhandled Promise', event.reason);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  console.log('🧹 Cleaning up before page unload...');
  purifier.purgeAll();
});

// Development mode: Add global purifier access
if (import.meta.env.DEV) {
  window.purifier = purifier;
  console.log('🛠️ Development mode: Access purifier via window.purifier');
  
  // Report every 30 seconds in dev mode
  setInterval(() => {
    const report = purifier.getReport();
    if (report.activeContexts > 2 || report.memoryLeaks.length > 0) {
      console.log('📊 DOM Purifier Report:', report);
    }
  }, 30000);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
