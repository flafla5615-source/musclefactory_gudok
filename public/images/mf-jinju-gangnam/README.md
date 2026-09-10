# 머슬팩토리24 진주강남점 실사진

본사 제공 원본 7장을 반영했다. **다른 지점 사진이 섞이지 않았다.**

## 처리 내용

| 파일 | 원본(첨부 순서) | 규격 | 용량 |
|---|---|---|---|
| `thumb.jpg` | 3번째 (가로) | 400×400 중앙 크롭 | 47KB |
| `01.jpg` | 7번째 | 825×1100 | 180KB |
| `02.jpg` | 1번째 | 825×1100 | 197KB |
| `03.jpg` | 2번째 | 825×1100 | 195KB |
| `04.jpg` | 4번째 (가로) | 1100×825 | 150KB |
| `05.jpg` | 5번째 | 825×1100 | 189KB |
| `06.jpg` | 6번째 | 825×1100 | 175KB |

리사이즈(HighQualityBicubic)와 썸네일 중앙 크롭만 적용했다.
**보정·합성·인물 삭제/생성·색보정은 하지 않았다.**

## 연결 위치

`src/data/stores.js` → `id: 'mf-jinju-gangnam'`

```js
thumbImage: '/images/mf-jinju-gangnam/thumb.jpg',
facilityImages: [
  { src: '/images/mf-jinju-gangnam/01.jpg', category: '센터 전경' },
  { src: '/images/mf-jinju-gangnam/02.jpg', category: '랙·프리웨이트존' },
  { src: '/images/mf-jinju-gangnam/03.jpg', category: '하체 머신존' },
  { src: '/images/mf-jinju-gangnam/04.jpg', category: '플레이트 머신존' },
  { src: '/images/mf-jinju-gangnam/05.jpg', category: '머신존' },
  { src: '/images/mf-jinju-gangnam/06.jpg', category: '웨이트 머신존' },
],
```

## 사진을 교체·추가할 때

1. 이 폴더에 파일을 넣는다. 갤러리는 긴 변 1100px · JPEG 품질 80,
   썸네일은 400×400 · 품질 82 기준으로 맞춘다.
2. 위 `stores.js` 두 항목만 고친다. 컴포넌트는 손대지 않는다.
3. `category` 는 사진에 실제로 보이는 존만 적는다. 확인되지 않으면 적지 않는다.

## 절대 금지

- AI 생성 이미지 / 다른 지점 사진 / 스톡 사진
- 기구 추가·삭제, 공간 확장, 인물 수정, 과도한 색보정

웹 배치를 위한 리사이즈와 `object-fit: cover` 수준의 크롭만 허용한다.
