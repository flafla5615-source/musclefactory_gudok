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
  APP_SELF_SERVICE,
  CANCEL_VS_DELETE,
  STORE_CHANNEL_NOTE,
  STORE_SUPPORT_CHANNELS,
  SUPPORT_APPS,
  SUPPORT_CONTACT_ROWS,
  appStepsFor,
  hasPartialStoreChannels,
  hasSupportContact,
} from '../data/support.js'

/**
 * /account-deletion — 회원 탈퇴 및 개인정보 삭제 안내
 *
 * 구글 플레이 등 외부에서 직접 접근하는 URL 이다. SPA 모달이 아니라 독립 페이지다.
 *
 * ⚠ 앱 내 실제 탈퇴 메뉴 경로를 확인하지 못했다.
 *    '마이페이지 → 설정 → 회원탈퇴' 같은 경로를 만들어내지 않는다.
 *    data/support.js 의 APP_SELF_SERVICE.accountDeletion 에 실제 경로가 들어오면
 *    그때 단계가 표시된다.
 * ⚠ '즉시 삭제' / '3일 이내' / '30일 이내' 같은 처리기간을 약속하지 않는다.
 *    APP_SELF_SERVICE.processingPeriod 가 null 이면 기간을 쓰지 않는다.
 */
export default function AccountDeletionPage() {
  const appSteps = SUPPORT_APPS.map((app) => ({
    appName: app.appName,
    stores: app.stores,
    steps: appStepsFor('accountDeletion', app.appName),
  }))
  const hasAppSteps = appSteps.some((a) => a.steps?.length)

  return (
    <DocPage
      currentId="account-deletion"
      related={['subscription-cancel', 'support', 'privacy']}
      title="GYM PASS 회원 탈퇴 및 개인정보 삭제 안내"
      lead="GYM PASS 계정 삭제와 개인정보 삭제 요청 방법을 안내합니다."
    >
      <DocSection no="01" title="구독 해지와 회원 탈퇴는 다릅니다">
        <DocText>
          두 절차는 서로 다른 신청입니다. 원하시는 절차를 먼저 확인해 주세요.
        </DocText>
        <div className="flex flex-col gap-3">
          {CANCEL_VS_DELETE.map((item) => (
            <DocBox key={item.id} title={`${item.label} — ${item.summary}`} tone="quiet">
              <p className="text-[14.5px] leading-[1.75] text-mute">{item.detail}</p>
            </DocBox>
          ))}
        </div>
        <DocPending>
          회원 탈퇴는 정기결제 해지와 자동으로 연결되지 않습니다. 이용 중인 구독이 있다면
          구독 해지 상태를 먼저 확인해 주세요.
        </DocPending>
      </DocSection>

      <DocSection no="02" title="앱에서 회원 탈퇴하는 방법">
        {SUPPORT_APPS.length > 0 && (
          <DocText>
            GYM PASS 는 지점에 따라 이용하는 앱이 다릅니다. 가입할 때 사용한 앱에서 탈퇴를
            신청할 수 있습니다.
          </DocText>
        )}

        {hasAppSteps ? (
          <div className="flex flex-col gap-3">
            {appSteps
              .filter((a) => a.steps?.length)
              .map((app) => (
                <DocBox key={app.appName} title={`${app.appName} 앱`} tone="quiet">
                  <p className="text-[13.5px] leading-[1.7] text-mute-2">
                    {app.stores.join(' · ')}
                  </p>
                  <DocList items={app.steps} ordered />
                </DocBox>
              ))}
          </div>
        ) : (
          <>
            {SUPPORT_APPS.length > 0 && (
              <div className="flex flex-col gap-3">
                {SUPPORT_APPS.map((app) => (
                  <DocBox key={app.appName} title={`${app.appName} 앱`} tone="quiet">
                    <p className="text-[13.5px] leading-[1.7] text-mute-2">
                      {app.stores.join(' · ')}
                    </p>
                  </DocBox>
                ))}
              </div>
            )}
            <DocPending>
              앱 내 회원 탈퇴 메뉴의 정확한 위치는 확인되는 대로 이 페이지에 단계별로
              안내드립니다. 그 전까지는 아래 고객센터 요청 방법으로 탈퇴 및 개인정보 삭제를
              신청해 주세요.
            </DocPending>
          </>
        )}
      </DocSection>

      <DocSection no="03" title="앱 이용이 어려운 경우">
        <DocText>
          앱에서 직접 신청하기 어려운 경우 고객센터로 회원 탈퇴 및 개인정보 삭제를 요청할 수
          있습니다.
        </DocText>

        {hasSupportContact ? (
          <DocInfoRows rows={SUPPORT_CONTACT_ROWS} />
        ) : (
          <DocPending>
            고객센터 대표 연락처는 준비되는 대로 안내드립니다. 그 전까지는 이용 중인 지점
            채널로 요청해 주세요.
          </DocPending>
        )}

        {STORE_SUPPORT_CHANNELS.length > 0 && (
          <div className="flex flex-col gap-3">
            {STORE_SUPPORT_CHANNELS.map((store) => (
              <DocBox key={store.id} title={store.name} tone="quiet">
                <DocLinkButtons links={store.channels} />
              </DocBox>
            ))}
            {hasPartialStoreChannels && <p className="t-caption">{STORE_CHANNEL_NOTE}</p>}
          </div>
        )}
      </DocSection>

      <DocSection no="04" title="탈퇴 전 확인사항">
        <DocList
          items={[
            '이용 중인 이용권 — 남은 구독 이용기간과 다음 결제 예정 여부를 확인해 주세요.',
            '미납금 — 정산되지 않은 금액이 있는 경우 탈퇴 처리 전에 확인이 필요합니다.',
            '지점 이용사항 — 개인 락커 등 지점에서 이용 중인 항목이 있다면 해당 지점에 함께 확인해 주세요.',
          ]}
        />
        <DocPending>
          탈퇴가 완료되면 계정 정보와 이용기록을 다시 확인하기 어려울 수 있습니다. 필요한
          내용은 탈퇴 전에 확인해 주세요.
        </DocPending>
      </DocSection>

      <DocSection no="05" title="개인정보 처리">
        <DocText>
          회원 탈퇴가 처리되면 관련 법령에 따라 일정 기간 보관해야 하는 정보를 제외하고 탈퇴
          처리에 따라 개인정보를 처리합니다.
        </DocText>
        {APP_SELF_SERVICE.processingPeriod ? (
          <DocText>처리기간 — {APP_SELF_SERVICE.processingPeriod}</DocText>
        ) : (
          <DocPending>
            탈퇴 및 개인정보 삭제 처리기간과 법령에 따라 보관되는 항목은 개인정보처리방침
            게시와 함께 안내드립니다.
          </DocPending>
        )}
        <DocBox title="개인정보처리방침" tone="quiet">
          <p className="text-[14.5px] leading-[1.75] text-mute">
            개인정보 처리 목적 · 보유기간 · 제3자 제공 등 자세한 내용은 개인정보처리방침에서
            안내합니다.
          </p>
          <a
            href="/privacy"
            className="inline-flex min-h-[40px] items-center gap-1.5 text-[14px] font-semibold"
            style={{ color: 'var(--color-accent-soft)' }}
          >
            개인정보처리방침 보기
            <iconify-icon icon="solar:alt-arrow-right-linear" width="15"></iconify-icon>
          </a>
        </DocBox>
      </DocSection>
    </DocPage>
  )
}
