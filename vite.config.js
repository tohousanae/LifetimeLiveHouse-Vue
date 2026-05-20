import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl";
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: { 
    host: true,
    https: true 
  },
  plugins: [vue(), 
    vueDevTools(),
    viteBasicSslPlugin(),
    mkcert()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
