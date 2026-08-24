/* ══════════════════════════════════════════════════════════════
   카피 · FAQ · 이용방법 · 회원 인터뷰
   화면 컴포넌트에서 문구를 직접 수정하지 않고 이 파일에서 관리한다.

   서비스명: GYM PASS
   캠페인 메시지: "일단 한 달."
   ══════════════════════════════════════════════════════════════ */

/* ── 왜 일단 한 달인가 (CAMPAIGN WHY) — 3개 이하 ── */
export const CAMPAIGN_POINTS = [
  {
    id: 'no-contract',
    no: '01',
    title: '장기 회원권 없이\n한 달부터 시작',
    description: '6개월, 12개월을 먼저 결제하지 않습니다.',
  },
  {
    id: 'auto-pay',
    no: '02',
    title: '매월 자동결제\n번거로운 재등록 없이',
    description: '등록한 결제수단으로 매월 결제됩니다.',
  },
  {
    id: 'pause',
    no: '03',
    title: '필요하지 않을 땐\n언제든 구독 정지',
    description: '쉬어야 할 때 구독을 멈출 수 있습니다.',
  },
]

/* ══════════════════════════════════════════════════════════════
   곧 추가될 지점
   ⚠ 지점명을 공개하지 않는다. 확정·공개 시점이 오면 그때 교체한다.
   ══════════════════════════════════════════════════════════════ */
export const COMING_SOON = [
  { id: 'next-1', brand: 'Muscle Factory 24' },
  { id: 'next-2', brand: 'Muscle Factory 24' },
]

/* ── 혜택 (BENEFIT) — 4개 이하. 상품 설명을 반복하지 않는다 ── */
export const BENEFITS = [
  { id: 'start-month', icon: 'solar:calendar-mark-linear', title: '한 달부터 시작', description: '기간을 미리 정하지 않아도 됩니다.' },
  { id: 'no-lump-sum', icon: 'solar:wallet-money-linear', title: '큰 목돈 부담 감소', description: '한 번에 결제하지 않습니다.' },
  { id: 'my-store', icon: 'solar:map-point-linear', title: '가까운 지점 선택', description: '다닐 센터를 직접 고릅니다.' },
  { id: 'add-ons', icon: 'solar:checklist-minimalistic-linear', title: '필요한 옵션만 추가', description: '운동복과 락커는 선택입니다.' },
]

/* ══════════════════════════════════════════════════════════════
   이용방법
   ──────────────────────────────────────────────────────────────
   ⚠ 지점마다 사용하는 앱이 다르다.
        짐플릭스 시청점 → 짐서폿 (QR 출입)
        그 외 지점      → 바디코디 (카드 등록 후 구독상품 구매)
      실제 절차는 stores.js 의 usageGuide 에서만 관리한다.

   아래 기본값은 usageGuide 가 비어 있는 지점을 위한 안전장치다.
   어떤 앱인지 단정하면 안 되므로 appName 을 null 로 두고
   단계도 앱 이름 없이 일반적인 흐름만 적는다.
   ══════════════════════════════════════════════════════════════ */
export const DEFAULT_USAGE_GUIDE = {
  appName: null,
  appType: null,
  entryMethod: null,
  headline: null,
  steps: ['앱 설치', '회원가입', '결제수단 등록', '구독상품 구매', '센터 이용 시작'],
}

/* ── 페이지 후반 공통 요약 — 전체 흐름만 짧게 ── */
export const FLOW_SUMMARY = [
  { no: '01', title: '지점 선택' },
  { no: '02', title: '상품 선택' },
  { no: '03', title: '가입' },
  { no: '04', title: '이용 시작' },
]

/* ══════════════════════════════════════════════════════════════
   회원 인터뷰
   ⚠ 실제 답변이 확보되기 전에는 후기 문구를 임의로 만들지 않는다.
      videoSrc 가 null 이면 가짜 영상·스톡 영상을 쓰지 않고
      placeholder 만 보여준다.
   ══════════════════════════════════════════════════════════════ */
export const MEMBER_INTERVIEW = {
  videoSrc: null,      // 예: '/videos/cityhall-member.mp4'
  thumbnail: null,     // 영상 포스터 이미지
  memberLabel: 'GYM PASS 실제 이용회원',
  storeName: null,     // 확인되면 예: '짐플릭스 시청점'
  quote: null,         // 실제 인용문이 확보되기 전까지 null
  duration: null,      // 예: '1:24'
  // 영상에 담을 질문 (실제 답변이 아니라 질문 목록이다)
  questions: [
    '처음에는 한 달만 해보려고 하셨나요?',
    '현재 몇 개월째 이용 중이세요?',
    '한 달씩 결제하는 방식에서 가장 편한 점은 무엇인가요?',
    '일단 한 달 해보셨는데 어떠셨어요?',
  ],
}

/* ══════════════════════════════════════════════════════════════
   FAQ — GYM PASS 기준
   ⚠ 정책 미확정 항목은 확정 전까지 단정하지 않는다.
   ══════════════════════════════════════════════════════════════ */
export const FAQS = [
  {
    id: 'one-month',
    question: '한 달만 이용할 수 있나요?',
    answer: '네. 장기 회원권 없이 월 단위로 이용할 수 있습니다.',
  },
  {
    id: 'auto-payment',
    question: '매달 다시 결제해야 하나요?',
    answer: '월 구독은 등록된 결제수단으로 자동 결제됩니다.',
  },
  {
    id: 'pause',
    question: '언제든 정지할 수 있나요?',
    answer: '네. 필요하지 않을 때 구독을 정지할 수 있습니다.',
  },
  {
    id: 'monthly-price',
    question: '월 구독료는 얼마인가요?',
    answer: 'GYM PASS 월 구독료는 전 지점 월 48,900원입니다. 락커와 운동복은 별도 옵션입니다.',
  },
  {
    id: 'app',
    question: '모든 지점에서 같은 앱을 사용하나요?',
    answer:
      '아닙니다. 짐플릭스 시청점은 짐서폿 앱을 사용하며, 올드짐 평거점과 머슬팩토리24 보건대점·삼천포 본점·삼천포 벌리점은 바디코디 앱을 사용합니다.',
  },
  {
    id: 'options',
    question: '락커와 운동복도 포함인가요?',
    answer: '락커 및 운동복은 별도 옵션입니다. 운동복 월 11,000원, 개인락커 월 15,000원입니다.',
  },
  {
    id: 'other-stores',
    question: '다른 지점도 이용할 수 있나요?',
    answer:
      '전지점 구독 상품을 통해 이용하는 구조입니다. 정확한 이용 가능 지점과 이용 횟수는 최종 정책에 맞춰 안내드립니다.',
  },
  {
    id: 'quarterly',
    question: '3개월 상품은 언제 이용할 수 있나요?',
    answer: '3개월 구독권은 가격과 세부 이용조건이 확정되는 대로 공개할 예정입니다.',
  },
]

/* ── 시설 카테고리 (지점 사진 태깅용 참고 목록) ── */
export const FACILITY_CATEGORIES = [
  '센터 전경',
  '웨이트존',
  '프리웨이트존',
  '머신존',
  '유산소존',
  '스트레칭존',
  '샤워·락커',
]
