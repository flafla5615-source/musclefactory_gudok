/** 스크롤 진입 시 fadeInUp — delay(ms)로 스태거를 준다 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  return (
    <Tag className={`reveal ${className}`} data-reveal-delay={delay} {...rest}>
      {children}
    </Tag>
  )
}
