// ✅ KEEP - MOONSIGNAL PRODUCT - CRITICAL PRODUCTION SUB-ROUTE
// 🔴 CODE: MOONSIGNAL-001
// �� STATUS: MOONSIGNAL TRADING SIGNALS - FINANCIAL INTELLIGENCE PLATFORM
// 📋 COMPONENTS: MissionControlNavbar, BackgroundLayerAtomic, ScrollToTop
// 🧬 FEATURES: Real-time trading signals, market intelligence, financial analytics
// ⚠️ WARNING: DO NOT REMOVE - CORE TRADING PRODUCT SUB-ROUTE
// 📊 BUNDLE: Uses atomic background system with financial enhancements
// 🎯 ROUTE: /products/moonsignal
// 🔗 PARENT: Products Portal (/products)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import FooterExperience from '../../components/home/v4/FooterExperience';
// import Footer from '../../components/Footer_legacy';
import { IMAGES } from '../../utils/assets';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';
import LegalLink from '../../components/LegalLink';

// ✅ KEEP - MOONSIGNAL TRADING COMPONENT
import {  motion  } from '../../FramerProvider';

export default function MoonSignal() {
  const [missionTime, setMissionTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setMissionTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'OPERATIONAL': 'text-emerald-400',
      'ACTIVE': 'text-amber-400', 
      'MONITORING': 'text-slate-400',
      'STANDBY': 'text-indigo-400',
      'RESEARCH': 'text-purple-400'
    };
    return colors[status] || 'text-slate-400';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-emerald-400' : 'text-red-400';
  };

  const signalCapabilities = [
    {
      id: 'MSL-001',
      name: 'Signal Clustering',
      description: 'Advanced pattern recognition algorithms that identify and group market signals by correlation strength and momentum indicators',
      status: 'OPERATIONAL',
      classification: 'TIER-1',
      icon: '📡',
      accuracy: '94.2%',
      signalType: 'TECHNICAL'
    },
    {
      id: 'MSL-002', 
      name: 'Real-time Visualization',
      description: 'Professional-grade charting with candlestick patterns, volume analysis, and multi-timeframe signal overlay systems',
      status: 'ACTIVE',
      classification: 'TIER-1',
      icon: '📊',
      accuracy: '98.7%',
      signalType: 'VISUAL'
    },
    {
      id: 'MSL-003',
      name: 'AEGIS Integration',
      description: 'Direct pipeline to AEGIS decision engine for automated signal validation and risk-adjusted position sizing',
      status: 'OPERATIONAL',
      classification: 'TIER-2',
      icon: '🔗',
      accuracy: '91.8%',
      signalType: 'AUTOMATED'
    },
    {
      id: 'MSL-004',
      name: 'Multi-Asset Coverage',
      description: 'Comprehensive signal generation across crypto, forex, commodities, and traditional equity markets',
      status: 'MONITORING',
      classification: 'TIER-2',
      icon: '🌐',
      accuracy: '89.3%',
      signalType: 'CROSS-MARKET'
    },
    {
      id: 'MSL-005',
      name: 'Risk Classification',
      description: 'Intelligent signal scoring with volatility assessment, drawdown protection, and portfolio correlation analysis',
      status: 'ACTIVE',
      classification: 'TIER-3',
      icon: '🛡️',
      accuracy: '96.1%',
      signalType: 'RISK-MGMT'
    },
    {
      id: 'MSL-006',
      name: 'Adaptive Learning',
      description: 'Machine learning algorithms that continuously optimize signal accuracy based on market regime changes',
      status: 'RESEARCH',
      classification: 'TIER-1',
      icon: '🧠',
      accuracy: '87.9%',
      signalType: 'AI-POWERED'
    }
  ];

  const marketMetrics = [
    { 
      id: 'MSL-M001',
      label: 'Signal Accuracy', 
      value: '94.2', 
      unit: '%', 
      icon: '🎯',
      status: 'OPERATIONAL',
      trend: '↗ +2.3%',
      description: 'Average accuracy across all signal types'
    },
    { 
      id: 'MSL-M002',
      label: 'Processing Speed', 
      value: '0.08', 
      unit: 's', 
      icon: '⚡',
      status: 'ACTIVE',
      trend: '↘ -15ms',
      description: 'Signal generation latency'
    },
    { 
      id: 'MSL-M003',
      label: 'Active Signals', 
      value: '1,247', 
      unit: 'live', 
      icon: '📡',
      status: 'OPERATIONAL',
      trend: '↗ +23',
      description: 'Currently monitored opportunities'
    },
    { 
      id: 'MSL-M004',
      label: 'Market Coverage', 
      value: '24', 
      unit: '/7', 
      icon: '🌐',
      status: 'ACTIVE',
      trend: '● GLOBAL',
      description: 'Continuous market monitoring'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style jsx>{`
        /* Premium Financial Typography System */
        .font-financial { font-family: 'Inter', 'Roboto Mono', sans-serif; font-weight: 600; }
        .font-ticker { font-family: 'Roboto Mono', monospace; font-weight: 500; letter-spacing: 0.05em; }
        .font-currency { font-family: 'Space Grotesk', 'Inter', sans-serif; font-weight: 700; }
        
        .text-hero-financial { font-size: clamp(3rem, 8vw, 6rem); font-weight: 800; line-height: 0.9; }
        .text-price-large { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; }
        .text-ticker-small { font-size: 0.875rem; font-weight: 500; }
        
        /* Financial Color System */
        .text-gold { color: #FFD700; }
        .text-gold-dark { color: #B8860B; }
        .text-silver { color: #C0C0C0; }
        .text-silver-dark { color: #A8A8A8; }
        .text-platinum { color: #E5E4E2; }
        .text-profit { color: #00C851; }
        .text-loss { color: #FF4444; }
        .text-neutral { color: #FFA726; }
        
        /* Financial Gradients */
        .bg-gradient-gold { background: linear-gradient(135deg, #FFD700 0%, #FFA000 100%); }
        .bg-gradient-silver { background: linear-gradient(135deg, #C0C0C0 0%, #9E9E9E 100%); }
        .bg-gradient-profit { background: linear-gradient(135deg, #00C851 0%, #00E676 100%); }
        .bg-gradient-premium { background: linear-gradient(135deg, #FFD700 0%, #FF8F00 50%, #C0C0C0 100%); }
        
        /* Financial Glow Effects */
        .glow-gold { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3); }
        .glow-silver { text-shadow: 0 0 20px rgba(192, 192, 192, 0.5), 0 0 40px rgba(192, 192, 192, 0.3); }
        .glow-profit { text-shadow: 0 0 20px rgba(0, 200, 81, 0.5), 0 0 40px rgba(0, 200, 81, 0.3); }
        
        /* Trading Interface Elements */
        .price-ticker {
          background: linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.1) 50%, transparent 100%);
          animation: ticker-scroll 60s linear infinite;
        }
        
        @keyframes ticker-scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-200%); }
        }
        
        .signal-pulse {
          animation: signal-pulse 2s ease-in-out infinite;
        }
        
        @keyframes signal-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        .market-glow {
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.2), inset 0 0 30px rgba(255, 215, 0, 0.1);
        }
      `}</style>

      <ScrollToTop />
      <MissionControlNavbar />

      <BackgroundLayerAtomic />
      <Helmet>
        <title>MoonSignal - Premium Trading Intelligence | CuriousLabs</title>
        <meta name="description" content="Professional trading signals platform. Advanced market intelligence, real-time analytics, and AI-powered signal generation for crypto, forex, and traditional markets." />
        <meta property="og:title" content="MoonSignal - Premium Trading Intelligence | CuriousLabs" />
        <meta property="og:description" content="Professional trading signals platform with advanced market intelligence and AI-powered analytics." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/moonsignal" />
      </Helmet>
      
      {/* Enhanced Mission Status Panel */}
      <motion.div 
        className="fixed top-20 right-4 z-50 bg-black/90 backdrop-blur-md border border-gold-500/30 rounded-lg p-4 text-xs font-ticker market-glow"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-gold mb-2 font-financial">MOONSIGNAL TRADING</div>
        <div className="text-platinum">{missionTime.toUTCString().slice(17, 25)} UTC</div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 bg-profit rounded-full signal-pulse" />
          <span className="text-profit">SIGNALS ACTIVE</span>
        </div>
        <div className="text-xs text-silver mt-1">COORD: LUNAR-ALPHA</div>
        <div className="mt-2 pt-2 border-t border-gold-500/20">
          <div className="text-gold text-xs">30 ASSETS TRACKED</div>
          <div className="text-silver text-xs">MULTI-MARKET COVERAGE</div>
        </div>
      </motion.div>
      
      {/* Asset Coverage Ticker */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-16 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-gold-500/20 py-3 overflow-hidden"
      >
        <div className="price-ticker whitespace-nowrap font-ticker text-sm">
          {/* Cryptocurrency Assets - 20 total */}
          <span className="text-gold mr-8">Bitcoin</span>
          <span className="text-gold mr-8">Ethereum</span>
          <span className="text-gold mr-8">Solana</span>
          <span className="text-gold mr-8">Cardano</span>
          <span className="text-gold mr-8">Polygon</span>
          <span className="text-gold mr-8">Chainlink</span>
          <span className="text-gold mr-8">Avalanche</span>
          <span className="text-gold mr-8">Polkadot</span>
          <span className="text-gold mr-8">Litecoin</span>
          <span className="text-gold mr-8">XRP</span>
          <span className="text-gold mr-8">Binance Coin</span>
          <span className="text-gold mr-8">Dogecoin</span>
          <span className="text-gold mr-8">Shiba Inu</span>
          <span className="text-gold mr-8">Cosmos</span>
          <span className="text-gold mr-8">Algorand</span>
          <span className="text-gold mr-8">VeChain</span>
          <span className="text-gold mr-8">Tron</span>
          <span className="text-gold mr-8">Stellar</span>
          <span className="text-gold mr-8">Monero</span>
          <span className="text-gold mr-8">Ethereum Classic</span>
          
          {/* Stock Market Composites & Major Stocks - 25 total */}
          <span className="text-silver mr-8">S&P 500</span>
          <span className="text-silver mr-8">NASDAQ</span>
          <span className="text-silver mr-8">Dow Jones</span>
          <span className="text-silver mr-8">Russell 2000</span>
          <span className="text-silver mr-8">FTSE 100</span>
          <span className="text-silver mr-8">Apple</span>
          <span className="text-silver mr-8">Microsoft</span>
          <span className="text-silver mr-8">Tesla</span>
          <span className="text-silver mr-8">Google</span>
          <span className="text-silver mr-8">Amazon</span>
          <span className="text-silver mr-8">NVIDIA</span>
          <span className="text-silver mr-8">Meta</span>
          <span className="text-silver mr-8">Netflix</span>
          <span className="text-silver mr-8">PayPal</span>
          <span className="text-silver mr-8">Shopify</span>
          <span className="text-silver mr-8">AMD</span>
          <span className="text-silver mr-8">Intel</span>
          <span className="text-silver mr-8">Salesforce</span>
          <span className="text-silver mr-8">Adobe</span>
          <span className="text-silver mr-8">Oracle</span>
          <span className="text-silver mr-8">Zoom</span>
          <span className="text-silver mr-8">Uber</span>
          <span className="text-silver mr-8">Airbnb</span>
          <span className="text-silver mr-8">Square</span>
          <span className="text-silver mr-8">Palantir</span>
          
          {/* Commodities - 15 total */}
          <span className="text-neutral mr-8">Gold</span>
          <span className="text-neutral mr-8">Silver</span>
          <span className="text-neutral mr-8">Crude Oil</span>
          <span className="text-neutral mr-8">Natural Gas</span>
          <span className="text-neutral mr-8">Platinum</span>
          <span className="text-neutral mr-8">Copper</span>
          <span className="text-neutral mr-8">Palladium</span>
          <span className="text-neutral mr-8">Brent Oil</span>
          <span className="text-neutral mr-8">Heating Oil</span>
          <span className="text-neutral mr-8">Gasoline</span>
          <span className="text-neutral mr-8">Wheat</span>
          <span className="text-neutral mr-8">Corn</span>
          <span className="text-neutral mr-8">Soybeans</span>
          <span className="text-neutral mr-8">Coffee</span>
          <span className="text-neutral mr-8">Sugar</span>
        </div>
      </motion.div>
      
      <div className="relative z-10 pt-32">
        {/* Enhanced Hero Section */}
        <motion.div 
          className="container mx-auto px-6 py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            {/* Enhanced Mission Identifier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                <span className="text-gold font-ticker text-sm tracking-wider bg-gold/10 px-3 py-1 rounded-full border border-gold/20">MSL-TRADING-INTELLIGENCE-001</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent via-gold to-transparent"></div>
              </div>
            </motion.div>

            {/* Enhanced MoonSignal Logo */}
            <motion.div
              className="inline-block mb-8 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="relative w-64 h-64 mx-auto"
                whileHover={{ scale: 1.05 }}
              >
                {/* Orbital Ring Animation */}
                <motion.div
                  className="absolute inset-0 border-2 border-gold/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 border border-silver/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Logo Image */}
                <motion.img
                  src="/assets/images/general/Page_Logos/MoonSignal_logo.webp"
                  alt="MoonSignal Trading Intelligence Logo"
                  className="w-full h-full object-contain relative z-10"
                />
                
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-radial from-gold/20 via-transparent to-transparent rounded-full blur-xl" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-hero-financial font-financial mb-6 bg-gradient-premium bg-clip-text text-transparent glow-gold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              MOONSIGNAL
            </motion.h1>
            
            <motion.div 
              className="text-2xl sm:text-3xl text-gold font-ticker mb-8 tracking-wide glow-gold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              PREMIUM TRADING INTELLIGENCE
            </motion.div>
            
            <motion.p 
              className="text-lg sm:text-xl text-platinum max-w-4xl mx-auto leading-relaxed mb-12 font-financial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Professional-grade trading signals platform powered by advanced AI. Real-time market intelligence, 
              risk-adjusted position sizing, and multi-asset signal generation for crypto, forex, and traditional markets.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
            >
              <Link 
                to="/codelab" 
                className="group bg-gradient-gold hover:bg-gradient-to-r hover:from-gold hover:to-amber-400 text-black font-financial font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gold/25 market-glow"
              >
                <span className="flex items-center justify-center gap-3">
                  💰 ACCESS LIVE SIGNALS
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link 
                to="/products" 
                className="group bg-black/60 backdrop-blur-md border-2 border-silver/50 text-silver hover:bg-silver/10 hover:border-gold hover:text-gold font-financial font-bold py-4 px-8 rounded-lg transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3">
                  📊 VIEW PERFORMANCE
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
          
          {/* Enhanced Trading Status Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="bg-black/60 backdrop-blur-md border border-profit/30 rounded-lg p-6 market-glow hover:border-profit/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className="text-profit font-financial font-bold mb-2">Signal Array</h3>
              <p className="text-price-large font-currency text-profit">ACTIVE</p>
              <p className="text-sm text-silver font-ticker">1,247 live signals</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-profit rounded-full signal-pulse" />
                <span className="text-xs text-profit font-ticker">REAL-TIME</span>
            </div>
            </motion.div>
            
            <motion.div 
              className="bg-black/60 backdrop-blur-md border border-gold/30 rounded-lg p-6 market-glow hover:border-gold/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className="text-gold font-financial font-bold mb-2">Accuracy Rate</h3>
              <p className="text-price-large font-currency text-gold">94.2%</p>
              <p className="text-sm text-silver font-ticker">Last 30 days</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-gold rounded-full signal-pulse" />
                <span className="text-xs text-gold font-ticker">VERIFIED</span>
            </div>
            </motion.div>
            
            <motion.div 
              className="bg-black/60 backdrop-blur-md border border-silver/30 rounded-lg p-6 market-glow hover:border-silver/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className="text-silver font-financial font-bold mb-2">Processing Speed</h3>
              <p className="text-price-large font-currency text-silver">0.08s</p>
              <p className="text-sm text-silver font-ticker">Signal generation</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-silver rounded-full signal-pulse" />
                <span className="text-xs text-silver font-ticker">OPTIMIZED</span>
            </div>
            </motion.div>
            
            <motion.div 
              className="bg-black/60 backdrop-blur-md border border-neutral/30 rounded-lg p-6 market-glow hover:border-neutral/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className="text-neutral font-financial font-bold mb-2">Market Coverage</h3>
              <p className="text-price-large font-currency text-neutral">24/7</p>
              <p className="text-sm text-silver font-ticker">Global markets</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-neutral rounded-full signal-pulse" />
                <span className="text-xs text-neutral font-ticker">CONTINUOUS</span>
            </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Signal Intelligence Capabilities */}
        <motion.section 
          className="container mx-auto px-6 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                <span className="text-gold font-ticker text-sm tracking-wider bg-gold/10 px-3 py-1 rounded-full border border-gold/20">TRADING-INTELLIGENCE-CORE</span>
                <div className="h-px w-20 bg-gradient-to-l from-transparent via-gold to-transparent"></div>
              </div>
            </motion.div>

            <motion.h2 
              className="text-4xl sm:text-5xl font-financial font-bold mb-6 text-profit glow-profit"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Advanced Trading Signals
            </motion.h2>
            
            <motion.p 
              className="text-lg text-platinum max-w-3xl mx-auto font-financial"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Professional-grade signal generation with institutional-level accuracy. Multi-asset coverage, 
              risk-adjusted positioning, and real-time market intelligence for serious traders.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signalCapabilities.map((capability, index) => (
              <motion.div
                key={capability.id}
                className="group bg-black/60 backdrop-blur-md border border-gold/20 hover:border-gold/50 rounded-lg p-6 transition-all duration-300 market-glow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Header with ID and Status */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-ticker text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                    {capability.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-ticker ${getStatusColor(capability.status)}`}>
                    {capability.status}
                  </span>
                    <div className={`w-2 h-2 rounded-full signal-pulse ${getStatusColor(capability.status).replace('text-', 'bg-')}`} />
                </div>
                </div>

                {/* Icon and Title */}
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">{capability.icon}</span>
                  <div>
                    <h3 className="text-xl font-financial font-bold text-platinum group-hover:text-gold transition-colors duration-300">
                      {capability.name}
                    </h3>
                    <span className="text-xs font-ticker text-silver bg-silver/10 px-2 py-1 rounded mt-1 inline-block">
                      {capability.signalType}
                    </span>
                </div>
                </div>

                {/* Description */}
                <p className="text-silver mb-6 font-financial leading-relaxed group-hover:text-platinum transition-colors duration-300">
                  {capability.description}
                </p>

                {/* Accuracy and Classification */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-currency text-profit">{capability.accuracy}</div>
                    <div className="text-xs font-ticker text-silver">ACCURACY</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-silver">{capability.classification}</div>
                    <div className="text-xs font-ticker text-gold">PRIORITY</div>
                  </div>
                </div>

                {/* Performance Bar */}
                <div className="w-full bg-black/40 rounded-full h-2 mb-2">
                  <motion.div 
                    className="bg-gradient-to-r from-gold to-profit h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${parseFloat(capability.accuracy)}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
                <div className="text-xs font-ticker text-silver text-center">Signal Confidence</div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-profit/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Market Intelligence Metrics */}
        <motion.div 
          className="container mx-auto px-6 py-20 bg-gradient-to-b from-transparent via-gold/5 to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-silver to-transparent"></div>
                <span className="text-silver font-ticker text-sm tracking-wider bg-silver/10 px-3 py-1 rounded-full border border-silver/20">PERFORMANCE-METRICS-LIVE</span>
                <div className="h-px w-20 bg-gradient-to-l from-transparent via-silver to-transparent"></div>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-4xl sm:text-5xl font-financial font-bold mb-6 text-silver glow-silver"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Real-Time Performance
            </motion.h2>
            
            <motion.p 
              className="text-lg text-platinum max-w-3xl mx-auto font-financial"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Live performance indicators and market sentiment analysis from our institutional-grade signal processing network.
              Track accuracy, speed, and market coverage in real-time.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {marketMetrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                className="group bg-black/70 backdrop-blur-md border border-silver/20 hover:border-gold/50 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-gold/10 market-glow"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                {/* Metric Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {metric.icon}
                </div>

                {/* Metric Value */}
                <div className="mb-3">
                  <span className="text-4xl font-currency text-gold group-hover:text-profit transition-colors duration-300">
                    {metric.value}
                  </span>
                  <span className="text-silver ml-1 font-ticker">{metric.unit}</span>
            </div>

                {/* Metric Label */}
                <h3 className="text-lg font-financial font-bold text-platinum mb-3 group-hover:text-gold transition-colors duration-300">
                  {metric.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-silver mb-4 font-financial">
                  {metric.description}
                </p>

                {/* Status and Trend */}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className={`w-2 h-2 rounded-full signal-pulse ${getStatusColor(metric.status).replace('text-', 'bg-')}`} />
                  <span className="text-xs font-ticker text-silver uppercase tracking-wider">
                    {metric.status}
                  </span>
                  </div>

                {/* Trend Indicator */}
                <div className="text-sm font-ticker text-profit bg-profit/10 px-3 py-1 rounded-full border border-profit/20">
                  {metric.trend}
                </div>

                {/* Performance Ring */}
                <div className="mt-4 relative w-16 h-16 mx-auto">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(192,192,192,0.2)" strokeWidth="4"/>
                    <motion.circle 
                      cx="32" cy="32" r="28" fill="none" 
                      stroke="url(#goldGradient)" strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                      whileInView={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - parseFloat(metric.value) / 100) }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    />
                    <defs>
                      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#00C851" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-ticker text-gold">{Math.round(parseFloat(metric.value))}%</span>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-profit/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Enhanced Real-time Status Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-black/70 backdrop-blur-md border border-gold/30 rounded-lg p-8 market-glow"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Live Signal Processing */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-profit rounded-full signal-pulse" />
                  <span className="text-profit font-ticker text-sm font-bold">LIVE PROCESSING</span>
              </div>
                <div className="text-2xl font-currency text-gold mb-1">1,247</div>
                <div className="text-sm text-silver font-financial">Active Signals</div>
              </div>

              {/* Market Status */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-gold rounded-full signal-pulse" />
                  <span className="text-gold font-ticker text-sm font-bold">MARKET STATUS</span>
                </div>
                <div className="text-2xl font-currency text-profit mb-1">OPTIMAL</div>
                <div className="text-sm text-silver font-financial">Network Health</div>
              </div>

              {/* Last Update */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-silver rounded-full signal-pulse" />
                  <span className="text-silver font-ticker text-sm font-bold">LAST UPDATE</span>
                </div>
                <div className="text-lg font-ticker text-platinum mb-1">
                  {missionTime.toUTCString().slice(17, 25)} UTC
                </div>
                <div className="text-sm text-silver font-financial">Real-time sync</div>
              </div>
            </div>

            {/* Signal Strength Indicator */}
            <div className="mt-6 pt-6 border-t border-gold/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-financial text-platinum">Signal Strength</span>
                <span className="text-sm font-ticker text-gold">94.2% STRONG</span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-gold via-profit to-gold h-3 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "94.2%" }}
                  transition={{ duration: 2 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Multi-Asset Signal Coverage */}
        <motion.section 
          className="container mx-auto px-6 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-neutral to-transparent"></div>
                <span className="text-neutral font-ticker text-sm tracking-wider bg-neutral/10 px-3 py-1 rounded-full border border-neutral/20">MULTI-ASSET-COVERAGE</span>
                <div className="h-px w-20 bg-gradient-to-l from-transparent via-neutral to-transparent"></div>
              </div>
            </motion.div>

            <motion.h2 
              className="text-4xl sm:text-5xl font-financial font-bold mb-6 bg-gradient-to-r from-neutral to-gold bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Global Market Intelligence
            </motion.h2>
            
            <motion.p 
              className="text-lg text-platinum max-w-3xl mx-auto font-financial"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Comprehensive signal generation across all major asset classes. From cryptocurrency and forex to 
              commodities and traditional equities - professional-grade intelligence for every market.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Cryptocurrency Markets */}
            <motion.div
              className="group bg-black/60 backdrop-blur-md border border-gold/20 hover:border-gold/50 rounded-lg p-6 market-glow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-4xl mb-4 text-center">₿</div>
              <h3 className="text-xl font-financial font-bold text-gold mb-4 text-center">Cryptocurrency</h3>
              <ul className="space-y-3 text-silver font-financial">
                  <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Bitcoin, Ethereum, Altcoins
                  </li>
                  <li className="flex items-start">
                  <span className="text-profit mr-2">•</span>
                  DeFi protocol monitoring
                  </li>
                  <li className="flex items-start">
                  <span className="text-neutral mr-2">•</span>
                  On-chain analytics integration
                </li>
                <li className="flex items-start">
                  <span className="text-silver mr-2">•</span>
                  24/7 market coverage
                  </li>
                </ul>
              <div className="mt-4 pt-4 border-t border-gold/20">
                <div className="text-center">
                  <span className="text-2xl font-currency text-profit">847</span>
                  <div className="text-xs font-ticker text-silver">Active Pairs</div>
              </div>
              </div>
            </motion.div>

            {/* Forex Markets */}
            <motion.div
              className="group bg-black/60 backdrop-blur-md border border-silver/20 hover:border-silver/50 rounded-lg p-6 market-glow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-4xl mb-4 text-center">💱</div>
              <h3 className="text-xl font-financial font-bold text-silver mb-4 text-center">Foreign Exchange</h3>
              <ul className="space-y-3 text-silver font-financial">
                  <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Major currency pairs (EUR/USD, GBP/USD)
                  </li>
                  <li className="flex items-start">
                  <span className="text-profit mr-2">•</span>
                  Central bank policy analysis
                  </li>
                  <li className="flex items-start">
                  <span className="text-neutral mr-2">•</span>
                  Economic indicator correlation
                </li>
                <li className="flex items-start">
                  <span className="text-silver mr-2">•</span>
                  Institutional flow tracking
                  </li>
                </ul>
              <div className="mt-4 pt-4 border-t border-silver/20">
                <div className="text-center">
                  <span className="text-2xl font-currency text-profit">156</span>
                  <div className="text-xs font-ticker text-silver">Currency Pairs</div>
              </div>
              </div>
            </motion.div>

            {/* Commodities */}
            <motion.div
              className="group bg-black/60 backdrop-blur-md border border-neutral/20 hover:border-neutral/50 rounded-lg p-6 market-glow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-4xl mb-4 text-center">🥇</div>
              <h3 className="text-xl font-financial font-bold text-neutral mb-4 text-center">Commodities</h3>
              <ul className="space-y-3 text-silver font-financial">
                  <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Precious metals (Gold, Silver, Platinum)
                  </li>
                  <li className="flex items-start">
                  <span className="text-profit mr-2">•</span>
                  Energy markets (Oil, Gas, Renewables)
                  </li>
                  <li className="flex items-start">
                  <span className="text-neutral mr-2">•</span>
                  Agricultural futures
                </li>
                <li className="flex items-start">
                  <span className="text-silver mr-2">•</span>
                  Supply chain intelligence
                  </li>
                </ul>
              <div className="mt-4 pt-4 border-t border-neutral/20">
                <div className="text-center">
                  <span className="text-2xl font-currency text-profit">89</span>
                  <div className="text-xs font-ticker text-silver">Commodity Contracts</div>
              </div>
            </div>
            </motion.div>

            {/* Traditional Equities */}
            <motion.div
              className="group bg-black/60 backdrop-blur-md border border-profit/20 hover:border-profit/50 rounded-lg p-6 market-glow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-4xl mb-4 text-center">📈</div>
              <h3 className="text-xl font-financial font-bold text-profit mb-4 text-center">Equities</h3>
              <ul className="space-y-3 text-silver font-financial">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  S&P 500, NASDAQ, International indices
                </li>
                <li className="flex items-start">
                  <span className="text-profit mr-2">•</span>
                  Earnings sentiment analysis
                </li>
                <li className="flex items-start">
                  <span className="text-neutral mr-2">•</span>
                  Sector rotation signals
                </li>
                <li className="flex items-start">
                  <span className="text-silver mr-2">•</span>
                  Options flow intelligence
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-profit/20">
                <div className="text-center">
                  <span className="text-2xl font-currency text-profit">2,340</span>
                  <div className="text-xs font-ticker text-silver">Tracked Stocks</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Advanced Trading Strategies */}
        <motion.section 
          className="container mx-auto px-6 py-20 bg-gradient-to-b from-transparent via-profit/5 to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-profit to-transparent"></div>
                <span className="text-profit font-ticker text-sm tracking-wider bg-profit/10 px-3 py-1 rounded-full border border-profit/20">STRATEGY-ENGINE-ALPHA</span>
                <div className="h-px w-20 bg-gradient-to-l from-transparent via-profit to-transparent"></div>
              </div>
            </motion.div>

            <motion.h2 
              className="text-4xl sm:text-5xl font-financial font-bold mb-6 text-profit glow-profit"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Intelligent Trading Strategies
            </motion.h2>
            
            <motion.p 
              className="text-lg text-platinum max-w-3xl mx-auto font-financial"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Advanced algorithmic strategies powered by machine learning. Risk-managed approaches designed for 
              consistent performance across all market conditions.
            </motion.p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Momentum Strategies */}
            <motion.div
              className="bg-black/70 backdrop-blur-md border border-profit/30 rounded-lg p-8 market-glow"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🚀</div>
              <div>
                  <h3 className="text-2xl font-financial font-bold text-profit mb-2">Momentum Strategies</h3>
                  <span className="text-sm font-ticker text-gold bg-gold/10 px-2 py-1 rounded">TREND-FOLLOWING</span>
                </div>
              </div>
              
              <ul className="space-y-4 text-silver font-financial mb-6">
                  <li className="flex items-start">
                  <span className="text-profit mr-3">▶</span>
                  <div>
                    <strong className="text-platinum">Breakout Detection:</strong> Identify key resistance/support breaks with 96.3% accuracy
                  </div>
                  </li>
                  <li className="flex items-start">
                  <span className="text-gold mr-3">▶</span>
                  <div>
                    <strong className="text-platinum">Volume Confirmation:</strong> Smart volume analysis to validate momentum signals
                  </div>
                  </li>
                  <li className="flex items-start">
                  <span className="text-neutral mr-3">▶</span>
                  <div>
                    <strong className="text-platinum">Risk Management:</strong> Dynamic stop-loss and profit-taking algorithms
                  </div>
                  </li>
                </ul>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-profit/10 rounded border border-profit/20">
                  <div className="text-2xl font-currency text-profit">23.7%</div>
                  <div className="text-xs font-ticker text-silver">Avg Monthly Return</div>
              </div>
                <div className="text-center p-3 bg-gold/10 rounded border border-gold/20">
                  <div className="text-2xl font-currency text-gold">1.47</div>
                  <div className="text-xs font-ticker text-silver">Sharpe Ratio</div>
                </div>
              </div>
            </motion.div>

            {/* Mean Reversion Strategies */}
            <motion.div
              className="bg-black/70 backdrop-blur-md border border-gold/30 rounded-lg p-8 market-glow"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">⚖️</div>
              <div>
                  <h3 className="text-2xl font-financial font-bold text-gold mb-2">Mean Reversion</h3>
                  <span className="text-sm font-ticker text-silver bg-silver/10 px-2 py-1 rounded">COUNTER-TREND</span>
                </div>
              </div>
              
              <ul className="space-y-4 text-silver font-financial mb-6">
                  <li className="flex items-start">
                  <span className="text-gold mr-3">▶</span>
                  <div>
                    <strong className="text-platinum">Oversold/Overbought:</strong> Statistical analysis of price deviations from mean
                  </div>
                  </li>
                  <li className="flex items-start">
                  <span className="text-profit mr-3">▶</span>
                  <div>
                    <strong className="text-platinum">Volatility Scaling:</strong> Position sizing based on current market volatility
                  </div>
                  </li>
                  <li className="flex items-start">
                  <span className="text-neutral mr-3">▶</span>
                  <div>
                    <strong className="text-platinum">Multi-Timeframe:</strong> Signals validated across multiple time horizons
                  </div>
                  </li>
                </ul>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gold/10 rounded border border-gold/20">
                  <div className="text-2xl font-currency text-gold">18.2%</div>
                  <div className="text-xs font-ticker text-silver">Avg Monthly Return</div>
          </div>
                <div className="text-center p-3 bg-silver/10 rounded border border-silver/20">
                  <div className="text-2xl font-currency text-silver">92.1%</div>
                  <div className="text-xs font-ticker text-silver">Win Rate</div>
            </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Premium Call-to-Action */}
        <motion.section 
          className="container mx-auto px-6 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gradient-to-br from-black/80 via-gold/5 to-black/80 backdrop-blur-md border border-gold/30 rounded-2xl p-12 text-center market-glow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                <span className="text-gold font-ticker text-sm tracking-wider bg-gold/10 px-4 py-2 rounded-full border border-gold/20">PREMIUM-ACCESS</span>
                <div className="h-px w-24 bg-gradient-to-l from-transparent via-gold to-transparent"></div>
      </div>
            </motion.div>

            <motion.h2 
              className="text-4xl sm:text-5xl font-financial font-bold mb-6 bg-gradient-premium bg-clip-text text-transparent glow-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Start Trading Smarter Today
            </motion.h2>
            
            <motion.p 
              className="text-xl text-platinum max-w-3xl mx-auto mb-8 font-financial"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join thousands of professional traders using MoonSignal for institutional-grade market intelligence. 
              Get access to real-time signals, advanced analytics, and proven trading strategies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-center gap-6 mb-8"
            >
              <Link 
                to="/codelab" 
                className="group bg-gradient-gold hover:bg-gradient-to-r hover:from-gold hover:to-profit text-black font-financial font-bold py-5 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gold/30 market-glow"
              >
                <span className="flex items-center justify-center gap-3 text-lg">
                  💰 START FREE TRIAL
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link 
                to="/products" 
                className="group bg-black/60 backdrop-blur-md border-2 border-silver/50 text-silver hover:bg-silver/10 hover:border-gold hover:text-gold font-financial font-bold py-5 px-10 rounded-lg transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3 text-lg">
                  📊 VIEW PRICING
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="text-center">
                <div className="text-3xl font-currency text-profit mb-2">1,000+</div>
                <div className="text-sm font-financial text-silver">Assets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-currency text-gold mb-2">20+</div>
                <div className="text-sm font-financial text-silver">Wallets Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-currency text-silver mb-2">24/7</div>
                <div className="text-sm font-financial text-silver">Strategy Uptime</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
      
      <FooterExperience />
      <ScrollToTop />
      <LegalLink />
    </div>
  );
} 