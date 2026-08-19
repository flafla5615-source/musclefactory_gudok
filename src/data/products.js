/* ══════════════════════════════════════════════════════════════
   상품 데이터
   ──────────────────────────────────────────────────────────────
   가격·정책은 전부 이 파일에서만 관리한다.

   ⚠ price: null 은 '미확정' 을 뜻한다. 임의 가격을 만들지 않는다.
      화면에는 개발용 문구 대신 '가격 추후 공개' 로 노출된다.
   ⚠ 소비자 화면 문구에 [정책 입력] 같은 개발 메모를 쓰지 않는다.
      확정 전 항목은 '추후 공개' 로 표현한다.
   ══════════════════════════════════════════════════════════════ */

export const BASE_MONTHLY_PRICE = 48900

/** PRICE 섹션에서 나란히 비교하는 메인 상품 3종 */
export const PRODUCTS = [
  {
    id: 'monthly',
    rank: 1,
    badge: 'MONTHLY',
    name: '월 구독',
    price: BASE_MONTHLY_PRICE,
    priceLabel: null,
    priceUnit: '월',
    summary: '등록한 주 이용지점 이용',
    specs: ['월 단위 이용', '매월 정기결제'],
    // 선택 지점의 가격 예외를 따르는 상품 (월 구독만 해당)
    storePriceAware: true,
    ctaLabel: '월 구독 선택',
    ctaIntent: 'subscribe',
    recommended: true,
    status: 'available',
    // 비교표용
    compare: { duration: '월 단위', scope: '주 이용지점', payment: '정기결제' },
  },
  {
    id: 'quarterly',
    rank: 2,
    badge: '3 MONTH',
    name: '3개월 구독권',
    price: null, // 미확정 — 임의 생성 금지
    priceLabel: '가격 추후 공개',
    priceUnit: null,
    summary: '3개월 단위로 이용하는 상품',
    specs: ['3개월 이용', '세부 정책 추후 공개'],
    storePriceAware: false,
    ctaLabel: '상품 정보 보기',
    ctaIntent: 'consult',
    recommended: false,
    status: 'coming_soon',
    compare: { duration: '3개월', scope: '정책 추후 공개', payment: '정책 추후 공개' },
  },
  {
    id: 'multiclub',
    rank: 3,
    badge: 'MULTI CLUB',
    name: '전지점 구독',
    price: 59900,
    priceLabel: null,
    priceUnit: '월',
    summary: '여러 구독 운영지점을 이용하고 싶은 회원용',
    specs: ['주 이용지점', '타 구독 운영지점 이용'],
    storePriceAware: false,
    ctaLabel: '전지점 구독 선택',
    ctaIntent: 'subscribe',
    recommended: false,
    status: 'available',
    compare: { duration: '월 단위', scope: '주 지점 + 타 구독지점', payment: '정기결제' },
  },
]

/** 12개월 회원권 — 메인 PRICE 영역에서 경쟁시키지 않고 별도 영역에서만 노출 */
export const EVENT_PRODUCT = {
  id: 'annual',
  badge: 'SUBSCRIPTION OPEN EVENT',
  name: '12개월 회원권',
  price: 399000,
  priceUnit: '12개월',
  summary: '구독제 OPEN 기념 별도 회원권',
  ctaLabel: '12개월 회원권 문의하기',
  ctaIntent: 'consult',
  status: 'available',
  compare: { duration: '12개월', scope: '정책 추후 공개', payment: '일시결제' },
}

export const MAIN_PRODUCTS = PRODUCTS.filter((p) => p.status !== 'hidden').sort((a, b) => a.rank - b.rank)

/** 비교표 — 메인 3종 + 12개월 */
export const COMPARISON_ROWS = [...MAIN_PRODUCTS, EVENT_PRODUCT]

export const getProduct = (id) =>
  id === EVENT_PRODUCT.id ? EVENT_PRODUCT : PRODUCTS.find((p) => p.id === id) || null

/* ── 추가 옵션 — 기본 구독료에 포함되지 않는 선택 항목 ── */
export const ADD_ONS = [
  {
    id: 'wear',
    name: '운동복',
    price: 11000,
    priceUnit: '월',
    icon: 'solar:t-shirt-linear',
  },
  {
    id: 'locker',
    name: '개인락커',
    price: 15000,
    priceUnit: '월',
    icon: 'solar:safe-square-linear',
  },
]
