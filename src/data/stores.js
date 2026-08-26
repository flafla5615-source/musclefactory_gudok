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
 *   status               'open' 운영 중 | 'coming_soon' 오픈 예정
 *   monthlyPrice         월 구독가. 현재 전 지점 48,900원 동일
 *   highlights           오픈 예정 지점의 대표 특징 3개 이하. 운영 지점은 없어도 된다
 *   longTermOffer        선착순 장기권. 이 페이지의 장기권 가격은 전부 여기서만 온다.
 *                        { months, price, active, upcoming? }
 *                        · 가격이 바뀌면 이 객체의 price 한 곳만 고치면
 *                          지점 상세 · 오픈 예정 카드에 동시에 반영된다.
 *                          (JSX 어디에도 장기권 금액을 하드코딩하지 않는다)
 *                        · active: false 면 선착순 마감으로 보고 영역을 숨긴다
 *                        · upcoming: true 면 '오픈 시 예정가' 로 표기한다
 *                        · 가격 미확정 지점은 null. 임의 생성 금지 → 영역 자체가 사라진다
 *   ⚠ 장기권은 월 구독보다 시각적 우선순위를 낮춘다. 지점 목록 카드에는 넣지 않고
 *      지점을 선택했을 때 상세영역에서만 보여준다.
 *   description          한 줄 소개. 없으면 null
 *   address / locationNote / hours / parking / phone   미확인이면 null
 *   locationNote         랜드마크 기준 위치 안내 (예: 「○○건물 2층」)
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
    status: 'open',
    // 장기권 가격 미확정 → null. 임의 생성 금지. 확정되면 아래 형태로 채운다.
    longTermOffer: null,
    description: null,
    address: '경남 진주시 동진로 183 현대자동차 건물 2·3층',
    locationNote: null,
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
    usageGuide: {
      appName: '짐서폿',
      appType: 'gymsupport',
      entryMethod: 'QR',
      headline: '짐서폿 앱으로 가입하고 QR로 간편하게 입장하세요.',
      steps: [
        '짐서폿 앱 설치',
        '회원가입',
        '구독권 구매',
        '앱 QR로 입장',
      ],
      // 앱스토어 링크는 검증 완료. QR · 가입링크는 미제공 → 임의 생성 금지
      appStore: {
        ios: 'https://apps.apple.com/kr/app/id6497406116',
        android: 'https://play.google.com/store/apps/details?id=com.gymsupport',
      },
      qrImage: null,
      signupUrl: null,
      note: '앱스토어에는 「짐구독」 으로 등록되어 있습니다.',
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
    status: 'open',
    longTermOffer: { months: 10, price: 428000, active: true },
    description: null,
    address: '경남 진주시 순환로 539 오승빌딩 6·7층',
    locationNote: null,
    hours: null,
    parking: null,
    phone: '010-6438-7731',
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
    usageGuide: {
      appName: '바디코디',
      appType: 'bodycodi',
      entryMethod: null,
      headline: '바디코디 앱에서 가입하고 구독상품을 구매하세요.',
      steps: [
        '바디코디 앱 설치',
        '회원가입',
        '구독권 구매',
        'QR로 입장',
      ],
      // 앱스토어 링크는 검증 완료. QR · 가입링크는 미제공 → 임의 생성 금지
      appStore: {
        ios: 'https://apps.apple.com/kr/app/id1557408918',
        android: 'https://play.google.com/store/apps/details?id=com.bodycodi.bpay',
      },
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
    monthlyPrice: 48900,
    status: 'open',
    longTermOffer: { months: 10, price: 399000, active: true },
    description: null,
    address: '경남 진주시 북장대로 96 2층',
    locationNote: '상봉동 바다마트 건물 2층',
    hours: '24시간 운영',
    parking: '건물 옆 도로 주차',
    phone: '010-9678-2550',
    mapUrl: null,
    facilities: ['PT 운영', '샤워시설'],
    floors: [],
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null, // 운동복 구독 옵션 적용 여부 최종 확정 전
    lockerAvailable: null,
    ctaUrl: null,
    usageGuide: {
      appName: '바디코디',
      appType: 'bodycodi',
      entryMethod: null,
      headline: '바디코디 앱에서 가입하고 구독상품을 구매하세요.',
      steps: [
        '바디코디 앱 설치',
        '회원가입',
        '구독권 구매',
        'QR로 입장',
      ],
      // 앱스토어 링크는 검증 완료. QR · 가입링크는 미제공 → 임의 생성 금지
      appStore: {
        ios: 'https://apps.apple.com/kr/app/id1557408918',
        android: 'https://play.google.com/store/apps/details?id=com.bodycodi.bpay',
      },
      qrImage: null,
      signupUrl: null,
      note: null,
    },
    thumbImage: '/images/mf-bogeondae/thumb.jpg',
    facilityImages: [
      { src: '/images/mf-bogeondae/10.jpg', category: '센터 전경' },
      { src: '/images/mf-bogeondae/01.jpg', category: '유산소존' },
      { src: '/images/mf-bogeondae/02.jpg', category: '머신존' },
      { src: '/images/mf-bogeondae/03.jpg', category: '프리웨이트존' },
      { src: '/images/mf-bogeondae/05.jpg', category: '웨이트존' },
    ],
    links: {},
    subscriptionEnabled: true,
  },
  {
    // 신규 구독 운영지점. 확인되지 않은 정보는 전부 null 로 둔다.
    // 주소·운영시간·주차·전화·시설·사진 확정 시 이 객체만 채우면 된다.
    id: 'mf-sinjinju',
    brand: BRANDS.MUSCLE_FACTORY,
    name: '머슬팩토리24 신진주역점',
    shortName: '신진주역점',
    monthlyPrice: 48900,
    status: 'open',
    // 장기권 가격 미확정 → null (장기권 영역 자체가 렌더링되지 않는다)
    longTermOffer: null,
    description: null,
    address: '경남 진주시 개양로 112, 신진주역세권 줌테라스 2층',
    locationNote: null,
    // 여러 줄은 \n 으로 구분한다 (상세영역에서 줄바꿈되어 표시)
    hours: '평일 05:00 ~ 익일 01:30\n주말·공휴일 10:00 ~ 22:00',
    parking: '가능 · 최대 3시간 무료',
    phone: '010-8729-2550',
    mapUrl: null,
    // 실사진에서 직접 확인되는 존만 기재
    facilities: ['유산소존', '웨이트존', '머신존', '프리웨이트존'],
    floors: [],
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null,
    lockerAvailable: null,
    ctaUrl: null,
    usageGuide: {
      appName: '바디코디',
      appType: 'bodycodi',
      entryMethod: null,
      headline: '바디코디 앱에서 가입하고 구독상품을 구매하세요.',
      steps: [
        '바디코디 앱 설치',
        '회원가입',
        '구독권 구매',
        'QR로 입장',
      ],
      // 앱스토어 링크는 검증 완료. QR · 가입링크는 미제공 → 임의 생성 금지
      appStore: {
        ios: 'https://apps.apple.com/kr/app/id1557408918',
        android: 'https://play.google.com/store/apps/details?id=com.bodycodi.bpay',
      },
      qrImage: null,
      signupUrl: null,
      note: null,
    },
    // 대표 = 09 (2층에서 내려다본 센터 전경, 공간감이 가장 넓다)
    thumbImage: '/images/mf-sinjinju/thumb.jpg',
    facilityImages: [
      { src: '/images/mf-sinjinju/sinjinju-09.jpg', category: '센터 전경' },
      { src: '/images/mf-sinjinju/sinjinju-03.jpg', category: '유산소존' },
      { src: '/images/mf-sinjinju/sinjinju-10.jpg', category: '머신존' },
      { src: '/images/mf-sinjinju/sinjinju-06.jpg', category: '웨이트존' },
      { src: '/images/mf-sinjinju/sinjinju-07.jpg', category: '프리웨이트존' },
      { src: '/images/mf-sinjinju/sinjinju-01.jpg', category: '스텝밀존' },
    ],
    links: {},
    subscriptionEnabled: true,
  },
  {
    id: 'mf-samcheonpo',
    brand: BRANDS.MUSCLE_FACTORY,
    name: '머슬팩토리24 삼천포 본점',
    shortName: '삼천포 본점',
    monthlyPrice: 48900,
    status: 'open',
    // ⚠ 다음 달 428,000원으로 변경 예정. 그때 price 만 고치면 전 화면에 반영된다.
    longTermOffer: { months: 10, price: 499000, active: true },
    description: '웨이트와 유산소 공간을 갖춘 삼천포 본점 구독 운영 지점.',
    address: '경남 사천시 주공로 18 2층',
    locationNote: null,
    hours: '24시간 연중무휴',
    parking: '주차 가능',
    phone: '010-5675-7763',
    mapUrl: null,
    facilities: ['웨이트존', '유산소존', '웨이트 머신', '샤워실', '건식 반신욕기'],
    floors: [],
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null,
    lockerAvailable: null,
    ctaUrl: null,
    usageGuide: {
      appName: '바디코디',
      appType: 'bodycodi',
      entryMethod: null,
      headline: '바디코디 앱에서 가입하고 구독상품을 구매하세요.',
      steps: [
        '바디코디 앱 설치',
        '회원가입',
        '구독권 구매',
        'QR로 입장',
      ],
      // 앱스토어 링크는 검증 완료. QR · 가입링크는 미제공 → 임의 생성 금지
      appStore: {
        ios: 'https://apps.apple.com/kr/app/id1557408918',
        android: 'https://play.google.com/store/apps/details?id=com.bodycodi.bpay',
      },
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
    status: 'open',
    // ⚠ 다음 달 399,000원으로 변경 예정. 그때 price 만 고치면 전 화면에 반영된다.
    longTermOffer: { months: 10, price: 499000, active: true },
    description: null,
    address: '경남 사천시 신항로 116',
    locationNote: '벌리동 김밥천국 건물 2·3층',
    // 아래 항목은 확인되지 않아 null 유지 → 화면에서 행 자체가 숨겨진다
    hours: null,
    parking: null,
    phone: '010-9965-6061',
    mapUrl: null,
    facilities: [],
    floors: [],
    threeMonthAvailable: null,
    multiClubAvailable: null,
    clothingAvailable: null,
    lockerAvailable: null,
    ctaUrl: null,
    usageGuide: {
      appName: '바디코디',
      appType: 'bodycodi',
      entryMethod: null,
      headline: '바디코디 앱에서 가입하고 구독상품을 구매하세요.',
      steps: [
        '바디코디 앱 설치',
        '회원가입',
        '구독권 구매',
        'QR로 입장',
      ],
      // 앱스토어 링크는 검증 완료. QR · 가입링크는 미제공 → 임의 생성 금지
      appStore: {
        ios: 'https://apps.apple.com/kr/app/id1557408918',
        android: 'https://play.google.com/store/apps/details?id=com.bodycodi.bpay',
      },
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
  /* ══════════════════════════════════════════════════════════
     오픈 예정 지점 (status: 'coming_soon')
     ──────────────────────────────────────────────────────────
     subscriptionEnabled: false 이므로 SUBSCRIPTION_STORES 에 들어가지 않는다.
       → 지점 선택 목록 · 선택 상세 · 결제 CTA · 시설 섹션에 나타나지 않는다.
       → ComingSoon 섹션에서만 안내용으로 렌더링된다.

     ⚠ 실제 센터 사진 미확보. 다른 지점 사진이나 AI 이미지를 넣지 않는다.
        thumbImage: null / facilityImages: [] 를 유지하면
        카드가 사진 대기 placeholder 로 표시된다.
     ⚠ longTermOffer.upcoming: true 는 '오픈 시 적용 예정가' 라는 뜻이다.
        현재 판매 중인 가격이 아니므로 화면에 '예정' 표기가 함께 나간다.

     오픈이 확정되면 이 객체에서
       status: 'open' / subscriptionEnabled: true 로 바꾸고
       longTermOffer 의 upcoming 을 지운 뒤
       주소·운영시간·주차·전화·시설·사진을 채우면
       그대로 정식 구독 운영지점 목록으로 올라간다.
     ══════════════════════════════════════════════════════════ */
  {
    id: 'mf-jinju-gangnam',
    brand: BRANDS.MUSCLE_FACTORY,
    name: '머슬팩토리24 진주강남점',
    shortName: '진주강남점',
    status: 'coming_soon',
    monthlyPrice: 48900,
    description: null,
    highlights: ['약 500평대 대형 프리미엄 헬스장', '다양한 외산 프리미엄 머신 구성', '넓은 주차공간'],
    longTermOffer: { months: 10, price: 428000, active: true, upcoming: true },
    address: null,
    locationNote: null,
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
    usageGuide: null,
    thumbImage: null,
    facilityImages: [],
    links: {},
    subscriptionEnabled: false,
  },
  {
    id: 'mf-hyeoksin',
    brand: BRANDS.MUSCLE_FACTORY,
    name: '머슬팩토리24 혁신점',
    shortName: '혁신점',
    status: 'coming_soon',
    monthlyPrice: 48900,
    description: null,
    highlights: ['약 500평대 대형 프리미엄 헬스장', '다양한 외산 프리미엄 머신 구성'],
    longTermOffer: { months: 10, price: 428000, active: true, upcoming: true },
    address: null,
    locationNote: null,
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
    usageGuide: null,
    thumbImage: null,
    facilityImages: [],
    links: {},
    subscriptionEnabled: false,
  },
]

/** 상세영역에 노출할 시설 chip 최대 개수 — UI 가 복잡해지지 않게 제한한다 */
export const MAX_FACILITY_CHIPS = 6

export const SUBSCRIPTION_STORES = STORES.filter((s) => s.subscriptionEnabled)

/** 오픈 예정 지점 — 운영 지점 목록 뒤에 안내용으로만 노출한다 */
export const COMING_SOON_STORES = STORES.filter((s) => s.status === 'coming_soon')

export const getStore = (id) => STORES.find((s) => s.id === id) || null

/** 시설 섹션 기본 표시용 — 실제 사진이 등록된 첫 지점 */
export const DEFAULT_PHOTO_STORE =
  SUBSCRIPTION_STORES.find((s) => s.facilityImages.length > 0) || null
