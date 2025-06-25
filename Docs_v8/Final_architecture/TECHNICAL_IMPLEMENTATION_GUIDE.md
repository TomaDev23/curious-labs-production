# 🔧 Technical Implementation Guide
## CuriousLabs V6 Architecture | Developer Reference

---

## 🎯 PURPOSE

This guide provides technical details for developers working on the CuriousLabs V6 architecture. It covers current implementations, safe modification patterns, and troubleshooting approaches.

---

## 🏗️ CORE ARCHITECTURE PATTERNS

### **1. Lazy Loading Implementation**

#### **Smart Lazy Section Pattern**
```javascript
// Location: src/components/lazy/SmartLazySection.jsx
// Usage: Viewport-based component loading with strategic distances

<SmartLazySection 
  componentName="MissionAtomic"
  loadingStrategy="early"    // early|standard|late
  threshold="200px"          // Distance from viewport
>
  <MissionAtomic />
</SmartLazySection>
```

#### **Route-Level Lazy Loading**
```javascript
// Location: src/App.jsx
// Pattern: All pages lazy-loaded for optimal bundle splitting

const HomePage = lazy(() => import('./pages/HomePage_v7_wrapper.jsx'));
const ProductPage = lazy(() => import('./pages/products/index.jsx'));

// Usage in Routes
<Route path="/" element={
  <Suspense fallback={<SimpleLoader />}>
    <HomePage />
  </Suspense>
} />
```

### **2. SSR Protection Patterns**

#### **CanvasWrapper Pattern** ✅ SAFE
```javascript
// Location: src/3d/engine/CanvasWrapper.jsx
// Purpose: Prevents SSR hydration issues with Three.js

import { CanvasWrapper } from '../3d/engine/CanvasWrapper';

// ✅ CORRECT USAGE
<CanvasWrapper>
  <Canvas>
    <ThreeJSComponent />
  </Canvas>
</CanvasWrapper>

// ❌ AVOID: Direct Canvas in SSR context
<Canvas>
  <ThreeJSComponent />
</Canvas>
```

#### **Client-Side Only Components**
```javascript
// Pattern: Use dynamic imports with SSR check
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

return isClient ? <ThreeJSComponent /> : <Fallback />;
```

### **3. 3D Component Loading Order** 🎯

```javascript
// PRIORITY ORDER - DO NOT CHANGE
// 1. HeroEarth (P1 CRITICAL - Immediate)
<Suspense fallback={<HeroLoader />}>
  <HeroAtomic />  // Contains HeroEarth
</Suspense>

// 2. MissionMoon (P2 CONTROLLED - Smart Lazy)
<SmartLazySection componentName="MissionAtomic">
  <MissionAtomic />  // Contains MissionMoon
</SmartLazySection>

// 3. ContactGlobe (P3 DEFERRED - Late Lazy)
<SmartLazySection componentName="ContactTerminalAtomic">
  <ContactTerminalAtomic />  // Contains ContactGlobe
</SmartLazySection>
```

---

## ⚙️ BUILD CONFIGURATION

### **Vite Config Structure**
```javascript
// Location: vite.config.js
// Current State: Natural chunking (manual Three.js chunking DISABLED)

export default defineConfig({
  // ✅ WORKING: SSR exclusions
  ssr: {
    external: [
      '@react-three/fiber',
      '@react-three/drei',
      'three',
      'three-globe'
    ]
  },

  // ✅ WORKING: Natural chunking
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // ✅ ACTIVE: React ecosystem chunking
          if (id.includes('node_modules/react')) return 'vendor-react';
          
          // 🚨 DISABLED: Three.js chunking (SSR safety)
          // if (id.includes('node_modules/three')) return 'vendor-three';
          
          // ✅ ACTIVE: Route-level chunking
          if (id.includes('src/pages/products/guardian')) return 'guardian-page';
          // ... other route chunks
        }
      }
    }
  }
});
```

### **Safe Chunking Patterns** ✅

```javascript
// ✅ SAFE: Route-level chunking
if (id.includes('src/pages/products/')) return 'product-pages';

// ✅ SAFE: React ecosystem chunking  
if (id.includes('node_modules/react')) return 'vendor-react';

// ✅ SAFE: Large library isolation
if (id.includes('node_modules/mermaid')) return 'vendor-mermaid';

// ⚠️ CAUTION: Three.js chunking (test SSR thoroughly)
// if (id.includes('node_modules/three')) return 'vendor-three';
```

### **Dangerous Chunking Patterns** ❌

```javascript
// ❌ DANGEROUS: Breaking React context
if (id.includes('@react-three/drei')) return 'drei-separate';
if (id.includes('react')) return 'react-separate';

// ❌ DANGEROUS: SSR incompatible separation
if (id.includes('forwardRef')) return 'forward-ref-chunk';

// ❌ DANGEROUS: Circular dependency creation
if (id.includes('three') && id.includes('react')) return 'mixed-chunk';
```

---

## 🧪 TESTING PATTERNS

### **SSR Testing Checklist**
```bash
# 1. Build the application
npm run build

# 2. Preview in production mode
npm run preview

# 3. Check for SSR errors in browser console
# Look for: "Cannot read properties of undefined (reading 'forwardRef')"

# 4. Test all 3D components load correctly
# - Homepage hero Earth
# - Mission section Moon  
# - Contact section Globe

# 5. Verify no white screen errors
```

### **Performance Testing**
```javascript
// Monitor build times
npm run build 2>&1 | findstr "built in"

// Check bundle sizes
npm run build 2>&1 | findstr "kB │ gzip"

// Performance monitoring in development
console.log('📊 Performance metrics:', performance.getEntriesByType('navigation'));
```

---

## 🚨 TROUBLESHOOTING GUIDE

### **Common Issues & Solutions**

#### **1. SSR forwardRef Error**
```
Error: Cannot read properties of undefined (reading 'forwardRef')
File: vendor-three-drei-*.js
```

**Solution:**
```javascript
// Disable Three.js manual chunking in vite.config.js
// Let Vite handle Three.js naturally
manualChunks: (id) => {
  // Comment out Three.js chunking
  // if (id.includes('three')) return 'vendor-three';
  
  // Keep other chunking
  if (id.includes('react')) return 'vendor-react';
}
```

#### **2. Canvas DOM.resolveNode Flood**
```
Warning: DOM.resolveNode flood in development
Multiple Canvas instances detected
```

**Solution:**
```javascript
// Disable UnifiedWebGLProvider temporarily
// In HomePage_v7_wrapper.jsx
export default function HomePage_v7_wrapper() {
  return (
    // TEMPORARILY DISABLED: <UnifiedWebGLProvider>
    <V6AtomicPage />
    // TEMPORARILY DISABLED: </UnifiedWebGLProvider>
  );
}
```

#### **3. Build Time Degradation**
```
Build time > 30 seconds
Large bundle sizes
```

**Solution:**
```javascript
// Check for import chain contamination
// Use route-level lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Implement proper code splitting
<Suspense fallback={<Loader />}>
  <HeavyComponent />
</Suspense>
```

---

## 🔧 SAFE MODIFICATION PATTERNS

### **Adding New 3D Components**

#### **Step 1: Create with SSR Protection**
```javascript
// new-3d-component/New3DComponent.jsx
import { CanvasWrapper } from '../engine/CanvasWrapper';

export default function New3DComponent() {
  return (
    <CanvasWrapper>
      <Canvas>
        {/* Your 3D content */}
      </Canvas>
    </CanvasWrapper>
  );
}
```

#### **Step 2: Implement Lazy Loading**
```javascript
// In parent component
const New3DComponent = lazy(() => import('./New3DComponent'));

<SmartLazySection componentName="New3DComponent">
  <New3DComponent />
</SmartLazySection>
```

#### **Step 3: Test SSR Compatibility**
```bash
npm run build
npm run preview
# Check browser console for errors
```

### **Modifying Build Configuration**

#### **Safe Changes** ✅
```javascript
// Add new route-level chunks
if (id.includes('src/pages/new-page')) return 'new-page';

// Add new vendor chunks for large libraries
if (id.includes('node_modules/new-library')) return 'vendor-new-library';

// Modify CSS optimization
cssCodeSplit: true,
cssMinify: 'esbuild',
```

#### **Changes Requiring Testing** ⚠️
```javascript
// Any Three.js related chunking
if (id.includes('three')) return 'vendor-three'; // TEST SSR

// React ecosystem changes  
if (id.includes('@react-three')) return 'r3f'; // TEST SSR

// SSR external modifications
ssr: {
  external: [..., 'new-library'] // TEST THOROUGHLY
}
```

---

## 📊 MONITORING & METRICS

### **Build Metrics to Track**
```javascript
// Build time (target: < 30s)
console.log('Build completed in:', buildTime);

// Bundle sizes (monitor growth)
const bundleSizes = {
  'vendor-react': '~293kB',
  'ContactGlobeWithCanvas': '~386kB', 
  'three-globe': '~484kB',
  'events': '~730kB'
};

// Lighthouse scores (maintain)
const targetScores = {
  performance: 95,
  accessibility: 96,
  bestPractices: 100,
  seo: 100
};
```

### **Runtime Monitoring**
```javascript
// Performance monitoring
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('📊', entry.name, entry.duration);
  }
});
observer.observe({ entryTypes: ['navigation', 'resource'] });

// Memory monitoring for 3D components
const checkMemoryUsage = () => {
  if (performance.memory) {
    console.log('🧠 Memory:', {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576),
      total: Math.round(performance.memory.totalJSHeapSize / 1048576),
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
    });
  }
};
```

---

## 🎯 BEST PRACTICES SUMMARY

### **✅ DO**
- Use CanvasWrapper for all 3D components
- Test SSR after any build config changes
- Implement lazy loading for heavy components
- Monitor build times and bundle sizes
- Use route-level chunking for pages
- Keep React and React-dependent libraries together

### **❌ DON'T**
- Separate React and @react-three/* into different chunks
- Modify SSR externals without thorough testing
- Create multiple Canvas instances without cleanup
- Optimize prematurely without measuring
- Ignore console warnings in production builds
- Skip SSR testing for 3D components

### **⚠️ BE CAREFUL WITH**
- Manual chunking of Three.js dependencies
- Multiple WebGL contexts
- Large component imports in critical path
- SSR external configurations
- Canvas cleanup in development
- Memory leaks in 3D components

---

**REMEMBER**: The current architecture prioritizes stability and functionality over aggressive optimization. When making changes, always test SSR compatibility and maintain the working state as the baseline.

---

*Guide Updated: December 2024*  
*Status: CURRENT*  
*Next Update: After major architectural changes* 