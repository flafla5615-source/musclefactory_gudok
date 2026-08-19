/* ══════════════════════════════════════════════════════════════
   카피 · FAQ · 이용방법 · 혜택 텍스트
   화면 컴포넌트에서 문구를 직접 수정하지 않고 이 파일에서 관리한다.
   ══════════════════════════════════════════════════════════════ */

/* ── 구독 BENEFIT ── */
export const BENEFITS = [
  {
    id: 'monthly-payment',
    icon: 'solar:calendar-mark-linear',
    title: '월 단위 결제',
    description: '목돈 부담 없이.',
  },
  {
    id: 'my-store',
    icon: 'solar:map-point-linear',
    title: '내 지점 선택',
    description: '가까운 센터에서.',
  },
  {
    id: 'multi-club',
    icon: 'solar:widget-5-linear',
    title: '전지점 옵션',
    description: '필요하면 더 넓게.',
  },
  {
    id: 'add-ons',
    icon: 'solar:checklist-minimalistic-linear',
    title: '필요한 옵션만',
    description: '운동복과 락커는 선택.',
  },
]

/* ── 구독제란 무엇인가 (SECTION 03) ── */
export const SUBSCRIPTION_POINTS = [
  {
    id: 'no-lump-sum',
    icon: 'solar:wallet-money-linear',
    title: '한 번에 큰 금액 X',
    description: '처음부터 1년치를 결제하지 않습니다.',
  },
  {
    id: 'recurring',
    icon: 'solar:card-linear',
    title: '매월 정기결제',
    description: '이용하는 달에 이용료를 냅니다.',
  },
  {
    id: 'choose',
    icon: 'solar:hand-stars-linear',
    title: '내게 맞는 상품 선택',
    description: '이용방식을 직접 고릅니다.',
  },
]

/* ── 이용방법 (HOW TO USE) ── */
export const HOW_TO_STEPS = [
  { no: '01', title: '내 지점 선택', description: '구독 운영지점 중 주로 다닐 센터를 고릅니다.' },
  { no: '02', title: '구독상품 선택', description: '월 구독 · 전지점 구독 중 이용방식을 정합니다.' },
  { no: '03', title: '결제', description: '결제 방식은 최종 확정 후 안내드립니다.' },
  { no: '04', title: '센터 이용 시작', description: '선택한 지점에서 바로 운동을 시작합니다.' },
]

/* ── FAQ ──
   ⚠ 아래 답변 중 '내부 검토안' 표현은 최종 약관 확정 시
      반드시 실제 약관과 동일한 문장으로 교체해야 한다. */
export const FAQS = [
  {
    id: 'auto-payment',
    question: '구독료는 매달 자동결제되나요?',
    answer:
      '최초 가입일을 기준으로 매월 자동결제되는 방향으로 준비하고 있습니다. 정확한 결제일과 방식은 최종 정책에 맞춰 안내드립니다.',
  },
  {
    id: 'contract',
    question: '장기 약정이 있나요?',
    answer:
      '현재 내부안은 최소 유지기간과 별도 해지 위약금이 없는 방향입니다. 최종 약관이 확정되면 정확한 내용을 공개합니다.',
  },
  {
    id: 'cancel',
    question: '해지는 어떻게 하나요?',
    answer:
      '현재 검토 중인 방식은 다음 정기결제일 3일 전까지 신청하면 다음 회차 자동결제가 중단되고, 이미 결제된 이용기간까지는 그대로 이용하는 구조입니다. 최종 약관과 동일한 내용으로 다시 안내드립니다.',
  },
  {
    id: 'pause',
    question: '구독을 잠시 정지할 수 있나요?',
    answer:
      '현재 내부안은 구독 유지 중 1회, 1개월 일시정지입니다. 최종 공개 정책 확인 후 반영해 안내드립니다.',
  },
  {
    id: 'options',
    question: '운동복과 락커가 포함되나요?',
    answer:
      '기본 구독료에는 포함되지 않습니다. 운동복 월 11,000원, 개인락커 월 15,000원으로 필요한 옵션만 추가하실 수 있습니다.',
  },
  {
    id: 'other-stores',
    question: '다른 지점도 이용할 수 있나요?',
    answer:
      '전지점 구독 상품을 통해 이용하는 구조입니다. 정확한 이용 가능 지점과 이용 횟수는 최종 정책에 맞춰 안내드립니다.',
  },
  {
    id: 'pt',
    question: 'PT도 포함되나요?',
    answer: 'PT는 구독료와 별도 상품입니다. PT 문의는 각 지점으로 해주세요.',
  },
  {
    id: 'annual-vs-monthly',
    question: '12개월권과 월 구독의 차이는 무엇인가요?',
    answer:
      '월 구독은 매월 정기결제로 이용하는 방식입니다. 12개월 399,000원은 구독제 OPEN 기간에 별도로 운영하는 장기회원권 상품입니다.',
  },
]

/* ── 시설 카테고리 (지점 사진 태깅용 참고 목록) ── */
export const FACILITY_CATEGORIES = [
  '센터 전경',
  '웨이트존',
  '프리웨이트존',
  '유산소존',
  '스트레칭존',
  '주요 머신',
  '샤워·락커',
]
