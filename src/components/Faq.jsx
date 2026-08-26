import { useMemo, useState } from 'react'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { FAQS, FAQ_CATEGORIES } from '../data/content.js'
import { TERMS_URL } from '../data/legal.js'
import { EVENTS, openChannel } from '../lib/tracking.js'

/**
 * FAQ — 카테고리 필터 + 아코디언
 *
 * 처음부터 약관 전문처럼 보이면 안 된다. 기본은 전부 접혀 있고,
 * 가입 전 가장 많이 오해하는 4개(top)를 맨 위로 올린다.
 * 환불기준처럼 구간이 나뉘는 답변은 표(table)로 나눠 보여준다.
 *
 * ⚠ 답변 문구는 data/content.js 에서만 관리한다. 약관을 임의 해석하지 않는다.
 */
export default function Faq() {
  const [category, setCategory] = useState('all')
  const [openId, setOpenId] = useState(null)

  const list = useMemo(() => {
    const filtered = category === 'all' ? FAQS : FAQS.filter((f) => f.category === category)
    // 오해하기 쉬운 항목을 먼저
    return [...filtered].sort((a, b) => Number(Boolean(b.top)) - Number(Boolean(a.top)))
  }, [category])

  return (
    <Section id="faq" title="궁금한 점">
      {/* 카테고리 — 모바일에서 가로 스크롤 */}
      <Reveal className="rail pb-1">
        {FAQ_CATEGORIES.map((c) => {
          const active = c.id === category
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCategory(c.id)
                setOpenId(null)
              }}
              className="rounded-full px-4 py-2.5 text-[13.5px] font-semibold transition-colors duration-300"
              style={{
                background: active ? 'var(--color-accent)' : 'rgba(255,255,255,0.045)',
                color: active ? '#fff' : 'var(--color-mute)',
                border: active ? '1px solid transparent' : '1px solid var(--color-line)',
              }}
            >
              {c.label}
            </button>
          )
        })}
      </Reveal>

      <div className="mt-5 flex flex-col gap-2">
        {list.map((faq, i) => {
          const open = openId === faq.id
          return (
            <Reveal key={faq.id} delay={i * 25}>
              <div
                className="overflow-hidden rounded-[14px] border transition-colors duration-300"
                style={{
                  borderColor: open ? 'var(--color-line-2)' : 'var(--color-line)',
                  background: 'var(--color-surface)',
                }}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : faq.id)}
                    aria-expanded={open}
                    aria-controls={`faq-${faq.id}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    style={{ minHeight: '56px' }}
                  >
                    <span className="text-[14.5px] font-semibold leading-snug text-fog">
                      {faq.question}
                    </span>
                    <iconify-icon
                      icon="solar:alt-arrow-down-linear"
                      width="16"
                      style={{
                        color: 'var(--color-mute)',
                        flexShrink: 0,
                        transform: open ? 'rotate(180deg)' : 'none',
                        transition: 'transform .4s var(--ease-spring)',
                      }}
                    ></iconify-icon>
                  </button>
                </h3>

                <div id={`faq-${faq.id}`} hidden={!open} className="px-5 pb-5">
                  {faq.answer && (
                    <p className="text-[13.5px] leading-[1.75] text-mute">{faq.answer}</p>
                  )}

                  {/* 구간별 안내 (환불기준 등) */}
                  {faq.table && (
                    <dl className="mt-3">
                      {faq.table.map((row) => (
                        <div key={row.label} className="inforow flex-col !gap-1">
                          <dt className="!flex-none text-[12.5px] text-mute-2">{row.label}</dt>
                          <dd className="!flex-none text-[13.5px] font-semibold leading-snug text-fog">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {faq.notes &&
                    faq.notes.map((n) => (
                      <p key={n} className="mt-3 t-caption">
                        {n}
                      </p>
                    ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* 약관 전문 — FAQ 는 약관을 대체하지 않는다.
          URL 이 확정되면 data/legal.js 의 TERMS_URL 만 채우면 버튼이 노출된다. */}
      <Reveal delay={80} className="mt-6">
        {TERMS_URL ? (
          <button
            type="button"
            onClick={() => openChannel(TERMS_URL, EVENTS.CONSULTATION_CLICK, { channel: 'terms' })}
            className="btn btn-line"
          >
            구독 이용약관 전체보기
          </button>
        ) : (
          <p className="t-caption">
            위 내용은 이용약관의 주요 사항을 안내한 것입니다. 이용약관 전문은 별도로 안내드립니다.
          </p>
        )}
      </Reveal>
    </Section>
  )
}
