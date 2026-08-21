import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import StoreUsageGuide from './StoreUsageGuide.jsx'
import { formatNumber, monthlyPriceFor } from '../lib/format.js'
import { BASE_MONTHLY_PRICE, ADD_ONS } from '../data/products.js'
import { MAX_FACILITY_CHIPS } from '../data/stores.js'
import { EVENTS, openChannel, track } from '../lib/tracking.js'

/** 가능/불가 여부(boolean)를 소비자 문구로. null 이면 행을 만들지 않는다. */
const yesNo = (v) => (v === true ? '가능' : v === false ? '미운영' : null)

/**
 * STEP 5 — 내가 고른 지점은 어떤 곳인데?
 *
 * 표시 우선순위
 *   지점명 → 월 구독가격 → 주소 → 운영시간 → 주차 → 전화
 *   → 주요시설 → 옵션 → CTA
 *
 * ⚠ 값이 null 인 항목은 행 자체를 렌더링하지 않는다.
 *    '[정보 입력]' 같은 개발용 문구를 소비자 화면에 노출하지 않는다.
 * ⚠ 시설은 긴 문장으로 나열하지 않고 최대 6개 chip 으로만 보여준다.
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
  const addOn = (id) => ADD_ONS.find((a) => a.id === id)

  // 값이 있는 행만 (우선순위 순서 그대로)
  const infoRows = [
    { label: '주소', value: store.address },
    { label: '운영시간', value: store.hours },
    { label: '주차', value: store.parking },
    { label: '상담문의', value: store.phone, type: 'tel' },
  ].filter((r) => r.value)

  const optionRows = [
    { label: '3개월 구독권', value: yesNo(store.threeMonthAvailable) },
    { label: '전지점 구독', value: yesNo(store.multiClubAvailable) },
    {
      label: '운동복',
      value:
        store.clothingAvailable === true
          ? `월 ${formatNumber(addOn('wear').price)}원`
          : yesNo(store.clothingAvailable),
    },
    {
      label: '개인락커',
      value:
        store.lockerAvailable === true
          ? `월 ${formatNumber(addOn('locker').price)}원`
          : yesNo(store.lockerAvailable),
    },
  ].filter((r) => r.value)

  const facilities = store.facilities.slice(0, MAX_FACILITY_CHIPS)
  const hasAnyDetail =
    infoRows.length > 0 || facilities.length > 0 || store.floors.length > 0 || optionRows.length > 0

  const channels = [
    store.mapUrl && { key: 'map', label: '길찾기', url: store.mapUrl },
    store.links.naver && { key: 'naver', label: '네이버 플레이스', url: store.links.naver },
    store.links.instagram && { key: 'instagram', label: '인스타그램', url: store.links.instagram },
  ].filter(Boolean)

  return (
    <Section id="selected-store" tone="ink-2">
      <Reveal className="card">
        {/* 지점명 + 월 구독가격 */}
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

        {store.description && <p className="mt-3 t-body">{store.description}</p>}

        {hasAnyDetail ? (
          <>
            {infoRows.length > 0 && (
              <dl className="mt-6">
                {infoRows.map((row) => (
                  <div key={row.label} className="inforow">
                    <dt>{row.label}</dt>
                    <dd>
                      {row.type === 'tel' ? (
                        <a
                          href={`tel:${String(row.value).replace(/-/g, '')}`}
                          className="hover:underline"
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {/* 주요시설 — 짧은 chip 으로만 */}
            {facilities.length > 0 && (
              <div className="inforow flex-col !gap-2.5">
                <dt className="!flex-none text-[13px] text-mute-2">주요시설</dt>
                <dd className="!flex-none">
                  <ul className="flex flex-wrap gap-1.5">
                    {facilities.map((f) => (
                      <li key={f} className="chip chip-quiet">
                        {f}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}

            {/* 층별 안내 */}
            {store.floors.length > 0 && (
              <dl>
                {store.floors.map((f) => (
                  <div key={f.label} className="inforow">
                    <dt className="tnum">{f.label}</dt>
                    <dd className="!text-[13.5px] !text-mute">{f.detail}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* 구독 옵션 가능 여부 */}
            {optionRows.length > 0 && (
              <dl>
                {optionRows.map((row) => (
                  <div key={row.label} className="inforow">
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </>
        ) : (
          <p className="mt-5 t-caption">지점 상세 정보는 순차적으로 공개됩니다.</p>
        )}

        {/* CTA */}
        <div className="card-foot flex flex-col gap-2.5">
          <button type="button" onClick={onSubscribe} className="btn btn-primary">
            {store.shortName} 시작하기
          </button>

          {/* 전화 상담 — 번호가 있는 지점만. 모바일에서 바로 연결된다. */}
          {store.phone && (
            <a
              href={`tel:${store.phone.replace(/-/g, '')}`}
              onClick={() =>
                track(EVENTS.CONSULTATION_CLICK, { store_id: store.id, channel: 'phone' })
              }
              className="btn btn-line"
            >
              전화 상담하기
            </a>
          )}

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

      {/* 지점 상세 바로 아래 — 이 지점 GYM PASS 이용방법 */}
      <Reveal delay={80}>
        <StoreUsageGuide store={store} />
      </Reveal>
    </Section>
  )
}
