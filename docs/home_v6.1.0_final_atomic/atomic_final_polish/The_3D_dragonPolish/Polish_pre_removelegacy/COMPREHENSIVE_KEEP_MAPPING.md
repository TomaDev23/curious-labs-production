# 🎯 COMPREHENSIVE KEEP MAPPING - ATOMIC CLEANUP OPERATION
**Status**: PRE-REMOVAL RECONNAISSANCE  
**Mission**: Map all KEEP pages + component dependencies before legacy removal  
**Critical**: DO NOT TOUCH ANYTHING MARKED AS KEEP  

---

## 📋 KEEP PAGES MASTER LIST

### 🏠 **CORE PRODUCTION PAGES** (Navbar Routes)
✅ **CRITICAL KEEP - PRODUCTION READY**

#### 1. `/` (ACTUAL HOMEPAGE) → **ROUTES TO** `src/pages/v6_atomic.jsx` ✅ **MAIN ATOMIC BUILD - CRITICAL KEEP**
**V6 Controller System (ATOMIC BUILD - KEEP):**
- `components/home/v6/SceneControllerV6` ✅ ATOMIC CONTROLLER
- `components/home/v6/LayoutWrapper` ✅ ATOMIC CONTROLLER
- `components/home/v6/CosmicBackgroundSystemV6` ✅ ATOMIC CONTROLLER

**Atomic Components (CRITICAL KEEP):**
- `components/atomic/HeroAtomic` (lazy) ✅ ATOMIC
- `components/atomic/ProcessLegacyAtomic` ✅ ATOMIC
- `components/atomic/MissionAtomic` ✅ ATOMIC
- `components/atomic/OurProducts_newV6` ✅ ATOMIC (102KB, needs optimization)
- `components/atomic/ServicesOrbitalAtomic` ✅ ATOMIC
- `components/atomic/ContactTerminalAtomic` ✅ ATOMIC

#### 🔍 **LEGACY REVIEW**: `src/pages/index.jsx` → **MOUNTED AT** `/dev/legacy-index-review` 
**Status**: OLD LEGACY - NOT THE ACTUAL HOMEPAGE - NEEDS EVALUATION
**Components Used:**
- `layouts/HomeFloatflowLayout`
- `components/home/EnhancedSolarSystem`
- `components/home/StarfieldBackground` 
- `components/home/HeroFloatLayer`
- `components/home/AboutSection`
- `components/home/ServicesFloatLayer` (lazy)
- `components/home/ProjectsSection` (lazy)
- `components/home/CTASection` (lazy)
- `components/home/CuriousBot` (lazy)
- `components/home/MissionStatus` (lazy)

#### 2. `/products` → `src/pages/products/index.jsx` ✅ KEEP
**Components Used:**
- `components/navigation/MissionControlNavbar`
- `components/ScrollToTop`
- `components/atomic/BackgroundLayerAtomic` ✅ ATOMIC
- `components/SolarSystemLayout`

**Product Sub-Routes (ALL KEEP):**
- `/products/aegis` → `src/pages/products/aegis.jsx` ✅ KEEP
- `/products/opspipe` → `src/pages/products/opspipe.jsx` ✅ KEEP  
- `/products/moonsignal` → `src/pages/products/moonsignal.jsx` ✅ KEEP
- `/products/curious` → `src/pages/products/curious.jsx` ✅ KEEP
- `/products/guardian` → `src/pages/products/guardian.jsx` ✅ KEEP

**Shared Product Components:**
- `components/navigation/MissionControlNavbar`
- `components/atomic/BackgroundLayerAtomic` ✅ ATOMIC
- `components/ScrollToTop`

#### 4. `/codelab` → `src/pages/codelab.jsx` ✅ KEEP
**Components Used:**
- `components/navigation/MissionControlNavbar`
- `components/home/v4/FooterExperience`
- `components/ScrollToTop`
- `components/CaseStudies`
- `components/Testimonials`
- `components/ServiceModal`
- `layouts/CodelabFloatflowLayout`
- `components/codelab/HeroSection` ✅ CODELAB ATOMIC
- `components/codelab/FeaturesSection` ✅ CODELAB ATOMIC
- `components/codelab/ProcessSection` ✅ CODELAB ATOMIC
- `components/codelab/CTASection` ✅ CODELAB ATOMIC
- `components/codelab/LegitSection` ✅ CODELAB ATOMIC
- `components/codelab/MetricsLogsSection` ✅ CODELAB ATOMIC
- `components/atomic/BackgroundLayerAtomic` ✅ ATOMIC

#### 5. `/tools` → `src/pages/tools.jsx` ✅ KEEP
**Components Used:**
- `components/navigation/MissionControlNavbar`
- `components/home/v4/FooterExperience`
- `components/ScrollToTop`
- `components/atomic/BackgroundLayerAtomic` ✅ ATOMIC

#### 6. `/blog` → `src/pages/blog.jsx` ✅ KEEP
**Components Used:**
- `components/navigation/MissionControlNavbar`
- `components/home/v4/FooterExperience`
- `components/atomic/BackgroundLayerAtomic` ✅ ATOMIC

#### 7. `/about` → `src/pages/about.jsx` ✅ KEEP
**Components Used:**
- `components/navigation/MissionControlNavbar`
- `components/home/v4/FooterExperience`
- `components/atomic/BackgroundLayerAtomic` ✅ ATOMIC

#### 8. `/contact` → `src/pages/contact.jsx` ✅ KEEP
**Components Used:**
- `components/navigation/MissionControlNavbar`
- `components/home/v4/FooterExperience`
- `components/atomic/BackgroundLayerAtomic` ✅ ATOMIC

#### 9. `/docs` → `src/pages/docs.jsx` ✅ KEEP
**Components Used:**
- `components/navigation/MissionControlNavbar`
- `components/home/v4/FooterExperience`

---

### 🛠️ **SPECIAL KEEP PAGES** (Development & Museum)

#### 10. `/dev-v4-cosmic` → `src/pages/dev_v4_cosmic.jsx` ✅ KEEP
**Components Used:**
- `components/navigation/MissionControlNavbar`
- `components/home/v4/HeroPortal`
- `components/ui/SectionHeader`
- `components/ui/SectionAnchor`
- `components/ui/ParticleField`
- `components/ui/CosmicHUD`
- `components/ScrollToTop`

#### 11. `/safe` → `src/pages/safe_v4_cosmic.jsx` ✅ KEEP
**Components Used:** (Minimal - emergency fallback)
- No external component dependencies

#### 12. `/cosmic-rev` → `src/pages/CosmicRevDev.jsx` ✅ KEEP
**Components Used:**
- `components/navigation/MissionControlNavbar`
- `components/atomic/BackgroundLayerAtomic` ✅ ATOMIC

#### 13. `/home-v5` → `src/pages/HomeV5AtomicPage.jsx` ✅ KEEP
**Components Used:**
- `components/layouts/AtomicPageFrame` ✅ ATOMIC LAYOUT
- `components/ui/HUDSystem`
- `components/journey/debug/SceneBoundaryDebug`

#### 14. `/background-sandbox` → `src/pages/background_sandbox.jsx` ✅ KEEP
**Components Used:** (Minimal)
- No external component dependencies

#### 15. `/dev/planet-sandbox` → `src/pages/dev/planet-sandbox.jsx` ✅ KEEP!!!! 
**Components Used:**
- `components/hud/CameraInfoHUD`
- `components/journey/celestial/bodies/MarsSphere`
- `components/journey/celestial/bodies/JupiterSphere`
- `components/journey/celestial/bodies/PlutoSphere`
- `components/journey/celestial/bodies/SaturnSphere`
- `components/journey/celestial/bodies/UranusSphere`
- `components/journey/celestial/bodies/VenusSphere`
- `components/journey/celestial/bodies/MoonSphere`
- `components/hud/PlanetSelectorHUD`
- `components/journey/celestial/environment/StarField`
- `components/controllers/CameraController`

#### 16. `/dev/combined-parallax-test` → `src/pages/dev/combined-parallax-test.jsx` ✅ KEEP
**Components Used:**
- `components/journey/celestial/CelestialController`
- `components/journey/celestial/bodies/Mars`
- `components/journey/celestial/bodies/Moon`
- `components/journey/celestial/bodies/Jupiter`
- `components/journey/celestial/bodies/Saturn`
- `components/journey/celestial/bodies/Venus`
- `components/journey/celestial/bodies/Neptune`
- `components/journey/celestial/bodies/Uranus`

#### 17. `/v6-products` → `src/pages/v6-products.tsx` ✅ KEEP (Static Museum)
**Components Used:** (Minimal - museum piece)

#### 18. `/v6-products2` → `src/pages/v6-products2.tsx` ✅ KEEP (Static Museum)
**Components Used:** (Minimal - museum piece)

#### 19. `/museum` → `src/pages/museum.jsx` ✅ KEEP
**Components Used:**
- `components/navigation/MissionControlNavbar`
- `components/atomic/BackgroundLayerAtomic` ✅ ATOMIC

#### 20. `404` → `src/pages/404.jsx` ✅ KEEP (Houston Emergency)
**Components Used:** (Minimal - emergency fallback)
- No external component dependencies

---

## 🧬 **CRITICAL ATOMIC COMPONENTS** (NEVER REMOVE)

### `src/components/atomic/` Directory ✅ **ATOMIC BUILD CORE**
All components in this directory are part of the new atomic build:
- `BackgroundLayerAtomic.jsx` ✅ **WIDELY USED - CRITICAL**
- `HeroAtomic.jsx` ✅ **ATOMIC HOMEPAGE HERO**
- `ProcessLegacyAtomic.jsx` ✅ **ATOMIC HOMEPAGE**
- `MissionAtomic.jsx` ✅ **ATOMIC HOMEPAGE** (31KB)
- `OurProducts_newV6.jsx` ✅ **ATOMIC HOMEPAGE** (102KB - needs optimization)
- `ServicesOrbitalAtomic.jsx` ✅ **ATOMIC HOMEPAGE** (19KB)
- `ContactTerminalAtomic.jsx` ✅ **ATOMIC HOMEPAGE**
- `HeroVisualPlanet.jsx` ✅ **ATOMIC COMPONENT**
- Other atomic components...

### Core Navigation & Layout ✅ **PRODUCTION CRITICAL**
- `components/navigation/MissionControlNavbar` ✅ **WIDELY USED**
- `components/ScrollToTop` ✅ **WIDELY USED**
- `components/home/v4/FooterExperience` ✅ **WIDELY USED**
- `layouts/HomeFloatflowLayout` ✅ **MAIN HOMEPAGE**
- `layouts/CodelabFloatflowLayout` ✅ **CODELAB PAGE**
- `layouts/AtomicPageFrame` ✅ **ATOMIC LAYOUT**

### V6 Atomic Controllers ✅ **ATOMIC BUILD SYSTEM**
- `components/home/v6/SceneControllerV6` ✅ **ATOMIC BUILD CONTROLLER**
- `components/home/v6/LayoutWrapper` ✅ **ATOMIC BUILD CONTROLLER**
- `components/home/v6/CosmicBackgroundSystemV6` ✅ **ATOMIC BUILD CONTROLLER**

### Codelab Atomic Components ✅ **CODELAB BUILD**
- `components/codelab/HeroSection` ✅ **CODELAB ATOMIC**
- `components/codelab/FeaturesSection` ✅ **CODELAB ATOMIC**
- `components/codelab/ProcessSection` ✅ **CODELAB ATOMIC**
- `components/codelab/CTASection` ✅ **CODELAB ATOMIC**
- `components/codelab/LegitSection` ✅ **CODELAB ATOMIC**
- `components/codelab/MetricsLogsSection` ✅ **CODELAB ATOMIC**

### Journey/Celestial System ✅ **PLANET SANDBOX CRITICAL**
- `components/journey/celestial/CelestialController`
- `components/journey/celestial/bodies/` (All planet components)
- `components/journey/celestial/environment/StarField`
- `components/controllers/CameraController`
- `components/hud/` (All HUD components)

---

## 🚨 **MARKING STRATEGY**

### Phase 1: Mark All Keep Files
1. Add `// ✅ KEEP - ATOMIC BUILD` comments to atomic components
2. Add `// ✅ KEEP - PRODUCTION` comments to production pages
3. Add `// 🔴 DEBUG LAYER ACTIVE` visual indicators

### Phase 2: Identify Legacy Contamination
1. Everything in `src/components/home/v6/` NOT in atomic controller list
2. Old V6 components not used by `/v6_atomic`
3. Duplicate/legacy components in other directories

### Phase 3: Systematic Removal
1. Move legacy components to `/legacy` folder first
2. Test atomic build integrity
3. Permanently remove after verification

---

## 📊 **SUMMARY STATS**

**KEEP PAGES**: 20 total
- Core Production: 9 pages
- Special Keeps: 11 pages

**ATOMIC COMPONENTS**: ~15+ critical components
**V6 CONTROLLERS**: 3 atomic build controllers  
**SHARED COMPONENTS**: ~10 widely used

**NEXT STEPS**: 
1. Mark all keep files with debug comments
2. Add visual red debug layers
3. Map legacy contamination
4. Execute systematic removal

---

**⚠️ WARNING: DO NOT REMOVE ANYTHING MARKED WITH ✅ KEEP** 