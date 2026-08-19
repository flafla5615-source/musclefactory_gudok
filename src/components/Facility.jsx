import { useEffect, useMemo, useState } from 'react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import StorePhoto from './StorePhoto.jsx'
import { SUBSCRIPTION_STORES } from '../data/stores.js'
import { orPending } from '../lib/format.js'
import { EVENTS, openChannel } from '../lib/tracking.js'

const INFO_ROWS = [
  { key: 'address', label: '주소', icon: 'solar:map-point-linear' },
  { key: 'operatingHours', label: '운영시간', icon: 'solar:clock-circle-linear' },
  { key: 'parking', label: '주차', icon: 'solar:parking-linear' },
  { key: 'phone', label: '전화', icon: 'solar:phone-linear' },
]

/**
 * FACILITY — 지점 탭 + 실사진 가로 레일 + 지점 정보
 * 사진은 실제 센터사진만 노출한다. 없는 지점은 준비 중으로 표시하고
 * public/images/<지점 id>/ 에 파일을 넣은 뒤 stores.js 의 images 에 경로만 추가하면 된다.
 */
export default function Facility({ selectedStoreId, onSelectStore }) {
  const [tabId, setTabId] = useState(
    selectedStoreId || SUBSCRIPTION_STORES.find((s) => s.images.length > 0)?.id || SUBSCRIPTION_STORES[0].id,
  )

  // 지점 선택 섹션에서 지점을 고르면 시설 탭도 따라간다
  useEffect(() => {
    if (selectedStoreId) setTabId(selectedStoreId)
  }, [selectedStoreId])

  const store = useMemo(
    () => SUBSCRIPTION_STORES.find((s) => s.id === tabId) || SUBSCRIPTION_STORES[0],
    [tabId],
  )

  const hasPhotos = store.images.length > 0

  return (
    <section id="facility" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Facility"
          title={
            <>
              매일 다닐 곳이니까,
              <br />
              시설도 직접 확인하세요.
            </>
          }
        />

        {/* 지점 탭 */}
        <Reveal delay={120} className="rail mt-10 pb-1">
          {SUBSCRIPTION_STORES.map((s) => {
            const active = s.id === store.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setTabId(s.id)}
                className="rounded-full px-4 py-2.5 text-[13.5px] font-semibold transition-colors duration-500"
                style={{
                  transitionTimingFunction: 'var(--ease-spring)',
                  background: active ? 'var(--color-accent)' : 'rgba(255,255,255,0.045)',
                  color: active ? '#fff' : 'var(--color-mute)',
                  border: active ? '1px solid transparent' : '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {s.shortName}
                {s.images.length === 0 && (
                  <span className="ml-1.5 text-[11px] opacity-60">준비 중</span>
                )}
              </button>
            )
          })}
        </Reveal>

        {/* 사진 레일 */}
        <Reveal delay={180} className="mt-6">
          {hasPhotos ? (
            <div className="rail">
              {store.images.map((image, i) => (
                <StorePhoto
                  key={image.src}
                  src={image.src}
                  alt={`${store.storeName} ${image.category}`}
                  caption={image.category}
                  className="aspect-[4/3] w-[82vw] rounded-3xl sm:w-[56vw] lg:w-[42%]"
                  eager={i === 0}
                />
              ))}
            </div>
          ) : (
            <div className="bezel">
              <div className="bezel-inner flex flex-col items-center gap-3 px-6 py-16 text-center">
                <iconify-icon
                  icon="solar:camera-linear"
                  width="30"
                  style={{ color: 'var(--color-mute-2)' }}
                ></iconify-icon>
                <p className="text-[15px] font-semibold text-fog">
                  {store.storeName} 실사진 준비 중
                </p>
                <p className="max-w-sm text-[13px] leading-relaxed text-mute-2">
                  실제 센터사진만 사용합니다. 사진 촬영 후 순차적으로 공개됩니다.
                </p>
              </div>
            </div>
          )}
        </Reveal>

        {hasPhotos && (
          <Reveal delay={220} className="mt-4 flex items-center gap-2">
            <iconify-icon
              icon="solar:round-arrow-right-linear"
              width="15"
              style={{ color: 'var(--color-mute-2)' }}
            ></iconify-icon>
            <span className="text-[12px] text-mute-2">옆으로 밀어 더 보기</span>
          </Reveal>
        )}

        {/* 지점 정보 + 선택 CTA */}
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="bezel h-full">
              <div className="bezel-inner h-full p-6 md:p-7">
                <span
                  className="font-display text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: store.brand.color }}
                >
                  {store.brand.key}
                </span>
                <h3 className="mt-1.5 text-[20px] font-bold text-fog">{store.storeName}</h3>

                <dl className="mt-6 flex flex-col gap-4">
                  {INFO_ROWS.map((row) => {
                    const value = store[row.key]
                    return (
                      <div key={row.key} className="flex items-start gap-3">
                        <iconify-icon
                          icon={row.icon}
                          width="18"
                          style={{
                            color: 'var(--color-mute-2)',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        ></iconify-icon>
                        <div>
                          <dt className="text-[12px] text-mute-2">{row.label}</dt>
                          <dd
                            className="mt-0.5 text-[14px] leading-relaxed"
                            style={{
                              color: value ? 'var(--color-fog)' : 'var(--color-mute-2)',
                              fontStyle: value ? 'normal' : 'italic',
                            }}
                          >
                            {row.key === 'phone' && value ? (
                              <a href={`tel:${value.replace(/-/g, '')}`} className="hover:underline">
                                {value}
                              </a>
                            ) : (
                              orPending(value)
                            )}
                          </dd>
                        </div>
                      </div>
                    )
                  })}
                </dl>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-5">
            <div className="bezel h-full">
              <div className="bezel-inner flex h-full flex-col justify-between gap-6 p-6 md:p-7">
                <div>
                  <p className="text-[15px] font-bold text-fog">이 지점으로 시작할까요?</p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-mute">
                    지점을 선택하면 상품 가격과 하단 버튼이 {store.shortName} 기준으로 바뀝니다.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectStore(store)}
                    className={`btn w-full ${selectedStoreId === store.id ? 'btn-ghost' : 'btn-primary'}`}
                  >
                    {selectedStoreId === store.id
                      ? `${store.shortName} 선택됨`
                      : `${store.shortName} 선택하기`}
                    <span className="btn-orb">
                      <iconify-icon
                        icon={
                          selectedStoreId === store.id
                            ? 'solar:check-read-linear'
                            : 'solar:arrow-right-linear'
                        }
                        width="14"
                      ></iconify-icon>
                    </span>
                  </button>

                  {/* 확인된 채널만 노출 — 없는 채널은 만들지 않는다 */}
                  {(store.naverUrl || store.instagramUrl) && (
                    <div className="grid grid-cols-2 gap-2.5">
                      {store.naverUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            openChannel(store.naverUrl, EVENTS.CONSULTATION_CLICK, {
                              store_id: store.id,
                              channel: 'naver',
                            })
                          }
                          className="btn btn-ghost !min-h-[46px] text-[13px]"
                        >
                          <iconify-icon icon="solar:map-point-linear" width="15"></iconify-icon>
                          네이버
                        </button>
                      )}
                      {store.instagramUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            openChannel(store.instagramUrl, EVENTS.CONSULTATION_CLICK, {
                              store_id: store.id,
                              channel: 'instagram',
                            })
                          }
                          className="btn btn-ghost !min-h-[46px] text-[13px]"
                        >
                          <iconify-icon icon="solar:instagram-linear" width="15"></iconify-icon>
                          인스타그램
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
