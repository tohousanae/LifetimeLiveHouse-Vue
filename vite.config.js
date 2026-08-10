import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteBasicSslPlugin from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [vue(), vueDevTools(),viteBasicSslPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
