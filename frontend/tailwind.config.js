/** @type {import('tailwindcss').Config} */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          900: '#064e3b',
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

}