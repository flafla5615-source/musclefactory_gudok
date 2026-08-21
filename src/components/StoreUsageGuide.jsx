import { DEFAULT_USAGE_GUIDE } from '../data/content.js'
import { EVENTS, openChannel } from '../lib/tracking.js'

/**
 * 이 지점 GYM PASS 이용방법
 *
 * ⚠ 지점마다 사용하는 앱이 다르다. 고객이 어떤 앱을 깔아야 하는지
 *    헷갈리지 않는 것이 이 컴포넌트의 유일한 목적이다.
 *      짐플릭스 시청점 → 짐서폿 (QR 출입)
 *      그 외 지점      → 바디코디
 *
 * 절차 문구는 stores.js 의 usageGuide 에서만 읽는다. JSX 에 지점별
 * 설명이나 앱 이름을 하드코딩하지 않는다. usageGuide 가 비어 있으면
 * 앱 이름을 단정하지 않는 기본 흐름만 보여준다.
 *
 * 앱스토어 URL·QR 이미지는 제공되기 전까지 null 이며, 임의로 만들지 않는다.
 */
export default function StoreUsageGuide({ store }) {
  if (!store) return null

  const guide = store.usageGuide || {}
  const steps = Array.isArray(guide.steps) && guide.steps.length > 0
    ? guide.steps
    : DEFAULT_USAGE_GUIDE.steps
  const appName = guide.appName || DEFAULT_USAGE_GUIDE.appName
  const entryMethod = guide.entryMethod || DEFAULT_USAGE_GUIDE.entryMethod
  const headline = guide.headline || DEFAULT_USAGE_GUIDE.headline

  // 앱 다운로드 링크 — 값이 있는 플랫폼만
  const appStoreLinks = [
    guide.appStore?.ios && { key: 'ios', label: 'App Store', url: guide.appStore.ios },
    guide.appStore?.android && { key: 'android', label: 'Google Play', url: guide.appStore.android },
  ].filter(Boolean)

  return (
    <div className="mt-3">
      <div className="card">
        <h3 className="t-card text-fog">이 지점 GYM PASS 이용방법</h3>

        {/* 어떤 앱을 쓰는 지점인지 가장 먼저 보이게 한다 */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="chip chip-quiet">{store.name}</span>
          {appName && <span className="chip chip-accent">{appName} APP</span>}
          {entryMethod && <span className="chip chip-quiet">{entryMethod} 출입</span>}
        </div>

        {headline && <p className="mt-4 text-[14.5px] font-semibold leading-relaxed text-fog">{headline}</p>}

        <ol className="mt-5">
          {steps.map((step, i) => (
            <li key={step} className="inforow">
              <span className="tnum !flex-[0_0_32px] font-display text-[13px] font-semibold text-mute-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="!flex-1 text-[14px] font-medium leading-relaxed text-fog">{step}</span>
            </li>
          ))}
        </ol>

        {/* 지점 전용 QR — 실제 이미지가 등록됐을 때만 (가짜 QR 생성 금지) */}
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

        {/* 앱 다운로드 · 가입 링크 — 값이 있을 때만 (임의 URL 생성 금지) */}
        {(appStoreLinks.length > 0 || guide.signupUrl) && (
          <div className="card-foot flex flex-col gap-2.5">
            {appStoreLinks.length > 0 && (
              <>
                <p className="t-caption">{appName} 앱 다운로드</p>
                <div className={`grid gap-2.5 ${appStoreLinks.length > 1 ? 'grid-cols-2' : ''}`}>
                  {appStoreLinks.map((link) => (
                    <button
                      key={link.key}
                      type="button"
                      onClick={() =>
                        openChannel(link.url, EVENTS.SIGNUP_START, {
                          store_id: store.id,
                          channel: 'app_store',
                          platform: link.key,
                          app: guide.appType,
                        })
                      }
                      className="btn btn-line"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </>
            )}
            {guide.signupUrl && (
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
            )}
          </div>
        )}
      </div>
    </div>
  )
}
