import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  optimizeDeps: {
    exclude: ['send', 'etag', 'destroy', 'mime'] // 排除这些服务器端模块
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      fs: 'path-to-empty-module'
    },
  },
  server: {
    proxy: {
      '/api': {  // 所有 /api 开头的请求都会被代理
        target: 'http://127.0.0.1:9000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 将 /api 前缀删除
      }
    }
  }
})
