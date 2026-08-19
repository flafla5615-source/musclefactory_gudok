import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#price', label: '구독 상품' },
  { href: '#store', label: '지점' },
  { href: '#facility', label: '시설' },
  { href: '#faq', label: 'FAQ' },
]

/** 플로팅 글래스 네비게이션 — 스크롤 시 살짝 좁아지며 배경이 진해진다 */
export default function Nav({ onSubscribe }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 md:px-5"
        style={{
          background: scrolled ? 'rgba(13,13,13,0.82)' : 'rgba(13,13,13,0.42)',
          borderColor: scrolled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
          transition: 'background-color .5s var(--ease-spring), border-color .5s var(--ease-spring)',
        }}
      >
        <a href="#top" className="flex flex-col leading-[1.05]" aria-label="리턴컴퍼니 홈">
          <span className="font-display text-[12px] font-bold tracking-[0.16em] text-fog md:text-[13px]">
            RETURN
          </span>
          <span className="font-display text-[12px] font-bold tracking-[0.16em] text-mute md:text-[13px]">
            COMPANY
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[14px] font-medium text-mute transition-colors duration-300 hover:text-fog"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSubscribe}
            className="btn btn-primary hidden !min-h-[42px] !px-5 text-[14px] md:inline-flex"
          >
            구독 시작하기
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full text-fog transition-colors duration-300 hover:bg-white/10 md:hidden"
          >
            <iconify-icon
              icon={open ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'}
              width="22"
            ></iconify-icon>
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-white/10 p-2 md:hidden"
          style={{
            background: 'rgba(13,13,13,0.94)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
          }}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3.5 text-[15px] font-medium text-fog transition-colors duration-300 hover:bg-white/6"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
