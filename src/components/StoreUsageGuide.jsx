import { DEFAULT_USAGE_GUIDE } from '../data/content.js'
import { EVENTS, openChannel } from '../lib/tracking.js'

/**
 * 이 지점 GYM PASS 이용방법
 *
 * SelectedStore 카드 아래에 붙는다. 지점별 절차는 stores.js 의 usageGuide 로만 관리하고
 * JSX 에 지점 설명을 하드코딩하지 않는다.
 *
 *   steps 가 있으면      → 그 지점 전용 절차를 보여준다
 *   steps 가 비어 있으면 → 확인된 공통 절차(바디코디 앱)를 보여준다
 *   qrImage / signupUrl / note 는 값이 있을 때만 렌더링한다
 *
 * ⚠ 확정되지 않은 절차를 임의로 만들지 않는다. 가짜 QR 을 만들지 않는다.
 */
export default function StoreUsageGuide({ store }) {
  if (!store) return null

  const guide = store.usageGuide || {}
  const usesStoreSteps = Array.isArray(guide.steps) && guide.steps.length > 0
  const steps = usesStoreSteps ? guide.steps : DEFAULT_USAGE_GUIDE.steps
  const appName = guide.appName || DEFAULT_USAGE_GUIDE.appName

  return (
    <div className="mt-3">
      <div className="card">
        <div className="flex items-center justify-between gap-3">
          <h3 className="t-card text-fog">이 지점 GYM PASS 이용방법</h3>
          {appName && <span className="chip chip-quiet">{appName} 앱</span>}
        </div>

        <ol className="mt-5 flex flex-col gap-0">
          {steps.map((step) => (
            <li key={step.no} className="inforow">
              <dt className="tnum !flex-[0_0_32px] font-display text-[13px] font-semibold text-mute-2">
                {step.no}
              </dt>
              <dd className="!flex-1">
                <p className="text-[14px] font-semibold text-fog">{step.title}</p>
                {step.description && (
                  <p className="mt-0.5 text-[13px] leading-relaxed text-mute">{step.description}</p>
                )}
              </dd>
            </li>
          ))}
        </ol>

        {/* 지점 전용 QR — 실제 이미지가 등록됐을 때만 */}
        {guide.qrImage && (
          <div className="mt-5 flex items-center gap-4">
            <img
              src={guide.qrImage}
              alt={`${store.name} GYM PASS 가입 QR`}
              width="96"
              height="96"
              loading="lazy"
              className="rounded-[10px] bg-white p-1.5"
            />
            <p className="t-caption">카메라로 QR을 찍으면 가입 화면으로 이동합니다.</p>
          </div>
        )}

        {guide.note && <p className="mt-4 t-caption">{guide.note}</p>}

        {/* 지점 전용 가입 링크 — 값이 있을 때만 (임의 URL 생성 금지) */}
        {guide.signupUrl && (
          <div className="card-foot">
            <button
              type="button"
              onClick={() =>
                openChannel(guide.signupUrl, EVENTS.SIGNUP_START, {
                  store_id: store.id,
                  channel: 'signup_url',
                })
              }
              className="btn btn-line"
            >
              {store.shortName} 가입 페이지 열기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
