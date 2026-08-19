import { SUBSCRIPTION_STORES } from '../data/stores.js'

/** 푸터 — 확인된 내용만. 미확정 정보를 개발 메모처럼 노출하지 않는다. */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-ink" style={{ borderColor: 'var(--color-line)' }}>
      <div className="wrap py-12">
        <p className="font-display text-[13px] font-bold leading-[1.2] tracking-[0.16em] text-fog">
          RETURN
          <br />
          COMPANY
        </p>

        <ul className="mt-7 flex flex-col gap-1.5">
          {SUBSCRIPTION_STORES.map((store) => (
            <li key={store.id} className="text-[13px] text-mute">
              {store.name}
            </li>
          ))}
        </ul>

        <div
          className="mt-8 border-t pt-6"
          style={{ borderColor: 'var(--color-line)' }}
        >
          <p className="t-caption">
            표기된 가격과 이용조건은 최종 정책 확정 후 안내드립니다.
          </p>
          <p className="mt-2 t-caption">© {year} RETURN COMPANY</p>
        </div>
      </div>
    </footer>
  )
}
