import Reveal from './Reveal.jsx'

/**
 * 섹션 제목 블록.
 * align 은 섹션마다 다르게 주어 레이아웃이 반복되지 않게 한다.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className = '',
}) {
  const isCenter = align === 'center'
  const titleColor = tone === 'light' ? 'text-ink' : 'text-fog'
  const descColor = tone === 'light' ? 'text-ink/60' : 'text-mute'

  return (
    <div className={`${isCenter ? 'text-center mx-auto max-w-2xl' : ''} ${className}`}>
      {eyebrow && (
        <Reveal as="p" className="eyebrow mb-4">
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={70}
        className={`font-black leading-tight tracking-[-0.02em] ${titleColor}`}
        style={{ fontSize: 'clamp(26px, 5.4vw, 46px)' }}
      >
        {title}
      </Reveal>
      {description && (
        <Reveal
          as="p"
          delay={140}
          className={`mt-4 text-[15px] leading-relaxed md:text-base ${descColor} ${
            isCenter ? '' : 'max-w-xl'
          }`}
        >
          {description}
        </Reveal>
      )}
    </div>
  )
}
