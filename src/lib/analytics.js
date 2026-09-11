/* ══════════════════════════════════════════════════════════════
   GA4 로더
   ──────────────────────────────────────────────────────────────
   ⚠ Measurement ID 를 코드에 하드코딩하거나 임의로 만들지 않는다.
      환경변수 VITE_GA4_ID 로만 주입한다.

   설정하는 곳
     로컬   프로젝트 루트에 .env.local 파일을 만들고
              VITE_GA4_ID=G-XXXXXXXXXX
     배포   Vercel → Settings → Environment Variables 에
              VITE_GA4_ID = G-XXXXXXXXXX  추가 후 재배포

   ID 가 없으면 아무것도 로드하지 않는다. 이벤트는 여전히
   window.dataLayer 에 쌓이므로 GTM 을 쓰더라도 그대로 동작한다.
   (tracking.js 의 track() 참고)
   ══════════════════════════════════════════════════════════════ */

const GA4_ID = import.meta.env.VITE_GA4_ID || null

/** GA4 가 실제로 붙어 있는지 — 보고·디버깅용 */
export const hasGa4 = Boolean(GA4_ID)

let loaded = false

/**
 * gtag.js 를 한 번만 로드한다.
 * ⚠ send_page_view 를 끄지 않는다. 기본 page_view 로 전단 유입 세션 수를 본다.
 *    UTM 은 URL 에 그대로 있으므로 GA4 가 source/medium/campaign 을 자동 인식한다.
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || loaded) return
  if (!GA4_ID) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        '[analytics] VITE_GA4_ID 가 없어 GA4 를 로드하지 않습니다. ' +
          '이벤트는 window.dataLayer 에만 쌓입니다.',
      )
    }
    return
  }

  loaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA4_ID)
}
