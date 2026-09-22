import { SUBSCRIPTION_STORES } from '../data/stores.js'
import { COMPANY_ROWS, SUPPORT_LINKS, hasCompanyInfo } from '../data/support.js'

/**
 * 푸터 — 메인 랜딩과 지원페이지(/support 등)가 같은 컴포넌트를 쓴다.
 *
 * ⚠ 확인된 내용만 표시한다. 미확정 정보를 개발 메모처럼 노출하지 않는다.
 * ⚠ 회사정보(상호·대표자·사업자등록번호·주소·연락처)는 data/support.js 의
 *    COMPANY_INFO 에서만 온다. 값이 채워지면 아래 영역이 자동으로 나타난다.
 *    확정 전까지 영역 자체를 그리지 않는다. (임의 작성 금지)
 *
 * @param {boolean} [showStores]  지점 목록 노출. 지원문서에서는 반복하지 않는다
 */
export default function Footer({ showStores = true }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-ink" style={{ borderColor: 'var(--color-line)' }}>
      <div className="wrap py-12">
        <p className="font-display text-[13px] font-bold leading-[1.2] tracking-[0.16em] text-fog">
          RETURN
          <br />
          COMPANY
        </p>

        {showStores && (
          <ul className="mt-7 flex flex-col gap-1.5">
            {SUBSCRIPTION_STORES.map((store) => (
              <li key={store.id} className="text-[13px] text-mute">
                {store.name}
              </li>
            ))}
          </ul>
        )}

        {/* 공식 지원 메뉴 — 앱스토어 · 구글 플레이 심사에 제출하는 페이지들 */}
        <nav className="mt-8">
          <h2 className="t-label text-mute-2">고객지원</h2>
          <ul className="mt-3 flex flex-col gap-0.5">
            {SUPPORT_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="flex min-h-[40px] items-center text-[13.5px] text-mute transition-colors hover:text-fog"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 border-t pt-6" style={{ borderColor: 'var(--color-line)' }}>
          {/* 사업자 정보 — COMPANY_INFO 에 확정값이 들어오면 자동 노출된다 */}
          {hasCompanyInfo && (
            <dl className="mb-5 flex flex-col gap-1">
              {COMPANY_ROWS.map((row) => (
                <div key={row.label} className="flex gap-2 text-[12.5px] leading-[1.6]">
                  <dt className="flex-shrink-0 text-mute-2">{row.label}</dt>
                  <dd className="text-mute">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <p className="t-caption">
            표기된 가격과 이용조건은 최종 정책 확정 후 안내드립니다.
          </p>
          <p className="mt-2 t-caption">© {year} RETURN COMPANY</p>
        </div>
      </div>
    </footer>
  )
}
