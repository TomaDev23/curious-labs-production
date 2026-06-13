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
  {
    letter: 'D',
    name: 'Data',
    accent: 'blue',
    count: 12,
    blurb: 'Documents, events, blob and trace stores — the system of record.',
    services: ['Repo.Documents', 'Repo.Events', 'Blob Storage', 'Distributed Tracing']
  },
  {
    letter: 'R',
    name: 'Runtime',
    accent: 'violet',
    count: 7,
    blurb: 'Sessions, the FSM core, path resolution and live flags.',
    services: ['Session Factory', 'FSM Core', 'Path Resolver', 'Settings / Flags']
  },
  {
    letter: 'E',
    name: 'Entry',
    accent: 'amber',
    count: 4,
    blurb: 'The API gateway — every request, API call and login enters and is authenticated here.',
    services: ['API Gateway', 'Auth Service', 'Token Validator', 'Rate Limiter']
  },
  {
    letter: 'A',
    name: 'AI',
    accent: 'lime',
    count: 5,
    blurb: 'Vision, mapping, parsing and the rules engine that turn raw input into structured signal.',
    services: ['Vision Engine (OCR)', 'Mapper (Chunking)', 'Parser (JSON)', 'Rules Engine']
  },
  {
    letter: 'M',
    name: 'Management',
    accent: 'teal',
    count: 8,
    blurb: 'Cost, quality, performance and alerting — the machine watching the machine.',
    services: ['Cost Mgmt', 'Quality Orchestrator', 'Performance Analytics', 'Alert System']
  },
  {
    letter: 'S',
    name: 'Security',
    accent: 'cyan',
    count: 41,
    blurb: 'The 41-service intake every request passes before anything else runs.',
    services: ['Authentication', 'Authorization', 'PII Protection', 'Threat Detection']
  }
];

// "L.E.G.I.T." — the engineering standard every MoonSignal component is built
// to. Source of truth: MoonSignal_RULES/MOONSIGNAL_000_RULES_short.md → the
// "L.E.G.I.T. FRAMEWORK" table (Lifecycle, Enum, Guardrails, Interface, Trace,
// each with its enforcement mechanism). Per-card accents are decorative.
export const AEGIS_LEGIT_PROTOCOL = {
  eyebrow: 'Engineering Standard',
  title: 'LEGIT Framework',
  lede: 'Every MoonSignal component is held to the same five invariants — lifecycle-managed, enum-typed, guarded, protocol-based and traceable — enforced in code by guards that stay green, not by convention.',
  cards: [
    { code: 'LEG-L', letter: 'L', title: 'Lifecycle', accent: 'cyan', lead: 'States are explicit, not implied.', desc: 'IDLE → WARMING → READY → RUNNING → ERROR, every transition logged and gated by _set_state() and validate_component_transition().' },
    { code: 'LEG-E', letter: 'E', title: 'Enum', accent: 'amber', lead: 'Typed enums, never magic strings.', desc: 'ComponentState, RegimeTrend, Volatility and SignalStrength — enforced by type hints and guards.' },
    { code: 'LEG-G', letter: 'G', title: 'Guardrails', accent: 'violet', lead: 'Bad input fails safe, never silent.', desc: 'Input validation, circuit breakers, warmup checks and rate limiting, with UNKNOWN / NEUTRAL fallbacks via the breaker registry.' },
    { code: 'LEG-I', letter: 'I', title: 'Interface', accent: 'lime', lead: 'Every component speaks through a Protocol.', desc: 'Runtime isinstance() checks and no duck typing — protocol-first design keeps implementations swappable.' },
    { code: 'LEG-T', letter: 'T', title: 'Trace', accent: 'teal', lead: 'Every decision traces to its evidence.', desc: 'session.trace_id in logs, session.stable_hash() evidence keys and telemetry metadata, enforced by SessionHandle discipline.' }
  ]
};
