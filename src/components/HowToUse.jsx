import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { HOW_TO_STEPS } from '../data/content.js'

/**
 * HOW TO USE — 가입 과정.
 * 실제 결제 방식이 확정되지 않았으므로 결제 시스템이나 특정 업체를 가정하지 않는다.
 */
export default function HowToUse() {
  return (
    <Section tone="ink-2" title="시작은 간단하게.">
      <ol className="grid gap-3 md:grid-cols-4">
        {HOW_TO_STEPS.map((step, i) => (
          <Reveal as="li" key={step.no} delay={i * 60} className="h-full">
            <div className="card">
              <span className="tnum font-display text-[13px] font-semibold text-mute-2">
                {step.no}
              </span>
              <h3 className="mt-3 text-[15px] font-bold text-fog">{step.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-mute">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
