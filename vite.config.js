import { defineConfig } from 'vite';

export default defineConfig({
  // Base public path when served in development or production.
  base: '/',
  
  server: {
    // Port to run the dev server on
    port: 3000,
    // Automatically open the app in the browser on server start
    open: true,
  },
  
  build: {
    // Directory to output the build files
    outDir: 'dist',
    // Whether to minify the output
    minify: true,
  }
});
