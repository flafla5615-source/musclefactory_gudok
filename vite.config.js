// Vite 설정 — React + Tailwind CSS v4 플러그인
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5175, strictPort: true },
})
