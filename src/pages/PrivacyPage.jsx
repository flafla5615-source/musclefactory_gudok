import DocPage, {
  DocBox,
  DocInfoRows,
  DocPending,
  DocSection,
  DocText,
} from '../components/support/DocPage.jsx'
import {
  BODYCODI_LABEL,
  BODYCODI_POLICY,
  PRIVACY_POLICY,
  SUPPORT_CONTACT_ROWS,
  hasSupportContact,
} from '../data/support.js'

/**
 * /privacy — 개인정보처리방침
 *
 * GYM PASS 브랜디드 앱은 바디코디 기반으로 운영되므로, 앱 이용과 관련된
 * 개인정보 처리는 바디코디 공식 회원용 개인정보처리방침 원문을 링크로 안내한다.
 *
 * ⚠ 방침 본문을 이 저장소에 복사해 이중관리하지 않는다.
 * ⚠ GYM PASS 자체 서버·DB 운영 설명, 자체 수집항목, 자체 보유기간,
 *    자체 위탁업체를 임의로 추가하지 않는다.
 * ⚠ 공식 URL 이 없을 때만 '게시 준비 안내 + 게시 예정 항목' 으로 되돌아간다.
 */
export default function PrivacyPage() {
  const { published, effectiveDate, sections } = PRIVACY_POLICY
  const filled = sections.filter((s) => s.body)
  const isPublished = published && filled.length > 0

  return (
    <DocPage
      currentId="privacy"
      related={['support', 'account-deletion', 'terms']}
      title="개인정보처리방침"
      meta={effectiveDate ? `시행일 ${effectiveDate}` : undefined}
      lead="GYM PASS 앱 및 서비스의 개인정보 처리에 관한 사항을 안내합니다."
    >
      {isPublished ? (
        filled.map((section, i) => (
          <DocSection
            key={section.id}
            no={String(i + 1).padStart(2, '0')}
            title={section.title}
          >
            <DocText>{section.body}</DocText>
          </DocSection>
        ))
      ) : (
        <>
          <DocSection
            title={BODYCODI_POLICY.privacyUrl ? '개인정보처리방침 전문' : '게시 준비 안내'}
          >
            {BODYCODI_POLICY.privacyUrl ? (
              <>
                <DocText>
                  GYM PASS 브랜디드 앱은 {BODYCODI_LABEL} 기반으로 운영됩니다.
                </DocText>
                <DocText>
                  앱 이용과 관련된 개인정보 처리에 관한 자세한 내용은 {BODYCODI_LABEL} 공식
                  회원용 개인정보처리방침에서 확인할 수 있습니다.
                </DocText>
                <a
                  href={BODYCODI_POLICY.privacyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line"
                >
                  {BODYCODI_LABEL} 개인정보처리방침 전문 보기
                  <iconify-icon icon="solar:arrow-right-up-linear" width="15"></iconify-icon>
                </a>
              </>
            ) : (
              <>
                <DocPending>
                  GYM PASS 브랜디드 앱의 개인정보처리방침은 현재 준비 중이며, 확정되는 즉시 이
                  페이지에 전문 또는 공식 처리방침 링크를 게시합니다. 게시 전까지 개인정보 관련
                  문의는 고객문의로 접수해 주시면 안내드립니다.
                </DocPending>
                <DocText>
                  확인되지 않은 수집항목 · 보유기간 · 위탁업체를 임의로 기재하지 않기 위해 전문
                  공개를 보류하고 있습니다.
                </DocText>
              </>
            )}
          </DocSection>

          {/* 공식 방침 링크가 없을 때만 — 링크가 있으면 목차가 오히려
              'GYM PASS 자체 방침을 따로 준비 중' 으로 읽혀 혼선을 준다 */}
          {!BODYCODI_POLICY.privacyUrl && (
          <DocSection title="게시 예정 항목">
            <DocText>개인정보처리방침에는 아래 항목이 포함될 예정입니다.</DocText>
            <ol className="flex flex-col">
              {sections.map((section, i) => (
                <li
                  key={section.id}
                  className="flex min-h-[46px] items-center gap-3 border-b text-[14.5px] text-mute"
                  style={{ borderColor: 'var(--color-line)' }}
                >
                  <span
                    className="tnum flex-shrink-0 font-display text-[12px] font-semibold"
                    style={{ color: 'var(--color-mute-2)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </li>
              ))}
            </ol>
          </DocSection>
          )}

          <DocSection title="개인정보 관련 문의">
            {hasSupportContact ? (
              <DocInfoRows rows={SUPPORT_CONTACT_ROWS} />
            ) : (
              <DocPending>
                개인정보 관련 문의 연락처는 고객문의 페이지에서 안내드립니다.
              </DocPending>
            )}
            <DocBox title="회원 탈퇴 및 개인정보 삭제를 원하시나요?" tone="quiet">
              <p className="text-[14.5px] leading-[1.75] text-mute">
                계정과 개인정보 삭제 요청 절차는 별도 페이지에서 안내하고 있습니다.
              </p>
              <a
                href="/account-deletion"
                className="inline-flex min-h-[40px] items-center gap-1.5 text-[14px] font-semibold"
                style={{ color: 'var(--color-accent-soft)' }}
              >
                회원 탈퇴 및 개인정보 삭제 안내
                <iconify-icon icon="solar:alt-arrow-right-linear" width="15"></iconify-icon>
              </a>
            </DocBox>
          </DocSection>
        </>
      )}
    </DocPage>
  )
}
