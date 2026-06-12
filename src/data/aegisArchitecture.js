/**
 * AEGIS V5 Core Runtime Engine — architecture data.
 *
 * Drives the <AegisMachine /> landing section so the diagram is data-driven
 * rather than hardcoded. Shapes are kept stable: meta, SLOs, compliance tags,
 * the left→right energy-flow stages (gateway → security pipeline → core), and
 * the six layer modules that fan out from the core.
 */

export const AEGIS_META = {
  name: 'AEGIS V5 Core Runtime Engine',
  tagline: 'DREAMS Infrastructure',
  totalServices: '118+',
  status: 'OPERATIONAL'
};

export const AEGIS_SLOS = [
  { label: 'Auth (JWT)', value: '0.070', unit: 'ms' },
  { label: 'RBAC', value: '<2', unit: 'ms', note: '≥80% cache' },
  { label: 'Circuit Breaker', value: '≤0.5', unit: 'ms' },
  { label: 'Feature Flag Eval', value: '≤0.1', unit: 'ms' },
  { label: 'Event Pub', value: '<5', unit: 'ms' }
];

export const AEGIS_COMPLIANCE = ['GDPR', 'HIPAA', 'CCPA', 'PCI-DSS', 'Zero Trust'];

// The energy flow stages, left to right:
export const AEGIS_GATEWAY = { code: 'E', name: 'API Gateway', role: 'Entry layer' };

export const AEGIS_SECURITY = {
  code: 'S',
  name: 'Security Pipeline',
  count: 41,
  accent: 'amber',
  stages: [
    { id: 'S0', name: 'Authentication', detail: 'Auth Service · Token Validator' },
    { id: 'S1', name: 'Authorization', detail: 'RBAC · Rate Limiter' },
    { id: 'S2', name: 'PII Protection', detail: 'Detector · Redactor' },
    { id: 'S3', name: 'Threat Detection', detail: 'Quarantine · Tracer' }
  ]
};

export const AEGIS_CORE = { name: 'AEGIS Core', role: 'Runtime engine' };

// The layers that fan out from the core (each a module card):
export const AEGIS_LAYERS = [
  { code: 'X', name: 'Platform', count: 25, accent: 'cyan', services: ['Event Bus', 'Circuit Breaker', 'Feature Flags', 'Correlation', 'Observability Hub'] },
  { code: 'B', name: 'Builder', count: 19, accent: 'amber', services: ['Service Introspection', 'Workflow Engine', 'AI Agent Orchestrator'] },
  { code: 'A', name: 'AI', count: 5, accent: 'lime', services: ['Vision Engine (OCR)', 'Mapper (Chunking)', 'Parser (JSON)', 'Rules Engine'] },
  { code: 'R', name: 'Runtime', count: 7, accent: 'violet', services: ['Session Factory', 'FSM Core', 'Path Resolver', 'Settings / Flags'] },
  { code: 'D', name: 'Data', count: 12, accent: 'blue', services: ['Repo.Documents', 'Repo.Events', 'Blob Storage', 'Distributed Tracing'] },
  { code: 'M', name: 'Management', count: 8, accent: 'teal', services: ['Cost Mgmt', 'Quality Orchestrator', 'Performance Analytics', 'Alert System'] }
];

// Visual proof that Moon Signal is a tenant of the runtime, not a standalone app.
export const AEGIS_OUTPUT = { name: 'Moon Signal', role: 'Runs on AEGIS', accent: 'teal' };

/* ──────────────────────────────────────────────────────────────────────────
   Briefing copy for the <AegisBriefing> block under the machine console.
   Kept here (not as JSX literals) so prose + accents stay data-driven and the
   DREAMS acrostic derives its colour from the same layer accents above.
   ────────────────────────────────────────────────────────────────────────── */

export const AEGIS_BRIEF_LEDE =
  'AEGIS is not a framework bolted onto Moon Signal — it is the runtime Moon Signal lives inside. Every request enters through one gate, is governed by one set of rules, and is traced end to end. DREAMS is how that runtime is organised.';

// D·R·E·A·M·S — each letter maps onto a layer/stage accent for colour.
// (E = Entry: the API gateway / authentication door, code 'E' in AEGIS_GATEWAY.)
export const AEGIS_DREAMS = [
  { letter: 'D', name: 'Data', accent: 'blue', blurb: 'Documents, events, blob and trace stores — the system of record.' },
  { letter: 'R', name: 'Runtime', accent: 'violet', blurb: 'Sessions, the FSM core, path resolution and live flags.' },
  { letter: 'E', name: 'Entry', accent: 'amber', blurb: 'The API gateway — every request, API call and login enters and is authenticated here.' },
  { letter: 'A', name: 'AI', accent: 'lime', blurb: 'Vision, mapping, parsing and the rules engine that turn raw input into structured signal.' },
  { letter: 'M', name: 'Management', accent: 'teal', blurb: 'Cost, quality, performance and alerting — the machine watching the machine.' },
  { letter: 'S', name: 'Security', accent: 'cyan', blurb: 'The 41-service intake every request passes before anything else runs.' }
];

// "LEGIT" — the internal protocol every AEGIS decision follows (mirrors the
// LEGIT Framework on the AEGIS product page). Colourful per-card accents.
export const AEGIS_LEGIT_PROTOCOL = {
  eyebrow: 'Protocol Standard',
  title: 'LEGIT Framework',
  lede: 'AI that touches real business logic needs more than prompt engineering — it needs formal contracts, audit trails and fail-safes. LEGIT is the standard every AEGIS decision is held to: five invariants, enforced end to end.',
  cards: [
    { code: 'LEG-001', letter: 'L', title: 'Logged', accent: 'cyan', desc: 'A complete audit trail of every decision, state change and agent interaction — nothing runs off the record.' },
    { code: 'LEG-002', letter: 'E', title: 'Enforced', accent: 'amber', desc: 'Schema validation keeps agents from ever operating outside their defined parameters or contracts.' },
    { code: 'LEG-003', letter: 'G', title: 'Governed', accent: 'violet', desc: 'Human approval workflows gate critical decisions, with explicit escalation paths and overrides.' },
    { code: 'LEG-004', letter: 'I', title: 'Isolated', accent: 'lime', desc: 'Sandboxed execution environments with data encryption and strict, scoped access controls.' },
    { code: 'LEG-005', letter: 'T', title: 'Tested', accent: 'teal', desc: 'Continuous validation through automated testing and regression — every path proven before it ships.' }
  ]
};
