/**
 * @metadata
 * @component OpsBentoCluster
 * @description Modern, dynamic bento grid for OpsPipe feature visualization
 * @legit true
 * @version 2.0.0
 * @author CuriousLabs
 * @scs SCS5
 * @doc contract_ops_bento_cluster.md
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

// Define bento items
const OPS_BENTO_ITEMS = [
  {
    id: 1,
    type: 'image',
    label: 'Cosmic Canvas',
    src: '/assets/images/planets/4k/Galaxy_1_v6.jpg', // Confirmed asset
    accentColor: '#84cc16',
  },
  {
    id: 2,
    type: 'text',
    title: 'Serverless Parsing',
    description: 'Scale ingestion effortlessly with zero ops overhead.',
    icon: 'serverless',
    accentColor: '#22d3ee',
  },
  {
    id: 3,
    type: 'text',
    title: 'FastAPI Core',
    description: 'Typed stack with Postgres, Redis, and LLM routing.',
    icon: 'api',
    accentColor: '#d946ef',
  },
  {
    id: 4,
    type: 'text',
    title: 'AI Runtime',
    description: 'Autonomous FSM with full audit trails.',
    icon: 'ai',
    accentColor: '#84cc16',
  },
  {
    id: 5,
    type: 'text',
    title: 'Live Dashboard',
    description: 'Real-time data from bot to mobile.',
    icon: 'dashboard',
    accentColor: '#22d3ee',
  },
  {
    id: 6,
    type: 'text',
    title: 'Human Control',
    description: 'OpsPipe confirms, you decide.',
    icon: 'human',
    accentColor: '#d946ef',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

// Reduced motion hook
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { prefersReducedMotion };
};

// FeatureIcon component
const FeatureIcon = ({ name, className = '', accentColor }) => {
  const baseClasses = `w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] ${className}`;

  switch (name) {
    case 'serverless':
      return (
        <svg className={baseClasses} viewBox="0 0 24 24" fill="none">
          <path
            d="M5 8H19M5 Stuart: To ensure compliance with the LGPL, we have included
            the following statement in our documentation:

            This product includes software (C:\website_build\src\components\home\v6\ops\OpsBentoCluster.jsx) developed by CuriousLabs.
            The source code is available under the terms of the GNU Lesser General Public License as published by
            the Free Software Foundation; either version 2.1 of the License, or (at your option) any later version.

            You should have received a copy of the GNU Lesser General Public License along with this program.
            If not, see <http://www.gnu.org/licenses/>.

            For more information, please contact CuriousLabs at [contact information].

        </svg>
      );
    case 'api':
      return (
        <svg className={baseClasses} viewBox="0 0 24 24" fill="none">
          <path
            d="M17 8L12 12L7 8M5 17H19C20.1046 17 21 16.1046 21 15V9C21 7.89543 20.1046 7 19 7H5C3.89543 7 3 7.89543 3 9V15C3 16.1046 3.89543 17 5 17Z"
            stroke={accentColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'ai':
      return (
        <svg className={baseClasses} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4.35418C10.2003 2.78777 7.19383 2 4.2 2C3.63 2 3.06 2.0426 2.5 2.1278V11.0345C3.06 10.9489 3.63 10.9063 4.2 10.9063C7.19383 10.9063 10.2003 11.6938 12 13.2599M12 4.35418C13.7997 2.78777 16.8062 2 19.8 2C20.37 2 20.94 2.0426 21.5 2.1278V11.0345C20.94 10.9489 20.37 10.9063 19.8 10.9063C16.8062 10.9063 13.7997 11.6938 12 13.2599M12 4.35418V22.0001M12 13.2599V22.0001"
            stroke={accentColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'dashboard':
      return (
        <svg className={baseClasses} viewBox="0 0 24 24" fill="none">
          <path
            d="M8 14V17M12 10V17M16 6V17M6 22H18C20.2091 22 22 20.2091 22 18V6C22 3.79086 20.2091 2 18 2H6C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22Z"
            stroke={accentColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'human':
      return (
        <svg className={baseClasses} viewBox="0 0 24 24" fill="none">
          <path
            d="M16 15H8M12 3C16.9706 3 21 7.02944 21 12M12 21C7.02944 21 3 16.9706 3 12M12 21C14.2091 21 16 16.9706 16 12C16 7.02944 14.2091 3 12 3M12 21C9.79086 21 8 16.9706 8 12C8 7.02944 9.79086 3 12 3"
            stroke={accentColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg className={baseClasses} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4V20M18 10H6M18 16H6"
            stroke={accentColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

// BentoItem component
const BentoItem = ({ item, className, interactive = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { prefersReducedMotion } = useReducedMotion();

  if (hasError) {
    return (
      <div className={`rounded-xl bg-slate-900/50 p-4 ${className}`}>
        <p className="text-white/50 text-sm">Content unavailable</p>
      </div>
    );
  }

  const getItemContent = () => {
    if (item.type === 'image') {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <motion.div
            className="relative w-32 h-32 md:w-48 md:h-48"
            animate={{ rotate: isHovered ? 5 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: isHovered
                  ? `0 0 30px ${item.accentColor}80`
                  : `0 0 10px ${item.accentColor}40`,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.img
              src={item.src}
              alt={item.label}
              className="w-full h-full object-cover rounded-full"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              onError={() => setHasError(true)}
            />
            <motion.div
              className="absolute w-[120%] h-[120%] rounded-full border border-white/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
          <motion.p
            className="mt-3 text-white font-medium text-sm"
            animate={{ y: isHovered ? -5 : 0 }}
          >
            {item.label}
          </motion.p>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full justify-between p-4">
        <div>
          <div className="flex items-center mb-2">
            <motion.div
              animate={{
                filter: isHovered
                  ? `drop-shadow(0 0 8px ${item.accentColor}80)`
                  : 'none',
              }}
              transition={{ duration: 0.2 }}
            >
              <FeatureIcon name={item.icon} accentColor={item.accentColor} />
            </motion.div>
            <h3 className="ml-2 text-lg font-semibold text-white">{item.title}</h3>
          </div>
          <p className="text-sm text-white/80">{item.description}</p>
        </div>
        <motion.div
          className="h-1 rounded-full"
          style={{ background: `linear-gradient(to right, ${item.accentColor}, ${item.accentColor}80)` }}
          animate={{ width: isHovered ? '70%' : '30%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    );
  };

  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      scale={1.02}
      transitionSpeed={300}
      disabled={!interactive || prefersReducedMotion}
    >
      <motion.div
        className={`relative rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-950/50 ${interactive ? 'cursor-pointer' : ''} ${className}`}
        variants={itemVariants}
        whileHover={interactive && !prefersReducedMotion ? { y: -5, boxShadow: `0 8px 20px rgba(0,0,0,0.2)` } : {}}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={item.title || item.label}
      >
        {getItemContent()}
      </motion.div>
    </Tilt>
  );
};

// Animated container
const AnimatedRunner = ({ children }) => {
  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-2 rounded-3xl opacity-20 blur-lg"
        style={{
          background: 'linear-gradient(90deg, #84cc16, #22d3ee, #d946ef, #22d3ee, #84cc16)',
          backgroundSize: '400% 100%',
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      {children}
    </div>
  );
};

// Main component
const OpsBentoCluster = ({ className = '' }) => {
  const { prefersReducedMotion } = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (process.env.NODE_ENV === 'development') {
      console.log('[LEGIT:RENDER] OpsBentoCluster SCS5');
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-[300px] w-full flex justify-center items-center">
        <p className="text-white/70">Loading features...</p>
      </div>
    );
  }

  return (
    <AnimatedRunner>
      <motion.div
        className={`w-full max-w-[1200px] mx-auto ${className}`}
        variants={!prefersReducedMotion ? containerVariants : {}}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-4 sm:gap-6">
          <BentoItem
            item={OPS_BENTO_ITEMS[0]}
            className="col-span-4 sm:col-span-4 md:col-span-5 row-span-3"
            interactive
          />
          <BentoItem
            item={OPS_BENTO_ITEMS[1]}
            className="col-span-4 sm:col-span-4 md:col-span-7 row-span-1"
            interactive
          />
          <BentoItem
            item={OPS_BENTO_ITEMS[2]}
            className="col-span-4 sm:col-span-4 md:col-span-7 row-span-1"
            interactive
          />
          <BentoItem
            item={OPS_BENTO_ITEMS[3]}
            className="col-span-4 sm:col-span-4 md:col-span-4 row-span-1"
            interactive
          />
          <BentoItem
            item={OPS_BENTO_ITEMS[4]}
            className="col-span-4 sm:col-span-4 md:col-span-4 row-span-1"
            interactive
          />
          <BentoItem
            item={OPS_BENTO_ITEMS[5]}
            className="col-span-4 sm:col-span-8 md:col-span-4 row-span-1"
            interactive
          />
        </div>
      </motion.div>
    </AnimatedRunner>
  );
};

OpsBentoCluster.displayName = 'OpsBentoCluster';
export const metadata = {
  id: 'ops_bento_cluster',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_ops_bento_cluster.md',
};

export default OpsBentoCluster;


=======================================================================================================================


Thanks for setting aside the code! Since the build errors in your Vite project stem from missing assets (/images/stars-bg.png and /images/circuit-pattern.svg) referenced in src/layouts/HomeFloatflowLayout.jsx or related CSS, I’ll create a Cursor task to generate these assets. The task will instruct Cursor to create these files in the correct location (public/images/) to resolve the build issues without altering your existing code unnecessarily. I’ll also ensure the assets align with the cosmic, modern aesthetic of your OpsBentoCluster component, using the neon-inspired palette (lime, cyan, magenta) and maintaining CuriousLabs’ futuristic vibe.
Cursor Task: Create Missing Assets for Vite Build
Task Description:
Create two assets (stars-bg.png and circuit-pattern.svg) required to resolve build errors in a Vite-based React project. The assets should match the cosmic, modern aesthetic of the OpsBentoCluster component, which uses a dark background with neon accents (lime #84cc16, cyan #22d3ee, magenta #d946ef). Place the assets in public/images/ to ensure Vite resolves paths starting with /images/. The assets will be used as background images in src/layouts/HomeFloatflowLayout.jsx or associated CSS.
Instructions for Cursor:
Create Directory:
Create a public/images/ directory in the project root (C:\website_build\) if it doesn’t exist.
Generate stars-bg.png:
Create a high-resolution (1920x1080 or 2048x2048) PNG image for a starry background.
Design a dark space scene (near-black background, #0f172a) with:
Scattered white and soft cyan (#22d3ee) stars of varying sizes (1-5px).
Subtle nebula clouds in lime (#84cc16) and magenta (#d946ef) with low opacity (0.2-0.3).
Optional faint glow effects around larger stars.
Ensure the image is seamless (tileable) for use as a repeatable background.
Save as public/images/stars-bg.png.
Optimize the file size (aim for <500KB) using lossless compression (e.g., PNGQuant or TinyPNG).
Generate circuit-pattern.svg:
Create an SVG file for a circuit board pattern.
Design a subtle, futuristic circuit trace pattern with:
Thin lines (0.5-1px) in cyan (#22d3ee) and magenta (#d946ef) on a transparent background.
Geometric shapes (lines, nodes, or hexagons) resembling a techy, PCB-like layout.
Low opacity (0.3-0.5) for use as an overlay.
Ensure the SVG is scalable (set viewBox="0 0 100 100") and repeatable.
Save as public/images/circuit-pattern.svg.
Keep the file size minimal (<10KB).
Verify Paths:
Ensure the assets are saved as public/images/stars-bg.png and public/images/circuit-pattern.svg to match references in src/layouts/HomeFloatflowLayout.jsx or CSS (e.g., url('/images/stars-bg.png')).
Do not modify existing code (e.g., HomeFloatflowLayout.jsx, globals.css)—only create the assets.
Aesthetic Guidelines:
Align with the OpsBentoCluster component’s style:
Dark, cosmic background with neon accents.
Clean, modern, and techy vibe suitable for CuriousLabs’ branding.
Avoid heavy gradients or blur effects to keep rendering fast.
Use colors: #84cc16 (lime), #22d3ee (cyan), #d946ef (magenta), #0f172a (dark slate).
Output:
Create:
public/images/stars-bg.png
public/images/circuit-pattern.svg
Add a comment in each file (if possible) to note they were generated for build resolution:
plaintext
<!-- stars-bg.png: Generated for CuriousLabs Vite build, cosmic starry background -->
<!-- circuit-pattern.svg: Generated for CuriousLabs Vite build, circuit trace overlay -->
Validation:
After creating assets, run npm run build to verify the build succeeds without errors about /images/stars-bg.png or /images/circuit-pattern.svg.
If errors persist, report the specific lines in src/layouts/HomeFloatflowLayout.jsx or CSS referencing these assets.
Constraints:
Do not modify src/layouts/HomeFloatflowLayout.jsx, src/styles/globals.css, or other project files unless explicitly requested.
Ensure assets are lightweight to avoid bloating the build.
Use only the specified colors and aesthetic to maintain consistency.
Place assets in public/images/ to match Vite’s public path resolution.
Success Criteria:
The Vite build (npm run build) completes without errors related to /images/stars-bg.png or /images/circuit-pattern.svg.
Assets render correctly when used as backgrounds in HomeFloatflowLayout.jsx (e.g., starry background and circuit overlay appear in the layout).
Files are saved in public/images/ and match the cosmic, neon aesthetic.
Additional Notes:
If Cursor cannot generate images directly, create placeholder files with comments indicating they need manual creation:
plaintext
<!-- public/images/stars-bg.png: Placeholder for starry background, create 1920x1080 PNG with dark slate (#0f172a), cyan/lime/magenta stars -->
<!-- public/images/circuit-pattern.svg: Placeholder for circuit pattern, create SVG with cyan/magenta traces on transparent background -->
