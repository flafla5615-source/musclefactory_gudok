import Reveal from './Reveal.jsx'
import { SUBSCRIPTION_STORES } from '../data/stores.js'
import { EVENTS, track } from '../lib/tracking.js'

/**
 * FINAL CTA
 * 정보를 다시 길게 반복하지 않는다. 지점을 바로 고를 수 있게만 한다.
 * 전화번호가 있는 지점은 tel: 링크로 바로 연결한다.
 */
export default function FinalCta({ selectedStoreId, onSelectStore }) {
  return (
    <section className="section bg-ink">
      <div className="wrap">
        <Reveal as="h2" className="t-section text-fog">
          일단 한 달,
          <br />
          운동부터 시작하세요.
        </Reveal>

        <Reveal as="p" delay={70} className="mt-4 t-body">
          내 주변 지점을 선택하고 바로 시작할 수 있습니다.
        </Reveal>

        <div className="section-body flex flex-col gap-2.5">
          {SUBSCRIPTION_STORES.map((store, i) => {
            const selected = selectedStoreId === store.id
            return (
              <Reveal key={store.id} delay={i * 50}>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectStore(store)}
                    className={`btn flex-1 !justify-between !px-5 ${selected ? 'btn-primary' : 'btn-line'}`}
                  >
                    <span className="truncate text-left">{store.name}</span>
                    <iconify-icon icon="solar:alt-arrow-right-linear" width="16"></iconify-icon>
                  </button>

                  {store.phone && (
                    <a
                      href={`tel:${store.phone.replace(/-/g, '')}`}
                      onClick={() =>
                        track(EVENTS.CONSULTATION_CLICK, {
                          store_id: store.id,
                          channel: 'phone',
                          source: 'final',
                        })
                      }
                      aria-label={`${store.name} 전화 문의`}
                      className="btn btn-line btn-auto flex-shrink-0 !px-4"
                    >
                      <iconify-icon icon="solar:phone-linear" width="18"></iconify-icon>
                      <span className="hidden sm:inline">전화 문의</span>
                    </a>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
