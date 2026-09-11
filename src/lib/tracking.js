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
  OPTION_SELECT: 'option_select',
  SUBSCRIPTION_CTA_CLICK: 'subscription_cta_click',
  CONSULTATION_CLICK: 'consultation_click',
  SIGNUP_START: 'signup_start',
  SIGNUP_COMPLETE: 'signup_complete',

  /* 오프라인 전단 QR 유입 전용 */
  FLYER_LANDING_VIEW: 'flyer_landing_view',

  /* 바디코디 · 짐서폿 앱스토어로 나간 클릭.
     ⚠ '앱으로 이동한 사람' 이지 '구독권을 구매한 사람' 이 아니다.
        외부 앱의 가입·결제 완료 데이터를 받을 공식 경로가 확인되기 전까지
        purchase / subscription_complete / payment_complete 같은
        결제 완료 이벤트를 임의로 발생시키지 않는다. */
  APP_OUTBOUND_CLICK: 'app_outbound_click',
}

/* ── 오프라인 전단 QR 식별 ──────────────────────────────────
   전단 QR 목적지 = 운영 도메인 + 아래 UTM 3종.
   이 조합으로 들어온 방문만 '전단 QR 유입' 으로 센다.
   인스타 · 네이버 · 직접 유입과 섞이지 않는다. */
export const FLYER_UTM = {
  source: 'offline_flyer',
  medium: 'qr',
  campaign: 'gympass_flyer_202609',
}

/** 이 방문이 전단 QR 로 들어왔는가 (세션 내내 유지된다) */
export function isFlyerTraffic() {
  const utm = getUtm()
  return utm.utm_source === FLYER_UTM.source && utm.utm_medium === FLYER_UTM.medium
}

/**
 * 모든 이벤트에 붙는 유입 구분값.
 *   offline_flyer  전단 QR
 *   instagram / naver / ...  그 외 UTM 이 붙은 유입
 *   direct         UTM 없이 들어온 방문
 * ⚠ 개인정보는 담지 않는다. UTM 값만 쓴다.
 */
export function getTrafficSource() {
  if (isFlyerTraffic()) return FLYER_UTM.source
  return getUtm().utm_source || 'direct'
}

/* 같은 이벤트가 한 세션에서 과도하게 중복 집계되지 않도록 하는 잠금 */
const firedOnce = new Set()

/**
 * 세션 동안 한 번만 보내야 하는 이벤트 (예: 랜딩 유입).
 * key 를 주면 그 단위로 잠근다 (예: 지점+플랫폼 조합당 1회).
 */
export function trackOnce(eventName, payload = {}, key = eventName) {
  if (firedOnce.has(key)) return false
  firedOnce.add(key)
  track(eventName, payload)
  return true
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
    // 지점 상세 · 지점 선택 · 앱 이동까지 유입 구분이 끊기지 않게 항상 붙인다
    traffic_source: getTrafficSource(),
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

/**
 * 앱스토어로 보내기 — 링크는 누를 때마다 열리지만
 * 이벤트는 key(지점+플랫폼) 조합당 세션 1회만 기록한다.
 * 같은 버튼을 여러 번 눌러도 '앱으로 이동한 사람' 수가 부풀지 않는다.
 */
export function openAppStore(url, payload = {}, key) {
  if (!url) return
  trackOnce(EVENTS.APP_OUTBOUND_CLICK, { ...payload, destination: url }, key)
  window.open(withUtm(url), '_blank', 'noopener,noreferrer')
}
