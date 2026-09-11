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

/**
 * 장기권의 월 환산 금액.
 * ⚠ 딱 나누어떨어질 때만 값을 돌려준다.
 *    소수점이 생기면 null → 화면에 '약 OO원' 을 아예 표시하지 않는다.
 *    (부정확한 환산 금액을 보여주지 않기 위함)
 */
export function perMonth(price, months) {
  if (typeof price !== 'number' || typeof months !== 'number' || months <= 0) return null
  if (price % months !== 0) return null
  return price / months
}
