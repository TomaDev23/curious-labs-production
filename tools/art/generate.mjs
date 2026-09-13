#!/usr/bin/env node
/**
 * Art bridge — generate text-free scene art through the OpenAI Images API.
 *
 *   node tools/art/generate.mjs --name walls-landscape --prompt-file tools/art/prompts/walls.txt
 *   node tools/art/generate.mjs --name door-leaf --prompt "..." --background transparent
 *   node tools/art/generate.mjs --name doors-horizon --prompt-file p.txt --ref tools/art/_raw/earth-hero.png
 *
 * Options
 *   --name        output slug (required)
 *   --prompt | --prompt-file
 *   --model       default gpt-image-2
 *   --size        default 1536x1024. gpt-image-2 accepts any WxH divisible by 16, up to at
 *                 least 3840x2160 (verified) — e.g. 2048x1152 desktop, 1152x2048 phone
 *   --quality     low | medium | high | auto   (default medium — use low for drafts)
 *   --background  opaque | transparent | auto  (transparent needs png/webp output)
 *   --n           images per call (default 1)
 *   --stream false  disable streaming (default: streamed with partial_images=3 when n=1)
 *   --ref         reference image(s), comma-separated → uses the edits endpoint for style continuity
 *
 * Writes PNGs to tools/art/_raw/ (gitignored) and appends one line per call to
 * tools/art/_raw/log.jsonl (prompt, model, size, quality, token usage) so spend
 * stays traceable. The key is read from tools/art/.env — never from the repo root,
 * never VITE_-prefixed, so it cannot reach the site bundle.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.join(HERE, '_raw');

function args(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const next = argv[i + 1];
    out[a.slice(2)] = next && !next.startsWith('--') ? (i++, next) : true;
  }
  return out;
}

const opt = args(process.argv.slice(2));
const envFile = path.join(HERE, '.env');
if (!fs.existsSync(envFile)) throw new Error(`Missing ${envFile} (OPENAI_API_KEY=...)`);
process.loadEnvFile(envFile);
const KEY = process.env.OPENAI_API_KEY;
if (!KEY) throw new Error('OPENAI_API_KEY not set in tools/art/.env');

const name = opt.name;
const prompt = opt['prompt-file'] ? fs.readFileSync(opt['prompt-file'], 'utf8').trim() : opt.prompt;
if (!name || !prompt) {
  console.error('Usage: --name <slug> (--prompt "..." | --prompt-file path) [--size --quality --background --n --ref --model]');
  process.exit(1);
}

const model = opt.model || 'gpt-image-2';
const size = opt.size || '1536x1024';
const quality = opt.quality || 'medium';
const background = opt.background || 'auto';
const n = Number(opt.n || 1);
const refs = opt.ref ? String(opt.ref).split(',').map((s) => s.trim()).filter(Boolean) : [];

fs.mkdirSync(RAW, { recursive: true });

async function call() {
  const headers = { Authorization: `Bearer ${KEY}` };
  if (refs.length) {
    const form = new FormData();
    form.append('model', model);
    form.append('prompt', prompt);
    form.append('size', size);
    form.append('quality', quality);
    form.append('n', String(n));
    if (background !== 'auto') form.append('background', background);
    if (n === 1 && opt.stream !== 'false') { form.append('stream', 'true'); form.append('partial_images', '3'); }
    for (const ref of refs) {
      const buf = fs.readFileSync(ref);
      form.append('image[]', new Blob([buf], { type: 'image/png' }), path.basename(ref));
    }
    return fetch('https://api.openai.com/v1/images/edits', { method: 'POST', headers, body: form });
  }
  const body = { model, prompt, size, quality, n };
  if (background !== 'auto') body.background = background;
  if (n === 1 && opt.stream !== 'false') { body.stream = true; body.partial_images = 3; }
  return fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

const started = Date.now();
// Streaming (default for n=1): this network cuts any connection that is silent for
// 60 s (measured 60.2 s), and high-quality renders take longer. partial_images keeps
// bytes flowing. Network-level failures retry; HTTP errors are real answers.
const stream = n === 1 && opt.stream !== 'false';

async function readStream(res) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  let done = null;
  let partials = 0;
  for (;;) {
    const { value, done: end } = await reader.read();
    if (end) break;
    buf += decoder.decode(value, { stream: true });
    let cut;
    buf = buf.replace(/\r\n/g, '\n');
    while ((cut = buf.indexOf('\n\n')) !== -1) {
      const chunk = buf.slice(0, cut);
      buf = buf.slice(cut + 2);
      const data = chunk.split('\n').filter((l) => l.startsWith('data:')).map((l) => l.slice(5).trim()).join('');
      if (!data || data === '[DONE]') continue;
      const ev = JSON.parse(data);
      if (ev.type?.endsWith('.partial_image')) partials++;
      else if (ev.type?.endsWith('.completed')) done = ev;
      else if (ev.type === 'error' || ev.error) throw Object.assign(new Error(ev.error?.message || JSON.stringify(ev)), { api: true });
    }
  }
  if (!done) throw new Error(`stream ended without a completed event (${partials} partials)`);
  return { data: [{ b64_json: done.b64_json }], usage: done.usage, partials };
}

let result;
for (let attempt = 1; ; attempt++) {
  try {
    const res = await call();
    if (!res.ok) {
      const json = await res.json();
      result = { error: `OpenAI error ${res.status}: ${json.error?.message || JSON.stringify(json)}` };
    } else {
      result = stream ? await readStream(res) : await res.json();
    }
    break;
  } catch (err) {
    if (err.api) { result = { error: `OpenAI stream error: ${err.message}` }; break; }
    const code = err.cause?.code || err.code;
    if (attempt >= 3) throw err;
    console.error(`network error (${code || err.message}); retry ${attempt}/2 in ${attempt * 10}s`);
    await new Promise((r) => setTimeout(r, attempt * 10000));
  }
}
if (result.error) {
  console.error(result.error);
  // Not process.exit(): on Windows, exiting while fetch's socket handles are
  // still closing trips a libuv assertion (UV_HANDLE_CLOSING) and exits 127.
  process.exitCode = 2;
} else {
  save(result);
}

function save(json) {
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const files = json.data.map((img, i) => {
  const file = path.join(RAW, `${name}-${stamp}${n > 1 ? `-${i + 1}` : ''}.png`);
  fs.writeFileSync(file, Buffer.from(img.b64_json, 'base64'));
  return file;
});

fs.appendFileSync(
  path.join(RAW, 'log.jsonl'),
  JSON.stringify({ at: new Date().toISOString(), name, model, size, quality, background, n, refs, usage: json.usage, seconds: (Date.now() - started) / 1000, files: files.map((f) => path.relative(HERE, f)), prompt }) + '\n'
);

console.log(JSON.stringify({ ok: true, model, size, quality, seconds: (Date.now() - started) / 1000, usage: json.usage, files }, null, 2));
}
