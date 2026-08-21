import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import ProductCard from './ProductCard.jsx'
import Compare from './Compare.jsx'
import { MAIN_PRODUCTS, BASE_MONTHLY_PRICE } from '../data/products.js'
import { SUBSCRIPTION_STORES } from '../data/stores.js'
import { productPriceFor, formatNumber } from '../lib/format.js'

/**
 * 기본가와 다른 월 구독가를 가진 지점 (데이터에서 자동 추출).
 * 현재는 전 지점 48,900원이라 항상 비어 있어 관련 안내가 렌더링되지 않는다.
 * 향후 가격이 다른 지점이 생기면 데이터만 바꿔도 안내가 자동으로 살아난다.
 */
const PRICE_EXCEPTIONS = SUBSCRIPTION_STORES.filter(
  (s) => typeof s.monthlyPrice === 'number' && s.monthlyPrice !== BASE_MONTHLY_PRICE,
)

/** 이 지점이 기본가와 다른 가격을 쓰는가 */
const hasOwnPrice = (store) =>
  Boolean(store) && typeof store.monthlyPrice === 'number' && store.monthlyPrice !== BASE_MONTHLY_PRICE

/**
 * STEP 3 — 어떤 방식으로 이용할 건데?
 * 상품 3종만 나란히 비교한다. 12개월 회원권은 여기 넣지 않는다.
 * 모바일은 세로 스택(가독성 우선), md 이상에서 3열 동일 규격.
 */
export default function Pricing({ selectedStore, selectedProductId, onSelectProduct }) {
  const storeNoteFor = (product) => {
    if (!product.storePriceAware) return null
    // 기본가와 같은 지점은 굳이 '적용가' 라고 덧붙이지 않는다
    if (hasOwnPrice(selectedStore)) {
      return `${selectedStore.shortName} 적용가`
    }
    if (!selectedStore && PRICE_EXCEPTIONS.length > 0) {
      const s = PRICE_EXCEPTIONS[0]
      return `${s.shortName} 월 ${formatNumber(s.monthlyPrice)}원`
    }
    return null
  }

  return (
    <Section
      id="price"
      tone="ink-2"
      title="매월, 부담 없이."
      description="이용방식을 직접 고를 수 있습니다."
    >
      {/* 3열 동일 규격 — grid 라 카드 높이가 자동으로 같아진다 */}
      <div className="grid gap-4 md:grid-cols-3">
        {MAIN_PRODUCTS.map((product, i) => (
          <Reveal key={product.id} delay={i * 70} className="h-full">
            <ProductCard
              product={product}
              price={productPriceFor(product, selectedStore, BASE_MONTHLY_PRICE)}
              selected={selectedProductId === product.id}
              storeNote={storeNoteFor(product)}
              onSelect={onSelectProduct}
            />
          </Reveal>
        ))}
      </div>

      {PRICE_EXCEPTIONS.length > 0 && (
        <Reveal delay={120} className="mt-5">
          <p className="t-caption">
            {PRICE_EXCEPTIONS.map((s) => `${s.name} 월 ${formatNumber(s.monthlyPrice)}원`).join(', ')}
            . 지점을 선택하면 가격과 하단 버튼에 자동 반영됩니다.
          </p>
        </Reveal>
      )}

      <Compare selectedStore={selectedStore} />
    </Section>
  )
}
