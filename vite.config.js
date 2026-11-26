import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  // Pages: home (/), About (/about/) and Gallery (/gallery/), sharing the same app code.
  build: { rollupOptions: { input: { main: 'index.html', about: 'about/index.html', gallery: 'gallery/index.html' } } },
});
