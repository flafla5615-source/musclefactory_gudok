import { formatNumber } from '../lib/format.js'

/**
 * 상품 카드 — 상품 데이터 하나를 그대로 그린다.
 * featured=true 인 상품(월 구독)만 액센트를 입혀 1순위로 보이게 한다.
 * price 가 null 이면 임의 가격 대신 priceLabel 을 노출한다.
 */
export default function ProductCard({
  product,
  price,
  featured = false,
  selected = false,
  storeNote = null,
  onSelect,
}) {
  const isPending = price === null
  const cardBg = featured ? 'var(--color-surface-2)' : 'var(--color-surface)'

  return (
    <div
      className="bezel h-full transition-transform duration-500"
      style={{
        transitionTimingFunction: 'var(--ease-spring)',
        borderColor: selected
          ? 'rgba(224,86,42,0.55)'
          : featured
            ? 'rgba(224,86,42,0.28)'
            : undefined,
        background: featured
          ? 'linear-gradient(180deg, rgba(224,86,42,0.16), rgba(255,255,255,0.015))'
          : undefined,
      }}
    >
      <div
        className="bezel-inner flex h-full flex-col p-6 md:p-7"
        style={{ background: cardBg }}
      >
        {/* 뱃지 라인 */}
        <div className="flex items-center justify-between gap-3">
          <span
            className="font-display text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: featured ? 'var(--color-accent-soft)' : 'var(--color-mute-2)' }}
          >
            {product.badge}
          </span>
          {product.recommended && (
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide"
              style={{ background: 'var(--color-accent)', color: '#fff' }}
            >
              추천
            </span>
          )}
          {product.status === 'coming_soon' && (
            <span className="pending !text-[10px]">공개 예정</span>
          )}
        </div>

        {/* 상품명 */}
        <h3
          className="mt-4 font-black tracking-[-0.02em] text-fog"
          style={{ fontSize: featured ? 'clamp(24px, 5.4vw, 32px)' : '20px' }}
        >
          {product.productName}
        </h3>

        {/* 가격 */}
        <div className="mt-4 flex items-baseline gap-1.5">
          {isPending ? (
            <span className="text-[20px] font-bold text-mute">{product.priceLabel}</span>
          ) : (
            <>
              <span
                className="tnum font-black leading-none tracking-[-0.03em]"
                style={{
                  fontSize: featured ? 'clamp(34px, 8vw, 48px)' : '28px',
                  color: featured ? 'var(--color-accent-soft)' : 'var(--color-fog)',
                }}
              >
                {formatNumber(price)}원
              </span>
              <span className="text-[14px] font-medium text-mute">/ {product.priceUnit}</span>
            </>
          )}
        </div>

        {/* 선택 지점에 따른 가격 안내 */}
        {storeNote && (
          <p className="mt-2 text-[12px] font-medium" style={{ color: 'var(--color-accent-soft)' }}>
            {storeNote}
          </p>
        )}

        {/* 설명 */}
        <p className="mt-4 text-[14px] leading-relaxed text-mute">{product.description}</p>

        {/* 포인트 */}
        <ul className="mt-5 flex flex-col gap-2.5">
          {product.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <iconify-icon
                icon="solar:check-circle-linear"
                width="16"
                style={{
                  color: featured ? 'var(--color-accent-soft)' : 'var(--color-mute-2)',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              ></iconify-icon>
              <span className="text-[13.5px] leading-snug text-mute">{point}</span>
            </li>
          ))}
        </ul>

        {product.policyNote && (
          <p className="mt-4 text-[12px] leading-relaxed text-mute-2">{product.policyNote}</p>
        )}

        {/* CTA */}
        <div className="mt-auto pt-7">
          <button
            type="button"
            onClick={() => onSelect(product)}
            className={`btn w-full ${featured ? 'btn-primary' : 'btn-ghost'}`}
          >
            {selected ? '선택됨' : product.cta.label}
            <span className="btn-orb">
              <iconify-icon
                icon={selected ? 'solar:check-read-linear' : 'solar:arrow-right-linear'}
                width="14"
              ></iconify-icon>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
