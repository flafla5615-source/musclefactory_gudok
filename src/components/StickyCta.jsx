import { useEffect, useState } from 'react'
import { formatNumber } from '../lib/format.js'
import {
  PICK_STORE_CTA_LABEL,
  appCtaShortLabel,
  detectPlatform,
  getAppInfo,
  storeUrlFor,
} from '../lib/appstore.js'
import { openAppStore } from '../lib/tracking.js'

/**
 * 하단 고정 CTA — 지점·상품·옵션 선택 state 를 그대로 반영한다.
 * 어떤 조합에서도 bar 전체 높이(76px)가 바뀌지 않는다.
 *
 *   미선택      → 월 48,900원부터        / 내 지점 선택하기
 *   시청점      → 시청점 · 월 48,900원    / 짐서폿에서 시작하기
 *   평거점      → 평거점 · 월 48,900원    / 바디코디에서 시작하기
 *
 * 버튼 문구는 선택 지점의 앱(stores.js usageGuide)에서 온다. 하드코딩하지 않는다.
 * 모바일 바(lg:hidden)이므로 기기 감지 결과대로 해당 스토어로 바로 보낸다.
 * 데스크톱 폭에서 열렸을 때만 상세영역의 스토어 선택 UI 로 안내한다.
 */
const BAR_HEIGHT = 76

export default function StickyCta({ store, quote, onSubscribe }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 상단 보조 라인 — 지점 + (월 구독이 아닌 상품일 때만) 상품명
  const context = store
    ? quote.product.id === 'monthly'
      ? store.name
      : `${store.name} · ${quote.product.name}`
    : null

  const appInfo = getAppInfo(store)
  const label = store
    ? appInfo
      ? appCtaShortLabel(appInfo)
      : `${store.shortName} 시작하기`
    : PICK_STORE_CTA_LABEL
  const amount = quote.calculable ? quote.total : quote.basePrice

  const handleClick = () => {
    if (!appInfo) return onSubscribe()
    const url = storeUrlFor(appInfo, detectPlatform())
    if (url) {
      const pf = detectPlatform()
      return openAppStore(
        url,
        {
          store_id: store.id,
          store_name: store.name,
          app_type: appInfo.appType,
          platform: pf,
          source: 'sticky',
        },
        `app_outbound:${store.id}:${pf}`,
      )
    }
    // 스토어를 특정할 수 없으면(데스크톱) 상세영역의 선택 UI 로 보낸다
    document.getElementById('selected-store')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
      style={{
        transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,120%,0)',
        transition: 'transform .5s var(--ease-spring)',
        willChange: 'transform',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      aria-hidden={!visible}
    >
      <div
        className="flex items-center gap-3 border-t px-5"
        style={{
          height: `${BAR_HEIGHT}px`,
          borderColor: 'var(--color-line)',
          background: 'rgba(13,13,13,0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex min-w-0 flex-1 flex-col justify-center" style={{ height: '40px' }}>
          <span className="truncate text-[11px] leading-[14px] text-mute-2">{context || ' '}</span>
          <span className="tnum truncate text-[15px] font-bold leading-[20px] text-fog">
            {amount === null ? (
              <span className="text-mute">가격 추후 공개</span>
            ) : (
              <>
                월 <span style={{ color: 'var(--color-accent-soft)' }}>{formatNumber(amount)}원</span>
                {!store && <span className="ml-1 text-[12px] font-medium text-mute">부터</span>}
              </>
            )}
          </span>
        </div>

        <button
          type="button"
          onClick={handleClick}
          tabIndex={visible ? 0 : -1}
          className="btn btn-primary btn-auto flex-shrink-0 !px-5 !text-[14px]"
        >
          {label}
        </button>
      </div>
    </div>
  )
}
