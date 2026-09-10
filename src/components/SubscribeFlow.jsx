import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'
import { SUBSCRIPTION_STORES } from '../data/stores.js'
import { DEFAULT_USAGE_GUIDE } from '../data/content.js'
import { formatNumber } from '../lib/format.js'
import { BASE_MONTHLY_PRICE } from '../data/products.js'
import { monthlyPriceFor } from '../lib/format.js'
import { EVENTS, openChannel, track } from '../lib/tracking.js'
import {
  INSTALL_CTA_LABEL,
  detectPlatform,
  getAppInfo,
  storeUrlFor,
} from '../lib/appstore.js'

/**
 * 구독 전환 시트 — 이 랜딩의 유일한 '구독하는 곳'.
 *
 *   1단계  이용할 지점 선택
 *   2단계  그 지점이 쓰는 앱 안내 + 설치(모바일) 또는 QR(PC)
 *
 * ⚠ 지점명·앱명·절차·앱스토어 URL 을 JSX 에 하드코딩하지 않는다.
 *    전부 stores.js 의 store / usageGuide 에서 읽는다.
 *    지점명을 비교해서 앱을 고르는 분기를 만들지 않는다.
 *
 * ⚠ 모바일은 자기 화면의 QR 을 자기 폰으로 못 찍는다.
 *    → 모바일: 기기 OS 를 감지해 해당 앱스토어로 바로 보낸다.
 *    → PC:     실제 앱스토어 URL 로 만든 QR 을 보여준다.
 *
 * ⚠ 검증된 App Store / Google Play URL 외에 deep link 를 만들지 않는다.
 */
export default function SubscribeFlow({ open, onClose, initialStore = null, onPickStore }) {
  const [store, setStore] = useState(initialStore)
  const [qr, setQr] = useState(null)

  // 시트를 열 때마다 시작 지점을 맞춘다 (지점 상세에서 열면 그 지점부터)
  useEffect(() => {
    if (open) setStore(initialStore)
  }, [open, initialStore])

  // 배경 스크롤 잠금 + ESC 로 닫기
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const appInfo = useMemo(() => getAppInfo(store), [store])
  const platform = detectPlatform()
  const isMobile = platform === 'ios' || platform === 'android'
  const directUrl = storeUrlFor(appInfo, platform)

  // PC 에서만 QR 을 만든다. 실제 앱스토어 URL 을 그대로 인코딩한다 (장식용 QR 금지)
  const qrTarget = appInfo ? appInfo.android || appInfo.ios : null
  useEffect(() => {
    if (!open || isMobile || !qrTarget) {
      setQr(null)
      return
    }
    let alive = true
    QRCode.toDataURL(qrTarget, {
      width: 440,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#0d0d0d', light: '#ffffff' },
    })
      .then((url) => alive && setQr(url))
      .catch(() => alive && setQr(null))
    return () => {
      alive = false
    }
  }, [open, isMobile, qrTarget])

  if (!open) return null

  const guide = store?.usageGuide || {}
  const steps =
    Array.isArray(guide.steps) && guide.steps.length > 0 ? guide.steps : DEFAULT_USAGE_GUIDE.steps
  const appName = appInfo?.appName || null

  const pick = (s) => {
    setStore(s)
    onPickStore?.(s)
    track(EVENTS.STORE_SELECT, { store_id: s.id, store_name: s.name, source: 'subscribe-flow' })
  }

  const go = (url, key) =>
    openChannel(url, EVENTS.SIGNUP_START, {
      store_id: store.id,
      app: appInfo?.appType ?? null,
      platform: key,
      source: 'subscribe-flow',
    })

  const storeButtons = [
    appInfo?.ios && { key: 'ios', label: 'App Store', icon: 'solar:smartphone-linear', url: appInfo.ios },
    appInfo?.android && {
      key: 'android',
      label: 'Google Play',
      icon: 'solar:play-circle-linear',
      url: appInfo.android,
    },
  ].filter(Boolean)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="지점 선택하고 구독하기"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        style={{ background: 'rgba(6,6,6,0.75)' }}
      />

      <div
        className="relative w-full max-w-[480px] overflow-hidden rounded-t-[20px] border md:rounded-[20px]"
        style={{
          borderColor: 'var(--color-line)',
          background: 'var(--color-surface)',
          maxHeight: '88dvh',
        }}
      >
        {/* 헤더 — 2단계에서는 지점을 다시 고를 수 있게 뒤로가기를 둔다 */}
        <div className="flex items-center justify-between gap-3 px-5 pt-5">
          <div className="flex min-w-0 items-center gap-2">
            {store && (
              <button
                type="button"
                onClick={() => setStore(null)}
                aria-label="지점 다시 선택"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-mute"
              >
                <iconify-icon icon="solar:alt-arrow-left-linear" width="20"></iconify-icon>
              </button>
            )}
            <h2 className="truncate text-[18px] font-bold tracking-[-0.02em] text-fog">
              {store ? `${appName ?? '앱'}에서 구독하기` : '어느 지점을 이용하시나요?'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-mute"
          >
            <iconify-icon icon="solar:close-circle-linear" width="21"></iconify-icon>
          </button>
        </div>

        <div
          className="overflow-y-auto px-5 pt-3"
          style={{
            maxHeight: 'calc(88dvh - 76px)',
            paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
          }}
        >
          {!store ? (
            /* ── 1단계 : 지점 선택 ─────────────────────────── */
            <>
              <p className="t-body">
                지점을 선택하면
                <br />
                구독할 수 있는 앱으로 바로 안내해드려요.
              </p>

              <ul className="mt-5 flex flex-col gap-2">
                {SUBSCRIPTION_STORES.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => pick(s)}
                      className="card w-full !flex-row !items-center !gap-3 !p-3 text-left"
                    >
                      <div className="media !aspect-auto !h-[52px] !w-[52px] flex-shrink-0 !rounded-[9px]">
                        {s.thumbImage ? (
                          <img src={s.thumbImage} alt="" loading="lazy" decoding="async" />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-mute-2">
                            <iconify-icon icon="solar:gallery-linear" width="16"></iconify-icon>
                          </span>
                        )}
                      </div>

                      <span className="min-w-0 flex-1">
                        <span className="t-label block" style={{ color: s.brand.color }}>
                          {s.brand.key}
                        </span>
                        <span className="mt-0.5 block truncate text-[14.5px] font-bold text-fog">
                          {s.name}
                        </span>
                        <span className="tnum mt-0.5 block text-[12.5px] font-semibold text-mute">
                          월 {formatNumber(monthlyPriceFor(s, BASE_MONTHLY_PRICE))}원
                        </span>
                      </span>

                      <iconify-icon
                        icon="solar:alt-arrow-right-linear"
                        width="16"
                        style={{ color: 'var(--color-mute-2)', flexShrink: 0 }}
                      ></iconify-icon>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            /* ── 2단계 : 이 지점은 어떤 앱으로 구독하나 ────────── */
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip chip-quiet">{store.name}</span>
                {appName && <span className="chip chip-accent">{appName} APP</span>}
              </div>

              <p className="mt-4 text-[15px] font-bold leading-relaxed text-fog">
                {appName ? `${appName} 앱에서 바로 구독하세요.` : '앱에서 바로 구독하세요.'}
              </p>

              <p className="tnum mt-1.5 text-[13px] font-semibold text-mute">
                월 {formatNumber(monthlyPriceFor(store, BASE_MONTHLY_PRICE))}원
              </p>

              {/* 절차 — stores.js usageGuide.steps 그대로 */}
              <ol className="mt-4">
                {steps.map((step, i) => (
                  <li key={step} className="inforow">
                    <span className="tnum !flex-[0_0_32px] font-display text-[13px] font-semibold text-mute-2">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="!flex-1 text-[14px] font-medium leading-relaxed text-fog">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              {isMobile ? (
                /* 모바일 — 기기에 맞는 앱스토어로 바로 */
                <div className="card-foot flex flex-col gap-2.5">
                  {directUrl ? (
                    <button
                      type="button"
                      onClick={() => go(directUrl, platform)}
                      className="btn btn-primary"
                    >
                      {INSTALL_CTA_LABEL}
                    </button>
                  ) : (
                    <p className="t-caption">이 지점의 앱 설치 안내는 준비 중입니다.</p>
                  )}
                </div>
              ) : (
                /* PC — 실제 앱스토어 URL 로 만든 QR */
                <div className="card-foot">
                  {qr ? (
                    <div className="flex flex-col items-center">
                      <div className="rounded-[14px] bg-white p-3">
                        <img
                          src={qr}
                          alt={`${appName ?? '앱'} 설치 QR 코드`}
                          width="176"
                          height="176"
                          style={{ display: 'block', width: '176px', height: '176px' }}
                        />
                      </div>
                      <p className="mt-3 text-center text-[13.5px] leading-relaxed text-mute">
                        휴대폰 카메라로 QR을 스캔해
                        <br />
                        {appName ?? '앱'} 앱을 설치해주세요.
                      </p>
                    </div>
                  ) : (
                    <p className="t-caption">QR을 준비하고 있습니다.</p>
                  )}

                  {storeButtons.length > 0 && (
                    <div
                      className={`mt-4 grid gap-2.5 ${storeButtons.length > 1 ? 'grid-cols-2' : ''}`}
                    >
                      {storeButtons.map((b) => (
                        <button
                          key={b.key}
                          type="button"
                          onClick={() => go(b.url, b.key)}
                          className="btn btn-line"
                        >
                          <iconify-icon icon={b.icon} width="16"></iconify-icon>
                          {b.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {guide.note && <p className="mt-4 t-caption">{guide.note}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
