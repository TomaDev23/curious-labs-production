# 🎯 COMPONENT USAGE MAPPING - ATOMIC CLEANUP OPERATION
**Status**: ACTIVE MAPPING  
**Mission**: Identify USED vs UNUSED components for systematic cleanup  
**Critical**: Mark everything before removing anything  

---

## 📊 **MARKING SYSTEM LEGEND**

### ✅ **KEEP CATEGORIES**
- **✅ ATOMIC-CORE** - Core atomic components (NEVER REMOVE)
- **✅ SHARED-PROD** - Shared across multiple production pages
- **✅ PAGE-SPECIFIC** - Used by specific production pages
- **✅ DEV-TOOLS** - Development/special keep pages
- **✅ LEGACY-MUSEUM** - Legacy components for reference

### 🔴 **REVIEW CATEGORIES**  
- **🔴 UNUSED-LEGACY** - Legacy components not in production
- **🔴 DUPLICATE** - Duplicate functionality components
- **🔴 BROKEN** - Broken/incomplete components
- **🔴 TEST-ONLY** - Test/experiment components

---

## 🧬 **ATOMIC COMPONENTS** (src/components/atomic/) ✅ **ALL KEEP**

### **Core Atomic Homepage Components**
| Component | Code | Status | Used In | Bundle Size |
|-----------|------|--------|---------|-------------|
| `BackgroundLayerAtomic.jsx` | BG-ATOMIC-001 | ✅ ATOMIC-CORE | 8+ pages | 12KB |
| `HeroAtomic.jsx` | HERO-ATOMIC-001 | ✅ ATOMIC-CORE | v6_atomic.jsx | 15KB |
| `MissionAtomic.jsx` | MISSION-ATOMIC-001 | ✅ ATOMIC-CORE | v6_atomic.jsx | 31KB |
| `OurProducts_newV6.jsx` | PRODUCTS-ATOMIC-001 | ✅ ATOMIC-CORE | v6_atomic.jsx | 102KB |
| `ServicesOrbitalAtomic.jsx` | SERVICES-ATOMIC-001 | ✅ ATOMIC-CORE | v6_atomic.jsx | 19KB |
| `ProcessLegacyAtomic.jsx` | PROCESS-ATOMIC-001 | ✅ ATOMIC-CORE | v6_atomic.jsx | 16KB |
| `ContactTerminalAtomic.jsx` | CONTACT-ATOMIC-001 | ✅ ATOMIC-CORE | v6_atomic.jsx | 14KB |

### **Supporting Atomic Components**
| Component | Code | Status | Used In | Notes |
|-----------|------|--------|---------|--------|
| `HeroVisualPlanet.jsx` | HERO-PLANET-001 | ✅ ATOMIC-CORE | HeroAtomic.jsx | 3D Planet |
| `ProductScrollAtomic.jsx` | SCROLL-ATOMIC-001 | 🔴 UNUSED-LEGACY | None | Old version |
| `ProcessAtomic.jsx` | PROCESS-V2-001 | 🔴 UNUSED-LEGACY | None | Replaced |
| `SimpleOrbitalRings.jsx` | RINGS-ATOMIC-001 | ✅ ATOMIC-CORE | Various | Visual effect |
| `CosmicBackgroundMini.jsx` | BG-MINI-001 | 🔴 REVIEW | Special pages | Lightweight version |

---

## 🧭 **NAVIGATION COMPONENTS** (src/components/navigation/)

| Component | Code | Status | Used In | Notes |
|-----------|------|--------|---------|--------|
| `MissionControlNavbar.jsx` | NAV-MISSION-001 | ✅ SHARED-PROD | ALL pages | Main nav |

---

## 🏠 **HOME COMPONENTS** (src/components/home/)

### **V6 Atomic Controllers** ✅ **CRITICAL KEEP**
| Component | Code | Status | Used In | Notes |
|-----------|------|--------|---------|--------|
| `v6/SceneControllerV6.jsx` | CTRL-SCENE-001 | ✅ ATOMIC-CORE | v6_atomic.jsx | Main controller |
| `v6/LayoutWrapper.jsx` | CTRL-LAYOUT-001 | ✅ ATOMIC-CORE | v6_atomic.jsx | Layout system |
| `v6/CosmicBackgroundSystemV6.jsx` | CTRL-BG-001 | ✅ ATOMIC-CORE | v6_atomic.jsx | Background system |

### **Legacy Home Components** 🔴 **NEEDS REVIEW**
| Component | Code | Status | Used In | Notes |
|-----------|------|--------|---------|--------|
| `EnhancedSolarSystem.jsx` | HOME-LEGACY-001 | 🔴 UNUSED-LEGACY | index.jsx (legacy) | Old homepage |
| `StarfieldBackground.jsx` | HOME-LEGACY-002 | 🔴 UNUSED-LEGACY | index.jsx (legacy) | Old background |
| `HeroFloatLayer.jsx` | HOME-LEGACY-003 | 🔴 UNUSED-LEGACY | index.jsx (legacy) | Old hero |
| `AboutSection.jsx` | HOME-LEGACY-004 | 🔴 UNUSED-LEGACY | index.jsx (legacy) | Old about |

---

## 🛠️ **SHARED UTILITY COMPONENTS**

### **Production Utilities** ✅ **KEEP**
| Component | Code | Status | Used In | Notes |
|-----------|------|--------|---------|--------|
| `ScrollToTop.jsx` | UTIL-SCROLL-001 | ✅ SHARED-PROD | All product pages | Scroll utility |
| `home/v4/FooterExperience.jsx` | FOOTER-V4-001 | ✅ SHARED-PROD | 6+ pages | Footer |

### **Legacy Utilities** 🔴 **REVIEW NEEDED**
| Component | Code | Status | Used In | Notes |
|-----------|------|--------|---------|--------|
| `Loading.jsx` | UTIL-LOAD-001 | 🔴 REVIEW | Unknown | Generic loader |
| `Metrics.jsx` | UTIL-METRICS-001 | 🔴 REVIEW | Unknown | Analytics |
| `ErrorBoundary.jsx` | UTIL-ERROR-001 | ✅ SHARED-PROD | App level | Error handling |

---

## 🎯 **CODELAB COMPONENTS** (src/components/codelab/)

### **Codelab Atomic Components** ✅ **ALL KEEP**
| Component | Code | Status | Used In | Notes |
|-----------|------|--------|---------|--------|
| `HeroSection.jsx` | CODELAB-HERO-001 | ✅ PAGE-SPECIFIC | codelab.jsx | Codelab hero |
| `FeaturesSection.jsx` | CODELAB-FEAT-001 | ✅ PAGE-SPECIFIC | codelab.jsx | Features |
| `ProcessSection.jsx` | CODELAB-PROC-001 | ✅ PAGE-SPECIFIC | codelab.jsx | Process |
| `CTASection.jsx` | CODELAB-CTA-001 | ✅ PAGE-SPECIFIC | codelab.jsx | Call to action |
| `LegitSection.jsx` | CODELAB-LEGIT-001 | ✅ PAGE-SPECIFIC | codelab.jsx | LEGIT protocol |
| `MetricsLogsSection.jsx` | CODELAB-METRICS-001 | ✅ PAGE-SPECIFIC | codelab.jsx | Metrics |

---

## 🌌 **JOURNEY/CELESTIAL COMPONENTS** (src/components/journey/)

### **Planet Sandbox System** ✅ **SPECIAL KEEP**
| Component | Code | Status | Used In | Notes |
|-----------|------|--------|---------|--------|
| `celestial/CelestialController.jsx` | JOURNEY-CTRL-001 | ✅ DEV-TOOLS | planet-sandbox | Controller |
| `celestial/bodies/MarsSphere.jsx` | PLANET-MARS-001 | ✅ DEV-TOOLS | planet-sandbox | Mars planet |
| `celestial/bodies/JupiterSphere.jsx` | PLANET-JUPITER-001 | ✅ DEV-TOOLS | planet-sandbox | Jupiter planet |
| `celestial/bodies/MoonSphere.jsx` | PLANET-MOON-001 | ✅ ATOMIC-CORE | MissionAtomic.jsx | Moon (used in prod) |
| `celestial/environment/StarField.jsx` | STARFIELD-001 | ✅ DEV-TOOLS | planet-sandbox | Starfield |
| `controllers/CameraController.jsx` | CAM-CTRL-001 | ✅ DEV-TOOLS | planet-sandbox | Camera control |

---

## 📋 **COMPONENT MARKING WORKFLOW**

### **Phase 1: Mark All KEEP Components** ✅ **IN PROGRESS**
1. ✅ Mark atomic components with KEEP headers
2. ✅ Mark shared production components  
3. 🔄 Mark page-specific components
4. 🔄 Mark development tools
5. 🔄 Mark legacy museum pieces

### **Phase 2: Identify UNUSED Components** 🔄 **NEXT**
1. 🔄 Scan all components for usage
2. 🔄 Mark unused legacy components
3. 🔄 Mark duplicate components
4. 🔄 Mark broken/incomplete components

### **Phase 3: Systematic Cleanup** ⏳ **FUTURE**
1. ⏳ Move unused to `/legacy` folder
2. ⏳ Test atomic build integrity
3. ⏳ Remove after verification

---

## 🚨 **CRITICAL RULES**

1. **NEVER REMOVE** anything marked ✅ KEEP
2. **ALWAYS MARK** before moving/removing
3. **TEST ATOMIC BUILD** after any changes
4. **PRESERVE MUSEUM** pieces for reference
5. **DOCUMENT EVERYTHING** in this mapping

---

**⚠️ WARNING: This mapping is the source of truth for component cleanup. Do not remove anything not marked for removal.** 