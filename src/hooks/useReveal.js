import { useEffect } from 'react'

/**
 * .reveal 요소를 뷰포트 진입 시 순차적으로 등장시킨다.
 * IntersectionObserver 기반 — 스크롤 이벤트를 쓰지 않아 메인 스레드 부담이 적다.
 */
export function useReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = document.querySelectorAll('.reveal')

    if (reduceMotion) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const delay = Number(entry.target.dataset.revealDelay || 0)
          window.setTimeout(() => entry.target.classList.add('is-visible'), delay)
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  })
}
