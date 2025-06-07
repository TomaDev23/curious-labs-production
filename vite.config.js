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
      'three', 
      'three-globe',
      'mermaid',
      'cytoscape',
      'cytoscape-fcose',
      'cytoscape-cose-bilkent'
    ],
    include: [
      'react', 
      'react-dom', 
      'react-dom/client',
      'react/jsx-runtime',
      'three', 
      'three-globe'
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
          
          // 🎯 COMPLETELY EXCLUDE MERMAID + CYTOSCAPE from any bundling
          // These should ONLY load via explicit dynamic imports
          if (id.includes('mermaid') || id.includes('cytoscape')) {
            return undefined;
          }
          
          // ✅ Math libraries - Only loads when needed
          if (id.includes('katex') || id.includes('mathjs')) {
            return 'vendor-math';
          }
          
          // ✅ SKIP React AND React-dependent libraries - keep all in main bundle
          if (id.includes('react') || 
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('react-helmet') ||
              id.includes('react-hot-toast') ||
              id.includes('react-parallax') ||
              id.includes('react-intersection-observer') ||
              id.includes('react-icons') ||
              id.includes('@react-hook') ||
              id.includes('use-deep-compare-effect') ||
              id.includes('react-use') ||
              id.includes('scheduler')) { // ✅ REMOVED: Framer Motion moved to separate chunk
            // Return undefined to keep in main bundle
            return undefined;
          }
          
          // ✅ CRITICAL FIX: Only put "safe" node_modules in vendor-bundle
          // Exclude ALL graph/visualization libraries to prevent contamination
          if (id.includes('node_modules') && 
              !id.includes('mermaid') && 
              !id.includes('cytoscape') && 
              !id.includes('dagre') &&
              !id.includes('d3') &&
              !id.includes('lodash') && // Can be heavy, better dynamic
              !id.includes('chart') && 
              !id.includes('graph') &&
              !id.includes('plot') &&
              !id.includes('vis')) {
            return 'vendor-bundle';
          }
          
          // ✅ FORCE DYNAMIC: All visualization libraries fall through = truly lazy
          // This includes: mermaid, dagre, d3, lodash, chart libraries
          // They will only load when explicitly imported by OpsPipe/FinalPurge
        },
      },
    },
    chunkSizeWarningLimit: 600, // Slightly higher for vendor chunks
  }
});
