import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { COMPARISON_PRODUCTS } from '../data/products.js'
import { formatPrice } from '../lib/format.js'

const COLUMNS = [
  { key: 'price', label: '가격', align: 'right' },
  { key: 'duration', label: '이용기간' },
  { key: 'usageScope', label: '이용범위' },
  { key: 'paymentType', label: '결제방식' },
]

/**
 * 상품 비교
 * PC용 표를 모바일에서 축소하지 않는다 — 가로 스크롤 표로 두고
 * 첫 열(상품명)을 고정해 어떤 상품 줄인지 항상 보이게 한다.
 */
export default function Compare({ selectedStore }) {
  const cellValue = (product, key) => {
    if (key === 'price') {
      if (product.price === null) return product.priceLabel
      if (product.storePriceAware && selectedStore && typeof selectedStore.monthlyPrice === 'number') {
        return formatPrice(selectedStore.monthlyPrice)
      }
      return formatPrice(product.price)
    }
    return product[key]
  }

  const isPending = (value) => typeof value === 'string' && value.startsWith('[')

  return (
    <section className="bg-ink pb-24 pt-4 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Compare"
          title="한눈에 비교하기"
          description="가격이 확정되지 않은 항목은 임의로 채우지 않고 그대로 비워 둡니다."
        />

        <Reveal delay={120} className="mt-10">
          <div className="bezel">
            <div className="bezel-inner overflow-hidden">
              <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'var(--color-line)' }}>
                      <th className="sticky left-0 z-10 bg-surface px-5 py-4 text-[12px] font-semibold tracking-wide text-mute-2">
                        상품
                      </th>
                      {COLUMNS.map((col) => (
                        <th
                          key={col.key}
                          className={`whitespace-nowrap px-5 py-4 text-[12px] font-semibold tracking-wide text-mute-2 ${
                            col.align === 'right' ? 'text-right' : ''
                          }`}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_PRODUCTS.map((product) => {
                      const highlight = product.recommended
                      return (
                        <tr
                          key={product.id}
                          className="border-b last:border-b-0"
                          style={{
                            borderColor: 'var(--color-line)',
                            background: highlight ? 'rgba(224,86,42,0.06)' : undefined,
                          }}
                        >
                          <th
                            scope="row"
                            className="sticky left-0 z-10 px-5 py-4 text-left"
                            style={{
                              background: highlight ? '#1f1815' : 'var(--color-surface)',
                            }}
                          >
                            <span
                              className="text-[14px] font-bold"
                              style={{
                                color: highlight ? 'var(--color-accent-soft)' : 'var(--color-fog)',
                              }}
                            >
                              {product.shortName}
                            </span>
                          </th>
                          {COLUMNS.map((col) => {
                            const value = cellValue(product, col.key)
                            return (
                              <td
                                key={col.key}
                                className={`whitespace-nowrap px-5 py-4 text-[13.5px] ${
                                  col.align === 'right' ? 'text-right tnum' : ''
                                }`}
                                style={{
                                  color: isPending(value)
                                    ? 'var(--color-mute-2)'
                                    : col.key === 'price'
                                      ? 'var(--color-fog)'
                                      : 'var(--color-mute)',
                                  fontWeight: col.key === 'price' ? 700 : 400,
                                }}
                              >
                                {value}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180} className="mt-4 flex items-center gap-2 lg:hidden">
          <iconify-icon
            icon="solar:round-arrow-right-linear"
            width="15"
            style={{ color: 'var(--color-mute-2)' }}
          ></iconify-icon>
          <span className="text-[12px] text-mute-2">표를 옆으로 밀어 확인하세요</span>
        </Reveal>
      </div>
    </section>
  )
}
