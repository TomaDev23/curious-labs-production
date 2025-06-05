import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mermaid from 'mermaid';

// Enhanced Final Purge Tool Card with Mermaid Chart
export function FinalPurgeToolCard({ tool, index, getStatusColor, setActiveSection, activeSection }) {
  const [showDetails, setShowDetails] = useState(false);
  const [chartRendered, setChartRendered] = useState(false);

  // Initialize Mermaid
  useEffect(() => {
    if (showDetails && !chartRendered) {
      mermaid.initialize({ 
        theme: 'dark',
        themeVariables: {
          primaryColor: '#84cc16',
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#84cc16',
          lineColor: '#84cc16',
          sectionBkgColor: '#000000',
          altSectionBkgColor: '#1a1a1a',
          gridColor: '#333333',
          secondaryColor: '#ff4444',
          tertiaryColor: '#fbbf24'
        }
      });
      
      // Render the chart
      setTimeout(() => {
        const element = document.getElementById('final-purge-chart');
        if (element) {
          mermaid.render('final-purge-mermaid', miniChart, (svgCode) => {
            element.innerHTML = svgCode;
            setChartRendered(true);
          });
        }
      }, 100);
    }
  }, [showDetails, chartRendered]);

  const miniChart = `
graph LR
    A[📁 23,800] --> B[🔥 Final Purge]
    B --> C[📁 261]
    B --> D[⚡ 87% Faster]
    
    style A fill:#ef4444,stroke:#000,color:#fff
    style B fill:#fbbf24,stroke:#000,color:#000
    style C fill:#84cc16,stroke:#000,color:#000
    style D fill:#84cc16,stroke:#000,color:#000
  `;

  const stats = [
    { label: 'Files Reduced', value: '98.9%', icon: '📁' },
    { label: 'Size Saved', value: '2.08GB', icon: '💾' },
    { label: 'Build Speed', value: '87% Faster', icon: '⚡' },
    { label: 'Success Rate', value: '100%', icon: '✅' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="group cursor-pointer h-full"
      onMouseEnter={() => setActiveSection(tool.name)}
      onMouseLeave={() => setActiveSection(null)}
    >
      <div className={`backdrop-blur-2xl bg-black/30 border border-white/10 rounded-xl transition-all duration-500 h-full flex flex-col ${
        activeSection === tool.name ? 'border-red-400/50 bg-black/50' : 'hover:border-red-400/30 hover:bg-black/40'
      }`}>
        
        {/* Main Card Content */}
        <div className="p-6 flex-grow">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">{tool.icon}</div>
            <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">
              {tool.coordinates}
            </div>
          </div>
          
          <h3 className="font-space text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
            {tool.name}
          </h3>
          
          <div className="flex items-center space-x-2 mb-3">
            <div className={`w-2 h-2 bg-${getStatusColor(tool.status)} rounded-full animate-pulse`}></div>
            <span className={`text-xs font-mono text-${getStatusColor(tool.status)} tracking-wider`}>
              {tool.status}
            </span>
            <span className="text-xs font-mono text-white/50">
              {tool.version}
            </span>
          </div>
          
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            {tool.description}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {stats.slice(0, 4).map((stat, i) => (
              <div key={i} className="bg-black/30 rounded-lg p-2 text-center">
                <div className="text-lg">{stat.icon}</div>
                <div className="text-red-400 font-bold text-xs">{stat.value}</div>
                <div className="text-white/50 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Expand Button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full bg-black/50 border border-red-400/20 text-red-400 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-400/10 transition-all duration-300 mb-4"
          >
            {showDetails ? '🔼 Hide Details' : '🔽 Show Process Flow'}
          </button>
        </div>

        {/* Expandable Details Section */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-white/10 overflow-hidden"
            >
              <div className="p-6">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <span className="text-red-400 mr-2">📊</span>
                  Process Flow
                </h4>
                
                {/* Mermaid Chart Container */}
                <div className="bg-black/50 rounded-lg p-4 mb-4 border border-white/10">
                  <div id="final-purge-chart" className="text-center">
                    <div className="text-white/50 text-sm">Loading chart...</div>
                  </div>
                </div>

                {/* Process Steps */}
                <div className="space-y-2 mb-4">
                  {[
                    { step: '1', action: 'Analyze', desc: 'Scan all imports & dependencies' },
                    { step: '2', action: 'Extract', desc: 'Copy only used files' },
                    { step: '3', action: 'Validate', desc: 'Test clean version builds' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 text-sm">
                      <div className="w-6 h-6 bg-red-400/20 text-red-400 rounded-full flex items-center justify-center text-xs font-bold">
                        {item.step}
                      </div>
                      <div className="text-white font-medium">{item.action}</div>
                      <div className="text-white/60">{item.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Command Preview */}
                <div className="bg-black/70 rounded-lg p-3 border border-green-400/20">
                  <div className="text-green-400 text-xs font-mono mb-1"># Quick Start</div>
                  <div className="text-white font-mono text-sm">npx final-purge analyze</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <div className="p-6 pt-0">
          {tool.isAvailable ? (
            <motion.a 
              href={tool.downloadLink} 
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-red-400 to-red-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-400/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Tool
            </motion.a>
          ) : (
            <div className="w-full bg-black/50 border border-white/20 text-white/60 font-medium py-3 px-4 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-2 h-2 bg-${getStatusColor(tool.status)} rounded-full animate-pulse`}></div>
                <span>In Development</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Alternative: Mini Mermaid Component for inline use
export function FinalPurgeMiniChart() {
  useEffect(() => {
    mermaid.initialize({ theme: 'dark' });
    mermaid.render('mini-purge-chart', `
graph LR
    A[🔍] --> B[🔥]
    B --> C[✅]
    style B fill:#ef4444,stroke:#000,color:#fff
    `, (svg) => {
      document.getElementById('mini-chart-container').innerHTML = svg;
    });
  }, []);

  return <div id="mini-chart-container" className="w-full h-16"></div>;
} 