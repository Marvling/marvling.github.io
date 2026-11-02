// Shrink source images in place: auto-orient, strip metadata, cap long edge at 2560px.
// Opaque PNGs over 300KB become JPEGs (update any YAML that names them).
// usage: npm run media:optimize -- [dir-or-file ...]   (default: src/assets)
import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const MAX = 2560;
const walk = (p) =>
  statSync(p).isDirectory() ? readdirSync(p).flatMap((f) => walk(join(p, f))) : [p];
const files = (process.argv.slice(2).length ? process.argv.slice(2) : ['src/assets'])
  .flatMap(walk)
  .filter((f) => /\.(jpe?g|png)$/i.test(f));

let before = 0;
let after = 0;
for (const file of files) {
  const size = statSync(file).size;
  const img = sharp(file).rotate();
  const { width = 0, height = 0, hasAlpha } = await img.metadata();
  const isPng = extname(file).toLowerCase() === '.png';
  const toJpeg = isPng && !hasAlpha && size > 300_000;
  // already small and within bounds: leave untouched to avoid re-encoding loss
  if (Math.max(width, height) <= MAX && size < 600_000 && !toJpeg) continue;

  const resized = img.resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });
  const buf = await (
    isPng && !toJpeg
      ? resized.png({ compressionLevel: 9, palette: true, quality: 90 })
      : resized.jpeg({ quality: 86, mozjpeg: true })
  ).toBuffer();
  const out = toJpeg ? file.replace(/\.png$/i, '.jpg') : file;
  writeFileSync(out, buf);
  if (out !== file) unlinkSync(file);
  before += size;
  after += buf.length;
  console.log(`${file} ${Math.round(size / 1024)}KB -> ${out} ${Math.round(buf.length / 1024)}KB`);
}
console.log(`total ${Math.round(before / 1e6)}MB -> ${Math.round(after / 1e6)}MB`);
