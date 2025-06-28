import React from 'react';
import { motion } from '../../../FramerProvider';

const CircularGauge = ({ 
  value = 0, 
  max = 100, 
  min = 0,
  size = 120,
  strokeWidth = 8,
  color = 'cyan',
  label = '',
  unit = '%',
  icon = '',
  showValue = true,
  dangerThreshold = 80,
  criticalThreshold = 90,
  className = ''
}) => {
  // Calculate percentage and angle
  const percentage = Math.min(Math.max((value - min) / (max - min) * 100, 0), 100);
  const angle = (percentage / 100) * 270; // 270 degrees for 3/4 circle
  
  // Determine color based on thresholds
  const getColor = () => {
    if (value >= criticalThreshold) return 'red';
    if (value >= dangerThreshold) return 'orange';
    return color;
  };
  
  const currentColor = getColor();
  
  // Color variants
  const colorMap = {
    cyan: {
      primary: '#00d4ff',
      secondary: '#00a3cc',
      glow: 'rgba(0, 212, 255, 0.5)',
      bg: 'rgba(0, 212, 255, 0.1)'
    },
    purple: {
      primary: '#a855f7',
      secondary: '#7c3aed',
      glow: 'rgba(168, 85, 247, 0.5)',
      bg: 'rgba(168, 85, 247, 0.1)'
    },
    orange: {
      primary: '#fb923c',
      secondary: '#ea580c',
      glow: 'rgba(251, 146, 60, 0.5)',
      bg: 'rgba(251, 146, 60, 0.1)'
    },
    lime: {
      primary: '#84cc16',
      secondary: '#65a30d',
      glow: 'rgba(132, 204, 22, 0.5)',
      bg: 'rgba(132, 204, 22, 0.1)'
    },
    red: {
      primary: '#ef4444',
      secondary: '#dc2626',
      glow: 'rgba(239, 68, 68, 0.5)',
      bg: 'rgba(239, 68, 68, 0.1)'
    },
    blue: {
      primary: '#3b82f6',
      secondary: '#2563eb',
      glow: 'rgba(59, 130, 246, 0.5)',
      bg: 'rgba(59, 130, 246, 0.1)'
    }
  };
  
  const colors = colorMap[currentColor] || colorMap.cyan;
  
  // SVG properties
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference * 0.75} ${circumference}`;
  const strokeDashoffset = circumference * 0.75 * (1 - percentage / 100);
  
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Main Gauge */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background glow */}
        <div 
          className="absolute inset-0 rounded-full blur-sm opacity-20"
          style={{ 
            background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
            width: size,
            height: size
          }}
        />
        
        {/* SVG Gauge */}
        <svg width={size} height={size} className="transform -rotate-[135deg]">
          {/* Background arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colors.primary}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference * 0.75 }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 6px ${colors.glow})`
            }}
          />
          
          {/* Center dot */}
          <circle
            cx={center}
            cy={center}
            r={4}
            fill={colors.primary}
            style={{
              filter: `drop-shadow(0 0 4px ${colors.glow})`
            }}
          />
        </svg>
        
        {/* Value display */}
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {icon && (
              <div className="text-lg mb-1" style={{ color: colors.primary }}>
                {icon}
              </div>
            )}
            <div 
              className="font-mono font-bold text-lg leading-none"
              style={{ color: colors.primary }}
            >
              {Math.round(value)}{unit}
            </div>
            {label && (
              <div className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                {label}
              </div>
            )}
          </div>
        )}
        
        {/* Danger indicators */}
        {value >= dangerThreshold && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              boxShadow: '0 0 8px rgba(251, 146, 60, 0.8)'
            }}
          />
        )}
        
        {value >= criticalThreshold && (
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{
              boxShadow: '0 0 12px rgba(239, 68, 68, 1)'
            }}
          />
        )}
      </div>
      
      {/* Status indicator */}
      <div className="mt-2 flex items-center space-x-2">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: colors.primary }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
          {value >= criticalThreshold ? 'CRITICAL' : 
           value >= dangerThreshold ? 'WARNING' : 'NOMINAL'}
        </span>
      </div>
    </div>
  );
};

export default CircularGauge; 