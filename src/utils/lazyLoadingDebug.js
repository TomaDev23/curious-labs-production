/**
 * @module LazyLoadingDebug
 * @description Production-ready debug utilities for lazy loading system with smart logging
 * @version 1.1.0 - Reduced Console Spam
 * @author CuriousLabs
 */

class LazyLoadingDebug {
  constructor() {
    this.isEnabled = false;
    this.verboseMode = false; // New: separate verbose mode
    this.stats = {
      totalComponents: 0,
      loadedComponents: 0,
      loadingComponents: 0,
      errorComponents: 0,
      averageLoadTime: 0,
      totalLoadTime: 0,
      componentStats: new Map(),
      startTime: performance.now()
    };
    
    // Rate limiting for debug logs
    this.logCache = new Map();
    this.rateLimitMs = 2000; // Only log same message every 2 seconds
    
    // Initialize debug mode from localStorage or URL params
    this.initializeDebugMode();
  }

  initializeDebugMode() {
    // Always attach cosmic protocol in development mode (for easter eggs)
    if (process.env.NODE_ENV === 'development') {
      this.attachToWindow();
      
      // Beautiful cosmic welcome (per contract) - not debug spam
      setTimeout(() => {
        console.log('🌌 [COSMIC PROTOCOL] Welcome, developer. Your tools await at cosmicProtocol.activate()');
      }, 1000);
    }

    // Check if debug mode is explicitly enabled
    const urlParams = new URLSearchParams(window.location.search);
    const isDebugParam = urlParams.get('lazy-debug') === 'true';
    const isDebugStorage = localStorage.getItem('lazy-debug') === 'true';
    
    this.enabled = isDebugParam || isDebugStorage;
    
    if (this.enabled) {
      this.attachToWindow();
      this.log('🎯 Debug mode activated');
      
      // Initialize cosmic easter eggs for enhanced developer experience
      this.initializeCosmicEasterEggs();
    }
  }

  // Initialize cosmic easter eggs as per contract
  initializeCosmicEasterEggs() {
    // Random cosmic welcome messages
    const welcomeMessages = [
      '🌟 [STELLAR-VIEW] Your presence illuminates the cosmic interface',
      '🛰️ [COSMIC-NET] Neural pathways synchronized with developer systems',
      '⚡ [POWER-SURGE] Creative energy levels optimal for coding',
      '🎯 [TARGETING] Perfect development trajectory locked and loaded'
    ];
    
    // Show a random welcome message after a brief delay
    setTimeout(() => {
      const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      console.log(randomMessage);
    }, 1500);
    
    // Add periodic cosmic encouragement (per contract specification)
    this.startCosmicEncouragement();
  }

  // Periodic cosmic encouragement system
  startCosmicEncouragement() {
    const encouragementMessages = [
      '🌟 [QUANTUM-LINK] Developer intuition amplified',
      '⚡ [ENERGY-SURGE] Coding efficiency increased by cosmic forces',
      '🚀 [MISSION STATUS] All development systems primed for success',
      '🌌 [COSMIC WISDOM] The code flows through you, Commander',
      '🎯 [TARGETING] Perfect solution alignment detected'
    ];
    
    // Show encouragement every 5-10 minutes during development
    const showEncouragement = () => {
      if (process.env.NODE_ENV === 'development') {
        const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
        console.log(randomMessage);
        
        // Schedule next encouragement (5-10 minutes)
        const nextDelay = (5 + Math.random() * 5) * 60 * 1000;
        setTimeout(showEncouragement, nextDelay);
      }
    };
    
    // Start first encouragement after 5 minutes
    setTimeout(showEncouragement, 5 * 60 * 1000);
  }

  attachToWindow() {
    // Make debug utility globally available
    if (typeof window !== 'undefined') {
      window.lazyDebug = this;
      
      // Add Cosmic Protocol as per contract specification
      window.cosmicProtocol = {
        // Welcome sequence with available commands
        activate: () => {
          console.log('🌌 [COSMIC PROTOCOL ACTIVATED]');
          console.log('🚀 [MISSION CONTROL] Welcome aboard, Commander!');
          console.log('🎯 Available cosmic commands:');
          console.log('   • cosmicProtocol.boost() - Developer productivity surge');
          console.log('   • cosmicProtocol.status() - Commander metrics display');
          console.log('   • cosmicProtocol.wisdom() - Cosmic coding insights');
          console.log('   • cosmicProtocol.mission() - Performance intelligence');
          console.log('🛰️ [COSMIC NETWORK] All systems primed for exploration');
        },
        
        // Temporary boost message
        boost: () => {
          const boostLevel = Math.floor(Math.random() * 50 + 100);
          console.log(`⚡ [POWER-SURGE] Developer efficiency increased by ${boostLevel}%!`);
          console.log('🔥 [QUANTUM-LINK] All bugs will fear your cosmic presence');
          console.log('🚀 [MISSION STATUS] Neural pathways optimized for peak performance');
        },
        
        // Show developer "stats"
        status: () => {
          const experience = Math.floor(Math.random() * 15 + 85);
          const quality = ['Transcendent', 'Legendary', 'Elite', 'Cosmic'][Math.floor(Math.random() * 4)];
          console.log('🛰️ [COSMIC STATUS] Commander Profile Analysis:');
          console.log(`🌟 Developer Level: ${quality}`);
          console.log(`🎯 Mission Completion Rate: ${experience}.${Math.floor(Math.random() * 10)}%`);
          console.log(`🚀 Code Quality Index: ${quality}`);
          console.log('⚡ [POWER-CORE] All systems nominal, Commander');
        },
        
        // Random coding wisdom
        wisdom: () => {
          const wisdom = this.getRandomCosmicWisdom();
          console.log(`🧙 [COSMIC WISDOM] "${wisdom}"`);
          console.log('🌌 [TRANSMISSION] Wisdom downloaded to neural cortex');
        },
        
        // Quick access to mission report
        mission: () => {
          if (this.isEnabled) {
            this.missionReport();
          } else {
            console.log('🚀 [MISSION CONTROL] Debug systems offline');
            console.log('💡 [HINT] Use lazyDebug.enable() to activate mission intelligence');
          }
        }
      };
    }
  }

  help() {
    console.log(`
🌌 ═══════════════════════════════════════════════════════════════════════════════
🚀 [MISSION CONTROL] Cosmic Debug Command Interface
🌌 ═══════════════════════════════════════════════════════════════════════════════

🛰️ MISSION REPORTS:
📊 lazyDebug.missionReport()     - Cosmic performance intelligence report
🚀 lazyDebug.deploymentReport()  - Module deployment status report  
📋 lazyDebug.printReport()       - Comprehensive technical analysis
📈 lazyDebug.componentStats()    - Detailed component loading statistics

🎯 TACTICAL ANALYSIS:
⚡ lazyDebug.stats()             - Quick performance statistics
🐌 lazyDebug.slowComponents()    - Components with slow loading times
⚠️ lazyDebug.errorComponents()   - Components with loading errors
🎨 lazyDebug.visualize()         - Visual loading timeline

🔧 MISSION CONTROL:
🔍 lazyDebug.enable()            - Enable debug mode
🔇 lazyDebug.disable()           - Disable debug mode
📢 lazyDebug.setVerbose(true)    - Enable verbose logging
🔇 lazyDebug.setVerbose(false)   - Disable verbose logging (default)
🔄 lazyDebug.reset()             - Reset all statistics

💾 DATA TRANSMISSION:
💾 lazyDebug.exportStats()       - Export statistics as JSON

🌌 [COMMANDER] Use any command to access cosmic intelligence data
🛸 [WISDOM] May the performance metrics be with you!
🌌 ═══════════════════════════════════════════════════════════════════════════════
    `);
  }

  enable() {
    this.isEnabled = true;
    localStorage.setItem('lazy-loading-debug', 'true');
    console.log('🔧 Lazy Loading Debug: ENABLED');
    this.attachToWindow();
  }

  disable() {
    this.isEnabled = false;
    localStorage.setItem('lazy-loading-debug', 'false');
    console.log('🔇 Lazy Loading Debug: DISABLED');
  }

  setVerbose(enabled) {
    this.verboseMode = enabled;
    localStorage.setItem('lazy-loading-verbose', enabled.toString());
    console.log(`📢 Verbose Mode: ${enabled ? 'ENABLED' : 'DISABLED'}`);
  }

  // Smart logging with rate limiting
  log(message, data = null) {
    if (!this.isEnabled) return;
    
    // Only log in verbose mode or for important events
    if (!this.verboseMode && !this.isImportantMessage(message)) return;
    
    // Rate limiting to prevent spam
    const now = Date.now();
    const cacheKey = message + (data ? JSON.stringify(data) : '');
    const lastLogged = this.logCache.get(cacheKey);
    
    if (lastLogged && (now - lastLogged) < this.rateLimitMs) {
      return; // Skip this log to prevent spam
    }
    
    this.logCache.set(cacheKey, now);
    
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    console.log(`[${timestamp}] 🔍 ${message}`, data || '');
  }

  // Determine if a message is important enough to show in quiet mode
  isImportantMessage(message) {
    const criticalKeywords = [
      'error', 'failed', 'safe mode', 'activated', 'warning', 'retry'
    ];
    
    // In quiet mode, only show critical issues, not routine operations
    return criticalKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
  }

  trackComponentLoad(componentName, loadTime, metadata = {}) {
    if (!this.stats.componentStats.has(componentName)) {
      this.stats.componentStats.set(componentName, {
        name: componentName,
        loadCount: 0,
        totalLoadTime: 0,
        averageLoadTime: 0,
        minLoadTime: Infinity,
        maxLoadTime: 0,
        errors: 0,
        metadata: {}
      });
    }

    const component = this.stats.componentStats.get(componentName);
    component.loadCount++;
    component.totalLoadTime += loadTime;
    component.averageLoadTime = component.totalLoadTime / component.loadCount;
    component.minLoadTime = Math.min(component.minLoadTime, loadTime);
    component.maxLoadTime = Math.max(component.maxLoadTime, loadTime);
    component.metadata = { ...component.metadata, ...metadata };

    // Update global stats
    this.stats.loadedComponents++;
    this.stats.totalLoadTime += loadTime;
    this.stats.averageLoadTime = this.stats.totalLoadTime / this.stats.loadedComponents;

    // Beautiful cosmic easter eggs for component loads (per contract)
    if (process.env.NODE_ENV === 'development') {
      this.showCosmicLoadMessage(componentName, loadTime, metadata);
    }

    // Technical debug logging only if explicitly enabled
    if (this.isEnabled && this.verboseMode) {
      this.log(`Component loaded: ${componentName}`, {
        loadTime: `${loadTime.toFixed(2)}ms`,
        type: metadata.type || 'lazy',
        priority: metadata.priority || 'unknown'
      });
    }
  }

  // Show beautiful cosmic messages for component loads (contract specification)
  showCosmicLoadMessage(componentName, loadTime, metadata) {
    const cosmicMessages = {
      // Component-specific cosmic messages
      'MissionAtomic': [
        '🚀 [MISSION-MODULE] Core directive systems online',
        '🌟 [STELLAR-MISSION] Command protocols synchronized',
        '⚡ [POWER-CORE] Mission parameters loaded successfully'
      ],
      'HorizontalProductScrollV6': [
        '📦 [CARGO-BAY] Product catalog systems deployed',
        '🛸 [INVENTORY] Arsenal specifications downloaded',
        '🎯 [PRODUCT-SCAN] Quality assurance protocols confirmed'
      ],
      'ServicesOrbitalAtomic': [
        '🛰️ [ORBITAL-SERVICES] Service grid operational',
        '⚡ [SERVICE-NET] All systems primed for engagement',
        '🌌 [COSMIC-SERVICES] Service pathways illuminated'
      ],
      'ContactTerminalAtomic': [
        '📡 [COMMUNICATION] Direct channel established',
        '🤝 [ALLIANCE] Diplomatic protocols engaged',
        '🌐 [CONTACT-GRID] Communication systems active'
      ],
      'HeroAtomic': [
        '🌟 [HERO-PROTOCOL] Welcome sequence initiated',
        '🚀 [LAUNCH-PAD] Interface systems primed',
        '⚡ [HERO-CORE] Main display systems online'
      ]
    };

    // Generic cosmic messages for unknown components
    const genericMessages = [
      '🌟 [QUANTUM-LINK] Module accessed - Neural pathways synchronized',
      '⚡ [ENERGY-SURGE] Component powers amplified',
      '🎯 [TARGET-LOCK] Perfect module alignment achieved',
      '🛰️ [COSMIC-NET] System integration successful',
      '🌌 [STELLAR-LOAD] Module deployment completed'
    ];

    const messages = cosmicMessages[componentName] || genericMessages;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Only show occasionally to avoid spam (30% chance)
    if (Math.random() < 0.3) {
      console.log(randomMessage);
    }
  }

  trackComponentError(componentName, error, metadata = {}) {
    if (!this.stats.componentStats.has(componentName)) {
      this.stats.componentStats.set(componentName, {
        name: componentName,
        loadCount: 0,
        totalLoadTime: 0,
        averageLoadTime: 0,
        minLoadTime: Infinity,
        maxLoadTime: 0,
        errors: 0,
        metadata: {}
      });
    }

    const component = this.stats.componentStats.get(componentName);
    component.errors++;
    component.metadata = { ...component.metadata, ...metadata };

    this.stats.errorComponents++;

    // Errors are always important
    console.error(`❌ Component error: ${componentName}`, error, metadata);
  }

  // Add a method to log component state changes only when they actually change
  logStateChange(componentName, newState, previousState = null) {
    if (!this.isEnabled) return;
    
    // Only log if state actually changed
    if (previousState && JSON.stringify(newState) === JSON.stringify(previousState)) {
      return;
    }
    
    // Only log important state changes
    const importantChanges = ['inView', 'hasBeenInView', 'hasLoaded', 'isInSafeMode', 'loadError'];
    const hasImportantChange = importantChanges.some(key => 
      newState[key] !== previousState?.[key]
    );
    
    if (!hasImportantChange && !this.verboseMode) {
      return;
    }
    
    this.log(`State change for ${componentName}`, {
      changes: this.getStateChanges(newState, previousState),
      currentState: newState
    });
  }

  getStateChanges(newState, previousState) {
    if (!previousState) return { type: 'initial' };
    
    const changes = {};
    Object.keys(newState).forEach(key => {
      if (newState[key] !== previousState[key]) {
        changes[key] = {
          from: previousState[key],
          to: newState[key]
        };
      }
    });
    
    return changes;
  }

  stats() {
    const uptime = (performance.now() - this.stats.startTime) / 1000;
    
    console.log(`
📊 Lazy Loading Performance Statistics
═══════════════════════════════════════════════════════════════════════════════
⏱️  Uptime: ${uptime.toFixed(2)}s
📦 Total Components: ${this.stats.totalComponents}
✅ Loaded Components: ${this.stats.loadedComponents}
⏳ Loading Components: ${this.stats.loadingComponents}
❌ Error Components: ${this.stats.errorComponents}
📈 Average Load Time: ${this.stats.averageLoadTime.toFixed(2)}ms
📊 Total Load Time: ${this.stats.totalLoadTime.toFixed(2)}ms
🔧 Debug Mode: ${this.isEnabled ? 'ON' : 'OFF'}
📢 Verbose Mode: ${this.verboseMode ? 'ON' : 'OFF'}
═══════════════════════════════════════════════════════════════════════════════
    `);
    
    return this.stats;
  }

  componentStats() {
    console.log('\n📈 Component Loading Statistics:');
    console.log('═══════════════════════════════════════════════════════════════════════════════');
    
    const sortedComponents = Array.from(this.stats.componentStats.values())
      .sort((a, b) => b.averageLoadTime - a.averageLoadTime);

    sortedComponents.forEach(component => {
      console.log(`
🎯 ${component.name}:
   📊 Loads: ${component.loadCount}
   ⏱️  Avg: ${component.averageLoadTime.toFixed(2)}ms
   🚀 Min: ${component.minLoadTime === Infinity ? 'N/A' : component.minLoadTime.toFixed(2)}ms
   🐌 Max: ${component.maxLoadTime.toFixed(2)}ms
   ❌ Errors: ${component.errors}
   📦 Strategy: ${component.metadata.strategy || 'N/A'}
   🎚️  Priority: ${component.metadata.priority || 'N/A'}
      `);
    });
    
    return sortedComponents;
  }

  slowComponents(threshold = 1000) {
    const slowComponents = Array.from(this.stats.componentStats.values())
      .filter(component => component.averageLoadTime > threshold)
      .sort((a, b) => b.averageLoadTime - a.averageLoadTime);

    console.log(`\n🐌 Components slower than ${threshold}ms:`);
    console.log('═══════════════════════════════════════════════════════════════════════════════');
    
    if (slowComponents.length === 0) {
      console.log('🎉 No slow components found!');
      return [];
    }

    slowComponents.forEach(component => {
      console.log(`⚠️  ${component.name}: ${component.averageLoadTime.toFixed(2)}ms average`);
    });
    
    return slowComponents;
  }

  errorComponents() {
    const errorComponents = Array.from(this.stats.componentStats.values())
      .filter(component => component.errors > 0)
      .sort((a, b) => b.errors - a.errors);

    console.log('\n❌ Components with errors:');
    console.log('═══════════════════════════════════════════════════════════════════════════════');
    
    if (errorComponents.length === 0) {
      console.log('✅ No component errors found!');
      return [];
    }

    errorComponents.forEach(component => {
      console.log(`❌ ${component.name}: ${component.errors} errors`);
    });
    
    return errorComponents;
  }

  reset() {
    this.stats = {
      totalComponents: 0,
      loadedComponents: 0,
      loadingComponents: 0,
      errorComponents: 0,
      averageLoadTime: 0,
      totalLoadTime: 0,
      componentStats: new Map(),
      startTime: performance.now()
    };
    
    this.logCache.clear();
    console.log('🔄 Lazy loading statistics reset');
  }

  exportStats() {
    const exportData = {
      ...this.stats,
      componentStats: Array.from(this.stats.componentStats.entries()),
      exportedAt: new Date().toISOString(),
      uptime: (performance.now() - this.stats.startTime) / 1000
    };
    
    const jsonData = JSON.stringify(exportData, null, 2);
    
    // Create downloadable file
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lazy-loading-stats-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('💾 Statistics exported successfully');
    return exportData;
  }

  printReport() {
    console.log(`
🎯 LAZY LOADING PERFORMANCE REPORT
═══════════════════════════════════════════════════════════════════════════════
Generated: ${new Date().toLocaleString()}
Uptime: ${((performance.now() - this.stats.startTime) / 1000).toFixed(2)}s
═══════════════════════════════════════════════════════════════════════════════

📊 OVERVIEW:
• Total Components: ${this.stats.totalComponents}
• Successfully Loaded: ${this.stats.loadedComponents}
• Currently Loading: ${this.stats.loadingComponents}  
• Failed to Load: ${this.stats.errorComponents}
• Success Rate: ${((this.stats.loadedComponents / this.stats.totalComponents) * 100).toFixed(1)}%

⏱️  PERFORMANCE:
• Average Load Time: ${this.stats.averageLoadTime.toFixed(2)}ms
• Total Load Time: ${this.stats.totalLoadTime.toFixed(2)}ms
• Fastest Component: ${this.getFastestComponent()}
• Slowest Component: ${this.getSlowestComponent()}

🎯 RECOMMENDATIONS:
${this.getRecommendations()}
═══════════════════════════════════════════════════════════════════════════════
    `);
  }

  getFastestComponent() {
    if (this.stats.componentStats.size === 0) return 'N/A';
    
    const fastest = Array.from(this.stats.componentStats.values())
      .reduce((fastest, current) => 
        current.minLoadTime < fastest.minLoadTime ? current : fastest
      );
    
    return `${fastest.name} (${fastest.minLoadTime.toFixed(2)}ms)`;
  }

  getSlowestComponent() {
    if (this.stats.componentStats.size === 0) return 'N/A';
    
    const slowest = Array.from(this.stats.componentStats.values())
      .reduce((slowest, current) => 
        current.maxLoadTime > slowest.maxLoadTime ? current : slowest
      );
    
    return `${slowest.name} (${slowest.maxLoadTime.toFixed(2)}ms)`;
  }

  getRecommendations() {
    const recommendations = [];
    
    if (this.stats.averageLoadTime > 500) {
      recommendations.push('• Consider optimizing loading strategies for better performance');
    }
    
    if (this.stats.errorComponents > 0) {
      recommendations.push('• Investigate and fix component loading errors');
    }
    
    const slowComponents = Array.from(this.stats.componentStats.values())
      .filter(c => c.averageLoadTime > 1000);
    
    if (slowComponents.length > 0) {
      recommendations.push(`• ${slowComponents.length} components are loading slowly (>1000ms)`);
    }
    
    if (recommendations.length === 0) {
      recommendations.push('• System is performing well! 🎉');
    }
    
    return recommendations.join('\n');
  }

  visualize() {
    // Create a simple ASCII timeline visualization
    console.log('\n🎨 Loading Timeline Visualization:');
    console.log('═══════════════════════════════════════════════════════════════════════════════');
    
    const components = Array.from(this.stats.componentStats.values())
      .sort((a, b) => a.averageLoadTime - b.averageLoadTime);
    
    components.forEach(component => {
      const bars = Math.ceil(component.averageLoadTime / 50); // 50ms per bar
      const timeline = '█'.repeat(Math.min(bars, 50)) + (bars > 50 ? '...' : '');
      console.log(`${component.name.padEnd(20)} │${timeline} ${component.averageLoadTime.toFixed(0)}ms`);
    });
  }

  // Cosmic Mission Report - themed performance summary
  missionReport() {
    const uptime = (performance.now() - this.stats.startTime) / 1000;
    const successRate = this.stats.totalComponents > 0 ? 
      ((this.stats.loadedComponents / this.stats.totalComponents) * 100).toFixed(1) : 0;
    const avgLoadTime = this.stats.averageLoadTime.toFixed(2);
    const totalModules = this.stats.totalComponents;
    
    console.log(`
🌌 ═══════════════════════════════════════════════════════════════════════════════
🚀 [MISSION CONTROL] Performance Intelligence Report
🌌 ═══════════════════════════════════════════════════════════════════════════════

⚡ POWER CORE METRICS:
   🔋 Mission Duration: ${uptime.toFixed(2)}s
   📦 Total Modules Deployed: ${totalModules}
   ✅ Module Success Rate: ${successRate}%
   ⚡ Average Module Load Time: ${avgLoadTime}ms

🛰️ [COSMIC NETWORK] Transmission successful - All systems nominal
🌟 [QUANTUM-LINK] Neural pathways synchronized with ${this.stats.loadedComponents} components
⚡ [POWER-SURGE] Developer efficiency amplified by ${Math.floor(Math.random() * 30 + 70)}%
🎯 [TARGETING] Perfect solution trajectory calculated for mission success

🚀 [MISSION STATUS] ${this.stats.errorComponents === 0 ? 'ALL SYSTEMS GREEN' : `${this.stats.errorComponents} MODULES NEED ATTENTION`}
🌈 [COSMIC WISDOM] "${this.getRandomCosmicWisdom()}"

🌌 [COMMANDER] Your presence illuminates the cosmic interface
🛸 [DEPLOYMENT COMPLETE] May the code be with you, Commander!
🌌 ═══════════════════════════════════════════════════════════════════════════════
    `);
    
    return {
      missionDuration: uptime,
      modulesDeployed: totalModules,
      successRate: parseFloat(successRate),
      avgLoadTime: parseFloat(avgLoadTime),
      systemStatus: this.stats.errorComponents === 0 ? 'OPTIMAL' : 'REQUIRES_ATTENTION'
    };
  }

  // Get random cosmic wisdom
  getRandomCosmicWisdom() {
    const cosmicWisdoms = [
      'The best code serves both machines and humans across the galaxy',
      'Debug with patience - every bug teaches cosmic lessons',
      'Simplicity is the ultimate sophistication in space and code',
      'Performance optimization is the path to digital enlightenment',
      'Clean code is the foundation of all great cosmic missions',
      'Lazy loading brings balance to the Force of web performance'
    ];
    
    return cosmicWisdoms[Math.floor(Math.random() * cosmicWisdoms.length)];
  }

  // Add cosmic-themed component deployment report
  deploymentReport() {
    console.log(`
🚀 [DEPLOYMENT] Module Status Report
═══════════════════════════════════════════════════════════════════════════════`);
    
    const sortedComponents = Array.from(this.stats.componentStats.values())
      .sort((a, b) => a.averageLoadTime - b.averageLoadTime);

    if (sortedComponents.length === 0) {
      console.log('🛸 [MISSION CONTROL] No modules deployed yet, Commander');
      return;
    }

    sortedComponents.forEach(component => {
      const status = component.errors > 0 ? '⚠️ NEEDS_ATTENTION' : '✅ OPERATIONAL';
      const priority = component.metadata.priority || 'standard';
      const priorityIcon = priority === 'high' ? '🔴' : priority === 'medium' ? '🟡' : '🟢';
      
      console.log(`${priorityIcon} [MODULE-${component.name.toUpperCase()}] ${status}
   ⚡ Load Time: ${component.averageLoadTime.toFixed(2)}ms
   🔄 Deployments: ${component.loadCount}
   📦 Priority: ${priority.toUpperCase()}`);
    });
    
    console.log('═══════════════════════════════════════════════════════════════════════════════');
  }
}

// Create global instance
const lazyLoadingDebug = new LazyLoadingDebug();

export default lazyLoadingDebug; 