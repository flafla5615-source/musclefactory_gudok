/* ══════════════════════════════════════════════════════════════
   지점별 오프라인 QR 생성
   ──────────────────────────────────────────────────────────────
   실행: npm run qr:generate

   출력
     public/qrs/<store.id>.png      인쇄용 QR (지점 수만큼)
     public/qrs/README.txt          지점명 · store.id · URL · 파일명
     docs/gympass-branch-qr.md      같은 내용의 문서 버전

   설계 원칙
     · 랜딩페이지를 지점별로 따로 만들지 않는다.
       모든 QR 은 같은 메인 랜딩으로 들어가고 utm_content 만 지점별로 다르다.
     · 추적 ID 를 따로 만들지 않는다. stores.js 의 store.id 를 그대로 쓴다.
       (utm_content = store.id)
     · 운영 중인 지점(subscriptionEnabled: true)만 만든다.
       COMING SOON 지점은 아직 구독할 수 없으므로 QR 을 만들지 않는다.

   ⚠ 기존에 인쇄된 공통 QR(scripts/out/gympass-flyer-qr.png)은 건드리지 않는다.
      기본 URL(https://musclefactory-gudok.vercel.app/)과 그 동작도 그대로다.
      리다이렉트를 만들지 않는다. 새 QR 에만 UTM 을 붙인다.
   ⚠ 지점 QR 로 들어와도 랜딩에서 그 지점을 자동 선택하지 않는다.
      utm_content 는 분석용 유입정보로만 쓴다. (App.jsx 는 UTM 을 읽어
      선택 state 를 바꾸지 않는다)
   ⚠ 장식용 QR 이 아니다. 인쇄 전 실제 기기로 스캔 테스트할 것.
   ══════════════════════════════════════════════════════════════ */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

import { STORES } from '../src/data/stores.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

/** 운영 도메인 — 기존 랜딩 URL 그대로 */
const ORIGIN = 'https://musclefactory-gudok.vercel.app'

/* 지점별 오프라인 QR 공통 UTM
   ⚠ utm_source / utm_medium 은 tracking.js 의 FLYER_UTM 과 같아야 한다.
      isFlyerTraffic() 이 source + medium 두 값으로 전단 유입을 판정하므로
      캠페인이 달라도 flyer_landing_view 는 정상 발생한다. */
const UTM = {
  utm_source: 'offline_flyer',
  utm_medium: 'qr',
  utm_campaign: 'gympass_offline',
}

/* 인쇄용 QR 옵션
   width  2048px — 포맥스 · 배너 등 큰 인쇄물에서도 깨지지 않는 해상도
   margin 4      — QR 규격상 최소 quiet zone(4모듈). 좁히면 인식률이 떨어진다
   EC     H      — 최고 오류복원 수준. 인쇄물이 긁히거나 일부 가려져도 읽힌다
   색상          — 순수 흑백만. 로고 · 그라디언트 · 디자인 효과를 넣지 않는다 */
const QR_OPTIONS = {
  type: 'png',
  width: 2048,
  margin: 4,
  errorCorrectionLevel: 'H',
  color: { dark: '#000000', light: '#FFFFFF' },
}

/** utm_content = store.id */
const qrUrlFor = (store) =>
  `${ORIGIN}/?${new URLSearchParams({ ...UTM, utm_content: store.id }).toString()}`

/* ── 대상 지점 ── */
const targets = STORES.filter((s) => s.subscriptionEnabled).map((store) => ({
  id: store.id,
  name: store.name,
  url: qrUrlFor(store),
  file: `${store.id}.png`,
}))

if (targets.length === 0) {
  console.error('운영 중인 지점이 없습니다. stores.js 의 subscriptionEnabled 를 확인하세요.')
  process.exit(1)
}

const outDir = path.join(ROOT, 'public', 'qrs')
const docsDir = path.join(ROOT, 'docs')
fs.mkdirSync(outDir, { recursive: true })
fs.mkdirSync(docsDir, { recursive: true })

/* ── PNG 생성 ── */
for (const t of targets) {
  await QRCode.toFile(path.join(outDir, t.file), t.url, QR_OPTIONS)
  const { size } = fs.statSync(path.join(outDir, t.file))
  console.log(`  ✓ ${t.file.padEnd(28)} ${String(Math.round(size / 1024)).padStart(4)} KB  ${t.name}`)
}

/* ── 목록 파일 ── */
const generatedAt = new Date().toISOString().slice(0, 10)

const txt = [
  'GYM PASS 지점별 오프라인 QR',
  '='.repeat(60),
  '',
  `생성일: ${generatedAt}`,
  `생성 명령: npm run qr:generate`,
  '',
  '모든 QR 은 같은 메인 랜딩으로 연결되며, utm_content 값만 지점별로 다릅니다.',
  'utm_content 는 stores.js 의 store.id 를 그대로 사용합니다.',
  '',
  '공통 UTM',
  `  utm_source   ${UTM.utm_source}`,
  `  utm_medium   ${UTM.utm_medium}`,
  `  utm_campaign ${UTM.utm_campaign}`,
  '',
  'QR 사양',
  `  ${QR_OPTIONS.width}px PNG / quiet zone ${QR_OPTIONS.margin}모듈 / 오류복원 ${QR_OPTIONS.errorCorrectionLevel} / 흑백`,
  '  로고·디자인 효과 없음. 인쇄 전 실제 기기로 스캔 테스트 필수.',
  '  권장 인쇄 크기: 최소 2cm 이상 (배너·포맥스는 5cm 이상 권장)',
  '',
  '-'.repeat(60),
  '',
  ...targets.flatMap((t) => [
    t.name,
    `store.id: ${t.id}`,
    'QR:',
    t.url,
    '파일:',
    t.file,
    '',
  ]),
  '-'.repeat(60),
  '',
  '※ COMING SOON 지점(진주교대점 · 진주정촌점 · 올드짐 사천점)은',
  '   아직 구독할 수 없으므로 QR 을 생성하지 않습니다.',
  '   오픈 후 stores.js 에서 subscriptionEnabled: true 로 바꾸고',
  '   npm run qr:generate 를 다시 실행하면 자동으로 추가됩니다.',
  '',
  '※ 기존에 인쇄된 공통 QR 은 그대로 사용합니다. 교체할 필요 없습니다.',
  '',
].join('\n')

fs.writeFileSync(path.join(outDir, 'README.txt'), txt, 'utf8')

const md = [
  '# GYM PASS 지점별 오프라인 QR',
  '',
  `생성일 ${generatedAt} · \`npm run qr:generate\` 로 다시 만들 수 있습니다.`,
  '',
  '배너 · 포맥스 · 전단지 등 오프라인 인쇄물에 사용하는 지점별 QR입니다.',
  '랜딩페이지를 지점별로 따로 만들지 않고, 모든 QR이 같은 메인 랜딩으로 들어오되',
  '`utm_content` 값만 지점별로 다릅니다.',
  '',
  '## 공통 UTM',
  '',
  '| 항목 | 값 |',
  '| --- | --- |',
  `| utm_source | \`${UTM.utm_source}\` |`,
  `| utm_medium | \`${UTM.utm_medium}\` |`,
  `| utm_campaign | \`${UTM.utm_campaign}\` |`,
  '| utm_content | 지점별 `store.id` |',
  '',
  '`utm_content`는 `src/data/stores.js`의 `store.id`를 그대로 씁니다.',
  '추적용 ID를 따로 만들지 않습니다.',
  '',
  '## QR 사양',
  '',
  `- ${QR_OPTIONS.width}px PNG, 흰 배경 / 검정 QR`,
  `- quiet zone ${QR_OPTIONS.margin}모듈, 오류복원 수준 ${QR_OPTIONS.errorCorrectionLevel}`,
  '- 로고·디자인 효과 없음 (인식률 우선)',
  '- 권장 인쇄 크기 최소 2cm, 배너·포맥스는 5cm 이상',
  '',
  '## 지점 목록',
  '',
  '| 지점 | store.id | 파일 |',
  '| --- | --- | --- |',
  ...targets.map((t) => `| ${t.name} | \`${t.id}\` | \`${t.file}\` |`),
  '',
  '### 연결 URL',
  '',
  ...targets.flatMap((t) => [
    `**${t.name}** — \`${t.file}\``,
    '',
    '```',
    t.url,
    '```',
    '',
  ]),
  '## 참고',
  '',
  '- COMING SOON 지점(진주교대점 · 진주정촌점 · 올드짐 사천점)은 아직 구독할 수 없어 QR을 만들지 않습니다.',
  '  오픈 후 `subscriptionEnabled: true`로 바꾸고 스크립트를 다시 실행하면 자동으로 추가됩니다.',
  '- 기존에 인쇄된 공통 QR은 그대로 사용합니다. 기본 URL과 동작은 변경하지 않았습니다.',
  '- 지점 QR로 들어와도 랜딩에서 해당 지점을 자동 선택하지 않습니다. `utm_content`는 분석용입니다.',
  '- `utm_content`는 세션 내내 보존되어 상품 선택 · 지점 선택 · 앱 이동 클릭 이벤트까지 함께 전송됩니다.',
  '',
].join('\n')

fs.writeFileSync(path.join(docsDir, 'gympass-branch-qr.md'), md, 'utf8')

console.log('')
console.log(`QR ${targets.length}개 생성 완료 → public/qrs/`)
console.log('목록: public/qrs/README.txt · docs/gympass-branch-qr.md')
