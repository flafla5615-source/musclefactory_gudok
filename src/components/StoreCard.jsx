import { formatNumber } from '../lib/format.js'

/**
 * 지점 카드 — 5개 카드가 완전히 같은 규격을 쓴다.
 *
 * 카드에 넣는 정보는 다섯 가지뿐이다.
 *   01 브랜드  02 지점명  03 월 구독가격  04 상태  05 선택 CTA
 * 주소·운영시간·주차·전화 등 상세정보는 카드에 넣지 않고
 * 선택 후 아래 SELECTED CLUB 영역에서 보여준다.
 *
 * 썸네일 비율과 텍스트 영역 높이를 고정해서,
 * 지점명이 길거나 가격이 달라도 카드 크기가 흔들리지 않는다.
 * 선택 상태는 테두리·체크로만 표시해 layout shift 를 만들지 않는다.
 */
export default function StoreCard({ store, price, selected, onSelect }) {
  const thumb = store.heroImage || null

  return (
    <button
      type="button"
      onClick={() => onSelect(store)}
      aria-pressed={selected}
      /* w-full 필수 — button 은 기본이 내용 폭이라, 없으면 지점명이 긴 카드만 넓어진다 */
      className={`card w-full !p-3 text-left ${selected ? 'card-selected' : ''}`}
      style={{ minHeight: '108px' }}
    >
      <div className="flex items-center gap-3.5">
        {/* 썸네일 — 비율·크기 고정 */}
        <div
          className="media !aspect-auto !h-[84px] !w-[84px] flex-shrink-0 !rounded-[10px]"
          aria-hidden={!thumb}
        >
          {thumb ? (
            <img src={thumb} alt={`${store.name} 센터 사진`} loading="lazy" decoding="async" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-mute-2">
              <iconify-icon icon="solar:gallery-linear" width="20"></iconify-icon>
            </span>
          )}
        </div>

        {/* 텍스트 — 높이 고정 */}
        <div className="flex min-w-0 flex-1 flex-col justify-center" style={{ minHeight: '84px' }}>
          <span className="t-label" style={{ color: store.brand.color }}>
            {store.brand.key}
          </span>

          <h3
            className="mt-1 text-[15px] font-bold leading-snug text-fog"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '40px',
            }}
          >
            {store.name}
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <span className="tnum text-[13.5px] font-semibold text-mute">
              월 {formatNumber(price)}원
            </span>
            <span className="chip chip-quiet !h-[19px] !px-2 !text-[10.5px]">구독 운영 지점</span>
          </div>
        </div>

        {/* 선택 표시 — 자리를 항상 차지해 크기가 변하지 않는다 */}
        <span
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300"
          style={{
            background: selected ? 'var(--color-accent)' : 'transparent',
            border: selected ? '1px solid transparent' : '1px solid var(--color-line-2)',
            color: selected ? '#fff' : 'var(--color-mute-2)',
          }}
        >
          <iconify-icon
            icon={selected ? 'solar:check-read-linear' : 'solar:alt-arrow-right-linear'}
            width="15"
          ></iconify-icon>
        </span>
      </div>
    </button>
  )
}
