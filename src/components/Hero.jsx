import Reveal from './Reveal.jsx'
import { formatNumber } from '../lib/format.js'

/**
 * HERO
 *
 * 첫 화면에서 스크롤 없이 이 네 가지가 읽혀야 한다.
 *   ① GYM PASS 가 무엇인지
 *   ② 올드짐 + 머슬팩토리24 의 월 구독 서비스라는 것
 *   ③ 장기 회원권이 아니라 한 달 단위라는 것
 *   ④ 월 48,900원부터
 *
 * 시각 위계(의도적으로 이 순서로 읽히게 한다)
 *   1. 메인 카피  2. 월 48,900원부터  3. GYM PASS  4. OLDGYM × MUSCLE FACTORY24
 *
 * 지점목록 · 옵션 · 3개월 · 12개월 상품을 여기에 넣지 않는다.
 *
 * ⚠ 배경은 실제 지점 사진 2장(브랜드당 1장)이다.
 *    crop(object-fit: cover) 과 dark overlay 외의 가공을 하지 않는다.
 *    두 사진을 합성해 하나의 공간처럼 보이게 만들지 않는다 —
 *    가운데 seam 그라디언트는 경계를 부드럽게 할 뿐 공간을 잇지 않는다.
 *    배경 사진 교체 시 index.html 의 preload 경로도 함께 수정한다.
 */
const BRAND_SHOTS = {
  // 왼쪽(데스크톱) / 위쪽(모바일)
  oldgym: {
    src: '/images/oldgym-pyeonggeo/04.jpg',
    credit: 'OLDGYM 평거점',
  },
  // 오른쪽(데스크톱) / 아래쪽(모바일)
  muscleFactory: {
    src: '/images/mf-sinjinju/sinjinju-09.jpg',
    credit: 'MUSCLE FACTORY 24 신진주역점',
  },
}

const INK = '13,13,13'

export default function Hero({ basePrice, onSubscribe, onViewUsage }) {
  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden bg-ink">
      {/* ── 배경: 두 브랜드 실사 ─────────────────────────────
          모바일 상/하 45:55, 데스크톱 좌/우 50:50 */}
      <div className="absolute inset-0 flex flex-col lg:flex-row">
        <div className="relative h-[45%] w-full lg:h-full lg:w-1/2">
          <img
            src={BRAND_SHOTS.oldgym.src}
            alt=""
            aria-hidden="true"
            fetchpriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative h-[55%] w-full lg:h-full lg:w-1/2">
          <img
            src={BRAND_SHOTS.muscleFactory.src}
            alt=""
            aria-hidden="true"
            fetchpriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* seam — 콜라주처럼 딱 잘려 보이지 않게 경계만 어둡게 눌러준다 */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[45%] h-36 -translate-y-1/2 lg:hidden"
        style={{
          background: `linear-gradient(180deg, rgba(${INK},0) 0%, rgba(${INK},0.92) 50%, rgba(${INK},0) 100%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 hidden w-56 -translate-x-1/2 lg:block"
        style={{
          background: `linear-gradient(90deg, rgba(${INK},0) 0%, rgba(${INK},0.94) 50%, rgba(${INK},0) 100%)`,
        }}
      />

      {/* 가독성 확보용 다크 오버레이
          모바일: 카피가 아래쪽에 있으므로 세로 그라디언트 하나로 충분하다.
          데스크톱: 카피가 왼쪽에 있으므로 왼쪽만 눌러 오른쪽(머슬팩토리24) 사진이
                    실제로 보이게 한다. 두 브랜드가 모두 보여야 하는 것이 이번 수정의 핵심. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 lg:hidden"
        style={{
          background: `linear-gradient(180deg, rgba(${INK},0.86) 0%, rgba(${INK},0.58) 30%, rgba(${INK},0.82) 66%, rgba(${INK},0.97) 100%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          background: `linear-gradient(180deg, rgba(${INK},0.52) 0%, rgba(${INK},0.04) 24%, rgba(${INK},0.04) 70%, rgba(${INK},0.62) 100%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          background: `linear-gradient(90deg, rgba(${INK},0.8) 0%, rgba(${INK},0.74) 42%, rgba(${INK},0.62) 58%, rgba(${INK},0.3) 78%, rgba(${INK},0.2) 100%)`,
        }}
      />

      {/* 어느 쪽이 어느 브랜드 사진인지 — 데스크톱에서만 (모바일은 가독성 우선) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden lg:block"
      >
        <div className="wrap lg:!max-w-[1080px]">
          <div className="flex items-center justify-between text-[10.5px] font-semibold uppercase tracking-[0.14em] text-mute-2">
            <span>{BRAND_SHOTS.oldgym.credit}</span>
            <span>{BRAND_SHOTS.muscleFactory.credit}</span>
          </div>
        </div>
      </div>

      {/* ── 콘텐츠 ───────────────────────────────────────── */}
      <div className="relative flex min-h-[100dvh] flex-col justify-end pb-20 pt-28 lg:justify-center lg:pb-24">
        <div className="wrap lg:!max-w-[1080px]">
          <div className="lg:max-w-2xl">
            {/* 서비스명 + 운영 브랜드 — GYM PASS 가 무엇인지 먼저 밝힌다 */}
            <Reveal>
              <p
                className="font-display text-[15px] font-bold leading-none tracking-[0.16em] sm:text-[17px]"
                style={{ color: 'var(--color-accent-soft)' }}
              >
                GYM PASS
              </p>
              <p
                className="mt-2.5 font-display text-[11px] font-semibold leading-none tracking-[0.14em] sm:text-[12px]"
                style={{ color: 'rgba(244,244,244,0.6)' }}
              >
                OLDGYM <span style={{ color: 'rgba(244,244,244,0.34)' }}>×</span> MUSCLE FACTORY24
              </p>
            </Reveal>

            {/* 메인 카피 — 하나의 질문으로 읽혀야 한다.
                문장이 기존보다 길어 t-hero 보다 한 단계 낮춘 크기를 쓴다. */}
            <Reveal
              as="h1"
              delay={70}
              className="mt-6 text-fog"
              style={{
                fontSize: 'clamp(29px, 7.8vw, 56px)',
                fontWeight: 800,
                lineHeight: 1.13,
                letterSpacing: '-0.035em',
              }}
            >
              넷플릭스도 한 달인데,
              <br />왜 헬스장은 1년일까요?
            </Reveal>

            <Reveal as="p" delay={140} className="mt-5 t-body">
              그래서 바꿨습니다.
              <br />
              올드짐과 머슬팩토리24,
              <br />
              이제 한 달부터.
            </Reveal>

            <Reveal
              as="p"
              delay={200}
              className="mt-6 t-hero-price"
              style={{
                color: 'var(--color-accent-soft)',
                // 메인 카피보다 항상 한 단계 작게 — 위계 1순위는 카피, 2순위가 가격
                fontSize: 'clamp(25px, 6.5vw, 44px)',
              }}
            >
              월 {formatNumber(basePrice)}원부터
            </Reveal>

            {/* 1회성 한 달 이용권으로 오해되지 않게 정기결제 상품임을 명시 */}
            <Reveal as="p" delay={230} className="mt-2 t-caption">
              월 정기결제 상품
            </Reveal>

            {/* ⚠ 구독상품에는 이용 일시정지 제도가 없다. '정지' 표현을 쓰지 않는다. */}
            <Reveal delay={250} className="mt-4 flex flex-wrap gap-1.5">
              {['장기 회원권 없이', '매월 정기결제', '구독 해지 가능'].map((t) => (
                <span key={t} className="chip chip-quiet">
                  {t}
                </span>
              ))}
            </Reveal>

            <Reveal delay={300} className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={onSubscribe}
                className="btn btn-primary sm:btn-auto sm:!px-7"
              >
                내 주변 지점 보기
              </button>
              <button
                type="button"
                onClick={onViewUsage}
                className="btn btn-line sm:btn-auto sm:!px-7"
              >
                이용방법 보기
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
