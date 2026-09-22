import Footer from '../Footer.jsx'
import { SUPPORT_LINKS } from '../../data/support.js'

/* ══════════════════════════════════════════════════════════════
   지원문서 공통 레이아웃
   ──────────────────────────────────────────────────────────────
   /support · /terms · /privacy · /account-deletion · /subscription-cancel
   다섯 페이지가 같은 헤더 · 제목 · 본문 · 관련 메뉴 · 홈 버튼 · Footer 를 쓴다.

   메인 랜딩과 같은 브랜드로 보이되(같은 배경·서체·컬러 토큰),
   화려한 마케팅 연출 대신 공식 문서의 가독성을 우선한다.
     · 본문 15.5px / 행간 1.8 — 390px 에서도 작지 않게
     · 링크·버튼 터치영역 최소 44px
     · reveal 애니메이션을 쓰지 않는다 (법률 문서는 바로 읽혀야 한다)
   ══════════════════════════════════════════════════════════════ */

/** 상단 브랜드 헤더 — 메인 랜딩으로 돌아가는 링크를 겸한다 */
function DocHeader() {
  return (
    <header
      className="border-b bg-ink"
      style={{ borderColor: 'var(--color-line)' }}
    >
      <div className="wrap flex items-center justify-between gap-4 py-4">
        <a href="/" className="flex min-h-[44px] flex-col justify-center">
          <span
            className="font-display text-[15px] font-bold leading-none tracking-[0.16em]"
            style={{ color: 'var(--color-accent-soft)' }}
          >
            GYM PASS
          </span>
          <span
            className="mt-1.5 font-display text-[9.5px] font-semibold leading-none tracking-[0.14em]"
            style={{ color: 'rgba(244,244,244,0.5)' }}
          >
            OLDGYM <span style={{ color: 'rgba(244,244,244,0.3)' }}>×</span> MUSCLE FACTORY24
          </span>
        </a>
        <span className="t-label flex-shrink-0 text-mute-2">공식 지원센터</span>
      </div>
    </header>
  )
}

/**
 * @param {string}   title       페이지 제목 (h1)
 * @param {string}   [lead]      제목 아래 한 문단 설명
 * @param {string}   [meta]      시행일 등. 확정값이 없으면 넘기지 않는다
 * @param {string}   currentId   SUPPORT_LINKS 의 id — 관련 메뉴에서 자기 자신을 뺀다
 * @param {string[]} [related]   관련 메뉴에 노출할 id 목록 (미지정 시 나머지 전부)
 */
export default function DocPage({ title, lead, meta, currentId, related, children }) {
  const menu = SUPPORT_LINKS.filter(
    (l) => l.id !== currentId && (!related || related.includes(l.id)),
  )

  return (
    <>
      <DocHeader />

      <main className="wrap pb-16 pt-9 md:pb-20 md:pt-12">
        <article className="mx-auto w-full max-w-[720px]">
          <h1
            className="text-fog"
            style={{
              fontSize: 'clamp(24px, 6.4vw, 34px)',
              fontWeight: 800,
              lineHeight: 1.25,
              letterSpacing: '-0.028em',
            }}
          >
            {title}
          </h1>

          {meta && <p className="mt-3 t-caption">{meta}</p>}

          {lead && (
            <p className="mt-4 text-[15.5px] leading-[1.8] text-mute">{lead}</p>
          )}

          <div className="mt-9 flex flex-col gap-9">{children}</div>

          {/* 관련 메뉴 */}
          {menu.length > 0 && (
            <nav
              className="mt-12 border-t pt-7"
              style={{ borderColor: 'var(--color-line)' }}
            >
              <h2 className="t-label text-mute-2">관련 안내</h2>
              <ul className="mt-3 flex flex-col">
                {menu.map((l) => (
                  <li key={l.id}>
                    <a
                      href={l.href}
                      className="flex min-h-[48px] items-center justify-between gap-3 border-b text-[15px] font-medium text-fog transition-colors hover:text-[color:var(--color-accent-soft)]"
                      style={{ borderColor: 'var(--color-line)' }}
                    >
                      {l.label}
                      <iconify-icon
                        icon="solar:alt-arrow-right-linear"
                        width="16"
                        style={{ color: 'var(--color-mute-2)' }}
                      ></iconify-icon>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="mt-8">
            <a href="/" className="btn btn-line">
              GYM PASS 홈으로 돌아가기
            </a>
          </div>
        </article>
      </main>

      {/* 지원문서에서는 지점 목록을 반복하지 않는다 (Footer 는 메인과 동일 컴포넌트) */}
      <Footer showStores={false} />
    </>
  )
}

/* ══════════════ 본문 블록 ══════════════ */

/** 번호가 붙는 본문 섹션 */
export function DocSection({ no, title, children }) {
  return (
    <section>
      <h2 className="flex items-baseline gap-2.5 text-[17.5px] font-bold leading-snug tracking-[-0.015em] text-fog">
        {no && (
          <span
            className="tnum flex-shrink-0 font-display text-[13px] font-semibold"
            style={{ color: 'var(--color-accent-soft)' }}
          >
            {no}
          </span>
        )}
        {title}
      </h2>
      <div className="mt-3.5 flex flex-col gap-3.5">{children}</div>
    </section>
  )
}

/** 본문 한 문단 — 법률 문서 가독성 기준(15.5px / 1.8) */
export function DocText({ children }) {
  return <p className="text-[15.5px] leading-[1.8] text-mute">{children}</p>
}

/** 점 목록 */
export function DocList({ items, ordered = false }) {
  if (!items?.length) return null
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={typeof item === 'string' ? item : i} className="flex gap-2.5">
          <span
            aria-hidden="true"
            className="tnum mt-[3px] flex-shrink-0 text-[13px] font-semibold"
            style={{ color: 'var(--color-mute-2)', minWidth: ordered ? '16px' : 'auto' }}
          >
            {ordered ? `${i + 1}.` : '·'}
          </span>
          <span className="text-[15px] leading-[1.75] text-mute">{item}</span>
        </li>
      ))}
    </Tag>
  )
}

/** 강조 박스 — 카드 안에 카드를 만들지 않고 얕은 박스 하나만 쓴다 */
export function DocBox({ title, children, tone = 'default' }) {
  return (
    <div
      className="rounded-[14px] px-4 py-4 md:px-5"
      style={{
        background: tone === 'quiet' ? 'var(--color-ink-2)' : 'var(--color-surface)',
        border: '1px solid var(--color-line)',
      }}
    >
      {title && (
        <p className="text-[14.5px] font-bold leading-snug text-fog">{title}</p>
      )}
      <div className={`flex flex-col gap-2.5 ${title ? 'mt-2.5' : ''}`}>{children}</div>
    </div>
  )
}

/** label / value 정보행 — value 가 없는 행은 호출부에서 미리 걸러 넘긴다 */
export function DocInfoRows({ rows }) {
  if (!rows?.length) return null
  return (
    <dl>
      {rows.map((row) => (
        <div key={row.label} className="inforow">
          <dt>{row.label}</dt>
          <dd className="whitespace-pre-line">
            {row.href ? (
              <a
                href={row.href}
                className="font-medium underline underline-offset-4"
                style={{ color: 'var(--color-accent-soft)' }}
              >
                {row.value}
              </a>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * 아직 확정되지 않은 항목 안내.
 * ⚠ 'TBD' / '확인중' / '[정보 입력]' 같은 개발용 문구를 쓰지 않고,
 *    고객이 읽어도 자연스러운 문장으로만 안내한다.
 */
export function DocPending({ children }) {
  return (
    <div
      className="flex gap-2.5 rounded-[12px] px-4 py-3.5"
      style={{ background: 'var(--color-ink-2)', border: '1px solid var(--color-line)' }}
    >
      <iconify-icon
        icon="solar:info-circle-linear"
        width="17"
        class="mt-[2px] flex-shrink-0"
        style={{ color: 'var(--color-mute-2)' }}
      ></iconify-icon>
      <p className="text-[14px] leading-[1.7] text-mute">{children}</p>
    </div>
  )
}

/** 외부 링크 버튼 묶음 (앱스토어 · 지점 채널) */
export function DocLinkButtons({ links }) {
  if (!links?.length) return null
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      {links.map((l) => (
        <a
          key={l.url}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-line sm:btn-auto sm:!px-5 !min-h-[48px] !text-[14px]"
        >
          {l.label}
        </a>
      ))}
    </div>
  )
}
