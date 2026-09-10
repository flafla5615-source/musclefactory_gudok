# 머슬팩토리24 혁신점 실사진

본사 제공 원본(중복 제외 16장) 중 6장을 선별해 반영했다.
**강남점(`mf-jinju-gangnam`) 사진과 섞이지 않았다.**

## 처리 내용

| 파일 | 내용 | 규격 | 용량 |
|---|---|---|---|
| `thumb.jpg` | MUSCLE FACTORY 24 로고 + 웨이트존 (대표) | 400×400 크롭 | 47KB |
| `01.jpg` | 웨이트존 전경 (로고 정면) | 825×1100 | 221KB |
| `02.jpg` | 유산소존 (통창 + 런닝머신) | 825×1100 | 143KB |
| `03.jpg` | 웨이트 머신존 | 1100×825 | 230KB |
| `04.jpg` | 프리웨이트 · 파워랙존 | 1100×825 | 204KB |
| `05.jpg` | 머신 구성 | 1100×825 | 200KB |
| `06.jpg` | 리커버리존 (안마의자) | 825×1100 | 120KB |

리사이즈(HighQualityBicubic)와 썸네일 크롭만 적용했다.
**보정·합성·인물 삭제/생성·색보정은 하지 않았다.**

썸네일은 세로 원본에서 위쪽 28% 지점을 기준으로 정사각 크롭해
**MUSCLE FACTORY 24 간판이 잘리지 않게** 했다.
카드와 갤러리 첫 장은 `object-position: 50% 32%` 로 간판을 기준으로 맞춘다.

## 연결 위치

`src/data/stores.js` → `id: 'mf-hyeoksin'`

```js
thumbImage: '/images/mf-hyeoksin/thumb.jpg',
facilityImages: [
  { src: '/images/mf-hyeoksin/01.jpg', category: '웨이트존 전경' },
  { src: '/images/mf-hyeoksin/02.jpg', category: '유산소존' },
  { src: '/images/mf-hyeoksin/03.jpg', category: '웨이트 머신존' },
  { src: '/images/mf-hyeoksin/04.jpg', category: '프리웨이트 · 파워랙존' },
  { src: '/images/mf-hyeoksin/05.jpg', category: '머신 구성' },
  { src: '/images/mf-hyeoksin/06.jpg', category: '리커버리존' },
],
```

## 현재 상태

`status: 'coming_soon'` / `subscriptionEnabled: false`
→ 지점 선택 목록·결제 CTA 에 나오지 않고 ComingSoon 섹션에서만 안내된다.

## 오픈하면

`stores.js` 의 해당 객체에서 아래 4가지만 바꾸면 정식 구독 지점이 된다.

```js
status: 'coming_soon'  →  'open'
subscriptionEnabled: false  →  true
longTermOffer 의 upcoming: true 와 label: '오픈 선착순' 제거
address / hours / parking / facilities 채우기
```

## 절대 금지

- AI 생성 이미지 / 다른 지점 사진 / 스톡 사진
- 기구 추가·삭제, 공간 확장, 인물 수정, 과도한 색보정

웹 배치를 위한 리사이즈와 `object-fit: cover` 수준의 크롭만 허용한다.
