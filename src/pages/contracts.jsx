// ✅ KEEP - CONTRACTS DASHBOARD - CRITICAL DEV TOOL PAGE
// 🔴 CODE: CONTRACTS-DASH-001
// 🧬 STATUS: MASTER CONTRACT SYSTEM DASHBOARD - DEV TOOL ROUTE
// 📋 COMPONENTS: MissionControlNavbar, BackgroundLayerAtomic, ScrollToTop
// 🛠️ FEATURES: Live monitoring, system health, validation metrics, debug tools
// ⚠️ WARNING: DO NOT REMOVE - DEVELOPMENT CRITICAL ROUTE
// 📊 BUNDLE: Uses atomic background system + contract system integration
// 🎯 ROUTE: /contracts

import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import ScrollToTop from '../components/ScrollToTop';
import BackgroundLayerAtomic from '../components/atomic/BackgroundLayerAtomic';

// React hooks must be imported statically (React requirement)
import {
  useContractValidation,
  useComponentLifecycle,
  usePerformanceMonitoring,
  useContractMonitor
} from '../contracts';

// Utility functions - lazy loaded when dashboard initializes
let contractSystem = null;
let debugContractSystem = null;
let checkSystemHealth = null;
let cleanupContractSystem = null;

// Contract Dashboard Components
const SystemStatusPanel = ({ systemHealth, systemTime }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-lime-400 bg-lime-400/20 border-lime-400/30';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'critical': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  return (
    <motion.div 
      className="fixed top-20 right-4 z-50 bg-black/80 backdrop-blur-md border border-cyan-400/30 rounded-lg p-4 text-xs max-w-xs"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="text-cyan-400 font-mono mb-2 flex items-center gap-2">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        CONTRACT SYSTEM STATUS
      </div>
      
      <div className="space-y-2">
        <div className="text-white font-mono text-xs">{systemTime}</div>
        
        <div className={`px-2 py-1 rounded text-xs font-mono border ${getStatusColor(systemHealth?.overall || 'unknown')}`}>
          SYSTEM: {(systemHealth?.overall || 'UNKNOWN').toUpperCase()}
        </div>
        
        {systemHealth?.metrics && (
          <div className="space-y-1 text-xs">
            <div className="text-cyan-300">Schemas: {systemHealth.metrics.totalSchemas || 0}</div>
            <div className="text-cyan-300">Hooks: {systemHealth.metrics.activeHooks || 0}</div>
            <div className="text-cyan-300">Monitors: {systemHealth.metrics.activeMonitors || 0}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const SchemaListPanel = ({ schemas, selectedSchema, onSelectSchema }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-black/60 backdrop-blur-md border border-purple-400/30 rounded-lg p-6"
    >
      <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-purple-400 rounded-full" />
        Contract Schemas
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {schemas.map((schema, index) => (
          <motion.button
            key={schema.name}
            onClick={() => onSelectSchema(schema)}
            className={`p-4 rounded-lg border text-left transition-all duration-200 ${
              selectedSchema?.name === schema.name
                ? 'bg-purple-400/20 border-purple-400/50'
                : 'bg-white/5 border-white/10 hover:bg-purple-400/10 hover:border-purple-400/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-mono text-purple-400 text-sm mb-1">{schema.name}</div>
            <div className="text-white/70 text-xs">{schema.description}</div>
            <div className="text-purple-300 font-mono text-xs mt-2">
              Fields: {schema.fields?.length || 0}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

const ViolationMonitor = ({ violations }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-black/60 backdrop-blur-md border border-orange-400/30 rounded-lg p-6"
    >
      <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
        Live Violation Monitor
      </h3>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {violations.length === 0 ? (
          <div className="text-lime-400 text-center py-8">
            <div className="text-2xl mb-2">✅</div>
            <div>No Contract Violations</div>
            <div className="text-xs text-lime-300 mt-1">System Operating Normally</div>
          </div>
        ) : (
          violations.map((violation, index) => (
            <div key={index} className="bg-red-400/10 border border-red-400/30 rounded p-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-red-400 font-mono text-sm">{violation.type}</div>
                  <div className="text-white/80 text-xs mt-1">{violation.message}</div>
                </div>
                <div className="text-red-300 font-mono text-xs">{violation.timestamp}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

const PerformancePanel = ({ performanceData }) => {
  const getBudgetColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-lime-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-black/60 backdrop-blur-md border border-blue-400/30 rounded-lg p-6"
    >
      <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full" />
        Performance Budgets
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="text-blue-300 text-sm mb-1">Render Time</div>
          <div className={`font-mono text-lg ${getBudgetColor(performanceData?.renderTime?.status)}`}>
            {performanceData?.renderTime?.current || 0}ms
          </div>
          <div className="text-xs text-white/50">Budget: 16ms</div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="text-blue-300 text-sm mb-1">Memory Usage</div>
          <div className={`font-mono text-lg ${getBudgetColor(performanceData?.memory?.status)}`}>
            {((performanceData?.memory?.current || 0) / 1024 / 1024).toFixed(1)}MB
          </div>
          <div className="text-xs text-white/50">Budget: 50MB</div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="text-blue-300 text-sm mb-1">FPS</div>
          <div className={`font-mono text-lg ${getBudgetColor(performanceData?.fps?.status)}`}>
            {performanceData?.fps?.current || 60}
          </div>
          <div className="text-xs text-white/50">Target: 60fps</div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="text-blue-300 text-sm mb-1">Bundle Size</div>
          <div className={`font-mono text-lg ${getBudgetColor(performanceData?.bundleSize?.status)}`}>
            {((performanceData?.bundleSize?.current || 0) / 1024).toFixed(0)}KB
          </div>
          <div className="text-xs text-white/50">Budget: 250KB</div>
        </div>
      </div>
    </motion.div>
  );
};

const SystemControlPanel = ({ onCleanup, onDebug, onExport }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action, actionFn) => {
    setIsLoading(true);
    try {
      await actionFn();
    } catch (error) {
      console.error(`${action} failed:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-black/60 backdrop-blur-md border border-lime-400/30 rounded-lg p-6"
    >
      <h3 className="text-xl font-bold text-lime-400 mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-lime-400 rounded-full" />
        System Control Panel
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.button
          onClick={() => handleAction('Debug', onDebug)}
          disabled={isLoading}
          className="bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400/30 text-yellow-400 p-4 rounded-lg transition-all duration-200 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-lg mb-1">🔍</div>
          <div className="font-mono text-sm">DEBUG SYSTEM</div>
          <div className="text-xs text-yellow-300 mt-1">Export debug info</div>
        </motion.button>
        
        <motion.button
          onClick={() => handleAction('Export', onExport)}
          disabled={isLoading}
          className="bg-blue-400/20 hover:bg-blue-400/30 border border-blue-400/30 text-blue-400 p-4 rounded-lg transition-all duration-200 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-lg mb-1">📊</div>
          <div className="font-mono text-sm">EXPORT DATA</div>
          <div className="text-xs text-blue-300 mt-1">Download metrics</div>
        </motion.button>
        
        <motion.button
          onClick={() => handleAction('Cleanup', onCleanup)}
          disabled={isLoading}
          className="bg-red-400/20 hover:bg-red-400/30 border border-red-400/30 text-red-400 p-4 rounded-lg transition-all duration-200 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-lg mb-1">🧹</div>
          <div className="font-mono text-sm">CLEANUP</div>
          <div className="text-xs text-red-300 mt-1">Reset system data</div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function ContractsDashboard() {
  const [systemHealth, setSystemHealth] = useState(null);
  const [systemTime, setSystemTime] = useState(new Date());
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [violations, setViolations] = useState([]);
  const [performanceData, setPerformanceData] = useState({});
  const [schemas, setSchemas] = useState([]);

  // Contract System Integration
  const lifecycle = useComponentLifecycle('ContractsDashboard', 'page');
  const performance = usePerformanceMonitoring('ContractsDashboard', {
    budgets: { renderTime: 16, memoryUsage: 10 * 1024 * 1024 }
  });
  const monitor = useContractMonitor('dashboard', {
    onViolation: (violation) => {
      setViolations(prev => [...prev.slice(-9), {
        ...violation,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  });

  // Initialize system and update data
  useEffect(() => {
    const initializeSystem = async () => {
      try {
        // Lazy load contract system utilities
        if (!contractSystem) {
          const contractModule = await import('../contracts');
          contractSystem = contractModule.default;
          debugContractSystem = contractModule.debugContractSystem;
          checkSystemHealth = contractModule.checkSystemHealth;
          cleanupContractSystem = contractModule.cleanupContractSystem;
        }

        // Initialize contract system
        const system = await contractSystem.initialize({
          enablePerformanceMonitoring: true,
          enableDebugMode: true,
          performanceBudgets: {
            renderTime: 16,
            memoryUsage: 50 * 1024 * 1024,
            bundleSize: 250 * 1024
          }
        });

        // Get system health
        const health = checkSystemHealth();
        setSystemHealth(health);

        // Mock schemas data (in real implementation, get from contract system)
        setSchemas([
          {
            name: 'component-lifecycle',
            description: 'Component lifecycle tracking and validation',
            fields: ['name', 'type', 'props', 'state', 'lifecycle', 'performance']
          },
          {
            name: 'global-state',
            description: 'Global application state schema',
            fields: ['scroll', 'performance', 'navigation', 'ui']
          },
          {
            name: 'navigation-event',
            description: 'Navigation event validation',
            fields: ['type', 'from', 'to', 'timestamp', 'source']
          },
          {
            name: 'performance-budget',
            description: 'Performance budget enforcement',
            fields: ['renderTime', 'memoryUsage', 'bundleSize', 'fps']
          },
          {
            name: 'error-boundary',
            description: 'Error boundary contract',
            fields: ['componentName', 'error', 'errorInfo', 'recoveryAttempts']
          },
          {
            name: 'data-validation',
            description: 'Data validation schema',
            fields: ['schema', 'data', 'rules', 'validators']
          }
        ]);

        // Mock performance data
        setPerformanceData({
          renderTime: { current: 12, status: 'healthy' },
          memory: { current: 35 * 1024 * 1024, status: 'healthy' },
          fps: { current: 60, status: 'healthy' },
          bundleSize: { current: 180 * 1024, status: 'healthy' }
        });

      } catch (error) {
        console.error('Failed to initialize contract system:', error);
      }
    };

    initializeSystem();

    // Update system time
    const timer = setInterval(() => {
      setSystemTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // System control actions
  const handleDebug = async () => {
    const debugInfo = debugContractSystem('all');
    console.log('Contract System Debug Info:', debugInfo);
    
    // Create and download debug file
    const blob = new Blob([JSON.stringify(debugInfo, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract-debug-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    const exportData = {
      systemHealth,
      performanceData,
      violations: violations.slice(-50),
      schemas,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract-metrics-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCleanup = async () => {
    await cleanupContractSystem({
      clearValidationHistory: true,
      resetPerformanceMetrics: true,
      clearMonitoringData: true
    });
    
    setViolations([]);
    setSystemHealth(null);
    
    // Re-check system health after cleanup
    setTimeout(() => {
      const health = checkSystemHealth();
      setSystemHealth(health);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-['Space_Grotesk']">
      <Helmet>
        <title>Contract System Dashboard - Developer Tools | CuriousLabs</title>
        <meta name="description" content="Real-time monitoring and control dashboard for the CuriousLabs Master Contract System." />
        <meta property="og:title" content="Contract System Dashboard - Developer Tools | CuriousLabs" />
        <meta property="og:description" content="Real-time monitoring and control dashboard for the CuriousLabs Master Contract System." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* Atmospheric Glow - Cyan theme for contracts */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full blur-2xl" />
      </div>
      
      <MissionControlNavbar />
      
      {/* System Status Panel */}
      <SystemStatusPanel 
        systemHealth={systemHealth} 
        systemTime={systemTime.toUTCString().slice(17, 25) + ' UTC'} 
      />
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16 relative z-10">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            {/* Contract System Logo */}
            <motion.div
              className="inline-block mb-8 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative w-40 h-40 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-500 rounded-full animate-pulse" />
                <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                  <div className="text-6xl">🧬</div>
                </div>
              </div>
            </motion.div>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400"></div>
              <span className="text-cyan-400 font-mono text-sm tracking-wider">CONTRACTS-DASH-001</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400"></div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-500 text-transparent bg-clip-text">
                CONTRACT SYSTEM
              </span>
            </h1>
            
            <div className="text-xl sm:text-2xl text-cyan-400 font-mono mb-4 tracking-wide">
              DASHBOARD & MONITORING
            </div>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Real-time monitoring and control center for the CuriousLabs Master Contract System. 
              Monitor schema validation, performance budgets, system health, and debug operations.
            </p>
          </motion.div>
        </section>

        {/* Dashboard Content */}
        <section className="max-w-7xl mx-auto px-4 space-y-8">
          <SchemaListPanel 
            schemas={schemas}
            selectedSchema={selectedSchema}
            onSelectSchema={setSelectedSchema}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ViolationMonitor violations={violations} />
            <PerformancePanel performanceData={performanceData} />
          </div>
          
          <SystemControlPanel 
            onDebug={handleDebug}
            onExport={handleExport}
            onCleanup={handleCleanup}
          />
        </section>

        {/* Schema Detail Modal */}
        <AnimatePresence>
          {selectedSchema && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSchema(null)}
            >
              <motion.div
                className="bg-black/90 backdrop-blur-md border border-purple-400/30 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400 mb-2">{selectedSchema.name}</h3>
                    <p className="text-white/70">{selectedSchema.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSchema(null)}
                    className="text-white/50 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-purple-300 font-mono text-sm mb-2">Schema Fields:</h4>
                    <div className="space-y-2">
                      {selectedSchema.fields?.map((field, index) => (
                        <div key={index} className="bg-purple-400/10 border border-purple-400/20 rounded p-2">
                          <code className="text-purple-300 text-sm">{field}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-cyan-300 font-mono text-sm mb-2">Usage Example:</h4>
                    <pre className="text-xs text-white/80 font-mono overflow-x-auto">
{`const validation = useContractValidation('${selectedSchema.name}', data);
if (!validation.isValid) {
  console.error('Validation failed:', validation.errors);
}`}
                    </pre>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <ScrollToTop />
    </div>
  );
} 