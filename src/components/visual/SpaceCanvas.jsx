// 🛡️ STAR_LOCKED: Do not remove or alter – see STAR_LOCK_V1.md
import { useEffect, useRef, useState } from 'react';
import { observe as sharedObserve, unobserve as sharedUnobserve } from '../../utils/SharedIO';
import { isMobile } from '../../utils/deviceTier'; // P2-2: Mobile detection

export default function SpaceCanvas({ zone }) {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d');
    let frameId;
    let animationActive = true;

    // 🎯 P2-2: Mobile frame throttling setup
    const mobile = isMobile();
    const targetFPS = mobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    if (mobile) {
      console.log('[P2-2] SpaceCanvas: Mobile detected - throttling to 30fps');
    }

    // Create stars with varying properties for more visual interest
    // P2-2: Reduce star count on mobile for better performance
    const starCount = mobile ? 80 : 120; // 33% reduction on mobile
    const specialStarCount = mobile ? 3 : 5; // 40% reduction on mobile
    
    const stars = Array.from({ length: starCount }, () => {
      const size = Math.random();
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5, // Size varies from 0.5 to 2.0
        speed: Math.random() * 0.2 + 0.05, // Varying speeds
        opacity: Math.random() * 0.5 + 0.5, // Varying opacity for depth
        pulse: Math.random() * 0.03 + 0.01, // Pulsing effect speed
        pulseFactor: 0, // Current phase of pulse
        color: size > 0.8 ? 'rgb(210, 210, 255)' : 'white', // Larger stars have slight blue tint
      };
    });

    // Create a few "special" stars (brighter, larger)
    const specialStars = Array.from({ length: specialStarCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 2, // Larger radius
      speed: Math.random() * 0.1 + 0.02, // Slower movement
      opacity: 0.9,
      pulse: Math.random() * 0.05 + 0.03, // Stronger pulsing
      pulseFactor: 0,
      color: 'rgb(220, 220, 255)',
    }));

    // Combine regular and special stars
    const allStars = [...stars, ...specialStars];

    const draw = (timestamp) => {
      if (!animationActive) return;
      
      // P2-2: Mobile frame throttling
      if (mobile && timestamp - lastFrameTime < frameInterval) {
        frameId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = timestamp;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      allStars.forEach((s) => {
        // Update position
        s.y += s.speed;
        if (s.y > canvas.height) s.y = 0;
        
        // Update pulse factor
        s.pulseFactor += s.pulse;
        if (s.pulseFactor > Math.PI * 2) s.pulseFactor = 0;
        
        // Calculate current size based on pulse
        const pulseSize = s.r * (1 + Math.sin(s.pulseFactor) * 0.2);
        
        // Draw star
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow for special stars (skip on mobile for performance)
        if (s.r > 2 && !mobile) {
          const glow = ctx.createRadialGradient(
            s.x, s.y, 0,
            s.x, s.y, s.r * 3
          );
          glow.addColorStop(0, 'rgba(100, 100, 255, 0.3)');
          glow.addColorStop(1, 'rgba(100, 100, 255, 0)');
          
          ctx.globalAlpha = s.opacity * 0.6;
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Reset global alpha
      ctx.globalAlpha = 1;
      
      frameId = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reset star positions on resize
      allStars.forEach(s => {
        s.x = Math.random() * canvas.width;
        s.y = Math.random() * canvas.height;
      });
    };

    // 🚨 CL-1: Use SharedIO instead of individual IntersectionObserver
    const unsubscribe = sharedObserve(
      canvas,
      (entry) => {
        setIsVisible(entry.isIntersecting);
        animationActive = entry.isIntersecting;
        
        if (entry.isIntersecting && !frameId) {
          frameId = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.1 }
    );

    unsubscribeRef.current = unsubscribe;

    // Initialize canvas
    resize();
    window.addEventListener('resize', resize);
    frameId = requestAnimationFrame(draw);

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [zone]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
} 