#!/usr/bin/env node
/**
 * Art bridge — contact sheet for owner review.
 *
 *   node tools/art/contact.mjs tools/art/_raw/a.png tools/art/_raw/b.png --out tools/art/_raw/sheet.png
 *
 * Tiles every input (raw PNG or exported webp/avif) into one labelled grid.
 * Transparent pixels show over a magenta/grey checker so real alpha is obvious.
 *   --out   output PNG (default tools/art/_raw/contact-sheet.png)
 *   --cols  columns (default 3)
 *   --tile  tile width in px (default 520)
 */
import path from 'node:path';
import sharp from 'sharp';

const files = [];
const opt = {};
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) opt[argv[i].slice(2)] = argv[++i];
  else files.push(argv[i]);
}
if (!files.length) {
  console.error('Usage: contact.mjs <image> [<image> ...] [--out sheet.png] [--cols 3] [--tile 520]');
  process.exit(1);
}

const out = opt.out || 'tools/art/_raw/contact-sheet.png';
const cols = Math.min(Number(opt.cols || 3), files.length);
const tileW = Number(opt.tile || 520);
const labelH = 34;
const gap = 12;

const esc = (s) => s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
const checker = (w, h) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><pattern id="c" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#3a3a3a"/><rect width="12" height="12" fill="#ff00aa"/><rect x="12" y="12" width="12" height="12" fill="#ff00aa"/></pattern></defs><rect width="100%" height="100%" fill="url(#c)"/></svg>`);

const tiles = [];
for (const file of files) {
  const meta = await sharp(file).metadata();
  const tileH = Math.round((meta.height / meta.width) * tileW);
  const img = await sharp(file).resize(tileW, tileH).png().toBuffer();
  const base = meta.hasAlpha
    ? await sharp(checker(tileW, tileH)).composite([{ input: img }]).png().toBuffer()
    : img;
  const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${tileW}" height="${labelH}"><rect width="100%" height="100%" fill="#111"/><text x="10" y="22" font-family="Consolas, monospace" font-size="14" fill="#ddd">${esc(path.basename(file))} · ${meta.width}×${meta.height}${meta.hasAlpha ? ' · alpha' : ''}</text></svg>`);
  tiles.push({ base, label, h: tileH + labelH });
}

const rows = Math.ceil(tiles.length / cols);
const rowH = Array.from({ length: rows }, (_, r) => Math.max(...tiles.slice(r * cols, r * cols + cols).map((t) => t.h)));
const width = cols * tileW + (cols + 1) * gap;
const height = rowH.reduce((a, b) => a + b, 0) + (rows + 1) * gap;
const composites = [];
tiles.forEach((t, i) => {
  const r = Math.floor(i / cols);
  const left = gap + (i % cols) * (tileW + gap);
  const top = gap + rowH.slice(0, r).reduce((a, b) => a + b, 0) + r * gap;
  composites.push({ input: t.label, left, top }, { input: t.base, left, top: top + labelH });
});

await sharp({ create: { width, height, channels: 3, background: '#1b1b1b' } }).composite(composites).png().toFile(out);
console.log(`contact sheet → ${out} (${files.length} images, ${width}×${height})`);
