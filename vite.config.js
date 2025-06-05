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
    ],
    // Force React to be pre-bundled first
    force: true
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
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV === 'development',
    minify: 'esbuild',
    // Increase chunk size warning limit since we're optimizing manually
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Simplified chunking strategy to avoid React loading issues
        manualChunks(id) {
          // 🚀 REACT ISOLATION - Keep React completely separate and load first
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-bundle';
          }
          
          // 🚀 3D ISOLATION - Keep 3D completely separate
          if (id.includes('three') || id.includes('@react-three/')) {
            return 'three-bundle';
          }
          
          // 🚀 ROUTER ISOLATION - Router needs React first
          if (id.includes('react-router')) {
            return 'router-bundle';
          }
          
          // 🚀 HEAVY VENDOR ISOLATION - Isolate only the heaviest, non-animation vendors
          if (id.includes('node_modules')) {
            // Keep these heavy libraries separate but allow framer-motion in app
            if (id.includes('lottie') || id.includes('gsap') || id.includes('chart.js')) {
              return 'heavy-vendor';
            }
            // Regular vendor code
            return 'vendor-safe';
          }
          
          // 🚀 APP CODE CHUNKING - Restore smart app chunking
          if (id.includes('/src/')) {
            // Split pages for better caching
            if (id.includes('/src/pages/')) {
              if (id.includes('dev/') || id.includes('sandbox')) return 'dev-pages';
              if (id.includes('products/')) return 'product-pages';
              return 'pages';
            }
            
            // Split components by feature
            if (id.includes('/src/components/')) {
              if (id.includes('home/') || id.includes('hero/') || id.includes('Hero')) return 'hero-components';
              if (id.includes('journey/') || id.includes('Journey')) return 'journey-components';
              if (id.includes('cosmic/') || id.includes('atomic/')) return 'cosmic-components';
              return 'components';
            }
            
            // Utils and hooks
            if (id.includes('/src/hooks/') || id.includes('/src/utils/') || id.includes('/src/lib/')) {
              return 'app-utils';
            }
            
            // 3D scenes
            if (id.includes('/src/3d/')) {
              return 'scenes-3d';
            }
            
            // Everything else in main app (including framer-motion usage)
            return 'app';
          }
        }
      }
    }
  }
});
