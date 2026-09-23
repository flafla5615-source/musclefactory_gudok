import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import ProductTerms from './ProductTerms.jsx'
import { formatNumber, productPriceText } from '../lib/format.js'

/**
 * STEP 4 — 선택내용 확인
 * 지점 · 상품 · 이용범위 · 예상 결제금액을 한 번에 보여주고 마지막 CTA 를 건다.
 *
 * ⚠ 금액은 상품 단위(월 / 12개월)에 맞춰 표기한다.
 *    12개월 상품에 '월' 을 붙이지 않는다.
 * ⚠ 이용범위(scopeLines)를 여기서도 한 번 더 보여준다.
 *    'GYMPASS 통합 월 구독' 을 전 지점 무제한으로 오해하지 않게 하기 위함.
 */
export default function Summary({ store, quote, hasProductSelection, onSubscribe, onPickStore }) {
  // 지점을 아직 안 골랐으면 요약 대신 지점 선택으로 유도한다
  if (!store) {
    return (
      <Section id="summary" tone="ink-2" title="내가 선택한 GYM PASS">
        <Reveal className="card">
          <p className="t-body">지점을 선택하시면 선택 내용과 월 예상 결제금액을 정리해 드립니다.</p>
          <div className="card-foot">
            <button type="button" onClick={onPickStore} className="btn btn-primary">
              내 지점 선택하기
            </button>
          </div>
        </Reveal>
      </Section>
    )
  }

  return (
    <Section id="summary" tone="ink-2" title="내가 선택한 GYM PASS">
      <Reveal className="card">
        <dl>
          <div className="inforow">
            <dt>지점</dt>
            <dd className="font-semibold">{store.name}</dd>
          </div>

          <div className="inforow">
            <dt>상품</dt>
            <dd>
              <span className="font-semibold">{quote.product.name}</span>
              {!hasProductSelection && (
                <span className="ml-1.5 text-[12px] text-mute-2">기본</span>
              )}
              <span className="ml-2 tnum text-mute">
                {productPriceText(quote.basePrice, quote.priceUnit) || '가격 추후 공개'}
              </span>
            </dd>
          </div>

          {/* 선택한 옵션만 노출 */}
          {quote.options.length > 0 && (
            <div className="inforow">
              <dt>추가옵션</dt>
              <dd>
                <ul className="flex flex-col gap-1">
                  {quote.options.map((o) => (
                    <li key={o.id} className="tnum">
                      {o.name} <span className="text-mute">+{formatNumber(o.price)}원</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>

        {/* 고른 이용권의 이용범위 — 결제 전 마지막 확인 */}
        <div className="mt-4">
          <ProductTerms product={quote.product} price={quote.basePrice} tone="quiet" />
        </div>

        {/* 월 예상 결제금액 — 월 단위 상품일 때만 계산 */}
        {quote.calculable ? (
          <div
            className="mt-4 flex items-baseline justify-between gap-3 border-t pt-4"
            style={{ borderColor: 'var(--color-line)' }}
          >
            <span className="text-[14px] font-semibold text-fog">월 예상 결제금액</span>
            <span
              className="tnum text-[24px] font-bold"
              style={{ color: 'var(--color-accent-soft)' }}
            >
              {formatNumber(quote.total)}원
            </span>
          </div>
        ) : (
          <p className="mt-4 t-caption">
            {quote.basePrice === null
              ? '선택하신 상품은 가격과 세부 정책이 확정된 뒤 안내드립니다.'
              : '기간형 이용권은 매월 결제되지 않고 이용기간 전체가 한 번에 적용됩니다.'}
          </p>
        )}

        <div className="card-foot">
          <button type="button" onClick={onSubscribe} className="btn btn-primary">
            {store.shortName} 구독 시작하기
          </button>
        </div>
      </Reveal>
    </Section>
  )
}
