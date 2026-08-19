/* ══════════════════════════════════════════════════════════════
   전환 추적 레이어
   ──────────────────────────────────────────────────────────────
   광고 유입 → 랜딩 방문 → 상품 선택 → 지점 선택 → CTA 클릭 → 상담/가입

   실제 Tracking ID 는 제공되지 않았으므로 임의 ID 를 생성하지 않는다.
   index.html 에 Meta Pixel / GA4 / 네이버 전환스크립트 스니펫만 붙이면
   아래 track() 이 자동으로 감지해서 이벤트를 함께 전달한다.
   ══════════════════════════════════════════════════════════════ */

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
  'n_media', // 네이버 검색광고
  'n_ad_group',
  'n_keyword',
]

const STORAGE_KEY = 'rc_gudok_utm'

/** 표준 이벤트 이름 — 문자열 오타 방지용 */
export const EVENTS = {
  LANDING_VIEW: 'landing_view',
  PRODUCT_VIEW: 'product_view',
  PRODUCT_SELECT: 'product_select',
  STORE_SELECT: 'store_select',
  SUBSCRIPTION_CTA_CLICK: 'subscription_cta_click',
  CONSULTATION_CLICK: 'consultation_click',
  SIGNUP_START: 'signup_start',
  SIGNUP_COMPLETE: 'signup_complete',
}

/** URL 의 UTM 파라미터를 세션 동안 보존한다 */
export function captureUtm() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const incoming = {}
  UTM_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) incoming[key] = value
  })

  if (Object.keys(incoming).length > 0) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(incoming))
    } catch {
      /* 시크릿 모드 등 storage 차단 환경 — 추적만 생략하고 페이지는 정상 동작 */
    }
    return incoming
  }
  return getUtm()
}

/** 보존된 UTM 파라미터 조회 */
export function getUtm() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

/**
 * 외부 링크(네이버 플레이스 · 카카오 · 신청폼)로 이동할 때 UTM 을 이어붙인다.
 * 지도/SNS 처럼 파라미터를 무시하는 도메인에서도 부작용이 없다.
 */
export function withUtm(url) {
  if (!url) return url
  const utm = getUtm()
  if (Object.keys(utm).length === 0) return url
  try {
    const parsed = new URL(url, window.location.origin)
    Object.entries(utm).forEach(([key, value]) => {
      if (!parsed.searchParams.has(key)) parsed.searchParams.set(key, value)
    })
    return parsed.toString()
  } catch {
    return url
  }
}

/**
 * 이벤트 전송.
 * dataLayer(GTM) 에 항상 push 하고, fbq / gtag 가 로드되어 있으면 함께 전달한다.
 */
export function track(eventName, payload = {}) {
  if (typeof window === 'undefined') return

  const data = {
    event: eventName,
    ...payload,
    ...getUtm(),
    page_path: window.location.pathname,
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(data)

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, data)
  }
  if (typeof window.fbq === 'function') {
    // Meta 표준 이벤트에 없는 이름은 trackCustom 으로 보낸다
    window.fbq('trackCustom', eventName, data)
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[track]', eventName, data)
  }
}

/** 새 탭으로 외부 채널 열기 (UTM 유지 + 이벤트 전송) */
export function openChannel(url, eventName, payload = {}) {
  if (!url) return
  track(eventName, { ...payload, destination: url })
  window.open(withUtm(url), '_blank', 'noopener,noreferrer')
}
