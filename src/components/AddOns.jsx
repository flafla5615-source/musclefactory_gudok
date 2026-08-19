import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { ADD_ONS } from '../data/products.js'
import { formatNumber } from '../lib/format.js'

/**
 * 추가 옵션 — 라이트 섹션으로 한 번 더 톤을 끊는다.
 * 기본 구독료에 전부 얹지 않고, 필요한 것만 고른다는 개념.
 */
export default function AddOns() {
  const items = ADD_ONS.filter((item) => item.status !== 'hidden')

  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Add-on"
              title={
                <>
                  필요한 것만
                  <br />
                  더하세요.
                </>
              }
              description="운동에 집중할 수 있도록, 필요한 옵션만 선택할 수 있습니다."
              tone="light"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 90}>
                <div
                  className="flex h-full flex-col rounded-[22px] border bg-white p-6 transition-transform duration-500"
                  style={{
                    borderColor: 'rgba(17,17,17,0.08)',
                    boxShadow: '0 18px 44px -30px rgba(60,40,28,0.45)',
                    transitionTimingFunction: 'var(--ease-spring)',
                  }}
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: 'rgba(224,86,42,0.1)', color: 'var(--color-accent-deep)' }}
                  >
                    <iconify-icon icon={item.icon} width="21"></iconify-icon>
                  </span>

                  <h3 className="mt-5 text-[18px] font-bold text-ink">{item.name}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/55">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-baseline gap-1.5 pt-6">
                    <span
                      className="tnum text-[24px] font-black tracking-[-0.02em]"
                      style={{ color: 'var(--color-accent-deep)' }}
                    >
                      +{formatNumber(item.price)}원
                    </span>
                    <span className="text-[13px] font-medium text-ink/45">/ {item.priceUnit}</span>
                  </div>

                  {item.note && (
                    <p className="mt-3 text-[12px] leading-relaxed text-ink/40">{item.note}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={160} className="mt-8">
          <p className="text-[13px] leading-relaxed text-ink/45">
            추가 옵션은 기본 구독료에 포함되지 않는 선택 항목입니다.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
