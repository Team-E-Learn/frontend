import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Preprocessing for Svelte components
  preprocess: vitePreprocess(),

  // SvelteKit configuration
  kit: {
    adapter: adapter(),
    files: {
      routes: 'src/routes', // Custom routes folder location (optional)
    },
  }
};

export default config;
