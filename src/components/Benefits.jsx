import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { BENEFITS } from '../data/content.js'

/**
 * BENEFIT — 4개 포인트.
 * 3열 균등 카드 배치를 피하려고 좌측 헤딩 + 우측 2×2 스태거 그리드로 구성한다.
 */
export default function Benefits() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Benefit"
            title={
              <>
                운동을 시작하는
                <br />
                방식부터 가볍게.
              </>
            }
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {BENEFITS.map((benefit, i) => (
            <Reveal
              key={benefit.id}
              delay={i * 80}
              // 홀수 번째 카드를 살짝 내려 균등 그리드의 단조로움을 깬다
              className={i % 2 === 1 ? 'sm:translate-y-6' : ''}
            >
              <div className="bezel h-full">
                <div className="bezel-inner flex h-full flex-col p-6">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      background: 'rgba(224,86,42,0.11)',
                      color: 'var(--color-accent-soft)',
                    }}
                  >
                    <iconify-icon icon={benefit.icon} width="22"></iconify-icon>
                  </span>
                  <h3 className="mt-5 text-[16.5px] font-bold text-fog">{benefit.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-mute">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
