
## 🎯 **FINAL STAY/GO LIST** 

Based on your directives, here's the definitive list:

### ✅ **STAY LIST** (These remain active)

```bash
# CORE PRODUCTION (Navbar routes)
├── / (V6AtomicPage) ✅ MAIN HOMEPAGE
├── /products ✅ + all sub-routes (/aegis, /opspipe, etc.)
├── /codelab ✅
├── /tools ✅ 
├── /blog ✅
├── /about ✅
├── /contact ✅
├── /docs ✅

# SPECIAL KEEPS (Your specific requests)
├── /dev-v4-cosmic ✅ KEEP
├── /safe ✅ KEEP (you'll upgrade with "Houston, we have a problem")
├── /cosmic-rev ✅ KEEP
├── /home-v5 ✅ KEEP
├── /background-sandbox ✅ KEEP
├── /dev/planet-sandbox ✅ KEEP!!!! (bring back when ready)
├── /dev/combined-parallax-test ✅ KEEP for now (handle last)
├── /v6-products ✅ KEEP - static museum
├── /v6-products2 ✅ KEEP - static museum  
├── /museum ✅ KEEP (assuming based on context)
├── /* (404) ✅ KEEP (upgrade with "Houston we have a problem, HQ is on it")
```

### 🗑️ **GO LIST** (Comment out first, then remove)

```bash
# EXPLICITLY MARKED FOR REMOVAL
├── /v6 (V6HomePage) 🗑️ BYE BYE - The main target
├── /our-products 🗑️ BYE - "simple one"
├── /universe 🗑️ BYE  
├── /process-comparison 🗑️ BYE

# ALL OTHER DEV ROUTES (except the keeps above)
├── /dev (main dev index) 🗑️
├── /dev/index 🗑️
├── /dev/parallax-test 🗑️
├── /dev/mouse-parallax-test 🗑️  
├── /dev/stellar-ab-test 🗑️
├── /3d-test 🗑️
├── /3d-test-simple 🗑️
├── /3d-test-debug 🗑️
├── /background-final 🗑️
├── /demo/scroll-test 🗑️
```

---

## 🚀 **ACTION PLAN**

1. **PHASE 1:** Comment out the GO routes in `App.jsx`
2. **PHASE 2:** Test that all STAY routes still build/work
3. **PHASE 3:** Physically move GO files out of project
4. **PHASE 4:** Focus migration efforts on the remaining clean codebase

**Ready to proceed with commenting out the GO routes first?** This will immediately reduce the bundle contamination and let us verify nothing important breaks.
