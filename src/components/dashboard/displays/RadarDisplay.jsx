import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from '../../../FramerProvider';

/**
 * 📡 RADAR DISPLAY COMPONENT
 * Advanced spacecraft radar showing visitor activity
 * Features: Scanning beam, pulsing blips, real-time updates
 */
const RadarDisplay = ({ 
  visitors = [],
  activeUsers = 23,
  size = 280,
  className = ""
}) => {
  const [scanAngle, setScanAngle] = useState(0);
  const [radarBlips, setRadarBlips] = useState([]);
  const [isScanning, setIsScanning] = useState(true);
  const intervalRef = useRef();

  // Generate random radar blips
  useEffect(() => {
    const generateBlips = () => {
      const newBlips = Array.from({ length: activeUsers }, (_, i) => ({
        id: i,
        x: Math.random() * (size - 40) + 20,
        y: Math.random() * (size - 40) + 20,
        intensity: Math.random() * 0.8 + 0.2,
        type: Math.random() > 0.7 ? 'priority' : 'normal',
        lastSeen: Date.now() - Math.random() * 30000
      }));
      setRadarBlips(newBlips);
    };

    generateBlips();
    const interval = setInterval(generateBlips, 5000);
    return () => clearInterval(interval);
  }, [activeUsers, size]);

  // Radar scanning animation
  useEffect(() => {
    if (isScanning) {
      intervalRef.current = setInterval(() => {
        setScanAngle(prev => (prev + 2) % 360);
      }, 50);
    }
    return () => clearInterval(intervalRef.current);
  }, [isScanning]);

  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size / 2 - 20;

  // Calculate distance rings
  const rings = [0.25, 0.5, 0.75, 1].map(factor => factor * maxRadius);

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Radar Container */}
      <div 
        className="relative rounded-full border border-lime-400/30 bg-black/60 backdrop-blur-sm overflow-hidden"
        style={{ 
          width: size, 
          height: size,
          boxShadow: '0 0 20px rgba(132, 204, 22, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Grid Lines - Horizontal & Vertical */}
        <svg className="absolute inset-0" width={size} height={size}>
          {/* Center crosshairs */}
          <line
            x1={centerX}
            y1={10}
            x2={centerX}
            y2={size - 10}
            stroke="rgba(132, 204, 22, 0.3)"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
          <line
            x1={10}
            y1={centerY}
            x2={size - 10}
            y2={centerY}
            stroke="rgba(132, 204, 22, 0.3)"
            strokeWidth="1"
            strokeDasharray="2,2"
          />

          {/* Distance rings */}
          {rings.map((radius, index) => (
            <circle
              key={index}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="rgba(132, 204, 22, 0.2)"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          ))}

          {/* Scanning beam */}
          <motion.g
            animate={{ rotate: scanAngle }}
            transition={{ duration: 0, ease: "linear" }}
            style={{ transformOrigin: `${centerX}px ${centerY}px` }}
          >
            <defs>
              <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(132, 204, 22, 0)" />
                <stop offset="70%" stopColor="rgba(132, 204, 22, 0.6)" />
                <stop offset="100%" stopColor="rgba(132, 204, 22, 0.9)" />
              </linearGradient>
            </defs>
            <path
              d={`M ${centerX} ${centerY} L ${centerX + maxRadius} ${centerY} A ${maxRadius} ${maxRadius} 0 0 1 ${centerX + maxRadius * Math.cos(Math.PI / 6)} ${centerY + maxRadius * Math.sin(Math.PI / 6)} Z`}
              fill="url(#scanGradient)"
              opacity="0.7"
            />
          </motion.g>
        </svg>

        {/* Radar Blips */}
        <AnimatePresence>
          {radarBlips.map((blip) => {
            const age = Date.now() - blip.lastSeen;
            const opacity = Math.max(0.2, 1 - age / 30000);
            
            return (
              <motion.div
                key={blip.id}
                className="absolute"
                style={{
                  left: blip.x - 3,
                  top: blip.y - 3,
                  width: 6,
                  height: 6
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [opacity, opacity * 1.5, opacity]
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    blip.type === 'priority' ? 'bg-red-400' : 'bg-lime-400'
                  }`}
                  style={{
                    boxShadow: `0 0 8px ${blip.type === 'priority' ? 'rgba(248, 113, 113, 0.8)' : 'rgba(132, 204, 22, 0.8)'}`,
                    filter: `brightness(${blip.intensity + 0.5})`
                  }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Center Hub */}
        <div 
          className="absolute bg-lime-400 rounded-full"
          style={{
            width: 8,
            height: 8,
            left: centerX - 4,
            top: centerY - 4,
            boxShadow: '0 0 12px rgba(132, 204, 22, 0.8)'
          }}
        />

        {/* Radar Information Overlay */}
        <div className="absolute top-2 left-2 text-xs font-mono text-white/80 space-y-1">
          <div>RANGE: 100km</div>
          <div>SCAN: {Math.round(scanAngle)}°</div>
          <div className="text-red-400">THREATS: {radarBlips.filter(b => b.priority).length}</div>
          <div className="text-yellow-400">ANOMALIES: {radarBlips.filter(b => !b.priority).length}</div>
          <div className={`${isScanning ? 'text-lime-400' : 'text-red-400'}`}>
            STATUS: {isScanning ? 'SCANNING' : 'STANDBY'}
          </div>
        </div>

        {/* External Controls */}
        <div className="absolute bottom-2 right-2 space-y-1">
          <button
            onClick={() => setIsScanning(!isScanning)}
            className={`px-3 py-1 rounded text-xs font-mono border transition-all ${
              isScanning 
                ? 'bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30' 
                : 'bg-lime-500/20 border-lime-500/50 text-lime-400 hover:bg-lime-500/30'
            }`}
          >
            {isScanning ? '⏸️ PAUSE' : '▶️ SCAN'}
          </button>
          <div className="text-xs text-white/60 font-mono">
            ACTIVE: {activeUsers} NODES
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarDisplay; 