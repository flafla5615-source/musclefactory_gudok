import { useEffect } from 'react'
import { GLOBAL_CONTACT } from '../data/contact.js'
import { formatNumber } from '../lib/format.js'
import { EVENTS, openChannel, track } from '../lib/tracking.js'

/**
 * 구독 신청 / 상담 시트.
 * 실제 결제·가입 방식이 확정되지 않았으므로 결제를 임의로 구현하지 않고,
 * 선택 내용을 정리해 확인된 문의 채널로만 연결한다.
 * 채널이 확정되면 data/contact.js 값만 채우면 버튼이 자동으로 생긴다.
 */
export default function ConsultSheet({ open, onClose, store, quote }) {
  const product = quote.product
  const price = quote.calculable ? quote.total : quote.basePrice

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      track(EVENTS.SIGNUP_START, {
        store_id: store?.id ?? null,
        product_id: product?.id ?? null,
        price: price ?? null,
      })
    }
  }, [open, store, product, price])

  if (!open) return null

  const channels = [
    store?.links?.naver && { key: 'naver', label: '네이버 플레이스', url: store.links.naver },
    store?.links?.instagram && { key: 'instagram', label: '인스타그램', url: store.links.instagram },
    GLOBAL_CONTACT.kakaoUrl && { key: 'kakao', label: '카카오톡 문의', url: GLOBAL_CONTACT.kakaoUrl },
    GLOBAL_CONTACT.formUrl && { key: 'form', label: '온라인 신청', url: GLOBAL_CONTACT.formUrl },
  ].filter(Boolean)

  const rows = [
    { label: '지점', value: store ? store.name : '선택 전' },
    { label: '상품', value: product ? product.name : '선택 전' },
    // 선택한 옵션만 노출
    quote.options.length > 0 && {
      label: '추가옵션',
      value: quote.options.map((o) => `${o.name} +${formatNumber(o.price)}원`).join(', '),
    },
    {
      label: quote.calculable ? '월 예상 결제금액' : '가격',
      value:
        typeof price === 'number'
          ? `${formatNumber(price)}원${quote.calculable ? ' / 월' : ''}`
          : '가격 추후 공개',
    },
  ].filter(Boolean)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="구독 문의"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        style={{ background: 'rgba(6,6,6,0.75)' }}
      />

      <div
        className="relative w-full max-w-[480px] overflow-hidden rounded-t-[20px] border md:rounded-[20px]"
        style={{
          borderColor: 'var(--color-line)',
          background: 'var(--color-surface)',
          maxHeight: '86dvh',
        }}
      >
        <div className="flex items-center justify-between gap-4 px-5 pt-5">
          <h2 className="text-[18px] font-bold tracking-[-0.02em] text-fog">선택하신 내용</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-mute"
          >
            <iconify-icon icon="solar:close-circle-linear" width="21"></iconify-icon>
          </button>
        </div>

        <div className="overflow-y-auto px-5 pb-6 pt-4" style={{ maxHeight: 'calc(86dvh - 76px)' }}>
          <dl>
            {rows.map((r) => (
              <div key={r.label} className="inforow">
                <dt className="!flex-[0_0_92px]">{r.label}</dt>
                <dd className={r.label.includes('가격') || r.label.includes('금액') ? 'tnum font-semibold' : ''}>
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col gap-2.5">
            {channels.length > 0 ? (
              channels.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() =>
                    openChannel(c.url, EVENTS.CONSULTATION_CLICK, {
                      store_id: store?.id ?? null,
                      product_id: product?.id ?? null,
                      channel: c.key,
                    })
                  }
                  className="btn btn-line"
                >
                  {c.label}
                </button>
              ))
            ) : (
              <p className="t-caption">
                이 지점의 문의 채널은 준비 중입니다. 곧 안내드리겠습니다.
              </p>
            )}

            {GLOBAL_CONTACT.phone && (
              <a
                href={`tel:${GLOBAL_CONTACT.phone.replace(/-/g, '')}`}
                onClick={() =>
                  track(EVENTS.CONSULTATION_CLICK, {
                    store_id: store?.id ?? null,
                    product_id: product?.id ?? null,
                    channel: 'phone',
                  })
                }
                className="btn btn-primary"
              >
                전화 문의 {GLOBAL_CONTACT.phone}
              </a>
            )}
          </div>

          <p className="mt-5 t-caption">
            결제 방식과 세부 이용조건은 최종 정책 확정 후 안내드립니다.
          </p>
        </div>
      </div>
    </div>
  )
}
