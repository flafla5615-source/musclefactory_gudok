/* 오프라인 전단 QR 생성
 *
 * 실행: node scripts/make-flyer-qr.cjs
 * 출력: scripts/out/gympass-flyer-qr.png  (전단 인쇄용, 여백 포함 고해상도)
 *
 * ⚠ 목적지 URL 은 lib/tracking.js 의 FLYER_UTM 과 반드시 같아야 한다.
 *    UTM 이 어긋나면 flyer_landing_view 가 발생하지 않는다.
 * ⚠ 장식용 QR 이 아니라 실제 접속되는 QR 이다. 인쇄 전 반드시 스캔 테스트할 것.
 */
const fs = require('fs')
const path = require('path')
const QRCode = require('qrcode')

const ORIGIN = 'https://musclefactory-gudok.vercel.app'
const UTM = {
  utm_source: 'offline_flyer',
  utm_medium: 'qr',
  utm_campaign: 'gympass_flyer_202609',
}

const url = `${ORIGIN}/?${new URLSearchParams(UTM).toString()}`
const outDir = path.join(__dirname, 'out')
const outFile = path.join(outDir, 'gympass-flyer-qr.png')

fs.mkdirSync(outDir, { recursive: true })

QRCode.toFile(
  outFile,
  url,
  {
    type: 'png',
    width: 1200, // 전단 인쇄용. 실제 인쇄 크기 2cm 이상 권장
    margin: 4, // 조용한 여백(quiet zone) — 너무 좁으면 인식률이 떨어진다
    errorCorrectionLevel: 'M',
    color: { dark: '#0D0D0D', light: '#FFFFFF' },
  },
  (err) => {
    if (err) {
      console.error('QR 생성 실패:', err.message)
      process.exit(1)
    }
    const kb = Math.round(fs.statSync(outFile).size / 1024)
    console.log('목적지 :', url)
    console.log('파일   :', outFile)
    console.log('크기   : 1200x1200 PNG,', kb + 'KB')
  },
)
