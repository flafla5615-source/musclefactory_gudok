import { formatNumber } from '../lib/format.js'

/**
 * 상품 카드 — 3개 카드가 완전히 같은 규격을 쓴다.
 * 텍스트 길이가 달라도 CTA 위치가 흔들리지 않도록
 * .card(flex column) + .card-foot(margin-top:auto) 으로 하단 정렬한다.
 * 추천 상품은 카드를 키우지 않고 테두리 + 작은 칩으로만 강조한다.
 */
export default function ProductCard({ product, price, selected, storeNote, onSelect }) {
  const isPending = price === null

  return (
    <div
      className={`card ${product.recommended ? 'card-featured' : ''} ${selected ? 'card-selected' : ''}`}
      style={{ minHeight: 'var(--product-card-min-h, 300px)' }}
    >
      {/* 헤더 — 상품명 + 추천/예정 칩 (고정 높이로 아래 요소 위치를 맞춘다) */}
      <div className="flex min-h-[28px] items-start justify-between gap-3">
        <h3 className="t-card text-fog">{product.name}</h3>
        {product.recommended && <span className="chip chip-accent">추천</span>}
        {product.status === 'coming_soon' && <span className="chip chip-quiet">공개 예정</span>}
      </div>

      {/* 가격 — 모든 카드에서 같은 위치 */}
      <div className="mt-4 flex min-h-[34px] items-baseline gap-1.5">
        {isPending ? (
          <span className="text-[19px] font-bold text-mute">{product.priceLabel}</span>
        ) : (
          <>
            <span
              className="t-price"
              style={{ color: product.recommended ? 'var(--color-accent-soft)' : 'var(--color-fog)' }}
            >
              {formatNumber(price)}원
            </span>
            {product.priceUnit && (
              <span className="text-[13.5px] font-medium text-mute">/ {product.priceUnit}</span>
            )}
          </>
        )}
      </div>

      {/* 선택 지점 반영 안내 — 없을 때도 자리를 비워 카드 높이를 맞춘다 */}
      <p className="mt-1.5 min-h-[18px] text-[12px] font-medium" style={{ color: 'var(--color-accent-soft)' }}>
        {storeNote || ' '}
      </p>

      {/* 요약 */}
      <p className="mt-3 min-h-[42px] text-[13.5px] leading-relaxed text-mute">{product.summary}</p>

      {/* 조건 */}
      <ul className="speclist mt-4">
        {product.specs.map((spec) => (
          <li key={spec}>{spec}</li>
        ))}
      </ul>

      {/* CTA — 항상 카드 하단 */}
      <div className="card-foot">
        <button
          type="button"
          onClick={() => onSelect(product)}
          className={`btn ${
            selected ? 'btn-line' : product.recommended ? 'btn-primary' : 'btn-quiet'
          }`}
        >
          {selected ? '선택됨' : product.ctaLabel}
        </button>
      </div>
    </div>
  )
}
