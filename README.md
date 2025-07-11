# Curious Labs - Production Website

> **Enterprise-grade web platform showcasing advanced development tools and experiences**

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646cff.svg)
![Status](https://img.shields.io/badge/status-production-green.svg)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/TomaDev23/curious-labs-production.git
cd curious-labs-production

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🏗️ Architecture

**Tech Stack:**
- ⚛️ **React 18.3.1** - Component framework
- ⚡ **Vite 6.3.5** - Build tool and dev server
- 🎨 **Tailwind CSS** - Utility-first styling
- 🧠 **Three.js** - 3D graphics and WebGL
- 🌐 **React Router** - Client-side routing
- 📊 **Performance Monitoring** - Built-in metrics

**Key Features:**
- 🎯 **Advanced 3D Experiences** - WebGL-powered interactive elements
- 🔥 **Performance Optimized** - Lazy loading, code splitting, memory management
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI/UX** - Clean, professional interface
- 🛠️ **Developer Tools Integration** - Showcase of development utilities

---

## 📁 Project Structure

```
curious-labs-production/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Basic UI elements
│   │   ├── 3d/              # Three.js/WebGL components
│   │   └── codelab/         # Development tool components
│   ├── pages/               # Page components
│   ├── utils/               # Utility functions
│   ├── context/             # React contexts
│   ├── data/               # Static data and configurations
│   └── styles/             # Global styles and themes
├── public/                 # Static assets
├── dist/                  # Production build (auto-generated)
└── docs/                  # Documentation
```

---

## 🛠️ Featured Tools

### **TOOL-001: SweepHammer**
Advanced file cleanup and organization utility for development workflows.

### **TOOL-002: Neural Debugger** 
AI-powered debugging assistant with pattern recognition capabilities.

### **TOOL-003: Quantum Profiler**
Performance analysis tool with quantum-inspired optimization algorithms.

### **TOOL-004: Code Synthesizer**
Automated code generation and refactoring assistant.

### **TOOL-005: Mission Deployer**
Streamlined deployment pipeline with automated testing and rollback.

### **TOOL-006: Security Scanner**
Comprehensive security analysis and vulnerability detection.

### **TOOL-007: Final Purge**
Codebase optimization tool that eliminates 98.9% of bloat while maintaining functionality.

---

## ⚡ Performance

**Build Metrics:**
- 📦 **Bundle Size**: Optimized with code splitting
- ⚡ **Load Time**: < 2s initial page load
- 🎯 **Lighthouse Score**: 95+ across all metrics
- 🧠 **Memory Usage**: Monitored and optimized
- 🔄 **WebGL Contexts**: Managed and cleaned up

**Optimization Features:**
- Lazy loading of components and routes
- Dynamic imports for large modules
- WebGL context management and cleanup
- Memory leak detection and prevention
- Performance monitoring dashboard

---

## 🎨 Design System

**Color Palette:**
- Primary: `#84cc16` (Lime Green)
- Secondary: `#fbbf24` (Amber)
- Accent: `#ef4444` (Red)
- Success: `#10b981` (Emerald)
- Background: `#000000` (Black)

**Typography:**
- Headings: Inter, system-ui
- Body: Inter, sans-serif
- Code: 'Fira Code', monospace

---

## 🔧 Development

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### **Environment Variables**

```bash
# Create .env.local file
VITE_API_URL=your_api_url
VITE_ANALYTICS_ID=your_analytics_id
```

### **Development Guidelines**

- **Components**: Use functional components with hooks
- **Styling**: Tailwind CSS classes, avoid inline styles
- **Performance**: Lazy load heavy components
- **Memory**: Clean up useEffect hooks and event listeners
- **3D Graphics**: Use unified WebGL provider for context management

---

## 🔐 Security

**Security Headers Implemented:**
- **HSTS**: Strict-Transport-Security with 2-year max-age and subdomain inclusion
- **Frame Protection**: X-Frame-Options set to DENY
- **Content Type**: X-Content-Type-Options set to nosniff
- **Referrer Policy**: Strict-origin-when-cross-origin
- **Permissions Policy**: Camera, microphone, and geolocation disabled
- **CSP**: Content Security Policy with Three.js and Framer Motion compatibility

**Email Protection:**
- Email addresses obfuscated using bracket notation
- Anti-bot honeypot field in contact forms
- Domain consistency enforced (`curiouslabs.space`)

**Validation Tools:**
```bash
# Test security headers
curl -I https://curiouslabs.space | grep -E "(Strict-Transport|X-Frame|X-Content|Referrer|Permissions|Content-Security)"

# Online validation
# - https://securityheaders.com
# - https://observatory.mozilla.org
```

---

## 🚀 Deployment

**Production Deployment:**
```bash
# Build optimized version
npm run build

# Deploy to Vercel (recommended)
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --dir=dist
```

**Environment Configuration:**
- Production builds are optimized and minified
- Debug logging is disabled in production
- Performance monitoring is enabled
- WebGL contexts are managed for optimal memory usage

---

## 🧹 Code Quality

**Memory Management:**
- DOM purification system active
- WebGL context cleanup
- Event listener tracking and removal
- Performance metrics collection

**Bundle Optimization:**
- Code splitting implemented
- Dynamic imports for large components
- Tree shaking enabled
- Asset optimization

---

## 📊 Monitoring

**Built-in Monitoring:**
- Performance metrics collection
- Memory usage tracking
- WebGL context monitoring
- Error boundary protection
- Debug information in development

**Access Development Tools:**
```javascript
// In browser console (development only)
window.purifier.getReport()  // Memory and cleanup report
window.thoughtTrails         // 3D system access
```

---

## 🤝 Contributing

This is a production repository. For development and experiments, please use the development repository.

**Code Standards:**
- ES6+ JavaScript/TypeScript
- Functional components with hooks
- Tailwind CSS for styling
- Performance-first development
- Clean code principles

---

## 📄 License

**Proprietary** - Curious Labs Production Website

---

## 🔗 Links

- **Live Site**: [Coming Soon]
- **Development Repo**: [Previous repository - archived]
- **Documentation**: `/docs` directory
- **Issues**: Use GitHub Issues for bug reports

---

**Built with ❤️ by Curious Labs Team** 