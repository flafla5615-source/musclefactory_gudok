GYM PASS 지점별 오프라인 QR
============================================================

생성일: 2026-09-28
생성 명령: npm run qr:generate

모든 QR 은 같은 메인 랜딩으로 연결되며, utm_content 값만 지점별로 다릅니다.
utm_content 는 stores.js 의 store.id 를 그대로 사용합니다.

공통 UTM
  utm_source   offline_flyer
  utm_medium   qr
  utm_campaign gympass_offline

QR 사양
  2048px PNG / quiet zone 4모듈 / 오류복원 H / 흑백
  로고·디자인 효과 없음. 인쇄 전 실제 기기로 스캔 테스트 필수.
  권장 인쇄 크기: 최소 2cm 이상 (배너·포맥스는 5cm 이상 권장)

------------------------------------------------------------

짐플릭스 시청점
store.id: gymflex-cityhall
QR:
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=gymflex-cityhall
파일:
gymflex-cityhall.png

올드짐 평거점
store.id: oldgym-pyeonggeo
QR:
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=oldgym-pyeonggeo
파일:
oldgym-pyeonggeo.png

머슬팩토리24 보건대점
store.id: mf-bogeondae
QR:
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=mf-bogeondae
파일:
mf-bogeondae.png

머슬팩토리24 신진주역점
store.id: mf-sinjinju
QR:
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=mf-sinjinju
파일:
mf-sinjinju.png

머슬팩토리24 삼천포 본점
store.id: mf-samcheonpo
QR:
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=mf-samcheonpo
파일:
mf-samcheonpo.png

머슬팩토리24 삼천포 벌리점
store.id: mf-samcheonpo-beolli
QR:
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=mf-samcheonpo-beolli
파일:
mf-samcheonpo-beolli.png

머슬팩토리24 진주강남점
store.id: mf-jinju-gangnam
QR:
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=mf-jinju-gangnam
파일:
mf-jinju-gangnam.png

머슬팩토리24 혁신점
store.id: mf-hyeoksin
QR:
https://musclefactory-gudok.vercel.app/?utm_source=offline_flyer&utm_medium=qr&utm_campaign=gympass_offline&utm_content=mf-hyeoksin
파일:
mf-hyeoksin.png

------------------------------------------------------------

※ COMING SOON 지점(진주교대점 · 진주정촌점 · 올드짐 사천점)은
   아직 구독할 수 없으므로 QR 을 생성하지 않습니다.
   오픈 후 stores.js 에서 subscriptionEnabled: true 로 바꾸고
   npm run qr:generate 를 다시 실행하면 자동으로 추가됩니다.

※ 기존에 인쇄된 공통 QR 은 그대로 사용합니다. 교체할 필요 없습니다.
