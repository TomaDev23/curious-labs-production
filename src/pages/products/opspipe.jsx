import {  motion  } from '../../FramerProvider';

/**
 * 🛡️ KEEP - CRITICAL PRODUCTION SUB-ROUTE
 * Code: OPSPIPE-001
 * Used in: /products/opspipe route
 * Features: Pipeline automation, real-time monitoring, operational control
 * Warning: DO NOT REMOVE - CORE PRODUCT SUB-ROUTE
 * Bundle: Products sub-module
 * Type: Product Page Component
 * Dependencies: MissionControlNavbar, BackgroundLayerAtomic, ScrollToTop
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';
import './opspipe.css'; // For custom animations

// OpsPipe Architecture Diagram Component
const OpsPipeArchitectureDiagram = () => {
  const [diagramReady, setDiagramReady] = useState(false);

  useEffect(() => {
    const initAndRender = async () => {
      try {
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;
        
        mermaid.initialize({ 
          theme: 'dark',
          themeVariables: {
            primaryColor: '#3b82f6',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#3b82f6',
            lineColor: '#3b82f6',
            sectionBkgColor: '#000000',
            altSectionBkgColor: '#1a1a1a',
            gridColor: '#333333',
            secondaryColor: '#84cc16',
            tertiaryColor: '#06b6d4',
            background: '#000000',
            mainBkg: '#1a1a1a',
            secondBkg: '#262626'
          },
          flowchart: {
            htmlLabels: true,
            curve: 'basis',
            padding: 15,
            nodeSpacing: 50,
            rankSpacing: 60
          },
          startOnLoad: false,
          securityLevel: 'loose'
        });
        
        setDiagramReady(true);
        
        // Render after short delay
        setTimeout(() => {
          const element = document.getElementById('opspipe-architecture-chart');
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
    <>
      {diagramReady ? (
        <div 
          id="opspipe-architecture-chart"
          className="mermaid w-full" 
          style={{ 
            minHeight: '400px', 
            width: '100%',
            display: 'block',
            fontSize: '12px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            overflow: 'visible',
            background: 'transparent'
          }}
        >
          {`graph LR
    subgraph Core["🏗️ OpsPipe Core"]
        OS["OpsPipe OS<br/>AI Engine"] --> SM["State Machine<br/>Coordinator"]
    end
    
    subgraph InputLayer["📥 Input Sources"]
        TB["🤖 Telegram Bot"]
        FU["📁 File Upload"] 
        POS["🏪 POS Adapter"]
        API["⚡ API Gateway"]
    end
    
    subgraph Processing["🧠 AI Processing Hub"]
        CC["Command Center<br/>Registry"]
        DE["🎯 Decision Engine"]
        RM["🛡️ Recovery Manager"]
    end
    
    subgraph ExecutionChain["⚙️ Execution Pipeline"]
        AL["Agent Loop<br/>Controller"] --> TOK["Tokenizer<br/>Parser"]
        FSM["FSM + Trace<br/>Memory"] --> MEM["State Store<br/>Context"]
        RS["Recovery<br/>System"] --> VAL["Validator<br/>Gate"]
    end
    
    subgraph OutputSystems["📤 Output & Interfaces"]
        KB["📚 Knowledge Base<br/>/kb/"]
        EX["📊 Data Exports<br/>/logs/"]
        DASH["📊 OpsCockpit<br/>Dashboard"]
        WEB["🖥️ Web Admin<br/>Control Panel"]
        MOB["📱 OpsField<br/>Mobile App"]
        TG["💬 StaffBot<br/>Telegram"]
    end
    
    %% Input connections
    InputLayer --> SM
    TB --> SM
    FU --> SM
    POS --> SM
    API --> SM
    
    %% Core to Processing
    SM --> Processing
    SM --> CC
    SM --> DE
    SM --> RM
    
    %% Processing to Execution
    CC --> AL
    DE --> FSM
    RM --> RS
    
    %% Execution Chain internal flows
    TOK --> MEM
    MEM --> VAL
    
    %% Execution to Output
    ExecutionChain --> OutputSystems
    VAL --> KB
    VAL --> EX
    VAL --> DASH
    VAL --> WEB
    VAL --> MOB
    VAL --> TG
    
    style Core fill:#1a1a1a,stroke:#3b82f6,stroke-width:3px,color:#ffffff
    style InputLayer fill:#1a1a1a,stroke:#84cc16,stroke-width:2px,color:#ffffff
    style Processing fill:#1a1a1a,stroke:#06b6d4,stroke-width:2px,color:#ffffff
    style ExecutionChain fill:#1a1a1a,stroke:#8b5cf6,stroke-width:2px,color:#ffffff
    style OutputSystems fill:#1a1a1a,stroke:#ef4444,stroke-width:2px,color:#ffffff
    
    style OS fill:#3b82f6,stroke:#000,color:#fff,stroke-width:2px
    style SM fill:#3b82f6,stroke:#000,color:#fff,stroke-width:2px
    style DE fill:#06b6d4,stroke:#000,color:#000,stroke-width:2px
    style AL fill:#8b5cf6,stroke:#000,color:#fff,stroke-width:2px
    style DASH fill:#ef4444,stroke:#000,color:#fff,stroke-width:2px
    style KB fill:#10b981,stroke:#000,color:#000,stroke-width:2px`}
        </div>
      ) : (
        <div className="text-center py-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center max-w-6xl mx-auto">
            <div className="bg-blue-400/20 p-4 rounded-lg border border-blue-400/30">
              <div className="text-2xl mb-2">🏗️</div>
              <div className="text-blue-400 font-bold text-sm mb-1">OpsPipe Core</div>
              <div className="space-y-1 text-xs">
                <div className="bg-blue-400/10 p-1 rounded text-white">AI Engine</div>
                <div className="bg-blue-400/10 p-1 rounded text-white">State Coordinator</div>
              </div>
            </div>
            
            <div className="bg-green-400/20 p-4 rounded-lg border border-green-400/30">
              <div className="text-2xl mb-2">📥</div>
              <div className="text-green-400 font-bold text-sm mb-1">Input Sources</div>
              <div className="space-y-1 text-xs">
                <div className="bg-green-400/10 p-1 rounded text-white">🤖 Telegram</div>
                <div className="bg-green-400/10 p-1 rounded text-white">📁 File Upload</div>
                <div className="bg-green-400/10 p-1 rounded text-white">🏪 POS Adapter</div>
              </div>
            </div>
            
            <div className="bg-cyan-400/20 p-4 rounded-lg border border-cyan-400/30">
              <div className="text-2xl mb-2">🧠</div>
              <div className="text-cyan-400 font-bold text-sm mb-1">AI Processing</div>
              <div className="space-y-1 text-xs">
                <div className="bg-cyan-400/10 p-1 rounded text-white">Command Center</div>
                <div className="bg-cyan-400/10 p-1 rounded text-white">Decision Engine</div>
                <div className="bg-cyan-400/10 p-1 rounded text-white">Recovery Mgr</div>
              </div>
            </div>
            
            <div className="bg-purple-400/20 p-4 rounded-lg border border-purple-400/30">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-purple-400 font-bold text-sm mb-1">Execution Chain</div>
              <div className="space-y-1 text-xs">
                <div className="bg-purple-400/10 p-1 rounded text-white">Agent Loop</div>
                <div className="bg-purple-400/10 p-1 rounded text-white">State Memory</div>
                <div className="bg-purple-400/10 p-1 rounded text-white">Validator</div>
              </div>
            </div>
            
            <div className="bg-red-400/20 p-4 rounded-lg border border-red-400/30">
              <div className="text-2xl mb-2">📤</div>
              <div className="text-red-400 font-bold text-sm mb-1">Output & UI</div>
              <div className="space-y-1 text-xs">
                <div className="bg-red-400/10 p-1 rounded text-white">📊 OpsCockpit</div>
                <div className="bg-red-400/10 p-1 rounded text-white">🖥️ Web Admin</div>
                <div className="bg-red-400/10 p-1 rounded text-white">📱 Mobile</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-white/70 text-sm">
              Horizontal Flow: <span className="text-blue-400">Core</span> → 
              <span className="text-green-400">Input</span> → 
              <span className="text-cyan-400">Processing</span> → 
              <span className="text-purple-400">Execution</span> → 
              <span className="text-red-400">Output</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

// ✅ KEEP - OPSPIPE PRODUCT COMPONENT
export default function OpsPipe() {
  const [missionTime, setMissionTime] = useState('');
  
  // Mission time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setMissionTime(now.toUTCString().slice(17, 25));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Helmet>
        <title>OpsPipe - Operational Automation Suite | CuriousLabs</title>
        <meta name="description" content="Enterprise-grade operational automation with real-time monitoring, intelligent workflows, and defense-grade telemetry. Transform chaos into order." />
        <meta property="og:title" content="OpsPipe - Operational Automation Suite | CuriousLabs" />
        <meta property="og:description" content="Enterprise-grade operational automation with real-time monitoring, intelligent workflows, and defense-grade telemetry. Transform chaos into order." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/opspipe" />
      </Helmet>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* Mission Control Navbar */}
      <MissionControlNavbar />
      
      {/* Atmospheric glow effects */}
      <div
        className="absolute z-[15] w-[1000px] h-[1000px] rounded-full blur-3xl pointer-events-none"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(132,204,22,0.03) 0%, transparent 70%)'
        }}
      />
      
      <main className="relative z-20 pt-20 pb-16">
        {/* Hero Section with anchor ID */}
        <section id="overview" className="max-w-7xl mx-auto px-4 py-16">
          {/* Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-lime-400/20 rounded-xl p-6 shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="font-mono text-blue-400 text-sm tracking-wider font-semibold">OPS-002</span>
                  <span className="font-mono text-white/70 text-sm">AUTOMATION_SUITE</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-400/30 bg-black/40">
                    <span className="text-xs font-mono text-white/70">STATUS:</span>
                    <span className="text-xs font-mono text-blue-400 font-semibold">ACTIVE</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40">
                    <span className="text-xs font-mono text-white/70">TIME:</span>
                    <span className="text-xs font-mono text-lime-400 font-semibold">{missionTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <motion.div 
                className="relative w-16 h-16 mx-auto mb-6"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <img 
                  src="/assets/images/general/Page_Logos/OpsPipe_logo.webp" 
                  alt="OpsPipe Logo" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
              
              <h1 className="font-space text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-4">
                Ops<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">Pipe</span>
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-blue-400/0 via-blue-400/60 to-blue-400/0 w-32 mx-auto"></div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-space text-xl md:text-2xl text-white/85 max-w-4xl mx-auto leading-relaxed mb-10"
            >
              Enterprise-grade operational automation with real-time monitoring and intelligent workflows
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
            <Link
              to="/codelab" 
                className="inline-flex items-center bg-gradient-to-r from-blue-400 to-cyan-400 text-black font-medium py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Access Engineering Bay
            </Link>
            <a 
              href="#features" 
                className="inline-flex items-center bg-black/50 border border-blue-400/30 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 hover:border-blue-400/50 hover:bg-black/70"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Explore Systems
            </a>
            </motion.div>
          </div>
        </section>
        
        {/* Product Description */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="backdrop-blur-2xl bg-black/40 border border-blue-400/20 rounded-xl p-8 shadow-2xl shadow-black/60">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="font-mono text-blue-400 text-sm tracking-wider font-semibold">MISSION BRIEF</span>
                </div>
                
                <h2 className="font-space text-3xl md:text-4xl font-bold text-white mb-6">
                  Transform Chaos into <span className="text-blue-400">Order</span>
                </h2>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                OpsPipe is the enterprise-grade solution for automating, monitoring, and optimizing your operational processes. 
                Built with flexibility in mind, OpsPipe integrates seamlessly with your existing infrastructure while providing 
                the tools you need to scale efficiently.
              </p>
                
                <div className="space-y-4">
                  {[
                    'Real-time monitoring dashboard', 
                    'Intelligent alert system', 
                    'Custom automation workflows', 
                    'Comprehensive API'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
                      <span className="text-white/90">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="backdrop-blur-2xl bg-black/30 border border-blue-400/20 rounded-xl p-8 shadow-2xl shadow-black/60">
                <div className="aspect-video bg-gradient-to-br from-blue-400/10 to-cyan-400/5 rounded-xl p-1 relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: "radial-gradient(2px 2px at 20px 30px, rgba(59,130,246,0.3), transparent), radial-gradient(2px 2px at 40px 70px, rgba(34,211,238,0.2), transparent), radial-gradient(1px 1px at 90px 40px, rgba(59,130,246,0.4), transparent)",
                      backgroundRepeat: "repeat",
                      backgroundSize: "100px 50px"
                    }}></div>
            </div>
                  
                  <div className="relative w-full h-full bg-black/60 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                      <motion.div
                        className="w-32 h-32 mx-auto mb-6 relative"
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        <img 
                          src="/assets/images/general/Page_Logos/OpsPipe_logo.webp" 
                          alt="OpsPipe Logo" 
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                      
                      <div className="space-y-2">
                        <div className="font-mono text-blue-400 text-sm tracking-wider">SYSTEM INTERFACE</div>
                        <div className="font-space text-white/80 text-lg">OpsPipe Command Center</div>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="font-mono text-xs text-white/60">OPERATIONAL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section with anchor ID */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white mb-4">
              System <span className="text-blue-400">Capabilities</span>
            </h2>
            <div className="h-0.5 bg-gradient-to-r from-blue-400/0 via-blue-400/60 to-blue-400/0 w-32 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-Time Monitoring',
                description: 'Live state tracking with trace logs, session keys, and output diagnostics for every task in the queue. Visualize exact FSM positions across your fleet.',
                icon: '🚨',
                status: 'OPERATIONAL',
                coordinates: 'MON-001'
              },
              {
                title: 'Intelligent Automation',
                description: 'Declarative workflows with branching logic and retry patterns. Configure fallback chains, escalation routes, and validation hooks via simple config files.',
                icon: '🔁',
                status: 'ACTIVE',
                coordinates: 'AUTO-002'
              },
              {
                title: 'Multi-Source Ingest',
                description: 'Process jobs via CLI, Telegram, webhooks or file watchers. Each input source writes to shared state registry with cryptographic session integrity.',
                icon: '🧪',
                status: 'MONITORING',
                coordinates: 'INGEST-003'
              },
              {
                title: 'Enterprise Error Handling',
                description: 'Sophisticated recovery framework with isolation guarantees. Failed operations create trace artifacts and auto-generate incident tickets with full context.',
                icon: '🛠️',
                status: 'STANDBY',
                coordinates: 'ERR-004'
              },
              {
                title: 'Structured Output Router',
                description: 'Route validated operation results to multiple destinations — DB, API endpoints, file exports, or messaging systems. Each route enforces schema validation.',
                icon: '📦',
                status: 'ACTIVE',
                coordinates: 'ROUTE-005'
              },
              {
                title: 'Defense-Grade Telemetry',
                description: 'Every operation generates immutable trace logs with timing metrics, state transitions, and cryptographic integrity hashes. Full audit compliance built-in.',
                icon: '🔐',
                status: 'OPERATIONAL',
                coordinates: 'TEL-006'
              },
            ].map((feature, index) => {
              const getStatusColor = (status) => {
                switch (status) {
                  case 'OPERATIONAL': return 'text-lime-400';
                  case 'ACTIVE': return 'text-blue-400';
                  case 'MONITORING': return 'text-yellow-400';
                  case 'STANDBY': return 'text-orange-400';
                  default: return 'text-gray-400';
                }
              };

              const getStatusBg = (status) => {
                switch (status) {
                  case 'OPERATIONAL': return 'bg-lime-400';
                  case 'ACTIVE': return 'bg-blue-400';
                  case 'MONITORING': return 'bg-yellow-400';
                  case 'STANDBY': return 'bg-orange-400';
                  default: return 'bg-gray-400';
                }
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group h-full"
                >
                  <div className="backdrop-blur-2xl bg-black/30 border border-blue-400/10 rounded-xl p-6 shadow-2xl shadow-black/60 hover:border-blue-400/30 transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 flex items-center justify-center border border-blue-400/30">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                      <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">
                        {feature.coordinates}
                      </div>
                    </div>
                    
                    <h3 className="font-space text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusBg(feature.status)}`}></div>
                      <span className={`text-xs font-mono tracking-wider ${getStatusColor(feature.status)}`}>
                        {feature.status}
                      </span>
                    </div>
                    
                    <p className="text-white/70 leading-relaxed flex-grow">{feature.description}</p>
                    
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center text-blue-400 text-sm font-medium">
                        <span>System Ready</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
              </div>
                </motion.div>
              );
            })}
          </div>
        </section>
        
        {/* Pipeline Flow Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white mb-4">
              Execution <span className="text-blue-400">Architecture</span>
            </h2>
            <div className="h-0.5 bg-gradient-to-r from-blue-400/0 via-blue-400/60 to-blue-400/0 w-32 mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-2xl bg-black/40 border border-blue-400/20 rounded-xl p-8 shadow-2xl shadow-black/60"
          >
            {/* Standalone Mermaid Diagram - No Container Constraints */}
            <OpsPipeArchitectureDiagram />
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Input Layer",
                  description: "Multiple ingestion points capture data from CLI, bots, file watchers or API calls into a unified processing queue.",
                  status: "ACTIVE"
                },
                {
                  title: "AI Orchestration", 
                  description: "Decision engine plots optimal path through state machine based on input parameters and runtime conditions.",
                  status: "OPERATIONAL"
                },
                {
                  title: "State Management",
                  description: "Transitions between steps are logged, validated and recoverable. Every state emits telemetry for analysis.",
                  status: "MONITORING"
                },
                {
                  title: "Knowledge Registry",
                  description: "Centralized document store with metrics, logs, and trace data organized for compliance and performance analysis.",
                  status: "OPERATIONAL"
                },
                {
                  title: "Output Router",
                  description: "Channel-aware distribution system pipes results to their destinations with format transformation as needed.",
                  status: "ACTIVE"
                },
                {
                  title: "Interface Layer",
                  description: "Multiple frontends for human interaction, from admin dashboards to field worker mobile apps and chat interfaces.",
                  status: "STANDBY"
                }
              ].map((component, index) => {
                const getStatusColor = (status) => {
                  switch (status) {
                    case 'OPERATIONAL': return 'text-lime-400';
                    case 'ACTIVE': return 'text-blue-400';
                    case 'MONITORING': return 'text-yellow-400';
                    case 'STANDBY': return 'text-orange-400';
                    default: return 'text-gray-400';
                  }
                };

                const getStatusBg = (status) => {
                  switch (status) {
                    case 'OPERATIONAL': return 'bg-lime-400';
                    case 'ACTIVE': return 'bg-blue-400';
                    case 'MONITORING': return 'bg-yellow-400';
                    case 'STANDBY': return 'bg-orange-400';
                    default: return 'bg-gray-400';
                  }
                };

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black/20 p-4 rounded-lg border border-blue-400/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-blue-300">{component.title}</h3>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusBg(component.status)}`}></div>
                        <span className={`text-xs font-mono ${getStatusColor(component.status)}`}>
                          {component.status}
                        </span>
              </div>
              </div>
                    <p className="text-sm text-white/70">{component.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>
        
        {/* Use Cases Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white mb-4">
              Mission <span className="text-blue-400">Scenarios</span>
            </h2>
            <div className="h-0.5 bg-gradient-to-r from-blue-400/0 via-blue-400/60 to-blue-400/0 w-32 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Financial Document Processing",
                description: "Ideal for growing businesses buried in receipts and invoices. OpsPipe parses documents, checks for errors, and auto-generates summaries — ready to sync with Xero, QuickBooks, or local accountants.\n\nCloses the gap between small ops and real bookkeeping, with zero manual entry.",
                icon: "💼",
                coordinates: "FDP-001"
              },
              {
                title: "F&B Back-Office Automation",
                description: "Streamline supplier invoices, inventory counts, and delivery platform sync. OpsPipe runs loops for restaurant chains, cafes, and hotels — no full-time admin needed.\n\nYou stay focused on food, we handle the paperwork.",
                icon: "🍽️",
                coordinates: "FNB-002"
              },
              {
                title: "Clinic Intake & Record Flow",
                description: "Simplifies form intake, ID validation, and patient routing. Clinics use OpsPipe to collect and process patient data while staying compliant and secure.\n\nCuts down wait times and admin load without touching your EMR.",
                icon: "🏥",
                coordinates: "HCR-003"
              },
              {
                title: "Academic Data Management",
                description: "Researchers and departments use OpsPipe to process survey data, lab reports, and grant paperwork. Auto-tagged, versioned, and export-ready — without spending hours on formatting.\n\nPerfect for teams who publish, not wrangle PDFs.",
                icon: "🎓",
                coordinates: "ADM-004"
              },
              {
                title: "Retail Ops + Metrics Loop",
                description: "Daily receipts, stock counts, vendor slips — OpsPipe turns it all into structured dashboards. Supports POS exports, trend snapshots, and alert flags for busy stores.\n\nNo more waiting for accounting to understand what’s happening in your own shop.",
                icon: "🛍️",
                coordinates: "RTL-005"
              },
              {
                title: "Personal Doc Manager",
                description: "A future consumer app powered by OpsPipe — designed to manage life’s paperwork with zero stress. From receipts and bills to school forms and IDs, everything is auto-sorted, summarized, and searchable.\n\nOps-grade infrastructure, simplified for everyday use.",
                icon: "📂",
                coordinates: "PDM-006"
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="backdrop-blur-2xl bg-black/30 border border-blue-400/10 rounded-xl p-6 shadow-2xl shadow-black/60 hover:border-blue-400/30 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">{useCase.icon}</div>
                    <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">
                      {useCase.coordinates}
                    </div>
                  </div>
                  
                  <h3 className="font-space text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-xs text-white/70 whitespace-pre-line leading-relaxed flex-grow">{useCase.description}</p>
              </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* LEGIT Protocol Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-2xl bg-black/40 border border-blue-400/20 rounded-xl p-8 shadow-2xl shadow-black/60 relative overflow-hidden"
          >
            {/* Blue glow effect */}
            <div className="absolute -inset-1 bg-blue-400/5 blur-md animate-pulse"></div>
            <div className="absolute inset-0 bg-blue-400/5 blur-lg opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="font-space text-2xl font-bold text-blue-400 mb-4">
                Built LEGIT for Operational Accountability
              </h2>
                <p className="text-white/80 max-w-3xl mx-auto mb-8">
                OpsPipe follows the <span className="font-semibold text-blue-300">LEGIT</span> standard — our framework for secure, testable, and audit-compliant operational systems.
              </p>
                </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    icon: "📜",
                    title: "Logged",
                    description: "Every operation and state change creates comprehensive audit logs."
                  },
                  {
                    icon: "🧪", 
                    title: "Evaluated",
                    description: "Workflows are tested against real-world operational scenarios."
                  },
                  {
                    icon: "🧠",
                    title: "Grounded", 
                    description: "All data processing follows strict schema validation rules."
                  },
                  {
                    icon: "🛡️",
                    title: "Isolated",
                    description: "Each operation runs in its own context without shared state risk."
                  },
                  {
                    icon: "✅",
                    title: "Tested",
                    description: "Continuous evaluation ensures consistent and reliable results."
                  }
                ].map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black/20 p-4 rounded-lg border border-blue-400/10 text-center"
                  >
                    <div className="text-xl mb-2">{principle.icon}</div>
                    <h3 className="font-semibold text-blue-300 mb-1">{principle.title}</h3>
                    <p className="text-white/70 text-sm">{principle.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* CTA Section */}
        <section id="cta" className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-2xl bg-black/40 border border-blue-400/20 rounded-xl p-10 shadow-2xl shadow-black/60 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h2 className="font-space text-3xl md:text-4xl font-bold text-white mb-6">
              Own Your <span className="text-blue-400">Operations</span>
            </h2>
            
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take control of your operational workflow with enterprise-grade automation and intelligence that scales with your business.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center bg-gradient-to-r from-blue-400 to-cyan-400 text-black font-medium py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contact Mission Control
              </Link>
              <Link
                to="/codelab"
                className="inline-flex items-center bg-black/50 border border-blue-400/30 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 hover:border-blue-400/50 hover:bg-black/70"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Access Engineering Bay
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      
      <ScrollToTop />
      <MissionControlNavbar />
    </div>
  );
} 