// Vite 설정 — React + Tailwind CSS v4 플러그인
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const page = (p) => fileURLToPath(new URL(p, import.meta.url))

/* ══════════════════════════════════════════════════════════════
   멀티 페이지 빌드
   ──────────────────────────────────────────────────────────────
   메인 랜딩(/) + 공식 지원페이지 5개.

   지원페이지를 SPA 라우터가 아니라 각각 독립 HTML 로 빌드하는 이유
     · 앱스토어 · 구글 플레이 심사에 제출하는 URL 이라
       외부에서 주소를 직접 입력해도 404 없이 열려야 한다
     · 페이지마다 <title> / description / canonical 이 실제 HTML 에 들어가야 한다
     · 메인 랜딩의 OG · 카카오 공유 설정을 건드리지 않고 분리할 수 있다

   dist/support/index.html → https://…/support 로 서빙된다.
   경로를 추가·변경하면 해당 폴더의 index.html, src/entries/*.jsx,
   src/data/support.js 의 SUPPORT_LINKS 를 함께 맞춘다.
   ══════════════════════════════════════════════════════════════ */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5175, strictPort: true },
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        support: page('./support/index.html'),
        terms: page('./terms/index.html'),
        privacy: page('./privacy/index.html'),
        accountDeletion: page('./account-deletion/index.html'),
        subscriptionCancel: page('./subscription-cancel/index.html'),
      },
    },
  },
})
