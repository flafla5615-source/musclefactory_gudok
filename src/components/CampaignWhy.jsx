import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { CAMPAIGN_POINTS } from '../data/content.js'

/**
 * 왜 '일단 한 달' 인가 + 월 구독제 설명
 *
 * 가격이 싼 헬스장이라는 인상이 아니라 '등록 방식이 달라졌다' 는 점을 말한다.
 * 글이 길어지지 않게 유지한다.
 */
export default function CampaignWhy() {
  return (
    <Section tone="paper">
      <Reveal as="h2" className="t-section text-ink">
        일단 한 달.
      </Reveal>

      <Reveal as="p" delay={80} className="mt-5 t-body !text-ink/65">
        운동을 시작하는데 꼭 6개월, 12개월을 먼저 결제할 필요는 없습니다.
        <br />한 달부터 시작하고, 계속 운동하고 싶다면 그대로 이어가세요.
      </Reveal>

      <Reveal as="p" delay={140} className="mt-4 text-[17px] font-bold text-ink">
        운동의 시작을 더 가볍게.
      </Reveal>

      {/* 일반 회원권과 무엇이 다른가 — 3개 */}
      <div className="section-body grid gap-3 md:grid-cols-3">
        {CAMPAIGN_POINTS.map((point, i) => (
          <Reveal key={point.id} delay={200 + i * 70} className="h-full">
            <div className="card-light">
              <span className="tnum font-display text-[13px] font-semibold text-ink/35">
                {point.no}
              </span>
              <h3 className="mt-3 t-card whitespace-pre-line text-ink">{point.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/55">{point.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
