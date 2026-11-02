# marvling.github.io

Sinan Özer's portfolio, live at https://marvling.github.io.

Built with [Astro](https://astro.build) as a static site and deployed to GitHub Pages by GitHub Actions on every push to `master`.

## Setup

Requires Node 24+ (`nvm use`) and, for converting GIFs, ffmpeg.

```sh
npm ci
npm run dev      # http://localhost:4321
npm run verify   # type check, formatting, build, link check
```

## Editing

See [AGENTS.md](AGENTS.md) for where everything lives and step-by-step recipes (adding projects, photos, sketches).

## Libraries

- [PhotoSwipe](https://photoswipe.com) for the lightbox
- [p5.js](https://p5js.org) and [three.js](https://threejs.org) + [lil-gui](https://lil-gui.georgealways.com) for the interactive sketches
- Fonts self-hosted via [Fontsource](https://fontsource.org)
