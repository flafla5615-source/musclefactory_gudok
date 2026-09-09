import Reveal from './Reveal.jsx'
import { SUBSCRIPTION_STORES } from '../data/stores.js'

/**
 * FINAL CTA
 * 정보를 다시 길게 반복하지 않는다. 지점을 바로 고를 수 있게만 한다.
 * ⚠ 전화 문의 버튼을 두지 않는다. 상주 직원이 없는 지점이 있어
 *    랜딩을 전화문의 중심으로 운영하지 않는다.
 *    지점을 고르면 상세영역에서 앱 설치 CTA 로 이어진다.
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
                <button
                  type="button"
                  onClick={() => onSelectStore(store)}
                  className={`btn w-full !justify-between !px-5 ${selected ? 'btn-primary' : 'btn-line'}`}
                >
                  <span className="truncate text-left">{store.name}</span>
                  <iconify-icon icon="solar:alt-arrow-right-linear" width="16"></iconify-icon>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
