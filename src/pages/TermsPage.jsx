import DocPage, {
  DocBox,
  DocList,
  DocPending,
  DocSection,
  DocText,
} from '../components/support/DocPage.jsx'
import { FAQS } from '../data/content.js'
import { TERMS_URL } from '../data/legal.js'
import { BODYCODI_POLICY, TERMS_DOC } from '../data/support.js'

/**
 * /terms — GYM PASS 이용약관
 *
 * ⚠ 이 저장소에는 이용약관 전문이 없다. (legal.js TERMS_URL 도 null)
 *    전문을 지어내지 않는다. 전문 URL 또는 원문을 받으면 그때 게시한다.
 * ⚠ 약관 문구를 JSX 에 다시 옮겨 적어 이중관리하지 않는다.
 *    아래 요약은 전부 data/content.js 의 FAQ 데이터를 그대로 읽어 렌더링한다.
 *    (FAQ 문구를 고치면 이 페이지도 같이 바뀐다)
 * ⚠ 판매가격 · 이용기간 · 이용가능 지점 · 프로모션은 변경될 수 있으므로
 *    약관 페이지 본문에 고정으로 박아 넣지 않는다.
 *    가격을 언급하는 FAQ(monthly-price)는 아래 요약에서 제외한다.
 */

/** 약관 요약에 쓰는 FAQ — 가격이 들어간 항목은 제외한다 */
const EXCLUDED_FAQ_IDS = ['monthly-price']

const GROUPS = [
  {
    id: 'subscribe',
    no: '02',
    title: '구독 · 정기결제',
    faqIds: ['one-month', 'auto-payment', 'pause'],
  },
  {
    id: 'use',
    no: '03',
    title: '이용 · 이용 가능 지점',
    faqIds: ['app', 'store-add', 'store-close'],
  },
  {
    id: 'refund',
    no: '04',
    title: '구독 해지 · 환불',
    faqIds: ['cancel', 'refund', 'facility-issue'],
  },
]

const faqById = (id) =>
  EXCLUDED_FAQ_IDS.includes(id) ? null : FAQS.find((f) => f.id === id) || null

function TermsClause({ faq }) {
  return (
    <DocBox title={faq.question} tone="quiet">
      <p className="text-[14.5px] leading-[1.8] text-mute">{faq.answer}</p>

      {faq.table && (
        <dl className="mt-1">
          {faq.table.map((row) => (
            <div key={row.label} className="inforow !items-start">
              <dt className="!flex-[0_0_136px] !text-[12.5px] !leading-[1.6]">{row.label}</dt>
              <dd className="!text-[13.5px] !leading-[1.7]">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {faq.notes && (
        <ul className="mt-1 flex flex-col gap-1.5">
          {faq.notes.map((note) => (
            <li key={note} className="flex gap-2 t-caption">
              <span aria-hidden="true">·</span>
              <span className="!leading-[1.7]">{note}</span>
            </li>
          ))}
        </ul>
      )}
    </DocBox>
  )
}

export default function TermsPage() {
  /* 약관 전문 링크 — 자체 URL 이 먼저, 없으면 바디코디 공식 약관 URL.
     둘 다 null 이면 버튼을 만들지 않는다. (임의 URL 생성 금지) */
  const officialUrl = TERMS_URL || BODYCODI_POLICY.termsUrl

  return (
    <DocPage
      currentId="terms"
      related={['support', 'privacy', 'subscription-cancel']}
      title="GYM PASS 이용약관"
      meta={TERMS_DOC.effectiveDate ? `시행일 ${TERMS_DOC.effectiveDate}` : undefined}
      lead="GYM PASS 구독서비스 이용에 적용되는 약관입니다."
    >
      <DocSection no="01" title="약관 전문 안내">
        {officialUrl ? (
          <>
            <DocText>
              아래는 이용약관의 주요 사항을 안내한 것입니다. 전체 내용은 약관 전문에서 확인해
              주세요.
            </DocText>
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line"
            >
              이용약관 전문 보기
            </a>
          </>
        ) : (
          <DocPending>
            이용약관 전문은 별도 문서로 관리되고 있으며, 확정되는 대로 이 페이지에 전문 또는
            공식 약관 링크를 게시합니다. 아래 내용은 약관의 주요 사항을 안내한 것으로 약관 전문을 대체하지
            않습니다.
          </DocPending>
        )}

        <DocBox title="상품 정보는 이 문서에 고정되지 않습니다">
          <DocList
            items={[
              '판매가격',
              '이용기간',
              '이용 가능 지점',
              '진행 중인 프로모션',
            ]}
          />
          <p className="text-[13.5px] leading-[1.7] text-mute-2">
            위 항목은 변경될 수 있어 약관 본문에 포함하지 않습니다. 실제 적용되는 내용은 상품
            안내와 결제화면에서 확인해 주세요.
          </p>
        </DocBox>
      </DocSection>

      {GROUPS.map((group) => {
        const faqs = group.faqIds.map(faqById).filter(Boolean)
        if (faqs.length === 0) return null
        return (
          <DocSection key={group.id} no={group.no} title={group.title}>
            <div className="flex flex-col gap-3">
              {faqs.map((faq) => (
                <TermsClause key={faq.id} faq={faq} />
              ))}
            </div>
          </DocSection>
        )
      })}

      <DocSection no="05" title="문의">
        <DocText>
          약관 내용에 대해 궁금한 점이 있으면 GYM PASS 고객문의로 연락해 주세요.
        </DocText>
      </DocSection>
    </DocPage>
  )
}
