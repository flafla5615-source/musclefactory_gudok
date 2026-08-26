# 리턴컴퍼니 헬스장 구독제 랜딩페이지

> GYM PASS — 헬스장, 한 달만 등록해도 됩니다. **월 48,900원**

장기회원권 중심에서 **월 정기결제 구독형**으로 전환하는 리턴컴퍼니 운영 헬스장의 전환형 랜딩페이지.
인스타그램 / Meta / 네이버 / 당근 / 문자 / 전단지 QR 유입 고객이
**구독 이해 → 가격 확인 → 상품 선택 → 지점 선택 → 상담·가입**까지 이동하도록 설계했습니다.

---

## 실행

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

- 개발 서버: http://localhost:5175
- Vercel 배포: `vercel.json` 포함, 프레임워크 `vite` / 출력 `dist` 로 자동 인식됩니다.

**Stack** — Vite 6 + React 18 + Tailwind CSS v4 (외부 런타임 의존성 없음, 번들 gzip 약 61KB)
**Font** — Pretendard(한글) + Outfit(영문 디스플레이) · **Icon** — Iconify Solar

---

## 수정 가이드 (개발 없이 값만 바꾸면 되는 것들)

화면 컴포넌트에는 가격·지점 정보를 직접 적지 않았습니다. 아래 파일만 고치면 페이지 전체에 반영됩니다.

| 바꾸고 싶은 것 | 고칠 파일 |
| --- | --- |
| 상품 가격 · 상품 추가/삭제 | `src/data/products.js` |
| 추가 옵션 (운동복 · 락커) | `src/data/products.js` → `ADD_ONS` |
| 지점 추가 · 주소 · 운영시간 · 사진 · 이용방법 | `src/data/stores.js` |
| 이용약관 URL · 전지점 적용지점 | `src/data/legal.js` |
| FAQ · 이용방법 · BENEFIT 문구 | `src/data/content.js` |
| 카카오톡 · 전화 · 신청폼 링크 | `src/data/contact.js` |
| 추적 스크립트 (Meta / GA4 / 네이버) | `index.html` 하단 주석 위치 |

### 지점 추가하기

`src/data/stores.js` 의 `STORES` 배열에 객체 하나만 추가하면
지점 선택 카드 · 시설 탭 · 하단 고정 CTA · 상담 시트가 **자동으로 확장**됩니다.
컴포넌트를 새로 만들 필요가 없습니다.

```js
{
  id: 'mf-newstore',              // public/images/mf-newstore/ 폴더명과 맞춥니다
  brand: BRANDS.MUSCLE_FACTORY,
  storeName: '머슬팩토리 신규점',
  shortName: '신규점',            // 하단 고정 CTA 에 쓰이는 짧은 이름
  region: '진주',
  monthlyPrice: 48900,            // 현재 전 지점 동일. 다른 값을 넣으면 그 지점만 예외가가 된다
  address: null,                  // 확인 전이면 null → 화면에 '[지점 정보 입력]'
  operatingHours: null,
  parking: null,
  phone: null,
  naverUrl: null,
  instagramUrl: null,
  images: [],                     // 실제 사진만. 비어 있으면 '준비 중' 표시
  facilities: [],
  subscriptionEnabled: true,
}
```

### 3개월 구독권 가격이 확정되면

`src/data/products.js` 에서 `quarterly` 항목의 값만 바꿉니다.

```js
price: 129000,          // null → 실제 가격
status: 'available',    // 'coming_soon' → 'available'
paymentType: '일시결제',
usageScope: '등록한 주 이용지점',
points: ['실제 혜택 문구'],
```

카드 · 비교표 · 상담 시트에 동시에 반영됩니다. **가격이 확정되기 전까지 `price: null` 을 유지하세요** —
`null` 이면 임의 가격 대신 "가격 추후 공개" 가 표시됩니다.

### 센터 실사진 교체

1. `public/images/<지점 id>/` 에 사진 파일을 넣습니다.
2. `src/data/stores.js` 의 해당 지점 `images` 에 경로와 카테고리를 추가합니다.

```js
images: [
  { src: '/images/mf-bogeondae/01_overview.jpg', category: '센터 전경' },
  { src: '/images/mf-bogeondae/02_weight.jpg',  category: '웨이트존' },
],
```

사용 가능한 카테고리 예시는 `src/data/content.js` 의 `FACILITY_CATEGORIES` 를 참고하세요.

> ⚠ **실제 사진 원칙** — AI 생성 헬스장 이미지, 스톡 사진, 공간을 넓혀 보이게 하는 편집,
> 없는 머신 추가는 사용하지 않습니다. 사진이 없으면 비워 두면 '준비 중' 으로 표시됩니다.

---

## 전환 추적

`src/lib/tracking.js` 가 `window.dataLayer` 에 항상 push 하고,
`gtag` / `fbq` 가 로드되어 있으면 함께 전달합니다.
**실제 Tracking ID 가 없어 임의 ID 를 넣지 않았습니다.** `index.html` 의 주석 위치에
Meta Pixel / GA4 / 네이버 전환 스니펫만 붙이면 아래 이벤트가 그대로 흘러갑니다.

| 이벤트 | 발생 시점 |
| --- | --- |
| `landing_view` | 페이지 최초 진입 (세션당 1회) |
| `product_view` | 월 구독 노출 |
| `product_select` | 상품 카드 CTA 클릭 |
| `store_select` | 지점 선택 |
| `subscription_cta_click` | HERO · 네비 · 하단 고정 · FINAL CTA 클릭 (`source` 로 구분) |
| `consultation_click` | 문의 채널 클릭 (`channel` 로 구분) |
| `signup_start` | 상담 시트 열림 |
| `signup_complete` | 가입 완료 — **가입 방식 확정 후 연결 필요** |

UTM 파라미터(`utm_*`, `gclid`, `fbclid`, `n_media` 등)는 진입 시 세션에 저장되어
모든 이벤트에 자동으로 붙고, 외부 링크로 나갈 때도 유지됩니다.

---

## 현재 확정된 정보 / 미확정 정보

임의로 만들어 넣지 않고 화면에 미확정임을 그대로 표시했습니다.

**확정 · 반영 완료**

- 월 구독 48,900원 (전 지점 동일) / 전지점 구독 59,900원 / 12개월 399,000원
- 운동복 +11,000원 · 개인락커 +15,000원
- 구독 운영지점 6개 (시청 · 평거 · 보건대 · 신진주역 · 삼천포 본점 · 삼천포 벌리)
- 지점별 전화번호 6개 · 실사진 (신진주역 10 / 시청 10 / 평거 8 / 보건대 10 / 삼천포 본점 5 / 벌리 6)
- 이용 앱: 시청점 짐서폿 / 나머지 5곳 바디코디
- 환불기준 · 일시정지 미제공 · 전지점 월 합산 10회 (이용약관 기준)

**미확정 → `[지점 정보 입력]` · `[최종 정책 입력]` · `price: null` 로 표시 중**

- 3개월 구독권 가격 및 세부 혜택
- 12개월 회원권 판매기간 · 수량 · 종료조건
- 이용약관 전문 URL (`src/data/legal.js` 의 `TERMS_URL`)
- 회원 인터뷰 영상 (`MEMBER_INTERVIEW.videoSrc`)
- 지점별 구독상품 바로가기 링크 · QR (`usageGuide.signupUrl` / `qrImage`)
- 평거점 운영시간 · 주차 / 시청점 주차 / 삼천포 본점 위치 안내
- 지점별 운동복 · 개인락커 운영 여부
- 짐플릭스 브랜드 컬러 (확인 전이라 뉴트럴 유지)

> FAQ 답변은 **이용약관 범위 안에서만** 작성합니다. 약관이 개정되면
> `src/data/content.js` 의 `FAQS` 를 약관과 동일한 내용으로 갱신하세요.
> ⚠ 구독상품에는 이용 일시정지 제도가 없습니다. '언제든 정지' 같은 표현을 쓰지 마세요.

---

## 페이지 구성

HERO → 일단 한 달 → PRICE → 지점 선택 → 선택 지점 상세·이용방법 → 추가 옵션 →
시설 → 회원 인터뷰 → COMING SOON → BENEFIT → OPEN EVENT → 이용 흐름 →
FAQ → 선택 요약 → FINAL CTA → FOOTER

지점을 선택하면 **선택 지점 상세 · 이용방법 · 시설 사진 · Summary · 하단 고정 CTA** 가 그 지점 기준으로 바뀝니다.
페이지를 새로 열면 언제나 기본 상태(월 48,900원, 지점 미선택)로 시작합니다.
