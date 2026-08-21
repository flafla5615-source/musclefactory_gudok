import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import StoreCard from './StoreCard.jsx'
import { SUBSCRIPTION_STORES } from '../data/stores.js'
import { BASE_MONTHLY_PRICE } from '../data/products.js'
import { monthlyPriceFor } from '../lib/format.js'

/**
 * STEP 4 — 어디에서 운동할 건데?
 * 지점 카드는 grid 로 배치한다. 5번째 카드가 혼자 남아도
 * grid 컬럼 폭을 그대로 쓰므로 마지막 카드만 넓어지지 않는다.
 */
export default function Stores({ selectedStoreId, onSelectStore }) {
  return (
    <Section id="store" title="어디에서 운동할까요?"
      description="가까운 GYM PASS 지점을 선택해주세요.">
      <div className="grid gap-3 md:grid-cols-2">
        {SUBSCRIPTION_STORES.map((store, i) => (
          <Reveal key={store.id} delay={i * 55} className="h-full">
            <StoreCard
              store={store}
              price={monthlyPriceFor(store, BASE_MONTHLY_PRICE)}
              selected={selectedStoreId === store.id}
              onSelect={onSelectStore}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
