import { SUBSCRIPTION_STORES } from '../data/stores.js'

/** 푸터 — 사업자 정보는 확인된 내용만 기재한다. */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-ink" style={{ borderColor: 'var(--color-line)' }}>
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-[14px] font-bold leading-[1.15] tracking-[0.16em] text-fog">
              RETURN
              <br />
              COMPANY
            </p>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-mute-2">
              장기등록 부담 없이 매월 이용하는 헬스장. 구독 운영지점은 계속 추가됩니다.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="text-[12px] font-semibold tracking-wide text-mute-2">구독 운영지점</p>
            <ul className="mt-4 flex flex-col gap-2">
              {SUBSCRIPTION_STORES.map((store) => (
                <li key={store.id} className="text-[13.5px] text-mute">
                  {store.storeName}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[12px] font-semibold tracking-wide text-mute-2">바로가기</p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a href="#price" className="text-[13.5px] text-mute transition-colors duration-300 hover:text-fog">
                  구독 상품
                </a>
              </li>
              <li>
                <a href="#store" className="text-[13.5px] text-mute transition-colors duration-300 hover:text-fog">
                  지점 선택
                </a>
              </li>
              <li>
                <a href="#facility" className="text-[13.5px] text-mute transition-colors duration-300 hover:text-fog">
                  시설 안내
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[13.5px] text-mute transition-colors duration-300 hover:text-fog">
                  자주 묻는 질문
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-3 border-t pt-6 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: 'var(--color-line)' }}
        >
          <p className="text-[12px] leading-relaxed text-mute-2">
            [사업자 정보 입력] · 표기된 가격과 이용조건은 최종 정책 확정 후 확정 안내됩니다.
          </p>
          <p className="text-[12px] text-mute-2">© {year} RETURN COMPANY</p>
        </div>
      </div>
    </footer>
  )
}
