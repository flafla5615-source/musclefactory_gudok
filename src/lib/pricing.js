/* ══════════════════════════════════════════════════════════════
   선택 상태 → 월 예상 결제금액 계산
   ──────────────────────────────────────────────────────────────
   지점 · 상품 · 추가옵션 선택을 하나의 계산 로직으로 모은다.
   화면 컴포넌트는 계산을 직접 하지 않고 여기서 나온 결과만 그린다.

   ⚠ 3개월 구독권(price: null)과 12개월 회원권(일시결제)은
      월 예상 결제금액 계산에 섞지 않는다.
   ══════════════════════════════════════════════════════════════ */

import { ADD_ONS, BASE_MONTHLY_PRICE, getProduct } from '../data/products.js'
import { productPriceFor } from './format.js'

/** 옵션 id → 지점 데이터의 가용성 필드 */
const AVAILABILITY_FIELD = {
  wear: 'clothingAvailable',
  locker: 'lockerAvailable',
}

/**
 * 해당 지점에서 이 옵션을 선택할 수 있는가.
 *   false → 미운영 (선택 불가)
 *   true  → 운영
 *   null  → 미확정. 임의로 막지 않고 선택 가능하게 두되,
 *           운영 여부는 상담 시 확인하도록 안내한다.
 * 지점을 고르기 전에는 제한하지 않는다.
 */
export function isOptionAvailable(store, optionId) {
  if (!store) return true
  const field = AVAILABILITY_FIELD[optionId]
  return field ? store[field] !== false : true
}

/** 월 단위로 결제되는 상품인지 (월 구독 / 전지점 구독) */
export function isMonthlyProduct(product) {
  return Boolean(product) && product.price !== null && product.priceUnit === '월'
}

/**
 * 선택 상태를 받아 결제 요약을 만든다.
 *
 * @returns {{
 *   product, store,
 *   basePrice: number|null,      상품 기본가 (지점 예외 반영)
 *   options: Array,              실제로 반영된 옵션 목록
 *   optionsTotal: number,
 *   total: number|null,          월 예상 결제금액 (계산 불가면 null)
 *   calculable: boolean,         월 단위 계산이 가능한 조합인가
 *   priceUnit: string|null,
 * }}
 */
export function buildQuote({ storeId, productId, optionIds = [], store = null, product = null }) {
  const resolvedProduct = product || (productId ? getProduct(productId) : null) || getProduct('monthly')
  const resolvedStore = store || null

  const basePrice = productPriceFor(resolvedProduct, resolvedStore, BASE_MONTHLY_PRICE)
  const calculable = isMonthlyProduct(resolvedProduct) && basePrice !== null

  // 선택했더라도 그 지점에서 미운영이면 금액에 넣지 않는다
  const options = calculable
    ? ADD_ONS.filter((o) => optionIds.includes(o.id) && isOptionAvailable(resolvedStore, o.id))
    : []

  const optionsTotal = options.reduce((sum, o) => sum + o.price, 0)

  return {
    product: resolvedProduct,
    store: resolvedStore,
    basePrice,
    options,
    optionsTotal,
    total: calculable ? basePrice + optionsTotal : null,
    calculable,
    priceUnit: resolvedProduct.priceUnit,
    storeId,
  }
}
