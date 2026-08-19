import Reveal from './Reveal.jsx'
import StorePhoto from './StorePhoto.jsx'
import { SUBSCRIPTION_POINTS } from '../data/content.js'

/**
 * SECTION 03 — 구독제가 무엇인지
 * 지그재그: 좌측 실사진 / 우측 텍스트 + 3포인트 스택.
 * 해지 정책은 약관 확정 전이므로 '언제든/즉시 해지' 같은 표현을 쓰지 않는다.
 */
export default function WhatIsSubscription() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        {/* 좌측 — 실사진 */}
        <Reveal className="order-2 lg:order-1">
          <StorePhoto
            src="/images/gymflex-cityhall/02_weight_zone_machines.jpg"
            alt="짐플릭스 시청점 웨이트존"
            folder="public/images/gymflex-cityhall/"
            caption="짐플릭스 시청점 실사진"
            className="aspect-[4/5] w-full rounded-[26px]"
          />
        </Reveal>

        {/* 우측 — 카피 + 포인트 */}
        <div className="order-1 lg:order-2">
          <Reveal as="p" className="eyebrow mb-5">
            What is Subscription
          </Reveal>
          <Reveal
            as="h2"
            delay={70}
            className="font-black leading-[1.1] tracking-[-0.03em] text-fog"
            style={{ fontSize: 'clamp(30px, 6.6vw, 52px)' }}
          >
            헬스장도
            <br />한 달씩.
          </Reveal>
          <Reveal as="p" delay={140} className="mt-5 text-[15px] leading-relaxed text-mute md:text-base">
            매월 결제하고 이용하는
            <br />
            새로운 헬스장 이용방식.
          </Reveal>

          <div className="mt-10 flex flex-col gap-3">
            {SUBSCRIPTION_POINTS.map((point, i) => (
              <Reveal key={point.id} delay={210 + i * 80} className="bezel">
                <div className="bezel-inner flex items-center gap-4 px-5 py-4">
                  <span
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: 'rgba(224,86,42,0.12)',
                      color: 'var(--color-accent-soft)',
                    }}
                  >
                    <iconify-icon icon={point.icon} width="21"></iconify-icon>
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-fog">{point.title}</p>
                    <p className="mt-0.5 text-[13px] text-mute">{point.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
