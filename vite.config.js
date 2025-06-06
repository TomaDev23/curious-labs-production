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
    exclude: ['three/webgpu', 'three/tsl'],
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
          // ✅ SLEEP-UNTIL-CALLED: Vendor chunking strategy
          
          // ✅ CRITICAL FIX: Don't chunk React at all - keep in main bundle
          // This ensures ALL React dependencies stay together
          
          // REMOVED: 3D Libraries - Three.js dependencies have been removed
          // if (id.includes('three') || id.includes('@react-three')) {
          //   return 'vendor-three-core';
          // }
          
          // ✅ SURGICAL FIX: Removed mermaid chunking - let it load truly on-demand
          // Heavy Mermaid was being forced into vendor chunk despite dynamic imports
          // if (id.includes('mermaid')) {
          //   return 'vendor-mermaid';
          // }
          
          // ✅ Graph libraries - Only loads on graph routes
          if (id.includes('cytoscape') || id.includes('dagre')) {
            return 'vendor-graph';
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
              id.includes('scheduler') ||
              id.includes('framer-motion')) { // ✅ MOVED: Framer Motion needs React
            // Return undefined to keep in main bundle
            return undefined;
          }
          
          // ✅ CORRECTED APPROACH: Exclude mermaid from vendor-bundle catch-all
          // This allows mermaid to bypass ALL chunking rules for true dynamic loading
          if (id.includes('node_modules') && !id.includes('mermaid')) {
            return 'vendor-bundle';
          }
          
          // Mermaid will fall through here and remain unchunked = truly dynamic!
        },
      },
    },
    chunkSizeWarningLimit: 600, // Slightly higher for vendor chunks
  }
});
