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
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild'
    // Let Vite handle chunking automatically - no manual chunks!
  }
});
