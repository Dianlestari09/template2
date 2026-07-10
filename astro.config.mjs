import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import siteConfig from './src/site.config.ts';

// https://astro.build/config
export default defineConfig({
  // Vercel deployment settings
  site: 'https://your-vercel-domain.vercel.app',
  integrations: [mdx(), ...(siteConfig.features.sitemap ? [sitemap()] : [])],
  adapter: vercel(),
  output: 'server',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    format: ['avif', 'webp']
  },
  // Markdown is handled by Sätteri (Astro 7 default). GFM — tables, task
  // lists, footnotes — is enabled out of the box, so no config is needed.
  server: {
    port: 3000,
    host: true
  },
  devToolbar: {
    enabled: true
  }
});