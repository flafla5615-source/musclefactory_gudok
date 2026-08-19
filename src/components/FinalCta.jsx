import Reveal from './Reveal.jsx'
import { formatNumber } from '../lib/format.js'

/** FINAL CTA — 마지막까지 메시지는 '월 48,900원부터'. */
export default function FinalCta({ price, selectedStore, onSubscribe, onConsult }) {
  return (
    <section className="section bg-ink-2">
      <div className="wrap">
        <Reveal as="h2" className="t-section text-fog">
          이제 헬스도
          <br />
          구독으로 시작하세요.
        </Reveal>

        <Reveal delay={70} className="mt-4 flex flex-wrap items-baseline gap-x-2">
          <span className="tnum text-[17px] font-bold text-mute">
            월 {formatNumber(price)}원부터
          </span>
          {selectedStore && <span className="t-caption">{selectedStore.name} 기준</span>}
        </Reveal>

        <Reveal delay={140} className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={onSubscribe}
            className="btn btn-primary sm:btn-auto sm:!px-7"
          >
            {selectedStore ? `${selectedStore.shortName} 구독하기` : '내 지점 선택하기'}
          </button>
          <button type="button" onClick={onConsult} className="btn btn-line sm:btn-auto sm:!px-7">
            구독 상담하기
          </button>
        </Reveal>
      </div>
    </section>
  )
}
