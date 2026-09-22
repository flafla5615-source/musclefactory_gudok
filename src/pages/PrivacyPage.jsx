import DocPage, {
  DocBox,
  DocInfoRows,
  DocPending,
  DocSection,
  DocText,
} from '../components/support/DocPage.jsx'
import {
  PRIVACY_POLICY,
  SUPPORT_CONTACT_ROWS,
  hasSupportContact,
} from '../data/support.js'

/**
 * /privacy — 개인정보처리방침
 *
 * ⚠ 앱이 실제로 수집하는 항목 · 보유기간 · 제3자 제공 · 수탁사(PG · 문자발송 ·
 *    출입시스템) · 바디코디 운영사 법인정보 · 개인정보 보호책임자를 확인하지 못했다.
 *    법률 문구를 임의로 완성하지 않는다. 가상의 처리방침을 공개하지 않는다.
 *
 *    확정 원문을 받으면 data/support.js 의 PRIVACY_POLICY 에서
 *      published: true / effectiveDate / sections[].body
 *    세 가지만 채우면 이 페이지가 전문 게시 상태로 바뀐다.
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
          <DocSection title="게시 준비 안내">
            <DocPending>
              GYM PASS 브랜디드 앱의 개인정보처리방침은 현재 준비 중이며, 확정되는 즉시 이
              페이지에 전문을 게시합니다. 게시 전까지 개인정보 관련 문의는 고객센터로 접수해
              주시면 안내드립니다.
            </DocPending>
            <DocText>
              확인되지 않은 수집항목 · 보유기간 · 위탁업체를 임의로 기재하지 않기 위해 전문
              공개를 보류하고 있습니다.
            </DocText>
          </DocSection>

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

          <DocSection title="개인정보 관련 문의">
            {hasSupportContact ? (
              <DocInfoRows rows={SUPPORT_CONTACT_ROWS} />
            ) : (
              <DocPending>
                개인정보 관련 문의 연락처는 고객센터 페이지에서 안내드립니다.
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
