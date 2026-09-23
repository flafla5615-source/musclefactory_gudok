import { useState } from 'react'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import ProductCard from './ProductCard.jsx'
import ProductTerms from './ProductTerms.jsx'
import Compare from './Compare.jsx'
import {
  AVAILABLE_SCOPES,
  BASE_MONTHLY_PRICE,
  getProduct,
  productsForScope,
} from '../data/products.js'
import { SUBSCRIPTION_STORES } from '../data/stores.js'
import { productPriceFor, formatNumber } from '../lib/format.js'

/**
 * 기본가와 다른 월 구독가를 가진 지점 (데이터에서 자동 추출).
 * 현재는 전 지점 48,900원이라 항상 비어 있어 관련 안내가 렌더링되지 않는다.
 */
const PRICE_EXCEPTIONS = SUBSCRIPTION_STORES.filter(
  (s) => typeof s.monthlyPrice === 'number' && s.monthlyPrice !== BASE_MONTHLY_PRICE,
)

/** 이 지점이 기본가와 다른 가격을 쓰는가 */
const hasOwnPrice = (store) =>
  Boolean(store) && typeof store.monthlyPrice === 'number' && store.monthlyPrice !== BASE_MONTHLY_PRICE

/** 노출 상품 수에 맞춘 열 수 (Tailwind 가 스캔하도록 클래스는 문자열 그대로) */
const GRID_COLS = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
}

/**
 * STEP 3 — 어떻게 이용하고 싶으세요?
 *
 * 상품 4개를 한 화면에 똑같이 나열하지 않는다.
 *   1단계  이용범위 선택 (한 지점 / 여러 지점)
 *   2단계  그 범위의 상품만 비교
 *   3단계  고른 상품의 조건을 바로 아래에서 다시 확인
 *
 * ⚠ 금액·이용조건은 전부 products.js 에서 온다. 이 파일에 쓰지 않는다.
 */
export default function Pricing({ selectedStore, selectedProductId, onSelectProduct }) {
  const [pickedScope, setPickedScope] = useState(null)

  const selectedProduct = selectedProductId ? getProduct(selectedProductId) : null
  // 상품을 이미 골랐으면 그 상품의 이용범위를 열어둔다 (되돌아왔을 때 선택이 보이게)
  const activeScope = pickedScope || selectedProduct?.scope || null
  const products = activeScope ? productsForScope(activeScope) : []

  const storeNoteFor = (product) => {
    if (!product.storePriceAware) return null
    if (hasOwnPrice(selectedStore)) return `${selectedStore.shortName} 적용가`
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
      title="어떻게 이용하고 싶으세요?"
      description="이용범위를 먼저 고르면 맞는 이용권만 보여드립니다."
    >
      {/* ── 1단계 : 이용범위 ───────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-2">
        {AVAILABLE_SCOPES.map((scope, i) => {
          const active = activeScope === scope.id
          return (
            <Reveal key={scope.id} delay={i * 70}>
              <button
                type="button"
                onClick={() => setPickedScope(scope.id)}
                aria-pressed={active}
                className={`card w-full text-left !p-4 transition-colors ${active ? 'card-selected' : ''}`}
              >
                <span className="flex items-start gap-3">
                  <iconify-icon
                    icon={scope.icon}
                    width="20"
                    class="mt-[2px] flex-shrink-0"
                    style={{
                      color: active ? 'var(--color-accent-soft)' : 'var(--color-mute-2)',
                    }}
                  ></iconify-icon>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15.5px] font-bold leading-snug text-fog">
                      {scope.label}
                    </span>
                    <span className="mt-1 block text-[13px] leading-[1.6] text-mute">
                      {scope.description}
                    </span>
                  </span>
                  {active && (
                    <iconify-icon
                      icon="solar:check-circle-bold"
                      width="19"
                      class="mt-[2px] flex-shrink-0"
                      style={{ color: 'var(--color-accent)' }}
                    ></iconify-icon>
                  )}
                </span>
              </button>
            </Reveal>
          )
        })}
      </div>

      {/* ── 2단계 : 해당 범위의 상품 ────────────────────────── */}
      {activeScope ? (
        <>
          <div
            className={`mt-5 grid auto-rows-fr gap-4 ${GRID_COLS[products.length] || 'md:grid-cols-2'}`}
          >
            {products.map((product, i) => (
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

          {/* ── 3단계 : 고른 상품의 조건 재확인 ──────────────
              58,900원 상품을 '전 지점 무제한' 으로 오해하지 않도록
              선택 직후 이용범위를 다시 보여준다. */}
          {selectedProduct && (
            <Reveal delay={90} className="mt-4">
              <ProductTerms
                product={selectedProduct}
                price={productPriceFor(selectedProduct, selectedStore, BASE_MONTHLY_PRICE)}
                tone="quiet"
              />
            </Reveal>
          )}

          {PRICE_EXCEPTIONS.length > 0 && (
            <Reveal delay={120} className="mt-5">
              <p className="t-caption">
                {PRICE_EXCEPTIONS.map((s) => `${s.name} 월 ${formatNumber(s.monthlyPrice)}원`).join(', ')}
                . 지점을 선택하면 가격과 하단 버튼에 자동 반영됩니다.
              </p>
            </Reveal>
          )}

          <Compare products={products} selectedStore={selectedStore} />
        </>
      ) : (
        <Reveal delay={140} className="mt-5">
          <p className="t-caption">
            위에서 이용범위를 선택하면 해당 이용권과 가격을 보여드립니다.
          </p>
        </Reveal>
      )}
    </Section>
  )
}
