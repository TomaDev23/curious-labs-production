import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Gradient seam so full-bleed scene art dissolves into the page background
 * instead of cutting off sharply. Optional `wipe` adds a thin light line
 * that sweeps across once when the seam enters view (DR-06); dropped
 * entirely under reduced motion, per the drama layer's own fallback.
 */
function SceneSeam({ edge = 'bottom', height = 160, wipe = false }) {
  const reduced = useReducedMotion();
  const showWipe = wipe && !reduced;

  return (
    <div className={`cl-seam cl-seam--${edge}`} style={{ height }} aria-hidden="true">
      {showWipe && (
        <motion.div
          className="cl-seam__wipe"
          initial={{ x: '-100%' }}
          whileInView={{ x: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </div>
  );
}

export default SceneSeam;
