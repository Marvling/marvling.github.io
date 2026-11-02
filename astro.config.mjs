import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://marvling.github.io',
  // emit work.html (not work/index.html) so the original URLs keep working
  build: { format: 'file' },
  integrations: [sitemap()],
});
