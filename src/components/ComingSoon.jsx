import { useState } from 'react'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { COMING_SOON_STORES } from '../data/stores.js'
import { formatNumber } from '../lib/format.js'

/**
 * 오픈 예정 지점
 *
 * 운영 중인 지점 목록(#store) 뒤에 배치한다.
 *
 * ⚠ 아직 오픈 전이므로 운영 지점과 똑같이 보이면 안 된다.
 *    · COMING SOON 배지를 카드 상단에 명확히 노출한다
 *    · '구독하기' 같은 실제 결제 CTA 를 절대 넣지 않는다
 *      (지점 선택 state 에도 들어가지 않는다 — subscriptionEnabled: false)
 *    · 정보형 CTA '지점 정보 보기' 로만 펼친다
 *
 * ⚠ 장기권 예정가는 카드 표면에 노출하지 않는다.
 *    월 구독 메시지와 경쟁하지 않도록 '지점 정보 보기' 를 눌렀을 때만 보여준다.
 *
 * ⚠ 실제 센터 사진이 없다. 다른 지점 사진이나 AI 이미지를 넣지 않고
 *    사진 대기 placeholder 로 둔다.
 *
 * 내용은 전부 stores.js 에서 온다. 이 파일에 지점명·특징·금액을 쓰지 않는다.
 */
export default function ComingSoon() {
  const [openId, setOpenId] = useState(null)

  if (COMING_SOON_STORES.length === 0) return null

  return (
    <Section
      title={
        <>
          곧 문을 여는
          <br />
          지점입니다.
        </>
      }
      description="구독 가능한 지점은 계속 늘어납니다."
    >
      <div className="grid auto-rows-fr gap-3 md:grid-cols-2">
        {COMING_SOON_STORES.map((store, i) => {
          const open = openId === store.id
          const offer = store.longTermOffer?.active ? store.longTermOffer : null

          return (
            <Reveal key={store.id} delay={i * 70} className="h-full">
              <div className="card h-full !p-3">
                {/* 사진 대기 — 실사진 확보 전까지 placeholder */}
                <div className="media !aspect-auto !h-[124px] items-center justify-center">
                  <span className="flex h-full w-full flex-col items-center justify-center gap-2 text-mute-2">
                    <iconify-icon icon="solar:gallery-linear" width="22"></iconify-icon>
                    <span className="text-[11px]">센터 사진 준비 중</span>
                  </span>
                </div>

                <div className="px-2 pb-1 pt-4">
                  {/* 오픈 전임을 가장 먼저 알린다 */}
                  <span
                    className="chip !h-[22px] !px-2.5 !text-[10.5px] font-bold tracking-[0.1em]"
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--color-accent)',
                      color: 'var(--color-accent-soft)',
                    }}
                  >
                    COMING SOON
                  </span>

                  <span className="t-label mt-3 block" style={{ color: store.brand.color }}>
                    {store.brand.key}
                  </span>
                  <h3 className="mt-1.5 text-[17px] font-bold leading-snug text-fog">
                    {store.name}
                  </h3>

                  {store.highlights?.length > 0 && (
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {store.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-[13px] leading-relaxed text-mute">
                          <span className="mt-[7px] h-[3px] w-[3px] flex-shrink-0 rounded-full bg-mute-2" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="mt-3.5 text-[13px] font-semibold text-fog">
                    곧 GYM PASS에서 만날 수 있습니다.
                  </p>

                  {/* 정보형 CTA — 결제로 이어지지 않는다 */}
                  <div className="card-foot !mt-4">
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : store.id)}
                      aria-expanded={open}
                      aria-controls={`coming-${store.id}`}
                      className="btn btn-line"
                    >
                      지점 정보 보기
                      <iconify-icon
                        icon="solar:alt-arrow-down-linear"
                        width="15"
                        style={{
                          transform: open ? 'rotate(180deg)' : 'none',
                          transition: 'transform .4s var(--ease-spring)',
                        }}
                      ></iconify-icon>
                    </button>
                  </div>

                  <div id={`coming-${store.id}`} hidden={!open} className="mt-3">
                    <dl>
                      <div className="inforow">
                        <dt>운영 상태</dt>
                        <dd>오픈 예정</dd>
                      </div>
                      <div className="inforow">
                        <dt>월 구독</dt>
                        <dd>오픈 시 안내</dd>
                      </div>
                    </dl>

                    {offer && (
                      <div
                        className="mt-3 rounded-[12px] px-4 py-3.5"
                        style={{
                          background: 'var(--color-ink)',
                          border: '1px solid var(--color-line)',
                        }}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <span className="text-[13px] font-semibold text-mute">
                            선착순 장기권 (예정)
                          </span>
                          <span className="tnum text-[15px] font-bold text-fog">
                            {offer.months}개월 {formatNumber(offer.price)}원
                          </span>
                        </div>
                        <p className="mt-2 t-caption">
                          오픈 시 적용 예정 가격이며 변경될 수 있습니다.
                        </p>
                      </div>
                    )}

                    <p className="mt-3 t-caption">
                      주소 · 운영시간 · 시설 정보는 오픈 일정이 확정되면 안내드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
