import React, { useState, useEffect, useRef } from 'react';
import { motion } from '../../../FramerProvider';

const PerformanceChart = ({ 
  metrics = {}, 
  className = "",
  title = "SYSTEM TELEMETRY",
  height = 200 
}) => {
  const [dataHistory, setDataHistory] = useState({
    cpu: Array(50).fill(0),
    memory: Array(50).fill(0),
    bandwidth: Array(50).fill(0),
    temperature: Array(50).fill(0)
  });
  const [timeLabels, setTimeLabels] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('cpu');
  const canvasRef = useRef(null);

  // Update data history
  useEffect(() => {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString().slice(-8);
    
    setDataHistory(prev => ({
      cpu: [...prev.cpu.slice(1), metrics.cpuUsage || 0],
      memory: [...prev.memory.slice(1), metrics.memory || 0],
      bandwidth: [...prev.bandwidth.slice(1), metrics.bandwidth || 0],
      temperature: [...prev.temperature.slice(1), metrics.temperature || 0]
    }));
    
    setTimeLabels(prev => [...prev.slice(1), timeLabel].slice(-10));
  }, [metrics]);

  // Draw chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Chart settings
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const dataPoints = dataHistory[selectedMetric];
    const maxValue = Math.max(100, Math.max(...dataPoints));
    
    // Grid
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      // Grid labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '10px monospace';
      const value = Math.round(maxValue - (maxValue / 5) * i);
      ctx.fillText(`${value}`, 5, y + 3);
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (chartWidth / 10) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }
    
    // Chart line
    const getColor = (metric) => {
      switch (metric) {
        case 'cpu': return '#a855f7'; // purple
        case 'memory': return '#f59e0b'; // amber
        case 'bandwidth': return '#06b6d4'; // cyan
        case 'temperature': return '#ef4444'; // red
        default: return '#10b981'; // emerald
      }
    };
    
    ctx.strokeStyle = getColor(selectedMetric);
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    dataPoints.forEach((value, index) => {
      const x = padding + (chartWidth / (dataPoints.length - 1)) * index;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Fill area under curve
    ctx.fillStyle = getColor(selectedMetric) + '20';
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Data points
    ctx.fillStyle = getColor(selectedMetric);
    dataPoints.forEach((value, index) => {
      const x = padding + (chartWidth / (dataPoints.length - 1)) * index;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Highlight last point
      if (index === dataPoints.length - 1) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
    
  }, [dataHistory, selectedMetric]);

  const getMetricInfo = (metric) => {
    const current = dataHistory[metric][dataHistory[metric].length - 1];
    const previous = dataHistory[metric][dataHistory[metric].length - 2];
    const trend = current > previous ? '↗️' : current < previous ? '↘️' : '➡️';
    
    const configs = {
      cpu: { label: 'CPU USAGE', unit: '%', icon: '⚡', color: 'text-purple-400' },
      memory: { label: 'MEMORY', unit: '%', icon: '🧠', color: 'text-amber-400' },
      bandwidth: { label: 'BANDWIDTH', unit: '%', icon: '🌐', color: 'text-cyan-400' },
      temperature: { label: 'CORE TEMP', unit: '°C', icon: '🌡️', color: 'text-red-400' }
    };
    
    return { ...configs[metric], current, trend };
  };

  const getCurrentStatus = () => {
    const cpu = dataHistory.cpu[dataHistory.cpu.length - 1];
    const memory = dataHistory.memory[dataHistory.memory.length - 1];
    const temp = dataHistory.temperature[dataHistory.temperature.length - 1];
    
    if (cpu > 80 || memory > 90 || temp > 60) return { status: 'CRITICAL', color: 'text-red-400' };
    if (cpu > 60 || memory > 75 || temp > 50) return { status: 'WARNING', color: 'text-yellow-400' };
    return { status: 'NOMINAL', color: 'text-lime-400' };
  };

  const status = getCurrentStatus();

  return (
    <div className={`relative bg-black/90 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-lime-400/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lime-400 font-bold text-lg tracking-wider">
              📈 {title}
            </h3>
            <div className="text-xs text-lime-300/80 font-mono">
              REAL-TIME PERFORMANCE MONITORING • MISSION CRITICAL
            </div>
          </div>
          <div className={`px-3 py-1 rounded border font-mono text-xs ${
            status.status === 'CRITICAL' ? 'bg-red-500/20 border-red-500/50 text-red-400' :
            status.status === 'WARNING' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400' :
            'bg-lime-500/20 border-lime-500/50 text-lime-400'
          }`}>
            {status.status}
          </div>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="p-3 border-b border-white/10">
        <div className="grid grid-cols-4 gap-2">
          {['cpu', 'memory', 'bandwidth', 'temperature'].map((metric) => {
            const info = getMetricInfo(metric);
            return (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`p-2 rounded text-xs font-mono transition-all ${
                  selectedMetric === metric
                    ? 'bg-lime-400/20 border border-lime-400/50 text-lime-400'
                    : 'bg-black/40 border border-white/20 text-white/60 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <span>{info.icon}</span>
                  <span>{info.trend}</span>
                </div>
                <div className={info.color}>{info.current.toFixed(1)}{info.unit}</div>
                <div className="text-white/40 text-xs">{info.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative" style={{ height: `${height}px` }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={height}
          className="w-full h-full"
        />
        
        {/* Overlay Information */}
        <div className="absolute top-4 left-4">
          <div className="bg-black/80 rounded p-2 text-xs font-mono border border-white/20">
            <div className="text-white/60 mb-1">CURRENT READING:</div>
            <div className={`font-bold ${getMetricInfo(selectedMetric).color}`}>
              {getMetricInfo(selectedMetric).icon} {getMetricInfo(selectedMetric).current.toFixed(1)}{getMetricInfo(selectedMetric).unit}
            </div>
            <div className="text-white/40 mt-1">
              {getMetricInfo(selectedMetric).label}
            </div>
          </div>
        </div>

        {/* Time Range */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-black/80 rounded p-2 text-xs font-mono border border-white/20">
            <div className="text-white/60">TIMESPAN: 50 SAMPLES</div>
            <div className="text-cyan-400">UPDATE: REAL-TIME</div>
          </div>
        </div>

        {/* Critical Threshold Lines */}
        {selectedMetric === 'cpu' && (
          <>
            <div className="absolute border-t border-red-400/50 border-dashed" style={{ 
              top: `${40 + (height - 80) * (1 - 80/100)}px`,
              left: '40px',
              right: '40px'
            }}>
              <span className="absolute -top-3 right-0 text-xs text-red-400 font-mono">80% CRITICAL</span>
            </div>
            <div className="absolute border-t border-yellow-400/50 border-dashed" style={{ 
              top: `${40 + (height - 80) * (1 - 60/100)}px`,
              left: '40px',
              right: '40px'
            }}>
              <span className="absolute -top-3 right-0 text-xs text-yellow-400 font-mono">60% WARNING</span>
            </div>
          </>
        )}

        {selectedMetric === 'memory' && (
          <>
            <div className="absolute border-t border-red-400/50 border-dashed" style={{ 
              top: `${40 + (height - 80) * (1 - 90/100)}px`,
              left: '40px',
              right: '40px'
            }}>
              <span className="absolute -top-3 right-0 text-xs text-red-400 font-mono">90% CRITICAL</span>
            </div>
            <div className="absolute border-t border-yellow-400/50 border-dashed" style={{ 
              top: `${40 + (height - 80) * (1 - 75/100)}px`,
              left: '40px',
              right: '40px'
            }}>
              <span className="absolute -top-3 right-0 text-xs text-yellow-400 font-mono">75% WARNING</span>
            </div>
          </>
        )}

        {selectedMetric === 'temperature' && (
          <>
            <div className="absolute border-t border-red-400/50 border-dashed" style={{ 
              top: `${40 + (height - 80) * (1 - 60/70)}px`,
              left: '40px',
              right: '40px'
            }}>
              <span className="absolute -top-3 right-0 text-xs text-red-400 font-mono">60°C CRITICAL</span>
            </div>
            <div className="absolute border-t border-yellow-400/50 border-dashed" style={{ 
              top: `${40 + (height - 80) * (1 - 50/70)}px`,
              left: '40px',
              right: '40px'
            }}>
              <span className="absolute -top-3 right-0 text-xs text-yellow-400 font-mono">50°C WARNING</span>
            </div>
          </>
        )}
      </div>

      {/* Status Bar */}
      <div className="p-3 border-t border-white/10 bg-black/60">
        <div className="flex justify-between items-center text-xs font-mono">
          <div className="flex space-x-4">
            <span className="text-lime-400">● TELEMETRY ACTIVE</span>
            <span className="text-cyan-400">● DATA LOGGING</span>
          </div>
          <div className="text-white/60">
            SAMPLES: {dataHistory[selectedMetric].length} • LAST: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart; 