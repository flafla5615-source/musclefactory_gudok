/* 전단 QR 목적지 검증
 *
 * 1) tracking.js 의 FLYER_UTM 과 QR 생성 스크립트의 UTM 이 같은지
 * 2) 목적지 URL 이 실제로 200 을 돌려주는지
 *
 * 실행: node scripts/verify-flyer-qr.cjs
 */
const fs = require('fs')
const path = require('path')
const https = require('https')

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8')
const pick = (text, key) => {
  const m = text.match(new RegExp(key + "\\s*:\\s*'([^']+)'"))
  return m ? m[1] : null
}

const tracking = read('src/lib/tracking.js')
const block = tracking.match(/FLYER_UTM\s*=\s*\{([\s\S]*?)\}/)[1]
const fromCode = {
  source: pick(block, 'source'),
  medium: pick(block, 'medium'),
  campaign: pick(block, 'campaign'),
}

const qrScript = read('scripts/make-flyer-qr.cjs')
const fromQr = {
  source: pick(qrScript, 'utm_source'),
  medium: pick(qrScript, 'utm_medium'),
  campaign: pick(qrScript, 'utm_campaign'),
}

const origin = qrScript.match(/const ORIGIN = '([^']+)'/)[1]
const url = `${origin}/?utm_source=${fromQr.source}&utm_medium=${fromQr.medium}&utm_campaign=${fromQr.campaign}`

console.log('tracking.js FLYER_UTM :', JSON.stringify(fromCode))
console.log('QR 스크립트 UTM       :', JSON.stringify(fromQr))

const same = JSON.stringify(fromCode) === JSON.stringify(fromQr)
console.log('UTM 일치              :', same ? 'OK' : 'MISMATCH')

console.log('목적지 URL            :', url)

https
  .get(url, (res) => {
    console.log('HTTP 응답             :', res.statusCode, res.statusCode === 200 ? 'OK' : 'CHECK')
    res.resume()
    process.exit(same && res.statusCode === 200 ? 0 : 1)
  })
  .on('error', (e) => {
    console.error('접속 실패:', e.message)
    process.exit(1)
  })
