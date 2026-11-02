// After `astro build`: fail if any internal href/src in dist/*.html is missing,
// or if a URL from the original 2021 site no longer exists.
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const LEGACY =
  `index work work-xanadu work-necro work-settle work-mousehaunt games videos music code
p5-nakit p5-mandalina p5-followers dailies dailies-bestof dailies-20-10 dailies-20-11 dailies-20-12
dailies-21-01 photos photos-birds photos-ibadet photos-textures3`.split(/\s+/);

const missing = [];
for (const page of LEGACY) {
  if (!existsSync(`dist/${page}.html`)) missing.push(`legacy URL /${page}.html`);
}
for (const page of readdirSync('dist').filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(`dist/${page}`, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src|poster|srcset)="([^"]+)"/g)) {
    const path = url.split(/[ ,]/)[0].split(/[?#]/)[0];
    if (!path.startsWith('/') || path.startsWith('//')) continue;
    if (!existsSync(`dist${decodeURI(path)}`)) missing.push(`${page}: ${url}`);
  }
}
if (missing.length) {
  console.error(`Broken links:\n${missing.join('\n')}`);
  process.exit(1);
}
console.log('All internal links resolve.');
