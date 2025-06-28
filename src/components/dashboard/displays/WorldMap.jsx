import React, { useState, useEffect, useRef } from 'react';
import { motion } from '../../../FramerProvider';

const WorldMap = ({ visitors = [], className = "" }) => {
  const [activeRegions, setActiveRegions] = useState([]);
  const [scanAngle, setScanAngle] = useState(0);
  const intervalRef = useRef();

  // Simulated visitor locations with coordinates
  const visitorLocations = [
    { id: 1, name: "North America", x: 25, y: 35, count: 247, priority: "high" },
    { id: 2, name: "Europe", x: 52, y: 28, count: 189, priority: "medium" },
    { id: 3, name: "Asia Pacific", x: 75, y: 40, count: 312, priority: "high" },
    { id: 4, name: "South America", x: 35, y: 65, count: 89, priority: "low" },
    { id: 5, name: "Africa", x: 55, y: 55, count: 156, priority: "medium" },
    { id: 6, name: "Australia", x: 82, y: 75, count: 67, priority: "low" },
    { id: 7, name: "Russia", x: 65, y: 25, count: 134, priority: "medium" },
    { id: 8, name: "India", x: 70, y: 45, count: 201, priority: "high" },
    { id: 9, name: "Japan", x: 85, y: 38, count: 98, priority: "medium" },
    { id: 10, name: "UK", x: 50, y: 25, count: 176, priority: "high" }
  ];

  // Scanning animation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setScanAngle(prev => (prev + 2) % 360);
      
      // Randomly activate regions
      if (Math.random() > 0.7) {
        const randomRegion = visitorLocations[Math.floor(Math.random() * visitorLocations.length)];
        setActiveRegions(prev => {
          const newActive = [...prev, randomRegion.id];
          return newActive.slice(-3); // Keep only last 3 active
        });
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444'; // red
      case 'medium': return '#f59e0b'; // amber
      case 'low': return '#10b981'; // emerald
      default: return '#06b6d4'; // cyan
    }
  };

  const getThreatLevel = (count) => {
    if (count > 250) return 'CRITICAL';
    if (count > 150) return 'HIGH';
    if (count > 100) return 'MEDIUM';
    return 'LOW';
  };

  return (
    <div className={`relative bg-black/90 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-cyan-400/30">
        <h3 className="text-cyan-400 font-bold text-lg tracking-wider">
          🌍 GLOBAL TRACKING SYSTEM
        </h3>
        <div className="text-xs text-cyan-300/80 font-mono">
          MONITORING SPACECRAFT POSITIONS • REAL-TIME TELEMETRY
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-80 bg-gradient-to-b from-blue-900/20 to-black">
        {/* World Map SVG */}
        <svg 
          viewBox="0 0 100 60" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))' }}
        >
          {/* Simplified world continents */}
          <defs>
            <linearGradient id="continentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0e7490" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* North America */}
          <path
            d="M15,20 Q20,15 30,20 L35,25 Q32,35 28,40 L20,45 Q15,40 12,35 L15,25 Z"
            fill="url(#continentGradient)"
            stroke="#06b6d4"
            strokeWidth="0.2"
          />
          
          {/* South America */}
          <path
            d="M25,45 Q30,50 35,55 L38,70 Q35,75 30,72 L25,68 Q22,60 25,50 Z"
            fill="url(#continentGradient)"
            stroke="#06b6d4"
            strokeWidth="0.2"
          />
          
          {/* Europe */}
          <path
            d="M45,20 Q52,18 58,22 L60,30 Q55,32 50,30 L45,25 Z"
            fill="url(#continentGradient)"
            stroke="#06b6d4"
            strokeWidth="0.2"
          />
          
          {/* Africa */}
          <path
            d="M48,35 Q55,32 62,38 L65,55 Q60,65 55,62 L50,58 Q45,50 48,40 Z"
            fill="url(#continentGradient)"
            stroke="#06b6d4"
            strokeWidth="0.2"
          />
          
          {/* Asia */}
          <path
            d="M62,15 Q75,12 85,18 L88,35 Q85,45 80,42 L70,40 Q65,30 62,20 Z"
            fill="url(#continentGradient)"
            stroke="#06b6d4"
            strokeWidth="0.2"
          />
          
          {/* Australia */}
          <path
            d="M75,65 Q85,63 90,68 L92,75 Q88,78 82,76 L75,72 Z"
            fill="url(#continentGradient)"
            stroke="#06b6d4"
            strokeWidth="0.2"
          />

          {/* Grid Lines */}
          {[...Array(10)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 10}
              y1="0"
              x2={i * 10}
              y2="60"
              stroke="#06b6d4"
              strokeWidth="0.1"
              opacity="0.3"
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 10}
              x2="100"
              y2={i * 10}
              stroke="#06b6d4"
              strokeWidth="0.1"
              opacity="0.3"
            />
          ))}

          {/* Scanning Beam */}
          <motion.line
            x1="50"
            y1="30"
            x2={50 + 40 * Math.cos((scanAngle * Math.PI) / 180)}
            y2={30 + 40 * Math.sin((scanAngle * Math.PI) / 180)}
            stroke="#10b981"
            strokeWidth="0.3"
            opacity="0.6"
            animate={{
              rotate: scanAngle
            }}
            style={{ transformOrigin: '50% 30%' }}
          />

          {/* Visitor Location Dots */}
          {visitorLocations.map((location) => (
            <g key={location.id}>
              {/* Pulsing Ring */}
              <motion.circle
                cx={location.x}
                cy={location.y}
                r="2"
                fill="none"
                stroke={getPriorityColor(location.priority)}
                strokeWidth="0.2"
                animate={{
                  r: [1, 3, 1],
                  opacity: [0.8, 0.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Center Dot */}
              <circle
                cx={location.x}
                cy={location.y}
                r="0.8"
                fill={getPriorityColor(location.priority)}
                className={activeRegions.includes(location.id) ? 'animate-pulse' : ''}
              />
              
              {/* Active Region Highlight */}
              {activeRegions.includes(location.id) && (
                <motion.circle
                  cx={location.x}
                  cy={location.y}
                  r="0"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.3"
                  animate={{
                    r: [0, 4, 0],
                    opacity: [1, 0, 1]
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut"
                  }}
                />
              )}
            </g>
          ))}
        </svg>

        {/* Overlay Information */}
        <div className="absolute top-4 left-4 space-y-2">
          <div className="bg-black/80 rounded p-2 text-xs font-mono">
            <div className="text-cyan-400">SCAN: {Math.round(scanAngle)}°</div>
            <div className="text-lime-400">ACTIVE: {activeRegions.length}</div>
            <div className="text-orange-400">TOTAL: {visitorLocations.reduce((sum, loc) => sum + loc.count, 0)}</div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 space-y-1">
          <div className="bg-black/80 rounded p-2 text-xs font-mono">
            <div className="text-white/60 mb-1">THREAT LEVELS:</div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-red-400">CRITICAL</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="text-amber-400">HIGH</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-emerald-400">LOW</span>
            </div>
          </div>
        </div>

        {/* Location Details on Hover */}
        <div className="absolute top-16 left-4">
          <div className="bg-black/90 rounded p-3 text-xs font-mono border border-cyan-400/30">
            <div className="text-cyan-400 font-bold mb-2">ACTIVE REGIONS:</div>
            {visitorLocations.slice(0, 3).map((location) => (
              <div key={location.id} className="flex justify-between mb-1">
                <span className="text-white/80">{location.name}</span>
                <span 
                  className="font-bold"
                  style={{ color: getPriorityColor(location.priority) }}
                >
                  {location.count} • {getThreatLevel(location.count)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-3 border-t border-cyan-400/30 bg-black/60">
        <div className="flex justify-between items-center text-xs font-mono">
          <div className="flex space-x-4">
            <span className="text-lime-400">● TRACKING ONLINE</span>
            <span className="text-cyan-400">● TELEMETRY ACTIVE</span>
          </div>
          <div className="text-white/60">
            GLOBAL COVERAGE: 94.7% • LAST UPDATE: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap; 