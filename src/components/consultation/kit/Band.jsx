import React from 'react';
import SceneArt from './SceneArt';

/**
 * Full-bleed scene band (CANON_KIT §3). The art layer and the hairline span
 * the viewport; content sits in the 1320px column. The section itself never
 * clips — only the art layer does, so art never shows a box edge.
 *
 * `art` is either SceneArt props ({ desktop, mobile, position, scrim, … })
 * or a ready element for scenes that compose their own backdrop.
 *
 * `hairline` defaults to none: MOTIF_PROGRESSION draws chapter lines only after
 * SC-03 and SC-06, which pass it explicitly (#MGR-062). `artEdge` names the art
 * edges that dissolve into the starfield ('both' | 'top' | 'bottom' | 'none').
 */
function Band({
  id,
  sectionKey,
  art,
  hairline = 'none',
  artEdge = 'both',
  className = '',
  labelledBy,
  children
}) {
  const artLayer = art
    ? React.isValidElement(art) ? art : <SceneArt {...art} />
    : null;

  return (
    <section
      id={id}
      data-cl-section={sectionKey}
      aria-labelledby={labelledBy}
      className={`k-band k-band--hairline-${hairline} ${className}`.trim()}
    >
      {artLayer && <div className={`k-band__art k-band__art--fade-${artEdge}`} aria-hidden="true">{artLayer}</div>}
      <div className="k-band__inner">{children}</div>
    </section>
  );
}

export default Band;
