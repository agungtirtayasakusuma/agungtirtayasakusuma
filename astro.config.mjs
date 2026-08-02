// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://net-notes.pages.dev',

  // Prefetch is what makes the page-to-page jump feel instant.
  // 'viewport' = fetch a route's HTML as soon as its link scrolls into view,
  // so by the time the NextHop block is on screen the next page is already
  // in memory and the transition has nothing to wait for.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [expressiveCode(), mdx(), sitemap()],
});
