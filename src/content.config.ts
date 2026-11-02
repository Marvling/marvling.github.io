import { defineCollection, type SchemaContext } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

// Astro sorts entries by id, so record each entry's position in the file as `order`.
const inFileOrder = (text: string) =>
  (parse(text) as Record<string, unknown>[]).map((entry, order) => ({ ...entry, order }));
const yamlList = (name: string) => file(`src/content/${name}.yaml`, { parser: inFileOrder });

// A grid card. Without `href` it links to its own generated page (see hrefFor in src/lib.ts).
const card = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    tags: z.array(z.string()).default([]),
    year: z.number().optional(),
    href: z.string().optional(),
    cover: image().optional(), // path relative to the YAML file
    video: z.string().optional(), // name of public/media/<video>.mp4 (+ .jpg poster)
    embed: z.boolean().default(false), // open href (YouTube/Vimeo) in the lightbox
    order: z.number(), // set automatically from position in the YAML file
  });

const cards = (name: string) => defineCollection({ loader: yamlList(name), schema: card });

const dailies = defineCollection({
  loader: yamlList('dailies'),
  schema: (ctx) =>
    card(ctx).extend({
      videos: z.record(z.string(), z.string()).default({}), // image name -> Vimeo URL
      picks: z.array(z.string()).optional(), // "20-10/20-10-20" style picks instead of a folder
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      media: z
        .array(
          z.object({
            label: z.string().optional(),
            href: z.string().optional(),
            video: z.string().optional(),
            cover: image().optional(),
            embed: z.boolean().default(false),
          }),
        )
        .default([]),
      // shown beside the first media card, e.g. credits or production facts
      credits: z
        .array(
          z.object({
            heading: z.string(),
            items: z.array(z.union([z.string(), z.object({ text: z.string(), href: z.string() })])),
          }),
        )
        .default([]),
      gallery: z.string().optional(), // folder under src/assets
      sketch: z.string().optional(), // module in src/sketches
    }),
});

export const collections = {
  work: cards('work'),
  games: cards('games'),
  code: cards('code'),
  videos: cards('videos'),
  photos: cards('photos'),
  dailies,
  projects,
};
