import React, { useState, useEffect, lazy, Suspense } from 'react';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import FooterExperience from '../components/home/v4/FooterExperience';

// 🚀 LAZY LOAD: Mermaid is large and only needed for dev tools
import { motion, AnimatePresence } from '../FramerProvider';

const MermaidLoader = lazy(() => import('mermaid'));

// Final Purge Complete Page Component
export default function FinalPurgePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [animationStep, setAnimationStep] = useState(0);

  // Project Statistics (from our actual purge)
  const stats = {
    before: {
      files: 23800,
      size: '2.1 GB',
      buildTime: '120.3s',
      dependencies: 847
    },
    after: {
      files: 261,
      size: '23.4 MB',
      buildTime: '15.4s',
      dependencies: 34
    },
    reduction: {
      files: '98.9%',
      size: '98.9%',
      buildTime: '87.2%',
      dependencies: '96.0%'
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'article', label: 'Article', icon: '📄' },
    { id: 'process', label: 'Process Flow', icon: '🔄' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'commands', label: 'Commands', icon: '💻' },
    { id: 'results', label: 'Results', icon: '🎯' },
    { id: 'download', label: 'Download', icon: '📱' }
  ];

  const commands = [
    {
      command: 'npx final-purge analyze',
      description: 'Analyze your codebase and identify used files',
      example: 'Scans all imports, requires, and dynamic imports'
    },
    {
      command: 'npx final-purge extract ./clean-build',
      description: 'Extract only used files to clean directory',
      example: 'Copies 261 files instead of 23,800'
    },
    {
      command: 'npx final-purge validate ./clean-build',
      description: 'Validate that clean version builds successfully',
      example: 'Runs npm install and npm run build'
    },
    {
      command: 'npx final-purge stats',
      description: 'Show detailed statistics and reduction metrics',
      example: 'Displays file count, size, and build time improvements'
    }
  ];

  const downloadOptions = [
    {
      platform: "NPX (Recommended)",
      command: "npx final-purge analyze",
      description: "Run directly without installation",
      icon: "⚡"
    },
    {
      platform: "NPM Global",
      command: "npm install -g final-purge",
      description: "Install globally for repeated use",
      icon: "🌍"
    },
    {
      platform: "Source Code",
      command: "git clone https://github.com/final-purge/cli.git",
      description: "Clone and customize the source",
      icon: "📦"
    }
  ];

  // Mermaid chart components with independent initialization
  const ProcessFlowChart = () => {
    const [diagramReady, setDiagramReady] = useState(false);

    useEffect(() => {
      const initAndRender = async () => {
        try {
          const mermaidModule = await import('mermaid');
          const mermaid = mermaidModule.default;
          
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
            },
            flowchart: {
              htmlLabels: true,
              curve: 'basis',
              padding: 20
            },
            startOnLoad: false,
            securityLevel: 'loose'
          });
          
          setDiagramReady(true);
          
          // Render after short delay
          setTimeout(() => {
            const element = document.getElementById('process-flow-chart');
            if (element) {
              mermaid.run({ nodes: [element] }).catch(() => {
                setDiagramReady(false);
              });
            }
          }, 100);
        } catch (error) {
          setDiagramReady(false);
        }
      };

      initAndRender();
    }, []);

    return (
      <div className="bg-black/50 p-8 rounded-lg border border-white/10 min-h-[400px] flex items-center justify-center">
        {diagramReady ? (
          <div className="w-full max-w-7xl mx-auto">
            <div 
              id="process-flow-chart"
              className="mermaid text-center" 
              style={{ 
                minHeight: '350px', 
                width: '100%',
                maxWidth: '100%',
                display: 'block',
                margin: '0 auto',
                fontSize: '14px',
                fontFamily: 'monospace',
                overflow: 'visible'
              }}
            >
              {`graph LR
    subgraph Analysis["🔍 Analysis Phase"]
        A1["📊 Analyze Codebase"] --> A2["📋 Track Dependencies"]
        A2 --> A3["🔗 Map Imports"]
    end
    
    subgraph Processing["🔥 Processing Phase"]
        B1["🎯 Find Used Files"] --> B2["📦 Extract Production Files"]
        B2 --> B3["📋 Copy Configs"]
    end
    
    subgraph Validation["✅ Validation Phase"]
        C1["🧪 Test Build"] --> C2["✅ Validate Functionality"]
        C2 --> C3["🚀 Deploy Clean Version"]
    end
    
    Analysis --> Processing
    Processing --> Validation
    
    style A1 fill:#84cc16,stroke:#000,color:#000,stroke-width:2px
    style A2 fill:#84cc16,stroke:#000,color:#000,stroke-width:2px
    style A3 fill:#84cc16,stroke:#000,color:#000,stroke-width:2px
    style B1 fill:#fbbf24,stroke:#000,color:#000,stroke-width:2px
    style B2 fill:#ef4444,stroke:#000,color:#fff,stroke-width:2px
    style B3 fill:#fbbf24,stroke:#000,color:#000,stroke-width:2px
    style C1 fill:#10b981,stroke:#000,color:#000,stroke-width:2px
    style C2 fill:#10b981,stroke:#000,color:#000,stroke-width:2px
    style C3 fill:#10b981,stroke:#000,color:#000,stroke-width:2px
    style Analysis fill:#1a1a1a,stroke:#84cc16,stroke-width:2px
    style Processing fill:#1a1a1a,stroke:#fbbf24,stroke-width:2px
    style Validation fill:#1a1a1a,stroke:#10b981,stroke-width:2px`}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
              <div className="bg-lime-400/20 p-6 rounded-lg border border-lime-400/30">
                <div className="text-4xl mb-4">🔍</div>
                <div className="text-lime-400 font-bold text-lg mb-2">Analysis Phase</div>
                <div className="space-y-3 text-sm">
                  <div className="bg-lime-400/10 p-2 rounded text-white">📊 Analyze Codebase</div>
                  <div className="bg-lime-400/10 p-2 rounded text-white">📋 Track Dependencies</div>
                  <div className="bg-lime-400/10 p-2 rounded text-white">🔗 Map Imports</div>
                </div>
              </div>
              <div className="bg-yellow-400/20 p-6 rounded-lg border border-yellow-400/30">
                <div className="text-4xl mb-4">🔥</div>
                <div className="text-yellow-400 font-bold text-lg mb-2">Processing Phase</div>
                <div className="space-y-3 text-sm">
                  <div className="bg-yellow-400/10 p-2 rounded text-white">🎯 Find Used Files</div>
                  <div className="bg-red-400/20 p-2 rounded text-white">📦 Extract Production Files</div>
                  <div className="bg-yellow-400/10 p-2 rounded text-white">📋 Copy Configs</div>
                </div>
              </div>
              <div className="bg-green-400/20 p-6 rounded-lg border border-green-400/30">
                <div className="text-4xl mb-4">✅</div>
                <div className="text-green-400 font-bold text-lg mb-2">Validation Phase</div>
                <div className="space-y-3 text-sm">
                  <div className="bg-green-400/10 p-2 rounded text-white">🧪 Test Build</div>
                  <div className="bg-green-400/10 p-2 rounded text-white">✅ Validate Functionality</div>
                  <div className="bg-green-400/10 p-2 rounded text-white">🚀 Deploy Clean Version</div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-white/70 text-lg">
                Three-phase workflow: <span className="text-lime-400">Analysis</span> → 
                <span className="text-yellow-400"> Processing</span> → 
                <span className="text-green-400"> Validation</span>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ArchitectureChart = () => {
    const [diagramReady, setDiagramReady] = useState(false);

    useEffect(() => {
      const initAndRender = async () => {
        try {
          const mermaidModule = await import('mermaid');
          const mermaid = mermaidModule.default;
          
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
            },
            flowchart: {
              htmlLabels: true,
              curve: 'basis',
              padding: 20
            },
            startOnLoad: false,
            securityLevel: 'loose'
          });
          
          setDiagramReady(true);
          
          // Render after short delay
          setTimeout(() => {
            const element = document.getElementById('architecture-chart');
            if (element) {
              mermaid.run({ nodes: [element] }).catch(() => {
                setDiagramReady(false);
              });
            }
          }, 100);
        } catch (error) {
          setDiagramReady(false);
        }
      };

      initAndRender();
    }, []);

    return (
      <div className="bg-black/50 p-8 rounded-lg border border-white/10 min-h-[450px] flex items-center justify-center">
        {diagramReady ? (
          <div className="w-full max-w-7xl mx-auto">
            <div 
              id="architecture-chart"
              className="mermaid text-center" 
              style={{ 
                minHeight: '400px', 
                width: '100%',
                maxWidth: '100%',
                display: 'block',
                margin: '0 auto',
                fontSize: '14px',
                fontFamily: 'monospace',
                overflow: 'visible'
              }}
            >
              {`graph LR
    subgraph Original["🗂️ Original Codebase"]
        A1["23,800 Files"] --> A2["2.1 GB Size"]
        A3["847 Dependencies"] --> A4["120s Build"]
    end
    
    subgraph Process["🔥 Final Purge Process"]
        B1["🔍 Dependency Tracer"] --> B2["🎯 Production Extractor"]
        B2 --> B3["✅ Validator"]
    end
    
    subgraph Clean["✨ Clean Version"]
        C1["261 Files"] --> C2["23.4 MB Size"]
        C3["34 Dependencies"] --> C4["15.4s Build"]
    end
    
    Original --> Process
    Process --> Clean
    
    style A1 fill:#ef4444,stroke:#000,color:#fff,stroke-width:3px
    style C1 fill:#84cc16,stroke:#000,color:#000,stroke-width:3px
    style B2 fill:#fbbf24,stroke:#000,color:#000,stroke-width:3px
    style Original fill:#1a1a1a,stroke:#ef4444,stroke-width:2px
    style Process fill:#1a1a1a,stroke:#fbbf24,stroke-width:2px
    style Clean fill:#1a1a1a,stroke:#84cc16,stroke-width:2px`}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
              <div className="bg-red-400/20 p-6 rounded-lg border border-red-400/30">
                <div className="text-4xl mb-4">🗂️</div>
                <div className="text-red-400 font-bold text-lg mb-2">Original Codebase</div>
                <div className="space-y-2 text-sm">
                  <div className="text-white">23,800 Files</div>
                  <div className="text-white">2.1 GB Size</div>
                  <div className="text-white">847 Dependencies</div>
                  <div className="text-white">120s Build Time</div>
                </div>
              </div>
              <div className="bg-yellow-400/20 p-6 rounded-lg border border-yellow-400/30">
                <div className="text-4xl mb-4">🔥</div>
                <div className="text-yellow-400 font-bold text-lg mb-2">Final Purge</div>
                <div className="space-y-2 text-sm">
                  <div className="text-white">🔍 Dependency Tracer</div>
                  <div className="text-white">🎯 Production Extractor</div>
                  <div className="text-white">✅ Validator</div>
                  <div className="text-white">Smart Processing</div>
                </div>
              </div>
              <div className="bg-green-400/20 p-6 rounded-lg border border-green-400/30">
                <div className="text-4xl mb-4">✨</div>
                <div className="text-green-400 font-bold text-lg mb-2">Clean Version</div>
                <div className="space-y-2 text-sm">
                  <div className="text-white">261 Files</div>
                  <div className="text-white">23.4 MB Size</div>
                  <div className="text-white">34 Dependencies</div>
                  <div className="text-white">15.4s Build Time</div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-white/70 text-lg">
                Three-stage process: <span className="text-red-400">Bloated Input</span> → 
                <span className="text-yellow-400"> Smart Processing</span> → 
                <span className="text-green-400"> Clean Output</span>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation */}
      <MissionControlNavbar />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-red-950/10" />
      
      {/* Main Content */}
      <div className="relative z-20 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="text-6xl mb-4">🔥</div>
            <h1 className="font-space text-4xl md:text-6xl font-bold text-white mb-4">
              Final <span className="text-red-400">Purge</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Professional codebase optimization tool that analyzes your project's actual dependencies and creates a streamlined version containing only the files your application needs to run. Achieve dramatic size reductions and faster build times while maintaining 100% functionality and code integrity.
            </p>
            
            {/* Professional Description */}
            <div className="max-w-4xl mx-auto mb-8 p-6 bg-black/30 rounded-lg border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-4 text-center">How Final Purge Works</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-white/80">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔍</div>
                  <h3 className="font-semibold text-white mb-2">Smart Analysis</h3>
                  <p>Traces all import statements, require calls, and dynamic imports to build a complete dependency graph of your application.</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="font-semibold text-white mb-2">Precise Extraction</h3>
                  <p>Copies only the files that are actually referenced by your production build, preserving directory structure and relationships.</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">✅</div>
                  <h3 className="font-semibold text-white mb-2">Validation Testing</h3>
                  <p>Automatically tests the optimized version to ensure it builds successfully and maintains all original functionality.</p>
                </div>
              </div>
            </div>
            
            {/* Battle-Tested Badge */}
            <div className="inline-flex items-center space-x-2 bg-green-400/20 border border-green-400/30 rounded-full px-6 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Battle-Tested on 23,800+ Files</span>
            </div>
          </motion.div>

          {/* Stats Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Files Reduced', value: stats.reduction.files, icon: '📁', color: 'red' },
              { label: 'Size Reduced', value: stats.reduction.size, icon: '💾', color: 'orange' },
              { label: 'Build Time Saved', value: stats.reduction.buildTime, icon: '⚡', color: 'yellow' },
              { label: 'Dependencies Cut', value: stats.reduction.dependencies, icon: '📦', color: 'green' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-black/50 border border-white/10 rounded-xl p-6 text-center hover:border-red-400/30 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-red-400 mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 bg-black/30 p-2 rounded-xl border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-red-400/20 text-red-400 border border-red-400/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-black/40 border border-white/10 rounded-xl p-8"
            >
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="text-red-400 mr-2">📊</span>
                    Project Overview
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Before Final Purge</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-red-400/10 rounded-lg">
                          <span className="text-white/80">Total Files</span>
                          <span className="text-red-400 font-mono">{stats.before.files.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-400/10 rounded-lg">
                          <span className="text-white/80">Total Size</span>
                          <span className="text-red-400 font-mono">{stats.before.size}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-400/10 rounded-lg">
                          <span className="text-white/80">Build Time</span>
                          <span className="text-red-400 font-mono">{stats.before.buildTime}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">After Final Purge</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-400/10 rounded-lg">
                          <span className="text-white/80">Total Files</span>
                          <span className="text-green-400 font-mono">{stats.after.files}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-400/10 rounded-lg">
                          <span className="text-white/80">Total Size</span>
                          <span className="text-green-400 font-mono">{stats.after.size}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-400/10 rounded-lg">
                          <span className="text-white/80">Build Time</span>
                          <span className="text-green-400 font-mono">{stats.after.buildTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Real Results Table */}
                  <div className="mt-8 bg-black/30 rounded-lg p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Real Project Transformation</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left text-white/80 py-2">Metric</th>
                            <th className="text-right text-white/80 py-2">Before</th>
                            <th className="text-right text-white/80 py-2">After</th>
                            <th className="text-right text-white/80 py-2">Improvement</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono">
                          <tr className="border-b border-white/5">
                            <td className="py-2 text-white">Files</td>
                            <td className="text-right text-red-400">23,800</td>
                            <td className="text-right text-green-400">261</td>
                            <td className="text-right text-green-400">-98.9%</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-2 text-white">Size</td>
                            <td className="text-right text-red-400">2.1 GB</td>
                            <td className="text-right text-green-400">23.4 MB</td>
                            <td className="text-right text-green-400">-98.9%</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-2 text-white">Build Time</td>
                            <td className="text-right text-red-400">120.3s</td>
                            <td className="text-right text-green-400">15.4s</td>
                            <td className="text-right text-green-400">-87.2%</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-white">Dependencies</td>
                            <td className="text-right text-red-400">847</td>
                            <td className="text-right text-green-400">34</td>
                            <td className="text-right text-green-400">-96.0%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'article' && (
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="text-blue-400 mr-2">📄</span>
                    Professional Product Description
                  </h2>
                  
                  <div className="prose prose-invert prose-lg max-w-none text-white/90 leading-relaxed space-y-8">
                    
                    {/* What Final Purge Does */}
                    <section className="bg-black/30 p-6 rounded-lg border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="text-red-400 mr-2">🎯</span>
                        What Final Purge Does
                      </h3>
                      <p className="text-white/80 mb-4">
                        Final Purge is a professional codebase optimization tool designed for developers who want to dramatically reduce project size without compromising functionality.
                      </p>
                      <p className="text-white/80">
                        <strong>In simple terms:</strong> Your project probably contains thousands of files, but your application only actually uses a fraction of them. Final Purge identifies exactly which files are needed and creates a clean, optimized version of your project containing only those essential files.
                      </p>
                    </section>

                    {/* The Problem It Solves */}
                    <section className="bg-black/30 p-6 rounded-lg border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="text-yellow-400 mr-2">⚠️</span>
                        The Problem It Solves
                      </h3>
                      <p className="text-white/80 mb-4">Modern development projects are bloated. Here's what typically happens:</p>
                      <ul className="text-white/70 space-y-2 list-disc list-inside mb-4">
                        <li>You start a project and install packages</li>
                        <li>Those packages bring their own dependencies</li>
                        <li>Over time, you add more tools, remove old ones, but files accumulate</li>
                        <li>Your project becomes massive with thousands of unused files</li>
                        <li>Build times get slower, deployment packages get huge</li>
                        <li>You're not sure what's actually needed vs. what's just sitting there</li>
                      </ul>
                      
                      <div className="bg-gradient-to-r from-red-400/10 to-green-400/10 p-4 rounded-lg border border-white/10">
                        <h4 className="text-white font-semibold mb-2">Example from our real project:</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-red-400 font-mono">Started with: 23,800 files (2.1 GB)</div>
                            <div className="text-green-400 font-mono">Actually needed: 261 files (23.4 MB)</div>
                          </div>
                          <div>
                            <div className="text-yellow-400 font-mono font-bold">Waste: 98.9% unnecessary bloat</div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* How Final Purge Works */}
                    <section className="bg-black/30 p-6 rounded-lg border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="text-blue-400 mr-2">🔧</span>
                        How Final Purge Works (Non-Technical)
                      </h3>
                      <p className="text-white/80 mb-4">Think of it like organizing a massive warehouse:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-400/10 p-4 rounded-lg">
                          <h4 className="text-blue-400 font-semibold mb-2">📋 Inventory Phase</h4>
                          <p className="text-white/70 text-sm">Final Purge examines your entire project and tracks which files are actually connected to your working application</p>
                        </div>
                        <div className="bg-yellow-400/10 p-4 rounded-lg">
                          <h4 className="text-yellow-400 font-semibold mb-2">🔗 Analysis Phase</h4>
                          <p className="text-white/70 text-sm">It follows the chain - "This file needs that file, which needs those 3 files, etc." - mapping out only what's truly essential</p>
                        </div>
                        <div className="bg-green-400/10 p-4 rounded-lg">
                          <h4 className="text-green-400 font-semibold mb-2">📦 Extraction Phase</h4>
                          <p className="text-white/70 text-sm">It creates a new, clean copy containing only the files your app actually uses</p>
                        </div>
                        <div className="bg-purple-400/10 p-4 rounded-lg">
                          <h4 className="text-purple-400 font-semibold mb-2">✅ Verification Phase</h4>
                          <p className="text-white/70 text-sm">It tests the clean version to make sure everything still works perfectly</p>
                        </div>
                      </div>
                    </section>

                    {/* Why It's Safe */}
                    <section className="bg-black/30 p-6 rounded-lg border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="text-green-400 mr-2">🛡️</span>
                        Why It's Safe
                      </h3>
                      <p className="text-white/80 mb-4">Your original project remains completely untouched. Final Purge works like this:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-3 bg-green-400/10 p-3 rounded-lg">
                          <span className="text-green-400">✅</span>
                          <span className="text-white/80">Creates copies, never deletes originals</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-green-400/10 p-3 rounded-lg">
                          <span className="text-green-400">✅</span>
                          <span className="text-white/80">Tests everything before declaring success</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-green-400/10 p-3 rounded-lg">
                          <span className="text-green-400">✅</span>
                          <span className="text-white/80">You can always go back to your original</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-green-400/10 p-3 rounded-lg">
                          <span className="text-green-400">✅</span>
                          <span className="text-white/80">No risk of breaking your working project</span>
                        </div>
                      </div>
                      <p className="text-white/70 italic">
                        It's like having a professional organizer clean your house by creating a perfectly organized duplicate - if something's missing, your original messy house is still there unchanged.
                      </p>
                    </section>

                    {/* Real Results */}
                    <section className="bg-black/30 p-6 rounded-lg border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="text-green-400 mr-2">📊</span>
                        Real Results
                      </h3>
                      <p className="text-white/80 mb-4">From our actual use case:</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-white/10 rounded-lg">
                          <thead className="bg-white/5">
                            <tr>
                              <th className="text-left p-3 text-white/80">Metric</th>
                              <th className="text-right p-3 text-white/80">Before</th>
                              <th className="text-right p-3 text-white/80">After</th>
                              <th className="text-right p-3 text-white/80">Improvement</th>
                            </tr>
                          </thead>
                          <tbody className="font-mono">
                            <tr className="border-t border-white/10">
                              <td className="p-3 text-white">Files</td>
                              <td className="text-right p-3 text-red-400">23,800</td>
                              <td className="text-right p-3 text-green-400">261</td>
                              <td className="text-right p-3 text-green-400">98.9% reduction</td>
                            </tr>
                            <tr className="border-t border-white/10">
                              <td className="p-3 text-white">Size</td>
                              <td className="text-right p-3 text-red-400">2.1 GB</td>
                              <td className="text-right p-3 text-green-400">23.4 MB</td>
                              <td className="text-right p-3 text-green-400">98.9% smaller</td>
                            </tr>
                            <tr className="border-t border-white/10">
                              <td className="p-3 text-white">Build Time</td>
                              <td className="text-right p-3 text-red-400">120 seconds</td>
                              <td className="text-right p-3 text-green-400">15 seconds</td>
                              <td className="text-right p-3 text-green-400">7x faster</td>
                            </tr>
                            <tr className="border-t border-white/10">
                              <td className="p-3 text-white">Functionality</td>
                              <td className="text-right p-3 text-green-400">100%</td>
                              <td className="text-right p-3 text-green-400">100%</td>
                              <td className="text-right p-3 text-green-400">No loss</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </section>

                    {/* Who Should Use Final Purge */}
                    <section className="bg-black/30 p-6 rounded-lg border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="text-purple-400 mr-2">👥</span>
                        Who Should Use Final Purge
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-green-400 font-semibold mb-3">Perfect for:</h4>
                          <ul className="text-white/70 space-y-2 list-disc list-inside">
                            <li>Projects that have grown unwieldy over time</li>
                            <li>Applications with slow build/deployment times</li>
                            <li>Teams wanting to optimize their codebase before major releases</li>
                            <li>Anyone curious about what their project actually needs vs. what it carries</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-yellow-400 font-semibold mb-3">When to use it:</h4>
                          <ul className="text-white/70 space-y-2 list-disc list-inside">
                            <li>Before major deployments</li>
                            <li>When build times are getting frustratingly slow</li>
                            <li>When you suspect your project has accumulated "digital clutter"</li>
                            <li>When you want to understand your project's true dependencies</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* How Easy Is It */}
                    <section className="bg-black/30 p-6 rounded-lg border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="text-blue-400 mr-2">⚡</span>
                        How Easy Is It?
                      </h3>
                      <p className="text-white/80 mb-4">Three simple commands and you're done:</p>
                      
                      <div className="space-y-4">
                        <div className="bg-black/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <code className="text-green-400 font-mono">npx final-purge analyze</code>
                            <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">Step 1</span>
                          </div>
                          <p className="text-white/70 text-sm">Analyze your codebase and see what you actually use</p>
                        </div>
                        
                        <div className="bg-black/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <code className="text-green-400 font-mono">npx final-purge extract ./clean-project</code>
                            <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">Step 2</span>
                          </div>
                          <p className="text-white/70 text-sm">Create a clean version with only the files you need</p>
                        </div>
                        
                        <div className="bg-black/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <code className="text-green-400 font-mono">npx final-purge validate ./clean-project</code>
                            <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">Step 3</span>
                          </div>
                          <p className="text-white/70 text-sm">Verify everything works perfectly</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-green-400/10 rounded-lg border border-green-400/20">
                        <p className="text-white/80 text-center">
                          <strong className="text-green-400">No risk to your original project</strong> - Final Purge works on copies only!
                        </p>
                      </div>
                    </section>

                  </div>
                </div>
              )}

              {activeTab === 'process' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="text-yellow-400 mr-2">🔄</span>
                    Process Flow
                  </h2>
                  {/* Only render ProcessFlowChart when this tab is active */}
                  <ProcessFlowChart />
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-400/10 rounded-lg">
                      <h4 className="font-semibold text-green-400 mb-2">🔍 Analysis Phase</h4>
                      <p className="text-white/70 text-sm">Scans all import statements, require calls, and dynamic imports to build dependency graph.</p>
                    </div>
                    <div className="p-4 bg-red-400/10 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-2">🔥 Extraction Phase</h4>
                      <p className="text-white/70 text-sm">Copies only files that are actually used in production build, maintaining directory structure.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="text-blue-400 mr-2">🏗️</span>
                    System Architecture
                  </h2>
                  {/* Only render ArchitectureChart when this tab is active */}
                  <ArchitectureChart />
                  <div className="mt-6 text-center">
                    <p className="text-white/70">
                      Three-stage process: <span className="text-red-400">Bloated Input</span> → 
                      <span className="text-yellow-400"> Smart Processing</span> → 
                      <span className="text-green-400"> Clean Output</span>
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'commands' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="text-purple-400 mr-2">💻</span>
                    Available Commands
                  </h2>
                  <div className="space-y-6">
                    {commands.map((cmd, index) => (
                      <div key={index} className="p-6 bg-black/30 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <code className="text-green-400 bg-black/50 px-3 py-2 rounded font-mono text-sm">
                            {cmd.command}
                          </code>
                          <span className="text-xs text-white/50 bg-black/30 px-2 py-1 rounded">
                            CLI
                          </span>
                        </div>
                        <p className="text-white/80 mb-2">{cmd.description}</p>
                        <p className="text-white/50 text-sm italic">{cmd.example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'results' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="text-green-400 mr-2">🎯</span>
                    Purge Results
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Performance Improvements</h3>
                      {[
                        { metric: 'Files Eliminated', value: '23,539', change: '-98.9%' },
                        { metric: 'Storage Saved', value: '2.08 GB', change: '-98.9%' },
                        { metric: 'Build Time Reduced', value: '104.9s', change: '-87.2%' },
                        { metric: 'Dependencies Removed', value: '813', change: '-96.0%' }
                      ].map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-green-400/10 rounded-lg">
                          <div>
                            <div className="text-white font-medium">{result.metric}</div>
                            <div className="text-green-400 text-2xl font-bold">{result.value}</div>
                          </div>
                          <div className="text-green-400 font-mono text-lg">{result.change}</div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Quality Metrics</h3>
                      <div className="p-4 bg-blue-400/10 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80">Build Success Rate</span>
                          <span className="text-blue-400 font-mono">100%</span>
                        </div>
                        <div className="w-full bg-black/30 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full w-full"></div>
                        </div>
                      </div>
                      <div className="p-4 bg-purple-400/10 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80">Functionality Preserved</span>
                          <span className="text-purple-400 font-mono">100%</span>
                        </div>
                        <div className="w-full bg-black/30 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full w-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'download' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="text-red-400 mr-2">📱</span>
                    Download Final Purge
                  </h2>
                  
                  {/* Download Options */}
                  <div className="grid gap-6 mb-8">
                    {downloadOptions.map((option, index) => (
                      <motion.div
                        key={option.platform}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        className="bg-black/30 border border-white/10 hover:border-red-400/30 rounded-xl p-6 transition-all duration-300 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl">{option.icon}</div>
                            <div>
                              <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors">
                                {option.platform}
                              </h3>
                              <p className="text-white/60">{option.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <code className="bg-black/50 border border-white/20 rounded px-3 py-2 text-red-400 font-mono text-sm">
                              {option.command}
                            </code>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Start */}
                  <div className="bg-gradient-to-r from-red-400/10 to-orange-400/10 border border-red-400/20 rounded-xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <span className="text-red-400 mr-2">⚡</span>
                      Quick Start
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                        <div className="text-green-400"># Analyze your codebase</div>
                        <div className="text-white">npx final-purge analyze</div>
                      </div>
                      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                        <div className="text-green-400"># Extract clean version</div>
                        <div className="text-white">npx final-purge extract ./clean-build</div>
                      </div>
                      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                        <div className="text-green-400"># Validate it works</div>
                        <div className="text-white">npx final-purge validate ./clean-build</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
              onClick={() => setActiveTab('download')}
            >
              <span>🔥</span>
              <span>Start Your Purge</span>
            </motion.button>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black/50 border border-white/20 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
            >
              <span>📚</span>
              <span>View Documentation</span>
            </motion.a>
          </div>

        </div>
      </div>

      {/* Footer */}
      <FooterExperience />
    </div>
  );
} 