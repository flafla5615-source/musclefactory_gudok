import Reveal from './Reveal.jsx'
import { formatNumber } from '../lib/format.js'

/** FINAL CTA — 마지막까지 메시지는 '일단 한 달. 월 48,900원부터'. */
export default function FinalCta({ price, selectedStore, onSubscribe, onConsult }) {
  return (
    <section className="section bg-ink">
      <div className="wrap">
        <Reveal as="p" className="t-label" style={{ color: 'var(--color-accent-soft)' }}>
          GYM PASS
        </Reveal>

        <Reveal as="h2" delay={70} className="mt-4 t-section text-fog">
          고민은 길게 말고.
          <br />
          일단 한 달.
        </Reveal>

        <Reveal delay={140} className="mt-4 flex flex-wrap items-baseline gap-x-2">
          <span className="tnum text-[17px] font-bold text-mute">
            월 {formatNumber(price)}원부터
          </span>
          {selectedStore && <span className="t-caption">{selectedStore.name} 기준</span>}
        </Reveal>

        <Reveal delay={200} className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={onSubscribe}
            className="btn btn-primary sm:btn-auto sm:!px-7"
          >
            내 GYM PASS 시작하기
          </button>
          <button type="button" onClick={onConsult} className="btn btn-line sm:btn-auto sm:!px-7">
            상담하기
          </button>
        </Reveal>
      </div>
    </section>
  )
}
