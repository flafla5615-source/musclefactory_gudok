import Reveal from './Reveal.jsx'
import { formatNumber } from '../lib/format.js'

/**
 * HERO
 *
 * 첫 화면 3초 안에 이 세 가지만 읽혀야 한다.
 *   GYM PASS / 일단 한 달. / 월 48,900원
 * 지점목록 · 옵션 · 3개월 · 12개월 상품을 여기에 넣지 않는다.
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
            {/* 서비스명 */}
            <Reveal as="p" className="t-label" style={{ color: 'var(--color-accent-soft)' }}>
              GYM PASS
            </Reveal>

            {/* 캠페인 메시지 */}
            <Reveal as="h1" delay={70} className="mt-5 t-hero text-fog">
              일단 한 달.
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
              1년을 먼저 결정하지 않아도
              <br />
              운동은 시작할 수 있으니까.
            </Reveal>

            <Reveal delay={260} className="mt-9 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={onSubscribe}
                className="btn btn-primary sm:btn-auto sm:!px-7"
              >
                내 지점 선택하기
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
