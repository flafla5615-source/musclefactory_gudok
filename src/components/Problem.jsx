import Reveal from './Reveal.jsx'

/**
 * SECTION 02 — PROBLEM
 * 라이트(웜 페이퍼) 섹션으로 톤을 한 번 끊어 준다.
 * 기존 장기회원권 이용자를 비꼬지 않고, 이용방식의 전환만 이야기한다.
 */
export default function Problem() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal as="p" className="eyebrow eyebrow-mute mb-5">
            Why Subscription
          </Reveal>
          <Reveal
            as="h2"
            delay={70}
            className="font-black leading-[1.1] tracking-[-0.03em] text-ink"
            style={{ fontSize: 'clamp(32px, 7.4vw, 60px)' }}
          >
            1년 끊고,
            <br />
            3개월 다니셨죠?
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pt-20">
          <Reveal
            as="p"
            delay={140}
            className="text-[16px] leading-[1.85] text-ink/70 md:text-[17px]"
          >
            처음부터 긴 기간을 결정하고
            <br />
            큰 금액을 한 번에 결제하던 헬스장 등록.
          </Reveal>
          <Reveal
            as="p"
            delay={210}
            className="mt-5 text-[16px] font-semibold leading-[1.85] text-ink md:text-[17px]"
          >
            이제 이용방식을 바꿉니다.
          </Reveal>

          <Reveal delay={280} className="mt-9 flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: 'var(--color-accent)', color: '#fff' }}
            >
              <iconify-icon icon="solar:arrow-down-linear" width="17"></iconify-icon>
            </span>
            <span className="text-[14px] font-medium text-ink/50">
              그래서 구독제를 시작합니다
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
