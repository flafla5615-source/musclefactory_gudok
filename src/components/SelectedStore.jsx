import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { formatNumber } from '../lib/format.js'
import { BASE_MONTHLY_PRICE, ADD_ONS } from '../data/products.js'
import { monthlyPriceFor } from '../lib/format.js'
import { EVENTS, openChannel } from '../lib/tracking.js'

/** 가능/불가 여부(boolean)를 소비자 문구로. null 이면 행을 만들지 않는다. */
const yesNo = (v) => (v === true ? '가능' : v === false ? '미운영' : null)

/**
 * STEP 5 — 내가 고른 지점은 어떤 곳인데?
 *
 * 지점 카드에서 분리한 상세정보를 여기서만 보여준다.
 * ⚠ 값이 null 인 항목은 행 자체를 렌더링하지 않는다.
 *    '[지점 정보 입력]' 같은 개발용 문구를 소비자 화면에 노출하지 않는다.
 */
export default function SelectedStore({ store, onSubscribe }) {
  if (!store) {
    return (
      <Section id="selected-store" tone="ink-2">
        <Reveal className="card items-center !py-10 text-center">
          <p className="t-card text-fog">지점을 선택해주세요</p>
          <p className="mt-2 t-caption">선택하시면 이곳에 지점 정보가 표시됩니다.</p>
        </Reveal>
      </Section>
    )
  }

  const price = monthlyPriceFor(store, BASE_MONTHLY_PRICE)
  const addOnLabel = (id) => ADD_ONS.find((a) => a.id === id)

  // 값이 있는 행만 모은다
  const rows = [
    { label: '위치', value: store.address },
    { label: '운영시간', value: store.hours },
    { label: '주차', value: store.parking },
    { label: '연락처', value: store.phone, type: 'tel' },
    { label: '3개월 구독권', value: yesNo(store.threeMonthAvailable) },
    { label: '전지점 구독', value: yesNo(store.multiClubAvailable) },
    {
      label: '운동복',
      value:
        store.clothingAvailable === true
          ? `월 ${formatNumber(addOnLabel('wear').price)}원`
          : yesNo(store.clothingAvailable),
    },
    {
      label: '개인락커',
      value:
        store.lockerAvailable === true
          ? `월 ${formatNumber(addOnLabel('locker').price)}원`
          : yesNo(store.lockerAvailable),
    },
    {
      label: '주요 시설',
      value: store.facilities.length > 0 ? store.facilities.slice(0, 5).join(' · ') : null,
    },
  ].filter((r) => r.value)

  const channels = [
    store.links.naver && { key: 'naver', label: '네이버 플레이스', url: store.links.naver },
    store.links.instagram && { key: 'instagram', label: '인스타그램', url: store.links.instagram },
  ].filter(Boolean)

  return (
    <Section id="selected-store" tone="ink-2">
      <Reveal className="card">
        {/* 헤더 — 브랜드 / 지점명 / 월 구독가 */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="t-label" style={{ color: store.brand.color }}>
              {store.brand.key}
            </span>
            <h2 className="mt-1.5 text-[21px] font-bold leading-snug tracking-[-0.02em] text-fog">
              {store.name}
            </h2>
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="tnum text-[19px] font-bold" style={{ color: 'var(--color-accent-soft)' }}>
              월 {formatNumber(price)}원
            </span>
          </div>
        </div>

        {/* 상세정보 — 값이 있는 행만 */}
        {rows.length > 0 ? (
          <dl className="mt-6">
            {rows.map((row) => (
              <div key={row.label} className="inforow">
                <dt>{row.label}</dt>
                <dd>
                  {row.type === 'tel' ? (
                    <a href={`tel:${String(row.value).replace(/-/g, '')}`} className="hover:underline">
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-5 t-caption">지점 상세 정보는 순차적으로 공개됩니다.</p>
        )}

        {/* CTA */}
        <div className="card-foot flex flex-col gap-2.5">
          <button type="button" onClick={onSubscribe} className="btn btn-primary">
            {store.shortName} 구독하기
          </button>

          {channels.length > 0 && (
            <div className={`grid gap-2.5 ${channels.length > 1 ? 'grid-cols-2' : ''}`}>
              {channels.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() =>
                    openChannel(c.url, EVENTS.CONSULTATION_CLICK, {
                      store_id: store.id,
                      channel: c.key,
                    })
                  }
                  className="btn btn-line"
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  )
}
