import Reveal from './Reveal.jsx'
import StorePhoto from './StorePhoto.jsx'
import { formatNumber } from '../lib/format.js'

/** FINAL CTA — 풀블리드 밴드. 마지막까지 메시지는 '월 48,900원부터'. */
export default function FinalCta({ price, selectedStore, onSubscribe, onConsult }) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <StorePhoto
          src="/images/gymflex-cityhall/03_freeweight_dumbbell_zone.jpg"
          alt="짐플릭스 시청점 프리웨이트존"
          folder="public/images/gymflex-cityhall/"
          className="h-full w-full"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,13,13,0.94) 0%, rgba(13,13,13,0.8) 50%, rgba(13,13,13,0.97) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
        <div className="max-w-2xl">
          <Reveal as="p" className="eyebrow mb-5">
            Start now
          </Reveal>
          <Reveal
            as="h2"
            delay={70}
            className="font-black leading-[1.08] tracking-[-0.03em] text-fog"
            style={{ fontSize: 'clamp(32px, 7.6vw, 60px)' }}
          >
            이제 헬스도
            <br />
            구독으로 시작하세요.
          </Reveal>

          <Reveal delay={140} className="mt-6">
            <span className="tnum text-[18px] font-bold text-mute md:text-[20px]">
              월 {formatNumber(price)}원부터
            </span>
            {selectedStore && (
              <span className="ml-2 text-[14px] text-mute-2">· {selectedStore.storeName} 기준</span>
            )}
          </Reveal>

          <Reveal delay={210} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onSubscribe} className="btn btn-primary w-full sm:w-auto">
              내 지점 선택하기
              <span className="btn-orb">
                <iconify-icon icon="solar:arrow-right-linear" width="15"></iconify-icon>
              </span>
            </button>
            <button type="button" onClick={onConsult} className="btn btn-ghost w-full sm:w-auto">
              구독 상담하기
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
