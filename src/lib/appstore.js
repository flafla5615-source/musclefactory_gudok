/* ══════════════════════════════════════════════════════════════
   지점별 앱 연결
   ──────────────────────────────────────────────────────────────
   지점마다 사용하는 앱이 다르다.
     짐플릭스 시청점 → 짐서폿
     그 외 전 지점   → 바디코디

   ⚠ 앱 이름·앱스토어 URL 은 전부 stores.js 의 usageGuide 에서만 온다.
      컴포넌트에 앱명이나 URL 을 하드코딩하지 않는다.
   ⚠ 검증된 앱스토어 URL 외에 deep link · 지점 자동선택 URL 을
      임의로 만들지 않는다.
   ══════════════════════════════════════════════════════════════ */

/**
 * 이 지점의 앱 정보. 앱스토어 링크가 하나도 없으면 null 을 돌려준다.
 * @returns {{ appName: string|null, appType: string|null, ios: string|null, android: string|null }|null}
 */
export function getAppInfo(store) {
  const guide = store?.usageGuide
  const ios = guide?.appStore?.ios || null
  const android = guide?.appStore?.android || null
  if (!ios && !android) return null

  return {
    appName: guide.appName || null,
    appType: guide.appType || null,
    ios,
    android,
  }
}

/**
 * 사용자 기기 구분. 모바일이면 바로 해당 스토어로 보내고,
 * PC 면 App Store / Google Play 를 직접 고르게 한다.
 * @returns {'ios'|'android'|'desktop'}
 */
export function detectPlatform() {
  if (typeof navigator === 'undefined') return 'desktop'
  const ua = navigator.userAgent || ''

  // iPadOS 13+ 는 Macintosh 로 보고되므로 터치 여부로 구분한다
  const isIpad = /Macintosh/.test(ua) && typeof document !== 'undefined' && navigator.maxTouchPoints > 1
  if (/iPhone|iPad|iPod/.test(ua) || isIpad) return 'ios'
  if (/Android/.test(ua)) return 'android'
  return 'desktop'
}

/** 해당 플랫폼의 스토어 URL. 없으면 남은 쪽으로 대체한다. */
export function storeUrlFor(appInfo, platform) {
  if (!appInfo) return null
  if (platform === 'ios') return appInfo.ios || appInfo.android
  if (platform === 'android') return appInfo.android || appInfo.ios
  return null
}

/* ── CTA 문구 ───────────────────────────────────────────────
   ⚠ '앱 설치' 처럼 목적이 불분명한 문구를 쓰지 않는다.
      구독하러 가는 버튼이라는 것이 문구에서 바로 보여야 한다. */

/** '바디코디 앱에서 구독하기' */
export function appCtaLabel(appInfo) {
  return appInfo?.appName ? `${appInfo.appName} 앱에서 구독하기` : '앱에서 구독하기'
}

/** 하단 고정 CTA 용 짧은 문구 — '바디코디에서 구독하기' */
export function appCtaShortLabel(appInfo) {
  return appInfo?.appName ? `${appInfo.appName}에서 구독하기` : '앱에서 구독하기'
}

/** 앱스토어로 보내는 버튼 — 설치가 목적이 아니라 구독이 목적임을 밝힌다 */
export const INSTALL_CTA_LABEL = '앱 설치하고 구독하기'

/** 지점 선택 전 메인 CTA */
export const PICK_STORE_CTA_LABEL = '내 지점 선택하고 구독하기'

/** 구독 흐름 요약 — HERO 에서 한 줄로 보여준다 */
export const SUBSCRIBE_FLOW_SUMMARY = ['앱 설치', '회원가입', '구독권 구매', 'QR로 입장']
