import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { HOW_TO_STEPS } from '../data/content.js'

/**
 * HOW TO USE — 가로 타임라인.
 * 실제 결제 방식이 확정되지 않았으므로 결제 시스템이나 특정 업체를 가정하지 않는다.
 */
export default function HowToUse() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="How to use" title="시작은 간단하게." />

        <div className="relative mt-12">
          {/* 연결선 */}
          <div
            className="absolute left-[19px] top-2 hidden h-[calc(100%-16px)] w-px md:left-0 md:top-[19px] md:block md:h-px md:w-full"
            style={{ background: 'var(--color-line)' }}
            aria-hidden="true"
          />

          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
            {HOW_TO_STEPS.map((step, i) => (
              <Reveal as="li" key={step.no} delay={i * 90} className="flex gap-4 md:block">
                <span
                  className="tnum flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-display text-[13px] font-bold"
                  style={{
                    background: i === 0 ? 'var(--color-accent)' : 'var(--color-surface)',
                    color: i === 0 ? '#fff' : 'var(--color-mute)',
                    border: i === 0 ? '1px solid transparent' : '1px solid var(--color-line)',
                  }}
                >
                  {step.no}
                </span>
                <div className="md:mt-5">
                  <h3 className="text-[16px] font-bold text-fog">{step.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-mute">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
