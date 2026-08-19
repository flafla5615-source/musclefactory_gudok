import Reveal from './Reveal.jsx'
import StorePhoto from './StorePhoto.jsx'
import { formatNumber } from '../lib/format.js'

/**
 * HERO — 스플릿 레이아웃.
 * 5초 안에 '헬스 구독제 + 월 48,900원' 두 가지가 읽히는 것이 유일한 목표.
 * 배경 사진은 실제 센터사진(짐플릭스 시청점)이며 교체는 heroImage 한 줄로 끝난다.
 */
const HERO_IMAGE = '/images/gymflex-cityhall/04_center_overview.jpg'

export default function Hero({ basePrice, onSubscribe, onViewProducts }) {
  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden bg-ink">
      {/* 배경 — 모바일은 전면, 데스크톱은 우측 60% */}
      <div className="absolute inset-0 lg:left-[42%]">
        <StorePhoto
          src={HERO_IMAGE}
          alt="짐플릭스 시청점 센터 전경"
          folder="public/images/gymflex-cityhall/"
          className="h-full w-full"
          eager
        />
        {/* 가독성 오버레이 — 모바일 세로 그라디언트 / 데스크톱 가로 그라디언트 */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.62) 42%, rgba(13,13,13,0.95) 100%)',
          }}
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              'linear-gradient(90deg, #0d0d0d 0%, rgba(13,13,13,0.78) 30%, rgba(13,13,13,0.25) 100%)',
          }}
        />
      </div>

      {/* 앰비언트 워머 — 액센트를 아주 옅게 한 겹 */}
      <div
        className="ambient pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full opacity-[0.18] blur-[90px]"
        style={{ background: 'var(--color-accent)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-end px-5 pb-28 pt-28 md:px-8 lg:justify-center lg:pb-20">
        <div className="max-w-xl">
          <Reveal as="p" className="eyebrow mb-5">
            Monthly Membership
          </Reveal>

          <Reveal
            as="h1"
            delay={80}
            className="font-black leading-[1.06] tracking-[-0.035em] text-fog"
            style={{ fontSize: 'clamp(40px, 10.5vw, 76px)' }}
          >
            헬스도 이제
            <br />
            구독하세요.
          </Reveal>

          <Reveal delay={170} className="mt-6 flex items-end gap-2">
            <span
              className="tnum font-black leading-none tracking-[-0.03em]"
              style={{ fontSize: 'clamp(34px, 8.6vw, 60px)', color: 'var(--color-accent-soft)' }}
            >
              월 {formatNumber(basePrice)}원
            </span>
          </Reveal>

          <Reveal
            as="p"
            delay={240}
            className="mt-6 text-[15px] leading-relaxed text-mute md:text-[17px]"
          >
            장기등록 부담 없이
            <br />
            매월 이용하는 헬스장.
          </Reveal>

          <Reveal delay={310} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onSubscribe} className="btn btn-primary w-full sm:w-auto">
              내 지점 구독 시작하기
              <span className="btn-orb">
                <iconify-icon icon="solar:arrow-right-linear" width="15"></iconify-icon>
              </span>
            </button>
            <button
              type="button"
              onClick={onViewProducts}
              className="btn btn-ghost w-full sm:w-auto"
            >
              구독 상품 보기
            </button>
          </Reveal>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 lg:flex">
        <span className="font-display text-[10px] tracking-[0.22em] text-mute-2">SCROLL</span>
        <span className="ambient text-mute-2">
          <iconify-icon icon="solar:alt-arrow-down-linear" width="18"></iconify-icon>
        </span>
      </div>
    </section>
  )
}
