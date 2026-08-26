import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { FLOW_SUMMARY } from '../data/content.js'

/**
 * 공통 흐름 요약.
 *
 * 실제 앱·QR·가입 절차는 지점을 선택했을 때 SelectedStore 아래의
 * StoreUsageGuide 에서 보여준다. 여기서는 전체 흐름만 짧게 정리한다.
 */
export default function HowToUse() {
  return (
    <Section id="how-to-use" tone="ink-2" title="시작은 간단하게.">
      <ol className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {FLOW_SUMMARY.map((step, i) => (
          <Reveal as="li" key={step.no} delay={i * 60} className="h-full">
            <div className="card">
              <span className="tnum font-display text-[13px] font-semibold text-mute-2">
                {step.no}
              </span>
              <h3 className="mt-3 text-[15px] font-bold text-fog">{step.title}</h3>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
