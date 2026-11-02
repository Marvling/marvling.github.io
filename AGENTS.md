# AGENTS.md

Sinan Özer's portfolio. Astro 7 static site → GitHub Pages. No UI framework, no backend, no analytics.

## Commands

- `npm run dev`: local server at http://localhost:4321
- `npm run verify`: type check + prettier + build + link check. Run before committing.
- `npm run format`: prettier write
- `npm run media:optimize -- <files|dirs>`: shrink new images in place (sharp)
- `npm run media:gifs -- <file.gif ...>`: GIF → `public/media/<name>.mp4` + `.jpg` poster (needs ffmpeg)

## Do not read

`src/assets/**`, `public/media/**`, `public/Assets/**` (binary media), `dist/`, `.astro/`, `node_modules/`, `package-lock.json`. To list media, use `ls`.

## Where things live

| To change…                                     | Edit                                                    |
| ---------------------------------------------- | ------------------------------------------------------- |
| Sidebar links, nav order, email, site title    | `src/site.ts`                                           |
| Cards on work/games/code/photos/videos/dailies | `src/content/<section>.yaml` (file order = grid order)  |
| Card fields and validation                     | `src/content.config.ts`                                 |
| Project page (`work-<id>.html`)                | `src/content/projects/<id>.md`                          |
| Intro text on dailies/videos, music embed      | `src/pages/dailies.astro`, `videos.astro`, `music.astro` |
| Colours, sizes, layout, mobile rules           | `src/styles/global.css` (tokens at top)                 |
| `<head>` metadata, page shell                  | `src/layouts/Base.astro`                                |
| Card rendering / caption layout                | `src/components/Card.astro`, `captionOf` in `src/lib.ts` |
| p5 / three.js sketches                         | `src/sketches/<name>.ts`                                |

## How pages are generated

- A card **without `href`** links to its own generated page (`hrefFor` in `src/lib.ts`):
  work → `work-<id>.html`, photos → `photos-<id>.html`, dailies → `dailies-<id>.html`, code → `p5-<id>.html`.
- Galleries list every image in `src/assets/<section>/<id>/` by file name (dailies newest first).
  Adding photos to an existing series needs no code change.
- Card media: `cover:` is an image path relative to the YAML file; `video:` is a name in `public/media/`.
  `embed: true` opens a YouTube/Vimeo `href` in the lightbox instead of navigating.
- URLs end in `.html` (`build.format: 'file'`) to keep the original 2021 URLs working.
  `scripts/check-links.mjs` fails the build if one disappears.

## Recipes

- **Add a work project with its own page:** add an entry without `href` to `src/content/work.yaml`,
  create `src/content/projects/<id>.md` (copy `settle.md`), put images in `src/assets/work/<id>/` and
  set `gallery: work/<id>`.
- **Add a photo series:** create `src/assets/photos/<id>/`, run `media:optimize` on it, add an entry
  without `href` to `src/content/photos.yaml`.
- **Add a daily render month:** create `src/assets/dailies/<yy-mm>/`, add an entry to
  `src/content/dailies.yaml`; map image names to Vimeo URLs under `videos:`.
- **Add a p5 sketch:** create `src/sketches/<id>.ts` exporting `default (el: HTMLElement) => void`
  (use `import p5 from './lib/p5'`), add a `code.yaml` entry with that `id` and no `href`.
- **Add a nav link:** append to `nav` in `src/site.ts`.

## Conventions

- Keep the current visual design. Visible copy is the owner's own words: keep typos unless asked.
- Static pages ship zero JS. Scripts live only in components that need them (lightbox, video thumbs, sketches).
- No third-party requests before user interaction: embeds are click-to-load, fonts are self-hosted.
- `src/sketches/lib/p5.ts` is a slim p5 build. If a sketch uses a missing p5 function, register that
  module there (or use plain JS).
- Comments explain why, not what. Prettier formats everything (`npm run format`).
