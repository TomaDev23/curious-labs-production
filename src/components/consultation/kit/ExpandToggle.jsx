import React, { useState } from 'react';

/**
 * Explicit expand/collapse control (INT-03 style: a real button, not a
 * hover-only reveal). The panel uses the native `hidden` attribute, so it
 * has no reachable tab stops while closed. Its open animation is a plain
 * CSS keyframe, already covered by the global reduced-motion override.
 */
function ExpandToggle({ id, label, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="cl-expand"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
      </button>
      <div id={id} className="cl-expand__panel" hidden={!open}>
        {children}
      </div>
    </>
  );
}

export default ExpandToggle;
