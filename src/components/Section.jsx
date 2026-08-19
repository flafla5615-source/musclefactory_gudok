import Reveal from './Reveal.jsx'

/**
 * 모든 섹션의 공통 껍데기.
 * 좌우 폭(.wrap)과 세로 여백(.section)을 여기서만 정하므로
 * 섹션마다 규격이 달라지는 일이 없다.
 */
export default function Section({ id, tone = 'ink', title, description, children, className = '' }) {
  const bg = tone === 'paper' ? 'bg-paper' : tone === 'ink-2' ? 'bg-ink-2' : 'bg-ink'
  const titleColor = tone === 'paper' ? 'text-ink' : 'text-fog'
  const descColor = tone === 'paper' ? 'text-ink/60' : 'text-mute'

  return (
    <section id={id} className={`section ${bg} ${className}`}>
      <div className="wrap">
        {title && (
          <header>
            <Reveal as="h2" className={`t-section ${titleColor}`}>
              {title}
            </Reveal>
            {description && (
              <Reveal as="p" delay={70} className={`mt-3 t-body ${descColor}`}>
                {description}
              </Reveal>
            )}
          </header>
        )}
        <div className={title ? 'section-body' : ''}>{children}</div>
      </div>
    </section>
  )
}
