import Reveal from './Reveal.jsx'
import { formatNumber } from '../lib/format.js'

/**
 * STEP 1+2 — 이게 뭔데? / 얼마인데?
 *
 * 첫 화면에서 전달할 것은 하나뿐이다.
 *   "헬스도 월 48,900원으로 구독할 수 있다."
 * 지점목록 · 옵션 · 여러 가격 · 긴 설명을 넣지 않는다.
 *
 * 배경 사진 교체는 HERO_IMAGE 한 줄이면 된다.
 * (index.html 의 preload 경로도 함께 수정)
 */
const HERO_IMAGE = '/images/gymflex-cityhall/hero.jpg'

export default function Hero({ basePrice, onSubscribe, onViewProducts }) {
  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.62) 40%, rgba(13,13,13,0.96) 100%)',
          }}
        />
      </div>

      <div className="relative flex min-h-[100dvh] flex-col justify-end pb-24 pt-28 lg:justify-center lg:pb-20">
        <div className="wrap lg:!max-w-[1080px]">
          <div className="lg:max-w-xl">
            <Reveal as="p" className="t-label" style={{ color: 'var(--color-accent-soft)' }}>
              Monthly Membership
            </Reveal>

            <Reveal as="h1" delay={70} className="mt-5 t-hero text-fog">
              헬스도 이제
              <br />
              구독하세요.
            </Reveal>

            <Reveal
              as="p"
              delay={140}
              className="mt-5 t-hero-price"
              style={{ color: 'var(--color-accent-soft)' }}
            >
              월 {formatNumber(basePrice)}원
            </Reveal>

            <Reveal as="p" delay={200} className="mt-5 t-body">
              장기등록 부담 없이
              <br />
              매월 이용.
            </Reveal>

            <Reveal delay={260} className="mt-9 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={onSubscribe}
                className="btn btn-primary sm:btn-auto sm:!px-7"
              >
                내 지점 구독 시작하기
              </button>
              <button
                type="button"
                onClick={onViewProducts}
                className="btn btn-line sm:btn-auto sm:!px-7"
              >
                구독 상품 보기
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
