import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { MEMBER_INTERVIEW as I } from '../data/content.js'

/**
 * 실제 회원 인터뷰
 *
 * ⚠ 실제 답변이 확보되기 전에는 후기 문구를 임의로 만들지 않는다.
 *    videoSrc 가 null 이면 가짜 영상·스톡 영상·AI 회원 영상을 쓰지 않고
 *    깔끔한 placeholder 만 보여준다.
 *    quote 도 null 이면 렌더링하지 않는다.
 *
 * 영상이 준비되면 content.js 의 MEMBER_INTERVIEW 값만 채우면 된다.
 */
export default function MemberInterview() {
  const hasVideo = Boolean(I.videoSrc)

  return (
    <Section tone="ink-2">
      <Reveal as="p" className="t-label" style={{ color: 'var(--color-accent-soft)' }}>
        Real Member Story
      </Reveal>

      <Reveal as="h2" delay={70} className="mt-4 t-section text-fog">
        일단 한 달 해보셨는데,
        <br />
        어떠셨어요?
      </Reveal>

      <Reveal as="p" delay={140} className="mt-3 t-body">
        실제 GYM PASS 이용회원에게 물어봤습니다.
      </Reveal>

      <div className="section-body">
        <Reveal>
          {hasVideo ? (
            <figure>
              <div className="media !aspect-video">
                <video
                  src={I.videoSrc}
                  poster={I.thumbnail || undefined}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[13px] font-semibold text-fog">{I.memberLabel}</span>
                {I.storeName && <span className="t-caption">{I.storeName}</span>}
                {I.duration && <span className="t-caption">{I.duration}</span>}
              </figcaption>
            </figure>
          ) : (
            <div className="card items-center !py-14 text-center">
              <span className="text-mute-2">
                <iconify-icon icon="solar:videocamera-record-linear" width="26"></iconify-icon>
              </span>
              <p className="mt-3 text-[14px] font-semibold text-fog">인터뷰 영상 준비 중</p>
              <p className="mt-1.5 t-caption">실제 이용회원 인터뷰를 촬영해 공개할 예정입니다.</p>
            </div>
          )}
        </Reveal>

        {/* 실제 인용문이 확보됐을 때만 노출 */}
        {I.quote && (
          <Reveal delay={80} className="mt-4">
            <blockquote className="card">
              <p className="text-[15px] leading-relaxed text-fog">{I.quote}</p>
              <footer className="mt-3 t-caption">{I.memberLabel}</footer>
            </blockquote>
          </Reveal>
        )}

        {/* 인터뷰에서 다룰 질문 — 답변이 아니라 질문 목록이다 */}
        {!hasVideo && I.questions.length > 0 && (
          <Reveal delay={120} className="mt-4">
            <div className="card">
              <p className="text-[13px] text-mute-2">인터뷰에서 다룰 이야기</p>
              <ul className="mt-3 flex flex-col gap-0">
                {I.questions.map((q) => (
                  <li
                    key={q}
                    className="border-t py-2.5 text-[13.5px] leading-relaxed text-mute first:border-t-0 first:pt-0"
                    style={{ borderColor: 'var(--color-line)' }}
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  )
}
