import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { SUBSCRIPTION_POINTS } from '../data/content.js'

/**
 * SUBSCRIPTION — 구독제가 무엇인지 짧게.
 * 해지 정책은 약관 확정 전이라 '언제든/즉시 해지' 같은 표현을 쓰지 않는다.
 */
export default function WhatIsSubscription() {
  return (
    <Section
      title={
        <>
          헬스장도
          <br />한 달씩.
        </>
      }
      description="매월 결제하고 이용하는 새로운 헬스장 이용방식."
    >
      <div className="grid gap-3 md:grid-cols-3">
        {SUBSCRIPTION_POINTS.map((point, i) => (
          <Reveal key={point.id} delay={i * 70} className="h-full">
            <div className="card">
              <h3 className="t-card text-fog">{point.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-mute">{point.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
