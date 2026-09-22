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
  appStepsFor,
  hasPartialStoreChannels,
  hasSupportContact,
} from '../data/support.js'

/**
 * /subscription-cancel — 구독 해지 및 환불 안내
 *
 * ⚠ 새로운 환불공식을 만들지 않는다. 법률 검토 없이 환불금액 산정기준을 쓰지 않는다.
 *    기존 FAQ 의 환불 구간표(12/24/48시간)를 이 페이지에 그대로 옮기지 않고,
 *    '이용약관의 환불기준 + 관계 법령·소비자분쟁해결기준 우선 적용' 구조로만 안내한다.
 *    구간별 상세 기준은 /terms 에서 기존 데이터를 그대로 읽어 보여준다.
 * ⚠ '구독 해지 = 즉시 전액 환불' 로 읽히게 쓰지 않는다.
 * ⚠ 구독상품에는 이용 일시정지 제도가 없다. '정지' 표현을 쓰지 않는다.
 * ⚠ 앱 내 해지 메뉴 경로는 확인 전까지 만들어내지 않는다.
 *    data/support.js 의 APP_SELF_SERVICE.subscriptionCancel 에 들어오면 표시된다.
 */
export default function SubscriptionCancelPage() {
  const appSteps = SUPPORT_APPS.map((app) => ({
    appName: app.appName,
    stores: app.stores,
    steps: appStepsFor('subscriptionCancel', app.appName),
  }))
  const hasAppSteps = appSteps.some((a) => a.steps?.length)

  return (
    <DocPage
      currentId="subscription-cancel"
      related={['account-deletion', 'support', 'terms']}
      title="GYM PASS 구독 해지 및 환불 안내"
      lead="정기결제 중단과 환불 신청 방법을 안내합니다."
    >
      <DocSection no="01" title="구독 해지와 회원 탈퇴는 다릅니다">
        <div className="flex flex-col gap-3">
          {CANCEL_VS_DELETE.map((item) => (
            <DocBox key={item.id} title={`${item.label} — ${item.summary}`} tone="quiet">
              <p className="text-[14.5px] leading-[1.75] text-mute">{item.detail}</p>
            </DocBox>
          ))}
        </div>
      </DocSection>

      <DocSection no="02" title="구독 해지 신청 경로">
        {SUPPORT_APPS.length > 0 && (
          <DocText>
            지점에 따라 이용하는 앱이 다릅니다. 구독을 신청할 때 사용한 앱에서 해지를 신청할
            수 있습니다.
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
              앱 내 구독 해지 메뉴의 정확한 위치는 확인되는 대로 이 페이지에 단계별로
              안내드립니다. 그 전까지는 아래 문의 채널로 해지를 신청해 주세요.
            </DocPending>
          </>
        )}
      </DocSection>

      <DocSection no="03" title="다음 정기결제 중단 기준">
        <DocList
          items={[
            '월 구독은 정기결제 상품이므로, 구독 해지를 신청하기 전까지는 매월 자동으로 결제됩니다.',
            '해지를 신청하면 다음 결제회차부터 결제되지 않습니다.',
            '구독상품은 이용 일시정지 또는 이용기간 중지 제도를 제공하지 않습니다. 개인사정, 출장, 여행, 질병 등의 사유가 있더라도 구독기간 및 다음 정기결제일은 자동으로 연장되거나 변경되지 않습니다.',
          ]}
        />
      </DocSection>

      <DocSection no="04" title="이미 결제된 이용기간 처리">
        <DocText>
          구독 해지 신청은 다음 회차 결제를 중단하는 절차이며, 이미 결제된 해당 결제회차가
          자동으로 전액 환불되는 것은 아닙니다. 이미 결제된 회차의 환불 여부와 환불금액은
          결제 후 경과시간과 이용약관의 환불기준에 따라 달라질 수 있습니다.
        </DocText>
      </DocSection>

      <DocSection no="05" title="환불 산정기준">
        <DocList
          items={[
            '환불 여부와 금액은 결제 후 경과시간에 따른 이용약관의 환불기준에 따라 산정됩니다.',
            '관계 법령, 소비자분쟁해결기준 등에서 이용약관의 기준보다 회원에게 유리한 해지·환급기준의 적용을 의무화하는 경우에는 해당 법령 및 기준이 우선 적용됩니다.',
            '회사의 귀책사유, 시설 폐점, 장기간 시설 이용 불가 등 회원에게 책임을 물을 수 없는 사유로 정상적인 서비스 제공이 어려운 경우에는 관계 법령 및 소비자분쟁해결기준에 따라 별도로 환급합니다.',
          ]}
        />
        <DocBox title="구간별 환불기준" tone="quiet">
          <p className="text-[14.5px] leading-[1.75] text-mute">
            결제 후 경과시간에 따른 구간별 환불기준은 이용약관 안내 페이지에서 확인할 수
            있습니다.
          </p>
          <a
            href="/terms"
            className="inline-flex min-h-[40px] items-center gap-1.5 text-[14px] font-semibold"
            style={{ color: 'var(--color-accent-soft)' }}
          >
            이용약관에서 환불기준 보기
            <iconify-icon icon="solar:alt-arrow-right-linear" width="15"></iconify-icon>
          </a>
        </DocBox>
      </DocSection>

      <DocSection no="06" title="환불 신청 및 문의">
        <DocText>
          환불 신청과 진행상황 확인은 고객센터 또는 이용 중인 지점 채널로 문의해 주세요.
        </DocText>

        {hasSupportContact ? (
          <DocInfoRows rows={SUPPORT_CONTACT_ROWS} />
        ) : (
          <DocPending>
            고객센터 대표 연락처는 준비되는 대로 안내드립니다. 그 전까지는 이용 중인 지점
            채널로 문의해 주세요.
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

      <DocSection no="07" title="회원 탈퇴를 원하시나요?">
        <DocText>
          계정과 개인정보 삭제를 원하시는 경우에는 구독 해지와 별도로 회원 탈퇴를 신청해야
          합니다.
        </DocText>
        <a href="/account-deletion" className="btn btn-line">
          회원 탈퇴 및 개인정보 삭제 안내
        </a>
      </DocSection>
    </DocPage>
  )
}
