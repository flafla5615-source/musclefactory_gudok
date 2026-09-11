import { useState } from 'react'
import { openAppStore } from '../lib/tracking.js'
import {
  appCtaLabel,
  detectPlatform,
  getAppInfo,
  storeUrlFor,
} from '../lib/appstore.js'

/**
 * 지점 선택 후 메인 전환버튼 — 그 지점이 쓰는 앱으로 보낸다.
 *
 * 모바일  기기(iOS/Android)를 감지해 해당 스토어로 바로 이동
 * PC      한 번 누르면 App Store / Google Play 를 직접 고르게 한다
 *         (검증된 스토어 URL 외에 deep link 를 만들지 않기 때문)
 *
 * ⚠ 앱명·URL 은 stores.js usageGuide 에서만 온다. 여기에 하드코딩하지 않는다.
 * ⚠ 앱스토어 링크가 없는 지점이면 아무것도 렌더링하지 않는다 (fallback 버튼은
 *    부모가 담당한다).
 */
export default function AppCta({ store, className = 'btn btn-primary' }) {
  const [openChooser, setOpenChooser] = useState(false)

  const appInfo = getAppInfo(store)
  if (!appInfo) return null

  const platform = detectPlatform()
  const directUrl = storeUrlFor(appInfo, platform)
  const label = appCtaLabel(appInfo)

  /* ⚠ '앱스토어로 나갔다' 까지만 기록한다.
     실제 가입·결제 완료는 외부 앱 데이터라 여기서 알 수 없다. */
  const go = (url, key) =>
    openAppStore(
      url,
      {
        store_id: store.id,
        store_name: store.name,
        app_type: appInfo.appType,
        platform: key,
        source: 'selected-store',
      },
      `app_outbound:${store.id}:${key}`,
    )

  // 모바일 — 바로 해당 스토어로
  if (directUrl) {
    return (
      <button type="button" onClick={() => go(directUrl, platform)} className={className}>
        {label}
      </button>
    )
  }

  // PC — 스토어를 직접 고르게 한다
  const options = [
    appInfo.ios && { key: 'ios', label: 'App Store', icon: 'solar:smartphone-linear', url: appInfo.ios },
    appInfo.android && {
      key: 'android',
      label: 'Google Play',
      icon: 'solar:play-circle-linear',
      url: appInfo.android,
    },
  ].filter(Boolean)

  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={() => {
          setOpenChooser((v) => !v)
          track(EVENTS.SUBSCRIPTION_CTA_CLICK, { store_id: store.id, app: appInfo.appType })
        }}
        aria-expanded={openChooser}
        className={className}
      >
        {label}
        <iconify-icon
          icon="solar:alt-arrow-down-linear"
          width="15"
          style={{
            transform: openChooser ? 'rotate(180deg)' : 'none',
            transition: 'transform .4s var(--ease-spring)',
          }}
        ></iconify-icon>
      </button>

      <div hidden={!openChooser} className={options.length > 1 ? 'grid grid-cols-2 gap-2.5' : ''}>
        {options.map((o) => (
          <button key={o.key} type="button" onClick={() => go(o.url, o.key)} className="btn btn-line">
            <iconify-icon icon={o.icon} width="16"></iconify-icon>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
