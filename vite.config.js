import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import { env } from 'process';
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslint from 'vite-plugin-eslint'
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

export default defineConfig({
  plugins: [
    vuePlugin(),
    vueJsx({}),
    eslint(),
  ],
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
