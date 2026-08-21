import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#price', label: '구독 상품' },
  { href: '#store', label: '지점' },
  { href: '#facility', label: '시설' },
  { href: '#faq', label: 'FAQ' },
]

/** 상단 네비 — 스크롤 시 배경만 진해진다. 장식 없음. */
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
    <header
      className="fixed inset-x-0 top-0 z-50 border-b"
      style={{
        background: scrolled ? 'rgba(13,13,13,0.9)' : 'transparent',
        borderColor: scrolled ? 'var(--color-line)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background-color .4s var(--ease-spring), border-color .4s var(--ease-spring)',
      }}
    >
      <div className="wrap flex h-[64px] items-center justify-between">
        {/* 서비스명 = GYM PASS (운영사 표기는 푸터에서 유지) */}
        <a href="#top" className="flex items-center" aria-label="GYM PASS 홈">
          <span className="font-display text-[15px] font-bold tracking-[0.14em] text-fog">
            GYM PASS
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
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

        <button
          type="button"
          onClick={onSubscribe}
          className="btn btn-primary btn-auto !hidden !min-h-[40px] !px-5 !text-[14px] lg:!inline-flex"
        >
          구독 시작하기
        </button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-full text-fog lg:hidden"
        >
          <iconify-icon
            icon={open ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'}
            width="22"
          ></iconify-icon>
        </button>
      </div>

      {open && (
        <div
          className="border-t lg:hidden"
          style={{ borderColor: 'var(--color-line)', background: 'rgba(13,13,13,0.97)' }}
        >
          <div className="wrap py-2">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3.5 text-[15px] font-medium text-fog"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
