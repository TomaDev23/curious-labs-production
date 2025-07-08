import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from '../FramerProvider';

const orbitData = [
  { icon: "/assets/images/general/Page_Logos/OpsPipe_logo.webp", title: "OpsPipe", path: "/products/opspipe", angle: 0, adjustX: 100, adjustY: 20, theme: "opspipe" },
  { icon: "/assets/images/general/Page_Logos/MoonSignal_logo.webp", title: "MoonSignal", path: "/products/moonsignal", angle: 90, adjustX: 20, adjustY: 100, theme: "moonsignal" },
  { icon: "/assets/images/general/Page_Logos/Guardian_logo.webp", title: "Guardian", path: "/products/guardian", angle: 180, adjustX: -20, adjustY: 0, theme: "guardian" },
  { icon: "/assets/images/general/Page_Logos/Curious_logo.webp", title: "Curious", path: "/products/curious", angle: 270, adjustX: 0, adjustY: 30, theme: "curious" },
];

// Comet paths for more variety
const cometPaths = [
  // Default diagonal path
  { x: [-500, 500], y: [-500, 500] },
  // Left to right
  { x: [-500, 500], y: [-100, 100] },
  // Right to left 
  { x: [500, -500], y: [100, -100] },
  // Top to bottom
  { x: [0, 0], y: [-500, 500] },
  // Bottom to top with arc
  { x: [0, 200, 0], y: [500, 250, -500] },
  // Arc from left to right
  { x: [-500, 0, 500], y: [0, -300, 0] },
  // Curved path bottom right to top left
  { x: [500, 0, -500], y: [500, 0, -500] }
];

// Comet component for dynamic visual elements
const Comet = ({ delay, angle, duration, size = "md", pathIndex }) => {
  const [prefersReducedMotion] = useState(
    typeof window !== "undefined" 
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
      : false
  );
  
  // Skip animation if reduced motion is preferred
  if (prefersReducedMotion) return null;
  
  const sizeClasses = {
    sm: "w-12 h-1",
    md: "w-24 h-1.5",
    lg: "w-36 h-2"
  };
  
  const path = cometPaths[pathIndex];
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ 
        transformOrigin: "center center",
        transform: `rotate(${angle}deg)`,
        left: '52%',
        top: '48%',
        zIndex: 5
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0.2, 1.5, 0.2],
        x: path.x,
        y: path.y
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 10, // Doubled from 5 to 10 to reduce frequency
        ease: "easeInOut"
      }}
    >
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-white/0 via-white/50 to-white/90 rounded-full blur-sm`} />
    </motion.div>
  );
};

// Enhanced product colors for the new cosmic theme
const productColors = {
  "OpsPipe": {
    gradient: "from-cyan-500/20 to-blue-600/10",
    border: "border-cyan-400/20 hover:border-cyan-400/60",
    glow: "hover:shadow-cyan-500/30",
    text: "text-cyan-400",
    ring: "border-cyan-400/40"
  },
  "MoonSignal": {
    gradient: "from-purple-500/20 to-violet-600/10",
    border: "border-purple-400/20 hover:border-purple-400/60",
    glow: "hover:shadow-purple-500/30",
    text: "text-purple-400",
    ring: "border-purple-400/40"
  },
  "Guardian": {
    gradient: "from-red-500/20 to-red-600/10",
    border: "border-red-400/20 hover:border-red-400/60",
    glow: "hover:shadow-red-500/30",
    text: "text-red-400",
    ring: "border-red-400/40"
  },
  "Curious": {
    gradient: "from-pink-500/20 to-rose-600/10",
    border: "border-pink-400/20 hover:border-pink-400/60",
    glow: "hover:shadow-pink-500/30",
    text: "text-pink-400",
    ring: "border-pink-400/40"
  }
};

export default function SolarSystemLayout({ products, onProductHover, activeProduct }) {
  const radius = 220;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Generate random comet configurations that will remain stable between renders
  const comets = useMemo(() => [
    { delay: 2, angle: 45, duration: 4, size: "md", pathIndex: 0 },
    { delay: 20, angle: 135, duration: 5, size: "lg", pathIndex: 5 },
    { delay: 45, angle: 225, duration: 3.5, size: "sm", pathIndex: 3 },
    { delay: 70, angle: 315, duration: 6, size: "md", pathIndex: 6 }
  ], []);

  return (
    <div className="relative w-full h-[700px] sm:h-[700px] overflow-visible">
      {/* Enhanced Cosmic Background */}
      <div className="absolute inset-0 w-full h-[350%]" style={{ zIndex: 0 }}>
        {/* Primary cosmic nebula with golden amber core */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-[150%] opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 40%, transparent 70%)',
          }}
          animate={{ 
            scale: prefersReducedMotion ? 1 : [1, 1.05, 1],
            opacity: prefersReducedMotion ? 0.2 : [0.15, 0.25, 0.15],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
        />
        
        {/* Secondary nebula with purple-violet hues */}
        <motion.div 
          className="absolute top-[30%] left-0 w-full h-[200%] opacity-15" 
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246, 0.12) 0%, rgba(124, 58, 237, 0.06) 50%, transparent 75%)',
          }}
          animate={{ 
            scale: prefersReducedMotion ? 1 : [1, 1.1, 1],
            opacity: prefersReducedMotion ? 0.15 : [0.1, 0.2, 0.1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut",
            delay: 5 
          }}
        />

        {/* Tertiary nebula with cyan accents */}
        <motion.div 
          className="absolute top-[60%] left-0 w-full h-[200%] opacity-12"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(6, 182, 212, 0.12) 0%, rgba(8, 145, 178, 0.06) 40%, transparent 70%)',
          }}
          animate={{ 
            scale: prefersReducedMotion ? 1 : [1, 1.08, 1],
            opacity: prefersReducedMotion ? 0.12 : [0.08, 0.15, 0.08],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut",
            delay: 2 
          }}
        />
        
        {/* Warm gradient connection */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[30%]"
          style={{
            background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.01) 0%, rgba(245, 158, 11, 0.05) 85%, rgba(217, 119, 6, 0.08) 100%)',
            zIndex: 2
          }}
        />
      </div>
      
      {/* Desktop layout with orbital positions */}
      <div className="hidden lg:block relative h-full">
        {/* Enhanced star field layers */}
        <motion.div 
          className="absolute inset-0 h-[160%] z-1 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, rgba(251, 191, 36, 0.4), transparent),
              radial-gradient(2px 2px at 40px 70px, rgba(6, 182, 212, 0.3), transparent),
              radial-gradient(1px 1px at 90px 40px, rgba(139, 92, 246, 0.4), transparent),
              radial-gradient(1px 1px at 130px 80px, rgba(236, 72, 153, 0.3), transparent),
              radial-gradient(2px 2px at 160px 30px, rgba(239, 68, 68, 0.3), transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 100px"
          }}
          animate={{ 
            backgroundPosition: prefersReducedMotion ? "0% 0%" : ["0% 0%", "100% 100%"]
          }}
          transition={{ 
            duration: 200, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "linear" 
          }}
        />
        
        {/* Animated orbit rings with enhanced cosmic theme */}
        <motion.div 
          className="absolute left-[52%] top-[48%] w-[30rem] h-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber-400/30 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            rotate: prefersReducedMotion ? 0 : 360
          }}
          transition={{ 
            opacity: { duration: 1 }, 
            rotate: { 
              duration: 60, 
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 0 
            } 
          }}
        />
        
        {/* Inner ring with complementary rotation */}
        <motion.div 
          className="absolute left-[52%] top-[48%] w-[28rem] h-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber-400/20 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            rotate: prefersReducedMotion ? 0 : -360 
          }}
          transition={{ 
            opacity: { duration: 1 }, 
            rotate: { 
              duration: 80, 
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 0 
            } 
          }}
        />

        {/* Enhanced Aegis Glow Ring - Sun-like center */}
        <motion.div
          className="absolute left-[52%] top-[48%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-radial from-amber-400/15 via-yellow-500/10 to-transparent blur-xl z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.5 : [0.4, 0.7, 0.4],
            scale: prefersReducedMotion ? 1 : [0.8, 1.3, 0.8]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />

        {/* Enhanced Aegis Core - Sun representation */}
        <motion.div
          className="absolute left-[52%] top-[48%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 rounded-full shadow-xl flex flex-col items-center justify-center z-40"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            boxShadow: prefersReducedMotion ? 
              "0 0 40px 15px rgba(251, 191, 36, 0.2)" :
              ["0 0 20px 10px rgba(251, 191, 36, 0.3)", "0 0 60px 30px rgba(251, 191, 36, 0.1)", "0 0 20px 10px rgba(251, 191, 36, 0.3)"]
          }}
          transition={{ 
            opacity: { duration: 1 },
            scale: { duration: 1, delay: 0.5 },
            boxShadow: { 
              duration: 4, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/products/aegis" className="w-full h-full flex flex-col items-center justify-center text-center group">
            <div className="w-16 h-16 mb-2 flex items-center justify-center">
              <img 
                src="/assets/images/general/Page_Logos/Aegis_logo.webp" 
                alt="Aegis Logo" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg group-hover:text-amber-100 transition-colors">
              Aegis
            </h3>
            <p className="text-amber-100/80 text-sm font-medium drop-shadow-md group-hover:text-amber-100 transition-colors">
              Core Runtime
            </p>
          </Link>
        </motion.div>

        {/* Enhanced Product Nodes - Orbital planets */}
        {orbitData.map((product, index) => {
          const angle = (product.angle * Math.PI) / 180;
          const x = Math.cos(angle) * radius + product.adjustX;
          const y = Math.sin(angle) * radius + product.adjustY;
          const colors = productColors[product.title];
          
          return (
            <motion.div
              key={product.title}
              className="absolute z-30"
              style={{
                left: `calc(52% + ${x}px)`,
                top: `calc(48% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: prefersReducedMotion ? 0 : [0, -8, 0]
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.2 + index * 0.2 },
                scale: { duration: 0.8, delay: 0.2 + index * 0.2 },
                y: { 
                  duration: 3 + index * 0.5, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: index * 0.5
                }
              }}
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => onProductHover?.(product.title)}
              onHoverEnd={() => onProductHover?.(null)}
            >
              <Link to={product.path} className="group block">
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${colors.gradient} backdrop-blur-sm border-2 ${colors.border} ${colors.glow} hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center`}>
                  <div className="w-12 h-12 mb-2 flex items-center justify-center">
                    <img 
                      src={product.icon} 
                      alt={`${product.title} Logo`} 
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h3 className={`${colors.text} font-semibold text-sm mb-1 drop-shadow-lg group-hover:text-white transition-colors`}>
                    {product.title}
                  </h3>
                  <div className={`w-2 h-2 ${colors.ring.replace('border-', 'bg-').replace('/40', '')} rounded-full animate-pulse`}></div>
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* Enhanced connection lines between products and Aegis */}
        {orbitData.map((product, index) => {
          const angle = (product.angle * Math.PI) / 180;
          const x = Math.cos(angle) * radius + product.adjustX;
          const y = Math.sin(angle) * radius + product.adjustY;
          const colors = productColors[product.title];
          
          return (
            <motion.div
              key={`line-${product.title}`}
              className="absolute z-5 pointer-events-none"
              style={{
                left: '52%',
                top: '48%',
                transform: 'translate(-50%, -50%)',
                width: Math.sqrt(x * x + y * y) + 'px',
                height: '2px',
                transformOrigin: '0 50%',
                rotate: Math.atan2(y, x) + 'rad'
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ 
                opacity: activeProduct === product.title ? 0.6 : 0.2,
                scaleX: 1
              }}
              transition={{ 
                opacity: { duration: 0.3 },
                scaleX: { duration: 1, delay: 0.5 + index * 0.1 }
              }}
            >
              <div className={`w-full h-full bg-gradient-to-r from-amber-400/40 ${colors.ring.replace('border-', 'to-').replace('/40', '/60')} rounded-full`}></div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile fallback view with enhanced styling */}
      <motion.div 
        className="lg:hidden space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="mx-auto max-w-sm px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Enhanced Aegis card with improved glow effect */}
          <motion.div 
            className="bg-gradient-to-br from-yellow-600/30 to-orange-700/30 p-6 rounded-xl border border-yellow-500/30 flex flex-col items-center justify-center mb-8"
            animate={{ 
              boxShadow: prefersReducedMotion ?
                "0 0 20px 10px rgba(252, 211, 77, 0.1)" :
                ["0 0 0 0 rgba(252, 211, 77, 0.2)", "0 0 40px 25px rgba(252, 211, 77, 0.1)", "0 0 0 0 rgba(252, 211, 77, 0.2)"]
            }}
            transition={{ 
              boxShadow: { 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse" 
              }
            }}
          >
            <motion.div 
              className="w-12 h-12 mx-auto mb-2 flex items-center justify-center" 
              animate={{ 
                opacity: prefersReducedMotion ? 1 : [1, 0.8, 1] 
              }} 
              transition={{ 
                duration: 3, 
                repeat: Infinity 
              }}
            >
              <img 
                src="/assets/images/general/Page_Logos/Aegis_logo.webp" 
                alt="Aegis Logo" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            <h3 className="text-lg font-bold text-white tracking-wider uppercase">Aegis</h3>
            <p className="text-sm text-white/70 text-center mt-1 mb-3">Core Runtime Engine</p>
            <Link to="/products/aegis" className="mt-2 text-sm bg-yellow-600/50 text-white px-4 py-1 rounded-full hover:bg-yellow-600/70 transition-all">
              Explore Aegis
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Enhanced product cards with color theming and improved animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
          {orbitData.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link 
                to={product.path} 
                className={`bg-gradient-to-br ${productColors[product.title].gradient} p-5 rounded-xl border border-purple-500/20 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <motion.div 
                  className="text-2xl mb-2"
                  animate={{ 
                    y: prefersReducedMotion ? 0 : [0, -3, 0] 
                  }}
                  transition={{ 
                    duration: 2 + index, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <img src={product.icon} alt={product.title} className="w-16 h-16" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2 tracking-wider uppercase">{product.title}</h3>
                <p className="text-xs text-purple-400 mt-auto">
                  Explore →
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-8 px-4">
          <p>View on larger screens to see our orbital universe!</p>
        </div>
      </motion.div>
      
      {/* Space divider that ensures connection to CTA section */}
      <div className="h-24"></div>
    </div>
  );
} 