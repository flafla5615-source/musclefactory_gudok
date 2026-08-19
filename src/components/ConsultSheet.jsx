import { useEffect } from 'react'
import { GLOBAL_CONTACT } from '../data/contact.js'
import { formatNumber, formatPrice } from '../lib/format.js'
import { EVENTS, openChannel, track } from '../lib/tracking.js'

/**
 * 구독 신청 / 상담 시트.
 * 실제 결제·가입 방식이 확정되지 않았으므로 결제를 임의로 구현하지 않고,
 * 선택 내용을 정리해서 확인된 문의 채널로만 연결한다.
 * 채널이 확정되면 data/contact.js 값만 채우면 버튼이 자동으로 생긴다.
 */
export default function ConsultSheet({ open, onClose, store, product, price }) {
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

  const storeChannels = [
    store?.naverUrl && { key: 'naver', label: '네이버 플레이스', icon: 'solar:map-point-linear', url: store.naverUrl },
    store?.instagramUrl && { key: 'instagram', label: '인스타그램 DM', icon: 'solar:instagram-linear', url: store.instagramUrl },
  ].filter(Boolean)

  const globalChannels = [
    GLOBAL_CONTACT.kakaoUrl && { key: 'kakao', label: '카카오톡 문의', icon: 'solar:chat-round-line-linear', url: GLOBAL_CONTACT.kakaoUrl },
    GLOBAL_CONTACT.formUrl && { key: 'form', label: '온라인 신청', icon: 'solar:clipboard-text-linear', url: GLOBAL_CONTACT.formUrl },
    GLOBAL_CONTACT.instagramUrl && { key: 'instagram-hq', label: '인스타그램', icon: 'solar:instagram-linear', url: GLOBAL_CONTACT.instagramUrl },
  ].filter(Boolean)

  const channels = [...storeChannels, ...globalChannels]

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="구독 신청 문의"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        style={{ background: 'rgba(6,6,6,0.72)', backdropFilter: 'blur(6px)' }}
      />

      <div
        className="relative w-full max-w-lg overflow-hidden rounded-t-[28px] border md:rounded-[28px]"
        style={{
          borderColor: 'rgba(255,255,255,0.11)',
          background: 'var(--color-surface)',
          maxHeight: '86dvh',
        }}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            <p className="eyebrow">Subscribe</p>
            <h2 className="mt-2 text-[21px] font-black tracking-[-0.02em] text-fog">
              선택하신 내용으로 문의하기
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-mute transition-colors duration-300 hover:bg-white/8 hover:text-fog"
          >
            <iconify-icon icon="solar:close-circle-linear" width="21"></iconify-icon>
          </button>
        </div>

        <div className="overflow-y-auto px-6 pb-6 pt-5" style={{ maxHeight: 'calc(86dvh - 96px)' }}>
          {/* 선택 요약 */}
          <dl className="flex flex-col gap-px overflow-hidden rounded-2xl" style={{ background: 'var(--color-line)' }}>
            <div className="flex items-center justify-between gap-4 bg-surface-2 px-4 py-3.5">
              <dt className="text-[13px] text-mute-2">지점</dt>
              <dd className="text-[14px] font-semibold text-fog">
                {store ? store.storeName : '아직 선택하지 않음'}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 bg-surface-2 px-4 py-3.5">
              <dt className="text-[13px] text-mute-2">상품</dt>
              <dd className="text-[14px] font-semibold text-fog">
                {product ? product.productName : '아직 선택하지 않음'}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 bg-surface-2 px-4 py-3.5">
              <dt className="text-[13px] text-mute-2">가격</dt>
              <dd className="tnum text-[15px] font-bold" style={{ color: 'var(--color-accent-soft)' }}>
                {typeof price === 'number'
                  ? `${formatNumber(price)}원${product?.priceUnit ? ` / ${product.priceUnit}` : ''}`
                  : formatPrice(null)}
              </dd>
            </div>
          </dl>

          {!store && (
            <p className="mt-4 flex items-start gap-2 text-[12.5px] leading-relaxed text-mute-2">
              <iconify-icon
                icon="solar:info-circle-linear"
                width="15"
                style={{ flexShrink: 0, marginTop: '2px' }}
              ></iconify-icon>
              지점을 먼저 선택하시면 해당 지점 문의 채널로 바로 연결됩니다.
            </p>
          )}

          {/* 문의 채널 */}
          <div className="mt-6 flex flex-col gap-2.5">
            {channels.length > 0 ? (
              channels.map((channel) => (
                <button
                  key={channel.key}
                  type="button"
                  onClick={() =>
                    openChannel(channel.url, EVENTS.CONSULTATION_CLICK, {
                      store_id: store?.id ?? null,
                      product_id: product?.id ?? null,
                      channel: channel.key,
                    })
                  }
                  className="btn btn-ghost w-full justify-between !px-5"
                >
                  <span className="flex items-center gap-2.5">
                    <iconify-icon icon={channel.icon} width="18"></iconify-icon>
                    {channel.label}
                  </span>
                  <iconify-icon icon="solar:arrow-right-up-linear" width="16"></iconify-icon>
                </button>
              ))
            ) : (
              <div className="pending !w-full !justify-center !py-4">
                <iconify-icon icon="solar:chat-round-line-linear" width="15"></iconify-icon>
                이 지점의 문의 채널 [지점 정보 입력]
              </div>
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
                className="btn btn-primary w-full"
              >
                <iconify-icon icon="solar:phone-linear" width="18"></iconify-icon>
                전화 문의 {GLOBAL_CONTACT.phone}
              </a>
            )}
          </div>

          <p className="mt-5 text-[12px] leading-relaxed text-mute-2">
            결제 방식과 세부 이용조건은 최종 정책 확정 후 안내드립니다.
          </p>
        </div>
      </div>
    </div>
  )
}
