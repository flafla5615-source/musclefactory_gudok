import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import StorePhoto from './StorePhoto.jsx'
import { SUBSCRIPTION_STORES } from '../data/stores.js'
import { BASE_MONTHLY_PRICE } from '../data/products.js'
import { formatNumber, orPending } from '../lib/format.js'

/**
 * SECTION — STORE
 * 지점을 추가하면 카드가 자동으로 늘어난다. (stores.js 배열만 수정)
 *
 * 6컬럼 그리드에 4/2/2/4 패턴을 반복시켜 지그재그 벤토를 만든다.
 * 지점이 몇 개가 되든 3열 균등 배치가 생기지 않는다.
 */
const SPAN_PATTERN = [4, 2, 2, 4]
const SPAN_CLASS = { 2: 'lg:col-span-2', 4: 'lg:col-span-4' }
export default function Stores({ selectedStoreId, onSelectStore }) {
  return (
    <section id="store" className="bg-ink-2 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Store"
          title="어디에서 운동하세요?"
          description="내가 주로 다닐 지점을 선택하면 가격과 하단 버튼이 그 지점 기준으로 바뀝니다."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {SUBSCRIPTION_STORES.map((store, i) => {
            const selected = selectedStoreId === store.id
            const span = SPAN_PATTERN[i % SPAN_PATTERN.length]
            const wide = span === 4
            const price = typeof store.monthlyPrice === 'number' ? store.monthlyPrice : BASE_MONTHLY_PRICE
            const hasOwnPrice = typeof store.monthlyPrice === 'number'

            return (
              <Reveal
                key={store.id}
                delay={i * 70}
                className={SPAN_CLASS[span]}
              >
                <button
                  type="button"
                  onClick={() => onSelectStore(store)}
                  aria-pressed={selected}
                  className="bezel block h-full w-full text-left transition-transform duration-500"
                  style={{
                    transitionTimingFunction: 'var(--ease-spring)',
                    borderColor: selected ? 'rgba(224,86,42,0.6)' : undefined,
                    background: selected
                      ? 'linear-gradient(180deg, rgba(224,86,42,0.2), rgba(255,255,255,0.02))'
                      : undefined,
                  }}
                >
                  <div className="bezel-inner flex h-full flex-col overflow-hidden">
                    <div className="relative">
                      <StorePhoto
                        src={store.images[0]?.src}
                        alt={`${store.storeName} 센터 사진`}
                        folder={`public/images/${store.id}/`}
                        className={wide ? 'aspect-[16/9] w-full' : 'aspect-[4/3] w-full'}
                      />
                      {/* 지점별 가격 예외 뱃지 */}
                      {hasOwnPrice && (
                        <span
                          className="tnum absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold"
                          style={{ background: 'var(--color-accent)', color: '#fff' }}
                        >
                          월 {formatNumber(store.monthlyPrice)}원
                        </span>
                      )}
                      {selected && (
                        <span
                          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full"
                          style={{ background: 'var(--color-accent)', color: '#fff' }}
                        >
                          <iconify-icon icon="solar:check-read-linear" width="15"></iconify-icon>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <span
                        className="font-display text-[10px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: store.brand.color }}
                      >
                        {store.brand.key}
                      </span>
                      <h3 className="mt-1.5 text-[17px] font-bold tracking-[-0.01em] text-fog">
                        {store.storeName}
                      </h3>
                      <p className="mt-1 text-[13px] text-mute-2">
                        {store.address ? store.address : orPending(null)}
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-3 pt-1">
                        <span className="tnum text-[13px] font-semibold text-mute">
                          월 {formatNumber(price)}원부터
                        </span>
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-semibold transition-colors duration-500"
                          style={{
                            background: selected ? 'var(--color-accent)' : 'rgba(255,255,255,0.06)',
                            color: selected ? '#fff' : 'var(--color-fog)',
                            border: selected
                              ? '1px solid transparent'
                              : '1px solid rgba(255,255,255,0.14)',
                          }}
                        >
                          {selected ? '선택됨' : `${store.shortName} 선택`}
                          <iconify-icon
                            icon={selected ? 'solar:check-read-linear' : 'solar:arrow-right-linear'}
                            width="13"
                          ></iconify-icon>
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>

        <Reveal
          delay={140}
          className="mt-6 flex items-start gap-2.5 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3.5"
        >
          <iconify-icon
            icon="solar:info-circle-linear"
            width="17"
            style={{ color: 'var(--color-mute-2)', flexShrink: 0, marginTop: '1px' }}
          ></iconify-icon>
          <p className="text-[13px] leading-relaxed text-mute-2">
            지점별 상세 주소 · 운영시간 · 주차 정보는 확정되는 대로 순차 반영됩니다. 구독 운영지점은
            계속 추가될 예정입니다.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
