/* ══════════════════════════════════════════════════════════════
   지점 데이터
   ──────────────────────────────────────────────────────────────
   모든 지점은 동일한 schema 를 쓴다. 배열에 객체 하나를 추가하면
   지점 카드 · 선택 지점 상세 · 시설 · 하단 고정 CTA 가 자동 확장된다.

   ⚠ 확인되지 않은 값은 반드시 null 로 둔다. (임의 생성 금지)
      null 인 항목은 소비자 화면에서 행 자체가 렌더링되지 않는다.
      '[정보 입력]' / 'TBD' / '확인중' 같은 개발용 문구를 화면에 쓰지 않는다.

   ⚠ 이미지는 실제 센터사진만 사용한다. AI 생성 이미지를 넣지 않는다.
      없으면 thumbImage: null / facilityImages: [] 로 둔다.
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
 *   name / shortName     전체 지점명 / 하단 고정 CTA 등에 쓰는 짧은 이름
 *   monthlyPrice         월 구독가 (보건대점만 45,000원 예외)
 *   description          한 줄 소개. 없으면 null
 *   address / hours / parking / phone     미확인이면 null
 *   mapUrl               네이버지도 길찾기 URL. 확보 전이면 null (임의 생성 금지)
 *   facilities           확인된 시설만. 상세영역에서 최대 6개까지 chip 으로 노출
 *   floors               층별 안내. 없으면 []
 *   threeMonthAvailable / multiClubAvailable    미확정 null
 *   clothingAvailable / lockerAvailable         미확정 null
 *   ctaUrl               지점별 가입/신청 URL. 확정 전이면 null
 *   thumbImage           지점 카드 썸네일(400px). 없으면 null
 *   facilityImages       시설 실사진. 없으면 []
 *   links                확인된 외부 채널만
 */
export const STORES = [
  {
    id: 'gymflex-cityhall',
    brand: BRANDS.GYMFLEX,
    name: '짐플릭스 시청점',
    shortName: '시청점',
    monthlyPrice: 48900,
    description: null,
    address: '경남 진주시 동진로 183 현대자동차 건물 2·3층',
    hours: '24시간 연중무휴',
    parking: null,
    phone: '010-5769-6061',
    mapUrl: null,
    facilities: [],
    floors: [],
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null,
    lockerAvailable: null,
    ctaUrl: null,
    /* 지점별 이용방법. 확정 전까지 null/[] 유지 → 공통 절차로 표시된다.
       확정되면 steps 에 { no, title, description } 배열을 넣으면 이 지점만 덮어쓴다. */
    usageGuide: {
      appName: null,
      steps: [],
      qrImage: null,
      signupUrl: null,
      note: null,
    },
    thumbImage: '/images/gymflex-cityhall/thumb.jpg',
    facilityImages: [
      { src: '/images/gymflex-cityhall/08.jpg', category: '센터 전경' },
      { src: '/images/gymflex-cityhall/09.jpg', category: '웨이트 머신존' },
      { src: '/images/gymflex-cityhall/07.jpg', category: '프리웨이트존' },
      { src: '/images/gymflex-cityhall/03.jpg', category: '유산소존' },
      { src: '/images/gymflex-cityhall/05.jpg', category: '트레드밀존' },
      { src: '/images/gymflex-cityhall/06.jpg', category: '사이클존' },
      { src: '/images/gymflex-cityhall/02.jpg', category: '스트레칭존' },
      { src: '/images/gymflex-cityhall/01.jpg', category: '건식 반신욕기' },
      { src: '/images/gymflex-cityhall/04.jpg', category: '락커·파우더룸' },
      { src: '/images/gymflex-cityhall/10.jpg', category: '라운지' },
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
    monthlyPrice: 48900,
    description: null,
    address: '경남 진주시 순환로 539 오승빌딩 6·7층',
    hours: null,
    parking: null,
    phone: null,
    mapUrl: null,
    // 상세영역에서 앞 6개까지 chip 으로 노출된다 (순서 = 우선순위)
    facilities: [
      '웨이트존 약 300평',
      '파워랙 라인',
      '유산소존',
      '스트레칭존',
      'GX·스피닝·점핑',
      'PT 공간',
      '탈의실·샤워실',
      '건식 반신욕기',
    ],
    floors: [
      { label: '6F', detail: 'GX · 공용시설 · 탈의실 · 샤워실 · 스트레칭존' },
      { label: '7F', detail: '웨이트 · 유산소 · PT' },
    ],
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null,
    lockerAvailable: null,
    ctaUrl: null,
    /* 지점별 이용방법. 확정 전까지 null/[] 유지 → 공통 절차로 표시된다.
       확정되면 steps 에 { no, title, description } 배열을 넣으면 이 지점만 덮어쓴다. */
    usageGuide: {
      appName: null,
      steps: [],
      qrImage: null,
      signupUrl: null,
      note: null,
    },
    thumbImage: '/images/oldgym-pyeonggeo/thumb.jpg',
    facilityImages: [
      { src: '/images/oldgym-pyeonggeo/07.jpg', category: '센터 전경' },
      { src: '/images/oldgym-pyeonggeo/05.jpg', category: '머신존' },
      { src: '/images/oldgym-pyeonggeo/04.jpg', category: '웨이트존' },
      { src: '/images/oldgym-pyeonggeo/06.jpg', category: '프리웨이트존' },
      { src: '/images/oldgym-pyeonggeo/08.jpg', category: '유산소존' },
      { src: '/images/oldgym-pyeonggeo/02.jpg', category: '트레드밀존' },
      { src: '/images/oldgym-pyeonggeo/01.jpg', category: '스트레칭존' },
      { src: '/images/oldgym-pyeonggeo/03.jpg', category: '건식 반신욕기' },
    ],
    links: {},
    subscriptionEnabled: true,
  },
  {
    id: 'mf-bogeondae',
    brand: BRANDS.MUSCLE_FACTORY,
    name: '머슬팩토리24 보건대점',
    shortName: '보건대점',
    monthlyPrice: 45000, // 보건대점 전용 월 구독가
    description: null,
    address: '경남 진주시 북장대로 96 2층',
    hours: '24시간 운영',
    parking: '주차 가능',
    phone: null,
    mapUrl: null,
    facilities: ['PT 운영', '샤워시설'],
    floors: [],
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null, // 운동복 구독 옵션 적용 여부 최종 확정 전
    lockerAvailable: null,
    ctaUrl: null,
    /* 지점별 이용방법. 확정 전까지 null/[] 유지 → 공통 절차로 표시된다.
       확정되면 steps 에 { no, title, description } 배열을 넣으면 이 지점만 덮어쓴다. */
    usageGuide: {
      appName: null,
      steps: [],
      qrImage: null,
      signupUrl: null,
      note: null,
    },
    thumbImage: null,
    facilityImages: [],
    links: {},
    subscriptionEnabled: true,
  },
  {
    id: 'mf-samcheonpo',
    brand: BRANDS.MUSCLE_FACTORY,
    name: '머슬팩토리24 삼천포 본점',
    shortName: '삼천포 본점',
    monthlyPrice: 48900,
    description: '웨이트와 유산소 공간을 갖춘 삼천포 본점 구독 운영 지점.',
    address: '경남 사천시 주공로 18 2층',
    hours: '24시간 연중무휴',
    parking: '주차 가능',
    phone: '0507-1328-7763',
    mapUrl: null,
    facilities: ['웨이트존', '유산소존', '웨이트 머신', '샤워실', '건식 반신욕기'],
    floors: [],
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null,
    lockerAvailable: null,
    ctaUrl: null,
    /* 지점별 이용방법. 확정 전까지 null/[] 유지 → 공통 절차로 표시된다.
       확정되면 steps 에 { no, title, description } 배열을 넣으면 이 지점만 덮어쓴다. */
    usageGuide: {
      appName: null,
      steps: [],
      qrImage: null,
      signupUrl: null,
      note: null,
    },
    thumbImage: '/images/mf-samcheonpo/thumb.jpg',
    facilityImages: [
      { src: '/images/mf-samcheonpo/03.jpg', category: '웨이트존' },
      { src: '/images/mf-samcheonpo/02.jpg', category: '파워랙존' },
      { src: '/images/mf-samcheonpo/05.jpg', category: '머신존' },
      { src: '/images/mf-samcheonpo/04.jpg', category: '유산소·머신존' },
      { src: '/images/mf-samcheonpo/01.jpg', category: '스트레칭존' },
    ],
    links: {},
    subscriptionEnabled: true,
  },
  {
    id: 'mf-samcheonpo-beolli',
    brand: BRANDS.MUSCLE_FACTORY,
    name: '머슬팩토리24 삼천포 벌리점',
    shortName: '벌리점',
    monthlyPrice: 48900,
    description: null,
    address: '경남 사천시 신항로 116',
    // 아래 항목은 확인되지 않아 null 유지 → 화면에서 행 자체가 숨겨진다
    hours: null,
    parking: null,
    phone: null,
    mapUrl: null,
    facilities: [],
    floors: [],
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null,
    lockerAvailable: null,
    ctaUrl: null,
    /* 지점별 이용방법. 확정 전까지 null/[] 유지 → 공통 절차로 표시된다.
       확정되면 steps 에 { no, title, description } 배열을 넣으면 이 지점만 덮어쓴다. */
    usageGuide: {
      appName: null,
      steps: [],
      qrImage: null,
      signupUrl: null,
      note: null,
    },
    thumbImage: '/images/mf-samcheonpo-beolli/thumb.jpg',
    facilityImages: [
      { src: '/images/mf-samcheonpo-beolli/04.jpg', category: '센터 전경' },
      { src: '/images/mf-samcheonpo-beolli/01.jpg', category: '웨이트존' },
      { src: '/images/mf-samcheonpo-beolli/06.jpg', category: '프리웨이트존' },
      { src: '/images/mf-samcheonpo-beolli/05.jpg', category: '머신 라인' },
      { src: '/images/mf-samcheonpo-beolli/03.jpg', category: '머신존' },
      { src: '/images/mf-samcheonpo-beolli/02.jpg', category: '유산소존' },
    ],
    links: {},
    subscriptionEnabled: true,
  },
]

/** 상세영역에 노출할 시설 chip 최대 개수 — UI 가 복잡해지지 않게 제한한다 */
export const MAX_FACILITY_CHIPS = 6

export const SUBSCRIPTION_STORES = STORES.filter((s) => s.subscriptionEnabled)

export const getStore = (id) => STORES.find((s) => s.id === id) || null

/** 시설 섹션 기본 표시용 — 실제 사진이 등록된 첫 지점 */
export const DEFAULT_PHOTO_STORE =
  SUBSCRIPTION_STORES.find((s) => s.facilityImages.length > 0) || null
