import { useState } from 'react'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { FAQS } from '../data/content.js'

/** FAQ — 아코디언. 최종 약관 확정 전 항목은 검토 중임을 그대로 밝힌다. */
export default function Faq() {
  const [openId, setOpenId] = useState(null)

  return (
    <Section id="faq" title="궁금한 점">
      <div className="flex flex-col gap-2">
        {FAQS.map((faq, i) => {
          const open = openId === faq.id
          return (
            <Reveal key={faq.id} delay={i * 35}>
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
                  <p className="text-[13.5px] leading-[1.75] text-mute">{faq.answer}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
