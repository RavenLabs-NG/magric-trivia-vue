import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const env = loadEnv(process.env.MODE, process.cwd(), '');
// https://vitejs.dev/config/
export default defineConfig({
  
  server: {
    proxy: {
      '/api/v1': {
        target:  env.VITE_API_BASE_URL,
        changeOrigin: true,
      }
    }
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
