// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress warnings about unused imports from Astro internals
          if (warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
              warning.message.includes('@astrojs/internal-helpers')) {
            return;
          }
          warn(warning);
        }
      }
    }
  },

  integrations: [react()]
});