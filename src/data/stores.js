/* ══════════════════════════════════════════════════════════════
   지점 데이터
   ──────────────────────────────────────────────────────────────
   모든 지점은 동일한 schema 를 쓴다. 배열에 객체 하나를 추가하면
   지점 카드 · 선택 지점 상세 · 시설 · 하단 고정 CTA 가 자동 확장된다.

   ⚠ 확인되지 않은 값은 반드시 null 로 둔다. (임의 생성 금지)
      null 인 항목은 소비자 화면에서 행 자체가 렌더링되지 않는다.
      '[지점 정보 입력]' 같은 개발용 문구를 화면에 노출하지 않는다.

   ⚠ 이미지는 실제 센터사진만 사용한다.
      images 가 비어 있으면 AI·스톡 이미지를 넣지 않고 빈 상태로 둔다.
      public/images/<지점 id>/ 에 파일을 넣고 경로만 추가하면 된다.
   ══════════════════════════════════════════════════════════════ */

export const BRANDS = {
  GYMFLEX: { key: 'GYMFLEX', label: '짐플릭스', color: 'var(--color-brand-gymflex)' },
  OLD_GYM: { key: 'OLD GYM', label: '올드짐', color: 'var(--color-brand-oldgym)' },
  MUSCLE_FACTORY: { key: 'MUSCLE FACTORY', label: '머슬팩토리', color: 'var(--color-brand-mf)' },
}

/**
 * 지점 schema
 *   id                   public/images/<id>/ 폴더명과 일치
 *   brand                BRANDS 참조
 *   name                 전체 지점명
 *   shortName            하단 고정 CTA 등에 쓰는 짧은 이름
 *   monthlyPrice         null = 기본가 적용 / 숫자 = 그 지점 전용가
 *   address, hours, parking, phone     미확인이면 null
 *   threeMonthAvailable  3개월 구독권 이용 가능 여부 (미확정 null)
 *   multiClubAvailable   전지점 구독 이용 가능 여부 (미확정 null)
 *   clothingAvailable    운동복 옵션 운영 여부 (미확정 null)
 *   lockerAvailable      개인락커 옵션 운영 여부 (미확정 null)
 *   facilities           확인된 주요 시설만 (최대 5개 노출)
 *   images               실제 센터사진만
 *   links                확인된 외부 채널만
 */
export const STORES = [
  {
    id: 'gymflex-cityhall',
    brand: BRANDS.GYMFLEX,
    name: '짐플릭스 시청점',
    shortName: '시청점',
    monthlyPrice: null,
    address: '경남 진주시 동진로 183 현대자동차 건물 2·3층',
    hours: '24시간 연중무휴',
    parking: null,
    phone: null,
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null,
    lockerAvailable: null,
    facilities: [],
    images: [
      { src: '/images/gymflex-cityhall/04_center_overview.jpg', category: '센터 전경' },
      { src: '/images/gymflex-cityhall/02_weight_zone_machines.jpg', category: '웨이트존' },
      { src: '/images/gymflex-cityhall/03_freeweight_dumbbell_zone.jpg', category: '프리웨이트존' },
      { src: '/images/gymflex-cityhall/01_cardio_zone_treadmills.jpg', category: '유산소존' },
      { src: '/images/gymflex-cityhall/05_bonus_posing_room.jpg', category: '포징룸' },
      { src: '/images/gymflex-cityhall/06_bonus_healing_zone.jpg', category: '힐링존' },
    ],
    links: {
      naver: 'https://naver.me/GJTi4Npj',
      instagram: 'https://www.instagram.com/gymflix_jinju/',
    },
    subscriptionEnabled: true,
  },
  {
    id: 'oldgym-pyeonggeo',
    brand: BRANDS.OLD_GYM,
    name: '올드짐 평거점',
    shortName: '평거점',
    monthlyPrice: null,
    address: null,
    hours: null,
    parking: null,
    phone: null,
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null,
    lockerAvailable: null,
    facilities: [],
    images: [],
    links: {},
    subscriptionEnabled: true,
  },
  {
    id: 'mf-bogeondae',
    brand: BRANDS.MUSCLE_FACTORY,
    name: '머슬팩토리 보건대점',
    shortName: '보건대점',
    monthlyPrice: 45000, // 보건대점 전용 월 구독가
    address: null,
    hours: null,
    parking: null,
    phone: null,
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null, // 운동복 운영 여부·시점 미확정
    lockerAvailable: null,
    facilities: [],
    images: [],
    links: {},
    subscriptionEnabled: true,
  },
  {
    id: 'mf-samcheonpo',
    brand: BRANDS.MUSCLE_FACTORY,
    name: '머슬팩토리 삼천포점',
    shortName: '삼천포점',
    monthlyPrice: null,
    address: null,
    hours: null,
    parking: null,
    phone: null,
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null,
    lockerAvailable: null,
    facilities: [],
    images: [],
    links: {},
    subscriptionEnabled: true,
  },
  {
    id: 'mf-samcheonpo-beolli',
    brand: BRANDS.MUSCLE_FACTORY,
    name: '머슬팩토리 삼천포 벌리점',
    shortName: '벌리점',
    monthlyPrice: null,
    address: null,
    hours: null,
    parking: null,
    phone: null,
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null,
    lockerAvailable: null,
    facilities: [],
    images: [],
    links: {},
    subscriptionEnabled: true,
  },
]

export const SUBSCRIPTION_STORES = STORES.filter((s) => s.subscriptionEnabled)

export const getStore = (id) => STORES.find((s) => s.id === id) || null

/** 시설 섹션 기본 표시용 — 실제 사진이 등록된 첫 지점 */
export const DEFAULT_PHOTO_STORE = SUBSCRIPTION_STORES.find((s) => s.images.length > 0) || null
