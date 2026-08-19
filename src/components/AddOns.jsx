import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { ADD_ONS } from '../data/products.js'
import { formatNumber } from '../lib/format.js'
import { isOptionAvailable } from '../lib/pricing.js'

/**
 * STEP 3 — 추가로 필요한 게 있나?
 * 정보 카드가 아니라 선택 가능한 UI. 선택/해제가 되고 금액에 즉시 반영된다.
 * 지점별 운영 여부는 stores.js 의 clothingAvailable / lockerAvailable 로 제어한다.
 * (false 면 선택 불가, null 이면 미확정이라 선택은 열어두고 안내만 한다)
 */
export default function AddOns({ store, quote, selectedOptionIds, onToggleOption }) {
  return (
    <Section
      id="options"
      title={
        <>
          필요한 것만
          <br />
          더하세요.
        </>
      }
      description="기본 구독료에 포함되지 않는 선택 항목입니다."
    >
      <div className="grid grid-cols-2 gap-3">
        {ADD_ONS.map((item, i) => {
          const available = isOptionAvailable(store, item.id)
          const selected = available && selectedOptionIds.includes(item.id)

          return (
            <Reveal key={item.id} delay={i * 70} className="h-full">
              <button
                type="button"
                disabled={!available}
                aria-pressed={selected}
                onClick={() => onToggleOption(item.id)}
                className={`card w-full items-start text-left ${selected ? 'card-selected' : ''}`}
                style={{ opacity: available ? 1 : 0.45, cursor: available ? 'pointer' : 'not-allowed' }}
              >
                <div className="flex w-full items-start justify-between">
                  <span className="text-mute">
                    <iconify-icon icon={item.icon} width="22"></iconify-icon>
                  </span>
                  {/* 체크 표시 — 자리를 항상 차지해 카드 크기가 변하지 않는다 */}
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-300"
                    style={{
                      background: selected ? 'var(--color-accent)' : 'transparent',
                      border: selected ? '1px solid transparent' : '1px solid var(--color-line-2)',
                      color: selected ? '#fff' : 'transparent',
                    }}
                  >
                    <iconify-icon icon="solar:check-read-linear" width="13"></iconify-icon>
                  </span>
                </div>

                <h3 className="mt-4 t-card text-fog">{item.name}</h3>

                <div className="card-foot !pt-4 flex items-baseline gap-1">
                  <span className="tnum text-[20px] font-bold text-fog">
                    +{formatNumber(item.price)}원
                  </span>
                  <span className="text-[12.5px] text-mute">/ {item.priceUnit}</span>
                </div>
              </button>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={140} className="mt-4">
        <p className="t-caption">지점별 운영 여부는 상담 시 안내드립니다.</p>
      </Reveal>

      {/* 월 예상 결제금액 — 월 단위 상품일 때만 */}
      {quote.calculable && (
        <Reveal delay={180} className="mt-5">
          <div className="card">
            <dl>
              <div className="inforow">
                <dt className="!flex-1">{quote.product.name}</dt>
                <dd className="tnum !flex-none font-semibold">
                  {formatNumber(quote.basePrice)}원
                </dd>
              </div>
              {quote.options.map((o) => (
                <div key={o.id} className="inforow">
                  <dt className="!flex-1">{o.name}</dt>
                  <dd className="tnum !flex-none font-semibold">+{formatNumber(o.price)}원</dd>
                </div>
              ))}
            </dl>

            <div
              className="mt-4 flex items-baseline justify-between gap-3 border-t pt-4"
              style={{ borderColor: 'var(--color-line)' }}
            >
              <span className="text-[14px] font-semibold text-fog">월 예상 결제금액</span>
              <span
                className="tnum text-[22px] font-bold"
                style={{ color: 'var(--color-accent-soft)' }}
              >
                {formatNumber(quote.total)}원
              </span>
            </div>
          </div>
        </Reveal>
      )}
    </Section>
  )
}
