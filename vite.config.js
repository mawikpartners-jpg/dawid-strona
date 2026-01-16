import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        recenze: resolve(__dirname, 'recenze.html'),
        galeria: resolve(__dirname, 'galeria.html')
      }
    }
  }
});
