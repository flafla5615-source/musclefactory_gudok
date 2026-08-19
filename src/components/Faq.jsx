import { useState } from 'react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { FAQS } from '../data/content.js'

/** FAQ 아코디언 — 접근성 위해 button + aria-expanded 로 구성 */
export default function Faq() {
  const [openId, setOpenId] = useState(FAQS[0]?.id ?? null)

  return (
    <section id="faq" className="bg-ink-2 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                궁금한 점,
                <br />
                먼저 정리했습니다.
              </>
            }
            description="최종 약관이 확정되지 않은 항목은 현재 검토 중인 내용임을 그대로 밝혀 두었습니다."
          />
        </div>

        <div className="flex flex-col gap-2.5 lg:col-span-8">
          {FAQS.map((faq, i) => {
            const open = openId === faq.id
            return (
              <Reveal key={faq.id} delay={i * 45}>
                <div
                  className="overflow-hidden rounded-[18px] border transition-colors duration-500"
                  style={{
                    borderColor: open ? 'rgba(224,86,42,0.3)' : 'rgba(255,255,255,0.08)',
                    background: open ? 'var(--color-surface-2)' : 'var(--color-surface)',
                  }}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : faq.id)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${faq.id}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left md:px-6"
                    >
                      <span className="text-[14.5px] font-semibold leading-snug text-fog md:text-[15.5px]">
                        {faq.question}
                      </span>
                      <span
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-500"
                        style={{
                          transitionTimingFunction: 'var(--ease-spring)',
                          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                          background: open ? 'var(--color-accent)' : 'rgba(255,255,255,0.06)',
                          color: open ? '#fff' : 'var(--color-mute)',
                        }}
                      >
                        <iconify-icon icon="solar:alt-arrow-down-linear" width="14"></iconify-icon>
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${faq.id}`}
                    hidden={!open}
                    className="px-5 pb-5 md:px-6 md:pb-6"
                  >
                    <p className="text-[13.5px] leading-[1.8] text-mute md:text-[14.5px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
