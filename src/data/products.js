/* ══════════════════════════════════════════════════════════════
   상품 데이터
   ──────────────────────────────────────────────────────────────
   화면 어디에도 가격/정책을 직접 적지 않는다. 전부 이 파일에서만 관리.
   가격이 확정되면 price 값만 채우면 화면 전체(카드·비교표·CTA)에 반영된다.

   status
     'available'    노출 + 선택 가능
     'coming_soon'  노출하되 가격/정책 미확정 (price: null)
     'hidden'       화면에서 제외

   price: null  → 임의 가격을 만들지 않고 priceLabel 을 대신 노출
   ══════════════════════════════════════════════════════════════ */

/** 월 구독 기본가. 지점별 예외는 stores.js 의 monthlyPrice 로 덮어쓴다. */
export const BASE_MONTHLY_PRICE = 48900

export const PRODUCTS = [
  {
    id: 'monthly',
    rank: 1,
    badge: 'MONTHLY',
    productName: '월 구독',
    shortName: '월 구독',
    price: BASE_MONTHLY_PRICE,
    priceLabel: null,
    priceUnit: '월',
    duration: '월 단위',
    paymentType: '매월 정기결제',
    usageScope: '등록한 주 이용지점',
    description: '등록한 주 이용지점을 매월 결제하고 이용하는 기본 구독.',
    points: [
      '매월 정기결제',
      '등록한 주 이용지점 이용',
      '지점에 따라 월 구독가가 다를 수 있음',
    ],
    // 지점별 가격 예외가 존재하는 상품인지 (월 구독만 해당)
    storePriceAware: true,
    cta: { label: '이 구독 선택하기', intent: 'subscribe' },
    recommended: true,
    event: false,
    status: 'available',
  },
  {
    id: 'quarterly',
    rank: 2,
    badge: '3 MONTH',
    productName: '3개월 구독권',
    shortName: '3개월 구독권',
    price: null, // 미확정 — 임의 생성 금지
    priceLabel: '가격 추후 공개',
    priceUnit: '3개월',
    duration: '3개월',
    paymentType: '[정책 입력]',
    usageScope: '[정책 입력]',
    description: '월 자동결제 대신 3개월 단위 이용을 원하는 회원을 위한 상품.',
    points: ['[최종 상품정책 입력]'],
    storePriceAware: false,
    cta: { label: '상품 정보 문의하기', intent: 'consult' },
    recommended: false,
    event: false,
    status: 'coming_soon',
  },
  {
    id: 'multiclub',
    rank: 3,
    badge: 'MULTI CLUB',
    productName: '전지점 구독',
    shortName: '전지점 구독',
    price: 59900,
    priceLabel: null,
    priceUnit: '월',
    duration: '월 단위',
    paymentType: '매월 정기결제',
    usageScope: '주 이용지점 + 구독 운영 타지점',
    description: '주 이용지점 외에 다른 구독 운영지점도 함께 이용하고 싶은 회원을 위한 상품.',
    points: [
      '매월 정기결제',
      '주 이용지점 이용',
      '타 구독 운영지점 이용 — [최종 정책 입력]',
    ],
    // 이용 가능 지점·횟수는 확정 전이므로 단정적으로 표기하지 않는다
    policyNote: '이용 가능 지점과 세부 이용조건은 최종 정책 확정 후 안내드립니다.',
    storePriceAware: false,
    cta: { label: '전지점 구독 보기', intent: 'subscribe' },
    recommended: false,
    event: false,
    status: 'available',
  },
  {
    id: 'annual',
    rank: 4,
    badge: 'SUBSCRIPTION OPEN EVENT',
    productName: '12개월 회원권',
    shortName: '12개월 회원권',
    price: 399000,
    priceLabel: null,
    priceUnit: '12개월',
    duration: '12개월',
    paymentType: '일시결제',
    usageScope: '[정책 입력]',
    description: '구독제 OPEN 기념으로 별도 운영하는 장기회원권 상품.',
    points: ['[정책 입력]'],
    // 판매기간 / 판매수량 / 종료조건 미확정 — 임의 생성 금지
    policyNote: '판매기간과 수량은 별도 안내 예정입니다.',
    storePriceAware: false,
    cta: { label: '12개월 회원권 문의하기', intent: 'consult' },
    recommended: false,
    event: true, // OPEN EVENT 영역에서만 노출, HERO/PRICE 주인공 아님
    status: 'available',
  },
]

/** PRICE 섹션에 노출할 상품 (이벤트 상품 제외, 우선순위 순) */
export const SUBSCRIPTION_PRODUCTS = PRODUCTS
  .filter((p) => p.status !== 'hidden' && !p.event)
  .sort((a, b) => a.rank - b.rank)

/** 비교표에 노출할 상품 (이벤트 상품 포함, 우선순위 순) */
export const COMPARISON_PRODUCTS = PRODUCTS
  .filter((p) => p.status !== 'hidden')
  .sort((a, b) => a.rank - b.rank)

export const EVENT_PRODUCT = PRODUCTS.find((p) => p.event && p.status !== 'hidden') || null

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id) || null

/* ══════════════════════════════════════════════════════════════
   추가 옵션 — 기본 구독료에 포함되지 않는 선택 항목
   ══════════════════════════════════════════════════════════════ */
export const ADD_ONS = [
  {
    id: 'wear',
    name: '운동복',
    price: 11000,
    priceUnit: '월',
    icon: 'solar:t-shirt-linear',
    description: '매번 챙겨오지 않아도 되는 센터 운동복.',
    // 보건대점 운영 여부/시점 미확정 — 임의 생성 금지
    note: '지점별 운영 여부는 [지점 정보 입력]',
    status: 'available',
  },
  {
    id: 'locker',
    name: '개인락커',
    price: 15000,
    priceUnit: '월',
    icon: 'solar:safe-square-linear',
    description: '운동화와 짐을 두고 다닐 수 있는 개인 락커.',
    note: null,
    status: 'available',
  },
]
