import { useState } from 'react'

/**
 * 지점 사진.
 * ⚠ 실제 센터사진만 사용한다. AI 생성 이미지·스톡 이미지를 넣지 않는다.
 * 사진이 없거나 로드에 실패하면 중립 플레이스홀더를 보여주고,
 * 개발 모드에서는 어떤 경로에 파일을 넣어야 하는지 함께 표시한다.
 */
export default function StorePhoto({
  src,
  alt,
  caption,
  folder,
  className = '',
  imgClassName = '',
  eager = false,
}) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed

  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      {showPlaceholder ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-4 text-center">
          <iconify-icon
            icon="solar:gallery-wide-linear"
            width="26"
            style={{ color: 'var(--color-mute-2)' }}
          ></iconify-icon>
          <p className="text-[12px] font-medium text-mute-2">실제 센터사진 준비 중</p>
          {/* 파일 경로 힌트는 개발 중에만 — 고객 화면에는 노출하지 않는다 */}
          {folder && import.meta.env.DEV && (
            <code className="text-[10px] leading-tight text-mute-2/70 break-all">{folder}</code>
          )}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchpriority={eager ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}

      {caption && !showPlaceholder && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(13,13,13,0.85))' }}
          />
          <span className="absolute bottom-3 left-3 rounded-full border border-white/12 bg-black/45 px-2.5 py-1 text-[11px] font-medium text-fog backdrop-blur-sm">
            {caption}
          </span>
        </>
      )}
    </div>
  )
}
