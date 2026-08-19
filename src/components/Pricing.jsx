import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import ProductCard from './ProductCard.jsx'
import { SUBSCRIPTION_PRODUCTS, BASE_MONTHLY_PRICE } from '../data/products.js'
import { SUBSCRIPTION_STORES } from '../data/stores.js'
import { productPriceFor, formatNumber } from '../lib/format.js'

/** 기본가와 다른 월 구독가를 가진 지점 — 데이터에서 자동으로 추출한다 */
const PRICE_EXCEPTION_STORES = SUBSCRIPTION_STORES.filter(
  (s) => typeof s.monthlyPrice === 'number' && s.monthlyPrice !== BASE_MONTHLY_PRICE,
)

/**
 * SECTION 04 — PRICE
 * 모바일: 세로 카드 스택 (한 줄에 여러 상품을 억지로 넣지 않는다)
 * 데스크톱: 비대칭 벤토 — 월 구독이 7컬럼, 나머지가 5컬럼
 */
export default function Pricing({ selectedStore, selectedProductId, onSelectProduct }) {
  const [featured, ...others] = SUBSCRIPTION_PRODUCTS

  const storeNoteFor = (product) => {
    if (!product.storePriceAware) return null
    if (selectedStore && typeof selectedStore.monthlyPrice === 'number') {
      return `${selectedStore.storeName} 적용가`
    }
    if (!selectedStore && PRICE_EXCEPTION_STORES.length > 0) {
      const s = PRICE_EXCEPTION_STORES[0]
      return `${s.shortName}은 월 ${formatNumber(s.monthlyPrice)}원`
    }
    if (!selectedStore) return null
    return `${selectedStore.storeName} 기준`
  }

  return (
    <section id="price" className="bg-ink-2 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Price"
            title={<>매월, 부담 없이.</>}
            description="이용방식을 직접 고를 수 있습니다. 가장 많이 선택하는 방식은 월 구독입니다."
          />
          <Reveal delay={180} className="flex-shrink-0">
            <div className="bezel">
              <div className="bezel-inner flex items-center gap-3 px-4 py-3">
                <iconify-icon
                  icon="solar:map-point-linear"
                  width="18"
                  style={{ color: 'var(--color-accent-soft)' }}
                ></iconify-icon>
                <div>
                  <p className="text-[11px] text-mute-2">선택한 지점</p>
                  <p className="text-[14px] font-bold text-fog">
                    {selectedStore ? selectedStore.storeName : '지점 미선택'}
                  </p>
                </div>
                <a
                  href="#store"
                  className="ml-2 rounded-full border border-white/14 px-3 py-1.5 text-[12px] font-medium text-mute transition-colors duration-300 hover:border-white/30 hover:text-fog"
                >
                  {selectedStore ? '변경' : '선택'}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 상품 카드 — 비대칭 벤토 */}
        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ProductCard
              product={featured}
              price={productPriceFor(featured, selectedStore, BASE_MONTHLY_PRICE)}
              featured
              selected={selectedProductId === featured.id}
              storeNote={storeNoteFor(featured)}
              onSelect={onSelectProduct}
            />
          </Reveal>

          <div className="grid gap-4 lg:col-span-5">
            {others.map((product, i) => (
              <Reveal key={product.id} delay={100 + i * 90}>
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
        </div>

        {/* 지점별 가격 예외 안내 — stores.js 데이터에서 자동 생성 */}
        {PRICE_EXCEPTION_STORES.length > 0 && (
          <Reveal
            delay={120}
            className="mt-6 flex items-start gap-2.5 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3.5"
          >
            <iconify-icon
              icon="solar:info-circle-linear"
              width="17"
              style={{ color: 'var(--color-mute-2)', flexShrink: 0, marginTop: '1px' }}
            ></iconify-icon>
            <p className="text-[13px] leading-relaxed text-mute-2">
              {PRICE_EXCEPTION_STORES.map(
                (s) => `${s.storeName}은 월 구독 ${formatNumber(s.monthlyPrice)}원`,
              ).join(', ')}
              이 적용됩니다. 지점을 선택하면 가격과 하단 버튼에 자동으로 반영됩니다.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
