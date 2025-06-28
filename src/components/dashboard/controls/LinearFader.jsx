import React, { useState, useEffect } from 'react';
import { motion } from '../../../FramerProvider';

/**
 * 🎚️ LINEAR FADER COMPONENT
 * Advanced spacecraft-style linear slider with LED indicators
 * Features: Interactive control, real-time feedback, glowing effects
 */
const LinearFader = ({
  value = 50,
  min = 0,
  max = 100,
  label = "SYSTEM",
  unit = "%",
  color = "lime",
  orientation = "vertical", // "vertical" or "horizontal"
  size = { width: 40, height: 200 },
  onChange = () => {},
  disabled = false,
  showLeds = true,
  ledCount = 10,
  showValue = true,
  icon = "🎛️",
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Color variants
  const colorMap = {
    lime: { 
      primary: "#84cc16", 
      secondary: "#65a30d", 
      glow: "rgba(132, 204, 22, 0.6)",
      bg: "rgba(132, 204, 22, 0.1)",
      track: "rgba(132, 204, 22, 0.3)"
    },
    blue: { 
      primary: "#3b82f6", 
      secondary: "#1d4ed8", 
      glow: "rgba(59, 130, 246, 0.6)",
      bg: "rgba(59, 130, 246, 0.1)",
      track: "rgba(59, 130, 246, 0.3)"
    },
    purple: { 
      primary: "#a855f7", 
      secondary: "#7c3aed", 
      glow: "rgba(168, 85, 247, 0.6)",
      bg: "rgba(168, 85, 247, 0.1)",
      track: "rgba(168, 85, 247, 0.3)"
    },
    red: { 
      primary: "#ef4444", 
      secondary: "#dc2626", 
      glow: "rgba(239, 68, 68, 0.6)",
      bg: "rgba(239, 68, 68, 0.1)",
      track: "rgba(239, 68, 68, 0.3)"
    },
    orange: { 
      primary: "#f97316", 
      secondary: "#ea580c", 
      glow: "rgba(249, 115, 22, 0.6)",
      bg: "rgba(249, 115, 22, 0.1)",
      track: "rgba(249, 115, 22, 0.3)"
    }
  };

  const colors = colorMap[color] || colorMap.lime;
  const percentage = ((localValue - min) / (max - min)) * 100;

  const handleMouseDown = (e) => {
    if (disabled) return;
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging && e.type === 'mousemove') return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    let newPercentage;
    
    if (orientation === "vertical") {
      newPercentage = ((rect.bottom - e.clientY) / rect.height) * 100;
    } else {
      newPercentage = ((e.clientX - rect.left) / rect.width) * 100;
    }
    
    newPercentage = Math.max(0, Math.min(100, newPercentage));
    const newValue = min + (newPercentage / 100) * (max - min);
    
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  // LED indicators
  const leds = Array.from({ length: ledCount }, (_, i) => {
    const ledThreshold = ((i + 1) / ledCount) * 100;
    const isActive = percentage >= ledThreshold;
    const isWarning = ledThreshold > 80;
    const isCritical = ledThreshold > 95;
    
    return {
      id: i,
      active: isActive,
      color: isCritical ? '#ef4444' : isWarning ? '#eab308' : colors.primary
    };
  });

  const containerStyle = orientation === "vertical" 
    ? { width: size.width, height: size.height }
    : { width: size.height, height: size.width };

  const trackStyle = orientation === "vertical"
    ? { width: 8, height: size.height - 40 }
    : { width: size.height - 40, height: 8 };

  return (
    <div className={`flex ${orientation === "vertical" ? "flex-col" : "flex-row"} items-center space-${orientation === "vertical" ? "y" : "x"}-4 ${className}`}>
      
      {/* Label & Icon */}
      <div className={`flex ${orientation === "vertical" ? "flex-col" : "flex-row"} items-center space-${orientation === "vertical" ? "y" : "x"}-2`}>
        <div className="text-lg" style={{ filter: `drop-shadow(0 0 4px ${colors.glow})` }}>
          {icon}
        </div>
        <div className={`text-xs font-mono font-bold ${orientation === "horizontal" ? "writing-mode-vertical" : ""}`} style={{ color: colors.primary }}>
          {label}
        </div>
      </div>

      {/* Main Fader Container */}
      <div 
        className="relative"
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* LED Indicators */}
        {showLeds && (
          <div className={`absolute ${orientation === "vertical" ? "left-0 top-0 flex flex-col-reverse space-y-reverse space-y-1" : "top-0 left-0 flex flex-row space-x-1"} z-10`}>
            {leds.map((led) => (
              <motion.div
                key={led.id}
                className="w-2 h-2 rounded-full border border-white/20"
                style={{
                  backgroundColor: led.active ? led.color : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: led.active ? `0 0 6px ${led.color}` : 'none'
                }}
                animate={{
                  opacity: led.active ? [0.7, 1, 0.7] : 0.3,
                  scale: led.active && isDragging ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: 1.5,
                  repeat: led.active ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}

        {/* Track */}
        <div 
          className={`absolute ${orientation === "vertical" ? "left-6 top-5" : "top-6 left-5"} bg-black/60 border border-white/20 rounded-full cursor-pointer`}
          style={trackStyle}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          {/* Fill */}
          <motion.div
            className="absolute bottom-0 left-0 rounded-full"
            style={{
              backgroundColor: colors.primary,
              boxShadow: `0 0 8px ${colors.glow}`,
              ...(orientation === "vertical" 
                ? { width: '100%', height: `${percentage}%` }
                : { height: '100%', width: `${percentage}%` })
            }}
            animate={{
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Thumb */}
          <motion.div
            className="absolute w-4 h-4 bg-white border-2 rounded-full cursor-grab active:cursor-grabbing"
            style={{
              borderColor: colors.primary,
              boxShadow: `0 0 12px ${colors.glow}`,
              ...(orientation === "vertical"
                ? { 
                    left: -4, 
                    bottom: `calc(${percentage}% - 8px)`,
                    transform: isDragging ? 'scale(1.2)' : 'scale(1)'
                  }
                : { 
                    top: -4, 
                    left: `calc(${percentage}% - 8px)`,
                    transform: isDragging ? 'scale(1.2)' : 'scale(1)'
                  })
            }}
            animate={{
              scale: isDragging ? 1.2 : isHovered ? 1.1 : 1,
              boxShadow: isDragging 
                ? `0 0 20px ${colors.glow}` 
                : `0 0 12px ${colors.glow}`
            }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Value Display */}
        {showValue && (
          <motion.div
            className={`absolute ${orientation === "vertical" ? "right-0 top-1/2 transform -translate-y-1/2" : "bottom-0 left-1/2 transform -translate-x-1/2"} text-xs font-mono font-bold px-2 py-1 rounded border backdrop-blur-sm`}
            style={{
              color: colors.primary,
              borderColor: colors.track,
              backgroundColor: colors.bg,
              filter: `drop-shadow(0 0 4px ${colors.glow})`
            }}
            animate={{
              scale: isDragging ? 1.1 : 1,
              opacity: isHovered || isDragging ? 1 : 0.8
            }}
          >
            {Math.round(localValue)}{unit}
          </motion.div>
        )}

        {/* Status Indicator */}
        <div className={`absolute ${orientation === "vertical" ? "right-0 bottom-0" : "right-0 top-0"} flex items-center space-x-1`}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: colors.primary }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-xs font-mono text-white/60">
            {disabled ? "LOCKED" : isDragging ? "ADJUST" : "READY"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LinearFader; 