import { productPriceText } from '../lib/format.js'

/**
 * 선택한 이용권 조건 재확인
 *
 * 지점 선택 · 앱 이동 전에 고객이 고른 상품의 조건을 한 번 더 보여준다.
 * 특히 'GYMPASS 통합 월 구독'(58,900원)을 전 지점 무제한으로 오해하지 않도록
 * 이용범위를 결제 직전 화면마다 반복해서 노출하는 것이 이 컴포넌트의 목적이다.
 *
 * ⚠ 문구·금액은 전부 products.js 의 상품 데이터에서 온다.
 *    이 파일에 가격이나 이용조건을 하드코딩하지 않는다.
 *
 * @param {object} product   products.js 상품
 * @param {number} price     선택 지점이 반영된 가격 (productPriceFor 결과)
 * @param {string} [title]   블록 제목
 * @param {string} [tone]    'quiet' 면 한 단계 낮은 배경
 */
export default function ProductTerms({ product, price, title = '선택한 이용권', tone }) {
  if (!product) return null

  const priceText = productPriceText(price, product.priceUnit)
  const lines = product.scopeLines || []

  return (
    <div
      className="rounded-[14px] px-4 py-4"
      style={{
        background: tone === 'quiet' ? 'var(--color-ink)' : 'var(--color-surface)',
        border: '1px solid var(--color-line)',
      }}
    >
      <p className="t-label text-mute-2">{title}</p>

      <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="text-[15.5px] font-bold leading-snug text-fog">{product.name}</span>
        {priceText ? (
          <span
            className="tnum text-[16px] font-bold"
            style={{ color: 'var(--color-accent-soft)' }}
          >
            {priceText}
          </span>
        ) : (
          <span className="text-[14px] font-semibold text-mute">가격 추후 공개</span>
        )}
      </div>

      {/* 이용범위 — 결제 전에 반드시 읽히도록 가격 바로 아래에 둔다 */}
      {lines.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5">
          {lines.map((line) => (
            <li key={line} className="flex gap-2">
              <iconify-icon
                icon="solar:check-circle-linear"
                width="15"
                class="mt-[3px] flex-shrink-0"
                style={{ color: 'var(--color-mute-2)' }}
              ></iconify-icon>
              <span className="text-[13.5px] font-medium leading-[1.6] text-mute">{line}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 기간 한정 상품이면 판매기간을 함께 밝힌다 */}
      {product.promotion?.label && (
        <p className="mt-3 t-caption">{product.promotion.label} 판매 상품입니다.</p>
      )}
    </div>
  )
}
