import React from 'react';

/** Lime dash + spaced mono label. */
export function Eyebrow({ children, className = '', as: Tag = 'p' }) {
  return <Tag className={`k-eyebrow ${className}`.trim()}>{children}</Tag>;
}

function joinLines(lines) {
  return lines.map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </React.Fragment>
  ));
}

/** Clash Display headline; visible at first paint (no masked reveal). */
export function Display({ as: Tag = 'h2', lines, size = 'scene', id, className = '', children }) {
  return (
    <Tag id={id} className={`k-display k-display--${size} ${className}`.trim()}>
      {lines ? joinLines(lines) : children}
    </Tag>
  );
}

export function Lead({ children, className = '' }) {
  return <p className={`k-lead ${className}`.trim()}>{children}</p>;
}

export function Body({ children, className = '' }) {
  return <p className={`k-body ${className}`.trim()}>{children}</p>;
}

/** Card title. `feature` = the larger featured-card size. */
export function CardTitle({ as: Tag = 'h3', feature = false, id, lines, className = '', children }) {
  return (
    <Tag id={id} className={`k-h3${feature ? ' k-h3--feature' : ''} ${className}`.trim()}>
      {lines ? joinLines(lines) : children}
    </Tag>
  );
}

/** Mono micro label in the surrounding accent. */
export function MicroLabel({ children, className = '', as: Tag = 'span' }) {
  return <Tag className={`k-micro ${className}`.trim()}>{children}</Tag>;
}

/**
 * Editorial quote: serif cream text with curly quotes, short lime rule,
 * `● LABEL` mono. Real text — screen readers read it as a blockquote.
 */
export function QuoteBlock({ quote, label = 'CURIOUSLABS', align = 'right', className = '' }) {
  return (
    <figure className={`k-quote k-quote--${align} ${className}`.trim()}>
      <blockquote className="k-quote__text">
        <span className="k-quote__mark" aria-hidden="true">{'“'}</span>
        {quote}
        <span aria-hidden="true">{'”'}</span>
      </blockquote>
      <span className="k-quote__rule" aria-hidden="true" />
      <figcaption className="k-quote__label">{label}</figcaption>
    </figure>
  );
}

/** Vertical mono word stack at a band edge (hidden below 900px). */
export function WordStack({ words, className = '' }) {
  return (
    <ul className={`k-wordstack ${className}`.trim()} aria-hidden="true">
      {words.map((word) => <li key={word}>{word}</li>)}
    </ul>
  );
}

/** Spaced mono closer, one line per entry. */
export function Tagline({ lines, align = 'left', className = '' }) {
  return (
    <p className={`k-tagline k-tagline--${align} ${className}`.trim()}>
      {lines.map((line) => <span key={line}>{line}</span>)}
    </p>
  );
}
