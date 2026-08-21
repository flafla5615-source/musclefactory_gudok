import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { CAMPAIGN_POINTS } from '../data/content.js'

/**
 * 왜 일단 한 달인가
 * (기존 Problem + WhatIsSubscription 을 하나로 압축한 섹션)
 *
 * 상품 선택으로 넘어가기 위한 짧은 설명이다. 긴 문단을 쓰지 않고,
 * '혁신적인 구독 시스템' 같은 표현도 쓰지 않는다.
 */
export default function CampaignWhy() {
  return (
    <Section tone="paper">
      <Reveal as="h2" className="t-section text-ink">
        1년 말고,
        <br />
        일단 한 달.
      </Reveal>

      <Reveal as="p" delay={80} className="mt-5 t-body !text-ink/65">
        운동을 얼마나 오래 할지 시작하기 전에 결정할 필요 없습니다.
      </Reveal>

      <Reveal as="p" delay={140} className="mt-3 text-[16px] font-semibold leading-relaxed text-ink">
        한 달부터 시작하고
        <br />
        계속하고 싶을 때 계속하는 운동.
      </Reveal>

      <div className="section-body grid gap-3 md:grid-cols-3">
        {CAMPAIGN_POINTS.map((point, i) => (
          <Reveal key={point.id} delay={200 + i * 70} className="h-full">
            <div className="card-light">
              <h3 className="t-card text-ink">{point.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/55">{point.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
