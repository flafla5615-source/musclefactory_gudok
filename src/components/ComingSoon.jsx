import { useState } from 'react'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { COMING_SOON_STORES } from '../data/stores.js'
import { formatNumber, perMonth } from '../lib/format.js'

/**
 * 오픈 예정 지점
 *
 * 운영 중인 지점 목록(#store) 뒤에 배치한다.
 *
 * ⚠ 아직 오픈 전이므로 운영 지점과 똑같이 보이면 안 된다.
 *    · COMING SOON 배지를 대표 이미지 위에 명확히 노출한다
 *    · '구독하기' / '결제하기' 같은 실제 결제 CTA 를 절대 넣지 않는다
 *      (지점 선택 state 에도 들어가지 않는다 — subscriptionEnabled: false)
 *    · 정보형 CTA '지점 정보 보기' 로만 펼친다
 *
 * ⚠ 카드 표면에는 가격을 노출하지 않는다.
 *    월 구독(48,900원)이 메인이고 장기권은 서브다.
 *    장기권 예정가는 '지점 정보 보기' 를 눌렀을 때만 보여준다.
 *
 * ⚠ 사진은 그 지점 폴더의 실사진만 쓴다. 지점 간 사진을 절대 섞지 않는다.
 *    사진이 없으면 placeholder 로 두고 다른 지점 사진·AI 이미지를 넣지 않는다.
 *
 * 내용은 전부 stores.js 에서 온다. 이 파일에 지점명·특징·금액을 쓰지 않는다.
 */
/** 오픈 예정 지점 수에 맞춰 열을 잡는다 (Tailwind 가 스캔하도록 문자열 그대로) */
const GRID_COLS = { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' }

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
      <div
        className={`grid auto-rows-fr gap-3 ${GRID_COLS[COMING_SOON_STORES.length] || 'md:grid-cols-3'}`}
      >
        {COMING_SOON_STORES.map((store, i) => {
          const open = openId === store.id
          const offer = store.longTermOffer?.active ? store.longTermOffer : null
          const gallery = store.facilityImages || []
          // 사진·특징·가격이 전부 없는 지점은 펼칠 게 없으므로 아코디언을 만들지 않는다
          const hasDetail = gallery.length > 0 || store.highlights?.length > 0 || Boolean(offer)

          return (
            <Reveal key={store.id} delay={i * 70} className="h-full">
              <div className="card h-full !p-3">
                {/* 대표 이미지 — 실사진이 있으면 그대로, 없으면 사진 대기 placeholder */}
                <div className="media relative !aspect-[16/10]">
                  {store.thumbImage ? (
                    <img
                      src={store.thumbImage}
                      alt={`${store.name} 센터 사진`}
                      loading="lazy"
                      decoding="async"
                      /* 대표 사진은 상단에 간판이 오는 경우가 많아 위쪽 기준으로 맞춘다 */
                      style={{ objectPosition: '50% 32%' }}
                    />
                  ) : (
                    /* 실사진 미확보 — 다른 지점 사진·AI 이미지를 쓰지 않고
                       브랜드 기반 타이포 placeholder 로 채운다 */
                    <span
                      className="flex h-full w-full flex-col items-center justify-center gap-1.5"
                      style={{ background: 'var(--color-ink)' }}
                    >
                      <span
                        className="font-display text-[15px] font-bold tracking-[0.14em]"
                        style={{ color: store.brand.color }}
                      >
                        {store.brand.key}
                      </span>
                      {store.openLabel && (
                        <span className="font-display text-[11px] font-semibold tracking-[0.12em] text-mute-2">
                          {store.openLabel}
                        </span>
                      )}
                    </span>
                  )}

                  {/* 오픈 전임을 이미지 위에서 바로 알린다 */}
                  <span
                    className="absolute left-3 top-3 inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] font-bold tracking-[0.1em]"
                    style={{
                      background: 'var(--color-accent)',
                      color: '#fff',
                    }}
                  >
                    COMING SOON
                  </span>
                </div>

                <div className="px-2 pb-1 pt-4">
                  <span className="t-label block" style={{ color: store.brand.color }}>
                    {store.brand.key}
                  </span>
                  <h3 className="mt-1.5 text-[17px] font-bold leading-snug text-fog">
                    {store.name}
                  </h3>

                  {store.openLabel && (
                    <p
                      className="mt-2 font-display text-[12.5px] font-bold tracking-[0.1em]"
                      style={{ color: 'var(--color-accent-soft)' }}
                    >
                      {store.openLabel}
                    </p>
                  )}

                  {store.description && <p className="mt-2 t-body">{store.description}</p>}

                  <p className="mt-2.5 text-[13px] font-semibold leading-relaxed text-fog">
                    곧 GYM PASS에서
                    <br />
                    만나보실 수 있습니다.
                  </p>

                  {/* 정보형 CTA — 결제로 이어지지 않는다.
                      보여줄 상세(사진·특징·장기권)가 있을 때만 만든다. */}
                  {hasDetail && (
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
                  )}

                  <div id={`coming-${store.id}`} hidden={!open || !hasDetail} className="mt-4">
                    {/* 시설 특징 */}
                    {store.highlights?.length > 0 && (
                      <ul className="flex flex-wrap gap-1.5">
                        {store.highlights.map((h) => (
                          <li key={h} className="chip chip-quiet">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* 시설 사진 — 모바일에서 세로로 길게 쌓이지 않도록 가로 스와이프 */}
                    {gallery.length > 0 && (
                      <div className="rail mt-4">
                        {gallery.map((image, gi) => (
                          <figure key={image.src} className="w-[72%] flex-shrink-0 sm:w-[46%]">
                            <div className="media">
                              <img
                                src={image.src}
                                alt={`${store.name} ${image.category}`}
                                loading="lazy"
                                decoding="async"
                                style={{ objectPosition: gi === 0 ? '50% 32%' : '50% 50%' }}
                              />
                            </div>
                            <figcaption className="mt-2 text-[12px] font-medium text-mute">
                              {image.category}
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    )}

                    <dl className="mt-4">
                      <div className="inforow">
                        <dt>운영 상태</dt>
                        <dd>오픈 예정</dd>
                      </div>
                      <div className="inforow">
                        <dt>월 구독</dt>
                        <dd>오픈 시 안내</dd>
                      </div>
                    </dl>

                    {/* 오픈 선착순 장기권 — 월 구독보다 낮은 위계로 (액센트 미사용) */}
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
                            {offer.label ? `${offer.label} 장기권` : '선착순 장기권'}
                          </span>
                          <span className="tnum text-[15px] font-bold text-fog">
                            {offer.months}개월 {formatNumber(offer.price)}원
                          </span>
                        </div>
                        {perMonth(offer.price, offer.months) !== null && (
                          <p className="tnum mt-1 t-caption">
                            월 환산 약 {formatNumber(perMonth(offer.price, offer.months))}원
                          </p>
                        )}
                        <p className="mt-2 t-caption">
                          오픈 선착순 혜택으로, 인원 마감 시 종료될 수 있습니다.
                        </p>
                      </div>
                    )}

                    <p className="mt-3 t-caption">
                      주소 · 운영시간 · 오픈일은 확정되면 안내드립니다.
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
