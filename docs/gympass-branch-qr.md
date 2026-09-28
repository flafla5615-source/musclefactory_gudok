# GYM PASS 지점별 오프라인 QR

생성일 2026-09-28 · `npm run qr:generate` 로 다시 만들 수 있습니다.

배너 · 포맥스 · 전단지 등 오프라인 인쇄물에 사용하는 지점별 QR입니다.
랜딩페이지를 지점별로 따로 만들지 않고, 모든 QR이 같은 메인 랜딩으로 들어오되
`utm_content` 값만 지점별로 다릅니다.

## 공통 UTM

| 항목 | 값 |
| --- | --- |
| utm_source | `offline_flyer` |
| utm_medium | `qr` |
| utm_campaign | `gympass_offline` |
| utm_content | 지점별 `store.id` |

`utm_content`는 `src/data/stores.js`의 `store.id`를 그대로 씁니다.
추적용 ID를 따로 만들지 않습니다.

## QR 사양

- 2048px PNG, 흰 배경 / 검정 QR
- quiet zone 4모듈, 오류복원 수준 H
- 로고·디자인 효과 없음 (인식률 우선)
- 권장 인쇄 크기 최소 2cm, 배너·포맥스는 5cm 이상

## 지점 목록

| 지점 | store.id | 파일 |
| --- | --- | --- |
| 짐플릭스 시청점 | `gymflex-cityhall` | `gymflex-cityhall.png` |
| 올드짐 평거점 | `oldgym-pyeonggeo` | `oldgym-pyeonggeo.png` |
| 머슬팩토리24 보건대점 | `mf-bogeondae` | `mf-bogeondae.png` |
| 머슬팩토리24 신진주역점 | `mf-sinjinju` | `mf-sinjinju.png` |
| 머슬팩토리24 삼천포 본점 | `mf-samcheonpo` | `mf-samcheonpo.png` |
| 머슬팩토리24 삼천포 벌리점 | `mf-samcheonpo-beolli` | `mf-samcheonpo-beolli.png` |
| 머슬팩토리24 진주강남점 | `mf-jinju-gangnam` | `mf-jinju-gangnam.png` |
| 머슬팩토리24 혁신점 | `mf-hyeoksin` | `mf-hyeoksin.png` |

### 연결 URL

**짐플릭스 시청점** — `gymflex-cityhall.png`

```
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=gymflex-cityhall
```

**올드짐 평거점** — `oldgym-pyeonggeo.png`

```
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=oldgym-pyeonggeo
```

**머슬팩토리24 보건대점** — `mf-bogeondae.png`

```
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=mf-bogeondae
```

**머슬팩토리24 신진주역점** — `mf-sinjinju.png`

```
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=mf-sinjinju
```

**머슬팩토리24 삼천포 본점** — `mf-samcheonpo.png`

```
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=mf-samcheonpo
```

**머슬팩토리24 삼천포 벌리점** — `mf-samcheonpo-beolli.png`

```
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=mf-samcheonpo-beolli
```

**머슬팩토리24 진주강남점** — `mf-jinju-gangnam.png`

```
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=mf-jinju-gangnam
```

**머슬팩토리24 혁신점** — `mf-hyeoksin.png`

```
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=mf-hyeoksin
```

## 참고

- COMING SOON 지점(진주교대점 · 진주정촌점 · 올드짐 사천점)은 아직 구독할 수 없어 QR을 만들지 않습니다.
  오픈 후 `subscriptionEnabled: true`로 바꾸고 스크립트를 다시 실행하면 자동으로 추가됩니다.
- 기존에 인쇄된 공통 QR은 그대로 사용합니다. 기본 URL과 동작은 변경하지 않았습니다.
- 지점 QR로 들어와도 랜딩에서 해당 지점을 자동 선택하지 않습니다. `utm_content`는 분석용입니다.
- `utm_content`는 세션 내내 보존되어 상품 선택 · 지점 선택 · 앱 이동 클릭 이벤트까지 함께 전송됩니다.
