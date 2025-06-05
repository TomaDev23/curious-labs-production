import React from 'react';
import { motion } from 'framer-motion';

// This component would handle Final Purge downloads
// Can be integrated as a route or modal for /tools/final-purge/download

export default function FinalPurgeDownload() {
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

  const stats = {
    reduction: "98.9%",
    files: "261/23,800",
    buildTime: "15.4s",
    status: "TESTED"
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-red-950/20" />
      
      {/* Main Content */}
      <div className="relative z-20 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="text-6xl mb-4">🔥</div>
            <h1 className="font-space text-4xl md:text-5xl font-bold text-white mb-4">
              Final Purge <span className="text-red-400">CLI</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Eliminate codebase bloat like a boss. Ready for immediate deployment.
            </p>
          </motion.div>

          {/* Stats Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/50 border border-red-400/20 rounded-xl p-6 mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-red-400 mb-1">{value}</div>
                  <div className="text-sm text-white/60 uppercase tracking-wider">{key}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Download Options */}
          <div className="grid gap-6 mb-12">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-red-400/10 to-orange-400/10 border border-red-400/20 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-red-400 mr-2">⚡</span>
              Quick Start
            </h2>
            <div className="space-y-4">
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400"># Analyze your codebase</div>
                <div className="text-white">npx final-purge analyze</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400"># See statistics</div>
                <div className="text-white">npx final-purge stats</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400"># Validate clean version</div>
                <div className="text-white">npx final-purge validate clean-build</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
} 