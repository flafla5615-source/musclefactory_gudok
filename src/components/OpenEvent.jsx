import Reveal from './Reveal.jsx'
import { EVENT_PRODUCT } from '../data/products.js'
import { formatNumber } from '../lib/format.js'

/**
 * OPEN EVENT — 12개월 회원권
 * ⚠ HERO 의 월 48,900원보다 시각적으로 강하지 않아야 한다.
 *    액센트 컬러 대신 뉴트럴 톤 밴드로 처리하고, 크기도 한 단계 낮춘다.
 */
export default function OpenEvent({ onConsult }) {
  if (!EVENT_PRODUCT) return null

  return (
    <section className="bg-ink-2 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div
            className="overflow-hidden rounded-[26px] border"
            style={{
              borderColor: 'rgba(255,255,255,0.09)',
              background:
                'linear-gradient(120deg, #191919 0%, #1f1c1a 55%, #171717 100%)',
            }}
          >
            <div className="flex flex-col gap-8 p-7 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-mute-2">
                  {EVENT_PRODUCT.badge}
                </p>
                <h2
                  className="mt-3 font-black leading-[1.08] tracking-[-0.025em] text-fog"
                  style={{ fontSize: 'clamp(26px, 5.2vw, 38px)' }}
                >
                  12개월{' '}
                  <span className="tnum">{formatNumber(EVENT_PRODUCT.price)}원</span>
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-mute">
                  {EVENT_PRODUCT.description}
                </p>
                {EVENT_PRODUCT.policyNote && (
                  <p className="mt-2 text-[12.5px] text-mute-2">{EVENT_PRODUCT.policyNote}</p>
                )}
              </div>

              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={() => onConsult(EVENT_PRODUCT)}
                  className="btn btn-ghost w-full md:w-auto"
                >
                  {EVENT_PRODUCT.cta.label}
                  <span className="btn-orb">
                    <iconify-icon icon="solar:arrow-right-linear" width="14"></iconify-icon>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
