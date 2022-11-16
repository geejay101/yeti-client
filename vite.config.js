import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { env } from 'process';
import vueJsx from '@vitejs/plugin-vue2-jsx'
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

export default defineConfig({
  plugins: [createVuePlugin(), vueJsx({})],
  server: {
    port: 8080,
    proxy: {
      '/api': {
           target: env.API_URL,
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, ''),
           secure: false,      
           ws: true,
       }
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  build: {
    chunkSizeWarningLimit: 600,
    cssCodeSplit: false,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
