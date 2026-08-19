import { useState } from 'react'
import Reveal from './Reveal.jsx'
import { COMPARISON_ROWS } from '../data/products.js'
import { formatPrice } from '../lib/format.js'

const FIELDS = [
  { key: 'duration', label: '이용기간' },
  { key: 'scope', label: '이용범위' },
  { key: 'payment', label: '결제방식' },
]

/**
 * 상품 비교 — PC용 표를 모바일에 축소해 넣지 않는다.
 * 기본은 접어 두고, 펼치면 상품별 카드 형태로 핵심 4개 항목만 보여준다.
 */
export default function Compare({ selectedStore }) {
  const [open, setOpen] = useState(false)

  const priceOf = (row) => {
    if (row.price === null) return '가격 추후 공개'
    if (row.storePriceAware && selectedStore && typeof selectedStore.monthlyPrice === 'number') {
      return formatPrice(selectedStore.monthlyPrice)
    }
    return formatPrice(row.price)
  }

  return (
    <Reveal delay={140} className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="btn btn-line"
      >
        상품 비교하기
        <iconify-icon
          icon="solar:alt-arrow-down-linear"
          width="16"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .4s var(--ease-spring)' }}
        ></iconify-icon>
      </button>

      {open && (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {COMPARISON_ROWS.map((row) => (
            <div key={row.id} className="card !p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[15px] font-bold text-fog">{row.name}</h3>
                <span
                  className="tnum text-[15px] font-bold"
                  style={{
                    color: row.recommended ? 'var(--color-accent-soft)' : 'var(--color-fog)',
                  }}
                >
                  {priceOf(row)}
                </span>
              </div>
              <dl className="mt-3">
                {FIELDS.map((f) => (
                  <div key={f.key} className="inforow !py-2.5">
                    <dt className="!flex-[0_0_64px] !text-[12.5px]">{f.label}</dt>
                    <dd className="!text-[13px] !text-mute">{row.compare[f.key]}</dd>
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
