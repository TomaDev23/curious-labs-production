/**
 * @file thoughtTrails.js
 * @description Optimized cosmic trail system with mobile responsiveness and performance scaling
 * @version 3.1.0 - "Performance Optimized"
 * @legit true
 */

class ThoughtTrails {
  constructor() {
    this.container = null;
    this.canvas = null;
    this.ctx = null;
    this.trails = [];
    this.isInitialized = false;
    this.isActive = false;
    this.currentAccentColor = '#84cc16';
    this.animationId = null;
    this.lastUpdate = 0;
    this.width = 400;
    this.height = 300;
    
    // Performance and mobile optimization properties
    this.performanceTier = 'high';
    this.isMobile = false;
    this.isTablet = false;
    this.pixelRatio = 1;
    this.maxTrails = 2;
    this.frameRate = 60;
    this.lastFrameTime = 0;
    
    // Resource management
    this.isDestroyed = false;
    this.resizeTimeout = null;
    
    // Bind methods for proper context
    this.handleResize = this.handleResize.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  /**
   * Initialize the ThoughtTrails system with device-aware settings
   */
  init() {
    if (this.isInitialized || this.isDestroyed) return;

    try {
      // Detect device capabilities
      this.detectDeviceCapabilities();
      
      // Adjust settings based on device
      this.adjustPerformanceSettings();
      
      // Create container with optimized settings
      this.createContainer();
      
      // Create canvas with proper scaling
      this.createCanvas();
      
      // Initialize trails based on performance tier
      this.createTrails();
      
      // Setup event listeners
      this.setupEventListeners();
      
      this.isInitialized = true;
      
      // Dispatch ready event
      window.dispatchEvent(new CustomEvent('thoughtTrailsReady'));
      
    } catch (error) {
      console.warn('ThoughtTrails initialization failed:', error);
      this.cleanup();
    }
  }

  /**
   * Detect device capabilities for performance optimization
   */
  detectDeviceCapabilities() {
    if (typeof window === 'undefined') return;
    
    // Screen size detection
    const width = window.innerWidth;
    this.isMobile = width < 768;
    this.isTablet = width >= 768 && width < 1024;
    
    // Pixel ratio for high-DPI displays
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    
    // Performance tier detection
    const memory = navigator.deviceMemory || 4;
    const connection = navigator.connection?.effectiveType || '4g';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      this.performanceTier = 'minimal';
    } else if (this.isMobile || memory <= 2 || connection === 'slow-2g') {
      this.performanceTier = 'low';
    } else if (this.isTablet || memory <= 4 || connection === '3g') {
      this.performanceTier = 'medium';
    } else {
      this.performanceTier = 'high';
    }
  }

  /**
   * Adjust performance settings based on device capabilities
   */
  adjustPerformanceSettings() {
    switch (this.performanceTier) {
      case 'minimal':
        this.maxTrails = 0; // Disable trails for reduced motion
        this.frameRate = 30;
        break;
      case 'low':
        this.maxTrails = 1;
        this.frameRate = 30;
        this.pixelRatio = 1;
        break;
      case 'medium':
        this.maxTrails = this.isMobile ? 1 : 2;
        this.frameRate = this.isMobile ? 30 : 45;
        break;
      case 'high':
        this.maxTrails = this.isMobile ? 1 : 2;
        this.frameRate = 60;
        break;
    }
  }

  /**
   * Create optimized container element
   */
  createContainer() {
    this.container = document.createElement('div');
    this.container.id = 'cosmic-trails-container';
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1000;
      will-change: opacity;
    `;
    
    // Add to body initially (will be moved to proper container on activation)
    document.body.appendChild(this.container);
  }

  /**
   * Create canvas with proper scaling and optimization
   */
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      will-change: transform;
    `;
    
    this.ctx = this.canvas.getContext('2d', {
      alpha: true,
      desynchronized: true, // Better performance for animations
      powerPreference: this.isMobile ? 'low-power' : 'default'
    });
    
    this.container.appendChild(this.canvas);
  }

  /**
   * Create trails with performance-optimized settings
   */
  createTrails() {
    if (this.maxTrails === 0) return; // Skip trail creation for minimal performance
    
    this.trails = Array.from({ length: this.maxTrails }, (_, i) => ({
      points: [],
      dustParticles: [],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: this.isMobile ? 
        Math.random() * 0.2 + 0.1 : // Slower on mobile
        Math.random() * 0.3 + 0.15,
      angle: Math.random() * Math.PI * 2,
      noiseOffset: Math.random() * 1000,
      opacity: 0,
      maxLength: this.isMobile ? 
        Math.random() * 15 + 8 : // Shorter trails on mobile
        Math.random() * 20 + 10,
      delay: Math.random() * 2 + 1,
      time: 0,
    }));
  }

  /**
   * Simple Perlin-like noise for organic motion
   */
  simpleNoise(x) {
    return Math.sin(x) * Math.sin(x * 0.1) * 0.5;
  }

  /**
   * Activate trails with proper positioning
   */
  activate() {
    if (!this.container || this.isActive || this.isDestroyed) return;
    if (this.performanceTier === 'minimal') return; // Skip activation for reduced motion

    this.isActive = true;

    // Use requestAnimationFrame for smooth activation
    requestAnimationFrame(() => {
      this.updatePosition();
      this.container.style.opacity = '1';
      this.startAnimationLoop();
    });
  }

  /**
   * Deactivate trails with cleanup
   */
  deactivate() {
    if (!this.container || !this.isActive) return;

    this.isActive = false;
    this.container.style.opacity = '0';
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    // Clear canvas
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  /**
   * Update position with improved container detection
   */
  updatePosition() {
    if (!this.container || !this.isActive || this.isDestroyed) return;

    // Find the active ThoughtTrails layer
    const trailsLayers = document.querySelectorAll('[data-thought-trails-layer="true"]');
    let visibleLayer = null;
    
    for (const layer of trailsLayers) {
      const rect = layer.getBoundingClientRect();
      const style = window.getComputedStyle(layer);
      
      // Check if layer is visible and has proper dimensions
      if (rect.width > 0 && 
          rect.height > 0 && 
          style.display !== 'none' && 
          style.visibility !== 'hidden' &&
          rect.left >= -window.innerWidth && 
          rect.left < window.innerWidth) {
        visibleLayer = layer;
        break;
      }
    }
    
    if (visibleLayer) {
      const rect = visibleLayer.getBoundingClientRect();
      
      // Update dimensions with pixel ratio consideration
      this.width = Math.floor(rect.width * this.pixelRatio);
      this.height = Math.floor(rect.height * this.pixelRatio);
      
      // Set canvas dimensions
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      
      // Scale context for high-DPI displays
      if (this.pixelRatio !== 1) {
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
      }

      // Position container
      this.container.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 1;
        transition: opacity 0.3s ease;
        z-index: 1000;
        will-change: opacity;
      `;
      
      // Move container to visible layer
      if (this.container.parentNode !== visibleLayer) {
        if (this.container.parentNode) {
          this.container.parentNode.removeChild(this.container);
        }
        visibleLayer.appendChild(this.container);
      }
    } else {
      // Hide if no suitable container found
      this.container.style.opacity = '0';
    }
  }

  /**
   * Optimized animation loop with frame rate control
   */
  startAnimationLoop() {
    if (!this.isActive || this.isDestroyed) return;

    // 🎯 MOBILE THROTTLING: Reduce frame rate on mobile devices
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const mobileFrameRate = isMobile ? Math.min(this.frameRate, 15) : this.frameRate;
    const frameInterval = 1000 / mobileFrameRate;

    const animate = (currentTime) => {
      if (!this.isActive || this.isDestroyed) return;

      // Frame rate throttling
      if (currentTime - this.lastFrameTime < frameInterval) {
        this.animationId = requestAnimationFrame(animate);
        return;
      }
      this.lastFrameTime = currentTime;

      // 🎯 MOBILE SKIP: Skip expensive operations on mobile
      if (isMobile && this.performanceTier === 'low') {
        // Only update every 3rd frame on low-performance mobile
        this.frameSkipCounter = (this.frameSkipCounter || 0) + 1;
        if (this.frameSkipCounter % 3 !== 0) {
          this.animationId = requestAnimationFrame(animate);
          return;
        }
      }

      // Clear canvas with proper scaling
      this.ctx.clearRect(0, 0, this.width / this.pixelRatio, this.height / this.pixelRatio);

      // Update and draw trails
      this.updateTrails();

      this.animationId = requestAnimationFrame(animate);
    };

    this.lastFrameTime = 0;
    this.animationId = requestAnimationFrame(animate);
  }

  /**
   * Update trails with mobile-optimized rendering
   */
  updateTrails() {
    if (!this.trails.length) return;

    this.trails.forEach((trail, index) => {
      trail.time += 0.015;

      // Apply delay before starting animation
      if (trail.time < trail.delay) {
        trail.opacity = 0;
        return;
      }

      // Update opacity for fade-in/fade-out
      const phase = (trail.time - trail.delay) % 5;
      trail.opacity = phase < 2.5 ? phase / 2.5 : 1 - (phase - 2.5) / 2.5;

      // Update position with organic motion
      trail.noiseOffset += 0.03;
      const noise = this.simpleNoise(trail.noiseOffset);
      trail.angle += noise * 0.08;
      const speed = trail.speed * (this.width / this.pixelRatio / 400);

      trail.x += Math.cos(trail.angle) * speed;
      trail.y += Math.sin(trail.angle) * speed;

      // Normalize coordinates
      const normX = (trail.x % 100 + 100) % 100;
      const normY = (trail.y % 100 + 100) % 100;
      const canvasX = (normX / 100) * (this.width / this.pixelRatio);
      const canvasY = (normY / 100) * (this.height / this.pixelRatio);

      // Add point to trail
      trail.points.push({ x: canvasX, y: canvasY, opacity: trail.opacity });
      if (trail.points.length > trail.maxLength) {
        trail.points.shift();
      }

      // Draw trail
      this.drawTrail(trail);
    });
  }

  /**
   * Draw individual trail with performance optimizations
   */
  drawTrail(trail) {
    if (trail.points.length < 2) return;

    // Set up drawing context
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.currentAccentColor;
    this.ctx.lineWidth = this.isMobile ? 0.8 : 1;
    this.ctx.shadowBlur = this.isMobile ? 2 : 3;
    this.ctx.shadowColor = this.currentAccentColor;

    // Draw trail path
    trail.points.forEach((point, i) => {
      if (i === 0) {
        this.ctx.moveTo(point.x, point.y);
      } else {
        const prev = trail.points[i - 1];
        const distance = Math.sqrt(
          Math.pow(point.x - prev.x, 2) + Math.pow(point.y - prev.y, 2)
        );
        
        // Only draw if points are close enough
        if (distance < 50) {
          const opacity = point.opacity * (i / trail.points.length) * 0.8;
          this.ctx.globalAlpha = opacity;
          this.ctx.lineTo(point.x, point.y);
        } else {
          this.ctx.stroke();
          this.ctx.beginPath();
          this.ctx.moveTo(point.x, point.y);
        }
      }
    });
    this.ctx.stroke();

    // Draw comet head with mobile optimization
    if (trail.points.length > 0) {
      const head = trail.points[trail.points.length - 1];
      const headSize = this.isMobile ? 3 : 4;
      const coreSize = this.isMobile ? 1.5 : 2;
      
      // Outer glow
      this.ctx.beginPath();
      this.ctx.arc(head.x, head.y, headSize, 0, Math.PI * 2);
      this.ctx.fillStyle = this.currentAccentColor;
      this.ctx.globalAlpha = trail.opacity * 0.3;
      this.ctx.shadowBlur = this.isMobile ? 6 : 8;
      this.ctx.shadowColor = this.currentAccentColor;
      this.ctx.fill();
      
      // Inner core
      this.ctx.beginPath();
      this.ctx.arc(head.x, head.y, coreSize, 0, Math.PI * 2);
      this.ctx.fillStyle = this.currentAccentColor;
      this.ctx.globalAlpha = trail.opacity;
      this.ctx.shadowBlur = this.isMobile ? 3 : 4;
      this.ctx.shadowColor = this.currentAccentColor;
      this.ctx.fill();
      
      // Sparks (reduced on mobile for performance)
      if (!this.isMobile && Math.random() < 0.4) {
        this.drawSparks(head, trail.opacity);
      }
    }
  }

  /**
   * Draw sparks at comet head
   */
  drawSparks(head, opacity) {
    const sparkCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      const sparkX = head.x + Math.cos(angle) * speed;
      const sparkY = head.y + Math.sin(angle) * speed;
      const sparkSize = Math.random() * 2 + 1;
      const sparkLife = Math.random() * 0.6 + 0.3;
      
      this.ctx.beginPath();
      this.ctx.arc(sparkX, sparkY, sparkSize, 0, Math.PI * 2);
      this.ctx.fillStyle = this.currentAccentColor;
      this.ctx.globalAlpha = opacity * sparkLife;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = this.currentAccentColor;
      this.ctx.fill();
    }
  }

  /**
   * Update accent colors
   */
  updateColors(newAccentColor) {
    if (newAccentColor === this.currentAccentColor) return;
    this.currentAccentColor = newAccentColor;
  }

  /**
   * Handle window resize with debouncing
   */
  handleResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    this.resizeTimeout = setTimeout(() => {
      if (this.isActive && !this.isDestroyed) {
        // Re-detect device capabilities on resize
        this.detectDeviceCapabilities();
        this.adjustPerformanceSettings();
        this.updatePosition();
      }
    }, 150);
  }

  /**
   * Handle visibility change to pause/resume animation
   */
  handleVisibilityChange() {
    if (document.hidden && this.isActive) {
      // Pause animation when tab is hidden
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    } else if (!document.hidden && this.isActive && !this.animationId) {
      // Resume animation when tab becomes visible
      this.startAnimationLoop();
    }
  }

  /**
   * Setup event listeners with proper cleanup
   */
  setupEventListeners() {
    // Color updates
    window.addEventListener('updateAccentColor', (event) => {
      const { color } = event.detail;
      this.updateColors(color);
    });

    // Page change handling
    window.addEventListener('horizontalPageChange', (event) => {
      const { pageIndex } = event.detail || {};
      
      if ((pageIndex === 0 || pageIndex === 1) && !this.isActive) {
        this.activate();
      } else if (pageIndex !== 0 && pageIndex !== 1 && this.isActive) {
        this.deactivate();
      }
      
      if (this.isActive && (pageIndex === 0 || pageIndex === 1)) {
        setTimeout(() => this.updatePosition(), 100);
      }
    });

    // Resize handling
    window.addEventListener('resize', this.handleResize);
    
    // Visibility change handling
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  /**
   * Clean up resources
   */
  cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }

    // Remove event listeners
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  /**
   * Destroy the ThoughtTrails instance
   */
  destroy() {
    this.isDestroyed = true;
    this.isActive = false;
    this.isInitialized = false;
    
    this.cleanup();
    
    // Clear arrays
    this.trails = [];
  }

  /**
   * Force activate for debugging (with safety checks)
   */
  forceActivate() {
    if (this.isDestroyed) {
      console.warn('Cannot activate destroyed ThoughtTrails instance');
      return;
    }
    
    if (!this.isInitialized) {
      this.init();
    }
    
    this.activate();
  }
}

// Create singleton instance
const thoughtTrails = new ThoughtTrails();

// Expose globally for debugging
if (typeof window !== 'undefined') {
  window.thoughtTrails = thoughtTrails;
}

export default thoughtTrails;