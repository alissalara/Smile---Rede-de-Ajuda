import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: false,

  build: {
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      input: [
        'html/index.html',
        'html/cadastro.html'
      ]
    }
  }
});