/* 가격·표기 포맷 유틸 */

const nf = new Intl.NumberFormat('ko-KR')

/** 48900 → '48,900' */
export const formatNumber = (n) => (typeof n === 'number' ? nf.format(n) : '')

/** 48900 → '48,900원' / null → fallback */
export const formatPrice = (n, fallback = '가격 추후 공개') =>
  typeof n === 'number' ? `${nf.format(n)}원` : fallback

/**
 * 선택한 지점을 반영한 월 구독가.
 * 지점 미선택이면 기본가를 반환한다.
 */
export const monthlyPriceFor = (store, basePrice) =>
  store && typeof store.monthlyPrice === 'number' ? store.monthlyPrice : basePrice

/**
 * 상품 카드에 표시할 가격.
 * storePriceAware 상품(월 구독)만 선택 지점의 가격 예외를 따른다.
 */
export const productPriceFor = (product, store, basePrice) => {
  if (product.price === null) return null
  if (product.storePriceAware) return monthlyPriceFor(store, basePrice)
  return product.price
}

/** 미확정 값 표기 — 임의 생성 대신 항상 이 문구를 쓴다 */
export const PENDING_STORE_INFO = '[지점 정보 입력]'
export const PENDING_POLICY = '[최종 정책 입력]'

/** 값이 없으면 placeholder 문구로 대체 */
export const orPending = (value, placeholder = PENDING_STORE_INFO) => value || placeholder
