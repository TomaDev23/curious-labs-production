import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'handle-client-side-routing',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Check if the request is for a client-side route
          if (req.url.startsWith('/dev/') && !req.url.includes('.')) {
            // Serve the index.html for client-side routes
            req.url = '/';
          }
          next();
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@3d': path.resolve(__dirname, './src/3d'),
      // Provide fallbacks for missing Three.js modules
      'three/webgpu': path.resolve(__dirname, 'src/utils/three-webgpu-fallback.js'),
      'three/tsl': path.resolve(__dirname, 'src/utils/three-tsl-fallback.js')
    }
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: [
      'mermaid',
      'cytoscape',
      'cytoscape-fcose',
      'cytoscape-cose-bilkent',
      'dagre',
      'd3'
    ],
    include: [
      'react', 
      'react-dom', 
      'react-dom/client',
      'react/jsx-runtime'
    ]
  },
  server: {
    open: true,
    port: 5173,
    strictPort: true,
    host: true,
    // Handle client-side routing
    proxy: {
      '/background-sandbox': {
        target: 'http://localhost:5173',
        changeOrigin: false,
        rewrite: (path) => '/'
      }
    }
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ✅ SPLIT framer-motion into separate chunk
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          
          // 🚀 SKIP HEAVY LIBRARIES: Don't pre-bundle visualization libraries
          // They should only load via dynamic import()
          if (id.includes('mermaid') || 
              id.includes('cytoscape') || 
              id.includes('dagre') ||
              id.includes('d3') ||
              id.includes('chart.js') ||
              id.includes('plotly')) {
            // Return undefined to let them be handled individually
            return undefined;
          }
          
          // ✅ Math libraries - Only loads when needed
          if (id.includes('katex') || id.includes('mathjs')) {
            return 'vendor-math';
          }
          
          // 🎯 NEW: Split React Router into separate chunk
          if (id.includes('react-router') || id.includes('@remix-run')) {
            return 'vendor-router';
          }
          
          // 🎯 NEW: Split React Helmet into separate chunk  
          if (id.includes('react-helmet')) {
            return 'vendor-helmet';
          }
          
          // 🎯 NEW: Split utility libraries
          if (id.includes('dompurify') || 
              id.includes('tailwind-merge') || 
              id.includes('clsx')) {
            return 'vendor-utils';
          }
          
          // 🎯 PHASE 3: Split React ecosystem into smaller chunks
          if (id.includes('react-dom')) {
            return 'vendor-react-dom';
          }
          
          if (id.includes('react') && !id.includes('react-dom')) {
            return 'vendor-react';
          }
          
          // 🎯 PHASE 3: Split heavy node modules
          if (id.includes('node_modules')) {
            // Heavy animation/motion libraries  
            if (id.includes('gsap') || id.includes('lottie') || id.includes('animate')) {
              return 'vendor-animation';
            }
            
            // Heavy math/computation libraries
            if (id.includes('lodash') || id.includes('underscore') || id.includes('ramda')) {
              return 'vendor-functional';
            }
            
            // Heavy UI libraries
            if (id.includes('styled-components') || id.includes('emotion') || id.includes('@mui')) {
              return 'vendor-styling';
            }
            
            // Core utilities that are always needed
            if (id.includes('prop-types') || 
                id.includes('invariant') || 
                id.includes('warning') ||
                id.includes('scheduler') ||
                id.includes('object-assign')) {
              return 'vendor-core';
            }
            
            // Everything else from node_modules
            return 'vendor-misc';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600, // Slightly higher for vendor chunks
  }
});
