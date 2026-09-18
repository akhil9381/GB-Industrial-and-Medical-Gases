import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        about: 'pages/about.html',
        products: 'pages/products.html',
        contact: 'pages/contact.html'
      }
    }
  }
});
