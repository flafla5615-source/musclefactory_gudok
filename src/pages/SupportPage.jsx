import DocPage, {
  DocBox,
  DocInfoRows,
  DocLinkButtons,
  DocList,
  DocPending,
  DocSection,
  DocText,
} from '../components/support/DocPage.jsx'
import {
  CANCEL_VS_DELETE,
  STORE_CHANNEL_NOTE,
  STORE_SUPPORT_CHANNELS,
  SUPPORT_APPS,
  SUPPORT_CONTACT_ROWS,
  SUPPORT_TOPICS,
  hasPartialStoreChannels,
  hasSupportContact,
} from '../data/support.js'

/**
 * /support — 앱스토어 · 구글 플레이 '앱 지원 URL' 로 제출하는 페이지
 *
 * ⚠ 고객센터 전화 · 운영시간 · 이메일은 확정 전까지 표시하지 않는다.
 *    data/support.js 의 SUPPORT_CONTACT 에 값을 넣으면 자동으로 나타난다.
 *    '010-0000-0000' 같은 가짜 연락처를 절대 넣지 않는다.
 */
export default function SupportPage() {
  return (
    <DocPage
      currentId="support"
      title="GYM PASS 고객센터"
      lead="GYM PASS 앱 및 서비스 이용 중 궁금한 사항을 고객센터를 통해 안내받을 수 있습니다."
    >
      <DocSection no="01" title="문의 가능 항목">
        <ul className="flex flex-wrap gap-1.5">
          {SUPPORT_TOPICS.map((topic) => (
            <li key={topic} className="chip chip-quiet !h-auto !py-1.5 !text-[12.5px]">
              {topic}
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection no="02" title="고객센터 안내">
        {hasSupportContact ? (
          <DocInfoRows rows={SUPPORT_CONTACT_ROWS} />
        ) : (
          <DocPending>
            고객센터 대표 전화 · 운영시간 · 고객문의 이메일은 준비되는 대로 이 페이지에
            안내드립니다. 그 전까지는 아래 지점 문의 채널로 접수해 주세요.
          </DocPending>
        )}
      </DocSection>

      {STORE_SUPPORT_CHANNELS.length > 0 && (
        <DocSection no="03" title="지점 문의">
          <DocText>
            이용 중인 지점의 시설 · 출입 · 이용권 관련 문의는 해당 지점 채널에서 가장 빠르게
            확인할 수 있습니다.
          </DocText>
          <div className="flex flex-col gap-3">
            {STORE_SUPPORT_CHANNELS.map((store) => (
              <DocBox key={store.id} title={store.name} tone="quiet">
                <DocLinkButtons links={store.channels} />
              </DocBox>
            ))}
            {hasPartialStoreChannels && <p className="t-caption">{STORE_CHANNEL_NOTE}</p>}
          </div>
        </DocSection>
      )}

      {SUPPORT_APPS.length > 0 && (
        <DocSection no="04" title="앱 이용 안내">
          <DocText>
            지점마다 이용하는 앱이 다릅니다. 구독 신청과 QR 출입은 아래 앱에서 진행합니다.
          </DocText>
          <div className="flex flex-col gap-3">
            {SUPPORT_APPS.map((app) => (
              <DocBox key={app.appName} title={`${app.appName} 앱`} tone="quiet">
                <p className="text-[13.5px] leading-[1.7] text-mute-2">
                  {app.stores.join(' · ')}
                </p>
                <DocLinkButtons
                  links={[
                    app.ios && { label: 'App Store', url: app.ios },
                    app.android && { label: 'Google Play', url: app.android },
                  ].filter(Boolean)}
                />
              </DocBox>
            ))}
          </div>
        </DocSection>
      )}

      <DocSection no="05" title="구독 해지와 회원 탈퇴">
        <DocText>
          두 절차는 서로 다릅니다. 필요한 안내를 선택해 확인해 주세요.
        </DocText>
        <div className="flex flex-col gap-3">
          {CANCEL_VS_DELETE.map((item) => (
            <DocBox key={item.id} title={`${item.label} — ${item.summary}`} tone="quiet">
              <p className="text-[14.5px] leading-[1.75] text-mute">{item.detail}</p>
              <a
                href={item.href}
                className="inline-flex min-h-[40px] items-center gap-1.5 text-[14px] font-semibold"
                style={{ color: 'var(--color-accent-soft)' }}
              >
                {item.label} 안내 보기
                <iconify-icon icon="solar:alt-arrow-right-linear" width="15"></iconify-icon>
              </a>
            </DocBox>
          ))}
        </div>
      </DocSection>

      <DocSection no="06" title="문의 전 확인하면 좋은 내용">
        <DocList
          items={[
            '월 구독은 정기결제 상품이며, 구독 해지를 신청하기 전까지 매월 자동으로 결제됩니다.',
            '구독상품은 이용 일시정지 또는 이용기간 중지 제도를 제공하지 않습니다.',
            '이미 결제된 회차의 환불 여부와 금액은 이용약관의 환불기준에 따라 달라질 수 있습니다.',
          ]}
        />
      </DocSection>
    </DocPage>
  )
}
