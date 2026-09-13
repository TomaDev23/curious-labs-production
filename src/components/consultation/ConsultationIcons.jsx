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
  { id: 'cl-i-close', path: 'm6 6 12 12M6 18 18 6' },
  // Canon kit icons (A-01) — line icons read off the mockups.
  { id: 'cl-i-plus', path: 'M12 5v14M5 12h14' },
  { id: 'cl-i-building', path: 'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM6 12H4a2 2 0 0 0-2 2v8h4m12-13h2a2 2 0 0 1 2 2v11h-4M10 6h4m-4 4h4m-4 4h4m-4 4h4' },
  { id: 'cl-i-brain', extra: (
    <>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4M12 5v13" />
    </>
  ) },
  { id: 'cl-i-network', extra: (
    <>
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8" />
    </>
  ) },
  { id: 'cl-i-user', extra: (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </>
  ) },
  { id: 'cl-i-gear', extra: (
    <>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ) },
  { id: 'cl-i-book', path: 'M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2Zm20 0h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7Z' },
  { id: 'cl-i-chart', path: 'M4 20h16M7 16v-4m5 4V8m5 8V5' },
  { id: 'cl-i-rocket', path: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09ZM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Zm-3-3H4s.55-3.03 2-4c1.62-1.08 5 0 5 0m1 7v5s3.03-.55 4-2c1.08-1.62 0-5 0-5' },
  { id: 'cl-i-refresh', path: 'M3 12a9 9 0 0 1 15.5-6.2L21 8m0-5v5h-5m5 4a9 9 0 0 1-15.5 6.2L3 16m0 5v-5h5' },
  { id: 'cl-i-sliders', extra: (
    <>
      <path d="M4 6h9m4 0h3M4 12h3m4 0h9M4 18h11m4 0h1" />
      <circle cx="15" cy="6" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ) },
  { id: 'cl-i-laptop', path: 'M5 5h14a1 1 0 0 1 1 1v10H4V6a1 1 0 0 1 1-1ZM2 20h20' },
  { id: 'cl-i-bolt', path: 'M13 2 3 14h9l-1 8 10-12h-9Z' },
  { id: 'cl-i-tool', path: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94Z' },
  { id: 'cl-i-handoff', path: 'M4 8h14m-4-4 4 4-4 4M20 16H6m4-4-4 4 4 4' },
  { id: 'cl-i-stages', path: 'M3 20h5v-5h5v-5h5V5h3' }
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
