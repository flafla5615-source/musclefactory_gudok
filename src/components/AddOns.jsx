import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { ADD_ONS } from '../data/products.js'
import { formatNumber } from '../lib/format.js'

/**
 * STEP 6 — 추가로 필요한 게 있나?
 * 두 카드의 규격을 완전히 통일한다. 긴 설명을 넣지 않는다.
 */
export default function AddOns() {
  return (
    <Section
      title={
        <>
          필요한 것만
          <br />
          더하세요.
        </>
      }
      description="기본 구독료에 포함되지 않는 선택 항목입니다."
    >
      <div className="grid grid-cols-2 gap-3">
        {ADD_ONS.map((item, i) => (
          <Reveal key={item.id} delay={i * 70} className="h-full">
            <div className="card items-start">
              <span className="text-mute">
                <iconify-icon icon={item.icon} width="22"></iconify-icon>
              </span>
              <h3 className="mt-4 t-card text-fog">{item.name}</h3>
              <div className="card-foot !pt-4 flex items-baseline gap-1">
                <span className="tnum text-[20px] font-bold text-fog">
                  +{formatNumber(item.price)}원
                </span>
                <span className="text-[12.5px] text-mute">/ {item.priceUnit}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
