#!/usr/bin/env node
/**
 * Art bridge — export a raw generation into web-ready scene assets.
 *
 *   node tools/art/export.mjs --in tools/art/_raw/earth.png --out earth-hero \
 *     --desktop 1920x1080 --mobile 900x1600 --focus east --darken 0.1
 *
 * Writes public/consultation/<out>-desktop.{avif,webp} and <out>-mobile.{avif,webp}
 * (only the variants you ask for) and prints byte sizes against the budget.
 *
 *   --focus    sharp crop gravity for the cover crop: centre | north | south | east | west |
 *              northeast | … | attention | entropy   (default attention)
 *   --darken   0–1, multiplies brightness down so overlaid text stays readable
 *   --alpha    keep transparency (forces webp + avif with alpha; skips darken)
 *   --budget   KB warning threshold per file (default 250)
 *   --dest     output dir (default public/consultation)
 * sharp is already a project dependency — nothing new is installed.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const opt = {};
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith('--')) continue;
  const next = argv[i + 1];
  opt[argv[i].slice(2)] = next && !next.startsWith('--') ? (i++, next) : true;
}

if (!opt.in || !opt.out) {
  console.error('Usage: --in raw.png --out slug [--desktop WxH] [--mobile WxH] [--focus g] [--darken 0.1] [--alpha] [--budget 250]');
  process.exit(1);
}

const dest = opt.dest || 'public/consultation';
const budget = Number(opt.budget || 250) * 1024;
const focus = opt.focus || 'attention';
const darken = opt.alpha ? 0 : Number(opt.darken || 0);
fs.mkdirSync(dest, { recursive: true });

const variants = ['desktop', 'mobile']
  .filter((v) => opt[v])
  .map((v) => {
    const [w, h] = String(opt[v]).split('x').map(Number);
    return { v, w, h };
  });
if (!variants.length) variants.push({ v: 'full', w: null, h: null });

const report = [];
for (const { v, w, h } of variants) {
  let img = sharp(opt.in);
  if (w && h) {
    const position = sharp.strategy[focus] ?? sharp.gravity[focus] ?? focus;
    img = img.resize(w, h, { fit: 'cover', position });
  }
  if (darken > 0) img = img.modulate({ brightness: 1 - darken });
  const base = path.join(dest, `${opt.out}-${v}`);
  const avif = await img.clone().avif({ quality: 52, effort: 6 }).toFile(`${base}.avif`);
  const webp = await img.clone().webp({ quality: 78, effort: 6, alphaQuality: 90 }).toFile(`${base}.webp`);
  for (const [fmt, info] of [['avif', avif], ['webp', webp]]) {
    report.push({ file: `${base}.${fmt}`, width: info.width, height: info.height, kb: Math.round(info.size / 1024), overBudget: info.size > budget });
  }
}
console.table(report);
