// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://net-notes.pages.dev', // Boleh diganti nanti kalau udah punya domain sendiri
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [expressiveCode(), mdx(), sitemap()]
});