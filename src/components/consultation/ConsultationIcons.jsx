import React from 'react';

const SYMBOLS = [
  { id: 'cl-i-arrow', path: 'M5 12h14m-6-6 6 6-6 6' },
  { id: 'cl-i-diagonal', path: 'M6 18 18 6M6 6h12v12' },
  { id: 'cl-i-people', extra: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75" />
      <circle cx="9" cy="7" r="4" />
    </>
  ) },
  { id: 'cl-i-code', path: 'm8 6-6 6 6 6m8-12 6 6-6 6m-3-16-2 20' },
  { id: 'cl-i-compass', extra: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16 8-2 6-6 2 2-6Z" />
    </>
  ) },
  { id: 'cl-i-layers', path: 'm12 3 10 6-10 6L2 9Zm-10 12 10 6 10-6M2 15l10 6 10-6' },
  { id: 'cl-i-file', path: 'M14 2H5v20h14V7Zm0 0v5h5M8 11h8m-8 4h8m-8 4h5' },
  { id: 'cl-i-shield', path: 'M12 2 3 6v6c0 6 9 10 9 10s9-4 9-10V6Zm-5 10 3 3 7-7' },
  { id: 'cl-i-work', extra: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M8 7V3h8v4M3 12a20 20 0 0 0 18 0M12 10v6" />
    </>
  ) },
  { id: 'cl-i-learn', path: 'm12 3 11 6-11 6L1 9Zm-7 8v7c4 3 10 3 14 0v-7m4-2v8' },
  { id: 'cl-i-search', extra: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="m15 15 6 6" />
    </>
  ) },
  { id: 'cl-i-bot', extra: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="4" />
      <path d="M12 7V3m-2 0h4M8 12v3m8-3v3m-7 3h6M0 11v6m24-6v6" />
    </>
  ) },
  { id: 'cl-i-chat', extra: (
    <>
      <path d="M21 11a9 9 0 0 1-9 9 10 10 0 0 1-4-.8L2 22l1.8-6A9 9 0 1 1 21 11Z" />
      <path d="M7 11h.01M12 11h.01M17 11h.01" />
    </>
  ) },
  { id: 'cl-i-mail', extra: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7L22 6" />
    </>
  ) },
  { id: 'cl-i-pin', extra: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ) },
  { id: 'cl-i-close', path: 'm6 6 12 12M6 18 18 6' }
];

export function ClIcon({ name, className = 'cl-icon' }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <use href={`#cl-i-${name}`} />
    </svg>
  );
}

export default function ConsultationIcons() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="cl-sprite" aria-hidden="true">
      <defs>
        {SYMBOLS.map((symbol) => (
          <symbol
            key={symbol.id}
            id={symbol.id}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {symbol.path ? <path d={symbol.path} /> : symbol.extra}
          </symbol>
        ))}
      </defs>
    </svg>
  );
}
