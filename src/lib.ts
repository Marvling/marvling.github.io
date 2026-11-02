import type { ImageMetadata } from 'astro';

type Card = {
  id: string;
  data: { title: string; subtitle?: string; tags: string[]; year?: number; href?: string };
};

// Cards without an href link to their own generated page.
const pagePrefix = { work: 'work', photos: 'photos', dailies: 'dailies', code: 'p5' } as const;

export function hrefFor(collection: string, card: Card): string {
  if (card.data.href) return card.data.href;
  const prefix = pagePrefix[collection as keyof typeof pagePrefix];
  if (!prefix) throw new Error(`${collection}/${card.id} needs an href`);
  return `/${prefix}-${card.id}.html`;
}

// Caption groups, rendered with a gap between groups.
export function captionOf({ data }: Card): string[][] {
  return [[data.title, data.subtitle], data.tags, [data.year?.toString()]]
    .map((group) => group.filter((line): line is string => !!line))
    .filter((group) => group.length);
}

const assets = import.meta.glob<{ default: ImageMetadata }>('./assets/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

export type NamedImage = { name: string; image: ImageMetadata };

// Images in src/assets/<folder>/, sorted by file name. Files named cover.* are skipped.
export function imagesIn(folder: string): NamedImage[] {
  const prefix = `./assets/${folder}/`;
  const found = Object.entries(assets)
    .filter(([path]) => path.startsWith(prefix) && !path.slice(prefix.length).includes('/'))
    .map(([path, mod]) => ({ name: baseName(path), image: mod.default }))
    .filter(({ name }) => name !== 'cover')
    .sort((a, b) => a.name.localeCompare(b.name));
  if (!found.length) throw new Error(`No images in src/assets/${folder}/`);
  return found;
}

// Look up one image by "folder/name" (no extension).
export function imageAt(ref: string): NamedImage {
  const folder = ref.slice(0, ref.lastIndexOf('/'));
  const hit = imagesIn(folder).find(({ name }) => `${folder}/${name}` === ref);
  if (!hit) throw new Error(`Image not found: src/assets/${ref}.*`);
  return hit;
}

const baseName = (path: string) => path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));

// Privacy-friendly iframe URL for a YouTube or Vimeo link.
export function embedSrc(url: string): string {
  const yt = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1`;
  throw new Error(`Not an embeddable video URL: ${url}`);
}
