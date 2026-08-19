/* 가격·표기 포맷 유틸 */

const nf = new Intl.NumberFormat('ko-KR')

/** 48900 → '48,900' */
export const formatNumber = (n) => (typeof n === 'number' ? nf.format(n) : '')

/** 48900 → '48,900원' / null → fallback (소비자 친화 문구) */
export const formatPrice = (n, fallback = '가격 추후 공개') =>
  typeof n === 'number' ? `${nf.format(n)}원` : fallback

/** 선택 지점을 반영한 월 구독가. 지점 미선택이면 기본가. */
export const monthlyPriceFor = (store, basePrice) =>
  store && typeof store.monthlyPrice === 'number' ? store.monthlyPrice : basePrice

/** 상품 카드에 표시할 가격. 월 구독만 지점별 예외를 따른다. */
export const productPriceFor = (product, store, basePrice) => {
  if (product.price === null) return null
  if (product.storePriceAware) return monthlyPriceFor(store, basePrice)
  return product.price
}
