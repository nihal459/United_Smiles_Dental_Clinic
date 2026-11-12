import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /<repo-name>/, so production assets need that prefix.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/United_Smiles_Dental_Clinic/' : '/',
}));
