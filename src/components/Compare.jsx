import { useState } from 'react'
import Reveal from './Reveal.jsx'
import { formatPrice, productPriceText } from '../lib/format.js'

/**
 * 상품 비교 — PC용 표를 모바일에 축소해 넣지 않는다.
 * 기본은 접어 두고, 펼치면 상품별 카드로 핵심 항목만 보여준다.
 *
 * 선택한 이용범위의 상품만 비교한다. 4개를 한 번에 나열하지 않는다.
 * 비교 항목(이용기간 · 이용범위 · 결제/판매)은 products.js 의
 * product.compare 배열에서 그대로 읽는다. 여기에 조건을 쓰지 않는다.
 */
export default function Compare({ products = [], selectedStore }) {
  const [open, setOpen] = useState(false)

  // 비교할 상품이 하나뿐이면 비교 자체가 의미 없다
  if (products.length < 2) return null

  const priceOf = (product) => {
    if (product.price === null) return '가격 추후 공개'
    if (product.storePriceAware && selectedStore && typeof selectedStore.monthlyPrice === 'number') {
      return productPriceText(selectedStore.monthlyPrice, product.priceUnit)
    }
    return productPriceText(product.price, product.priceUnit) || formatPrice(product.price)
  }

  return (
    <Reveal delay={140} className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="btn btn-line"
      >
        이용권 비교하기
        <iconify-icon
          icon="solar:alt-arrow-down-linear"
          width="16"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .4s var(--ease-spring)' }}
        ></iconify-icon>
      </button>

      {open && (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {products.map((product) => (
            <div key={product.id} className="card !p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[15px] font-bold text-fog">{product.name}</h3>
                <span
                  className="tnum flex-shrink-0 text-[14px] font-bold"
                  style={{
                    color: product.recommended ? 'var(--color-accent-soft)' : 'var(--color-fog)',
                  }}
                >
                  {priceOf(product)}
                </span>
              </div>
              <dl className="mt-3">
                {(product.compare || []).map((row) => (
                  <div key={row.label} className="inforow !py-2.5">
                    <dt className="!flex-[0_0_64px] !text-[12.5px]">{row.label}</dt>
                    <dd className="!text-[13px] !text-mute">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      )}
    </Reveal>
  )
}
