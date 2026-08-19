import { useEffect, useState } from 'react'
import { formatNumber } from '../lib/format.js'

/**
 * 하단 고정 CTA.
 * 선택 상태를 반영하되, 어떤 조합에서도 bar 전체 높이가 바뀌지 않는다.
 * (좌측 텍스트 블록 높이를 고정하고 지점명은 한 줄로 잘라낸다)
 *
 *   미선택      → 월 48,900원부터        / 내 지점 선택하기
 *   평거점      → 올드짐 평거 · 월 48,900원 / 평거점 구독하기
 *   보건대점    → 보건대점 · 월 45,000원   / 보건대점 구독하기
 *   전지점 상품 → 전지점 구독 · 월 59,900원 / 구독 시작하기
 */
const BAR_HEIGHT = 76

export default function StickyCta({ price, priceUnit, selectedStore, selectedProduct, onSubscribe }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 상단 보조 라인: 선택한 상품 또는 지점
  const context =
    selectedProduct && selectedProduct.id !== 'monthly'
      ? selectedProduct.name
      : selectedStore
        ? selectedStore.name
        : null

  const label = selectedStore ? `${selectedStore.shortName} 구독하기` : '내 지점 선택하기'
  // 지점이 정해지면 그 지점의 확정 가격이므로 '부터'를 붙이지 않는다
  const suffix = selectedStore || priceUnit ? '' : '부터'

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
        {/* 좌측 — 높이 고정 */}
        <div className="flex min-w-0 flex-1 flex-col justify-center" style={{ height: '40px' }}>
          <span className="truncate text-[11px] leading-[14px] text-mute-2">{context || ' '}</span>
          <span className="tnum truncate text-[15px] font-bold leading-[20px] text-fog">
            월 <span style={{ color: 'var(--color-accent-soft)' }}>{formatNumber(price)}원</span>
            {suffix && <span className="ml-1 text-[12px] font-medium text-mute">{suffix}</span>}
          </span>
        </div>

        <button
          type="button"
          onClick={onSubscribe}
          tabIndex={visible ? 0 : -1}
          className="btn btn-primary btn-auto flex-shrink-0 !px-5 !text-[14px]"
        >
          {label}
        </button>
      </div>
    </div>
  )
}
