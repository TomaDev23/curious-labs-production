import React, { useId, useState } from 'react';
import { ClIcon } from '../ConsultationIcons';

const acc = (accent) => (accent ? ` k-acc-${accent}` : '');

function renderIcon(icon) {
  return typeof icon === 'string' ? <ClIcon name={icon} /> : icon;
}

/** Dark glass card with a neon edge in its accent. */
export function NeonCard({ accent = 'cyan', featured = false, as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`k-card${acc(accent)}${featured ? ' k-card--featured' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

/** Icon in a neon ring. `size` in px (phone shrinks the default 64 → 52). */
export function IconRing({ icon, accent, size, className = '' }) {
  return (
    <span
      className={`k-ring${acc(accent)} ${className}`.trim()}
      style={size ? { '--k-ring': `${size}px` } : undefined}
      aria-hidden="true"
    >
      {renderIcon(icon)}
    </span>
  );
}

export function Chip({ accent, children }) {
  return <span className={`k-chip${acc(accent)}`}>{children}</span>;
}

/** Wrapping chip list. */
export function Chips({ items, accent, label, className = '' }) {
  return (
    <ul className={`k-chips${acc(accent)} ${className}`.trim()} aria-label={label}>
      {items.map((item) => (
        <li key={item}><span className="k-chip">{item}</span></li>
      ))}
    </ul>
  );
}

/** 3-column stat strip with hairline dividers. */
export function StatStrip({ items, className = '' }) {
  return (
    <ul className={`k-stats ${className}`.trim()}>
      {items.map((item) => (
        <li key={`${item.big}-${item.label}`} className={`k-stat${acc(item.accent)}`}>
          <span className="k-stat__big">{item.big}</span>
          <span className="k-stat__label">{item.label}</span>
          {item.note && <span className="k-stat__note">{item.note}</span>}
        </li>
      ))}
    </ul>
  );
}

/** Icon + title + text row. `bare` drops the rounded hairline frame. */
export function IconRow({ icon, title, text, accent, bare = false, as: Tag = 'div', className = '' }) {
  return (
    <Tag className={`k-irow${bare ? ' k-irow--bare' : ''}${acc(accent)} ${className}`.trim()}>
      <span className="k-irow__icon" aria-hidden="true">{renderIcon(icon)}</span>
      <span>
        <span className="k-irow__title">{title}</span>
        {text && <span className="k-irow__text">{text}</span>}
      </span>
    </Tag>
  );
}

/**
 * Numbered row. Three modes:
 * - `children` given → disclosure: the head is a button that shows/hides
 *   the panel (native `hidden`, so no tab stops while closed);
 * - `href` given → the whole head is a link;
 * - neither → static row.
 * `badge`: 'circle' (40px disc) or 'numeral' (large thin numeral).
 */
export function NumberedRow({
  n,
  title,
  text,
  icon,
  action = 'plus',
  badge = 'circle',
  accent,
  href,
  defaultOpen = false,
  headingLevel,
  as: Tag = 'div',
  className = '',
  children
}) {
  const panelId = `k-nrow-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const [open, setOpen] = useState(defaultOpen);
  const expandable = Boolean(children);

  const inner = (
    <>
      <span className={`k-nrow__badge${badge === 'numeral' ? ' k-nrow__badge--numeral' : ''}`} aria-hidden="true">{n}</span>
      {icon && <span className="k-nrow__icon" aria-hidden="true">{renderIcon(icon)}</span>}
      <span className="k-nrow__copy">
        <span className="k-nrow__title">{title}</span>
        {text && <span className="k-nrow__text">{text}</span>}
      </span>
      {action && (
        <span className="k-nrow__action" aria-hidden="true">
          <ClIcon name={action === 'plus' ? 'plus' : 'arrow'} />
        </span>
      )}
    </>
  );

  let head;
  if (expandable) {
    head = (
      <button
        type="button"
        className="k-nrow__head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {inner}
      </button>
    );
    if (headingLevel) {
      const H = `h${headingLevel}`;
      head = <H style={{ margin: 0 }}>{head}</H>;
    }
  } else if (href) {
    head = <a className="k-nrow__head" href={href}>{inner}</a>;
  } else {
    head = <div className="k-nrow__head">{inner}</div>;
  }

  return (
    <Tag className={`k-nrow${acc(accent)} ${className}`.trim()}>
      {head}
      {expandable && (
        <div id={panelId} className="k-nrow__panel" hidden={!open}>
          {children}
        </div>
      )}
    </Tag>
  );
}

/**
 * Rounded image with a bottom gradient and a mono caption. Renders the
 * gradient fallback alone until the art file exists (or if it 404s).
 */
export function ImageTile({ src, caption, alt = '', ratio = '16 / 10', position, className = '' }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={`k-tile ${className}`.trim()}
      style={{ aspectRatio: ratio, ...(position ? { '--k-tile-pos': position } : null) }}
    >
      {src && !failed && (
        <picture>
          {src.avif && <source type="image/avif" srcSet={src.avif} />}
          <img
            src={src.webp}
            width={src.width}
            height={src.height}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        </picture>
      )}
      {caption && (
        <figcaption className="k-tile__caption">
          {caption.map((line) => <span key={line}>{line}</span>)}
        </figcaption>
      )}
    </figure>
  );
}
