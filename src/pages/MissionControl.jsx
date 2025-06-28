import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '../FramerProvider';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import CircularGauge from '../components/dashboard/gauges/CircularGauge';
import RadarDisplay from '../components/dashboard/displays/RadarDisplay';
import LinearFader from '../components/dashboard/controls/LinearFader';
import WorldMap from '../components/dashboard/displays/WorldMap';
import PerformanceChart from '../components/dashboard/displays/PerformanceChart';

/**
 * 🛸 MISSION CONTROL DASHBOARD
 * Secret spacecraft cockpit monitoring CuriousLabs operations
 * Combines real site metrics with fictional mission-critical systems
 */
const MissionControl = () => {
  // 🎛️ System States
  const [systemStatus, setSystemStatus] = useState('NOMINAL');
  const [powerLevel, setPowerLevel] = useState(94);
  const [shieldsActive, setShieldsActive] = useState(true);
  const [commsStrength, setCommsStrength] = useState(87);
  const [missionTime, setMissionTime] = useState('');
  const [stardate, setStardate] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authInput, setAuthInput] = useState('');
  
  // 📊 Real Metrics (simulated for now)
  const [metrics, setMetrics] = useState({
    visitors: 1247,
    pageViews: 8934,
    loadTime: 1.2,
    uptime: 99.8,
    bandwidth: 76,
    memory: 68,
    cpuUsage: 34,
    activeUsers: 23,
    temperature: 42,
    diskUsage: 67,
    networkLatency: 23,
    cacheHitRate: 94
  });

  // 🕐 Time Updates
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setMissionTime(now.toUTCString().slice(17, 25));
      // Stardate calculation (fictional)
      const stardate = (now.getFullYear() - 2000) * 1000 + now.getMonth() * 83 + now.getDate() * 2.7;
      setStardate(stardate.toFixed(1));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 📈 Simulate real-time metric updates
  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(prev => ({
        ...prev,
        activeUsers: Math.max(1, prev.activeUsers + Math.floor(Math.random() * 6) - 3),
        bandwidth: Math.max(20, Math.min(100, prev.bandwidth + Math.floor(Math.random() * 10) - 5)),
        memory: Math.max(30, Math.min(95, prev.memory + Math.floor(Math.random() * 6) - 3)),
        cpuUsage: Math.max(10, Math.min(80, prev.cpuUsage + Math.floor(Math.random() * 8) - 4)),
        temperature: Math.max(35, Math.min(65, prev.temperature + Math.floor(Math.random() * 4) - 2)),
        diskUsage: Math.max(40, Math.min(85, prev.diskUsage + Math.floor(Math.random() * 2) - 1)),
        networkLatency: Math.max(10, Math.min(50, prev.networkLatency + Math.floor(Math.random() * 6) - 3)),
        cacheHitRate: Math.max(85, Math.min(99, prev.cacheHitRate + Math.floor(Math.random() * 2) - 1))
      }));
      
      // Fluctuate power and comms
      setPowerLevel(prev => Math.max(85, Math.min(100, prev + Math.floor(Math.random() * 4) - 2)));
      setCommsStrength(prev => Math.max(70, Math.min(100, prev + Math.floor(Math.random() * 6) - 3)));
    };

    const interval = setInterval(updateMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔐 Authentication Handler
  const handleAuth = (e) => {
    e.preventDefault();
    if (authInput.toLowerCase() === 'digital') {
      setIsAuthenticated(true);
    } else {
      // Add shake animation for wrong password
      setAuthInput('');
    }
  };

  // 🔐 Authentication Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden" style={{ fontFamily: 'JetBrains Mono, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
        {/* Navbar */}
        <MissionControlNavbar alwaysExpanded={true} />
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(132,204,22,0.1)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(168,85,247,0.05)_0%,_transparent_50%)]" />
        </div>

        {/* Authentication Panel */}
        <div className="relative z-10 flex items-center justify-center min-h-screen pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full mx-4"
          >
            <div className="backdrop-blur-xl bg-black/80 border border-lime-400/30 rounded-xl p-8 shadow-2xl">
              <div className="text-center space-y-6">
                {/* Header */}
                <div>
                  <div className="text-red-400 text-2xl font-bold mb-2">🔐 ACCESS CONTROL</div>
                  <div className="text-lime-400 text-sm font-mono">CLEARANCE LEVEL REQUIRED</div>
                </div>

                {/* Warning */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="text-red-400 text-xs font-mono">
                    ⚠️ CLASSIFIED SYSTEM<br/>
                    UNAUTHORIZED ACCESS PROHIBITED
                  </div>
                </div>

                {/* Auth Form */}
                <form onSubmit={handleAuth} className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-mono mb-2">
                      Enter Command Authorization:
                    </label>
                    <input
                      type="password"
                      value={authInput}
                      onChange={(e) => setAuthInput(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-lime-400/30 rounded-lg text-lime-400 font-mono placeholder-white/40 focus:border-lime-400 focus:outline-none"
                      placeholder="••••••••"
                      autoComplete="off"
                    />
                  </div>
                  
                  <div className="text-xs text-white/60 font-mono">
                    💡 Hint- the password is digital- :)
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-lime-400/20 border border-lime-400/50 text-lime-400 rounded-lg font-mono text-sm hover:bg-lime-400/30 transition-all duration-300"
                  >
                    🚀 INITIATE ACCESS
                  </button>
                </form>

                {/* Footer */}
                <div className="text-xs text-white/40 font-mono">
                  MISSION CONTROL v2.1.0 • AEGIS RUNTIME
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // 🛸 Main Mission Control Dashboard
  return (
    <div className="min-h-screen bg-black relative overflow-hidden" style={{ fontFamily: 'JetBrains Mono, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
      {/* Navbar */}
      <MissionControlNavbar alwaysExpanded={true} />
      
      {/* Technical Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(132, 204, 22, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(132, 204, 22, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(132,204,22,0.05)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.05)_0%,_transparent_50%)]" />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-lime-400/40 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Dashboard */}
      <div className="relative z-10 pt-16 pb-4">
        <div className="max-w-full mx-auto px-4">
          
          {/* Compact Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-6">
                <div>
                  <h1 className="text-xl font-bold text-lime-400 mb-1 tracking-wider">
                    🛸 MISSION CONTROL DASHBOARD
                  </h1>
                  <p className="text-white/60 font-mono text-xs">
                    REAL-TIME MONITORING • STARDATE {stardate}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 text-xs">
                  <div className="bg-black/60 border border-lime-400/30 px-3 py-1 rounded">
                    <div className="text-lime-400 font-mono">{missionTime}</div>
                    <div className="text-white/40">UTC</div>
                  </div>
                  <div className={`px-3 py-1 rounded border font-mono ${
                    systemStatus === 'NOMINAL' 
                      ? 'bg-lime-400/20 border-lime-400/50 text-lime-400' 
                      : 'bg-red-400/20 border-red-400/50 text-red-400'
                  }`}>
                    🎯 {systemStatus}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dense Cockpit Layout */}
          <div className="grid grid-cols-12 gap-3 h-[calc(100vh-120px)]">
            
            {/* LEFT PANEL - System Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-3 space-y-3"
            >
              {/* Primary Systems */}
              <div className="backdrop-blur-xl bg-black/90 border border-lime-400/30 rounded p-3 h-[200px]">
                <h3 className="text-lime-400 font-bold text-sm mb-2 tracking-wider">
                  🎛️ PRIMARY SYSTEMS
                </h3>
                
                <div className="space-y-2 text-sm">
                  {/* Power */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/80">PWR</span>
                      <span className="text-lime-400 font-mono">{powerLevel}%</span>
                    </div>
                    <div className="w-full bg-black/60 rounded-full h-1">
                      <motion.div
                        className="bg-gradient-to-r from-lime-400 to-green-500 h-1 rounded-full"
                        animate={{ width: `${powerLevel}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  {/* Communications */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/80">COM</span>
                      <span className="text-blue-400 font-mono">{commsStrength}%</span>
                    </div>
                    <div className="w-full bg-black/60 rounded-full h-1">
                      <motion.div
                        className="bg-gradient-to-r from-blue-400 to-cyan-500 h-1 rounded-full"
                        animate={{ width: `${commsStrength}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  {/* Shields */}
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">SHD</span>
                    <div className={`px-2 py-0.5 rounded text-xs font-mono ${
                      shieldsActive ? 'bg-lime-400/20 text-lime-400' : 'bg-red-400/20 text-red-400'
                    }`}>
                      {shieldsActive ? 'ON' : 'OFF'}
                    </div>
                  </div>

                  {/* Temperature */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/80">TMP</span>
                      <span className="text-orange-400 font-mono">{metrics.temperature}°C</span>
                    </div>
                    <div className="w-full bg-black/60 rounded-full h-1">
                      <motion.div
                        className="bg-gradient-to-r from-orange-400 to-red-500 h-1 rounded-full"
                        animate={{ width: `${(metrics.temperature / 70) * 100}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  {/* Network */}
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">NET</span>
                    <span className="text-cyan-400 font-mono">{metrics.networkLatency}ms</span>
                  </div>

                  {/* Active Users */}
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">USR</span>
                    <span className="text-purple-400 font-mono">{metrics.activeUsers}</span>
                  </div>
                </div>
              </div>

              {/* Operations Data */}
              <div className="backdrop-blur-xl bg-black/90 border border-blue-400/30 rounded p-3 h-[180px]">
                <h3 className="text-blue-400 font-bold text-sm mb-2 tracking-wider">
                  📊 OPERATIONS
                </h3>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-black/40 p-2 rounded">
                    <div className="text-white/60 text-xs">VISITORS</div>
                    <div className="text-blue-400 font-mono font-bold text-sm">{metrics.visitors.toLocaleString()}</div>
                  </div>
                  <div className="bg-black/40 p-2 rounded">
                    <div className="text-white/60 text-xs">VIEWS</div>
                    <div className="text-blue-400 font-mono font-bold text-sm">{metrics.pageViews.toLocaleString()}</div>
                  </div>
                  <div className="bg-black/40 p-2 rounded">
                    <div className="text-white/60 text-xs">LOAD</div>
                    <div className="text-green-400 font-mono font-bold text-sm">{metrics.loadTime}s</div>
                  </div>
                  <div className="bg-black/40 p-2 rounded">
                    <div className="text-white/60 text-xs">UPTIME</div>
                    <div className="text-lime-400 font-mono font-bold text-sm">{metrics.uptime}%</div>
                  </div>
                  <div className="bg-black/40 p-2 rounded">
                    <div className="text-white/60 text-xs">CACHE</div>
                    <div className="text-cyan-400 font-mono font-bold text-sm">{metrics.cacheHitRate}%</div>
                  </div>
                  <div className="bg-black/40 p-2 rounded">
                    <div className="text-white/60 text-xs">DISK</div>
                    <div className="text-yellow-400 font-mono font-bold text-sm">{metrics.diskUsage}%</div>
                  </div>
                </div>
              </div>

              {/* Global Tracking System */}
              <div className="backdrop-blur-xl bg-black/90 border border-cyan-400/30 rounded overflow-hidden flex-1">
                <WorldMap />
              </div>
            </motion.div>

            {/* CENTER PANEL - Main Displays */}
            <div className="col-span-6 space-y-3">
              {/* PRIMARY RADAR DISPLAY */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="backdrop-blur-xl bg-black/90 border border-purple-400/30 rounded p-3 h-[400px]">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-purple-400 font-bold text-lg tracking-wider">
                        📡 THREAT DETECTION RADAR
                      </h3>
                      <div className="text-xs text-purple-300/80 font-mono">
                        SCANNING FOR MALWARE • BUGS • VULNERABILITIES • INTRUSIONS
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-purple-300/80 font-mono">
                        THREATS: {Math.floor(metrics.activeUsers / 3)}
                      </div>
                      <div className="text-xs text-lime-400 font-mono">
                        STATUS: SCANNING
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center h-[calc(100%-4rem)]">
                    <RadarDisplay 
                      activeUsers={metrics.activeUsers}
                      size={360}
                    />
                  </div>
                </div>
              </motion.div>

              {/* PERFORMANCE CHARTS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex-1"
              >
                <div className="backdrop-blur-xl bg-black/90 border border-lime-400/30 rounded overflow-hidden h-full">
                  <PerformanceChart 
                    metrics={metrics}
                    title="PERFORMANCE TELEMETRY"
                    height={320}
                  />
                </div>
              </motion.div>
            </div>

            {/* RIGHT PANEL - Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-3 space-y-3"
            >
              {/* Manual Controls */}
              <div className="backdrop-blur-xl bg-black/90 border border-red-400/30 rounded p-3 h-[240px]">
                <h3 className="text-red-400 font-bold text-sm mb-2 tracking-wider">
                  🎛️ SYSTEM CONTROLS
                </h3>
                
                <div className="space-y-3">
                  {/* Linear Faders */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex justify-center">
                      <LinearFader
                        value={powerLevel}
                        label="PWR"
                        color="lime"
                        icon="⚡"
                        size={{ width: 32, height: 100 }}
                        onChange={(value) => setPowerLevel(value)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <LinearFader
                        value={commsStrength}
                        label="COM"
                        color="blue"
                        icon="📡"
                        size={{ width: 32, height: 100 }}
                        onChange={(value) => setCommsStrength(value)}
                      />
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="space-y-2">
                    <button className="w-full py-1.5 bg-red-500/20 border border-red-500/50 text-red-400 rounded font-mono text-xs hover:bg-red-500/30 transition-all">
                      🔴 EMERGENCY
                    </button>
                    
                    <button 
                      onClick={() => setShieldsActive(!shieldsActive)}
                      className={`w-full py-1.5 rounded font-mono text-xs transition-all ${
                        shieldsActive 
                          ? 'bg-lime-500/20 border border-lime-500/50 text-lime-400 hover:bg-lime-500/30' 
                          : 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/30'
                      }`}
                    >
                      🛡️ {shieldsActive ? 'SHIELDS ON' : 'SHIELDS OFF'}
                    </button>
                    
                    <button className="w-full py-1.5 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded font-mono text-xs hover:bg-blue-500/30 transition-all">
                      🔵 BOOST SYS
                    </button>
                  </div>
                </div>
              </div>

              {/* PERFORMANCE GAUGES GRID */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="backdrop-blur-xl bg-black/90 border border-cyan-400/30 rounded p-3 h-[200px]">
                  <h3 className="text-cyan-400 font-bold text-sm mb-2 tracking-wider">
                    📊 PERFORMANCE METRICS
                  </h3>
                  <div className="grid grid-cols-2 gap-3 h-[calc(100%-2rem)]">
                    <div className="bg-black/40 border border-cyan-400/30 rounded p-2 flex flex-col items-center justify-center">
                      <h4 className="text-cyan-400 font-bold text-xs mb-1 text-center tracking-wider">BANDWIDTH</h4>
                      <CircularGauge 
                        value={metrics.bandwidth}
                        label="NET"
                        color="cyan"
                        icon="🌐"
                        size={70}
                        strokeWidth={3}
                      />
                    </div>

                    <div className="bg-black/40 border border-orange-400/30 rounded p-2 flex flex-col items-center justify-center">
                      <h4 className="text-orange-400 font-bold text-xs mb-1 text-center tracking-wider">MEMORY</h4>
                      <CircularGauge 
                        value={metrics.memory}
                        label="MEM"
                        color="orange"
                        icon="🧠"
                        size={70}
                        strokeWidth={3}
                        dangerThreshold={75}
                        criticalThreshold={90}
                      />
                    </div>

                    <div className="bg-black/40 border border-purple-400/30 rounded p-2 flex flex-col items-center justify-center">
                      <h4 className="text-purple-400 font-bold text-xs mb-1 text-center tracking-wider">CPU</h4>
                      <CircularGauge 
                        value={metrics.cpuUsage}
                        label="CPU"
                        color="purple"
                        icon="⚡"
                        size={70}
                        strokeWidth={3}
                        dangerThreshold={70}
                        criticalThreshold={85}
                      />
                    </div>

                    <div className="bg-black/40 border border-red-400/30 rounded p-2 flex flex-col items-center justify-center">
                      <h4 className="text-red-400 font-bold text-xs mb-1 text-center tracking-wider">TEMP</h4>
                      <CircularGauge 
                        value={metrics.temperature}
                        max={70}
                        label="CORE"
                        color="red"
                        icon="🌡️"
                        unit="°C"
                        size={70}
                        strokeWidth={3}
                        dangerThreshold={55}
                        criticalThreshold={65}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* System Diagnostics */}
              <div className="backdrop-blur-xl bg-black/90 border border-yellow-400/30 rounded p-3 flex-1 overflow-hidden">
                <h3 className="text-yellow-400 font-bold text-sm mb-3 tracking-wider">
                  🔧 DIAGNOSTICS
                </h3>
                
                <div className="space-y-2 text-xs overflow-y-auto h-[calc(100%-2.5rem)]">
                  <div className="flex justify-between">
                    <span className="text-white/60">CPU_FREQ</span>
                    <span className="text-green-400 font-mono">3.2GHz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">RAM_USAGE</span>
                    <span className="text-orange-400 font-mono">{metrics.memory}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">DISK_IO</span>
                    <span className="text-cyan-400 font-mono">127MB/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">NET_THRU</span>
                    <span className="text-blue-400 font-mono">892Mbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">CACHE_HIT</span>
                    <span className="text-lime-400 font-mono">{metrics.cacheHitRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">PROC_CNT</span>
                    <span className="text-purple-400 font-mono">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">CONN_ACT</span>
                    <span className="text-cyan-400 font-mono">{metrics.activeUsers}</span>
                  </div>
                  
                  {/* Status Indicators */}
                  <div className="pt-2 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                        <span className="text-white/60 text-xs">PWR_OK</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-white/60 text-xs">NET_OK</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white/60 text-xs">SYS_OK</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <span className="text-white/60 text-xs">IO_OK</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionControl; 