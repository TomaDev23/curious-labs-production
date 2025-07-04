import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Performance Optimization Plugin
const performanceOptimizationPlugin = () => {
  return {
    name: 'performance-optimization',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (ctx.bundle) {
          // Add preload for critical chunks
          const criticalChunks = Object.keys(ctx.bundle).filter(key => 
            key.includes('homepage-critical') || 
            key.includes('vendor-react') ||
            key.includes('vendor-router') ||
            key.includes('index-')
          );
          
          let preloadLinks = '';
          criticalChunks.forEach(chunk => {
            if (chunk.endsWith('.js')) {
              preloadLinks += `<link rel="modulepreload" href="/assets/${chunk}" crossorigin>\n    `;
            } else if (chunk.endsWith('.css')) {
              preloadLinks += `<link rel="preload" href="/assets/${chunk}" as="style" crossorigin>\n    `;
            }
          });
          
          // Insert preload links before closing head tag
          return html.replace('</head>', `    ${preloadLinks}</head>`);
        }
        return html;
      }
    }
  };
};

// Critical CSS Plugin - Inline essential homepage styles
const criticalCSSPlugin = () => {
  return {
    name: 'critical-css',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        // Critical CSS for homepage - extracted from cosmic.css and index.css
        const criticalCSS = `
          /* Critical Homepage Styles */
          html { overflow-x: hidden; }
          body { overflow-x: hidden; }
          
          /* Critical Cosmic Gradients */
          .cosmic-gradient-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .cosmic-gradient-radial {
            background: radial-gradient(circle at center, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 50%, rgba(17, 24, 39, 0) 100%);
          }
          
          /* Critical Glow Effects */
          .glow-text {
            text-shadow: 0 0 10px rgba(102, 126, 234, 0.5), 0 0 20px rgba(102, 126, 234, 0.3), 0 0 30px rgba(102, 126, 234, 0.2);
          }
          
          /* Critical Animations */
          @keyframes nebulaFade {
            0% { background-position: 0% 50%; opacity: 0.4; }
            50% { background-position: 100% 50%; opacity: 0.7; }
            100% { background-position: 0% 50%; opacity: 0.4; }
          }
          .nebula-fade {
            background: linear-gradient(135deg, #35204a, #4B2E83 30%, #A3E1B5 50%, #E1BEE7 70%, #6f71d9);
            background-size: 200% 200%;
            animation: nebulaFade 15s ease infinite;
            will-change: background-position, opacity;
          }
          
          /* Critical Layout */
          .cosmic-card {
            position: relative;
            background-color: rgba(31, 41, 55, 0.7);
            backdrop-filter: blur(12px);
            border-radius: 0.75rem;
            border: 1px solid rgb(55, 65, 81);
            overflow: hidden;
          }
        `;
        
        return html.replace(
          '</head>',
          `    <style>${criticalCSS}</style>\n    </head>`
        );
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    criticalCSSPlugin(), // Add critical CSS plugin
    // performanceOptimizationPlugin(), // DISABLED - Causing 404 errors
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
  
  // 🔥 KEEP: SSR Configuration to exclude R3F from server-side
  ssr: {
    external: [
      '@react-three/fiber',
      '@react-three/drei',
      'three',
      'three-globe',
      'three/examples/jsm/controls/OrbitControls'
    ],
    noExternal: []
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
      // 🔧 REMOVED: Don't pre-bundle Three.js to avoid SSR conflicts
    ],
    // 🔧 NEW: Optimize Three.js dependencies
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: []
    }
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
    outDir: 'dist',
    // 🔧 NEW: Enable CSS code splitting
    cssCodeSplit: true,
    // 🔧 NEW: CSS optimization settings
    cssMinify: 'esbuild',
    minify: 'esbuild',
    chunkSizeWarningLimit: 800, // Increase limit for homepage chunks
    rollupOptions: {
      // 🔧 FIXED: Conservative Three.js exclusion - only during actual SSR build
      external: (id, importer, isResolved) => {
        // Only exclude during SSR build, not client build
        if (process.env.VITE_SSR_BUILD) {
          if (id.includes('@react-three/fiber')) return true;
          if (id.includes('@react-three/drei')) return true;
          if (id.includes('three') && !id.includes('src/')) return true;
        }
        return false;
      },
      output: {
        // 🔧 NEW: Aggressive CSS chunking to reduce main bundle
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            // Split CSS by route/component
            if (assetInfo.name.includes('guardian')) return 'css/guardian-[hash][extname]';
            if (assetInfo.name.includes('curious')) return 'css/curious-[hash][extname]';
            if (assetInfo.name.includes('aegis')) return 'css/aegis-[hash][extname]';
            if (assetInfo.name.includes('opspipe')) return 'css/opspipe-[hash][extname]';
            if (assetInfo.name.includes('moonsignal')) return 'css/moonsignal-[hash][extname]';
            if (assetInfo.name.includes('final')) return 'css/final-[hash][extname]';
            if (assetInfo.name.includes('codelab')) return 'css/codelab-[hash][extname]';
            if (assetInfo.name.includes('museum')) return 'css/museum-[hash][extname]';
            return 'css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        manualChunks: (id) => {
          // 🚨 EMERGENCY FIX: Disable Three.js chunking to prevent SSR forwardRef error
          // Let Vite handle Three.js naturally until we can fix SSR properly
          
          // 🔥 VENDOR CHUNKS - Consolidate React ecosystem into single chunk
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }

          // 🚨 DISABLED: Three.js chunking causing SSR forwardRef errors
          // if (id.includes('node_modules/three-globe')) {
          //   return 'vendor-three-globe';
          // }
          // if (id.includes('node_modules/three') && !id.includes('three-globe')) {
          //   return 'vendor-three';
          // }
          // if (id.includes('@react-three/fiber')) {
          //   return 'vendor-three-fiber';
          // }
          // if (id.includes('@react-three/drei')) {
          //   return 'vendor-three-drei';
          // }

          // 🔥 MOBILE-SPECIFIC OPTIMIZATION: Critical mobile chunks
          if (id.includes('src/hooks/useBreakpoint') ||
              id.includes('src/utils/responsive') ||
              id.includes('src/config/responsiveImages')) {
            return 'mobile-core';
          }

          // 🔥 HOMEPAGE CRITICAL PATH - Mobile-optimized
          if (id.includes('src/components/atomic/HeroAtomic') ||
              id.includes('src/components/navigation/MissionControlNavbar')) {
            return 'homepage-critical';
          }

          // 🔥 MOBILE-OPTIMIZED CHUNKS: Separate mobile-heavy components
          if (id.includes('src/components/atomic/ContactTerminalAtomic') ||
              id.includes('src/components/atomic/MissionAtomic') ||
              id.includes('src/components/atomic/ProcessLegacyAtomic') ||
              id.includes('src/components/atomic/ProductScrollAtomic')) {
            return 'mobile-optimized';
          }

          // 🔥 HOMEPAGE SECONDARY - Important homepage components but lazy loaded
          if (id.includes('src/components/atomic/ServicesOrbitalAtomic')) {
            return 'homepage-secondary';
          }

          // 🚨 DISABLED: 3D chunking causing SSR issues
          // if (id.includes('src/3d/components/contact') ||
          //     id.includes('ContactGlobe')) {
          //   return 'contact-globe';
          // }
          
          // if (id.includes('src/3d/components/moon') || 
          //     id.includes('useMoonLighting') ||
          //     id.includes('MissionMoon')) {
          //   return 'mission-moon-system';
          // }
          
          // if (id.includes('src/3d/components/earth') ||
          //     id.includes('HeroEarth') ||
          //     id.includes('EarthMesh')) {
          //   return 'hero-earth-system';
          // }

          // 🔥 PRODUCT PAGES - Keep individual product pages separate
          if (id.includes('src/pages/products/guardian')) return 'guardian-page';
          if (id.includes('src/pages/products/curious')) return 'curious-page';
          if (id.includes('src/pages/products/aegis')) return 'aegis-page';
          if (id.includes('src/pages/products/opspipe')) return 'opspipe-page';
          if (id.includes('src/pages/products/moonsignal')) return 'moonsignal-page';
          if (id.includes('src/pages/FinalPurgePage')) return 'final-page';

          // Let Vite handle everything else naturally (including all Three.js)
          return undefined;
        },
      },
    },
  }
});
