/* ══════════════════════════════════════════════════════════════
   지점 데이터
   ──────────────────────────────────────────────────────────────
   지점을 추가할 때 컴포넌트를 새로 만들지 않는다.
   아래 배열에 객체 하나를 추가하면 지점 선택 카드 · 시설 탭 ·
   하단 고정 CTA · 상담 시트가 자동으로 확장된다.

   ⚠ 확인되지 않은 정보는 절대 생성하지 않는다.
      주소 / 운영시간 / 주차 / 전화번호가 미확인이면 null 로 두면
      화면에 '[지점 정보 입력]' 로 표시된다.

   ⚠ 이미지는 실제 센터사진만 사용한다.
      images 가 비어 있으면 AI·스톡 이미지를 넣지 않고
      '실제 사진 준비 중' 플레이스홀더가 표시된다.
      public/images/<지점 id>/ 에 사진을 넣고 아래에 경로만 추가하면 된다.
   ══════════════════════════════════════════════════════════════ */

/** 브랜드 정의 — 브랜드는 달라도 고객에게는 하나의 구독 시스템으로 보이게 한다 */
export const BRANDS = {
  GYMFLEX: {
    key: 'GYMFLEX',
    label: '짐플릭스',
    // 확정된 브랜드 컬러 미확인 → 임의 생성하지 않고 뉴트럴 유지
    color: 'var(--color-brand-gymflex)',
  },
  OLD_GYM: {
    key: 'OLD GYM',
    label: '올드짐',
    color: 'var(--color-brand-oldgym)', // BLACK + BRONZE
  },
  MUSCLE_FACTORY: {
    key: 'MUSCLE FACTORY',
    label: '머슬팩토리',
    color: 'var(--color-brand-mf)', // BLACK + RED
  },
}

export const STORES = [
  {
    id: 'gymflex-cityhall',
    brand: BRANDS.GYMFLEX,
    storeName: '짐플릭스 시청점',
    shortName: '시청점',
    region: '진주',
    monthlyPrice: null, // null = 기본가(48,900원) 적용
    address: '경남 진주시 동진로 183 현대자동차 건물 2·3층',
    operatingHours: '24시간 연중무휴',
    parking: null,
    phone: null,
    naverUrl: 'https://naver.me/GJTi4Npj',
    instagramUrl: 'https://www.instagram.com/gymflix_jinju/',
    images: [
      { src: '/images/gymflex-cityhall/04_center_overview.jpg', category: '센터 전경' },
      { src: '/images/gymflex-cityhall/02_weight_zone_machines.jpg', category: '웨이트존' },
      { src: '/images/gymflex-cityhall/03_freeweight_dumbbell_zone.jpg', category: '프리웨이트존' },
      { src: '/images/gymflex-cityhall/01_cardio_zone_treadmills.jpg', category: '유산소존' },
      { src: '/images/gymflex-cityhall/05_bonus_posing_room.jpg', category: '포징룸' },
      { src: '/images/gymflex-cityhall/06_bonus_healing_zone.jpg', category: '힐링존' },
    ],
    facilities: [], // 확인된 시설 목록만 기재
    subscriptionEnabled: true,
  },
  {
    id: 'oldgym-pyeonggeo',
    brand: BRANDS.OLD_GYM,
    storeName: '올드짐 평거점',
    shortName: '평거점',
    region: '진주',
    monthlyPrice: null,
    address: null,
    operatingHours: null,
    parking: null,
    phone: null,
    naverUrl: null,
    instagramUrl: null,
    images: [], // public/images/oldgym-pyeonggeo/ 에 실제 사진 추가 후 경로 기재
    facilities: [],
    subscriptionEnabled: true,
  },
  {
    id: 'mf-bogeondae',
    brand: BRANDS.MUSCLE_FACTORY,
    storeName: '머슬팩토리 보건대점',
    shortName: '보건대점',
    region: '진주',
    monthlyPrice: 45000, // 보건대점 전용 월 구독가
    address: null,
    operatingHours: null,
    parking: null,
    phone: null,
    naverUrl: null,
    instagramUrl: null,
    images: [],
    facilities: [],
    subscriptionEnabled: true,
  },
  {
    id: 'mf-samcheonpo',
    brand: BRANDS.MUSCLE_FACTORY,
    storeName: '머슬팩토리 삼천포점',
    shortName: '삼천포점',
    region: '사천',
    monthlyPrice: null,
    address: null,
    operatingHours: null,
    parking: null,
    phone: null,
    naverUrl: null,
    instagramUrl: null,
    images: [],
    facilities: [],
    subscriptionEnabled: true,
  },
  {
    id: 'mf-samcheonpo-beolli',
    brand: BRANDS.MUSCLE_FACTORY,
    storeName: '머슬팩토리 삼천포 벌리점',
    shortName: '벌리점',
    region: '사천',
    monthlyPrice: null,
    address: null,
    operatingHours: null,
    parking: null,
    phone: null,
    naverUrl: null,
    instagramUrl: null,
    images: [],
    facilities: [],
    subscriptionEnabled: true,
  },
]

/** 구독 운영 지점만 (향후 비구독 지점이 섞여도 안전하게) */
export const SUBSCRIPTION_STORES = STORES.filter((s) => s.subscriptionEnabled)

export const getStore = (id) => STORES.find((s) => s.id === id) || null

/** 실제 사진이 등록된 지점만 — 시설 섹션은 이 목록으로 구성한다 */
export const STORES_WITH_PHOTOS = SUBSCRIPTION_STORES.filter((s) => s.images.length > 0)
