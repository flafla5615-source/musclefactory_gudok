import { useEffect, useState } from 'react'
import { formatNumber } from '../lib/format.js'

/**
 * 모바일 하단 고정 CTA.
 * 지점을 선택하면 좌측 표기와 버튼 문구가 그 지점 기준으로 바뀐다.
 *   미선택  → '월 48,900원' / '구독 시작하기'
 *   평거점  → '평거점 · 월 48,900원' / '평거점 구독하기'
 *   보건대점 → '보건대점 · 월 45,000원' / '보건대점 구독하기'
 */
export default function StickyCta({ price, selectedStore, onSubscribe }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // HERO 를 지나면 등장 (첫 화면을 가리지 않도록)
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const label = selectedStore ? `${selectedStore.shortName} 구독하기` : '구독 시작하기'

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
      style={{
        transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,120%,0)',
        transition: 'transform .55s var(--ease-spring)',
        willChange: 'transform',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      aria-hidden={!visible}
    >
      <div
        className="flex items-center gap-3 border-t px-4 py-3"
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          background: 'rgba(13,13,13,0.9)',
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
        }}
      >
        <div className="min-w-0 flex-1">
          {selectedStore && (
            <p className="truncate text-[11px] font-medium text-mute-2">{selectedStore.shortName}</p>
          )}
          <p className="tnum truncate text-[15px] font-black leading-tight text-fog">
            월 <span style={{ color: 'var(--color-accent-soft)' }}>{formatNumber(price)}원</span>
            <span className="ml-1 text-[12px] font-medium text-mute">부터</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onSubscribe}
          tabIndex={visible ? 0 : -1}
          className="btn btn-primary !min-h-[48px] flex-shrink-0 !px-5 text-[14.5px]"
        >
          {label}
          <span className="btn-orb !h-[22px] !w-[22px]">
            <iconify-icon icon="solar:arrow-right-linear" width="13"></iconify-icon>
          </span>
        </button>
      </div>
    </div>
  )
}
