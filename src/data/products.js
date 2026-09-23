/* ══════════════════════════════════════════════════════════════
   상품 데이터 — 2026-09 최신 운영정책
   ──────────────────────────────────────────────────────────────
   가격·이용범위·판매기간은 전부 이 파일에서만 관리한다.
   컴포넌트(JSX)에 금액이나 이용조건을 하드코딩하지 않는다.

   판매 상품 4개
     ① 월 구독                  48,900원  / 월      등록한 지점 1곳
     ② 365 GYMPASS             428,000원 / 12개월  등록한 지점 1곳
     ③ GYMPASS 통합 월 구독      58,900원  / 월      등록지점 무제한 + 타 지점 월 10회
     ④ ALL-IN-ONE 365 PASS     598,000원 / 12개월  32개 전 지점 (2026년 10월 한정)

   ⚠ 428,000원은 더 이상 10개월 상품이 아니다.
      반드시 '12개월 / 365 GYMPASS' 로만 표기한다.
      과거 '선착순 10개월권'(stores.js longTermOffer)은 전부 해제했다.

   ⚠ ③ 58,900원 상품에 아래 표현을 절대 쓰지 않는다.
        '32개 전 지점' / '전 지점 무제한' / '32개 지점 자유이용' / '모든 지점 무제한'
      ③ 의 이용범위는 '등록 구독지점 무제한 + 타 GYMPASS 구독지점 월 10회' 다.

   ⚠ '32개 전 지점 이용' 은 ④ ALL-IN-ONE 365 PASS 에서만 사용한다.
   ══════════════════════════════════════════════════════════════ */

export const BASE_MONTHLY_PRICE = 48900

/* ══════════════ 이용범위 (상품 선택 1단계) ══════════════
   4개 상품을 한 화면에 나열하지 않는다.
   먼저 '어떻게 이용할지' 를 고르게 하고, 그 범위의 상품만 보여준다. */
export const USAGE_SCOPES = [
  {
    id: 'single',
    label: '한 지점 중심으로 이용',
    description: '등록한 한 지점에서 운동',
    icon: 'solar:map-point-linear',
  },
  {
    id: 'multi',
    label: '여러 지점을 이용',
    description: '여러 GYM PASS 지점을 함께 이용',
    icon: 'solar:routing-2-linear',
  },
]

/* ══════════════ 상품 ══════════════
   scope        USAGE_SCOPES.id — 이 상품이 어느 이용범위에 속하는가
   scopeLines   결제 전에 다시 확인시키는 이용조건 (ProductTerms 에서 사용)
   promotion    기간 한정 상품. active: false 로 바꾸면 즉시 비노출되고,
                endDate 를 지나면 자동으로 빠진다 (KST 기준)
   status       'hidden' 이면 노출 대상에서 제외 */
export const PRODUCTS = [
  {
    id: 'monthly',
    scope: 'single',
    rank: 1,
    badge: 'MONTHLY',
    name: '월 구독',
    price: BASE_MONTHLY_PRICE,
    priceLabel: null,
    priceUnit: '월',
    summary: '등록한 지점 1곳을 매월 결제하고 이용하는 기본 구독.',
    specs: ['등록한 지점 1곳 이용', '월 자동결제', '약정 없음 · 한 달 단위 이용'],
    scopeLines: ['등록한 지점 1곳 이용', '약정 없음 · 한 달 단위 이용'],
    // 선택 지점의 월 구독가 예외를 따르는 상품 (월 구독만 해당)
    storePriceAware: true,
    ctaLabel: '월 구독 선택',
    ctaIntent: 'subscribe',
    recommended: true,
    status: 'available',
    compare: [
      { label: '이용기간', value: '월 단위' },
      { label: '이용범위', value: '등록한 지점 1곳' },
      { label: '결제', value: '월 자동결제' },
    ],
  },
  {
    id: 'pass365',
    scope: 'single',
    rank: 2,
    badge: '365',
    // ⚠ 428,000원은 12개월 상품이다. '10개월' 로 표기하지 않는다.
    name: '365 GYMPASS',
    price: 428000,
    priceLabel: null,
    priceUnit: '12개월',
    summary: '등록한 지점 1곳을 12개월 동안 이용하는 상품.',
    specs: ['이용기간 12개월', '등록한 지점 1곳 이용', '상시 판매'],
    scopeLines: ['이용기간 12개월', '등록한 지점 1곳 이용'],
    storePriceAware: false,
    ctaLabel: '365 GYMPASS 선택',
    ctaIntent: 'subscribe',
    recommended: false,
    status: 'available',
    /* ⚠ 결제방식(일시결제 등)은 확정 문구를 받지 못했다. 임의로 적지 않는다. */
    compare: [
      { label: '이용기간', value: '12개월' },
      { label: '이용범위', value: '등록한 지점 1곳' },
      { label: '판매', value: '상시 판매' },
    ],
  },
  {
    id: 'multi-monthly',
    scope: 'multi',
    rank: 3,
    badge: 'MULTI',
    name: 'GYMPASS 통합 월 구독',
    price: 58900,
    priceLabel: null,
    priceUnit: '월',
    summary: '등록한 구독지점에 더해 다른 GYM PASS 구독지점도 이용하는 상품.',
    /* ⚠ 아래 두 줄이 이 상품의 이용범위 전부다.
          '32개 전 지점' / '전 지점 무제한' 으로 바꿔 쓰지 않는다. */
    specs: ['등록 구독지점 무제한', '타 GYMPASS 구독지점 월 10회 이용', '월 자동결제'],
    scopeLines: ['등록 구독지점 무제한', '타 GYMPASS 구독지점 월 10회 이용'],
    storePriceAware: false,
    ctaLabel: 'GYMPASS 통합 월 구독 선택',
    ctaIntent: 'subscribe',
    recommended: true,
    status: 'available',
    compare: [
      { label: '이용기간', value: '월 단위' },
      { label: '이용범위', value: '등록 구독지점 무제한 + 타 GYMPASS 구독지점 월 10회' },
      { label: '결제', value: '월 자동결제' },
    ],
  },
  {
    id: 'allinone365',
    scope: 'multi',
    rank: 4,
    badge: 'ALL-IN-ONE',
    name: 'ALL-IN-ONE 365 PASS',
    price: 598000,
    priceLabel: null,
    priceUnit: '12개월',
    summary: '32개 전 지점을 12개월 동안 이용하는 한정 상품.',
    /* ⚠ '32개 전 지점 이용' 은 이 상품에서만 쓸 수 있는 표현이다. */
    specs: ['이용기간 12개월', '32개 전 지점 이용', '2026년 10월 한정 판매'],
    scopeLines: ['이용기간 12개월', '32개 전 지점 이용'],
    storePriceAware: false,
    ctaLabel: 'ALL-IN-ONE 365 PASS 선택',
    ctaIntent: 'subscribe',
    recommended: false,
    status: 'available',
    /* 10월 한정 프로모션
       · 조기 종료  → active: false
       · 기간 만료  → endDate 를 지나면 자동으로 화면에서 빠진다 */
    promotion: {
      active: true,
      label: '2026년 10월 한정',
      chipLabel: '10월 한정',
      endDate: '2026-10-31',
    },
    compare: [
      { label: '이용기간', value: '12개월' },
      { label: '이용범위', value: '32개 전 지점' },
      { label: '판매', value: '2026년 10월 한정' },
    ],
  },
]

/** 기간 한정 상품이 아직 판매 중인가 (KST 기준, endDate 당일 자정까지) */
export function isPromotionLive(promotion) {
  if (!promotion) return true
  if (promotion.active === false) return false
  if (!promotion.endDate) return true
  return new Date(`${promotion.endDate}T23:59:59+09:00`).getTime() >= Date.now()
}

/** 고객 화면에 노출하는 상품 */
export const MAIN_PRODUCTS = PRODUCTS.filter(
  (p) => p.status !== 'hidden' && isPromotionLive(p.promotion),
).sort((a, b) => a.rank - b.rank)

/** 이용범위별 상품 — 상품 선택 2단계에서 사용 */
export const productsForScope = (scopeId) => MAIN_PRODUCTS.filter((p) => p.scope === scopeId)

/** 상품이 하나도 없는 이용범위는 선택지에서 빼 둔다 */
export const AVAILABLE_SCOPES = USAGE_SCOPES.filter((s) => productsForScope(s.id).length > 0)

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id) || null

export const getScope = (id) => USAGE_SCOPES.find((s) => s.id === id) || null

/* ── 추가 옵션 — 기본 구독료에 포함되지 않는 선택 항목 ──
   ⚠ 고객 화면에 노출하지 않는다 (App.jsx <AddOns /> 주석 처리).
      '월 48,900원에 포함' / '무료 운동복' 처럼 바꿔 쓰지 않는다. */
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
