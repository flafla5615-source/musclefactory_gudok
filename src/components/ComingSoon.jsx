import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { COMING_SOON } from '../data/content.js'

/**
 * 곧 추가될 지점
 *
 * ⚠ 지점명을 공개하지 않는다. 물음표 카드로만 보여준다.
 *    목적은 '구독 가능한 지점이 계속 늘어난다' 는 인상을 주는 것.
 * 카드 규격은 기존 지점 카드와 같은 .card 를 쓴다.
 */
export default function ComingSoon() {
  return (
    <Section
      title={
        <>
          다음 지점은
          <br />
          어디일까요?
        </>
      }
      description="구독 가능한 지점은 계속 늘어납니다."
    >
      <div className="grid grid-cols-2 gap-3">
        {COMING_SOON.map((item, i) => (
          <Reveal key={item.id} delay={i * 70} className="h-full">
            <div className="card items-center !py-9 text-center">
              <span
                className="font-display text-[34px] font-bold leading-none"
                style={{ color: 'var(--color-line-2)' }}
              >
                ?
              </span>
              <p className="t-label mt-4 text-mute-2">{item.brand}</p>
              <p className="t-label mt-1.5" style={{ color: 'var(--color-accent-soft)' }}>
                Coming Soon
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
