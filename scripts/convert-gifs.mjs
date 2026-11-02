// Convert animated GIFs to looping MP4 + JPG poster in public/media/.
// usage: npm run media:gifs -- path/to/a.gif [more.gif ...]   (needs ffmpeg)
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import { basename, extname } from 'node:path';

const outDir = 'public/media';
mkdirSync(outDir, { recursive: true });
const ff = (...args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args]);
// H.264 needs even dimensions
const scale = 'scale=trunc(min(iw\\,640)/2)*2:-2';
const vf = `${scale},format=yuv420p`;

for (const gif of process.argv.slice(2)) {
  const out = `${outDir}/${basename(gif, extname(gif))}`;
  const h264 = '-an -c:v libx264 -crf 24 -preset slow -movflags +faststart'.split(' ');
  ff('-i', gif, '-vf', vf, ...h264, `${out}.mp4`);
  ff('-i', gif, '-vf', scale, '-frames:v', '1', '-q:v', '3', `${out}.jpg`);
  const kb = (f) => Math.round(statSync(f).size / 1024);
  console.log(`${basename(gif)} ${kb(gif)}KB -> mp4 ${kb(`${out}.mp4`)}KB`);
}
