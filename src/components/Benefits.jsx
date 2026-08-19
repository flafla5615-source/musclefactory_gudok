import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { BENEFITS } from '../data/content.js'

/** BENEFIT — 4개 항목 동일 규격 2열. */
export default function Benefits() {
  return (
    <Section
      tone="ink-2"
      title={
        <>
          운동을 시작하는
          <br />
          방식부터 가볍게.
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {BENEFITS.map((benefit, i) => (
          <Reveal key={benefit.id} delay={i * 60} className="h-full">
            <div className="card">
              <span className="text-mute">
                <iconify-icon icon={benefit.icon} width="21"></iconify-icon>
              </span>
              <h3 className="mt-4 text-[15px] font-bold leading-snug text-fog">{benefit.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-mute">{benefit.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
