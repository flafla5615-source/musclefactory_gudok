/* ══════════════════════════════════════════════════════════════
   GYM PASS 공식 지원센터 데이터
   ──────────────────────────────────────────────────────────────
   /support · /terms · /privacy · /account-deletion · /subscription-cancel
   다섯 지원페이지와 메인 랜딩 Footer 가 이 파일 하나만 바라본다.

   ⚠ 확인되지 않은 값은 전부 null 로 둔다. (임의 생성 절대 금지)
      · 회사명 / 대표자 / 사업자등록번호 / 주소 / 대표번호
      · 고객센터 전화 · 운영시간 · 이메일
      · 개인정보 보호책임자 · 수집항목 · 보유기간 · 위탁업체
      · 앱 내 구독 해지 / 회원 탈퇴 메뉴 경로
      · 탈퇴 및 삭제 처리기간
      null 인 항목은 소비자 화면에서 행 자체가 렌더링되지 않는다.
      '010-0000-0000' / 'TBD' / '확인중' 같은 값을 넣지 않는다.

   ⚠ 법률 문구를 임의로 완성하지 않는다.
      확정 원문을 받기 전까지 '준비 중' 상태를 정직하게 표시한다.
   ══════════════════════════════════════════════════════════════ */

import { SUBSCRIPTION_STORES } from './stores.js'
import { getAppInfo } from '../lib/appstore.js'

/* ══════════════ 지원페이지 라우트 ══════════════
   메인 랜딩 Footer · 각 지원페이지의 '관련 메뉴' 가 모두 이 배열을 쓴다.
   경로를 바꾸면 vite.config.js 의 input 과 해당 폴더의 index.html 도 함께 바꾼다. */
export const SUPPORT_LINKS = [
  { id: 'support', href: '/support', label: '고객센터' },
  { id: 'terms', href: '/terms', label: '이용약관' },
  { id: 'privacy', href: '/privacy', label: '개인정보처리방침' },
  { id: 'account-deletion', href: '/account-deletion', label: '회원 탈퇴 안내' },
  { id: 'subscription-cancel', href: '/subscription-cancel', label: '구독 해지·환불 안내' },
]

/** 현재 페이지를 뺀 나머지 메뉴 (원하는 순서만 골라 쓸 수도 있다) */
export function relatedLinks(currentId, onlyIds = null) {
  return SUPPORT_LINKS.filter(
    (l) => l.id !== currentId && (!onlyIds || onlyIds.includes(l.id)),
  )
}

/* ══════════════ 고객센터 연락처 ══════════════
   ⚠ 전부 미확인이다. 본사에서 확정값을 받으면 여기에만 채운다.
      채우는 즉시 /support · 탈퇴 · 해지 페이지에 자동으로 나타난다.

   phone  예: '055-000-0000'  (지점 개별 전화번호를 여기에 쓰지 않는다)
   hours  예: '평일 10:00 ~ 19:00 (주말·공휴일 휴무)'
   email  예: 'support@example.com'
          ⚠ 구글 플레이 데이터 삭제 정책상 이메일은 사실상 필수다. */
export const SUPPORT_CONTACT = {
  phone: null,
  hours: null,
  email: null,
}

export const SUPPORT_CONTACT_ROWS = [
  { label: '고객센터 전화', value: SUPPORT_CONTACT.phone, href: SUPPORT_CONTACT.phone ? `tel:${SUPPORT_CONTACT.phone.replace(/[^0-9+]/g, '')}` : null },
  { label: '운영시간', value: SUPPORT_CONTACT.hours, href: null },
  { label: '고객문의 이메일', value: SUPPORT_CONTACT.email, href: SUPPORT_CONTACT.email ? `mailto:${SUPPORT_CONTACT.email}` : null },
].filter((r) => r.value)

export const hasSupportContact = SUPPORT_CONTACT_ROWS.length > 0

/* ══════════════ 사업자 정보 ══════════════
   ⚠ 사업자등록증 기준 값을 받기 전까지 전부 null.
      'RETURN COMPANY' 는 브랜드 표기이므로 법적 상호로 쓰지 않는다. */
export const COMPANY_INFO = {
  legalName: null,       // 사업자등록증상 상호
  ceo: null,             // 대표자명
  businessNumber: null,  // 사업자등록번호
  address: null,         // 사업장 주소
  phone: null,           // 본사 대표번호
  email: null,           // 대표 이메일
  privacyOfficer: null,  // 개인정보 보호책임자 또는 담당부서
}

export const COMPANY_ROWS = [
  { label: '상호', value: COMPANY_INFO.legalName },
  { label: '대표자', value: COMPANY_INFO.ceo },
  { label: '사업자등록번호', value: COMPANY_INFO.businessNumber },
  { label: '주소', value: COMPANY_INFO.address },
  { label: '대표번호', value: COMPANY_INFO.phone },
  { label: '이메일', value: COMPANY_INFO.email },
  { label: '개인정보 보호책임자', value: COMPANY_INFO.privacyOfficer },
].filter((r) => r.value)

export const hasCompanyInfo = COMPANY_ROWS.length > 0

/* ══════════════ /support — 문의 가능 항목 ══════════════ */
export const SUPPORT_TOPICS = [
  '앱 이용',
  '회원가입 및 로그인',
  'QR 출입',
  '이용권 및 구독',
  '결제 및 환불',
  '구독 해지',
  '회원 탈퇴',
  '지점 이용 관련 문의',
]

/* ══════════════ 지점 문의 채널 ══════════════
   현재 코드에서 확인되는 유일한 실제 문의 경로다.
   ⚠ 지점 전화번호(stores.js phone)는 소비자 화면에 노출하지 않는다.
      상주 직원이 없는 지점이 있어 전화 중심으로 운영하지 않기로 했다. */
export const STORE_SUPPORT_CHANNELS = SUBSCRIPTION_STORES.map((store) => ({
  id: store.id,
  name: store.name,
  channels: [
    store.links?.naver && { key: 'naver', label: '네이버 플레이스', url: store.links.naver },
    store.links?.instagram && { key: 'instagram', label: '인스타그램', url: store.links.instagram },
  ].filter(Boolean),
})).filter((s) => s.channels.length > 0)

/** 아직 채널이 등록되지 않은 지점이 있으면 그 사실을 정직하게 밝힌다 */
export const hasPartialStoreChannels =
  STORE_SUPPORT_CHANNELS.length > 0 &&
  STORE_SUPPORT_CHANNELS.length < SUBSCRIPTION_STORES.length

export const STORE_CHANNEL_NOTE =
  '현재 안내 가능한 지점 채널입니다. 나머지 지점의 문의 채널은 준비되는 대로 추가됩니다.'

/* ══════════════ 지점별 앱 ══════════════
   앱 이름과 스토어 URL 은 stores.js usageGuide 에서만 온다. 여기서 만들지 않는다. */
export const SUPPORT_APPS = (() => {
  const map = new Map()
  for (const store of SUBSCRIPTION_STORES) {
    const info = getAppInfo(store)
    if (!info?.appName) continue
    if (!map.has(info.appName)) {
      map.set(info.appName, { ...info, stores: [] })
    }
    map.get(info.appName).stores.push(store.name)
  }
  return [...map.values()]
})()

/* ══════════════ 앱 내 셀프서비스 경로 ══════════════
   ⚠ 바디코디 / 짐서폿 앱의 실제 메뉴 경로를 확인하지 못했다.
      '마이페이지 → 설정 → 회원탈퇴' 같은 경로를 추측해서 만들지 않는다.
      경로 문자열을 받으면 steps 배열에 넣는다.
        예: subscriptionCancel: { bodycodi: ['마이페이지', '이용권', '구독 해지'] }
   ⚠ processingPeriod 도 마찬가지다. '3일 이내' / '즉시' 를 약속하지 않는다. */
export const APP_SELF_SERVICE = {
  /** 앱 내 구독 해지 경로 — { [appName]: string[] } */
  subscriptionCancel: null,
  /** 앱 내 회원 탈퇴 경로 — { [appName]: string[] } */
  accountDeletion: null,
  /** 탈퇴·삭제 처리기간 — 예: '요청일로부터 영업일 기준 N일 이내' */
  processingPeriod: null,
}

export const appStepsFor = (kind, appName) => APP_SELF_SERVICE[kind]?.[appName] || null

/* ══════════════ /terms ══════════════
   ⚠ 이용약관 전문은 이 저장소에 없다. (legal.js TERMS_URL 도 null)
      전문을 지어내지 않는다. 전문 URL 또는 원문을 받으면 그때 게시한다.
   ⚠ 약관 본문에 현재 판매가격을 박아 넣지 않는다.
      판매가격 · 이용기간 · 이용가능 지점 · 프로모션은 상품안내와 결제화면에서 확인한다. */
export const TERMS_DOC = {
  /** 시행일 — 확정값이 있을 때만 표시 (예: '2026년 9월 1일') */
  effectiveDate: null,
  /** 약관 전문(원문 텍스트 또는 조문 배열)을 받으면 여기에 넣는다 */
  fullText: null,
}

/* ══════════════ /privacy ══════════════
   ⚠ 앱이 실제로 수집하는 항목 · 보유기간 · 수탁사 · PG · 문자발송 · 출입시스템 업체를
      확인하지 못했다. 법률 문구를 임의로 완성하지 않는다.
      확정 원문을 받으면 published: true 로 바꾸고 sections[].body 를 채운다. */
export const PRIVACY_POLICY = {
  published: false,
  effectiveDate: null,
  sections: [
    { id: 'purpose', title: '개인정보 처리 목적', body: null },
    { id: 'items', title: '수집하는 개인정보 항목', body: null },
    { id: 'retention', title: '개인정보 보유 및 이용기간', body: null },
    { id: 'third-party', title: '개인정보 제3자 제공', body: null },
    { id: 'consignment', title: '개인정보 처리업무 위탁', body: null },
    { id: 'destruction', title: '개인정보 파기절차 및 방법', body: null },
    { id: 'rights', title: '이용자의 권리와 행사방법', body: null },
    { id: 'officer', title: '개인정보 보호책임자 또는 담당부서', body: null },
    { id: 'contact', title: '개인정보 관련 고객문의 연락처', body: null },
    { id: 'effective', title: '개인정보처리방침 시행일', body: null },
  ],
}

/* ══════════════ 공통 안내 문구 ══════════════
   ⚠ '구독 해지' 와 '회원 탈퇴' 는 완전히 다른 절차다. 두 페이지 모두 이 정의를 쓴다.
   ⚠ '구독 해지 = 즉시 전액 환불' 로 읽히게 쓰지 않는다. */
export const CANCEL_VS_DELETE = [
  {
    id: 'cancel',
    label: '구독 해지',
    summary: '다음 정기결제를 중단하는 절차',
    detail:
      '해지를 신청하면 다음 결제회차부터 결제되지 않습니다. GYM PASS 계정과 이용기록은 그대로 남습니다.',
    href: '/subscription-cancel',
  },
  {
    id: 'delete',
    label: '회원 탈퇴',
    summary: 'GYM PASS 계정 및 관련 개인정보 삭제를 요청하는 절차',
    detail:
      '계정과 개인정보 삭제를 요청하는 절차입니다. 이용 중인 구독이 있다면 구독 해지를 먼저 확인해 주세요.',
    href: '/account-deletion',
  },
]
