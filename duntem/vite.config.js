import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/',
  proxy: {
    '/df': {
      target: 'https://api.neople.co.kr', // 실제 API 서버의 주소
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/df/, '') // 경로에서 '/df' 부분을 제거
    }
  }
})
