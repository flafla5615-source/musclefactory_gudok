import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

/**
 * WHY — 상품 선택으로 넘어가기 위한 짧은 설명.
 * 긴 문단을 쓰지 않는다. 기존 장기회원권 이용자를 비꼬지 않는다.
 */
export default function Problem() {
  return (
    <Section tone="paper">
      <Reveal as="h2" className="t-section text-ink">
        1년 끊고,
        <br />
        3개월 다니셨죠?
      </Reveal>
      <Reveal as="p" delay={80} className="mt-5 t-body !text-ink/65">
        처음부터 긴 기간을 결정하고 큰 금액을 한 번에 결제하던 헬스장 등록.
      </Reveal>
      <Reveal as="p" delay={140} className="mt-3 text-[16px] font-semibold text-ink">
        이제 이용방식을 바꿉니다.
      </Reveal>
    </Section>
  )
}
