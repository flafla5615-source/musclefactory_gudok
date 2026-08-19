import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { EVENT_PRODUCT } from '../data/products.js'
import { formatNumber } from '../lib/format.js'

/**
 * OPEN EVENT — 12개월 회원권.
 * ⚠ 메인 PRICE 영역과 분리하고, HERO 의 월 48,900원보다
 *    시각적으로 강하게 만들지 않는다. (액센트 컬러 미사용)
 */
export default function OpenEvent({ onConsult }) {
  return (
    <Section>
      <Reveal className="card">
        <span className="t-label text-mute-2">{EVENT_PRODUCT.badge}</span>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-[26px] font-bold tracking-[-0.025em] text-fog">12개월</h2>
          <span className="tnum text-[26px] font-bold tracking-[-0.025em] text-fog">
            {formatNumber(EVENT_PRODUCT.price)}원
          </span>
        </div>

        <p className="mt-2.5 t-caption">{EVENT_PRODUCT.summary}</p>

        <div className="card-foot">
          <button
            type="button"
            onClick={() => onConsult(EVENT_PRODUCT)}
            className="btn btn-line md:btn-auto md:!px-7"
          >
            {EVENT_PRODUCT.ctaLabel}
          </button>
        </div>
      </Reveal>
    </Section>
  )
}
