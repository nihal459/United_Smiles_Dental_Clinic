import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  // Two pages: home (/) and About (/about/), sharing the same app code.
  build: { rollupOptions: { input: { main: 'index.html', about: 'about/index.html' } } },
});
