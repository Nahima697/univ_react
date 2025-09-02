import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
   plugins: [react(), mkcert()],
     server: {
     https: true as any,
    host: 'localhost',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
