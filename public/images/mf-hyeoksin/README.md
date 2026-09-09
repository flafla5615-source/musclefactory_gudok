# 머슬팩토리24 혁신점 실사진

아직 사진이 없다. 이 폴더는 사진을 받으면 바로 넣을 수 있도록 자리만 잡아둔 것이다.

## 절대 금지

- AI 생성 이미지
- 다른 지점 사진
- 스톡 사진
- 기구 추가·삭제, 공간 확장, 인물 수정, 과도한 색보정

웹 배치를 위한 `object-fit: cover` 수준의 크롭만 허용한다.

## 넣는 방법

1. 이 폴더에 실사진을 저장한다.

   ```
   public/images/mf-hyeoksin/
     thumb.jpg   지점 카드 썸네일 (400px 정사각 권장)
     01.jpg      센터 전경 (공간 규모가 가장 잘 보이는 사진)
     02.jpg
     03.jpg
     04.jpg
     05.jpg
   ```

   갤러리용은 긴 변 1100px · JPEG 품질 72 정도로 줄인다.

2. `src/data/stores.js` 의 `id: 'mf-hyeoksin'` 객체에서 아래 두 줄만 채운다.
   컴포넌트는 손댈 필요 없다.

   ```js
   thumbImage: '/images/mf-hyeoksin/thumb.jpg',
   facilityImages: [
     { src: '/images/mf-hyeoksin/01.jpg', category: '센터 전경' },
     { src: '/images/mf-hyeoksin/02.jpg', category: '웨이트존' },
     { src: '/images/mf-hyeoksin/03.jpg', category: '머신존' },
     { src: '/images/mf-hyeoksin/04.jpg', category: '프리웨이트존' },
     { src: '/images/mf-hyeoksin/05.jpg', category: '유산소존' },
   ],
   ```

   `category` 는 사진에 실제로 보이는 존만 적는다. 확인되지 않으면 적지 않는다.

## 지금 화면 상태

`thumbImage: null` / `facilityImages: []` 이므로

- 지점 카드 → 사진 자리에 placeholder 아이콘
- 시설 섹션 → "실사진은 촬영 후 공개됩니다"

깨진 이미지는 발생하지 않는다. 존재하지 않는 파일 경로를 미리 적어두지 말 것.
