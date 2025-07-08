// ✅ KEEP - AEGIS PRODUCT - CRITICAL PRODUCTION SUB-ROUTE
// 🔴 CODE: AEGIS-001
// 🛡️ STATUS: AEGIS CORE RUNTIME ENGINE - MAIN PRODUCT PAGE
// 📋 COMPONENTS: MissionControlNavbar, BackgroundLayerAtomic, ScrollToTop
// 🧬 FEATURES: Product showcase, technical specs, integration guide
// ⚠️ WARNING: DO NOT REMOVE - CORE PRODUCT SUB-ROUTE
// 📊 BUNDLE: Uses atomic background system
// 🎯 ROUTE: /products/aegis
// 🔗 PARENT: Products Portal (/products)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import { IMAGES } from '../../utils/assets';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';
import './aegis.css'; // Add CSS import for custom animations

// ✅ KEEP - AEGIS PRODUCT COMPONENT
import {  motion  } from '../../FramerProvider';

// 🚨 PHASE 1 MOBILE OPTIMIZATION: Add mobile detection
import { useUnifiedMobile } from '../../hooks/useBreakpoint';

// 🚨 PHASE 1 MOBILE OPTIMIZATION: Safe environment variable access
const getEnvVar = (key, defaultValue = '') => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  // Fallback for browser environments where process is not defined
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }
  return defaultValue;
};

// 🚨 PHASE 1 PRODUCTION CLEANUP: Conditional logging
const isDev = getEnvVar('NODE_ENV') === 'development';
const debugLog = (...args) => {
  if (isDev) console.log(...args);
};

// AEGIS Architecture Diagram Component
const AegisArchitectureDiagram = () => {
  const [diagramReady, setDiagramReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isExpanded) return;

    const initAndRender = async () => {
      try {
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;
        
        mermaid.initialize({ 
          theme: 'dark',
          themeVariables: {
            primaryColor: '#f59e0b',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#f59e0b',
            lineColor: '#ea580c',
            sectionBkgColor: '#000000',
            altSectionBkgColor: '#1a1a1a',
            gridColor: '#333333',
            secondaryColor: '#06b6d4',
            tertiaryColor: '#8b5cf6',
            background: '#000000',
            mainBkg: '#1a1a1a',
            secondBkg: '#262626',
            cScale0: '#f59e0b',
            cScale1: '#ea580c',
            cScale2: '#06b6d4'
          },
          flowchart: {
            htmlLabels: true,
            curve: 'basis',
            padding: 20,
            nodeSpacing: 60,
            rankSpacing: 80
          },
          startOnLoad: false,
          securityLevel: 'loose'
        });
        
        setDiagramReady(true);
        
        // Render after short delay
        setTimeout(() => {
          const element = document.getElementById('aegis-architecture-chart');
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
  }, [isExpanded]);

  return (
    <div className="mt-8">
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-black/40 backdrop-blur-md border border-amber-400/30 rounded-xl p-6 hover:border-amber-400/50 transition-all duration-300 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🏗️</div>
            <div className="text-left">
              <h3 className="font-display text-headline text-white group-hover:text-amber-400 transition-colors">
                AEGIS System Architecture
              </h3>
              <p className="text-gray-400 text-body-enhanced">
                Interactive flow diagram showing core components and data flow
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-amber-400 text-2xl"
          >
            ▼
          </motion.div>
        </div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="mt-4 bg-black/30 backdrop-blur-md border border-amber-400/20 rounded-xl p-6">
          {isExpanded && diagramReady ? (
            <div 
              id="aegis-architecture-chart"
              className="mermaid w-full" 
              style={{ 
                minHeight: '500px', 
                width: '100%',
                display: 'block',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, system-ui, monospace',
                overflow: 'visible',
                background: 'transparent'
              }}
            >
              {`graph TB
    %% Entry Points
    CLI[🖥️ CLI Interface<br/>Direct Commands]
    API[⚡ API Gateway<br/>REST/GraphQL]
    SDK[📦 SDK Integration<br/>External Apps]
    
    %% Core AEGIS Engine
    subgraph CORE["🧠 AEGIS CORE ENGINE"]
        DISPATCH[📋 Input Dispatcher<br/>Route & Validate]
        FSM[🔄 State Machine<br/>Contract Enforcement]
        CONTEXT[💾 Mission Context<br/>Memory & Session]
    end
    
    %% Agent Control Layer
    subgraph AGENTS["🤖 AGENT CONTROL LAYER"]
        ROUTER[🧭 Agent Router<br/>Model Selection]
        GPT[🟢 GPT-4<br/>Reasoning]
        CLAUDE[🔵 Claude<br/>Analysis] 
        GEMINI[🟡 Gemini<br/>Processing]
        LOCAL[🔒 Local Models<br/>Privacy Mode]
    end
    
    %% Processing Pipeline
    subgraph PIPELINE["⚙️ PROCESSING PIPELINE"]
        VALIDATOR[✅ Contract Validator<br/>Schema Check]
        EXECUTOR[🚀 Task Executor<br/>Parallel Processing]
        MONITOR[📊 Health Monitor<br/>Performance Tracking]
    end
    
    %% LEGIT Framework
    subgraph LEGIT["🛡️ LEGIT FRAMEWORK"]
        LOGGER[📝 Audit Logger<br/>Trace Everything]
        ENFORCER[⚖️ Rule Enforcer<br/>Contract Compliance]
        GOVERNOR[👥 Human Oversight<br/>Approval Workflows]
        ISOLATOR[🔒 Secure Runtime<br/>Data Protection]
        TESTER[🧪 Quality Gate<br/>Validation Tests]
    end
    
    %% Storage & Recovery
    subgraph STORAGE["💾 STORAGE & RECOVERY"]
        STATEDB[(🗃️ State Database<br/>Session Memory)]
        TRACEDB[(📊 Trace Store<br/>Audit Logs)]
        RECOVERY[🛟 Recovery Engine<br/>Fallback Logic]
        BACKUP[💿 Backup System<br/>Data Integrity]
    end
    
    %% Output Systems
    subgraph OUTPUT["📤 OUTPUT SYSTEMS"]
        CURIOUS[💖 Curious AI<br/>Chat Interface]
        OPSPIPE[🔧 OpsPipe<br/>DevOps Automation]
        GUARDIAN[🛡️ Guardian<br/>Security Layer]
        MOONSIGNAL[🌙 MoonSignal<br/>Market Intelligence]
        EXTERNAL[🔗 External APIs<br/>Third Party]
    end
    
    %% Entry Flow
    CLI --> DISPATCH
    API --> DISPATCH
    SDK --> DISPATCH
    
    %% Core Processing
    DISPATCH --> FSM
    FSM --> CONTEXT
    CONTEXT --> ROUTER
    
    %% Agent Selection & Execution
    ROUTER --> GPT
    ROUTER --> CLAUDE
    ROUTER --> GEMINI
    ROUTER --> LOCAL
    
    %% Agent to Pipeline
    GPT --> VALIDATOR
    CLAUDE --> VALIDATOR
    GEMINI --> VALIDATOR
    LOCAL --> VALIDATOR
    
    %% Pipeline Flow
    VALIDATOR --> EXECUTOR
    EXECUTOR --> MONITOR
    MONITOR --> LOGGER
    
    %% LEGIT Framework Integration
    LOGGER --> ENFORCER
    ENFORCER --> GOVERNOR
    GOVERNOR --> ISOLATOR
    ISOLATOR --> TESTER
    
    %% Storage Integration
    CONTEXT --> STATEDB
    LOGGER --> TRACEDB
    MONITOR --> RECOVERY
    RECOVERY --> BACKUP
    
    %% Output Distribution
    TESTER --> CURIOUS
    TESTER --> OPSPIPE
    TESTER --> GUARDIAN
    TESTER --> MOONSIGNAL
    TESTER --> EXTERNAL
    
    %% Recovery Loops
    RECOVERY --> |Fallback| ROUTER
    MONITOR --> |Health Check| RECOVERY
    BACKUP --> |Restore| STATEDB
    
    %% Feedback Loops
    OUTPUT --> |Telemetry| MONITOR
    EXTERNAL --> |Status| MONITOR
    
    %% Styling
    classDef entry fill:#f59e0b,stroke:#ea580c,stroke-width:3px,color:#000
    classDef core fill:#1a1a1a,stroke:#f59e0b,stroke-width:3px,color:#fff
    classDef agents fill:#1a1a1a,stroke:#06b6d4,stroke-width:2px,color:#fff
    classDef pipeline fill:#1a1a1a,stroke:#8b5cf6,stroke-width:2px,color:#fff
    classDef legit fill:#1a1a1a,stroke:#10b981,stroke-width:2px,color:#fff
    classDef storage fill:#1a1a1a,stroke:#3b82f6,stroke-width:2px,color:#fff
    classDef output fill:#1a1a1a,stroke:#ef4444,stroke-width:2px,color:#fff
    
    class CLI,API,SDK entry
    class DISPATCH,FSM,CONTEXT core
    class ROUTER,GPT,CLAUDE,GEMINI,LOCAL agents
    class VALIDATOR,EXECUTOR,MONITOR pipeline
    class LOGGER,ENFORCER,GOVERNOR,ISOLATOR,TESTER legit
    class STATEDB,TRACEDB,RECOVERY,BACKUP storage
    class CURIOUS,OPSPIPE,GUARDIAN,MOONSIGNAL,EXTERNAL output`}
            </div>
          ) : isExpanded && !diagramReady ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mb-4"></div>
              <p className="text-gray-400">Loading architecture diagram...</p>
            </div>
          ) : null}
          
          {isExpanded && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              <div className="bg-amber-500/20 p-3 rounded-lg border border-amber-400/30">
                <div className="text-xl mb-1">🧠</div>
                <div className="text-amber-400 font-mono-enhanced text-xs mb-1">CORE ENGINE</div>
                <div className="text-white text-xs">State Machine<br/>Context Memory</div>
              </div>
              
              <div className="bg-cyan-500/20 p-3 rounded-lg border border-cyan-400/30">
                <div className="text-xl mb-1">🤖</div>
                <div className="text-cyan-400 font-mono-enhanced text-xs mb-1">AGENT LAYER</div>
                <div className="text-white text-xs">Multi-Model<br/>Coordination</div>
              </div>
              
              <div className="bg-purple-500/20 p-3 rounded-lg border border-purple-400/30">
                <div className="text-xl mb-1">⚙️</div>
                <div className="text-purple-400 font-mono-enhanced text-xs mb-1">PIPELINE</div>
                <div className="text-white text-xs">Validation<br/>Execution</div>
              </div>
              
              <div className="bg-green-500/20 p-3 rounded-lg border border-green-400/30">
                <div className="text-xl mb-1">🛡️</div>
                <div className="text-green-400 font-mono-enhanced text-xs mb-1">LEGIT</div>
                <div className="text-white text-xs">Security<br/>Compliance</div>
              </div>
              
              <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-400/30">
                <div className="text-xl mb-1">💾</div>
                <div className="text-blue-400 font-mono-enhanced text-xs mb-1">STORAGE</div>
                <div className="text-white text-xs">State & Trace<br/>Recovery</div>
              </div>
              
              <div className="bg-red-500/20 p-3 rounded-lg border border-red-400/30">
                <div className="text-xl mb-1">📤</div>
                <div className="text-red-400 font-mono-enhanced text-xs mb-1">OUTPUT</div>
                <div className="text-white text-xs">Product APIs<br/>External Systems</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function Aegis() {
  // 🚨 PHASE 1 MOBILE OPTIMIZATION: Mobile detection
  const { isMobile } = useUnifiedMobile();
  
  // 🚨 PHASE 1 PRODUCTION CLEANUP: Debug initialization
  if (isDev) {
    debugLog('🛡️ [AEGIS] Command center initializing...');
    debugLog('⚡ [SYSTEMS] All defensive protocols online');
  }

  const [activeTab, setActiveTab] = useState('features');
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [missionTime, setMissionTime] = useState(new Date());
  
  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'OPERATIONAL': return 'text-lime-400 bg-lime-400/20';
      case 'ACTIVE': return 'text-blue-400 bg-blue-400/20';
      case 'MONITORING': return 'text-yellow-400 bg-yellow-400/20';
      case 'STANDBY': return 'text-orange-400 bg-orange-400/20';
      case 'RESEARCH': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  // 🚨 PHASE 1 MOBILE OPTIMIZATION: Reduce timer frequency on mobile
  useEffect(() => {
    const interval = isMobile ? 5000 : 1000; // 5s on mobile, 1s on desktop
    const timer = setInterval(() => {
      setMissionTime(new Date());
    }, interval);
    return () => clearInterval(timer);
  }, [isMobile]);

  // 🚨 PHASE 1 MOBILE OPTIMIZATION: Mobile-optimized animation variants
  const mobileOptimizedVariants = {
    // Disable complex animations on mobile
    initial: isMobile ? { opacity: 1 } : { opacity: 0, y: 30 },
    animate: isMobile ? { opacity: 1 } : { opacity: 1, y: 0 },
    whileInView: isMobile ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: isMobile ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }
  };

  // 🚨 PHASE 1 MOBILE OPTIMIZATION: Simplified motion props for mobile
  const getMotionProps = (desktopProps) => {
    if (isMobile) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0 }
      };
    }
    return desktopProps;
  };

  // Define the use cases array with enhanced data
  const useCases = [
    {
      title: "Core Platform for All CuriousLabs Products",
      description: "AEGIS isn't just a backend — it's the mission runtime. Every intelligent product we build, from Curious to OpsPipe, runs through its contract-driven state machine. Shared memory. Fallback logic. Real trace control.\n\nAEGIS is the soul of the system.",
      icon: "🧠",
      coordinates: "AEG-001",
      status: "CORE",
      classification: "FOUNDATIONAL"
    },
    {
      title: "Agentic Software Planning & Build System",
      description: "AEGIS coordinates multi-agent teams for planning, building, testing, and validating full-stack applications. This is the backbone of CodeLab — where human users can spin up SaaS platforms with real audits, fallbacks, and memory — not brittle scripts.\n\nIt's AI-assisted software creation, done right.",
      icon: "🧪",
      coordinates: "AEG-002",
      status: "OPERATIONAL",
      classification: "CRITICAL"
    },
    {
      title: "Autonomous Manufacturing Logic",
      description: "From procurement to production, AEGIS can run workflows that span multiple systems and AI agents. Each phase is state-tracked, decision-routed, and validated by function-specific models. Ideal for precision manufacturing and industrial AI.\n\nAutonomous doesn't mean blind — it means accountable.",
      icon: "🏭",
      coordinates: "AEG-003",
      status: "RESEARCH",
      classification: "HIGH"
    },
    {
      title: "Secure CorporateOps Layer",
      description: "Deploy an LLM environment with strict trace controls, agent restrictions, and on-premise compliance. AEGIS enables enterprises to run smart workflows without ever exposing data to outside APIs.\n\nPrivacy first. Full control. Fully internal.",
      icon: "🏢",
      coordinates: "AEG-004",
      status: "ACTIVE",
      classification: "SECURE"
    },
    {
      title: "Scientific Discovery Engine",
      description: "AEGIS supports iterative, multi-agent loops for material science, pharmaceutical modeling, and lab data interpretation. AI is changing the pace of R&D in frontier labs.\n\nStructured exploration, backed by agent-grade reasoning.",
      icon: "🔬",
      coordinates: "AEG-005",
      status: "EXPERIMENTAL",
      classification: "TRANSFORMATIVE"
    },
    {
      title: "Developer SDK & Integration Layer",
      description: "Companies can embed AEGIS as the core runtime of their own products. Bring your own agents. Use our FSM, logging, and validator stack. Build safer apps, faster — without starting from scratch.\n\nYour stack. Our agentic foundation.",
      icon: "📦",
      coordinates: "AEG-006",
      status: "PREVIEW",
      classification: "PARTNER"
    }
  ];
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-['Inter','Space_Grotesk',system-ui,sans-serif]">
      <Helmet>
        <title>AEGIS Command Center - Core Process Engine | CuriousLabs</title>
        <meta name="description" content="The central intelligence unit that powers all CuriousLabs products with advanced algorithms and machine learning capabilities." />
        <meta property="og:title" content="AEGIS Command Center - Core Process Engine | CuriousLabs" />
        <meta property="og:description" content="The central intelligence unit that powers all CuriousLabs products with advanced algorithms and machine learning capabilities." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/aegis" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Enhanced Typography CSS */}
      <style jsx>{`
        .font-display {
          font-family: 'Orbitron', 'Space Grotesk', system-ui, sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .font-mono-enhanced {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-weight: 500;
          letter-spacing: 0.05em;
        }
        
        .text-hero {
          font-size: clamp(3rem, 8vw, 6rem);
          line-height: 0.9;
          font-weight: 800;
          letter-spacing: -0.04em;
        }
        
        .text-display {
          font-size: clamp(2rem, 5vw, 3.5rem);
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .text-headline {
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          line-height: 1.2;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        
        .text-body-enhanced {
          font-size: clamp(1rem, 2vw, 1.125rem);
          line-height: 1.7;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        
        .text-premium {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 30%, #ea580c 70%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.3));
        }
        
        .text-glow {
          text-shadow: 0 0 15px rgba(245, 158, 11, 0.3), 0 0 30px rgba(245, 158, 11, 0.15);
        }
        
        .text-glow-subtle {
          text-shadow: 0 0 8px rgba(245, 158, 11, 0.25);
        }
        
        .text-glow-cyan {
          text-shadow: 0 0 15px rgba(34, 211, 238, 0.4), 0 0 30px rgba(34, 211, 238, 0.2);
        }
        
        .text-glow-orange {
          text-shadow: 0 0 15px rgba(251, 146, 60, 0.4), 0 0 30px rgba(251, 146, 60, 0.2);
        }
        
        .hover-glow-intense:hover {
          text-shadow: 0 0 25px rgba(245, 158, 11, 0.5), 0 0 50px rgba(245, 158, 11, 0.3);
          transition: text-shadow 0.3s ease;
        }
        
        .gradient-amber-orange {
          background: linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-cosmic {
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 25%, #8b5cf6 50%, #f59e0b 75%, #ea580c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .border-cosmic {
          border-image: linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6, #f59e0b, #ea580c) 1;
        }
        
        .bg-cosmic-glow {
          background: radial-gradient(circle at center, rgba(245, 158, 11, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%);
        }
      `}</style>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* 🚨 PHASE 1 MOBILE OPTIMIZATION: Reduce atmospheric effects on mobile */}
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/3 via-blue-500/3 to-transparent rounded-full blur-2xl" />
          <div className="absolute top-3/4 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
      )}
      
      <MissionControlNavbar />
      
      {/* 🚨 PHASE 1 MOBILE OPTIMIZATION: Simplified mission status on mobile */}
      <motion.div 
        className="fixed top-20 right-4 z-50 bg-black/80 backdrop-blur-md border border-amber-400/30 rounded-lg p-3 text-xs"
        {...getMotionProps({
          initial: { opacity: 0, x: 100 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.5 }
        })}
      >
        <div className="text-amber-400 font-mono-enhanced mb-1">AEGIS STATUS</div>
        <div className="text-white font-mono-enhanced">{missionTime.toUTCString().slice(17, 25)} UTC</div>
        <div className="flex items-center gap-2 mt-1">
          <div className={`w-2 h-2 bg-amber-400 rounded-full ${!isMobile ? 'animate-pulse' : ''}`} />
          <span className="text-amber-400">COMMAND READY</span>
        </div>
      </motion.div>
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16 relative z-10">
        {/* Overview Section with anchor ID */}
        <section id="overview" className="max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
          <motion.div
            {...getMotionProps({
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8 }
            })}
          >
            {/* Mission Status */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400"></div>
              <span className="text-amber-400 font-mono-enhanced text-sm tracking-wider text-glow-subtle">AEG-CORE-001</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
            
            {/* Hero Title - Enhanced */}
            <h1 className="font-display text-hero text-white mb-6 text-glow hover-glow-intense">
              <span className="text-premium">
                AEGIS
              </span>
            </h1>
            
            {/* Subtitle - Enhanced */}
            <div className="text-headline text-orange-400 font-mono-enhanced mb-4 tracking-wide text-glow-orange">
              CORE RUNTIME ENGINE
            </div>
            
            <p className="text-body-enhanced text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              The central intelligence unit that powers all CuriousLabs products with advanced algorithms and machine learning capabilities. AEGIS coordinates multi-agent workflows, manages state machines, and ensures every decision is traceable and auditable.
            </p>
            
            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link 
                to="/contact" 
                className={`group bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 ${!isMobile ? 'transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25' : ''}`}
              >
                <span className="flex items-center justify-center gap-2 font-semibold">
                  ACCESS ENGINEERING BAY
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link 
                to="/docs" 
                className={`group bg-black/40 backdrop-blur-md border border-cyan-500/50 text-white hover:bg-cyan-500/10 hover:border-cyan-400 font-medium py-4 px-8 rounded-lg transition-all duration-300`}
              >
                <span className="flex items-center justify-center gap-2 font-semibold">
                  CONTACT MISSION CONTROL
                  <svg className="w-4 h-4 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </Link>
            </div>
            
            {/* Enhanced Stats Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { icon: "⚡", label: "RESPONSE TIME", value: "< 100ms", color: "cyan" },
                { icon: "🧠", label: "AI MODELS", value: "12+", color: "purple" },
                { icon: "🔒", label: "SECURITY", value: "LEGIT", color: "blue" },
                { icon: "🌐", label: "AVAILABILITY", value: "99.9%", color: "amber" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`bg-black/20 backdrop-blur-sm border border-${stat.color}-400/20 rounded-xl p-4 text-center hover:border-${stat.color}-400/50 transition-all duration-300`}
                  {...getMotionProps({
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { delay: index * 0.1 }
                  })}
                >
                  <span className="text-lg">{stat.icon}</span>
                  <span className={`text-${stat.color}-400 text-sm font-mono-enhanced`}>{stat.label}</span>
                  <div className="text-white font-bold text-xl font-display">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Mission Brief Section - Enhanced */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <motion.div 
            className="text-center mb-12"
            {...getMotionProps({
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true }
            })}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-400"></div>
              <span className="text-orange-400 font-mono-enhanced text-sm tracking-wider text-glow-subtle">MISSION BRIEF</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-400"></div>
            </div>
            
            <h2 className="font-display text-display text-white mb-6 text-glow">
              The Heart of Our
              <span className="block text-premium">Ecosystem</span>
            </h2>
            
            <p className="text-gray-300 mb-6 text-body-enhanced leading-relaxed">
              AEGIS is more than infrastructure — it's the cognitive core that makes our AI products genuinely intelligent. 
              While others build chatbots, we build minds.
            </p>
            
            <p className="text-gray-300 mb-8 text-body-enhanced leading-relaxed">
              Every conversation with Curious, every pipeline in OpsPipe, every security decision in Guardian — 
              they all flow through AEGIS's contract-driven architecture.
            </p>
          </motion.div>
        </section>
        
        {/* Main content sections */}
        <section className="max-w-7xl mx-auto px-4 py-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400"></div>
                <span className="text-orange-400 font-mono text-sm tracking-wider">MISSION BRIEF</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                The Heart of Our 
                <span className="block text-orange-400">Ecosystem</span>
              </h2>
              
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Aegis is the central intelligence unit that powers all CuriousLabs products. Built with advanced algorithms 
                and machine learning capabilities, Aegis processes data, makes decisions, and orchestrates workflows across 
                our entire product ecosystem.
              </p>
              
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Whether you're using OpsPipe for DevOps automation, MoonSignal for market intelligence, or any of our other 
                products, you're experiencing the power of Aegis working behind the scenes.
              </p>

              {/* Mission Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Uptime", value: "99.9%", icon: "⚡" },
                  { label: "Response", value: "<50ms", icon: "🚀" },
                  { label: "Accuracy", value: "99.7%", icon: "🎯" },
                  { label: "Scale", value: "∞", icon: "📈" }
                ].map((stat, index) => (
                  <div key={index} className="bg-black/20 backdrop-blur-sm border border-orange-400/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{stat.icon}</span>
                      <span className="text-orange-400 text-sm font-mono">{stat.label}</span>
                    </div>
                    <div className="text-white font-bold text-xl">{stat.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-black/40 backdrop-blur-md border border-orange-400/30 rounded-2xl p-8 relative overflow-hidden">
                {/* Enhanced background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-32 h-32 border border-orange-400/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 right-4 w-24 h-24 border border-orange-400/30 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-cyan-400/20 rounded-full animate-pulse delay-500"></div>
                </div>
                
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-amber-500/8 via-orange-500/4 to-transparent rounded-2xl"></div>
                
                <div className="relative z-10 text-center">
                  {/* Enhanced Aegis Logo */}
                  <motion.div
                    className="inline-block mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  >
                    <motion.div
                      className="relative w-28 h-28 mx-auto"
                      whileHover={{ 
                        scale: 1.1,
                        filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.4))"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        src="/assets/images/general/Page_Logos/Aegis_logo.webp"
                        alt="Aegis Logo"
                        className="w-full h-full object-contain filter drop-shadow-lg"
                      />
                      {/* Orbital ring effect */}
                      <div className="absolute inset-0 border border-orange-400/20 rounded-full animate-spin-slow"></div>
                    </motion.div>
                  </motion.div>
                  
                  <h3 className="font-display text-headline text-premium mb-3 text-glow">AEGIS Core Engine</h3>
                  <p className="text-orange-400 font-mono-enhanced text-sm mb-6 tracking-wider text-glow-subtle">CENTRAL COMMAND PROCESSOR</p>
                  <p className="text-gray-300 text-body-enhanced leading-relaxed mb-8 max-w-md mx-auto">
                    Intelligent processing engine orchestrating all mission-critical operations with advanced AI coordination protocols
                  </p>
                  
                  {/* Enhanced status indicators */}
                  <div className="flex justify-center gap-6 mt-8">
                    {[
                      { status: 'ACTIVE', color: 'lime-400', icon: '⚡' },
                      { status: 'SECURE', color: 'cyan-400', icon: '🔒' },
                      { status: 'READY', color: 'amber-400', icon: '🎯' }
                    ].map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex flex-col items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 bg-${item.color} rounded-full animate-pulse`}></div>
                          <span className="text-xs">{item.icon}</span>
                        </div>
                        <span className={`text-${item.color} text-xs font-mono-enhanced font-bold`}>{item.status}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section with anchor ID */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-16 mb-16">
          <motion.div
            {...getMotionProps({
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.8 }
            })}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400"></div>
              <span className="text-cyan-400 font-mono-enhanced text-sm tracking-wider text-glow-cyan">SYSTEM CAPABILITIES</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400"></div>
            </div>
            
            <h2 className="font-display text-display text-white mb-6 text-glow">
              Core Features
            </h2>
            
            <p className="text-gray-400 text-body-enhanced max-w-3xl mx-auto">
              Advanced AI coordination protocols designed for mission-critical operations
            </p>
          </motion.div>
          
          {/* Features Grid - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Contract-Driven State Machine",
                description: "Every AI agent operates within defined contracts. No hallucinations, no drift — just predictable, auditable behavior that scales across thousands of concurrent processes.",
                icon: "📋",
                coordinates: "AEG-F001",
                status: "OPERATIONAL",
                classification: "CORE"
              },
              {
                title: "Multi-Agent Orchestration",
                description: "Coordinate teams of specialized AI agents for complex workflows. Each agent has a role, memory, and clear handoff protocols — like a well-trained ops team.",
                icon: "🤝",
                coordinates: "AEG-F002", 
                status: "ACTIVE",
                classification: "ADVANCED"
              },
              {
                title: "Real-Time Decision Routing",
                description: "Smart routing ensures the right AI model handles each task. GPT-4 for reasoning, Claude for analysis, local models for privacy — all seamlessly coordinated.",
                icon: "🧭",
                coordinates: "AEG-F003",
                status: "OPTIMIZED",
                classification: "INTELLIGENT"
              },
              {
                title: "Audit-Grade Logging",
                description: "Every decision, every state change, every agent interaction is logged with full traceability. Perfect for compliance, debugging, and continuous improvement.",
                icon: "📊",
                coordinates: "AEG-F004",
                status: "MONITORING",
                classification: "SECURITY"
              },
              {
                title: "Fallback & Recovery",
                description: "When things go wrong, AEGIS doesn't crash — it gracefully degrades. Backup models, retry logic, and human handoff ensure mission continuity.",
                icon: "🛡️",
                coordinates: "AEG-F005",
                status: "STANDBY",
                classification: "RESILIENCE"
              },
              {
                title: "Memory & Context Management",
                description: "Persistent memory across sessions, context-aware responses, and intelligent information retrieval. Your AI remembers what matters.",
                icon: "🧠",
                coordinates: "AEG-F006",
                status: "LEARNING",
                classification: "COGNITIVE"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-black/30 backdrop-blur-md border border-orange-400/20 rounded-2xl p-6 hover:border-orange-400/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Feature Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 text-xs font-mono-enhanced">
                    <span className="text-orange-400">{feature.coordinates}</span>
                    <span className="text-gray-500">|</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(feature.status)}`}>
                      {feature.status}
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-60" />
                </div>

                <div className={`text-3xl mb-4 ${!isMobile ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>{feature.icon}</div>
                <h3 className={`text-headline font-display text-white mb-3 ${!isMobile ? 'group-hover:text-orange-400' : ''} transition-colors`}>
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-body-enhanced leading-relaxed mb-4">{feature.description}</p>
                
                {/* Classification badge */}
                <div className="mt-4 pt-4 border-t border-orange-400/20">
                  <span className="text-orange-400 text-xs font-mono-enhanced">
                    READY
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Under the Hood Section - Enhanced */}
        <section className="max-w-7xl mx-auto px-4 py-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
              <span className="text-blue-400 font-mono text-sm tracking-wider">SYSTEM ARCHITECTURE</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Under the Hood: How Aegis Works
              <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-400 mx-auto mt-3 rounded-full" />
            </h2>
          </motion.div>
          
          {/* Add Architecture Diagram */}
          <AegisArchitectureDiagram />
          
          <motion.div 
            className="bg-black/30 backdrop-blur-md border border-orange-400/20 rounded-2xl p-8 hover:border-orange-400/40 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ul className="space-y-6">
              {[
                {
                  title: "StateMachine Core",
                  description:
                    "All logic is governed by a deterministic FSM (finite-state machine) that enforces valid transitions, prevents undefined behavior, and emits traceable state logs at every lifecycle step.",
                  icon: "🧠",
                  coordinates: "ARCH-001"
                },
                {
                  title: "Agent Control Layer",
                  description:
                    "A plug-and-play control bus for external AI agents (GPT, Claude, Gemini, Grok). Agents operate in validated slots with session-specific execution context and audit-compliant I/O.",
                  icon: "🎛️",
                  coordinates: "ARCH-002"
                },
                {
                  title: "Trace Telemetry Engine",
                  description:
                    "Every session emits granular telemetry: state transitions, agent calls, fallback reasons, and output timing. Built for postmortems, playback, and human validation.",
                  icon: "📊",
                  coordinates: "ARCH-003"
                },
                {
                  title: "Contract Enforcement",
                  description:
                    "All logic paths are bound by schema contracts. No runtime guesswork. Transitions and actions are declared, validated, and version-controlled.",
                  icon: "📜",
                  coordinates: "ARCH-004"
                },
                {
                  title: "Modular Output Bus",
                  description:
                    "Structured output flows — renderers, APIs, CLI, sync agents. Each downstream output is routed via config and trace-backed for reproducibility.",
                  icon: "🧩",
                  coordinates: "ARCH-005"
                },
                {
                  title: "Secure Runtime Surface",
                  description:
                    "Built with isolation, fallback control, and execution limits. No global state leakage. Sessions are atomic, trace-synced, and optionally sealed for audit logs.",
                  icon: "🔐",
                  coordinates: "ARCH-006"
                }
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start p-4 bg-black/20 rounded-lg border border-orange-400/10 hover:border-orange-400/30 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mr-4">
                    <span className="text-orange-500 text-2xl">{item.icon}</span>
                    <span className="text-orange-400 font-mono text-xs">{item.coordinates}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>
        
        {/* LEGIT Protocol Section - Enhanced */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400"></div>
              <span className="text-purple-400 font-mono-enhanced text-sm tracking-wider text-glow-subtle">PROTOCOL STANDARD</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
            
            <h2 className="font-display text-display text-premium mb-6 text-glow">
              LEGIT Framework
            </h2>
            
            <p className="text-gray-300 text-body-enhanced max-w-3xl mx-auto">
              Every decision in Aegis follows the <span className="font-bold text-orange-300">LEGIT</span> standard — our internal protocol for secure, testable, and audit-compliant AI runtimes.
            </p>
          </div>
          
          {/* LEGIT Grid - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              { 
                letter: "L", 
                title: "Logged", 
                desc: "Every action is recorded with full traceability",
                icon: "📝",
                coordinates: "LEG-001"
              },
              { 
                letter: "E", 
                title: "Enforced", 
                desc: "Contracts and schemas prevent invalid states",
                icon: "⚖️",
                coordinates: "LEG-002"
              },
              { 
                letter: "G", 
                title: "Governed", 
                desc: "Human oversight and approval workflows",
                icon: "👥",
                coordinates: "LEG-003"
              },
              { 
                letter: "I", 
                title: "Isolated", 
                desc: "Secure execution environments and data protection",
                icon: "🔒",
                coordinates: "LEG-004"
              },
              { 
                letter: "T", 
                title: "Tested", 
                desc: "Continuous validation and quality assurance",
                icon: "🧪",
                coordinates: "LEG-005"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-orange-400/20 hover:border-orange-400/50 transition-all duration-300 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-orange-400 font-mono-enhanced text-xs mb-2">{item.coordinates}</div>
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="font-display text-orange-300 mb-3 text-lg font-bold">{item.title}</h3>
                <p className="text-gray-400 text-body-enhanced leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          
          {/* LEGIT Details - Enhanced */}
          <motion.div
            className="bg-black/20 backdrop-blur-sm border border-orange-400/20 rounded-2xl p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-headline font-display text-white mb-6">
              Why LEGIT Matters
            </h3>
            <p className="text-gray-300 mb-6 text-body-enhanced leading-relaxed">
              AI systems that handle real business logic need more than just "prompt engineering." 
              They need formal contracts, audit trails, and fail-safe mechanisms.
            </p>
            
            <div className="space-y-4">
              {[
                { letter: "L", title: "Logged", desc: "Complete audit trail of every decision, state change, and agent interaction" },
                { letter: "E", title: "Enforced", desc: "Schema validation ensures agents never operate outside defined parameters" },
                { letter: "G", title: "Governed", desc: "Human approval workflows for critical decisions and escalation paths" },
                { letter: "I", title: "Isolated", desc: "Secure execution environments with data encryption and access controls" },
                { letter: "T", title: "Tested", desc: "Continuous validation with automated testing and quality assurance" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-black/20 rounded-lg">
                  <div className="w-8 h-8 bg-orange-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-400 font-bold font-display">{item.letter}</span>
                  </div>
                  <div>
                    <span className="text-orange-400 font-bold text-lg font-display">{item.letter} – {item.title}:</span>
                    <br />
                    <span className="text-gray-300 text-body-enhanced leading-relaxed">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Use Cases Section - Enhanced */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div 
            className="text-center mb-16"
            {...getMotionProps({
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true }
            })}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-400"></div>
              <span className="text-indigo-400 font-mono-enhanced text-sm tracking-wider text-glow-subtle">MISSION SCENARIOS</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-400"></div>
            </div>
            
            <h2 className="font-display text-display text-white mb-6 text-glow">
              Use Cases
            </h2>
            
            <p className="text-gray-400 text-body-enhanced max-w-3xl mx-auto">
              Real-world applications where AEGIS delivers mission-critical results
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div 
                key={index} 
                className="bg-black/30 backdrop-blur-md border border-orange-400/20 rounded-2xl p-6 hover:border-orange-400/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 min-h-[280px] flex flex-col group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Status Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 text-xs font-mono-enhanced">
                    <span className="text-orange-400">{useCase.coordinates}</span>
                    <span className="text-gray-500">|</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(useCase.status)}`}>
                      {useCase.status}
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-60" />
                </div>

                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{useCase.icon}</div>
                <h3 className="text-headline font-display text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-gray-300 text-body-enhanced leading-relaxed whitespace-pre-line flex-1">{useCase.description}</p>
                
                {/* Classification badge */}
                <div className="mt-4 pt-4 border-t border-orange-400/20">
                  <span className="text-orange-400 font-mono-enhanced text-xs">
                    CLASSIFICATION: {useCase.classification}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Call to Action Section - Enhanced */}
        <section id="cta" className="max-w-5xl mx-auto px-4 py-16 text-center">
          <motion.div 
            className="bg-black/40 backdrop-blur-md border border-orange-400/30 rounded-2xl p-10 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-500/5 rounded-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-400"></div>
                <span className="text-orange-400 font-mono-enhanced text-sm tracking-wider text-glow-subtle">MISSION READY</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-400"></div>
              </div>
              
              <h2 className="font-display text-display text-white mb-6 text-glow">
                Build Smarter With AEGIS
              </h2>
              
              <p className="text-body-enhanced text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Whether you're launching a startup, building an internal tool, or managing chaotic ops — AEGIS is your AI-native command center.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="group bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25"
                >
                  <span className="flex items-center justify-center gap-2 font-semibold">
                    INITIATE CONTACT
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link 
                  to="/docs" 
                  className="group bg-black/40 backdrop-blur-md border border-cyan-500/50 text-white hover:bg-cyan-500/10 hover:border-cyan-400 font-medium py-4 px-8 rounded-lg transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2 font-semibold">
                    ACCESS DOCUMENTATION
                    <svg className="w-4 h-4 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      
      <ScrollToTop />
      <MissionControlNavbar />
    </div>
  );
} 